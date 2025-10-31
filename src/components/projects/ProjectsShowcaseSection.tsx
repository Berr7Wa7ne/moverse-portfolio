'use client';

import React, { useEffect, useState } from 'react';
import { listProjects } from '@/lib/content/projects';
import { fetchProjectsFromCMS } from '@/lib/cms/sanity';
import ProjectCard from './ProjectCard';
import Pagination from '../ui/Pagination';
import ScrollReveal from '../ui/ScrollReveal';

const PROJECTS_PER_PAGE = 4;

type ShowcaseItem = {
  image: string;
  title: string;
  tags: string[];
  slug: string;
  liveUrl?: string;
};

const ProjectsShowcaseSection: React.FC = () => {
  const [projects, setProjects] = useState<ShowcaseItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadProjects = async () => {
      const useCMS = process.env.NEXT_PUBLIC_USE_CMS === 'true';
      
      if (useCMS) {
        try {
          // Use server API to avoid browser CORS
          const res = await fetch('/api/projects', { cache: 'no-store' });
          const data = await res.json().catch(() => ({ projects: [] }));
          const cmsProjects: any[] = Array.isArray(data.projects) ? data.projects : [];
          console.log('[projects showcase] Source: Sanity CMS', { count: cmsProjects?.length });
          const normalized = (cmsProjects || []).map((p) => ({
            image: p.images?.[0] || '/next.svg',
            title: p.title,
            tags: (p.technologies && Array.isArray(p.technologies) && p.technologies.length > 0)
              ? p.technologies.slice(0, 3)
              : [p.category].filter(Boolean),
            slug: p.slug?.current || p.slug || '',
            liveUrl: p.liveUrl || '',
          })).filter((p) => p.slug);

          if (normalized.length > 0) {
            setProjects(normalized);
            return;
          }
        } catch (error) {
          console.error('[projects showcase] CMS fetch failed:', error);
        }
      }
      
      // Fallback to static content
      console.log('[projects showcase] Source: local static content');
      const staticProjects = listProjects();
      const normalized = staticProjects.map((p: any) => ({
        image: p.images?.[0] || '/next.svg',
        title: p.title,
        tags: (p.technologies && Array.isArray(p.technologies) && p.technologies.length > 0)
          ? p.technologies.slice(0, 3)
          : [p.category].filter(Boolean),
        slug: p.slug,
        liveUrl: p.liveUrl || '',
      }));
      
      setProjects(normalized);
    };

    loadProjects();
  }, []);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const currentProjects = projects.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="section-padding bg-white">
      <ScrollReveal>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentProjects.map((project, index) => (
            <ProjectCard key={project.slug || index} project={project} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      </ScrollReveal>
    </section>
  );
};

export default ProjectsShowcaseSection;
