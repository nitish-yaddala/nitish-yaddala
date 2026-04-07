'use client';

import { useState, useMemo } from 'react';
import { evidencePlatforms } from '@/data/resume';

type Finding = (typeof evidencePlatforms)[0]['findings'][0];

const severityColors: Record<string, string> = {
  Critical: '#DC2626',
  High: '#EA580C',
  Medium: '#CA8A04',
  Low: '#16A34A',
};

const cardTypes = [
  'newspaper',
  'polaroid',
  'sticky',
  'index',
  'classified',
  'mugshot',
] as const;

const pushpinColorClasses = [
  'pushpin-red',
  'pushpin-blue',
  'pushpin-green',
  'pushpin-yellow',
  'pushpin-white',
];

function PaperClipSVG() {
  return (
    <div className="paper-clip-wrap">
      <svg width="20" height="50" viewBox="0 0 20 50">
        <defs>
          <linearGradient id="clipMetal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ccc" />
            <stop offset="50%" stopColor="#aaa" />
            <stop offset="100%" stopColor="#888" />
          </linearGradient>
        </defs>
        <path
          d="M 7 2 C 3 2, 2 5, 2 8 L 2 38 C 2 44, 6 47, 10 47 C 14 47, 18 44, 18 38 L 18 12 C 18 8, 15 5, 12 5 C 9 5, 6 8, 6 12 L 6 35 C 6 37, 7.5 39, 10 39 C 12.5 39, 14 37, 14 35 L 14 12"
          fill="none"
          stroke="url(#clipMetal)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function FindingCard({
  finding,
  styleIndex,
}: {
  finding: Finding;
  styleIndex: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const cardType = cardTypes[styleIndex % cardTypes.length];
  const pinColor = pushpinColorClasses[styleIndex % pushpinColorClasses.length];

  // Stable rotation per card
  const rotation = useMemo(() => {
    const seed = finding.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return ((seed % 10) - 5) * 1.2;
  }, [finding.id]);

  const showTape = styleIndex % 4 === 0;
  const showClip = styleIndex % 5 === 2;

  const renderContent = () => {
    const isDarkCard = cardType === 'classified' || cardType === 'mugshot';
    const cvssLabel = (
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-[10px] px-2 py-0.5 rounded-sm text-white font-bold"
          style={{
            fontFamily: 'var(--font-mono)',
            background: severityColors[finding.severity] || '#888',
          }}
        >
          {finding.cvss} {finding.severity.toUpperCase()}
        </span>
        {finding.cwe && (
          <span className="text-[9px] opacity-50" style={{ fontFamily: 'var(--font-mono)', color: isDarkCard ? '#777' : '#555' }}>
            {finding.cwe}
          </span>
        )}
      </div>
    );

    const title = (
      <h4
        className="text-sm font-bold mb-1"
        style={{ fontFamily: 'var(--font-courier)', color: isDarkCard ? '#d0d4dc' : '#111' }}
      >
        {finding.title}
      </h4>
    );

    const desc = expanded ? (
      <p className="text-xs mt-2 leading-relaxed" style={{ color: isDarkCard ? '#999' : '#333' }}>
        {finding.description}
      </p>
    ) : null;

    switch (cardType) {
      case 'newspaper':
        return (
          <div className="newspaper-cutting">
            {/* Newspaper header */}
            <div className="text-center border-b border-gray-400 pb-1 mb-2">
              <div className="text-[7px] tracking-[0.15em] uppercase opacity-40">THE SECURITY GAZETTE</div>
            </div>
            {cvssLabel}
            <h4 className="text-sm font-bold mb-1" style={{ fontFamily: "'Times New Roman', serif", color: '#1a1a1a' }}>
              {finding.title}
            </h4>
            {expanded && (
              <p className="text-[11px] mt-2 leading-snug" style={{ fontFamily: "'Times New Roman', serif", color: '#2a2a2a' }}>
                {finding.description}
              </p>
            )}
          </div>
        );

      case 'polaroid':
        return (
          <div className="polaroid-card">
            {/* "Photo" area — severity gradient */}
            <div
              className="w-full h-20 mb-2 flex items-center justify-center rounded-sm"
              style={{
                background: `linear-gradient(135deg, ${severityColors[finding.severity]}22, ${severityColors[finding.severity]}44)`,
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <span className="text-3xl opacity-20">
                {finding.severity === 'Critical' ? '\u26A0' : finding.severity === 'High' ? '\u2622' : '\u{1F50D}'}
              </span>
            </div>
            {cvssLabel}
            <h4 className="text-xs font-bold" style={{ fontFamily: 'var(--font-courier)', color: '#1a1a1a' }}>
              {finding.title}
            </h4>
            {/* Handwritten caption at bottom */}
            <div className="caption" style={{ fontFamily: 'var(--font-caveat)', color: '#555' }}>
              {finding.cwe || 'Evidence'}
            </div>
            {expanded && (
              <p className="text-[11px] mt-2 leading-relaxed" style={{ color: '#2a2a2a' }}>
                {finding.description}
              </p>
            )}
          </div>
        );

      case 'sticky':
        return (
          <div className="sticky-note">
            {cvssLabel}
            <h4 className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-caveat)', color: '#1a2030', fontSize: '1rem' }}>
              {finding.title}
            </h4>
            {expanded && (
              <p className="text-xs mt-2 leading-relaxed" style={{ fontFamily: 'var(--font-caveat)', color: '#2a3040', fontSize: '0.85rem' }}>
                {finding.description}
              </p>
            )}
          </div>
        );

      case 'index':
        return (
          <div className="index-card">
            {cvssLabel}
            {title}
            {desc}
          </div>
        );

      case 'classified':
        return (
          <div className="classified-doc">
            <div className="text-[8px] tracking-[0.2em] text-center mb-2 opacity-50 uppercase" style={{ color: '#CC0000' }}>
              classified // [redacted] // eyes only
            </div>
            <div className="w-full h-px bg-gray-600 opacity-30 mb-2" />
            {cvssLabel}
            <h4 className="text-sm font-bold mb-1" style={{ fontFamily: "'Courier Prime', monospace", color: '#d0d4dc' }}>
              {finding.title}
            </h4>
            {expanded && (
              <p className="text-xs mt-2 leading-relaxed" style={{ fontFamily: "'Courier Prime', monospace", color: '#888' }}>
                {finding.description}
              </p>
            )}
          </div>
        );

      case 'mugshot':
        return (
          <div className="mugshot-card">
            <div className="text-[8px] tracking-[0.3em] opacity-50 mb-2 uppercase" style={{ fontFamily: 'var(--font-mono)', color: '#CC0000' }}>
              SUSPECT FILE
            </div>
            {cvssLabel}
            <h4 className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-courier)', color: '#d0d4dc' }}>
              {finding.title}
            </h4>
            {expanded && (
              <p className="text-xs mt-2 leading-relaxed text-left" style={{ color: '#888' }}>
                {finding.description}
              </p>
            )}
          </div>
        );

      default:
        return (
          <>
            {cvssLabel}
            {title}
            {desc}
          </>
        );
    }
  };

  // For newspaper/polaroid/sticky/index/classified/mugshot,
  // the card type handles its own container, so we use a simpler wrapper
  const isContained = cardType !== 'newspaper' && cardType !== 'polaroid' && cardType !== 'sticky' && cardType !== 'index' && cardType !== 'classified' && cardType !== 'mugshot';

  return (
    <div
      className="relative cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
      style={{
        transform: `rotate(${rotation}deg)`,
        ...(isContained ? {
          background: 'rgba(255,255,255,0.95)',
          padding: '14px',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '2px 3px 8px rgba(0,0,0,0.15)',
        } : {}),
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Pushpin */}
      <div className={`pushpin ${pinColor}`} style={{ left: '50%', transform: 'translateX(-50%)' }} />

      {/* Tape strip on some cards */}
      {showTape && <div className="tape-strip" />}

      {/* Paper clip on some cards */}
      {showClip && <PaperClipSVG />}

      {renderContent()}
    </div>
  );
}
