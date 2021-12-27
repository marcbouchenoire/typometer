import { isArray } from "./guards"
import { measureText } from "./measure-text"
import { Font } from "./types"

/**.
 * Measure text using the Canvas API.
 *
 * @param text - The text to measure, as a single string or an array of different strings.
 * @param [font] - The font properties to set.
 * @returns A promise fulfilling into text metrics.
 *
 * @example
 *
 * ```js
 * const metrics = await typometer("With impressions chosen from another time.")
 *
 * // metrics: TextMetrics
 * ```
 */
export async function typometer(text: string, font?: Font): Promise<TextMetrics>
export async function typometer(
  text: string[],
  font?: Font
): Promise<TextMetrics[]>
export async function typometer(
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

export { typometer as measure }

export type { Font, FontProperties } from "./types"
