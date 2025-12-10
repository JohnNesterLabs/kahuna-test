import React from 'react';
import { Link } from 'react-router-dom';

const BlogError = ({ message = "Sorry, articles could not be loaded right now.", showBackLink = false, backLinkText = "Back to Blogs" }) => {
    return (
        <div className="blog-listing-container">
            <div className="blog-header">
                <h1>Blogs</h1>
                <p>Latest insights and articles from our team</p>
            </div>
            <div className="error-message">
                <h2>Article Not Found</h2>
                <p>{message}</p>
                {showBackLink && (
                    <Link to="/blog" className="back-link">
                        {backLinkText}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default BlogError;
