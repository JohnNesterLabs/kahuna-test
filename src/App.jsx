import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/common/Loader/Loader';
import MainLoader from './components/common/MainLoader/MainLoader.jsx';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import { useAppLoader } from './hooks/useAppLoader';
import { publicRoutes, protectedRoutes } from './config/app/routes';
import './App.css';

/**
 * Inner App component that uses router hooks
 * Must be inside BrowserRouter context
 */
function AppContent() {
  const {
    showLoader,
    loaderFadeOut,
    shouldSkipLoader,
    progress,
    loadedCount,
    totalAssets,
    error,
    handleLoaderComplete,
  } = useAppLoader();

  return (
    <div className="App">
      {showLoader && (
        shouldSkipLoader ? (
          <Loader />
        ) : (
          <MainLoader
            progress={progress}
            onComplete={handleLoaderComplete}
            fadeOut={loaderFadeOut}
            loadedCount={loadedCount}
            totalAssets={totalAssets}
            error={error}
          />
        )
      )}

      {!showLoader && (
        <Routes>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          {protectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          {/* Catch-all route: redirect unknown paths to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

