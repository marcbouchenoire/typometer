import { esbuildPlugin } from "@web/dev-server-esbuild"
import { fromRollup } from "@web/dev-server-rollup"
import { puppeteerLauncher } from "@web/test-runner-puppeteer"
import { options } from "./rollup.config.mjs"
import { worker } from "./rollup/worker.mjs"

const rollupWorker = fromRollup(worker)

export default {
  files: ["tests/**/*.test.ts"],
  nodeResolve: true,
  plugins: [
    esbuildPlugin({ ts: true }),
    rollupWorker({
      include: /measure-text\.ts/,
      options
    })
  ],
  browsers: [puppeteerLauncher({ concurrency: 1 })],
  coverageConfig: {
    include: ["src/**/*.ts"]
  }
}
