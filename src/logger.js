function formatMeta(meta) {
  return Object.entries(meta)
    .filter(([, value]) => value != null)
    .map(([key, value]) => `${key}=${value}`)
    .join(' ');
}

function timestamp() {
  return new Date().toISOString();
}

export function logCommand(event, meta = {}) {
  console.log(`[${timestamp()}] command:${event} ${formatMeta(meta)}`);
}

export function logCommandError(event, error, meta = {}) {
  console.error(`[${timestamp()}] command:${event} ${formatMeta(meta)}`, error);
}
