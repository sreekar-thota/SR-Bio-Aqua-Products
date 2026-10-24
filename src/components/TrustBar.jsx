import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Truck } from 'lucide-react';

export default function TrustBar() {
  const trustPoints = [
    {
      icon: <Award size={24} />,
      title: 'Premium Quality Formulations',
      desc: 'Formulated for optimal pond performance'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'ISO & GMP Certified',
      desc: 'Standardized manufacturing practices'
    },
    {
      icon: <CheckCircle2 size={24} />,
      title: 'CAA Approved Products',
      desc: 'Coastal Aquaculture Authority compliant'
    },
    {
      icon: <Truck size={24} />,
      title: 'Fast Regional Delivery',
      desc: 'Direct dispatch across farming clusters'
    }
  ];

  return (
    <section className="trust-strip">
      <div className="container">
        <div className="trust-grid">
          {trustPoints.map((pt, i) => (
            <div key={i} className="trust-cell">
              <div className="trust-icon-box">
                {pt.icon}
              </div>
              <div>
                <h4 className="trust-cell-title">{pt.title}</h4>
                <p className="trust-cell-desc">{pt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
