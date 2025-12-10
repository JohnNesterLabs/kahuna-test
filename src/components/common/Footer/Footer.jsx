import React, { useRef } from 'react';
import './Footer.css';

// Custom Hooks
import { useWordCarousel } from '../../../hooks/footer/useWordCarousel';

// Sub-components
import FooterLogo from './FooterLogo/FooterLogo';
import FooterHero from './FooterHero/FooterHero';
import FooterLinks from './FooterLinks/FooterLinks';
import FooterBottom from './FooterBottom/FooterBottom';

/**
 * Footer Component
 * Main footer section with hero text, word carousel, links, and legal information
 */
const Footer = () => {
  const footerRef = useRef(null);
  const { wordLoopRef } = useWordCarousel(footerRef);

  return (
    <div className="footer-section" id="footerWrapper" ref={footerRef}>
      {/* Large Abstract Logo - Top Half Cut */}
      <FooterLogo />

      <div className="footer-container">
        {/* Main Content Area */}
        <div className="footer-main">
          {/* Hero Text */}
          <FooterHero wordLoopRef={wordLoopRef} />

          {/* Links Section */}
          <FooterLinks />
        </div>

        {/* Bottom Section */}
        <FooterBottom />
      </div>
    </div>
  );
};

export default Footer;
