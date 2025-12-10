import React, { useState, useEffect } from 'react';
import './MainLoader.css';

/**
 * MainLoader Component
 * Full-featured loader with progress tracking, used for initial app asset loading
 * Shows progress bar, loading text, and handles fade-out animations
 */
const MainLoader = ({ onComplete, progress = 0, fadeOut = false, loadedCount = 0, totalAssets = 0, error = null }) => {
    const [displayProgress, setDisplayProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('Initializing...');

    // Smooth progress animation
    useEffect(() => {
        const timer = setInterval(() => {
            setDisplayProgress(prev => {
                if (prev < progress) {
                    return Math.min(prev + 1, progress);
                }
                return prev;
            });
        }, 20);

        return () => clearInterval(timer);
    }, [progress]);

    // Update loading text based on progress
    useEffect(() => {
        if (progress < 5) {
            setLoadingText('Initializing Kahuna AI...');
        } else if (progress < 30) {
            setLoadingText('Loading video...');
        } else if (progress < 70) {
            setLoadingText('Loading assets...');
        } else if (progress < 95) {
            setLoadingText('Almost ready...');
        } else if (progress < 100) {
            setLoadingText('Finalizing...');
        } else {
            setLoadingText('Welcome to Kahuna AI');
        }
    }, [progress, loadedCount, totalAssets]);

    return (
        <div className={`main-loader-container ${fadeOut ? 'fade-out' : ''}`}>
            {/* Main loader content */}
            <div className="main-loader-content">
                {/* Logo/Brand */}
                <div className="main-loader-logo">
                    <img 
                        src="/logos/Logo-color.svg" 
                        alt="Kahuna AI" 
                        className="main-loader-logo-svg"
                    />
                </div>

                {/* Progress bar */}
                <div className="progress-container">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${displayProgress}%` }}
                        />
                    </div>
                    <div className="progress-text">
                        {displayProgress}%
                    </div>
                </div>

                {/* Loading text */}
                <div className="loading-text">
                    {loadingText}
                </div>
            </div>

            {/* Error message */}
            {error && (
                <div className="main-loader-error">
                    <p>Some assets failed to load, but you can continue:</p>
                    <p className="error-details">{error.message}</p>
                </div>
            )}
        </div>
    );
};

export default MainLoader;
