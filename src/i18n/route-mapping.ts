import type { Language } from './index';

// Route mapping for pages and blog posts
export const routeMapping = {
  // Static pages mapping
  pages: {
    '/': { en: '/', zh: '/zh' },
    '/about': { en: '/about', zh: '/zh/about' },
    '/demo': { en: '/demo', zh: '/zh/demo' },
    '/toolkit': { en: '/toolkit', zh: '/zh/toolkit' },
    '/compare/gemma-vs-llama3': { en: '/compare/gemma-vs-llama3', zh: '/zh/compare/gemma-vs-llama3' },
    '/leaderboard': { en: '/leaderboard', zh: '/zh/leaderboard' },
    '/blog': { en: '/blog', zh: '/zh/blog' },
    '/privacy': { en: '/privacy', zh: '/zh/privacy' },
    '/terms': { en: '/terms', zh: '/zh/terms' },
  },
  
  // Blog posts mapping - allows different slugs for different languages
  blog: {
    'how-to-run-gemma-3n-locally': {
      en: '/blog/how-to-run-gemma-3n-locally',
      zh: '/zh/blog/how-to-run-gemma-3n-locally'
    },
    'fine-tuning-gemma-3n-with-lora': {
      en: '/blog/fine-tuning-gemma-3n-with-lora',
      zh: '/zh/blog/fine-tuning-gemma-3n-with-lora'
    },
    'fine-tuning-gemma-3n-with-unsloth': {
      en: '/blog/fine-tuning-gemma-3n-with-unsloth',
      zh: '/zh/blog/fine-tuning-gemma-3n-with-unsloth'
    },
    'gemma-3n-vs-llama-3-in-depth-comparison': {
      en: '/blog/gemma-3n-vs-llama-3-in-depth-comparison',
      zh: '/zh/blog/gemma-3n-vs-llama-3-in-depth-comparison'
    },
    'gemma-3n-ios-complete-deployment-guide': {
      en: '/blog/gemma-3n-ios-complete-deployment-guide',
      zh: '/zh/blog/gemma-3n-ios-complete-deployment-guide'
    },
    'getting-started-with-gemma-3n-and-lm-studio': {
      en: '/blog/getting-started-with-gemma-3n-and-lm-studio',
      zh: '/zh/blog/getting-started-with-gemma-3n-and-lm-studio'
    },
    'how-to-run-gemma-3n-with-ollama': {
      en: '/blog/how-to-run-gemma-3n-with-ollama',
      zh: '/zh/blog/how-to-run-gemma-3n-with-ollama'
    },
    'image-analysis-with-gemma-3n': {
      en: '/blog/image-analysis-with-gemma-3n',
      zh: '/zh/blog/image-analysis-with-gemma-3n'
    },
    'transcribing-speech-with-gemma-3n': {
      en: '/blog/transcribing-speech-with-gemma-3n',
      zh: '/zh/blog/transcribing-speech-with-gemma-3n'
    },
    'generating-svgs-with-gemma-3n': {
      en: '/blog/generating-svgs-with-gemma-3n',
      zh: '/zh/blog/generating-svgs-with-gemma-3n'
    },
    'gemma-3n-e2b-vs-e4b-which-one-should-you-choose': {
      en: '/blog/gemma-3n-e2b-vs-e4b-which-one-should-you-choose',
      zh: '/zh/blog/gemma-3n-e2b-vs-e4b-which-one-should-you-choose'
    },
  }
} as const;

// Helper function to find exact page mapping
function findExactMapping(currentPath: string, targetLang: Language): string | null {
  // Remove language prefix from current path to get base path
  const basePath = currentPath.startsWith('/zh/') ? currentPath.replace('/zh', '') || '/' : currentPath;
  
  const mapping = routeMapping.pages[basePath as keyof typeof routeMapping.pages];
  return mapping ? mapping[targetLang] : null;
}

// Helper function to find blog post mapping
function findBlogMapping(currentPath: string, targetLang: Language): string | null {
  // Extract blog slug from path
  const blogMatch = currentPath.match(/\/(zh\/)?blog\/([^\/]+)\/?$/);
  if (!blogMatch) return null;
  
  const slug = blogMatch[2];
  const mapping = routeMapping.blog[slug as keyof typeof routeMapping.blog];
  return mapping ? mapping[targetLang] : null;
}

// Main function to get the target language route
export function getLanguageRoute(currentPath: string, targetLang: Language): string {
  // 1. First check exact page mapping
  const exactMatch = findExactMapping(currentPath, targetLang);
  if (exactMatch) return exactMatch;
  
  // 2. Check blog post mapping
  const blogMatch = findBlogMapping(currentPath, targetLang);
  if (blogMatch) return blogMatch;
  
  // 3. Fallback to home page
  return targetLang === 'en' ? '/' : `/${targetLang}`;
}

// Helper function to get all available language paths for a given current path
export function getAlternateLanguageRoutes(currentPath: string): Record<Language, string> {
  return {
    en: getLanguageRoute(currentPath, 'en'),
    zh: getLanguageRoute(currentPath, 'zh'),
  };
} 