// Section 配置
export const sectionList = <const>['home', 'about', 'skills', 'project', 'experience']
export type Section = typeof sectionList[number]

// GitHub 显示贡献图表的用户名，为空则不显示
export const githubContributionUser = 'ixcj'

// onLoad 事件最大等待时间
export const loadMaxWaitingTime = 1500

// 彩蛋秘籍
export const cheatsKeys: string[] = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
  'KeyB',
  'KeyA',
]

// 断点
export * from './breakpoints'

// 链接
export * from './link'

// 额外 JS 引入
export * from './script'

// 技能
export * from './skill'

// URL
export * from './url'
