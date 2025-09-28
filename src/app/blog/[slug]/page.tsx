'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ServicesBanner from '@/components/ui/ServicesBanner';

const BlogDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;

  // Blog post data - in a real app, this would come from an API or CMS
  const blogPosts = {
    'future-web-development-trends': {
      title: 'The Future of Web Development: Trends To Watch in 2025',
      category: 'Web Development',
      author: 'Rakhool Muhammad',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: 'May 21, 2024',
      readTime: '10 Min Read',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['Web Design', 'App Development', 'UX/UI Design'],
      content: `
        <p>Web development is constantly evolving, and 2025 promises to bring exciting new trends that will shape the future of digital experiences. As we move forward, developers and businesses need to stay ahead of these changes to remain competitive in the digital landscape.</p>
        
        <h2>Understanding the Importance of Scalable Web Solutions</h2>
        <p>In today's fast-paced digital world, scalability is no longer a luxury—it's a necessity. Modern web applications must be able to handle increasing loads, user demands, and data volumes without compromising performance. This is where scalable web solutions come into play, offering the flexibility and robustness needed to grow with your business.</p>
        
        <p>Scalable web solutions provide several key benefits:</p>
        <ul>
          <li>Improved performance under high traffic loads</li>
          <li>Cost-effective resource management</li>
          <li>Enhanced user experience across all devices</li>
          <li>Future-proof architecture that adapts to changing needs</li>
        </ul>
        
        <h2>Agile Collaboration Tips</h2>
        <p>Successful web development projects rely heavily on effective collaboration between designers, developers, and stakeholders. Agile methodologies have revolutionized how teams work together, but implementing them effectively requires careful planning and execution.</p>
        
        <p>Here are some proven tips for fostering better collaboration:</p>
        <ul>
          <li>Maintain regular communication through daily standups</li>
          <li>Use collaborative tools that everyone can access</li>
          <li>Establish clear roles and responsibilities</li>
          <li>Encourage open feedback and continuous improvement</li>
        </ul>
        
        <h2>Streamlining Design-to-Development Handoff</h2>
        <p>The transition from design to development is often where projects face the most challenges. A smooth handoff process ensures that the final product matches the original vision while maintaining technical feasibility.</p>
        
        <p>Key strategies for improving the handoff process include:</p>
        <ul>
          <li>Creating detailed design specifications</li>
          <li>Using design systems and component libraries</li>
          <li>Maintaining open communication between teams</li>
          <li>Conducting regular review sessions</li>
        </ul>
        
        <h2>Building Efficient Development Workflows</h2>
        <p>Efficient workflows are the backbone of successful web development projects. They help teams deliver high-quality products on time and within budget while maintaining code quality and team morale.</p>
        
        <p>Essential elements of efficient workflows include:</p>
        <ul>
          <li>Automated testing and deployment processes</li>
          <li>Version control and code review practices</li>
          <li>Continuous integration and delivery</li>
          <li>Regular performance monitoring and optimization</li>
        </ul>
        
        <h2>Tips for Cleaning Kitchen</h2>
        <p>While this might seem unrelated to web development, maintaining a clean and organized workspace—whether physical or digital—is crucial for productivity and creativity. A cluttered environment can lead to cluttered thinking, which ultimately affects the quality of your work.</p>
        
        <p>Apply the same principles to your development environment:</p>
        <ul>
          <li>Keep your code organized and well-documented</li>
          <li>Regularly clean up unused files and dependencies</li>
          <li>Maintain a clean and intuitive project structure</li>
          <li>Use tools that help automate routine tasks</li>
        </ul>
      `,
      relatedPosts: [
        {
          title: 'The Role of AI in Cloud Computing and Automation',
          image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          date: 'June 15, 2024',
          slug: 'ai-cloud-computing-automation'
        },
        {
          title: 'The Rise of Super Apps: What It Means for Business and Consumers',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          date: 'June 10, 2024',
          slug: 'rise-super-apps-business-consumers'
        }
      ]
    },
    'ai-cloud-computing-automation': {
      title: 'The Role of AI in Cloud Computing and Automation',
      category: 'Technology',
      author: 'Yahya Man',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: 'June 15, 2024',
      readTime: '8 Min Read',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['AI', 'Cloud Computing', 'Automation'],
      content: `
        <p>Artificial Intelligence is revolutionizing cloud computing and automation, creating new opportunities for businesses to optimize their operations and deliver better services to their customers.</p>
        
        <h2>Understanding AI in Cloud Computing</h2>
        <p>AI and cloud computing work together to create intelligent systems that can process vast amounts of data, learn from patterns, and make decisions in real-time. This combination is transforming how businesses operate and compete in the digital marketplace.</p>
        
        <h2>Automation Benefits</h2>
        <p>Automation powered by AI in cloud environments offers numerous benefits including reduced operational costs, improved efficiency, and enhanced scalability. Businesses can now automate complex processes that previously required human intervention.</p>
      `,
      relatedPosts: [
        {
          title: 'The Future of Web Development: Trends To Watch in 2025',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          date: 'May 21, 2024',
          slug: 'future-web-development-trends'
        }
      ]
    },
    'rise-super-apps-business-consumers': {
      title: 'The Rise of Super Apps: What It Means for Business and Consumers',
      category: 'Mobile Development',
      author: 'Yahya Man',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: 'June 10, 2024',
      readTime: '12 Min Read',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['Mobile Apps', 'Business Strategy', 'User Experience'],
      content: `
        <p>Super apps are changing the way we think about mobile applications, combining multiple services into a single platform that serves as a one-stop solution for users' daily needs.</p>
        
        <h2>What Are Super Apps?</h2>
        <p>Super apps are mobile applications that provide multiple services and functions, typically including messaging, payments, shopping, transportation, and more, all within a single platform.</p>
        
        <h2>Business Implications</h2>
        <p>For businesses, super apps represent both opportunities and challenges. They offer new ways to reach customers and provide integrated experiences, but they also require significant investment in technology and user experience design.</p>
      `,
      relatedPosts: [
        {
          title: 'The Future of Web Development: Trends To Watch in 2025',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          date: 'May 21, 2024',
          slug: 'future-web-development-trends'
        }
      ]
    }
  };

  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--primary-blue)] mb-4">Blog Post Not Found</h1>
          <p className="text-[var(--gray-600)] mb-8">The blog post you're looking for doesn't exist.</p>
          <a href="/blog" className="btn-primary">Back to Blog</a>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[var(--primary-blue)] py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              {post.category} • {post.date} • {post.readTime}
            </p>
          </div>
        </div>
      </section>

      <ServicesBanner />

      {/* Blog Content */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured Image */}
              <div className="mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 lg:h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[var(--accent-blue)] text-white px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-[var(--primary-blue)]">written by {post.author}</p>
                  <p className="text-[var(--gray-600)]">{post.date} | {post.readTime}</p>
                </div>
              </div>

              {/* Blog Content */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Filter by Categories */}
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-[var(--primary-blue)] mb-4">
                    Filter by categories
                  </h3>
                  <div className="space-y-2">
                    {['Web Design', 'Web Development', 'UI/UX Design', 'WordPress', 'Technology', 'Saas', 'E-Commerce', 'SEO', 'Hosting', 'Networking', 'Template'].map((category, index) => (
                      <button
                        key={index}
                        className="block w-full text-left px-3 py-2 text-sm text-[var(--gray-600)] hover:bg-[var(--accent-blue)] hover:text-white rounded-lg transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table of Contents */}
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-[var(--primary-blue)] mb-4">
                    Table of content
                  </h3>
                  <p className="text-[var(--gray-600)] text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>

                {/* Get A Quote */}
                <div className="bg-[var(--primary-blue)] p-6 rounded-2xl text-white text-center">
                  <h3 className="text-lg font-semibold mb-4">Get A Quote</h3>
                  <p className="text-sm text-gray-200 mb-4">
                    Ready to start your project? Get a free quote today.
                  </p>
                  <a href="/contact" className="btn-primary bg-white text-[var(--primary-blue)] hover:bg-gray-100">
                    Get Quote
                  </a>
                </div>

                {/* Digital Service */}
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-[var(--primary-blue)] mb-4">
                    Digital Service
                  </h3>
                  <p className="text-[var(--gray-600)] text-sm mb-4">
                    Explore our comprehensive digital services.
                  </p>
                  <a href="/services" className="btn-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] text-center mb-12">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {post.relatedPosts.map((relatedPost, index) => (
                <article key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[var(--primary-blue)] mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-[var(--gray-600)] text-sm mb-4">
                      {relatedPost.date}
                    </p>
                    <a 
                      href={`/blog/${relatedPost.slug}`}
                      className="text-[var(--accent-blue)] hover:text-[var(--primary-blue)] font-medium"
                    >
                      Read More →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-[var(--primary-blue)]">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your ideas to life with our expert development services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary bg-white text-[var(--primary-blue)] hover:bg-gray-100">
              Get Free Quote
            </a>
            <a href="/blog" className="btn-secondary border-white text-white hover:bg-white hover:text-[var(--primary-blue)]">
              Read More Blogs
            </a>
          </div>
        </div>
      </section>

      <ServicesBanner />
    </>
  );
};

export default BlogDetailPage;
