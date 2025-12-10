import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { setAccessCookie } from '../../utils/cookieUtils';
import { getRedirect, clearRedirect } from '../../utils/accessForm/redirectStorage';
import { DEFAULT_REDIRECT } from '../../config/accessForm/constants';
import Loader from '../../components/common/Loader/Loader';

const GrantAccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // Get redirect from URL params first, then fall back to sessionStorage, then default
  const redirect = searchParams.get('redirect') || 
                   getRedirect() || 
                   DEFAULT_REDIRECT;

  useEffect(() => {
    // Set the access cookie
    setAccessCookie('true');
    
    // Clear the stored redirect from sessionStorage
    clearRedirect();
    
    // Small delay to ensure cookie is set, then redirect
    const timer = setTimeout(() => {
      navigate(redirect, { replace: true });
    }, 100);

    return () => clearTimeout(timer);
  }, [navigate, redirect]);

  return <Loader />;
};

export default GrantAccess;
