import React, { useState, useEffect } from 'react';
import { logger } from '../../../utils/logger';
import './CareersSection.css';

const CareersSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section className="careers">
      {/* Background */}
      <div className="careers__background" />

      {/* Content */}
      <div className="careers__content">
        <div className="careers__main">
          {/* Text Content */}
          <div className="careers__text-content">
            <div className="careers__header">
              <span className="careers__tag">Careers</span>
              {isMobile ? (
                <h2 className="careers__title">Let’s build the <br />
                next big thing together</h2>
              ) : (
                <h2 className="careers__title">Let’s build the <br />
                next big thing together</h2>
              )}
           
            </div>

            <div className="careers__body">
              <p className="careers__paragraph">
                {isMobile ? (
                  <>
                    <span> Solve the hard problems.</span> <br />
                    <span> The challenges we face are unique.</span>
                  </>
                ) : (
                  <>
                    <span> Solve the hard problems.</span>
                    <span> The challenges we face are unique.</span>
                  </>
                )}
              </p>
              <p className="careers__paragraph">&nbsp;</p>
              <p className="careers__paragraph">
                If you're passionate about transforming frontline productivity with AI, we want to talk to you.
              </p>
            </div>
          </div>

          {/* Hiring Info */}
          <div className="careers__hiring">
            <div className="careers__chip">
              <span className="careers__chip-dot" />
              <span className="careers__chip-text">Actively Hiring</span>
            </div>
            <p className="careers__roles">AI/ML Researchers & Engineers</p>
          </div>
        </div>

        {/* CTA Cards */}
        <div className="careers__ctas">
          {/* Resume Card */}
          <div className="careers__cta-card">
            <p className="careers__cta-text">Send us your resume</p>
            <a 
              href="mailto:careers@kahunalabs.ai"
              className="careers__cta-button careers__cta-button--primary"
              onClick={(e) => {
                logger.debug('Careers link clicked');
                e.preventDefault();
                window.location.href = 'mailto:careers@kahunalabs.ai';
              }}
            >
              <span>careers@kahunalabs.ai</span>
              <img src="/images/arrow-top-left-icon.png" alt="Arrow" className="careers__cta-icon" />
            </a>
          </div>
        </div>

        {/* Contact Card */}
        <div className="careers__contact-card">
          <h3 className="careers__contact-title">Contact us</h3>
          <p className="careers__contact-address">1731 Technology Drive Suite 670 <br /> San Jose, CA 95110</p>
          <a href="mailto:info@kahunalabs.ai" className="careers__contact-button">
            <span>info@kahunalabs.ai</span>
            <img src="/images/arrow-top-left-icon-blk.png" alt="Arrow" className="careers__contact-icon" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;
