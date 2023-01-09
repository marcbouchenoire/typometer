import { isNumber } from "../guards"
import type { SerializedTextMetrics } from "../types"

/**
 * Serialize a `TextMetrics` object into a plain one.
 *
 * @param metrics - The `TextMetrics` object to serialize.
 */
export function serializeTextMetrics(metrics: TextMetrics) {
  const plainMetrics = {} as SerializedTextMetrics

  for (const property of Object.getOwnPropertyNames(
    Object.getPrototypeOf(metrics)
  ) as (keyof TextMetrics)[]) {
    const value = metrics[property]

    if (isNumber(value)) {
      plainMetrics[property] = value
    }
  }

  return plainMetrics
}
