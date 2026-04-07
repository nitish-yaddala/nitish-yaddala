'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { platformMethodologies } from '@/data/resume';
import type { PlatformMethodology } from '@/data/resume';
import ScrollAnimator from './ScrollAnimator';

/* ─── Platform icon SVGs ─── */
const platformIcons: Record<string, React.ReactElement> = {
  cloud: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 12h8.5a3.5 3.5 0 0 0 .5-6.97A5 5 0 0 0 3.5 6.5 3 3 0 0 0 4 12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  web: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="8" cy="8" rx="3" ry="6" stroke="currentColor" strokeWidth="1" />
      <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  mobile: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="4" y="1" width="8" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="12.5" r="0.8" fill="currentColor" />
    </svg>
  ),
  bounty: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <text x="8" y="11" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold">$</text>
    </svg>
  ),
  browser: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="2" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="1" y1="5.5" x2="15" y2="5.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="3.5" cy="3.8" r="0.6" fill="currentColor" />
      <circle cx="5.5" cy="3.8" r="0.6" fill="currentColor" />
      <circle cx="7.5" cy="3.8" r="0.6" fill="currentColor" />
    </svg>
  ),
  chain: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="4" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="8" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6" y="1" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6" y1="3" x2="4" y2="4" stroke="currentColor" strokeWidth="1" />
      <line x1="6" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  code: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <polyline points="5,3 1,8 5,13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="11,3 15,8 11,13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="9.5" y1="2" x2="6.5" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

/* ─── Phase icons ─── */
const phaseIcons: Record<string, React.ReactElement> = {
  '01': <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" /><line x1="10" y1="2" x2="10" y2="6" stroke="currentColor" strokeWidth="1.5" /><line x1="10" y1="14" x2="10" y2="18" stroke="currentColor" strokeWidth="1.5" /><line x1="2" y1="10" x2="6" y2="10" stroke="currentColor" strokeWidth="1.5" /><line x1="14" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.5" /></svg>,
  '02': <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 6v5c0 4 3 6.5 7 8 4-1.5 7-4 7-8V6L10 2z" stroke="currentColor" strokeWidth="1.5" /></svg>,
  '03': <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" /><line x1="13" y1="13" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  '04': <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M11 2L5 11h4l-2 7 8-9h-4l2-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>,
  '05': <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="5" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="15" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" /><line x1="10" y1="7" x2="5" y2="13" stroke="currentColor" strokeWidth="1" /><line x1="10" y1="7" x2="15" y2="13" stroke="currentColor" strokeWidth="1" /></svg>,
  '06': <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" /><line x1="7" y1="6" x2="13" y2="6" stroke="currentColor" strokeWidth="1" /><line x1="7" y1="9" x2="13" y2="9" stroke="currentColor" strokeWidth="1" /><line x1="7" y1="12" x2="11" y2="12" stroke="currentColor" strokeWidth="1" /></svg>,
  '07': <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M14 3a7 7 0 1 1-9.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
};

