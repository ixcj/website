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
  callback?: (type: 'output' | 'backspace') => void
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
  const output = ref('')

  let timer: any
  let unwatch: WatchStopHandle

  async function onOutput(fn?: Function) {
    while(output.value.length < text.value.length) {
      await delayedTask(() => {
        output.value = text.value.substring(0, output.value.length + 1)
      }, interval)
    }

    callback && callback('output')
    fn && fn()
  }

  async function onBackspace(fn?: Function) {
    while(output.value.length !== 0) {
      await delayedTask(() => {
        output.value = output.value.substring(0, output.value.length - 1)
      }, backInterval)
    }

    callback && callback('backspace')
    fn && fn()
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
        onBackspace(onOutput)
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
