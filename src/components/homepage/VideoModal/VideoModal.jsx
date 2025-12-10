import React, { useRef, useEffect } from 'react';
import { logger } from '../../../utils/logger';
import './VideoModal.css';

const VideoModal = ({ isOpen, onClose, videoSrc = '/videos/Ticket 1 Final (Compressed).mp4' }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      return;
    }

    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const { style } = document.body;
    const previous = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      width: style.width,
    };

    style.overflow = 'hidden';
    style.position = 'fixed';
    style.top = `-${scrollY}px`;
    style.width = '100%';

    return () => {
      style.overflow = previous.overflow || '';
      style.position = previous.position || '';
      style.top = previous.top || '';
      style.width = previous.width || '';
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Auto-play video when modal opens and handle video end
  useEffect(() => {
    if (!isOpen || !videoRef.current) return;
    
    const video = videoRef.current;
    
    // Load and play video
    video.load();
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        logger.warn('Video autoplay failed:', error);
      });
    }
    
    // Handle video end event - close modal when video completes
    const handleVideoEnd = () => {
      onClose();
    };
    
    video.addEventListener('ended', handleVideoEnd);
    
    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [isOpen, videoSrc, onClose]);

  if (!isOpen) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        <video 
          ref={videoRef}
          className="video-modal-player"
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          playsInline
          webkit-playsinline="true"
          autoPlay
        >
          <source key={videoSrc} src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoModal;
