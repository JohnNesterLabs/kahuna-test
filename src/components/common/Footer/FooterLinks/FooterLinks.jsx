/**
 * FooterLinks Component
 * Displays footer navigation links and social media
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { handleExternalLink } from '../../../../utils/footer/linkHandlers';
import { logger } from '../../../../utils/logger';
import './FooterLinks.css';

const FooterLinks = () => {
  return (
    <div className="footer-links">
      <div className="footer-links-container">
        {/* Company Column */}
        <div className="footer-column">
          <h3 className="footer-column-title">COMPANY</h3>
          <ul className="footer-link-list">
            <li>
              <Link to="/about-us" className="footer-link">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="footer-link">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Technology Column */}
        <div className="footer-column">
          <h3 className="footer-column-title">TRANSFORMATION</h3>
          <ul className="footer-link-list">
            <li>
              <a 
                href="/documents/view" 
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Accelerate Frontline Productivity
              </a>
            </li>
            <li><a href="https://form.jotform.com/251278392049160"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              onClick={(e) => {
                logger.debug('Form link clicked');
                e.preventDefault();
                window.open('https://form.jotform.com/251278392049160', '_blank');
              }}>Estimate Your Troubleshooting Map<sup>™</sup></a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-column">
          <a
            href="https://linkedin.com/company/kahuna-labs"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            onClick={handleExternalLink('https://linkedin.com/company/kahuna-labs')}
          >
            <div className="footer-linkedin-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      <div className="footer-logo">
        <img src="/logos/kahuna-svg-logo.svg" alt="Kahuna Labs" />
      </div>
    </div>
  );
};

export default FooterLinks;

