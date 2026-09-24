/** Generate collision-resistant client identifiers for records created before persistence. */
export function createId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}
