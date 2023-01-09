import type { Font } from "../src"
import { getFont } from "../src/utils/get-font"

/**
 * Check if two values are almost equal.
 *
 * @param a - The first value.
 * @param b - The second value.
 * @param [tolerance] - The tolerated difference between the two values.
 */
export function almost(a: number, b: number, tolerance = Number.EPSILON) {
  return tolerance === 0 ? a === b : Math.abs(a - b) < tolerance
}

/**
 * Disable or replace a property from an object.
 *
 * @param object - The object containing the property.
 * @param property - The property's name.
 * @param [replacement] - An optional replacement value.
 * @returns A function to restore the original value.
 */
export function affect<T>(
  object: T,
  property: keyof T,
  replacement: any = undefined
) {
  const origin = object[property]

  object[property] = replacement

  return () => {
    object[property] = origin
  }
}

/**
 * Measure text within the DOM.
 *
 * @param text - The text to measure.
 * @param [font] - The font properties to set.
 */
export function getComputedWidth(text: string, font?: Font) {
  const element = document.createElement("span")
  element.textContent = text
  document.body.append(element)
  element.style.font = getFont(font) ?? element.style.font

  return element.getBoundingClientRect().width
}

/**
 * Get the computed font within the DOM.
 *
 * @param [font] - The font properties to set.
 */
export function getComputedFont(font?: Font) {
  const element = document.createElement("span")
  document.body.append(element)
  element.style.font = getFont(font) ?? element.style.font

  return window.getComputedStyle(element).getPropertyValue("font")
}
