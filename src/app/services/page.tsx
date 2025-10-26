import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import ServicesHeroSection from '@/components/services/ServicesHeroSection';
import ServicesGridSection from '@/components/services/ServicesGridSection';
import TrustSection from '@/components/home/TrustSection';
import QuoteFormSection from '@/components/home/QuoteFormSection';
import FAQSection from '@/components/home/FAQSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import Footer from '@/components/layout/Footer';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <ServicesHeroSection />
        <ServicesGridSection />
        <TrustSection />
        <QuoteFormSection />
        <FAQSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}

