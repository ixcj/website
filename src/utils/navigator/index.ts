export function getBrowserLanguage() {
  const isEnglish = globalThis.navigator?.language.includes('en')
  return isEnglish ? 'en' : 'zh'
}
