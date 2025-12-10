import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from '../ui/ScrollReveal';
import { getFeaturedServices } from '@/lib/content/services';

const ServicesSection: React.FC = () => {
  const services = getFeaturedServices();

  return (
    <section className="py-12 md:py-20 lg:pt-24 bg-white">
      <div className="container">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 md:mb-16">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm sm:text-[16px] text-gray-500 tracking-wider flex items-center gap-2 sm:gap-3">
                <span className="hidden sm:block w-12 sm:w-20 h-[2px] bg-gray-500"></span>
                Our Services
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mb-2">
                Our <span className="text-[var(--accent-blue)]">Services</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Services we provide to help your business grow
              </p>
            </div>

            <Link href="/services" className="inline-flex items-center gap-2 text-sm sm:text-base text-[var(--primary-blue)] hover:text-[var(--accent-blue)] transition-colors group">
              <span className="font-medium">View all services</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                href={`/services/${service.slug}`}
                className="bg-[var(--gray-100)] rounded-2xl p-8 card-hover group block"
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[var(--accent-blue)] rounded-full flex items-center justify-center mx-auto text-2xl group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--primary-blue)]">
                    {service.title}
                  </h3>
                  <p className="text-[var(--gray-600)] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;