import { useWindowSize, watchDebounced } from '@vueuse/core'
import { ref } from 'vue'
import { breakpointsConfig, mobileBreakpoint } from '@/config'

export const mobileThresholdValue
  = typeof mobileBreakpoint === 'number'
    ? mobileBreakpoint
    : breakpointsConfig.find(item => item.name === mobileBreakpoint)?.range[1] ?? 600

export const { width: windowWidth } = useWindowSize()
export const breakpointsName = ref('xl')
export const mobile = ref(windowWidth.value <= mobileThresholdValue)
export const scrollBarWidth = ref(0)
export const contentWidth = ref<number | string>(900)

const haveMatchMedia = 'matchMedia' in globalThis
export const touch = ref(haveMatchMedia && Boolean(globalThis.matchMedia('(pointer: coarse)')?.matches))

watchDebounced(
  windowWidth,
  (newWidth) => {
    const currentBreakpointsConfig = breakpointsConfig.find(({ range }) => {
      const [min, max] = range
      return newWidth >= min && newWidth < max
    })

    breakpointsName.value = currentBreakpointsConfig?.name ?? 'xl'
    contentWidth.value = currentBreakpointsConfig?.contentWidth ?? 900

    mobile.value = (newWidth <= mobileThresholdValue)
    globalThis?.document?.documentElement.style
      .setProperty('--mobile-extra-scroll-padding-top', `${mobile.value ? 20 : 0}px`)

    setScrollBarWidth()
  },
  { immediate: true, debounce: 33 },
)

export function setScrollBarWidth() {
  const iWidth = globalThis?.innerWidth || 0
  const cWidth = globalThis?.document?.body.clientWidth
    || globalThis?.document?.documentElement.clientWidth || 0

  scrollBarWidth.value = iWidth - cWidth
  globalThis?.document?.documentElement.style
    .setProperty('--scroll-bar-width', `${scrollBarWidth.value}px`)
}

if (haveMatchMedia) {
  globalThis.matchMedia('(pointer: coarse)').addEventListener('change', () => {
    touch.value = globalThis.matchMedia('(pointer: coarse)').matches
  })
}
