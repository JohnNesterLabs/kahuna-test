import React, { useEffect } from 'react';
import Header from '../../components/common/Header/Header.jsx';
import Footer from '../../components/common/Footer/Footer.jsx';
import HeroSection from '../../components/aboutuspage/HeroSection/HeroSection';
import CustomersSection from '../../components/aboutuspage/CustomersSection/CustomersSection';
import LeadershipSection from '../../components/aboutuspage/LeadershipSection/LeadershipSection';
import InvestorsSection from '../../components/aboutuspage/InvestorsSection/InvestorsSection';
import CareersSection from '../../components/aboutuspage/CareersSection/CareersSection';
import './AboutUsPage.css';

const AboutUsPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="about-us-page">
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="about-us-page__main">
        {/* Hero Section - Position: 0-900px */}
        <HeroSection />

        {/* Our Customers Section - Position: 900-1696px */}
        <CustomersSection />

        {/* Our Leadership Section - Position: 1696-3076px */}
        <LeadershipSection />

        {/* Our Investors Section - Position: 3076-3640px */}
        <InvestorsSection />

        {/* Careers Section - Position: 3640-4456px */}
        <CareersSection />

        {/* Footer - Position: 4456-5244px */}
        <Footer />
      </main>
    </div>
  );
};

export default AboutUsPage;
