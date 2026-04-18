/**
 * @module assistantLogic
 * @description Context-aware decision engine for the VenueFlow AI Concierge.
 * Processes natural language queries and returns structured venue guidance
 * based on simulated real-time crowd, scheduling, and amenity data.
 */

/**
 * Sanitizes user input to prevent XSS attacks.
 * Strips HTML tags and trims whitespace.
 * @param {string} input - Raw user input string
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script[^>]*>.*?<\/script>/gis, '') // Remove script blocks and content
    .replace(/<[^>]*>/g, '')                        // Strip remaining HTML tags
    .replace(/[<>'"]/g, '')                         // Strip dangerous characters
    .trim()
    .slice(0, 500);                                 // Cap at 500 chars
};

/**
 * Maps crowd density level to emoji indicator.
 * @param {'low'|'moderate'|'high'} level - Crowd density level
 * @returns {string} Emoji string
 */
export const densityBadge = (level) => {
  const map = { low: '🟢', moderate: '🟡', high: '🔴' };
  return map[level] ?? '⚪';
};

/**
 * Core AI query processor. Simulates a Gemini-backed NLP engine
 * that classifies attendee intent and returns context-aware responses.
 *
 * @param {string} query - Raw natural language query from attendee
 * @param {{ section: string, time: Date }} userContext - Attendee's current context
 * @returns {Promise<{ text: string, type: 'text'|'map', mapQuery?: string }>}
 */
export const processAssistantQuery = async (query, userContext) => {
  // Sanitize before processing
  const safeQuery = sanitizeInput(query);
  if (!safeQuery) {
    return { text: 'Please enter a valid question.', type: 'text' };
  }

  // Simulate AI processing delay (800ms)
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowerQuery = safeQuery.toLowerCase();
  const section = parseInt(userContext?.section ?? '104', 10);

  // --- CROWD MOVEMENT ---
  if (
    lowerQuery.includes('crowd') ||
    lowerQuery.includes('congestion') ||
    lowerQuery.includes('busy') ||
    lowerQuery.includes('packed') ||
    lowerQuery.includes('heatmap') ||
    lowerQuery.includes('density')
  ) {
    return {
      text: `Live Crowd Density Update for Section ${section}:\n🔴 Gate A (Main) — VERY CROWDED (avoid)\n🟡 Gate C (East) — MODERATE congestion\n🟢 Gate F (North) — LOW density — RECOMMENDED entry/exit. Move there now to save 15–20 minutes.`,
      type: 'text'
    };
  }

  // --- RESTROOMS ---
  if (
    lowerQuery.includes('restroom') ||
    lowerQuery.includes('bathroom') ||
    lowerQuery.includes('toilet') ||
    lowerQuery.includes('washroom') ||
    lowerQuery.includes('nearest restroom')
  ) {
    return {
      text: `📍 Restrooms near Section ${section}:\n• Section ${section + 1} — 🔴 15-min wait (avoid)\n• Section ${section - 2} — 🟢 0-min wait (2 min walk)\n\nRecommendation: Go to Section ${section - 2} for zero queue!`,
      type: 'text'
    };
  }

  // --- FOOD & DRINKS ---
  if (
    lowerQuery.includes('food') ||
    lowerQuery.includes('drink') ||
    lowerQuery.includes('hungry') ||
    lowerQuery.includes('eat') ||
    lowerQuery.includes('snack') ||
    lowerQuery.includes('zero wait') ||
    lowerQuery.includes('no wait')
  ) {
    return {
      text: "🍔 Main concession (Level 1) — 🔴 ~20 min wait.\n\nFor zero wait: pre-order from 'FastBite Express' at Gate C, pick up in 5 min! Here's how to get there:",
      type: 'map',
      mapQuery: 'FastBite+Express+Gate+C+Stadium'
    };
  }

  // --- EVENT SCHEDULE ---
  if (
    lowerQuery.includes('schedule') ||
    lowerQuery.includes('halftime') ||
    lowerQuery.includes('lineup') ||
    lowerQuery.includes('next match') ||
    lowerQuery.includes('show me the schedule') ||
    lowerQuery.includes('event')
  ) {
    return {
      text: "📅 Live Event Schedule:\n• Halftime Show — starts in 14 mins\n• 2nd Half Kickoff — in 29 mins\n• Award Ceremony — ~110 mins\n\n💡 Tip: Team store crowd density is LOW right now — perfect time for merch!",
      type: 'text'
    };
  }

  // --- MAP / NAVIGATION ---
  if (
    lowerQuery.includes('map') ||
    lowerQuery.includes('navigate') ||
    lowerQuery.includes('directions') ||
    lowerQuery.includes('route') ||
    lowerQuery.includes('venue map') ||
    lowerQuery.includes('show me the venue')
  ) {
    return {
      text: "🗺️ Safest and least crowded route to your destination (Green path avoids congested Gate A area):",
      type: 'map',
      mapQuery: 'Main+Event+Stadium+Entrance'
    };
  }

  // --- MERCHANDISE ---
  if (
    lowerQuery.includes('merch') ||
    lowerQuery.includes('merchandise') ||
    lowerQuery.includes('shirt') ||
    lowerQuery.includes('jersey') ||
    lowerQuery.includes('buy') ||
    lowerQuery.includes('shop')
  ) {
    return {
      text: "🛍️ Main merch store (Gate A) — 🔴 Very busy.\n\nPop-up stall in Section 202 — 🟢 Almost empty! Only a 3-min walk from Section 104.",
      type: 'text'
    };
  }

  // --- PARKING / EXIT ---
  if (
    lowerQuery.includes('park') ||
    lowerQuery.includes('parking') ||
    lowerQuery.includes('car') ||
    lowerQuery.includes('exit') ||
    lowerQuery.includes('leave') ||
    lowerQuery.includes('go home')
  ) {
    return {
      text: "🚗 Post-event traffic alert: Main structure — severe bottleneck.\n\n✅ Take the North Gate → free shuttle to P4 (10 min vs. 45 min via main exit).",
      type: 'map',
      mapQuery: 'North+Stadium+Exit+Parking'
    };
  }

  // --- EMERGENCY / SECURITY ---
  if (
    lowerQuery.includes('help') ||
    lowerQuery.includes('emergency') ||
    lowerQuery.includes('security') ||
    lowerQuery.includes('lost') ||
    lowerQuery.includes('danger') ||
    lowerQuery.includes('medical')
  ) {
    return {
      text: "🚨 Security team notified at Section 104.\n\n• Nearest exit: immediately to your right (green sign)\n• First Aid: Gate B, Level 1\n• Security Desk: Gate A main entrance\n\nStay calm — help is on the way.",
      type: 'text'
    };
  }

  // --- DEFAULT FALLBACK ---
  return {
    text: "👋 I'm VenueFlow — your AI Event Concierge.\n\nI can help you with:\n🚻 Uncrowded restrooms\n🍔 Shortest food & drink queues\n🗺️ Venue navigation & maps\n📅 Live event schedule\n🛍️ Merchandise with no wait\n🚗 Smart parking & exit\n🚨 Emergency & security\n\nWhat do you need?",
    type: 'text'
  };
};
