export const processAssistantQuery = async (query, userContext) => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowerQuery = query.toLowerCase();

  // --- CROWD MOVEMENT ---
  if (
    lowerQuery.includes('crowd') ||
    lowerQuery.includes('congestion') ||
    lowerQuery.includes('busy') ||
    lowerQuery.includes('packed') ||
    lowerQuery.includes('heatmap')
  ) {
    return {
      text: `Live Crowd Density Update for Section ${userContext.section}:\n🔴 Gate A (Main) — VERY CROWDED (avoid)\n🟡 Gate C (East) — MODERATE congestion\n🟢 Gate F (North) — LOW density — RECOMMENDED entry/exit point. I suggest moving there now to save 15–20 minutes.`,
      type: 'text'
    };
  }

  // --- RESTROOMS (precise keywords only — no greedy 'near') ---
  if (
    lowerQuery.includes('restroom') ||
    lowerQuery.includes('bathroom') ||
    lowerQuery.includes('toilet') ||
    lowerQuery.includes('washroom') ||
    lowerQuery.includes('nearest restroom')
  ) {
    return {
      text: `📍 Based on your location in Section ${userContext.section}:\n• Section ${Number(userContext.section) + 1} restroom — 🔴 15-min wait (avoid)\n• Section ${Number(userContext.section) - 2} restroom — 🟢 0-min wait (2 min walk)\n\nI recommend heading to Section ${Number(userContext.section) - 2} to avoid the queue entirely!`,
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
      text: "🍔 Main concession (Level 1) — 🔴 ~20 min wait. \n\nFor zero wait, pre-order from 'FastBite Express' at Gate C and pick up in 5 min! Here's how to get there:",
      type: 'map',
      mapQuery: "FastBite+Express+Gate+C"
    };
  }

  // --- EVENT SCHEDULE (precise: no 'time' catch-all) ---
  if (
    lowerQuery.includes('schedule') ||
    lowerQuery.includes('event') ||
    lowerQuery.includes('halftime') ||
    lowerQuery.includes('lineup') ||
    lowerQuery.includes('next match') ||
    lowerQuery.includes('what\'s next') ||
    lowerQuery.includes('show me the schedule')
  ) {
    return {
      text: "📅 Live Event Schedule (via Google Calendar):\n• Halftime Show — starts in 14 mins\n• 2nd Half Kickoff — in 29 mins\n• Award Ceremony — in ~110 mins\n\n💡 Tip: Team store crowd density is currently LOW. Perfect time to grab merch before everyone else rushes in after halftime!",
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
      text: "🗺️ Here is the safest and least crowded route to your destination via Google Maps: (Green path avoids the congested Gate A area)",
      type: 'map',
      mapQuery: "Main+Event+Stadium+Entrance"
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
      text: "🛍️ Main merch store (Gate A) — 🔴 Very busy right now.\n\nPop-up stall in Section 202 — 🟢 Almost empty! It's only a 3-min walk from Section 104. Grab your gear without the wait!",
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
      text: "🚗 Post-event traffic alert: Main parking structure reporting severe bottleneck. \n\n✅ Recommended: Exit from the North Gate → take the free shuttle to the remote parking lot P4. Estimated 10 min vs. 45 min if you use the main exit. Here's the route:",
      type: 'map',
      mapQuery: "North+Stadium+Exit+Parking"
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
      text: "🚨 ALERT: Security team notified at your location (Section 104).\n\n• Nearest emergency exit: immediately to your right (green sign)\n• First Aid: Gate B, Level 1\n• Security Desk: Gate A main entrance\n\nPlease stay calm. Help is on the way.",
      type: 'text'
    };
  }

  // --- DEFAULT FALLBACK ---
  return {
    text: "👋 I'm VenueFlow — your AI Event Concierge.\n\nI can help you with:\n🚻 Find uncrowded restrooms\n🍔 Shortest food & drink queues\n🗺️ Venue navigation & maps\n📅 Live event schedule\n🛍️ Merchandise with no wait\n🚗 Smart parking & exit routes\n🚨 Emergency & security\n\nWhat do you need?",
    type: 'text'
  };
};
