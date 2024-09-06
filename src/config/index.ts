// Section 配置
export const sectionList = <const>['home', 'about', 'skills', 'project', 'experience']
export type Section = typeof sectionList[number]

// 链接
export * from './link'

// 技能
export * from './skill'

// 断点
export * from './breakpoints'
