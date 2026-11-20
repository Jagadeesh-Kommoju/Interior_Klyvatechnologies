import React from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../assets/Main_Logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" id="contact">
      <div className="site-wrapper">
        {/* Top Info Grid */}
        <div className="footer-top-grid">
          {/* Col 1: Brand & Mission */}
          <div className="footer-col footer-col-brand">
            <Link to="/" className="brand-logo footer-brand-logo" aria-label="KLYVA Technologies Home">
              <img src={mainLogo} alt="KLYVA Technologies" className="brand-footer-logo" />
            </Link>
            <p className="footer-brand-desc">
              Exclusive digital growth partner for premier interior designers, architects, and luxury home studios — driving consistent high-ticket client acquisition, viral reels, and Google Maps dominance.
            </p>
          </div>

          {/* Col 2: Direct Contact Channels */}
          <div className="footer-col footer-col-channels">
            <div className="footer-col-title">Direct Channels</div>
            <div className="footer-channels-card">
              <a href="tel:+918897767755" className="footer-contact-link">
                📞 +91 88977 67755
              </a>
              <a href="mailto:info@klyvatechnologies.com" className="footer-contact-link">
                ✉️ info@klyvatechnologies.com
              </a>
              <a
                href="https://wa.me/918897767755?text=Hi%20KLYVA%20Team!%20I%20want%20to%20discuss%20growing%20my%20interior%20design%20firm."
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link footer-wa-link"
              >
                💬 WhatsApp Chat (Instant) ↗
              </a>
            </div>
          </div>

          {/* Col 3: Corporate Headquarters */}
          <div className="footer-col footer-col-hq">
            <div className="footer-col-title">Corporate Headquarters</div>
            <p className="footer-hq-address">
              📍 101, First Floor, NRK Legacy, Double Road,<br />
              opp. Bawarchi Dum Biriyani, PM Palem, Madhurawada,<br />
              Visakhapatnam, Andhra Pradesh – 530041
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © {currentYear} KLYVA Technologies. All rights reserved. High-Ticket Interior Design & Architectural Marketing Solutions.
          </div>

          <ul className="footer-links-list">
            <li>
              <a
                href="#"
                className="footer-link-item"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#reels-grid"
                className="footer-link-item"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('reels-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Featured Reels
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="footer-link-item"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="footer-link-item"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
