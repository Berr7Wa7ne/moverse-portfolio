import React from 'react';

const ProjectsHeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-[var(--primary-blue)] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-[var(--primary-blue)]/80"></div>
      </div>

      <div className="container relative z-10 text-center text-white">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Our Works
          </h1>
          <p className="text-lg text-white/80">
            Home / Our Works
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsHeroSection;
