import React, { useState } from 'react';
import SEO from '../components/SEO';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    handle: '',
    service: 'Performance Marketing (Paid Ads & ROAS)',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [generatedWaUrl, setGeneratedWaUrl] = useState('');

  const serviceOptions = [
    { id: 'Performance Marketing (Paid Ads & ROAS)', label: 'Paid Ads & ROAS', icon: '🚀' },
    { id: 'Social Media & Viral Reels Growth', label: 'Viral Reels & Video', icon: '🎬' },
    { id: 'SEO & Search Authority Moats', label: 'SEO & Search Moats', icon: '🔍' },
    { id: 'Full-Funnel Brand & Creative Identity', label: 'Brand & 3D Identity', icon: '✨' },
    { id: 'Full Omnichannel Growth Accelerator', label: 'Full Omnichannel Suite', icon: '⚡' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Formatted WhatsApp DM Message with all submitted details
    const whatsappMessage = 
`*🔥 NEW GROWTH INQUIRY - KLYVA TECHNOLOGIES*

👤 *Client Name:* ${formState.name}
📱 *Phone / WhatsApp:* ${formState.phone}
✉️ *Email:* ${formState.email}
🚀 *Focus Service:* ${formState.service}
🔗 *Website / Social:* ${formState.handle ? formState.handle : 'Not provided'}
💬 *Message / Goals:*
${formState.message ? formState.message : 'Ready to scale with KLYVA!'}

--------------------------------------
_Inquiry submitted via klyvatechnologies.com_`;

    const waUrl = `https://wa.me/918897767755?text=${encodeURIComponent(whatsappMessage)}`;
    setGeneratedWaUrl(waUrl);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Automatically redirect / open WhatsApp in new tab with filled details
      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        // Fallback handled by the prominent button on UI
      }
    }, 500);
  };

  return (
    <div className="contact-page-wrap">
      <SEO
        title="Contact Us | Book a Free 30-Min Strategy Call - KLYVA Technologies"
        description="Connect with KLYVA Technologies. Office in Madhurawada, Visakhapatnam. Direct WhatsApp: +91 88977 67755, Email: info@klyvatechnologies.com."
        canonicalUrl="https://klyvatechnologies.com/contact"
      />

      {/* Header Section */}
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 45px', padding: '0 16px' }}>
        <div className="section-eyebrow" style={{ marginBottom: '12px' }}>
          ⚡ LET'S SCALE YOUR REVENUE ENGINE
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.15, marginBottom: '18px' }}>
          Ready to Engineer Your Next <span className="highlight-gradient">Growth Milestone?</span>
        </h1>
        <p className="hero-description" style={{ fontSize: '15.5px', lineHeight: 1.7, margin: '0 auto', color: '#475467' }}>
          Submit your requirements below to receive a custom performance roadmap. When you submit, our system will also instantly connect you via WhatsApp DM with our leadership team.
        </p>
      </div>

      <div className="contact-grid-wrap">
        {/* Left Column: Direct Channels, Official Address & Trust Hub */}
        <div className="contact-card-premium">
          <div className="contact-accent-bar"></div>

          {/* Live Online Badge */}
          <div className="contact-live-status">
            <span className="status-pulse-dot"></span>
            Growth Specialists Active • Response: &lt; 2 Hours
          </div>

          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            Official Corporate Headquarters
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>
            Reach out through our direct communication channels or visit our corporate office in Visakhapatnam.
          </p>

          {/* Quick Direct Communication Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/918897767755?text=Hi%20KLYVA%20Team!%20I%20want%20to%20discuss%20scaling%20my%20brand%20with%20digital%20marketing."
              target="_blank"
              rel="noopener noreferrer"
              className="contact-direct-btn wa-highlight"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#25d366', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.97.58 3.88 1.67 5.52L2 22l4.74-1.74c1.58.99 3.4 1.52 5.3 1.52 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.78 14.28c-.24.68-1.2 1.25-1.93 1.34-.51.06-1.17.1-3.38-.82-2.83-1.17-4.66-4.05-4.8-4.24-.14-.19-1.15-1.53-1.15-2.92s.73-2.07 1-2.35c.27-.28.6-.35.8-.35.2 0 .4 0 .58.01.19.01.44-.07.69.52.26.61.88 2.15.96 2.31.08.16.13.35.03.56-.1.21-.15.34-.3.51-.15.17-.32.38-.45.51-.15.15-.31.31-.13.62.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.16.28.1.1.77 1.77.87.1.1.17.17.21.24.04.07.04.41-.2 1.09z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#15803d' }}>Instant WhatsApp DM</div>
                  <div style={{ fontSize: '13px', color: '#166534', fontWeight: 700 }}>+91 88977 67755</div>
                </div>
              </div>
              <span style={{ fontSize: '16px', color: '#15803d', fontWeight: 800 }}>↗</span>
            </a>

            {/* Direct Phone */}
            <a href="tel:+918897767755" className="contact-direct-btn">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#eff6ff', color: 'var(--blue-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0c1327' }}>Direct Phone Call</div>
                  <div style={{ fontSize: '13px', color: '#475467', fontWeight: 700 }}>+91 88977 67755</div>
                </div>
              </div>
              <span style={{ fontSize: '16px', color: '#94a3b8' }}>→</span>
            </a>

            {/* Official Email */}
            <a href="mailto:info@klyvatechnologies.com" className="contact-direct-btn">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0c1327' }}>Official Email</div>
                  <div style={{ fontSize: '13px', color: '#475467', fontWeight: 700 }}>info@klyvatechnologies.com</div>
                </div>
              </div>
              <span style={{ fontSize: '16px', color: '#94a3b8' }}>→</span>
            </a>

            {/* Physical Office Address */}
            <div className="contact-direct-btn" style={{ cursor: 'default' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0c1327', marginBottom: '3px' }}>
                    Corporate Office
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#475467', lineHeight: 1.55 }}>
                    101, First Floor, NRK Legacy, double road, opp. Bawarchi Dum Biriyani, Pothinamallayya Palem, Madhurawada, Andhra Pradesh 530041
                  </div>
                  <a
                    href="https://maps.google.com/?q=NRK+Legacy+Madhurawada+Visakhapatnam"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-block', marginTop: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--blue-accent)', textDecoration: 'none' }}
                  >
                    View on Google Maps ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div style={{ background: '#f8fafc', border: '1px solid #edf2f7', borderRadius: '18px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px', color: '#334155' }}>
              <span style={{ color: '#10b981', fontWeight: 900 }}>✓</span>
              <span><strong>100% Mutual NDA:</strong> Your ad data, margins & creatives are strictly protected.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px', color: '#334155' }}>
              <span style={{ color: '#10b981', fontWeight: 900 }}>✓</span>
              <span><strong>Fast 48-Hour Onboarding:</strong> Zero multi-week lag or bureaucratic delays.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px', color: '#334155' }}>
              <span style={{ color: '#10b981', fontWeight: 900 }}>✓</span>
              <span><strong>Empirical Attribution:</strong> Verified 4.2x Avg. ROAS across paid media.</span>
            </div>
          </div>
        </div>

        {/* Right Column: 10/10 Interactive Contact Form */}
        <div className="contact-card-premium">
          <div className="contact-accent-bar"></div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '36px 16px' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '34px', margin: '0 auto 20px', border: '2px solid #a7f3d0' }}>
                ✓
              </div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                Details Submitted, {formState.name}!
              </h3>
              <p style={{ color: '#475467', fontSize: '14.5px', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 20px' }}>
                Your growth inquiry has been generated and pre-loaded into WhatsApp DM for instant priority processing.
              </p>

              {/* Submitted Details Snapshot */}
              <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '20px', textAlign: 'left', maxWidth: '440px', margin: '0 auto 24px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--blue-accent)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.8px' }}>
                  📋 Transmitted Inquiry Details:
                </div>
                <div style={{ fontSize: '13px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div><strong>Client:</strong> {formState.name}</div>
                  <div><strong>Phone:</strong> {formState.phone}</div>
                  <div><strong>Email:</strong> {formState.email}</div>
                  <div><strong>Desired Service:</strong> {formState.service}</div>
                  {formState.handle && <div><strong>Social / Web:</strong> {formState.handle}</div>}
                  {formState.message && <div><strong>Goals:</strong> {formState.message}</div>}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                {generatedWaUrl && (
                  <a
                    href={generatedWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-grow-brand"
                    style={{ width: '100%', maxWidth: '380px', justifyContent: 'center', padding: '16px 24px', fontSize: '15px' }}
                  >
                    💬 Open WhatsApp DM Now (+91 88977 67755) ↗
                  </a>
                )}
                <button
                  type="button"
                  className="btn-pill btn-white"
                  onClick={() => setSubmitted(false)}
                  style={{ padding: '10px 20px', fontSize: '13px' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '22px' }}>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Request Growth Audit & Consultation
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748b' }}>
                  Fill out your requirements — we'll generate your custom plan & connect with you on WhatsApp.
                </p>
              </div>

              {/* Step 1: Interactive Service Chips */}
              <div style={{ marginBottom: '20px' }}>
                <label className="form-label-premium">
                  <span>1. Desired Focus Service</span>
                  <span className="form-label-hint">Select Primary Goal</span>
                </label>
                <div className="form-chip-grid">
                  {serviceOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`form-chip-btn ${formState.service === opt.id ? 'active' : ''}`}
                      onClick={() => setFormState({ ...formState, service: opt.id })}
                    >
                      <span className="form-chip-icon">{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Details */}
              <div style={{ marginBottom: '16px' }}>
                <label className="form-label-premium">
                  <span>2. Your Name</span>
                </label>
                <div className="contact-input-wrapper">
                  <span className="contact-input-icon">👤</span>
                  <input
                    type="text"
                    className="form-input-premium"
                    placeholder="e.g. Rahul Sharma"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label className="form-label-premium">
                    <span>Phone / WhatsApp</span>
                  </label>
                  <div className="contact-input-wrapper">
                    <span className="contact-input-icon">📱</span>
                    <input
                      type="tel"
                      className="form-input-premium"
                      placeholder="+91 88977 67755"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label-premium">
                    <span>Work Email</span>
                  </label>
                  <div className="contact-input-wrapper">
                    <span className="contact-input-icon">✉️</span>
                    <input
                      type="email"
                      className="form-input-premium"
                      placeholder="name@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label className="form-label-premium">
                  <span>Website or Social Handle (Optional)</span>
                  <span className="form-label-hint">For quick audit</span>
                </label>
                <div className="contact-input-wrapper">
                  <span className="contact-input-icon">🔗</span>
                  <input
                    type="text"
                    className="form-input-premium"
                    placeholder="e.g. https://yourbrand.com or @yourbrand"
                    value={formState.handle}
                    onChange={(e) => setFormState({ ...formState, handle: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label className="form-label-premium">
                  <span>Current Bottleneck or Revenue Goal (Optional)</span>
                </label>
                <textarea
                  className="form-input-premium"
                  style={{ height: '90px', resize: 'vertical' }}
                  placeholder="Tell us what you've tried so far, your target ROAS or growth milestone..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-contact-submit"
                disabled={submitting}
              >
                {submitting ? 'Connecting with Strategy Team...' : '⚡ Send Details & Open WhatsApp DM →'}
              </button>

              <div className="contact-trust-strip-small">
                <span className="trust-micro-item">🔒 100% Confidential</span>
                <span className="trust-micro-item">⚡ Direct Founder Access</span>
                <span className="trust-micro-item">🎯 Instant WhatsApp DM</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
