import { SlashCommandBuilder } from 'discord.js';
import { t } from '../i18n.js';
import {
  buildSingleEmbed,
  buildInfoEmbeds,
  buildErrorEmbed,
  buildRateLimitEmbed,
} from '../format.js';
import { getImageDimensions, validateImageDimensions } from '../image-validation.js';

const IMAGE_MIME_PREFIX = 'image/';

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
      console.error('OpenAI error:', error);
      await interaction.editReply({
        embeds: [buildErrorEmbed(t(locale, 'openaiFailed'), locale)],
      });
      return;
    }

    const responseLocale = result.language || locale;

    if (!result.success) {
      await interaction.editReply({
        embeds: [buildErrorEmbed(result.error, responseLocale)],
      });
      return;
    }

    const record = await storage.addEntry({
      object_name: result.object_name,
      rarity: result.rarity,
      location: result.location,
      opens_at_utc: result.opens_at_utc,
      language: result.language,
      submitted_by: interaction.user.tag,
      submitted_by_id: interaction.user.id,
    });

    await interaction.editReply({
      embeds: [buildSingleEmbed(record, responseLocale)],
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
    const embeds = buildInfoEmbeds(entries, interaction.locale);

    await interaction.editReply({ embeds });
  },
};

export const commands = [ppCommand, infoCommand];
