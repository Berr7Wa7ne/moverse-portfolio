import React from 'react';
import ServicesBanner from '../ui/ServicesBanner';

const AboutTestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Leslie Alexander',
      title: 'CEO, Softwares Company',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      quote: 'The team exceeded our expectations with their innovative approach and attention to detail. Our project was delivered on time and within budget, and the results have been outstanding.'
    },
    {
      name: 'Jenny Wilson',
      title: 'HR Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      quote: 'Professional, reliable, and creative. They transformed our vision into a stunning digital reality that has significantly boosted our business and customer engagement.'
    }
  ];

  return (
    <>
      <ServicesBanner />
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mt-4">
              What Our{' '}
              <span className="text-[var(--accent-blue)]">Clients Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-[var(--gray-200)]">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-[var(--primary-blue)]">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-[var(--gray-600)]">
                      {testimonial.title}
                    </p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>

                <blockquote className="text-[var(--gray-600)] leading-relaxed italic">
                  "{testimonial.quote}"
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
                  index === 0 ? 'bg-[var(--accent-blue)]' : 'bg-[var(--gray-300)]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutTestimonialsSection;
