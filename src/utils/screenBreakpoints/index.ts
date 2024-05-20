import { ref } from 'vue'
import { useWindowSize, watchDebounced } from '@vueuse/core'
import { breakpointsConfig, mobileBreakpoint } from '@/config/breakpoints'

export const { width: windowWidth } = useWindowSize()
export const breakpointsName = ref('xl')
export const mobile = ref(false)

const mobileThresholdValue =
  typeof mobileBreakpoint === 'number'
    ? mobileBreakpoint
    : breakpointsConfig.find(item => item.name === mobileBreakpoint)?.range[1] ?? 600

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
