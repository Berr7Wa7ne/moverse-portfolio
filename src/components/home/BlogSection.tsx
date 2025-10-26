import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchBlogPostsFromCMS } from '@/lib/cms/sanity';
import { listBlogPosts } from '@/lib/content/blogs';
import ScrollReveal from '../ui/ScrollReveal';

type BlogPost = {
  title: string;
  image: string;
  category: string;
  date: string;
  slug: string;
};

async function getBlogPosts(): Promise<BlogPost[]> {
  const useCMS = process.env.USE_CMS === 'true';
  
  if (useCMS) {
    const cmsPosts: any[] = await fetchBlogPostsFromCMS();
    console.log('[blog section] Source: Sanity CMS', { count: cmsPosts?.length });
    return (cmsPosts || [])
      .slice(0, 3) // Get only 3 posts
      .map((p) => ({
        title: p.title || '',
        image: p.image || '/next.svg',
        category: p.category || 'Blog',
        date: formatDate(p.date),
        slug: p.slug || '',
      }))
      .filter((p) => p.slug);
  }
  
  const staticPosts = listBlogPosts();
  console.log('[blog section] Source: local static content', { count: staticPosts?.length });
  return staticPosts.slice(0, 3).map((p: any) => ({
    title: p.title,
    image: p.image,
    category: p.category,
    date: p.date,
    slug: p.slug,
  }));
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

const BlogSection = async () => {
  const blogPosts = await getBlogPosts();

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <ScrollReveal>
        <div className="text-center mb-16">
        <p className="text-[16px] text-[var(--gray-600)] tracking-wider flex items-center justify-center gap-3">
            <span className="block w-20 h-[2px] bg-gray-500"></span>
            News and Blogs
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mt-4">
            Our Latest{' '}
            <span className="text-[var(--accent-blue)]">News & Blogs</span>
          </h2>
        </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover cursor-pointer group">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover hover-scale"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[var(--accent-blue)] text-white px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[var(--primary-blue)] group-hover:text-[var(--accent-blue)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--gray-600)]">
                    {post.date}
                  </p>
                </div>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="interactive-button text-[var(--accent-blue)] hover:text-[#2952cc] font-medium"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
