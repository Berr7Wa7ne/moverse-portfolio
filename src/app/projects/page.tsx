import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import ProjectsHeroSection from '@/components/projects/ProjectsHeroSection';
import ProjectsShowcaseSection from '@/components/projects/ProjectsShowcaseSection';
import ProjectsQuoteSection from '@/components/projects/ProjectsQuoteSection';
import ProjectsNewsletterSection from '@/components/projects/ProjectsNewsletterSection';
import Footer from '@/components/layout/Footer';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <ProjectsHeroSection />
        <ProjectsShowcaseSection />
        <ProjectsQuoteSection />
        <ProjectsNewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
