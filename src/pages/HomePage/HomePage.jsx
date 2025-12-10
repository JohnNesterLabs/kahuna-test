import React, { useEffect, useRef, useCallback } from 'react';
import { MemoryRouter, useInRouterContext } from 'react-router-dom';
import Header from '../../components/common/Header/Header.jsx';
import WebPSequence from '../../components/homepage/WebPSequence/WebPSequence.jsx';
import VideoModal from '../../components/homepage/VideoModal/VideoModal.jsx';
import FooterOverlay from '../../components/homepage/FooterOverlay/FooterOverlay.jsx';
import HeroVideo from '../../components/homepage/HeroVideo/HeroVideo.jsx';
import NavigationLoader from '../../components/homepage/NavigationLoader/NavigationLoader.jsx';

// Custom Hooks
import { useDeviceDetection } from '../../hooks/homepage/useDeviceDetection';
import { useWebPSequence } from '../../hooks/homepage/useWebPSequence';
import { useScrollHandler } from '../../hooks/homepage/useScrollHandler';
import { useVideoModal } from '../../hooks/homepage/useVideoModal';
import { useNavigationLoader } from '../../hooks/homepage/useNavigationLoader';

// Config
import { CONFIG, TICKET_TO_FRAME_MAPPING } from '../../config/homepage/constants';

/**
 * HomePage - Main homepage component with WebP sequence animation
 * 
 * This component orchestrates the WebP sequence animation with:
 * - Auto-play animation loop
 * - Pause/resume at specific frames
 * - Scroll direction control
 * - Frame navigation
 * - Deep link navigation support
 */
