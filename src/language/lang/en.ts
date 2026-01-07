import type { StereoCardItem } from '@/types/StereoCard'
import type { TimelineTurntableItem } from '@/types/TimelineTurntable'

export const name = 'XCJ'
export const intro = 'A Front-end Developer'

export const mottos = [
  'That which does not kill us makes us stronger.',
  'The higher we soar, the smaller we appear to those who cannot fly.',
  'Und verloren sei uns der Tag, wo nicht ein Mal getanzt wurde!',
  'The light of day knows the depth of night.',
  'In fact, The more people go up the height like trees, The more its roots will reach the dark ground.',
]

export const introduce = [
  `<p>Hi, I’m <a href="https://blog.xcj.pw/about" target="_blank" class="page-link hide-page-cursor">XCJ</a>！I am a front-end engineer skilled in using Vue.js and Three.js, as well as other modern JavaScript tools, to create amazing web pages and applications.</p>`,
  `<p>In my work, I always strive to perfectly blend the elegance of code with the complexity of functionality, with a special focus on harmonizing visual effects and user experience.</p>`,
  `<p>On my <a href="https://blog.xcj.pw" target="_blank" class="page-link hide-page-cursor">Blog</a>, I share my technical insights and professional experiences. If you're interested in front-end development, or just looking to see what's new, you might find something of interest there.</p>`,
  `<p>If you'd like to learn more about me, feel free to visit my <a href="https://github.com/ixcj" target="_blank" class="page-link hide-page-cursor">GitHub</a> or check out my portfolio of <a href="https://demo.xcj.pw" target="_blank" class="page-link hide-page-cursor">Projects</a>.</p>`,
].join('\n')

export const projects: StereoCardItem[] = [
  {
    name: 'Personal Website',
    logo: 'avatar.png',
    links: [
      { href: 'https://github.com/ixcj/website', content: '_GITHUB_', title: 'GitHub' },
    ],
    description: `This website is my digital portfolio, showcasing my work and skills to give visitors a clear understanding of who I am. `,
    tags: [
      { content: 'Current page', type: 'success' },
    ],
  },
  {
    name: 'caiji-music',
    logo: 'https://file.xcj.pw/img/caiji-music-logo.png',
    links: [
      { href: 'https://github.com/ixcj/caiji-music', content: '_GITHUB_', title: 'GitHub' },
      { href: 'https://music.xcj.im', content: '_EXTERNAL_LINK_', title: 'Live Demo' },
    ],
    description: `caiji-music is an online music app offering song search, free online listening, MV playback, and more.`,
    tags: [
      { content: 'No longer maintained', type: 'warning' },
    ],
  },
]

export const experiences: TimelineTurntableItem[] = [
  {
    date: [
      { year: 2020, month: 7 },
      { year: 2021, month: 12 },
    ],
    title: 'Frozen Products Supply Chain Company',
    children: [
      {
        title: 'Front-End Developer',
        describe: `
        <div>Maintained the backend management system and developed new features to ensure system stability and efficiency.</div>
        <div>Developed and maintained a supply chain management mini-program, enhancing user experience and optimizing business processes.</div>
        `,
        range: [0, 1],
      },
    ],
  },
  {
    date: [
      { year: 2022, month: 1 },
      { year: 2022, month: 12 },
    ],
    title: 'Digital Services Company',
    children: [
      {
        title: 'Front-End Developer',
        describe: `
        <div>Participated in requirement evaluations and worked closely with product and backend teams to ensure feasibility and project planning.</div>
        <div>Responsible for ongoing optimization and new feature development for the backend management system to enhance system efficiency.</div>
        <div>Developed and maintained a supply chain mini-program, ensuring its alignment with business needs.</div>
        <div>Constantly improved user experience through detailed feedback and testing to enhance product quality.</div>
        `,
        range: [0, 1],
      },
    ],
  },
  {
    date: [
      { year: 2023, month: 5 },
      'now',
    ],
    title: 'Digital Twin Company',
    children: [
      {
        title: 'Front-End Developer',
        describe: `
        <div>Involved in front-end development for the digital twin platform, creating efficient data interaction and real-time display features.</div>
        <div>Optimized product performance using various technical methods, enhancing system stability and scalability.</div>
        `,
        range: [0, 1],
      },
    ],
  },
]

export default {
  lang: 'en-US',
  language: 'EN',

  name,
  intro,
  mottos,
  title: `${name} · ${intro}`,
  description: `${name}\'s Personal Homepage`,
  author: name,

  SectionText: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    project: 'Projects',
    experience: 'Experiences',
  },

  SectionTitle: {
    home: 'Home',
    about: 'About Me',
    skills: 'My Skills',
    project: 'My Projects',
    experience: 'My Experiences',
  },

  introduce: encodeURIComponent(JSON.stringify(introduce)),

  projects: encodeURIComponent(JSON.stringify(projects)),

  experiences: encodeURIComponent(JSON.stringify(experiences)),

  contributionCalendar: 'GitHub Contribution calendar',
}
