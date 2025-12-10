/**
 * NavigationLoader Component
 * Displays loading spinner during navigation to specific frames
 */
import React from 'react';
import './NavigationLoader.css';

const NavigationLoader = ({ show }) => {
  if (!show) return null;

  return (
    <div className="blog-navigation-loader">
      <div className="spinner"></div>
    </div>
  );
};

export default NavigationLoader;

