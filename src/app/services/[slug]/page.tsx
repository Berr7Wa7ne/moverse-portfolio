"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import ServicesBanner from '@/components/ui/ServicesBanner';
import ServiceHero from '@/components/services/serviceDetails/ServiceHero';
import ServiceAbout from '@/components/services/serviceDetails/ServiceAbout';
import ServiceFeatures from '@/components/services/serviceDetails/ServiceFeatures';
import ServiceBenefits from '@/components/services/serviceDetails/ServiceBenefits';
import NewsletterCompact from '@/components/services/serviceDetails/NewsletterCompact';
import ServicesDetailsTestimony from '@/components/services/serviceDetails/ServicesDetailsTestimony';
import QuoteFormSection from '@/components/home/QuoteFormSection';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ServiceDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;

  // Service data - in a real app, this would come from an API or CMS
  const services = {
    'website-development': {
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      title: 'Website Development',
      description:
        'We create stunning, responsive websites that deliver exceptional user experiences and drive business growth.',
      longDescription:
        'Our website development services combine cutting-edge technology with user-centered design to create digital experiences that captivate your audience and achieve your business objectives.',
      extraDescription:
        'From concept to launch, we ensure every website we build is optimized for performance, accessibility, and search engines.',
      bullets: [
        'Responsive Design',
        'SEO Optimization',
        'Fast Loading Speed',
        'Mobile-First Approach',
        'Cross-Browser Compatibility',
        'Content Management System',
      ],
      image1:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      image2:
        'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      expertiseTitle: 'Our Expertise In Website Development',
      expertiseDescription:
        'We bring together modern engineering, thoughtful UX, and best practices to launch fast, accessible, and SEO-ready websites that scale with your business.',
      expertiseItems: [
        { title: 'Responsive Architecture', description: 'Fluid layouts and adaptive components ensure a consistent experience across mobile, tablet, and desktop.' },
        { title: 'SEO Foundations', description: 'Semantic HTML, structured metadata, and best-in-class performance to improve discoverability.' },
        { title: 'Performance Optimization', description: 'Code splitting, image optimization, and caching for sub-second page loads.' },
        { title: 'Accessibility (A11y)', description: 'Keyboard navigation, color contrast, and ARIA best practices for inclusive experiences.' },
        { title: 'CMS Integration', description: 'Flexible content models and editors your team loves, powered by headless or traditional CMS.' },
        { title: 'Cross‑Browser QA', description: 'Thorough testing to ensure reliability across Chrome, Safari, Firefox, and Edge.' },
      ],
      benefits: [
        'Increased Online Visibility',
        'Better User Engagement',
        'Higher Conversion Rates',
        'Professional Brand Image',
        'Scalable Solutions',
        '24/7 Technical Support',
      ],
      benefitsTitle: 'Service benefits:',
      benefitsIntro:
        'Our approach is designed to maximize impact and reduce risk. From performance to accessibility, we prioritize the fundamentals that help your product grow with confidence.',
      benefitsItems: [
        'Improved search visibility and organic traffic through technical SEO and performance best practices.',
        'Faster time‑to‑market with reusable components and a scalable architecture.',
        'Higher engagement and conversions thanks to thoughtful UX and clear content hierarchy.',
        'Reduced maintenance costs with clean code, documentation, and CI/CD automation.',
      ],
    },
    'ui-ux-design': {
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      title: 'UI/UX Design',
      description:
        'We craft intuitive and beautiful user interfaces that provide seamless experiences across all devices.',
      longDescription:
        'Our UI/UX design services focus on creating user-centered digital experiences that not only look great but also function flawlessly.',
      extraDescription:
        'We combine research, strategy, and creativity to design interfaces that users love and businesses benefit from.',
      bullets: [
        'User Research',
        'Wireframing & Prototyping',
        'Visual Design',
        'Usability Testing',
        'Design Systems',
        'Accessibility Compliance',
      ],
      image1:
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      image2:
        'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      expertiseTitle: 'Our Expertise In UI/UX Design',
      expertiseDescription:
        'We translate product goals into clear, intuitive experiences—grounded in research, validated with prototypes, and delivered with a scalable design system.',
      expertiseItems: [
        { title: 'Research & Personas', description: 'Interviews, surveys, and user personas to align the product with audience needs.' },
        { title: 'Information Architecture', description: 'Clear navigation and content structure that reduces friction and confusion.' },
        { title: 'Wireframes & Prototypes', description: 'Rapid iterations to validate flows and interaction patterns before development.' },
        { title: 'Visual Design', description: 'Brand-aligned UI with purposeful typography, color, and spacing.' },
        { title: 'Design Systems', description: 'Reusable components and tokens for consistent, efficient product development.' },
        { title: 'Usability Testing', description: 'Evidence-based improvements using task-based and A/B testing.' },
      ],
      benefits: [
        'Improved User Satisfaction',
        'Reduced Development Time',
        'Higher User Retention',
        'Better Conversion Rates',
        'Consistent Brand Experience',
        'Reduced Support Costs',
      ],
      benefitsTitle: 'Service benefits:',
      benefitsIntro:
        'Design done right compounds value over time. By aligning business goals with user needs, we help teams ship products people actually love to use.',
      benefitsItems: [
        'Clearer product direction through research-driven decisions and measurable outcomes.',
        'Better dev velocity with design systems that promote consistency and reuse.',
        'Reduced churn by removing friction and optimizing key user journeys.',
        'Stronger brand trust with accessible, inclusive experiences.',
      ],
    },
    'application-development': {
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      title: 'Application Development',
      description:
        'We build custom applications that solve complex business problems and streamline operations.',
      longDescription:
        'Our application development services cover everything from mobile apps to enterprise software solutions.',
      extraDescription:
        'We use the latest technologies and best practices to create applications that are secure, scalable, and maintainable.',
      bullets: [
        'Requirements Analysis',
        'Architecture Design',
        'Development',
        'Testing',
        'Deployment',
        'Maintenance',
      ],
      image1:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      image2:
        'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      expertiseTitle: 'Our Expertise In Application Development',
      expertiseDescription:
        'We craft scalable, secure applications with modern tooling and rigorous QA to support growth, integrations, and long-term maintainability.',
      expertiseItems: [
        { title: 'Requirements Analysis', description: 'Align stakeholders and scope with detailed acceptance criteria and success metrics.' },
        { title: 'Scalable Architecture', description: 'Modular services and clean boundaries that evolve with product complexity.' },
        { title: 'APIs & Integrations', description: 'REST/GraphQL and third‑party integrations designed for reliability and performance.' },
        { title: 'Security & Auth', description: 'OWASP-guided practices, role‑based access, and secure data handling.' },
        { title: 'CI/CD & Testing', description: 'Automated tests and pipelines for confidence and rapid iteration.' },
        { title: 'Cloud Deployment', description: 'Containerized workloads with monitoring and alerting in the cloud.' },
      ],
      benefits: [
        'Streamlined Operations',
        'Improved Efficiency',
        'Better Data Management',
        'Enhanced Security',
        'Scalable Solutions',
        'Ongoing Support',
      ],
      benefitsTitle: 'Service benefits:',
      benefitsIntro:
        'We deliver robust applications that are secure, scalable, and maintainable—so your team can focus on features, not firefighting.',
      benefitsItems: [
        'Greater reliability and uptime with defensive coding and monitoring in place.',
        'Lower long-term costs via modular architectures and automated testing.',
        'Improved security posture with best practices for auth, data protection, and audits.',
        'Easier integrations and future growth with stable APIs and documentation.',
      ],
    },
  };

  const service = services[slug as keyof typeof services];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--primary-blue)] mb-4">
            Service Not Found
          </h1>
          <p className="text-[var(--gray-600)] mb-8">
            The service you're looking for doesn't exist.
          </p>
          <a href="/services" className="btn-primary">
            Back to Services
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <TopBar />
      <Header />
      <ServiceHero
        title="Services Details"
        breadcrumb="Home / Services / Services Details"
      />
      <ServicesBanner />
      <ServiceAbout
        image={service.image}
        title={service.title}
        longDescription={service.longDescription}
        extraDescription={service.extraDescription}
        bullets={service.bullets}
        image1={service.image1}
        image2={service.image2}
      />
      <ServiceFeatures
        title={service.expertiseTitle}
        description={service.expertiseDescription}
        items={service.expertiseItems}
      />
      <ServiceBenefits title={service.benefitsTitle} intro={service.benefitsIntro} items={service.benefitsItems} />
      <ServicesDetailsTestimony />
      <ServicesBanner />
      <QuoteFormSection />
      <NewsletterCompact />
      <Footer />
    </>
  );
};

export default ServiceDetailPage;
