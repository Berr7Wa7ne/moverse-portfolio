import React from 'react';
import ServicesBanner from '../ui/ServicesBanner';
import Link from 'next/link';
import { DollarSign, Zap, Shield, Target, ArrowRight } from "lucide-react";
import ScrollReveal from '../ui/ScrollReveal';

const TrustSection: React.FC = () => {
  const features = [
    {
      icon: DollarSign,
      title: 'Affordable Price',
      description: 'We offer competitive pricing without compromising on quality. Get premium services at budget-friendly rates.',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Our efficient workflow ensures quick turnaround times while maintaining the highest standards of quality.',
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Your data and projects are protected with enterprise-grade security measures and best practices.',
    },
    {
      icon: Target,
      title: 'Quality Work',
      description: 'We deliver exceptional results that exceed expectations through attention to detail and expertise.',
    },
  ];

  return (
    <>
      <ServicesBanner />
      <section className="section-padding bg-[var(--primary-blue)]">
        <div className="container">
          {/* Section Header */}
          <ScrollReveal>
          <div className='flex items-center justify-between mb-5'>
            <p className="text-[16px] text-gray-50 tracking-wider flex items-center gap-3">
              <span className="block w-20 h-[2px] bg-gray-50"></span>
              Why Choose Us
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 hover:gap-3 transition-all">
              <span>Get a Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Why Trust Us For Your{' '}
                  <span className="text-[var(--accent-blue)]">IT Needs?</span>
                </h2>
              </div>

              {/* Team Image */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/trustImage.jpg"
                  alt="Team collaboration"
                  className="w-full h-auto rounded-2xl shadow-2xl hover-scale"
                />
              </div>
            </div>

            {/* Right Content - Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 card-hover"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-[var(--accent-blue)] rounded-full flex items-center justify-center text-white">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustSection;
