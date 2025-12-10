/**
 * HeroVideo Component
 * Displays the hero video overlay with intro text and scroll indicator
 */
import React, { useRef, useEffect } from 'react';
import './HeroVideo.css';

const HeroVideo = ({ shouldShowHeroVideo }) => {
  const heroVideoRef = useRef(null);

  // Control hero video playback visibility
  useEffect(() => {
    if (!heroVideoRef.current) return;

    const video = heroVideoRef.current;
    if (shouldShowHeroVideo) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [shouldShowHeroVideo]);

  return (
    <div className={`hero-video-overlay ${shouldShowHeroVideo ? 'visible' : ''}`}>
      <video
        ref={heroVideoRef}
        className="hero-video"
        src="/videos/hero4_fixed.mp4"
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>

      {/* Intro text overlay while hero video is visible */}
      {shouldShowHeroVideo && (
        <div className="hero-video-text">
          Future of Technical <br className="mobile-only" /> Product Support
        </div>
      )}

      {/* Scroll Indicator Overlay - Only visible when hero video is visible, fades out when scrolling starts */}
      {shouldShowHeroVideo && (
        <div className="hero-scroll-indicator">
          {/* Gradient Overlay */}
          <div className="hero-gradient-overlay"></div>
          
          {/* Scroll Text and Arrow */}
          <div className="hero-scroll-content">
            <div className="hero-scroll-text">SCROLL</div>
            <img
              src="/images/arrow.png"
              alt="Scroll down"
              className="hero-scroll-arrow"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroVideo;

