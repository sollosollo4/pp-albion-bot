import { SlashCommandBuilder, AttachmentBuilder } from 'discord.js';
import { t } from '../i18n.js';
import {
  buildSingleEmbed,
  buildInfoEmbeds,
  buildErrorEmbed,
  buildRateLimitEmbed,
  buildSuccessEmbed,
  formatShortId,
} from '../format.js';
import { getImageDimensions, validateImageDimensions } from '../image-validation.js';
import { getObjectType } from '../object-type.js';
import { logCommand, logCommandError } from '../logger.js';

const IMAGE_MIME_PREFIX = 'image/';

function ppMeta(interaction, extra = {}) {
  return {
    name: 'pp',
    user: interaction.user.tag,
    userId: interaction.user.id,
    ...extra,
  };
}

export const ppCommand = {
  data: new SlashCommandBuilder()
    .setName('pp')
    .setDescription('Отправить скриншот Albion Online для распознавания объекта')
    .addAttachmentOption((option) =>
      option
        .setName('screenshot')
        .setDescription('Скриншот с модальным окном объекта')
        .setRequired(true),
    ),

  async execute(interaction, { vision, storage, config, ppRateLimit }) {
    const locale = interaction.locale;

    const limit = await ppRateLimit.consume(interaction.user.id);
    if (!limit.allowed) {
      logCommand('rate_limited', {
        ...ppMeta(interaction),
        retryAt: new Date(limit.retryAt).toISOString(),
      });
      await interaction.reply({
        embeds: [
          buildRateLimitEmbed(Math.floor(limit.retryAt / 1000), locale, {
            max: config.ppRateLimitMaxAttempts,
            windowMinutes: config.ppRateLimitWindowMs / 60000,
          }),
        ],
        ephemeral: true,
      });
      return;
    }

    const attachment = interaction.options.getAttachment('screenshot');

    if (!attachment) {
      await interaction.reply({
        embeds: [buildErrorEmbed(t(locale, 'attachImage'), locale)],
        ephemeral: true,
      });
      return;
    }

    if (!attachment.contentType?.startsWith(IMAGE_MIME_PREFIX)) {
      await interaction.reply({
        embeds: [buildErrorEmbed(t(locale, 'invalidImageType'), locale)],
        ephemeral: true,
      });
      return;
    }

    if (attachment.size > config.maxImageSizeBytes) {
      const limitMb = (config.maxImageSizeBytes / (1024 * 1024)).toFixed(1);
      await interaction.reply({
        embeds: [
          buildErrorEmbed(
            t(locale, 'imageTooLarge', {
              size: (attachment.size / (1024 * 1024)).toFixed(1),
              max: limitMb,
            }),
            locale,
          ),
        ],
        ephemeral: true,
      });
      return;
    }

    await interaction.deferReply();

    let imageBuffer;
    try {
      const response = await fetch(attachment.url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      imageBuffer = Buffer.from(await response.arrayBuffer());
    } catch {
      await interaction.editReply({
        embeds: [buildErrorEmbed(t(locale, 'imageDownloadFailed'), locale)],
      });
      return;
    }

    if (imageBuffer.length > config.maxImageSizeBytes) {
      const limitMb = (config.maxImageSizeBytes / (1024 * 1024)).toFixed(1);
      await interaction.editReply({
        embeds: [
          buildErrorEmbed(t(locale, 'imageTooLarge', { size: limitMb, max: limitMb }), locale),
        ],
      });
      return;
    }

    const dimensions = getImageDimensions(imageBuffer);
    const dimensionError = validateImageDimensions(
      dimensions,
      config.maxImageWidth,
      config.maxImageHeight,
      locale,
    );
    if (dimensionError) {
      await interaction.editReply({
        embeds: [buildErrorEmbed(dimensionError, locale)],
      });
      return;
    }

    let result;
    try {
      result = await vision.analyzeScreenshot(imageBuffer, attachment.contentType);
    } catch (error) {
      logCommandError('pp_openai_failed', error, ppMeta(interaction));
      await interaction.editReply({
        embeds: [buildErrorEmbed(t(locale, 'openaiFailed'), locale)],
      });
      return;
    }

    const responseLocale = result.language || locale;

    if (!result.success) {
      logCommand('pp_recognition_failed', ppMeta(interaction, { error: result.error }));
      await interaction.editReply({
        embeds: [buildErrorEmbed(result.error, responseLocale)],
      });
      return;
    }

    const saveResult = await storage.addEntry({
      object_name: result.object_name,
      rarity: result.rarity,
      location: result.location,
      opens_at_utc: result.opens_at_utc,
      language: result.language,
      submitted_by: interaction.user.tag,
      submitted_by_id: interaction.user.id,
    });

    if (!saveResult.added) {
      const objectType = getObjectType(result.object_name);
      logCommand('pp_duplicate_type', ppMeta(interaction, {
        object: result.object_name,
        location: result.location,
        type: objectType,
        existingId: saveResult.conflict.id,
      }));
      await interaction.editReply({
        embeds: [
          buildErrorEmbed(
            t(responseLocale, 'duplicateObjectType', {
              location: result.location,
              type: t(responseLocale, `objectType_${objectType}`),
            }),
            responseLocale,
          ),
        ],
      });
      return;
    }

    const record = saveResult.record;

    const screenshotName = attachment.name || 'screenshot.png';
    const screenshotFile = new AttachmentBuilder(imageBuffer, { name: screenshotName });
    const embed = buildSingleEmbed(record, responseLocale);
    embed.image = { url: `attachment://${screenshotName}` };

    logCommand('pp_recognized', ppMeta(interaction, {
      object: result.object_name,
      rarity: result.rarity,
      location: result.location,
      entryId: record.id,
    }));

    await interaction.editReply({
      embeds: [embed],
      files: [screenshotFile],
    });
  },
};

export const infoCommand = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Показать все сохранённые активные объекты'),

  async execute(interaction, { storage }) {
    await interaction.deferReply();

    const entries = await storage.removeExpired();
    logCommand('info_listed', {
      name: 'info',
      user: interaction.user.tag,
      userId: interaction.user.id,
      count: entries.length,
    });
    const embeds = buildInfoEmbeds(entries, interaction.locale);

    await interaction.editReply({ embeds });
  },
};

