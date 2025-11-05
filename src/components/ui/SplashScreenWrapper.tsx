'use client';

import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';

type SplashScreenWrapperProps = {
  children: React.ReactNode;
};

const SplashScreenWrapper: React.FC<SplashScreenWrapperProps> = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip splash on hash navigations (e.g., /#quote-section) to avoid white flash
    const isHashNavigation = typeof window !== 'undefined' && window.location.hash;

    if (isHashNavigation) {
      setShowSplash(false);
      setIsLoading(false);
      return;
    }

    // Check if splash has been shown in this session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash === 'true') {
      setShowSplash(false);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    setShowSplash(false);
  };

  if (isLoading) {
    return null; // Prevent flash of content
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={3000} />}
      
      <div 
        className="transition-opacity duration-500"
        style={{ opacity: showSplash ? 0 : 1 }}
      >
        {children}
      </div>
    </>
  );
};

export default SplashScreenWrapper;
