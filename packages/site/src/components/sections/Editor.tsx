import { Root as Label } from "@radix-ui/react-label"
import { clsx } from "clsx"
import type { Transition } from "framer-motion"
import { motion } from "framer-motion"
import debounce from "just-debounce-it"
import type { ChangeEvent, ComponentProps, ReactNode } from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { Font, SerializedTextMetrics } from "typometer"
import { typometer } from "typometer"
import { useKey } from "../../hooks/use-key"
import { SegmentedControl } from "../controls/SegmentedControl"
import { Select } from "../controls/Select"
import { Slider } from "../controls/Slider"

interface MetricsProps extends ComponentProps<"pre"> {
  /**
   * The serialized `TextMetrics` object to display.
   */
  metrics?: SerializedTextMetrics
}

interface Properties {
  /**
   * Select a generic font family.
   */
  family: "cursive" | "monospace" | "sans-serif" | "serif"

  /**
   * Set the size of the font.
   */
  size: number

  /**
   * Select a normal or italic face from the font.
   */
  style: "italic" | "normal"

  /**
   * Set the weight of the font.
   */
  weight: number
}

interface Weight {
  /**
   * The weight's common name.
   */
  name: string

  /**
   * The weight's numbered value.
   */
  value: number
}

const weights: Weight[] = [
  { name: "Ultralight", value: 100 },
  { name: "Thin", value: 200 },
  { name: "Light", value: 300 },
  { name: "Regular", value: 400 },
  { name: "Medium", value: 500 },
  { name: "Semibold", value: 600 },
  { name: "Bold", value: 700 },
  { name: "Heavy", value: 800 },
  { name: "Black", value: 900 }
]

const weightOptions = weights.map((weight) => (
  <option key={weight.value} value={weight.value}>
    {weight.name}
  </option>
))

const defaultMetrics: SerializedTextMetrics = {
  actualBoundingBoxAscent: 0,
  actualBoundingBoxDescent: 0,
  actualBoundingBoxLeft: 0,
  actualBoundingBoxRight: 0,
  fontBoundingBoxAscent: 0,
  fontBoundingBoxDescent: 0,
  width: 0
}

const arrowTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 60
}

/**
 * Display an highlighted `TextMetrics` object.
 *
 * @param props - A set of `pre` props.
 * @param props.metrics - The serialized `TextMetrics` object to display.
 * @param [props.className] - A list of one or more classes.
 */
function Metrics({ metrics, className, ...props }: MetricsProps) {
  const entries = useMemo(() => {
    const entries = metrics ? Object.entries(metrics) : []

    return entries.sort(([a], [b]) => a.localeCompare(b))
  }, [metrics])

  return (
    <pre
      className={clsx(
        className,
        "language-json scrollbar metrics overflow-x-auto text-sm"
      )}
      {...props}
    >
      <code>
        <span className="code-line">
          <span className="token punctuation">{"{"}</span>
          {"\n"}
        </span>
        {entries.map(([property, value], index) => {
          const isLast = index === entries.length - 1

          return (
            <span className="code-line" key={index}>
              {"  "}
              <span className="token property">&quot;{property}&quot;</span>
              <span className="token operator">:</span>{" "}
              <span className="token number">{value}</span>
              {!isLast && <span className="token punctuation">,</span>}
              {"\n"}
            </span>
          )
        })}
        <span className="code-line">
          <span className="token punctuation">{"}"}</span>
        </span>
      </code>
    </pre>
  )
}

/**
 * An interactive section to explore text metrics.
 *
 * @param props - A set of `section` props.
 */
