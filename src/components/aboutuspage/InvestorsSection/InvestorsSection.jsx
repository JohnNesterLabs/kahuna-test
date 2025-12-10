import React from 'react';
import './InvestorsSection.css';

const InvestorsSection = () => {
  return (
    <section className="investors">
      <div className="investors__content">
        {/* Header */}
        <div className="investors__header">
          <span className="investors__tag">Our Investors</span>
          <h2 className="investors__title">Backed by the very best</h2>
        </div>

        {/* Logos */}
        <div className="investors__logos">
          <div className="investors__logo-container">
            <img src="/investors/investor1.png" alt="Investor 1" className="investor-logo investor-logo--1" />
          </div>
          <div className="investors__logo-container">
            <img src="/investors/investor2.png" alt="Investor 2" className="investor-logo investor-logo--2" />
          </div>
          <div className="investors__logo-container">
            <img src="/investors/investor3.png" alt="Investor 3" className="investor-logo investor-logo--3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorsSection;

