import React from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Section from '../../components/common/Section/Section';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { PRIVACY_POLICY_CONFIG, PRIVACY_POLICY_SECTIONS } from '../../config/privacyPolicy/constants';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  useScrollToTop();

  return (
    <>
      <Header />
      <div className="privacy-policy-page">
        <div className="privacy-policy-container">
          <div className="privacy-policy-content">
            <div className="privacy-policy-header">
              <h1>Privacy Policy</h1>
              <p className="last-updated">
                Last updated <span>{PRIVACY_POLICY_CONFIG.lastUpdated}</span>
              </p>
            </div>
            
            {PRIVACY_POLICY_SECTIONS.map((section) => (
              <Section key={section.id} id={section.id} title={section.title}>
                {section.content}
              </Section>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
