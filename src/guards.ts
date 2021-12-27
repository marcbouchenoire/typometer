import { PlainFunction, Unpack } from "./types"

/**
 * Whether the value is an array.
 *
 * @param value - The value to check.
 */
export const isArray = Array.isArray

/**
 * Whether the value is undefined.
 *
 * @param value - The value to check.
 */
export function isUndefined<T>(value: T | undefined): value is undefined {
  return value === undefined
}

/**
 * Whether the value is a number.
 *
 * @param value - The value to check.
 */
export function isNumber(value: number | unknown): value is number {
  return typeof value === "number"
}

/**
 * Whether the value is a string.
 *
 * @param value - The value to check.
 */
export function isString(value: string | unknown): value is string {
  return typeof value === "string"
}

/**
 * Whether the value is a function.
 *
 * @param value - The value to check.
 */
export function isFunction<T extends PlainFunction>(
  value: T | unknown
): value is PlainFunction<Unpack<Parameters<T>>, ReturnType<T>> {
  return value instanceof Function
}

/**
 * Whether the value is a `CSSStyleDeclaration`.
 *
 * @param value - The value to check.
 */
export function isCSSStyleDeclaration(
  value: CSSStyleDeclaration | unknown
): value is CSSStyleDeclaration {
  return value instanceof CSSStyleDeclaration
}
