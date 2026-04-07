'use client';

import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { evidencePlatforms } from '@/data/resume';
import ScrollAnimator from './ScrollAnimator';
import FindingCard from './FindingCard';

const PlatformModels3D = dynamic(() => import('./PlatformModels3D'), { ssr: false });

const severityColors: Record<string, string> = {
  Critical: '#DC2626',
  High: '#EA580C',
  Medium: '#CA8A04',
  Low: '#16A34A',
};

const pushpinColors = ['pushpin-red', 'pushpin-blue', 'pushpin-green', 'pushpin-yellow', 'pushpin-white'];

/* ─── Split platforms ─── */
const professionalPlatform = evidencePlatforms.find(p => p.name === 'Professional');
const independentPlatforms = evidencePlatforms.filter(p => p.name !== 'Professional');

/* Professional breakdown for Part A */
const professionalBreakdown = [
  { name: 'BUREAU VERITAS — AWS', count: '100+', pct: 70 },
  { name: 'HP INC.', count: '20+', pct: 15 },
  { name: 'HIGHRADIUS', count: '15+', pct: 10 },
  { name: 'ISRO', count: '5+', pct: 5 },
];

const domainTags = [
  'Web/API', 'Cloud/IAM', 'AI/LLM', 'Mobile',
  'Container', 'Code Review', 'Threat Modeling',
];

