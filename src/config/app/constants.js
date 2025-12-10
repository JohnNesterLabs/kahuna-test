/**
 * App Configuration Constants
 * Centralized configuration for the main App component
 */

// Loader timeout constants (in milliseconds)
export const LOADER_TIMEOUTS = {
  SKIP_LOADER_DELAY: 1000,      // Delay before completing loader for routes that skip it
  FADE_OUT_DURATION: 500,         // Duration of fade out animation
  COMPLETION_DELAY: 800,         // Delay after 100% progress before auto-completing
};

// Routes that should skip the full asset preloader
export const SKIP_LOADER_ROUTES = [
  '/documents/',
  '/access-form',
  '/grant-access',
  '/privacy-policy',
];
