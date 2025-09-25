import React from 'react';
import Link from 'next/link';

const BlogSection: React.FC = () => {
  const blogPosts = [
    {
      title: 'The Future of Web Development: Trends to Watch',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Web Development',
      date: 'December 15, 2023'
    },
    {
      title: 'Building Successful Remote Teams in Tech',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Business',
      date: 'December 10, 2023'
    },
    {
      title: 'Mobile-First Design: Why It Matters in 2024',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Design',
      date: 'December 5, 2023'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">Our Blog</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mt-4">
            Our Latest{' '}
            <span className="text-[var(--accent-blue)]">News & Blogs</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
                  href="/blog" 
                  className="inline-flex items-center text-[var(--accent-blue)] hover:text-[#2952cc] font-medium transition-colors"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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
