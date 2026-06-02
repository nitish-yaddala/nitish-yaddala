'use client';

import { useState, useRef, useEffect } from 'react';
import { bureauVeritas } from '@/data/resume';
import ScrollAnimator from './ScrollAnimator';

const tabKeys = Object.keys(bureauVeritas.tabs) as (keyof typeof bureauVeritas.tabs)[];

const tabLabels: Record<string, string> = {
  WEB_API: 'WEB / API',
  AWS_CLOUD: 'AWS CLOUD',
  AI_LLM: 'AI / LLM',
  MOBILE: 'MOBILE',
  CONTAINER: 'CONTAINER / K8S',
  CODE_REVIEW: 'CODE REVIEW',
  LOG_DETECT: 'LOG & DETECTION',
};

const tabCodes: Record<string, string> = {
  WEB_API: 'SEC-01',
  AWS_CLOUD: 'SEC-02',
  AI_LLM: 'SEC-03',
  MOBILE: 'SEC-04',
  CONTAINER: 'SEC-05',
  CODE_REVIEW: 'SEC-06',
  LOG_DETECT: 'SEC-07',
};

export default function BureauVeritas() {
  const [activeTab, setActiveTab] = useState<keyof typeof bureauVeritas.tabs>('WEB_API');
  const [animKey, setAnimKey] = useState(0);
  const [shuffling, setShuffling] = useState(false);
  const [accessFlash, setAccessFlash] = useState('');
  const [typedBold, setTypedBold] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef(false);

  const handleTabChange = (key: keyof typeof bureauVeritas.tabs) => {
    if (key === activeTab) return;

    // 1. Paper shuffle animation
    setShuffling(true);

    // 2. Classification flash
    setAccessFlash(`ACCESSING ${tabCodes[key]}...`);

    setTimeout(() => {
      setShuffling(false);
      setAccessFlash('');
      setActiveTab(key);
      setAnimKey(prev => prev + 1);
      setTypedBold('');
      typingRef.current = false;
    }, 400);
  };

  // 3. Animate bullets sliding in + typewriter on first bullet's bold part
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const bullets = el.querySelectorAll('.case-bullet');
    bullets.forEach((b, i) => {
      const htmlEl = b as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateX(15px)';
      setTimeout(() => {
        htmlEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        htmlEl.style.opacity = '1';
        htmlEl.style.transform = 'translateX(0)';
      }, 100 + i * 70);
    });

    // Typewriter on first bullet's bold part
    if (!typingRef.current) {
      typingRef.current = true;
      const firstBullet = bureauVeritas.tabs[activeTab][0] || '';
      const words = firstBullet.split(' ');
      const breakIdx = words.findIndex((w, idx) =>
        idx >= 3 && ['by', 'through', 'via', 'across', 'using', 'in', 'from', 'after', 'during'].includes(w.toLowerCase())
      );
      const boldEnd = breakIdx > 0 ? breakIdx : Math.min(8, words.length);
      const boldText = words.slice(0, boldEnd).join(' ');

      let i = 0;
      setTypedBold('');
      const timer = setInterval(() => {
        if (i <= boldText.length) {
          setTypedBold(boldText.slice(0, i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 35);
      return () => clearInterval(timer);
    }
  }, [activeTab, animKey]);

  const activeBullets = bureauVeritas.tabs[activeTab];

  return (
    <section data-section="3" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">

        <ScrollAnimator animation="fadeIn">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-current opacity-20" />
            <span className="text-[10px] tracking-[0.3em] opacity-50" style={{ fontFamily: 'var(--font-mono)' }}>
              SECTION 03 // PRIMARY CASE FILE
            </span>
            <div className="h-px flex-1 bg-current opacity-20" />
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-12"
            style={{ fontFamily: 'var(--font-courier)' }}
          >
            BUREAU VERITAS, MAJOR CLOUD PROVIDER
          </h2>
        </ScrollAnimator>

        <ScrollAnimator animation="revealUp" delay={0.1}>
          <div
            className="relative rounded-sm"
            style={{
              background: 'var(--rt-paper)',
              border: '1px solid var(--rt-tag-border)',
              boxShadow: '3px 4px 16px rgba(0,0,0,0.1), inset 0 0 40px rgba(0,0,0,0.015)',
            }}
          >
            {/* Case file header */}
            <div className="px-6 md:px-8 py-5 relative" style={{ borderBottom: '2px solid var(--rt-tag-border)' }}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-[9px] tracking-[0.2em] opacity-35 mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    CASE FILE: BV-CLOUD-2024 // PRIORITY: HIGH
                  </div>
                  <h3 className="text-lg md:text-xl font-bold" style={{ fontFamily: 'var(--font-courier)' }}>
                    Cloud Security Assessments
                  </h3>
                  <p className="text-xs opacity-50 mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    {bureauVeritas.period} &middot; {bureauVeritas.role} &middot; {bureauVeritas.location}
                  </p>
                </div>

                {/* ACTIVE stamp — SVG worn */}
                <div style={{ transform: 'rotate(-8deg)' }}>
                  <svg viewBox="0 0 140 40" style={{ width: '110px', height: '32px', filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.08))' }}>
                    <defs>
                      <filter id="activeStWear">
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="n" />
                        <feColorMatrix type="saturate" values="0" in="n" result="bw" />
                        <feComponentTransfer in="bw" result="t">
                          <feFuncA type="discrete" tableValues="0 0 1 1 1 1 1 1" />
                        </feComponentTransfer>
                        <feComposite operator="in" in="SourceGraphic" in2="t" />
                      </filter>
                    </defs>
                    <rect x="2" y="2" width="136" height="36" rx="1" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeDasharray="20 2 12 2 30 2 8 2" opacity="0.7" />
                    <text x="70" y="27" textAnchor="middle" fill="#16A34A" fontSize="16" fontFamily="'Bebas Neue', sans-serif" letterSpacing="4" opacity="0.8" filter="url(#activeStWear)">ACTIVE</text>
                  </svg>
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 mt-4 pt-3" style={{ borderTop: '1px dashed var(--rt-tag-border)' }}>
                {[
                  { label: 'SERVICES ASSESSED', value: '40+' },
                  { label: 'FINDINGS', value: '100+' },
                  { label: 'HIGH SEVERITY', value: '20+' },
                  { label: 'DOMAINS', value: '7' },
                ].map(s => (
                  <div key={s.label}>
                    <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-courier)', color: '#8B1A1A' }}>{s.value}</span>
                    <span className="text-[8px] tracking-[0.15em] opacity-40 ml-2" style={{ fontFamily: 'var(--font-mono)' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab bar */}
            <div className="flex overflow-x-auto px-2 pt-1 -mb-px relative" style={{ background: 'rgba(0,0,0,0.015)', perspective: '800px' }}>
              {tabKeys.map((key) => {
                const isActive = activeTab === key;
                const count = bureauVeritas.tabs[key].length;
                return (
                  <button
                    key={key}
                    onClick={() => handleTabChange(key)}
                    className="relative shrink-0 px-4 py-2.5 text-[10px] tracking-wider whitespace-nowrap"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: isActive ? 700 : 400,
                      background: isActive ? 'linear-gradient(180deg, #D4A76A 0%, #C9A060 100%)' : 'transparent',
                      color: isActive ? '#111' : 'inherit',
                      opacity: isActive ? 1 : 0.5,
                      borderRadius: '4px 4px 0 0',
                      borderBottom: isActive ? '2px solid #D4A76A' : '2px solid transparent',
                      transform: isActive ? 'translateZ(8px) translateY(-2px)' : 'translateZ(-3px)',
                      boxShadow: isActive ? '0 -2px 8px rgba(212,167,106,0.3), 2px 0 4px rgba(0,0,0,0.08)' : 'none',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {/* Pushpin on active tab */}
                    {isActive && (
                      <span
                        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                        style={{
                          background: 'radial-gradient(circle at 30% 25%, #ff8888, #cc0000 50%, #880000)',
                          boxShadow: '0 2px 3px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.3)',
                        }}
                      />
                    )}
                    {tabLabels[key]}
                    <span
                      className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-[8px]"
                      style={{ background: isActive ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.06)', fontWeight: 700 }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tab content area */}
            <div
              ref={contentRef}
              className="px-6 md:px-8 py-6 relative overflow-hidden"
              style={{
                background: 'rgba(212,167,106,0.06)',
                borderTop: '3px solid #D4A76A',
                minHeight: '300px',
              }}
            >
              {/* Paper shuffle overlay — flashes briefly on tab switch */}
              {shuffling && (
                <div
                  className="absolute inset-0 z-30 pointer-events-none"
                  style={{
                    background: 'var(--rt-paper)',
                    animation: 'paperShuffle 0.4s ease forwards',
                  }}
                />
              )}

              {/* Classification access flash */}
              {accessFlash && (
                <div
                  className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                  style={{ background: 'rgba(0,0,0,0.03)' }}
                >
                  <span
                    className="text-sm tracking-[0.3em] font-bold"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: '#CC0000',
                      opacity: 0.6,
                      animation: 'accessBlink 0.15s ease infinite alternate',
                    }}
                  >
                    {accessFlash}
                  </span>
                </div>
              )}

              {/* Document age spots — foxing */}
              <div className="absolute pointer-events-none" style={{ top: '15%', right: '8%', width: '40px', height: '35px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(160,120,60,0.06) 0%, transparent 70%)', transform: 'rotate(15deg)' }} />
              <div className="absolute pointer-events-none" style={{ bottom: '20%', left: '5%', width: '30px', height: '25px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(160,120,60,0.05) 0%, transparent 70%)', transform: 'rotate(-10deg)' }} />
              <div className="absolute pointer-events-none" style={{ top: '60%', right: '15%', width: '20px', height: '18px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(160,120,60,0.04) 0%, transparent 70%)' }} />

              {/* Tab domain header */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="px-2 py-1 text-xs font-bold"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    border: '1.5px solid var(--rt-ink)',
                    opacity: 0.5,
                    letterSpacing: '0.1em',
                  }}
                >
                  {tabCodes[activeTab]}
                </span>
                <div>
                  <h4 className="text-base font-bold" style={{ fontFamily: 'var(--font-courier)' }}>
                    {tabLabels[activeTab]}
                  </h4>
                  <span className="text-[9px] opacity-40" style={{ fontFamily: 'var(--font-mono)' }}>
                    {activeBullets.length} documented findings &amp; activities
                  </span>
                </div>
              </div>

              {/* Bullets */}
              <div className="space-y-4">
                {activeBullets.map((bullet, i) => {
                  const words = bullet.split(' ');
                  const breakIdx = words.findIndex((w, idx) =>
                    idx >= 3 && ['by', 'through', 'via', 'across', 'using', 'in', 'from', 'after', 'during'].includes(w.toLowerCase())
                  );
                  const boldEnd = breakIdx > 0 ? breakIdx : Math.min(8, words.length);
                  const boldPart = words.slice(0, boldEnd).join(' ');
                  const restPart = words.slice(boldEnd).join(' ');

                  // First bullet uses typewriter effect for bold part
                  const isFirst = i === 0;
                  const displayBold = isFirst && typedBold.length < boldPart.length ? typedBold : boldPart;
                  const showCursor = isFirst && typedBold.length < boldPart.length;

                  return (
                    <div
                      key={`${activeTab}-${i}-${animKey}`}
                      className="case-bullet flex gap-3 items-start relative"
                    >
                      {/* Red diamond bullet */}
                      <span className="mt-1.5 w-2 h-2 shrink-0" style={{ background: '#CC0000', transform: 'rotate(45deg)' }} />
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-crimson)' }}>
                          <strong className="relative" style={{ color: 'var(--rt-ink)' }}>
                            {displayBold}
                            {showCursor && <span className="typewriter-cursor" />}
                            {/* Red ink underline on bold part — draws itself */}
                            <span
                              className="absolute bottom-0 left-0 h-[1.5px]"
                              style={{
                                background: '#CC0000',
                                opacity: 0.35,
                                width: isFirst ? `${Math.min((typedBold.length / boldPart.length) * 100, 100)}%` : '100%',
                                transition: isFirst ? 'none' : 'width 0.6s ease 0.3s',
                              }}
                            />
                          </strong>
                          {restPart && <span className="opacity-80"> {restPart}</span>}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Page corner fold — bottom right */}
              <div
                className="absolute bottom-0 right-0 pointer-events-none"
                style={{
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '0 0 28px 28px',
                  borderColor: `transparent transparent var(--rt-tag-border) transparent`,
                  opacity: 0.3,
                }}
              />
              {/* Fold shadow */}
              <div
                className="absolute bottom-0 right-0 pointer-events-none"
                style={{
                  width: '28px',
                  height: '28px',
                  background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.04) 50%)',
                }}
              />

              {/* Tab watermark */}
              <div
                className="absolute bottom-4 right-8 font-bold pointer-events-none select-none"
                style={{ fontFamily: 'var(--font-bebas)', fontSize: '5rem', opacity: 0.025, letterSpacing: '0.05em', lineHeight: 1 }}
              >
                {activeTab.replace('_', ' ')}
              </div>
            </div>

            {/* Case file footer */}
            <div className="px-6 md:px-8 py-3 flex items-center justify-between" style={{ borderTop: '1px dashed var(--rt-tag-border)', opacity: 0.4 }}>
              <span className="text-[8px] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)' }}>
                CASE BV-CLOUD-2024 // 7 ASSESSMENT DOMAINS // {bureauVeritas.period}
              </span>
              <span className="text-[8px] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)' }}>
                PAGE {tabKeys.indexOf(activeTab) + 1} OF {tabKeys.length}
              </span>
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
