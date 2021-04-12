export type Unpack<T> = T extends (infer U)[] ? U : T

export type PlainObject<T = unknown> = Record<string, T>

export type PlainFunction<P = any, R = any> = (...args: P[]) => R

export interface FontShorthand {
  font: string
}

export interface FontProperties {
  fontFamily: string
  fontSize: number
  fontStretch?: string
  fontStyle?: string
  fontVariant?: string
  fontWeight?: string | number
  lineHeight?: number
}
