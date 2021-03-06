import greenlet from "@bouchenoiremarc/greenlet"
import { isOffscreenCanvas, isUndefined } from "./guards"
import { createCanvas } from "./utils/create-canvas"

let canvas: HTMLCanvasElement | OffscreenCanvas | null

function getCanvas() {
  if (isUndefined(canvas)) {
    canvas = createCanvas(1, 1)
  }

  return canvas as HTMLCanvasElement | OffscreenCanvas
}

const measureText = async (
  canvas: OffscreenCanvas | HTMLCanvasElement,
  text: string
) => {
  const context = canvas.getContext("2d") as
    | OffscreenCanvasRenderingContext2D
    | CanvasRenderingContext2D

  return context.measureText(text)
}

const measureTextOffscreen = greenlet(
  async (canvas: OffscreenCanvas, text: string) => {
    const context = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D

    return context.measureText(text)
  }
)

export async function getTextMetrics(text: string): Promise<TextMetrics> {
  const canvas = getCanvas()
  let metrics: TextMetrics

  if (isOffscreenCanvas(canvas)) {
    metrics = await measureTextOffscreen(canvas, text)
  } else {
    metrics = await measureText(canvas, text)
  }

  return metrics
}
