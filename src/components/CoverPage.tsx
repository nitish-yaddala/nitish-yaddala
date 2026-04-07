'use client';

import { useEffect, useState, useRef } from 'react';
import { profile, stats } from '@/data/resume';

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const num = parseInt(target.replace(/[^0-9]/g, '')) || 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const duration = 1800;
        const startTime = performance.now();
        function tick(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * num));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// SVG stamp with realistic ink texture — breaks, uneven edges, worn look
function RealisticStamp({ text, color = '#CC0000', rotation = -12, scale = 1 }: { text: string; color?: string; rotation?: number; scale?: number }) {
  const chars = text.split('');
  return (
    <svg
      viewBox="0 0 340 80"
      style={{
        width: `${340 * scale}px`,
        height: `${80 * scale}px`,
        transform: `rotate(${rotation}deg)`,
        filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.15))',
      }}
    >
      <defs>
        {/* Noise filter for worn ink texture */}
        <filter id="stampWear">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="bwNoise" />
          <feComponentTransfer in="bwNoise" result="threshold">
            <feFuncA type="discrete" tableValues="0 0 0 1 1 1 1 1" />
          </feComponentTransfer>
          <feComposite operator="in" in="SourceGraphic" in2="threshold" />
        </filter>
        {/* Roughen the edges */}
        <filter id="roughEdge">
          <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* Outer border — double line with breaks */}
      <rect x="4" y="4" width="332" height="72" rx="2" ry="2"
        fill="none" stroke={color} strokeWidth="3.5"
        strokeDasharray="40 3 20 3 60 3 30 3 50 3 25 3"
        opacity="0.75" filter="url(#roughEdge)"
      />
      {/* Inner border — thinner, more breaks */}
      <rect x="10" y="10" width="320" height="60" rx="1" ry="1"
        fill="none" stroke={color} strokeWidth="1.5"
        strokeDasharray="30 4 15 4 45 4 20 4 35 4"
        opacity="0.5"
      />

      {/* Text with worn ink effect */}
      <text
        x="170" y="52"
        textAnchor="middle"
        fill={color}
        fontSize="36"
        fontFamily="'Bebas Neue', sans-serif"
        letterSpacing="6"
        opacity="0.82"
        filter="url(#stampWear)"
      >
        {text}
      </text>

      {/* Ink splatter dots around text — simulates uneven ink distribution */}
      <circle cx="28" cy="20" r="1.5" fill={color} opacity="0.3" />
      <circle cx="315" cy="62" r="2" fill={color} opacity="0.25" />
      <circle cx="55" cy="68" r="1" fill={color} opacity="0.2" />
      <circle cx="290" cy="15" r="1.5" fill={color} opacity="0.25" />
      <circle cx="170" cy="10" r="1" fill={color} opacity="0.15" />
      <circle cx="100" cy="72" r="1.5" fill={color} opacity="0.2" />

      {/* Smudge streak — like ink dragged slightly */}
      <line x1="60" y1="48" x2="75" y2="48" stroke={color} strokeWidth="0.8" opacity="0.15" />
      <line x1="250" y1="35" x2="262" y2="36" stroke={color} strokeWidth="0.6" opacity="0.12" />
    </svg>
  );
}

