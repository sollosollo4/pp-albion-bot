const strings = {
  en: {
    error: 'Error',
    objectRecognized: 'Object recognized',
    object: 'Object',
    rarity: 'Rarity',
    location: 'Location',
    opensAt: 'Opens',
    noActiveObjects: 'No active objects',
    noActiveObjectsHint: 'Send a screenshot via `/pp` with an image attached.',
    activeObjects: (n) => `Active objects (${n})`,
    activeObjectsContinued: 'Active objects (continued)',
    rateLimit:
      'Limit: max **{max}** screenshots per **{minutes}** minutes per user.\n' +
      'Next attempt available {time}.',
    attachImage: 'Attach an image to the `/pp` command.',
    invalidImageType: 'File must be an image (PNG, JPG, WEBP).',
    imageTooLarge: 'Image is too large ({size} MB). Maximum: {max} MB.',
    imageDownloadFailed: 'Failed to download the image from Discord.',
    imageDimensionsUnknown: 'Could not read image dimensions. Use PNG, JPG, or WEBP.',
    imageDimensionsTooLarge:
      'Image dimensions are too large: {width}×{height} px. Maximum: {maxWidth}×{maxHeight} px.',
    openaiFailed: 'ChatGPT API error. Please try again later.',
    internalError: 'Internal bot error. Please try again later.',
    channelRestricted: 'This command is only available in a specific server channel.',
  },
  ru: {
    error: 'Ошибка',
    objectRecognized: 'Объект распознан',
    object: 'Объект',
    rarity: 'Редкость',
    location: 'Локация',
    opensAt: 'Откроется',
    noActiveObjects: 'Нет активных объектов',
    noActiveObjectsHint: 'Отправьте скриншот через `/pp` с прикреплённым изображением.',
    activeObjects: (n) => `Активные объекты (${n})`,
    activeObjectsContinued: 'Активные объекты (продолжение)',
    rateLimit:
      'Лимит: не более **{max}** скриншотов за **{minutes}** минут на пользователя.\n' +
      'Следующая попытка будет доступна {time}.',
    attachImage: 'Прикрепите изображение к команде `/pp`.',
    invalidImageType: 'Файл должен быть изображением (PNG, JPG, WEBP).',
    imageTooLarge: 'Изображение слишком большое ({size} MB). Максимум: {max} MB.',
    imageDownloadFailed: 'Не удалось скачать изображение с Discord.',
    imageDimensionsUnknown:
      'Не удалось определить размер изображения. Используйте PNG, JPG или WEBP.',
    imageDimensionsTooLarge:
      'Изображение слишком большое: {width}×{height} px. Максимум: {maxWidth}×{maxHeight} px.',
    openaiFailed: 'Ошибка при обращении к ChatGPT API. Попробуйте позже.',
    internalError: 'Внутренняя ошибка бота. Попробуйте позже.',
    channelRestricted: 'Эта команда доступна только в определённом канале сервера.',
  },
  de: {
    error: 'Fehler',
    objectRecognized: 'Objekt erkannt',
    object: 'Objekt',
    rarity: 'Seltenheit',
    location: 'Standort',
    opensAt: 'Öffnet',
    noActiveObjects: 'Keine aktiven Objekte',
    noActiveObjectsHint: 'Sende einen Screenshot mit `/pp` und angehängtem Bild.',
    activeObjects: (n) => `Aktive Objekte (${n})`,
    activeObjectsContinued: 'Aktive Objekte (Fortsetzung)',
    rateLimit:
      'Limit: max. **{max}** Screenshots pro **{minutes}** Minuten pro Benutzer.\n' +
      'Nächster Versuch verfügbar {time}.',
    attachImage: 'Füge ein Bild zum Befehl `/pp` hinzu.',
    invalidImageType: 'Die Datei muss ein Bild sein (PNG, JPG, WEBP).',
    imageTooLarge: 'Bild ist zu groß ({size} MB). Maximum: {max} MB.',
    imageDownloadFailed: 'Bild konnte nicht von Discord heruntergeladen werden.',
    imageDimensionsUnknown:
      'Bildabmessungen konnten nicht gelesen werden. Verwende PNG, JPG oder WEBP.',
    imageDimensionsTooLarge:
      'Bild ist zu groß: {width}×{height} px. Maximum: {maxWidth}×{maxHeight} px.',
    openaiFailed: 'ChatGPT-API-Fehler. Bitte später erneut versuchen.',
    internalError: 'Interner Bot-Fehler. Bitte später erneut versuchen.',
    channelRestricted: 'Dieser Befehl ist nur in einem bestimmten Kanal verfügbar.',
  },
  fr: {
    error: 'Erreur',
    objectRecognized: 'Objet reconnu',
    object: 'Objet',
    rarity: 'Rareté',
    location: 'Emplacement',
    opensAt: 'Ouvre',
    noActiveObjects: 'Aucun objet actif',
    noActiveObjectsHint: 'Envoyez une capture via `/pp` avec une image jointe.',
    activeObjects: (n) => `Objets actifs (${n})`,
    activeObjectsContinued: 'Objets actifs (suite)',
    rateLimit:
      'Limite : max. **{max}** captures par **{minutes}** minutes par utilisateur.\n' +
      'Prochaine tentative disponible {time}.',
    attachImage: 'Joignez une image à la commande `/pp`.',
    invalidImageType: 'Le fichier doit être une image (PNG, JPG, WEBP).',
    imageTooLarge: 'Image trop volumineuse ({size} MB). Maximum : {max} MB.',
    imageDownloadFailed: "Impossible de télécharger l'image depuis Discord.",
    imageDimensionsUnknown:
      "Impossible de lire les dimensions de l'image. Utilisez PNG, JPG ou WEBP.",
    imageDimensionsTooLarge:
      'Image trop grande : {width}×{height} px. Maximum : {maxWidth}×{maxHeight} px.',
    openaiFailed: 'Erreur API ChatGPT. Réessayez plus tard.',
    internalError: 'Erreur interne du bot. Réessayez plus tard.',
    channelRestricted: 'Cette commande est disponible uniquement dans un canal spécifique.',
  },
  pl: {
    error: 'Błąd',
    objectRecognized: 'Obiekt rozpoznany',
    object: 'Obiekt',
    rarity: 'Rzadkość',
    location: 'Lokalizacja',
    opensAt: 'Otwiera się',
    noActiveObjects: 'Brak aktywnych obiektów',
    noActiveObjectsHint: 'Wyślij zrzut ekranu przez `/pp` z załączonym obrazem.',
    activeObjects: (n) => `Aktywne obiekty (${n})`,
    activeObjectsContinued: 'Aktywne obiekty (cd.)',
    rateLimit:
      'Limit: maks. **{max}** zrzutów na **{minutes}** minut na użytkownika.\n' +
      'Następna próba dostępna {time}.',
    attachImage: 'Dołącz obraz do polecenia `/pp`.',
    invalidImageType: 'Plik musi być obrazem (PNG, JPG, WEBP).',
    imageTooLarge: 'Obraz jest za duży ({size} MB). Maksimum: {max} MB.',
    imageDownloadFailed: 'Nie udało się pobrać obrazu z Discord.',
    imageDimensionsUnknown: 'Nie można odczytać wymiarów obrazu. Użyj PNG, JPG lub WEBP.',
    imageDimensionsTooLarge:
      'Obraz jest za duży: {width}×{height} px. Maksimum: {maxWidth}×{maxHeight} px.',
    openaiFailed: 'Błąd API ChatGPT. Spróbuj ponownie później.',
    internalError: 'Wewnętrzny błąd bota. Spróbuj ponownie później.',
    channelRestricted: 'To polecenie jest dostępne tylko na określonym kanale.',
  },
  es: {
    error: 'Error',
    objectRecognized: 'Objeto reconocido',
    object: 'Objeto',
    rarity: 'Rareza',
    location: 'Ubicación',
    opensAt: 'Se abre',
    noActiveObjects: 'No hay objetos activos',
    noActiveObjectsHint: 'Envía una captura con `/pp` y una imagen adjunta.',
    activeObjects: (n) => `Objetos activos (${n})`,
    activeObjectsContinued: 'Objetos activos (continuación)',
    rateLimit:
      'Límite: máx. **{max}** capturas por **{minutes}** minutos por usuario.\n' +
      'Próximo intento disponible {time}.',
    attachImage: 'Adjunta una imagen al comando `/pp`.',
    invalidImageType: 'El archivo debe ser una imagen (PNG, JPG, WEBP).',
    imageTooLarge: 'La imagen es demasiado grande ({size} MB). Máximo: {max} MB.',
    imageDownloadFailed: 'No se pudo descargar la imagen de Discord.',
    imageDimensionsUnknown: 'No se pudieron leer las dimensiones. Usa PNG, JPG o WEBP.',
    imageDimensionsTooLarge:
      'Imagen demasiado grande: {width}×{height} px. Máximo: {maxWidth}×{maxHeight} px.',
    openaiFailed: 'Error de la API de ChatGPT. Inténtalo más tarde.',
    internalError: 'Error interno del bot. Inténtalo más tarde.',
    channelRestricted: 'Este comando solo está disponible en un canal específico.',
  },
  pt: {
    error: 'Erro',
    objectRecognized: 'Objeto reconhecido',
    object: 'Objeto',
    rarity: 'Raridade',
    location: 'Localização',
    opensAt: 'Abre',
    noActiveObjects: 'Nenhum objeto ativo',
    noActiveObjectsHint: 'Envie uma captura via `/pp` com uma imagem anexada.',
    activeObjects: (n) => `Objetos ativos (${n})`,
    activeObjectsContinued: 'Objetos ativos (continuação)',
    rateLimit:
      'Limite: máx. **{max}** capturas por **{minutes}** minutos por usuário.\n' +
      'Próxima tentativa disponível {time}.',
    attachImage: 'Anexe uma imagem ao comando `/pp`.',
    invalidImageType: 'O arquivo deve ser uma imagem (PNG, JPG, WEBP).',
    imageTooLarge: 'Imagem muito grande ({size} MB). Máximo: {max} MB.',
    imageDownloadFailed: 'Falha ao baixar a imagem do Discord.',
    imageDimensionsUnknown: 'Não foi possível ler as dimensões. Use PNG, JPG ou WEBP.',
    imageDimensionsTooLarge:
      'Imagem muito grande: {width}×{height} px. Máximo: {maxWidth}×{maxHeight} px.',
    openaiFailed: 'Erro na API do ChatGPT. Tente novamente mais tarde.',
    internalError: 'Erro interno do bot. Tente novamente mais tarde.',
    channelRestricted: 'Este comando está disponível apenas em um canal específico.',
  },
};

export function resolveLocale(code) {
  if (!code) return 'en';
  const base = String(code).toLowerCase().split('-')[0];
  return strings[base] ? base : 'en';
}

function interpolate(template, params = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? `{${key}}`);
}

export function t(locale, key, params) {
  const loc = resolveLocale(locale);
  const value = strings[loc][key] ?? strings.en[key];

  if (typeof value === 'function') {
    return value(params?.n ?? params?.count ?? 0);
  }

  return interpolate(value, params);
}

export function pickInfoLocale(entries, fallbackLocale) {
  if (entries.length === 0) {
    return resolveLocale(fallbackLocale);
  }

  const counts = new Map();
  for (const entry of entries) {
    const loc = resolveLocale(entry.language);
    counts.set(loc, (counts.get(loc) || 0) + 1);
  }

  let best = resolveLocale(fallbackLocale);
  let bestCount = -1;
  for (const [loc, count] of counts) {
    if (count > bestCount) {
      best = loc;
      bestCount = count;
    }
  }

  return best;
}
