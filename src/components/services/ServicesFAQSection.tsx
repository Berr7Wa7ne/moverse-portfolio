'use client';

import React, { useState } from 'react';

const ServicesFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We offer comprehensive IT services including web design and development, mobile app development, digital marketing, e-commerce solutions, and ongoing maintenance and support for all our projects.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary depending on complexity and requirements. A simple website typically takes 2-4 weeks, while complex web applications can take 2-6 months. We provide detailed timelines during the consultation phase.'
    },
    {
      question: 'Do you provide ongoing support after project completion?',
      answer: 'Yes, we offer comprehensive support packages including maintenance, updates, security monitoring, and technical support. Our support plans are designed to keep your digital solutions running smoothly.'
    },
    {
      question: 'What technologies do you work with?',
      answer: 'We work with modern technologies including React, Next.js, Node.js, Python, PHP, WordPress, and various cloud platforms. We stay updated with the latest industry standards and best practices.'
    },
    {
      question: 'Can you help with existing projects?',
      answer: 'Absolutely! We can audit, improve, and maintain existing projects. Whether you need bug fixes, performance optimization, or feature additions, our team can help enhance your current digital solutions.'
    },
    {
      question: 'Do you offer custom pricing for large projects?',
      answer: 'Yes, for large-scale projects or enterprise clients, we provide custom pricing based on specific requirements. Contact us for a personalized quote tailored to your project needs.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mt-4">
            Questions?{' '}
            <span className="text-[var(--accent-blue)]">Look here</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[var(--gray-100)] rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[var(--gray-200)] transition-colors"
                >
                  <span className="font-semibold text-[var(--primary-blue)] pr-4">
                    {faq.question}
                  </span>
                  <div className={`w-6 h-6 rounded-full bg-[var(--accent-blue)] text-white flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}>
                    <span className="text-sm font-bold">+</span>
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-[var(--gray-600)] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesFAQSection;

