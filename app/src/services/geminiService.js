/**
 * @module geminiService
 * @description Google Gemini AI integration for the VenueFlow concierge.
 * Uses the @google/generative-ai SDK to power context-aware venue assistance.
 * Falls back gracefully to the rule-based engine when no API key is configured.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

/** System prompt defining the Gemini model's persona and constraints */
const SYSTEM_PROMPT = `You are VenueFlow, an AI-powered event concierge for a large sporting venue.
Your role is to help attendees with:
- Finding uncrowded restrooms, food stalls, and amenities
- Providing live crowd density information (Gate A=high, Gate C=moderate, Gate F=low)
- Event schedule and timing information
- Navigation and wayfinding within the venue
- Merchandise locations and wait times
- Parking and exit strategies
- Emergency and security assistance

Always be concise, helpful, and safety-conscious. Use emoji for clarity.
Assume the attendee is in Section 104 of the venue unless told otherwise.
Current event: Major Sporting Event. Halftime in approximately 14 minutes.`;

/**
 * Calls the Google Gemini 1.5 Flash model with a venue-specific system prompt.
 * @param {string} query - Sanitized user query
 * @returns {Promise<string|null>} AI-generated response or null if unavailable
 */
export const callGeminiAPI = async (query) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return null; // Graceful fallback to rule-based engine

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent(query);
    const text = result.response.text();
    return text ?? null;
  } catch (error) {
    console.warn('[VenueFlow] Gemini API unavailable, using rule-based fallback:', error.message);
    return null;
  }
};
