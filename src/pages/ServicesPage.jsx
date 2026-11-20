import React, { useState } from 'react';
import SEO from '../components/SEO';

export default function ServicesPage({ onBookCall, onSelectService }) {
  const [openFaq, setOpenFaq] = useState(null);

  const services = [
    {
      id: 'performance',
      num: '01',
      title: 'High-Ticket Villa & Apartment Ads',
      tagline: 'Hyper-Local Meta & Google Ads Engineered to Acquire Qualified Villa Homeowners',
      desc: 'We build and scale targeted acquisition funnels across Meta (Instagram & Facebook), Google Search, and YouTube that pre-qualify affluent homeowners planning ₹20L–₹1Cr+ residential renovations and turnkey villas.',
      icon: '🚀',
      iconTheme: 'blue',
      deliverables: [
        'Geo-fenced Meta Ads targeting high-net-worth homeowners within premium residential gated communities',
        'Pre-qualification lead forms filtering out low-budget inquiries and capturing verified budgets',
        'High-intent Google Search campaigns for "luxury interior designers", "villa architects", "turnkey interiors"',
        'Full attribution tracking & cost-per-qualified-lead reporting'
      ]
    },
    {
      id: 'social',
      num: '02',
      title: 'Viral Interior Reels & 4K Walkthroughs',
      tagline: 'Cinema-Grade 4K Short-Form Video that Commands Immediate Aesthetic Delight',
      desc: 'Aesthetic short-form video reels are the #1 organic driver for interior design client acquisition. We script, film, and edit 4K reels spotlighting spatial flow, lighting transitions, custom joinery, and dramatic before/after reveals.',
      icon: '🎬',
      iconTheme: 'pink',
      deliverables: [
        'Sensory hook scripts (Italian marble textures, concealed lighting, walk-in closets & spatial reveals)',
        '4K cinema video shooting on-location with gimbal stabilization & architectural lighting',
        'High-retention kinetic editing & trending audio matching luxury aesthetics',
        'Instagram algorithm optimization for viral reach in your target metropolitan area'
      ]
    },
    {
      id: 'seo',
      num: '03',
      title: 'Google Maps & Local HNW SEO',
      tagline: 'Rank #1 on Google Maps for "Luxury Interior Designers Near Me" & Top Architectural Searches',
      desc: 'When affluent homeowners search for the best architects and interior designers in their city, ensure your studio is the premier choice. We optimize your Google Business Profile and local citations for maximum map pack dominance.',
      icon: '📍',
      iconTheme: 'green',
      deliverables: [
        'Google Business Profile complete audit, categories & high-res portfolio project updates',
        'High-intent local keyword targeting ("best interior designer in [city]", "luxury villa architects")',
        'Automated 5-star Google review collection strategy from completed homeowner clients',
        'Local architectural directory citations and design magazine backlinks'
      ]
    },
    {
      id: 'brand',
      num: '04',
      title: 'Luxury Studio Branding & 3D Identity',
      tagline: 'Distinctive Aesthetic Systems that Command Premium Design Retainers',
      desc: 'When your studio brand looks ultra-luxurious, clients willingly pay premium design retainers. We craft cohesive visual identities, digital portfolio lookbooks, client pitch decks, and 3D architectural presentation collateral.',
      icon: '✨',
      iconTheme: 'orange',
      deliverables: [
        'Complete studio visual identity, custom typography, color palettes & signage guidelines',
        'Digital client presentation pitch decks that justify premium design retainers',
        'High-end print and digital portfolio lookbooks for homeowner walkthroughs',
        'Architectural photography art direction and 3D render presentation styling'
      ]
    }
  ];

  const steps = [
    {
      step: 'STEP 01',
      title: 'Audit & Market Discovery',
      desc: 'We analyze your local luxury real estate developments, competitor positioning, and target homeowner demographics to craft a bespoke interior growth roadmap.'
    },
    {
      step: 'STEP 02',
      title: '4K Production & Campaign Launch',
      desc: 'Our creative crew captures 4K cinema content at your completed sites, launches hyper-targeted high-ticket ad funnels, and optimizes Google Maps within 48–72 hours.'
    },
    {
      step: 'STEP 03',
      title: 'Scale High-Ticket Consultations & Pipeline',
      desc: 'We optimize weekly based on consultation bookings, qualified lead conversion, and project pipeline value to maximize your studio revenue.'
    }
  ];

  const faqs = [
    {
      q: 'How quickly can our interior studio expect qualified homeowner leads?',
      a: 'For hyper-targeted Meta & Google Search campaigns, pre-qualified homeowner inquiries and consultation requests typically begin flowing within the first 3 to 7 days. For organic viral reels and Google Maps SEO, local discovery compounds consistently over 2 to 4 weeks.'
    },
    {
      q: 'How do you filter out low-budget leads and tire kickers?',
      a: 'Our ad funnels utilize custom pre-qualification filters. We mandate minimum budget selection (e.g. ₹15L, ₹25L, ₹50L+), property possession timelines, and floor plan uploads before an inquiry reaches your sales team.'
    },
    {
      q: 'Do you come to our completed project sites to shoot the reels and videos?',
      a: 'Yes! Our creative production team travels on-location equipped with cinema cameras, gimbal stabilization, architectural wide-angle lenses, and studio lighting to film every detail of your completed residential or commercial interiors.'
    },
    {
      q: 'What ad spend is recommended for an interior design studio?',
      a: 'For single-city boutique interior studios, we recommend starting with ad spends from ₹25,000 to ₹60,000/month. For established turnkey firms operating across multiple cities, we manage spends of ₹1,50,000 to ₹5,00,000+/month with predictable ROAS.'
    }
  ];

  return (
    <div className="services-page-wrap">
      <SEO
        title="Interior Design Marketing Services | KLYVA Technologies"
        description="Comprehensive client growth solutions for interior designers & architects: High-Ticket Paid Ads, Viral 4K Interior Reels, Google Maps SEO, and Luxury Studio Branding."
        canonicalUrl="https://klyvatechnologies.com/services"
      />

      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 50px', padding: '0 16px' }}>
        <div className="section-eyebrow" style={{ marginBottom: '12px' }}>
          ✦ BESPOKE GROWTH SOLUTIONS FOR INTERIORS
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: 1.15, marginBottom: '20px' }}>
          Engineered for <span className="highlight-gradient">Multi-Crore Project Pipelines.</span>
        </h1>
        <p className="hero-description" style={{ fontSize: '16px', lineHeight: 1.7, margin: '0 auto', color: '#475467' }}>
          Stop waiting for word-of-mouth. We build predictable client acquisition engines for interior designers, architects, and luxury studios that demand consistent high-ticket projects.
        </p>
      </div>

      {/* 4 Deep Service Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '80px' }}>
        {services.map((srv) => (
          <div key={srv.id} className="service-detail-card-premium">
            <div className="service-detail-header-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span className={`service-detail-icon-pill ${srv.iconTheme}`}>{srv.icon}</span>
                <div>
                  <span className="service-detail-num">{srv.num}</span>
                  <h2 className="service-detail-title">{srv.title}</h2>
                </div>
              </div>
              <button
                className="btn-pill btn-white"
                onClick={() => onSelectService ? onSelectService(srv.title) : (onBookCall && onBookCall())}
              >
                Inquire Service →
              </button>
            </div>

            <p className="service-detail-tagline">{srv.tagline}</p>
            <p className="service-detail-desc">{srv.desc}</p>

            <div className="service-deliverables-box">
              <div className="deliverables-title">✦ KEY DELIVERABLES INCLUDED</div>
              <div className="deliverables-grid">
                {srv.deliverables.map((item, idx) => (
                  <div key={idx} className="deliverable-item">
                    <span className="deliverable-check">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3 Steps Process */}
      <div style={{ marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div className="section-eyebrow">— OUR 3-STEP GROWTH FRAMEWORK —</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '32px', fontWeight: '800', color: '#0c1327' }}>
            From Project Handover to Booked Consultations
          </h2>
        </div>

        <div className="steps-row-grid">
          {steps.map((st, i) => (
            <div key={i} className="step-card-premium">
              <span className="step-badge">{st.step}</span>
              <h3 className="step-title">{st.title}</h3>
              <p className="step-desc">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div style={{ maxWidth: '820px', margin: '0 auto 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="section-eyebrow">— FREQUENTLY ASKED QUESTIONS —</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: '800', color: '#0c1327' }}>
            Everything You Need to Know
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`faq-card-premium ${openFaq === idx ? 'open' : ''}`}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="faq-question-row">
                <span className="faq-question-text">{faq.q}</span>
                <span className="faq-toggle-icon">{openFaq === idx ? '−' : '+'}</span>
              </div>
              {openFaq === idx && (
                <div className="faq-answer-text">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Footer Card */}
      <div className="services-bottom-cta-card">
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '30px', fontWeight: '800', color: '#ffffff', marginBottom: '12px' }}>
          Ready to Fill Your Interior Studio Pipeline?
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: '15px', maxWidth: '580px', margin: '0 auto 24px', lineHeight: '1.6' }}>
          Book a 30-minute growth roadmap session. We will audit your current portfolio visibility and show you how to acquire high-net-worth clients consistently.
        </p>
        {onBookCall && (
          <button className="btn-pill btn-white" onClick={onBookCall} style={{ fontWeight: '800' }}>
            Schedule Your Interior Consultation →
          </button>
        )}
      </div>
    </div>
  );
}
