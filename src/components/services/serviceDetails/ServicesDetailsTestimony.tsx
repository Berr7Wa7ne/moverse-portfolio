import React from 'react';
import ServicesBanner from '@/components/ui/ServicesBanner';

const ServicesDetailsTestimony: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'CEO, TechStart Inc.',
      image: '/sarah.jpg',
      quote:
        'The team exceeded our expectations with their innovative approach and attention to detail. Our project was delivered on time and within budget.',
    },
    {
      name: 'Michael Chen',
      title: 'Founder, Digital Solutions',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      quote:
        'Professional, reliable, and creative. They transformed our vision into a stunning digital reality that has significantly boosted our business.',
    },
  ];

  return (
    <>
      <ServicesBanner />
      <section className="section-padding bg-[var(--primary-blue)]">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-[16px] text-gray-50 tracking-wider flex items-center justify-center gap-3">
              <span className="block w-20 h-[2px] bg-gray-50"></span>
              Testimonial
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-4">
              What Our{' '}
              <span className="text-[var(--accent-blue)]">Clients Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden"
              >
                {/* Quote Icon in background */}
                <span className="absolute top-6 right-6 text-[40px] text-[var(--accent-blue)] opacity-20">
                  &ldquo;
                </span>

                <div className="flex items-center gap-4 mb-4">
                  {/* Rocket-like avatar wrapper */}
                  <div className="relative w-30 h-30">
                    <div className="absolute inset-0 bg-[var(--accent-blue)] rounded-tr-full rounded-br-full"></div>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 w-26 h-26 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[var(--primary-blue)]">
                      {testimonial.name}
                    </h3>
                    <p className="text-lg text-[var(--gray-600)]">
                      {testimonial.title}
                    </p>
                    {/* Star Rating */}
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">
                          ★
                        </span>
                      ))}
                      <span className="ml-1 text-lg text-gray-600 font-medium">
                        5.0
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote Text */}
                <blockquote className="text-[var(--gray-600)] leading-relaxed text-lg italic">
                  {testimonial.quote}
                </blockquote>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === 0
                    ? 'bg-[var(--accent-blue)]'
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesDetailsTestimony;
