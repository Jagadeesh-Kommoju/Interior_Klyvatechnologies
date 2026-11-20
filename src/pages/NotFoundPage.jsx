import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <div style={{ padding: '80px 0', textAlign: 'center' }}>
      <SEO
        title="404 - Page Not Found | KLYVA Technologies"
        description="The page you are looking for does not exist."
      />
      <div style={{ fontSize: '72px', fontWeight: '900', color: 'var(--blue-accent)', marginBottom: '10px', fontFamily: 'Outfit, sans-serif' }}>
        404
      </div>
      <h1 className="hero-title" style={{ fontSize: '32px', marginBottom: '12px' }}>
        Page Not Found
      </h1>
      <p className="hero-description" style={{ margin: '0 auto 28px' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary" style={{ display: 'inline-flex' }}>
        Return to Home →
      </Link>
    </div>
  );
}
