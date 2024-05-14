// 域
export const domain = 'https://xcj.im'
// 资源路径
export const assetsUrl = `https://file.xcj.im/website`
// 预解析
export const dnsPrefetch = ['https://file.xcj.im']

// 标题
export const title = 'XCJ'
// 副标题
export const subTitle = '一个前端'
// 关键字
export const keywords = '前端,XCJ,Vue,JavaScript,js'
// 描述
export const description = 'XCJ的个人主页。'
// OG图片
export const ogImage = `${assetsUrl}/images/og.png`
// 作者
export const author = 'XCJ'

// dns预解析
export const dnsPrefetchs = dnsPrefetch.map(href => {
  return {
    injectTo: 'head',
    tag: 'link',
    attrs: { rel: 'dns-prefetch', href }
  }
})

// 需要注入的link标签
export const links = [
  ...dnsPrefetchs
]

// 需要注入的meta标签
export const metas = [
  { name: 'keywords', content: keywords },
  { name: 'description', content: description },
  { name: 'author', content: author },
  { name: 'og:title', content: title },
  { name: 'og:type', content: 'website' },
  { name: 'og:image', content: ogImage },
  { name: 'og:url', content: domain },
].map(attrs => {
  return {
    injectTo: 'head',
    tag: 'meta',
    attrs
  }
})

export const tags = [
  ...links,
  ...metas,
  {
    injectTo: 'head',
    tag: 'title',
    children: `${title} | ${subTitle}`,
  }
]

export default {
  domain,
  dnsPrefetch,
  assetsUrl,
  title,
  subTitle,
  keywords,
  description,
  ogImage,
  author,
  tags,
}