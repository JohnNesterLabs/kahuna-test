import { useState, useEffect, useRef } from 'react';
import { TALLY_CONFIG } from '../../config/accessForm/constants';
import { logger } from '../../utils/logger';

/**
 * Custom hook to load and manage Tally embed script
 * Handles script loading, message listening, and cleanup
 */
export const useTallyScript = () => {
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);
  const scriptRef = useRef(null);
  const messageHandlerRef = useRef(null);
  const fallbackTimeoutRef = useRef(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${TALLY_CONFIG.SCRIPT_URL}"]`);
    
    // Message handler for Tally load event
    const handleMessage = (e) => {
      if (e.data?.includes && typeof e.data.includes === 'function' && e.data.includes(TALLY_CONFIG.LOAD_MESSAGE)) {
        if (!isLoadedRef.current) {
          isLoadedRef.current = true;
          setIsFrameLoaded(true);
          if (fallbackTimeoutRef.current) {
            clearTimeout(fallbackTimeoutRef.current);
          }
        }
      }
    };

    messageHandlerRef.current = handleMessage;
    window.addEventListener('message', handleMessage);
    
    if (existingScript) {
      // Script already exists, just set up message listener
      // If script is already loaded, check if iframe might already be ready
      fallbackTimeoutRef.current = setTimeout(() => {
        if (!isLoadedRef.current) {
          isLoadedRef.current = true;
          setIsFrameLoaded(true);
        }
      }, TALLY_CONFIG.LOAD_TIMEOUT);
      
      return () => {
        window.removeEventListener('message', messageHandlerRef.current);
        if (fallbackTimeoutRef.current) {
          clearTimeout(fallbackTimeoutRef.current);
        }
      };
    }

    // Create and load script
    const script = document.createElement('script');
    script.src = TALLY_CONFIG.SCRIPT_URL;
    script.async = true;
    scriptRef.current = script;

    // Handle script load errors
    script.onerror = () => {
      logger.error('Failed to load Tally embed script');
      // Still show iframe after timeout as fallback
      if (!isLoadedRef.current) {
        isLoadedRef.current = true;
        setIsFrameLoaded(true);
      }
    };
    
    // Append script to body
    document.body.appendChild(script);

    // Fallback timeout in case message doesn't fire
    fallbackTimeoutRef.current = setTimeout(() => {
      if (!isLoadedRef.current) {
        isLoadedRef.current = true;
        setIsFrameLoaded(true);
      }
    }, TALLY_CONFIG.LOAD_TIMEOUT);

    return () => {
      // Cleanup
      window.removeEventListener('message', messageHandlerRef.current);
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
      }
      
      // Only remove script if we created it (not if it was already there)
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []); // Empty deps - only run once on mount

  return isFrameLoaded;
};
