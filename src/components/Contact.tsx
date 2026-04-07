'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { profile } from '@/data/resume';

/* ─── Evidence flash montage data ─── */
const flashFrames = [
  { value: '200+', label: 'VULNERABILITIES' },
  { value: '9.8', label: 'HIGHEST CVSS' },
  { value: 'OSCP', label: 'CLEARANCE' },
  { value: '10+', label: 'PLATFORMS' },
  { value: '4', label: 'CRITICAL CHAINS' },
  { value: '6M+', label: 'USERS PROTECTED' },
  { value: '24HR', label: 'OSCP EXAM' },
  { value: '$0', label: 'SCANNERS FOUND THIS' },
];

/* ─── Evidence Flash Montage ─── */
function EvidenceMontage({ active }: { active: boolean }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active || done) return;
    const interval = setInterval(() => {
      setCurrentFrame(prev => {
        if (prev >= flashFrames.length - 1) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 300);
          return prev;
        }
        return prev + 1;
      });
    }, 250);
    return () => clearInterval(interval);
  }, [active, done]);

  if (!active) return null;
  const frame = flashFrames[currentFrame];

  return (
    <div className="relative h-32 flex items-center justify-center overflow-hidden">
      {!done ? (
        <div className="text-center" key={currentFrame}>
          <div className="text-4xl md:text-5xl font-bold mb-1" style={{ fontFamily: 'var(--font-bebas)', color: '#CC0000', letterSpacing: '0.1em', textShadow: '0 0 30px rgba(204,0,0,0.3)', animation: 'flashIn 0.25s ease' }}>
            {frame.value}
          </div>
          <div className="text-[10px] tracking-[0.3em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)', animation: 'flashIn 0.25s ease' }}>
            {frame.label}
          </div>
        </div>
      ) : (
        <div className="text-[10px] tracking-[0.3em] opacity-30" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-secondary)' }}>ALL FINDINGS ACCOUNTED FOR</div>
      )}
    </div>
  );
}

/* ─── The Dramatic Quote ─── */
function DramaticQuote({ active }: { active: boolean }) {
  const [line1, setLine1] = useState(false);
  const [line2, setLine2] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setLine1(true), 200);
    const t2 = setTimeout(() => setLine2(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active]);

  return (
    <div className="text-center py-10">
      <div style={{ opacity: line1 ? 1 : 0, transform: line1 ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)' }}>
        <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-crimson)', color: 'var(--rt-c-text-secondary)' }}>&quot;The next breach is already happening.</p>
      </div>
      <div style={{ opacity: line2 ? 1 : 0, transform: line2 ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)' }}>
        <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-crimson)', color: 'var(--rt-c-text-primary)' }}>The question is who finds it first.&quot;</p>
      </div>
    </div>
  );
}

/* ─── CRT Shutdown ─── */
function CRTShutdown({ active }: { active: boolean }) {
  const [phase, setPhase] = useState<'idle' | 'compress' | 'line' | 'dot' | 'dark'>('idle');

  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setPhase('compress'), 0);
    const t2 = setTimeout(() => setPhase('line'), 600);
    const t3 = setTimeout(() => setPhase('dot'), 1200);
    const t4 = setTimeout(() => setPhase('dark'), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[10003] flex items-center justify-center pointer-events-none" style={{ background: phase === 'dark' ? '#000' : 'transparent', transition: 'background 0.5s ease' }}>
      {(phase === 'compress' || phase === 'line') && (
        <div style={{ position: 'absolute', inset: 0, background: '#000', clipPath: phase === 'line' ? 'inset(49.5% 0 49.5% 0)' : 'inset(15% 0 15% 0)', transition: 'clip-path 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }} />
      )}
      {phase === 'line' && (
        <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.8)', boxShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.2)' }} />
      )}
      {phase === 'dot' && (
        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 15px rgba(255,255,255,0.8)', animation: 'dotFade 0.6s ease forwards' }} />
      )}
    </div>
  );
}

