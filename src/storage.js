import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

async function ensureDataFile(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, '[]', 'utf8');
  }
}

export function createStorage(filePath) {
  let writeChain = Promise.resolve();

  async function readAll() {
    await ensureDataFile(filePath);
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  }

  function writeAll(entries) {
    writeChain = writeChain.then(async () => {
      await ensureDataFile(filePath);
      await fs.writeFile(filePath, JSON.stringify(entries, null, 2), 'utf8');
    });
    return writeChain;
  }

  return {
    async addEntry(entry) {
      const entries = await readAll();
      const record = {
        id: randomUUID(),
        created_at: new Date().toISOString(),
        ...entry,
      };
      entries.push(record);
      await writeAll(entries);
      return record;
    },

    async getAll() {
      return readAll();
    },

    async removeExpired(now = new Date()) {
      const entries = await readAll();
      const active = entries.filter((entry) => {
        if (!entry.opens_at_utc) return true;
        const opensAt = new Date(entry.opens_at_utc);
        return Number.isNaN(opensAt.getTime()) || opensAt > now;
      });

      if (active.length !== entries.length) {
        await writeAll(active);
      }

      return active;
    },
  };
}
