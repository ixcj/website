import type { StyleValue } from 'vue'

export interface StereoCardItem {
  name: string
  logo: string
  links: Array<{ href: string, content: string, type?: string, title: string }>
  description: string
  tags: Array<{ content: string, type: string, style?: StyleValue }>
  backgroundImage?: string
  patternImage?: string
}
