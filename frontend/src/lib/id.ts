/** Generate collision-resistant identifiers for browser-local demo records. */
export function createId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}
