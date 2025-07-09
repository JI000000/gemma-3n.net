// 支持的语言
export const languages = {
  en: 'English',
  zh: '中文'
} as const;

export type Language = keyof typeof languages;

// 默认语言
export const defaultLang: Language = 'en';

// 语言配置
export const langConfig = {
  en: {
    name: 'English',
    dir: 'ltr',
    locale: 'en-US'
  },
  zh: {
    name: '中文',
    dir: 'ltr', 
    locale: 'zh-CN'
  }
} as const;

// Import modularized translations
import { en } from './locales/en';
import { zh } from './locales/zh';

// UI文本资源 - now dynamically composed from modules  
export const ui = {
  en,
  zh,
} as const;

// 获取翻译文本的函数
export function useTranslations(lang: Language) {
  return function t(key: string): string {
    const langUi = ui[lang] as Record<string, string>;
    const defaultUi = ui[defaultLang] as Record<string, string>;
    return langUi?.[key] || defaultUi?.[key] || key;
  }
}

// 从URL路径获取语言
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

// 获取本地化路径
export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}

// 获取替代语言路径 - Updated to use new route mapping system
export function getAlternateLanguagePaths(currentPath: string, currentLang: Language) {
  const paths: Record<Language, string> = {} as Record<Language, string>;
  
  // 移除当前语言前缀
  let basePath = currentPath;
  if (currentLang !== defaultLang) {
    basePath = currentPath.replace(`/${currentLang}`, '') || '/';
  }
  
  // 为每种语言生成路径
  Object.keys(languages).forEach(lang => {
    const language = lang as Language;
    paths[language] = getLocalizedPath(basePath, language);
  });
  
  return paths;
} 