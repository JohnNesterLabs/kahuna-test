import React from 'react';
import RelatedPostCard from '../RelatedPostCard/RelatedPostCard.jsx';
import './RelatedPosts.css';

const RelatedPosts = ({ posts, currentPostId }) => {
    if (!posts || posts.length === 0) return null;

    const relatedPosts = posts
        .filter(post => post.ID !== currentPostId)
        .slice(0, 3);

    if (relatedPosts.length === 0) return null;

    return (
        <section className="related-blogs-section">
            <h2 className="related-blogs-title">Related Blogs</h2>
            <div className="related-blogs-carousel">
                {relatedPosts.map((post) => (
                    <RelatedPostCard key={post.ID} post={post} />
                ))}
            </div>
        </section>
    );
};

export default RelatedPosts;

