import React from 'react';
import Link from 'next/link';
import { ArrowRight } from "lucide-react";
import ScrollReveal from '../ui/ScrollReveal';
import { listServices } from '@/lib/content/services';

const ServicesGridSection: React.FC = () => {
  const services = listServices();

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <ScrollReveal>
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
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg card-hover group border border-[var(--gray-200)]">
                <div className="space-y-6">
                  {/* Icon Wrapper */}
                  <div className="w-16 h-16 bg-[var(--light-blue)] rounded-full flex items-center justify-center text-2xl group-hover:bg-[var(--accent-blue)] group-hover:scale-110 transition-all duration-300">
                    <span className="text-[var(--accent-blue)] group-hover:text-white">
                      <Icon className="w-8 h-8" />
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
                    className="interactive-button text-[var(--accent-blue)] hover:text-[#2952cc] font-semibold"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGridSection;