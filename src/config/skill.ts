import { Html5, Css3Alt, JsSquare, GitAlt, Github } from '@vicons/fa'
import Typescript from '@/assets/svg/Typescript-logo.svg'
import Vue from '@/assets/svg/Vue-logo.svg'
import VueUse from '@/assets/svg/VueUse-logo.svg'
import Vite from '@/assets/svg/Vite-logo.svg'
import Threejs from '@/assets/svg/Threejs-logo.svg'

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
    icon: Typescript,
    type: 'image',
  },
  {
    name: 'Vue.js',
    icon: Vue,
    type: 'image',
  },
  {
    name: 'VueUse',
    icon: VueUse,
    type: 'image',
  },
  {
    name: 'Vite',
    icon: Vite,
    type: 'image',
  },
  {
    name: 'Three.js',
    icon: Threejs,
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
