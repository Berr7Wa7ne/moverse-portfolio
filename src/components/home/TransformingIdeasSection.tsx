import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CountUpAnimation from '../ui/CountUpAnimation';
import ScrollReveal from '../ui/ScrollReveal';

const TransformingIdeasSection: React.FC = () => {
  const stats = [
    { number: 250, label: 'Projects Done', suffix: '+', icon: '📊' },
    { number: 300, label: 'Happy Clients', suffix: '+', icon: '😊' },
    { number: 99, label: 'Success Rate', suffix: '%', icon: '🎯' },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <ScrollReveal>
            <div className="space-y-4">
            <p className="text-[16px] text-gray-500 tracking-wider flex items-center gap-3">
                  <span className="block w-20 h-[2px] bg-gray-500"></span>
                  Why Choose Us
                </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight">
                Transforming ideas into{' '}
                <span className="text-[var(--accent-blue)]">Digital Reality</span>
              </h2>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                We specialize in turning your innovative concepts into powerful digital solutions. 
                Our team combines creativity with cutting-edge technology to deliver exceptional 
                results that drive business growth and success.
              </p>
            </div>
            </ScrollReveal>

            <div>
            <Link href="/about" className='btn-secondary inline-flex items-center gap-2 hover:gap-3 transition-all'>
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 bg-[var(--accent-blue)] px-8 py-4 rounded-xl">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    <CountUpAnimation end={stat.number} suffix={stat.suffix} duration={2000} />
                  </div>
                  <div className="text-sm text-white font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-2xl">
              <img
                src="/transformImage.jpg"
                alt="Team collaboration"
                className="w-full h-auto rounded-2xl shadow-2xl hover-scale"
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
      </div>
    </section>
  );
};

export default TransformingIdeasSection;
