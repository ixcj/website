import type { WatchStopHandle } from 'vue'
import {
  onMounted,
  onUnmounted,
  ref,
  watch,

} from 'vue'

export function useGyroscope(enable: boolean = true) {
  const alpha = ref(0)
  const beta = ref(0)
  const gamma = ref(0)
  const ready = ref(false)

  let unwatch: WatchStopHandle
  const activate = ref(enable)

  if (globalThis?.DeviceOrientationEvent) {
    if (typeof (globalThis?.DeviceOrientationEvent as any)?.requestPermission === 'function') {
      (globalThis!.DeviceOrientationEvent as any).requestPermission().then((permission: 'granted' | Omit<any, 'granted'>) => {
        if (permission === 'granted') {
          ready.value = true
        }
        else {
          ready.value = false
        }
      })
    }
    else {
      ready.value = true
    }
  }

  const handleOrientation = (event: DeviceOrientationEvent) => {
    alpha.value = Number((event.alpha || 0).toFixed(1))
    beta.value = Number((event.beta || 0).toFixed(1))
    gamma.value = Number((event.gamma || 0).toFixed(1))
  }

  onMounted(() => {
    unwatch = watch(
      activate,
      (value) => {
        if (!ready.value)
          return

        if (value) {
          globalThis?.addEventListener('deviceorientation', handleOrientation)
        }
        else {
          globalThis?.removeEventListener('deviceorientation', handleOrientation)
        }
      },
      { immediate: true },
    )
  })

  onUnmounted(() => {
    globalThis?.removeEventListener('deviceorientation', handleOrientation)
    unwatch?.()
  })

  return {
    alpha,
    beta,
    gamma,
    ready,
    activate,
  }
}
