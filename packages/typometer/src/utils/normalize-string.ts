/**
 * Remove line breaks from a string.
 *
 * @param string - The string to normalize.
 */
export function normalizeString(string: string) {
  return string.replace(/\r?\n|\r/gm, "").trim()
}
