import React from 'react';
import Link from 'next/link';

const ProjectsShowcaseSection: React.FC = () => {
  const projects = [
    {
      title: 'Care Connect - Doctor Appointment App',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['UX/UI Design', 'App Design', 'Wireframe'],
      description: 'A comprehensive healthcare platform connecting patients with doctors for seamless appointments and medical consultations.'
    },
    {
      title: 'Dental - Dentist and Dental Clinic Website UIUX Design',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddceeee3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['UX/UI Design', 'Web Design', 'Wireframe'],
      description: 'Modern dental clinic website design with appointment booking and patient portal functionality.'
    },
    {
      title: 'Car Rental - Car Rental Booking Mobile App',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['UX/UI Design', 'App Design', 'Wireframe'],
      description: 'Intuitive car rental app with real-time booking, payment integration, and location services.'
    },
    {
      title: 'Hotel Booking - Hotel Booking App Landing Page UIUX Design',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['UX/UI Design', 'Landing page', 'Wireframe'],
      description: 'Beautiful hotel booking platform with advanced search filters and instant reservation system.'
    },
    {
      title: 'E-Learn - Online Learning Mobile App',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['UX/UI Design', 'App Design', 'Wireframe'],
      description: 'Comprehensive e-learning platform with video courses, quizzes, and progress tracking features.'
    },
    {
      title: 'Car Wash - Car Wash Website UIUX Design',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['UX/UI Design', 'Landing page', 'Wireframe'],
      description: 'Professional car wash service website with online booking and service package selection.'
    },
    {
      title: 'Laundry - Laundry Service Booking Mobile App',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['UX/UI Design', 'App Design', 'Wireframe'],
      description: 'Convenient laundry service app with pickup scheduling, payment processing, and delivery tracking.'
    },
    {
      title: 'Real Estate - Real Estate Website UIUX Design',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['UX/UI Design', 'Landing page', 'Wireframe'],
      description: 'Advanced real estate platform with property listings, virtual tours, and mortgage calculator.'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">Our Latest Projects</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mt-4">
            Explore Our Showcase of{' '}
            <span className="text-[var(--accent-blue)]">Featured Work</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-[var(--gray-200)]">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* View Project Button */}
                <div className="absolute top-4 right-4">
                  <button className="w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-lg">
                    <svg className="w-5 h-5 text-[var(--accent-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-[var(--primary-blue)] group-hover:text-[var(--accent-blue)] transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-[var(--gray-600)] text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-[var(--light-blue)] text-[var(--accent-blue)] rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="text-[var(--accent-blue)] hover:text-[#2952cc] font-semibold transition-colors flex items-center gap-2 group">
                  View Project
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Works Button */}
        <div className="text-center mt-12">
          <Link href="/projects/all" className="btn-primary">
            View All Works
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcaseSection;
