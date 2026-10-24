import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import './ClickStack.css';

/**
 * ClickStack Component (React Bits Pro specification)
 * Interactive card stack you click through with GSAP fluid physics.
 * Fully responsive across mobile, tablet, and desktop viewports.
 */
export default function ClickStack({
  items = [],
  cardWidth = 470,
  cardHeight = 380,
  spreadX = 16,
  spreadY = -12,
  duration = 0.38,
  ease = "power3.out",
  borderRadius = 16,
  shadowBlur = 22,
  shadowOpacity = 0.12,
  cardColor = "#ffffff",
  visibleCount = 4,
  depthScale = 0.04,
  depthOpacity = 0,
  className = "",
  cardClassName = "",
  onCardChange = null
}) {
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const isAnimating = useRef(false);
  const cardRefs = useRef([]);
  const containerRef = useRef(null);

  // Responsive spread measurement
  const [effectiveSpreadX, setEffectiveSpreadX] = useState(spreadX);
  const [effectiveSpreadY, setEffectiveSpreadY] = useState(spreadY);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 600;
      setEffectiveSpreadX(isMobile ? Math.min(10, spreadX) : spreadX);
      setEffectiveSpreadY(isMobile ? -8 : spreadY);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [spreadX, spreadY]);

  useEffect(() => {
    setOrder(items.map((_, i) => i));
  }, [items.length]);

  // Position cards in depth stack with clean zero rotation
  useEffect(() => {
    order.forEach((itemIdx, depth) => {
      const el = cardRefs.current[itemIdx];
      if (!el) return;

      const isVisible = depth < visibleCount;
      const x = depth * effectiveSpreadX;
      const y = depth * effectiveSpreadY;
      const scale = Math.max(0.5, 1 - depth * depthScale);
      const zIndex = items.length - depth;
      const opacity = isVisible ? Math.max(0, 1 - depth * depthOpacity) : 0;

      gsap.set(el, {
        x,
        y,
        scale,
        rotation: 0,
        zIndex,
        opacity,
        pointerEvents: depth === 0 ? 'auto' : 'none',
        transformOrigin: 'center center'
      });
    });
  }, [order, effectiveSpreadX, effectiveSpreadY, depthScale, depthOpacity, visibleCount, items.length]);

  const handleNext = useCallback(() => {
    if (isAnimating.current || items.length <= 1) return;
    isAnimating.current = true;

    const topIndex = order[0];
    const topEl = cardRefs.current[topIndex];
    const nextOrder = [...order.slice(1), topIndex];
    const currentContainerWidth = containerRef.current ? containerRef.current.offsetWidth : 350;

    const tl = gsap.timeline({
      onComplete: () => {
        if (topEl) {
          gsap.set(topEl, { rotation: 0 });
        }
        setOrder(nextOrder);
        isAnimating.current = false;
        if (onCardChange) {
          onCardChange(nextOrder[0]);
        }
      }
    });

    // 1. Top card slides out cleanly horizontally with ZERO rotation
    if (topEl) {
      tl.to(topEl, {
        x: currentContainerWidth * 0.42,
        y: -10,
        rotation: 0,
        scale: 1,
        opacity: 0,
        duration: duration * 0.75,
        ease: 'power2.in'
      }, 0);
    }

    // 2. Behind cards animate forward by 1 depth level with ZERO rotation
    for (let depth = 1; depth < order.length; depth++) {
      const itemIdx = order[depth];
      const el = cardRefs.current[itemIdx];
      if (!el) continue;

      const newDepth = depth - 1;
      const isVisible = newDepth < visibleCount;
      const targetX = newDepth * effectiveSpreadX;
      const targetY = newDepth * effectiveSpreadY;
      const targetScale = Math.max(0.5, 1 - newDepth * depthScale);
      const targetOpacity = isVisible ? Math.max(0, 1 - newDepth * depthOpacity) : 0;
      const newZIndex = items.length - newDepth;

      tl.to(el, {
        x: targetX,
        y: targetY,
        rotation: 0,
        scale: targetScale,
        opacity: targetOpacity,
        duration: duration,
        ease: ease,
        onStart: () => {
          el.style.zIndex = newZIndex;
          el.style.pointerEvents = newDepth === 0 ? 'auto' : 'none';
        }
      }, 0.05);
    }
  }, [order, items.length, effectiveSpreadX, effectiveSpreadY, depthScale, depthOpacity, visibleCount, duration, ease, onCardChange]);

  const activeIndex = order[0] ?? 0;

  return (
    <div 
      ref={containerRef}
      className={`click-stack-wrapper ${className}`}
      style={{
        '--card-max-w': `${cardWidth}px`,
        '--card-max-h': `${cardHeight}px`
      }}
    >
      <div 
        className="click-stack-container"
        onClick={handleNext}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleNext();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Click stack cards, click to advance to next card"
      >
        {items.map((item, index) => {
          const depth = order.indexOf(index);
          const isTop = depth === 0;

          return (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`click-stack-card ${isTop ? 'is-top' : ''} ${cardClassName}`}
              style={{
                borderRadius: `${borderRadius}px`,
                backgroundColor: cardColor,
                boxShadow: `0 10px ${shadowBlur}px rgba(23, 57, 28, ${shadowOpacity}), 0 2px 6px rgba(23, 57, 28, 0.06)`
              }}
            >
              {typeof item === 'function' ? item({ isTop, depth, index }) : item}
            </div>
          );
        })}
      </div>

      {/* Stack interaction hint badge */}
      <div className="click-stack-footer" onClick={handleNext}>
        <div className="click-stack-counter">
          <span className="click-stack-counter-current">{activeIndex + 1}</span>
          <span className="click-stack-counter-slash">/</span>
          <span className="click-stack-counter-total">{items.length}</span>
        </div>
        <div className="click-stack-hint">
          <span className="click-stack-hint-dot" aria-hidden="true"></span>
          <span>Click to flip</span>
        </div>
      </div>
    </div>
  );
}
