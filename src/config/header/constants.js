/**
 * Header Configuration Constants
 * Centralized configuration for the Header component
 */

// Scroll threshold for applying glass effect (in pixels)
export const GLASS_EFFECT_SCROLL_THRESHOLD = 1;

// Footer element ID
export const FOOTER_WRAPPER_ID = 'footerWrapper';

// Footer visibility attribute
export const FOOTER_VISIBILITY_ATTR = 'data-footer-visible';

// Page type mapping for route detection
export const PAGE_TYPE_ROUTES = {
  home: ['/'],
  blog: ['/blog'],
  'about-us': ['/about-us'],
  'privacy-policy': ['/privacy-policy'],
};

// Pages that should have glass effect when scrolled
export const GLASS_EFFECT_PAGES = ['blog', 'about-us', 'privacy-policy'];
