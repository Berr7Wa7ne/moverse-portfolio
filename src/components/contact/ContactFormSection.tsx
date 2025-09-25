'use client';

import React, { useState } from 'react';

const ContactFormSection: React.FC = () => {
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
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-[var(--accent-blue)]"></div>
                <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">Contact Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight">
                Get Your{' '}
                <span className="text-[var(--accent-blue)]">Free Quote Today!</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Ex. John Doe"
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
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-transparent"
                  required
                />
              </div>

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
                  placeholder="Enter Phone Number"
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
                  <option value="">Select services</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Enter Here..."
                  className="w-full px-4 py-3 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-transparent resize-none"
                  required
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
                  <p>2464 Royal Ln. Mess, New Jersey 45463</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <div className="space-y-2 text-white/80">
                  <p>Phone: +(000) 000-000</p>
                  <p>Email: example@gmail.com</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Open Time</h3>
                <div className="space-y-2 text-white/80">
                  <p>Monday - Friday : 10:00 - 20:00</p>
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

export default ContactFormSection;
