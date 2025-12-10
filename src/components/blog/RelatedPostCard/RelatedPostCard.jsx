import React from 'react';
import { Link } from 'react-router-dom';
import { decodeHtmlEntities, formatDate, getThumbnail, generateExcerpt, handleImageError } from '../../../utils/blog/blogUtils';
import './RelatedPostCard.css';

const RelatedPostCard = ({ post }) => {
    const excerpt = generateExcerpt(post.description || post.content, 25);
    const img = getThumbnail(post);
    const postId = post.ID;

    return (
        <Link
            className="related-blog-card"
            to={`/blog-detail?id=${postId}`}
        >
            <div className="related-blog-image-wrapper">
                <img
                    src={img || "/images/blog-thumbnail.png"}
                    alt={decodeHtmlEntities(post.title)}
                    className="related-blog-image"
                    onError={handleImageError}
                />
            </div>
            <div className="related-blog-content">
                <h3 className="related-blog-title">
                    {decodeHtmlEntities(post.title)}
                </h3>
                <p className="related-blog-excerpt">
                    {decodeHtmlEntities(excerpt)}
                </p>
                <div className="related-blog-meta">
                    <div className="related-meta-item">
                        <img 
                            src="/icons/icon.svg" 
                            alt="Calendar" 
                            className="related-meta-icon" 
                            width="16" 
                            height="16" 
                        />
                        <span>{formatDate(post.date || post.pubDate)}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RelatedPostCard;

