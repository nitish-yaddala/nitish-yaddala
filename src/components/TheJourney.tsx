'use client';

import { useState, useEffect } from 'react';
import { previousRoles, education } from '@/data/resume';
import ScrollAnimator from './ScrollAnimator';

/* ── Visual style per career era (oldest → newest) ── */
const eraStyles = {
  isro: {
    bgLight: 'linear-gradient(180deg, rgba(248,240,215,0.95) 0%, rgba(240,228,195,0.9) 100%)',
    bgDark: 'linear-gradient(180deg, rgba(48,40,25,0.95) 0%, rgba(40,33,20,0.9) 100%)',
    borderLight: '1px solid rgba(170,145,100,0.35)',
    borderDark: '1px solid rgba(100,85,55,0.4)',
    stampColor: '#6B1515',
    rotation: 0.5,
    stampRotation: -12,
  },
  srm: {
    bgLight: 'linear-gradient(180deg, rgba(246,241,228,0.95) 0%, rgba(238,232,215,0.9) 100%)',
    bgDark: 'linear-gradient(180deg, rgba(44,38,28,0.95) 0%, rgba(37,32,23,0.9) 100%)',
    borderLight: '1px solid rgba(175,155,120,0.3)',
    borderDark: '1px solid rgba(92,80,60,0.4)',
    stampColor: '#8B1A1A',
    rotation: -0.2,
    stampRotation: 0,
  },
  highradius: {
    bgLight: 'linear-gradient(180deg, rgba(245,240,225,0.95) 0%, rgba(238,230,210,0.9) 100%)',
    bgDark: 'linear-gradient(180deg, rgba(45,38,28,0.95) 0%, rgba(38,32,22,0.9) 100%)',
    borderLight: '1px solid rgba(180,160,130,0.3)',
    borderDark: '1px solid rgba(95,80,60,0.4)',
    stampColor: '#8B1A1A',
    rotation: -0.2,
    stampRotation: -7,
  },
  hp: {
    bgLight: 'linear-gradient(180deg, rgba(240,237,228,0.95) 0%, rgba(232,225,212,0.9) 100%)',
    bgDark: 'linear-gradient(180deg, rgba(42,37,32,0.95) 0%, rgba(35,30,25,0.9) 100%)',
    borderLight: '1px solid rgba(180,160,130,0.25)',
    borderDark: '1px solid rgba(90,80,65,0.4)',
    stampColor: '#CC0000',
    rotation: 0.3,
    stampRotation: -10,
  },
  gt: {
    bgLight: 'linear-gradient(180deg, rgba(242,239,228,0.95) 0%, rgba(235,230,216,0.9) 100%)',
    bgDark: 'linear-gradient(180deg, rgba(40,36,28,0.95) 0%, rgba(34,30,24,0.9) 100%)',
    borderLight: '2px solid rgba(179,163,105,0.4)',
    borderDark: '2px solid rgba(140,127,80,0.4)',
    stampColor: '#8B7D3C',
    rotation: 0.3,
    stampRotation: -6,
  },
  bv: {
    bgLight: 'linear-gradient(180deg, rgba(238,235,228,0.95) 0%, rgba(230,225,215,0.9) 100%)',
    bgDark: 'linear-gradient(180deg, rgba(38,35,30,0.95) 0%, rgba(32,28,24,0.9) 100%)',
    borderLight: '2px solid rgba(204,0,0,0.2)',
    borderDark: '2px solid rgba(204,0,0,0.3)',
    stampColor: '#CC0000',
    rotation: -0.15,
    stampRotation: 0,
  },
};

