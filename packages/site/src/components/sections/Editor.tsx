import { Root as Label } from "@radix-ui/react-label"
import clsx from "clsx"
import { Transition, motion } from "framer-motion"
import debounce from "just-debounce-it"
import {
  ChangeEvent,
  ComponentProps,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"
import { Font, SerializedTextMetrics, typometer } from "typometer"
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
        "overflow-x-auto text-sm language-json metrics"
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
  const [metrics, setMetrics] = useState<SerializedTextMetrics>()
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
      <div className="flex flex-col rounded-md border dark:border-zinc-800 border-zinc-150">
        <div className="flex flex-col sm:flex-row">
          <div className="flex flex-col flex-1 min-w-0">
            <div className="relative h-12 border-b dark:border-zinc-800 border-zinc-150">
              <input
                aria-label="Input (Press / to focus)"
                className="px-4 pr-12 w-full h-full text-sm font-medium text-zinc-700 placeholder:text-zinc-700/50 dark:text-zinc-100 dark:placeholder:text-zinc-100/50 truncate bg-transparent rounded-t-md transition appearance-none sm:rounded-tr-none focusable"
                onChange={handleValueChange}
                placeholder="Type anything to measure it…"
                ref={inputRef}
                value={value}
              />
              <kbd className="flex absolute top-3.5 right-3.5 justify-center items-center w-5 h-5 text-xs font-medium leading-none text-zinc-400 bg-zinc-500/10 dark:bg-zinc-300/10 rounded-[0.2rem] pointer-events-none select-none dark:text-zinc-450">
                /
              </kbd>
            </div>
            <div className="relative flex-1 min-w-0">
              <button
                className="flex absolute right-5 bottom-5 gap-1.5 justify-center items-center px-2.5 pr-2 h-9 text-sm font-medium rounded-md backdrop-blur-md transition cursor-pointer sm:right-6 sm:bottom-6 hover:bg-primary-500/20 dark:hover:bg-primary-400/30 focusable text-primary-500 bg-primary-500/10 dark:bg-primary-400/20 dark:text-primary-400"
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
              <Metrics className="flex-1 p-5 h-full sm:p-6" metrics={metrics} />
            </div>
          </div>
          <div className="flex flex-col flex-none gap-5 p-5 w-full border-t dark:border-zinc-800 sm:p-6 sm:w-64 sm:border-t-0 sm:border-l md:w-80 border-zinc-150">
            <Label className="flex flex-col cursor-pointer" htmlFor="font-size">
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                  Size
                </span>
                <span className="ml-auto text-2xs">
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
            <Label
              className="flex flex-col cursor-pointer"
              htmlFor="font-weight"
            >
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                  Weight
                </span>
                <span className="ml-auto text-2xs">
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
            <Label
              className="flex flex-col cursor-pointer"
              htmlFor="font-family"
            >
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                  Family
                </span>
                <span className="ml-auto text-2xs">
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
            <Label
              className="flex flex-col cursor-pointer"
              htmlFor="font-style"
            >
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                  Style
                </span>
                <span className="ml-auto text-2xs">
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
      </div>
    </section>
  )
}
