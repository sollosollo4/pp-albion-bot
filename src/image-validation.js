import sizeOf from 'image-size';
import { t } from './i18n.js';

export function getImageDimensions(buffer) {
  try {
    const { width, height } = sizeOf(buffer);
    if (!width || !height) {
      return null;
    }
    return { width, height };
  } catch {
    return null;
  }
}

export function validateImageDimensions(dimensions, maxWidth, maxHeight, locale) {
  if (!dimensions) {
    return t(locale, 'imageDimensionsUnknown');
  }

  if (dimensions.width > maxWidth || dimensions.height > maxHeight) {
    return t(locale, 'imageDimensionsTooLarge', {
      width: dimensions.width,
      height: dimensions.height,
      maxWidth,
      maxHeight,
    });
  }

  return null;
}
