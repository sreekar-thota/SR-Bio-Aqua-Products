import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { KNOWLEDGE_ARTICLES } from '../data/articles';
import KnowledgeModal from './KnowledgeModal';

export default function KnowledgeHub() {
  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <section className="section section-light" id="knowledge">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">Aquaculture Knowledge Hub</div>
          <h2 className="section-title">Farmer Guidance & Best Practices</h2>
          <p className="section-subtitle">
            Practical insights on pond chemistry, nocturnal oxygen dynamics, shell mineral replenishment, and bio-floc probiotic maintenance.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="knowledge-grid">
          {KNOWLEDGE_ARTICLES.map((article) => (
            <article 
              key={article.id} 
              className="knowledge-card" 
              onClick={() => setActiveArticle(article)}
              style={{ cursor: 'pointer' }}
            >
              <div className="knowledge-meta">
                <span className="knowledge-category">{article.category}</span>
                <span className="knowledge-read-time" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={13} />
                  {article.readTime}
                </span>
              </div>

              <h3 className="knowledge-card-title">{article.title}</h3>
              <p className="knowledge-card-summary">{article.summary}</p>

              <div className="knowledge-card-action">
                <span>Read Full Guidance</span>
                <ArrowRight size={16} />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <KnowledgeModal 
          article={activeArticle} 
          onClose={() => setActiveArticle(null)} 
        />
      )}
    </section>
  );
}
