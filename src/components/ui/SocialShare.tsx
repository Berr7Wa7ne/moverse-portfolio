"use client";

import React from "react";
import { Facebook, Twitter, Linkedin, Link2 } from "lucide-react";

type SocialShareProps = {
  url?: string;
  title?: string;
  className?: string;
};

const SocialShare: React.FC<SocialShareProps> = ({ url, title, className = "" }) => {
  const handleShare = (platform: string) => {
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const postTitle = title || '';
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(postTitle)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        break;
      case 'copy':
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          navigator.clipboard.writeText(currentUrl);
          alert('Link copied to clipboard!');
        }
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Share</p>
      <button
        onClick={() => handleShare('facebook')}
        className="w-10 h-10 rounded-full bg-[#1877F2] hover:bg-[#1565C0] text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
        aria-label="Share on Facebook"
      >
        <Facebook size={18} />
      </button>
      <button
        onClick={() => handleShare('twitter')}
        className="w-10 h-10 rounded-full bg-[#1DA1F2] hover:bg-[#1A8CD8] text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
        aria-label="Share on Twitter"
      >
        <Twitter size={18} />
      </button>
      <button
        onClick={() => handleShare('linkedin')}
        className="w-10 h-10 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={18} />
      </button>
      <button
        onClick={() => handleShare('copy')}
        className="w-10 h-10 rounded-full bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
        aria-label="Copy link"
      >
        <Link2 size={18} />
      </button>
    </div>
  );
};

export default SocialShare;