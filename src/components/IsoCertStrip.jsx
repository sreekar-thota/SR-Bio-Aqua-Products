import React, { useState, useEffect } from 'react';
import { Award, Eye, X, ShieldCheck } from 'lucide-react';

export default function IsoCertStrip() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <section className="iso-strip-section" id="certification" aria-label="ISO 9001:2015 Certification">
      <div className="container">
        <div className="iso-strip-card">
          
          {/* Left Column: Authentic ISO Details */}
          <div className="iso-strip-content">
            <div className="iso-badge-tag">
              <ShieldCheck size={16} aria-hidden="true" />
              <span>Verified ISO Certification</span>
            </div>

            <h2 className="iso-strip-heading">Quality You Can Trust</h2>

            <p className="iso-strip-intro">
              SR Bio Aqua Products operates a certified Quality Management System complying with{' '}
              <strong>ISO 9001:2015</strong> standards, audited and accredited for commercial aquaculture excellence.
            </p>

            <div className="iso-details-grid">
              <div className="iso-detail-item">
                <span className="iso-detail-label">Certified Standard</span>
                <span className="iso-detail-val iso-highlight">ISO 9001:2015</span>
              </div>
              <div className="iso-detail-item">
                <span className="iso-detail-label">Certificate Number</span>
                <span className="iso-detail-val">QMS-MMXXVI-2-16504</span>
              </div>
              <div className="iso-detail-item">
                <span className="iso-detail-label">Accreditation</span>
                <span className="iso-detail-val">AIAO-BAR (USA) &bull; WRG</span>
              </div>
              <div className="iso-detail-item">
                <span className="iso-detail-label">Validity Period</span>
                <span className="iso-detail-val">Feb 2026 – Feb 2029</span>
              </div>
            </div>

            <div className="iso-scope-box">
              <span className="iso-scope-label">Certified Scope of Operations:</span>
              <p className="iso-scope-text">
                Manufacturing &amp; Supply of Aqua Probiotics, Minerals, Oxygen Tablets, Oxygen Granules and Feed Supplements.
              </p>
            </div>

            <div className="iso-strip-actions">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary btn-iso-view"
                id="btn-view-iso-certificate"
                aria-label="View official ISO certificate in larger view"
              >
                <Eye size={18} aria-hidden="true" />
                <span>View Certificate</span>
              </button>
            </div>
          </div>

          {/* Right Column: Authentic Certificate Preview Thumbnail */}
          <div className="iso-strip-preview-wrap">
            <div 
              className="iso-thumbnail-card"
              onClick={() => setIsModalOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsModalOpen(true);
                }
              }}
              aria-label="Click to enlarge official ISO 9001:2015 certificate"
            >
              <img
                src="/images/iso-certificate.jpg"
                alt="SR Bio Aqua Products ISO 9001:2015 Certificate of Registration issued by WRG Certifications"
                className="iso-thumbnail-img"
                loading="lazy"
                width="340"
                height="440"
              />
              <div className="iso-thumbnail-overlay">
                <Eye size={20} aria-hidden="true" />
                <span>Click to View Full Certificate</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Readable Larger View Modal */}
      {isModalOpen && (
        <div 
          className="iso-modal-overlay" 
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="iso-modal-title"
        >
          <div 
            className="iso-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="iso-modal-header">
              <div className="iso-modal-header-info">
                <div className="iso-modal-tag">
                  <Award size={16} aria-hidden="true" />
                  <span>ISO 9001:2015 Certificate of Registration</span>
                </div>
                <h3 id="iso-modal-title" className="iso-modal-title">
                  SR Bio Aqua Products &bull; Certificate No: QMS-MMXXVI-2-16504
                </h3>
              </div>

              <div className="iso-modal-header-actions">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="iso-modal-close-btn"
                  aria-label="Close certificate view"
                >
                  <X size={22} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Modal Certificate View (Readable, High Resolution) */}
            <div className="iso-modal-body">
              <img
                src="/images/iso-certificate.jpg"
                alt="High resolution official ISO 9001:2015 certificate for SR Bio Aqua Products"
                className="iso-modal-cert-image"
              />
            </div>

            {/* Modal Footer */}
            <div className="iso-modal-footer">
              <span className="iso-modal-footer-note">
                Accredited by American International Accreditation Organization (AIAO-BAR) &bull; Registered with WRG Certifications
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn btn-primary btn-iso-modal-close"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
