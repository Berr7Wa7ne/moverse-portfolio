"use client";

import React from "react";
import { Check } from "lucide-react";

type ProjectChallengeServiceSectionProps = {
  collageImage: string;
  challengeTitle: string;
  challengeText: string;
  serviceTitle: string;
  serviceText: string;
  serviceBullets: string[];
};

const ProjectChallengeServiceSection: React.FC<ProjectChallengeServiceSectionProps> = ({
  collageImage,
  challengeTitle,
  challengeText,
  serviceTitle,
  serviceText,
  serviceBullets,
}) => {
  return (
    <section className="bg-white">
      <div className="container py-10">
        {/* Collage / Wide image */}
        <div className="overflow-hidden rounded-2xl mb-10">
          <img src={collageImage} alt="project collage" className="w-full h-72 md:h-[600px] object-cover" />
        </div>

        {/* The Challenge */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-blue)] mb-3">{challengeTitle}</h2>
          <p className="text-[var(--gray-700)] leading-7">{challengeText}</p>
        </div>

        {/* The Service */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-blue)] mb-3">{serviceTitle}</h2>
          <p className="text-[var(--gray-700)] leading-7 mb-6">{serviceText}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {serviceBullets.map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[var(--accent-blue)]">
                  <Check size={16} className="text-white" strokeWidth={3} />
                </span>
                <span className="text-[var(--gray-700)]">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectChallengeServiceSection;


