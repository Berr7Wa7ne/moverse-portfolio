"use client";

import React from "react";

type Info = {
  client: string;
  service: string;
  location: string;
  year: string;
};

type ProjectIntroSectionProps = {
  heroImage: string;
  title: string;
  lead: string;
  body: string;
  info: Info;
};

const ProjectIntroSection: React.FC<ProjectIntroSectionProps> = ({ 
    heroImage, 
    title, 
    lead, 
    body, 
    info,
}) => {

    const firstLetter = lead ? lead.charAt(0).toUpperCase() : "";

  return (
    <section className="bg-white">
      <div className="container py-8 md:py-10">
        {/* Hero Image */}
        <div className="relative mb-8 md:mb-10 overflow-hidden rounded-2xl">
          <img src={heroImage} alt={title} className="w-full h-72 md:h-[600px] object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-[var(--primary-blue)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 7.5v5l4-2.5-4-2.5z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Title + Content with Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-2">
            <h1 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-[var(--primary-blue)] leading-tight mb-5">
              {title}
            </h1>

            <div className="flex items-start gap-4 mb-5">
            <span className="w-12 h-12 flex-shrink-0 rounded-full bg-[var(--accent-blue)] text-white flex items-center justify-center text-lg font-semibold">
                {firstLetter}
              </span>
              <p className="text-[var(--gray-700)] leading-7">
                {lead}
              </p>
            </div>

            <p className="text-[var(--gray-700)] leading-7">
              {body}
            </p>
          </div>

          <aside className="bg-[var(--primary-blue)] text-white rounded-2xl p-6 shadow-md">
            <div className="space-y-5">
              <div>
                <p className="text-xs text-white/70 mb-1">Client Name:</p>
                <p className="font-semibold">{info.client}</p>
              </div>
              <div className="h-px bg-white/15" />
              <div>
                <p className="text-xs text-white/70 mb-1">Service</p>
                <p className="font-semibold">{info.service}</p>
              </div>
              <div className="h-px bg-white/15" />
              <div>
                <p className="text-xs text-white/70 mb-1">Location</p>
                <p className="font-semibold">{info.location}</p>
              </div>
              <div className="h-px bg-white/15" />
              <div>
                <p className="text-xs text-white/70 mb-1">Year</p>
                <p className="font-semibold">{info.year}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ProjectIntroSection;


