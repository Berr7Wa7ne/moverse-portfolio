"use client";

import React from "react";
import { Check } from "lucide-react"; 

export type ServiceAboutProps = {
  title: string;
  longDescription: string;
  extraDescription?: string;
  bullets: string[];
  image1: string;
  image2: string;
  image: string;
};

const ServiceAbout: React.FC<ServiceAboutProps> = ({
  title,
  longDescription,
  extraDescription,
  bullets,
  image1,
  image2,
  image,
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto space-y-12">
        {/* Top media (image first) */}
        <div className="relative">
          <img
            src={image}
            alt={`${title} hero`}
            className="w-full h-72 md:h-full object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-14 h-14 md:w-16 md:h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-[var(--primary-blue)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 7.5v5l4-2.5-4-2.5z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        {/* 1. About Section */}
        <div>
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--primary-blue)] mb-6">
            About {title} Services
          </h2>

          {/* Paragraphs */}
          <p className="text-[var(--gray-600)] text-base md:text-lg leading-relaxed mb-4">
            {longDescription}
          </p>
          {extraDescription && (
            <p className="text-[var(--gray-600)] text-base md:text-lg leading-relaxed mb-6">
              {extraDescription}
            </p>
          )}
        </div>

        {/* 2. Services Include Section */}
        <div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[var(--primary-blue)] mb-6">
            Services Include:
          </h3>

          {/* Bullet list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {bullets.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[var(--accent-blue)]">
                  <Check size={16} className="text-white" strokeWidth={3} />
                </span>
                <span className="text-[var(--gray-700)]">{item}</span>
              </div>
            ))}
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              src={image1}
              alt={`${title} showcase 1`}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
            <img
              src={image2}
              alt={`${title} showcase 2`}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAbout;
