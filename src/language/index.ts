import { createI18n } from 'vue-i18n'
import en from './lang/en.ts'
import zh from './lang/zh.ts'

// @ts-expect-error 禁用开发者工具支持
globalThis.__VUE_PROD_DEVTOOLS__ = false

export const defaultLanguage = 'zh'
export const messages = { zh, en }

const locale = globalThis.location?.pathname.replace(/^\/|\/$/g, '')
  || defaultLanguage
const i18n = createI18n({
  locale,
  messages,
  legacy: false,
  fallbackLocale: defaultLanguage,
})

export default i18n

export const mottoLength
  = locale === 'zh' ? zh.mottos.length : en.mottos.length
