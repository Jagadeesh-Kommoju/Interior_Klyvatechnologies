import React from 'react';
import SEO from '../components/SEO';

export default function AboutPage({ onBookCall }) {
  const pillars = [
    {
      theme: 'blue',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      ),
      title: 'Real Estate & HNW Intelligence',
      desc: 'We analyze luxury villa communities, new residential towers, and affluent homeowner demographics before architecting your growth funnel.'
    },
    {
      theme: 'purple',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      ),
      title: 'Sensory Spatial Storytelling',
      desc: 'Cinema-grade 4K architectural filming, dramatic lighting reveals, and material textures that make homeowners fall in love with your design craft.'
    },
    {
      theme: 'coral',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      ),
      title: 'Predictable High-Ticket Pipeline',
      desc: 'Pre-qualified consultations, booked studio site visits, and signed ₹25L–₹1Cr+ projects every month without chasing low-budget tire kickers.'
    }
  ];

  const coreValues = [
    {
      title: 'Architectural & Design Obsessed',
      desc: 'Interior design is intensely emotional and sensory. Every reel, photo, and ad creative is crafted to communicate premium craftsmanship and justify top-of-market pricing.'
    },
    {
      title: 'High-Ticket Qualification',
      desc: 'Vanity clicks do not build sustainable interior studios. We evaluate success by signed villa contracts, site consultations, and verified homeowner budgets.'
    },
    {
      title: 'Spatial Visual Craftsmanship',
      desc: 'From Italian book-matched marble to concealed acoustic paneling, we capture the spatial flow that separates master architects from ordinary contractors.'
    },
    {
      title: 'Speed & Project Launch Agility',
      desc: 'Completed interior handovers are fresh marketing assets. Our production crew films, edits, and launches targeted campaigns within 48–72 hours.'
    }
  ];

  return (
    <div className="about-page-container">
      <SEO
        title="About Us | KLYVA Technologies – Exclusive Interior Design Marketing Partner"
        description="At KLYVA Technologies, we specialize exclusively in high-ticket client acquisition and viral reels for luxury interior designers, architects, and home studios."
        canonicalUrl="https://klyvatechnologies.com/about"
      />

      {/* Main Hero Header */}
      <div className="about-hero-wrapper">
        <div className="about-badge-pill">
          <span className="about-badge-spark">✦</span> ABOUT KLYVA TECHNOLOGIES
        </div>

        <h1 className="about-hero-title">
          Your Interior Studio Deserves More Than<br />
          <span className="highlight-gradient">Low-Budget Price Shoppers.</span>
        </h1>

        <p className="about-hero-desc">
          At <strong>KLYVA Technologies</strong>, we research before we strategize and analyze high-net-worth real estate trends before we execute. By understanding your design ethos, portfolio handover schedule, and regional villa micro-markets, we engineer bespoke digital growth systems designed to reach affluent homeowners, generate high-intent consultations, and drive multi-crore project pipelines for your studio.
        </p>
      </div>

      {/* 3 Core Methodology Pillars */}
      <div className="about-pillars-row">
        {pillars.map((item, i) => (
          <div key={i} className="about-pillar-card">
            <div className={`about-pillar-icon ${item.theme}`}>
              {item.icon}
            </div>
            <h3 className="about-pillar-title">{item.title}</h3>
            <p className="about-pillar-text">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Strategic Callout Banner */}
      <div className="about-cta-banner">
        <div className="about-cta-content">
          <div className="about-cta-icon-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <h3 className="about-cta-heading">
              Stop Relying on Word-of-Mouth. <span className="highlight-gradient">Scale Your Interior Firm.</span>
            </h3>
            <p className="about-cta-subtext">
              Partner with KLYVA to turn visual attention into booked villa consultations and signed turnkey contracts.
            </p>
          </div>
        </div>

        {onBookCall && (
          <button className="about-cta-btn" onClick={onBookCall}>
            Book an Interior Strategy Call →
          </button>
        )}
      </div>

      {/* Section Divider & Title for Core Values */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="section-eyebrow">— OUR CORE VALUES —</div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: '800', color: '#0c1327', letterSpacing: '-0.5px' }}>
          The Principles Behind Every Interior Campaign
        </h2>
      </div>

      {/* 4 Values Grid */}
      <div className="about-values-grid">
        {coreValues.map((val, idx) => (
          <div key={idx} className="about-value-card-premium">
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#eff6ff', color: 'var(--blue-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '15px', marginBottom: '16px' }}>
              0{idx + 1}
            </div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '18px', fontWeight: '800', marginBottom: '8px', color: '#0c1327' }}>
              {val.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.65' }}>
              {val.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
