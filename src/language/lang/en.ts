export const name = 'XCJ'
export const intro = 'A Frontend Developer'

export const mottos = [
  'That which does not kill us makes us stronger.',
  'The higher we soar, the smaller we appear to those who cannot fly.',
  'Und verloren sei uns der Tag, wo nicht ein Mal getanzt wurde!',
  'The light of day knows the depth of night.',
  'In fact, The more people go up the height like trees, The more its roots will reach the dark ground.',
]

export const projects = [

]

export default {
  lang: 'en-US',
  language: 'EN',
  
  name,
  intro,
  mottos,
  title: `${name} · ${intro}`,
  description: `${name}\'s Personal Homepage`,
  keywords: `${name},Personal Homepage,Frontend Developer,ThreeUse,Vue.js`,
  author: name,

  SectionText: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    project: 'Project',
    experience: 'Experience',
  },

  SectionTitle: {
    home: 'Home',
    about: 'About Me',
    skills: 'My Skills',
    project: 'My Project',
    experience: 'My Experience',
  },

  personalIntroduction: `
    <p>Hi, I'm <a href="https://blog.xcj.im/about" target="_blank" class="hide-page-cursor">XCJ</a>! I'm a front-end engineer skilled in technologies like Vue.js and Three.js.<p>
    <p>In my work, I always strive to perfectly blend the elegance of code with the complexity of functionality, with a special focus on harmonizing visual effects and user experience.<p>
    <p>On my <a href="https://blog.xcj.im" target="_blank" class="hide-page-cursor">Blog</a>, I share my technical insights and professional experiences. If you're interested in front-end development, or just looking to see what's new, you might find something of interest there.<p>
    <p>If you'd like to learn more about me, feel free to visit my <a href="https://github.com/ixcj" target="_blank" class="hide-page-cursor">GitHub</a> or check out my portfolio of <a href="https://demo.xcj.im" target="_blank" class="hide-page-cursor">Projects</a>.<p>
  `,

  projects: JSON.stringify(projects),
}
