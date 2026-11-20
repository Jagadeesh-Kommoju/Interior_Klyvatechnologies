import React from 'react';

export default function ResultsBanner({ onGrowBrand }) {
  return (
    <section className="results-cta-bar" id="about">
      <div className="results-lead">
        <div className="results-eyebrow">— PROVEN RESULTS FOR INTERIOR STUDIOS —</div>
        <div className="results-title">Data-Driven Client Growth<br />for Interior Designers & Architects.</div>
      </div>

      <div className="results-metrics-group">
        {/* 1: High-Ticket Inquiries */}
        <div className="result-metric-unit">
          <div className="result-unit-icon chart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          </div>
          <div className="result-unit-text">
            <span className="result-val">+4.2x <span className="arrow-up">↑</span></span>
            <span className="result-lbl">High-Ticket Inquiries</span>
          </div>
        </div>

        {/* 2: Consultations */}
        <div className="result-metric-unit">
          <div className="result-unit-icon users">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            </svg>
          </div>
          <div className="result-unit-text">
            <span className="result-val">+240% <span className="arrow-up">↑</span></span>
            <span className="result-lbl">Design Consultations</span>
          </div>
        </div>

        {/* 3: Reel Views */}
        <div className="result-metric-unit">
          <div className="result-unit-icon target">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>
          </div>
          <div className="result-unit-text">
            <span className="result-val">4.8M <span className="arrow-up">↑</span></span>
            <span className="result-lbl">Interior Reel Views</span>
          </div>
        </div>

        {/* 4: Pipeline Value */}
        <div className="result-metric-unit">
          <div className="result-unit-icon funnel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </div>
          <div className="result-unit-text">
            <span className="result-val">₹3.8 Cr+ <span className="arrow-up">↑</span></span>
            <span className="result-lbl">Pipeline Value</span>
          </div>
        </div>
      </div>

      <button className="btn-grow-brand" onClick={onGrowBrand}>
        Let's Scale Your Interior Firm →
      </button>
    </section>
  );
}
