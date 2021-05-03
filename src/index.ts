import greenlet from "@bouchenoiremarc/greenlet"
import { isArray, isOffscreenCanvas, isUndefined } from "./guards"
import { Mutable, Font } from "./types"
import { createCanvas } from "./utils/create-canvas"
import { getFont } from "./utils/get-font"

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

    const metrics = context.measureText(text)

    return (Object.getOwnPropertyNames(
      Object.getPrototypeOf(metrics)
    ) as (keyof TextMetrics)[]).reduce((plain, property) => {
      const value = metrics[property]

      if (typeof value === "number") {
        plain[property] = value
      }

      return plain
    }, {} as Mutable<TextMetrics>) as TextMetrics
  }
)

async function measureText(
  canvas: OffscreenCanvas | HTMLCanvasElement,
  text: string,
  font?: Font
) {
  if (isOffscreenCanvas(canvas)) {
    return await measureTextOffscreen(canvas, text, getFont(font))
  } else {
    const context = canvas.getContext("2d") as
      | OffscreenCanvasRenderingContext2D
      | CanvasRenderingContext2D

    context.font = getFont(font) ?? context.font

    return context.measureText(text)
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
  text: string | string[],
  font?: Font
): Promise<TextMetrics | TextMetrics[]> {
  const canvas = getCanvas()
  let metrics: TextMetrics | TextMetrics[]

  if (isArray(text)) {
    metrics = []

    for (const content of text) {
      metrics.push(await measureText(canvas, content, font))
    }
  } else {
    metrics = await measureText(canvas, text, font)
  }

  return metrics
}

export { Font, FontProperties } from "./types"
