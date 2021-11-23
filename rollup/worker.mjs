import path from "path"
import { build } from "esbuild"
import { asyncWalk } from "estree-walker"
import MagicString from "magic-string"

function isWorker(node) {
  const argument = node.arguments ? node.arguments[0] : undefined

  const isNewExpression = node.type === "NewExpression"
  const isWorker = node.callee ? node.callee.name === "Worker" : false
  const isURL =
    argument && argument.callee
      ? argument.type === "NewExpression" && argument.callee.name === "URL"
      : false

  return isNewExpression && isWorker && isURL
}

export function worker({ include = /./, options }) {
  return {
    name: "rollup-plugin-worker",
    async transform(code, module) {
      if (!include.test(module)) {
        return null
      }

      const ast = this.parse(code)
      const magicString = new MagicString(code)
      let withChanges = false

      await asyncWalk(ast, {
        enter: async (node) => {
          const isWorkerNode = isWorker(node)

          if (!isWorkerNode) return

          const url = node.arguments[0]
          const worker = path.basename(url.arguments[0].value)
          const entry = path.resolve(path.dirname(module), worker)

          try {
            const {
              errors,
              outputFiles: [output]
            } = await build({
              ...options,
              write: false,
              bundle: true,
              minify: true,
              entryPoints: [entry]
            })

            if (!output) {
              for (const error of errors) {
                throw new Error(error)
              }
            }

            const code = output.text.replace(/\n|\r/g, "")
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
