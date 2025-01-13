import { ViteSSG } from 'vite-ssg/single-page'
import App from './App.vue'
import i18n from '@/language/index.ts'
import { outputInfo } from '@/utils/cheats'
import './style.scss'

outputInfo()

export const createApp = ViteSSG(App, ({ app }) => {
  app.use(i18n)
})
