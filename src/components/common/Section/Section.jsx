import React from 'react';
import './Section.css';

const Section = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`policy-section ${className}`.trim()}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
};

export default Section;
