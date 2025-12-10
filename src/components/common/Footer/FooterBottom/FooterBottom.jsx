/**
 * FooterBottom Component
 * Displays legal text and copyright information
 */
import React from 'react';
import './FooterBottom.css';

const FooterBottom = () => {
  return (
    <div className="footer-bottom">
      <div className="footer-bottom-left">
        <p className="footer-legal-text">
          Kahuna AI, Troubleshooting Map and its components are trademarks of Kahuna Labs.
        </p>
        <p className="footer-legal-text">
          The proprietary technology of Kahuna AI is protected by multiple issued and pending U.S. and international patents owned by Kahuna Labs.
        </p>
      </div>
      <div className="footer-bottom-right">
        <p className="footer-rights-text">All rights reserved.</p>
      </div>
    </div>
  );
};

export default FooterBottom;

