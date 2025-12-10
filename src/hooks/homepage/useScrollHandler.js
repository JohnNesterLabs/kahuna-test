/**
 * Custom hook for scroll/wheel event handling
 * Manages scroll direction control, pause/resume logic, and boundary checks
 */
import { useRef, useCallback } from 'react';
import { CONFIG } from '../../config/homepage/constants';
import { logger } from '../../utils/logger';

export const useScrollHandler = (
  state,
  setState,
  currentFrameRef,
  scrollAccumulatorRef,
  frameImageRef,
  getTotalFramesForDevice,
  getFrameImageSrcForDevice,
  isPauseFrameForDevice,
  startAutoPlay,
  isModalOpen,
  isMobile
) => {
  const lastScrollTimeRef = useRef(Date.now());
  const lastTouchYRef = useRef(0);

  const handleWheel = useCallback((e) => {
    if (!state.isVisible || isModalOpen) return;

    let scrollDelta = 0;
    const now = Date.now();
    const isTouchEvent = e.type === 'touchmove' || e.type === 'touchstart';

    if (e.deltaY !== undefined) {
      scrollDelta = e.deltaY;
    } else if (e.type === 'touchmove' && e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      if (lastTouchYRef.current === 0) {
        lastTouchYRef.current = touch.clientY;
        if (isMobile) {
          e.preventDefault();
        }
        return;
      }
      scrollDelta = lastTouchYRef.current - touch.clientY;
      lastTouchYRef.current = touch.clientY;
    } else if (e.type === 'touchstart' && e.touches && e.touches.length > 0) {
      lastTouchYRef.current = e.touches[0].clientY;
      return;
    } else {
      return;
    }

    logger.debug('🖱️ WHEEL EVENT:', { scrollDelta, isAutoPlaying: state.isAutoPlaying, isPaused: state.isPaused, currentFrame: state.currentFrame });

    const totalFrames = getTotalFramesForDevice();
    const isAtFirstFrame = currentFrameRef.current === 1;
    const isAtLastFrame = currentFrameRef.current >= totalFrames;

    // Boundary checks
    if (isAtFirstFrame && scrollDelta < 0) {
      logger.debug('🚫 At frame 1 - backward scroll ignored');
      if (isTouchEvent && isMobile) {
        e.preventDefault();
        e.stopPropagation();
      }
      return;
    }
    if (isAtLastFrame && scrollDelta > 0) {
      logger.debug('🚫 At last frame - forward scroll ignored');
      if (isTouchEvent && isMobile) {
        e.preventDefault();
        e.stopPropagation();
      }
      return;
    }

    if (isTouchEvent && isMobile) {
      e.preventDefault();
    }

    // Start animation from frame 1 on forward scroll
    if (!state.isAutoPlaying && !state.isPaused && isAtFirstFrame && scrollDelta > 0) {
      logger.debug('▶️ Starting animation from frame 1 on forward scroll');
      setState(prev => ({
        ...prev,
        isAutoPlaying: true,
        playDirection: 'forward'
      }));
      startAutoPlay();
      return;
    }

    // Start animation from last frame on backward scroll
    if (!state.isAutoPlaying && !state.isPaused && isAtLastFrame && scrollDelta < 0) {
      logger.debug('▶️ Starting animation from last frame on backward scroll');
      setState(prev => ({
        ...prev,
        isAutoPlaying: true,
        playDirection: 'backward'
      }));
      startAutoPlay();
      return;
    }

    // Handle pause state - accumulate scroll to resume
    if (state.isPaused) {
      if (isTouchEvent && isMobile) {
        e.preventDefault();
      }
      
      if (scrollDelta > 0) {
        scrollAccumulatorRef.current += scrollDelta;
        logger.debug('📊 PAUSE SCROLL DOWN:', scrollAccumulatorRef.current, 'threshold:', CONFIG.scrollThreshold);

        if (scrollAccumulatorRef.current >= CONFIG.scrollThreshold) {
          const pausedFrame = currentFrameRef.current;
          if (pausedFrame >= totalFrames) {
            logger.debug('🚫 Already at last frame - cannot resume forward');
            scrollAccumulatorRef.current = 0;
            return;
          }
          const nextFrameAfterPause = pausedFrame + 1;
          logger.debug(`▶️ RESUMING from pause at frame ${pausedFrame} - continuing forward to frame ${nextFrameAfterPause}`);
          setState(prev => ({
            ...prev,
            isPaused: false,
            isAutoPlaying: true,
            playDirection: 'forward',
            currentFrame: nextFrameAfterPause
          }));
          scrollAccumulatorRef.current = 0;
          currentFrameRef.current = nextFrameAfterPause;
          if (frameImageRef.current) {
            frameImageRef.current.src = getFrameImageSrcForDevice(nextFrameAfterPause);
          }
          startAutoPlay();
        }
      } else if (scrollDelta < 0) {
        scrollAccumulatorRef.current += scrollDelta;
        logger.debug('📊 PAUSE SCROLL UP:', scrollAccumulatorRef.current, 'threshold:', -CONFIG.scrollThreshold);

        if (scrollAccumulatorRef.current <= -CONFIG.scrollThreshold) {
          const pausedFrame = currentFrameRef.current;
          if (pausedFrame <= 1) {
            logger.debug('🚫 Already at frame 1 - cannot resume backward');
            scrollAccumulatorRef.current = 0;
            if (isTouchEvent && isMobile) {
              e.preventDefault();
              e.stopPropagation();
            }
            return;
          }
          const nextFrameBeforePause = pausedFrame - 1;
          logger.debug(`▶️ RESUMING from pause at frame ${pausedFrame} - going backward to frame ${nextFrameBeforePause}`);
          setState(prev => ({
            ...prev,
            isPaused: false,
            isAutoPlaying: true,
            playDirection: 'backward',
            currentFrame: nextFrameBeforePause
          }));
          scrollAccumulatorRef.current = 0;
          currentFrameRef.current = nextFrameBeforePause;
          if (frameImageRef.current) {
            frameImageRef.current.src = getFrameImageSrcForDevice(nextFrameBeforePause);
          }
          startAutoPlay();
        }
      }
      return;
    }

    // Direction change during auto-play
    if (state.isAutoPlaying && !state.isPaused) {
      if (isTouchEvent && isMobile) {
        e.preventDefault();
      }
      
      if (scrollDelta < 0 && state.playDirection === 'forward') {
        if (isAtFirstFrame) {
          logger.debug('🚫 At frame 1 - cannot reverse to backward');
          if (isTouchEvent && isMobile) {
            e.preventDefault();
            e.stopPropagation();
          }
          return;
        }
        logger.debug('⏪ REVERSING - User scrolled up during forward play');
        setState(prev => ({
          ...prev,
          playDirection: 'backward'
        }));
        scrollAccumulatorRef.current = 0;
        startAutoPlay();
      } else if (scrollDelta > 0 && state.playDirection === 'backward') {
        if (isAtLastFrame) {
          logger.debug('🚫 At last frame - cannot reverse to forward');
          if (isTouchEvent && isMobile) {
            e.preventDefault();
            e.stopPropagation();
          }
          return;
        }
        logger.debug('⏩ FORWARD - User scrolled down during backward play');
        setState(prev => ({
          ...prev,
          playDirection: 'forward'
        }));
        scrollAccumulatorRef.current = 0;
        startAutoPlay();
      }
    }

    lastScrollTimeRef.current = now;
  }, [state, setState, currentFrameRef, scrollAccumulatorRef, frameImageRef, getTotalFramesForDevice, getFrameImageSrcForDevice, startAutoPlay, isModalOpen, isMobile]);

  return { handleWheel };
};

