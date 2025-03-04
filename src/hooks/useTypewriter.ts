import {
  type WatchStopHandle,
  ref,
  watch,
  computed,
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
  /** 打字声效 */
  typeSound?: boolean
  /** 显示光标 */
  showCursor?: boolean
  /** 光标样式 */
  cursorStyle?: string
  /** 最大重试次数 */
  maxRetries?: number
}

export function useTypewriter(
  defaultText: string = '',
  options: Options = {}
) {
  let isPause = false
  let retryCount = 0

  const {
    interval = 50,
    backInterval = 50,
    immediate = true,
    callback = undefined,
    typeSound = false,
    showCursor = false,
    cursorStyle = '|',
    maxRetries = 3
  } = options

  const text = ref(defaultText)
  const output = ref(immediate ? '' : defaultText)
  const isTyping = ref(false)
  const error = ref<Error | null>(null)

  let timer: ReturnType<typeof setTimeout> | null = null
  let unwatch: WatchStopHandle
  let audioContext: AudioContext | null = null

  // 初始化音频上下文
  if (typeSound && typeof window !== 'undefined') {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (err) {
      console.warn('无法初始化音频上下文:', err)
    }
  }

  function playTypeSound() {
    if (!audioContext) return

    try {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)

      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.05)
    } catch (err) {
      console.warn('播放打字音效失败:', err)
    }
  }

  function delayedTask(task: Function, delay: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (retryCount >= maxRetries) {
        reject(new Error('超过最大重试次数'))
        return
      }

      timer = setTimeout(() => {
        try {
          task()
          resolve(true)
        } catch (err) {
          retryCount++
          reject(err)
        }
      }, delay)
    })
  }

  async function onOutput(fn?: Function) {
    if (!isTyping.value) return

    try {
      if (output.value.length < text.value.length) {
        await delayedTask(() => {
          if (!isPause && isTyping.value) {
            output.value = text.value.substring(0, output.value.length + 1)
            typeSound && playTypeSound()
            onOutput(fn)
          }
        }, interval)
      } else {
        callback?.() 
        fn?.() 
      }
    } catch (err) {
      error.value = err as Error
      isTyping.value = false
    }
  }

  async function onBackspace() {
    if (!isTyping.value) return

    try {
      if (output.value.length !== 0) {
        await delayedTask(() => {
          if (!isPause && isTyping.value) {
            output.value = output.value.substring(0, output.value.length - 1)
            typeSound && playTypeSound()
            onBackspace()
          }
        }, backInterval)
      } else {
        onOutput()
      }
    } catch (err) {
      error.value = err as Error
      isTyping.value = false
    }
  }

  function pause(pauseStatus?: boolean) {
    isPause = pauseStatus === undefined ? !isPause : pauseStatus
  }

  function reset() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    error.value = null
    retryCount = 0
    isTyping.value = true
  }

  onMounted(() => {
    isTyping.value = true
    unwatch = watch(
      text,
      () => {
        reset()
        onBackspace()
      },
      { immediate }
    )
  })

  onUnmounted(() => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    if (audioContext) {
      audioContext.close()
      audioContext = null
    }
    unwatch?.() 
  })

  const displayOutput = computed(() => 
    showCursor ? `${output.value}${cursorStyle}` : output.value
  )

  return {
    text,
    output: displayOutput,
    pause,
    reset,
    isTyping,
    error,
  }
}
