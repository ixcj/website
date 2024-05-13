import { ViteSSG } from 'vite-ssg/single-page'
import App from './App.vue'
import './style.scss'
// import i18n from '@/language/index.ts';

export const createApp = ViteSSG(App, ({ app }) => {
  // app.use(i18n)
})