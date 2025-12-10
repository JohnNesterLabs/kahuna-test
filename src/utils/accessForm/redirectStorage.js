import { REDIRECT_STORAGE_KEY } from '../../config/accessForm/constants';

/**
 * Utility functions for managing redirect path in sessionStorage
 */

/**
 * Store redirect path in sessionStorage
 * @param {string} redirect - The redirect path to store
 */
export const storeRedirect = (redirect) => {
  if (redirect) {
    sessionStorage.setItem(REDIRECT_STORAGE_KEY, redirect);
  }
};

/**
 * Get redirect path from sessionStorage
 * @returns {string|null} The stored redirect path or null
 */
export const getRedirect = () => {
  return sessionStorage.getItem(REDIRECT_STORAGE_KEY);
};

/**
 * Remove redirect path from sessionStorage
 */
export const clearRedirect = () => {
  sessionStorage.removeItem(REDIRECT_STORAGE_KEY);
};
