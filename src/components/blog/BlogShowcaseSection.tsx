'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ServicesBanner from '../ui/ServicesBanner';
import { fetchBlogPostsFromCMS } from "@/lib/cms/sanity";
import { listBlogPosts } from '@/lib/content/blogs';

const BlogShowcaseSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [posts, setPosts] = useState<any[]>([]);

  const filters = ['All', 'UI/UX', 'Development', 'Marketing'];

  useEffect(() => {
    const load = async () => {
      const useCMS = process.env.NEXT_PUBLIC_USE_CMS === 'true';
  
      if (useCMS) {
        try {
          console.log('[blog showcase] Attempting to load from Sanity CMS...');
  
          const data = await fetchBlogPostsFromCMS();
          const cms = Array.isArray(data) ? data : [];
  
          if (cms.length > 0) {
            console.log('[blog showcase] Source: Sanity CMS', { count: cms.length });
            setPosts(
              cms.map((p: any, i: number) => ({
                id: i + 1,
                title: p.title || '',
                category: p.category || 'Blog',
                date: (p.date || '').slice(0, 10),
                author: p.author || 'Author',
                authorImage: p.authorImage || '/next.svg',
                image: p.image || '/next.svg',
                description: p.description || '',
                featured: i === 0,
                slug: p.slug || '',
              }))
            );
            return;
          }
        } catch (error) {
          console.error('[blog showcase] CMS fetch failed:', error);
        }
      }
  
      // Fallback to static posts
      console.log('[blog showcase] Source: local static content');
      const staticPosts = listBlogPosts();
      setPosts(staticPosts);
    };
  
    load();
  }, []);

  const filteredPosts =
    activeFilter === 'All'
      ? posts
      : posts.filter((post) => post.category === activeFilter);

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container">
          <div className="space-y-4">
            <p className="text-[16px] text-[var(--gray-600)] tracking-wider flex items-center gap-3">
              <span className="block w-20 h-[2px] bg-gray-500"></span>
              News and Blogs
            </p>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-16 gap-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight">
                Our Latest{' '}
                <span className="text-[var(--accent-blue)]">
                  News & Blogs
                </span>
              </h2>
              {/* Filter Buttons */}
              <div className="flex gap-2 flex-wrap">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeFilter === filter
                        ? 'bg-[var(--accent-blue)] text-white'
                        : 'bg-[var(--gray-200)] text-[var(--gray-600)] hover:bg-[var(--gray-300)]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="space-y-8 mb-12">
            {/* Featured Post (Large Rectangle) */}
            {filteredPosts.length > 0 && (
              <Link href={`/blog/${filteredPosts[0].slug}`} className="block">
                <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[var(--gray-200)]">
                  <div className="relative overflow-hidden">
                    <img
                      src={filteredPosts[0].image}
                      alt={filteredPosts[0].title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    {/* Text Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-end justify-center">
                      <div className="p-8 text-white text-center w-full">
                        <div className="flex items-center justify-center gap-4 text-lg text-gray-300 mb-2">
                          <span>{filteredPosts[0].date}</span>
                          <span className="text-white">•</span>
                          <span className="text-white px-3 py-1 rounded-full text-lg">
                            {filteredPosts[0].category}
                          </span>
                        </div>

                        <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                          {filteredPosts[0].title}
                        </h3>

                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={filteredPosts[0].authorImage}
                            alt={filteredPosts[0].author}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                          <p className="font-medium text-white">
                            {filteredPosts[0].author}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* 2x2 Grid of Smaller Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.slice(1, 5).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                  <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[var(--gray-200)] aspect-square">
                    <div className="relative overflow-hidden h-full">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Text Overlay */}
                      <div className="absolute inset-0 bg-black/40 flex items-end justify-center">
                        <div className="p-6 text-white text-center w-full">
                          <div className="flex items-center justify-center gap-3 text-lg text-gray-300 mb-2">
                            <span>{post.date}</span>
                            <span className="text-white">•</span>
                            <span className="text-white px-2 py-1 rounded-full text-sm">
                              {post.category}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-white leading-tight mb-3">
                            {post.title}
                          </h3>

                          <div className="flex flex-col items-center gap-2">
                            <img
                              src={post.authorImage}
                              alt={post.author}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <p className="text-lg font-medium text-white">
                              {post.author}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* View More Button */}
          <div className="text-center">
            <Link href="/blog/all" className="btn-primary">
              View More
            </Link>
          </div>
        </div>
      </section>

      <ServicesBanner />
    </>
  );
};

export default BlogShowcaseSection;