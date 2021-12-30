/**
 * Whether the value is not undefined or null.
 *
 * @param value - The value to check.
 */
export function isSomething<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null
}

/**
 * Whether the value is a number.
 *
 * @param value - The value to check.
 */
export function isNumber(value: number | unknown): value is number {
  return typeof value === "number"
}
