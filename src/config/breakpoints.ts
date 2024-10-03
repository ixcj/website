export type BreakpointsConfigName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type MobileBreakpoint = number | BreakpointsConfigName

export interface BreakpointsConfigItem {
  name: BreakpointsConfigName
  range: [number, number]
  contentWidth: number | string
}

export const mobileBreakpoint: MobileBreakpoint = 'xs'

export const breakpointsConfig: BreakpointsConfigItem[] = [
  {
    name: 'xs',
    range: [0, 600],
    contentWidth: 600,
  },
  {
    name: 'sm',
    range: [600, 960],
    contentWidth: 600,
  },
  {
    name: 'md',
    range: [960, 1280],
    contentWidth: 960,
  },
  {
    name: 'lg',
    range: [1280, 1920],
    contentWidth: 960,
  },
  {
    name: 'xl',
    range: [1920, 2560],
    contentWidth: 960,
  },
  {
    name: 'xxl',
    range: [2560, Infinity],
    contentWidth: 960,
  },
]
