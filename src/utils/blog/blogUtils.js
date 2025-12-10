/**
 * Blog Utilities
 * Shared utility functions for blog-related operations
 * Handles HTML processing, date formatting, image handling, and content sanitization
 */
import DOMPurify from 'dompurify';

/**
 * Removes all HTML tags from content and returns plain text
 * Safely extracts text content from HTML strings for display purposes
 */
export const stripHtml = (html) => {
    if (!html) return '';
    const div = document.createElement("div");
    div.innerHTML = html;
    return (div.textContent || div.innerText || "").trim();
};

/**
 * Converts HTML entities (like &amp;, &lt;, &gt;) to their actual characters
 * Essential for displaying WordPress content that contains encoded entities
 */
export const decodeHtmlEntities = (text) => {
    if (!text) return '';
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
};

/**
 * Extracts the featured image URL from a blog post object
 * Returns null if no featured image is available
 */
export const getThumbnail = (post) => {
    if (post?.featured_image) {
        return post.featured_image;
    }
    return null;
};

/**
 * Converts ISO date strings to human-readable format
 * Formats dates as "Month Day, Year" (e.g., "Jan 15, 2024")
 */
export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
};

/**
 * Estimates reading time based on word count
 * Assumes average reading speed of 200 words per minute
 */
export const calculateReadingTime = (content) => {
    if (!content) return 1;
    const text = stripHtml(content);
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
    return readingTime || 1;
};

/**
 * Extracts category name from WordPress post data
 * Handles various WordPress API response formats and defaults to "Agentic AI"
 * Replaces "Uncategorized" with "Agentic AI" for consistency
 */
export const getCategory = (post) => {
    let category = "Agentic AI";
    if (post?.categories) {
        // WordPress REST API returns categories as an object where values are category objects
        if (Array.isArray(post.categories) && post.categories.length > 0) {
            const firstCategory = post.categories[0];
            category = typeof firstCategory === 'string' ? firstCategory : (firstCategory?.name || "Agentic AI");
        } else if (typeof post.categories === 'object' && post.categories !== null) {
            const categoryObjects = Object.values(post.categories);
            if (categoryObjects.length > 0) {
                const firstCategoryObj = categoryObjects[0];
                category = firstCategoryObj?.name || "Agentic AI";
            }
        }
        // Replace "Uncategorized" (case-insensitive) with "Agentic AI"
        if (typeof category === 'string' && category.toLowerCase() === "uncategorized") {
            category = "Agentic AI";
        }
    }
    return category;
};

/**
 * Error handler for blog post images
 * Automatically replaces broken images with a default placeholder thumbnail
 */
export const handleImageError = (e) => {
    e.target.src = "/images/blog-thumbnail.png";
};

/**
 * Validates loaded images and replaces placeholders
 * Detects images smaller than 100x100px and replaces them with default thumbnail
 */
export const handleImageLoad = (e) => {
    const imgElement = e.target;
    // Check if image is too small (likely a placeholder)
    if (imgElement.naturalWidth < 100 || imgElement.naturalHeight < 100) {
        imgElement.src = "/images/blog-thumbnail.png";
    }
};

/**
 * Creates a text excerpt from HTML content
 * Extracts first N words and appends ellipsis if content is truncated
 */
export const generateExcerpt = (content, wordLimit = 20) => {
    if (!content) return '';
    const text = stripHtml(content);
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const excerpt = words.slice(0, wordLimit).join(" ");
    return excerpt + (words.length > wordLimit ? "..." : "");
};

/**
 * Sanitizes HTML content to prevent XSS attacks
 * Uses DOMPurify to safely allow only whitelisted HTML tags and attributes
 * Preserves formatting while removing dangerous content
 */
export const sanitizeBasic = (html) => {
    if (!html) return '';
    
    // Use DOMPurify to sanitize HTML content
    // This prevents XSS attacks while preserving safe HTML formatting
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'p', 'br', 'strong', 'em', 'u', 'b', 'i',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ul', 'ol', 'li',
            'a', 'img',
            'blockquote', 'pre', 'code',
            'div', 'span',
            'table', 'thead', 'tbody', 'tr', 'th', 'td'
        ],
        ALLOWED_ATTR: [
            'href', 'src', 'alt', 'title', 'class',
            'width', 'height', 'target', 'rel'
        ],
        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
        // Remove any onclick, onerror, etc. event handlers
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
    });
};

