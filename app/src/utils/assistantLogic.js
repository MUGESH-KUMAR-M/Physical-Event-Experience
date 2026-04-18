export const processAssistantQuery = async (query, userContext) => {
  // Simulate network delay for AI processing
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('restroom') || lowerQuery.includes('bathroom') || lowerQuery.includes('toilet') || lowerQuery.includes('near') || lowerQuery.includes('neart')) {
    return {
      text: `Based on your location in Section ${userContext.section}, the nearest restroom is in Section ${Number(userContext.section) + 1}. However, it currently has a 15-minute wait. I recommend the restroom in Section ${Number(userContext.section) - 2}, which is a 2-minute further walk but has zero wait time!`,
      type: 'text'
    };
  }

  if (lowerQuery.includes('food') || lowerQuery.includes('drink') || lowerQuery.includes('hungry')) {
    return {
      text: "The main concession stand on Level 1 is currently very congested (approx 20 min wait). To save time, you can pre-order from the 'FastBite Express' stand at Gate C and pick it up in 5 minutes. Here's how to get there:",
      type: 'map',
      mapQuery: "FastBite+Express+Gate+C"
    };
  }

  if (lowerQuery.includes('schedule') || lowerQuery.includes('next') || lowerQuery.includes('time')) {
    return {
      text: "Integrating with the Google Event Calendar: The halftime show begins in 14 minutes. If you want to grab merch, now is the optimal time before the rush starts! The team store is currently at 'Low' crowd density.",
      type: 'text'
    };
  }
  
  if (lowerQuery.includes('map') || lowerQuery.includes('navigate') || lowerQuery.includes('where')) {
    return {
      text: "I can help you navigate. Here is the safest and least crowded route to your destination via Google Maps:",
      type: 'map',
      mapQuery: "Main+Event+Stadium+Entrance"
    };
  }

  if (lowerQuery.includes('merch') || lowerQuery.includes('shirt') || lowerQuery.includes('buy')) {
    return {
      text: "The main merchandise store at Gate A is extremely busy right now. I suggest visiting the pop-up stall in Section 202, which currently has very few people waiting. It's a 3-minute walk from your current location.",
      type: 'text'
    };
  }

  if (lowerQuery.includes('park') || lowerQuery.includes('car') || lowerQuery.includes('leave')) {
    return {
      text: "To avoid the post-event traffic congestion, I recommend leaving from the North Exit and taking the shuttle to the remote parking lot. The main parking structure is currently reporting a severe bottleneck.",
      type: 'map',
      mapQuery: "North+Stadium+Exit+Parking"
    };
  }

  if (lowerQuery.includes('help') || lowerQuery.includes('emergency') || lowerQuery.includes('security')) {
    return {
      text: "Security assistance dispatched to your location (Section 104). The nearest emergency exit is immediately to your right. Please stay calm.",
      type: 'text'
    };
  }

  return {
    text: "I'm the VenueFlow AI Concierge. I can help you find uncrowded restrooms, short food lines, merchandise stalls, or parking directions. What do you need?",
    type: 'text'
  };
};
