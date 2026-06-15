import 'dotenv/config';

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  discordToken: requireEnv('DISCORD_TOKEN'),
  clientId: requireEnv('DISCORD_CLIENT_ID'),
  guildId: process.env.DISCORD_GUILD_ID || null,
  allowedChannelId: process.env.ALLOWED_CHANNEL_ID || null,
  openaiApiKey: requireEnv('OPENAI_API_KEY'),
  openaiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  maxImageSizeBytes: Number(process.env.MAX_IMAGE_SIZE_BYTES) || 2 * 1024 * 1024,
  maxImageWidth: Number(process.env.MAX_IMAGE_WIDTH) || 1200,
  maxImageHeight: Number(process.env.MAX_IMAGE_HEIGHT) || 1200,
  dataFile: process.env.DATA_FILE || 'data/entries.json',
  ppRateLimitMaxAttempts: Number(process.env.PP_RATE_LIMIT_MAX) || 2,
  ppRateLimitWindowMs: Number(process.env.PP_RATE_LIMIT_WINDOW_MS) || 10 * 60 * 1000,
  rateLimitFile: process.env.RATE_LIMIT_FILE || 'data/rate-limits.json',
};
