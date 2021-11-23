import * as assert from "uvu/assert"
import { sendMessage } from "../../src/utils/send-message"
import { number } from "../constants"

describe("sendMessage", () => {
  const code = `addEventListener(
    "message",
    ({ data, ports: [port] }) => {
      port.postMessage(data * 2)
    },
    false
  )`
  const worker = new Worker(
    URL.createObjectURL(new Blob([code], { type: "application/javascript" }))
  )

  it("should send and receive corresponding messages asynchronously", async () => {
    assert.equal(await sendMessage(worker, number), number * 2)
    assert.equal(await sendMessage(worker, number * 2), number * 4)
  })
})
