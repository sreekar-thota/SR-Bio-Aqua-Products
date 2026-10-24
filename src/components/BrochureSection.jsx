import React from 'react';
import { FileText, ExternalLink, BookOpen } from 'lucide-react';

export default function BrochureSection() {
  const brochureUrl = '/sr-bio-aqua-brochure.pdf';

  return (
    <section className="brochure-section" id="brochure" aria-label="Company Brochure">
      <div className="container">
        <div className="brochure-card">
          
          {/* Thumbnail Preview */}
          <div className="brochure-thumbnail-wrap">
            <a
              href={brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="brochure-thumbnail-link"
              title="Open SR Bio Aqua Products Company Brochure in new tab"
              aria-label="Open SR Bio Aqua Products Company Brochure PDF in new tab"
            >
              <img
                src="/images/brochure-cover.jpg"
                alt="SR Bio Aqua Products Company Brochure Cover"
                className="brochure-cover-img"
                width="120"
                height="170"
                loading="lazy"
              />
              <span className="brochure-pill-badge">
                <FileText size={12} aria-hidden="true" />
                <span>PDF Document</span>
              </span>
            </a>
          </div>

          {/* Brochure Text Information */}
          <div className="brochure-content">
            <div className="brochure-tag">
              <BookOpen size={15} aria-hidden="true" />
              <span>Official Publication</span>
            </div>

            <h2 className="brochure-heading">Explore Our Company Brochure</h2>

            <p className="brochure-desc">
              Discover SR Bio Aqua Products, our product range, and our aquaculture solutions.
            </p>

            <div className="brochure-features">
              <span className="brochure-feature-item">&bull; Complete Product Specifications</span>
              <span className="brochure-feature-item">&bull; Dosage &amp; Application Guide</span>
              <span className="brochure-feature-item">&bull; Aquaculture Pond Management</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="brochure-action">
            <a
              href={brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-brochure"
              id="btn-view-brochure"
              aria-label="View Our Brochure (PDF) - Opens in new tab"
            >
              <FileText size={18} aria-hidden="true" />
              <span>View Our Brochure (PDF)</span>
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
