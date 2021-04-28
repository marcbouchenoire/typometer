import { isString } from "../src/guards"
import { FontProperties } from "../src/types"
import { getFont } from "../src/utils/get-font"

type Options = string | FontProperties

export function getTextWidth(text: string, options?: Options) {
  let font: string | undefined

  if (isString(options)) {
    font = options
  } else if (options) {
    font = getFont(options as FontProperties)
  }

  const element = document.createElement("span")
  element.innerText = text
  document.body.appendChild(element)

  if (font) {
    element.style.font = font
  }

  return element.getBoundingClientRect().width
}
