# VenueFlow Assistant

**PromptWars Submission - Hack2Skill**

## Chosen Vertical
**Physical Event Experience**

## Problem Addressed
Large sporting venues suffer from crowd congestion, long waiting times for basic amenities (restrooms, food), and poor real-time coordination, leading to a frustrating attendee experience.

## Approach and Logic
VenueFlow is a smart, dynamic AI-powered context-aware assistant. The solution provides a personal "Venue Concierge" chat interface that users can interact with from their mobile devices. 

The logic engine uses context parameters (e.g., current time, user's location section, and event schedule) to dynamically route users. For instance, if a user asks "Where can I get a drink?", the assistant checks real-time crowd density (simulated) and wait times to recommend the closest concession stand with the shortest line, keeping users moving efficiently.

## How the Solution Works
1. **Context-Aware Assistance**: The AI concierge understands natural language intents related to venue wayfinding, schedule checking, and amenities.
2. **Real-time Routing Simulation**: By parsing predefined logic arrays, the assistant dynamically changes its recommendation based on user parameters, helping relieve crowded zones actively.
3. **Google Services Integration**:
   - The application visually integrates **Google Maps APIs** (embeds) allowing users to visualize safe/optimal paths to the stadium or between stadium sections. 
   - A mock integration of **Google Calendar** allows the concierge to fetch live event schedules and time remaining.

## Assumptions Made
1. **Live Data APIs**: We assume the venue has infrastructure (cameras, ticketing pass-throughs) to provide live crowd density and queue lengths via an API, which our assistant would natively consume (currently simulated using predefined datasets).
2. **Device**: Attendees possess a smartphone with a web browser to access the application via a QR code or simple URL link without installing an app.
3. **AI Backend**: In a production environment, the Google Cloud Vertex AI (Gemini api) would serve as the NLP engine parsing the intent and delivering the contextual response. The mock engine demonstrates the *logic* of the dynamic prompt responses.

## Technical Stack
- **Frontend**: Vite + React
- **Styling**: Pure CSS (Accessible, Responsive)
- **Icons**: Lucide React
- **Google Services**: Integration of Map/Schedule workflows.

---
*Created by [Your Name/Team] for Hack2Skill PromptWars.*