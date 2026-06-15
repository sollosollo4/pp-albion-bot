import fs from 'node:fs/promises';
import path from 'node:path';

async function ensureFile(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, '{}', 'utf8');
  }
}

export function createRateLimiter({ maxAttempts, windowMs, filePath }) {
  const memory = new Map();
  let writeChain = Promise.resolve();

  async function load() {
    if (!filePath) return;
    await ensureFile(filePath);
    const raw = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(raw);
    memory.clear();
    for (const [userId, timestamps] of Object.entries(data)) {
      memory.set(userId, timestamps);
    }
  }

  function persist() {
    if (!filePath) return Promise.resolve();
    writeChain = writeChain.then(async () => {
      const data = Object.fromEntries(memory.entries());
      await ensureFile(filePath);
      await fs.writeFile(filePath, JSON.stringify(data), 'utf8');
    });
    return writeChain;
  }

  function prune(timestamps, now) {
    const cutoff = now - windowMs;
    return timestamps.filter((ts) => ts > cutoff);
  }

  return {
    async init() {
      if (filePath) await load();
    },

    async consume(userId, now = Date.now()) {
      const timestamps = prune(memory.get(userId) || [], now);

      if (timestamps.length >= maxAttempts) {
        const oldest = Math.min(...timestamps);
        const retryAt = oldest + windowMs;
        return {
          allowed: false,
          attemptsUsed: timestamps.length,
          retryAt,
          retryAfterMs: Math.max(0, retryAt - now),
        };
      }

      timestamps.push(now);
      memory.set(userId, timestamps);
      await persist();

      return {
        allowed: true,
        attemptsUsed: timestamps.length,
        attemptsLeft: maxAttempts - timestamps.length,
      };
    },
  };
}
