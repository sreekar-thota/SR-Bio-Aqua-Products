import React from 'react';
import { PackageCheck, FileCheck, Headset, HandHeart } from 'lucide-react';

export default function WhyChooseUs() {
  const cards = [
    {
      icon: PackageCheck,
      title: 'A Range of Aquaculture Products',
      description: 'Formulations developed to address essential pond mineral replenishment, natural bio-remediation, and water condition management.'
    },
    {
      icon: FileCheck,
      title: 'Clear Product Information',
      description: 'Transparent composition specifications, verified packaging sizes, and practical dosage recommendations for pond applications.'
    },
    {
      icon: Headset,
      title: 'Direct Communication with the Team',
      description: 'Direct phone and WhatsApp access to our team for quick responses to product inquiries, availability, and orders.'
    },
    {
      icon: HandHeart,
      title: 'Support for Aqua Farmers',
      description: 'Committed to serving the day-to-day requirements of fish and shrimp growers across Andhra Pradesh and neighboring regions.'
    }
  ];

  return (
    <section className="why-choose-section" id="why-choose-us">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Why Choose SR Bio Aqua Products?</h2>
          <p className="section-subtitle">
            Dedicated service, transparent product specifications, and direct communication for aquaculture farmers.
          </p>
        </div>

        {/* 4 Clean Cards */}
        <div className="why-choose-grid">
          {cards.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="why-card">
                <div className="why-icon-box" aria-hidden="true">
                  <IconComponent size={26} strokeWidth={2.2} />
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
