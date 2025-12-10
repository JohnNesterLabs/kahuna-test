import { useState, useEffect, useCallback, useRef } from 'react';
import { FOOTER_WRAPPER_ID, FOOTER_VISIBILITY_ATTR } from '../../config/header/constants';

/**
 * Custom hook to handle header scroll behavior and visibility
 * Manages scroll position tracking and footer visibility detection
 * Uses throttling to optimize scroll event performance
 */
export const useHeaderScroll = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const footerRef = useRef(null);
  const throttleTimeoutRef = useRef(null);
  const lastScrollTimeRef = useRef(0);

  // Check footer visibility
  const checkFooterVisibility = useCallback(() => {
    const footer = footerRef.current || document.getElementById(FOOTER_WRAPPER_ID);
    
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const footerVisibilityOverride = footer.getAttribute(FOOTER_VISIBILITY_ATTR);
      const isFooterActive = footerVisibilityOverride === null 
        ? true 
        : footerVisibilityOverride === 'true';
      const isFooterVisible = isFooterActive && footerRect.top <= 0;
      setIsVisible(!isFooterVisible);
    }
  }, []);

  // Handle scroll event with throttling (runs max once per 16ms ~ 60fps)
  const handleScroll = useCallback(() => {
    const now = Date.now();
    const timeSinceLastScroll = now - lastScrollTimeRef.current;

    // Throttle to ~60fps (16ms)
    if (timeSinceLastScroll < 16) {
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
      throttleTimeoutRef.current = setTimeout(() => {
        handleScroll();
      }, 16 - timeSinceLastScroll);
      return;
    }

    lastScrollTimeRef.current = now;

    // Update scrollY position
    const currentScrollY = window.scrollY || window.pageYOffset;
    setScrollY(currentScrollY);
    
    // Check footer visibility
    checkFooterVisibility();
  }, [checkFooterVisibility]);

  useEffect(() => {
    // Try to get footer reference on mount
    footerRef.current = document.getElementById(FOOTER_WRAPPER_ID);
    
    // Initial check
    handleScroll();

    // Add scroll listener with throttling
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  return {
    isVisible,
    scrollY,
  };
};
