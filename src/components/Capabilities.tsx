'use client';

import { useState, useEffect, useRef } from 'react';
import { capabilities } from '@/data/resume';
import ScrollAnimator from './ScrollAnimator';

const groups: { label: string; indices: number[]; note: string }[] = [
  { label: 'OFFENSIVE OPERATIONS', indices: [0, 1, 2, 15], note: '"Strongest domain — offensive instincts are sharp."' },
  { label: 'CLOUD & INFRASTRUCTURE', indices: [3, 9, 10], note: '"Deep AWS knowledge. 40+ services assessed firsthand."' },
  { label: 'INTELLIGENCE & ANALYSIS', indices: [5, 6, 7, 11, 12], note: '"Unusual — combines AI/LLM testing with code-level depth."' },
  { label: 'SPECIALIZED DOMAINS', indices: [8, 4, 14, 17, 18, 19], note: '"Rare breadth: mobile + browser + crypto + WordPress."' },
  { label: 'PROGRAM & REPORTING', indices: [13, 16], note: '"Reports are engineering-ready. Peer reviews are thorough."' },
];

const ratingLevels = ['FAMILIAR', 'COMPETENT', 'PROFICIENT', 'EXPERT'] as const;

function getRatingIdx(proficiency: number): number {
  if (proficiency >= 90) return 3;
  if (proficiency >= 80) return 2;
  if (proficiency >= 70) return 1;
  return 0;
}

function getRatingColor(proficiency: number): string {
  if (proficiency >= 90) return '#CC0000';
  if (proficiency >= 80) return '#8B1A1A';
  if (proficiency >= 70) return '#B45309';
  return '#666';
}

