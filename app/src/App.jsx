import React from 'react';
import ChatInterface from './components/Assistant/ChatInterface';
import { ShieldAlert } from 'lucide-react';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-title">VenueFlow Concierge</div>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} aria-label="Emergency Alerts">
          <ShieldAlert size={24} />
        </button>
      </header>
      
      <main style={{ display:'flex', flexDirection:'column', flex:1, overflow:'hidden', minHeight:0 }}>
        <ChatInterface />
      </main>
    </div>
  );
}

export default App;
