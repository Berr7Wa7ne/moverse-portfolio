import React from 'react';

const AboutProcessSection: React.FC = () => {
  const processes = [
    {
      step: '01',
      icon: '📋',
      title: 'Consultation',
      description: 'We start with a detailed consultation to understand your vision, goals, and specific requirements for your project.'
    },
    {
      step: '02',
      icon: '🎯',
      title: 'Strategy',
      description: 'Our team develops a comprehensive strategy tailored to your needs, outlining the roadmap and timeline for your project.'
    },
    {
      step: '03',
      icon: '⚙️',
      title: 'Implementation',
      description: 'We execute the plan using the latest technologies and best practices to bring your vision to life.'
    },
    {
      step: '04',
      icon: '🏆',
      title: 'Final Result',
      description: 'We deliver your completed project with ongoing support and maintenance to ensure continued success.'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">Our Work Process</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mt-4">
            Our Proven{' '}
            <span className="text-[var(--accent-blue)]">Work Process</span>
          </h2>
        </div>

        <div className="relative">
          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processes.map((process, index) => (
              <div key={index} className="text-center relative">
                {/* Step Number */}
                <div className="text-sm text-[var(--gray-600)] mb-4 font-medium">
                  {process.step}
                </div>

                {/* Step Circle */}
                <div className="relative mx-auto mb-6">
                  <div className="w-20 h-20 bg-[var(--accent-blue)] rounded-full flex items-center justify-center text-white text-2xl font-bold relative z-10">
                    {process.icon}
                  </div>
                </div>

                {/* Connecting Line (hidden on mobile) */}
                {index < processes.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-[var(--gray-300)] z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[var(--accent-blue)] rounded-full"></div>
                  </div>
                )}

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-[var(--primary-blue)]">
                    {process.title}
                  </h3>
                  <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                    {process.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProcessSection;
