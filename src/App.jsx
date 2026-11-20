import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BookingModal, VideoModal, ServiceModal } from './components/Modals';
import MobileStickyBar from './components/MobileStickyBar';

import HomePage from './pages/HomePage';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setBookingModalOpen(false);
        setVideoModalOpen(false);
        setSelectedService(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        {/* Ambient background glowing gradient blobs */}
        <div className="bg-mesh" aria-hidden="true">
          <div className="mesh-blob-1"></div>
          <div className="mesh-blob-2"></div>
          <div className="mesh-blob-3"></div>
        </div>

        <div className="site-wrapper">
          {/* Navigation Bar */}
          <Navbar onBookCall={() => setBookingModalOpen(true)} />

          {/* Router View - Dedicated Home Page Experience */}
          <main>
            <Routes>
              <Route
                path="*"
                element={
                  <HomePage
                    onStartProject={() => setBookingModalOpen(true)}
                    onWatchWork={() => setVideoModalOpen(true)}
                    onSelectService={(title) => setSelectedService(title)}
                    onAllServices={() => setSelectedService('Full-Stack Interior Growth Suite')}
                    onBookCall={() => setBookingModalOpen(true)}
                  />
                }
              />
            </Routes>
          </main>
        </div>

        {/* Footer */}
        <Footer />

        {/* Mobile Fixed Sticky Quick Action Bar */}
        <MobileStickyBar onBookCall={() => setBookingModalOpen(true)} />

        {/* Global Modals - Kept active on every button click */}
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
        />

        <VideoModal
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
        />

        <ServiceModal
          isOpen={!!selectedService}
          serviceName={selectedService}
          onClose={() => setSelectedService(null)}
          onOpenBooking={() => {
            setSelectedService(null);
            setBookingModalOpen(true);
          }}
        />
      </div>
    </BrowserRouter>
  );
}
