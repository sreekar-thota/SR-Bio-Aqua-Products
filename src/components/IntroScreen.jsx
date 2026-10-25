import React, { useState, useEffect, useRef, useCallback } from 'react';
import FoldText from './FoldText';

export default function IntroScreen({ onFinish }) {
  const [isFading, setIsFading] = useState(false);
  const finishedRef = useRef(false);

  const triggerFadeOut = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setIsFading(true);
    setTimeout(() => {
      document.body.style.overflow = 'unset';
      if (onFinish) onFinish();
    }, 650);
  }, [onFinish]);

  const handleFoldComplete = useCallback(() => {
    // Hold the completed unfolded text for 1.1s so user appreciates the brand
    setTimeout(() => {
      triggerFadeOut();
    }, 1100);
  }, [triggerFadeOut]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Safety fallback timer to ensure intro completes on any screen/device
    const fallbackTimer = setTimeout(() => {
      triggerFadeOut();
    }, 3200);

    return () => {
      clearTimeout(fallbackTimer);
      document.body.style.overflow = 'unset';
    };
  }, [triggerFadeOut]);

  return (
    <div
      className={`intro-screen-overlay ${isFading ? 'intro-fading' : ''}`}
      role="banner"
      aria-label="SR Bio Aqua Products Introduction"
    >
      <div className="intro-container">
        {/* Brand Logo with entrance animation */}
        <div className="intro-logo-wrap">
          <img
            src="/images/logo.png"
            alt="SR Bio Aqua Products Logo"
            className="intro-logo"
          />
        </div>

        {/* FoldText React Bits Animation — Plays Exactly Once */}
        <div className="intro-title-wrap">
          <FoldText
            text="SR Bio Aqua Products"
            foldStyle="paper"
            splitBy="char"
            hinge="top"
            trigger="mount"
            foldAngle={92}
            duration={0.65}
            stagger={0.035}
            staggerFrom="start"
            ease="power3.out"
            perspective={700}
            creaseShading={0.35}
            fontSize="clamp(1.85rem, 5vw, 3.2rem)"
            fontWeight={800}
            color="#FFFFFF"
            onComplete={handleFoldComplete}
          />
        </div>

        {/* Tagline animated smoothly via pure CSS */}
        <p className="intro-tagline">
          Quality Aquaculture Solutions
        </p>

        {/* Accent bar animated smoothly via pure CSS */}
        <div className="intro-accent-bar" />
      </div>
    </div>
  );
}
