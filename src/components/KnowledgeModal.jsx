import React, { useEffect } from 'react';
import { X, BookOpen, CheckCircle, AlertTriangle, Clock, ArrowRight } from 'lucide-react';

export default function KnowledgeModal({ article, onClose }) {
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

  if (!article) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close article modal">
          <X size={20} />
        </button>

        <div className="article-modal-body">
          <div className="article-modal-header">
            <div className="article-badge-row">
              <span className="knowledge-category">{article.category}</span>
              <span className="knowledge-read-time" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={14} />
                {article.readTime}
              </span>
            </div>
            <h2 className="article-modal-title">{article.title}</h2>
          </div>

          {/* Article Paragraph Sections */}
          <div className="article-content-flow">
            {article.content.map((sec, idx) => (
              <div key={idx} className="article-section-block">
                <h3 className="article-section-heading">{sec.heading}</h3>
                <p className="article-section-body">{sec.body}</p>
              </div>
            ))}
          </div>

          {/* Practical Farmer Takeaways */}
          {article.practicalTakeaways && (
            <div className="article-takeaways-box">
              <h4 className="article-takeaways-title">
                Practical On-Farm Actions for Farmers
              </h4>
              <ul className="article-takeaways-list">
                {article.practicalTakeaways.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer distinguishing educational advice from product label */}
          <div className="article-disclaimer">
            <strong>Educational Notice:</strong> The information provided in this knowledge hub is compiled for general educational and technical guidance purposes. Actual pond treatment rates should always follow manufacturer product labels and instructions verified with qualified aquaculture consultants based on individual pond water analysis.
          </div>
        </div>
      </div>
    </div>
  );
}
