import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useHeaderScroll } from '../../../hooks/header/useHeaderScroll';
import { getPageType } from '../../../utils/header/getPageType';
import { GLASS_EFFECT_SCROLL_THRESHOLD, GLASS_EFFECT_PAGES } from '../../../config/header/constants';
import './Header.css';

const Header = () => {
    const location = useLocation();
    const { isVisible, scrollY } = useHeaderScroll();

    // Memoize page type calculation
    const pageType = useMemo(() => getPageType(location.pathname), [location.pathname]);
    
    // Memoize glass effect calculation
    const shouldApplyGlassEffect = useMemo(() => {
        return GLASS_EFFECT_PAGES.includes(pageType) && scrollY > GLASS_EFFECT_SCROLL_THRESHOLD;
    }, [pageType, scrollY]);

    // Memoize header className
    const headerClassName = useMemo(() => {
        return shouldApplyGlassEffect 
            ? `main-header main-header--${pageType}`
            : 'main-header';
    }, [shouldApplyGlassEffect, pageType]);

    if (!isVisible) {
        return null;
    }

    return (
        <header className={headerClassName}>
            <div className="header-container">
                {/* Logo and Company Name */}
                <Link to="/" className="header-left">
                    <div className="header-logo">
                        <img src="/logos/kahuna-svg-logo.svg" alt="Kahuna Labs" className="header-logo-img" />
                    </div>
                </Link>

                {/* Call to Action Button */}
                <div className="header-right">
                    <a href="mailto:info@kahunalabs.ai" className="header-cta-button">
                        <span>Let's Talk</span>  
                        <img src="/icons/arrow right icon.png" alt="Arrow Right" className="arrow-right-icon" />
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
