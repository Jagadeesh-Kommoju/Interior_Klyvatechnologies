import React from 'react';

export default function MobileStickyBar({ onBookCall }) {
  return (
    <div className="mobile-sticky-bar" aria-label="Quick Mobile Actions">
      <a
        href="tel:+918897767755"
        className="mobile-bar-btn call"
        title="Call KLYVA Interior Growth Desk (+91 88977 67755)"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        Call
      </a>

      <a
        href="https://wa.me/918897767755?text=Hi%20KLYVA%20Team!%20I'd%20like%20to%20discuss%20scaling%20my%20Interior%20Design%20Studio%20with%20high-ticket%20leads%20and%20viral%20reels."
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-bar-btn whatsapp"
        title="Chat on WhatsApp (+91 88977 67755)"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.97.58 3.88 1.67 5.52L2 22l4.74-1.74c1.58.99 3.4 1.52 5.3 1.52 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.78 14.28c-.24.68-1.2 1.25-1.93 1.34-.51.06-1.17.1-3.38-.82-2.83-1.17-4.66-4.05-4.8-4.24-.14-.19-1.15-1.53-1.15-2.92s.73-2.07 1-2.35c.27-.28.6-.35.8-.35.2 0 .4 0 .58.01.19.01.44-.07.69.52.26.61.88 2.15.96 2.31.08.16.13.35.03.56-.1.21-.15.34-.3.51-.15.17-.32.38-.45.51-.15.15-.31.31-.13.62.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.16.28.1.1.77 1.77.87.1.1.17.17.21.24.04.07.04.41-.2 1.09z" />
        </svg>
        WhatsApp
      </a>

      <button
        type="button"
        className="mobile-bar-btn book"
        onClick={onBookCall}
      >
        ⚡ Studio Call
      </button>
    </div>
  );
}
