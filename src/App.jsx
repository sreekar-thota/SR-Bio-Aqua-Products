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

const INTRO_SESSION_KEY = 'sr_bio_aqua_intro_viewed';

function shouldPlayIntro() {
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) !== 'true';
  } catch (err) {
    // If sessionStorage is restricted or blocked, allow intro to play
    return true;
  }
}

export default function App() {
  const [showIntro, setShowIntro] = useState(shouldPlayIntro);

  const handleIntroFinish = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    } catch (err) {
      // Ignore storage errors in restricted/private browsing modes
    }
    setShowIntro(false);
  }, []);

  return (
    <div className="app-root">
      {/* Cinematic SR Bio Aqua Products Logo Reveal Video (plays once per session) */}
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
