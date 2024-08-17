// Section 配置
export const sectionList = <const>['home', 'about', 'skills', 'project', 'experience']
export type Section = typeof sectionList[number]

// GitHub 显示贡献图表的用户名，为空则不显示
export const githubContributionUser = 'ixcj'

// 链接
export * from './link'

// 技能
export * from './skill'

// 断点
export * from './breakpoints'
