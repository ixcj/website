import type { WatchStopHandle } from 'vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'

export function useGyroscope(enable: boolean = true) {
  const alpha = ref(0)
  const beta = ref(0)
  const gamma = ref(0)
  const ready = ref(false)
  const activate = ref(enable)

  const isSupported
    = typeof window !== 'undefined' && 'DeviceOrientationEvent' in window

  let unwatch: WatchStopHandle | undefined

  const handleOrientation = (event: DeviceOrientationEvent) => {
    alpha.value = Number((event.alpha ?? 0).toFixed(1))
    beta.value = Number((event.beta ?? 0).toFixed(1))
    gamma.value = Number((event.gamma ?? 0).toFixed(1))
  }

  async function requestPermission() {
    if (!isSupported) {
      ready.value = false
      return
    }

    const permissionFn = (window.DeviceOrientationEvent as any)
      ?.requestPermission as (() => Promise<'granted' | string>) | undefined

    if (typeof permissionFn === 'function') {
      try {
        const permission = await permissionFn()
        ready.value = permission === 'granted'
      }
      catch {
        ready.value = false
      }
    }
    else {
      ready.value = true
    }
  }

  onMounted(() => {
    requestPermission()

    unwatch = watch(
      [activate, ready],
      ([isActive, isReady]) => {
        if (!isSupported)
          return

        if (isActive && isReady)
          window.addEventListener('deviceorientation', handleOrientation)
        else
          window.removeEventListener('deviceorientation', handleOrientation)
      },
      { immediate: true },
    )
  })

  onUnmounted(() => {
    if (isSupported)
      window.removeEventListener('deviceorientation', handleOrientation)

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