function HomePageContent() {
  // Refs for DOM elements
  const frameImageRef = useRef(null);
  const webpSequenceContainerRef = useRef(null);

  // Custom hooks
  const { isMobile, isDeviceReady } = useDeviceDetection();
  const {
    state,
    setState,
    currentFrameRef,
    scrollAccumulatorRef,
    getTotalFramesForDevice,
    getFrameImageSrcForDevice,
    isPauseFrameForDevice,
    setFrame,
    startAutoPlay
  } = useWebPSequence(isMobile, frameImageRef);

  const { isModalOpen, activeVideoSrc, handleIconClick, handleCloseModal } = useVideoModal(isMobile);

  const totalFrames = getTotalFramesForDevice();
  const {
    showNavigationLoader,
    navigationImageReady,
    setNavigationImageReady,
    navigationTargetFrameRef,
    navigationLoaderStartRef,
    navigationLoaderFallbackTimeoutRef,
    finishNavigationLoader
  } = useNavigationLoader(isDeviceReady, totalFrames, isMobile);

  const { handleWheel } = useScrollHandler(
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
  );

  // Check if current frame should show clickable icon
  const shouldShowIcon = useCallback(() => {
    return state.isPaused && state.isVisible && isPauseFrameForDevice(state.currentFrame);
  }, [state.isPaused, state.isVisible, state.currentFrame, isPauseFrameForDevice]);

  // Handle icon click with current frame
  const onIconClick = useCallback(() => {
    handleIconClick(currentFrameRef.current);
  }, [handleIconClick, currentFrameRef]);

  // Helper function to convert ticket number to frame number based on device
  const getFrameFromTicket = useCallback((ticketNumber, isMobileDevice) => {
    const mapping = isMobileDevice ? TICKET_TO_FRAME_MAPPING.mobile : TICKET_TO_FRAME_MAPPING.desktop;
    return mapping[ticketNumber] || null;
  }, []);

  // Check for frame or ticket parameter synchronously to avoid initial flash
  const hasFrameParam = React.useMemo(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    const urlTicketParam = urlParams.get('ticket');
    const urlFrameParam = urlParams.get('frame');
    
    // Check ticket parameter first (preferred)
    if (urlTicketParam) {
      const parsedTicket = parseInt(urlTicketParam, 10);
      if (!Number.isNaN(parsedTicket) && parsedTicket >= 1 && parsedTicket <= 4) {
        return true;
      }
    }
    
    // Fall back to frame parameter (backward compatibility)
    if (urlFrameParam) {
      const parsedFrame = parseInt(urlFrameParam, 10);
      return !Number.isNaN(parsedFrame) && parsedFrame > 0;
    }
    return false;
  }, []);

  // Initialize animation on mount (skip if frame param exists to avoid flash)
  useEffect(() => {
    // If there's a frame parameter, don't initialize to frame 1 - let the frame param effect handle it
    if (hasFrameParam) {
      return;
    }
    
    if (frameImageRef.current) {
      frameImageRef.current.src = getFrameImageSrcForDevice(1);
    }
    if (webpSequenceContainerRef.current) {
      webpSequenceContainerRef.current.classList.add('visible');
    }
  }, [getFrameImageSrcForDevice, hasFrameParam]);

  // Handle deep links that request a specific frame (e.g. CTA from blog page or URL parameter)
  useEffect(() => {
    if (!isDeviceReady) {
      return;
    }

    // Check URL parameter first (for shareable links like ?ticket=1 or ?frame=50)
    const urlParams = new URLSearchParams(window.location.search);
    const urlTicketParam = urlParams.get('ticket');
    const urlFrameParam = urlParams.get('frame');
    let targetFrame = null;

    // Priority 1: Check ticket parameter (device-agnostic, maps to correct frame)
    if (urlTicketParam) {
      const parsedTicket = parseInt(urlTicketParam, 10);
      if (!Number.isNaN(parsedTicket) && parsedTicket >= 1 && parsedTicket <= 4) {
        const frameFromTicket = getFrameFromTicket(parsedTicket, isMobile);
        if (frameFromTicket) {
          targetFrame = frameFromTicket;
          // Set sessionStorage flag so navigation loader shows (compatible with existing logic)
          sessionStorage.setItem('navigatingToFrame71', 'true');
          sessionStorage.setItem('targetFrame', targetFrame.toString());
          // Clean up URL parameter after reading it (optional - comment out if you want to keep it in URL)
          // window.history.replaceState({}, '', window.location.pathname);
        }
      } else {
        // Invalid ticket parameter - clear URL and fallback to default
        window.history.replaceState({}, '', window.location.pathname);
      }
    }

    // Priority 2: Fall back to frame parameter (backward compatibility)
    if (!targetFrame && urlFrameParam) {
      const parsedFrame = parseInt(urlFrameParam, 10);
      if (!Number.isNaN(parsedFrame) && parsedFrame > 0) {
        targetFrame = parsedFrame;
        // Set sessionStorage flag so navigation loader shows (compatible with existing logic)
        sessionStorage.setItem('navigatingToFrame71', 'true');
        sessionStorage.setItem('targetFrame', targetFrame.toString());
        // Clean up URL parameter after reading it (optional - comment out if you want to keep it in URL)
        // window.history.replaceState({}, '', window.location.pathname);
      }
    }

    // Fall back to sessionStorage if no URL parameter
    if (!targetFrame) {
      const navigatingToFrame = sessionStorage.getItem('navigatingToFrame71') === 'true';
      const storedTargetFrame = parseInt(sessionStorage.getItem('targetFrame') || '0', 10);

      if (navigatingToFrame && !Number.isNaN(storedTargetFrame) && storedTargetFrame > 0) {
        targetFrame = storedTargetFrame;
      }
    }

    if (!targetFrame) {
      // No target frame - initialize normally if not already done
      if (frameImageRef.current && !frameImageRef.current.src) {
        frameImageRef.current.src = getFrameImageSrcForDevice(1);
      }
      if (webpSequenceContainerRef.current && !webpSequenceContainerRef.current.classList.contains('visible')) {
        webpSequenceContainerRef.current.classList.add('visible');
      }
      return;
    }

    // IMMEDIATELY hide content to prevent any flash
    setState(prev => ({ ...prev, isVisible: false }));
    if (webpSequenceContainerRef.current) {
      webpSequenceContainerRef.current.classList.remove('visible');
    }

    // Clean up sessionStorage after reading (works for both URL params and sessionStorage)
    sessionStorage.removeItem('navigatingToFrame71');
    sessionStorage.removeItem('targetFrame');

    navigationLoaderStartRef.current = Date.now();
    setNavigationImageReady(false);

    const clampedFrame = Math.max(1, Math.min(targetFrame, totalFrames));
    navigationTargetFrameRef.current = clampedFrame;
    
    const imageEl = frameImageRef.current;
    if (!imageEl) {
      finishNavigationLoader();
      return;
    }

    const handleImageLoad = () => {
      setNavigationImageReady(true);
      // Show container and content once image is loaded
      if (webpSequenceContainerRef.current) {
        webpSequenceContainerRef.current.classList.add('visible');
      }
      setState(prev => ({ ...prev, isVisible: true }));
      imageEl.removeEventListener('load', handleImageLoad);
    };

    // Set up load listener before setting frame (which sets image src)
    imageEl.addEventListener('load', handleImageLoad);
    
    setFrame(clampedFrame, {
      isAutoPlaying: false,
      isPaused: isPauseFrameForDevice(clampedFrame),
      isVisible: false // Hide content until image loads
    });

    // Check if image is already loaded (might be cached)
    if (imageEl.complete && imageEl.naturalWidth > 0) {
      handleImageLoad();
    }

    if (navigationLoaderFallbackTimeoutRef.current) {
      clearTimeout(navigationLoaderFallbackTimeoutRef.current);
    }
    navigationLoaderFallbackTimeoutRef.current = setTimeout(() => {
      finishNavigationLoader();
    }, CONFIG.maxNavLoaderDuration);

    return () => {
      imageEl.removeEventListener('load', handleImageLoad);
      if (navigationLoaderFallbackTimeoutRef.current) {
        clearTimeout(navigationLoaderFallbackTimeoutRef.current);
      }
    };
  }, [
    isDeviceReady,
    getFrameImageSrcForDevice,
    isPauseFrameForDevice,
    totalFrames,
    finishNavigationLoader,
    setFrame,
    frameImageRef,
    navigationLoaderFallbackTimeoutRef,
    navigationLoaderStartRef,
    navigationTargetFrameRef,
    setNavigationImageReady,
    setState,
    webpSequenceContainerRef,
    isMobile,
    getFrameFromTicket
  ]);

  // Check if navigation loader should finish
  useEffect(() => {
    if (!navigationTargetFrameRef.current || !navigationImageReady) {
      return;
    }

    const targetFrame = navigationTargetFrameRef.current;
    if (Math.abs(state.currentFrame - targetFrame) <= 0) {
      finishNavigationLoader();
    }
  }, [state.currentFrame, navigationImageReady, finishNavigationLoader, navigationTargetFrameRef]);

  // Wheel and touch events for frame control
  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleWheel);
      window.removeEventListener('touchstart', handleWheel);
    };
  }, [handleWheel]);

  // Calculate visibility states
  const shouldShowFooter = state.currentFrame >= totalFrames;
  const shouldShowHeroVideo = !shouldShowFooter && state.currentFrame <= CONFIG.heroVideoLastFrame;

  return (
    <>
      <Header />
      
      {/* Hero video overlay */}
      <HeroVideo shouldShowHeroVideo={shouldShowHeroVideo} />

      {/* WebP Sequence Component */}
      <WebPSequence
        webpSequenceContainerRef={webpSequenceContainerRef}
        frameImageRef={frameImageRef}
        isVisible={state.isVisible}
        shouldShowIcon={shouldShowIcon()}
        onIconClick={onIconClick}
        currentFrame={state.currentFrame}
        shouldFadeOut={shouldShowFooter}
      />

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoSrc={activeVideoSrc}
      />

      {/* Footer overlay on final frame */}
      <FooterOverlay shouldShowFooter={shouldShowFooter} />

      {/* Navigation Loader */}
      <NavigationLoader show={showNavigationLoader} />
    </>
  );
}

function HomePage() {
  const isInRouter = useInRouterContext();
  if (isInRouter) {
    return <HomePageContent />;
  }
  return (
    <MemoryRouter>
      <HomePageContent />
    </MemoryRouter>
  );
}

export default HomePage;
