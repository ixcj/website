import { createI18n } from 'vue-i18n'
import zh from './lang/zh.ts'
import en from './lang/en.ts'

// @ts-ignore
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

export const mottoLength =
  locale === 'zh' ? zh.mottos.length : en.mottos.length
