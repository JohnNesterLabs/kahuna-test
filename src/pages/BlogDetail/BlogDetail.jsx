import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/common/Header/Header.jsx';
import Footer from '../../components/common/Footer/Footer.jsx';
import Loader from '../../components/common/Loader/Loader.jsx';
import RelatedPosts from '../../components/blog/RelatedPosts/RelatedPosts.jsx';
import { decodeHtmlEntities, formatDate, sanitizeBasic } from '../../utils/blog/blogUtils';
import { mapWordPressPost, mapWordPressPosts } from '../../utils/blog/postMapper';
import { logger } from '../../utils/logger';
import './BlogDetail.css';

const BlogDetail = () => {
    const [searchParams] = useSearchParams();
    const [article, setArticle] = useState(null);
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const WORDPRESS_API_URL = process.env.REACT_APP_WORDPRESS_API_URL || "https://public-api.wordpress.com/rest/v1.1/sites/kahunalabs.blog/posts";

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);

                const idParam = searchParams.get("id");

                if (!idParam) {
                    setError("Missing article identifier.");
                    return;
                }

                // Fetch specific post by ID from WordPress REST API
                const postResponse = await fetch(`${WORDPRESS_API_URL}/${idParam}`);
                const postData = await postResponse.json();

                if (!postData || !postData.ID) {
                    throw new Error("Article not found");
                }

                // Map WordPress API response to our article format using utility
                const mappedArticle = mapWordPressPost(postData);
                
                if (!mappedArticle) {
                    throw new Error("Failed to map article data");
                }

                // Fetch all posts for related posts section
                const allPostsResponse = await fetch(WORDPRESS_API_URL);
                const allPostsData = await allPostsResponse.json();

                if (allPostsData && Array.isArray(allPostsData.posts)) {
                    // Use utility to map all posts
                    const mappedPosts = mapWordPressPosts(allPostsData.posts);
                    setAllPosts(mappedPosts);
                }

                setArticle(mappedArticle);
            } catch (err) {
                logger.error("Error fetching article:", err);
                setError("Sorry, this article could not be loaded.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [searchParams]);

    if (loading) {
        return <Loader />;
    }

    if (error || !article) {
        return (
            <>
                <Header />
                <div className="blog-detail-container">
                    <div className="error-message">
                        <h2>Article Not Found</h2>
                        <p>{error || "The requested article could not be found."}</p>
                        <Link to="/blog" className="back-link">
                            ← Back to Blogs
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const contentHtml = sanitizeBasic(article.content || "");

    return (
        <>
            <Header />
            <div className="blog-detail-container">
                <div className="gradient-bg-bottom"></div>
                
                <div className="article-wrap">
                    <Link to="/blog" className="blog-back-link">
                        <img src="/icons/arrow left icon.png" alt="Back" className="back-arrow-icon" width="16" height="16" />
                        <span>Back</span>
                    </Link>

                    <h1 className="post-title">{decodeHtmlEntities(article.title)}</h1>

                    <div className="post-meta">
                        <div className="meta-item">
                            <img src="/icons/icon.svg" alt="Calendar" className="meta-icon" width="16" height="16" />
                            <span>{formatDate(article.date || article.pubDate)}</span>
                        </div>
                    </div>

                    {article.featured_image && (
                        <img 
                            id="post-image" 
                            src={article.featured_image} 
                            alt={decodeHtmlEntities(article.title)}
                            className="post-thumbnail"
                        />
                    )}

                    <div
                        className="post-content"
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                </div>

                <RelatedPosts posts={allPosts} currentPostId={article.ID} />
            </div>
            <Footer />
        </>
    );
};

export default BlogDetail;
