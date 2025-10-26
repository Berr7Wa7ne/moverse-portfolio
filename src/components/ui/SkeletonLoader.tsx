'use client';

import React from 'react';

type SkeletonLoaderProps = {
  variant?: 'card' | 'text' | 'circle' | 'image';
  count?: number;
  className?: string;
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'card',
  count = 1,
  className = '',
}) => {
  const skeletons = Array.from({ length: count });

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={`animate-pulse bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className={`animate-pulse space-y-3 ${className}`}>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        );
      
      case 'circle':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          </div>
        );
      
      case 'image':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="w-full h-full bg-gray-200 rounded"></div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {skeletons.map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;

// Export individual skeleton components for convenience
export const SkeletonCard = ({ className = '' }: { className?: string }) => (
  <SkeletonLoader variant="card" className={className} />
);

export const SkeletonText = ({ className = '' }: { className?: string }) => (
  <SkeletonLoader variant="text" className={className} />
);

export const SkeletonCircle = ({ className = '' }: { className?: string }) => (
  <SkeletonLoader variant="circle" className={className} />
);

export const SkeletonImage = ({ className = '' }: { className?: string }) => (
  <SkeletonLoader variant="image" className={className} />
);
