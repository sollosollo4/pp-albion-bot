# Vortex Bot

Discord-бот для распознавания скриншотов из **Albion Online** (сундуки/объекты на карте) через **ChatGPT Vision API**.

## Возможности

- **`/pp`** — прикрепите скриншот; бот отправит его в ChatGPT, сохранит результат и сразу покажет embed с объектом, редкостью, локацией и временем открытия (UTC).
- **`/info`** — список всех сохранённых **активных** объектов (уже открывшиеся автоматически скрываются).
- Работа только в указанном канале (настраивается через `ALLOWED_CHANNEL_ID`).
- Валидация: без картинки, не-изображение, слишком большой файл или размер **> 1200×1200 px** → ошибка.
- **Rate limit `/pp`**: не более **2 попыток за 10 минут** на пользователя (первая может быть ошибочной, вторая — исправленный скрин). `/info` не ограничена.
- Если на скриншоте нет нужных данных — ChatGPT вернёт ошибку, бот передаст её пользователю.

## Быстрый старт

### 1. Создайте Discord-приложение

1. [Discord Developer Portal](https://discord.com/developers/applications) → New Application.
2. **Bot** → Add Bot → скопируйте **Token** → `DISCORD_TOKEN`.
3. Включите **Message Content Intent** не нужен (используются slash-команды).
4. **OAuth2 → URL Generator**: scopes `bot`, `applications.commands`; permissions `Send Messages`, `Embed Links`, `Attach Files`.
5. Пригласите бота на сервер по сгенерированной ссылке.
6. Скопируйте **Application ID** → `DISCORD_CLIENT_ID`.
7. ID сервера (ПКМ по серверу → Copy Server ID) → `DISCORD_GUILD_ID`.
8. ID канала → `ALLOWED_CHANNEL_ID`.

### 2. OpenAI API

Получите ключ на [platform.openai.com](https://platform.openai.com/) → `OPENAI_API_KEY`.

Рекомендуемая модель: `gpt-4o-mini` (дешевле, достаточно для OCR UI).

### 3. Установка

#### Docker (рекомендуется для VPS)

На сервере нужны только [Docker](https://docs.docker.com/engine/install/) и [Docker Compose](https://docs.docker.com/compose/install/).

1. Откройте `docker-compose.yml` и заполните переменные (`DISCORD_TOKEN`, `OPENAI_API_KEY` и т.д.)
2. Запустите:

```bash
git clone <your-repo-url> vortex-bot && cd vortex-bot
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

Или вручную:

```bash
# заполните environment в docker-compose.yml
docker compose up -d --build
```

Полезные команды:

```bash
docker compose logs -f bot    # логи
docker compose restart bot    # перезапуск
docker compose down           # остановка
```

Данные сохраняются в `./data/entries.json` на хосте (volume).

#### Локально без Docker

```bash
cp .env.example .env
# заполните .env

npm install
npm run register-commands
npm start
```

## Переменные окружения

При деплое через Docker все переменные задаются в **`docker-compose.yml`** → секция `environment`.

Для локального запуска без Docker скопируйте `.env.example` → `.env`.

| Переменная | Описание |
|---|---|
| `DISCORD_TOKEN` | Токен бота |
| `DISCORD_CLIENT_ID` | Application ID |
| `DISCORD_GUILD_ID` | ID сервера (для быстрой регистрации команд) |
| `ALLOWED_CHANNEL_ID` | ID канала, где работают команды |
| `OPENAI_API_KEY` | Ключ OpenAI |
| `OPENAI_MODEL` | Модель (по умолчанию `gpt-4o-mini`) |
| `MAX_IMAGE_SIZE_BYTES` | Лимит размера файла (по умолчанию 2 MB) |
| `MAX_IMAGE_WIDTH` | Макс. ширина изображения в px (по умолчанию 1200) |
| `MAX_IMAGE_HEIGHT` | Макс. высота изображения в px (по умолчанию 1200) |
| `PP_RATE_LIMIT_MAX` | Макс. попыток `/pp` на пользователя (по умолчанию 2) |
| `PP_RATE_LIMIT_WINDOW_MS` | Окно rate limit в мс (по умолчанию 600000 = 10 мин) |

## Формат ответа ChatGPT

```json
{
  "success": true,
  "object_name": "Rare Chest",
  "rarity": "Rare",
  "location": "Martlock",
  "opens_at_utc": "2025-06-15T16:45:00.000Z"
}
```

При ошибке:

```json
{
  "success": false,
  "error": "Countdown timer is not readable"
}
```

Данные хранятся в `data/entries.json`.

## Локальная ИИ vs ChatGPT API

**Краткий ответ: для 20–25 скриншотов обучить свою модель не получится — проще и надёжнее API.**

### Почему 20–25 скриншотов мало

| Подход | Реалистичность | Комментарий |
|---|---|---|
| Обучить CNN/vision-модель с нуля | ❌ | Нужны тысячи размеченных примеров |
| Fine-tune GPT-4 Vision / LLaVA | ❌ | Нужны сотни–тысячи пар «скрин → JSON» |
| Классический OCR (Tesseract) + фиксированные координаты | ⚠️ Частично | Работает только если UI **всегда** в одних и тех же пикселях, одно разрешение, один масштаб UI |
| Шаблонное сопоставление (OpenCV) | ⚠️ Частично | Хрупко при смене разрешения/масштаба/языка клиента |
| **ChatGPT / Claude Vision API** | ✅ | Понимает контекст UI, язык, разные разрешения; 20–25 скринов не нужны |

### Когда имеет смысл локальное решение

- UI **строго фиксирован** (одно разрешение, без масштабирования).
- Нужна **нулевая стоимость за запрос** при очень большом объёме (сотни скринов в час).
- Готовы поддерживать пайплайн: crop регионов → OCR → парсинг текста → расчёт UTC.

Для Albion Online UI (модальное окно + жёлтая плашка локации, разные языки клиента, разные разрешения) **Vision API — оптимальный баланс** простоты, точности и стоимости (~$0.001–0.01 за скрин на `gpt-4o-mini` с `detail: low`).

### Компромисс: гибрид

1. Локально уменьшать/обрезать скрин до нужных областей (экономия токенов).
2. Отправлять в API только crop модального окна и локации.
3. При росте объёма — рассмотреть **PaddleOCR** / **EasyOCR** для текста + простой парсер countdown.

## Структура проекта

```
src/
  index.js              — запуск бота
  register-commands.js  — регистрация slash-команд
  config.js             — конфигурация
  prompts.js            — промпт для ChatGPT
  vision.js             — вызов OpenAI Vision
  storage.js            — JSON-хранилище
  format.js             — Discord embeds
  commands/index.js     — /pp и /info
scripts/
  deploy.sh             — деплой на VPS одной командой
  docker-entrypoint.sh  — регистрация команд + старт в контейнере
Dockerfile
docker-compose.yml
data/
  entries.json          — сохранённые объекты (создаётся автоматически)
```

## Лицензия

MIT
