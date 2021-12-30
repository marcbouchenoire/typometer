import {
  SliderProps as DefaultSliderProps,
  Range,
  Root,
  Thumb,
  Track
} from "@radix-ui/react-slider"
import clsx from "clsx"
import { forwardRef, useCallback, useMemo } from "react"
import { isNumber } from "../../guards"

export interface SliderProps
  extends Omit<DefaultSliderProps, "defaultValue" | "onValueChange" | "value"> {
  /**
   * The value of the slider when initially rendered.
   */
  defaultValue?: number

  /**
   * A function invoked when the value changes.
   */
  onValueChange?(value: number): void

  /**
   * The controlled value of the slider.
   */
  value?: number
}

/**
 * A slider component.
 *
 * @param [props] - A set of props.
 * @param [props.value] - The controlled value of the slider.
 * @param [props.defaultValue] - The value of the slider when initially rendered.
 * @param [props.onValueChange] - A function invoked when the value changes.
 * @param [props.className] - A list of one or more classes.
 * @param [props.id] - A unique identifier.
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  ({ value, defaultValue, onValueChange, className, id, ...props }, ref) => {
    const values = useMemo(
      () => (isNumber(value) ? [value] : undefined),
      [value]
    )
    const defaultValues = useMemo(
      () => (isNumber(defaultValue) ? [defaultValue] : undefined),
      [defaultValue]
    )

    const handleValueChange = useCallback(
      ([value]: number[]) => {
        onValueChange?.(value)
      },
      [onValueChange]
    )

    return (
      <Root
        className={clsx(
          className,
          "group flex relative items-center h-5 select-none"
        )}
        defaultValue={defaultValues}
        onValueChange={handleValueChange}
        value={values}
        {...props}
        ref={ref}
      >
        <Track className="relative grow h-1 group-hover:bg-zinc-200 dark:bg-zinc-700 dark:group-hover:bg-zinc-600 rounded-full transition bg-zinc-150">
          <Range className="absolute h-full rounded-full bg-primary-500 dark:bg-primary-400" />
        </Track>
        <Thumb
          className="block w-5 h-5 bg-white rounded-full transition shadow-slider focusable"
          id={id}
        />
      </Root>
    )
  }
)
