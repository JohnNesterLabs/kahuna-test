/**
 * Custom hook for video modal state management
 * Handles modal open/close state and video source selection
 */
import { useState, useCallback } from 'react';
import { VIDEO_MAPPING } from '../../config/homepage/constants';

export const useVideoModal = (isMobile) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideoSrc, setActiveVideoSrc] = useState(VIDEO_MAPPING.defaultSrc);

  const getVideoSrcForFrame = useCallback((frame) => {
    const frameKey = Number(frame) || 0;
    const mapping = isMobile ? VIDEO_MAPPING.mobile : VIDEO_MAPPING.desktop;
    return mapping[frameKey] || VIDEO_MAPPING.defaultSrc;
  }, [isMobile]);

  const handleIconClick = useCallback((currentFrame) => {
    setActiveVideoSrc(getVideoSrcForFrame(currentFrame));
    setIsModalOpen(true);
  }, [getVideoSrcForFrame]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    activeVideoSrc,
    handleIconClick,
    handleCloseModal
  };
};

