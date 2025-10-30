/// <reference types="vite-ssg" />
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Font from 'vite-plugin-font'
import { createI18n } from 'vue-i18n'

const { messages, defaultLanguage } = require('./src/language/index.ts')

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/weisite/' : undefined,
  plugins: [
    vue(),
    Font.vite({
      scanFiles: ['src/**/*.{vue,ts,tsx,js,jsx}'],
    }),
  ],
  ssgOptions: {
    includedRoutes() {
      return Object.keys(messages).map((language) => {
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
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 23333,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
}))
