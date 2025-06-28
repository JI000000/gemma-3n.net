import { ImageResponse } from '@vercel/og';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET({ params }: APIContext) {
  const posts = await getCollection('blog');
  const titleMap = new Map(posts.map(p => [p.slug, p.data.title]));
  const title = titleMap.get(params.slug! as any) ?? 'The Ultimate Guide to Gemma 3n';

  const html = {
    type: 'div',
    props: {
      children: [
        {
          type: 'div',
          props: {
            children: 'gemma-3n.net',
            style: {
              fontSize: '32px',
              marginBottom: '20px',
            },
          },
        },
        {
          type: 'div',
          props: {
            children: title,
            style: {
              fontSize: '60px',
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '0 80px',
            },
          },
        },
      ],
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a202c',
        color: 'white',
        fontFamily: 'sans-serif',
      },
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
  });
} 