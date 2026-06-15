import OpenAI from 'openai';
import { resolveLocale } from './i18n.js';
import { SYSTEM_PROMPT, buildUserPrompt } from './prompts.js';

export function createVisionService({ apiKey, model }) {
  const client = new OpenAI({ apiKey });

  async function analyzeScreenshot(imageBuffer, mimeType) {
    const currentUtcIso = new Date().toISOString();
    const base64 = imageBuffer.toString('base64');
    const dataUrl = `data:${mimeType};base64,${base64}`;

    const response = await client.chat.completions.create({
      model,
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            { type: 'text', text: buildUserPrompt(currentUtcIso) },
            { type: 'image_url', image_url: { url: dataUrl, detail: 'low' } },
          ],
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return { success: false, language: 'en', error: 'ChatGPT returned an empty response' };
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      return { success: false, language: 'en', error: 'ChatGPT returned invalid JSON' };
    }

    const language = resolveLocale(parsed.language);

    if (!parsed.success) {
      return {
        success: false,
        language,
        error: parsed.error || 'Could not extract data from the screenshot',
      };
    }

    const { object_name, rarity, location, opens_at_utc } = parsed;

    if (!object_name || !rarity || !location || !opens_at_utc) {
      return {
        success: false,
        language,
        error: parsed.error || 'Incomplete data in ChatGPT response',
      };
    }

    const opensAt = new Date(opens_at_utc);
    if (Number.isNaN(opensAt.getTime())) {
      return {
        success: false,
        language,
        error: parsed.error || 'Invalid opens_at_utc format from ChatGPT',
      };
    }

    return {
      success: true,
      language,
      object_name: String(object_name).trim(),
      rarity: String(rarity).trim(),
      location: String(location).trim(),
      opens_at_utc: opensAt.toISOString(),
    };
  }

  return { analyzeScreenshot };
}
