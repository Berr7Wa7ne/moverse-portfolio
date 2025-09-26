import React from 'react';
import Link from 'next/link';
import ServicesBanner from '../ui/ServicesBanner';

const HeroSection: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-[var(--primary-blue)] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-[var(--primary-blue)]/80"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="space-y-4 md:space-y-5">
                <p className="text-[16px] text-gray-50 tracking-wider flex items-center gap-3">
                  <span className="block w-20 h-[2px] bg-gray-50"></span>
                  Experience the best IT Solutions
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Where Creativity Meets Cutting-Edge Technology
                </h1>
                <p className="text-lg text-white/90 leading-relaxed max-w-lg">
                  We transform innovative ideas into powerful digital solutions that drive business growth. 
                  Our expert team delivers exceptional results through creative design and advanced technology.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-12">
                <Link href="/services" className="btn-primary bg-[var(--accent-blue)] hover:bg-[#2952cc] text-center">
                  Explore More
                </Link>
                <Link href="/contact" className="btn-secondary bg-white text-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white text-center border-white">
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
