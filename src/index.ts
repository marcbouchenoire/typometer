import { isArray } from "./guards"
import { measureText } from "./measure-text"
import { Font } from "./types"

export async function measure(text: string, font?: Font): Promise<TextMetrics>
export async function measure(
  text: string[],
  font?: Font
): Promise<TextMetrics[]>
export async function measure(
  text: string[] | string,
  font?: Font
): Promise<TextMetrics | TextMetrics[]> {
  let metrics: TextMetrics | TextMetrics[]

  if (isArray(text)) {
    metrics = []

    for (const content of text) {
      metrics.push(await measureText(content, font))
    }
  } else {
    metrics = await measureText(text, font)
  }

  return metrics
}

export type { Font, FontProperties } from "./types"
