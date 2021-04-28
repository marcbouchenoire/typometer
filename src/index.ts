import greenlet from "@bouchenoiremarc/greenlet"
import { isArray, isOffscreenCanvas, isString, isUndefined } from "./guards"
import { FontShorthand, FontProperties } from "./types"
import { createCanvas } from "./utils/create-canvas"
import { getFontShorthand } from "./utils/get-font-shorthand"

type Options = FontShorthand | FontProperties

let canvas: HTMLCanvasElement | OffscreenCanvas | null

function getCanvas() {
  if (isUndefined(canvas)) {
    canvas = createCanvas()
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

async function measureText(
  canvas: OffscreenCanvas | HTMLCanvasElement,
  text: string,
  options?: Options
) {
  let font: string | undefined

  if (isString((options as FontShorthand)?.font)) {
    font = (options as FontShorthand)?.font
  } else if (options) {
    font = getFontShorthand(options as FontProperties)
  }

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
  options?: Options
): Promise<TextMetrics>
export async function getTextMetrics(
  text: string[],
  options?: Options
): Promise<TextMetrics[]>
export async function getTextMetrics(
  text: string | string[],
  options?: Options
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
