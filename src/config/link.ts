import { Blog, Envelope, Github } from '@vicons/fa'

// ICP 备案号
export const icp = import.meta.env.VITE_ICP

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
if (icp) {
  footerLinks.push({
    name: icp,
    link: 'https://beian.miit.gov.cn',
  })
}
