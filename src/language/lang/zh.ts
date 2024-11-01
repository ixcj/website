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

export const projects: StereoCardItem[] = [
  {
    name: '个人网站',
    icon: '/avatar.png',
    links: [
      { href: 'https://github.com/ixcj/website', content: '_GITHUB_', title: 'GitHub' },
    ],
    description: `这个网站是我展示个人作品和专业技能的数字名片，旨在为访客提供一个全面的了解我的平台。`,
    tags: [
      { content: '积极开发中', type: 'success' },
    ],
  },
  {
    name: '菜鸡音乐',
    icon: 'https://music.xcj.im/img/icons/android-chrome-192x192.png',
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
    date: ['2020年1月', '2021年12月'],
    angleRange: [0, 90],
    children: [
      {
        title: 'title',
        describe: 'describe',
        range: [0, 0.5],
      },
      {
        title: '',
        describe: '',
        range: [0.5, 1],
      },
    ],
  },
  {
    date: ['2021年1月', '2021年12月'],
    angleRange: [90, 180],
    children: [],
  },
  {
    date: ['2022年1月', '2022年12月'],
    angleRange: [180, 270],
    children: [],
  },
  {
    date: ['2023年1月', '2023年12月'],
    angleRange: [270, 360],
    children: [],
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

  experiences: encodeURIComponent(JSON.stringify(experiences)),

  contributionCalendar: '贡献日历',
}
