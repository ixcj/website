export const name = 'XCJ'
export const intro = '一个前端'

export const mottos = [
  '那些杀不死我们的，只会让我们更强大。',
  '我们飞得越高，在不会飞的人眼里，我们就显得越渺小。',
  '每个不曾起舞的日子，都是对生命的一种辜负。',
  '白昼之光，岂知夜色之深。',
  '其实人跟树一样，越是往高处走，它的根就越要伸向黑暗的地底。',
]

export const projects = [
  {
    name: '个人网站',
    icon: '/avatar.png',
    links: [
      { href: 'https://github.com/ixcj/website', content: '_GITHUB_', title: 'GitHub' },
      { href: 'https://new.xcj.im', content: '_ARROW_UP_RIGHT_', title: 'DEMO' },
    ],
    description: `
      <p>这个网站是我展示个人作品和专业技能的数字名片，旨在为访客提供一个全面的了解我的平台。</p>
      <p>本项目使用 <strong>Vue3</strong> 和 <strong>Vite</strong> 构建，利用 <strong>vite-ssg</strong> 进行静态站点生成以获得 SEO 优势。</p>
    `,
    tags: [
      { content: '积极开发中', type: 'success' },
    ],
  },
  {
    name: '菜鸡音乐',
    icon: 'https://music.xcj.im/img/icons/android-chrome-192x192.png',
    links: [
      { href: 'https://github.com/ixcj/caiji-music', content: '_GITHUB_', title: 'GitHub' },
      { href: 'https://music.xcj.im', content: '_ARROW_UP_RIGHT_', title: 'DEMO' },
    ],
    description: `
      <p>菜鸡音乐是一款在线音乐应用，提供歌曲搜索、免费歌曲在线试听、MV播放等功能。</p>
      <p>由于依赖 NeteaseCloudMusicApi 作为 API，且 NeteaseCloudMusicApi 在 GitHub 上不再维护，故本项目不再维护。</p>
    `,
    tags: [
      { content: '不再维护', type: 'warning' },
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

  projects: encodeURIComponent(JSON.stringify(projects)),

  contributionCalendar: '贡献日历',
}
