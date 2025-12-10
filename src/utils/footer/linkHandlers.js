/**
 * Footer Link Handlers
 * Utility functions for handling footer link clicks
 */

export const handleEmailClick = (email) => {
  return (e) => {
    e.preventDefault();
    window.location.href = `mailto:${email}`;
  };
};

export const handleExternalLink = (url) => {
  return (e) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };
};

