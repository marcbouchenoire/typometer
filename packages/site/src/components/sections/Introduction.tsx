import { clsx } from "clsx"
import Image from "next/image"
import type { ComponentProps } from "react"
import logo from "../../../public/logo.svg"
import { InstallButton } from "../controls/InstallButton"

interface Props extends ComponentProps<"section"> {
  /**
   * The README list of features formatted as HTML.
   */
  features: string
}

/**
 * A section introducing the library.
 *
 * @param props - A set of `section` props.
 * @param props.features - The README list of features formatted as HTML.
 * @param [props.className] - A list of one or more classes.
 */
export function Introduction({ features, className, ...props }: Props) {
  return (
    <section className={clsx(className, "mt-16 md:mt-20 lg:mt-28")} {...props}>
      <h1 className="logo text-4xl font-bold md:text-5xl">
        <Image alt="Typometer" height="80" src={logo} width="415" />
      </h1>
      <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-300 md:text-xl">
        Measure text asynchronously.
      </p>
      <div
        className="prose prose-zinc prose-primary dark:prose-invert mt-6"
        dangerouslySetInnerHTML={{ __html: features }}
      />
      <div className="mt-8 flex flex-wrap gap-4 text-center">
        <a
          className="dark:hover:bg-primary-400/80 hover:bg-primary-500/80 hover:shadow-primary-500/5 dark:hover:shadow-primary-400/5 bg-primary-500 dark:bg-primary-400 focusable shadow-primary-500/10 dark:shadow-primary-400/10 flex w-full flex-none cursor-pointer items-center justify-center gap-2 rounded-md py-2 px-3 pl-2.5 font-medium text-white shadow-lg transition selection:bg-white/30 dark:text-zinc-900 dark:selection:bg-zinc-900/30 sm:w-auto"
          href="https://github.com/marcbouchenoire/typometer"
          rel="noreferrer"
          target="_blank"
        >
          <svg
            height="24"
            role="presentation"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M12 2C6.475 2 2 6.47 2 11.988c0 4.42 2.862 8.153 6.838 9.476.5.087.687-.212.687-.474 0-.238-.013-1.024-.013-1.86C7 19.59 6.35 18.517 6.15 17.955c-.113-.287-.6-1.174-1.025-1.411-.35-.187-.85-.65-.013-.662.788-.012 1.35.724 1.538 1.024.9 1.51 2.338 1.086 2.912.824.088-.65.35-1.086.638-1.336-2.225-.25-4.55-1.111-4.55-4.931 0-1.087.387-1.986 1.025-2.685-.1-.25-.45-1.273.1-2.646 0 0 .837-.263 2.75 1.023a9.29 9.29 0 0 1 2.5-.337c.85 0 1.7.113 2.5.337 1.912-1.298 2.75-1.023 2.75-1.023.55 1.373.2 2.397.1 2.646.637.7 1.025 1.586 1.025 2.685 0 3.832-2.337 4.681-4.562 4.931.362.312.675.912.675 1.848 0 1.336-.013 2.41-.013 2.747 0 .262.188.574.688.474C19.137 20.141 22 16.395 22 11.988 22 6.47 17.525 2 12 2Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <span>View on GitHub</span>
        </a>
        <InstallButton className="sm:w-auto flex-none w-full" />
      </div>
    </section>
  )
}
