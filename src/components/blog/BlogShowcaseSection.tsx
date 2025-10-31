'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ServicesBanner from '../ui/ServicesBanner';
import Pagination from '../ui/Pagination';
import SkeletonLoader from '../ui/SkeletonLoader';
import ScrollReveal from '../ui/ScrollReveal';
import { fetchBlogPostsFromCMS } from "@/lib/cms/sanity";
import { listBlogPosts } from '@/lib/content/blogs';

const POSTS_PER_PAGE = 5; // 1 featured + 4 in grid

const BlogShowcaseSection: React.FC = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [activeFilter, setActiveFilter] = useState(categoryParam || 'All');
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const filters = ['All', 'UI/UX', 'Development', 'Marketing'];

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const useCMS = process.env.NEXT_PUBLIC_USE_CMS === 'true';
  
      try {
        if (useCMS) {
          console.log('[blog showcase] Attempting to load from Sanity CMS...');
  
          const data = await fetchBlogPostsFromCMS();
          const cms = Array.isArray(data) ? data : [];
  
          if (cms.length > 0) {
            console.log('[blog showcase] Source: Sanity CMS', { count: cms.length });
            const normalized = cms.map((p: any) => {
              const dateRaw = p.date || p._createdAt || '';
              const dateStr = typeof dateRaw === 'string' ? dateRaw : '';
              return {
                id: (p.slug?.current || p.slug || p._id || Math.random().toString(36).slice(2)) as string,
                title: p.title || '',
                category: p.category || 'Blog',
                date: dateStr.slice(0, 10),
                sortDate: new Date(dateStr).getTime() || 0,
                author: p.author || 'Author',
                authorImage: p.authorImage || '/next.svg',
                image: p.image || '/next.svg',
                description: p.description || '',
                slug: (p.slug?.current || p.slug || '') as string,
              };
            });
            const sorted = normalized.sort((a: any, b: any) => b.sortDate - a.sortDate);
            // Deduplicate by slug/title to avoid duplicates with different dates/categories
            const seen = new Set<string>();
            const deduped = sorted.filter((p: any) => {
              const key = String(p.slug || p.title || p.id);
              if (seen.has(key)) return false;
              seen.add(key);
              return true;
            });
            // ensure featured is always first item
            const finalPosts = deduped.map((p: any, i: number) => ({ ...p, featured: i === 0 }));
            if (finalPosts.length > 0) {
              setPosts(finalPosts);
              setIsLoading(false);
              return;
            }
          }
        }
    
        // Fallback to static posts
        console.log('[blog showcase] Source: local static content');
        const staticPosts = listBlogPosts();
        setPosts(staticPosts);
      } catch (error) {
        console.error('[blog showcase] Error loading posts:', error);
        // Fallback to static posts on error
        const staticPosts = listBlogPosts();
        setPosts(staticPosts);
      } finally {
        setIsLoading(false);
      }
    };
  
    load();
  }, []);

  // Set activeFilter from URL parameter
  useEffect(() => {
    if (categoryParam) {
      setActiveFilter(categoryParam);
    }
  }, [categoryParam]);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const filteredPosts =
    activeFilter === 'All'
      ? posts
      : posts.filter((post) => post.category === activeFilter);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container">
          <ScrollReveal>
          <div className="space-y-4">
            <p className="text-[16px] text-[var(--gray-600)] tracking-wider flex items-center gap-3">
              <span className="block w-20 h-[2px] bg-gray-500"></span>
              News and Blogs
            </p>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-16 gap-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mb-7">
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
          </ScrollReveal>

          {/* Loading State */}
          {isLoading ? (
            <div className="space-y-8">
              <SkeletonLoader variant="card" count={1} className="h-64" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SkeletonLoader variant="card" count={4} />
              </div>
            </div>
          ) : (
          /* Blog Posts Grid */
          <div className="space-y-8">
            {/* Featured Post (Large Rectangle) */}
            {currentPosts.length > 0 && (
              <Link href={`/blog/${currentPosts[0].slug}`} className="block">
                <article className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-[var(--gray-200)]">
                  <div className="relative overflow-hidden">
                    <img
                      src={currentPosts[0].image}
                      alt={currentPosts[0].title}
                      className="w-full h-64 lg:h-full object-cover hover-scale"
                    />
                    {/* Text Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-end justify-center">
                      <div className="p-8 text-white text-center w-full">
                        <div className="flex items-center justify-center gap-4 text-lg text-gray-300 mb-2">
                          <span>{currentPosts[0].date}</span>
                          <span className="text-white">•</span>
                          <span className="text-white px-3 py-1 rounded-full text-lg">
                            {currentPosts[0].category}
                          </span>
                        </div>

                        <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                          {currentPosts[0].title}
                        </h3>

                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={currentPosts[0].authorImage}
                            alt={currentPosts[0].author}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                          <p className="font-medium text-white">
                            {currentPosts[0].author}
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
              {currentPosts.slice(1, 5).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                  <article className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-[var(--gray-200)] aspect-square">
                    <div className="relative overflow-hidden h-full">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover-scale"
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
          )}

          {/* Pagination */}
          {!isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          )}
        </div>
      </section>

      <ServicesBanner />
    </>
  );
};

export default BlogShowcaseSection;