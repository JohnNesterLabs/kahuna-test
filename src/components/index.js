/**
 * Components Barrel Export
 * Centralized exports for all reusable components
 * 
 * Usage:
 * import { Header, Footer, Loader, MainLoader } from '../components';
 * import { BlogPostCard } from '../components';
 */

// Common Components (used across multiple pages)
export { default as Header } from './common/Header/Header.jsx';
export { default as Footer } from './common/Footer/Footer.jsx';
export { default as Loader } from './common/Loader/Loader.jsx';
export { default as MainLoader } from './common/MainLoader/MainLoader.jsx';
export { default as ErrorBoundary } from './common/ErrorBoundary/ErrorBoundary.jsx';

// Blog Components
export { default as BlogPostCard } from './blog/BlogPostCard/BlogPostCard.jsx';
export { default as BlogError } from './blog/BlogError/BlogError.jsx';
export { default as RelatedPostCard } from './blog/RelatedPostCard/RelatedPostCard.jsx';
export { default as RelatedPosts } from './blog/RelatedPosts/RelatedPosts.jsx';
export { default as PromotionalSection } from './blog/PromotionalSection/PromotionalSection.jsx';

// Homepage Components
export { default as VideoIcon } from './homepage/VideoIcon/VideoIcon.jsx';
export { default as VideoModal } from './homepage/VideoModal/VideoModal.jsx';
export { default as WebPSequence } from './homepage/WebPSequence/WebPSequence.jsx';
