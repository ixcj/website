import { Html5, Css3Alt, JsSquare, GitAlt } from '@vicons/fa'
import Vue from '@/assets/svg/Vue-logo.svg'
import Threejs from '@/assets/svg/Threejs-logo.svg'
import TypeScript from '@/assets/svg/Typescript-logo.svg'

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
    icon: TypeScript,
    type: 'image',
  },
  {
    name: 'Vue.js',
    icon: Vue,
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
]
