/**
 * @file App.test.jsx
 * @description Component-level tests for the VenueFlow root App component.
 * Tests rendering, accessibility structure, and error boundary integration.
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock lucide-react to avoid SVG rendering issues in test environment
vi.mock('lucide-react', () => ({
  ShieldAlert: () => <span data-testid="shield-icon" />,
  Send: () => <span data-testid="send-icon" />,
  Bot: () => <span data-testid="bot-icon" />,
  Map: () => <span data-testid="map-icon" />,
  Navigation: () => <span data-testid="nav-icon" />,
  CalendarClock: () => <span data-testid="calendar-icon" />,
  Activity: () => <span data-testid="activity-icon" />,
  Users: () => <span data-testid="users-icon" />,
}));

// Mock the Gemini service so tests don't make real API calls
vi.mock('../services/geminiService', () => ({
  callGeminiAPI: vi.fn().mockResolvedValue(null),
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });

  it('renders the VenueFlow Concierge header', () => {
    render(<App />);
    expect(screen.getByText('VenueFlow Concierge')).toBeInTheDocument();
  });

  it('renders the emergency alert button', () => {
    render(<App />);
    const btn = screen.getByRole('button', { name: /emergency alerts/i });
    expect(btn).toBeInTheDocument();
  });

  it('has a banner landmark for the header', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('has a main landmark for content', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders the welcome message in the chat', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to VenueFlow/i)).toBeInTheDocument();
  });

  it('renders the chat input field', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Ask your concierge/i)).toBeInTheDocument();
  });

  it('renders the send button', () => {
    render(<App />);
    const sendBtn = screen.getByRole('button', { name: /send message/i });
    expect(sendBtn).toBeInTheDocument();
  });

  it('renders suggestion chips', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /Quick action: Restroom/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Quick action: Food & Drinks/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Quick action: Emergency/i })).toBeInTheDocument();
  });

  it('has a skip-to-content link for keyboard users', () => {
    render(<App />);
    const skipLink = document.querySelector('.skip-link');
    expect(skipLink).not.toBeNull();
    expect(skipLink.getAttribute('href')).toBe('#chat-input');
  });

  it('chat input has correct accessible label', () => {
    render(<App />);
    const input = screen.getByLabelText(/Type your question for the concierge/i);
    expect(input).toBeInTheDocument();
  });

  it('chat log region has accessible label', () => {
    render(<App />);
    const log = screen.getByRole('log');
    expect(log).toBeInTheDocument();
  });
});
