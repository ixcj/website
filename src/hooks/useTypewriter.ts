import type { WatchStopHandle } from 'vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'

interface Options {
  /** 输出间隔 */
  interval?: number

  /** 退格间隔 */
  backInterval?: number

  /** 立即执行 */
  immediate?: boolean

  /** 回调函数 */
  callback?: () => void
}

export function useTypewriter(
  defaultText: string = '',
  options: Options = {},
) {
  const {
    interval = 50,
    backInterval = 50,
    immediate = true,
    callback = undefined,
  } = options

  const text = ref(defaultText)
  const output = ref(immediate ? '' : defaultText)

  let paused = false
  let timer: ReturnType<typeof setTimeout> | undefined
  let runId = 0
  let unwatch: WatchStopHandle | undefined

  function clearTimer() {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  function schedule(task: () => void, delay: number) {
    timer = setTimeout(task, delay)
  }

  function runOutput(currentId: number, done?: () => void) {
    if (currentId !== runId)
      return

    if (output.value.length >= text.value.length) {
      callback?.()
      done?.()
      return
    }

    schedule(() => {
      if (currentId !== runId)
        return
      if (!paused)
        output.value = text.value.substring(0, output.value.length + 1)
      runOutput(currentId, done)
    }, interval)
  }

  function runBackspace(currentId: number) {
    if (currentId !== runId)
      return

    if (output.value.length === 0) {
      runOutput(currentId)
      return
    }

    schedule(() => {
      if (currentId !== runId)
        return
      if (!paused)
        output.value = output.value.substring(0, output.value.length - 1)
      runBackspace(currentId)
    }, backInterval)
  }

  function restart() {
    runId += 1
    clearTimer()
    runBackspace(runId)
  }

  function pause(pauseStatus?: boolean) {
    paused = pauseStatus === undefined ? !paused : pauseStatus
  }

  onMounted(() => {
    unwatch = watch(
      text,
      () => {
        restart()
      },
      { immediate },
    )
  })

  onUnmounted(() => {
    runId += 1
    clearTimer()
    unwatch?.()
  })

  return {
    text,
    output,
    pause,
  }
}
