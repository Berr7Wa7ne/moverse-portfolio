'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ServicesBanner from '@/components/ui/ServicesBanner';

const ProjectDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;

  // Project data - in a real app, this would come from an API or CMS
  const projects = {
    'car-rental-app': {
      title: 'Car Rental - Car Rental Booking Mobile App',
      category: 'Mobile App Development',
      client: 'Dianne Russell',
      location: 'United States',
      year: '2024',
      description: 'A comprehensive car rental booking mobile application that allows users to search, compare, and book rental cars with ease. The app features real-time availability, secure payment processing, and GPS integration for pickup locations.',
      challenge: 'The main challenge was creating an intuitive user experience that could handle complex booking logic while maintaining fast performance across different devices and network conditions.',
      service: 'We developed a full-stack mobile application using React Native for cross-platform compatibility, integrated with a robust backend API for real-time data management and payment processing.',
      results: 'The app achieved a 4.8-star rating on app stores with over 50,000 downloads in the first month. User engagement increased by 300% compared to the previous web-based solution.',
      features: [
        'Real-time car availability',
        'GPS integration for pickup locations',
        'Secure payment processing',
        'User reviews and ratings',
        'Booking management',
        'Push notifications'
      ],
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Stripe API', 'Google Maps API'],
      images: [
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      testimonial: {
        text: 'The car rental app exceeded our expectations. The user experience is seamless and the booking process is incredibly smooth. Our customers love the new interface.',
        author: 'Leslie Alexander',
        position: 'CEO, Software Company',
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
      }
    },
    'doctor-appointment-app': {
      title: 'Core Connect - Doctor Appointment App',
      description: 'A comprehensive healthcare app that connects patients with doctors for easy appointment booking, telemedicine consultations, and health record management.',
      category: 'Healthcare App',
      client: 'Dr. Sarah Johnson',
      location: 'Canada',
      year: '2024',
      challenge: 'Creating a secure platform that complies with healthcare regulations while providing an intuitive user experience for both patients and healthcare providers.',
      service: 'We developed a HIPAA-compliant mobile and web application with end-to-end encryption, secure video calling, and integrated health record management.',
      results: 'The platform successfully onboarded 200+ healthcare providers and 10,000+ patients within the first 6 months, with a 95% user satisfaction rate.',
      features: [
        'Appointment scheduling',
        'Video consultations',
        'Health record management',
        'Prescription management',
        'Insurance verification',
        'Secure messaging'
      ],
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'WebRTC', 'AWS'],
      images: [
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      testimonial: {
        text: 'Core Connect has revolutionized how we manage patient appointments. The platform is secure, user-friendly, and has significantly improved our practice efficiency.',
        author: 'Dr. Michael Chen',
        position: 'Medical Director',
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
      }
    },
    'dental-clinic-website': {
      title: 'Dental - Dentist and Dental Clinic Website UI/UX Design',
      description: 'A modern, responsive website for a dental clinic featuring online appointment booking, service information, and patient resources.',
      category: 'Website Design',
      client: 'Smile Dental Clinic',
      location: 'United Kingdom',
      year: '2024',
      challenge: 'Creating a trustworthy and professional online presence that would help patients feel comfortable booking dental appointments online.',
      service: 'We designed and developed a fully responsive website with an intuitive appointment booking system, patient portal, and comprehensive service information.',
      results: 'Online appointment bookings increased by 400% and the website achieved a 98% user satisfaction rate for ease of use.',
      features: [
        'Online appointment booking',
        'Patient portal',
        'Service information',
        'Doctor profiles',
        'Insurance information',
        'Emergency contact'
      ],
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'MongoDB'],
      images: [
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      testimonial: {
        text: 'The new website has transformed our practice. Patients can easily book appointments online, and the professional design has increased our credibility significantly.',
        author: 'Dr. Emily Rodriguez',
        position: 'Practice Owner',
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
      }
    }
  };

  const project = projects[slug as keyof typeof projects];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--primary-blue)] mb-4">Project Not Found</h1>
          <p className="text-[var(--gray-600)] mb-8">The project you're looking for doesn't exist.</p>
          <a href="/projects" className="btn-primary">Back to Projects</a>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[var(--primary-blue)] py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      <ServicesBanner />

      {/* Project Overview */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-6">
                Project Overview
              </h2>
              <p className="text-[var(--gray-600)] text-lg leading-relaxed mb-8">
                {project.description}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Client</h3>
                  <p className="text-[var(--gray-600)]">{project.client}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Category</h3>
                  <p className="text-[var(--gray-600)]">{project.category}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Location</h3>
                  <p className="text-[var(--gray-600)]">{project.location}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Year</h3>
                  <p className="text-[var(--gray-600)]">{project.year}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Images */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] text-center mb-12">
            Project Screenshots
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                  <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--primary-blue)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-6">
            The Challenge
          </h2>
          <p className="text-[var(--gray-600)] text-lg leading-relaxed max-w-4xl">
            {project.challenge}
          </p>
        </div>
      </section>

      {/* The Service */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-6">
            The Service
          </h2>
          <p className="text-[var(--gray-600)] text-lg leading-relaxed max-w-4xl mb-8">
            {project.service}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[var(--primary-blue)] mb-4">Key Features</h3>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-[var(--accent-blue)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      ✓
                    </span>
                    <span className="text-[var(--gray-600)]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[var(--primary-blue)] mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-[var(--accent-blue)] text-white px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Results */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-6">
            The Results
          </h2>
          <p className="text-[var(--gray-600)] text-lg leading-relaxed max-w-4xl mb-12">
            {project.results}
          </p>
          
          {/* Testimonial */}
          <div className="bg-gray-50 p-8 rounded-2xl">
            <div className="flex items-start gap-6">
              <img
                src={project.testimonial.image}
                alt={project.testimonial.author}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-[var(--primary-blue)]">{project.testimonial.author}</h4>
                    <p className="text-[var(--gray-600)]">{project.testimonial.position}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                    <span className="text-[var(--gray-600)] ml-2">{project.testimonial.rating}</span>
                  </div>
                </div>
                <p className="text-[var(--gray-600)] text-lg italic">"{project.testimonial.text}"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[var(--primary-blue)]">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary bg-white text-[var(--primary-blue)] hover:bg-gray-100">
              Get Free Quote
            </a>
            <a href="/projects" className="btn-secondary border-white text-white hover:bg-white hover:text-[var(--primary-blue)]">
              View More Projects
            </a>
          </div>
        </div>
      </section>

      <ServicesBanner />
    </>
  );
};

export default ProjectDetailPage;
