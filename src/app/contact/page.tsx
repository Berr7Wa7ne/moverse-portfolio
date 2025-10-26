import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import ContactHeroSection from '@/components/contact/ContactHeroSection';
import ContactFormSection from '@/components/contact/ContactFormSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <ContactHeroSection />
        <ContactFormSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
