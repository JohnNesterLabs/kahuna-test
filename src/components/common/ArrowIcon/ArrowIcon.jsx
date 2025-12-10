import React from 'react';

/**
 * ArrowIcon Component
 * A reusable arrow icon component
 * 
 * @param {number} size - Size of the icon (default: 16)
 * @param {string} color - Color of the icon (default: '#000000')
 */
const ArrowIcon = ({ size = 16, color = '#000000' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M6 12L10 8L6 4" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowIcon;

