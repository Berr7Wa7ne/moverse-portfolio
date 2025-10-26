'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Send } from 'lucide-react';

type ProjectCardProps = {
  project: {
    image: string;
    title: string;
    tags: string[];
    slug: string;
    liveUrl?: string;
  };
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/projects/${project.slug}`)}
      className="relative aspect-square rounded-2xl overflow-hidden group card-hover cursor-pointer"
    >
      {/* Background Image */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover hover-scale"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>

      {/* Content on top */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white space-y-4">
        {/* Title */}
        <h3
          className="text-2xl"
          dangerouslySetInnerHTML={{ __html: project.title }}
        />

        {/* Tags + External Link */}
        <div className="flex items-center justify-between">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 text-white rounded-full text-[14px] backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* External Link */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // Prevent parent div click
              className="relative px-4 py-2 bg-[var(--primary-blue)] rounded-full flex items-center justify-center text-white hover:bg-[var(--accent-blue)] transition group/live"
              title="View Live Project"
            >
              <Send className="w-5 h-5" />

              {/* Tooltip */}
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover/live:opacity-100 transition-opacity pointer-events-none">
                View Live
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
