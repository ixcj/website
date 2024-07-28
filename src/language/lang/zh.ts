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
    cover: '/avatar.png',
    links: [],
    introduce: '',
    tags: '',
  }
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
}
