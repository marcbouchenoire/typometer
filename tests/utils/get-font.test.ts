import { getFont } from "../../src/utils/get-font"

const FONT_FAMILY = "sans-serif"
const FONT_SIZE = 12
const FONT_STRETCH = "condensed"
const FONT_STYLE = "italic"
const FONT_VARIANT = "small-caps"
const FONT_WEIGHT = 500
const LINE_HEIGHT = 2

describe("getFont", () => {
  test("should combine font properties into a font", () => {
    const font = getFont({
      fontFamily: FONT_FAMILY,
      fontSize: FONT_SIZE,
      fontStretch: FONT_STRETCH,
      fontStyle: FONT_STYLE,
      fontVariant: FONT_VARIANT,
      fontWeight: FONT_WEIGHT,
      lineHeight: LINE_HEIGHT
    })

    const paragraph = document.createElement("p")
    const style = getComputedStyle(paragraph)
    document.body.appendChild(paragraph)

    if (font) {
      paragraph.style.font = font
    }

    expect(style.getPropertyValue("font-family")).toBe(FONT_FAMILY)
    expect(style.getPropertyValue("font-size")).toBe(`${FONT_SIZE}px`)
    expect(style.getPropertyValue("font-stretch")).toBe("75%")
    expect(style.getPropertyValue("font-style")).toBe(FONT_STYLE)
    expect(style.getPropertyValue("font-variant")).toBe(FONT_VARIANT)
    expect(style.getPropertyValue("font-weight")).toBe(`${FONT_WEIGHT}`)
    expect(style.getPropertyValue("line-height")).toBe(
      `${FONT_SIZE * LINE_HEIGHT}px`
    )
  })
})
