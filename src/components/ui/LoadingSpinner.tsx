'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  fullScreen?: boolean;
  className?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message = 'Loading...',
  fullScreen = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const spinnerSize = sizeClasses[size];

  const content = (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <Loader2 className={`${spinnerSize} text-[var(--accent-blue)] animate-spin`} />
      {message && (
        <p className="text-[var(--gray-600)] text-sm font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;

// Inline loading spinner for buttons
export const InlineSpinner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Loader2 className={`animate-spin ${className}`} />
);
