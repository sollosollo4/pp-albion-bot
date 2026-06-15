#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if grep -q 'your_bot_token_here' docker-compose.yml; then
  echo ""
  echo "Заполните переменные в docker-compose.yml (DISCORD_TOKEN, OPENAI_API_KEY и др.), затем:"
  echo "  ./scripts/deploy.sh"
  echo ""
  exit 1
fi

docker compose up -d --build

echo ""
echo "Bot is running. Logs: docker compose logs -f bot"
echo "Stop:       docker compose down"
