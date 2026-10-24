import React, { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IsoCertStrip from './components/IsoCertStrip';
import About from './components/About';
import ProductCatalog from './components/ProductCatalog';
import WhyChooseUs from './components/WhyChooseUs';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="app-root">
      {/* Intro Screen Animation with Logo & FoldText */}
      {showIntro && <IntroScreen onFinish={() => setShowIntro(false)} />}

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
