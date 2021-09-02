import { isArray, isUndefined } from "./guards"
import { Mutable, Font } from "./types"
import { createOffscreenCanvas } from "./utils/create-offscreen-canvas"
import { getFont } from "./utils/get-font"
import { normalizeString } from "./utils/normalize-string"
import { supportsOffscreenCanvas } from "./utils/supports-offscreen-canvas"

let canvas: HTMLCanvasElement

function getCanvas() {
  if (isUndefined(canvas)) {
    canvas = document.createElement("canvas")

    canvas.width = 1
    canvas.height = 1
  }

  return canvas
}

const measureTextOffscreen = createOffscreenCanvas(
  async (
    context: OffscreenCanvasRenderingContext2D,
    text: string,
    font?: string
  ) => {
    context.font = font ?? context.font
    const metrics = context.measureText(text)
    const plainMetrics = {} as Mutable<TextMetrics>

    for (const property of Object.getOwnPropertyNames(
      Object.getPrototypeOf(metrics)
    ) as (keyof TextMetrics)[]) {
      const value = metrics[property]

      if (typeof value === "number") {
        plainMetrics[property] = value
      }
    }

    return plainMetrics
  }
)

async function measureText(text: string, font?: Font): Promise<TextMetrics> {
  if (supportsOffscreenCanvas()) {
    return await measureTextOffscreen(normalizeString(text), getFont(font))
  } else {
    const canvas = getCanvas()
    const context = canvas.getContext("2d") as
      | CanvasRenderingContext2D
      | OffscreenCanvasRenderingContext2D
    context.font = getFont(font) ?? context.font

    return context.measureText(normalizeString(text))
  }
}

export async function getTextMetrics(
  text: string,
  font?: Font
): Promise<TextMetrics>
export async function getTextMetrics(
  text: string[],
  font?: Font
): Promise<TextMetrics[]>
export async function getTextMetrics(
  text: string[] | string,
  font?: Font
): Promise<TextMetrics | TextMetrics[]> {
  let metrics: TextMetrics | TextMetrics[]

  if (isArray(text)) {
    metrics = []

    for (const content of text) {
      metrics.push(await measureText(content, font))
    }
  } else {
    metrics = await measureText(text, font)
  }

  return metrics
}

export { Font, FontProperties } from "./types"
