/**
 * Custom hook for device detection
 * Handles mobile detection and device ready state
 */
import { useState, useEffect } from 'react';
import { detectMobile } from '../../utils/homepage/frameUtils';

export const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDeviceReady, setIsDeviceReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsDeviceReady(true);
      return;
    }

    const checkMobile = () => {
      setIsMobile(detectMobile());
    };

    checkMobile();
    setIsDeviceReady(true);

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile, isDeviceReady };
};

