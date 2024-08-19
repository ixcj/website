import { Html5, Css3Alt, JsSquare, GitAlt, Github } from '@vicons/fa'

interface Skill {
  name: string
  icon?: any
  type: 'icon' | 'image' | 'normal'
}

interface Skill_Icon extends Skill {
  color: string
  type: 'icon'
}

interface Skill_Image extends Skill {
  type: 'image'
}

export const skillList: Array<Skill_Icon | Skill_Image> = [
  {
    name: 'HTML',
    icon: Html5,
    color: '#dd4b25',
    type: 'icon',
  },
  {
    name: 'CSS',
    icon: Css3Alt,
    color: '#106fb6',
    type: 'icon',
  },
  {
    name: 'JavaScript',
    icon: JsSquare,
    color: '#edc418',
    type: 'icon',
  },
  {
    name: 'TypeScript',
    icon: new URL('@/assets/svg/Typescript-logo.svg', import.meta.url).href,
    type: 'image',
  },
  {
    name: 'Vue.js',
    icon: new URL('@/assets/svg/Vue-logo.svg', import.meta.url).href,
    type: 'image',
  },
  {
    name: 'VueUse',
    icon: new URL('@/assets/svg/VueUse-logo.svg', import.meta.url).href,
    type: 'image',
  },
  {
    name: 'Vite',
    icon: new URL('@/assets/svg/Vite-logo.svg', import.meta.url).href,
    type: 'image',
  },
  {
    name: 'Three.js',
    icon: new URL('@/assets/svg/Threejs-logo.svg', import.meta.url).href,
    type: 'image',
  },
  {
    name: 'Git',
    icon: GitAlt,
    color: '#eb4d28',
    type: 'icon',
  },
  {
    name: 'GitHub',
    icon: Github,
    color: 'var(--background-color)',
    type: 'icon',
  },
]
