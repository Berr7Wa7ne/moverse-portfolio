import React from 'react';
import { fetchBlogPostBySlugFromCMS, fetchBlogSlugsFromCMS, fetchBlogCategoriesFromCMS } from '@/lib/cms/sanity';
import { getBlog, listBlogSlugs, listBlogPosts } from '@/lib/content/blogs';
import ServicesBanner from '@/components/ui/ServicesBanner';
import BlogHero from '@/components/blog/blogDetails/BlogHero';
import BlogContent from '@/components/blog/blogDetails/BlogContent';
import QuoteFormSection from '@/components/home/QuoteFormSection';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/home/NewsletterSection';
import BlogSection from '@/components/home/BlogSection';

export const revalidate = 300;
export const dynamic = 'force-dynamic';

type PageProps = { params: Promise<{ slug: string }> };

const BlogDetailPage = async ({ params }: PageProps) => {
  const useParams = await params;
  const slug = useParams.slug;

  let post: any = null;
  const useCMS = process.env.NEXT_PUBLIC_USE_CMS === 'true';

  // Try CMS first if enabled
  if (useCMS) {
    try {
      const cms = await fetchBlogPostBySlugFromCMS(slug);
      if (cms) {
        console.log('[blog detail page] Source: Sanity CMS', { slug, found: true });
        post = {
          title: cms.title,
          category: cms.category || 'Blog',
          author: cms.author || 'Author',
          authorImage: cms.authorImage || '/next.svg',
          authorPosition: cms.authorPosition,
          authorQuote: cms.authorQuote,
          date: (cms.date || '').slice(0, 10),
          readTime: cms.readTime || '5 Min Read',
          image: cms.image || '/next.svg',
          tags: cms.tags || [],
          content: cms.content || '',
          relatedPosts: (cms.relatedPosts || []).map((rp: any) => ({
            title: rp.title || '',
            image: rp.image || '/next.svg',
            date: (rp.date || '').slice(0, 10),
            slug: rp.slug || '',
          })),
        };
      }
    } catch (error) {
      console.error('[blog detail page] CMS fetch failed:', error);
    }
  }

  // Fallback to static content
  if (!post) {
    console.log('[blog detail page] Source: local static content', { slug });
    post = getBlog(slug);
  }

  if (!post) {
    return (
      <>
        <TopBar />
        <Header />
        <main>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-[var(--primary-blue)] mb-4">
                Blog Post Not Found
              </h1>
              <p className="text-[var(--gray-600)] mb-8">
                The blog post you're looking for doesn't exist.
              </p>
              <a href="/blog" className="btn-primary">
                Back to Blog
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Fetch all categories for the sidebar
  let categories: string[] = [];
  if (useCMS) {
    try {
      categories = await fetchBlogCategoriesFromCMS();
      console.log('[blog detail page] Categories from CMS', { count: categories.length });
    } catch (error) {
      console.error('[blog detail page] Categories fetch failed:', error);
    }
  }
  
  // Fallback: get categories from static posts
  if (categories.length === 0) {
    const staticPosts = listBlogPosts();
    const categorySet = new Set<string>();
    staticPosts.forEach((p: any) => {
      if (p.category && typeof p.category === 'string') {
        categorySet.add(p.category);
      }
    });
    categories = Array.from(categorySet);
    console.log('[blog detail page] Categories from static content', { count: categories.length });
  }

  return (
    <>
      <TopBar />
      <Header />
      <main>
        <BlogHero title="Blog Details" breadcrumb="Home / Blogs / Blog Details" />
        <ServicesBanner />
        <BlogContent
          title={post.title}
          image={post.image}
          tags={post.tags}
          author={post.author}
          authorImage={post.authorImage}
          authorPosition={post.authorPosition}
          authorQuote={post.authorQuote}
          date={post.date}
          readTime={post.readTime}
          content={post.content}
          relatedPosts={post.relatedPosts}
          categories={categories}
        />
        <BlogSection />
        <ServicesBanner />
        <QuoteFormSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
};

export default BlogDetailPage;

export async function generateStaticParams() {
  const useCMS = process.env.NEXT_PUBLIC_USE_CMS === 'true';

  if (useCMS) {
    try {
      const slugs = await fetchBlogSlugsFromCMS();
      if (slugs.length > 0) {
        console.log('[generateStaticParams] Source: Sanity CMS', { count: slugs.length });
        return slugs.map((slug) => ({ slug }));
      }
    } catch (error) {
      console.error('[generateStaticParams] CMS fetch failed:', error);
    }
  }

  console.log('[generateStaticParams] Source: local static content');
  const staticSlugs = listBlogSlugs();
  return staticSlugs.map((slug) => ({ slug }));
}