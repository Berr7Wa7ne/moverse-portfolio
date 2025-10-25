import React from 'react';
import Link from 'next/link';
import { listProjects } from '@/lib/content/projects';
import { fetchProjectsFromCMS } from '@/lib/cms/sanity';
import ProjectCard from './ProjectCard';

type ShowcaseItem = {
  image: string;
  title: string; // may include <br /> for styling
  tags: string[];
  slug: string;
  liveUrl?: string;
};

async function getShowcaseProjects(): Promise<ShowcaseItem[]> {
  const useCMS = process.env.USE_CMS === 'true';
  if (useCMS) {
    const cmsProjects: any[] = await fetchProjectsFromCMS();
    console.log('[projects showcase] Source: Sanity CMS', { count: cmsProjects?.length });
    return (cmsProjects || []).map((p) => ({
      image: p.images?.[0] || '/next.svg',
      title: p.title,
      tags: (p.technologies && Array.isArray(p.technologies) && p.technologies.length > 0)
        ? p.technologies.slice(0, 3)
        : [p.category].filter(Boolean),
      slug: p.slug?.current || '',
      liveUrl: p.liveUrl || '',
    })).filter((p) => p.slug);
  }
  const staticProjects = listProjects();
  console.log('[projects showcase] Source: local static content', { count: staticProjects?.length });
  return staticProjects.map((p: any) => ({
    image: p.images?.[0] || '/next.svg',
    title: p.title,
    tags: (p.technologies && Array.isArray(p.technologies) && p.technologies.length > 0)
      ? p.technologies.slice(0, 3)
      : [p.category].filter(Boolean),
    slug: p.slug,
    liveUrl: p.liveUrl || '',
  }));
}

const ProjectsShowcaseSection = async () => {
  const projects = await getShowcaseProjects();

  return (
    <section className="section-padding bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[16px] text-[var(--gray-600)] tracking-wider flex items-center justify-center gap-3">
            <span className="block w-20 h-[2px] bg-gray-500"></span>
            Our Latest Projects
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mt-4">
            <span>Explore Our Showcase of</span>{' '}
            <br />
            <span className="text-[var(--accent-blue)]">Featured Work</span>
          </h2>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {/* View All Works Button */}
        <div className="text-center">
          <Link href="/projects" className="btn-primary">
            View All Works
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcaseSection;
