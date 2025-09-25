'use client';

import React, { useState } from 'react';
import ServicesBanner from '../ui/ServicesBanner';

const ContactNewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription here
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <>
      <ServicesBanner />
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
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[var(--gray-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full pl-10 pr-4 py-4 rounded-lg border border-[var(--gray-300)] focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-transparent text-[var(--gray-800)]"
                  required
                />
              </div>
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
    </>
  );
};

export default ContactNewsletterSection;
