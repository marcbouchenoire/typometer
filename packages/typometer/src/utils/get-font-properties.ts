import { FontProperties } from "../types"

const DEFAULT_FONT_SIZE_UNIT = "px"

/**
 * Merge a font size and an optional line height into a shorthand declaration.
 *
 * @param fontSize - The font size to merge.
 * @param lineHeight - The line height to merge.
 */
function getFontSizeWithLineHeight(fontSize: number, lineHeight?: number) {
  const fontSizeWithUnit = `${fontSize}${DEFAULT_FONT_SIZE_UNIT}`

  return lineHeight ? `${fontSizeWithUnit}/${lineHeight}` : fontSizeWithUnit
}

/**
 * Create a `font` string from font properties.
 *
 * @param properties - The properties to create a `font` string from.
 * @param properties.fontFamily - A list of one or more font family names.
 * @param properties.fontSize - Set the size of the font.
 * @param [properties.fontStretch] - Select a normal, condensed, or expanded face from the font.
 * @param [properties.fontStyle] - Select a normal, italic, or oblique face from the font.
 * @param [properties.fontVariant] - Select variants from the font.
 * @param [properties.fontWeight] - Set the weight of the font.
 * @param [properties.lineHeight] - Define how tall a line of text should be.
 */
export function getFontProperties({
  fontFamily,
  fontSize,
  fontStretch,
  fontStyle,
  fontVariant,
  fontWeight,
  lineHeight
}: FontProperties) {
  if (!fontSize || !fontFamily) return

  const font = [
    fontStyle,
    fontVariant,
    fontWeight,
    fontStretch,
    getFontSizeWithLineHeight(fontSize, lineHeight),
    fontFamily
  ].filter((property) => property)

  return font.join(" ")
}
