import React, { useState, useEffect, useRef, useCallback } from 'react';

const VIDEO_SRC = '/videos/sr-bio-intro.mp4';
const STATIC_LOGO_SRC = '/images/logo.png';
const FADE_DURATION_MS = 600;
const SAFETY_TIMEOUT_MS = 10000;
const INTRO_BG_COLOR = '#061e0f';

/**
 * Fullscreen Cinematic Logo Reveal Video Intro for SR Bio Aqua Products.
 * 
 * Features:
 * - Dual-layer video presentation:
 *   1. Fullscreen background layer: object-fit: cover, blurred 25px, extending the video's
 *      actual dynamic dark-green atmosphere across the entire screen (eliminates desktop side panels).
 *   2. Foreground center layer: object-fit: contain, preserving the complete uncropped hexagonal
 *      emblem and pristine animation.
 * - Synchronized playback of both layers from time zero.
 * - Replays on every refresh, new tab, or direct visit.
 * - Smooth 600ms cubic-bezier transition triggered on foreground video onEnded.
 * - Graceful fallbacks for blocked autoplay (tap-to-play) and network/decode errors (static logo).
 * - Reduced-motion support displaying the static logo.
 */
export default function IntroScreen({ onFinish }) {
  const [isFading, setIsFading] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [useFallbackLogo, setUseFallbackLogo] = useState(false);

  const fgVideoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const finishedRef = useRef(false);
  const fallbackTimerRef = useRef(null);
  const fadeTimerRef = useRef(null);

  // Smooth fade-out transition into homepage
  const triggerFadeOut = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    setIsFading(true);
    document.body.style.overflow = 'unset';

    fadeTimerRef.current = setTimeout(() => {
      if (onFinish) onFinish();
    }, FADE_DURATION_MS);
  }, [onFinish]);

  // Primary event: foreground video completed
  const handleVideoEnded = useCallback(() => {
    triggerFadeOut();
  }, [triggerFadeOut]);

  // Handle video loading or decoding error gracefully
  const handleVideoError = useCallback((e) => {
    console.warn('Intro video failed to load, falling back to static logo:', e);
    setUseFallbackLogo(true);
    fallbackTimerRef.current = setTimeout(() => {
      triggerFadeOut();
    }, 2000);
  }, [triggerFadeOut]);

  // Keep background video synchronized with foreground video
  const handleTimeUpdate = useCallback(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (fg && bg && !fg.paused) {
      if (Math.abs(fg.currentTime - bg.currentTime) > 0.15) {
        bg.currentTime = fg.currentTime;
      }
    }
  }, []);

  // Tap-to-play fallback if the browser blocks muted autoplay
  const handleUserTapToPlay = useCallback(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (fg) {
      fg.muted = true;
      if (bg) {
        bg.muted = true;
        bg.currentTime = fg.currentTime;
        bg.play().catch(() => {});
      }
      fg.play()
        .then(() => {
          setAutoplayBlocked(false);
        })
        .catch(() => {
          // If playback still cannot start, proceed to homepage gracefully
          triggerFadeOut();
        });
    }
  }, [triggerFadeOut]);

  useEffect(() => {
    // Prevent scrolling while intro is active
    document.body.style.overflow = 'hidden';
    const originalBodyBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = INTRO_BG_COLOR;

    // Check user preference for reduced motion
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
        document.body.style.backgroundColor = originalBodyBg;
      };
    }

    // Start both video layers from time zero
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;

    if (fg) {
      fg.currentTime = 0;
      fg.muted = true;

      if (bg) {
        bg.currentTime = 0;
        bg.muted = true;
      }

      const pFg = fg.play();
      const pBg = bg ? bg.play() : Promise.resolve();

      Promise.all([pFg, pBg]).catch((err) => {
        console.info('Autoplay blocked by browser policy, presenting tap-to-play fallback:', err);
        setAutoplayBlocked(true);
      });
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
      document.body.style.backgroundColor = originalBodyBg;
    };
  }, [triggerFadeOut]);

  return (
    <div
      className={`intro-screen-overlay ${isFading ? 'intro-fading' : ''}`}
      role="banner"
      aria-label="SR Bio Aqua Products Introduction"
      onClick={autoplayBlocked ? handleUserTapToPlay : undefined}
    >
      {/* 1. Fullscreen Blurred Background Layer (extends original video atmosphere across entire display) */}
      {!useFallbackLogo && (
        <video
          ref={bgVideoRef}
          src={VIDEO_SRC}
          className="intro-video-bg"
          autoPlay
          muted
          defaultMuted
          playsInline
          webkit-playsinline="true"
          disablePictureInPicture
          controls={false}
          loop={false}
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      {/* 2. Foreground Center Layer (crisp, uncropped, centered logo animation) */}
      <div className="intro-media-wrapper">
        {useFallbackLogo ? (
          <div className="intro-static-fallback">
            <img
              src={STATIC_LOGO_SRC}
              alt="SR Bio Aqua Products Logo"
              className="intro-static-logo"
            />
            <button
              type="button"
              className="intro-continue-btn"
              onClick={triggerFadeOut}
            >
              Continue to Website &rarr;
            </button>
          </div>
        ) : (
          <video
            ref={fgVideoRef}
            src={VIDEO_SRC}
            className="intro-video"
            autoPlay
            muted
            defaultMuted
            playsInline
            webkit-playsinline="true"
            disablePictureInPicture
            controls={false}
            loop={false}
            preload="auto"
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            onTimeUpdate={handleTimeUpdate}
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