function CapabilityRow({ cap, index, isExpanded, onToggle, rowNum }: {
  cap: typeof capabilities[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  rowNum: number;
}) {
  const [animated, setAnimated] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const ratingIdx = getRatingIdx(cap.proficiency);
  const color = getRatingColor(cap.proficiency);
  const isExpert = ratingIdx === 3;
  const isOdd = rowNum % 2 === 1;

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="cursor-pointer transition-all duration-200"
      onClick={onToggle}
      style={{
        borderBottom: '1px dashed var(--rt-tag-border)',
        padding: '14px 8px',
        background: isOdd ? 'rgba(0,0,0,0.015)' : 'transparent',
      }}
    >
      <div className="flex items-center gap-3">
        {/* Field number */}
        <span className="text-[9px] opacity-25 w-6 shrink-0 text-right" style={{ fontFamily: 'var(--font-mono)' }}>
          {String(rowNum).padStart(2, '0')}
        </span>

        {/* Name */}
        <span className="text-xs tracking-wider font-semibold flex-1" style={{ fontFamily: 'var(--font-courier)', minWidth: '130px' }}>
          {cap.name.toUpperCase()}
        </span>

        {/* Proficiency bar */}
        <div ref={barRef} className="flex-1 max-w-[180px] hidden md:block">
          <div className="h-3 rounded-sm overflow-hidden relative" style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
            {[25, 50, 75].map(p => (
              <div key={p} className="absolute top-0 bottom-0 w-px" style={{ left: `${p}%`, background: 'rgba(0,0,0,0.06)' }} />
            ))}
            <div
              className="h-full rounded-sm"
              style={{
                width: animated ? `${cap.proficiency}%` : '0%',
                background: `linear-gradient(90deg, ${color}AA, ${color})`,
                transition: `width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.04}s`,
              }}
            />
          </div>
        </div>

        {/* Checkbox-style rating — 4 boxes, one checked */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          {ratingLevels.map((level, li) => {
            const isChecked = li === ratingIdx;
            return (
              <div key={level} className="flex items-center gap-0.5 relative">
                <span
                  className="text-[8px]"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: isChecked ? color : 'var(--rt-ink)',
                    opacity: isChecked ? 0.9 : 0.2,
                    fontWeight: isChecked ? 700 : 400,
                  }}
                >
                  {isChecked ? '☒' : '☐'} {level}
                </span>
                {/* Red pen circle on EXPERT items */}
                {isChecked && isExpert && (
                  <svg
                    className="absolute -inset-1"
                    viewBox="0 0 60 20"
                    style={{ width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}
                  >
                    <ellipse
                      cx="30" cy="10" rx="28" ry="9"
                      fill="none"
                      stroke="#CC0000"
                      strokeWidth="1.2"
                      strokeDasharray="8 3 5 3 12 3"
                      opacity="0.4"
                      transform="rotate(-2 30 10)"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: just show rating badge */}
        <span
          className="sm:hidden text-[9px] tracking-[0.1em] font-bold px-2 py-0.5 shrink-0"
          style={{ fontFamily: 'var(--font-mono)', color, border: `1.5px solid ${color}`, opacity: 0.8, textAlign: 'center' }}
        >
          {ratingLevels[ratingIdx]}
        </span>

        <span className="text-[10px] opacity-25 shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
          {isExpanded ? '▼' : '▶'}
        </span>
      </div>

      {/* Expanded — paper unfold animation */}
      {isExpanded && (
        <div
          className="mt-3 ml-9 p-4 relative overflow-hidden"
          style={{
            borderLeft: `2px solid ${color}33`,
            background: 'rgba(0,0,0,0.01)',
            transformOrigin: 'top',
            animation: 'paperUnfold 0.4s ease forwards',
          }}
        >
          <div className="flex flex-wrap gap-1.5">
            {cap.skills.map((skill, i) => (
              <span
                key={skill}
                className="text-[10px] px-2 py-0.5 rounded-sm"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'var(--rt-tag-bg)',
                  color: 'var(--rt-tag-text)',
                  border: '1px solid var(--rt-tag-border)',
                  animation: `skillTagFadeIn 0.25s ease ${i * 0.025}s both`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-3 text-[9px] opacity-30" style={{ fontFamily: 'var(--font-mono)' }}>
            {cap.skills.length} SKILLS DOCUMENTED // PROFICIENCY: {cap.proficiency}%
          </div>
        </div>
      )}
    </div>
  );
}

export default function Capabilities() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const avgProficiency = Math.round(capabilities.reduce((s, c) => s + c.proficiency, 0) / capabilities.length);
  const expertCount = capabilities.filter(c => c.proficiency >= 90).length;
  const totalSkills = capabilities.reduce((s, c) => s + c.skills.length, 0);

  let globalRow = 0;

  return (
    <section data-section="4" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollAnimator animation="fadeIn">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-current opacity-20" />
            <span className="text-[10px] tracking-[0.3em] opacity-50" style={{ fontFamily: 'var(--font-mono)' }}>
              SECTION 04 // FORM NO. OA-2026
            </span>
            <div className="h-px flex-1 bg-current opacity-20" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ fontFamily: 'var(--font-courier)' }}>
            OPERATOR CAPABILITY ASSESSMENT
          </h2>
        </ScrollAnimator>

        <ScrollAnimator animation="revealUp" delay={0.1}>
          <div
            className="relative rounded-sm"
            style={{ background: 'var(--rt-paper)', border: '1px solid var(--rt-tag-border)', boxShadow: '3px 4px 16px rgba(0,0,0,0.08)' }}
          >
            {/* Form header */}
            <div className="px-6 md:px-8 py-5" style={{ borderBottom: '2px solid var(--rt-tag-border)' }}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-[9px] tracking-[0.2em] opacity-35 mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    STANDARDIZED CAPABILITY ASSESSMENT FORM // OA-2026
                  </div>
                  <div className="text-[9px] tracking-[0.15em] opacity-25 mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    SUBJECT: YADDALA, M.N.K. // ASSESSOR:{' '}
                    <span style={{ background: 'var(--rt-ink)', color: 'transparent', padding: '0 28px' }}>REDACTED</span>
                  </div>
                </div>
                <div style={{ transform: 'rotate(-6deg)' }}>
                  <svg viewBox="0 0 160 44" style={{ width: '130px', height: '36px', filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.08))' }}>
                    <defs>
                      <filter id="capSW">
                        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="n" />
                        <feColorMatrix type="saturate" values="0" in="n" result="bw" />
                        <feComponentTransfer in="bw" result="t"><feFuncA type="discrete" tableValues="0 0 1 1 1 1 1 1" /></feComponentTransfer>
                        <feComposite operator="in" in="SourceGraphic" in2="t" />
                      </filter>
                    </defs>
                    <rect x="2" y="2" width="156" height="40" rx="1" fill="none" stroke="#CC0000" strokeWidth="2.5" strokeDasharray="22 2 14 2 32 2 10 2" opacity="0.65" />
                    <text x="80" y="29" textAnchor="middle" fill="#CC0000" fontSize="16" fontFamily="'Bebas Neue', sans-serif" letterSpacing="4" opacity="0.8" filter="url(#capSW)">CLEARED</text>
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mt-4 pt-3" style={{ borderTop: '1px dashed var(--rt-tag-border)' }}>
                {[
                  { v: capabilities.length, l: 'DOMAINS' },
                  { v: expertCount, l: 'EXPERT RATED' },
                  { v: totalSkills, l: 'TOTAL SKILLS' },
                  { v: `${avgProficiency}%`, l: 'AVG PROFICIENCY' },
                ].map(s => (
                  <div key={s.l}>
                    <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-courier)', color: '#CC0000' }}>{s.v}</span>
                    <span className="text-[8px] tracking-[0.15em] opacity-40 ml-2" style={{ fontFamily: 'var(--font-mono)' }}>{s.l}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mt-3 pt-2">
                {[
                  { label: 'EXPERT', color: '#CC0000', range: '90-100%' },
                  { label: 'PROFICIENT', color: '#8B1A1A', range: '80-89%' },
                  { label: 'COMPETENT', color: '#B45309', range: '70-79%' },
                  { label: 'FAMILIAR', color: '#666', range: '<70%' },
                ].map(r => (
                  <div key={r.label} className="flex items-center gap-1.5">
                    <span className="w-3 h-2 rounded-sm" style={{ background: r.color, opacity: 0.7 }} />
                    <span className="text-[8px] opacity-40" style={{ fontFamily: 'var(--font-mono)' }}>{r.label} ({r.range})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment body */}
            <div className="px-6 md:px-8 py-4">
              {groups.map((group, gi) => {
                const groupRows = group.indices.map(() => { globalRow++; return globalRow; });
                return (
                  <div key={group.label} className="mb-4">
                    <div className="flex items-center gap-3 mb-1 mt-5">
                      <span className="text-[9px] tracking-[0.2em] font-bold opacity-50" style={{ fontFamily: 'var(--font-mono)' }}>
                        {String.fromCharCode(65 + gi)}. {group.label}
                      </span>
                      <div className="flex-1 h-px" style={{ background: 'var(--rt-tag-border)' }} />
                    </div>

                    {group.indices.map((capIdx, ri) => {
                      const cap = capabilities[capIdx];
                      if (!cap) return null;
                      return (
                        <CapabilityRow
                          key={cap.name}
                          cap={cap}
                          index={capIdx}
                          isExpanded={expandedIdx === capIdx}
                          onToggle={() => setExpandedIdx(expandedIdx === capIdx ? null : capIdx)}
                          rowNum={groupRows[ri]}
                        />
                      );
                    })}

                    {/* Handwritten assessor note per group */}
                    <div
                      className="mt-2 mb-4 pl-9"
                      style={{
                        fontFamily: 'var(--font-caveat)',
                        color: '#8B1A1A',
                        fontSize: '0.95rem',
                        transform: `rotate(${-0.5 + gi * 0.3}deg)`,
                        opacity: 0.55,
                      }}
                    >
                      {group.note}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Form footer with ASSESSMENT COMPLETE stamp */}
            <div className="px-6 md:px-8 py-5 relative" style={{ borderTop: '2px solid var(--rt-tag-border)' }}>
              {/* Large faint ASSESSMENT COMPLETE stamp across footer */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <svg viewBox="0 0 400 50" style={{ width: '350px', height: '44px', transform: 'rotate(-4deg)', opacity: 0.06 }}>
                  <text x="200" y="38" textAnchor="middle" fill="var(--rt-ink)" fontSize="34" fontFamily="'Bebas Neue', sans-serif" letterSpacing="8">
                    ASSESSMENT COMPLETE
                  </text>
                </svg>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-4 relative z-[2]">
                <div>
                  <div className="text-[8px] tracking-[0.15em] opacity-30 mb-1" style={{ fontFamily: 'var(--font-mono)' }}>ASSESSOR SIGNATURE</div>
                  <div className="w-40 h-px mb-1" style={{ background: 'var(--rt-ink)', opacity: 0.2 }} />
                  <span style={{ background: 'var(--rt-ink)', color: 'transparent', padding: '0 50px', fontSize: '8px' }}>REDACTED</span>
                </div>
                <div>
                  <div className="text-[8px] tracking-[0.15em] opacity-30 mb-1" style={{ fontFamily: 'var(--font-mono)' }}>DATE OF ASSESSMENT</div>
                  <div className="text-xs font-bold" style={{ fontFamily: 'var(--font-courier)', color: '#CC0000' }}>APRIL 2026</div>
                </div>
                <div className="text-[8px] tracking-[0.15em] opacity-25" style={{ fontFamily: 'var(--font-mono)' }}>FORM OA-2026 // PAGE 1 OF 1</div>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 pointer-events-none" style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '0 0 22px 22px', borderColor: 'transparent transparent var(--rt-tag-border) transparent', opacity: 0.2 }} />
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
