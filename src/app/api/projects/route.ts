import { NextResponse } from 'next/server';
import { listProjects } from '@/lib/content/projects';
import { fetchProjectsFromCMS } from '@/lib/cms/sanity';

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  const useCMS = process.env.USE_CMS === 'true';
  const projects = useCMS ? await fetchProjectsFromCMS() : listProjects();
  if (useCMS) {
    console.log('[projects API] Source: Sanity CMS', { count: Array.isArray(projects) ? projects.length : undefined });
  } else {
    console.log('[projects API] Source: local static content', { count: Array.isArray(projects) ? projects.length : undefined });
  }
  return NextResponse.json({ projects });
}


