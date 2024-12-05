import { StyleValue } from 'vue'

export interface StereoCardItem {
  name: string
  icon: string
  links: Array<{ href: string, content: string, title: string }>
  description: string
  tags: Array<{ content: string, type: string, style?: StyleValue }>
  backgroundImage?: string
  patternImage?: string
}