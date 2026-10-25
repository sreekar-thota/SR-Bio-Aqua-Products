import React from 'react';
import { ShieldCheck, UsersRound, Layers } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function About() {
  const features = [
    {
      title: 'Quality-Focused Products',
      description: 'Manufactured with quality ingredients and standard procedures to support dependable pond water and soil conditions.',
      icon: ShieldCheck
    },
    {
      title: 'Farmer-Centric Support',
      description: 'Direct communication via phone and WhatsApp to help aqua farmers select appropriate products and dosages.',
      icon: UsersRound
    },
    {
      title: 'Solutions for Aquaculture',
      description: 'Targeted products addressing essential minerals, pond probiotics, natural ammonia control, and oxygen management.',
      icon: Layers
    }
  ];

  return (
    <section className="about-section" id="about">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">About SR Bio Aqua Products</h2>
          <p className="about-intro-copy">
            {COMPANY_INFO.aboutIntro}
          </p>
        </div>

        {/* 3 Compact Feature Blocks */}
        <div className="about-features-grid">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div key={idx} className="about-feature-card">
                <div className="feature-icon-box" aria-hidden="true">
                  <IconComponent size={26} strokeWidth={2.25} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Factual Operations Note */}
        <div className="about-operations-note">
          <div className="operations-col">
            <span className="ops-label">Manufacturing Unit:</span>
            <span className="ops-val">Plot No. 168, IDA Prashanthi Nagar, Kukatpally, Hyderabad – 500037</span>
          </div>
          <div className="operations-divider" aria-hidden="true"></div>
          <div className="operations-col">
            <span className="ops-label">Sales Office:</span>
            <span className="ops-val">
              {COMPANY_INFO.locations.sales.addressLine1}, {COMPANY_INFO.locations.sales.addressLine2}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
