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
  keywords: `${name},个人主页,前端开发者,ThreeUse,Vue.js`,
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

  personalIntroduction: `
    <p>嗨，我是 <a href="https://blog.xcj.im/about" target="_blank" class="hide-page-cursor">XCJ</a>！我是一名前端工程师，擅长 Vue.js 和 Three.js 等技术。<p>
    <p>在我的工作中，我总是在寻找将代码的优雅和功能的复杂性完美结合的方法，尤其注重视觉效果与用户体验的和谐。<p>
    <p>在我的<a href="https://blog.xcj.im" target="_blank" class="hide-page-cursor">个人博客</a>上，我会把我的一些技术心得和职业经历分享给大家。如果你对前端开发感兴趣，或者只是想看看有什么新鲜事，这里可能会有你想要的东西。<p>
    <p>如果您想进一步了解我，欢迎访问我的 <a href="https://github.com/ixcj" target="_blank" class="hide-page-cursor">GitHub</a> 或查看<a href="https://demo.xcj.im" target="_blank" class="hide-page-cursor">个人项目集</a>。<p>
  `,

  projects: JSON.stringify(projects),
}
