import {
  Item,
  Root,
  ToggleGroupSingleProps
} from "@radix-ui/react-toggle-group"
import clsx from "clsx"
import { LayoutGroup, motion } from "framer-motion"
import { ReactChild, forwardRef, useId } from "react"
import { instant, springy } from "../../transitions"

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
>(({ options, labels = [], value, className, ...props }, ref) => {
  const layoutId = useId()

  return (
    <LayoutGroup id={layoutId}>
      <Root asChild ref={ref} {...props} type="single">
        <motion.div
          className={clsx(
            className,
            "hover:bg-zinc-150 dark:bg-zinc-750 dark:text-zinc-350 grid h-9 auto-cols-fr grid-flow-col gap-x-[4px] rounded-lg bg-zinc-100 text-zinc-500 transition-colors dark:hover:bg-zinc-700"
          )}
          layoutId="root"
          transition={instant}
        >
          {options.map((option, index, options) => {
            const isActive = option === value
            const isAfterActive = options[index - 1] === value

            return (
              <Item asChild key={index} value={option}>
                <motion.button
                  className={clsx(
                    "focusable relative flex items-center justify-center rounded-lg px-3 text-sm font-medium transition before:absolute before:left-[-3px] before:h-1/2 before:w-[2px] before:rounded-full before:bg-current before:opacity-20 before:transition-opacity first-of-type:before:hidden",
                    {
                      "text-primary-500 dark:text-primary-400": isActive,
                      "before:opacity-0": isActive || isAfterActive
                    }
                  )}
                  title={option}
                >
                  <span className="relative z-20">
                    {labels[index] ?? option}
                  </span>
                  {isActive && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0.5 z-10 rounded-md bg-white shadow dark:bg-zinc-600"
                      layoutId="background"
                      transition={springy}
                    />
                  )}
                </motion.button>
              </Item>
            )
          })}
        </motion.div>
      </Root>
    </LayoutGroup>
  )
})
