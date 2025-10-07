import { NextResponse } from 'next/server';
import { fetchBlogPostsFromCMS } from '@/lib/cms/sanity';

export const revalidate = 300;

export async function GET() {
  const posts = await fetchBlogPostsFromCMS();
  console.log('[blog list API] Source: Sanity CMS', { count: Array.isArray(posts) ? posts.length : undefined });
  return NextResponse.json({ posts });
}


