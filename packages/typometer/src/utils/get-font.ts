import { isCSSStyleDeclaration, isString } from "../guards"
import type { Font, FontProperties } from "../types"
import { getFontProperties } from "./get-font-properties"

/**
 * Create a `font` string from properties, an existing `font` string, or a `CSSStyleDeclaration`.
 *
 * @param [font] - The properties, `font` string, or `CSSStyleDeclaration` to generate a `font` string from.
 */
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
