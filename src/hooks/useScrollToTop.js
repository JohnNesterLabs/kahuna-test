import { useEffect } from 'react';

/**
 * Custom hook to scroll to top of page when component mounts
 * Uses consistent scroll behavior across all pages
 */
export const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);
};
