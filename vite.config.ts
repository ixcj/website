/// <reference types="vite-ssg" />
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Font from 'vite-plugin-font'
import { createI18n } from 'vue-i18n'
import { defaultLanguage, messages } from './src/language/messages'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base = command === 'serve' ? '/website/' : undefined

  return {
    base,
    define: {
      // 项目全部使用 Composition API，关闭 Options API 支持以减小运行时体积
      __VUE_OPTIONS_API__: false,
      // 仅使用 Composition 模式与全局 $t，不使用 legacy API、<i18n-t> 组件和 v-t 指令
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_FULL_INSTALL__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
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
  }
})