export const clearCommand = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Очистить весь список активных объектов'),

  async execute(interaction, { storage }) {
    await interaction.deferReply({ ephemeral: true });

    const result = await storage.clearAll();
    logCommand('info_cleared', {
      name: 'clear',
      user: interaction.user.tag,
      userId: interaction.user.id,
      count: result.count,
    });

    await interaction.editReply({
      embeds: [
        buildSuccessEmbed(
          t(interaction.locale, 'listCleared', { count: result.count }),
          interaction.locale,
        ),
      ],
    });
  },
};

export const removeCommand = {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Удалить объект из списка по ID')
    .addStringOption((option) =>
      option
        .setName('id')
        .setDescription('ID объекта (короткий ID из /info или /pp)')
        .setRequired(true),
    ),

  async execute(interaction, { storage }) {
    const locale = interaction.locale;
    const id = interaction.options.getString('id');

    await interaction.deferReply({ ephemeral: true });

    const result = await storage.removeById(id);

    if (result.reason === 'ambiguous') {
      const ids = result.matches.map((entry) => `\`${formatShortId(entry.id)}\``).join(', ');
      await interaction.editReply({
        embeds: [buildErrorEmbed(t(locale, 'ambiguousEntryId', { ids }), locale)],
      });
      return;
    }

    if (!result.removed) {
      await interaction.editReply({
        embeds: [buildErrorEmbed(t(locale, 'entryNotFound', { id }), locale)],
      });
      return;
    }

    logCommand('info_removed', {
      name: 'remove',
      user: interaction.user.tag,
      userId: interaction.user.id,
      entryId: result.record.id,
      object: result.record.object_name,
    });

    await interaction.editReply({
      embeds: [
        buildSuccessEmbed(
          t(locale, 'entryRemoved', {
            id: formatShortId(result.record.id),
            object: result.record.object_name,
          }),
          locale,
        ),
      ],
    });
  },
};

export const commands = [ppCommand, infoCommand, clearCommand, removeCommand];
