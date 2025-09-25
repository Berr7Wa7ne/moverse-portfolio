'use client';

import React, { useState } from 'react';

const BlogNewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription here
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-4 mb-8">
            <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">— Our Newsletter</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight">
              Subscribe For Expert{' '}
              <span className="text-[var(--accent-blue)]">IT Tips And Social Offer</span>
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="flex-1 px-6 py-4 rounded-lg border border-[var(--gray-300)] focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-transparent text-[var(--gray-800)]"
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

export default BlogNewsletterSection;
