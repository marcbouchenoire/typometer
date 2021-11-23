import { createRequire } from "module"
import resolve from "@rollup/plugin-node-resolve"
import camel from "camelcase"
import dts from "rollup-plugin-dts"
import esbuild from "rollup-plugin-esbuild"
import { worker } from "./rollup/worker.mjs"

const pkg = createRequire(import.meta.url)("./package.json")

export const options = {
  minify: true,
  format: "esm",
  target: "es2018",
  tsconfig: "tsconfig.build.json"
}

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
      },
      {
        file: pkg.unpkg,
        format: "umd",
        sourcemap: true,
        name: camel(pkg.name)
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