/* ─── Animated counter using IntersectionObserver ─── */
function AnimCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();
          function tick(now: number) {
            const p = Math.min((now - start) / duration, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Animated bar (width from 0 to target on scroll) ─── */
function AnimBar({ pct, delay = 0 }: { pct: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(pct), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pct, delay]);

  return (
    <div ref={ref} className="flex-1 h-4 rounded-sm overflow-hidden" style={{ background: 'var(--rt-bar-bg)' }}>
      <div
        className="h-full rounded-sm"
        style={{
          width: `${width}%`,
          background: 'var(--rt-c-accent)',
          transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      />
    </div>
  );
}

/* ─── Platform icon labels ─── */
function PlatformIcon({ name }: { name: string }) {
  const baseStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: '9px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    lineHeight: 1,
  };

  if (name === 'WordPress') {
    return (
      <span style={{ ...baseStyle, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', border: '1.5px solid #2563EB', color: '#2563EB', fontSize: '11px' }}>W</span>
    );
  }
  if (name === 'AWS SDK') {
    return (
      <span style={{ ...baseStyle, color: '#CA8A04', fontSize: '10px', padding: '2px 4px', border: '1px solid #CA8A04', borderRadius: '2px' }}>AWS</span>
    );
  }
  if (name === 'Android DIBZ') {
    return (
      <svg width="16" height="22" viewBox="0 0 16 22" fill="none" style={{ display: 'inline-block' }}>
        <rect x="1" y="2" width="14" height="18" rx="2" stroke="var(--rt-c-text-faint)" strokeWidth="1.5" fill="none" />
        <circle cx="8" cy="17" r="1" fill="var(--rt-c-text-faint)" />
        <line x1="5" y1="4" x2="11" y2="4" stroke="var(--rt-c-text-faint)" strokeWidth="1" />
      </svg>
    );
  }
  if (name === 'Brave Browser') {
    return (
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" style={{ display: 'inline-block' }}>
        <path d="M9 1L2 5v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V5L9 1z" stroke="#EA580C" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }
  if (name === 'HackerOne') {
    return (
      <span style={{ ...baseStyle, color: 'var(--rt-c-text-primary)', background: 'var(--rt-card-border)', fontSize: '8px', padding: '2px 4px', borderRadius: '2px' }}>H1</span>
    );
  }
  return null;
}

/* ─── SVG Paper Clip ─── */
function PaperClipSVG({ className }: { className?: string }) {
  return (
    <svg width="20" height="50" viewBox="0 0 20 50" className={className}>
      <defs>
        <linearGradient id="clipGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--rt-c-text-primary)" />
          <stop offset="50%" stopColor="var(--rt-c-text-secondary)" />
          <stop offset="100%" stopColor="var(--rt-c-text-muted)" />
        </linearGradient>
      </defs>
      <path
        d="M 7 2 C 3 2, 2 5, 2 8 L 2 38 C 2 44, 6 47, 10 47 C 14 47, 18 44, 18 38 L 18 12 C 18 8, 15 5, 12 5 C 9 5, 6 8, 6 12 L 6 35 C 6 37, 7.5 39, 10 39 C 12.5 39, 14 37, 14 35 L 14 12"
        fill="none"
        stroke="url(#clipGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Threads SVG connecting independent platform pushpins ─── */
function ThreadsSVG({ gridRef }: { gridRef: React.RefObject<HTMLDivElement | null> }) {
  const [paths, setPaths] = useState<{ d: string; color: string }[]>([]);

  type CurveDir = 'down' | 'up' | 'left' | 'right';
  const threadDefs: { from: number; to: number; color: string; curve: CurveDir }[] = [
    { from: 0, to: 1, color: '#B91C1C', curve: 'down' },
    { from: 0, to: 3, color: '#2563EB', curve: 'up' },
    { from: 1, to: 2, color: '#CA8A04', curve: 'down' },
    { from: 1, to: 4, color: '#16A34A', curve: 'up' },
    { from: 3, to: 4, color: '#B91C1C', curve: 'up' },
    { from: 2, to: 4, color: '#2563EB', curve: 'down' },
    { from: 0, to: 4, color: '#9333EA', curve: 'down' },
    { from: 2, to: 3, color: '#16A34A', curve: 'up' },
    { from: 1, to: 3, color: '#B91C1C', curve: 'left' },
    { from: 0, to: 2, color: '#EA580C', curve: 'right' },
  ];

  useEffect(() => {
    function calcPaths() {
      const grid = gridRef.current;
      if (!grid) return;

      const gridRect = grid.getBoundingClientRect();
      const pins = grid.querySelectorAll('.pushpin');
      if (pins.length < 2) return;

      const pinPositions: { x: number; y: number }[] = [];
      pins.forEach((pin) => {
        const r = pin.getBoundingClientRect();
        pinPositions.push({
          x: r.left + r.width / 2 - gridRect.left,
          y: r.top + r.height / 2 - gridRect.top,
        });
      });

      const newPaths: { d: string; color: string }[] = [];
      threadDefs.forEach((t, idx) => {
        const p1 = pinPositions[t.from];
        const p2 = pinPositions[t.to];
        if (!p1 || !p2) return;

        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const dist = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
        const baseOffset = Math.min(dist * 0.2, 50) + (idx % 3) * 10;

        let cx = mx;
        let cy = my;

        if (t.curve === 'down') cy = my + baseOffset;
        else if (t.curve === 'up') cy = my - baseOffset;
        else if (t.curve === 'right') cx = mx + baseOffset;
        else if (t.curve === 'left') cx = mx - baseOffset;

        newPaths.push({
          d: `M ${p1.x} ${p1.y} Q ${cx} ${cy}, ${p2.x} ${p2.y}`,
          color: t.color,
        });
      });
      setPaths(newPaths);
    }

    const timer = setTimeout(calcPaths, 500);
    window.addEventListener('resize', calcPaths);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calcPaths);
    };
  }, [gridRef]);

  if (paths.length === 0) return null;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible', zIndex: 5 }}>
      <defs>
        <filter id="threadShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#000" floodOpacity="0.2" />
        </filter>
      </defs>
      {paths.map((p, idx) => (
        <path key={idx} d={p.d} stroke={p.color} strokeWidth="3" fill="none" opacity="0.85" strokeLinecap="round" filter="url(#threadShadow)" />
      ))}
    </svg>
  );
}

/* ─── Platform Detail View ─── */
function PlatformDetail({
  platform,
  onBack,
  filteredFindings,
}: {
  platform: (typeof evidencePlatforms)[0];
  onBack: () => void;
  filteredFindings: (typeof evidencePlatforms)[0]['findings'];
}) {
  return (
    <div className="relative">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 text-sm inline-block transition-transform hover:-translate-y-0.5"
        style={{
          fontFamily: 'var(--font-caveat)',
          background: 'var(--rt-card-bg)',
          color: 'var(--rt-c-text-primary)',
          boxShadow: '2px 2px 8px rgba(0,0,0,0.3)',
          transform: 'rotate(-2deg)',
          fontSize: '1rem',
          border: '1px solid var(--rt-c-divider)',
        }}
      >
        &#8592; BACK TO BOARD
      </button>

      <div className="mb-8">
        <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-courier)', color: 'var(--rt-c-text-primary)' }}>
          {platform.name}
        </h3>
        <p className="text-sm leading-relaxed opacity-70 mt-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-secondary)' }}>
          {filteredFindings.length === platform.findings.length
            ? `${platform.count} findings total`
            : `${filteredFindings.length} of ${platform.count} findings (filtered)`}
        </p>
        <div className="flex gap-3 mt-3">
          {['Critical', 'High', 'Medium', 'Low'].map((sev) => {
            const count = filteredFindings.filter((f) => f.severity === sev).length;
            if (!count) return null;
            return (
              <span key={sev} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ background: severityColors[sev] }} />
                <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-secondary)' }}>
                  {count} {sev}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFindings.map((finding, i) => (
          <FindingCard key={finding.id} finding={finding} styleIndex={i} />
        ))}
        {filteredFindings.length === 0 && (
          <div className="col-span-full text-center py-8 opacity-50" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>
            No findings match the current filters.
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Filter Bar ─── */
const severityLevels = ['Critical', 'High', 'Medium', 'Low'] as const;

function FilterBar({
  searchQuery,
  setSearchQuery,
  activeSeverities,
  toggleSeverity,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeSeverities: Set<string>;
  toggleSeverity: (s: string) => void;
}) {
  return (
    <div
      className="relative mb-6 p-4 rounded-sm"
      style={{
        background: 'var(--rt-paper)',
        boxShadow: '2px 3px 8px rgba(0,0,0,0.15)',
        borderBottom: '2px solid var(--rt-tag-border)',
        clipPath: 'polygon(0 0, 100% 2px, 99% 100%, 1% 98%)',
      }}
    >
      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
        <div className="pushpin pushpin-red" style={{ position: 'relative', top: 0 }} />
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-1">
        <div className="relative flex-1 min-w-[180px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search findings..."
            className="w-full px-3 py-1.5 bg-transparent border-b-2 border-dashed text-sm outline-none placeholder:opacity-40"
            style={{
              fontFamily: "'Courier Prime', monospace",
              borderColor: 'var(--rt-tag-border)',
              color: 'var(--rt-ink)',
              caretColor: 'var(--rt-c-accent)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-xs opacity-40 hover:opacity-80"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-ink)' }}
            >
              &times;
            </button>
          )}
        </div>

        <div className="flex gap-1.5">
          {severityLevels.map((sev) => {
            const isActive = activeSeverities.has(sev);
            return (
              <button
                key={sev}
                onClick={() => toggleSeverity(sev)}
                className="px-2 py-0.5 text-[10px] tracking-wider rounded-sm transition-all duration-200 font-bold"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: isActive ? severityColors[sev] : 'var(--rt-tag-bg)',
                  color: isActive ? '#fff' : 'var(--rt-tag-text)',
                  border: `1px solid ${isActive ? severityColors[sev] : 'var(--rt-tag-border)'}`,
                }}
              >
                {sev.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Classified Stamp SVG ─── */
function ClassifiedStamp() {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        top: '15%',
        right: '5%',
        transform: 'rotate(-18deg)',
        opacity: 0.12,
        zIndex: 2,
      }}
    >
      <svg width="280" height="80" viewBox="0 0 280 80">
        <rect x="2" y="2" width="276" height="76" rx="6" fill="none" stroke="var(--rt-c-accent)" strokeWidth="4" />
        <rect x="8" y="8" width="264" height="64" rx="3" fill="none" stroke="var(--rt-c-accent)" strokeWidth="1.5" />
        <text x="140" y="52" textAnchor="middle" fontFamily="'Courier Prime', monospace" fontSize="32" fontWeight="bold" fill="var(--rt-c-accent)" letterSpacing="6">
          CLASSIFIED
        </text>
      </svg>
    </div>
  );
}

/* ─── Redaction Bar ─── */
function RedactionBar({ width = 80, height = 12 }: { width?: number; height?: number }) {
  return (
    <span
      className="inline-block align-middle rounded-sm"
      style={{
        width,
        height,
        background: 'linear-gradient(90deg, var(--rt-classified-bg-from) 0%, var(--rt-classified-border) 40%, var(--rt-classified-bg-from) 100%)',
        opacity: 0.7,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   PART A: THE FIELD RECORD — Professional Impact
   ═══════════════════════════════════════════════════════ */
function FieldRecord() {
  return (
    <ScrollAnimator animation="fadeUp" delay={0.05}>
      <div
        className="relative rounded-sm overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, var(--rt-classified-bg-from) 0%, var(--rt-classified-bg-mid) 50%, var(--rt-classified-bg-to) 100%)',
          border: '2px solid var(--rt-classified-border)',
          boxShadow: 'var(--rt-classified-shadow), var(--rt-classified-inner-glow)',
        }}
      >
        {/* Classified stamp watermark */}
        <ClassifiedStamp />

        {/* Top classified header bar */}
        <div
          className="px-6 py-3 flex items-center justify-between"
          style={{
            background: 'linear-gradient(90deg, var(--rt-classified-header-from) 0%, var(--rt-classified-header-mid) 50%, var(--rt-classified-header-to) 100%)',
            borderBottom: '1px solid var(--rt-classified-header-border)',
          }}
        >
          <span
            className="text-[10px] tracking-[0.25em] font-bold"
            style={{ fontFamily: "'Courier Prime', monospace", color: 'var(--rt-classified-header-text)' }}
          >
            CLASSIFIED FIELD RECORD // PROFESSIONAL ENGAGEMENTS
          </span>
          <span
            className="text-[8px] tracking-[0.15em] opacity-30"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-classified-header-sub)' }}
          >
            RESTRICTED
          </span>
        </div>

        <div className="p-6 md:p-8 relative" style={{ zIndex: 1 }}>
          {/* Large counter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div
              className="px-6 py-4 rounded-sm"
              style={{
                border: '2px solid var(--rt-c-accent)',
                background: 'rgba(204, 0, 0, 0.05)',
              }}
            >
              <span
                className="text-4xl md:text-5xl font-bold block text-center"
                style={{ fontFamily: "'Courier Prime', monospace", color: 'var(--rt-c-accent-dim)' }}
              >
                <AnimCounter target={140} suffix="+" />
              </span>
              <span
                className="text-[9px] tracking-[0.2em] block text-center mt-1"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}
              >
                FINDINGS
              </span>
            </div>
            <div>
              <div
                className="text-sm font-bold tracking-wider"
                style={{ fontFamily: "'Courier Prime', monospace", color: 'var(--rt-c-text-primary)' }}
              >
                PROFESSIONAL FINDINGS
              </div>
              <div
                className="text-[10px] tracking-wider mt-1"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}
              >
                Across 4 organizations &middot; NDA-protected engagements
              </div>
            </div>
          </div>

          {/* Horizontal breakdown bars */}
          <div className="space-y-3 mb-8">
            {professionalBreakdown.map((org, idx) => (
              <div key={org.name} className="flex items-center gap-3">
                <span
                  className="text-[10px] tracking-wider w-44 shrink-0 text-right"
                  style={{ fontFamily: "'Courier Prime', monospace", color: 'var(--rt-c-text-secondary)' }}
                >
                  {org.name}
                </span>
                <AnimBar pct={org.pct} delay={idx * 150} />
                <span
                  className="text-[11px] font-bold w-10 shrink-0"
                  style={{ fontFamily: "'Courier Prime', monospace", color: 'var(--rt-c-accent)' }}
                >
                  {org.count}
                </span>
              </div>
            ))}
          </div>

          {/* NDA notice with redaction bars */}
          <div className="mb-6 flex items-start gap-2">
            <span style={{ color: '#CA8A04', fontSize: '14px', lineHeight: '1.2' }}>&#9888;</span>
            <div>
              <p
                className="text-[11px] leading-relaxed"
                style={{ fontFamily: "'Courier Prime', monospace", fontStyle: 'italic', color: 'var(--rt-c-text-muted)' }}
              >
                Individual findings under NDA. Aggregate impact documented.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <RedactionBar width={90} />
                <RedactionBar width={60} />
              </div>
            </div>
          </div>

          {/* Domain tags */}
          <div className="mb-6">
            <div
              className="text-[8px] tracking-[0.2em] mb-2"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}
            >
              DOMAINS
            </div>
            <div className="flex flex-wrap gap-2">
              {domainTags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-[9px] tracking-wider"
                  style={{
                    fontFamily: "'Courier Prime', monospace",
                    color: 'var(--rt-c-text-secondary)',
                    border: '1px solid var(--rt-classified-border)',
                    borderRadius: '2px',
                    background: 'var(--rt-bar-bg)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Scattered redaction bars at bottom */}
          <div className="flex items-center gap-3 opacity-40">
            <span className="text-[9px] tracking-wider" style={{ fontFamily: "'Courier Prime', monospace", color: 'var(--rt-c-text-faint)' }}>[REDACTED]</span>
            <RedactionBar width={100} height={10} />
            <span className="text-[9px] tracking-wider" style={{ fontFamily: "'Courier Prime', monospace", color: 'var(--rt-c-text-faint)' }}>[REDACTED]</span>
            <RedactionBar width={120} height={10} />
          </div>
        </div>
      </div>
    </ScrollAnimator>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function EvidenceBoard() {
  const [selectedPlatform, setSelectedPlatform] = useState<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSeverities, setActiveSeverities] = useState<Set<string>>(new Set());

  const independentFindings = useMemo(
    () => independentPlatforms.flatMap((p) => p.findings),
    []
  );

  const toggleSeverity = useCallback((sev: string) => {
    setActiveSeverities((prev) => {
      const next = new Set(prev);
      if (next.has(sev)) next.delete(sev);
      else next.add(sev);
      return next;
    });
  }, []);

  const filterFindings = useCallback(
    (findings: typeof evidencePlatforms[0]['findings']) => {
      return findings.filter((f) => {
        if (activeSeverities.size > 0 && !activeSeverities.has(f.severity)) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            f.title.toLowerCase().includes(q) ||
            (f.cwe && f.cwe.toLowerCase().includes(q)) ||
            f.platform.toLowerCase().includes(q) ||
            f.description.toLowerCase().includes(q)
          );
        }
        return true;
      });
    },
    [searchQuery, activeSeverities]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: y * -1.5, y: x * 1.5 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <section data-section="5" className="py-20 px-4 relative coffee-stain-2">
      <div className="max-w-6xl mx-auto">

        {/* ─── Section Header ─── */}
        <ScrollAnimator animation="scaleIn">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-current opacity-20" />
            <span className="text-[10px] tracking-[0.3em] opacity-50" style={{ fontFamily: 'var(--font-mono)' }}>
              SECTION 05 // THE EVIDENCE
            </span>
            <div className="h-px flex-1 bg-current opacity-20" />
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-3"
            style={{ fontFamily: 'var(--font-courier)' }}
          >
            THE EVIDENCE
          </h2>
          <p
            className="text-center text-xs tracking-wider opacity-50 mb-12"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            200+ documented vulnerabilities across professional engagements and independent research
          </p>
        </ScrollAnimator>

        {/* ═══════════════════════════════════════════════
            PART A: THE FIELD RECORD
            ═══════════════════════════════════════════════ */}
        <FieldRecord />

        {/* ─── Visual Divider / Transition ─── */}
        <ScrollAnimator animation="fadeIn" delay={0.1}>
          <div className="my-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-px w-16 md:w-24" style={{ background: 'var(--rt-tag-border)', opacity: 0.4 }} />
              <span
                className="text-[10px] tracking-[0.25em] font-bold"
                style={{ fontFamily: "'Courier Prime', monospace", color: 'var(--rt-c-accent)' }}
              >
                INDEPENDENT RESEARCH — FULLY DOCUMENTED
              </span>
              <div className="h-px w-16 md:w-24" style={{ background: 'var(--rt-tag-border)', opacity: 0.4 }} />
            </div>
            <p
              className="text-[10px] tracking-wider opacity-40"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              60 findings &middot; 5 platforms &middot; All individually verified
            </p>
          </div>
        </ScrollAnimator>

        {/* ═══════════════════════════════════════════════
            PART B: THE EVIDENCE WALL
            ═══════════════════════════════════════════════ */}

        {/* 3D Platform models */}
        <PlatformModels3D />

        {/* Search/Filter Bar */}
        <ScrollAnimator delay={0.05}>
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeSeverities={activeSeverities}
            toggleSeverity={toggleSeverity}
          />
        </ScrollAnimator>

        <ScrollAnimator delay={0.1}>
          <div
            ref={boardRef}
            className="cork-board relative rounded-sm p-8 md:p-12 min-h-[500px]"
            style={{
              perspective: '1000px',
              border: '2px solid var(--rt-wall-frame-border)',
              boxShadow: 'var(--rt-wall-frame-shadow)',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              {selectedPlatform !== null ? (
                <PlatformDetail
                  platform={independentPlatforms[selectedPlatform]}
                  onBack={() => setSelectedPlatform(null)}
                  filteredFindings={filterFindings(independentPlatforms[selectedPlatform].findings)}
                />
              ) : (
                <>
                  {/* Central BREACH COUNT for independent findings */}
                  <div className="text-center mb-8">
                    <div className="inline-block relative">
                      <span
                        className="text-4xl md:text-5xl font-bold"
                        style={{ fontFamily: 'var(--font-courier)', color: 'var(--rt-c-accent)' }}
                      >
                        <AnimCounter target={60} suffix="" />
                      </span>
                      <div
                        className="text-[10px] tracking-[0.3em] opacity-40 mt-2"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        INDEPENDENTLY DOCUMENTED FINDINGS
                      </div>
                    </div>
                  </div>

                  <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-8 relative z-[2]" style={{ overflow: 'visible' }}>
                    {independentPlatforms.map((platform, idx) => {
                      const pinColor = pushpinColors[idx % pushpinColors.length];
                      const filtered = filterFindings(platform.findings);
                      const hasMatches = filtered.length > 0;
                      const isFiltering = searchQuery.trim() !== '' || activeSeverities.size > 0;
                      const hasCritical = platform.findings.some(f => f.severity === 'Critical');
                      const hasHigh = platform.findings.some(f => f.severity === 'High');
                      const stripeColor = hasCritical ? severityColors.Critical : hasHigh ? severityColors.High : severityColors.Medium;
                      const topFindings = [...platform.findings].sort((a, b) => (b.cvss || 0) - (a.cvss || 0)).slice(0, 2);

                      return (
                        <div
                          key={platform.name}
                          className="relative cursor-pointer group"
                          style={{
                            opacity: isFiltering && !hasMatches ? 0.25 : 1,
                            transition: 'opacity 0.3s ease',
                            overflow: 'visible',
                            paddingTop: '20px',
                          }}
                          onClick={() => setSelectedPlatform(idx)}
                        >
                          {/* Pushpin */}
                          <div className="relative flex justify-center mb-2">
                            <div className={`pushpin ${pinColor}`} style={{ position: 'relative', top: 0 }} />
                          </div>

                          {/* Platform Icon */}
                          <div className="flex justify-center mb-1">
                            <PlatformIcon name={platform.name} />
                          </div>

                          {/* Paper clip on some folders */}
                          {idx % 3 === 1 && (
                            <div className="paper-clip-wrap">
                              <PaperClipSVG />
                            </div>
                          )}

                          {/* Case file folder body */}
                          <div
                            className="manila-folder relative p-5"
                            style={{
                              background: 'var(--rt-card-bg)',
                              borderRadius: '2px',
                              boxShadow: '2px 3px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                              marginTop: '12px',
                              borderLeft: `4px solid ${stripeColor}`,
                              overflow: 'visible',
                            }}
                          >
                            {/* Peeking finding cards */}
                            <div className="absolute -top-16 left-2 right-2 flex gap-1 pointer-events-none">
                              {topFindings.slice(0, 2).map((f, fi) => (
                                <div
                                  key={f.id}
                                  className="text-[7px] px-2 py-1 truncate"
                                  style={{
                                    background: 'var(--rt-card-bg)',
                                    boxShadow: '1px 2px 6px rgba(0,0,0,0.3)',
                                    transform: `rotate(${fi % 2 === 0 ? -3 : 2}deg) translateY(${fi * 4}px)`,
                                    maxWidth: '120px',
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--rt-c-text-secondary)',
                                    border: '1px solid var(--rt-c-divider)',
                                  }}
                                >
                                  <span style={{ color: severityColors[f.severity], fontWeight: 700 }}>
                                    {f.cvss || f.severity}
                                  </span>{' '}
                                  {f.title.split('\u2014')[0]?.trim() || f.title}
                                </div>
                              ))}
                            </div>

                            {/* Folder tab */}
                            <div
                              className="absolute -top-5 left-2 px-3 py-1 text-[10px] font-bold tracking-wider"
                              style={{
                                fontFamily: 'var(--font-mono)',
                                background: 'var(--rt-card-border)',
                                color: 'var(--rt-c-text-secondary)',
                                borderRadius: '3px 3px 0 0',
                                borderTop: '2px solid var(--rt-classified-border)',
                              }}
                            >
                              {platform.name.toUpperCase()}
                            </div>

                            {/* Count badge */}
                            <div
                              className="absolute -top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                              style={{
                                background: 'var(--rt-c-accent)',
                                fontFamily: 'var(--font-mono)',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                              }}
                            >
                              {platform.count}
                            </div>

                            {/* Folder content preview */}
                            <div style={{ color: 'var(--rt-c-text-secondary)' }}>
                              <div className="text-xs opacity-60 mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                                {platform.findings.length} documented
                              </div>

                              {/* Peek cards on hover */}
                              <div className="space-y-1 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1">
                                {platform.findings.slice(0, 2).map((f) => (
                                  <div
                                    key={f.id}
                                    className="text-[10px] px-2 py-1 rounded-sm"
                                    style={{
                                      fontFamily: 'var(--font-courier)',
                                      background: 'var(--rt-bar-bg)',
                                      color: 'var(--rt-c-text-primary)',
                                      boxShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                                    }}
                                  >
                                    {f.title}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Tape strip on every other folder */}
                            {idx % 2 === 0 && (
                              <div className="tape-strip" />
                            )}

                            {/* Severity Heatmap Strip */}
                            <div className="flex h-1.5 mt-2 rounded-full overflow-hidden" style={{ opacity: 0.7 }}>
                              {['Critical', 'High', 'Medium', 'Low'].map(sev => {
                                const count = platform.findings.filter(f => f.severity === sev).length;
                                if (!count) return null;
                                return <div key={sev} style={{ flex: count, background: severityColors[sev] }} />;
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </ScrollAnimator>

        {/* ─── Mini Finding Dot Grid (independent findings only) ─── */}
        <ScrollAnimator delay={0.15}>
          <div className="mt-8 p-4 rounded-sm" style={{ border: '1px dashed var(--rt-tag-border)' }}>
            <div className="text-[9px] tracking-[0.2em] opacity-35 mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
              INDEPENDENT VULNERABILITY MAP — EACH DOT REPRESENTS ONE FINDING
            </div>
            <div className="flex flex-wrap gap-1">
              {independentFindings.map((f, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  title={`${f.title} (${f.severity})`}
                  style={{
                    background: severityColors[f.severity],
                    opacity: 0.7,
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
            <div className="flex gap-4 mt-3">
              {['Critical', 'High', 'Medium', 'Low'].map(sev => (
                <div key={sev} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: severityColors[sev] }} />
                  <span className="text-[8px] opacity-40" style={{ fontFamily: 'var(--font-mono)' }}>{sev.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimator>

        {/* ─── Combined Total ─── */}
        <ScrollAnimator animation="fadeIn" delay={0.2}>
          <div className="mt-8 text-center py-4" style={{ borderTop: '1px solid var(--rt-tag-border)', borderBottom: '1px solid var(--rt-tag-border)' }}>
            <span
              className="text-[10px] tracking-[0.2em]"
              style={{ fontFamily: "'Courier Prime', monospace", color: 'var(--rt-ink)', opacity: 0.6 }}
            >
              TOTAL DOCUMENTED IMPACT: <span style={{ color: 'var(--rt-c-accent)', fontWeight: 700 }}>140+</span> professional + <span style={{ color: 'var(--rt-c-accent)', fontWeight: 700 }}>60</span> independent = <span style={{ color: 'var(--rt-c-accent-dim)', fontWeight: 700, fontSize: '13px' }}>200+</span> vulnerabilities
            </span>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
