import React from "react";
import Link from "next/link";
import { Palette, Smartphone, Zap } from "lucide-react";

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Palette,
      title: "Web Design",
      description:
        "Create stunning, responsive websites that captivate your audience and deliver exceptional user experiences across all devices.",
      href: "/services/web-design",
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description:
        "Build powerful mobile applications for iOS and Android that engage users and drive business growth.",
      href: "/services/mobile-development",
    },
    {
      icon: Zap,
      title: "Digital Marketing",
      description:
        "Boost your online presence with strategic digital marketing campaigns that reach your target audience effectively.",
      href: "/services/digital-marketing",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-16 mr-20">
          <div>
            <p className="text-[16px] text-gray-500 tracking-wider flex items-center gap-3">
              <span className="block w-20 h-[2px] bg-gray-500"></span>
              Our Services
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mb-6">
              <span className="block">Services we provide to</span>
              <span className="block text-[var(--accent-blue)]">
                Elevate Your Business
              </span>
            </h2>
          </div>

          <Link href="/services" className="btn-primary">
            View All Services
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                href={service.href}
                className="bg-[var(--gray-100)] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group block"
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
