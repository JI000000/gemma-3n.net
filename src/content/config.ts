import { defineCollection, z } from 'astro:content';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  lastUpdated: z.date().optional(),
  author: z.string().default('The Gemma-3n.net Team'),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().default(false),
  lang: z.enum(['en', 'zh']),
});

const blogEnCollection = defineCollection({
  type: 'content',
  schema: blogSchema,
});

const blogZhCollection = defineCollection({
  type: 'content', 
  schema: blogSchema,
});

export const collections = {
  'blog-en': blogEnCollection,
  'blog-zh': blogZhCollection,
}; 