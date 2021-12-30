/**
 * Whether the current environment is a browser.
 */
export function isBrowser() {
  return typeof window !== "undefined"
}
