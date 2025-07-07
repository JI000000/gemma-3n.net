# Gemma-3n.net - The Ultimate Developer Guide

This repository contains the source code for [gemma-3n.net](https://gemma-3n.net), an independent, community-driven guide and resource hub for developers working with Google's Gemma 3n AI model.

Our mission is to provide the most accurate, up-to-date, and practical information, including tutorials, benchmarks, tools, and in-depth comparisons, to help developers master Gemma 3n.

## ✨ Core Features

- **🚀 Blazing Fast Performance**: Built with [Astro](httpss://astro.build), ensuring a snappy user experience with minimal JavaScript.
- **🌐 Fully Internationalized (i18n)**: Complete English and Chinese (中文) language support.
- **📱 Responsive & Mobile-First**: Optimized for a seamless experience on all devices, from desktop to mobile.
- **💡 Rich Content**:
  - In-depth tutorials and guides.
  - Head-to-head model comparisons (e.g., Gemma 3n vs. Llama 3).
  - Live AI model performance leaderboards.
  - A curated toolkit with official resources, downloads, and community links.
- **💬 Community-Driven**: Integrated [Giscus](https://giscus.app) comment system for community discussions on every blog post.
- **⚖️ Legally Compliant**: Includes dedicated pages for Privacy Policy and Terms of Service.
- **PWA Ready**: Progressive Web App features for offline access.

## 🛠️ Tech Stack

- **Framework**: [Astro](httpss://astro.build)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Astro Components
- **i18n**: Custom routing and translation management
- **Comments**: Giscus

## 本地开发

### 1. 克隆仓库

```bash
git clone https://github.com/your-username/gemma3n.git
cd gemma3n
```

### 2. 安装依赖

我们使用 `npm` 作为包管理器。

```bash
npm install
```

### 3. 运行开发服务器

```bash
npm run dev
```

这将启动一个本地开发服务器，地址为 `http://localhost:4321`。

### 4. 构建生产版本

```bash
npm run build
```

构建后的静态站点文件将位于 `dist/` 目录下。

## 🤝 Contributing

We welcome contributions from the community! Please feel free to open an issue or submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).

## 1. 项目概述

### 1.1. 目标

- **核心目标**: 创建一个关于 Google Gemma 3n AI模型的高质量内容网站，打造成该领域的权威开发者中心 (Developer Hub)。
- **商业目标**: 通过搜索引擎优化 (SEO) 吸引自然流量，并最终通过 Google AdSense 实现盈利。
- **技术目标**: 采用现代化、高性能的Web技术栈，构建一个易于维护、可扩展且用户体验优秀的前端项目。

### 1.2. 技术选型 (Tech Stack)

- **框架 (Framework)**: [Astro](https://astro.build/) - 用于构建高性能、内容驱动的网站。
- **样式 (Styling)**: [Tailwind CSS](https://tailwindcss.com/) - 一个功能类优先的 CSS 框架，用于快速构建现代化UI。
- **内容管理**: Astro Content Collections - 使用 Markdown (`.md`) 文件进行结构化内容管理。
- **版本控制**: Git / GitHub
- **部署 (Deployment)**: Vercel
- **域名/DNS**: Cloudflare

## 2. 开发历程与关键决策

### 阶段一: 项目奠基与手动搭建 (Manual Scaffolding)

- **挑战**: 项目初始化时，`npm create astro@latest` 命令因网络问题连续失败。
- **解决方案**: 切换到手动搭建方案。通过逐一创建 `package.json`, `astro.config.mjs`, `tailwind.config.mjs` 等核心配置文件，成功从零构建了项目骨架。
- **关键修复**: 初次提交时错误地包含了 `node_modules`。通过创建 `.gitignore` 文件并执行 `git rm -r --cached node_modules` 命令，修正了Git仓库，确保了版本控制的纯净性。

### 阶段二: MVP (最小可行产品) 开发

此阶段的目标是快速构建网站的核心功能和内容板块。

- **核心组件**: 依次开发了首页的多个核心UI板块，包括 `HeroSection`, `WhatIsGemma`, `Benchmarks`, `Resources`, 和 `FAQ`。
- **布局与导航**:
    - 创建了 `MainLayout.astro` 作为全站统一布局，并集成了 `Header` 和 `Footer` 组件。
    - 实现了**亮色/暗黑模式 (Light/Dark Mode)** 的切换功能，并通过内联脚本解决了初始加载时的闪烁问题 (FOUC)。
- **内容展示**:
    - 安装并配置了 `@tailwindcss/typography` 插件，以确保Markdown内容获得优美的排版样式。
    - 初步尝试使用独立的 `.astro` 文件作为教程页面。

### 阶段三: 架构重构与功能增强

- **内容架构升级**:
    - **决策**: 将内容管理从独立的 `.astro` 页面重构为由 **Astro Content Collections** 驱动的Markdown工作流。
    - **实施**: 创建了 `src/content/config.ts` 来定义内容结构，将所有文章迁移至 `.md` 文件，并使用动态路由 `[...slug].astro` 来生成文章页面。这极大地提升了内容管理的可维护性和扩展性。
- **高级SEO优化**:
    - **结构化数据**: 为 `FAQ` 页面添加了 `FAQPage` Schema，为博客文章页面添加了 `TechArticle` Schema，以期在搜索引擎结果中获得富媒体摘要 (Rich Snippets) 展示。
    - **站点地图与Robots**: 集成了 `@astrojs/sitemap` 插件自动生成 `sitemap-index.xml`，并创建了 `robots.txt` 文件正确引导搜索引擎爬虫。
    - **社交分享预览**: 在 `MainLayout.astro` 中添加了完整的 **Open Graph** 和 **Twitter Card** 元标签，确保链接在社交媒体上分享时能生成包含标题、描述和图片的精美预览卡片。

- **社区与互动功能**:
    - **评论系统**: 集成了基于GitHub Issues的 [Giscus](https://giscus.app/) 评论系统，组件为 `Giscus.astro`。
    - **邮件订阅**: 集成了 [Mailchimp](https://mailchimp.com/) 邮件订阅服务，创建了 `NewsletterSignup.astro` 组件并配置了表单提交逻辑。
    - **文章分享**: 创建了 `ShareButtons.astro` 组件，支持一键分享到 Twitter(X), LinkedIn 和 Reddit。

### 阶段四: 错误修复与持续集成

- **UI Bug修复**: 解决了亮色模式下因 `prose-invert` 样式误用导致的文字看不清的问题。
- **构建错误修复**:
    - 解决了 `UseCases.astro` 组件中因SVG语法错误导致的构建失败。
    - 解决了 `ShareButtons.astro` 组件因代码编辑未完全同步导致的"幽灵"语法错误，通过**代码覆盖重写**的方式彻底修复。
- **部署问题**:
    - 修复了 `robots.txt` 中错误的sitemap地址。
    - 确认了Google AdSense和GSC的数据延迟属于正常现象。
    - 解决了 `git push` 因网络问题导致的超时失败。

## 3. 项目结构说明

```
gemma3n/
├── public/                # 静态资源 (robots.txt, ads.txt, social-card.png)
├── src/
│   ├── components/        # 可重用的Astro组件 (Header, Footer, FAQ, etc.)
│   │   ├── blog/          # 博客文章 (Markdown .md files)
│   │   └── config.ts      # Astro内容集合的类型定义
│   ├── layouts/
│   │   └── MainLayout.astro # 全局页面布局
│   └── pages/
│       ├── blog/
│       │   ├── [...slug].astro # 博客文章动态路由
│       │   └── index.astro     # 博客列表页
│       └── index.astro      # 网站首页
├── astro.config.mjs       # Astro 配置文件
├── package.json           # 项目依赖与脚本
└── tailwind.config.mjs    # Tailwind CSS 配置文件
```

## 4. 如何本地运行

1.  克隆仓库: `git clone https://github.com/JI000000/gemma-3n.net.git`
2.  进入项目目录: `cd gemma-3n.net`
3.  安装依赖: `npm install`
4.  启动开发服务器: `npm run dev`
5.  在浏览器中打开 `http://localhost:4321`

## 5. 部署与上线指南

- **自动部署**: 项目已配置为通过Vercel进行自动部署。任何推送到 `main` 分支的提交都会触发一次新的生产环境部署。
- **环境变量**:
    - **Giscus**: Giscus评论系统需要在组件 `Giscus.astro` 中配置正确的 `repo`, `repoId`, `category`, `categoryId`。这些值需要从Giscus官网获取。
    - **Mailchimp**: 邮件订阅表单的 `action` URL 已在 `NewsletterSignup.astro` 中硬编码。如果更换列表，需要从Mailchimp后台重新获取。
- **Google服务**:
    - **AdSense**: `ca-pub-9751155071098091` 已在 `MainLayout.astro` 和 `public/ads.txt` 中配置。
    - **Analytics**: `G-LFF5X9VMHP` 已在 `MainLayout.astro` 中配置。

## 6. 后续维护

- **撰写新文章**: 在 `src/content/blog/` 目录下创建一个新的 `.md` 文件，并遵循Frontmatter格式（`title`, `description`, `pubDate`等）。
- **更新组件**: 所有UI组件均位于 `src/components/` 目录下，可按需修改。
- **修改样式**: 全局样式或Tailwind配置可在 `tailwind.config.mjs` 和 `src/layouts/MainLayout.astro` 的 `<style is:global>` 块中调整。

---
*本文档由AI助手根据项目开发历史自动生成。*
*最后更新时间: 2025年6月27日* 