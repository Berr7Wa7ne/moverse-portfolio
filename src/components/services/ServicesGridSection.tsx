import React from 'react';

const ServicesGridSection: React.FC = () => {
  const services = [
    {
      icon: '💻',
      title: 'Website Design',
      description: 'Create stunning, responsive websites that captivate your audience and deliver exceptional user experiences across all devices.'
    },
    {
      icon: '📱',
      title: 'Mobile Application',
      description: 'Build powerful mobile applications for iOS and Android that engage users and drive business growth with modern technology.'
    },
    {
      icon: '🎨',
      title: 'UX/UI Design',
      description: 'Design intuitive and beautiful user interfaces that provide seamless experiences and enhance user engagement.'
    },
    {
      icon: '📢',
      title: 'Brand Identity',
      description: 'Develop strong brand identities that resonate with your audience and differentiate you from competitors.'
    },
    {
      icon: '🛒',
      title: 'E-commerce Solutions',
      description: 'Build robust online stores with secure payment systems and comprehensive inventory management features.'
    },
    {
      icon: '🔍',
      title: 'SEO Optimization',
      description: 'Improve your search engine rankings and drive organic traffic with our comprehensive SEO strategies.'
    },
    {
      icon: '📝',
      title: 'Content Writing',
      description: 'Create compelling, SEO-optimized content that engages your audience and drives conversions.'
    },
    {
      icon: '📊',
      title: 'Digital Marketing',
      description: 'Boost your online presence with strategic digital marketing campaigns that reach your target audience effectively.'
    },
    {
      icon: '🎯',
      title: 'Graphic Design',
      description: 'Create visually stunning graphics and marketing materials that communicate your message effectively.'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight">
            Services We Provide to{' '}
            <span className="text-[var(--accent-blue)]">Elevate Your Business</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-[var(--gray-200)]">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-[var(--light-blue)] rounded-full flex items-center justify-center text-2xl group-hover:bg-[var(--accent-blue)] group-hover:scale-110 transition-all duration-300">
                  <span className="group-hover:text-white">{service.icon}</span>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[var(--primary-blue)] group-hover:text-[var(--accent-blue)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[var(--gray-600)] leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <button className="text-[var(--accent-blue)] hover:text-[#2952cc] font-semibold transition-colors flex items-center gap-2 group">
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGridSection;


