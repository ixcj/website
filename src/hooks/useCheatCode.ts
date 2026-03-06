import { onMounted, onUnmounted, ref, watch } from 'vue'

interface Options {
  /** 默认值 */
  defaultActivate?: boolean
  /** 监听事件 */
  listenerType?: 'keyup' | 'keydown'
  /** 按键序列超时时间(ms) */
  timeout?: number
  /** 自定义匹配规则 */
  matcher?: (inputKeys: string[], targetKeys: string[]) => boolean
}

function defaultMatcher(inputKeys: string[], targetKeys: string[]): boolean {
  if (inputKeys.length !== targetKeys.length)
    return false
  return inputKeys.every((key, index) => key === targetKeys[index])
}

export function useCheatCode(
  keys: string[],
  fn = () => {},
  options: Options = {},
) {
  const {
    defaultActivate = true,
    listenerType = 'keydown',
    timeout = 2000,
    matcher = defaultMatcher,
  } = options

  const inputKeys = ref<string[]>([])
  const activate = ref(defaultActivate)

  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let stopWatch: (() => void) | undefined

  const isBrowser = typeof window !== 'undefined'

  function clearTimer() {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  function resetKeys() {
    inputKeys.value = []
    clearTimer()
  }

  function scheduleReset() {
    clearTimer()
    if (timeout > 0)
      timeoutId = setTimeout(resetKeys, timeout)
  }

  function handleKey(event: KeyboardEvent) {
    if (!activate.value)
      return

    const { code } = event
    if (!code)
      return

    const buffer = inputKeys.value
    buffer.push(code)

    if (buffer.length > keys.length)
      buffer.shift()

    scheduleReset()

    try {
      if (matcher(buffer, keys)) {
        resetKeys()
        fn()
      }
    }
    catch (err) {
      console.error('Error in matcher:', err)
      resetKeys()
    }
  }

  onMounted(() => {
    if (!isBrowser)
      return

    stopWatch = watch(
      activate,
      (value) => {
        if (value)
          window.addEventListener(listenerType, handleKey)
        else
          window.removeEventListener(listenerType, handleKey)
      },
      { immediate: true },
    )
  })

  onUnmounted(() => {
    if (isBrowser)
      window.removeEventListener(listenerType, handleKey)
    stopWatch?.()
    resetKeys()
  })

  return {
    activate,
    resetKeys,
  }
}
