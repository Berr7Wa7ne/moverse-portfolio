'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ServicesBanner from '@/components/ui/ServicesBanner';

const ServiceDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;

  // Service data - in a real app, this would come from an API or CMS
  const services = {
    'website-development': {
      title: 'Website Development',
      description: 'We create stunning, responsive websites that deliver exceptional user experiences and drive business growth.',
      longDescription: 'Our website development services combine cutting-edge technology with user-centered design to create digital experiences that captivate your audience and achieve your business objectives. From concept to launch, we ensure every website we build is optimized for performance, accessibility, and search engines.',
      features: [
        'Responsive Design',
        'SEO Optimization',
        'Fast Loading Speed',
        'Mobile-First Approach',
        'Cross-Browser Compatibility',
        'Content Management System'
      ],
      benefits: [
        'Increased Online Visibility',
        'Better User Engagement',
        'Higher Conversion Rates',
        'Professional Brand Image',
        'Scalable Solutions',
        '24/7 Technical Support'
      ],
      process: [
        'Discovery & Planning',
        'Design & Prototyping',
        'Development & Testing',
        'Launch & Optimization'
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    'ui-ux-design': {
      title: 'UI/UX Design',
      description: 'We craft intuitive and beautiful user interfaces that provide seamless experiences across all devices.',
      longDescription: 'Our UI/UX design services focus on creating user-centered digital experiences that not only look great but also function flawlessly. We combine research, strategy, and creativity to design interfaces that users love and businesses benefit from.',
      features: [
        'User Research',
        'Wireframing & Prototyping',
        'Visual Design',
        'Usability Testing',
        'Design Systems',
        'Accessibility Compliance'
      ],
      benefits: [
        'Improved User Satisfaction',
        'Reduced Development Time',
        'Higher User Retention',
        'Better Conversion Rates',
        'Consistent Brand Experience',
        'Reduced Support Costs'
      ],
      process: [
        'User Research',
        'Information Architecture',
        'Wireframing',
        'Visual Design',
        'Prototyping',
        'Testing & Iteration'
      ],
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    'application-development': {
      title: 'Application Development',
      description: 'We build custom applications that solve complex business problems and streamline operations.',
      longDescription: 'Our application development services cover everything from mobile apps to enterprise software solutions. We use the latest technologies and best practices to create applications that are secure, scalable, and maintainable.',
      features: [
        'Custom Development',
        'Mobile App Development',
        'API Integration',
        'Database Design',
        'Cloud Deployment',
        'Maintenance & Support'
      ],
      benefits: [
        'Streamlined Operations',
        'Improved Efficiency',
        'Better Data Management',
        'Enhanced Security',
        'Scalable Solutions',
        'Ongoing Support'
      ],
      process: [
        'Requirements Analysis',
        'Architecture Design',
        'Development',
        'Testing',
        'Deployment',
        'Maintenance'
      ],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
  };

  const service = services[slug as keyof typeof services];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--primary-blue)] mb-4">Service Not Found</h1>
          <p className="text-[var(--gray-600)] mb-8">The service you're looking for doesn't exist.</p>
          <a href="/services" className="btn-primary">Back to Services</a>
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
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      <ServicesBanner />

      {/* About Service Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-6">
                About {service.title}
              </h2>
              <p className="text-[var(--gray-600)] text-lg leading-relaxed mb-6">
                {service.longDescription}
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[var(--primary-blue)]">Our Process:</h3>
                <ul className="space-y-2">
                  {service.process.map((step, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-[var(--accent-blue)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-[var(--gray-600)]">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-4">
              What We Include
            </h2>
            <p className="text-[var(--gray-600)] text-lg max-w-2xl mx-auto">
              Our comprehensive {service.title.toLowerCase()} services cover all aspects of your project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[var(--accent-blue)] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--primary-blue)] mb-2">
                  {feature}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-4">
              Service Benefits
            </h2>
            <p className="text-[var(--gray-600)] text-lg max-w-2xl mx-auto">
              Discover how our {service.title.toLowerCase()} services can transform your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[var(--accent-blue)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">✓</span>
                </div>
                <p className="text-[var(--gray-600)] text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[var(--primary-blue)]">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how our {service.title.toLowerCase()} services can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary bg-white text-[var(--primary-blue)] hover:bg-gray-100">
              Get Free Quote
            </a>
            <a href="/projects" className="btn-secondary border-white text-white hover:bg-white hover:text-[var(--primary-blue)]">
              View Our Work
            </a>
          </div>
        </div>
      </section>

      <ServicesBanner />
    </>
  );
};

export default ServiceDetailPage;
