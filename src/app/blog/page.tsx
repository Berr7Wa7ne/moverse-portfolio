import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import BlogHeroSection from '@/components/blog/BlogHeroSection';
import BlogShowcaseSection from '@/components/blog/BlogShowcaseSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-dynamic';

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <BlogHeroSection />
        <BlogShowcaseSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
