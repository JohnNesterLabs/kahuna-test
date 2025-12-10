import React from 'react';
import './VideoIcon.css';

const VideoIcon = ({ onClick }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event);
    }
  };

  return (
    <div
      className="video-icon-hitbox"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div className="video-icon-container">
        <svg 
          className="video-play-icon" 
          viewBox="0 0 24 24" 
          fill="white" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    </div>
  );
};

export default VideoIcon;
