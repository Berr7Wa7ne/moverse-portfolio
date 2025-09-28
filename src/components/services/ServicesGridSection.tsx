import React from 'react';
import Link from 'next/link';
import {
  Monitor,
  Smartphone,
  Palette,
  Megaphone,
  ShoppingCart,
  Search,
  BarChart3,
  Target
} from "lucide-react"; // ✅ Import lucide icons

const ServicesGridSection: React.FC = () => {
  const services = [
    {
      icon: <Monitor className="w-8 h-8" />, // Website Design
      title: 'Website Design',
      description: 'Create stunning, responsive websites that captivate your audience and deliver exceptional user experiences across all devices.',
      slug: 'website-development'
    },
    {
      icon: <Smartphone className="w-8 h-8" />, // Mobile Application
      title: 'Mobile Application',
      description: 'Build powerful mobile applications for iOS and Android that engage users and drive business growth with modern technology.',
      slug: 'application-development'
    },
    {
      icon: <Palette className="w-8 h-8" />, // UX/UI Design
      title: 'UX/UI Design',
      description: 'Design intuitive and beautiful user interfaces that provide seamless experiences and enhance user engagement.',
      slug: 'ui-ux-design'
    },
    {
      icon: <Megaphone className="w-8 h-8" />, // Brand Identity
      title: 'Brand Identity',
      description: 'Develop strong brand identities that resonate with your audience and differentiate you from competitors.',
      slug: 'brand-identity'
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />, // E-commerce
      title: 'E-commerce Solutions',
      description: 'Build robust online stores with secure payment systems and comprehensive inventory management features.',
      slug: 'ecommerce-solutions'
    },
    {
      icon: <Search className="w-8 h-8" />, // SEO
      title: 'SEO Optimization',
      description: 'Improve your search engine rankings and drive organic traffic with our comprehensive SEO strategies.',
      slug: 'seo-optimization'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />, // Digital Marketing
      title: 'Digital Marketing',
      description: 'Boost your online presence with strategic digital marketing campaigns that reach your target audience effectively.',
      slug: 'digital-marketing'
    },
    {
      icon: <Target className="w-8 h-8" />, // Graphic Design
      title: 'Graphic Design',
      description: 'Create visually stunning graphics and marketing materials that communicate your message effectively.',
      slug: 'graphic-design'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-[16px] text-[var(--gray-600)] tracking-wider flex items-center justify-center gap-3">
            <span className="block w-20 h-[2px] bg-gray-500"></span>
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight">
            <span>Services We Provide to</span>{' '}
            <br />
            <span className="text-[var(--accent-blue)]">Elevate Your Business</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-[var(--gray-200)]">
              <div className="space-y-6">
                {/* Icon Wrapper */}
                <div className="w-16 h-16 bg-[var(--light-blue)] rounded-full flex items-center justify-center text-2xl group-hover:bg-[var(--accent-blue)] group-hover:scale-110 transition-all duration-300">
                  <span className="text-[var(--accent-blue)] group-hover:text-white">
                    {service.icon}
                  </span>
                </div>
                
                {/* Title & Description */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[var(--primary-blue)] group-hover:text-[var(--accent-blue)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[var(--gray-600)] leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                {/* Learn More Button */}
                <Link 
                  href={`/services/${service.slug}`}
                  className="text-[var(--accent-blue)] hover:text-[#2952cc] font-semibold transition-colors flex items-center gap-2 group"
                >
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGridSection;
