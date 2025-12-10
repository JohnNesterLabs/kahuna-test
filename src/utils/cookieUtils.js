/**
 * Cookie utility functions for managing document access
 */

const COOKIE_NAME = 'doc_access';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

// Check if we're in production (HTTPS required for Secure flag)
const isProduction = process.env.NODE_ENV === 'production';
const isSecure = isProduction && window.location.protocol === 'https:';

/**
 * Set the document access cookie
 * @param {string} value - Cookie value (default: 'true')
 * @param {number} maxAge - Cookie max age in seconds (default: 30 days)
 */
export const setAccessCookie = (value = 'true', maxAge = COOKIE_MAX_AGE) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + maxAge * 1000);
  
  // Add Secure flag in production with HTTPS
  const secureFlag = isSecure ? '; Secure' : '';
  
  document.cookie = `${COOKIE_NAME}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secureFlag}`;
};

/**
 * Get the document access cookie value
 * @returns {string|null} Cookie value or null if not found
 */
export const getAccessCookie = () => {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === COOKIE_NAME) {
      return value;
    }
  }
  return null;
};

/**
 * Check if user has document access
 * @returns {boolean} True if access cookie exists
 */
export const hasDocumentAccess = () => {
  return getAccessCookie() !== null;
};

/**
 * Remove the document access cookie
 */
export const removeAccessCookie = () => {
  const secureFlag = isSecure ? '; Secure' : '';
  document.cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax${secureFlag}`;
};

