import { NextRequest, NextResponse } from 'next/server';
import { getProject } from '@/lib/content/projects';
import { fetchProjectBySlugFromCMS } from '@/lib/cms/sanity';

export const revalidate = 3600; // cache for 1 hour

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const useCMS = process.env.USE_CMS === 'true';

  const project = useCMS
    ? await fetchProjectBySlugFromCMS(slug)
    : getProject(slug);

  if (useCMS) {
    console.log('[project detail API] Source: Sanity CMS', {
      slug,
      found: !!project,
    });
  } else {
    console.log('[project detail API] Source: local static content', {
      slug,
      found: !!project,
    });
  }

  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ project });
}
