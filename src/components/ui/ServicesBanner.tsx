import React from 'react';

const ServicesBanner: React.FC = () => {
  return (
    <div className="bg-[var(--primary-blue)] py-3">
      <div className="container">
        <div className="flex items-center justify-center gap-8 text-white text-sm font-medium">
          <span>Application Design</span>
          <span className="text-[var(--accent-blue)]">★</span>
          <span>UX/UI Design</span>
          <span className="text-[var(--accent-blue)]">★</span>
          <span>Website Development</span>
        </div>
      </div>
    </div>
  );
};

export default ServicesBanner;


