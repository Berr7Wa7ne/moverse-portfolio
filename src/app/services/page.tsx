import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import ServicesHeroSection from '@/components/services/ServicesHeroSection';
import ServicesGridSection from '@/components/services/ServicesGridSection';
import ServicesTrustSection from '@/components/services/ServicesTrustSection';
import ServicesQuoteSection from '@/components/services/ServicesQuoteSection';
import ServicesFAQSection from '@/components/services/ServicesFAQSection';
import ServicesNewsletterSection from '@/components/services/ServicesNewsletterSection';
import Footer from '@/components/layout/Footer';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <ServicesHeroSection />
        <ServicesGridSection />
        <ServicesTrustSection />
        <ServicesQuoteSection />
        <ServicesFAQSection />
        <ServicesNewsletterSection />
      </main>
      <Footer />
    </div>
  );
}

