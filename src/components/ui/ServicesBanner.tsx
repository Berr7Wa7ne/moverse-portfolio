import React from 'react';

const ServicesBanner: React.FC = () => {
  return (
    <div className="bg-[var(--accent-blue)] py-3">
      <div className="container">
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium flex-wrap">
          <span className="text-white">★</span>
          <span className="whitespace-nowrap">Application Design</span>
          <span className="text-white">★</span>
          <span className="whitespace-nowrap">UX/UI Design</span>
          <span className="text-white">★</span>
          <span className="whitespace-nowrap">Website Development</span>
          <span className="text-white">★</span>
        </div>
      </div>
    </div>
  );
};

export default ServicesBanner;


