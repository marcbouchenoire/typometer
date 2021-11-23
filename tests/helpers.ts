import { Font } from "../src"
import { getFont } from "../src/utils/get-font"

export function almost(a: number, b: number, tolerance = Number.EPSILON) {
  return tolerance === 0 ? a === b : Math.abs(a - b) < tolerance
}

export function getTextWidth(text: string, font?: Font) {
  const element = document.createElement("span")
  element.textContent = text
  document.body.append(element)
  element.style.font = getFont(font) ?? element.style.font

  return element.getBoundingClientRect().width
}

export function getComputedFont(font?: Font) {
  const element = document.createElement("span")
  document.body.append(element)
  element.style.font = getFont(font) ?? element.style.font

  return window.getComputedStyle(element).getPropertyValue("font")
}
