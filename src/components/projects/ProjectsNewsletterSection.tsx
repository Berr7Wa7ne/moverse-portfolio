'use client';

import React, { useState } from 'react';

const ProjectsNewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription here
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="section-padding bg-[var(--primary-blue)]">
      <div className="container">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
            Subscribe For Expert IT Tips And Social Offer
          </h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="flex-1 px-6 py-4 rounded-lg border-0 focus:ring-2 focus:ring-[var(--accent-blue)] focus:outline-none text-[var(--gray-800)]"
              required
            />
            <button
              type="submit"
              className="btn-primary bg-[var(--accent-blue)] hover:bg-[#2952cc] whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProjectsNewsletterSection;
