'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { executiveSummary, focusAreas } from '@/data/resume';
import ScrollAnimator from './ScrollAnimator';

// Random glitch effect — fires at unpredictable intervals
function useRandomGlitch() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    const glitchSteps = ['glitch-1', 'glitch-2', 'glitch-3', 'glitch-4', 'glitch-5', 'glitch-6'];

    function doGlitch() {
      // Random number of rapid flicker steps (2-5)
      const steps = 2 + Math.floor(Math.random() * 4);
      let delay = 0;

      for (let i = 0; i < steps; i++) {
        const cls = glitchSteps[Math.floor(Math.random() * glitchSteps.length)];
        const duration = 30 + Math.random() * 80;

        setTimeout(() => {
          el?.classList.add(cls);
          setTimeout(() => el?.classList.remove(cls), duration);
        }, delay);

        delay += duration + (Math.random() * 40);
      }

      // Schedule next glitch at random interval: 0.5s to 4s
      const nextDelay = 500 + Math.random() * 3500;
      timeoutId = setTimeout(doGlitch, delay + nextDelay);
    }

    // First glitch after random initial delay
    timeoutId = setTimeout(doGlitch, 800 + Math.random() * 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return ref;
}


function stableRotation(index: number): number {
  const rotations = [-3.5, 2.1, -1.8, 3.2, -2.4, 1.5, -3.0, 2.8, -1.2, 3.6];
  return rotations[index % rotations.length];
}

const stampStyles = [
  { color: '#CC0000', borderColor: '#CC0000' },
  { color: '#8B1A1A', borderColor: '#8B1A1A' },
  { color: '#B45309', borderColor: '#B45309' },
  { color: '#CC0000', borderColor: '#CC0000' },
  { color: '#6B1515', borderColor: '#6B1515' },
  { color: '#B45309', borderColor: '#B45309' },
];

