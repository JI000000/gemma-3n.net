import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// We are temporarily removing the Vercel adapter to ensure a stable deployment.
// import vercel from "@astrojs/vercel/edge";

// https://astro.build/config
export default defineConfig({
  site: 'https://gemma-3n.net',
  // Reverting to 'static' output, the most stable mode for Astro.
  output: 'static', 
  // We remove the vercel() integration for now.
  integrations: [tailwind(), sitemap()],
  
  // 国际化配置
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
    routing: {
      prefixDefaultLocale: false,
      fallback: {
        zh: "en"
      }
    }
  }
}); 