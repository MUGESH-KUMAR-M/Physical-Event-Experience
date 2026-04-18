import React, { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ChatInterface from './components/Assistant/ChatInterface';
import { ShieldAlert } from 'lucide-react';
import './index.css';

/**
 * Root application component.
 * Wraps the chat interface with an ErrorBoundary and Suspense for resilience.
 */
function App() {
  return (
    <ErrorBoundary>
      <div className="app-container">
        <header className="app-header" role="banner">
          <div className="header-title" aria-label="VenueFlow Concierge Application">
            VenueFlow Concierge
          </div>
          <button
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            aria-label="Emergency Alerts — contact venue security"
            type="button"
          >
            <ShieldAlert size={24} aria-hidden="true" />
          </button>
        </header>

        <main
          style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', minHeight: 0 }}
          role="main"
          aria-label="VenueFlow AI Chat Concierge"
        >
          <Suspense fallback={
            <div style={{ padding: '20px', color: 'var(--text-secondary)', textAlign: 'center' }}>
              Loading concierge...
            </div>
          }>
            <ChatInterface />
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
