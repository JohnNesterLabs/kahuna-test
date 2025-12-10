import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PromotionalSection.css';

const PromotionalSection = ({ onNavigate }) => {
    const navigate = useNavigate();

    const handleCTAClick = () => {
        const isMobile = window.innerWidth <= 768;
        const targetFrame = isMobile ? 39 : 65; // Mobile lands on 39, desktop on 65

        sessionStorage.setItem('navigatingToFrame71', 'true');
        sessionStorage.setItem('targetFrame', targetFrame.toString());

        if (onNavigate) {
            onNavigate();
        }

        setTimeout(() => {
            navigate('/');
        }, 50);
    };

    return (
        <section className="blog-promotional-section">
            <div className="promotional-background">
                <img src="/images/image2.png" alt="Background" className="promotional-bg-image" />
                <div className="promotional-overlay"></div>
            </div>
            <div className="promotional-content">
                <div className="promotional-text-container">
                    <p className="promotional-subtitle">Evaluate Our Core Offering</p>
                    <h2 className="promotional-title">
                        <span className="promotional-title-line1">Explore Kahuna AI</span>
                    </h2>
                    <button 
                        className="promotional-cta-button"
                        onClick={handleCTAClick}
                    >
                        Take me there <img src="/icons/arrow right icon.svg" alt="Arrow" className="promotional-cta-icon" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PromotionalSection;

