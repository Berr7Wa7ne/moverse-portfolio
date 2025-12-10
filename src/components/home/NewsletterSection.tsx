'use client';

import React, { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import { useToast } from '../ui/Toast';

const NewsletterSection: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      // Show success toast
      showToast('🎉 Successfully subscribed! Check your email for confirmation.', 'success');
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      // Show error toast
      const errorMsg = error instanceof Error ? error.message : 'Failed to subscribe. Please try again.';
      showToast(errorMsg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-white">
      <ScrollReveal>
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            {/* Subtitle with line */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-20 h-[2px] bg-[var(--gray-600)]"></div>
              <span className="text-[16px] text-[var(--gray-600)] tracking-wider">Our Newsletter</span>
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
                  <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[var(--accent-blue)]" />
                  </div>
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full pl-10 ml-2 pr-4 py-4 rounded-lg border border-[var(--gray-300)] focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-transparent text-[var(--gray-800)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary bg-[var(--accent-blue)] hover:bg-[#2952cc] whitespace-nowrap px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default NewsletterSection;