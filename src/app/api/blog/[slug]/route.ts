import { NextRequest, NextResponse } from 'next/server';
import { fetchBlogPostBySlugFromCMS } from '@/lib/cms/sanity';

export const revalidate = 300;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const post = await fetchBlogPostBySlugFromCMS(slug);

    console.log('[blog detail API] Source: Sanity CMS', {
      slug,
      found: !!post,
    });

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
