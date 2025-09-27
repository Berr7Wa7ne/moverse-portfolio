import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import AboutHeroSection from '@/components/about/AboutHeroSection';
import AboutIntroSection from '@/components/about/AboutIntroSection';
import AboutProcessSection from '@/components/about/AboutProcessSection';
import AboutTrustSection from '@/components/about/AboutTrustSection';
import AboutQuoteSection from '@/components/about/AboutQuoteSection';
import AboutTestimonialsSection from '@/components/about/AboutTestimonialsSection';
import AboutTeamSection from '@/components/about/AboutTeamSection';
import AboutBlogsSection from '@/components/about/AboutBlogsSection';
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
        <AboutTestimonialsSection />
        <AboutTeamSection />
        <AboutBlogsSection />
        <AboutFAQSection />
        <AboutNewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
