import { t, pickInfoLocale } from './i18n.js';

const RARITY_EMOJI = {
  common: '⚪',
  uncommon: '🟢',
  rare: '🔵',
  epic: '🟣',
  legendary: '🟡',
};

function rarityEmoji(rarity) {
  const key = rarity.toLowerCase();
  for (const [name, emoji] of Object.entries(RARITY_EMOJI)) {
    if (key.includes(name)) return emoji;
  }
  return '❔';
}

function formatDiscordTime(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const unix = Math.floor(date.getTime() / 1000);
  return `<t:${unix}:F> (<t:${unix}:R>)`;
}

export function buildSingleEmbed(data, locale) {
  const lang = data.language || locale;
  return {
    title: t(lang, 'objectRecognized'),
    color: 0x5865f2,
    fields: [
      { name: t(lang, 'object'), value: data.object_name, inline: true },
      { name: t(lang, 'rarity'), value: `${rarityEmoji(data.rarity)} ${data.rarity}`, inline: true },
      { name: t(lang, 'location'), value: data.location, inline: false },
      { name: t(lang, 'opensAt'), value: formatDiscordTime(data.opens_at_utc), inline: false },
    ],
    timestamp: new Date().toISOString(),
  };
}

export function buildInfoEmbeds(entries, fallbackLocale) {
  const locale = pickInfoLocale(entries, fallbackLocale);

  if (entries.length === 0) {
    return [
      {
        title: t(locale, 'noActiveObjects'),
        description: t(locale, 'noActiveObjectsHint'),
        color: 0xed4245,
      },
    ];
  }

  const sorted = [...entries].sort(
    (a, b) => new Date(a.opens_at_utc) - new Date(b.opens_at_utc),
  );

  const lines = sorted.map((entry, index) => {
    const emoji = rarityEmoji(entry.rarity);
    const time = formatDiscordTime(entry.opens_at_utc);
    return `**${index + 1}.** ${emoji} **${entry.object_name}** (${entry.rarity})\n📍 ${entry.location}\n⏰ ${time}`;
  });

  const chunkSize = 8;
  const embeds = [];

  for (let i = 0; i < lines.length; i += chunkSize) {
    const chunk = lines.slice(i, i + chunkSize);
    embeds.push({
      title: i === 0
        ? t(locale, 'activeObjects', { n: sorted.length })
        : t(locale, 'activeObjectsContinued'),
      description: chunk.join('\n\n'),
      color: 0x57f287,
      timestamp: new Date().toISOString(),
    });
  }

  return embeds;
}

export function buildErrorEmbed(message, locale = 'en') {
  return {
    title: t(locale, 'error'),
    description: message,
    color: 0xed4245,
  };
}

export function buildRateLimitEmbed(retryAtUnix, locale, { max = 2, windowMinutes = 10 } = {}) {
  const time = `<t:${retryAtUnix}:R> (<t:${retryAtUnix}:t>)`;
  return buildErrorEmbed(t(locale, 'rateLimit', { max, minutes: windowMinutes, time }), locale);
}
