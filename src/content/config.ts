import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // or 'data'
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('The Gemma-3n.net Team'),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
}; 