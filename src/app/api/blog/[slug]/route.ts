import { NextResponse } from 'next/server';
import { fetchBlogPostBySlugFromCMS } from '@/lib/cms/sanity';
import { NextRequest } from 'next/server';

export const revalidate = 300;

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await fetchBlogPostBySlugFromCMS(params.slug);
    console.log('[blog detail API] Source: Sanity CMS', { slug: params.slug, found: !!post });
    if (!post) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
