import {
  Client,
  GatewayIntentBits,
  Events,
} from 'discord.js';
import { config } from './config.js';
import { commands } from './commands/index.js';
import { createStorage } from './storage.js';
import { createRateLimiter } from './rate-limit.js';
import { createVisionService } from './vision.js';
import { buildErrorEmbed } from './format.js';
import { t } from './i18n.js';
import { logCommand, logCommandError } from './logger.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const commandMap = new Map(commands.map((cmd) => [cmd.data.name, cmd]));
const storage = createStorage(config.dataFile);
const ppRateLimit = createRateLimiter({
  maxAttempts: config.ppRateLimitMaxAttempts,
  windowMs: config.ppRateLimitWindowMs,
  filePath: config.rateLimitFile,
});
const vision = createVisionService({
  apiKey: config.openaiApiKey,
  model: config.openaiModel,
});

await ppRateLimit.init();

const context = { vision, storage, config, ppRateLimit };

function isAllowedChannel(channelId) {
  if (!config.allowedChannelId) return true;
  return channelId === config.allowedChannelId;
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
  if (config.allowedChannelId) {
    console.log(`Commands restricted to channel: ${config.allowedChannelId}`);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commandMap.get(interaction.commandName);
  if (!command) return;

  const commandMeta = {
    name: interaction.commandName,
    user: interaction.user.tag,
    userId: interaction.user.id,
    channelId: interaction.channelId,
    guildId: interaction.guildId,
  };

  logCommand('received', commandMeta);

  if (!isAllowedChannel(interaction.channelId)) {
    logCommand('rejected', { ...commandMeta, reason: 'channel_restricted' });
    await interaction.reply({
      embeds: [
        buildErrorEmbed(t(interaction.locale, 'channelRestricted'), interaction.locale),
      ],
      ephemeral: true,
    });
    return;
  }

  try {
    await command.execute(interaction, context);
  } catch (error) {
    logCommandError('failed', error, commandMeta);

    const payload = {
      embeds: [buildErrorEmbed(t(interaction.locale, 'internalError'), interaction.locale)],
      ephemeral: true,
    };

    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(payload);
    } else {
      await interaction.reply(payload);
    }
  }
});

client.login(config.discordToken);
