import React from 'react';
import ServicesBanner from '../ui/ServicesBanner';
import { listProjects } from '@/lib/content/projects';
import { fetchProjectsFromCMS } from '@/lib/cms/sanity';

type Testimonial = {
  name: string;
  title: string;
  image: string;
  quote: string;
  rating: number;
};

async function getTestimonials(): Promise<Testimonial[]> {
  const useCMS = process.env.USE_CMS === 'true';
  
  if (useCMS) {
    const cmsProjects: any[] = await fetchProjectsFromCMS();
    console.log('[testimonials section] Source: Sanity CMS', { count: cmsProjects?.length });
    
    // Extract testimonials from projects
    return (cmsProjects || [])
      .filter((p) => p.testimonial && p.testimonial.author && p.testimonial.text)
      .map((p) => ({
        name: p.testimonial.author,
        title: p.testimonial.position || 'Client',
        image: p.testimonial.image || '/next.svg',
        quote: p.testimonial.text,
        rating: p.testimonial.rating || 5.0,
      }))
      .slice(0, 2); // Show only 2 testimonials
  }
  
  const staticProjects = listProjects();
  console.log('[testimonials section] Source: local static content', { count: staticProjects?.length });
  
  // Extract testimonials from static projects
  return staticProjects
    .filter((p: any) => p.testimonial)
    .map((p: any) => ({
      name: p.testimonial.author,
      title: p.testimonial.position,
      image: p.testimonial.image,
      quote: p.testimonial.text,
      rating: p.testimonial.rating,
    }))
    .slice(0, 2);
}

const TestimonialsSection = async () => {
  const testimonials = await getTestimonials();

  // Don't render if no testimonials
  if (testimonials.length === 0) {
    return null;
  }

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
                key={`${testimonial.name}-${index}`}
                className="bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden"
              >
                {/* Quote Icon in background */}
                <span className="absolute top-6 right-6 text-[40px] text-[var(--accent-blue)] opacity-20">
                  &ldquo;
                </span>

                {/* Rocket-like avatar wrapper - positioned at top-left edge */}
                <div className="absolute top-0 left-0">
                  <div className="relative w-28 h-28">
                    <div className="absolute inset-0 bg-[var(--accent-blue)] rounded-tr-full rounded-br-full"></div>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 w-24 h-24 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  </div>
                </div>

                {/* Content with left margin to avoid overlap with avatar */}
                <div className="ml-28">
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
                      {testimonial.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                
                {/* Quote Text - starts closer to left edge */}
                <blockquote className="text-[var(--gray-600)] leading-relaxed text-lg italic mt-4">
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

export default TestimonialsSection;
