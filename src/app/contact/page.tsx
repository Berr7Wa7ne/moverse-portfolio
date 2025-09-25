import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import ContactHeroSection from '@/components/contact/ContactHeroSection';
import ContactFormSection from '@/components/contact/ContactFormSection';
import ContactMapSection from '@/components/contact/ContactMapSection';
import ContactNewsletterSection from '@/components/contact/ContactNewsletterSection';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <ContactHeroSection />
        <ContactFormSection />
        <ContactMapSection />
        <ContactNewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
