import {
  ref,
  onMounted,
  onUnmounted
} from 'vue'
import {
  useWindowSize,
  watchDebounced
} from '@vueuse/core'

export type BreakpointsConfigName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type MobileBreakpoint = number | BreakpointsConfigName
export interface BreakpointsConfigItem {
  name: BreakpointsConfigName
  range: [number, number]
}

const { width } = useWindowSize()

export const useDisplay = (
  config: BreakpointsConfigItem[] = [{ name: 'xl', range: [-Infinity, Infinity] }],
  mobileThreshold: MobileBreakpoint = 'xs'
) => {
  let flag: Function
  
  const name = ref('xl')
  const mobile = ref(false)

  onMounted(() => {
    flag = watchDebounced(
      width,
      (newWidth) => {
        const breakpoints = config.find(({ range }) => {
          const [min, max] = range
          return newWidth >= min && newWidth < max
        })
      
        if (breakpoints) {
          name.value = breakpoints.name
      
          const mobileThresholdValue =
            typeof mobileThreshold === 'number'
              ? mobileThreshold
              : breakpoints.range[1]
          
          mobile.value = (newWidth <= mobileThresholdValue)
        }
      },
      { immediate: true, debounce: 33 }
    )
  })
  
  onUnmounted(() => {
    flag()
  })

  return {
    width,
    name,
    mobile
  }
}
