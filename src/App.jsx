import React, { useState, useCallback } from 'react';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IsoCertStrip from './components/IsoCertStrip';
import About from './components/About';
import BrochureSection from './components/BrochureSection';
import ProductCatalog from './components/ProductCatalog';
import WhyChooseUs from './components/WhyChooseUs';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';

export default function App() {
  // Replays on every fresh page load, refresh, or reopened tab (no sessionStorage / localStorage restrictions)
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroFinish = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <div className="app-root">
      {/* Fullscreen Cinematic Logo Reveal Video Intro */}
      {showIntro && <IntroScreen onFinish={handleIntroFinish} />}

      {/* 1. Header and Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main id="main-content">
        {/* 2. Company Introduction / Hero Section */}
        <Hero />

        {/* Professional ISO Certification Strip */}
        <IsoCertStrip />

        {/* 3. About SR Bio Aqua Products */}
        <About />

        {/* Company Brochure Section (PDF) */}
        <BrochureSection />

        {/* 4. View Our Products (Explore Our Products) */}
        <ProductCatalog />

        {/* 5. Product Enquiry / Why Choose Us Section */}
        <WhyChooseUs />

        {/* 6. Customer Reviews & Ratings */}
        <ReviewsSection />

        {/* 7. Contact Section */}
        <ContactSection />
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* Floating Quick Action */}
      <WhatsAppFloatingButton />
    </div>
  );
}
