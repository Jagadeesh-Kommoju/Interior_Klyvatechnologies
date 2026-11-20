import React, { useState, useRef, useEffect, useMemo } from "react";
import { interiorVideos, brandingVideo, interiorClientRatings } from "../config/interiorVideos";
import { parseVideoSource } from "../utils/videoUtils";

// High-Performance Playback Coordinator for HTML5 Reels:
// 1. Hover priority: hovering over any card plays it immediately.
// 2. Active click: tapping / clicking toggles active playback lock.
// 3. Scroll autoplay: top visible videos autoplay on scroll (max 3 simultaneously) to eliminate GPU/CPU lag.
// 4. RAF batching: reconciliation runs inside requestAnimationFrame for buttery 60fps scrolling.
class ReelAutoplayManager {
  constructor(maxSimultaneous = 3) {
    this.maxSimultaneous = maxSimultaneous;
    this.cards = new Map(); // id -> { play, pause, setActiveState, isUserActive, isHovered, ratio, boundingTop }
    this.playingIds = new Set();
    this._rafId = null;
  }

  register(id, playFn, pauseFn, setActiveState) {
    this.cards.set(id, {
      play: playFn,
      pause: pauseFn,
      setActiveState,
      isUserActive: false,
      isHovered: false,
      ratio: 0,
      boundingTop: Infinity,
    });
  }

  unregister(id) {
    this.playingIds.delete(id);
    this.cards.delete(id);
  }

  updateVisibility(id, ratio, boundingTop) {
    const card = this.cards.get(id);
    if (!card) return;
    card.ratio = ratio;
    card.boundingTop = boundingTop;
    this.reconcile();
  }

  onHoverEnter(id) {
    const card = this.cards.get(id);
    if (!card) return;
    card.isHovered = true;
    card.play();
    this.playingIds.add(id);

    // If exceeding max, pause lowest priority non-hovered and non-active card
    if (this.playingIds.size > this.maxSimultaneous) {
      for (const otherId of Array.from(this.playingIds)) {
        if (otherId !== id) {
          const other = this.cards.get(otherId);
          if (other && !other.isHovered && !other.isUserActive) {
            other.pause();
            this.playingIds.delete(otherId);
            break;
          }
        }
      }
    }
  }

  onHoverLeave(id) {
    const card = this.cards.get(id);
    if (!card) return;
    card.isHovered = false;

    // If locked active by user click, keep it playing
    if (card.isUserActive) return;

    this.reconcile();
  }

  toggleActive(id) {
    const card = this.cards.get(id);
    if (!card) return;

    if (card.isUserActive) {
      // Toggle OFF active lock
      card.isUserActive = false;
      if (card.setActiveState) card.setActiveState(false);
      card.pause();
      this.playingIds.delete(id);
      this.reconcile();
    } else {
      // Toggle ON active lock
      card.isUserActive = true;
      if (card.setActiveState) card.setActiveState(true);
      card.play();
      this.playingIds.add(id);

      // Enforce max simultaneous
      if (this.playingIds.size > this.maxSimultaneous) {
        for (const otherId of Array.from(this.playingIds)) {
          if (otherId !== id) {
            const other = this.cards.get(otherId);
            if (other && !other.isHovered && !other.isUserActive) {
              other.pause();
              this.playingIds.delete(otherId);
              break;
            }
          }
        }
      }
    }
  }

  reconcile() {
    if (this._rafId) return;
    this._rafId = requestAnimationFrame(() => {
      this._rafId = null;
      this._reconcileInternal();
    });
  }

  _reconcileInternal() {
    const visibleCandidates = [];
    for (const [id, card] of this.cards.entries()) {
      if (card.isHovered || card.isUserActive) {
        visibleCandidates.unshift({ id, top: -9999, card });
      } else if (card.ratio >= 0.25) {
        visibleCandidates.push({ id, top: card.boundingTop, card });
      }
    }

    visibleCandidates.sort((a, b) => a.top - b.top);
    const targetPlay = visibleCandidates.slice(0, this.maxSimultaneous);
    const targetIds = new Set(targetPlay.map((c) => c.id));

    for (const id of Array.from(this.playingIds)) {
      if (!targetIds.has(id)) {
        const card = this.cards.get(id);
        if (card) {
          card.pause();
        }
        this.playingIds.delete(id);
      }
    }

    for (const item of targetPlay) {
      if (!this.playingIds.has(item.id)) {
        item.card.play();
        this.playingIds.add(item.id);
      }
    }
  }
}

