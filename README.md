# Gemma-3n.net

> The Ultimate Developer Guide & Tutorials for Google's Gemma 3n Model

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/your-username/gemma3n)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-ready-green)](https://web.dev/progressive-web-apps/)

## 🚀 项目概述

Gemma-3n.net 是 Google Gemma 3n 模型的终极开发者指南和教程网站。我们提供完整的开发资源，包括快速开始指南、性能基准、部署教程和最佳实践。

### ✨ 核心特性

- 🌐 **双语支持** - 完整的中英文内容
- 📱 **PWA 支持** - 可安装的渐进式 Web 应用
- 🔍 **SEO 优化** - 完整的搜索引擎优化
- 📊 **模型选择器** - 智能模型推荐工具
- 🛠️ **开发工具箱** - 完整的开发资源
- 📈 **性能基准** - 详细的性能对比数据
- 📚 **教程博客** - 丰富的学习资源

## 🏗️ 技术架构

### 核心技术栈

- **框架**: [Astro](https://astro.build/) - 静态站点生成器
- **语言**: [TypeScript](https://www.typescriptlang.org/) - 类型安全
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- **部署**: 静态站点部署 (Vercel/Netlify)

### 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Header.astro    # 导航栏组件
│   ├── Footer.astro    # 页脚组件
│   └── ...
├── pages/              # 英文页面
│   ├── index.astro     # 首页
│   ├── blog/           # 博客页面
│   ├── toolkit.astro   # 工具箱
│   └── ...
├── pages/zh/           # 中文页面
│   ├── index.astro     # 中文首页
│   ├── blog/           # 中文博客
│   └── ...
├── i18n/               # 国际化配置
│   ├── locales/
│   │   ├── en/         # 英文翻译
│   │   └── zh/         # 中文翻译
│   └── index.ts        # i18n 配置
├── layouts/            # 布局组件
├── content/            # 博客内容
└── styles/             # 全局样式
```

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发服务器

```bash
npm run dev
```

访问 [http://localhost:4321](http://localhost:4321)

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📁 页面结构

### 英文版本 (`/`)

| 页面 | 路径 | 描述 |
|------|------|------|
| 首页 | `/` | 主页面，包含 Hero Section 和核心功能 |
| 关于 | `/about` | 项目介绍和团队信息 |
| 博客 | `/blog` | 教程和文章列表 |
| 工具箱 | `/toolkit` | 开发资源和工具 |
| 模型选择器 | `/model-selector` | 智能模型推荐 |
| 演示 | `/demo` | 在线演示功能 |
| 对比 | `/compare/gemma-vs-llama3` | 模型对比分析 |
| 排行榜 | `/leaderboard` | 性能排行榜 |

### 中文版本 (`/zh/`)

所有英文页面都有对应的中文版本，路径前缀为 `/zh/`

## 🎨 设计系统

### 颜色规范

```css
/* 主色调 */
--primary: #3B82F6 (blue-600)
--secondary: #8B5CF6 (purple-500)
--accent: #10B981 (emerald-500)

/* 中性色 */
--dark: #1E293B (slate-800)
--light: #F8FAFC (slate-50)
--gray: #64748B (slate-500)
```

### 间距系统

```css
--spacing-xs: 0.5rem (8px)
--spacing-sm: 1rem (16px)
--spacing-md: 1.5rem (24px)
--spacing-lg: 2rem (32px)
--spacing-xl: 3rem (48px)
```

### 组件规范

- **一致性**: 相同功能使用相同组件
- **可复用性**: 组件化设计，避免重复代码
- **响应式**: 移动优先，渐进增强
- **可访问性**: 语义化 HTML，键盘导航支持

## 🌐 国际化

### 翻译文件结构

```
src/i18n/locales/
├── en/
│   ├── common.ts       # 通用翻译
│   ├── nav.ts          # 导航翻译
│   ├── home.ts         # 首页翻译
│   └── ...
└── zh/
    ├── common.ts       # 中文通用翻译
    ├── nav.ts          # 中文导航翻译
    ├── home.ts         # 中文首页翻译
    └── ...
```

### 翻译键命名规范

```typescript
// 格式: 'page.section.subsection.element'
'nav.model-selector': '模型选择器'
'toolkit.quickstart.ollama.title': 'Ollama 设置'
'home.hero.title': 'Master Gemma 3n'
```

### 使用翻译

```astro
---
import { useTranslations } from '../i18n';

const t = useTranslations(lang);
---

<h1>{t('home.hero.title')}</h1>
```

## 🔧 开发指南

### 代码规范

#### 文件命名

- **组件**: PascalCase (`Header.astro`)
- **页面**: kebab-case (`model-selector.astro`)
- **翻译**: camelCase (`toolkit.ts`)
- **样式**: kebab-case (`mobile.css`)

#### 组件开发规范

```astro
---
// 1. 导入依赖
import Component from './Component.astro';

// 2. 定义 Props 接口
interface Props {
  title: string;
  description?: string;
}

// 3. 解构 Props
const { title, description = '' } = Astro.props;
---

<!-- 4. 语义化 HTML 结构 -->
<section class="component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</section>

<!-- 5. 组件样式 -->
<style>
  .component {
    /* 样式定义 */
  }
</style>
```

#### Git 提交规范

```bash
# 功能开发
git commit -m "feat: 添加模型选择器功能"

# 问题修复
git commit -m "fix: 修复中文页面重复标题问题"

# 文档更新
git commit -m "docs: 更新 README 文档"

# 样式优化
git commit -m "style: 优化移动端响应式布局"
```

### 性能优化

#### 构建优化

- 使用 Astro 的静态生成
- 图片懒加载和压缩
- CSS 和 JS 代码分割
- PWA 缓存策略

#### SEO 优化

- 结构化数据 (JSON-LD)
- Meta 标签优化
- 站点地图生成
- hreflang 标签
- 语义化 HTML

### 测试策略

#### 构建测试

```bash
npm run build
```

#### 开发测试

```bash
npm run dev
```

#### 类型检查

```bash
npm run type-check
```

## 📊 性能指标

### 构建性能

- **页面数量**: 50 个页面
- **构建时间**: < 6 秒
- **资源压缩**: gzip 压缩
- **代码分割**: 自动分割

### 用户体验

- **首屏加载**: < 2 秒
- **PWA 支持**: 离线可用
- **响应式设计**: 移动优先
- **动画过渡**: 平滑体验

## 🚀 部署

### 环境变量

```env
# 生产环境
NODE_ENV=production
SITE_URL=https://gemma-3n.net

# 开发环境
NODE_ENV=development
SITE_URL=http://localhost:4321
```

### 部署平台

#### Vercel (推荐)

1. 连接 GitHub 仓库
2. 设置构建命令: `npm run build`
3. 设置输出目录: `dist`
4. 自动部署

#### Netlify

1. 连接 GitHub 仓库
2. 设置构建命令: `npm run build`
3. 设置发布目录: `dist`
4. 自动部署

## 🤝 贡献指南

### 开发流程

1. Fork 项目
2. 创建功能分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'feat: add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 创建 Pull Request

### 代码审查

- 构建必须通过
- 功能测试通过
- 代码规范符合
- 文档更新完整

## 📝 更新日志

### v1.0.0 (2025-01-XX)

#### ✨ 新功能

- 🌐 完整的中英文双语支持
- 📱 PWA 功能实现
- 🎯 模型选择器工具
- 🛠️ 完整的开发工具箱
- 📊 性能基准对比
- 📚 丰富的教程博客

#### 🔧 优化

- ⚡ 性能优化和代码分割
- 🎨 统一的设计系统
- 📱 移动端响应式优化
- 🔍 SEO 全面优化

#### 🐛 修复

- 修复中文页面重复标题问题
- 修复导航栏路径问题
- 修复构建错误

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Google](https://ai.google.dev/) - Gemma 3n 模型
- [Astro](https://astro.build/) - 静态站点生成器
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Hugging Face](https://huggingface.co/) - 模型托管平台

## 📞 联系我们

- 网站: [https://gemma-3n.net](https://gemma-3n.net)
- 邮箱: [contact@gemma-3n.net](mailto:contact@gemma-3n.net)
- GitHub: [https://github.com/your-username/gemma3n](https://github.com/your-username/gemma3n)

---

**Made with ❤️ by the Gemma-3n.net Team** 