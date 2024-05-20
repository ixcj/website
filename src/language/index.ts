import { createI18n } from 'vue-i18n'
import zh from './lang/zh.ts'
import en from './lang/en.ts'

// @ts-ignore
globalThis.__VUE_PROD_DEVTOOLS__ = false

export function getI18n(lang: string = 'zh') {
  return createI18n({
    legacy: false,
    locale: lang,
    fallbackLocale: 'zh',
    messages: {
      zh,
      en
    },
  })
}

const locale = globalThis.location?.pathname.startsWith('/en') ? 'en' : 'zh'

const i18n = createI18n({
  legacy: false,
  locale: locale,
  fallbackLocale: 'zh',
  messages: {
    zh,
    en
  },
})
 
export default i18n