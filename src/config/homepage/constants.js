// Configuration constants
export const CONFIG = {
  startSection: 1, // Frame animation starts at section 2 (0-indexed: section 2 = index 1)
  totalFramesDesktop: 189, // Total number of frames for desktop
  totalFramesMobile: 158, // Total number of frames for mobile
  framePrefix: 'frame_',
  frameSuffix: '.webp',
  folderPathDesktop: '/frames/desktop/',
  folderPathMobile: '/frames/mobile/',
  framesPerSecond: 15,
  scrollThreshold: 100,
  pauseFramesDesktop: [65, 102, 127, 157], // Frames where animation pauses (desktop)
  pauseFramesMobile: [39, 65, 91, 117], // Frames where animation pauses (mobile)
  // Animation trigger offset (in viewport height units)
  // Positive values = start after section 2 begins (e.g., 0.2 = start when 20% of section 2 is visible)
  // Zero = start exactly when section 2 begins (at 1 * sectionHeight)
  // Negative values = start before section 2 begins (e.g., -0.2 = start 20% before section 2 would normally start)
  // Example: -0.3 means animation starts when scrollTop >= 0.7 * sectionHeight (30% before section 2)
  animationTriggerOffset: -1, // Start animation 20% before section 2 touches the viewport
  // Navigation loader timing
  minNavLoaderDuration: 2000, // Minimum duration for navigation loader (ms)
  maxNavLoaderDuration: 8000, // Maximum duration for navigation loader (ms)
  // Hero video configuration
  heroVideoLastFrame: 1, // Last frame where hero video should be visible
};

// Video sources for pause frames
export const VIDEO_MAPPING = {
  defaultSrc: '/videos/Ticket 1 Final (Compressed).mp4',
  desktop: {
    65: '/videos/Ticket 1 Final (Compressed).mp4',
    102: '/videos/Ticket-2.mp4',
    127: '/videos/Ticket-3.mp4',
    157: '/videos/Ticket-4.mp4'
  },
  mobile: {
    39: '/videos/Ticket 1 Final (Compressed).mp4',
    65: '/videos/Ticket-2.mp4',
    91: '/videos/Ticket-3.mp4',
    117: '/videos/Ticket-4.mp4'
  }
};

// Mapping from ticket number (1-4) to frame numbers for each device
// This allows using ?ticket=1 instead of ?frame=65 (desktop) or ?frame=39 (mobile)
export const TICKET_TO_FRAME_MAPPING = {
  desktop: {
    1: 65,   // Ticket 1 -> Frame 65 (desktop)
    2: 102,  // Ticket 2 -> Frame 102 (desktop)
    3: 127,  // Ticket 3 -> Frame 127 (desktop)
    4: 157   // Ticket 4 -> Frame 157 (desktop)
  },
  mobile: {
    1: 39,   // Ticket 1 -> Frame 39 (mobile)
    2: 65,   // Ticket 2 -> Frame 65 (mobile)
    3: 91,   // Ticket 3 -> Frame 91 (mobile)
    4: 117   // Ticket 4 -> Frame 117 (mobile)
  }
};