// Animated counter that ticks up
function AnimCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const duration = 2000;
        const start = performance.now();
        function tick(now: number) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function ExecutiveSummary() {
  const [inView, setInView] = useState(false);
  const [stampsRevealed, setStampsRevealed] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const docRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const glitchRef = useRandomGlitch();

  // Detect when section enters view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(el);
      }
    }, { threshold: 0.01, rootMargin: '0px 0px -5% 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Stagger stamp reveals after section is in view
  useEffect(() => {
    if (!inView) return;
    const timers: NodeJS.Timeout[] = [];
    // Start scan line
    timers.push(setTimeout(() => setScanComplete(true), 1200));
    // Slam stamps one by one
    focusAreas.forEach((_, i) => {
      timers.push(setTimeout(() => setStampsRevealed(i + 1), 1500 + i * 200));
    });
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  // Mouse parallax on the document
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!docRef.current) return;
    const rect = docRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: y * -1.5, y: x * 1.5 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <section data-section="1" className="py-20 px-4 relative" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <ScrollAnimator animation="fadeIn">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-current opacity-20" />
            <span className="text-[10px] tracking-[0.3em] opacity-50" style={{ fontFamily: 'var(--font-mono)' }}>
              SECTION 01 // EXECUTIVE BRIEFING
            </span>
            <div className="h-px flex-1 bg-current opacity-20" />
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-12"
            style={{ fontFamily: 'var(--font-courier)' }}
          >
            EXECUTIVE SUMMARY
          </h2>
        </ScrollAnimator>

        {/* Key stats — big pulsing numbers */}
        <ScrollAnimator animation="scaleIn" delay={0.1}>
          <div className="flex justify-center gap-8 md:gap-16 mb-14">
            {[
              { num: 200, label: 'VULNERABILITIES', suffix: '+' },
              { num: 177, label: 'TARGETS', suffix: '' },
              { num: 4, label: 'YEARS', suffix: '+' },
            ].map((s, i) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-4xl md:text-5xl font-bold"
                  style={{
                    fontFamily: 'var(--font-courier)',
                    color: '#8B1A1A',
                    animation: inView ? `statPulse 3s ease-in-out ${i * 0.3}s infinite` : 'none',
                  }}
                >
                  <AnimCounter target={s.num} suffix={s.suffix} />
                </div>
                <div
                  className="text-[9px] tracking-[0.2em] mt-2 uppercase opacity-45"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimator>

        {/* Intelligence brief document — with parallax tilt and scan effect */}
        <ScrollAnimator animation="revealUp" delay={0.15}>
          <div
            ref={docRef}
            className="relative p-8 md:p-10 rounded-sm"
            style={{
              background: 'var(--rt-paper)',
              border: '1px solid var(--rt-tag-border)',
              boxShadow: '3px 4px 16px rgba(0,0,0,0.1), inset 0 0 60px rgba(0,0,0,0.02)',
              perspective: '1200px',
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Scan line sweep — light beam crosses document once */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 48%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 52%, transparent 100%)',
                transform: inView && !scanComplete ? 'translateX(-100%)' : 'translateX(200%)',
                transition: inView ? 'transform 1.2s ease-in-out' : 'none',
                zIndex: 20,
              }}
            />

            {/* CLASSIFIED watermark — diagonal faint text */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
              style={{ zIndex: 1 }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '8rem',
                  letterSpacing: '0.3em',
                  color: 'var(--rt-ink)',
                  opacity: 0.02,
                  transform: 'rotate(-35deg)',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                }}
              >
                CLASSIFIED
              </span>
            </div>

            {/* SVG Paper clip — top right */}
            <div className="absolute -top-4 right-16" style={{ filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.2))', zIndex: 15 }}>
              <svg width="22" height="55" viewBox="0 0 20 50">
                <defs>
                  <linearGradient id="clipGradES2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#d0d0d0" />
                    <stop offset="30%" stopColor="#b0b0b0" />
                    <stop offset="60%" stopColor="#909090" />
                    <stop offset="100%" stopColor="#707070" />
                  </linearGradient>
                </defs>
                <path d="M 7 2 C 3 2, 2 5, 2 8 L 2 38 C 2 44, 6 47, 10 47 C 14 47, 18 44, 18 38 L 18 12 C 18 8, 15 5, 12 5 C 9 5, 6 8, 6 12 L 6 35 C 6 37, 7.5 39, 10 39 C 12.5 39, 14 37, 14 35 L 14 12" fill="none" stroke="url(#clipGradES2)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>

            {/* Document header */}
            <div className="flex flex-wrap items-start justify-between mb-6 pb-4 relative z-[2]" style={{ borderBottom: '1px dashed var(--rt-tag-border)' }}>
              <div>
                <div className="text-[10px] tracking-[0.25em] opacity-40" style={{ fontFamily: 'var(--font-mono)' }}>
                  INTELLIGENCE BRIEFING
                </div>
                <div className="text-[9px] tracking-[0.15em] opacity-30 mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
                  PREPARED: APRIL 2026 // DISTRIBUTION: LIMITED
                </div>
              </div>
              {/* Redaction bar with TV flicker glitch — broken text visible underneath */}
              <div className="text-xs tracking-[0.15em]" style={{ fontFamily: 'var(--font-mono)', opacity: 0.6 }}>
                PREPARED FOR:{' '}
                <span
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    padding: '2px 6px',
                  }}
                >
                  {/* Broken classified text visible during flicker — looks like corrupted data */}
                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      color: '#CC0000',
                      letterSpacing: '0.15em',
                      userSelect: 'none',
                    }}
                  >
                    D█R█CT█R &mdash; N██ION█L S█CUR██Y
                  </span>
                  {/* Black bar on top — glitches randomly via JS */}
                  <span
                    ref={glitchRef}
                    className="redact-flicker"
                    style={{
                      position: 'absolute',
                      inset: '-1px',
                      background: 'var(--rt-ink)',
                      borderRadius: '1px',
                    }}
                  />
                </span>
              </div>
            </div>

            {/* Summary text — marker highlights animate in */}
            <div className="relative z-[2]">
              <p className="text-sm md:text-base leading-relaxed md:leading-loose mb-8" style={{ fontFamily: 'var(--font-crimson)' }}>
                {executiveSummary.split(/(\d+\+?)/g).map((part, i) =>
                  /^\d+\+?$/.test(part) ? (
                    <span
                      key={i}
                      className="font-bold relative inline-block"
                      style={{ color: '#111' }}
                    >
                      {/* Animated neon highlight — bright yellow, sweeps in */}
                      <span
                        className="absolute inset-0 -inset-x-1"
                        style={{
                          backgroundImage: 'linear-gradient(104deg, rgba(255,240,0,0) 0.9%, rgba(255,240,0,0.5) 2.4%, rgba(255,240,0,0.7) 5.8%, rgba(255,240,0,0.7) 93%, rgba(255,240,0,0.5) 96%, rgba(255,240,0,0) 98%)',
                          borderRadius: '1em 0.3em',
                          transform: inView ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: 'left',
                          transition: `transform 0.6s ease ${0.8 + i * 0.15}s`,
                          zIndex: -1,
                        }}
                      />
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </p>
            </div>

            {/* Sticky note annotation with pushpin */}
            <div className="relative z-[2] mb-6">
              <div
                className="inline-block relative px-5 py-3"
                style={{
                  background: 'linear-gradient(135deg, #FEFF9C 0%, #FFF740 100%)',
                  boxShadow: '2px 3px 8px rgba(0,0,0,0.15), inset 0 -2px 4px rgba(0,0,0,0.04)',
                  transform: 'rotate(-1.5deg)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-caveat)', color: '#333', fontSize: '1.1rem', lineHeight: 1.4 }}>
                  &ldquo;This volume is unusual for a single operator.&rdquo;
                </span>
                {/* Arrow drawn from the note pointing up-right toward the numbers */}
                <svg
                  className="absolute -top-10 -right-4"
                  width="80" height="50" viewBox="0 0 80 50"
                  style={{ opacity: 0.6 }}
                >
                  <path d="M 5 45 C 20 25, 40 10, 70 5" stroke="#8B4513" strokeWidth="1.8" fill="none" strokeDasharray="5 3" strokeLinecap="round" />
                  <path d="M 62 2 L 72 5 L 64 10" stroke="#8B4513" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
                <div
                  className="pushpin pushpin-red"
                  style={{ position: 'absolute', top: '-8px', left: '20px' }}
                />
              </div>
            </div>

            {/* Focus area stamps — slam down one by one */}
            <div className="relative z-[2] pt-6 mt-6" style={{ borderTop: '1px dashed var(--rt-tag-border)' }}>
              <div className="text-[9px] tracking-[0.2em] opacity-35 mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
                SUBJECT SPECIALIZATIONS
              </div>
              <div className="flex flex-wrap gap-3">
                {focusAreas.map((area, idx) => {
                  const style = stampStyles[idx % stampStyles.length];
                  const rot = stableRotation(idx);
                  const isRevealed = idx < stampsRevealed;

                  return (
                    <div
                      key={area}
                      className="relative"
                      style={{
                        opacity: isRevealed ? 1 : 0,
                        transform: isRevealed ? `scale(1) rotate(${rot}deg)` : `scale(2) rotate(${rot - 15}deg)`,
                        transition: `opacity 0.12s ease, transform 0.35s cubic-bezier(0.17, 0.67, 0.25, 1.2)`,
                      }}
                    >
                      <svg
                        viewBox="0 0 220 48"
                        style={{
                          width: `${Math.max(area.length * 15, 140)}px`,
                          height: '44px',
                          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                        }}
                      >
                        <defs>
                          <filter id={`sw${idx}`}>
                            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="n" />
                            <feColorMatrix type="saturate" values="0" in="n" result="bw" />
                            <feComponentTransfer in="bw" result="t">
                              <feFuncA type="discrete" tableValues="0 0 1 1 1 1 1 1" />
                            </feComponentTransfer>
                            <feComposite operator="in" in="SourceGraphic" in2="t" />
                          </filter>
                        </defs>
                        <rect
                          x="2" y="2" width="216" height="44" rx="1"
                          fill="none"
                          stroke={style.borderColor}
                          strokeWidth="3"
                          strokeDasharray="30 3 18 3 40 3 12 3"
                          opacity="0.7"
                        />
                        <text
                          x="110" y="32"
                          textAnchor="middle"
                          fill={style.color}
                          fontSize="19"
                          fontFamily="'Bebas Neue', sans-serif"
                          letterSpacing="4"
                          opacity="0.85"
                          filter={`url(#sw${idx})`}
                        >
                          {area.toUpperCase()}
                        </text>
                      </svg>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollAnimator>
      </div>

    </section>
  );
}
