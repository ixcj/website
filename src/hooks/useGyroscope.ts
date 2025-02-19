import {
  type WatchStopHandle,
  ref,
  watch,
  onMounted,
  onUnmounted,
} from 'vue'

export function useGyroscope(enable: boolean = true, precision: number = 1) {
  const alpha = ref(0)
  const beta = ref(0)
  const gamma = ref(0)
  const ready = ref(false)
  const error = ref<string | null>(null)

  let unwatch: WatchStopHandle
  const activate = ref(enable)

  const requestDevicePermission = async () => {
    try {
      const permission = await (globalThis?.DeviceOrientationEvent as any).requestPermission()
      ready.value = permission === 'granted'
      if (!ready.value) {
        error.value = '陀螺仪权限被拒绝'
      }
    } catch (err) {
      error.value = '请求陀螺仪权限失败'
      ready.value = false
    }
  }

  const initializeGyroscope = async () => {
    if (!globalThis?.DeviceOrientationEvent) {
      error.value = '设备不支持陀螺仪'
      ready.value = false
      return
    }

    if (typeof (globalThis?.DeviceOrientationEvent as any)?.requestPermission === 'function') {
      await requestDevicePermission()
    } else {
      ready.value = true
    }
  }

  const handleOrientation = (event: DeviceOrientationEvent) => {
    try {
      alpha.value = Number((event.alpha || 0).toFixed(precision))
      beta.value = Number((event.beta || 0).toFixed(precision))
      gamma.value = Number((event.gamma || 0).toFixed(precision))
    } catch (err) {
      error.value = '处理陀螺仪数据失败'
    }
  }

  onMounted(async () => {
    await initializeGyroscope()

    unwatch = watch(
      activate,
      (value) => {
        if (!ready.value) return

        value
          ? globalThis?.addEventListener('deviceorientation', handleOrientation)
          : globalThis?.removeEventListener('deviceorientation', handleOrientation)
      },
      { immediate: true }
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
    error,
  }
}
