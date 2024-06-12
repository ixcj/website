// Section 配置
export const sectionList = <const>['home', 'about', 'project', 'experience']
export type Section = typeof sectionList[number]

// 链接
export * from './link'

// 断点
export * from './breakpoints'
