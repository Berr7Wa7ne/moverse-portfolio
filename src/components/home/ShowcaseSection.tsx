import React from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';

const ShowcaseSection: React.FC = () => {
  const projects = [
    {
      image:
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      title:
        'Care Connect - Doctor appointment app<br />with booking features',
      tags: ['UX/UI Design', 'App Design', 'Wireframe'],
    },
    {
      image: '/dental.jpg',
      title:
        'Dental - Dentist and Dental Clinic<br />Website UIUX Design',
      tags: ['UX/UI Design', 'Web Design', 'Wireframe'],
    },
    {
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      title:
        'Car Rental - Car Rental Booking<br />Mobile App',
      tags: ['UX/UI Design', 'App Design', 'Wireframe'],
    },
    {
      image:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      title:
        'Hotel Booking - Hotel Booking App<br />Landing Page UIUX Design',
      tags: ['UX/UI Design', 'Landing page', 'Wireframe'],
    },
  ];

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
            Explore Our Showcase of{' '}
            <span className="text-[var(--accent-blue)]">Featured Work</span>
          </h2>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300"
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
                      <Link
                        key={tagIndex}
                        href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        className="px-3 py-1 bg-white/20 text-white rounded-full text-[14px] backdrop-blur-sm hover:bg-white/30 transition"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>

                  {/* Send Icon */}
                  <button className="px-4 py-2 bg-[var(--primary-blue)] rounded-full flex items-center justify-center text-white hover:bg-[var(--accent-blue)] transition">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
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

export default ShowcaseSection;
