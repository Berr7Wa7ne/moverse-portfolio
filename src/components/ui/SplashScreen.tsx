'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type SplashScreenProps = {
  onComplete?: () => void;
  duration?: number;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onComplete, 
  duration = 2500 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation after a brief delay
    const animationTimer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);

    // Start fade out before complete
    const fadeOutTimer = setTimeout(() => {
      setIsAnimating(false);
    }, duration - 500);

    // Complete and hide
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500"
      style={{
        opacity: isAnimating ? 1 : 0,
      }}
    >
      {/* Logo Container */}
      <div className="relative z-10">
        <div
          className="transition-all duration-700 ease-out"
          style={{
            transform: isAnimating ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
            opacity: isAnimating ? 1 : 0,
          }}
        >
          {/* Logo */}
          <div className="relative flex items-center justify-center">
            <Image
              src="/moverse logo.png"
              alt="Moverse Logo"
              width={400}
              height={400}
              priority
              className="object-contain"
            />
          </div>

          {/* Loading Text */}
          <div className="text-center mt-8">
            <p className="text-[var(--primary-blue)] text-lg font-medium tracking-wider animate-pulse">
              Loading...
            </p>
          </div>

          {/* Loading Bar */}
          <div className="mt-4 w-48 mx-auto h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent-blue)] rounded-full transition-all duration-[2000ms] ease-out"
              style={{
                width: isAnimating ? '100%' : '0%',
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
