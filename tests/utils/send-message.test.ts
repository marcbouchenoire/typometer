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

  test("should send and receive corresponding messages asynchronously", async () => {
    expect(await sendMessage(worker, number)).toBe(number * 2)
    expect(await sendMessage(worker, number * 2)).toBe(number * 4)
  })
})
