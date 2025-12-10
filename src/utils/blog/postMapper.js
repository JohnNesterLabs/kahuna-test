/**
 * WordPress Post Mapper
 * Utility to map WordPress REST API response to our application's post format
 * Centralized mapping logic to avoid code duplication
 */

/**
 * Maps a WordPress post object to our application's post format
 * @param {Object} post - WordPress REST API post object
 * @returns {Object} Mapped post object with standardized format
 */
export const mapWordPressPost = (post) => {
  if (!post || !post.ID) {
    return null;
  }

  return {
    ID: post.ID,
    title: post.title,
    content: post.content,
    description: post.excerpt,
    date: post.date,
    pubDate: post.date,
    featured_image: post.featured_image,
    link: post.URL,
    author: post.author?.name || "Team",
    authorName: post.author?.name || "Team",
    categories: post.categories || {}
  };
};

/**
 * Maps an array of WordPress posts to our application's post format
 * @param {Array} posts - Array of WordPress REST API post objects
 * @returns {Array} Array of mapped post objects
 */
export const mapWordPressPosts = (posts) => {
  if (!Array.isArray(posts)) {
    return [];
  }

  return posts
    .map(mapWordPressPost)
    .filter(post => post !== null); // Filter out any null mappings
};

/**
 * Sorts posts by date (newest first)
 * @param {Array} posts - Array of post objects
 * @returns {Array} Sorted array of posts
 */
export const sortPostsByDate = (posts) => {
  if (!Array.isArray(posts)) {
    return [];
  }

  return [...posts].sort((a, b) => {
    const dateA = new Date(a.date || a.pubDate || 0);
    const dateB = new Date(b.date || b.pubDate || 0);
    return dateB - dateA; // Newest first
  });
};
