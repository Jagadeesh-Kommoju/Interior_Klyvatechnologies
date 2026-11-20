import React from 'react';

export default function Services({ onSelectService, onAllServices }) {
  const servicesList = [
    {
      id: 'performance',
      title: 'High-Ticket Villa & Apartment Ads',
      desc: 'Hyper-local Meta & Google Ads designed to attract affluent homeowners embarking on ₹20L–₹1Cr+ full-home interiors.',
      theme: 'card-blue',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      )
    },
    {
      id: 'social',
      title: 'Viral Interior Reels & 4K Walkthroughs',
      desc: 'Aesthetic short-form videos spotlighting spatial flow, lighting transitions, custom joinery & dramatic before/after reveals.',
      theme: 'card-pink',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <circle cx="12" cy="12" r="3.5"></circle>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      id: 'seo',
      title: 'Google Maps & Local HNW SEO',
      desc: 'Rank #1 on Google Maps for "Luxury Interior Designers near me" & convert high-intent local homeowners searching for architects.',
      theme: 'card-green',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      id: 'brand',
      title: 'Luxury Studio Branding & 3D Identity',
      desc: 'High-end digital lookbooks, luxury brand typography, 3D render presentation decks, and authority content that justify premium design fees.',
      theme: 'card-orange',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="services-section" id="services">
      <div className="section-header-row">
        <div>
          <div className="section-eyebrow">— EXCLUSIVE INTERIOR STUDIO MARKETING —</div>
          <h2 className="section-main-title">
            Complete Growth Solutions<br />
            for <span className="highlight-gradient">Interior Designers & Architects.</span>
          </h2>
        </div>

        <div className="section-header-right">
          <p className="section-header-desc">
            High-ticket villa leads, viral architectural reels, and Google Maps dominance — all in one place.<br />
            We help you attract affluent homeowners, fill your project pipeline, and command premium design fees.
          </p>
          <button className="view-all-link" onClick={onAllServices}>
            View All Services →
          </button>
        </div>
      </div>

      {/* 4 Bento Service Cards */}
      <div className="services-grid">
        {servicesList.map((service) => (
          <div
            key={service.id}
            className={`service-card ${service.theme}`}
            onClick={() => onSelectService(service.title)}
          >
            <div className="service-left">
              <div className="service-icon-circle">
                {service.icon}
              </div>
              <div className="service-text">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
              </div>
            </div>
            <div className="service-arrow-btn">→</div>
          </div>
        ))}
      </div>
    </section>
  );
}
