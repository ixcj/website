import { ref } from 'vue'
import { useWindowSize, watchDebounced } from '@vueuse/core'
import { breakpointsConfig, mobileBreakpoint } from '@/config'

export const mobileThresholdValue =
  typeof mobileBreakpoint === 'number'
    ? mobileBreakpoint
    : breakpointsConfig.find(item => item.name === mobileBreakpoint)?.range[1] ?? 600

export const { width: windowWidth } = useWindowSize()
export const breakpointsName = ref('xl')
export const mobile = ref(windowWidth.value <= mobileThresholdValue)
export const scrollBarWidth = ref(0)

const haveMatchMedia = 'matchMedia' in globalThis
export const touch = ref(haveMatchMedia && Boolean(globalThis.matchMedia('(pointer: coarse)')?.matches))

watchDebounced(
  windowWidth,
  (newWidth) => {
    breakpointsName.value = breakpointsConfig.find(({ range }) => {
      const [min, max] = range
      return newWidth >= min && newWidth < max
    })?.name ?? 'xl'
  
    mobile.value = (newWidth <= mobileThresholdValue)

    setScrollBarWidth()
  },
  { immediate: true, debounce: 16 }
)

export function setScrollBarWidth() {
  const iWidth = globalThis?.innerWidth || 0
  const cWidth = globalThis?.document?.body.clientWidth
    || globalThis?.document?.documentElement.clientWidth || 0

  scrollBarWidth.value = iWidth - cWidth
  globalThis?.document?.documentElement.style.setProperty('--scroll-bar-width', `${scrollBarWidth.value}px`)
}

haveMatchMedia &&
  globalThis.matchMedia('(pointer: coarse)').addEventListener('change', () => {
    touch.value = globalThis.matchMedia('(pointer: coarse)').matches
  })
