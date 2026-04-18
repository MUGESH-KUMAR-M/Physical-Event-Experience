import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Map, Navigation, CalendarClock, Activity } from 'lucide-react';
import { processAssistantQuery } from '../../utils/assistantLogic';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'text', text: "Welcome to VenueFlow! I am your AI Event Concierge. How can I optimize your experience today?", sender: 'assistant' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Mock Context
  const userContext = { section: '104', time: new Date() };

  useEffect(() => {
    if (scrollRef.current) {
      // Use setTimeout to ensure DOM is fully painted before calculating scrollHeight
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 50);
    }
  }, [messages, isTyping]);

  const handleSend = async (forcedText = null) => {
    const textToSend = forcedText || inputValue;
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), type: 'text', text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Get response from Mock API
    const response = await processAssistantQuery(textToSend, userContext);
    
    // Add assistant message
    const assistantMsg = { id: Date.now() + 1, ...response, sender: 'assistant' };
    setIsTyping(false);
    setMessages(prev => [...prev, assistantMsg]);
  };

  const suggestions = [
    { label: "Nearest Restroom", icon: <Activity size={14} />, query: "Where is the nearest restroom?" },
    { label: "Food with zero wait", icon: <Activity size={14} />, query: "I want food with no wait time" },
    { label: "Event Schedule", icon: <CalendarClock size={14}/>, query: "Show me the schedule" },
    { label: "Venue Map", icon: <Map size={14} />, query: "Show me the venue map" }
  ];

  return (
    <>
      <div className="app-content" ref={scrollRef}>
        <div className="chat-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
              <div className="message-bubble">
                {msg.text}
              </div>
              {msg.type === 'map' && (
                <div className="map-embed">
                  <iframe 
                    title="Google Map Simulation"
                    src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${msg.mapQuery}&t=&z=15&ie=UTF8&iwloc=B&output=embed`}
                    loading="lazy"
                    onLoad={() => {
                       setTimeout(() => {
                         if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                       }, 100);
                    }}
                  ></iframe>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="message-wrapper assistant">
              <div className="message-bubble" style={{ opacity: 0.7 }}>
                <Bot size={16} style={{ animation: 'pulse 1.5s infinite' }} /> Typing...
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '0 16px', backgroundColor: 'var(--secondary-bg)' }}>
        <div className="suggestion-chips">
          {suggestions.map((item, idx) => (
            <button key={idx} className="chip" onClick={() => handleSend(item.query)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {item.icon} {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="input-area">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="input-field"
          placeholder="Ask your concierge..."
          aria-label="Ask your concierge"
        />
        <button className="send-button" onClick={() => handleSend()} aria-label="Send message">
          <Send size={20} />
        </button>
      </div>
    </>
  );
};

export default ChatInterface;
