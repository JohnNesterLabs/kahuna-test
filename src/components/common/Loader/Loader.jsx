import React from 'react';
import './Loader.css';

/**
 * Loader Component
 * A lightweight full-screen spinner loader used throughout the application
 * for initial loading states, navigation transitions, and iframe loading
 */
const Loader = () => {
    return (
        <div className="loader">
            <div className="spinner"></div>
        </div>
    );
};

export default Loader;
