export function supportsCanvas() {
  try {
    return !!document.createElement("canvas").getContext
  } catch {
    return false
  }
}

export function supportsOffscreenCanvas() {
  return "OffscreenCanvas" in self
}
