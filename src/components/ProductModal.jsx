import React, { useEffect } from 'react';
import { X, MessageSquare, Check, Shield, Info, Package, Sparkles } from 'lucide-react';
import { getProductWhatsAppUrl } from '../data/products';

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!product) return null;

  const handleWhatsAppEnquiry = () => {
    const url = getProductWhatsAppUrl(product.name);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modal-product-title"
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close product details modal"
          type="button"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="modal-content-grid">
          {/* Left Side: Product Image & Presentation */}
          <div className="modal-left-media">
            <div className="modal-img-wrap">
              <img 
                src={product.image} 
                alt={`${product.name} packaging`} 
                className="modal-product-img"
              />
            </div>
            <div className="modal-media-pack">
              <Package size={18} color="#4CBB17" aria-hidden="true" />
              <span>Pack Size: <strong>{product.packSize}</strong></span>
            </div>
            <div className="modal-media-badge">
              <span>{product.category}</span>
            </div>
          </div>

          {/* Right Side: Detailed Product Spec */}
          <div className="modal-right-body">
            <span className="modal-category-tag">{product.category}</span>
            <h3 id="modal-product-title" className="modal-title">{product.name}</h3>
            <p className="modal-description">{product.description}</p>

            {/* Key Farming Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="modal-spec-block">
                <h4 className="modal-spec-heading">
                  <Check size={18} color="#4CBB17" aria-hidden="true" />
                  <span>Key Farming Benefits</span>
                </h4>
                <ul className="modal-benefits-list">
                  {product.benefits.map((b, i) => (
                    <li key={i}>
                      <span className="benefit-check" aria-hidden="true">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Verified Composition */}
            {product.composition && (
              <div className="modal-spec-block">
                <h4 className="modal-spec-heading">
                  <Shield size={18} color="#4CBB17" aria-hidden="true" />
                  <span>Verified Composition</span>
                </h4>
                <p className="modal-spec-text">{product.composition}</p>
                {product.bacterialCount && (
                  <p className="modal-spec-text highlight-text">
                    Active Count: {product.bacterialCount}
                  </p>
                )}
              </div>
            )}

            {/* Recommended Dosage & Usage */}
            {product.dosage && (
              <div className="modal-spec-block">
                <h4 className="modal-spec-heading">
                  <Info size={18} color="#4CBB17" aria-hidden="true" />
                  <span>Recommended Dosage & Usage</span>
                </h4>
                <p className="modal-spec-text">{product.dosage}</p>
                {product.fermentation && (
                  <p className="modal-spec-text highlight-text">
                    <strong>Fermentation Method:</strong> {product.fermentation}
                  </p>
                )}
              </div>
            )}

            {/* Storage Information */}
            {product.storage && (
              <div className="modal-spec-block">
                <h4 className="modal-spec-heading">
                  <Package size={18} color="#4CBB17" aria-hidden="true" />
                  <span>Storage Information</span>
                </h4>
                <p className="modal-spec-text">{product.storage}</p>
              </div>
            )}

            {/* Modal Enquiry Actions */}
            <div className="modal-footer-action">
              <button 
                type="button"
                onClick={handleWhatsAppEnquiry} 
                className="btn btn-modal-whatsapp"
                id={`modal-enquire-whatsapp-${product.id}`}
              >
                <MessageSquare size={18} aria-hidden="true" />
                <span>Enquire Price & Availability on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
