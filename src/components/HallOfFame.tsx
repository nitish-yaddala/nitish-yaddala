'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { hallOfFame } from '@/data/resume';
import ScrollAnimator from './ScrollAnimator';

const severityColors: Record<string, string> = {
  Critical: '#DC2626',
  High: '#EA580C',
  Medium: '#CA8A04',
  Low: '#16A34A',
};

const severityGlow: Record<string, string> = {
  Critical: '0 0 20px rgba(220,38,38,0.3), 0 0 40px rgba(220,38,38,0.1)',
  High: '0 0 15px rgba(234,88,12,0.2)',
  Medium: '0 0 10px rgba(202,138,4,0.15)',
  Low: 'none',
};

const pushpinColors = ['pushpin-red', 'pushpin-yellow', 'pushpin-blue', 'pushpin-green', 'pushpin-white'];

/* ─── Seeded pseudo-random for stable values ─── */
function seededRand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

/* ─── Typewriter text effect ─── */
function TypewriterText({ text, delay = 0, speed = 18 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="typewriter-cursor" />
      )}
    </span>
  );
}

/* ─── Glitching Redaction Bar ─── */
function GlitchRedaction({ width = 80 }: { width?: number }) {
  const [glitchClass, setGlitchClass] = useState('');
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const glitchClasses = ['', 'glitch-1', 'glitch-2', 'glitch-3', 'glitch-4', 'glitch-5', 'glitch-6'];
    let timeout: ReturnType<typeof setTimeout>;

    function scheduleGlitch() {
      const wait = 2000 + Math.random() * 6000;
      timeout = setTimeout(() => {
        const cls = glitchClasses[Math.floor(Math.random() * glitchClasses.length)];
        setGlitchClass(cls);
        setTimeout(() => setGlitchClass(''), 80 + Math.random() * 120);
        scheduleGlitch();
      }, wait);
    }
    scheduleGlitch();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span
      ref={ref}
      className={`inline-block align-middle rounded-sm redact-flicker ${glitchClass}`}
      style={{
        width,
        height: 12,
        background: 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 40%, #1a1a1a 100%)',
        opacity: 0.8,
      }}
    />
  );
}

