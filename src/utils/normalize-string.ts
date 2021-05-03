export function normalizeString(string: string) {
  return string.replace(/\r?\n|\r/gm, "").trim()
}
