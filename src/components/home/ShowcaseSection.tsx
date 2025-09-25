import React from 'react';
import Link from 'next/link';

const ShowcaseSection: React.FC = () => {
  const projects = [
    {
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      title: 'Care Connect - Doctor appointment app',
      description: 'A comprehensive healthcare platform connecting patients with doctors for seamless appointments.'
    },
    {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      title: 'E-Commerce Mobile App',
      description: 'Modern shopping experience with intuitive design and secure payment integration.'
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      title: 'Business Dashboard',
      description: 'Comprehensive analytics dashboard for data-driven business decisions.'
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      title: 'Financial Management System',
      description: 'Advanced financial tools for personal and business expense tracking.'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">Our Portfolio</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mt-4">
            Explore Our Showcase of{' '}
            <span className="text-[var(--accent-blue)]">Featured Work</span>
          </h2>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <div key={index} className="bg-[var(--gray-100)] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Navigation Arrows */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-[var(--gray-600)] hover:text-[var(--accent-blue)] transition-colors">
                    ←
                  </button>
                  <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-[var(--gray-600)] hover:text-[var(--accent-blue)] transition-colors">
                    →
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-[var(--primary-blue)]">
                  {project.title}
                </h3>
                <p className="text-[var(--gray-600)] text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex gap-3">
                  <button className="btn-primary text-sm px-4 py-2">
                    View Details
                  </button>
                  <button className="btn-secondary text-sm px-4 py-2">
                    Live Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center">
          <Link href="/projects" className="btn-primary">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
