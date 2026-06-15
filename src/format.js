import { t, pickInfoLocale } from './i18n.js';
import { resolveRarity } from './rarity.js';

export function formatShortId(id) {
  return String(id).slice(0, 8);
}

function formatDiscordTime(iso, locale, { createdAt } = {}) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  const opensUnix = Math.floor(date.getTime() / 1000);
  const relative = `<t:${opensUnix}:R>`;
  let result = `<t:${opensUnix}:F> (${t(locale, 'opensInRelative', { time: relative })})`;

  if (createdAt) {
    const createdDate = new Date(createdAt);
    if (!Number.isNaN(createdDate.getTime())) {
      const createdUnix = Math.floor(createdDate.getTime() / 1000);
      result += ` (<t:${createdUnix}:R>)`;
    }
  }

  return result;
}

export function buildSingleEmbed(data, locale) {
  const lang = data.language || locale;
  const { emoji, color } = resolveRarity(data);
  return {
    title: `${emoji} ${t(lang, 'objectRecognized')}`,
    color,
    fields: [
      { name: t(lang, 'object'), value: `${emoji} ${data.object_name}`, inline: true },
      { name: t(lang, 'rarity'), value: `${emoji} ${data.rarity}`, inline: true },
      { name: t(lang, 'location'), value: `📍 ${data.location}`, inline: false },
      {
        name: t(lang, 'opensAt'),
        value: `⏰ ${formatDiscordTime(data.opens_at_utc, lang, { createdAt: data.created_at })}`,
        inline: false,
      },
      {
        name: t(lang, 'entryId'),
        value: `\`${formatShortId(data.id)}\``,
        inline: true,
      },
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
    const { emoji } = resolveRarity(entry);
    const lang = entry.language || locale;
    const time = formatDiscordTime(entry.opens_at_utc, lang, { createdAt: entry.created_at });
    const shortId = formatShortId(entry.id);
    return (
      `**${index + 1}.** \`${shortId}\` ${emoji} **${entry.object_name}** (${entry.rarity})\n` +
      `📍 ${entry.location}\n⏰ ${time}`
    );
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

export function buildSuccessEmbed(message, locale = 'en') {
  return {
    title: t(locale, 'success'),
    description: message,
    color: 0x57f287,
    timestamp: new Date().toISOString(),
  };
}
