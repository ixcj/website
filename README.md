# [ixcj/website](https://new.xcj.im)

基于 Vue3 开发的个人作品和专业技能的数字名片网站。

## 技术栈

- 🚀 [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- 🛠️ [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- 📦 [Vite](https://vitejs.dev/) - 下一代前端构建工具
- 🎨 [Sass](https://sass-lang.com/) - CSS 预处理器
- 🌐 [Vue I18n](https://vue-i18n.intlify.dev/) - Vue.js 的国际化插件
- 📅 [GitHub Calendar](https://github.com/Bloggify/github-calendar) - GitHub 贡献日历组件
- 🎯 [@vueuse/core](https://vueuse.org/) - Vue Composition API 工具集

## 在线预览

- 演示地址：[https://new.xcj.im](https://new.xcj.im)
- 预览截图：

![Preview](https://file.xcj.im/website/images/preview.png)

## 功能&特性

- [x] I18n
- [x] 主题切换
- [x] 打字机效果
- [x] GitHub 贡献日历
- [x] 立体镭射卡片
  - [x] 立体镭射卡片兼容移动端陀螺仪
- [x] 时间轴转盘

## 快速开始

### 环境要求

- Node.js >= 16
- pnpm >= 8

### 安装依赖

```bash
pnpm i
```

### 开发环境

```bash
pnpm dev
```

### 生产构建

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 项目配置

配置类 -> `src/config/index.ts`
  - **sectionList**: 需要显示的板块
  - **githubContributionUser**: GitHub 用户名。用于显示对应用户的贡献日历，设置为空字符串可隐藏
  - **cheatsKeys**: 彩蛋秘籍，按顺序按下按键可触发彩蛋，默认触发 `src/utils/cheats.ts` 下的 `cheatsExecute` 方法
  - **其他**: 其他配置请自行查看

文本类 -> `src/language/lang/**.ts`
  - **name**: 名称
  - **intro**: 介绍
  - **mottos**: 座右铭集合。打字机效果
  - **projects**: 项目集合。立体卡片效果
  - **experiences**: 经历集合。时间转盘效果
  - **SectionText**: Header 中显示的板块名称
  - **SectionTitle**: 板块 Title
  - **contributionCalendar**: GitHub 贡献日历显示名称

## Star 趋势

![Star History Chart](https://starchart.cc/ixcj/website.svg)

## 许可证

[MIT](https://github.com/ixcj/website/blob/main/LICENSE) © 2024-PRESENT [XCJ](https://github.com/ixcj)