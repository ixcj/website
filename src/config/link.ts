import { Github, Blog } from '@vicons/fa'

// 网站URL
export const siteUrl = import.meta.env.VITE_SITE_URL || 'https://xcj.pw'

// 点击头像的跳转路径
export const avatarLink = 'https://blog.xcj.pw'

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
]
