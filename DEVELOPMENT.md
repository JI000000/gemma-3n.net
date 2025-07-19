# 开发指南

> Gemma-3n.net 项目开发指南与最佳实践

## 🎯 项目愿景

我们的目标是创建一个关于 Google Gemma 3n AI 模型的高质量内容网站，打造成该领域的权威开发者中心 (Developer Hub)。通过搜索引擎优化 (SEO) 吸引自然流量，并最终通过 Google AdSense 实现盈利。

## 🏗️ 技术架构

### 核心技术栈

- **框架**: [Astro](https://astro.build/) - 静态站点生成器
- **语言**: [TypeScript](https://www.typescriptlang.org/) - 类型安全
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- **部署**: Vercel (自动部署)
- **域名**: Cloudflare DNS

### 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Header.astro    # 导航栏组件
│   ├── Footer.astro    # 页脚组件
│   ├── Benchmarks.astro # 性能基准组件
│   ├── Resources.astro # 资源组件
│   ├── FAQ.astro       # FAQ组件
│   └── ...
├── pages/              # 英文页面
│   ├── index.astro     # 首页
│   ├── about.astro     # 关于页面
│   ├── blog/           # 博客页面
│   ├── toolkit.astro   # 工具箱
│   ├── model-selector.astro # 模型选择器
│   └── ...
├── pages/zh/           # 中文页面
│   ├── index.astro     # 中文首页
│   ├── about.astro     # 中文关于页面
│   ├── blog/           # 中文博客
│   └── ...
├── i18n/               # 国际化配置
│   ├── locales/
│   │   ├── en/         # 英文翻译
│   │   └── zh/         # 中文翻译
│   ├── index.ts        # i18n 配置
│   └── route-mapping.ts # 路由映射
├── layouts/            # 布局组件
│   └── MainLayout.astro # 主布局
├── content/            # 博客内容
│   ├── blog-en/        # 英文博客
│   ├── blog-zh/        # 中文博客
│   └── config.ts       # 内容配置
└── styles/             # 全局样式
    └── mobile.css      # 移动端样式
```

## 🚀 开发流程

### 1. 环境准备

```bash
# 克隆项目
git clone https://github.com/your-username/gemma3n.git
cd gemma3n

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 2. 开发规范

#### 文件命名规范

- **组件**: PascalCase (`Header.astro`, `Benchmarks.astro`)
- **页面**: kebab-case (`model-selector.astro`, `about.astro`)
- **翻译文件**: camelCase (`toolkit.ts`, `home.ts`)
- **样式文件**: kebab-case (`mobile.css`)

#### 组件开发规范

```astro
---
// 1. 导入依赖
import { getLangFromUrl, useTranslations } from '../i18n';

// 2. 获取语言和翻译
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

// 3. 定义 Props 接口 (如果需要)
interface Props {
  title?: string;
  description?: string;
}

// 4. 解构 Props
const { title, description } = Astro.props;
---

<!-- 5. 语义化 HTML 结构 -->
<section class="component bg-white dark:bg-slate-900">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
      {title || t('component.title')}
    </h2>
    {description && (
      <p class="text-xl text-slate-600 dark:text-gray-400 text-center mb-8">
        {description}
      </p>
    )}
    <!-- 组件内容 -->
  </div>
</section>

<!-- 6. 组件样式 (如果需要) -->
<style>
  .component {
    /* 组件特定样式 */
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

# 性能优化
git commit -m "perf: 优化图片加载性能"

# 重构代码
git commit -m "refactor: 重构国际化配置"
```

### 3. 国际化开发

#### 翻译文件结构

```typescript
// src/i18n/locales/zh/toolkit.ts
export const toolkit = {
  'toolkit.title': 'Gemma 3n 工具箱 - 完整开发者资源',
  'toolkit.description': 'Gemma 3n开发的综合工具箱。',
  'toolkit.h1': 'Gemma 3n 工具箱',
  'toolkit.subheading': '开始Gemma 3n开发所需的一切。',
  
  // 快速开始工具
  'toolkit.quickstart.title': '快速开始工具',
  'toolkit.quickstart.ollama.title': 'Ollama 设置',
  'toolkit.quickstart.ollama.desc': '使用Ollama在5分钟内本地运行Gemma 3n。',
  
  // 平台集成
  'toolkit.platform.title': '平台集成',
  'toolkit.platform.ios.title': '📱 iOS 开发',
  'toolkit.platform.ios.desc': '在iOS设备上部署Gemma 3n模型，获得优化性能。',
  
  // 硬件要求
  'toolkit.hardware.title': '硬件要求',
  'toolkit.hardware.table.model': '模型',
  'toolkit.hardware.table.ram_fp16': 'RAM (FP16)',
  'toolkit.hardware.table.ram_4bit': 'RAM (4-bit)',
  'toolkit.hardware.table.use_case': '最佳用例',
} as const;
```

#### 使用翻译

```astro
---
import { getLangFromUrl, useTranslations } from '../i18n';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<h1>{t('toolkit.h1')}</h1>
<p>{t('toolkit.subheading')}</p>
```

### 4. 页面开发

#### 页面结构模板

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
import { getLangFromUrl, useTranslations } from '../i18n';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<MainLayout 
  title={t('page.title')}
  description={t('page.description')}
>
  <main class="pt-20">
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
          {t('page.h1')}
        </h1>
        <p class="text-xl text-slate-600 dark:text-gray-400 mb-8">
          {t('page.subheading')}
        </p>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <section class="py-20 bg-white dark:bg-slate-900">
      <div class="max-w-6xl mx-auto px-4">
        <!-- 页面内容 -->
      </div>
    </section>

    <!-- 其他区域 -->
  </main>
</MainLayout>
```

## 🤖 与 AI 协作最佳实践

### 1. 精确的 Prompt 模板

#### 基础模板

```
你是我们产品的联合创始人，一个经验丰富的[角色]，
同时你也是一个资深网虫，熟悉[技术领域]。

[具体任务描述]

要求：
1. [具体要求1]
2. [具体要求2]
3. [具体要求3]

请按照"一次性做好"的原则，快速高质量地[执行任务]。
```

#### 角色定义

- **项目经理**: 负责项目规划、进度管理和资源协调
- **SEO专家**: 负责搜索引擎优化、关键词研究和流量分析
- **产品经理**: 负责用户体验设计、功能规划和产品策略
- **全栈技术工程师**: 负责技术架构、代码实现和系统优化

#### 任务分解模板

```
第一阶段：核心问题修复（立即执行）
- [具体任务1]
- [具体任务2]

第二阶段：用户体验优化（快速迭代）
- [具体任务1]
- [具体任务2]

第三阶段：性能优化（持续改进）
- [具体任务1]
- [具体任务2]
```

### 2. 代码审查标准

#### 构建检查

```bash
# 必须通过的检查
npm run build
npm run dev
```

#### 功能检查

- ✅ 功能是否完整
- ✅ 中英文是否一致
- ✅ 响应式是否正常
- ✅ 链接是否有效

#### 代码质量

- ✅ 代码规范是否符合
- ✅ 组件是否可复用
- ✅ 性能是否优化
- ✅ 可访问性是否良好

### 3. 问题解决流程

#### 问题分析

1. **现象描述**: 准确描述问题现象
2. **环境确认**: 确认开发环境和版本
3. **错误信息**: 提供完整的错误信息
4. **复现步骤**: 详细的操作步骤

#### 解决方案

1. **快速修复**: 立即解决影响开发的问题
2. **根本解决**: 找到问题的根本原因
3. **预防措施**: 建立预防机制
4. **文档更新**: 更新相关文档

## 📊 性能优化

### 1. 构建优化

#### Astro 配置优化

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gemma-3n.net',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/zh/') || page.includes('/zh/'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
  },
});
```

#### 图片优化

```astro
---
// 使用 Astro 的图片优化
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image 
  src={heroImage} 
  alt="Hero Image"
  width={800}
  height={600}
  format="webp"
  loading="lazy"
/>
```

### 2. SEO 优化

#### Meta 标签优化

```astro
---
// 在 MainLayout.astro 中
const { title, description, image } = Astro.props;
---

<head>
  <title>{title}</title>
  <meta name="description" content={description} />
  
  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  
  <!-- hreflang -->
  <link rel="alternate" hreflang="en" href={Astro.url.href.replace('/zh/', '/')} />
  <link rel="alternate" hreflang="zh" href={Astro.url.href.replace('/zh/', '/zh/')} />
</head>
```

#### 结构化数据

```astro
---
// 在页面中添加结构化数据
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": title,
  "description": description,
  "url": Astro.url.href,
};
---

<script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
```

## 🧪 测试策略

### 1. 构建测试

```bash
# 生产构建测试
npm run build

# 开发服务器测试
npm run dev

# 类型检查
npm run type-check
```

### 2. 功能测试

#### 手动测试清单

- [ ] 首页加载正常
- [ ] 中英文切换正常
- [ ] 导航链接有效
- [ ] 响应式布局正常
- [ ] 暗色模式切换正常
- [ ] PWA 功能正常

#### 自动化测试

```bash
# 运行所有测试
npm test

# 运行特定测试
npm run test:unit
npm run test:e2e
```

### 3. 性能测试

#### Lighthouse 测试

```bash
# 安装 Lighthouse
npm install -g lighthouse

# 运行测试
lighthouse http://localhost:4321 --output html --output-path ./lighthouse-report.html
```

#### 性能指标

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

## 🚀 部署流程

### 1. 本地构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 2. 代码提交

```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "feat: 添加新功能"

# 推送到远程仓库
git push origin main
```

### 3. 自动部署

项目配置了 Vercel 自动部署，推送到 `main` 分支后会自动触发部署。

### 4. 部署验证

- [ ] 网站可正常访问
- [ ] 所有页面加载正常
- [ ] 中英文切换正常
- [ ] SEO 标签正确
- [ ] 性能指标达标

## 📚 知识管理

### 1. 技术决策记录

#### 选择 Astro 的原因

- **静态生成**: SEO 友好，加载速度快
- **开发体验**: 简单易用，学习成本低
- **生态系统**: 丰富的插件和工具
- **性能优化**: 自动代码分割和优化

#### 选择 Tailwind CSS 的原因

- **开发效率**: 快速构建 UI
- **一致性**: 统一的设计系统
- **可维护性**: 减少 CSS 文件
- **响应式**: 内置响应式设计

### 2. 问题解决方案库

#### 常见问题

1. **构建错误**
   - 检查 import 路径
   - 确认依赖版本
   - 清理 node_modules

2. **样式问题**
   - 检查 Tailwind 类名
   - 确认暗色模式配置
   - 验证响应式断点

3. **国际化问题**
   - 检查翻译键名
   - 确认语言检测
   - 验证路由映射

### 3. 性能优化技巧

#### 代码分割

```javascript
// 使用动态导入
const Component = await import('./Component.astro');
```

#### 缓存策略

```javascript
// Service Worker 缓存策略
const CACHE_NAME = 'gemma3n-v1';
const urlsToCache = [
  '/',
  '/offline.html',
  '/styles/main.css',
];
```

## 📈 监控与分析

### 1. 性能监控

#### Core Web Vitals

- **LCP**: 最大内容绘制
- **FID**: 首次输入延迟
- **CLS**: 累积布局偏移

#### 自定义指标

- 页面加载时间
- 资源加载时间
- 用户交互响应时间

### 2. 用户分析

#### Google Analytics

```javascript
// 在 MainLayout.astro 中配置
gtag('config', 'G-LFF5X9VMHP', {
  page_title: title,
  page_location: Astro.url.href,
});
```

#### 用户行为分析

- 页面访问量
- 用户停留时间
- 跳出率
- 转化率

### 3. SEO 监控

#### Google Search Console

- 搜索表现
- 索引状态
- 移动端可用性
- 核心网页指标

#### 关键词排名

- 目标关键词排名
- 长尾关键词表现
- 竞争对手分析

## 🔄 持续改进

### 1. 代码审查

#### 审查要点

- 代码质量和规范
- 功能完整性
- 性能影响
- 安全性考虑

#### 审查流程

1. 开发者提交 PR
2. 自动构建测试
3. 代码审查
4. 合并到主分支

### 2. 用户反馈

#### 反馈收集

- 用户评论
- 邮件反馈
- 社交媒体
- 用户调研

#### 反馈处理

1. 收集和分类
2. 优先级排序
3. 实施改进
4. 验证效果

### 3. 技术更新

#### 依赖更新

```bash
# 检查更新
npm outdated

# 更新依赖
npm update

# 安全更新
npm audit fix
```

#### 技术栈升级

- 定期评估新技术
- 渐进式升级
- 向后兼容性
- 性能影响评估

---

**最后更新时间**: 2025年1月XX日  
**维护者**: Gemma-3n.net Team 