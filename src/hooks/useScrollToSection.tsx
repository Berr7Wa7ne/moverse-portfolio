'use client';

import { useEffect } from 'react';

/**
 * Hook to handle scrolling to sections after navigation
 * Place this in pages that have quote or contact form sections
 */
export const useScrollToSection = () => {
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    
    if (hash) {
      // Remove the # from the hash
      const id = hash.replace('#', '');
      
      // Wait for the page to fully render
      const scrollToSection = () => {
        const element = document.getElementById(id);
        
        if (element) {
          // Add a small delay to ensure smooth scroll after navigation
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }, 100);
          
          // Clean up the URL hash
          window.history.replaceState(null, '', window.location.pathname);
        }
      };

      // Try immediately
      scrollToSection();
      
      // Also try after a short delay in case content is still loading
      const timeoutId = setTimeout(scrollToSection, 300);
      
      return () => clearTimeout(timeoutId);
    }
  }, []);
};

export default useScrollToSection;


