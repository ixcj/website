import { useLocalStorage } from '@vueuse/core'
import { getBrowserLanguage } from '@/utils'

export const language = useLocalStorage('language', getBrowserLanguage())
