/**
 * Custom hook for WebP sequence animation management
 * Handles frame state, auto-play logic, and animation control
 */
import { useState, useRef, useCallback, useEffect } from 'react';
import { CONFIG } from '../../config/homepage/constants';
import { getTotalFrames, getFrameImageSrc, isPauseFrame } from '../../utils/homepage/frameUtils';
import { logger } from '../../utils/logger';

export const useWebPSequence = (isMobile, frameImageRef) => {
  const autoPlayFrameIdRef = useRef(null);
  const currentFrameRef = useRef(1);
  const scrollAccumulatorRef = useRef(0);

  const [state, setState] = useState({
    currentFrame: 1,
    isVisible: true,
    isAutoPlaying: false,
    playDirection: 'forward',
    isPaused: false,
  });

  // Helper functions
  const getTotalFramesForDevice = useCallback(() => {
    return getTotalFrames(isMobile);
  }, [isMobile]);

  const getFrameImageSrcForDevice = useCallback((frameNum) => {
    return getFrameImageSrc(frameNum, isMobile);
  }, [isMobile]);

  const isPauseFrameForDevice = useCallback((frame) => {
    return isPauseFrame(frame, isMobile);
  }, [isMobile]);

  const updateFrameImage = useCallback((frameNum) => {
    if (frameImageRef.current) {
      frameImageRef.current.src = getFrameImageSrcForDevice(frameNum);
    }
  }, [frameImageRef, getFrameImageSrcForDevice]);

  const setFrame = useCallback((frameNum, options = {}) => {
    const clampedFrame = Math.max(1, Math.min(frameNum, getTotalFramesForDevice()));
    currentFrameRef.current = clampedFrame;
    updateFrameImage(clampedFrame);
    setState(prev => ({
      ...prev,
      currentFrame: clampedFrame,
      ...options
    }));
  }, [getTotalFramesForDevice, updateFrameImage]);

  // Check if UI needs to update based on frame change
  const shouldUpdateUI = useCallback((prevFrame, nextFrame) => {
    // Always update on first/last frame
    if (nextFrame === 1 || nextFrame === getTotalFramesForDevice()) return true;
    
    // Text overlay boundaries
    const range = isMobile ? { start: 6, end: 33 } : { start: 6, end: 64 };
    const wasInRange = prevFrame >= range.start && prevFrame <= range.end;
    const isInRange = nextFrame >= range.start && nextFrame <= range.end;
    if (wasInRange !== isInRange) return true;

    // Hero video boundary
    const wasHeroVisible = prevFrame <= CONFIG.heroVideoLastFrame;
    const isHeroVisible = nextFrame <= CONFIG.heroVideoLastFrame;
    if (wasHeroVisible !== isHeroVisible) return true;

    return false;
  }, [isMobile, getTotalFramesForDevice]);

  // Auto-play Animation Loop
  const startAutoPlay = useCallback(() => {
    if (!state.isAutoPlaying || !state.isVisible || !frameImageRef.current) {
      return;
    }

    if (autoPlayFrameIdRef.current) {
      return;
    }

    const totalFrames = getTotalFramesForDevice();
    let lastFrameTime = Date.now();
    const frameInterval = 1000 / CONFIG.framesPerSecond;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - lastFrameTime;

      if (elapsed >= frameInterval) {
        lastFrameTime = now - (elapsed % frameInterval);

        let nextFrame = currentFrameRef.current;
        const prevFrame = nextFrame;

        if (state.playDirection === 'forward') {
          nextFrame += 1;

          if (isPauseFrameForDevice(nextFrame)) {
            logger.debug(`⏸️ PAUSED at frame ${nextFrame} (forward)`);
            setFrame(nextFrame, {
              isPaused: true,
              isAutoPlaying: false
            });
            scrollAccumulatorRef.current = 0;
            autoPlayFrameIdRef.current = null;
            return;
          }

          if (nextFrame > totalFrames) {
            logger.debug('✅ SEQUENCE COMPLETE');
            setFrame(totalFrames, {
              isAutoPlaying: false,
              isPaused: false
            });
            autoPlayFrameIdRef.current = null;
            return;
          }
        } else {
          nextFrame -= 1;

          if (isPauseFrameForDevice(nextFrame)) {
            logger.debug(`⏸️ PAUSED at frame ${nextFrame} (backward)`);
            setFrame(nextFrame, {
              isPaused: true,
              isAutoPlaying: false
            });
            scrollAccumulatorRef.current = 0;
            autoPlayFrameIdRef.current = null;
            return;
          }

          if (nextFrame < 1) {
            logger.debug('⏮️ REACHED START');
            setFrame(1, {
              isAutoPlaying: false,
              isPaused: false
            });
            autoPlayFrameIdRef.current = null;
            return;
          }
        }

        // Optimization: Only update React state if UI needs to change
        // Otherwise just update the Ref and the DOM directly
        currentFrameRef.current = nextFrame;
        updateFrameImage(nextFrame);

        if (shouldUpdateUI(prevFrame, nextFrame)) {
            setState(prev => ({
              ...prev,
              currentFrame: nextFrame
            }));
        }
      }

      autoPlayFrameIdRef.current = requestAnimationFrame(animate);
    };

    autoPlayFrameIdRef.current = requestAnimationFrame(animate);
  }, [
    state.isAutoPlaying,
    state.isVisible,
    state.playDirection,
    getTotalFramesForDevice,
    isPauseFrameForDevice,
    updateFrameImage,
    setFrame,
    currentFrameRef,
    scrollAccumulatorRef,
    frameImageRef,
    shouldUpdateUI
  ]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayFrameIdRef.current) {
      cancelAnimationFrame(autoPlayFrameIdRef.current);
      autoPlayFrameIdRef.current = null;
    }
  }, []);

  // Watch for auto-play state changes
  useEffect(() => {
    if (state.isAutoPlaying && state.isVisible) {
      if (!autoPlayFrameIdRef.current) {
        startAutoPlay();
      }
    } else {
      stopAutoPlay();
    }
  }, [state.isAutoPlaying, state.isVisible, startAutoPlay, stopAutoPlay]);

  // Keep DOM frame in sync when we're not auto-playing
  useEffect(() => {
    if (state.isAutoPlaying || !frameImageRef.current) {
      return;
    }
    updateFrameImage(state.currentFrame);
  }, [state.isAutoPlaying, state.currentFrame, updateFrameImage, frameImageRef]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoPlay();
    };
  }, [stopAutoPlay]);

  return {
    state,
    setState,
    currentFrameRef,
    scrollAccumulatorRef,
    getTotalFramesForDevice,
    getFrameImageSrcForDevice,
    isPauseFrameForDevice,
    setFrame,
    startAutoPlay,
    stopAutoPlay
  };
};
