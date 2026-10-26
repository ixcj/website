import type { WatchStopHandle } from 'vue'
import { onMounted, onUnmounted, shallowRef, watch } from 'vue'

export function useGyroscope(enable: boolean = true) {
  const alpha = shallowRef(0)
  const beta = shallowRef(0)
  const gamma = shallowRef(0)
  const ready = shallowRef(false)
  const activate = shallowRef(enable)

  const isSupported
    = typeof window !== 'undefined' && 'DeviceOrientationEvent' in window

  let unwatch: WatchStopHandle | undefined

  const handleOrientation = (event: DeviceOrientationEvent) => {
    alpha.value = Number((event.alpha ?? 0).toFixed(1))
    beta.value = Number((event.beta ?? 0).toFixed(1))
    gamma.value = Number((event.gamma ?? 0).toFixed(1))
  }

  type PermissionFn = () => Promise<'granted' | string>

  function getPermissionFn() {
    return (window.DeviceOrientationEvent as any)
      ?.requestPermission as PermissionFn | undefined
  }

  async function requestPermission() {
    if (!isSupported) {
      ready.value = false
      return
    }

    const permissionFn = getPermissionFn()

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

  // iOS 13+ only grants (and only prompts) when requestPermission is called from a user gesture,
  // so the mount-time attempt fails there; retry once on the first tap / click
  const gestureEvents = ['touchend', 'click'] as const
  let disposed = false

  function removeGestureListeners() {
    gestureEvents.forEach(name => window.removeEventListener(name, onFirstGesture, true))
  }

  function onFirstGesture() {
    removeGestureListeners()
    if (!ready.value)
      requestPermission()
  }

  onMounted(async () => {
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

    await requestPermission()

    if (!disposed && isSupported && !ready.value && typeof getPermissionFn() === 'function') {
      gestureEvents.forEach(name => window.addEventListener(name, onFirstGesture, { capture: true, passive: true }))
    }
  })

  onUnmounted(() => {
    disposed = true
    if (isSupported) {
      window.removeEventListener('deviceorientation', handleOrientation)
      removeGestureListeners()
    }
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
