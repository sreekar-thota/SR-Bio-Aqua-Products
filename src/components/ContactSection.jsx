import React from 'react';
import { Phone, Mail, Handshake, MessageSquare, Clock } from 'lucide-react';
import { COMPANY_PHONE, WHATSAPP_NUMBER, COMPANY_INFO } from '../data/company';
import { getGeneralWhatsAppUrl } from '../data/products';

export default function ContactSection() {
  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        
        {/* Section Header */}
        <div className="contact-header">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">
            Have questions about our products? Contact our team for more information.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="contact-grid">
          
          {/* Phone Card */}
          <div className="contact-card">
            <div className="contact-icon-box" aria-hidden="true">
              <Phone size={24} strokeWidth={2.2} />
            </div>
            <h3 className="contact-card-title">Phone</h3>
            <p className="contact-card-sub">Call us for immediate product guidance</p>
            <a 
              href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`} 
              className="contact-card-link"
              aria-label={`Call ${COMPANY_PHONE}`}
            >
              {COMPANY_PHONE}
            </a>
          </div>

          {/* Email Card */}
          <div className="contact-card">
            <div className="contact-icon-box" aria-hidden="true">
              <Mail size={24} strokeWidth={2.2} />
            </div>
            <h3 className="contact-card-title">Email</h3>
            <p className="contact-card-sub">Send requirements or business queries</p>
            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="contact-card-link"
              aria-label={`Email ${COMPANY_INFO.email}`}
            >
              {COMPANY_INFO.email}
            </a>
          </div>

          {/* Get In Touch Card */}
          <div className="contact-card">
            <div className="contact-icon-box" aria-hidden="true">
              <Handshake size={24} strokeWidth={2.2} />
            </div>
            <h3 className="contact-card-title">Get In Touch</h3>
            <p className="contact-card-sub">Serving aqua farmers across allover</p>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card-link"
              aria-label="Connect with us across Andhra Pradesh & Telangana"
            >
              Andhra Pradesh &amp; Telangana
            </a>
          </div>

        </div>

        {/* Prominent WhatsApp CTA & Office Locations */}
        <div className="contact-bottom-box">
          
          {/* WhatsApp Direct Chat Banner */}
          <div className="contact-whatsapp-action">
            <div className="whatsapp-action-text">
              <h3 className="whatsapp-action-heading">Quick Technical or Order Assistance</h3>
              <p className="whatsapp-action-sub">
                Connect directly on WhatsApp for stock availability, pack sizes, and direct farm delivery guidance.
              </p>
            </div>
            <div className="contact-action-buttons">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-chat-whatsapp"
                id="contact-whatsapp-chat-btn"
              >
                <MessageSquare size={19} aria-hidden="true" />
                <span>Chat on WhatsApp</span>
              </a>
              <a 
                href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`}
                className="contact-phone-white-box"
                id="contact-phone-call-btn"
                aria-label={`Call ${COMPANY_PHONE}`}
              >
                <Phone size={16} aria-hidden="true" />
                <span>+91 9959713456</span>
              </a>
            </div>
          </div>

          {/* Facility & Branch Addresses */}
          <div className="contact-addresses-grid">
            <div className="address-block">
              <h4 className="address-title">Manufacturing Unit</h4>
              <p className="address-text">
                Plot No. 168, IDA Prashanthi Nagar<br />
                Kukatpally, Hyderabad – 500037
              </p>
            </div>
            <div className="address-block">
              <h4 className="address-title">Sales Office</h4>
              <p className="address-text">
                {COMPANY_INFO.locations.sales.addressLine1}<br />
                {COMPANY_INFO.locations.sales.addressLine2}
              </p>
            </div>
            <div className="address-block">
              <h4 className="address-title">Business Hours</h4>
              <p className="address-text">
                {COMPANY_INFO.businessHours}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
