/// <reference types="vite-ssg" />
import { defineConfig } from 'vite'
import { createI18n } from 'vue-i18n'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

const { messages, defaultLanguage } = require('./src/language/index.ts')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    includedRoutes() {
      return Object.keys(messages).map(language => {
        return language === defaultLanguage ? '/' : `/${language}/`
      })
    },
    onBeforePageRender(route, _, ctx) {
      const locale = route.replace(/^\/|\/$/g, '') || defaultLanguage
      const i18n = createI18n({
        legacy: false,
        locale,
        fallbackLocale: defaultLanguage,
        messages,
      })
      ctx.app.use(i18n)
      return undefined
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true
  }
})
