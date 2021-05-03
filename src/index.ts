import greenlet from "@bouchenoiremarc/greenlet"
import {
  isArray,
  isCSSStyleDeclaration,
  isOffscreenCanvas,
  isString,
  isUndefined
} from "./guards"
import { FontProperties, Mutable } from "./types"
import { createCanvas } from "./utils/create-canvas"
import { getFont } from "./utils/get-font"

type Options = string | CSSStyleDeclaration | FontProperties

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
  options?: Options
) {
  let font: string | undefined

  if (isCSSStyleDeclaration(options as CSSStyleDeclaration)) {
    font = (options as CSSStyleDeclaration).getPropertyValue("font")
  } else if (isString(options)) {
    font = options
  } else if (options) {
    font = getFont(options as FontProperties)
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

export { FontProperties } from "./types"
