'use client';

import React, { useEffect, useState } from 'react';

type ScrollProgressProps = {
  className?: string;
  position?: 'top' | 'bottom';
};

const ScrollProgress: React.FC<ScrollProgressProps> = ({ 
  className = '',
  position = 'top'
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
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
  }, []);

  const positionClass = position === 'top' ? 'top-0' : 'bottom-0';

  return (
    <div className={`fixed ${positionClass} left-0 w-full h-1 bg-gray-200 z-50 ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-[var(--accent-blue)] to-[#2952cc] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
