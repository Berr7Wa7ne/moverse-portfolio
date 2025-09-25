import React from 'react';

const AboutPricingSection: React.FC = () => {
  const plans = [
    {
      name: 'Basic plan',
      price: '$10/mth',
      period: 'Billed annually',
      features: [
        'Up to 5 pages website',
        'Basic SEO optimization',
        'Mobile responsive design',
        'Email support',
        '3 months free hosting'
      ]
    },
    {
      name: 'Business plan',
      price: '$20/mth',
      period: 'Billed annually',
      features: [
        'Up to 15 pages website',
        'Advanced SEO optimization',
        'E-commerce functionality',
        'Priority support',
        '6 months free hosting',
        'Monthly maintenance',
        'Analytics dashboard'
      ],
      popular: true
    },
    {
      name: 'Enterprise plan',
      price: '$40/mth',
      period: 'Billed annually',
      features: [
        'Unlimited pages website',
        'Custom web application',
        'Advanced analytics',
        '24/7 dedicated support',
        '12 months free hosting',
        'Weekly maintenance',
        'Performance optimization',
        'Custom integrations'
      ]
    }
  ];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">Pricing Plan</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mt-4">
            Our{' '}
            <span className="text-[var(--accent-blue)]">Pricing Model</span>
          </h2>
          <p className="text-lg text-[var(--gray-600)] mt-6 max-w-3xl mx-auto">
            Simple, transparent pricing that grows with you. Try any plan free for 30 days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border ${
                plan.popular ? 'ring-2 ring-[var(--accent-blue)] transform scale-105 border-[var(--accent-blue)]' : 'border-[var(--gray-200)]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[var(--accent-blue)] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-[var(--primary-blue)] mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-[var(--accent-blue)]">
                    {plan.price}
                  </span>
                </div>
                <p className="text-[var(--gray-600)] text-sm mt-2">
                  {plan.period}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[var(--accent-blue)] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-[var(--gray-600)] text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                plan.popular
                  ? 'bg-[var(--accent-blue)] text-white hover:bg-[#2952cc]'
                  : 'bg-[var(--gray-100)] text-[var(--primary-blue)] hover:bg-[var(--accent-blue)] hover:text-white'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-br from-[var(--accent-blue)] to-purple-500 rounded-full opacity-10 -z-10"></div>
      <div className="absolute bottom-20 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400 to-[var(--accent-blue)] rounded-full opacity-10 -z-10"></div>
    </section>
  );
};

export default AboutPricingSection;