function ReelVideoCard({ reel, index, manager }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const progressFillRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [shouldPreload, setShouldPreload] = useState(false);

  const videoSource = useMemo(() => {
    return parseVideoSource(reel.videoUrl, reel.thumbnail);
  }, [reel.videoUrl, reel.thumbnail]);

  // Mute other videos when one is unmuted
  useEffect(() => {
    if (videoSource.type !== "mp4") return;
    const handleMuteOthers = (e) => {
      if (e.detail?.id !== reel.id && !isMuted) {
        setIsMuted(true);
        if (videoRef.current) {
          videoRef.current.muted = true;
        }
      }
    };
    window.addEventListener("klyva-mute-others", handleMuteOthers);
    return () =>
      window.removeEventListener("klyva-mute-others", handleMuteOthers);
  }, [reel.id, isMuted, videoSource.type]);

  // Ensure DOM-level attributes for iOS Safari / Mobile WebKit
  useEffect(() => {
    if (videoSource.type !== "mp4") return;
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      video.defaultMuted = true;
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");
    }
  }, [isMuted, videoSource.type]);

  // Connect MP4 cards to Central Playback Coordinator
  useEffect(() => {
    if (videoSource.type !== "mp4") return;
    const cardEl = cardRef.current;
    const video = videoRef.current;
    if (!cardEl || !video || !manager) return;

    const playVideo = () => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = isMuted;
      v.defaultMuted = true;
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    const pauseVideo = () => {
      const v = videoRef.current;
      if (v && !v.paused) {
        v.pause();
      }
      setIsPlaying(false);
    };

    manager.register(reel.id, playVideo, pauseVideo, setIsActive);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const rect = entry.boundingClientRect;
          if (entry.isIntersecting) {
            setShouldPreload(true);
          }
          manager.updateVisibility(
            reel.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
            rect.top
          );
        });
      },
      {
        threshold: [0, 0.2, 0.4, 0.6, 0.8],
        rootMargin: "250px 0px 250px 0px",
      }
    );

    observer.observe(cardEl);

    return () => {
      observer.disconnect();
      manager.unregister(reel.id);
    };
  }, [reel.id, isMuted, manager, videoSource.type]);

  // Hover triggers instant play for MP4
  const handleMouseEnter = () => {
    if (videoSource.type === "mp4" && manager) {
      manager.onHoverEnter(reel.id);
    }
  };

  // Leaving hover yields playback unless clicked active
  const handleMouseLeave = () => {
    if (videoSource.type === "mp4" && manager) {
      manager.onHoverLeave(reel.id);
    }
  };

  // Clicking/tapping toggles active play lock or iframe activation
  const handleClick = (e) => {
    e.stopPropagation();
    if (videoSource.type === "mp4") {
      if (manager) {
        manager.toggleActive(reel.id);
      }
    } else if (
      videoSource.type === "youtube" ||
      videoSource.type === "vimeo" ||
      videoSource.type === "instagram"
    ) {
      setIsActive(!isActive);
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoSource.type !== "mp4") return;
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      window.dispatchEvent(
        new CustomEvent("klyva-mute-others", { detail: { id: reel.id } })
      );
      if (video.paused) {
        video
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  const handleTimeUpdate = () => {
    if (
      videoRef.current &&
      videoRef.current.duration &&
      progressFillRef.current
    ) {
      const pct =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      progressFillRef.current.style.width = `${pct}%`;
    }
  };

  // 1. PLACEHOLDER CARD
  if (videoSource.type === "placeholder") {
    return (
      <div
        ref={cardRef}
        className="html5-reel-card"
        style={{ cursor: "default" }}
      >
        <div className="reel-placeholder-box">
          <div className="reel-placeholder-icon">🏛️</div>
          <div className="reel-placeholder-title">{reel.title}</div>
          <div className="reel-placeholder-hint">
            Interior reel configured in
            <br />
            <code>src/config/interiorVideos.js</code>
          </div>
        </div>
        <div className="reel-top-overlay">
          <span className="reel-badge-pill">
            {reel.brand || "Interior Studio"} • REEL {reel.num}
          </span>
          <span
            className="reel-badge-pill"
            style={{ background: "rgba(245, 158, 11, 0.2)", color: "#f59e0b" }}
          >
            {reel.category}
          </span>
        </div>
      </div>
    );
  }

  // 2. INSTAGRAM REEL EMBED PLAYER
  if (videoSource.type === "instagram") {
    return (
      <div
        ref={cardRef}
        className={`html5-reel-card instagram-reel-card ${isActive ? "is-active" : ""}`}
        onClick={handleClick}
      >
        {isActive ? (
          <div className="instagram-embed-wrapper">
            <iframe
              src={videoSource.embedUrl}
              title={reel.title}
              className="html5-reel-iframe instagram-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              scrolling="no"
            />
          </div>
        ) : (
          <div className="instagram-poster-container">
            <img
              src={videoSource.poster}
              alt={reel.title}
              className="reel-poster-fallback"
              loading="lazy"
            />
            <div className="reel-poster-scrim"></div>
            <div className="reel-pause-indicator instagram-play-badge">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <div className="reel-card-meta-bottom">
              <span className="reel-category-pill">{reel.category}</span>
              <h4 className="reel-title-overlay">{reel.title}</h4>
              <div className="reel-meta-stats">
                <span className="reel-views-pill">👁️ {reel.views}</span>
                <span className="reel-brand-tag">{reel.brand}</span>
              </div>
            </div>
          </div>
        )}

        <div className="reel-top-overlay">
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span className="reel-badge-pill">
              {reel.brand} • REEL {reel.num}
            </span>
            {isActive && <span className="reel-active-pill">ACTIVE PLAYER</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <a
              href={videoSource.reelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="reel-insta-direct-btn"
              onClick={(e) => e.stopPropagation()}
              title="Open Reel on Instagram"
              aria-label="Open Reel on Instagram"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <circle cx="12" cy="12" r="3.5"></circle>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <button
              type="button"
              className="reel-sound-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsActive(!isActive);
                setIsPlaying(!isPlaying);
              }}
              title={isActive ? "Close Player" : "Play Video"}
              aria-label="Toggle video playback"
            >
              {isActive ? "✕" : "▶"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. YOUTUBE / VIMEO EMBED PLAYER
  if (videoSource.type === "youtube" || videoSource.type === "vimeo") {
    return (
      <div
        ref={cardRef}
        className={`html5-reel-card ${isPlaying ? "is-playing" : ""} ${isActive ? "is-active" : ""}`}
        onClick={handleClick}
      >
        {isActive ? (
          <iframe
            src={videoSource.embedUrl}
            title={reel.title}
            className="html5-reel-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={videoSource.poster}
              alt={reel.title}
              className="reel-poster-fallback"
              loading="lazy"
            />
            <div className="reel-pause-indicator">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </>
        )}

        <div className="reel-top-overlay">
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span className="reel-badge-pill">
              {reel.brand} • REEL {reel.num}
            </span>
            {isActive && <span className="reel-active-pill">PLAYING</span>}
          </div>
          <button
            type="button"
            className="reel-sound-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsActive(!isActive);
            }}
            title={isActive ? "Close Player" : "Play Video"}
            aria-label="Toggle video playback"
          >
            {isActive ? "✕" : "▶"}
          </button>
        </div>
      </div>
    );
  }

  // 4. DIRECT MP4 HTML5 PLAYER
  return (
    <div
      ref={cardRef}
      className={`html5-reel-card ${isPlaying ? "is-playing" : ""} ${isActive ? "is-active" : ""}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={videoSource.src}
        poster={videoSource.poster}
        className="html5-reel-video"
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        loop
        muted={isMuted}
        preload={shouldPreload ? "metadata" : "none"}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          if (reel.rawVideoUrl && e.currentTarget.src !== reel.rawVideoUrl) {
            e.currentTarget.src = reel.rawVideoUrl;
            e.currentTarget.load();
          }
        }}
      />

      {/* Scrim Overlay */}
      <div className="reel-poster-scrim"></div>

      {/* Top Floating Controls */}
      <div className="reel-top-overlay">
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span className="reel-badge-pill">
            {reel.brand} • REEL {reel.num}
          </span>
          {isActive && <span className="reel-active-pill">ACTIVE</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {reel.instagramUrl && (
            <a
              href={reel.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="reel-insta-direct-btn"
              onClick={(e) => e.stopPropagation()}
              title="Open Reel on Instagram"
              aria-label="Open Reel on Instagram"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <circle cx="12" cy="12" r="3.5"></circle>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          )}
          <button
            type="button"
            className={`reel-sound-btn ${!isMuted ? "unmuted" : ""}`}
            onClick={toggleMute}
            title={isMuted ? "Click to Unmute" : "Click to Mute"}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
              </svg>
            ) : (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Center Play Icon when paused */}
      {!isPlaying && (
        <div className="reel-pause-indicator">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      )}

      {/* Bottom Info Meta */}
      <div className="reel-card-meta-bottom">
        <span className="reel-category-pill">{reel.category}</span>
        <h4 className="reel-title-overlay">{reel.title}</h4>
        <div className="reel-meta-stats">
          <span className="reel-views-pill">👁️ {reel.views}</span>
          <span className="reel-brand-tag">{reel.brand}</span>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="reel-progress-track">
        <div
          ref={progressFillRef}
          className="reel-progress-fill"
          style={{ width: "0%" }}
        ></div>
      </div>
    </div>
  );
}

function StarRating({ rating }) {
  const val = parseFloat(rating);
  return (
    <div
      className="work-stars"
      style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const isFull = val >= i;
        const isHalf = !isFull && val >= i - 0.6;
        const fill = isFull || isHalf ? "#f59e0b" : "#cbd5e1";
        const opacity = isFull ? 1 : isHalf ? 0.65 : 0.3;
        return (
          <svg
            key={i}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill={fill}
            style={{ opacity }}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </div>
  );
}

function BrandingVideoPlayer({ config }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const parsed = useMemo(() => {
    return parseVideoSource(config.videoUrl, config.thumbnail);
  }, [config.videoUrl, config.thumbnail]);

  useEffect(() => {
    if (parsed.type !== "mp4") return;
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      video.defaultMuted = true;
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    }
  }, [isMuted, parsed.type]);

  const togglePlay = () => {
    if (parsed.type !== "mp4") return;
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (parsed.type !== "mp4") return;
    const v = videoRef.current;
    if (!v) return;
    const next = !isMuted;
    v.muted = next;
    setIsMuted(next);
    if (!next && v.paused) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  if (parsed.type === "youtube" || parsed.type === "vimeo") {
    return (
      <div className="work-branding-video-wrap">
        <iframe
          src={parsed.embedUrl}
          title={config.title}
          style={{ width: "100%", height: "100%", border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="work-branding-video-wrap" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={parsed.src}
        poster={parsed.poster}
        className="work-branding-video"
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        autoPlay
        loop
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          if (config.rawVideoUrl && e.currentTarget.src !== config.rawVideoUrl) {
            e.currentTarget.src = config.rawVideoUrl;
            e.currentTarget.load();
          }
        }}
      />

      <div className="work-branding-video-overlay">
        <span className="work-branding-badge">✦ LUXURY INTERIOR ARCHITECTURAL FILM</span>
        <button
          type="button"
          className={`reel-sound-btn ${!isMuted ? "unmuted" : ""}`}
          onClick={toggleMute}
          title={isMuted ? "Click to Unmute" : "Click to Mute"}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
            </svg>
          ) : (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>

      {!isPlaying && (
        <div className="work-branding-pause-indicator">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function WorkSection({ onBookCall, isHomePage = false }) {
  const autoplayManager = useMemo(() => new ReelAutoplayManager(3), []);

  return (
    <section className="work-showcase-section" id="work">
      {/* 1. TOP HERO SHOWCASE CARD */}
      <div className="work-hero-showcase-card">
        {/* Section Header with Left Content & Right Branding Video */}
        <div className="work-header-grid">
          <div className="work-header-content">
            <div className="work-eyebrow-pill">
              <span className="work-badge-spark">✦</span>
              <span className="work-badge-text">EXCLUSIVE INTERIOR DESIGN & ARCHITECTURAL REELS</span>
              <span className="work-badge-status">● LIVE</span>
            </div>

            <h1 className="work-hero-title">
              Transforming Spaces Into Multi-Million Rupee Statements.
              <br />
              <span className="highlight-coral">High-Ticket Interior Leads & Viral Reels.</span>
            </h1>

            <p className="work-hero-description">
              We engineer high-retention cinematic video reels and performance marketing engines for premier
              Interior Designers, Architects, and Turnkey Home Studios — capturing high-intent villa & luxury apartment owners.
            </p>

            {/* Creative Production Capabilities */}
            <div className="work-pillars-grid">
              <div className="work-pillar-card">
                <div className="work-pillar-icon blue">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                </div>
                <div className="work-pillar-text">
                  <span className="work-pillar-title">High-Ticket Lead Funnels</span>
                  <span className="work-pillar-desc">
                    Captures ₹20L–₹2Cr+ qualified villa & penthouse clients
                  </span>
                </div>
              </div>

              <div className="work-pillar-card">
                <div className="work-pillar-icon coral">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <div className="work-pillar-text">
                  <span className="work-pillar-title">4K Cinematic Walkthroughs</span>
                  <span className="work-pillar-desc">
                    Marble textures, fluted joinery & lighting reveals
                  </span>
                </div>
              </div>

              <div className="work-pillar-card">
                <div className="work-pillar-icon green">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="work-pillar-text">
                  <span className="work-pillar-title">High-Net-Worth Local SEO</span>
                  <span className="work-pillar-desc">
                    Rank #1 on Google Maps for "Luxury Interior Designers"
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="work-hero-actions">
              {onBookCall && (
                <button className="work-btn-primary" onClick={onBookCall}>
                  ⚡ Book an Interior Strategy Call →
                </button>
              )}
              <a
                href="#reels-grid"
                className="work-btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("reels-grid");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>▶</span> Explore {interiorVideos.length} Featured Interior Reels ↓
              </a>
            </div>

            {/* Trust Highlights Strip */}
            <div className="work-trust-strip">
              <div className="work-trust-item">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>48-Hour Creative Turnaround</span>
              </div>
              <div className="work-trust-item">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>High-Intent Meta & Google Ads Ready</span>
              </div>
            </div>
          </div>

          {/* Right Side: Running Interior Architecture Film */}
          <div className="work-header-video-col">
            <BrandingVideoPlayer config={brandingVideo} />
          </div>
        </div>

        {/* Infinite Scrolling Interior Client Ticker Banner */}
        <div className="work-clients-ticker-wrap">
          <div className="work-clients-ticker-track">
            {[...interiorClientRatings, ...interiorClientRatings].map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="work-client-rating-card"
              >
                <div className="work-client-avatar">{client.icon}</div>
                <div className="work-client-info">
                  <div className="work-client-name-row">
                    <span className="work-client-name">{client.name}</span>
                    <span className="work-client-tag">{client.tag}</span>
                  </div>
                  <div className="work-client-rating-row">
                    <StarRating rating={client.rating} />
                    <span className="work-rating-score">{client.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. DEDICATED REELS SHOWCASE SECTION */}
      <div className="work-reels-showcase-wrap" id="reels-grid">
        <div className="work-reels-section-header">
          <div className="work-eyebrow-pill" style={{ display: "inline-flex", margin: "0 auto 10px" }}>
            <span className="work-badge-spark">✦</span> {interiorVideos.length} FEATURED INTERIOR REELS
          </div>
          <h2 className="work-reels-section-title">
            Viral Interior & Architectural Walkthroughs
          </h2>
          <p className="work-reels-section-desc">
            Explore authentic high-converting reels scripted and filmed for luxury residential villas, bespoke modular spaces, and architectural studios.
          </p>
        </div>

        {/* Clean Video Grid - All 12 Interior Reels */}
        <div className="html5-reels-grid">
          {interiorVideos.map((reel, index) => (
            <ReelVideoCard
              key={reel.id}
              reel={reel}
              index={index}
              manager={autoplayManager}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="results-cta-bar" style={{ marginTop: "44px" }}>
          <div>
            <div className="results-eyebrow">— SCALE YOUR INTERIOR FIRM —</div>
            <div className="results-title">
              Ready to Scale Your Interior Studio with High-Ticket Clients?
            </div>
          </div>
          {onBookCall && (
            <button className="btn-grow-brand" onClick={onBookCall}>
              Let's Build Your Interior Growth Engine →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
