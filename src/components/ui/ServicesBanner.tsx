import React from 'react';

const ServicesBanner: React.FC = () => {
  return (
    <div className="bg-[var(--accent-blue)] py-3">
      <div className="container">
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium flex-wrap">
          <span className="text-white">★</span>
          {/* Application Design */}
          <span className="whitespace-nowrap">
            <span className="block sm:hidden">App Design</span>
            <span className="hidden sm:block">Application Design</span>
          </span>

          <span className="text-white">★</span>
          {/* UX/UI Design */}
          <span className="whitespace-nowrap">
            <span className="block sm:hidden">UI/UX Design</span>
            <span className="hidden sm:block">UX/UI Design</span>
          </span>

          <span className="text-white">★</span>
          {/* Website Development */}
          <span className="whitespace-nowrap">
            <span className="block sm:hidden">Web Dev</span>
            <span className="hidden sm:block">Website Development</span>
          </span>

          <span className="text-white">★</span>
        </div>
      </div>
    </div>
  );
};

export default ServicesBanner;
