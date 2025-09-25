'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ServicesBanner from '../ui/ServicesBanner';

const BlogShowcaseSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'UI/UX', 'Development', 'Marketing'];

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Web Development: Trends To Watch in 2025',
      category: 'Marketing',
      date: 'May 21, 2022',
      author: 'Rakhael Muhammad',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Explore the latest trends in web development that will shape the industry in 2025 and beyond.',
      featured: true
    },
    {
      id: 2,
      title: 'Best Practices For Designing a User-Friendly Mobile App',
      category: 'UI/UX',
      date: 'June 21, 2022',
      author: 'Yahya Man',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Learn the essential principles for creating intuitive and engaging mobile app interfaces.',
      featured: false
    },
    {
      id: 3,
      title: '3 Tips to Increase Engagement on Social Media',
      category: 'Marketing',
      date: 'June 21, 2022',
      author: 'Yahya Man',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Discover proven strategies to boost your social media engagement and grow your audience.',
      featured: false
    },
    {
      id: 4,
      title: '3 Tips to Increase Engagement on Social Media',
      category: 'Marketing',
      date: 'June 21, 2022',
      author: 'Yahya Man',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Learn effective techniques to enhance your social media presence and drive meaningful interactions.',
      featured: false
    },
    {
      id: 5,
      title: 'The Rise of Super Apps: What It Means for Business and Consumers',
      category: 'Development',
      date: 'June 21, 2022',
      author: 'Yahya Man',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Understand how super apps are revolutionizing the digital landscape and what this means for businesses.',
      featured: false
    }
  ];

  const filteredPosts = activeFilter === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-16 gap-8">
            <div className="space-y-4">
              <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">News & Blogs</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight">
                Our Latest{' '}
                <span className="text-[var(--accent-blue)]">News & Blogs</span>
              </h2>
            </div>
            
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

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Featured Post (Large) */}
            {filteredPosts.length > 0 && (
              <div className="lg:col-span-2">
                <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[var(--gray-200)]">
                  <div className="relative overflow-hidden">
                    <img
                      src={filteredPosts[0].image}
                      alt={filteredPosts[0].title}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                  </div>
                  
                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-[var(--gray-600)]">
                      <span>{filteredPosts[0].date}</span>
                      <span className="text-[var(--accent-blue)]">•</span>
                      <span className="bg-[var(--light-blue)] text-[var(--accent-blue)] px-3 py-1 rounded-full">
                        {filteredPosts[0].category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl lg:text-2xl font-bold text-[var(--primary-blue)] leading-tight">
                      {filteredPosts[0].title}
                    </h3>
                    
                    <p className="text-[var(--gray-600)] leading-relaxed">
                      {filteredPosts[0].description}
                    </p>
                    
                    <div className="flex items-center gap-3 pt-4">
                      <img
                        src={filteredPosts[0].authorImage}
                        alt={filteredPosts[0].author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-[var(--primary-blue)]">
                          {filteredPosts[0].author}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {/* Smaller Posts */}
            <div className="space-y-8">
              {filteredPosts.slice(1, 5).map((post) => (
                <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[var(--gray-200)]">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-[var(--gray-600)]">
                      <span>{post.date}</span>
                      <span className="text-[var(--accent-blue)]">•</span>
                      <span className="bg-[var(--light-blue)] text-[var(--accent-blue)] px-2 py-1 rounded-full text-xs">
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-[var(--primary-blue)] leading-tight">
                      {post.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 pt-2">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-[var(--primary-blue)]">
                          {post.author}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
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
