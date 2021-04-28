import { isCanvas } from "../guards"
import { isBrowser } from "./is-browser"
import { supportsOffscreenCanvas } from "./supports-offscreen-canvas"

const CANVAS_SIZE = 1

export function createCanvas() {
  let canvas: HTMLCanvasElement | OffscreenCanvas | null = null

  if (isBrowser()) {
    canvas = supportsOffscreenCanvas()
      ? new OffscreenCanvas(CANVAS_SIZE, CANVAS_SIZE)
      : document.createElement("canvas")
  }

  if (isCanvas(canvas)) {
    canvas.width = CANVAS_SIZE
    canvas.height = CANVAS_SIZE
  }

  return canvas
}
