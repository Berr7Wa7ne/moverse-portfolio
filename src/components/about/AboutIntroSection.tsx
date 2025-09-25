import React from 'react';
import Link from 'next/link';

const AboutIntroSection: React.FC = () => {
  const stats = [
    { number: '250+', label: 'Total Project' },
    { number: '300+', label: 'Happy Clients' },
    { number: '99%', label: 'Client Retention' },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">About Us</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight">
                Transforming ideas into{' '}
                <span className="text-[var(--accent-blue)]">Digital Reality</span>
              </h2>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                We are a leading IT company dedicated to transforming innovative ideas into powerful digital solutions. 
                Our expert team combines creativity with cutting-edge technology to deliver exceptional results that 
                drive business growth and success for our clients worldwide.
              </p>
            </div>

            <Link href="/services" className="btn-secondary">
              Learn More
            </Link>

            {/* Stats */}
            <div className="bg-[var(--primary-blue)] rounded-2xl p-8">
              <div className="grid grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-white/80">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Team collaboration"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--accent-blue)] rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[var(--accent-blue)] to-purple-500 rounded-full opacity-20"></div>
            
            {/* Decorative Border */}
            <div className="absolute inset-0 border-4 border-[var(--accent-blue)] rounded-2xl transform rotate-2 opacity-30"></div>
            <div className="absolute inset-0 border-2 border-white rounded-2xl transform -rotate-1 shadow-lg"></div>
          </div>
        </div>

        {/* See Our Team Button */}
        <div className="text-center mt-12">
          <Link href="/team" className="btn-primary flex items-center gap-2 mx-auto">
            See Our Team
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutIntroSection;
