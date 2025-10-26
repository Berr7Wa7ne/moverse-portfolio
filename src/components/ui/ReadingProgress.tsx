'use client';

import React, { useEffect, useState } from 'react';

type ReadingProgressProps = {
  target?: string; // CSS selector for the content to track
  className?: string;
};

const ReadingProgress: React.FC<ReadingProgressProps> = ({ 
  target,
  className = '' 
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      let element: HTMLElement | null = null;

      if (target) {
        element = document.querySelector(target);
      }

      if (!element) {
        element = document.documentElement;
      }

      const scrollTop = window.scrollY;
      const docHeight = element.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setProgress(Math.min(Math.max(scrollPercent, 0), 100));
    };

    calculateProgress();
    window.addEventListener('scroll', calculateProgress);
    window.addEventListener('resize', calculateProgress);

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, [target]);

  return (
    <div className={`fixed top-0 left-0 w-full h-1 bg-gray-200 z-50 ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-[var(--accent-blue)] to-[#2952cc] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
