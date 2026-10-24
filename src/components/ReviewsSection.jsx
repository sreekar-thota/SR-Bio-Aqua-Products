import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, Edit3, X, User } from 'lucide-react';
import { DEFAULT_REVIEWS, fetchAllReviews, submitReviewToBackend, computeRatingsMetrics } from '../data/reviews';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    product: 'SR MINWIN',
    quality: 5,
    quantity: 5,
    delivery: 5,
    review: ''
  });

  useEffect(() => {
    let isMounted = true;
    fetchAllReviews().then((data) => {
      if (isMounted && data && data.length > 0) {
        setReviews(data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const metrics = computeRatingsMetrics(reviews);

  const renderStars = (rating) => {
    const stars = [];
    const num = Math.round(Number(rating) || 5);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          fill={i <= num ? '#F59E0B' : 'none'} 
          color={i <= num ? '#F59E0B' : '#CBD5E1'} 
          aria-hidden="true"
        />
      );
    }
    return stars;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quality' || name === 'quantity' || name === 'delivery' ? parseInt(value) || 5 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.review.trim()) {
      setFormFeedback({ type: 'error', message: 'Please enter your name and review experience.' });
      return;
    }

    setSubmitting(true);
    setFormFeedback(null);

    const newReview = {
      id: `user-${Date.now()}`,
      name: formData.name.trim(),
      location: formData.location.trim() || 'Andhra Pradesh',
      product: formData.product,
      quality: formData.quality,
      quantity: formData.quantity,
      delivery: formData.delivery,
      review: formData.review.trim()
      // Note: Date is intentionally omitted to respect user's requirement
    };

    try {
      await submitReviewToBackend(newReview);
      
      // Update local reviews list so the new review appears immediately at the top
      setReviews((prev) => [newReview, ...prev]);
      setFormFeedback({
        type: 'success',
        message: 'Thank you! Your review has been recorded successfully.'
      });

      // Reset form
      setFormData({
        name: '',
        location: '',
        product: 'SR MINWIN',
        quality: 5,
        quantity: 5,
        delivery: 5,
        review: ''
      });

      // Close modal after brief success confirmation
      setTimeout(() => {
        setIsModalOpen(false);
        setFormFeedback(null);
      }, 1500);

    } catch (err) {
      setFormFeedback({
        type: 'error',
        message: 'Could not reach server. Your review has been saved locally.'
      });
      setReviews((prev) => [newReview, ...prev]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Verified Aqua Feedback</span>
          <h2 className="section-title">Customer Reviews</h2>
          <p className="section-subtitle">
            See what commercial shrimp and fish farmers across Andhra Pradesh are saying about our products and results.
          </p>
        </div>

        {/* Ratings Metrics Summary Strip with "Write a Review" CTA */}
        <div className="reviews-summary-bar">
          <div className="summary-left-group">
            <div className="overall-score-box">
              <span className="overall-score-number">{metrics.overall}</span>
              <div className="stars-row" aria-label={`Overall rating ${metrics.overall} out of 5 stars`}>
                {renderStars(parseFloat(metrics.overall))}
              </div>
              <span className="score-label">Overall Rating</span>
            </div>

            <div className="breakdown-scores-group">
              <div className="metric-score-item">
                <span className="metric-label">Quality</span>
                <span className="metric-num">{metrics.quality}</span>
                <div className="metric-stars">{renderStars(parseFloat(metrics.quality))}</div>
              </div>
              <div className="metric-score-item">
                <span className="metric-label">Quantity</span>
                <span className="metric-num">{metrics.quantity}</span>
                <div className="metric-stars">{renderStars(parseFloat(metrics.quantity))}</div>
              </div>
              <div className="metric-score-item">
                <span className="metric-label">Delivery</span>
                <span className="metric-num">{metrics.delivery}</span>
                <div className="metric-stars">{renderStars(parseFloat(metrics.delivery))}</div>
              </div>
            </div>
          </div>

          {/* Write a Review Button */}
          <div className="summary-action-box">
            <button
              type="button"
              className="btn btn-write-review"
              onClick={() => setIsModalOpen(true)}
              id="btn-open-write-review"
              aria-label="Open Write a Review form"
            >
              <Edit3 size={17} aria-hidden="true" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid — All reviews displayed WITHOUT dates as requested */}
        <div className="reviews-cards-grid" role="list">
          {reviews.map((r, idx) => (
            <div key={r.id || idx} className="farmer-review-card" role="listitem">
              <div className="review-card-top">
                <div className="reviewer-avatar">
                  <User size={18} aria-hidden="true" />
                </div>
                <div className="reviewer-meta">
                  <h3 className="reviewer-name">{r.name}</h3>
                  {r.location && <span className="reviewer-location">{r.location}</span>}
                </div>
                <div className="reviewer-stars" aria-label={`Rating ${r.quality || 5} stars`}>
                  {renderStars(r.quality || 5)}
                </div>
              </div>

              <div className="review-criteria-chips">
                <span className="criteria-chip">Quality: {r.quality || 5}/5</span>
                <span className="criteria-chip">Quantity: {r.quantity || 5}/5</span>
                <span className="criteria-chip">Delivery: {r.delivery || 5}/5</span>
              </div>

              <p className="review-comment-body">"{r.review}"</p>
            </div>
          ))}
        </div>

        {/* Modal: Write a Review Form */}
        {isModalOpen && (
          <div 
            className="modal-backdrop" 
            onClick={() => setIsModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="write-review-title"
          >
            <div className="modal-dialog review-modal-dialog" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setIsModalOpen(false)}
                aria-label="Close review modal"
              >
                <X size={20} aria-hidden="true" />
              </button>

              <div className="review-form-wrapper">
                <h3 id="write-review-title" className="review-form-title">
                  Share Your Farming Experience
                </h3>
                <p className="review-form-subtitle">
                  Help fellow aquaculture farmers make informed pond management decisions.
                </p>

                <form onSubmit={handleSubmit} className="review-interactive-form">
                  <div className="form-row-dual">
                    <div className="form-group-item">
                      <label htmlFor="rev-farmer-name" className="field-label">Farmer / Farm Name *</label>
                      <input 
                        type="text" 
                        id="rev-farmer-name"
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Prasad Naidu"
                        required
                        className="field-input"
                      />
                    </div>

                    <div className="form-group-item">
                      <label htmlFor="rev-location" className="field-label">Location / District</label>
                      <input 
                        type="text" 
                        id="rev-location"
                        name="location" 
                        value={formData.location} 
                        onChange={handleInputChange} 
                        placeholder="e.g. West Godavari, AP"
                        className="field-input"
                      />
                    </div>
                  </div>

                  <div className="form-group-item">
                    <label htmlFor="rev-product" className="field-label">Product Used</label>
                    <select
                      id="rev-product"
                      name="product"
                      value={formData.product}
                      onChange={handleInputChange}
                      className="field-select"
                    >
                      <option value="SR MINWIN">SR MINWIN (Mineral Mixture)</option>
                      <option value="AQUA PROBY+">AQUA PROBY+ (Multi-Species Probiotic)</option>
                      <option value="ZEOLITE Gold Plus">ZEOLITE Gold Plus (Ammonia Removal)</option>
                      <option value="Oxy Tab">Oxy Tab (Oxygen Booster)</option>
                      <option value="Oxy Granules">Oxy Granules (Oxygen Release)</option>
                      <option value="General Solutions">Multiple / General Products</option>
                    </select>
                  </div>

                  {/* Rating Criteria Row */}
                  <div className="form-ratings-row">
                    <div className="rating-select-box">
                      <label htmlFor="rev-quality" className="field-label">Product Quality *</label>
                      <select 
                        id="rev-quality"
                        name="quality" 
                        value={formData.quality} 
                        onChange={handleInputChange} 
                        className="field-select"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ (5 - Excellent)</option>
                        <option value="4">⭐⭐⭐⭐☆ (4 - Good)</option>
                        <option value="3">⭐⭐⭐☆☆ (3 - Average)</option>
                        <option value="2">⭐⭐☆☆☆ (2 - Fair)</option>
                        <option value="1">⭐☆☆☆☆ (1 - Poor)</option>
                      </select>
                    </div>

                    <div className="rating-select-box">
                      <label htmlFor="rev-quantity" className="field-label">Quantity / Pack *</label>
                      <select 
                        id="rev-quantity"
                        name="quantity" 
                        value={formData.quantity} 
                        onChange={handleInputChange} 
                        className="field-select"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ (5 - Accurate)</option>
                        <option value="4">⭐⭐⭐⭐☆ (4 - Good)</option>
                        <option value="3">⭐⭐⭐☆☆ (3 - Average)</option>
                      </select>
                    </div>

                    <div className="rating-select-box">
                      <label htmlFor="rev-delivery" className="field-label">Delivery Speed *</label>
                      <select 
                        id="rev-delivery"
                        name="delivery" 
                        value={formData.delivery} 
                        onChange={handleInputChange} 
                        className="field-select"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ (5 - Very Fast)</option>
                        <option value="4">⭐⭐⭐⭐☆ (4 - On Time)</option>
                        <option value="3">⭐⭐⭐☆☆ (3 - Moderate)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group-item">
                    <label htmlFor="rev-comments" className="field-label">Your Review & Pond Results *</label>
                    <textarea 
                      id="rev-comments"
                      name="review" 
                      value={formData.review} 
                      onChange={handleInputChange} 
                      placeholder="Share your experience regarding pond water quality, shrimp moulting, FCR, or crop survival..."
                      rows={4}
                      required
                      className="field-textarea"
                    />
                  </div>

                  {/* Feedback Message */}
                  {formFeedback && (
                    <div className={`form-alert-banner ${formFeedback.type}`}>
                      {formFeedback.type === 'success' ? (
                        <CheckCircle2 size={18} aria-hidden="true" />
                      ) : (
                        <AlertCircle size={18} aria-hidden="true" />
                      )}
                      <span>{formFeedback.message}</span>
                    </div>
                  )}

                  <div className="form-actions-row">
                    <button 
                      type="submit" 
                      className="btn btn-submit-review"
                      disabled={submitting}
                      id="submit-review-final-btn"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                          <span>Submitting Review...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} aria-hidden="true" />
                          <span>Submit Review</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
