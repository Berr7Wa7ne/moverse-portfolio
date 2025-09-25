import React from 'react';
import Link from 'next/link';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: '🎨',
      title: 'Web Design',
      description: 'Create stunning, responsive websites that captivate your audience and deliver exceptional user experiences across all devices.'
    },
    {
      icon: '📱',
      title: 'Mobile Development',
      description: 'Build powerful mobile applications for iOS and Android that engage users and drive business growth.'
    },
    {
      icon: '⚡',
      title: 'Digital Marketing',
      description: 'Boost your online presence with strategic digital marketing campaigns that reach your target audience effectively.'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <div className="flex justify-between items-start mb-8">
            <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">Our Services</span>
            <Link href="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mb-6">
            Services we provide to{' '}
            <span className="text-[var(--accent-blue)]">Elevate Your Business</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-[var(--gray-100)] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[var(--accent-blue)] rounded-full flex items-center justify-center mx-auto text-2xl group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--primary-blue)]">
                  {service.title}
                </h3>
                <p className="text-[var(--gray-600)] leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
