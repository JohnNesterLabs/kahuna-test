/**
 * Homepage Frame Utilities
 * Utility functions for handling WebP sequence frame operations
 * Includes frame formatting, path generation, and device detection
 */
import { CONFIG } from '../../config/homepage/constants';

/**
 * Formats frame number with leading zeros for consistent file naming
 * Converts frame numbers to 4-digit strings (e.g., 1 -> "0001", 42 -> "0042")
 */
export const formatFrameNumber = (frameNum) => {
  return frameNum.toString().padStart(4, '0');
};

/**
 * Gets the total number of frames available for the animation sequence
 * Returns different frame counts for mobile and desktop devices
 */
export const getTotalFrames = (isMobile) => {
  return isMobile ? CONFIG.totalFramesMobile : CONFIG.totalFramesDesktop;
};

/**
 * Gets the base folder path where frame images are stored
 * Returns different paths for mobile and desktop frame sequences
 */
export const getFolderPath = (isMobile) => {
  return isMobile ? CONFIG.folderPathMobile : CONFIG.folderPathDesktop;
};

/**
 * Constructs the complete image source path for a specific frame
 * Combines folder path, frame prefix, formatted frame number, and file extension
 */
export const getFrameImageSrc = (frameNum, isMobile) => {
  const folderPath = getFolderPath(isMobile);
  return `${folderPath}${CONFIG.framePrefix}${formatFrameNumber(frameNum)}${CONFIG.frameSuffix}`;
};

/**
 * Determines if a specific frame should pause the animation
 * Different pause frames are configured for mobile and desktop sequences
 */
export const isPauseFrame = (frame, isMobile) => {
  const pauseFrames = isMobile ? CONFIG.pauseFramesMobile : CONFIG.pauseFramesDesktop;
  return pauseFrames.includes(frame);
};

/**
 * Detects if the current device is a mobile device
 * Checks both viewport width and user agent string for accurate detection
 */
export const detectMobile = () => {
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
