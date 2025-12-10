/**
 * Custom hook for navigation loader management
 * Handles navigation loader state and timing for deep link navigation
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import { CONFIG, TICKET_TO_FRAME_MAPPING } from '../../config/homepage/constants';

export const useNavigationLoader = (isDeviceReady, totalFrames, isMobile = false) => {
  // Helper function to get frame from ticket
  const getFrameFromTicket = (ticketNumber, isMobileDevice) => {
    const mapping = isMobileDevice ? TICKET_TO_FRAME_MAPPING.mobile : TICKET_TO_FRAME_MAPPING.desktop;
    return mapping[ticketNumber] || null;
  };

  const [showNavigationLoader, setShowNavigationLoader] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    // Check sessionStorage first (for button navigation)
    if (sessionStorage.getItem('navigatingToFrame71') === 'true') {
      return true;
    }
    // Check URL parameter (for direct URL navigation)
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check ticket parameter first (preferred)
    const urlTicketParam = urlParams.get('ticket');
    if (urlTicketParam) {
      const parsedTicket = parseInt(urlTicketParam, 10);
      if (!Number.isNaN(parsedTicket) && parsedTicket >= 1 && parsedTicket <= 4) {
        // We need to detect mobile here for initial state
        const isMobileDevice = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const frameFromTicket = getFrameFromTicket(parsedTicket, isMobileDevice);
        if (frameFromTicket) {
          return true;
        }
      }
    }
    
    // Fall back to frame parameter (backward compatibility)
    const urlFrameParam = urlParams.get('frame');
    if (urlFrameParam) {
      const parsedFrame = parseInt(urlFrameParam, 10);
      if (!Number.isNaN(parsedFrame) && parsedFrame > 0) {
        return true;
      }
    }
    return false;
  });
  const [navigationImageReady, setNavigationImageReady] = useState(false);
  
  const navigationTargetFrameRef = useRef(null);
  const navigationLoaderFallbackTimeoutRef = useRef(null);
  const navigationLoaderMinTimeoutRef = useRef(null);
  const navigationLoaderStartRef = useRef(null);

  const completeNavigationLoaderHide = useCallback(() => {
    setShowNavigationLoader(false);
    setNavigationImageReady(false);
    navigationTargetFrameRef.current = null;
    navigationLoaderStartRef.current = null;
    if (navigationLoaderFallbackTimeoutRef.current) {
      clearTimeout(navigationLoaderFallbackTimeoutRef.current);
      navigationLoaderFallbackTimeoutRef.current = null;
    }
    if (navigationLoaderMinTimeoutRef.current) {
      clearTimeout(navigationLoaderMinTimeoutRef.current);
      navigationLoaderMinTimeoutRef.current = null;
    }
  }, []);

  const finishNavigationLoader = useCallback(() => {
    if (!navigationLoaderStartRef.current) {
      completeNavigationLoaderHide();
      return;
    }

    const elapsed = Date.now() - navigationLoaderStartRef.current;
    const remaining = CONFIG.minNavLoaderDuration - elapsed;

    if (remaining <= 0) {
      completeNavigationLoaderHide();
    } else {
      if (navigationLoaderMinTimeoutRef.current) {
        clearTimeout(navigationLoaderMinTimeoutRef.current);
      }
      navigationLoaderMinTimeoutRef.current = setTimeout(() => {
        completeNavigationLoaderHide();
      }, remaining);
    }
  }, [completeNavigationLoaderHide]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (navigationLoaderFallbackTimeoutRef.current) {
        clearTimeout(navigationLoaderFallbackTimeoutRef.current);
        navigationLoaderFallbackTimeoutRef.current = null;
      }
      if (navigationLoaderMinTimeoutRef.current) {
        clearTimeout(navigationLoaderMinTimeoutRef.current);
        navigationLoaderMinTimeoutRef.current = null;
      }
    };
  }, []);

  return {
    showNavigationLoader,
    navigationImageReady,
    setNavigationImageReady,
    navigationTargetFrameRef,
    navigationLoaderStartRef,
    navigationLoaderFallbackTimeoutRef,
    finishNavigationLoader
  };
};