/* ─── Wanted Poster Card ─── */
function WantedPoster({
  finding,
  index,
  isSpotlight,
  onClick,
}: {
  finding: (typeof hallOfFame)[0];
  index: number;
  isSpotlight: boolean;
  onClick: () => void;
}) {
  const rotation = ((finding.rank * 7 + 3) % 7 - 3) * 0.8;
  const pinColor = pushpinColors[index % pushpinColors.length];
  const isCritical = finding.severity === 'Critical';
  const [stampVisible, setStampVisible] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  // Stable random values for weathering effects
  const seed = finding.rank;
  const stainX = useMemo(() => 15 + seededRand(seed) * 60, [seed]);
  const stainY = useMemo(() => 20 + seededRand(seed + 1) * 50, [seed]);
  const stainSize = useMemo(() => 40 + seededRand(seed + 2) * 40, [seed]);
  const hasCreaseH = seed % 3 !== 0;
  const hasCreaseV = seed % 4 === 0;
  const hasCoffeeStain = seed % 2 === 0;
  const hasBurnEdge = seed % 5 === 0;
  const foxingCount = useMemo(() => Math.floor(seededRand(seed + 3) * 4) + 2, [seed]);
  const curlCorner = useMemo(() => ['br', 'bl', 'tr'][seed % 3], [seed]);

  // Scroll-triggered stamp animation
  useEffect(() => {
    const el = posterRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStampVisible(true), 300 + index * 150);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={posterRef}
      className="relative cursor-pointer group"
      style={{
        paddingTop: '14px',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.3s ease',
        perspective: '600px',
      }}
      onClick={onClick}
    >
      {/* Pushpin */}
      <div className="flex justify-center mb-1" style={{ position: 'relative', zIndex: 10 }}>
        <div className={`pushpin ${pinColor}`} style={{ position: 'relative', top: 0 }} />
      </div>

      {/* Poster body */}
      <div
        className="relative overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl"
        style={{
          background: `linear-gradient(170deg, #c8b48a 0%, #bfab82 15%, #c4ae86 30%, #b9a37b 50%, #c0aa80 70%, #b5a078 85%, #c2ac84 100%)`,
          padding: isSpotlight ? '20px' : '14px',
          boxShadow: isCritical
            ? `3px 5px 15px rgba(0,0,0,0.5), ${severityGlow[finding.severity]}`
            : '3px 5px 15px rgba(0,0,0,0.45)',
          clipPath: isSpotlight
            ? 'polygon(0% 1%, 2% 0%, 5% 1.5%, 8% 0%, 12% 0.5%, 18% 0%, 25% 1%, 32% 0%, 40% 0.5%, 48% 0%, 55% 1%, 62% 0%, 70% 0.5%, 78% 0%, 85% 1%, 92% 0%, 96% 0.5%, 100% 0%, 100% 2%, 99.5% 8%, 100% 15%, 99.5% 22%, 100% 30%, 99% 38%, 100% 46%, 99.5% 54%, 100% 62%, 99% 70%, 100% 78%, 99.5% 86%, 100% 94%, 100% 99%, 96% 100%, 88% 99%, 80% 100%, 72% 99.5%, 64% 100%, 56% 99%, 48% 100%, 40% 99.5%, 32% 100%, 24% 99%, 16% 100%, 8% 99.5%, 2% 100%, 0% 99%, 0.5% 92%, 0% 84%, 0.5% 76%, 0% 68%, 0.5% 60%, 0% 52%, 0.5% 44%, 0% 36%, 0.5% 28%, 0% 20%, 0.5% 12%, 0% 4%)'
            : undefined,
        }}
      >
        {/* === WEATHERING LAYERS === */}

        {/* Paper fiber texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0.1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px',
            opacity: 0.12,
            mixBlendMode: 'multiply',
          }}
        />

        {/* Edge darkening / vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 30px rgba(60,40,10,0.35), inset 0 0 60px rgba(40,25,5,0.15)',
          }}
        />

        {/* Curling corner */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: isSpotlight ? '35px' : '24px',
            height: isSpotlight ? '35px' : '24px',
            ...(curlCorner === 'br' ? { bottom: 0, right: 0 } : curlCorner === 'bl' ? { bottom: 0, left: 0 } : { top: isSpotlight ? '20px' : '14px', right: 0 }),
            background: `linear-gradient(${curlCorner === 'bl' ? '135deg' : curlCorner === 'tr' ? '225deg' : '315deg'}, rgba(30,20,5,0.3) 0%, rgba(60,40,15,0.15) 35%, transparent 60%)`,
            boxShadow: curlCorner === 'br'
              ? 'inset 2px 2px 4px rgba(0,0,0,0.15), -1px -1px 3px rgba(0,0,0,0.1)'
              : curlCorner === 'bl'
              ? 'inset -2px 2px 4px rgba(0,0,0,0.15), 1px -1px 3px rgba(0,0,0,0.1)'
              : 'inset 2px -2px 4px rgba(0,0,0,0.15), -1px 1px 3px rgba(0,0,0,0.1)',
          }}
        />

        {/* Horizontal crease line */}
        {hasCreaseH && (
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: `${35 + (seed % 20)}%`,
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(80,50,10,0.12) 15%, rgba(80,50,10,0.18) 50%, rgba(80,50,10,0.12) 85%, transparent 100%)',
              boxShadow: '0 1px 0 rgba(255,255,255,0.08)',
            }}
          />
        )}

        {/* Vertical crease line */}
        {hasCreaseV && (
          <div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              left: `${40 + (seed % 15)}%`,
              width: '2px',
              background: 'linear-gradient(180deg, transparent 0%, rgba(80,50,10,0.1) 20%, rgba(80,50,10,0.15) 50%, rgba(80,50,10,0.1) 80%, transparent 100%)',
              boxShadow: '1px 0 0 rgba(255,255,255,0.06)',
            }}
          />
        )}

        {/* Coffee ring stain */}
        {hasCoffeeStain && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${stainX}%`,
              top: `${stainY}%`,
              width: `${stainSize}px`,
              height: `${stainSize * 0.95}px`,
              borderRadius: '48% 52% 50% 50%',
              background: `radial-gradient(ellipse, transparent 28%, rgba(80,45,10,0.15) 38%, rgba(100,60,20,0.1) 48%, transparent 58%)`,
              transform: `rotate(${seed * 15}deg)`,
            }}
          />
        )}

        {/* Foxing spots (age spots) */}
        {Array.from({ length: foxingCount }).map((_, i) => {
          const spotSize = Math.round((3 + seededRand(seed + i + 10) * 5) * 10) / 10;
          const spotLeft = Math.round((seededRand(seed + i + 20) * 85 + 5) * 10) / 10;
          const spotTop = Math.round((seededRand(seed + i + 30) * 80 + 5) * 10) / 10;
          const spotAlpha = Math.round((0.08 + seededRand(seed + i + 40) * 0.1) * 100) / 100;
          return (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${spotSize}px`,
                height: `${spotSize}px`,
                left: `${spotLeft}%`,
                top: `${spotTop}%`,
                background: `rgba(90,55,15,${spotAlpha})`,
              }}
            />
          );
        })}

        {/* Burn/scorch edge */}
        {hasBurnEdge && (
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: 0,
              right: 0,
              width: '40%',
              height: '25%',
              background: 'radial-gradient(ellipse at bottom right, rgba(30,15,0,0.25) 0%, rgba(60,30,0,0.1) 40%, transparent 70%)',
            }}
          />
        )}

        {/* Top severity stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ background: severityColors[finding.severity] }}
        />

        {/* === POSTER CONTENT === */}

        {/* WANTED header */}
        <div className="relative text-center mb-2" style={{ borderBottom: '2.5px double #3d2a10', paddingBottom: '6px' }}>
          <div
            className="tracking-[0.5em] font-bold"
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: isSpotlight ? '32px' : '22px',
              color: '#2a1a08',
              lineHeight: 1,
              textShadow: '0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            WANTED
          </div>
          <div
            className="tracking-[0.15em] mt-0.5"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: isSpotlight ? '7px' : '6px',
              color: '#6b5030',
            }}
          >
            DEAD OR ALIVE — VULNERABILITY BOUNTY
          </div>
        </div>

        {/* CVSS "mugshot" box */}
        <div
          className="mx-auto mb-2 flex flex-col items-center justify-center relative"
          style={{
            width: isSpotlight ? '110px' : '72px',
            height: isSpotlight ? '90px' : '60px',
            background: `linear-gradient(135deg, rgba(0,0,0,0.06), ${severityColors[finding.severity]}18, rgba(0,0,0,0.04))`,
            border: `2px solid #5a4020`,
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.08)',
          }}
        >
          <span
            className="font-bold"
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: isSpotlight ? '40px' : '28px',
              color: severityColors[finding.severity],
              lineHeight: 1,
              textShadow: `0 0 8px ${severityColors[finding.severity]}30`,
            }}
          >
            {finding.cvss}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '6px',
              color: '#5a4020',
              letterSpacing: '0.1em',
            }}
          >
            CVSS v3.1
          </span>
        </div>

        {/* Rank watermark */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            top: isSpotlight ? '45px' : '35px',
            right: '6px',
            transform: 'rotate(-18deg)',
            opacity: 0.08,
            fontFamily: 'var(--font-bebas)',
            fontSize: isSpotlight ? '56px' : '40px',
            color: '#2a1a08',
            lineHeight: 1,
          }}
        >
          #{finding.rank}
        </div>

        {/* Title */}
        <div className="text-center mb-1.5">
          <div
            className="tracking-[0.1em] mb-0.5"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: '#7a6040' }}
          >
            ALIAS
          </div>
          <h3
            className="font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-courier)',
              fontSize: isSpotlight ? '14px' : '11px',
              color: '#1a0e00',
            }}
          >
            {finding.title}
          </h3>
        </div>

        {/* Source + Severity row */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span
            className="px-1.5 py-0.5 text-[7px] tracking-wider"
            style={{
              fontFamily: 'var(--font-mono)',
              color: '#5a4020',
              border: '1px solid #8a7050',
            }}
          >
            {finding.source.toUpperCase()}
          </span>
          <span
            className="px-2 py-0.5 text-[8px] tracking-wider font-bold text-white"
            style={{
              fontFamily: 'var(--font-mono)',
              background: severityColors[finding.severity],
            }}
          >
            {finding.severity.toUpperCase()}
          </span>
        </div>

        {/* Significance — spotlight only */}
        {isSpotlight && (
          <p
            className="text-[10px] leading-relaxed text-center mt-1"
            style={{ fontFamily: 'var(--font-crimson)', color: '#3d2a10' }}
          >
            {finding.significance}
          </p>
        )}

        {/* Bottom */}
        <div className="mt-2 pt-1.5 text-center" style={{ borderTop: '1px dashed #8a7050' }}>
          <div
            className="tracking-[0.12em]"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '6px', color: '#7a6040' }}
          >
            CLICK FOR FULL DOSSIER
          </div>
        </div>

        {/* NEUTRALIZED stamp — slams in on scroll */}
        {stampVisible && (
          <div
            className="absolute pointer-events-none select-none stamp-animate"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(-12deg)',
              zIndex: 5,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: isSpotlight ? '22px' : '16px',
                color: '#CC0000',
                border: '3px solid #CC0000',
                padding: isSpotlight ? '4px 16px' : '2px 10px',
                letterSpacing: '0.15em',
                opacity: 0.55,
                background: 'rgba(200,180,138,0.3)',
              }}
            >
              NEUTRALIZED
            </div>
          </div>
        )}

        {/* Tape strip on some */}
        {index % 3 === 0 && <div className="tape-strip" />}
      </div>
    </div>
  );
}

