import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, Phone } from 'lucide-react';
import { COMPANY_INFO, COMPANY_PHONE } from '../data/company';
import { getGeneralWhatsAppUrl } from '../data/products';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const openWhatsAppEnquiry = () => {
    window.open(getGeneralWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo & Name */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, 'home')} 
          className="brand-link" 
          aria-label="SR Bio Aqua Products Home"
        >
          <img 
            src="/images/logo.jpeg" 
            alt="SR Bio Aqua Products Official Logo" 
            className="brand-logo-img" 
            width="44"
            height="44"
            loading="eager"
          />
          <div className="brand-text">
            <span className="brand-title">SR Bio Aqua Products</span>
            <span className="brand-subtitle">Quality Aquaculture Solutions</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="nav-item-link">Home</a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="nav-item-link">About Us</a>
            </li>
            <li>
              <a href="#products" onClick={(e) => handleLinkClick(e, 'products')} className="nav-item-link">Products</a>
            </li>
            <li>
              <a href="#reviews" onClick={(e) => handleLinkClick(e, 'reviews')} className="nav-item-link">Reviews</a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="nav-item-link">Contact</a>
            </li>
          </ul>
        </nav>

        {/* Action Button: Enquire Now */}
        <div className="nav-actions">
          <button 
            type="button"
            onClick={openWhatsAppEnquiry} 
            className="btn btn-enquire-nav"
            aria-label="Enquire Now on WhatsApp"
          >
            <MessageSquare size={16} aria-hidden="true" />
            <span>Enquire Now</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu" id="mobile-menu" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            <li>
              <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="mobile-nav-link">Home</a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="mobile-nav-link">About Us</a>
            </li>
            <li>
              <a href="#products" onClick={(e) => handleLinkClick(e, 'products')} className="mobile-nav-link">Products</a>
            </li>
            <li>
              <a href="#reviews" onClick={(e) => handleLinkClick(e, 'reviews')} className="mobile-nav-link">Reviews</a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="mobile-nav-link">Contact</a>
            </li>
          </ul>

          <div className="mobile-menu-cta">
            <button 
              type="button"
              onClick={openWhatsAppEnquiry} 
              className="btn btn-enquire-nav mobile-cta-btn"
            >
              <MessageSquare size={18} aria-hidden="true" />
              <span>Enquire Now (WhatsApp)</span>
            </button>
            <a href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`} className="mobile-phone-link">
              <Phone size={15} />
              <span>Call: {COMPANY_PHONE}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
