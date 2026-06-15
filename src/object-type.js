const OBJECT_TYPES = ['vein', 'vortex', 'core'];

const TYPE_KEYWORDS = {
  vein: ['жил', 'vein', 'ader', 'filon', 'żył', 'zył', 'veta', 'veia'],
  vortex: ['ураган', 'вихрть','vortex', 'wirbel', 'tourbillon', 'tornado'],
  core: ['ядр', 'аномалия','core', 'kern', 'noyau', 'núcleo', 'nucleo', 'rdzeń', 'rdzen'],
};

export function getObjectType(objectName) {
  const normalized = String(objectName).toLowerCase();
  for (const type of OBJECT_TYPES) {
    if (TYPE_KEYWORDS[type].some((keyword) => normalized.includes(keyword))) {
      return type;
    }
  }
  return null;
}

export function normalizeLocation(location) {
  return String(location).trim().toLowerCase().replace(/\s+/g, ' ');
}

export function isEntryActive(entry, now = new Date()) {
  if (!entry.opens_at_utc) return true;
  const opensAt = new Date(entry.opens_at_utc);
  return Number.isNaN(opensAt.getTime()) || opensAt > now;
}

export function findConflictingEntry(activeEntries, { object_name, location }) {
  const newType = getObjectType(object_name);
  if (!newType) return null;

  const normalizedLocation = normalizeLocation(location);
  return (
    activeEntries.find(
      (entry) =>
        getObjectType(entry.object_name) === newType
        && normalizeLocation(entry.location) === normalizedLocation,
    ) ?? null
  );
}