/* ─── Dossier Slide-Out Panel ─── */
function DossierPanel({
  finding,
  onClose,
}: {
  finding: (typeof hallOfFame)[0];
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 z-[10002]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(2px)',
          opacity: visible ? 1 : 0,
        }}
        onClick={handleClose}
      />
      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute top-0 right-0 h-full w-[480px] max-w-[92vw] overflow-y-auto"
        style={{
          background: 'linear-gradient(180deg, var(--rt-classified-bg-from), var(--rt-classified-bg-mid))',
          boxShadow: '-4px 0 30px rgba(0,0,0,0.6)',
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Scanline overlay on panel */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 3px)',
            zIndex: 1,
          }}
        />

        {/* Classified header bar */}
        <div
          className="px-6 py-3 flex items-center justify-between relative z-[2]"
          style={{
            background: 'linear-gradient(90deg, var(--rt-classified-header-from) 0%, var(--rt-classified-header-mid) 50%, var(--rt-classified-header-to) 100%)',
            borderBottom: '1px solid var(--rt-classified-header-border)',
          }}
        >
          <span
            className="text-[9px] tracking-[0.2em] font-bold"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-classified-header-text)' }}
          >
            CLASSIFIED DOSSIER // SUSPECT #{finding.rank}
          </span>
          <button
            onClick={handleClose}
            className="transition-colors text-sm"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--rt-c-text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--rt-c-text-faint)'}
          >
            [CLOSE]
          </button>
        </div>

        <div className="p-8 relative z-[2]">
          {/* Rank + Severity header */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-14 h-14 flex items-center justify-center text-white text-xl font-bold shrink-0"
              style={{
                background: severityColors[finding.severity],
                fontFamily: 'var(--font-bebas)',
                boxShadow: `0 2px 8px rgba(0,0,0,0.4), ${severityGlow[finding.severity]}`,
              }}
            >
              #{finding.rank}
            </div>
            <div>
              <h3
                className="text-lg font-bold mb-1"
                style={{ fontFamily: 'var(--font-courier)', color: 'var(--rt-c-text-primary)' }}
              >
                {finding.title}
              </h3>
              <p className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}>
                {finding.source}
              </p>
            </div>
          </div>

          {/* CVSS Score — large display */}
          <div
            className="p-4 mb-6"
            style={{
              background: 'var(--rt-card-bg)',
              border: `1px solid ${severityColors[finding.severity]}30`,
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="text-5xl font-bold"
                style={{
                  fontFamily: 'var(--font-bebas)',
                  color: severityColors[finding.severity],
                }}
              >
                {finding.cvss}
              </div>
              <div>
                <div
                  className="text-sm tracking-wider font-bold"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: severityColors[finding.severity],
                  }}
                >
                  {finding.severity.toUpperCase()}
                </div>
                <div className="text-[9px] mt-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}>
                  CVSS v3.1 BASE SCORE
                </div>
              </div>
            </div>
          </div>

          {/* Status row with redaction bars */}
          <div className="flex items-center gap-3 mb-6 py-2" style={{ borderTop: '1px solid var(--rt-c-divider)', borderBottom: '1px solid var(--rt-c-divider)' }}>
            <span className="text-[9px] tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}>
              CASE REF:
            </span>
            <GlitchRedaction width={70} />
            <span className="text-[9px] tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}>
              STATUS:
            </span>
            <span className="text-[9px] tracking-wider font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-accent)' }}>
              NEUTRALIZED
            </span>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px flex-1" style={{ background: 'var(--rt-c-divider)' }} />
            <span className="text-[8px] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}>
              INTELLIGENCE BRIEF
            </span>
            <div className="h-px flex-1" style={{ background: 'var(--rt-c-divider)' }} />
          </div>

          {/* Significance — typewriter */}
          <div className="mb-6">
            <div className="text-[9px] tracking-[0.2em] mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>
              SIGNIFICANCE
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-crimson)', color: 'var(--rt-c-text-primary)' }}
            >
              <TypewriterText text={finding.significance} delay={400} speed={12} />
            </p>
          </div>

          {/* Redacted intel line */}
          <div className="flex items-center gap-2 mb-6 opacity-50">
            <span className="text-[8px] tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}>
              [REDACTED]
            </span>
            <GlitchRedaction width={100} />
            <GlitchRedaction width={60} />
          </div>

          {/* Exploit Narrative — typewriter */}
          <div className="mb-8">
            <div className="text-[9px] tracking-[0.2em] mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>
              EXPLOIT NARRATIVE
            </div>
            <p
              className="text-[13px] leading-relaxed"
              style={{ fontFamily: 'var(--font-crimson)', color: 'var(--rt-c-text-secondary)' }}
            >
              <TypewriterText text={finding.narrative} delay={2000} speed={8} />
            </p>
          </div>

          {/* Another redaction cluster */}
          <div className="flex items-center gap-2 mb-6 opacity-40">
            <GlitchRedaction width={50} />
            <span className="text-[8px] tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}>
              [CLASSIFIED]
            </span>
            <GlitchRedaction width={80} />
          </div>

          {/* Classification footer */}
          <div
            className="mt-8 pt-4 text-center"
            style={{ borderTop: '1px solid var(--rt-c-divider)' }}
          >
            <div
              className="inline-block px-4 py-1 text-[9px] tracking-[0.25em] font-bold"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--rt-c-accent)',
                border: '1px solid color-mix(in srgb, var(--rt-c-accent) 25%, transparent)',
                opacity: 0.6,
              }}
            >
              END OF DOSSIER
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function HallOfFame() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [flicker, setFlicker] = useState(1);

  const top3 = hallOfFame.slice(0, 3);
  const rest = hallOfFame.slice(3);

  // Mouse parallax
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: y * -1, y: x * 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  // Fluorescent light flicker
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    function scheduleFlicker() {
      timeout = setTimeout(() => {
        setFlicker(0.92 + Math.random() * 0.04);
        setTimeout(() => {
          setFlicker(1);
          setTimeout(() => {
            if (Math.random() > 0.6) {
              setFlicker(0.88 + Math.random() * 0.06);
              setTimeout(() => setFlicker(1), 50 + Math.random() * 80);
            }
          }, 30);
        }, 40 + Math.random() * 60);
        scheduleFlicker();
      }, 3000 + Math.random() * 8000);
    }
    scheduleFlicker();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section data-section="6" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollAnimator animation="scaleIn">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-current opacity-20" />
            <span className="text-[10px] tracking-[0.3em] opacity-50" style={{ fontFamily: 'var(--font-mono)' }}>
              SECTION 06 // MOST WANTED BOARD
            </span>
            <div className="h-px flex-1 bg-current opacity-20" />
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-3"
            style={{ fontFamily: 'var(--font-courier)' }}
          >
            MOST WANTED
          </h2>
          <p
            className="text-center text-xs tracking-wider opacity-40 mb-10"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Top 10 highest-impact vulnerabilities — ranked by severity and real-world consequence
          </p>
        </ScrollAnimator>

        {/* Dark wall with parallax + flicker */}
        <ScrollAnimator delay={0.05}>
          <div
            ref={boardRef}
            className="cork-board relative rounded-sm p-6 md:p-10"
            style={{
              border: '2px solid var(--rt-wall-frame-border)',
              boxShadow: '0 0 0 8px var(--rt-paper), 0 0 0 10px var(--rt-wall-frame-border), 0 8px 32px var(--rt-wall-frame-shadow)',
              minHeight: '400px',
              perspective: '1000px',
              filter: `brightness(${flicker})`,
              transition: 'filter 0.05s ease',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Parallax wrapper */}
            <div
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              {/* MOST WANTED watermark */}
              <div
                className="absolute pointer-events-none select-none"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-25deg)',
                  opacity: 0.03,
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '120px',
                  color: 'var(--rt-ink)',
                  letterSpacing: '0.2em',
                  whiteSpace: 'nowrap',
                }}
              >
                MOST WANTED
              </div>

              {/* Top 3 — spotlight row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {top3.map((finding, idx) => (
                  <ScrollAnimator key={finding.rank} delay={idx * 0.08}>
                    <WantedPoster
                      finding={finding}
                      index={idx}
                      isSpotlight={true}
                      onClick={() => setExpandedCard(hallOfFame.indexOf(finding))}
                    />
                  </ScrollAnimator>
                ))}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="h-px flex-1" style={{ background: 'var(--rt-c-divider)' }} />
                <span
                  className="text-[8px] tracking-[0.25em]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}
                >
                  ADDITIONAL SUSPECTS
                </span>
                <div className="h-px flex-1" style={{ background: 'var(--rt-c-divider)' }} />
              </div>

              {/* Remaining — compact grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {rest.map((finding, idx) => (
                  <ScrollAnimator key={finding.rank} delay={Math.min((idx + 3) * 0.05, 0.4)}>
                    <WantedPoster
                      finding={finding}
                      index={idx + 3}
                      isSpotlight={false}
                      onClick={() => setExpandedCard(hallOfFame.indexOf(finding))}
                    />
                  </ScrollAnimator>
                ))}
              </div>

              {/* Bottom summary */}
              <div className="mt-8 pt-4 text-center" style={{ borderTop: '1px solid var(--rt-c-divider)' }}>
                <span
                  className="text-[9px] tracking-[0.2em]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}
                >
                  {hallOfFame.filter(f => f.severity === 'Critical').length} CRITICAL &middot;{' '}
                  {hallOfFame.filter(f => f.severity === 'High').length} HIGH &middot;{' '}
                  AVG CVSS: {(hallOfFame.reduce((a, f) => a + f.cvss, 0) / hallOfFame.length).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </ScrollAnimator>
      </div>

      {/* Dossier slide-out — portaled to body */}
      {expandedCard !== null && typeof document !== 'undefined' && createPortal(
        <DossierPanel
          finding={hallOfFame[expandedCard]}
          onClose={() => setExpandedCard(null)}
        />,
        document.body
      )}
    </section>
  );
}
