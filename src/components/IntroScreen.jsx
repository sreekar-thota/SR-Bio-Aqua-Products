import React, { useState, useEffect, useRef, useCallback } from 'react';

const VIDEO_SRC = '/videos/sr-bio-intro.mp4';
const STATIC_LOGO_SRC = '/images/logo.png';
const FADE_DURATION_MS = 600;
const SAFETY_TIMEOUT_MS = 10000;
const INTRO_BG_COLOR = '#061e0f';

/**
 * Fullscreen Cinematic Logo Reveal Video Intro Screen for SR Bio Aqua Products.
 * 
 * Features:
 * - Solid exact-match dark forest-green background (#061e0f) seamlessly blending with the video's edge pixels
 * - 100vw, 100dvh (with 100vh fallback), fixed position, zero padding/margins/borders
 * - object-fit: contain to preserve the complete hexagonal logo and animation uncropped
 * - Auto-plays from time zero on every page load and refresh (no sessionStorage or localStorage restrictions)
 * - Muted autoplay with playsinline for mobile Safari / Android Chrome
 * - Tap-to-play fallback if autoplay is blocked
 * - Fallback to static logo if video fails to load, with manual continue button
 * - Event-driven transition via onEnded with smooth 600ms fade-out
 */
export default function IntroScreen({ onFinish }) {
  const [isFading, setIsFading] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [useFallbackLogo, setUseFallbackLogo] = useState(false);

  const videoRef = useRef(null);
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

  // Primary event: video finished playing naturally
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
          // If playback still cannot start, proceed to homepage gracefully
          triggerFadeOut();
        });
    }
  }, [triggerFadeOut]);

  useEffect(() => {
    // Prevent scrolling while intro is playing
    document.body.style.overflow = 'hidden';
    // Set matching background on body to prevent overscroll flash on mobile
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

    // Start video from time zero on every page load
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.info('Autoplay blocked by browser policy, presenting tap-to-play prompt:', err);
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
            ref={videoRef}
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
