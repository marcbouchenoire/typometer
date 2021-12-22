import { PlainFunction, Unpack } from "./types"

/**
 * Return whether the value is an array.
 *
 * @param value - The value to be checked.
 */
export const isArray = Array.isArray

/**
 * Return whether the value is undefined.
 *
 * @param value - The value to be checked.
 */
export function isUndefined<T>(value: T | undefined): value is undefined {
  return value === undefined
}

/**
 * Return whether the value is a number.
 *
 * @param value - The value to be checked.
 */
export function isNumber(value: number | unknown): value is number {
  return typeof value === "number"
}

/**
 * Return whether the value is a string.
 *
 * @param value - The value to be checked.
 */
export function isString(value: string | unknown): value is string {
  return typeof value === "string"
}

/**
 * Return whether the value is a function.
 *
 * @param value - The value to be checked.
 */
export function isFunction<T extends PlainFunction>(
  value: T | unknown
): value is PlainFunction<Unpack<Parameters<T>>, ReturnType<T>> {
  return value instanceof Function
}

/**
 * Return whether the value is a CSSStyleDeclaration.
 *
 * @param value - The value to be checked.
 */
export function isCSSStyleDeclaration(
  value: CSSStyleDeclaration | unknown
): value is CSSStyleDeclaration {
  return value instanceof CSSStyleDeclaration
}
