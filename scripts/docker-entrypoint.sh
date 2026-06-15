#!/bin/sh
set -e

echo "[vortex-bot] Registering Discord slash commands..."
node src/register-commands.js

echo "[vortex-bot] Starting bot..."
exec node src/index.js
