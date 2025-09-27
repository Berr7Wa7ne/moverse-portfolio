import React from "react";
import { MessageSquare, ClipboardList, Rocket, Sparkles } from "lucide-react";

const AboutProcessSection: React.FC = () => {
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
    <section className="section-padding bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[16px] text-[var(--gray-600)] tracking-wider flex items-center justify-center gap-3">
            <span className="block w-20 h-[2px] bg-gray-500"></span>
            Our Process
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mt-4">
            Our Proven{" "}
            <span className="text-[var(--accent-blue)]">Work Process</span>
          </h2>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Horizontal Line */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-[var(--gray-300)] z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {processes.map((process, index) => {
              const Icon = process.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Circle with Icon (centered) */}
                  <div className="relative mx-auto mb-6 w-24 h-24">
                    <div className="w-24 h-24 bg-[var(--accent-blue)] rounded-full flex items-center justify-center text-white text-3xl relative z-10">
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Step Badge */}
                    <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--primary-blue)] flex items-center justify-center text-white text-sm font-bold shadow-md z-20">
                      {process.step}
                    </div>
                  </div>

                  {/* Content (left-aligned now) */}
                  <div className="space-y-2 text-left ml-24">
                    <h3 className="text-2xl font-bold text-[var(--primary-blue)]">
                      {process.title}
                    </h3>
                    <p className="text-[16px] text-[var(--gray-600)] leading-relaxed">
                      {process.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProcessSection;
