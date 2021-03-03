export type Unpack<T> = T extends (infer U)[] ? U : T

export type PlainObject<T = unknown> = Record<string, T>

export type PlainFunction<P = any, R = any> = (...args: P[]) => R
