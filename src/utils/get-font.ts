import { isCSSStyleDeclaration, isString } from "../guards"
import { Font, FontProperties } from "../types"
import { getFontProperties } from "./get-font-properties"

export function getFont(font?: Font) {
  if (isCSSStyleDeclaration(font as CSSStyleDeclaration)) {
    return (font as CSSStyleDeclaration).getPropertyValue("font")
  } else if (isString(font)) {
    return font
  } else if (font) {
    return getFontProperties(font as FontProperties)
  } else {
    return undefined
  }
}
