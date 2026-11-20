import React from 'react';
import SEO from '../components/SEO';
import WorkSection from '../components/WorkSection';
import Services from '../components/Services';

export default function HomePage({
  onStartProject,
  onWatchWork,
  onSelectService,
  onAllServices,
  onBookCall,
}) {
  return (
    <>
      <SEO
        title="KLYVA Technologies – Digital Marketing & High-Ticket Leads for Interior Designers"
        description="We help premier interior designers, architects, and luxury studios acquire high-net-worth clients with viral 4K interior reels, Meta ads, and Google Maps dominance."
        canonicalUrl="https://klyvatechnologies.com/"
      />
      {/* Featured Video & Reels Showcase */}
      <WorkSection onBookCall={onBookCall || onStartProject} isHomePage={true} />
      {/* Services Section */}
      <Services onSelectService={onSelectService} onAllServices={onAllServices} />
    </>
  );
}