/* ─── Terminal typing effect ─── */
function TerminalOutput({ lines, phaseKey }: { lines: string[]; phaseKey: string }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  // Reset when phase changes
  useEffect(() => {
    setVisibleLines([]);
    setCurrentLine('');
    setLineIdx(0);
    setCharIdx(0);
  }, [phaseKey]);

  useEffect(() => {
    if (lineIdx >= lines.length) return;

    const line = lines[lineIdx];
    if (charIdx < line.length) {
      const timer = setTimeout(() => {
        setCurrentLine(line.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, 12 + Math.random() * 18);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        setCurrentLine('');
        setCharIdx(0);
        setLineIdx(lineIdx + 1);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [lineIdx, charIdx, lines]);

  return (
    <div
      className="mt-4 p-4 rounded-sm font-mono text-[11px] leading-relaxed overflow-hidden"
      style={{
        background: '#0a0c0e',
        border: '1px solid #1a2030',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
        color: '#4ade80',
        fontFamily: 'var(--font-mono)',
        maxHeight: '220px',
        overflowY: 'auto',
      }}
    >
      <div className="flex items-center gap-1.5 mb-3 pb-2" style={{ borderBottom: '1px solid #1a2030' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: '#ef4444' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: '#eab308' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
        <span className="ml-2 text-[9px] text-white/20">breach-assessment</span>
      </div>

      {visibleLines.map((line, i) => (
        <div key={i} className="mb-0.5">
          <span style={{ color: '#CC0000' }}>$ </span>
          <span>{line}</span>
        </div>
      ))}
      {currentLine && (
        <div>
          <span style={{ color: '#CC0000' }}>$ </span>
          <span>{currentLine}</span>
          <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle" style={{ background: '#4ade80', animation: 'blink 0.7s step-end infinite' }} />
        </div>
      )}
      {lineIdx >= lines.length && visibleLines.length > 0 && (
        <div className="mt-2 text-[10px]" style={{ color: '#22c55e' }}>
          ✓ Phase complete
        </div>
      )}
    </div>
  );
}

/* ─── Circular Ops Diagram ─── */
function OpsDiagram({
  phases,
  activePhase,
  onSelect,
}: {
  phases: PlatformMethodology['phases'];
  activePhase: number | null;
  onSelect: (idx: number) => void;
}) {
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 115;

  const nodes = phases.map((phase, idx) => {
    const angle = (idx / phases.length) * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      phase,
      idx,
    };
  });

  return (
    <div className="flex justify-center mb-8">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="var(--rt-c-divider)" strokeWidth="1" strokeDasharray="4 4" />

        {nodes.map((node, idx) => {
          const next = nodes[(idx + 1) % nodes.length];
          const midX = (node.x + next.x) / 2;
          const midY = (node.y + next.y) / 2;
          const outX = midX + (midX - cx) * 0.15;
          const outY = midY + (midY - cy) * 0.15;

          return (
            <path
              key={`arrow-${idx}`}
              d={`M ${node.x} ${node.y} Q ${outX} ${outY} ${next.x} ${next.y}`}
              fill="none"
              stroke={activePhase === idx ? '#CC0000' : 'var(--rt-c-divider)'}
              strokeWidth={activePhase === idx ? 2 : 1}
              strokeDasharray={activePhase === idx ? undefined : '3 3'}
              style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
            />
          );
        })}

        {activePhase !== null && (
          <circle r="2.5" fill="#CC0000" opacity="0.8">
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path={(() => {
                const node = nodes[activePhase];
                const next = nodes[(activePhase + 1) % nodes.length];
                const midX = (node.x + next.x) / 2;
                const midY = (node.y + next.y) / 2;
                const outX = midX + (midX - cx) * 0.15;
                const outY = midY + (midY - cy) * 0.15;
                return `M ${node.x} ${node.y} Q ${outX} ${outY} ${next.x} ${next.y}`;
              })()}
            />
          </circle>
        )}

        {nodes.map(({ x, y, phase, idx: i }) => {
          const isActive = activePhase === i;
          return (
            <g key={phase.phase} className="cursor-pointer" onClick={() => onSelect(i)}>
              {isActive && (
                <circle cx={x} cy={y} r="24" fill="none" stroke="#CC0000" strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="22;26;22" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.15;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={x} cy={y} r="20"
                fill={isActive ? '#CC0000' : 'var(--rt-classified-bg-mid)'}
                stroke={isActive ? '#CC0000' : 'var(--rt-classified-border)'}
                strokeWidth={isActive ? 2 : 1.5}
                style={{ transition: 'fill 0.3s, stroke 0.3s' }}
              />
              <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fill={isActive ? '#fff' : 'var(--rt-c-text-muted)'} fontSize="11" fontWeight="bold" fontFamily="var(--font-mono)" style={{ transition: 'fill 0.3s' }}>
                {phase.phase}
              </text>
              <text x={x} y={y + 34} textAnchor="middle" fill={isActive ? 'var(--rt-c-text-primary)' : 'var(--rt-c-text-secondary)'} fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.08em" style={{ transition: 'fill 0.3s' }}>
                {phase.name.length > 14 ? phase.name.slice(0, 12) + '…' : phase.name}
              </text>
            </g>
          );
        })}

        <text x={cx} y={cy - 8} textAnchor="middle" fill="var(--rt-c-text-secondary)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.15em">7-PHASE</text>
        <text x={cx} y={cy + 5} textAnchor="middle" fill="var(--rt-c-text-muted)" fontSize="10" fontFamily="var(--font-bebas)" letterSpacing="0.2em">KILL CHAIN</text>
        <text x={cx} y={cy + 18} textAnchor="middle" fill="var(--rt-c-text-faint)" fontSize="7" fontFamily="var(--font-mono)">↻ CONTINUOUS</text>
      </svg>
    </div>
  );
}

/* ─── Scanner coverage chart ─── */
function ScannerComparison() {
  const phases = [
    { phase: '01', name: 'RECON', scanner: 60 },
    { phase: '02', name: 'THREAT MODEL', scanner: 10 },
    { phase: '03', name: 'DISCOVERY', scanner: 35 },
    { phase: '04', name: 'EXPLOITATION', scanner: 15 },
    { phase: '05', name: 'POST-EXPLOIT', scanner: 5 },
    { phase: '06', name: 'REPORTING', scanner: 20 },
    { phase: '07', name: 'VERIFICATION', scanner: 10 },
  ];

  return (
    <ScrollAnimator delay={0.1}>
      <div className="mt-10 p-5 rounded-sm" style={{ background: 'rgba(0,0,0,0.03)', border: '1px dashed var(--rt-tag-border)' }}>
        <div className="text-[9px] tracking-[0.2em] opacity-40 mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
          WHAT AUTOMATED SCANNERS ACTUALLY COVER
        </div>
        <div className="text-[8px] tracking-wider opacity-25 mb-5" style={{ fontFamily: 'var(--font-mono)' }}>
          THE GAP IS WHERE MANUAL EXPERTISE MATTERS
        </div>
        <div className="space-y-3">
          {phases.map((p) => (
            <div key={p.phase} className="flex items-center gap-3">
              <span className="text-[8px] w-20 shrink-0 text-right opacity-40" style={{ fontFamily: 'var(--font-mono)' }}>
                {p.name}
              </span>
              <div className="flex-1 h-4 rounded-sm overflow-hidden relative" style={{ background: 'var(--rt-bar-bg)' }}>
                {/* Scanner coverage (filled) */}
                <div
                  className="absolute top-0 left-0 h-full rounded-sm"
                  style={{ width: `${p.scanner}%`, background: '#555' }}
                />
                {/* The gap (empty space = manual work) */}
                <div
                  className="absolute top-0 h-full rounded-sm"
                  style={{
                    left: `${p.scanner}%`,
                    right: 0,
                    background: 'repeating-linear-gradient(135deg, transparent, transparent 3px, rgba(204,0,0,0.08) 3px, rgba(204,0,0,0.08) 4px)',
                  }}
                />
              </div>
              <span className="text-[9px] w-8 shrink-0 text-right font-bold" style={{ fontFamily: 'var(--font-mono)', color: '#555' }}>
                {p.scanner}%
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 mt-4 pt-3" style={{ borderTop: '1px solid var(--rt-c-divider)' }}>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded-sm" style={{ background: '#555' }} />
            <span className="text-[9px] opacity-40" style={{ fontFamily: 'var(--font-mono)' }}>SCANNER COVERS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded-sm" style={{ background: 'repeating-linear-gradient(135deg, transparent, transparent 2px, rgba(204,0,0,0.15) 2px, rgba(204,0,0,0.15) 3px)' }} />
            <span className="text-[9px] opacity-40" style={{ fontFamily: 'var(--font-mono)' }}>REQUIRES MANUAL EXPERTISE</span>
          </div>
        </div>
      </div>
    </ScrollAnimator>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function Methodology() {
  const [activePlatform, setActivePlatform] = useState(0);
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const platform = platformMethodologies[activePlatform];
  const activeData = activePhase !== null ? platform.phases[activePhase] : null;

  const terminalLines = useMemo(() => {
    if (!activeData) return [];
    return activeData.terminalCmds;
  }, [activeData]);

  // Reset phase when switching platforms
  useEffect(() => {
    setActivePhase(null);
  }, [activePlatform]);

  return (
    <section data-section="7" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <ScrollAnimator animation="fadeIn">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-current opacity-20" />
            <span className="text-[10px] tracking-[0.3em] opacity-50" style={{ fontFamily: 'var(--font-mono)' }}>
              SECTION 07 // SOP-AWS-7P-2024
            </span>
            <div className="h-px flex-1 bg-current opacity-20" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ fontFamily: 'var(--font-courier)' }}>
            STANDARD OPERATING PROCEDURE
          </h2>
          <p className="text-center text-[10px] tracking-[0.2em] mb-10 opacity-40" style={{ fontFamily: 'var(--font-mono)' }}>
            PLATFORM-ADAPTED 7-PHASE METHODOLOGY,SELECT PLATFORM, THEN INSPECT PHASES
          </p>
        </ScrollAnimator>

        {/* Dark classified wrapper */}
        <ScrollAnimator delay={0.05}>
          <div
            className="relative rounded-sm overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, var(--rt-classified-bg-from) 0%, var(--rt-classified-bg-mid) 50%, var(--rt-classified-bg-to) 100%)',
              border: '2px solid var(--rt-classified-border)',
              boxShadow: '0 4px 20px var(--rt-classified-shadow), inset 0 1px 0 var(--rt-classified-inner-glow)',
            }}
          >
            {/* Header */}
            <div
              className="px-6 py-3 flex items-center justify-between"
              style={{
                background: 'linear-gradient(90deg, var(--rt-classified-header-from) 0%, var(--rt-classified-header-mid) 50%, var(--rt-classified-header-to) 100%)',
                borderBottom: '1px solid var(--rt-classified-header-border)',
              }}
            >
              <span className="text-[10px] tracking-[0.25em] font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-classified-header-text)' }}>
                CLASSIFIED // ASSESSMENT METHODOLOGY
              </span>
              <span className="text-[8px] tracking-[0.15em] opacity-30" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-classified-header-sub)' }}>
                {platform.name}
              </span>
            </div>

            <div className="p-6 md:p-10">
              {/* Platform Selector */}
              <div className="mb-8">
                <div className="text-[8px] tracking-[0.2em] mb-3 opacity-30" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-secondary)' }}>
                  SELECT PLATFORM
                </div>
                <div className="flex flex-wrap gap-2">
                  {platformMethodologies.map((p, idx) => {
                    const isActive = activePlatform === idx;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setActivePlatform(idx)}
                        className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-wider transition-all duration-200"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          background: isActive ? 'rgba(204,0,0,0.12)' : 'var(--rt-card-bg)',
                          color: isActive ? 'var(--rt-c-accent)' : 'var(--rt-c-text-muted)',
                          border: isActive ? '1px solid rgba(204,0,0,0.4)' : '1px solid var(--rt-card-border)',
                          fontWeight: isActive ? 700 : 400,
                        }}
                      >
                        <span style={{ color: isActive ? 'var(--rt-c-accent)' : 'var(--rt-c-text-secondary)' }}>
                          {platformIcons[p.icon]}
                        </span>
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ops Diagram */}
              <OpsDiagram
                phases={platform.phases}
                activePhase={activePhase}
                onSelect={(i) => setActivePhase(activePhase === i ? null : i)}
              />

              {/* Active phase detail */}
              {activeData && (
                <div
                  key={`${platform.id}-${activePhase}`}
                  className="rounded-sm overflow-hidden mb-6"
                  style={{ border: '1px solid var(--rt-card-border)', background: 'var(--rt-card-bg)' }}
                >
                  {/* Phase header */}
                  <div
                    className="px-5 py-3 flex items-center gap-3"
                    style={{ background: 'rgba(204,0,0,0.06)', borderBottom: '1px solid var(--rt-card-border)' }}
                  >
                    <div style={{ color: '#CC0000' }}>
                      {phaseIcons[activeData.phase]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold" style={{ fontFamily: 'var(--font-courier)', color: 'var(--rt-c-text-primary)' }}>
                        PHASE {activeData.phase}: {activeData.name}
                      </h3>
                      <p className="text-[11px] opacity-50 mt-0.5" style={{ fontFamily: 'var(--font-crimson)', color: 'var(--rt-c-text-secondary)' }}>
                        {activeData.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold" style={{ fontFamily: 'var(--font-bebas)', color: '#CC0000' }}>
                        {activeData.timeAlloc}%
                      </div>
                      <div className="text-[7px] tracking-wider opacity-30" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-secondary)' }}>
                        TIME ALLOC
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Detail checklist */}
                    <div className="space-y-2 mb-4">
                      {activeData.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="mt-0.5 text-[10px] shrink-0" style={{ color: '#CC0000', fontFamily: 'var(--font-mono)' }}>
                            [✓]
                          </span>
                          <span className="text-[12px] leading-relaxed" style={{ fontFamily: 'var(--font-courier)', color: 'var(--rt-c-text-secondary)' }}>
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Real finding callout */}
                    {activeData.linkedFinding && (
                      <div className="p-3 rounded-sm mt-4" style={{ background: 'rgba(204,0,0,0.04)', border: '1px solid rgba(204,0,0,0.15)' }}>
                        <div className="text-[8px] tracking-[0.15em] mb-1.5" style={{ fontFamily: 'var(--font-mono)', color: '#CC0000' }}>
                          REAL FINDING,THIS PHASE IN ACTION
                        </div>
                        <div className="text-[12px] font-bold mb-1" style={{ fontFamily: 'var(--font-courier)', color: 'var(--rt-c-text-primary)' }}>
                          {activeData.linkedFinding.title}
                        </div>
                        <p className="text-[11px] leading-relaxed" style={{ fontFamily: 'var(--font-crimson)', color: 'var(--rt-c-text-muted)' }}>
                          {activeData.linkedFinding.detail}
                        </p>
                      </div>
                    )}

                    {/* Terminal */}
                    <TerminalOutput
                      lines={terminalLines}
                      phaseKey={`${platform.id}-${activePhase}`}
                    />
                  </div>
                </div>
              )}

              {/* Prompt */}
              {activePhase === null && (
                <div className="text-center py-6 opacity-30">
                  <div className="text-[10px] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>
                    SELECT A PHASE NODE ABOVE TO INSPECT DETAILS
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollAnimator>

        {/* Scanner comparison */}
        <ScannerComparison />
      </div>
    </section>
  );
}
