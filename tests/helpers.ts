import { FontProperties } from "../src/types"
import { getFontShorthand } from "../src/utils/get-font-shorthand"

export function getTextWidth(text: string, options?: FontProperties) {
  const font = options ? getFontShorthand(options) : undefined
  const span = document.createElement("span")
  span.innerText = text
  document.body.appendChild(span)

  if (font) {
    span.style.font = font
  }

  return span.getBoundingClientRect().width
}
