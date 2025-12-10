import { Navigate, useLocation } from 'react-router-dom';
import { hasDocumentAccess } from '../../../utils/cookieUtils';

/**
 * ProtectedRoute component that checks for document access cookie
 * Redirects to access form if user doesn't have access
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const hasAccess = hasDocumentAccess();

  if (!hasAccess) {
    // Redirect to access form, preserving the intended destination
    return <Navigate to={`/access-form?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
};

export default ProtectedRoute;

