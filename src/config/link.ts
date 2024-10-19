import { Github, Blog, Envelope } from '@vicons/fa'

// 网站URL
export const siteUrl = import.meta.env.VITE_SITE_URL || 'https://xcj.pw'

// 点击头像的跳转路径
export const avatarLink = 'https://github.com/ixcj'

// 社交链接
export const socialLinks = [
  {
    name: 'GitHub',
    link: 'https://github.com/ixcj',
    icon: Github,
  },
  {
    name: 'Blog',
    link: 'https://blog.xcj.pw',
    icon: Blog,
  },
  {
    name: 'Email',
    link: 'mailto:i@xcj.im',
    icon: Envelope,
  },
]

// 页脚链接
export const footerLinks = [
  {
    name: 'Powered by ixcj/website',
    link: 'https://github.com/ixcj/website',
  },
]

// 根据条件显示备案信息
const _siteUrl = siteUrl.replace(/\/$/g, '')
if (_siteUrl.endsWith('//xcj.pw') || _siteUrl.endsWith('.xcj.pw')) {
  footerLinks.push({
    name: '渝ICP备2021011542号-3',
    link: 'https://beian.miit.gov.cn',
  })
}
