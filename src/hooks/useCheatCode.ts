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
}

export function useCheatCode(
  keys: string[],
  fn = () => {},
  options: Options = {}
) {
  const {
    defaultActivate = true,
    listenerType = 'keydown',
  } = options

  const _keys = reactive<string[]>([])
  const activate = ref(defaultActivate)

  function setKeys(e: KeyboardEvent) {
    const { code } = e
    _keys.push(code)

    if (keys.length < _keys.length) {
      _keys.shift()
    }
  }

  watchEffect(() => {
    if (!activate.value) return

    if (JSON.stringify(_keys) === JSON.stringify(keys)) {
      _keys.length = 0

      try {
        fn && fn()
      } catch (err) {
        console.error(err)
      }
    }
  })

  onMounted(() => {
    globalThis?.addEventListener(listenerType, setKeys)
  })
  
  onUnmounted(() => {
    globalThis?.removeEventListener(listenerType, setKeys)
  })

  return { activate }
}
