/**
 * @module ErrorBoundary
 * @description React class-based Error Boundary to catch rendering errors
 * and show a graceful fallback UI instead of crashing the entire app.
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class ErrorBoundary
 * @extends React.Component
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  /**
   * Update state so next render shows fallback UI.
   * @param {Error} error
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  /**
   * Log error details for diagnostics.
   * @param {Error} error
   * @param {React.ErrorInfo} info
   */
  componentDidCatch(error, info) {
    console.error('[VenueFlow ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            padding: '32px',
            textAlign: 'center',
            color: '#f8fafc',
            background: '#09090b',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <span style={{ fontSize: '3rem' }}>⚠️</span>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Something went wrong</h1>
          <p style={{ color: '#a1a1aa', fontSize: '0.9rem', maxWidth: '320px' }}>
            VenueFlow encountered an unexpected error. Please refresh the page or contact venue staff for assistance.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '16px',
              padding: '10px 24px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
            }}
            aria-label="Reload the application"
          >
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
