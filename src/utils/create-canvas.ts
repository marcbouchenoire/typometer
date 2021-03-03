import { isCanvas, isNumber } from "../guards"
import { isBrowser } from "./is-browser"
import { supportsOffscreenCanvas } from "./supports-offscreen-canvas"

const DEFAULT_WIDTH = 300
const DEFAULT_HEIGHT = 150

export function createCanvas(width?: number, height?: number) {
  let canvas: HTMLCanvasElement | OffscreenCanvas | null = null

  if (isBrowser()) {
    canvas = supportsOffscreenCanvas()
      ? new OffscreenCanvas(DEFAULT_WIDTH, DEFAULT_HEIGHT)
      : document.createElement("canvas")
  }

  if (isCanvas(canvas)) {
    if (isNumber(width)) {
      canvas.width = width
    }

    if (isNumber(height)) {
      canvas.height = height
    }
  }

  return canvas
}
