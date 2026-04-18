import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Send, Bot, Map, Navigation, CalendarClock, Activity, Users, ShieldAlert } from 'lucide-react';
import { processAssistantQuery, sanitizeInput } from '../../utils/assistantLogic';

/** @type {Array<{label:string,icon:JSX.Element,query:string}>} */
const SUGGESTIONS = [
  { label: 'Restroom',    icon: <Activity size={13} />,     query: 'Find nearest restroom' },
  { label: 'Food & Drinks', icon: <Activity size={13} />,   query: 'I want food with no wait time' },
  { label: 'Crowd Levels', icon: <Users size={13} />,       query: 'Show me crowd heatmap' },
  { label: 'Schedule',    icon: <CalendarClock size={13} />, query: 'Show me the schedule' },
  { label: 'Venue Map',   icon: <Map size={13} />,          query: 'Show me the venue map' },
  { label: 'Parking',     icon: <Navigation size={13} />,   query: 'Where should I park?' },
  { label: 'Emergency',   icon: <ShieldAlert size={13} />,  query: 'I need emergency help' },
];

/**
 * Message bubble sub-component.
 * @param {{ msg: object }} props
 */
const MessageBubble = ({ msg }) => (
  <div className={`message-wrapper ${msg.sender}`} role="listitem">
    <div className="message-bubble" style={{ whiteSpace: 'pre-line' }}>
      {msg.text}
    </div>
    {msg.type === 'map' && msg.mapQuery && (
      <div className="map-embed" role="region" aria-label="Google Maps navigation embed">
        <iframe
          title={`Google Maps – ${msg.mapQuery.replace(/\+/g, ' ')}`}
          src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(msg.mapQuery)}&t=&z=15&ie=UTF8&iwloc=B&output=embed`}
          loading="lazy"
          aria-label="Interactive Google Map showing navigation route"
        />
      </div>
    )}
  </div>
);

MessageBubble.propTypes = {
  msg: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sender: PropTypes.oneOf(['user', 'assistant']).isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'map']).isRequired,
    mapQuery: PropTypes.string,
  }).isRequired,
};

/**
 * Main chat interface component.
 * Provides a conversational UI for the VenueFlow AI Concierge.
 */
const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'text',
      text: '👋 Welcome to VenueFlow! I am your AI Event Concierge.\n\nUse the quick buttons below or ask me anything about restrooms, food, the schedule, crowd levels, parking, or emergencies!',
      sender: 'assistant',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Mock context – in production sourced from GPS / ticket scan
  const userContext = useMemo(() => ({ section: '104', time: new Date() }), []);

  /** Scrolls the chat container to the bottom after DOM paint. */
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 80);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  /**
   * Sends a message to the AI logic engine and appends the response.
   * @param {string|null} forcedText - Pre-filled text from chip buttons
   */
  const handleSend = useCallback(async (forcedText = null) => {
    const rawText = forcedText ?? inputValue;
    const safeText = sanitizeInput(rawText);
    if (!safeText) return;

    const userMsg = { id: Date.now(), type: 'text', text: safeText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const response = await processAssistantQuery(safeText, userContext);
    const assistantMsg = { id: Date.now() + 1, ...response, sender: 'assistant' };
    setIsTyping(false);
    setMessages(prev => [...prev, assistantMsg]);
  }, [inputValue, userContext]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <>
      {/* Skip-to-content link for keyboard users */}
      <a href="#chat-input" className="skip-link">Skip to chat input</a>

      {/* Scrollable chat messages */}
      <div
        className="app-content"
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation with VenueFlow AI Concierge"
        aria-relevant="additions"
      >
        <div className="chat-container" role="list">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          {isTyping && (
            <div className="message-wrapper assistant" role="listitem" aria-live="assertive">
              <div className="message-bubble" style={{ opacity: 0.6 }} aria-label="Assistant is typing">
                <Bot size={14} aria-hidden="true" /> &nbsp;Analyzing venue data...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick-action suggestion chips */}
      <nav className="chips-wrapper" aria-label="Quick action shortcuts">
        <div className="suggestion-chips">
          {SUGGESTIONS.map((item) => (
            <button
              key={item.label}
              className="chip"
              onClick={() => handleSend(item.query)}
              aria-label={`Quick action: ${item.label}`}
              type="button"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }} aria-hidden="true">
                {item.icon} {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Chat input bar */}
      <div className="input-area" role="form" aria-label="Send a message">
        <label htmlFor="chat-input" className="visually-hidden">
          Ask the VenueFlow concierge
        </label>
        <input
          id="chat-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-field"
          placeholder="Ask your concierge..."
          aria-label="Type your question for the concierge"
          maxLength={500}
          autoComplete="off"
          spellCheck="true"
        />
        <button
          className="send-button"
          onClick={() => handleSend()}
          aria-label="Send message"
          type="button"
          disabled={isTyping}
        >
          <Send size={18} aria-hidden="true" />
        </button>
      </div>
    </>
  );
};

export default ChatInterface;
