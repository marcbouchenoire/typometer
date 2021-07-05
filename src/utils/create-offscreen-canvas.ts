type Message<T> = [number, 0 | 1, T]

type ControllerRequest<T> = (message: T) => void
type ControllerReject = (error: string) => void
type Controller<T> = [ControllerRequest<T>, ControllerReject]

declare const $$: (...args: any) => Promise<unknown>

/**
 * This abstraction is a modified version of `greenlet`.
 * @see {@link https://github.com/developit/greenlet|greenlet}
 * @license MIT
 */
export function createOffscreenCanvas<A extends any[], T>(
  callback: (
    context: OffscreenCanvasRenderingContext2D,
    ...args: A
  ) => Promise<T>
): (...args: A) => Promise<T> {
  let id = 0
  const controllers: Record<number, Controller<T> | null> = {}

  const onMessage = ({ data: [id, status] }: MessageEvent<Message<T>>) => {
    return Promise.resolve(status)
      .then((value) =>
        ((<unknown>$$) as (...args: A) => Promise<T>).apply(
          $$,
          (<unknown>value) as A
        )
      )
      .then(
        (message: T) => {
          postMessage([id, 0, message])
        },
        (error: Error) => {
          postMessage([id, 1, `${error}`] as Message<string>)
        }
      )
  }

  const [, leading, parameter, parameters, trailing] =
    callback
      .toString()
      .match(/^(async (?:function )?\()([^),]+),?\s*([^)]*\))(.*)/s) ??
    (Array.from({ length: 5 }).fill("") as string[])

  if (!parameter) {
    throw new Error("An async function couldn't be found to create a Worker.")
  }

  const global = `${leading}${parameters}${trailing.replace(
    "context",
    parameter
  )}`
  const script = `const canvas = new OffscreenCanvas(1, 1);const ${parameter} = canvas.getContext("2d");$$=${global};onmessage=${onMessage};`
  const worker = new Worker(URL.createObjectURL(new Blob([script])))

  worker.addEventListener(
    "message",
    ({ data: [id, status, message] }: MessageEvent<Message<T>>) => {
      controllers[id]?.[status](message as T & string)
      controllers[id] = null
    }
  )

  return (...args: A) => {
    return new Promise(function () {
      controllers[++id] = (<unknown>arguments) as Controller<T>

      worker.postMessage([id, args]) // eslint-disable-line unicorn/require-post-message-target-origin
    })
  }
}
