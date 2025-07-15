import type { StereoCardItem } from '@/types/StereoCard'
import type { TimelineTurntableItem } from '@/types/TimelineTurntable'

export const name = 'XCJ'
export const intro = '一个前端'

export const mottos = [
  '那些杀不死我们的，只会让我们更强大。',
  '我们飞得越高，在不会飞的人眼里，我们就显得越渺小。',
  '每个不曾起舞的日子，都是对生命的一种辜负。',
  '白昼之光，岂知夜色之深。',
  '其实人跟树一样，越是往高处走，它的根就越要伸向黑暗的地底。',
]

export const introduce = [
  `<p>嗨，我是 <a href="https://blog.xcj.pw/about" target="_blank" class="page-link hide-page-cursor">XCJ</a>！我是一名前端工程师，擅长使用 Vue.js 和 Three.js 以及其他现代 JavaScript 工具来构建酷炫的网页和应用。</p>`,
  `<p>在我的工作中，我总是在寻找将代码的优雅和功能的复杂性完美结合的方法，尤其注重视觉效果与用户体验的和谐。</p>`,
  `<p>在我的<a href="https://blog.xcj.pw" target="_blank" class="page-link hide-page-cursor">个人博客</a>上，我会把我的一些技术心得和职业经历分享给大家。如果你对前端开发感兴趣，或者只是想看看有什么新鲜事，这里可能会有你想要的东西。</p>`,
  `<p>如果您想进一步了解我，欢迎访问我的 <a href="https://github.com/ixcj" target="_blank" class="page-link hide-page-cursor">GitHub</a> 或查看<a href="https://demo.xcj.pw" target="_blank" class="page-link hide-page-cursor">个人项目集</a>。</p>`,
].join('\n')

export const projects: StereoCardItem[] = [
  {
    name: '个人网站',
    logo: '/avatar.png',
    links: [
      { href: 'https://github.com/ixcj/website', content: '_GITHUB_', title: 'GitHub' },
    ],
    description: `这个网站是我展示个人作品和专业技能的数字名片，旨在为访客提供一个全面的了解我的平台。`,
    tags: [
      { content: '积极开发中', type: 'success' },
      { content: '当前浏览的页面', type: 'warning' },
    ],
  },
  {
    name: '菜鸡音乐',
    logo: 'https://file.xcj.im/website/images/caiji-music-logo.png',
    links: [
      { href: 'https://github.com/ixcj/caiji-music', content: '_GITHUB_', title: 'GitHub' },
      { href: 'https://music.ixcj.cn', content: '_ARROW_UP_RIGHT_', title: '查看演示' },
    ],
    description: `菜鸡音乐是一款在线音乐应用，提供歌曲搜索、免费歌曲在线试听、MV播放等功能。`,
    tags: [
      { content: '不再维护', type: 'warning' },
    ],
  },
]

export const experiences: TimelineTurntableItem[] = [
  {
    date: [
      { year: 2020, month: 7 },
      { year: 2021, month: 12 }
    ],
    title: '大标题',
    children: [
      {
        title: '小标题',
        describe: `
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        `,
        range: [0, 0.5],
      },
      {
        title: '小标题2',
        describe: `
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        `,
        range: [0.5, 1],
      },
    ],
  },
  {
    date: [
      { year: 2022, month: 1 },
      { year: 2022, month: 12 }
    ],
    title: '大标题2',
    children: [
      {
        title: '小标题',
        describe: `
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        `,
        range: [0, 1],
      },
    ],
  },
  {
    date: [
      { year: 2023, month: 5 }, 
      'now'
    ],
    title: '大标题23',
    children: [
      {
        title: '小标题',
        describe: `
        <div>描述</div>
        <div>描述</div>
        `,
        range: [0, 1],
      },
    ],
  },
]

export default {
  lang: 'zh-CN',
  language: '中',
  
  name,
  intro,
  mottos,
  title: `${name} · ${intro}`,
  description: `${name}的个人主页`,
  author: name,

  SectionText: {
    home: '首页',
    about: '关于',
    skills: '技能',
    project: '项目',
    experience: '经历',
  },

  SectionTitle: {
    home: '首页',
    about: '关于我',
    skills: '我的技能',
    project: '我的项目',
    experience: '我的经历',
  },

  introduce: encodeURIComponent(JSON.stringify(introduce)),

  projects: encodeURIComponent(JSON.stringify(projects)),

  experiences: encodeURIComponent(JSON.stringify(experiences)),

  contributionCalendar: 'GitHub 贡献日历',
}
