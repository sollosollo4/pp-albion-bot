import { getObjectType } from './object-type.js';

const TIER_SUFFIX = {
  1: { emoji: '🟢', color: 0x57f287 },
  2: { emoji: '🔵', color: 0x3498db },
  3: { emoji: '🟣', color: 0x9b59b6 },
  4: { emoji: '🟡', color: 0xf1c40f },
};

const TEXT_RARITY_TYPES = new Set(['vortex', 'core', 'chest']);

const RARITY_PATTERNS = [
  { suffix: 2, pattern: /необычн|uncommon|ungewöhnlich|niezwykł|poco común|peu commun/i },
  { suffix: 4, pattern: /легендарн|legendary|legendär|legendaire|legendario|legendar/i },
  { suffix: 3, pattern: /редк|rare|selten|rzadk|raro/i },
  { suffix: 1, pattern: /обычн|common|gewöhnlich|commun|zwykł|común|comum/i },
];

function matchTierSuffix(...sources) {
  for (const source of sources) {
    if (!source) continue;

    const normalized = String(source).replace(',', '.');
    const match = normalized.match(/(\d+)\.([1-4])(?!\d)/);
    if (match) {
      return TIER_SUFFIX[Number(match[2])];
    }
  }

  return null;
}

function matchRarityKeywords(rarity) {
  const key = String(rarity).toLowerCase();

  for (const { suffix, pattern } of RARITY_PATTERNS) {
    if (pattern.test(key)) {
      return TIER_SUFFIX[suffix];
    }
  }

  return null;
}

export function resolveRarity({ object_name, rarity } = {}) {
  const tierMatch = matchTierSuffix(object_name, rarity);
  if (tierMatch) return tierMatch;

  const objectType = getObjectType(object_name);
  if (objectType === 'vein') {
    return { emoji: '⚪', color: 0x5865f2 };
  }

  if (!objectType || TEXT_RARITY_TYPES.has(objectType)) {
    return matchRarityKeywords(rarity) ?? { emoji: '⚪', color: 0x5865f2 };
  }

  return { emoji: '⚪', color: 0x5865f2 };
}

export function rarityEmoji(entry) {
  return resolveRarity(entry).emoji;
}

export function rarityColor(entry) {
  return resolveRarity(entry).color;
}
