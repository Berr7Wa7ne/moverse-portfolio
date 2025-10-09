import { NextResponse } from 'next/server';
import { fetchBlogPostsFromCMS } from '@/lib/cms/sanity';
import { listBlogPosts } from '@/lib/content/blogs';

export const revalidate = 300;

export async function GET() {
  const useCMS = process.env.NEXT_PUBLIC_USE_CMS === 'true';

  if (useCMS) {
    try {
      const posts = await fetchBlogPostsFromCMS();
      if (Array.isArray(posts) && posts.length > 0) {
        console.log('[blog list API] Source: Sanity CMS', { count: posts.length });
        return NextResponse.json({ posts });
      }
    } catch (error) {
      console.error('[blog list API] CMS fetch failed:', error);
    }
  }

  console.log('[blog list API] Source: local static content');
  const staticPosts = listBlogPosts();
  return NextResponse.json({ posts: staticPosts });
}