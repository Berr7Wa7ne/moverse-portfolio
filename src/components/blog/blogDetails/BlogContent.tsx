"use client";

import React from "react";
import parse, { domToReact, DOMNode } from "html-react-parser";
import { Check } from "lucide-react";
import SocialShare from "@/components/ui/SocialShare";
import ServicesBanner from "@/components/ui/ServicesBanner";

type RelatedPost = {
  title: string;
  image: string;
  date: string;
  slug: string;
};

type BlogContentProps = {
  title: string;
  image: string;
  tags: string[];
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
  html: string;
  relatedPosts?: RelatedPost[];
};

const BlogContent: React.FC<BlogContentProps> = ({
  title,
  image,
  tags,
  author,
  authorImage,
  date,
  readTime,
  html,
  relatedPosts,
}) => {
  // Extract first two paragraphs
  const extractLeadParagraphs = (htmlContent: string) => {
    if (typeof window === "undefined") return { lead: "", second: "" };

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const paragraphs = tempDiv.querySelectorAll("p");

    const lead = paragraphs[0]?.textContent || "";
    const second = paragraphs[1]?.textContent || "";

    return { lead, second };
  };

  const { lead, second } = extractLeadParagraphs(html);
  const firstLetter = lead ? lead.charAt(0).toUpperCase() : "";

  // Remove first two paragraphs
  const getRemainingContent = (htmlContent: string) => {
    if (typeof window === "undefined") return htmlContent;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const paragraphs = tempDiv.querySelectorAll("p");

    if (paragraphs.length > 2) {
      paragraphs[0]?.remove();
      paragraphs[1]?.remove();
    }

    return tempDiv.innerHTML;
  };

  const remainingHtml = getRemainingContent(html);

  return (
    <>
      <style jsx global>{`
        .blog-content-wrapper {
          color: #4b5563;
          line-height: 1.8;
        }
        .blog-content-wrapper h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--primary-blue);
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.3;
        }
        .blog-content-wrapper h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-blue);
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .blog-content-wrapper p {
          margin-bottom: 1.25rem;
          color: #6b7280;
          font-size: 1rem;
          line-height: 1.8;
        }
        .blog-content-wrapper ul {
          margin: 1.5rem 0;
          padding-left: 0;
          list-style: none;
        }
        .blog-content-wrapper strong {
          font-weight: 600;
          color: var(--primary-blue);
        }
      `}</style>

      {/* Hero image */}
      <section className="pt-10 pb-6 bg-white">
        <div className="container">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={image}
              alt="featured"
              className="w-full h-64 lg:h-[600px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="pb-10 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[var(--accent-blue)] text-white px-3 py-2 rounded-full text-sm md:text-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--primary-blue)] leading-tight mb-2 mt-2">
              {title}
            </h1>
            <div className="flex items-center gap-4 justify-center mt-4 pt-4">
              <img
                src={authorImage}
                alt={author}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold text-[var(--primary-blue)]">
                  written by {author}
                </p>
                <p className="text-[var(--gray-600)] text-sm">
                  {date} | {readTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="pb-12 ">
        <div className="container">
          <div className=" bg-white p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left */}
              <div className="lg:col-span-3">
                <div className="relative flex gap-8 mb-12">
                  {/* Sticky Social */}
                  <div className="hidden lg:flex flex-col sticky top-24 h-fit">
                    <SocialShare title={title} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* First Paragraph with Dropcap */}
                    <div className="relative mb-8">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--accent-blue)] text-white flex items-center justify-center text-lg font-semibold">
                          {firstLetter}
                        </span>
                        <p className="text-[var(--gray-700)] text-base lg:text-lg leading-relaxed">
                          {lead}
                        </p>
                      </div>
                    </div>

                    {/* Second Paragraph */}
                    {second && (
                      <p className="text-[var(--gray-700)] text-base lg:text-lg leading-relaxed mb-6">
                        {second}
                      </p>
                    )}

                    {/* Mobile Share */}
                    <div className="lg:hidden mt-8 pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-4">
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                          Share
                        </p>
                        <div className="flex gap-3">
                          <SocialShare title={title} className="flex-row" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rest of Content */}
                <div className="blog-content-wrapper max-w-none">
                  <div className="mb-8">
				  {parse(remainingHtml, {
  replace: (domNode) => {
    // Custom bullet list
    if (domNode.type === "tag" && domNode.name === "li") {
      return (
        <li className="flex items-start gap-3 mb-3 text-gray-700">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent-blue)] flex items-center justify-center shadow-md">
            <Check className="w-4 h-4 text-white" />
          </span>
          <span>{domToReact(domNode.children as DOMNode[])}</span>
        </li>
      );
    }

    // ✅ Handle custom <callout> tag
    if (domNode.type === "tag" && domNode.name === "callout") {
      return (
        <>
          <div className="bg-[var(--primary-blue)] text-white rounded-xl p-6 mb-6 shadow-md">
            <p className="text-lg">Also Read —</p>
            <p className="font-semibold mt-2 text-lg leading-snug">
              {domToReact(domNode.children as DOMNode[])}
            </p>
          </div>
          
        </>
      );
    }
  },
})}

                  </div>
                </div>

                {/* Author Card */}
                <div className="bg-[var(--primary-blue)] rounded-xl border border-gray-200 p-5 flex items-start gap-4">
                  <img
                    src={authorImage}
                    alt={author}
                    className="w-25 h-20 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold">
                      {author}
                    </p>
                    <p className="text-white text-sm">Senior Editor</p>
                    <p className="text-white mt-2 text-sm leading-7">
                      {`"`}Great products are built at the intersection of user needs
                      and engineering excellence. We share lessons that help teams
                      ship faster with quality.{`"`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
			  <div className="space-y-6">
  {/* Categories */}
  <div className="p-6 rounded-2xl">
    <h3 className="text-base md:text-lg font-semibold text-[var(--primary-blue)] mb-4">
      Filter by categories
    </h3>
    <div className="flex flex-wrap gap-2">
      {[
        "Web Design",
        "Web Development",
        "UI/UX Design",
        "WordPress",
        "Technology",
        "Saas",
        "E-Commerce",
        "SEO",
        "Hosting",
        "Networking",
        "Template",
      ].map((category, index) => (
        <button
          key={index}
          className="bg-gray-50 font-semibold px-3 py-1 text-xs md:text-sm text-black hover:bg-[var(--accent-blue)] hover:text-white rounded-lg transition-colors border border-gray-200"
        >
          {category}
        </button>
      ))}
    </div>
  </div>

  {/* Table of Content */}
  <div className="p-6 rounded-2xl">
    <h3 className="text-base md:text-lg font-semibold text-[var(--primary-blue)] mb-4">
      Table of content
    </h3>
    <p className="text-[var(--gray-600)] text-sm">
      Key sections covered in this article to help you navigate quickly.
    </p>
  </div>

  {/* Quote Section with Image Background */}
<div className="relative rounded-2xl overflow-hidden min-h-[320px] flex items-end">
  {/* Background image */}
  <img
    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    alt="Get a quote background"
    className="absolute inset-0 w-full h-full object-cover"
  />
  {/* Overlay (optional dark tint for readability) */}
  <div className="absolute inset-0 bg-[var(--primary-blue)]/70" />
  {/* Content centered at bottom */}
  <div className="relative p-6 text-center w-full text-white">
    <h3 className="text-lg md:text-xl font-semibold mb-3">Get A Quote</h3>
    <p className="text-sm md:text-base text-gray-200 mb-4 max-w-sm mx-auto">
      Ready to start your project? Get a free quote today.
    </p>
    <a
      href="/contact"
      className="btn-primary bg-white text-[var(--primary-blue)] hover:bg-gray-100"
    >
      Get Quote
    </a>
  </div>
</div>
</div>

              </div>
            </div>
          </div>
        </div>
      </section>

	  <ServicesBanner />

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] text-center mb-12">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <article
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
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
    </>
  );
};

export default BlogContent;
