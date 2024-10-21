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
  {
    name: 'Personal Website',
    icon: '/avatar.png',
    links: [
      { href: 'https://github.com/ixcj/website', content: '_GITHUB_', title: 'GitHub' },
      { href: 'https://new.xcj.im', content: '_ARROW_UP_RIGHT_', title: 'DEMO' },
    ],
    description: `
      <p>This website is my digital portfolio, showcasing my work and skills to give visitors a clear understanding of who I am.</p>
      <p>This project is built with Vue 3 and Vite, utilizing vite-ssg for static site generation to gain SEO advantages.</p>
    `,
    tags: [
      { content: 'In active development', type: 'success' },
    ],
  },
  {
    name: 'Caiji Music',
    icon: 'https://music.xcj.im/img/icons/android-chrome-192x192.png',
    links: [
      { href: 'https://github.com/ixcj/caiji-music', content: '_GITHUB_', title: 'GitHub' },
      { href: 'https://music.xcj.im', content: '_ARROW_UP_RIGHT_', title: 'DEMO' },
    ],
    description: `
      <p>Caiji Music is an online music app offering song search, free online listening, MV playback, and more.</p>
      <p>This project will not be maintained due to reliance on the NeteaseCloudMusicApi, which is no longer supported on GitHub.</p>
    `,
    tags: [
      { content: 'No longer maintained', type: 'warning' },
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

  projects: encodeURIComponent(JSON.stringify(projects)),

  contributionCalendar: 'Contribution calendar',
}
