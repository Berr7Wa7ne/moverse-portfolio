'use client';

import React, { useState } from 'react';

const ServicesQuoteSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const services = [
    'Website Design',
    'Mobile Application',
    'UX/UI Design',
    'Brand Identity',
    'E-commerce Solutions',
    'SEO Optimization',
    'Content Writing',
    'Digital Marketing',
    'Graphic Design'
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">Contact Us</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight">
                Get Your{' '}
                <span className="text-[var(--accent-blue)]">Free Quote Today!</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                    Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-transparent resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side - Contact Info */}
          <div className="bg-[var(--primary-blue)] rounded-2xl p-8 text-white space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">Address</h3>
                <div className="space-y-2 text-white/80">
                  <p>123 Business Street</p>
                  <p>Tech City, TC 12345</p>
                  <p>United States</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <div className="space-y-2 text-white/80">
                  <p>Phone: 1-800-234-5678</p>
                  <p>Email: info@company.com</p>
                  <p>Website: www.company.com</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Open Time</h3>
                <div className="space-y-2 text-white/80">
                  <p>Monday - Friday: 10:00 - 20:00</p>
                  <p>Saturday: 10:00 - 16:00</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/20">
              <h3 className="text-lg font-bold mb-4">Stay Connected</h3>
              <div className="flex gap-4">
                {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 transition-colors rounded-full flex items-center justify-center text-sm font-medium"
                  >
                    {social[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesQuoteSection;
