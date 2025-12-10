/**
 * Application Routes Configuration
 * Centralized route definitions for better maintainability
 */
import React from 'react';
import HomePage from '../../pages/HomePage/HomePage';
import BlogListing from '../../pages/BlogListing/BlogListing';
import BlogDetail from '../../pages/BlogDetail/BlogDetail';
import AboutUsPage from '../../pages/AboutUs/AboutUsPage';
import PrivacyPolicy from '../../pages/PrivacyPolicy/PrivacyPolicy';
import AccessForm from '../../pages/AccessForm/AccessForm';
import GrantAccess from '../../pages/GrantAccess/GrantAccess';
import ViewDocument from '../../pages/ViewDocument/ViewDocument';
import ProtectedRoute from '../../components/common/ProtectedRoute/ProtectedRoute';

/**
 * Public routes that don't require authentication
 */
export const publicRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/blog', element: <BlogListing /> },
  { path: '/blog-detail', element: <BlogDetail /> },
  { path: '/about-us', element: <AboutUsPage /> },
  { path: '/privacy-policy', element: <PrivacyPolicy /> },
  { path: '/access-form', element: <AccessForm /> },
  { path: '/grant-access', element: <GrantAccess /> },
];

/**
 * Protected routes that require document access
 */
export const protectedRoutes = [
  { 
    path: '/documents/view', 
    element: (
      <ProtectedRoute>
        <ViewDocument />
      </ProtectedRoute>
    )
  },
];
