export function sendMessage<T, M>(worker: Worker, message: M) {
  return new Promise<T>((resolve) => {
    const { port1, port2 } = new MessageChannel()

    port1.addEventListener(
      "message",
      ({ data }: MessageEvent<T>) => {
        port1.close()

        resolve(data)
      },
      {
        once: true
      }
    )

    port1.start()
    worker.postMessage(message, [port2])
  })
}
