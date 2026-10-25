import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_PHONE, COMPANY_INFO } from '../data/company';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScroll = (id) => {
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

  return (
    <footer className="site-footer">
      <div className="container">
        
        <div className="footer-main-row">
          {/* Logo & Company Name */}
          <div className="footer-brand">
            <div className="footer-logo-row">
              <img 
                src="/images/logo.png" 
                alt="SR Bio Aqua Products Logo" 
                className="footer-logo-img" 
                width="40"
                height="40"
              />
              <div>
                <span className="footer-brand-title">SR Bio Aqua Products</span>
                <span className="footer-brand-tagline">Quality Aquaculture Solutions</span>
              </div>
            </div>
            <p className="footer-about-text">
              Supporting aqua farmers across Andhra Pradesh and Telangana with quality formulations for pond management, minerals, probiotics, and water care.
            </p>
          </div>

          {/* Navigation Links: Home, About, Products, Contact */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Navigation</h4>
            <ul className="footer-links">
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); handleScroll('home'); }}>Home</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); handleScroll('about'); }}>About</a>
              </li>
              <li>
                <a href="#products" onClick={(e) => { e.preventDefault(); handleScroll('products'); }}>Products</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleScroll('contact'); }}>Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-contact-col">
            <h4 className="footer-col-heading">Direct Contact</h4>
            <ul className="footer-contact-list">
              <li>
                <Phone size={14} aria-hidden="true" />
                <a href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`}>{COMPANY_PHONE}</a>
              </li>
              <li>
                <Mail size={14} aria-hidden="true" />
                <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
              </li>
              <li>
                <MapPin size={14} aria-hidden="true" />
                <span>Velpuru, Tanuku, West Godavari Dist.</span>
              </li>
              <li>
                <MapPin size={14} aria-hidden="true" />
                <span>Hyderabad, Telangana</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {currentYear} SR Bio Aqua Products. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
