import { ref } from 'vue'
import { useWindowSize, watchDebounced } from '@vueuse/core'
import { breakpointsConfig, mobileBreakpoint } from '@/config/breakpoints'

export const mobileThresholdValue =
  typeof mobileBreakpoint === 'number'
    ? mobileBreakpoint
    : breakpointsConfig.find(item => item.name === mobileBreakpoint)?.range[1] ?? 600

export const { width: windowWidth } = useWindowSize()
export const breakpointsName = ref('xl')
export const mobile = ref(windowWidth.value <= mobileThresholdValue)
export const touch = ref(Boolean(globalThis.matchMedia('(pointer: coarse)')?.matches))

watchDebounced(
  windowWidth,
  (newWidth) => {
    breakpointsName.value = breakpointsConfig.find(({ range }) => {
      const [min, max] = range
      return newWidth >= min && newWidth < max
    })?.name ?? 'xl'
  
    mobile.value = (newWidth <= mobileThresholdValue)
  },
  { immediate: true, debounce: 16 }
)

globalThis.matchMedia &&
  globalThis.matchMedia('(pointer: coarse)').addEventListener('change', () => {
    touch.value = globalThis.matchMedia('(pointer: coarse)').matches
  })