/* ─── Classified Envelope ─── */
function ClassifiedEnvelope({ active, onOpened }: { active: boolean; onOpened: () => void }) {
  const [phase, setPhase] = useState<'hidden' | 'visible' | 'opening' | 'opened'>('hidden');

  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setPhase('visible'), 300);
    const t2 = setTimeout(() => setPhase('opening'), 1800);
    const t3 = setTimeout(() => {
      setPhase('opened');
      onOpened();
    }, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [active, onOpened]);

  if (phase === 'hidden') return null;

  return (
    <div
      className="flex flex-col items-center justify-center py-12"
      style={{
        opacity: phase === 'opened' ? 0 : 1,
        transform: phase === 'opened' ? 'scale(0.9) translateY(-20px)' : 'scale(1)',
        transition: 'all 0.6s ease',
      }}
    >
      {/* Envelope */}
      <div
        className="relative"
        style={{
          width: '320px',
          height: '200px',
          perspective: '800px',
        }}
      >
        {/* Envelope body */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, var(--rt-classified-bg-mid) 0%, var(--rt-classified-bg-from) 100%)',
            border: '2px solid #CC0000',
            borderRadius: '2px',
            boxShadow: '0 8px 30px rgba(204,0,0,0.15), 0 4px 15px rgba(0,0,0,0.4)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Diagonal lines pattern */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(204,0,0,0.03) 10px, rgba(204,0,0,0.03) 11px)',
          }} />

          {/* CLASSIFIED stamp on envelope */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-3xl tracking-[0.3em] font-bold px-6 py-2 border-4"
              style={{
                fontFamily: 'var(--font-bebas)',
                color: '#CC0000',
                borderColor: '#CC0000',
                opacity: 0.4,
                transform: 'rotate(-8deg)',
              }}
            >
              CLASSIFIED
            </span>
          </div>

          {/* Case number */}
          <div className="absolute bottom-3 left-4">
            <span className="text-[8px] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-accent)', opacity: 0.4 }}>
              CASE NO. {profile.caseNumber}
            </span>
          </div>

          {/* Wax seal */}
          <div className="absolute bottom-3 right-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle at 35% 30%, #CC3333, #990000, #660000)', boxShadow: '0 2px 6px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.15)' }}>
              <span className="text-[7px] font-bold" style={{ fontFamily: 'var(--font-bebas)', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>SAR</span>
            </div>
          </div>
        </div>

        {/* Envelope flap */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(180deg, var(--rt-classified-bg-mid) 0%, var(--rt-classified-bg-from) 100%)',
            borderLeft: '2px solid #CC0000',
            borderRight: '2px solid #CC0000',
            borderTop: '2px solid #CC0000',
            transformOrigin: 'top center',
            transform: phase === 'opening' || phase === 'opened'
              ? 'perspective(800px) rotateX(-170deg)'
              : 'perspective(800px) rotateX(0deg)',
            transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)',
            clipPath: 'polygon(0 0, 50% 80%, 100% 0)',
            zIndex: 3,
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(204,0,0,0.03) 10px, rgba(204,0,0,0.03) 11px)',
          }} />
        </div>
      </div>

      {/* "Opening classified file..." text */}
      {(phase === 'opening') && (
        <div className="mt-6 text-[10px] tracking-[0.3em]" style={{ fontFamily: 'var(--font-mono)', color: '#CC0000', opacity: 0.5, animation: 'blink 1s step-end infinite' }}>
          DECLASSIFYING...
        </div>
      )}
    </div>
  );
}

