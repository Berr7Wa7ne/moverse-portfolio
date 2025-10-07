import React from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';
import { listProjects } from '@/lib/content/projects';
import { fetchProjectsFromCMS } from '@/lib/cms/sanity';

type ShowcaseItem = {
  image: string;
  title: string; // may include <br /> for styling
  tags: string[];
  slug: string;
};

async function getShowcaseProjects(): Promise<ShowcaseItem[]> {
  const useCMS = process.env.USE_CMS === 'true';
  if (useCMS) {
    const cmsProjects: any[] = await fetchProjectsFromCMS();
    console.log('[projects showcase] Source: Sanity CMS', { count: cmsProjects?.length });
    return (cmsProjects || []).map((p) => ({
      image: p.images?.[0]?.asset?.url || '/next.svg',
      title: p.title,
      tags: (p.technologies && Array.isArray(p.technologies) && p.technologies.length > 0)
        ? p.technologies.slice(0, 3)
        : [p.category].filter(Boolean),
      slug: p.slug?.current || '',
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
            <Link
              key={index}
              href={`/projects/${project.slug}`}
              className="relative aspect-square rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300 block"
            >
              {/* Background Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>

              {/* Content on top */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white space-y-4">
                {/* Title with line breaks */}
                <h3
                  className="text-2xl"
                  dangerouslySetInnerHTML={{ __html: project.title }}
                />

                {/* Tags and Send Icon Row */}
                <div className="flex items-center justify-between">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-white/20 text-white rounded-full text-[14px] backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Send Icon */}
                  <div className="px-4 py-2 bg-[var(--primary-blue)] rounded-full flex items-center justify-center text-white group-hover:bg-[var(--accent-blue)] transition">
                    <Send className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
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
