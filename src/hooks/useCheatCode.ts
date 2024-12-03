import {
  ref,
  reactive,
  onMounted,
  onUnmounted,
  watchEffect,
} from 'vue'

interface Options {
  /** 监听事件 */
  listenerType?: 'keyup' | 'keydown'

  /** 触发方法 */
  fn?: (e: KeyboardEvent) => void
}

export function useCheatCode(
  keys: string[],
  fn = () => {},
  options: Options = {}
) {
  const {
    listenerType = 'keydown',
  } = options

  const _keys = reactive<string[]>([])
  const isPause = ref(false)

  function setKeys(e: KeyboardEvent) {
    const { code } = e
    _keys.push(code)

    if (keys.length < _keys.length) {
      _keys.shift()
    }
  }

  watchEffect(() => {
    if (isPause.value) return

    if (JSON.stringify(_keys) === JSON.stringify(keys)) {
      _keys.length = 0
      fn && fn()
    }
  })

  onMounted(() => {
    globalThis?.document.addEventListener(listenerType, setKeys)
  })
  
  onUnmounted(() => {
    globalThis?.document.removeEventListener(listenerType, setKeys)
  })

  return { isPause }
}
