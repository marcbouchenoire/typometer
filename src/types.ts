export type Unpack<T> = T extends (infer U)[] ? U : T

export type PlainObject<T = unknown> = Record<string, T>

export type PlainFunction<P = any, R = any> = (...args: P[]) => R

export type Mutable<T> = { -readonly [P in keyof T]: T[P] }

export type Font = FontProperties | Pick<CSSStyleDeclaration, "font"> | string

export interface FontProperties {
  fontFamily: string
  fontSize: number
  fontStretch?: string
  fontStyle?: string
  fontVariant?: string
  fontWeight?: number | string
  lineHeight?: number
}
