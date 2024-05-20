/// <reference types="vite-ssg" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

const { getI18n } = require('./src/language/index.ts')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  ssr: {
    noExternal: ['vue-i18n'],
  },
  ssgOptions: {
    includedRoutes() {
      return ['/', '/en/']
    },
    onBeforePageRender(route, _, ctx) {
      const i18n = getI18n(route === '/en/' ? 'en' : 'zh')
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
