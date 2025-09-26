import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import TransformingIdeasSection from '@/components/home/TransformingIdeasSection';
import ServicesSection from '@/components/home/ServicesSection';
import WorkProcessSection from '@/components/home/WorkProcessSection';
import TrustSection from '@/components/home/TrustSection';
import ShowcaseSection from '@/components/home/ShowcaseSection';
import QuoteFormSection from '@/components/home/QuoteFormSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import TeamSection from '@/components/home/TeamSection';
import BlogSection from '@/components/home/BlogSection';
import FAQSection from '@/components/home/FAQSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <HeroSection />
        <TransformingIdeasSection />
        <ServicesSection />
        <WorkProcessSection />
        <TrustSection />
        <ShowcaseSection />
        <QuoteFormSection />
        <TestimonialsSection />
        <TeamSection />
        <BlogSection />
        <FAQSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
