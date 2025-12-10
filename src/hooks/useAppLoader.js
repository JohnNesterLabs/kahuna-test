import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAssetPreloader } from './useAssetPreloader';
import { SKIP_LOADER_ROUTES, LOADER_TIMEOUTS } from '../config/app/constants';
import { logger } from '../utils/logger';

/**
 * Custom hook to manage app loader state and logic
 * Handles both full asset preloader and lightweight loader for specific routes
 */
export const useAppLoader = () => {
  const location = useLocation();
  const { progress, isLoading, error, loadedCount, totalAssets } = useAssetPreloader();
  
  const [showLoader, setShowLoader] = useState(true);
  const [loaderFadeOut, setLoaderFadeOut] = useState(false);

  // Check if current path should skip full loader
  const shouldSkipLoader = SKIP_LOADER_ROUTES.some(route => 
    location.pathname.includes(route) || location.pathname === route
  );

  // Handle loader completion - memoized to prevent unnecessary re-renders
  const handleLoaderComplete = useCallback(() => {
    logger.log('🎉 Loader completed, transitioning to main app...');
    setLoaderFadeOut(true);
    // Wait for fade out animation to complete
    setTimeout(() => {
      setShowLoader(false);
    }, LOADER_TIMEOUTS.FADE_OUT_DURATION);
  }, []);

  // Handle lighter loader for specific routes
  useEffect(() => {
    if (shouldSkipLoader) {
      const timer = setTimeout(() => {
        handleLoaderComplete();
      }, LOADER_TIMEOUTS.SKIP_LOADER_DELAY);
      return () => clearTimeout(timer);
    }
  }, [shouldSkipLoader, handleLoaderComplete]);

  // Auto-complete loader when assets are loaded
  useEffect(() => {
    if (!shouldSkipLoader && !isLoading && progress === 100 && !error) {
      logger.log(`✅ All assets loaded: ${loadedCount}/${totalAssets}`);
      // Show 100% for a moment before auto-completing
      const timer = setTimeout(() => {
        handleLoaderComplete();
      }, LOADER_TIMEOUTS.COMPLETION_DELAY);
      return () => clearTimeout(timer);
    }
  }, [isLoading, progress, error, loadedCount, totalAssets, shouldSkipLoader, handleLoaderComplete]);

  // Handle errors by allowing user to skip
  useEffect(() => {
    if (error) {
      logger.warn('⚠️ Asset loading error, allowing user to skip:', error);
    }
  }, [error]);

  return {
    showLoader,
    loaderFadeOut,
    shouldSkipLoader,
    progress,
    loadedCount,
    totalAssets,
    error,
    handleLoaderComplete,
  };
};
