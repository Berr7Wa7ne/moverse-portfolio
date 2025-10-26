import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { listProjects } from '@/lib/content/projects';
import { fetchProjectsFromCMS } from '@/lib/cms/sanity';
import ProjectCard from '../projects/ProjectCard';
import ScrollReveal from '../ui/ScrollReveal';

type ShowcaseProject = {
  image: string;
  title: string;
  tags: string[];
  slug: string;
  liveUrl?: string;
};

async function getFeaturedProjects(): Promise<ShowcaseProject[]> {
  const useCMS = process.env.USE_CMS === 'true';
  
  if (useCMS) {
    const cmsProjects: any[] = await fetchProjectsFromCMS();
    console.log('[showcase section] Source: Sanity CMS', { count: cmsProjects?.length });
    return (cmsProjects || [])
      .slice(0, 4) // Get only 4 projects
      .map((p) => ({
        image: p.images?.[0] || '/next.svg',
        title: p.title,
        tags: (p.technologies && Array.isArray(p.technologies) && p.technologies.length > 0)
          ? p.technologies.slice(0, 3)
          : [p.category].filter(Boolean),
        slug: p.slug?.current || '',
        liveUrl: p.liveUrl || '',
      }))
      .filter((p) => p.slug);
  }
  
  const staticProjects = listProjects();
  console.log('[showcase section] Source: local static content', { count: staticProjects?.length });
  return staticProjects.slice(0, 4).map((p: any) => ({
    image: p.images?.[0] || '/next.svg',
    title: p.title,
    tags: (p.technologies && Array.isArray(p.technologies) && p.technologies.length > 0)
      ? p.technologies.slice(0, 3)
      : [p.category].filter(Boolean),
    slug: p.slug,
    liveUrl: p.liveUrl || '',
  }));
}

const ShowcaseSection = async () => {
  const projects = await getFeaturedProjects();

  return (
    <section className="section-padding bg-white">
      <div className="container">
        {/* Section Header */}
        <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-[16px] text-[var(--gray-600)] tracking-wider flex items-center justify-center gap-3">
            <span className="block w-20 h-[2px] bg-gray-500"></span>
            Our Latest Projects
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mt-4">
            <span>Explore Our Showcase of</span>{' '}
            <span className="text-[var(--accent-blue)]">Featured Work</span>
          </h2>
        </div>
        </ScrollReveal>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* View All Works Button */}
        <div className="text-center">
          <Link href="/projects" className="btn-primary inline-flex items-center gap-2 hover:gap-3 transition-all">
            <span>View All Works</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
