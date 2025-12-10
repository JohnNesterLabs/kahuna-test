/**
 * Determines the page type based on the current pathname
 * @param {string} pathname - Current route pathname
 * @returns {string} Page type identifier
 */
export const getPageType = (pathname) => {
  // Check exact matches first
  if (pathname === '/') {
    return 'home';
  }
  
  // Check for blog routes (starts with /blog)
  if (pathname.startsWith('/blog')) {
    return 'blog';
  }
  
  // Check other specific routes
  if (pathname === '/about-us') {
    return 'about-us';
  }
  
  if (pathname === '/privacy-policy') {
    return 'privacy-policy';
  }
  
  return 'default';
};
