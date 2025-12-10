import React from 'react';
import VideoIcon from '../VideoIcon/VideoIcon.jsx';
import './WebPSequence.css';

const WebPSequence = ({ 
  webpSequenceContainerRef, 
  frameImageRef, 
  isVisible, 
  shouldShowIcon, 
  onIconClick,
  currentFrame,
  shouldFadeOut = false
}) => {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

  // Show text inside frame ranges (desktop vs mobile)
  const desktopRange = { start: 6, end: 64 };
  const mobileRange = { start: 6, end: 33 };
  const range = isMobile ? mobileRange : desktopRange;
  const shouldDisplayText = currentFrame >= range.start && currentFrame <= range.end;
  const textVisible = isVisible && shouldDisplayText;
  const containerClasses = [
    'webp-sequence-container',
    isVisible ? 'visible' : '',
    shouldFadeOut ? 'fade-out' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div 
      className={containerClasses}
      ref={webpSequenceContainerRef}
    >
      <img 
        ref={frameImageRef}
        id="frameImage" 
        className="webp-sequence-frame" 
        alt="Frame" 
      />
      
      <div className={`frame-text-overlay ${textVisible ? 'visible' : 'hidden'}`}>
        AI that automatically builds <br className="mobile-only" /> and nurtures your <br className="mobile-only" /> Troubleshooting Map
      </div>
      
      {/* Clickable Icon at Pause Frames */}
      {shouldShowIcon && <VideoIcon onClick={onIconClick} />}
    </div>
  );
};

export default WebPSequence;
