export type Unpack<T> = T extends (infer U)[] ? U : T

export type PlainObject<T = unknown> = Record<string, T>

export type PlainFunction<P = any, R = any> = (...args: P[]) => R

export type Mutable<T> = { -readonly [P in keyof T]: T[P] }

export type SerializedTextMetrics = Mutable<TextMetrics>

export type Font = FontProperties | Pick<CSSStyleDeclaration, "font"> | string

export interface FontProperties {
  /**
   * A list of one or more font family names.
   */
  fontFamily: string

  /**
   * Set the size of the font.
   */
  fontSize: number

  /**
   * Select a normal, condensed, or expanded face from the font.
   */
  fontStretch?: string

  /**
   * Select a normal, italic, or oblique face from the font.
   */
  fontStyle?: string

  /**
   * Select variants from the font.
   */
  fontVariant?: string

  /**
   * Set the weight of the font.
   */
  fontWeight?: number | string

  /**
   * Define how tall a line of text should be.
   */
  lineHeight?: number
}
