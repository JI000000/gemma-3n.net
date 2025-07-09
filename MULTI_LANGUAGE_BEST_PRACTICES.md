# 多语言架构最佳实践：Gemma-3n.net

本文档旨在沉淀gemma-3n.net项目在多语言（i18n）架构上的实践经验，为后续开发和新项目提供一套可复用、可扩展、高可维护性的解决方案。

## 1. 核心设计哲学

我们的多语言架构遵循以下原则：

- **关注点分离 (Separation of Concerns)**：翻译内容、路由逻辑、UI组件和业务逻辑严格分离。
- **类型安全 (Type-Safety)**：利用TypeScript确保所有翻译key的正确性，在编译阶段发现错误，杜绝运行时因key错误导致的显示问题。
- **模块化 (Modularity)**：摒弃巨大的单体翻译文件，按功能和页面将翻译分解为小型、高内聚的模块。
- **开发者体验 (Developer Experience)**：简化新增翻译、新增页面和新增语言的流程，让开发者能快速上手，减少心智负担。
- **SEO友好 (SEO-Friendly)**：URL结构、`hreflang`标签和站点地图（sitemap）自动处理，最大化多语言SEO效果。

## 2. 架构概览

我们的多语言系统主要由以下四部分构成：

```
gemma3n/
├── src/
│   ├── i18n/
│   │   ├── locales/            # 1. 语言模块化核心
│   │   │   ├── en/             #    - 英语模块
│   │   │   │   ├── common.ts
│   │   │   │   ├── home.ts
│   │   │   │   └── index.ts    #    - 聚合导出
│   │   │   └── zh/             #    - 中文模块
│   │   │       ├── ...
│   │   │       └── index.ts
│   │   ├── index.ts            # 2. i18n 系统入口
│   │   └── route-mapping.ts    # 3. 智能路由映射
│   ├── content/
│   │   ├── blog-en/            # 4. 英文博客内容
│   │   │   └── post-1.md
│   │   └── blog-zh/            # 4. 中文博客内容
│   │       └── post-1.md
│   └── components/
│       └── LanguageToggle.astro # 语言切换组件
└── astro.config.mjs
```

1.  **`src/i18n/locales/`**: **模块化翻译核心**。每种语言一个目录，目录下按功能/页面（如`nav.ts`, `home.ts`）拆分翻译文件。`index.ts`负责聚合和导出该语言的所有翻译。
2.  **`src/i18n/index.ts`**: **i18n系统入口**。定义支持的语言、默认语言，并导出核心工具函数，如`useTranslations`。
3.  **`src/i18n/route-mapping.ts`**: **智能路由映射**。处理不同语言下页面路径的对应关系，是实现精准语言切换的关键。
4.  **`src/content/blog-[lang]/`**: **多语言内容集合**。利用Astro的Content Collections，为每种语言创建独立的博客目录，实现内容源的彻底分离。

## 3. 核心流程实践

### 3.1. 如何添加/修改一个页面的翻译？

假设我们要为一个新的"Careers"（招聘）页面添加翻译。

1.  **创建翻译模块**:
    - 在 `src/i18n/locales/en/`下创建`careers.ts`。
    - 在 `src/i18n/locales/zh/`下创建`careers.ts`。

    ```typescript
    // src/i18n/locales/en/careers.ts
    export const careers = {
      'careers.title': 'Careers at Gemma-3n.net',
      'careers.h1': 'Join Our Team',
    } as const;
    ```

    ```typescript
    // src/i18n/locales/zh/careers.ts
    export const careers = {
      'careers.title': '加入我们 - Gemma-3n.net',
      'careers.h1': '加入我们的团队',
    } as const;
    ```

2.  **注册模块**:
    - 在`src/i18n/locales/en/index.ts`和`.../zh/index.ts`中导入并导出新模块。

    ```typescript
    // src/i18n/locales/en/index.ts
    // ... imports
    import { careers } from './careers';

    export const en = {
      // ... other modules
      ...careers,
    };
    ```

3.  **更新路由映射** (如果需要):
    - 如果中英文路径不同（例如`/en/careers` vs `/zh/jobs`），在`src/i18n/route-mapping.ts`中添加映射。如果路径相同，则无需操作。

4.  **在页面中使用**:
    - 在你的Astro页面或组件中，可以安全地使用新的翻译key。

    ```astro
    ---
    import { useTranslations, getLangFromUrl } from '../../i18n';
    const lang = getLangFromUrl(Astro.url);
    const t = useTranslations(lang);
    ---
    <h1>{t('careers.h1')}</h1>
    ```

### 3.2. 如何新增一种语言？

假设我们要新增法语 (`fr`)。

1.  **创建语言目录**: 复制`src/i18n/locales/en`并重命名为`src/i18n/locales/fr`。
2.  **翻译内容**: 逐一翻译`fr`目录下的所有`.ts`模块文件。
3.  **注册新语言**:
    - 在`src/i18n/index.ts`中添加`fr`。

    ```typescript
    export const languages = {
      en: 'English',
      zh: '中文',
      fr: 'Français', // 新增
    } as const;

    // ...
    import { fr } from './locales/fr'; // 新增

    export const ui = {
      en,
      zh,
      fr, // 新增
    } as const;
    ```
4.  **更新路由**:
    - 在`astro.config.mjs`中添加法语的路由前缀。
    - 在`route-mapping.ts`中添加法语的路由映射逻辑。
5.  **内容国际化**:
    - 创建`src/content/blog-fr`目录并添加翻译后的博客文章。
    - 在`src/pages/`下创建`fr/`目录并复制相应的页面结构。

### 3.3. SEO最佳实践

- **URL结构**: 我们的架构自动生成了SEO友好的URL，例如`gemma-3n.net/zh/blog/post-title`。
- **`hreflang`标签**: `LanguageToggle`组件和`MainLayout.astro`会自动生成`hreflang`链接，告知搜索引擎当前页面存在哪些语言版本，这是多语言SEO的核心。
- **站点地图**: `@astrojs/sitemap`集成会自动扫描所有已生成的页面（包括所有语言版本），并创建包含所有URL的站点地图。

## 4. 总结

通过模块化、类型安全和关注点分离，我们构建了一个健壮且易于维护的多语言系统。它不仅解决了当前单体文件难以维护的问题，也为未来功能的快速迭代和新语言的轻松扩展打下了坚实的基础。这套实践可以被其他团队快速复用，以低成本、高质量的方式实现产品的国际化。 