/* ── SVG Decorations ── */
function PaperClipSVG({ id }: { id: string }) {
  return (
    <div className="absolute -top-4 right-14" style={{ filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.2))', zIndex: 15 }}>
      <svg width="22" height="55" viewBox="0 0 20 50">
        <defs>
          <linearGradient id={`clipGrad${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d0d0d0" />
            <stop offset="30%" stopColor="#b0b0b0" />
            <stop offset="60%" stopColor="#909090" />
            <stop offset="100%" stopColor="#707070" />
          </linearGradient>
        </defs>
        <path d="M 7 2 C 3 2, 2 5, 2 8 L 2 38 C 2 44, 6 47, 10 47 C 14 47, 18 44, 18 38 L 18 12 C 18 8, 15 5, 12 5 C 9 5, 6 8, 6 12 L 6 35 C 6 37, 7.5 39, 10 39 C 12.5 39, 14 37, 14 35 L 14 12" fill="none" stroke={`url(#clipGrad${id})`} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function StapleSVG({ id }: { id: string }) {
  return (
    <div className="absolute top-4 left-5" style={{ zIndex: 5 }}>
      <svg width="18" height="14" viewBox="0 0 20 16" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' }}>
        <defs>
          <linearGradient id={`stapleGrad${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d0d0d0" />
            <stop offset="40%" stopColor="#a0a0a0" />
            <stop offset="100%" stopColor="#707070" />
          </linearGradient>
        </defs>
        <path d="M 2 14 L 2 4 C 2 2, 4 1, 6 1 L 14 1 C 16 1, 18 2, 18 4 L 18 14" fill="none" stroke={`url(#stapleGrad${id})`} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="2" y1="14" x2="5" y2="14" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="14" x2="15" y2="14" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function TapeStrip() {
  return (
    <div
      className="absolute -top-2 left-1/2 -translate-x-1/2"
      style={{
        width: '80px',
        height: '18px',
        background: 'linear-gradient(180deg, rgba(255,255,220,0.45) 0%, rgba(255,255,200,0.3) 100%)',
        border: '1px solid rgba(200,180,120,0.2)',
        transform: 'translateX(-50%) rotate(-1.5deg)',
        zIndex: 15,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}
    />
  );
}

/* ── Case Closed Stamp ── */
function CaseClosedStamp({ color, rotation }: { color: string; rotation: number }) {
  const filterId = `ccWear${color.replace('#', '')}J`;
  return (
    <div style={{ transform: `rotate(${rotation}deg)` }}>
      <svg viewBox="0 0 180 44" style={{ width: '140px', height: '34px', filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.08))' }}>
        <defs>
          <filter id={filterId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="n" />
            <feColorMatrix type="saturate" values="0" in="n" result="bw" />
            <feComponentTransfer in="bw" result="t">
              <feFuncA type="discrete" tableValues="0 0 0 1 1 1 1 1" />
            </feComponentTransfer>
            <feComposite operator="in" in="SourceGraphic" in2="t" />
          </filter>
        </defs>
        <rect x="2" y="2" width="176" height="40" rx="1" fill="none" stroke={color} strokeWidth="2.5" strokeDasharray="28 3 16 3 38 3 12 3 22 3" opacity="0.7" />
        <text x="90" y="30" textAnchor="middle" fill={color} fontSize="17" fontFamily="'Bebas Neue', sans-serif" letterSpacing="4" opacity="0.75" filter={`url(#${filterId})`}>
          CASE CLOSED
        </text>
      </svg>
    </div>
  );
}

/* ── Date stamp ── */
function DateStamp({ period }: { period: string }) {
  const dates = period.split('–').map(s => s.trim());
  return (
    <div
      className="inline-block px-3 py-2 text-center"
      style={{ border: '2px solid rgba(0,0,0,0.15)', borderRadius: '2px', minWidth: '100px' }}
    >
      <div className="text-[7px] tracking-[0.3em] opacity-40 mb-1" style={{ fontFamily: 'var(--font-mono)' }}>SERVICE PERIOD</div>
      <div className="text-xs font-bold" style={{ fontFamily: 'var(--font-courier)', color: '#CC0000', letterSpacing: '0.05em' }}>{dates[0]}</div>
      <div className="text-[8px] opacity-30 my-0.5" style={{ fontFamily: 'var(--font-mono)' }}>&#9660;</div>
      <div className="text-xs font-bold" style={{ fontFamily: 'var(--font-courier)', color: '#CC0000', letterSpacing: '0.05em' }}>{dates[1] || 'Present'}</div>
    </div>
  );
}

/* ── Smart auto-bold bullets ── */
function BulletText({ text, color }: { text: string; color: string }) {
  const words = text.split(' ');
  const breakIdx = words.findIndex((w, wi) =>
    wi >= 3 && ['by', 'through', 'via', 'across', 'using', 'in', 'from', 'after', 'during'].includes(w.toLowerCase())
  );
  const boldEnd = breakIdx > 0 ? breakIdx : Math.min(8, words.length);
  const boldPart = words.slice(0, boldEnd).join(' ');
  const restPart = words.slice(boldEnd).join(' ');

  return (
    <div className="flex gap-3 items-start">
      <span className="mt-1.5 w-2 h-2 shrink-0" style={{ background: color, transform: 'rotate(45deg)', opacity: 0.6 }} />
      <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-crimson)' }}>
        <strong style={{ color: 'var(--rt-ink)' }}>{boldPart}</strong>
        {restPart && <span className="opacity-75"> {restPart}</span>}
      </p>
    </div>
  );
}

/* ── Timeline entries definition ── */
interface TimelineEntry {
  key: string;
  type: 'full' | 'milestone' | 'pointer';
  title: string;
  role: string;
  period: string;
  location?: string;
  bullets?: string[];
  era: keyof typeof eraStyles;
  decoration: 'paper-clip' | 'tape-strip' | 'staple' | 'none';
  fileNum: string;
  completed: boolean;
  coffeeStain?: boolean;
}

function buildTimeline(): TimelineEntry[] {
  // previousRoles[2] = ISRO, [1] = HighRadius, [0] = HP
  const isro = previousRoles[2];
  const highradius = previousRoles[1];
  const hp = previousRoles[0];
  const gt = education[0];
  const srm = education[1];

  return [
    {
      key: 'isro',
      type: 'full',
      title: isro.company,
      role: isro.role,
      period: isro.period,
      location: isro.location,
      bullets: isro.bullets,
      era: 'isro',
      decoration: 'staple',
      fileNum: '001',
      completed: true,
    },
    {
      key: 'srm',
      type: 'milestone',
      title: srm.institution,
      role: srm.degree,
      period: srm.period,
      location: 'Chennai',
      era: 'srm',
      decoration: 'none',
      fileNum: '002',
      completed: true,
    },
    {
      key: 'highradius',
      type: 'full',
      title: highradius.company,
      role: highradius.role,
      period: highradius.period,
      location: highradius.location,
      bullets: highradius.bullets,
      era: 'highradius',
      decoration: 'tape-strip',
      fileNum: '003',
      completed: true,
      coffeeStain: true,
    },
    {
      key: 'hp',
      type: 'full',
      title: hp.company,
      role: hp.role,
      period: hp.period,
      location: hp.location,
      bullets: hp.bullets,
      era: 'hp',
      decoration: 'paper-clip',
      fileNum: '004',
      completed: true,
    },
    {
      key: 'gt',
      type: 'milestone',
      title: gt.institution,
      role: gt.degree,
      period: gt.period,
      location: 'Atlanta, GA',
      era: 'gt',
      decoration: 'none',
      fileNum: '005',
      completed: true,
    },
    {
      key: 'bv',
      type: 'pointer',
      title: 'Bureau Veritas',
      role: 'Security Engineer',
      period: 'Mar 2024 – Present',
      location: 'Seattle, WA',
      era: 'bv',
      decoration: 'none',
      fileNum: '006',
      completed: false,
    },
  ];
}

export default function TheJourney() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const timeline = buildTimeline();

  return (
    <section data-section="2" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollAnimator>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-current opacity-20" />
            <span className="text-[10px] tracking-[0.3em] opacity-50" style={{ fontFamily: 'var(--font-mono)' }}>
              SECTION 02 // THE JOURNEY
            </span>
            <div className="h-px flex-1 bg-current opacity-20" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ fontFamily: 'var(--font-courier)' }}>
            THE JOURNEY
          </h2>
        </ScrollAnimator>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical dashed connector */}
          <div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px hidden md:block"
            style={{
              background: 'repeating-linear-gradient(to bottom, var(--rt-ink) 0px, var(--rt-ink) 6px, transparent 6px, transparent 12px)',
              opacity: 0.1,
            }}
          />

          <div className="space-y-10">
            {timeline.map((entry, idx) => {
              const style = eraStyles[entry.era];
              const isHovered = hoveredIdx === idx;

              /* ── Milestone card (small) ── */
              if (entry.type === 'milestone') {
                return (
                  <ScrollAnimator key={entry.key} animation={idx % 2 === 0 ? 'slideLeft' : 'slideRight'} delay={idx * 0.1}>
                    <div className="relative md:ml-12">
                      {/* Timeline dot */}
                      <div
                        className="absolute -left-12 md:-left-12 top-4 w-4 h-4 rounded-full hidden md:flex items-center justify-center"
                        style={{ background: 'var(--rt-paper)', border: `2px solid ${style.stampColor}`, zIndex: 5 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: style.stampColor }} />
                      </div>

                      <div
                        className="relative p-4 md:p-5 rounded-sm overflow-hidden"
                        style={{
                          background: isDark ? style.bgDark : style.bgLight,
                          border: isDark ? style.borderDark : style.borderLight,
                          transform: `rotate(${style.rotation}deg)`,
                          boxShadow: '2px 3px 8px rgba(0,0,0,0.06)',
                          maxWidth: '480px',
                        }}
                      >
                        {entry.era === 'gt' && (
                          <>
                            <div className="absolute top-0 left-0 w-8 h-8" style={{ borderTop: '2px solid #B3A369', borderLeft: '2px solid #B3A369', opacity: 0.5 }} />
                            <div className="absolute top-0 right-0 w-8 h-8" style={{ borderTop: '2px solid #B3A369', borderRight: '2px solid #B3A369', opacity: 0.5 }} />
                          </>
                        )}

                        <div className="flex items-center gap-3">
                          {entry.era === 'gt' && (
                            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #D4B86A, #8B7D3C)', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}>
                              <span className="text-[6px] font-bold text-white" style={{ fontFamily: 'var(--font-mono)' }}>GT</span>
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="text-[8px] tracking-[0.2em] opacity-30 mb-0.5" style={{ fontFamily: 'var(--font-mono)' }}>
                              MILESTONE // {entry.fileNum}
                            </div>
                            <h3 className="text-base font-bold" style={{ fontFamily: 'var(--font-courier)' }}>{entry.title}</h3>
                            <p className="text-xs opacity-70 mt-0.5" style={{ fontFamily: 'var(--font-crimson)' }}>{entry.role}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-[10px] opacity-50" style={{ fontFamily: 'var(--font-mono)' }}>{entry.period}</div>
                            {entry.location && <div className="text-[9px] opacity-35" style={{ fontFamily: 'var(--font-mono)' }}>{entry.location}</div>}
                          </div>
                        </div>

                        {entry.era === 'gt' && (
                          <div className="mt-2 text-[10px] opacity-50" style={{ fontFamily: 'var(--font-crimson)' }}>
                            Coursework: Applied Cryptography, Network Security, Binary Exploitation, Secure Systems Design
                            <span className="ml-2 text-[9px] opacity-60" style={{ fontFamily: 'var(--font-mono)', color: '#8B7D3C' }}>[FULL TRANSCRIPT IN SECTION 08]</span>
                          </div>
                        )}

                        {/* Case closed stamp for milestones */}
                        <div className="absolute top-2 right-3" style={{ opacity: 0.5 }}>
                          <svg viewBox="0 0 100 24" style={{ width: '70px', height: '17px', transform: `rotate(${style.stampRotation}deg)` }}>
                            <rect x="1" y="1" width="98" height="22" rx="1" fill="none" stroke={style.stampColor} strokeWidth="1.5" strokeDasharray="14 2 10 2" opacity="0.5" />
                            <text x="50" y="16" textAnchor="middle" fill={style.stampColor} fontSize="10" fontFamily="'Bebas Neue', sans-serif" letterSpacing="2" opacity="0.6">COMPLETED</text>
                          </svg>
                        </div>

                        {/* Corner fold */}
                        <div className="absolute bottom-0 right-0 pointer-events-none" style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '0 0 16px 16px', borderColor: 'transparent transparent var(--rt-tag-border) transparent', opacity: 0.2 }} />
                      </div>
                    </div>
                  </ScrollAnimator>
                );
              }

              /* ── Pointer card (Bureau Veritas) ── */
              if (entry.type === 'pointer') {
                return (
                  <ScrollAnimator key={entry.key} animation="slideRight" delay={idx * 0.1}>
                    <div className="relative md:ml-12">
                      {/* Timeline dot — pulsing */}
                      <div
                        className="absolute -left-12 md:-left-12 top-6 w-4 h-4 rounded-full hidden md:flex items-center justify-center"
                        style={{ background: 'var(--rt-paper)', border: `2px solid ${style.stampColor}`, zIndex: 5 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: style.stampColor, animation: 'pulse 2s ease-in-out infinite' }} />
                      </div>

                      <div
                        className="relative p-5 md:p-6 rounded-sm overflow-hidden"
                        style={{
                          background: isDark ? style.bgDark : style.bgLight,
                          border: isDark ? style.borderDark : style.borderLight,
                          transform: `rotate(${style.rotation}deg)`,
                          boxShadow: '2px 3px 10px rgba(0,0,0,0.08)',
                        }}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="text-[8px] tracking-[0.2em] opacity-30 mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                              ACTIVE ASSIGNMENT // {entry.fileNum}
                            </div>
                            <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-courier)' }}>{entry.title}</h3>
                            <p className="text-sm opacity-70 mt-1" style={{ fontFamily: 'var(--font-crimson)' }}>{entry.role}</p>
                            <p className="text-[10px] opacity-45 mt-1" style={{ fontFamily: 'var(--font-mono)' }}>{entry.location}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-[10px] opacity-50 mb-1" style={{ fontFamily: 'var(--font-mono)' }}>{entry.period}</div>
                            {/* ACTIVE stamp */}
                            <div className="inline-block px-3 py-1 text-[10px] tracking-wider border" style={{ fontFamily: 'var(--font-bebas)', color: '#16A34A', borderColor: '#16A34A', opacity: 0.7 }}>
                              ACTIVE
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3" style={{ borderTop: '1px dashed var(--rt-tag-border)' }}>
                          <div
                            className="text-sm tracking-wider text-center"
                            style={{ fontFamily: 'var(--font-courier)', color: style.stampColor, opacity: 0.7 }}
                          >
                            CONTINUES IN NEXT SECTION &#8594;
                          </div>
                        </div>

                        {/* Corner fold */}
                        <div className="absolute bottom-0 right-0 pointer-events-none" style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '0 0 22px 22px', borderColor: 'transparent transparent var(--rt-tag-border) transparent', opacity: 0.25 }} />
                      </div>
                    </div>
                  </ScrollAnimator>
                );
              }

              /* ── Full career card ── */
              return (
                <ScrollAnimator key={entry.key} animation={idx % 2 === 0 ? 'slideLeft' : 'slideRight'} delay={idx * 0.1}>
                  <div
                    className="relative md:ml-12 cursor-default"
                    style={{
                      transform: isHovered ? 'rotate(0deg) translateY(-4px)' : `rotate(${style.rotation}deg)`,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      boxShadow: isHovered ? '4px 6px 24px rgba(0,0,0,0.15)' : '2px 3px 10px rgba(0,0,0,0.08)',
                    }}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-12 md:-left-12 top-8 w-4 h-4 rounded-full hidden md:flex items-center justify-center"
                      style={{ background: 'var(--rt-paper)', border: `2px solid ${style.stampColor}`, zIndex: 5 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: style.stampColor }} />
                    </div>

                    <div
                      className="relative p-6 md:p-8 rounded-sm overflow-hidden"
                      style={{
                        background: isDark ? style.bgDark : style.bgLight,
                        border: isDark ? style.borderDark : style.borderLight,
                      }}
                    >
                      {/* Decorations */}
                      {entry.decoration === 'paper-clip' && <PaperClipSVG id={entry.key} />}
                      {entry.decoration === 'tape-strip' && <TapeStrip />}
                      {entry.decoration === 'staple' && <StapleSVG id={entry.key} />}

                      {/* Coffee stain */}
                      {entry.coffeeStain && (
                        <div className="absolute pointer-events-none" style={{ bottom: '25px', right: '35px', width: '65px', height: '60px', borderRadius: '48% 52% 50% 50%', background: 'radial-gradient(ellipse, transparent 25%, rgba(120,75,30,0.12) 36%, rgba(139,90,43,0.06) 50%, transparent 64%)', transform: 'rotate(10deg)' }} />
                      )}

                      {/* Header row */}
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-5 relative z-[2]">
                        <div className="flex-1">
                          <div className="text-[8px] tracking-[0.2em] opacity-30 mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                            FILE #{entry.fileNum} // {entry.decoration.toUpperCase().replace('-', ' ')}
                          </div>
                          <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-courier)' }}>{entry.title}</h3>
                          <p className="text-sm opacity-70 mt-1" style={{ fontFamily: 'var(--font-crimson)' }}>{entry.role}</p>
                          <p className="text-[10px] opacity-45 mt-1" style={{ fontFamily: 'var(--font-mono)' }}>{entry.location}</p>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <DateStamp period={entry.period} />
                          {entry.completed && <CaseClosedStamp color={style.stampColor} rotation={style.stampRotation} />}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="mb-5 opacity-15" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '2px', lineHeight: 1 }}>
                        {'- '.repeat(40)}
                      </div>

                      {/* Bullets */}
                      <div className="space-y-3 relative z-[2]">
                        {entry.bullets?.map((bullet, i) => (
                          <BulletText key={i} text={bullet} color={style.stampColor} />
                        ))}
                      </div>

                      {/* Page corner fold */}
                      <div className="absolute bottom-0 right-0 pointer-events-none" style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '0 0 22px 22px', borderColor: 'transparent transparent var(--rt-tag-border) transparent', opacity: 0.25 }} />
                    </div>
                  </div>
                </ScrollAnimator>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
