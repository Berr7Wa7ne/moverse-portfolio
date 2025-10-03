"use client";

import React from "react";
import { Quote } from "lucide-react";

type Testimonial = {
  author: string;
  position: string;
  rating: number;
  image: string;
  text: string;
};

type ProjectResultsSectionProps = {
  title: string;
  text: string;
  wideImage: string;
  testimonial: Testimonial;
};

const ProjectResultsSection: React.FC<ProjectResultsSectionProps> = ({ title, text, wideImage, testimonial }) => {
  return (
    <section className="bg-white">
      <div className="container py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-blue)] mb-3">{title}</h2>
        <p className="text-[var(--gray-700)] leading-7 mb-8">{text}</p>

        <div className="overflow-hidden rounded-2xl mb-8">
          <img src={wideImage} alt="results collage" className="w-full h-72 md:h-[600px] object-cover" />
        </div>

        {/* Testimonial Card */}
<div className="relative rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-7">
  {/* Rocket-like avatar wrapper (absolute to top-left) */}
  <div className="absolute -top-0 -left-0">
    <div className="relative w-30 h-30">
      <div className="absolute inset-0 bg-[var(--accent-blue)] rounded-tr-full rounded-br-full"></div>
      <img
        src={testimonial.image}
        alt={testimonial.author}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 w-26 h-26 rounded-full object-cover border-2 border-white shadow-md"
      />
    </div>
  </div>

  <div className="flex items-start gap-4 md:gap-5 ml-28">
    <div className="flex-1">
    <div>
          <span className="text-sm md:text-lg text-gray-900 font-bold">{testimonial.author}</span>
          <br />
          <span className="text-xs md:text-sm text-gray-500 font-semibold">{testimonial.position}</span>
        </div>
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <div className="flex items-center gap-1 ml-auto md:ml-0">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400 font-semibold">★</span>
          ))}
          <span className="text-gray-900 ml-2 font-bold">{testimonial.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
    <div className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-gray-200 text-[var(--accent-blue)]">
  <Quote className="w-5 h-5" />
</div>
  </div>
  <p className="text-[var(--gray-700)] leading-7 mt-10">{testimonial.text}</p>
</div>

      </div>
    </section>
  );
};

export default ProjectResultsSection;


