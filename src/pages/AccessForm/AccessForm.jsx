import React, { useRef, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { useTallyScript } from '../../hooks/accessForm/useTallyScript';
import { storeRedirect } from '../../utils/accessForm/redirectStorage';
import { getTallyEmbedUrl, DEFAULT_REDIRECT } from '../../config/accessForm/constants';
import Loader from '../../components/common/Loader/Loader';
import './AccessForm.css';

/**
 * AccessForm Component
 * Displays a Tally form embedded in an iframe for document access requests
 * Stores redirect path in sessionStorage for use after form submission
 */
const AccessForm = () => {
  const [searchParams] = useSearchParams();
  const iframeRef = useRef(null);
  const isFrameLoaded = useTallyScript();
  
  // Scroll to top on mount
  useScrollToTop();

  // Get redirect from URL params or use default
  const redirect = useMemo(() => {
    return searchParams.get('redirect') || DEFAULT_REDIRECT;
  }, [searchParams]);

  // Store redirect in sessionStorage so GrantAccess can retrieve it
  useEffect(() => {
    storeRedirect(redirect);
  }, [redirect]);

  // Memoize Tally embed URL
  const tallyEmbedUrl = useMemo(() => getTallyEmbedUrl(), []);

  return (
    <div className="access-form-container">
      {!isFrameLoaded && <Loader />}
      <iframe
        ref={iframeRef}
        data-tally-src={tallyEmbedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Access Form"
        className="tally-iframe"
        onLoad={() => {
          // Fallback: if Tally message doesn't fire, use standard load event
          // Note: Tally script might replace/modify iframe, so this is just a backup
          // The useTallyScript hook handles the main loading logic
        }}
      />
    </div>
  );
};

export default AccessForm;

