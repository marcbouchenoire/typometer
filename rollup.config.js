import resolve from "@rollup/plugin-node-resolve"
import { transform, bundle } from "@swc/core"
import camel from "camelcase"
import { asyncWalk } from "estree-walker"
import MagicString from "magic-string"
import path from "path"
import dts from "rollup-plugin-dts"
import pkg from "./package.json"

function worker({ include, options }) {
  return {
    name: "rollup-plugin-worker",
    async transform(code, module) {
      if (!include?.test(module)) {
        return null
      }

      const ast = this.parse(code)
      const magicString = new MagicString(code)
      let withChanges = false

      await asyncWalk(ast, {
        enter: async (node) => {
          const isWorkerNode =
            node.type === "NewExpression" &&
            node.callee?.name === "Worker" &&
            node.arguments?.[0]?.type === "NewExpression" &&
            node.arguments?.[0]?.callee?.name === "URL" &&
            node.arguments?.[0]?.arguments?.[0]?.type === "Literal" &&
            node.arguments?.[0]?.arguments?.[1]?.object?.type === "MetaProperty"

          if (!isWorkerNode) return

          const url = node.arguments?.[0]
          const worker = path.basename(url.arguments[0].value)
          const entry = path.resolve(path.dirname(module), worker)

          try {
            const {
              [worker]: { code }
            } = await bundle({
              entry,
              options: {
                ...options,
                filename: entry
              }
            })

            withChanges = true
            magicString.overwrite(
              url.start,
              url.end,
              `URL.createObjectURL(new Blob([\`${code}\`], { type: "application/javascript" }))`
            )
          } catch (error) {
            this.warn(error)
          }
        }
      })

      return {
        code: withChanges ? magicString.toString() : code,
        map: withChanges ? magicString.generateMap({ hires: true }) : null
      }
    }
  }
}

function swc(options) {
  return {
    name: "rollup-plugin-swc",
    async transform(code, module) {
      return transform(code, { ...options, filename: module })
    }
  }
}

const options = {
  minify: true,
  sourceMaps: true,
  jsc: {
    minify: {
      compress: true,
      mangle: true
    },
    parser: {
      syntax: "typescript"
    },
    target: "es2018"
  }
}

export default [
  {
    input: pkg.source,
    plugins: [
      resolve({
        extensions: [".ts"]
      }),
      swc(options),
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