export default function CoverPage() {
  const [phase, setPhase] = useState(0);
  // Phase 0: blank
  // Phase 1: document border fades in
  // Phase 2: case number + classification header appears
  // Phase 3: title types out
  // Phase 4: subtitle + role appears
  // Phase 5: stamp SLAMS down
  // Phase 6: stats reveal
  // Phase 7: scroll indicator

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 3200),
      setTimeout(() => setPhase(5), 3800),
      setTimeout(() => setPhase(6), 4400),
      setTimeout(() => setPhase(7), 5200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const [typed, setTyped] = useState('');
  const fullTitle = 'MUNI NITISH KUMAR YADDALA';
  const typingStarted = useRef(false);

  useEffect(() => {
    if (phase < 3 || typingStarted.current) return;
    typingStarted.current = true;
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullTitle.length) {
        setTyped(fullTitle.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, [phase]);

  return (
    <section
      data-section="0"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--rt-paper)' }}
    >
      {/* Deep vignette — feels like a spotlight on a desk */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, transparent 25%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Document border — fades in Phase 1 */}
      <div
        className="absolute inset-10 md:inset-16 pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          border: '2px solid rgba(0,0,0,0.18)',
        }}
      >
        {/* Corner crosshairs — registration marks */}
        {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
          <div key={i} className={`absolute ${pos}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" style={{ opacity: 0.3 }}>
              <line x1="0" y1="10" x2="20" y2="10" stroke="#CC0000" strokeWidth="0.5" />
              <line x1="10" y1="0" x2="10" y2="20" stroke="#CC0000" strokeWidth="0.5" />
              <circle cx="10" cy="10" r="3" fill="none" stroke="#CC0000" strokeWidth="0.5" />
            </svg>
          </div>
        ))}
      </div>

      {/* Staple — realistic bent metal staple shape */}
      <div className="absolute top-14 left-16 md:top-20 md:left-24" style={{ zIndex: 5 }}>
        <svg width="20" height="16" viewBox="0 0 20 16" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>
          <defs>
            <linearGradient id="stapleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d0d0d0" />
              <stop offset="40%" stopColor="#a0a0a0" />
              <stop offset="100%" stopColor="#707070" />
            </linearGradient>
          </defs>
          {/* Staple shape — ⊓ */}
          <path
            d="M 2 14 L 2 4 C 2 2, 4 1, 6 1 L 14 1 C 16 1, 18 2, 18 4 L 18 14"
            fill="none"
            stroke="url(#stapleGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Bent leg tips pressed into paper */}
          <line x1="2" y1="14" x2="5" y2="14" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="14" x2="15" y2="14" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">

        {/* Classification header — Phase 2 */}
        <div
          className="mb-6 transition-all duration-700"
          style={{ opacity: phase >= 2 ? 0.5 : 0, transform: phase >= 2 ? 'none' : 'translateY(-10px)' }}
        >
          <span
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.4em' }}
          >
            CASE FILE: {profile.caseNumber} // TOP SECRET
          </span>
        </div>

        {/* Horizontal rule */}
        <div
          className="mx-auto mb-8 transition-all duration-700"
          style={{
            width: phase >= 2 ? '80%' : '0%',
            height: '1.5px',
            background: 'var(--rt-ink)',
            opacity: 0.35,
            transition: 'width 0.8s ease',
          }}
        />

        {/* BREACH REPORT label */}
        <div
          className="mb-3 transition-all duration-500"
          style={{ opacity: phase >= 2 ? 0.35 : 0 }}
        >
          <span
            className="text-sm tracking-[0.5em]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            SECURITY ASSESSMENT REPORT
          </span>
        </div>

        {/* MAIN NAME — the hero moment — types out Phase 3 */}
        <h1
          className="mb-2"
          style={{
            fontFamily: 'var(--font-courier)',
            fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
            fontWeight: 700,
            letterSpacing: '0.06em',
            lineHeight: 1.1,
            minHeight: '4rem',
          }}
        >
          {typed}
          {phase >= 3 && typed.length < fullTitle.length && (
            <span className="typewriter-cursor" />
          )}
        </h1>

        {/* Role + Location — Phase 4 */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: phase >= 4 ? 0.7 : 0,
            transform: phase >= 4 ? 'none' : 'translateY(10px)',
          }}
        >
          <p
            className="text-sm md:text-base tracking-[0.15em] mb-1"
            style={{ fontFamily: 'var(--font-crimson)' }}
          >
            {profile.title}
          </p>
          <p
            className="text-xs tracking-[0.2em] opacity-50"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {profile.location} &middot; {profile.email}
          </p>
        </div>

        {/* CONFIDENTIAL stamp — SLAMS Phase 5 */}
        <div
          className="mt-10 mb-10"
          style={{
            opacity: phase >= 5 ? 1 : 0,
            transform: phase >= 5 ? 'scale(1)' : 'scale(2.5)',
            transition: 'opacity 0.15s ease, transform 0.4s cubic-bezier(0.17, 0.67, 0.25, 1.3)',
          }}
        >
          <RealisticStamp text="CONFIDENTIAL" rotation={-8} scale={0.85} />
        </div>

        {/* Stats — Phase 6, big and impactful */}
        <div
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto transition-all duration-700"
          style={{
            opacity: phase >= 6 ? 1 : 0,
            transform: phase >= 6 ? 'none' : 'translateY(20px)',
          }}
        >
          {stats.slice(0, 3).map((s) => {
            const hasSuffix = s.value.includes('+');
            return (
              <div key={s.label} className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: 'var(--font-courier)', color: '#8B1A1A' }}
                >
                  <AnimatedCounter target={s.value} suffix={hasSuffix ? '+' : ''} />
                </div>
                <div
                  className="text-[10px] tracking-[0.15em] mt-2 uppercase opacity-50"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary stats row */}
        <div
          className="grid grid-cols-2 gap-4 max-w-xs mx-auto mt-6 transition-all duration-700"
          style={{
            opacity: phase >= 6 ? 0.7 : 0,
            transform: phase >= 6 ? 'none' : 'translateY(15px)',
            transitionDelay: '0.2s',
          }}
        >
          {stats.slice(3).map((s) => {
            const hasSuffix = s.value.includes('+');
            return (
              <div key={s.label} className="text-center">
                <div
                  className="text-lg font-bold"
                  style={{ fontFamily: 'var(--font-courier)' }}
                >
                  <AnimatedCounter target={s.value} suffix={hasSuffix ? '+' : ''} />
                </div>
                <div
                  className="text-[9px] tracking-[0.12em] mt-1 uppercase opacity-40"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Clearance / classification line */}
        <div
          className="mt-10 mb-20 transition-all duration-700"
          style={{
            opacity: phase >= 6 ? 0.35 : 0,
            transitionDelay: '0.4s',
          }}
        >
          <div
            className="inline-block px-4 py-1 border"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.2em',
              borderColor: 'rgba(0,0,0,0.12)',
            }}
          >
            CLEARANCE: {profile.clearance} &middot; STATUS: ACTIVE &middot; CLASSIFICATION: TOP SECRET
          </div>
        </div>
      </div>

      {/* Scroll indicator — Phase 7 */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000"
        style={{ opacity: phase >= 7 ? 0.5 : 0 }}
      >
        <span
          className="text-[9px] tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          DECLASSIFY REPORT
        </span>
        <div className="w-px h-8 bg-current animate-pulse opacity-40" />
      </div>
    </section>
  );
}
