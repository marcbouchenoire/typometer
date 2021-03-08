import greenlet from "@bouchenoiremarc/greenlet"
import { isArray, isOffscreenCanvas, isUndefined } from "./guards"
import { createCanvas } from "./utils/create-canvas"

let canvas: HTMLCanvasElement | OffscreenCanvas | null

function getCanvas() {
  if (isUndefined(canvas)) {
    canvas = createCanvas(1, 1)
  }

  return canvas as HTMLCanvasElement | OffscreenCanvas
}

const measureTextOffscreen = greenlet(
  async (canvas: OffscreenCanvas, text: string) => {
    const context = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D

    return context.measureText(text)
  }
)

const measureText = async (
  canvas: OffscreenCanvas | HTMLCanvasElement,
  text: string
) => {
  if (isOffscreenCanvas(canvas)) {
    return await measureTextOffscreen(canvas, text)
  } else {
    const context = canvas.getContext("2d") as
      | OffscreenCanvasRenderingContext2D
      | CanvasRenderingContext2D

    return context.measureText(text)
  }
}

export async function getTextMetrics(text: string): Promise<TextMetrics>
export async function getTextMetrics(text: string[]): Promise<TextMetrics[]>
export async function getTextMetrics(
  text: string | string[]
): Promise<TextMetrics | TextMetrics[]> {
  const canvas = getCanvas()
  let metrics: TextMetrics | TextMetrics[]

  if (isArray(text)) {
    metrics = []

    for (const content of text) {
      metrics.push(await measureText(canvas, content))
    }
  } else {
    metrics = await measureText(canvas, text)
  }

  return metrics
}
