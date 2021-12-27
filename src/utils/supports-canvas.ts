/**
 * Whether `HTMLCanvasElement` exists.
 */
export function supportsCanvas() {
  return typeof HTMLCanvasElement !== "undefined"
}

/**
 * Whether `OffscreenCanvas` exists.
 */
export function supportsOffscreenCanvas() {
  return typeof OffscreenCanvas !== "undefined"
}
