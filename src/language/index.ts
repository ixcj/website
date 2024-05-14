import { createI18n } from 'vue-i18n'
import { language } from '@/store/lang'
import zh from './lang/zh.ts'
import en from './lang/en.ts'

const i18n = createI18n({
  legacy: false,
  locale: language.value,
  fallbackLocale: 'zh',
  messages: {
    zh,
    en
  },
});
 
export default i18n;