# [ixcj/website](https://new.xcj.im)

一个基于 Vue 3 构建的个人主页模板，用来展示个人介绍、技能栈、项目经历和职业时间线。项目以静态站点形式输出，适合直接部署到静态托管平台，也方便 fork 后快速改造成自己的在线名片。

## 在线预览

- 站点地址：[https://new.xcj.im](https://new.xcj.im)
- 预览截图：

![Preview](https://file.xcj.im/website/images/preview.png)

## 特性

- 基于 `Vue 3 + TypeScript + Vite` 构建
- 使用 `vite-ssg` 生成静态页面，便于部署
- 内置中英文双语路由
- 支持亮色 / 暗色主题切换
- 首页打字机文案效果
- GitHub Contribution Calendar 展示
- 项目区使用立体镭射卡片效果
- 经历区支持时间轴 / 转盘两种展示模式
- 移动端支持陀螺仪交互
- 支持接入 Umami 统计脚本

## 技术栈

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [vite-ssg](https://github.com/antfu-collective/vite-ssg)
- [Sass](https://sass-lang.com/)
- [Vue I18n](https://vue-i18n.intlify.dev/)
- [@vueuse/core](https://vueuse.org/)
- [GitHub Calendar](https://github.com/Bloggify/github-calendar)

## 快速开始

### 环境要求

- Node.js `>= 16`
- pnpm `>= 8`

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

默认开发端口为 `23333`。

### 生产构建

```bash
pnpm build
```

构建完成后，静态文件会输出到 `dist/` 目录。

### 本地预览构建结果

```bash
pnpm preview
```

### 代码检查

```bash
pnpm lint
```

## 配置说明

### 环境变量

可通过 `.env` 文件或部署平台环境变量进行配置：

- `VITE_SITE_URL`：站点完整 URL，用于 SEO 和 Open Graph
- `VITE_ICP`：备案号，配置后会显示在页脚
- `VITE_UMAMI_URL`：Umami 脚本地址，例如 `https://umami.is/script.js`
- `VITE_UMAMI_WEBSITE_ID`：Umami 站点 ID

### 主要配置入口

- `src/config/index.ts`：页面板块开关、经历展示类型、排序方式、GitHub 用户名、彩蛋按键等核心配置
- `src/config/link.ts`：头像链接、社交链接、页脚链接、备案信息
- `src/config/skill.ts`：技能列表
- `src/config/script.ts`：第三方脚本注入逻辑
- `src/config/url.ts`：站点地址、OG 图片、头像资源等站点级 URL 配置

### 文案与内容数据

- `src/language/lang/zh.ts`
- `src/language/lang/en.ts`

这两个文件负责维护多语言内容，包括：

- 基础信息：姓名、标题、简介、SEO 文案
- 首页文案：打字机语句、自我介绍
- 项目列表：名称、链接、描述、标签
- 经历列表：时间、职位、描述
- 各板块标题与导航文本

## 自定义建议

如果你准备把这个项目改成自己的主页，通常只需要优先修改以下内容：

- `src/language/lang/*.ts` 中的个人介绍、项目和经历数据
- `src/config/link.ts` 中的社交账号和页脚链接
- `src/config/index.ts` 中的板块显示顺序、GitHub 用户名和展示模式
- `src/config/url.ts` 中的站点地址和分享图配置

## 部署

本项目输出为纯静态资源，构建后可直接部署到：

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- Nginx 静态站点服务

## 许可证

[MIT](https://github.com/ixcj/website/blob/main/LICENSE) © 2024-PRESENT [XCJ](https://github.com/ixcj)
