import React from 'react';
import { listProjects } from '@/lib/content/projects';
import { fetchProjectsFromCMS } from '@/lib/cms/sanity';
import ProjectCard from '../ProjectCard';

type ShowcaseItem = {
  image: string;
  title: string;
  tags: string[];
  slug: string;
  liveUrl?: string;
};

type ProjectShowcaseDetailsProps = {
  currentSlug: string;
};

async function getOtherProjects(currentSlug: string): Promise<ShowcaseItem[]> {
  const useCMS = process.env.USE_CMS === 'true';
  
  if (useCMS) {
    const cmsProjects: any[] = await fetchProjectsFromCMS();
    console.log('[project showcase details] Source: Sanity CMS', { count: cmsProjects?.length });
    return (cmsProjects || [])
      .filter((p) => p.slug?.current !== currentSlug) // Exclude current project
      .map((p) => ({
        image: p.images?.[0] || '/next.svg',
        title: p.title,
        tags: (p.technologies && Array.isArray(p.technologies) && p.technologies.length > 0)
          ? p.technologies.slice(0, 3)
          : [p.category].filter(Boolean),
        slug: p.slug?.current || '',
        liveUrl: p.liveUrl || '',
      }))
      .filter((p) => p.slug)
      .slice(0, 2); // Show only 2 projects
  }
  
  const staticProjects = listProjects();
  console.log('[project showcase details] Source: local static content', { count: staticProjects?.length });
  return staticProjects
    .filter((p: any) => p.slug !== currentSlug) // Exclude current project
    .map((p: any) => ({
      image: p.images?.[0] || '/next.svg',
      title: p.title,
      tags: (p.technologies && Array.isArray(p.technologies) && p.technologies.length > 0)
        ? p.technologies.slice(0, 3)
        : [p.category].filter(Boolean),
      slug: p.slug,
      liveUrl: p.liveUrl || '',
    }))
    .slice(0, 2); // Show only 2 projects
}

const ProjectShowcaseDetails = async ({ currentSlug }: ProjectShowcaseDetailsProps) => {
  const projects = await getOtherProjects(currentSlug);

  // Don't show the section if there are no other projects
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 bg-white">
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
      </div>
    </section>
  );
};

export default ProjectShowcaseDetails;
