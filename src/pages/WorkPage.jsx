import React from "react";
import SEO from "../components/SEO";
import WorkSection from "../components/WorkSection";

export default function WorkPage({ onWatchWork, onBookCall }) {
  return (
    <div className="work-page-wrapper">
      <SEO
        title="Interior Work Showcase | 12 Viral Architectural & Interior Reels - KLYVA"
        description="Explore our top-performing short-form video reels for luxury interior designers and architects, engineered for aesthetic delight and high-ticket client acquisition."
        canonicalUrl="https://klyvatechnologies.com/work"
      />
      <WorkSection onBookCall={onBookCall} isHomePage={false} />
    </div>
  );
}
