import React from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../assets/Main_Logo.png';

export default function Navbar({ onBookCall }) {
  return (
    <header className="navbar">
      <div className="navbar-brand-wrap">
        <Link to="/" className="brand-logo" aria-label="KLYVA Technologies Home">
          <img src={mainLogo} alt="KLYVA Technologies" className="brand-main-logo" />
        </Link>
      </div>

      <div className="navbar-actions-wrap">
        <button className="btn-header-cta" onClick={onBookCall}>
          Book a Strategy Call →
        </button>
      </div>
    </header>
  );
}
