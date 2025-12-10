import React from 'react';
import './BioModal.css';

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#74797b" />
  </svg>
);

const BioModal = ({ isOpen, onClose, leader }) => {
  if (!leader) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`bio-modal__overlay ${isOpen ? 'bio-modal__overlay--open' : ''}`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`bio-modal ${isOpen ? 'bio-modal--open' : ''}`}>
        {/* Close Button */}
        <button className="bio-modal__close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Content */}
        <div className="bio-modal__content">
          {/* Image */}
          <div className="bio-modal__image-container">
            <img src={leader.image} alt={leader.name} className="bio-modal__image" />
          </div>

          {/* Name and Role */}
          <div className="bio-modal__header">
            <h2 className="bio-modal__name">{leader.name}</h2>
            <p className="bio-modal__role">{leader.role}</p>
          </div>

          {/* Biography */}
          <div className="bio-modal__bio">
            {leader.bio && leader.bio.map((paragraph, index) => (
              <p key={index} className="bio-modal__paragraph">{paragraph}</p>
            ))}
          </div>

          {/* Divider */}
          <div className="bio-modal__divider" />

          {/* LinkedIn */}
          <a
            href={leader.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bio-modal__linkedin"
            aria-label={`${leader.name}'s LinkedIn`}
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </>
  );
};

export default BioModal;

