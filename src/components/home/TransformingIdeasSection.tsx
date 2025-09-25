import React from 'react';
import Link from 'next/link';

const TransformingIdeasSection: React.FC = () => {
  const stats = [
    { number: '250+', label: 'Projects Done', icon: '📊' },
    { number: '300+', label: 'Happy Clients', icon: '😊' },
    { number: '99%', label: 'Success Rate', icon: '🎯' },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">IT Company</span>
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

            <Link href="/about" className="btn-primary">
              Read More
            </Link>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-[var(--accent-blue)] mb-2">
                    {stat.number}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                  <div className="text-sm text-[var(--gray-600)] font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
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
      </div>
    </section>
  );
};

export default TransformingIdeasSection;
