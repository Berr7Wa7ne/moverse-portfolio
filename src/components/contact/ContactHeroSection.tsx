'use client';

import React, { useEffect, useState } from 'react';

const ContactHeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[60vh] flex items-center bg-[var(--primary-blue)] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100"
        style={{
          backgroundImage: "url('/contactHero.jpg')",
          transform: `translateY(${scrollY * 0.4}px)`,
          filter: 'brightness(0.45) contrast(1.1)',
        }}
      >
        <div className="absolute inset-0 bg-[var(--primary-blue)]/70 mix-blend-multiply"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[var(--accent-blue)]/25 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-[var(--accent-blue)]/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-white/15 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container relative z-10 text-center text-white">
        <div className="space-y-4">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            Contact Us
          </h1>

          <p
            className="text-lg text-white/80 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '0.2s',
            }}
          >
            Home / Contact Us
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;
