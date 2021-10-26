import { isNumber } from "../guards"
import { Mutable } from "../types"

export function serializeTextMetrics(metrics: TextMetrics) {
  const plainMetrics = {} as Mutable<TextMetrics>

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
