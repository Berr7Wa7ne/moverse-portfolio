'use client';

import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const NewsletterSection: React.FC = () => {
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
          {/* Subtitle with line */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-20 h-[2px] bg-[var(--gray-600)]"></div>
            <span className="text-sm text-[var(--gray-600)] tracking-wider">Our Newsletter</span>
          </div>
          
          {/* Main heading with mixed colors */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
            <span className="text-[var(--primary-blue)]">Subscribe</span>{' '}
            <span className="text-[var(--accent-blue)]">For Expert IT</span>
            <br />
            <span className="text-[var(--accent-blue)]">Tips And Social Offer</span>
          </h2>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-[var(--accent-blue)]" />
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
              className="btn-primary bg-[var(--accent-blue)] hover:bg-[#2952cc] whitespace-nowrap px-8 py-4"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