/* ─── Security Badge ─── */
function SecurityBadge({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [holoPos, setHoloPos] = useState({ x: 50, y: 50 });
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, [active]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -15, y: (x - 0.5) * 15 });
    setHoloPos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHoloPos({ x: 50, y: 50 });
  }, []);

  if (!active) return null;

  return (
    <div
      className="flex flex-col items-center py-12 px-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Lanyard */}
      <div className="flex flex-col items-center mb-0" style={{ zIndex: 2 }}>
        <div style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, transparent, #CC0000 20%, #CC0000 80%, #990000)', opacity: 0.6 }} />
        {/* Clip */}
        <div style={{ width: '30px', height: '8px', background: 'linear-gradient(135deg, #888, #aaa, #888)', borderRadius: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.3)', marginTop: '-1px' }} />
      </div>

      {/* Badge card */}
      <div
        ref={badgeRef}
        className="relative cursor-pointer"
        style={{
          width: '360px',
          maxWidth: '90vw',
          perspective: '1200px',
          marginTop: '-2px',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.15s ease-out',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Badge body */}
          <div
            className="relative overflow-hidden rounded-lg"
            style={{
              background: 'linear-gradient(170deg, var(--rt-badge-bg-from) 0%, var(--rt-badge-bg-to) 40%, var(--rt-badge-bg-from) 100%)',
              border: '2px solid var(--rt-badge-border)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
              padding: '28px',
            }}
          >
            {/* Holographic foil overlay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{
                background: `radial-gradient(circle at ${holoPos.x}% ${holoPos.y}%,
                  rgba(255,0,80,0.08) 0%,
                  rgba(0,200,255,0.06) 25%,
                  rgba(180,0,255,0.06) 50%,
                  rgba(0,255,150,0.04) 75%,
                  transparent 100%)`,
                mixBlendMode: 'screen',
                transition: 'background 0.1s ease',
                zIndex: 3,
              }}
            />

            {/* Holographic line sweep */}
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{
                background: `linear-gradient(${105 + (holoPos.x - 50) * 0.5}deg,
                  transparent 20%,
                  rgba(255,255,255,0.03) 35%,
                  rgba(255,255,255,0.06) 50%,
                  rgba(255,255,255,0.03) 65%,
                  transparent 80%)`,
                zIndex: 4,
              }}
            />

            {/* Top red accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-lg" style={{ background: 'linear-gradient(90deg, #CC0000, #ff3333, #CC0000)' }} />

            {/* Header */}
            <div className="text-center mb-5 relative" style={{ zIndex: 2 }}>
              <div className="text-[7px] tracking-[0.4em] mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-accent)', opacity: 0.6 }}>
                SECURITY CLEARANCE,AUTHORIZED PERSONNEL
              </div>
              <div className="h-px mx-auto" style={{ background: 'linear-gradient(90deg, transparent, var(--rt-c-divider), transparent)', width: '80%' }} />
            </div>

            {/* Identity section */}
            <div className="flex gap-5 mb-5 relative" style={{ zIndex: 2 }}>
              {/* Photo placeholder / avatar */}
              <div className="shrink-0">
                <div
                  className="w-20 h-24 flex items-center justify-center relative overflow-hidden"
                  style={{
                    border: '2px solid var(--rt-badge-border)',
                    background: 'linear-gradient(135deg, var(--rt-classified-bg-mid), var(--rt-classified-bg-from))',
                  }}
                >
                  {/* Silhouette */}
                  <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
                    <circle cx="20" cy="15" r="10" fill="var(--rt-card-border)" />
                    <ellipse cx="20" cy="42" rx="16" ry="12" fill="var(--rt-card-border)" />
                  </svg>
                  {/* Photo border overlay */}
                  <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)' }} />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-[7px] tracking-[0.15em] mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>OPERATOR</div>
                <h3 className="text-lg font-bold mb-0.5 truncate" style={{ fontFamily: 'var(--font-courier)', color: 'var(--rt-badge-text)' }}>
                  {profile.alias.toUpperCase()} YADDALA
                </h3>
                <div className="text-[11px] mb-2" style={{ fontFamily: 'var(--font-crimson)', color: 'var(--rt-badge-sub)' }}>
                  {profile.title}
                </div>
                <div className="text-[9px] mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>
                  {profile.subtitle}
                </div>

                {/* Status + Clearance row */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.5)', animation: 'statusPulse 2s ease infinite' }} />
                    <span className="text-[9px] font-bold tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: '#22c55e' }}>ACTIVE</span>
                  </div>
                  <div className="h-3 w-px" style={{ background: 'var(--rt-c-divider)' }} />
                  <span className="text-[9px] tracking-wider font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-accent)' }}>
                    OSCP CLEARED
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px mb-5" style={{ background: 'linear-gradient(90deg, transparent, var(--rt-c-divider), transparent)' }} />

            {/* Secure channels */}
            <div className="relative" style={{ zIndex: 2 }}>
              <div className="text-[7px] tracking-[0.25em] mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>
                SECURE CHANNELS
              </div>

              <div className="space-y-2.5">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 group transition-all duration-200 hover:translate-x-1"
                >
                  <span className="text-[9px] w-16 shrink-0 tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>EMAIL</span>
                  <span className="h-px flex-0 w-4" style={{ background: 'var(--rt-c-divider)' }} />
                  <span className="text-[12px] transition-colors group-hover:opacity-80" style={{ fontFamily: 'var(--font-courier)', color: 'var(--rt-c-accent)' }}>{profile.email}</span>
                </a>

                <a
                  href={`https://${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group transition-all duration-200 hover:translate-x-1"
                >
                  <span className="text-[9px] w-16 shrink-0 tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>LINKEDIN</span>
                  <span className="h-px flex-0 w-4" style={{ background: 'var(--rt-c-divider)' }} />
                  <span className="text-[12px] transition-colors group-hover:opacity-80" style={{ fontFamily: 'var(--font-courier)', color: '#2563EB' }}>{profile.linkedin}</span>
                </a>

                <a
                  href="https://github.com/nitishyaddala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group transition-all duration-200 hover:translate-x-1"
                >
                  <span className="text-[9px] w-16 shrink-0 tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>GITHUB</span>
                  <span className="h-px flex-0 w-4" style={{ background: 'var(--rt-c-divider)' }} />
                  <span className="text-[12px] transition-colors group-hover:opacity-80" style={{ fontFamily: 'var(--font-courier)', color: 'var(--rt-c-text-secondary)' }}>github.com/nitishyaddala</span>
                </a>

                <div className="flex items-center gap-3">
                  <span className="text-[9px] w-16 shrink-0 tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>LOCATION</span>
                  <span className="h-px flex-0 w-4" style={{ background: 'var(--rt-c-divider)' }} />
                  <span className="text-[12px]" style={{ fontFamily: 'var(--font-courier)', color: 'var(--rt-c-text-muted)' }}>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-6 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--rt-c-divider)' }}>
              <span className="text-[7px] tracking-[0.15em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}>
                CASE NO. {profile.caseNumber}
              </span>

              {/* Barcode */}
              <div className="flex items-end gap-px h-5">
                {[3,1,2,1,3,2,1,1,3,1,2,3,1,1,2,1,3,2,1,3,1,2,1,1,3].map((w, i) => (
                  <div key={i} style={{ width: `${w}px`, height: `${12 + (i % 3) * 3}px`, background: 'var(--rt-card-border)' }} />
                ))}
              </div>
            </div>

            {/* Corner punch hole */}
            <div className="absolute top-3 right-3">
              <div className="w-4 h-4 rounded-full" style={{ background: 'var(--rt-classified-bg-from)', border: '1px solid var(--rt-card-border)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Classification footer */}
      <div className="mt-8 text-center">
        <p className="text-[8px] tracking-[0.2em] opacity-15" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}>
          THIS DOCUMENT IS CLASSIFIED // DISTRIBUTION RESTRICTED TO AUTHORIZED PERSONNEL
        </p>
      </div>

      {/* Final whisper */}
      <div className="mt-4 text-center">
        <span className="text-[7px] tracking-[0.3em] opacity-[0.08]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}>
          BREACH REPORT // {profile.name.toUpperCase()} // {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT,THE SEQUENCE
   ═══════════════════════════════════════════════════════ */
export default function Contact() {
  const [showStamp, setShowStamp] = useState(false);
  const [montageActive, setMontageActive] = useState(false);
  const [quoteActive, setQuoteActive] = useState(false);
  const [crtActive, setCrtActive] = useState(false);
  const [envelopeActive, setEnvelopeActive] = useState(false);
  const [badgeActive, setBadgeActive] = useState(false);
  const [prePhase, setPrePhase] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Act 1: Montage
          setTimeout(() => setMontageActive(true), 300);
          // Act 2: Quote
          setTimeout(() => setQuoteActive(true), 2800);
          // Act 3: FILE CLOSED stamp
          setTimeout(() => setShowStamp(true), 5000);
          // Act 4: CRT shutdown
          setTimeout(() => setCrtActive(true), 6200);
          // Act 5: CRT done → envelope
          setTimeout(() => {
            setCrtActive(false);
            setPrePhase(false);
            setEnvelopeActive(true);
          }, 8200);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleEnvelopeOpened = useCallback(() => {
    setTimeout(() => setBadgeActive(true), 300);
  }, []);

  return (
    <section data-section="9" className="relative" ref={sectionRef}>
      <CRTShutdown active={crtActive} />

      {/* ═══ PRE-CRT: Dramatic buildup ═══ */}
      {prePhase && (
        <div className="py-20 px-4 min-h-[80vh] flex flex-col items-center justify-center">
          <EvidenceMontage active={montageActive} />
          <DramaticQuote active={quoteActive} />
          <div className="min-h-[120px] flex items-center justify-center">
            {showStamp && (
              <div className="stamp-animate">
                <span
                  className="inline-block px-12 py-5 border-[6px] text-5xl md:text-7xl tracking-[0.25em] font-bold"
                  style={{ fontFamily: 'var(--font-bebas)', color: '#CC0000', borderColor: '#CC0000', transform: 'rotate(-12deg)', opacity: 0.9, textShadow: '0 0 40px rgba(204,0,0,0.3), 0 0 80px rgba(204,0,0,0.1)' }}
                >
                  FILE CLOSED
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ POST-CRT: Envelope → Badge ═══ */}
      {!prePhase && (
        <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'linear-gradient(180deg, var(--rt-classified-bg-from) 0%, var(--rt-classified-bg-mid) 30%, var(--rt-classified-bg-from) 100%)' }}>
          {/* Envelope phase */}
          {!badgeActive && (
            <ClassifiedEnvelope active={envelopeActive} onOpened={handleEnvelopeOpened} />
          )}

          {/* Badge phase */}
          <SecurityBadge active={badgeActive} />
        </div>
      )}
    </section>
  );
}
