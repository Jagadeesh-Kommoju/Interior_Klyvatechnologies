import React, { useState, useEffect, useRef, useMemo } from 'react';
import { interiorVideos } from '../config/interiorVideos';
import { parseVideoSource } from '../utils/videoUtils';

export function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    objective: 'High-Ticket Client Acquisition',
    budgetTier: '₹25L – ₹50L',
    handle: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const objectiveChips = [
    { label: 'High-Ticket Client Acquisition', icon: '🏛️' },
    { label: 'Viral Interior Reels & 4K Video', icon: '🎬' },
    { label: 'Google Maps & Local HNW SEO', icon: '📍' },
    { label: 'Luxury Studio Branding & 3D Identity', icon: '✨' }
  ];

  const budgetTiers = [
    '₹15L – ₹25L',
    '₹25L – ₹50L',
    '₹50L – ₹1.5 Cr',
    '₹1.5 Cr+ (Ultra Luxury)'
  ];

  const [generatedWaUrl, setGeneratedWaUrl] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = 
`*🏛️ INTERIOR STUDIO GROWTH STRATEGY CALL - KLYVA TECHNOLOGIES*

👤 *Designer / Principal:* ${formData.name}
📱 *Contact:* ${formData.emailOrPhone}
💎 *Primary Focus:* ${formData.objective}
💰 *Target Project Budget:* ${formData.budgetTier}
🔗 *Studio / Instagram / Website:* ${formData.handle ? formData.handle : 'Not provided'}

--------------------------------------
_Requested via klyvatechnologies.com (Interior Showcase Edition)_`;

    const waUrl = `https://wa.me/918897767755?text=${encodeURIComponent(whatsappMessage)}`;
    setGeneratedWaUrl(waUrl);
    setSubmitted(true);

    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {}
  };

  const handleCloseModal = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal-card" style={{ maxWidth: '640px', borderRadius: '28px', overflow: 'hidden', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <div className="contact-accent-bar"></div>
        <button className="modal-close-btn" onClick={handleCloseModal}>✕</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 16px', border: '2px solid #a7f3d0' }}>
              ✓
            </div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              Consultation Scheduled, {formData.name}!
            </h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, marginBottom: '22px' }}>
              Your 30-minute growth roadmap for <strong>{formData.objective}</strong> ({formData.budgetTier}) is reserved. Our leadership team has been notified on WhatsApp.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {generatedWaUrl && (
                <a
                  href={generatedWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-blue"
                  style={{ textDecoration: 'none' }}
                >
                  💬 Open WhatsApp Priority Desk (+91 88977 67755) ↗
                </a>
              )}
              <button type="button" className="btn-pill btn-white" onClick={handleCloseModal}>
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '100px', marginBottom: '12px' }}>
              <span className="status-pulse-dot" style={{ width: '6px', height: '6px' }}></span>
              Available for Interior Studio Growth Sprints
            </div>

            <h3 className="modal-title" style={{ fontSize: '24px', marginBottom: '6px' }}>
              Book Your Interior Studio Strategy Call
            </h3>
            <p className="modal-desc" style={{ fontSize: '13.5px', marginBottom: '20px' }}>
              We'll analyze your current portfolio reach, local HNW market visibility, and deliver a zero-fluff client acquisition blueprint for your interior design firm.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label className="form-label-premium">
                  <span>Primary Growth Objective</span>
                  <span className="form-label-hint">Select Focus</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {objectiveChips.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`form-chip-btn ${formData.objective === chip.label ? 'active' : ''}`}
                      style={{ padding: '9px 12px', fontSize: '12px' }}
                      onClick={() => setFormData({ ...formData, objective: chip.label })}
                    >
                      <span>{chip.icon}</span>
                      <span>{chip.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label className="form-label-premium">
                  <span>Average Project Ticket Size</span>
                  <span className="form-label-hint">Typical Project Scope</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                  {budgetTiers.map((tier, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`form-chip-btn ${formData.budgetTier === tier ? 'active' : ''}`}
                      style={{ padding: '7px 4px', fontSize: '11px', textAlign: 'center' }}
                      onClick={() => setFormData({ ...formData, budgetTier: tier })}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label className="form-label-premium">
                  <span>Full Name</span>
                </label>
                <div className="contact-input-wrapper">
                  <span className="contact-input-icon">👤</span>
                  <input
                    type="text"
                    className="form-input-premium"
                    placeholder="e.g. Lead Designer / Studio Principal"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label className="form-label-premium">
                  <span>Work WhatsApp / Phone</span>
                </label>
                <div className="contact-input-wrapper">
                  <span className="contact-input-icon">📱</span>
                  <input
                    type="text"
                    className="form-input-premium"
                    placeholder="+91 88977 67755 or your work mobile"
                    value={formData.emailOrPhone}
                    onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="form-label-premium">
                  <span>Studio Name / Instagram Handle (Optional)</span>
                </label>
                <div className="contact-input-wrapper">
                  <span className="contact-input-icon">🏛️</span>
                  <input
                    type="text"
                    className="form-input-premium"
                    placeholder="@yourstudiodecor or website url"
                    value={formData.handle}
                    onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="btn-contact-submit" style={{ padding: '14px 24px', fontSize: '14px' }}>
                ⚡ Confirm & Schedule Strategy Call →
              </button>

              <div className="contact-trust-strip-small" style={{ marginTop: '12px' }}>
                <span className="trust-micro-item">🔒 Direct Confidentiality</span>
                <span className="trust-micro-item">⚡ 2-Hour Response</span>
                <span className="trust-micro-item">🎯 Tailored Interior Roadmap</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function ModalReelItem({ reel }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoSource = useMemo(() => {
    return parseVideoSource(reel.videoUrl, reel.thumbnail);
  }, [reel.videoUrl, reel.thumbnail]);

  useEffect(() => {
    if (videoSource.type !== 'mp4') return;
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      video.defaultMuted = true;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
    }
  }, [isMuted, videoSource.type]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoSource.type !== 'mp4') {
      setIsPlaying(!isPlaying);
      return;
    }
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoSource.type !== 'mp4') return;
    const video = videoRef.current;
    if (!video) return;
    const next = !isMuted;
    video.muted = next;
    setIsMuted(next);
  };

  if (videoSource.type === 'placeholder') {
    return (
      <div className="html5-reel-card modal-reel-item" style={{ minHeight: '260px', cursor: 'default' }}>
        <div className="reel-placeholder-box">
          <div className="reel-placeholder-icon">🏛️</div>
          <div className="reel-placeholder-title">{reel.title}</div>
          <div className="reel-placeholder-hint">Ready in interiorVideos.js</div>
        </div>
        <div className="reel-top-overlay">
          <span className="reel-badge-pill">REEL {reel.num}</span>
        </div>
      </div>
    );
  }

  if (videoSource.type === 'instagram') {
    return (
      <div className="html5-reel-card modal-reel-item" onClick={togglePlay} style={{ minHeight: '280px' }}>
        {isPlaying ? (
          <iframe
            src={videoSource.embedUrl}
            title={reel.title}
            className="html5-reel-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            scrolling="no"
          />
        ) : (
          <>
            <img src={videoSource.poster} alt={reel.title} className="reel-poster-fallback" loading="lazy" />
            <div className="reel-pause-indicator instagram-play-badge" style={{ width: '44px', height: '44px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <div className="reel-card-meta-bottom">
              <span className="reel-category-pill">{reel.category}</span>
              <h4 className="reel-title-overlay" style={{ fontSize: '13px' }}>{reel.title}</h4>
            </div>
          </>
        )}
        <div className="reel-top-overlay">
          <span className="reel-badge-pill">{reel.brand || 'Studio'} • REEL {reel.num}</span>
          <button
            type="button"
            className="reel-sound-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? '✕' : '▶'}
          </button>
        </div>
      </div>
    );
  }

  if (videoSource.type === 'youtube' || videoSource.type === 'vimeo') {
    return (
      <div className="html5-reel-card modal-reel-item" onClick={togglePlay} style={{ minHeight: '260px' }}>
        {isPlaying ? (
          <iframe
            src={videoSource.embedUrl}
            title={reel.title}
            className="html5-reel-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img src={videoSource.poster} alt={reel.title} className="reel-poster-fallback" loading="lazy" />
            <div className="reel-pause-indicator" style={{ width: '44px', height: '44px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </>
        )}
        <div className="reel-top-overlay">
          <span className="reel-badge-pill">{reel.brand || 'Studio'} • REEL {reel.num}</span>
          <button
            type="button"
            className="reel-sound-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? '✕' : '▶'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="html5-reel-card modal-reel-item" onClick={togglePlay} style={{ minHeight: '260px' }}>
      <video
        ref={videoRef}
        src={videoSource.src}
        poster={videoSource.poster}
        className="html5-reel-video"
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        loop
        muted={isMuted}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          if (reel.rawVideoUrl && e.currentTarget.src !== reel.rawVideoUrl) {
            e.currentTarget.src = reel.rawVideoUrl;
            e.currentTarget.load();
          }
        }}
      />

      <div className="reel-top-overlay">
        <span className="reel-badge-pill">REEL {reel.num}</span>
        <button
          type="button"
          className={`reel-sound-btn ${!isMuted ? 'unmuted' : ''}`}
          onClick={toggleMute}
          title={isMuted ? 'Click to Unmute' : 'Click to Mute'}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>

      {!isPlaying && (
        <div className="reel-pause-indicator" style={{ width: '44px', height: '44px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      )}
    </div>
  );
}

export function VideoModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card video-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        <h3 className="modal-title">Featured Interior & Architectural Reels ({interiorVideos.length} Videos)</h3>
        <p className="modal-desc">Explore viral walkthrough reels engineered for high retention, spatial aesthetics, and high-ticket client acquisition.</p>

        <div className="video-grid-preview" style={{ maxHeight: '520px' }}>
          {interiorVideos.map((reel) => (
            <ModalReelItem key={reel.id} reel={reel} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServiceModal({ isOpen, serviceName, onClose, onOpenBooking }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getServiceInfo = () => {
    switch (serviceName) {
      case 'High-Ticket Villa & Apartment Ads':
      case 'Footfall & Performance Ads':
      case 'Performance Marketing':
        return {
          title: 'High-Ticket Villa & Apartment Client Acquisition',
          desc: 'Hyper-targeted Meta & Google Search campaigns engineered to attract and pre-qualify affluent homeowners planning ₹20L–₹1Cr+ residential renovations and turnkey villas.',
          points: [
            'Geo-fenced Meta Ads targeting high-net-worth homeowners within premium residential micro-markets',
            'Pre-qualification lead forms filtering out low-budget leads and capturing verified project budgets',
            'High-intent Google Search campaigns for "luxury interior designer", "villa architect", "turnkey interiors"'
          ]
        };
      case 'Viral Interior Reels & 4K Walkthroughs':
      case 'Viral Food & Café Reels':
      case 'Social Media Growth':
        return {
          title: 'Viral Interior Reels & Cinematic 4K Walkthroughs',
          desc: 'Aesthetic vertical short-form video reels that capture the soul of your design: spatial flow, lighting transitions, custom Italian marble, and dramatic before/after reveals.',
          points: [
            'Cinema-grade 4K filming on-site with gimbal stabilization, architectural lenses & studio lighting',
            'Thumb-stopping hook scripting tailored for Instagram algorithms and design aficionados',
            'Kinetic sound design, architectural pacing, and high-retention spatial walkthroughs'
          ]
        };
      case 'Google Maps & Local HNW SEO':
      case 'Google Maps & Local SEO':
      case 'SEO & Content':
        return {
          title: 'Google Maps Optimization & Local High-Net-Worth SEO',
          desc: 'Dominate local architectural and interior design searches so affluent homeowners searching in your city discover your studio first.',
          points: [
            'Complete Google Business Profile optimization with curated project galleries and verified categories',
            'Systematic 5-star Google review collection strategy from completed homeowner projects',
            'High-intent local keyword dominance: "best luxury interior designer in [city]", "villa architects near me"'
          ]
        };
      default:
        return {
          title: 'Luxury Studio Branding & 3D Identity',
          desc: 'Distinctive brand architectures, digital luxury lookbooks, and 3D architectural presentation decks that command top-of-market design fees.',
          points: [
            'Bespoke visual identity systems, typography, color palettes & signage guidelines',
            'Digital portfolio lookbooks & client presentation pitch decks that justify premium design retainers',
            '3D walkthrough styling direction and high-end print collateral design'
          ]
        };
    }
  };

  const info = getServiceInfo();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        <h3 className="modal-title">{info.title}</h3>
        <p className="modal-desc">{info.desc}</p>

        <div style={{ marginBottom: '24px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
          {info.points.map((pt, i) => (
            <div key={i} style={{ marginBottom: '6px' }}>• {pt}</div>
          ))}
        </div>

        <button
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => {
            onClose();
            onOpenBooking();
          }}
        >
          Schedule Studio Strategy Session →
        </button>
      </div>
    </div>
  );
}
