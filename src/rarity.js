const RARITY_TIERS = [
  {
    emoji: '🟡',
    color: 0xf1c40f,
    keywords: [
      'gold', 'golden', 'золот', 'legendary', 'legendär', 'legendaire', 'legendario',
      'legendar', 'legenda', 'unique', 'уникальн', 'légendaire',
    ],
  },
  {
    emoji: '🟣',
    color: 0x9b59b6,
    keywords: [
      'purple', 'violet', 'фиолет', 'пурпур', 'epic', 'episch', 'épique', 'epique',
      'exceptional', 'исключительн', 'wyjątkow', 'excepcional',
    ],
  },
  {
    emoji: '🔵',
    color: 0x3498db,
    keywords: [
      'blue', 'син', 'blau', 'bleu', 'rare', 'редк', 'selten', 'rzadk',
      'raro', 'rare',
    ],
  },
  {
    emoji: '🟢',
    color: 0x57f287,
    keywords: [
      'green', 'зелен', 'зелён', 'grün', 'grun', 'vert', 'verde', 'uncommon',
      'необычн', 'ungewöhnlich', 'niezwyk', 'poco común',
    ],
  },
];

function matchRarityTier(rarity) {
  const key = String(rarity).toLowerCase();
  return RARITY_TIERS.find((tier) => tier.keywords.some((word) => key.includes(word))) ?? null;
}

export function rarityEmoji(rarity) {
  return matchRarityTier(rarity)?.emoji ?? '⚪';
}

export function rarityColor(rarity) {
  return matchRarityTier(rarity)?.color ?? 0x5865f2;
}
