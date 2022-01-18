import { createRequire } from "module"
import resolve from "@rollup/plugin-node-resolve"
import dts from "rollup-plugin-dts"
import esbuild from "rollup-plugin-esbuild"
import { worker } from "./rollup/worker.mjs"

const pkg = createRequire(import.meta.url)("./package.json")

export const options = {
  minify: true,
  format: "esm",
  target: "es2015",
  tsconfig: "tsconfig.build.json",
  define: {
    /**
     * Silencing superfluous `import.meta.url` warnings
     * since `Worker` instances are bundled and inlined.
     */
    "import.meta.url": `"import.meta.url"`
  }
}

const modernOptions = { ...options, target: "es2017" }

export default [
  {
    input: pkg.source,
    plugins: [
      resolve({
        extensions: [".ts"]
      }),
      esbuild({ ...options, sourceMap: true }),
      worker({
        include: /measure-text\.ts/,
        options
      })
    ],
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true
      },
      {
        file: pkg.module,
        format: "es",
        sourcemap: true
      }
    ]
  },
  {
    input: pkg.source,
    plugins: [
      resolve({
        extensions: [".ts"]
      }),
      esbuild({ ...modernOptions, sourceMap: true }),
      worker({
        include: /measure-text\.ts/,
        modernOptions
      })
    ],
    output: [
      {
        file: pkg.modern,
        format: "es",
        sourcemap: true
      }
    ]
  },
  {
    input: pkg.source,
    output: {
      file: pkg.types
    },
    plugins: [dts()]
  }
]
