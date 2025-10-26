import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import AboutHeroSection from '@/components/about/AboutHeroSection';
import TransformingIdeasSection from '@/components/home/TransformingIdeasSection';
import WorkProcessSection from '@/components/home/WorkProcessSection';
import TrustSection from '@/components/home/TrustSection';
import QuoteFormSection from '@/components/home/QuoteFormSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import TeamSection from '@/components/home/TeamSection';
import BlogSection from '@/components/home/BlogSection';
import FAQSection from '@/components/home/FAQSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <AboutHeroSection />
        <TransformingIdeasSection />
        <WorkProcessSection />
        <TrustSection />
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
