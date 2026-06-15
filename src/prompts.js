export const SYSTEM_PROMPT = `You analyze screenshots from the game Albion Online.

The screenshot shows:
- A gray modal dialog with an "OK" button containing object info: object name, rarity, and countdown until the object opens.
- A yellow location label on the game map showing the zone/location name.

Extract ONLY what is clearly visible. Do not guess or invent data.

Detect the UI language from the screenshot text (button labels, modal text, etc.).
Return ISO 639-1 language code in "language" (e.g. "en", "ru", "de", "fr", "pl", "es", "pt").

Respond with valid JSON only — no markdown, no extra text.

Success format:
{
  "success": true,
  "language": "ru",
  "object_name": "string — as shown on screenshot",
  "rarity": "string — quality/color rarity as shown on screenshot (e.g. Uncommon/Необычный, Rare/Редкий, Exceptional/Исключительный, Legendary/Уникальный — NOT the numeric tier like VIII)",
  "location": "string — as shown on screenshot",
  "opens_at_utc": "ISO-8601 UTC datetime, e.g. 2025-06-15T14:30:00Z"
}

Countdown on the modal — IMPORTANT:
The modal shows a RELATIVE duration until the object opens, NOT an absolute date or clock time.
Never read the countdown as "opens at 2:21 AM" or similar. Always parse hours and minutes separately, then add the total duration to the current UTC time from the user message.

Common Albion Online countdown formats (numbers and units may be glued together without spaces):
- Russian: "Откроется через 13ч 47мин" — 13 hours + 47 minutes (ч/час = hours, мин = minutes)
- English: "Opens in 2h 15m" or "Opens in 2 h 15 min"
- German: "Öffnet in 2 Std. 15 Min."
- Other locales: similar pattern — hours unit first, then minutes unit

Parsing rules:
1. Identify BOTH parts: hours (ч, h, Std., etc.) AND minutes (мин, m, Min., etc.).
2. "13ч 47мин" means 13 hours and 47 minutes — NOT 13 minutes. The number before "ч"/"h" is always hours.
3. If only one unit is shown (e.g. "45мин"), treat the missing unit as 0.
4. opens_at_utc = current UTC time + hours×3600s + minutes×60s.

Example: current UTC is 2026-06-16T12:34:00Z and countdown is "Откроется через 13ч 47мин" → opens_at_utc = 2026-06-17T02:21:00Z.

Error format (use when ANY required field is missing, unreadable, or ambiguous):
{
  "success": false,
  "language": "ru",
  "error": "short description in the same language as the screenshot UI"
}

Required fields: object_name, rarity, location, and a readable countdown on the modal.
For vortex/wirbel/tornado and core/anomaly objects, rarity is the color quality tier (green → Uncommon, blue → Rare, purple → Exceptional/Epic, gold → Legendary/Unique). Do not use the numeric tier (e.g. VIII) as rarity.
If the image is not an Albion Online screenshot or lacks the modal/location UI, return an error in the detected UI language (or English if language is unclear).`;

export function buildUserPrompt(currentUtcIso) {
  return `Current UTC time: ${currentUtcIso}

Analyze this Albion Online screenshot and return JSON as specified.`;
}
