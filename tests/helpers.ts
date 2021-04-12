import { isString } from "../src/guards"
import { FontProperties, FontShorthand } from "../src/types"
import { getFontShorthand } from "../src/utils/get-font-shorthand"

type Options = FontShorthand | FontProperties

export function getTextWidth(text: string, options?: Options) {
  let font: string | undefined

  if (isString((options as FontShorthand)?.font)) {
    font = (options as FontShorthand)?.font
  } else if (options) {
    font = getFontShorthand(options as FontProperties)
  }

  const span = document.createElement("span")
  span.innerText = text
  document.body.appendChild(span)

  if (font) {
    span.style.font = font
  }

  return span.getBoundingClientRect().width
}
