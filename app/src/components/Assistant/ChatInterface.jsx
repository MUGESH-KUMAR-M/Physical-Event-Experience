import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Map, Navigation, CalendarClock, Activity, Users, ShieldAlert } from 'lucide-react';
import { processAssistantQuery } from '../../utils/assistantLogic';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'text', text: "👋 Welcome to VenueFlow! I am your AI Event Concierge.\n\nUse the quick buttons below or ask me anything about restrooms, food, the schedule, crowd levels, parking, or emergencies!", sender: 'assistant' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Mock Context — in production this would come from GPS / ticket scan
  const userContext = { section: '104', time: new Date() };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 80);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (forcedText = null) => {
    const textToSend = forcedText || inputValue;
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now(), type: 'text', text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const response = await processAssistantQuery(textToSend, userContext);

    const assistantMsg = { id: Date.now() + 1, ...response, sender: 'assistant' };
    setIsTyping(false);
    setMessages(prev => [...prev, assistantMsg]);
  };

  const suggestions = [
    { label: "Restroom", icon: <Activity size={13} />, query: "Find nearest restroom" },
    { label: "Food & Drinks", icon: <Activity size={13} />, query: "I want food with no wait time" },
    { label: "Crowd Levels", icon: <Users size={13} />, query: "Show me crowd heatmap" },
    { label: "Schedule", icon: <CalendarClock size={13} />, query: "Show me the schedule" },
    { label: "Venue Map", icon: <Map size={13} />, query: "Show me the venue map" },
    { label: "Parking", icon: <Navigation size={13} />, query: "Where should I park / exit?" },
    { label: "Emergency", icon: <ShieldAlert size={13} />, query: "I need emergency help" },
  ];

  return (
    <>
      {/* Scrollable chat area */}
      <div className="app-content" ref={scrollRef}>
        <div className="chat-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
              <div className="message-bubble" style={{ whiteSpace: 'pre-line' }}>
                {msg.text}
              </div>
              {msg.type === 'map' && (
                <div className="map-embed">
                  <iframe
                    title="Google Map Navigation"
                    src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${msg.mapQuery}&t=&z=15&ie=UTF8&iwloc=B&output=embed`}
                    loading="lazy"
                    onLoad={() => scrollToBottom()}
                  ></iframe>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="message-wrapper assistant">
              <div className="message-bubble" style={{ opacity: 0.6 }}>
                <Bot size={14} /> &nbsp;Analyzing venue data...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick-action chips */}
      <div className="chips-wrapper">
        <div className="suggestion-chips">
          {suggestions.map((item, idx) => (
            <button
              key={idx}
              className="chip"
              onClick={() => handleSend(item.query)}
              aria-label={`Quick action: ${item.label}`}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                {item.icon} {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="input-field"
          placeholder="Ask your concierge..."
          aria-label="Type your question for the concierge"
        />
        <button className="send-button" onClick={() => handleSend()} aria-label="Send message">
          <Send size={18} />
        </button>
      </div>
    </>
  );
};

export default ChatInterface;
