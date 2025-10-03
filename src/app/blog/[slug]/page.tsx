'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ServicesBanner from '@/components/ui/ServicesBanner';
import BlogHero from '@/components/blog/blogDetails/BlogHero';
import BlogContent from '@/components/blog/blogDetails/BlogContent';
import QuoteFormSection from '@/components/home/QuoteFormSection';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/home/NewsletterSection';

const BlogDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;

  // Blog post data - in a real app, this would come from an API or CMS
  const blogPosts = {
    'future-web-development-trends': {
      title: 'The Future of Web Development: Trends To Watch in 2025',
      category: 'Web Development',
      author: 'Rakhool Muhammad',
      authorImage:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: 'May 21, 2024',
      readTime: '10 Min Read',
      image:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
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

        <!-- Side-by-side inline images -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="inline 1" class="w-full h-full object-cover rounded-xl shadow-md" />
          <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="inline 2" class="w-full h-full object-cover rounded-xl shadow-md" />
        </div>
        
        <h2>Streamlining Design-to-Development Handoff</h2>
        <p>The transition from design to development is often where projects face the most challenges. A smooth handoff process ensures that the final product matches the original vision while maintaining technical feasibility.</p>
        
        <p>Key strategies for improving the handoff process include:</p>
        <ul>
          <li>Creating detailed design specifications</li>
          <li>Using design systems and component libraries</li>
          <li>Maintaining open communication between teams</li>
          <li>Conducting regular review sessions</li>
        </ul>

        <callout>Creating and Managing Comprehensive Digital Strategies</callout>

        
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
          image:
            'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          date: 'June 15, 2024',
          slug: 'ai-cloud-computing-automation',
        },
        {
          title: 'The Rise of Super Apps: What It Means for Business and Consumers',
          image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          date: 'June 10, 2024',
          slug: 'rise-super-apps-business-consumers',
        },
      ],
    },
    // ... keep your other blog posts (ai-cloud-computing-automation, rise-super-apps-business-consumers) the same
  };

  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
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
    );
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
        date={post.date}
        readTime={post.readTime}
        html={post.content}
        relatedPosts={post.relatedPosts}
      />
      <ServicesBanner />
      <QuoteFormSection />
      <NewsletterSection />
      </main>
      <Footer />
    </>
  );
};

export default BlogDetailPage;
