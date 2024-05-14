export function getBrowserLanguage() {
  const isChinese = globalThis.navigator?.language.includes('zh')
  return isChinese ? 'zh' : 'en'
}
