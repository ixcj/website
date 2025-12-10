import { createI18n } from 'vue-i18n'
import { defaultLanguage, messages } from './messages'

// @ts-expect-error 禁用开发者工具支持
globalThis.__VUE_PROD_DEVTOOLS__ = false

const baseUrl = import.meta.env.BASE_URL

const locale = getLang(globalThis.location?.pathname, baseUrl)
  || defaultLanguage
const i18n = createI18n({
  locale,
  messages,
  legacy: false,
  fallbackLocale: defaultLanguage,
})

export default i18n

export const mottoLength
  = locale === 'zh' ? messages.zh.mottos.length : messages.en.mottos.length

function getLang(currentPath: string, prefix = '') {
  const cleanPrefix = (prefix ?? '')
    .toString()
    .trim()
    .replace(/^\/+|\/+$/g, '')

  if (!cleanPrefix) {
    const match = currentPath?.match(/^\/([a-z]{2,})\/?/i)
    return match ? match[1] : null
  }

  const regex = new RegExp(`^/${cleanPrefix}/([a-zA-Z]{2,})/?`)
  const match = currentPath?.match(regex)

  return match ? match[1] : null
}
