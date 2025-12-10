/**
 * FooterOverlay Component
 * Displays footer overlay when animation reaches the final frame
 */
import React from 'react';
import Footer from '../../../components/common/Footer/Footer.jsx';
import './FooterOverlay.css';

const FooterOverlay = ({ shouldShowFooter }) => {
  const overlayClasses = [
    'footer-overlay',
    shouldShowFooter ? 'footer-overlay--visible' : 'footer-overlay--hidden'
  ].filter(Boolean).join(' ');

  return (
    <div
      id="footerWrapper"
      data-footer-visible={shouldShowFooter}
      className={overlayClasses}
      aria-hidden={!shouldShowFooter}
    >
      <Footer />
    </div>
  );
};

export default FooterOverlay;

