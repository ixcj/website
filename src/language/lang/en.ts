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

  projects: JSON.stringify(projects),

  contributionCalendar: 'Contribution calendar',
}
