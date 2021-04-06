import greenlet from "@bouchenoiremarc/greenlet"
import { isArray, isOffscreenCanvas, isUndefined } from "./guards"
import { FontProperties } from "./types"
import { createCanvas } from "./utils/create-canvas"
import { getFontShorthand } from "./utils/get-font-shorthand"

let canvas: HTMLCanvasElement | OffscreenCanvas | null

function getCanvas() {
  if (isUndefined(canvas)) {
    canvas = createCanvas(1, 1)
  }

  return canvas as HTMLCanvasElement | OffscreenCanvas
}

const measureTextOffscreen = greenlet(
  async (canvas: OffscreenCanvas, text: string, font?: string) => {
    const context = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D

    if (font) {
      context.font = font
    }

    return context.measureText(text)
  }
)

const measureText = async (
  canvas: OffscreenCanvas | HTMLCanvasElement,
  text: string,
  options?: FontProperties
) => {
  const font = options ? getFontShorthand(options) : undefined

  if (isOffscreenCanvas(canvas)) {
    return await measureTextOffscreen(canvas, text, font)
  } else {
    const context = canvas.getContext("2d") as
      | OffscreenCanvasRenderingContext2D
      | CanvasRenderingContext2D

    if (font) {
      context.font = font
    }

    return context.measureText(text)
  }
}

export async function getTextMetrics(
  text: string,
  options?: FontProperties
): Promise<TextMetrics>
export async function getTextMetrics(
  text: string[],
  options?: FontProperties
): Promise<TextMetrics[]>
export async function getTextMetrics(
  text: string | string[],
  options?: FontProperties
): Promise<TextMetrics | TextMetrics[]> {
  const canvas = getCanvas()
  let metrics: TextMetrics | TextMetrics[]

  if (isArray(text)) {
    metrics = []

    for (const content of text) {
      metrics.push(await measureText(canvas, content, options))
    }
  } else {
    metrics = await measureText(canvas, text, options)
  }

  return metrics
}
