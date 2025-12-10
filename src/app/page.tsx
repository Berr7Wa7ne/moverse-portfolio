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
import SplashScreenWrapper from '@/components/ui/SplashScreenWrapper';
import ScrollToSectionClient from '@/components/util/ScrollToSectionClient';

export default function Home() {
  return (
    <SplashScreenWrapper>
      <div className="min-h-screen relative overflow-x-hidden">
        <div className="fixed top-0 right-0 bottom-0 w-0.5 bg-red-500 z-50"></div>
        <TopBar />
        <Header />
        <main>
          <ScrollToSectionClient />
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
    </SplashScreenWrapper>
  );
}
