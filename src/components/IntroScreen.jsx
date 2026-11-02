import React, { useState, useEffect, useRef, useCallback } from 'react';

const VIDEO_SRC = '/videos/sr-bio-intro.mp4';
const STATIC_LOGO_SRC = '/images/logo.png';
const FADE_DURATION_MS = 650;
const SAFETY_TIMEOUT_MS = 10000;

/**
 * Cinematic Logo Reveal Video Intro Screen for SR Bio Aqua Products.
 * 
 * Plays the supplied 5-second logo reveal video on a solid deep forest-green (#17391C)
 * background, preserves aspect ratio with object-fit: contain, handles autoplay policy,
 * reduced-motion preferences, video loading errors, and smoothly transitions into the
 * homepage via onEnded.
 */
export default function IntroScreen({ onFinish }) {
  const [isFading, setIsFading] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [useFallbackLogo, setUseFallbackLogo] = useState(false);

  const videoRef = useRef(null);
  const finishedRef = useRef(false);
  const fallbackTimerRef = useRef(null);
  const fadeTimerRef = useRef(null);

  // Trigger smooth fade-out and transition into homepage
  const triggerFadeOut = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    setIsFading(true);
    document.body.style.overflow = 'unset';

    fadeTimerRef.current = setTimeout(() => {
      if (onFinish) onFinish();
    }, FADE_DURATION_MS);
  }, [onFinish]);

  // Primary event: video finished playing naturally
  const handleVideoEnded = useCallback(() => {
    triggerFadeOut();
  }, [triggerFadeOut]);

  // Handle video loading or decoding error gracefully
  const handleVideoError = useCallback((e) => {
    console.warn('Video failed to load or play, falling back to static logo:', e);
    setUseFallbackLogo(true);
    fallbackTimerRef.current = setTimeout(() => {
      triggerFadeOut();
    }, 1500);
  }, [triggerFadeOut]);

  // Tap-to-play fallback if the browser blocks muted autoplay
  const handleUserTapToPlay = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video
        .play()
        .then(() => {
          setAutoplayBlocked(false);
        })
        .catch(() => {
          // If playback still cannot start, gracefully proceed to homepage
          triggerFadeOut();
        });
    }
  }, [triggerFadeOut]);

  useEffect(() => {
    // Lock body scroll while intro screen is active
    document.body.style.overflow = 'hidden';

    // Respect user's reduced-motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setUseFallbackLogo(true);
      fallbackTimerRef.current = setTimeout(() => {
        triggerFadeOut();
      }, 1500);
      return () => {
        if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
        document.body.style.overflow = 'unset';
      };
    }

    // Programmatic play trigger for reliable autoplay across browsers
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.info('Autoplay prevented by browser, displaying tap-to-play fallback:', err);
          setAutoplayBlocked(true);
        });
      }
    }

    // Safety timeout: Ensure visitor is never trapped if video stalls indefinitely
    const safetyTimer = setTimeout(() => {
      triggerFadeOut();
    }, SAFETY_TIMEOUT_MS);

    return () => {
      clearTimeout(safetyTimer);
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      document.body.style.overflow = 'unset';
    };
  }, [triggerFadeOut]);

  return (
    <div
      className={`intro-screen-overlay ${isFading ? 'intro-fading' : ''}`}
      role="banner"
      aria-label="SR Bio Aqua Products Introduction"
      onClick={autoplayBlocked ? handleUserTapToPlay : undefined}
    >
      <div className="intro-media-wrapper">
        {useFallbackLogo ? (
          <div className="intro-static-fallback" onClick={triggerFadeOut}>
            <img
              src={STATIC_LOGO_SRC}
              alt="SR Bio Aqua Products Logo"
              className="intro-static-logo"
            />
          </div>
        ) : (
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            className="intro-video"
            autoPlay
            muted
            defaultMuted
            playsInline
            webkit-playsinline="true"
            preload="auto"
            onEnded={handleVideoEnded}
            onError={handleVideoError}
          />
        )}

        {/* Minimal Tap-to-Play Fallback (only shown if browser blocks autoplay) */}
        {autoplayBlocked && !useFallbackLogo && (
          <button
            type="button"
            className="intro-tap-fallback"
            onClick={(e) => {
              e.stopPropagation();
              handleUserTapToPlay();
            }}
            aria-label="Tap to play intro video"
          >
            <svg
              className="intro-play-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="22"
              height="22"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Tap to Play</span>
          </button>
        )}
      </div>
    </div>
  );
}
