import React from 'react';
import { Link } from 'react-router-dom';
import { decodeHtmlEntities, formatDate, getThumbnail, generateExcerpt, handleImageError, handleImageLoad } from '../../../utils/blog/blogUtils';
import './BlogPostCard.css';

const BlogPostCard = ({ post, variant = 'default' }) => {
    const excerpt = generateExcerpt(post.description || post.content, variant === 'featured' ? 20 : 25);
    const img = getThumbnail(post);
    const postId = post.ID;

    // Use existing CSS classes from BlogListing.css
    const cardClassName = variant === 'featured' ? 'featured-post-card' : 'all-posts-card';
    const imageWrapperClassName = variant === 'featured' ? 'featured-post-image-wrapper' : 'all-posts-card-image-wrapper';
    const imageClassName = variant === 'featured' ? 'featured-post-image' : 'all-posts-card-image';
    const contentClassName = variant === 'featured' ? 'featured-post-content-wrapper' : 'all-posts-card-content';
    const titleClassName = variant === 'featured' ? 'featured-post-card-title' : 'all-posts-card-title';
    const excerptClassName = variant === 'featured' ? 'featured-post-card-description' : 'all-posts-card-excerpt';
    const metaClassName = variant === 'featured' ? 'featured-post-card-meta' : 'all-posts-card-meta';
    const metaItemClassName = variant === 'featured' ? 'meta-item' : 'all-posts-meta-item';
    const metaIconClassName = variant === 'featured' ? 'meta-icon' : 'all-posts-meta-icon';

    return (
        <Link
            className={cardClassName}
            to={`/blog-detail?id=${postId}`}
        >
            <div className={imageWrapperClassName}>
                <img
                    src={img || "/images/blog-thumbnail.png"}
                    alt={decodeHtmlEntities(post.title)}
                    className={imageClassName}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                />
            </div>
            <div className={contentClassName}>
                <h3 className={titleClassName}>
                    {decodeHtmlEntities(post.title)}
                </h3>
                <p className={excerptClassName}>
                    {decodeHtmlEntities(excerpt)}
                </p>
                <div className={metaClassName}>
                    {variant === 'featured' ? (
                        <div className="meta-row">
                            <div className={metaItemClassName}>
                                <img 
                                    src="/icons/icon.svg" 
                                    alt="Calendar" 
                                    className={metaIconClassName} 
                                    width="16" 
                                    height="16" 
                                />
                                <span>{formatDate(post.date || post.pubDate)}</span>
                            </div>
                        </div>
                    ) : (
                        <div className={metaItemClassName}>
                            <img 
                                src="/icons/icon.svg" 
                                alt="Calendar" 
                                className={metaIconClassName} 
                                width="16" 
                                height="16" 
                            />
                            <span>{formatDate(post.date || post.pubDate)}</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default BlogPostCard;