export function Editor(props: ComponentProps<"section">) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [key, setKey] = useState(0)
  const [value, setValue] = useState("")
  const [duration, setDuration] = useState<ReactNode>("0")
  const [metrics, setMetrics] = useState(defaultMetrics)
  const [{ family, size, weight, style }, setProperties] = useState<Properties>(
    () => ({
      family: "sans-serif",
      size: 16,
      weight: 400,
      style: "normal"
    })
  )

  const handleShortcutKey = useCallback((event: KeyboardEvent) => {
    if (document.activeElement !== inputRef?.current) {
      event?.preventDefault()
    }

    inputRef?.current?.focus()
  }, [])

  const handleMeasureClick = useCallback(() => {
    setKey((key) => key + 1)
  }, [])

  const handleValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    },
    []
  )

  const handleFamilyChange = useCallback((value: string) => {
    if (value) {
      setProperties((properties) => ({
        ...properties,
        family: value as Properties["family"]
      }))
    }
  }, [])

  const handleSizeChange = useCallback((value: number) => {
    setProperties((properties) => ({
      ...properties,
      size: value
    }))
  }, [])

  const handleWeightChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setProperties((properties) => ({
        ...properties,
        weight: Number(event.target.value)
      }))
    },
    []
  )

  const handleStyleChange = useCallback((value: string) => {
    if (value) {
      setProperties((properties) => ({
        ...properties,
        style: value as Properties["style"]
      }))
    }
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const measure = useCallback(
    debounce((value: string, font: Font) => {
      const date = performance.now()

      typometer(value, font).then((metrics) => {
        const duration = performance.now() - date
        const formattedDuration =
          duration <= 1 ? (
            <>
              <span className="text-primary-500/60 dark:text-primary-400/50">
                ≤
              </span>{" "}
              1
            </>
          ) : (
            <>
              <span className="text-primary-500/60 dark:text-primary-400/50">
                ≈
              </span>{" "}
              {Math.round(duration)}
            </>
          )

        setDuration(formattedDuration)
        setMetrics(metrics)
      })
    }, 100),
    []
  )

  useEffect(() => {
    measure(value, {
      fontFamily: family,
      fontSize: size,
      fontWeight: weight,
      fontStyle: style
    })
  }, [measure, key, value, family, size, weight, style])

  useKey("/", handleShortcutKey)

  return (
    <section {...props}>
      <div className="border-zinc-150 flex flex-col rounded-lg border dark:border-zinc-800 sm:flex-row">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-zinc-150 relative h-12 border-b dark:border-zinc-800">
            <input
              aria-label="Input (Press / to focus)"
              className="focusable h-full w-full appearance-none truncate rounded-t-lg bg-transparent px-4 pr-12 text-sm font-medium text-zinc-700 transition placeholder:text-zinc-700/50 dark:text-zinc-100 dark:placeholder:text-zinc-100/50 sm:rounded-tr-none"
              onChange={handleValueChange}
              placeholder="Type anything to measure it…"
              ref={inputRef}
              value={value}
            />
            <kbd className="dark:text-zinc-450 pointer-events-none absolute top-3.5 right-3.5 flex h-5 w-5 select-none items-center justify-center rounded-[0.2rem] bg-zinc-500/10 text-xs font-medium leading-none text-zinc-400 dark:bg-zinc-300/10">
              /
            </kbd>
          </div>
          <div className="relative min-w-0 flex-1">
            <button
              className="hover:bg-primary-500/20 dark:hover:bg-primary-400/30 focusable text-primary-500 bg-primary-500/10 dark:bg-primary-400/20 dark:text-primary-400 absolute right-5 bottom-5 flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-md px-2.5 pr-2 text-sm font-medium backdrop-blur-md transition sm:right-6 sm:bottom-6"
              onClick={handleMeasureClick}
            >
              <span className="tabular-nums">
                {duration}
                <span className="text-primary-500/60 dark:text-primary-400/50">
                  ms
                </span>
              </span>
              <motion.svg
                animate={{ rotate: key * 360 }}
                className="flex-none opacity-30 dark:opacity-50"
                height="20"
                role="presentation"
                transition={arrowTransition}
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 10a5 5 0 0 1 9-3h-2a1 1 0 1 0 0 2h4a1 1 0 0 0 1-1V4a1 1 0 1 0-2 0v1.101a7 7 0 1 0 1.063 8.4 1 1 0 1 0-1.731-1.002A5 5 0 0 1 5 10Z"
                  fill="currentColor"
                />
              </motion.svg>
            </button>
            <Metrics className="h-full flex-1 p-5 sm:p-6" metrics={metrics} />
          </div>
        </div>
        <div className="border-zinc-150 flex w-full flex-none flex-col gap-5 border-t p-5 dark:border-zinc-800 sm:w-64 sm:border-t-0 sm:border-l sm:p-6 md:w-80">
          <Label className="flex cursor-pointer flex-col" htmlFor="font-size">
            <div className="mb-2 flex items-center">
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                Size
              </span>
              <span className="text-2xs ml-auto">
                <code className="text-zinc-600 dark:text-zinc-300">
                  {size}px
                </code>
              </span>
            </div>
            <Slider
              id="font-size"
              max={64}
              min={8}
              onValueChange={handleSizeChange}
              step={1}
              value={size}
            />
          </Label>
          <Label className="flex cursor-pointer flex-col" htmlFor="font-weight">
            <div className="mb-2 flex items-center">
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                Weight
              </span>
              <span className="text-2xs ml-auto">
                <code className="text-zinc-600 dark:text-zinc-300">
                  {weight}
                </code>
              </span>
            </div>
            <Select
              className="w-full"
              selectProps={{
                id: "font-weight",
                children: weightOptions,
                onChange: handleWeightChange,
                value: weight
              }}
            />
          </Label>
          <Label className="flex cursor-pointer flex-col" htmlFor="font-family">
            <div className="mb-2 flex items-center">
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                Family
              </span>
              <span className="text-2xs ml-auto">
                <code className="text-zinc-600 dark:text-zinc-300">
                  &quot;{family}&quot;
                </code>
              </span>
            </div>
            <SegmentedControl
              className="w-full"
              id="font-family"
              labels={[
                <span className="font-sans" key="sans-serif">
                  Aa
                </span>,
                <span className="font-serif" key="serif">
                  Aa
                </span>,
                <span className="font-mono" key="monospace">
                  Aa
                </span>,
                <span className="font-cursive" key="cursive">
                  Aa
                </span>
              ]}
              onValueChange={handleFamilyChange}
              options={["sans-serif", "serif", "monospace", "cursive"]}
              value={family}
            />
          </Label>
          <Label className="flex cursor-pointer flex-col" htmlFor="font-style">
            <div className="mb-2 flex items-center">
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                Style
              </span>
              <span className="text-2xs ml-auto">
                <code className="text-zinc-600 dark:text-zinc-300">
                  &quot;{style}&quot;
                </code>
              </span>
            </div>
            <SegmentedControl
              className="w-full"
              id="font-style"
              labels={[
                <span key="normal">Normal</span>,
                <span className="italic" key="italic">
                  Italic
                </span>
              ]}
              onValueChange={handleStyleChange}
              options={["normal", "italic"]}
              value={style}
            />
          </Label>
        </div>
      </div>
    </section>
  )
}
