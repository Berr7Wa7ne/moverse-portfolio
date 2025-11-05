import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import ProjectsHeroSection from '@/components/projects/ProjectsHeroSection';
import ProjectsShowcaseSection from '@/components/projects/ProjectsShowcaseSection';
import QuoteFormSection from '@/components/home/QuoteFormSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import Footer from '@/components/layout/Footer';
import ScrollToSectionClient from '@/components/util/ScrollToSectionClient';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <ScrollToSectionClient />
        <ProjectsHeroSection />
        <ProjectsShowcaseSection />
        <QuoteFormSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
