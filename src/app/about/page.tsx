import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import AboutHeroSection from '@/components/about/AboutHeroSection';
import AboutIntroSection from '@/components/about/AboutIntroSection';
import AboutProcessSection from '@/components/about/AboutProcessSection';
import AboutTrustSection from '@/components/about/AboutTrustSection';
import AboutQuoteSection from '@/components/about/AboutQuoteSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import TeamSection from '@/components/home/TeamSection';
import BlogSection from '@/components/home/BlogSection';
import AboutFAQSection from '@/components/about/AboutFAQSection';
import AboutNewsletterSection from '@/components/about/AboutNewsletterSection';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <AboutHeroSection />
        <AboutIntroSection />
        <AboutProcessSection />
        <AboutTrustSection />
        <AboutQuoteSection />
        <TestimonialsSection />
        <TeamSection />
        <BlogSection />
        <AboutFAQSection />
        <AboutNewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
