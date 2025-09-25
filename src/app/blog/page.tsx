import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import BlogHeroSection from '@/components/blog/BlogHeroSection';
import BlogShowcaseSection from '@/components/blog/BlogShowcaseSection';
import BlogNewsletterSection from '@/components/blog/BlogNewsletterSection';
import Footer from '@/components/layout/Footer';

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <BlogHeroSection />
        <BlogShowcaseSection />
        <BlogNewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
