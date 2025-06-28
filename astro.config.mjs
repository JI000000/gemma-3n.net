import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://gemma-3n.net',
  output: 'server',
  integrations: [tailwind(), sitemap(), vercel()]
}); 