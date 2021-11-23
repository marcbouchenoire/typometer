import path from "path"
import { build } from "esbuild"
import { asyncWalk } from "estree-walker"
import MagicString from "magic-string"

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
          const isWorkerNode =
            node.type === "NewExpression" &&
            node.callee?.name === "Worker" &&
            node.arguments?.[0]?.type === "NewExpression" &&
            node.arguments?.[0]?.callee?.name === "URL" &&
            node.arguments?.[0]?.arguments?.[0]?.type === "Literal"

          if (!isWorkerNode) return

          const url = node.arguments?.[0]
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

            const code = output?.text?.replace(/\n|\r/g, "")

            if (!code) {
              for (const error of errors) {
                throw new Error(error)
              }
            }

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
