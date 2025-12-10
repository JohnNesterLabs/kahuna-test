/**
 * Access Form Configuration Constants
 * Centralized configuration for the AccessForm component
 */

// Default redirect path if none is provided
export const DEFAULT_REDIRECT = '/documents/view';

// SessionStorage key for storing redirect path
export const REDIRECT_STORAGE_KEY = 'documentRedirect';

// Tally form configuration
export const TALLY_CONFIG = {
  SCRIPT_URL: 'https://tally.so/widgets/embed.js',
  FORM_ID: process.env.REACT_APP_TALLY_FORM_ID || 'xXrVVr',
  TRANSPARENT_BACKGROUND: true,
  LOAD_TIMEOUT: 500, // Fallback timeout in milliseconds
  LOAD_MESSAGE: 'Tally.load', // Message identifier from Tally script
};

// Tally embed URL builder
export const getTallyEmbedUrl = (formId = TALLY_CONFIG.FORM_ID) => {
  const params = new URLSearchParams();
  if (TALLY_CONFIG.TRANSPARENT_BACKGROUND) {
    params.set('transparentBackground', '1');
  }
  return `https://tally.so/r/${formId}${params.toString() ? `?${params.toString()}` : ''}`;
};
