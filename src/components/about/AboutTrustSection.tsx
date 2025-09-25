import React from 'react';
import ServicesBanner from '../ui/ServicesBanner';

const AboutTrustSection: React.FC = () => {
  const features = [
    {
      icon: '💰',
      title: 'Affordable Price',
      description: 'We offer competitive pricing without compromising on quality. Get premium services at budget-friendly rates that deliver exceptional value.'
    },
    {
      icon: '👥',
      title: 'Professional Team',
      description: 'Our experienced team of developers, designers, and marketers work together to deliver exceptional results that exceed expectations.'
    },
    {
      icon: '📅',
      title: '10+ Years Experience',
      description: 'With over 10 years in the industry, we have the expertise and knowledge to handle any project, from simple websites to complex applications.'
    },
    {
      icon: '🏆',
      title: 'Award Winning',
      description: 'Recognized for excellence in design and development, we deliver award-winning solutions that stand out in the competitive market.'
    }
  ];

  return (
    <>
      <ServicesBanner />
      <section className="section-padding bg-[var(--primary-blue)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <span className="text-sm text-white/80 uppercase tracking-wider">Why Choose Us</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Why Trust Us For Your{' '}
                  <span className="text-[var(--accent-blue)]">IT Needs?</span>
                </h2>
              </div>

              {/* Video/Image with Play Button */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Team collaboration"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-lg group">
                    <svg className="w-8 h-8 text-[var(--accent-blue)] ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content - Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-[var(--accent-blue)] rounded-full flex items-center justify-center text-white text-xl">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Get a Quote Button */}
            <div className="lg:col-span-2 flex justify-center lg:justify-end">
              <button className="btn-primary bg-[var(--accent-blue)] hover:bg-[#2952cc]">
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutTrustSection;
