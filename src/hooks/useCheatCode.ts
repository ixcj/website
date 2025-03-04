import {
  ref,
  reactive,
  onMounted,
  onUnmounted,
  watchEffect,
} from 'vue'

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

export function useCheatCode(
  keys: string[],
  fn = () => {},
  options: Options = {}
) {
  const {
    defaultActivate = true,
    listenerType = 'keydown',
    timeout = 2000,
    matcher = defaultMatcher,
  } = options

  const _keys = reactive<string[]>([])
  const activate = ref(defaultActivate)
  let timeoutId: NodeJS.Timeout | null = null

  function defaultMatcher(inputKeys: string[], targetKeys: string[]): boolean {
    return JSON.stringify(inputKeys) === JSON.stringify(targetKeys)
  }

  function resetKeys() {
    _keys.length = 0
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  function setKeys(e: KeyboardEvent) {
    try {
      const { code } = e
      if (!code) return

      _keys.push(code)

      // 重置超时定时器
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(resetKeys, timeout)

      // 如果输入序列长度超过目标序列，移除最早的输入
      if (keys.length < _keys.length) {
        _keys.shift()
      }
    } catch (err) {
      console.error('Error in setKeys:', err)
      resetKeys()
    }
  }

  watchEffect(() => {
    if (!activate.value) return

    try {
      if (matcher(_keys, keys)) {
        resetKeys()
        fn()
      }
    } catch (err) {
      console.error('Error in watchEffect:', err)
      resetKeys()
    }
  })

  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener(listenerType, setKeys)
    }
  })
  
  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener(listenerType, setKeys)
      resetKeys()
    }
  })

  return { 
    activate,
    resetKeys,
  }
}
