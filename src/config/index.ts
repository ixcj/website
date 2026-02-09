// Section 配置
export const sectionList = <const>['home', 'about', 'skills', 'project', 'experience']
export type Section = typeof sectionList[number]

// 经历组件类型配置
// 'turntable' - 转盘时间轴（默认）   'line' - 线性时间轴
export type ExperienceType = 'turntable' | 'line'
export const experienceType: ExperienceType = 'line'

// 经历组件排序
// 'desc' - 时间降序（默认）   'asc' - 时间升序
export type ExperienceSort = 'desc' | 'asc'
export const experienceSort: ExperienceSort = 'desc'

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
