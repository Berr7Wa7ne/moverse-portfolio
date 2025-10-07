import { NextResponse } from 'next/server';
import { getProject } from '@/lib/content/projects';
import { fetchProjectBySlugFromCMS } from '@/lib/cms/sanity';

export const revalidate = 3600; // cache for 1 hour

type Params = { params: { slug: string } };

export async function GET(_req: Request, { params }: Params) {
  const useCMS = process.env.USE_CMS === 'true';
  const project = useCMS ? await fetchProjectBySlugFromCMS(params.slug) : getProject(params.slug);
  if (useCMS) {
    console.log('[project detail API] Source: Sanity CMS', { slug: params.slug, found: !!project });
  } else {
    console.log('[project detail API] Source: local static content', { slug: params.slug, found: !!project });
  }
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ project });
}


