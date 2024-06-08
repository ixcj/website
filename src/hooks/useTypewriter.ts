import {
  type WatchStopHandle,
  ref,
  watch,
  onMounted,
  onUnmounted,
} from 'vue'

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
  options: Options = {}
) {
  const {
    interval = 50,
    backInterval = 50,
    immediate = true,
    callback = undefined
  } = options

  const text = ref(defaultText)
  const output = ref(immediate ? '' : defaultText)

  let timer: any
  let unwatch: WatchStopHandle

  async function onOutput(fn?: Function) {
    if (output.value.length < text.value.length) {
      await delayedTask(() => {
        output.value = text.value.substring(0, output.value.length + 1)
        onOutput(fn)
      }, interval)
    } else {
      callback && callback()
      fn && fn()
    }
  }

  async function onBackspace() {
    if (output.value.length !== 0) {
      await delayedTask(() => {
        output.value = output.value.substring(0, output.value.length - 1)
        onBackspace()
      }, backInterval)
    } else {
      onOutput()
    }
  }

  function delayedTask(task: Function, delay: number) {
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        task()
        resolve(true)
      }, delay)
    })
  }

  onMounted(() => {
    unwatch = watch(
      text,
      () => {
        clearTimeout(timer)
        onBackspace()
      },
      { immediate }
    )
  })

  onUnmounted(() => {
    unwatch()
  })

  return {
    text,
    output,
  }
}
