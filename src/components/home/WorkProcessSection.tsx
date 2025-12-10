'use client';

import React from "react";
import { MessageSquare, ClipboardList, Rocket, Sparkles } from "lucide-react";
import ScrollReveal from '../ui/ScrollReveal';

const WorkProcessSection: React.FC = () => {
  const processes = [
    {
      step: "01",
      icon: MessageSquare,
      title: "Consultation",
      description:
        "We start with a detailed consultation to understand your vision and requirements.",
    },
    {
      step: "02",
      icon: ClipboardList,
      title: "Planning",
      description:
        "Our team creates a comprehensive plan tailored to your specific needs and goals.",
    },
    {
      step: "03",
      icon: Rocket,
      title: "Development",
      description:
        "We develop your project using the latest technologies and best practices.",
    },
    {
      step: "04",
      icon: Sparkles,
      title: "Delivery",
      description:
        "We deliver your completed project with ongoing support and maintenance.",
    },
  ];

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-white">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm sm:text-[16px] text-gray-500 tracking-wider flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="hidden sm:block w-12 sm:w-20 h-[2px] bg-gray-500"></span>
              Our Process
              <span className="hidden sm:block w-12 sm:w-20 h-[2px] bg-gray-500"></span>
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mt-4">
              Our Proven{" "}
              <span className="text-[var(--accent-blue)]">Work Process</span>
            </h2>
          </div>
          <div className="relative">
            {/* Horizontal Line */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-[var(--gray-300)] z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">
              {processes.map((process, index) => {
                const Icon = process.icon;
                return (
                  <ScrollReveal key={index} delay={index * 0.2} direction="up">
                    <div className="relative group cursor-pointer">
                      {/* Step Circle with Icon (centered) */}
                      <div className="relative mx-auto mb-6 w-20 h-20 sm:w-24 sm:h-24">
                        <div className="w-full h-full bg-[var(--accent-blue)] rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl">
                          <Icon className="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110" />
                        </div>

                        {/* Step Badge */}
                        <div className="absolute -right-2 sm:-right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--primary-blue)] flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-md z-20 transition-transform duration-300 group-hover:scale-110">
                          {process.step}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-2 text-center sm:text-left sm:ml-20 lg:ml-24">
                        <h3 className="text-xl sm:text-2xl font-bold text-[var(--primary-blue)] transition-colors duration-300 group-hover:text-[var(--accent-blue)]">
                          {process.title}
                        </h3>
                        <p className="text-sm sm:text-[16px] text-[var(--gray-600)] leading-relaxed">
                          {process.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WorkProcessSection;
