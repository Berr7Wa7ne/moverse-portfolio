'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import ServicesBanner from '../ui/ServicesBanner';

const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-[var(--primary-blue)] overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100"
          style={{
            backgroundImage: "url('/homeHero.jpg')",
            transform: `translateY(${scrollY * 0.5}px)`,
            filter: 'brightness(0.45) contrast(1.1)',
          }}
        >
          <div className="absolute inset-0 bg-[var(--primary-blue)]/70 mix-blend-multiply"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-[var(--accent-blue)]/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-[var(--accent-blue)]/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="space-y-4 md:space-y-5">
                <p 
                  className="text-[16px] text-gray-50 tracking-wider flex items-center gap-3 transition-all duration-700 ease-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                  }}
                >
                  <span className="block w-20 h-[2px] bg-gray-50"></span>
                  Experience the best IT Solutions
                </p>
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-700 ease-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: '0.2s',
                  }}
                >
                  Where Creativity Meets Cutting-Edge Technology
                </h1>
                <p 
                  className="text-lg text-white/90 leading-relaxed max-w-lg transition-all duration-700 ease-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: '0.4s',
                  }}
                >
                  We transform innovative ideas into powerful digital solutions that drive business growth. 
                  Our expert team delivers exceptional results through creative design and advanced technology.
                </p>
              </div>

              {/* CTA Buttons */}
              <div 
                className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-12 transition-all duration-700 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: '0.6s',
                }}
              >
                <Link 
                  href="/services" 
                  className="btn-primary bg-[var(--accent-blue)] hover:bg-[#2952cc] text-center group inline-flex items-center justify-center gap-2 transition-all hover:gap-4"
                >
                  Explore More
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link 
                  href="/contact" 
                  className="btn-secondary bg-white text-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white text-center border-white transition-all hover:scale-105"
                >
                  Contact Us
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Banner */}
      <ServicesBanner />
    </>
  );
};

export default HeroSection;
