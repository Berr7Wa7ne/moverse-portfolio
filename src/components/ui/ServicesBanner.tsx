import React from 'react';

const ServicesBanner: React.FC = () => {
  return (
    <div className="bg-[var(--accent-blue)] py-3">
      <div className="container">
        <div className="flex items-stretch justify-center gap-8 text-white text-2xl font-medium">
          <span className="text-white">★</span>
          <span>Application Design</span>
          <span className="text-white">★</span>
          <span>UX/UI Design</span>
          <span className="text-white">★</span>
          <span>Website Development</span>
          <span className="text-white">★</span>
        </div>
      </div>
    </div>
  );
};

export default ServicesBanner;


