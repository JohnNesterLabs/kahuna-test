import React from 'react';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import './ViewDocument.css';

/**
 * ViewDocument Component
 * Displays a PDF document in an iframe with download option
 * Protected route - requires document access
 */
const ViewDocument = () => {
  useScrollToTop();

  return (
    <div className="document-page">
      <div className="document-viewer-wrapper">
        <iframe
          src="/documents/20251031%20R%20Wang%20Big%20Idea%20Kahuna%20Frontline%20Courtesy.pdf"
          width="100%"
          height="800px"
          frameBorder="0"
          title="Document PDF"
          className="document-iframe"
        />
      </div>
      <div className="document-download">
        <a 
          href="/documents/20251031%20R%20Wang%20Big%20Idea%20Kahuna%20Frontline%20Courtesy.pdf" 
          download 
          className="download-link"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default ViewDocument;
