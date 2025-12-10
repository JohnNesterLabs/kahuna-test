import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header/Header.jsx';
import Footer from '../../components/common/Footer/Footer.jsx';
import BlogPostCard from '../../components/blog/BlogPostCard/BlogPostCard.jsx';
import PromotionalSection from '../../components/blog/PromotionalSection/PromotionalSection.jsx';
import Loader from '../../components/common/Loader/Loader.jsx';
import BlogError from '../../components/blog/BlogError/BlogError.jsx';
import { mapWordPressPosts, sortPostsByDate } from '../../utils/blog/postMapper';
import { logger } from '../../utils/logger';
import './BlogListing.css';

const BlogListing = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showNavigationLoader, setShowNavigationLoader] = useState(false);

    const WORDPRESS_API_URL = "https://public-api.wordpress.com/rest/v1.1/sites/kahunalabs.blog/posts";

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);

                // Fetch posts from WordPress REST API
                const response = await fetch(WORDPRESS_API_URL);
                const data = await response.json();

                if (!data || !Array.isArray(data.posts)) {
                    logger.warn("Invalid API response or no posts array");
                    setError("Sorry, articles could not be loaded right now.");
                    return;
                }

                // Map WordPress API response to our post format using utility
                const mappedPosts = mapWordPressPosts(data.posts);

                // Sort by date (newest first) using utility
                const sortedPosts = sortPostsByDate(mappedPosts);

                setPosts(sortedPosts);
            } catch (err) {
                logger.error("Error fetching posts:", err);
                setError("Sorry, articles could not be loaded right now.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <>
                <Header />
                <BlogError message={error} />
                <Footer />
            </>
        );
    }

    // Get featured post (first post only)
    const featuredPost = posts.length > 0 ? posts[0] : null;
    // Get all posts (including the featured post)
    const allPosts = [...posts];

    return (
        <>
            <Header />
            <div className="blog-listing-container">
                {/* Background Gradient Divs */}
                <div className="gradient-bg-bottom"></div>

                {/* Featured Post Section */}
                {featuredPost && (
                    <section className="featured-posts-section">
                        <h2 className="featured-posts-title">Featured Post</h2>
                        <div className="featured-posts-grid">
                            <BlogPostCard post={featuredPost} variant="featured" />
                        </div>
                    </section>
                )}

                {/* Separator Line */}
                <div className="blog-section-separator blog-section-separator--compact"></div>

                {allPosts.length > 0 && (
                    <>
                        {/* Blog Posts Section */}
                        <section className="blog-library-section">
                            <h2 className="all-posts-title">All Posts</h2>

                            <div className="all-posts-grid">
                                {allPosts.map((article, index) => (
                                    <BlogPostCard key={article.ID || index} post={article} variant="default" />
                                ))}
                            </div>
                        </section>
                    </>
                )}

                {/* Separator Line */}
                <div className="blog-section-separator"></div>

                {/* Promotional Section */}
                <PromotionalSection onNavigate={() => setShowNavigationLoader(true)} />
            </div>
            <Footer />
            {showNavigationLoader && <Loader />}
        </>
    );
};

export default BlogListing;
