import React from 'react';
import { listServiceSlugs, getService } from '@/lib/content/services';
import ServicesBanner from '@/components/ui/ServicesBanner';
import ServiceHero from '@/components/services/serviceDetails/ServiceHero';
import ServiceAbout from '@/components/services/serviceDetails/ServiceAbout';
import ServiceFeatures from '@/components/services/serviceDetails/ServiceFeatures';
import ServiceBenefits from '@/components/services/serviceDetails/ServiceBenefits';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import QuoteFormSection from '@/components/home/QuoteFormSection';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/home/NewsletterSection';

export const revalidate = 3600;

type PageProps = { params: Promise<{ slug: string }> };

const ServiceDetailPage = async ({ params }: PageProps) => {
  const useParams = await params; // 👈 await params here
  const service = getService(useParams.slug);

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
      <TestimonialsSection />
      <ServicesBanner />
      <QuoteFormSection />
      <NewsletterSection />
      <Footer />
    </>
  );
};

export default ServiceDetailPage;

export async function generateStaticParams() {
  return listServiceSlugs().map((slug) => ({ slug }));
}
