const { bundle, transformSync } = require("@swc/core")
const deasync = require("deasync")
const path = require("path")

const workerRegex =
  /new\s+Worker\(\s*new\s+URL\(\s*[""''``](.*?)[""''``]\s*,\s*import\.meta\.url\s*\)/gs

function bundleAsync(options, callback) {
  bundle(options).then((output) => callback(null, output))
}

const bundleSync = deasync(bundleAsync)

const options = {
  minify: true,
  jsc: {
    minify: {
      compress: true
    },
    parser: {
      syntax: "typescript"
    },
    target: "es2018"
  }
}

module.exports = {
  process(source, module) {
    const inline = source.replace(workerRegex, (_, match) => {
      const worker = path.basename(match)
      const entry = path.resolve(path.dirname(module), worker)

      const {
        [worker]: { code }
      } = bundleSync({
        entry,
        options: {
          ...options,
          filename: entry
        }
      })

      return `new Worker(URL.createObjectURL(new Blob([\`${code}\`], { type: "application/javascript" }))`
    })

    return transformSync(inline, {
      ...options,
      filename: module,
      jsc: {
        ...options.jsc,
        transform: {
          hidden: {
            jest: true
          }
        }
      },
      module: {
        type: "commonjs",
        noInterop: false
      }
    })
  }
}
