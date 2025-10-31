'use client';

import React, { useState, useEffect } from 'react';
import ServicesBanner from '../ui/ServicesBanner';
import { listProjects } from '@/lib/content/projects';
import { fetchProjectsFromCMS } from '@/lib/cms/sanity';
import ScrollReveal from '../ui/ScrollReveal';

type Testimonial = {
  name: string;
  title: string;
  image: string;
  quote: string;
  rating: number;
};

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch testimonials on mount
  useEffect(() => {
    const loadTestimonials = async () => {
      const useCMS = process.env.NEXT_PUBLIC_USE_CMS === 'true';
      
      if (useCMS) {
        try {
          const cmsProjects: any[] = await fetchProjectsFromCMS();
          console.log('[testimonials section] Source: Sanity CMS', { count: cmsProjects?.length });
          
          const testimonialData = (cmsProjects || [])
            .filter((p) => p.testimonial && p.testimonial.author && p.testimonial.text)
            .map((p) => ({
              name: p.testimonial.author,
              title: p.testimonial.position || 'Client',
              image: p.testimonial.image || '/next.svg',
              quote: p.testimonial.text,
              rating: p.testimonial.rating || 5.0,
            }))
            .slice(0, 6); // Get 6 latest testimonials
          
          if (testimonialData.length > 0) {
            setTestimonials(testimonialData);
            return;
          }
        } catch (error) {
          console.error('[testimonials section] CMS fetch failed:', error);
        }
      }
      
      // Fallback to static content
      console.log('[testimonials section] Source: local static content');
      const staticProjects = listProjects();
      const testimonialData = staticProjects
        .filter((p: any) => p.testimonial)
        .map((p: any) => ({
          name: p.testimonial.author,
          title: p.testimonial.position,
          image: p.testimonial.image,
          quote: p.testimonial.text,
          rating: p.testimonial.rating,
        }))
        .slice(0, 6);
      
      setTestimonials(testimonialData);
    };

    loadTestimonials();
  }, []);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (testimonials.length === 0) return;

    const totalSlides = Math.ceil(testimonials.length / 2);
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setTimeout(() => setIsAnimating(false), 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  const handleDotClick = (index: number) => {
    if (currentSlide === index || isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Calculate which testimonials to show
  const startIndex = currentSlide * 2;
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + 2);
  const totalSlides = Math.ceil(testimonials.length / 2);

  // Don't render if no testimonials
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <>
      <ServicesBanner />
      <section className="section-padding bg-[var(--primary-blue)]">
        <div className="container">
          <ScrollReveal>
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
          </ScrollReveal>

          <div className="relative overflow-hidden">
            <div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-500 ease-in-out"
              style={{
                opacity: isAnimating ? 0.5 : 1,
                transform: isAnimating ? 'scale(0.98)' : 'scale(1)',
              }}
            >
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden card-hover"
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
                  <div className="flex items-center gap-1 mt-1">
                    {(() => {
                      const rating = testimonial.rating;
                      const fullStars = Math.floor(rating);
                      const hasPartialStar = rating % 1 !== 0;
                      const partialStarFill = rating % 1;
                      const emptyStars = 5 - Math.ceil(rating);
                      
                      const FullStarSVG = () => (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                            fill="#facc15"
                          />
                        </svg>
                      );
                      
                      const EmptyStarSVG = () => (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                            fill="#d1d5db"
                          />
                        </svg>
                      );
                      
                      const PartialStarSVG = ({ fillPercent }: { fillPercent: number }) => (
                        <div className="relative inline-block w-4 h-4">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute top-0 left-0">
                            <path
                              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                              fill="#d1d5db"
                            />
                          </svg>
                          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillPercent * 100}%` }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                fill="#facc15"
                              />
                            </svg>
                          </div>
                        </div>
                      );
                      
                      const stars = [];
                      
                      // Add full stars
                      for (let i = 0; i < fullStars; i++) {
                        stars.push(<FullStarSVG key={`full-${i}`} />);
                      }
                      
                      // Add partial star if needed
                      if (hasPartialStar) {
                        stars.push(<PartialStarSVG key="partial" fillPercent={partialStarFill} />);
                      }
                      
                      // Add empty stars
                      for (let i = 0; i < emptyStars; i++) {
                        stars.push(<EmptyStarSVG key={`empty-${i}`} />);
                      }
                      
                      return stars;
                    })()}
                    <span className="ml-2 text-base text-gray-600 font-medium">
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
          </div>

          {/* Navigation Dots */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-[var(--accent-blue)] w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
