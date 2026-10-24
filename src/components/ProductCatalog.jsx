import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import FlipCard from './FlipCard';
import ProductModal from './ProductModal';
import { PRODUCTS, getProductWhatsAppUrl } from '../data/products';
import { COMPANY_PHONE } from '../data/company';

export default function ProductCatalog() {
  const [flippedProductId, setFlippedProductId] = useState(null);
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const catalogRef = useRef(null);

  // Close flipped card or modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setFlippedProductId(null);
        setActiveModalProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close flipped card when clicking outside any product card container
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (catalogRef.current && !e.target.closest('.product-card-container')) {
        setFlippedProductId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleFlipChange = (productId, isBack) => {
    setFlippedProductId(isBack ? productId : null);
  };

  const handleEnquiryClick = (e, productName) => {
    e.stopPropagation(); // Avoid triggering card rotation
    const url = getProductWhatsAppUrl(productName);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleViewDetails = (e, product) => {
    e.stopPropagation(); // Avoid triggering card rotation
    setActiveModalProduct(product);
  };

  return (
    <section className="products-section" id="products" ref={catalogRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Explore Our Products</h2>
          <p className="section-subtitle">
            Discover our proven aquaculture formulations with authentic specifications, dosage, and direct expert support.
          </p>
          <p className="section-hint" aria-hidden="true">
            Click any product card to flip and view company branding, or click "View Details" to inspect full composition and dosage.
          </p>
        </div>

        {/* Product Cards Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="products-grid" role="list">
          {PRODUCTS.map((product) => {
            const isFlipped = flippedProductId === product.id;

            return (
              <div key={product.id} className="product-card-container">
                {/* React Bits FlipCard Component */}
                <FlipCard
                  flipped={isFlipped}
                  onFlipChange={(flipped) => handleFlipChange(product.id, flipped)}
                  axis="y"
                  flipOnClick={true}
                  draggable={false}
                  tilt={false}
                  glare={false}
                  hoverScale={1}
                  perspective={1000}
                  radius={16}
                  height={450}
                  width="100%"
                  background="#FFFFFF"
                  color="#202820"
                  shadow={true}
                  shadowColor="#17391C"
                  shadowOpacity={0.12}
                  ariaLabel={`${product.name} - Click to flip card`}
                  front={
                    <div className="flip-front-face">
                      <div className="flip-badge-row">
                        <span className="flip-category-tag">{product.category}</span>
                        <span className="flip-hint-badge">
                          <RotateCcw size={12} aria-hidden="true" />
                          <span>Click to Flip</span>
                        </span>
                      </div>

                      <div className="flip-image-box">
                        <img
                          src={product.image}
                          alt={`${product.name} packaging`}
                          className="flip-product-image"
                          loading="lazy"
                        />
                      </div>

                      <div className="flip-content-box">
                        <h3 className="flip-product-name">{product.name}</h3>
                        <p className="flip-product-desc">{product.description}</p>
                        <div className="flip-pack-chip">
                          <span aria-hidden="true">📦</span>
                          <span>Pack Size: {product.packSize}</span>
                        </div>
                      </div>

                      <div className="card-strip-actions">
                        <button
                          type="button"
                          className="btn-view-details"
                          onPointerDown={(e) => e.stopPropagation()}
                          onPointerUp={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(e, product);
                          }}
                          aria-label={`View Details for ${product.name}`}
                          id={`btn-view-details-${product.id}`}
                        >
                          View Details
                        </button>
                        <a
                          href={getProductWhatsAppUrl(product.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-enquire-now"
                          onPointerDown={(e) => e.stopPropagation()}
                          onPointerUp={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEnquiryClick(e, product.name);
                          }}
                          aria-label={`Enquire Now about ${product.name} on WhatsApp`}
                          id={`btn-enquire-${product.id}`}
                        >
                          Enquire Now
                        </a>
                      </div>
                    </div>
                  }
                  back={
                    <div className="flip-back-face">
                      <div className="flip-back-top">
                        <span className="flip-back-badge">SR Bio Aqua Products</span>
                      </div>

                      <div className="flip-back-logo-wrap">
                        <img
                          src="/images/logo.jpeg"
                          alt="SR Bio Aqua Products Official Logo"
                          className="flip-back-logo-img"
                        />
                      </div>

                      <div className="flip-back-info">
                        <h4 className="flip-back-brand">SR Bio Aqua Products</h4>
                        <p className="flip-back-sub">Quality Aquaculture Solutions</p>
                        <div className="flip-back-product-pill">
                          <span>Selected: <strong>{product.name}</strong></span>
                        </div>
                      </div>

                      {/* Quick benefit highlight on back of card */}
                      {product.benefits && product.benefits.length > 0 && (
                        <div className="flip-back-highlights">
                          <div className="flip-back-highlight-item">
                            <span className="back-check" aria-hidden="true">✓</span>
                            <span>{product.benefits[0]}</span>
                          </div>
                        </div>
                      )}

                      <div className="card-strip-actions card-strip-actions--back">
                        <button
                          type="button"
                          className="btn-view-details btn-view-details--back"
                          onPointerDown={(e) => e.stopPropagation()}
                          onPointerUp={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(e, product);
                          }}
                          aria-label={`View Details for ${product.name}`}
                        >
                          View Details
                        </button>
                        <a
                          href={getProductWhatsAppUrl(product.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-enquire-now btn-enquire-now--back"
                          onPointerDown={(e) => e.stopPropagation()}
                          onPointerUp={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEnquiryClick(e, product.name);
                          }}
                          aria-label={`Enquire Now about ${product.name} on WhatsApp`}
                        >
                          Enquire Now
                        </a>
                      </div>

                      <div className="flip-back-footer">
                        <span className="flip-back-hint">
                          <RotateCcw size={11} aria-hidden="true" />
                          <span>Click card to flip back</span>
                        </span>
                      </div>
                    </div>
                  }
                />

                {/* Flip hint below the card */}
                <div className="product-card-bottom-action">
                  <div className="product-flip-prompt">
                    <RotateCcw size={13} aria-hidden="true" />
                    <span>{isFlipped ? 'Click card to flip back to front' : 'Click card to flip (SR Logo on reverse)'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Contact Notice */}
        <div className="catalog-footer-note">
          <p>
            Prefer direct phone enquiry? Call our technical sales desk at{' '}
            <a href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`} className="text-link">
              {COMPANY_PHONE}
            </a>{' '}
            or email{' '}
            <a href="mailto:sales@srbioaquaproducts.com" className="text-link">
              sales@srbioaquaproducts.com
            </a>.
          </p>
        </div>

      </div>

      {/* Product Details Modal (Full Specifications Step) */}
      {activeModalProduct && (
        <ProductModal 
          product={activeModalProduct} 
          onClose={() => setActiveModalProduct(null)} 
        />
      )}
    </section>
  );
}
