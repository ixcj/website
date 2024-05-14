import {
  type MobileBreakpoint,
  type BreakpointsConfigItem,
} from '@/hooks/useDisplay'

export const mobileBreakpoint: MobileBreakpoint = 'xs'

export const breakpointsConfig: BreakpointsConfigItem[] = [
  {
    name: 'xs',
    range: [-Infinity, 600],
  },
  {
    name: 'sm',
    range: [600, 960],
  },
  {
    name: 'md',
    range: [960, 1280],
  },
  {
    name: 'lg',
    range: [1280, 1920],
  },
  {
    name: 'xl',
    range: [1920, 2560],
  },
  {
    name: 'xxl',
    range: [2560, Infinity],
  },
]
