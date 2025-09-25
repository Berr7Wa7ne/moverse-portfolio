import React from 'react';
import Link from 'next/link';

const AboutBlogsSection: React.FC = () => {
  const blogPosts = [
    {
      title: 'The Future of Web Development: Trends to Watch',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Explore the latest trends in web development that will shape the industry in 2025 and beyond.'
    },
    {
      title: 'The Role of AI in Cloud Computing and Automation',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Discover how artificial intelligence is revolutionizing cloud computing and automation processes.'
    },
    {
      title: 'The Rise of Super Apps: What it Means for Business and Consumers',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      description: 'Understand how super apps are transforming the digital landscape and business models.'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">Our Blogs</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight mt-4">
            Our Latest{' '}
            <span className="text-[var(--accent-blue)]">News & Blogs</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-[var(--gray-200)]">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-[var(--primary-blue)] group-hover:text-[var(--accent-blue)] transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-[var(--gray-600)] text-sm leading-relaxed">
                  {post.description}
                </p>
                
                <Link 
                  href="/blog" 
                  className="inline-flex items-center text-[var(--accent-blue)] hover:text-[#2952cc] font-medium transition-colors text-sm"
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

export default AboutBlogsSection;
