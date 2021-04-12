import { PlainFunction, Unpack } from "./types"

export const isArray = Array.isArray

export function isUndefined<T>(value: T | undefined): value is undefined {
  return value === undefined
}

export function isNumber(value: number | unknown): value is number {
  return typeof value === "number"
}

export function isString(value: string | unknown): value is string {
  return typeof value === "string"
}

export function isFunction<T extends PlainFunction>(
  value: T | unknown
): value is PlainFunction<Unpack<Parameters<T>>, ReturnType<T>> {
  return value instanceof Function
}

export function isCanvas<T extends HTMLCanvasElement | OffscreenCanvas>(
  value: T | unknown
): value is T {
  return isFunction((value as HTMLCanvasElement | OffscreenCanvas)?.getContext)
}

export function isOffscreenCanvas(
  value: HTMLCanvasElement | OffscreenCanvas | unknown
): value is OffscreenCanvas {
  return isFunction((value as OffscreenCanvas)?.transferToImageBitmap)
}
