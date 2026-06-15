import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { findConflictingEntry, isEntryActive } from './object-type.js';

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
    async addEntry(entry, now = new Date()) {
      const entries = await readAll();
      const activeEntries = entries.filter((item) => isEntryActive(item, now));
      const conflict = findConflictingEntry(activeEntries, entry);

      if (conflict) {
        return { added: false, conflict };
      }

      const record = {
        id: randomUUID(),
        created_at: new Date().toISOString(),
        ...entry,
      };
      entries.push(record);
      await writeAll(entries);
      return { added: true, record };
    },

    async getAll() {
      return readAll();
    },

    async removeExpired(now = new Date()) {
      const entries = await readAll();
      const active = entries.filter((entry) => isEntryActive(entry, now));

      if (active.length !== entries.length) {
        await writeAll(active);
      }

      return active;
    },

    async removeById(id) {
      const normalized = String(id).trim().toLowerCase();
      if (!normalized) {
        return { removed: false, reason: 'not_found' };
      }

      const entries = await readAll();
      const exact = entries.find((entry) => entry.id.toLowerCase() === normalized);
      if (exact) {
        const remaining = entries.filter((entry) => entry.id !== exact.id);
        await writeAll(remaining);
        return { removed: true, record: exact };
      }

      const prefixMatches = entries.filter((entry) => entry.id.toLowerCase().startsWith(normalized));
      if (prefixMatches.length === 1) {
        const [record] = prefixMatches;
        const remaining = entries.filter((entry) => entry.id !== record.id);
        await writeAll(remaining);
        return { removed: true, record };
      }

      if (prefixMatches.length > 1) {
        return { removed: false, reason: 'ambiguous', matches: prefixMatches };
      }

      return { removed: false, reason: 'not_found' };
    },

    async clearAll() {
      const entries = await readAll();
      await writeAll([]);
      return { count: entries.length };
    },
  };
}
