import { Font } from "../src"
import { getFont } from "../src/utils/get-font"

export function getTextWidth(text: string, font?: Font) {
  const element = document.createElement("span")
  element.innerText = text
  document.body.appendChild(element)
  element.style.font = getFont(font) ?? element.style.font

  return element.getBoundingClientRect().width
}

export function getComputedFont(font?: Font) {
  const element = document.createElement("span")
  document.body.appendChild(element)
  element.style.font = getFont(font) ?? element.style.font

  return window.getComputedStyle(element).getPropertyValue("font")
}
