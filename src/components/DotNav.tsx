'use client';

import { useState, useEffect, useCallback } from 'react';

const sections = [
  { id: '0', label: 'COVER' },
  { id: '1', label: 'OPERATOR' },
  { id: '2', label: 'JOURNEY' },
  { id: '3', label: 'MISSION' },
  { id: '4', label: 'ASSESSMENT' },
  { id: '5', label: 'EVIDENCE' },
  { id: '6', label: 'MOST WANTED' },
  { id: '7', label: 'METHOD' },
  { id: '8', label: 'CREDENTIALS' },
  { id: '9', label: 'FILE CLOSED' },
];

export default function DotNav() {
  const [activeId, setActiveId] = useState('0');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = sections
      .map((s) => document.querySelector(`[data-section="${s.id}"]`))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section');
            if (id) setActiveId(id);
          }
        });
      },
      { threshold: 0.15, rootMargin: '-10% 0px -10% 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(`[data-section="${id}"]`);
    el?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const currentLabel = sections.find(s => s.id === activeId)?.label || 'COVER';

  return (
    <>
      {/* Fixed toggle button — always visible, top-left */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 10001,
          fontFamily: "'Courier Prime', monospace",
          fontSize: '11px',
          letterSpacing: '0.1em',
          padding: '8px 14px',
          background: 'var(--rt-paper)',
          color: 'var(--rt-ink)',
          border: '2px solid var(--rt-ink)',
          cursor: 'pointer',
          boxShadow: '2px 3px 8px rgba(0,0,0,0.2)',
          transition: 'all 0.2s ease',
          opacity: open ? 0.5 : 1,
        }}
      >
        {open ? '\u2715 CLOSE' : `\u2630 ${currentLabel}`}
      </button>

      {/* Navigation panel — slides in from left */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: '260px',
            zIndex: 10000,
            background: 'var(--rt-paper)',
            borderRight: '3px solid var(--rt-ink)',
            boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
            overflowY: 'auto',
            padding: '70px 20px 30px 20px',
          }}
        >
          {/* Header */}
          <div
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: '10px',
              letterSpacing: '0.2em',
              opacity: 0.4,
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '1px dashed var(--rt-ink)',
            }}
          >
            TABLE OF CONTENTS
          </div>

          {/* Section links */}
          {sections.map((s, i) => {
            const isActive = activeId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 10px',
                  marginBottom: '2px',
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: isActive ? '#B45309' : 'var(--rt-ink)',
                  background: isActive ? 'rgba(180,83,9,0.08)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderLeft: isActive ? '3px solid #B45309' : '3px solid transparent',
                  fontWeight: isActive ? 700 : 400,
                  transition: 'all 0.15s ease',
                }}
              >
                <span style={{ opacity: 0.35, fontSize: '9px', minWidth: '18px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Backdrop overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.3)',
          }}
        />
      )}
    </>
  );
}
