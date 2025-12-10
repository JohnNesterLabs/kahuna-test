/**
 * FooterHero Component
 * Displays the hero text and CTA box with word carousel
 */
import React from 'react';
import './FooterHero.css';

const FooterHero = ({ wordLoopRef }) => {
  return (
    <div className="footer-hero">
      <h1 className="footer-hero-title">
        <span className="footer-hero-line">Secure. Private.</span>
        <span className="footer-hero-line">Comprehensive.</span>
        <span className="footer-hero-line">Enterprise Grade.</span>
      </h1>
      {/* CTA Box */}
      <div className="footer-cta-box">
        <div className="carousel-container">
          <div className="word-loop" ref={wordLoopRef}></div>
        </div>
      </div>
    </div>
  );
};

export default FooterHero;

