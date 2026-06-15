const strings = {
  en: {
    error: 'Error',
    objectRecognized: 'Object recognized',
    object: 'Object',
    rarity: 'Rarity',
    location: 'Location',
    opensAt: 'Opens',
    opensInRelative: 'Opens {time}',
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
    duplicateObjectType:
      'Location **{location}** already has an active **{type}** object. Only one object of each type is allowed per location.',
    objectType_vein: 'vein',
    objectType_vortex: 'vortex',
    objectType_core: 'core',
    objectType_chest: 'chest',
    entryId: 'ID',
    success: 'Done',
    listCleared: 'List cleared. Removed **{count}** object(s).',
    entryRemoved: 'Removed object `{id}` — **{object}**.',
    entryNotFound: 'No object found with ID `{id}`. Use the short ID from `/info` or `/pp`.',
    ambiguousEntryId: 'ID matches several objects: {ids}. Enter a longer ID.',
  },
  ru: {
    error: 'Ошибка',
    objectRecognized: 'Объект распознан',
    object: 'Объект',
    rarity: 'Редкость',
    location: 'Локация',
    opensAt: 'Откроется',
    opensInRelative: 'Будет {time}',
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
    duplicateObjectType:
      'На локации **{location}** уже есть активный объект типа «{type}». На одну локацию можно добавить только один объект каждого типа.',
    objectType_vein: 'жила',
    objectType_vortex: 'ураган',
    objectType_core: 'ядро',
    objectType_chest: 'сундук',
    entryId: 'ID',
    success: 'Готово',
    listCleared: 'Список очищен. Удалено объектов: **{count}**.',
    entryRemoved: 'Удалён объект `{id}` — **{object}**.',
    entryNotFound: 'Объект с ID `{id}` не найден. Используйте короткий ID из `/info` или `/pp`.',
    ambiguousEntryId: 'ID совпадает с несколькими объектами: {ids}. Укажите более длинный ID.',
  },
  de: {
    error: 'Fehler',
    objectRecognized: 'Objekt erkannt',
    object: 'Objekt',
    rarity: 'Seltenheit',
    location: 'Standort',
    opensAt: 'Öffnet',
    opensInRelative: 'Öffnet {time}',
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
    duplicateObjectType:
      'Am Standort **{location}** ist bereits ein aktives **{type}**-Objekt registriert. Pro Standort ist nur ein Objekt jedes Typs erlaubt.',
    objectType_vein: 'Ader',
    objectType_vortex: 'Vortex',
    objectType_core: 'Kern',
    objectType_chest: 'Truhe',
    entryId: 'ID',
    success: 'Fertig',
    listCleared: 'Liste geleert. **{count}** Objekt(e) entfernt.',
    entryRemoved: 'Objekt `{id}` entfernt — **{object}**.',
    entryNotFound: 'Kein Objekt mit ID `{id}` gefunden. Verwende die kurze ID aus `/info` oder `/pp`.',
    ambiguousEntryId: 'ID passt zu mehreren Objekten: {ids}. Gib eine längere ID an.',
  },
  fr: {
    error: 'Erreur',
    objectRecognized: 'Objet reconnu',
    object: 'Objet',
    rarity: 'Rareté',
    location: 'Emplacement',
    opensAt: 'Ouvre',
    opensInRelative: 'Ouvre {time}',
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
    duplicateObjectType:
      'L\'emplacement **{location}** a déjà un objet actif de type **{type}**. Un seul objet de chaque type est autorisé par emplacement.',
    objectType_vein: 'filon',
    objectType_vortex: 'vortex',
    objectType_core: 'noyau',
    objectType_chest: 'coffre',
    entryId: 'ID',
    success: 'Terminé',
    listCleared: 'Liste effacée. **{count}** objet(s) supprimé(s).',
    entryRemoved: 'Objet `{id}` supprimé — **{object}**.',
    entryNotFound: 'Aucun objet avec l\'ID `{id}`. Utilisez l\'ID court de `/info` ou `/pp`.',
    ambiguousEntryId: 'L\'ID correspond à plusieurs objets : {ids}. Entrez un ID plus long.',
  },
  pl: {
    error: 'Błąd',
    objectRecognized: 'Obiekt rozpoznany',
    object: 'Obiekt',
    rarity: 'Rzadkość',
    location: 'Lokalizacja',
    opensAt: 'Otwiera się',
    opensInRelative: 'Otworzy się {time}',
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
    duplicateObjectType:
      'Na lokalizacji **{location}** jest już aktywny obiekt typu **{type}**. Dozwolony jest tylko jeden obiekt każdego typu na lokalizację.',
    objectType_vein: 'żyła',
    objectType_vortex: 'vortex',
    objectType_core: 'rdzeń',
    objectType_chest: 'skrzynia',
    entryId: 'ID',
    success: 'Gotowe',
    listCleared: 'Lista wyczyszczona. Usunięto **{count}** obiekt(ów).',
    entryRemoved: 'Usunięto obiekt `{id}` — **{object}**.',
    entryNotFound: 'Nie znaleziono obiektu o ID `{id}`. Użyj krótkiego ID z `/info` lub `/pp`.',
    ambiguousEntryId: 'ID pasuje do wielu obiektów: {ids}. Podaj dłuższe ID.',
  },
  es: {
    error: 'Error',
    objectRecognized: 'Objeto reconocido',
    object: 'Objeto',
    rarity: 'Rareza',
    location: 'Ubicación',
    opensAt: 'Se abre',
    opensInRelative: 'Se abre {time}',
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
    duplicateObjectType:
      'En la ubicación **{location}** ya hay un objeto activo de tipo **{type}**. Solo se permite un objeto de cada tipo por ubicación.',
    objectType_vein: 'veta',
    objectType_vortex: 'vortex',
    objectType_core: 'núcleo',
    objectType_chest: 'cofre',
    entryId: 'ID',
    success: 'Listo',
    listCleared: 'Lista borrada. Eliminados **{count}** objeto(s).',
    entryRemoved: 'Eliminado objeto `{id}` — **{object}**.',
    entryNotFound: 'No se encontró objeto con ID `{id}`. Usa el ID corto de `/info` o `/pp`.',
    ambiguousEntryId: 'El ID coincide con varios objetos: {ids}. Introduce un ID más largo.',
  },
  pt: {
    error: 'Erro',
    objectRecognized: 'Objeto reconhecido',
    object: 'Objeto',
    rarity: 'Raridade',
    location: 'Localização',
    opensAt: 'Abre',
    opensInRelative: 'Abre {time}',
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
    duplicateObjectType:
      'Na localização **{location}** já existe um objeto ativo do tipo **{type}**. Apenas um objeto de cada tipo é permitido por localização.',
    objectType_vein: 'veia',
    objectType_vortex: 'vortex',
    objectType_core: 'núcleo',
    objectType_chest: 'cofre',
    entryId: 'ID',
    success: 'Concluído',
    listCleared: 'Lista limpa. Removidos **{count}** objeto(s).',
    entryRemoved: 'Removido objeto `{id}` — **{object}**.',
    entryNotFound: 'Nenhum objeto com ID `{id}`. Use o ID curto de `/info` ou `/pp`.',
    ambiguousEntryId: 'O ID corresponde a vários objetos: {ids}. Informe um ID mais longo.',
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
