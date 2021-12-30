import { useId } from "@radix-ui/react-id"
import {
  Item,
  Root,
  ToggleGroupSingleProps
} from "@radix-ui/react-toggle-group"
import clsx from "clsx"
import { LayoutGroup, motion } from "framer-motion"
import { ReactChild, forwardRef } from "react"
import { springy } from "../../transitions"

export interface SegmentedControlProps
  extends Omit<ToggleGroupSingleProps, "type"> {
  /**
   * A list of option labels.
   */
  labels?: ReactChild[]

  /**
   * A list of option values.
   */
  options: string[]
}

/**
 * A set of two or more mutually exclusive segments.
 *
 * @param props - A set of props.
 * @param props.options - A list of option values.
 * @param [props.labels] - A list of option labels.
 * @param [props.value] - The default value.
 * @param [props.className] - A list of one or more classes.
 * @param [props.id] - A unique identifier.
 */
export const SegmentedControl = forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(({ options, labels = [], value, className, id, ...props }, ref) => {
  const layoutId = useId(id)

  return (
    <LayoutGroup id={layoutId}>
      <Root
        className={clsx(
          className,
          "grid grid-flow-col auto-cols-fr gap-x-[4px] h-9 text-zinc-500 bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors hover:bg-zinc-150 dark:bg-zinc-750 dark:text-zinc-350"
        )}
        id={id}
        {...props}
        ref={ref}
        type="single"
      >
        {options.map((option, index, options) => {
          const isActive = option === value
          const isAfterActive = options[index - 1] === value

          return (
            <Item
              className={clsx(
                "flex first-of-type:before:hidden relative before:absolute before:left-[-3px] justify-center items-center px-3 before:w-[2px] before:h-1/2 text-sm font-medium before:bg-current rounded-lg before:rounded-full before:opacity-20 transition before:transition-opacity focusable",
                {
                  "text-primary-500 dark:text-primary-400": isActive,
                  "before:opacity-0": isActive || isAfterActive
                }
              )}
              key={index}
              title={option}
              value={option}
            >
              <span className="relative z-20">{labels[index] ?? option}</span>
              {isActive && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0.5 z-10 bg-white dark:bg-zinc-600 rounded-md shadow"
                  layoutId="background"
                  transition={springy}
                />
              )}
            </Item>
          )
        })}
      </Root>
    </LayoutGroup>
  )
})
