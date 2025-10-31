import { NextResponse } from 'next/server';
import { listProjects } from '@/lib/content/projects';
import { fetchProjectsFromCMS } from '@/lib/cms/sanity';

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  const useCMS = process.env.NEXT_PUBLIC_USE_CMS === 'true';
  if (useCMS) {
    try {
      const projects = await fetchProjectsFromCMS();
      if (Array.isArray(projects) && projects.length > 0) {
        console.log('[projects API] Source: Sanity CMS', { count: projects.length });
        return NextResponse.json({ projects });
      }
    } catch (error) {
      console.error('[projects API] CMS fetch failed:', error);
    }
  }
  console.log('[projects API] Source: local static content');
  const projects = listProjects();
  return NextResponse.json({ projects });
}


