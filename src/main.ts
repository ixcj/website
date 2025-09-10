import { ViteSSG } from 'vite-ssg/single-page'
import i18n from '@/language/index.ts'
import { outputInfo } from '@/utils/cheats'
import App from './App.vue'
import 'default-passive-events'
import './style.scss'

outputInfo()

export const createApp = ViteSSG(App, ({ app }) => {
  app.use(i18n)
})
