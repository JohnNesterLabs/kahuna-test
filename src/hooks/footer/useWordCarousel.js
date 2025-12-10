/**
 * Custom hook for word carousel animation
 * Handles the rotating text carousel in the footer CTA box
 */
import { useRef, useCallback, useEffect } from 'react';
import { CAROUSEL_TEXTS, CAROUSEL_CONFIG } from '../../config/footer/constants';

export const useWordCarousel = (footerRef) => {
  const wordLoopRef = useRef(null);
  const idxRef = useRef(0);
  const timeoutRef = useRef(null);
  const isVisibleRef = useRef(false);

  // Helper function to create word span
  const makeSpan = useCallback((text, cls = '') => {
    const span = document.createElement('span');
    span.className = 'word ' + cls;
    span.textContent = text;
    return span;
  }, []);

  // Next step in the animation
  const nextStep = useCallback(() => {
    if (!wordLoopRef.current || !isVisibleRef.current) return;

    const container = wordLoopRef.current;
    const current = container.querySelector('.word.in-place');
    const nextIndex = (idxRef.current + 1) % CAROUSEL_TEXTS.length;
    const next = makeSpan(CAROUSEL_TEXTS[nextIndex], 'below');

    container.appendChild(next);

    // Force reflow so transitions run reliably
    void next.offsetWidth;

    // Animate: current slides up, next slides into place
    if (current) {
      current.classList.remove('in-place');
      current.classList.add('slide-up');
    }

    next.classList.remove('below');
    next.classList.add('in-place');

    // Cleanup after animation: remove old slide-up element
    timeoutRef.current = setTimeout(() => {
      const old = container.querySelectorAll('.word.slide-up');
      old.forEach(o => o.remove());
      idxRef.current = nextIndex;

      if (isVisibleRef.current) {
        timeoutRef.current = setTimeout(nextStep, CAROUSEL_CONFIG.visibleMs);
      }
    }, CAROUSEL_CONFIG.transitionMs + 20);
  }, [makeSpan]);

  // Initialize word loop
  const initWordLoop = useCallback(() => {
    if (!wordLoopRef.current) return;

    // Clear any existing words
    wordLoopRef.current.innerHTML = '';

    // Place first word only
    const first = makeSpan(CAROUSEL_TEXTS[0], 'in-place');
    wordLoopRef.current.appendChild(first);
    idxRef.current = 0;

    // Start the loop
    timeoutRef.current = setTimeout(nextStep, CAROUSEL_CONFIG.visibleMs);
  }, [makeSpan, nextStep]);

  // Resume loop if it's not running
  const resumeLoop = useCallback(() => {
    if (!wordLoopRef.current || !isVisibleRef.current) return;

    // If loop is already running, don't restart
    if (timeoutRef.current) return;

    // If there's a word in place, continue from current index
    const currentWord = wordLoopRef.current.querySelector('.word.in-place');
    if (currentWord) {
      // Loop is already set up, just resume it
      timeoutRef.current = setTimeout(nextStep, CAROUSEL_CONFIG.visibleMs);
    } else {
      // No words, initialize fresh
      initWordLoop();
    }
  }, [nextStep, initWordLoop]);

  // Intersection Observer to detect when footer comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisibleRef.current = true;
          resumeLoop();
        } else {
          isVisibleRef.current = false;
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }
      },
      {
        threshold: CAROUSEL_CONFIG.threshold,
        rootMargin: CAROUSEL_CONFIG.rootMargin
      }
    );

    const currentFooterRef = footerRef.current;
    if (currentFooterRef) {
      observer.observe(currentFooterRef);
    }

    return () => {
      if (currentFooterRef) {
        observer.unobserve(currentFooterRef);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [footerRef, resumeLoop]);

  return { wordLoopRef };
};

