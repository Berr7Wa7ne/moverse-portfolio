import { NextResponse } from 'next/server';
import { fetchBlogPostBySlugFromCMS } from '@/lib/cms/sanity';

export const revalidate = 300;

type Params = { params: { slug: string } };

export async function GET(_req: Request, { params }: Params) {
  const post = await fetchBlogPostBySlugFromCMS(params.slug);
  console.log('[blog detail API] Source: Sanity CMS', { slug: params.slug, found: !!post });
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ post });
}


