import React from 'react';
import { ArrowRight, PhoneCall, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import ClickStack from './ClickStack';

export default function Hero() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 72;
      const elPosition = el.getBoundingClientRect().top;
      const offsetPosition = elPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Stack of 2 cards: Prawn image in front, Aqua Pond image behind it
  const heroCards = [
    {
      id: 'prawn-card',
      image: '/images/healthy-vannamei-shrimp.jpg',
      alt: 'Healthy vannamei shrimp culture in clean aquaculture pond',
      caption: 'Aquaculture pond management solutions'
    },
    {
      id: 'pond-card',
      image: '/images/hero-aquaculture-pond.jpg',
      alt: 'Commercial shrimp aquaculture pond with aeration systems',
      caption: 'Commercial aquaculture pond management solutions'
    }
  ];

  return (
    <section className="hero-section" id="home">
      <div className="container hero-container">

        {/* Left Column: Brand Intro & Calls to Action */}
        <div className="hero-content">

          {/* Logo Badge Header */}
          <div className="hero-logo-row">
            <img
              src="/images/logo.jpeg"
              alt="SR Bio Aqua Products Hexagon Brand Logo"
              className="hero-logo-img"
              width="135"
              height="135"
            />
            <h1 className="hero-company-name">{COMPANY_INFO.name}</h1>
          </div>

          {/* Centered Phone Contact */}
          <div className="hero-phone-center">
            <a href="tel:+919959713456" className="hero-phone-badge" aria-label="Call +91 9959713456">
              <Phone size={16} className="hero-phone-icon" aria-hidden="true" />
              <span>+91 9959713456</span>
            </a>
          </div>

          {/* Operations Address Line */}
          <div className="hero-operations-note">
            <div className="operations-col">
              <span className="ops-label">Manufacturing Unit:</span>
              <span className="ops-val">
                {COMPANY_INFO.locations.manufacturing.addressLine1}, {COMPANY_INFO.locations.manufacturing.addressLine2}
              </span>
            </div>
            <div className="operations-divider" aria-hidden="true"></div>
            <div className="operations-col">
              <span className="ops-label">Sales Office:</span>
              <span className="ops-val">
                {COMPANY_INFO.locations.sales.addressLine1}, {COMPANY_INFO.locations.sales.addressLine2}
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className="hero-main-title">{COMPANY_INFO.mainHeadline}</h2>

          {/* Supporting Headline */}
          <p className="hero-sub-title">{COMPANY_INFO.supportingHeadline}</p>

          {/* Description */}
          <p className="hero-desc">{COMPANY_INFO.heroDescription}</p>

          {/* Action Buttons */}
          <div className="hero-actions">
            <button
              type="button"
              onClick={() => scrollToSection('products')}
              className="btn btn-primary"
              id="hero-explore-products-btn"
            >
              <span>Explore Our Products</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="btn btn-secondary"
              id="hero-contact-us-btn"
            >
              <PhoneCall size={18} aria-hidden="true" />
              <span>Contact Us</span>
            </button>
          </div>

          {/* Verified Quality Indicators */}
          <div className="hero-badges">
            <span className="hero-badge-pill">✓ ISO &amp; GMP Certified</span>
            <span className="hero-badge-divider">|</span>
            <span className="hero-badge-pill">✓ CAA Approved</span>
          </div>
        </div>

        {/* Right Column: React Bits Pro Click Stack with Prawn & Aqua Pond photography */}
        <div className="hero-visual">
          <ClickStack 
            cardWidth={470}
            cardHeight={380}
            spreadX={18}
            spreadY={-14}
            borderRadius={16}
            duration={0.38}
            ease="power3.out"
            cardColor="#FFFFFF"
            shadowBlur={22}
            shadowOpacity={0.12}
            items={heroCards.map((card, i) => (
              <div key={card.id} className="click-stack-hero-frame">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="click-stack-hero-img"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                <div className="click-stack-hero-caption">
                  <span>{card.caption}</span>
                </div>
              </div>
            ))}
          />
        </div>

      </div>
    </section>
  );
}
