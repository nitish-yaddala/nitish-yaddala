'use client';

import { useState, useEffect, useRef } from 'react';
import { education, certifications, ctfs } from '@/data/resume';
import ScrollAnimator from './ScrollAnimator';

/* ── Crypto coursework data ── */
const cryptoCourses = [
  { name: 'Symmetric Cryptography', topics: 'AES, CBC/CTR/GCM modes, One-Time Pad, Stream Ciphers' },
  { name: 'MAC & Authentication', topics: 'HMAC, Encrypt-then-MAC, AEAD/GCM, UF-CMA' },
  { name: 'Hash Functions', topics: 'Merkle-Damgard, SHA families, Birthday Paradox' },
  { name: 'Asymmetric Cryptography', topics: 'RSA, Diffie-Hellman, ElGamal, Cramer-Shoup' },
  { name: 'Digital Signatures', topics: 'RSA-PSS, DSA, Schnorr, PKI/X.509' },
  { name: 'Elliptic Curve Cryptography', topics: 'ECC fundamentals, key exchange, signatures' },
  { name: 'Advanced Protocols', topics: 'Zero-Knowledge Proofs, Fiat-Shamir, zk-SNARKs' },
  { name: 'Multi-Party Computation', topics: "Yao's Millionaire, Secret Sharing, Pedersen Commitments" },
  { name: 'Implementation Security', topics: 'IV misuse, Lucky 13, WEP, TLS/SSL composition' },
];

/* ── Cert details ── */
const certMeta: Record<string, { tier: 'elite' | 'pro' | 'foundation'; color: string; description: string }> = {
  OSCP: { tier: 'elite', color: '#CC0000', description: '24-hour hands-on exploitation exam. No multiple choice. You hack in, or you fail.' },
  PNPT: { tier: 'pro', color: '#EA580C', description: 'Full external-to-internal pentest simulation with professional report deliverable.' },
  CC: { tier: 'foundation', color: '#2563EB', description: 'ISC² foundational cybersecurity certification covering security principles and practices.' },
  CEH: { tier: 'pro', color: '#EA580C', description: 'EC-Council certified ethical hacking methodology and tools certification.' },
  CND: { tier: 'foundation', color: '#2563EB', description: 'EC-Council network defense, incident response, and threat intelligence certification.' },
};

/* ── CTF mission data ── */
const ctfMissions = [
  {
    ...ctfs[0],
    codename: 'OPERATION GRID',
    type: 'Multi-domain CTF',
    skills: ['Web Exploitation', 'Reverse Engineering', 'Cryptography'],
    briefing: 'National-level competition by Flipkart. Advanced through multiple rounds against 3000+ teams to semi-finals.',
  },
  {
    ...ctfs[1],
    codename: 'OPERATION NAHAM',
    type: 'Jeopardy-style CTF',
    skills: ['Binary Exploitation', 'Web', 'Forensics', 'OSINT'],
    briefing: 'International online CTF. Placed in top third across web exploitation, binary analysis, and forensic challenges.',
  },
  {
    ...ctfs[2],
    codename: 'OPERATION RED',
    type: 'Red Team Exercise',
    skills: ['Active Directory', 'Privilege Escalation', 'Lateral Movement'],
    briefing: 'Simulated enterprise red team engagement. Achieved 5th place through AD exploitation and lateral movement chains.',
  },
];

/* ── Wax Seal SVG ── */
function WaxSeal() {
  return (
    <div className="relative" style={{ width: '70px', height: '70px' }}>
      <svg width="70" height="70" viewBox="0 0 80 80" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))' }}>
        <defs>
          <linearGradient id="waxGoldTC" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4B86A" />
            <stop offset="40%" stopColor="#B3A369" />
            <stop offset="100%" stopColor="#8B7D3C" />
          </linearGradient>
          <radialGradient id="waxShineTC" cx="35%" cy="30%">
            <stop offset="0%" stopColor="rgba(255,255,220,0.4)" />
            <stop offset="50%" stopColor="rgba(255,255,200,0.1)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="37" fill="url(#waxGoldTC)" />
        <circle cx="40" cy="40" r="37" fill="url(#waxShineTC)" />
        <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="27" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const x1 = Math.round((40 + Math.cos(angle) * 33) * 100) / 100;
          const y1 = Math.round((40 + Math.sin(angle) * 33) * 100) / 100;
          const x2 = Math.round((40 + Math.cos(angle) * 37) * 100) / 100;
          const y2 = Math.round((40 + Math.sin(angle) * 37) * 100) / 100;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,0,0,0.12)" strokeWidth="2" />;
        })}
        <text x="40" y="36" textAnchor="middle" fill="rgba(0,0,0,0.35)" fontSize="7" fontFamily="'Bebas Neue', sans-serif" letterSpacing="1.5">GEORGIA</text>
        <text x="40" y="46" textAnchor="middle" fill="rgba(0,0,0,0.35)" fontSize="7" fontFamily="'Bebas Neue', sans-serif" letterSpacing="1.5">TECH</text>
        <text x="40" y="56" textAnchor="middle" fill="rgba(0,0,0,0.25)" fontSize="6" fontFamily="'Courier Prime', monospace">2023</text>
      </svg>
    </div>
  );
}

/* ── Background Check Stamp ── */
function BackgroundCheckStamp({ status }: { status: 'passed' | 'active' }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), 400);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="inline-block">
      {visible && (
        <div className="stamp-animate">
          <span
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '14px',
              color: status === 'passed' ? '#16A34A' : '#CA8A04',
              border: `2px solid ${status === 'passed' ? '#16A34A' : '#CA8A04'}`,
              padding: '2px 10px',
              letterSpacing: '0.15em',
              opacity: 0.6,
              transform: 'rotate(-6deg)',
              display: 'inline-block',
            }}
          >
            {status === 'passed' ? 'BG CHECK: PASSED' : 'ACTIVE'}
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Main Component ── */
export default function TheCredentials() {
  const [expanded, setExpanded] = useState(false);
  const [activeCert, setActiveCert] = useState<string | null>(null);

  const gt = education[0];
  const srm = education[1];

  return (
    <section data-section="8" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollAnimator>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-current opacity-20" />
            <span className="text-[10px] tracking-[0.3em] opacity-50" style={{ fontFamily: 'var(--font-mono)' }}>
              SECTION 08 // CREDENTIALS &amp; TRAINING
            </span>
            <div className="h-px flex-1 bg-current opacity-20" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3" style={{ fontFamily: 'var(--font-courier)' }}>
            THE CREDENTIALS
          </h2>
          <p className="text-center text-[10px] tracking-wider opacity-40 mb-12" style={{ fontFamily: 'var(--font-mono)' }}>
            Academic training, professional certifications, and competition records
          </p>
        </ScrollAnimator>

        {/* ═══════════════════════════════════════════════
            DARK CLASSIFIED WRAPPER
            ═══════════════════════════════════════════════ */}
        <ScrollAnimator delay={0.05}>
          <div
            className="relative rounded-sm overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, var(--rt-classified-bg-from) 0%, var(--rt-classified-bg-mid) 50%, var(--rt-classified-bg-to) 100%)',
              border: '2px solid var(--rt-classified-border)',
              boxShadow: '0 4px 20px var(--rt-classified-shadow), inset 0 1px 0 rgba(255,255,255,0.03)',
            }}
          >
            {/* Header bar */}
            <div
              className="px-6 py-3 flex items-center justify-between"
              style={{
                background: 'linear-gradient(90deg, var(--rt-classified-header-from) 0%, var(--rt-classified-header-mid) 50%, var(--rt-classified-header-to) 100%)',
                borderBottom: '1px solid var(--rt-classified-header-border)',
              }}
            >
              <span className="text-[10px] tracking-[0.25em] font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-classified-header-text)' }}>
                CLASSIFIED // PERSONNEL DOSSIER
              </span>
              <span className="text-[8px] tracking-[0.15em] opacity-30" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-classified-header-sub)' }}>
                BACKGROUND VERIFICATION
              </span>
            </div>

            <div className="p-6 md:p-10">

              {/* ═══ SECTION A: ACADEMIC RECORD ═══ */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[9px] tracking-[0.25em] font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-accent)' }}>
                    A. ACADEMIC RECORD
                  </span>
                  <div className="h-px flex-1" style={{ background: 'var(--rt-c-divider)' }} />
                </div>

                {/* Georgia Tech,Primary */}
                <ScrollAnimator animation="fadeUp">
                  <div
                    className="relative rounded-sm overflow-hidden mb-6"
                    style={{
                      border: '1px solid rgba(179,163,105,0.3)',
                      background: 'rgba(179,163,105,0.03)',
                    }}
                  >
                    {/* Gold top accent */}
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #8B7D3C, #D4B86A, #8B7D3C)' }} />

                    <div className="p-6 md:p-8">
                      <div className="flex items-start gap-5">
                        <div className="shrink-0 hidden md:block">
                          <WaxSeal />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <div className="text-[8px] tracking-[0.2em] mb-1" style={{ fontFamily: 'var(--font-mono)', color: '#8B7D3C', opacity: 0.6 }}>
                                GRADUATE PROGRAM // MASTER&apos;S THESIS TRACK
                              </div>
                              <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-courier)', color: '#D4B86A' }}>
                                {gt.institution}
                              </h3>
                              <p className="text-sm mt-1" style={{ fontFamily: 'var(--font-crimson)', color: '#B3A369' }}>
                                {gt.degree}
                              </p>
                            </div>
                            <div className="text-center px-3 py-2 shrink-0" style={{ border: '1px solid rgba(179,163,105,0.25)' }}>
                              <div className="text-[7px] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: '#8B7D3C', opacity: 0.5 }}>GRADUATED</div>
                              <div className="text-sm font-bold mt-0.5" style={{ fontFamily: 'var(--font-courier)', color: '#D4B86A' }}>
                                {gt.period.split('–')[1]?.trim() || gt.period}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-3">
                            <span className="text-[10px] opacity-30" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-secondary)' }}>{gt.period}</span>
                            <BackgroundCheckStamp status="passed" />
                          </div>

                          <div className="mt-3" style={{ fontFamily: 'var(--font-caveat)', color: '#8B7D3C', fontSize: '0.9rem', transform: 'rotate(-1deg)', opacity: 0.4 }}>
                            &quot;Top performer in Applied Cryptography,directly applicable to field operations.&quot;
                          </div>
                        </div>
                      </div>

                      {/* Expandable coursework */}
                      <div className="mt-6">
                        <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2">
                          <span
                            className="px-3 py-1.5 text-[10px] tracking-wider transition-all duration-200"
                            style={{
                              fontFamily: 'var(--font-mono)',
                              background: expanded ? 'rgba(179,163,105,0.1)' : 'transparent',
                              border: '1px solid rgba(179,163,105,0.2)',
                              color: '#8B7D3C',
                            }}
                          >
                            {expanded ? '▼' : '▶'} CS6260: APPLIED CRYPTOGRAPHY,TRANSCRIPT
                          </span>
                        </button>

                        {expanded && (
                          <div className="mt-4 relative" style={{ animation: 'paperUnfold 0.4s ease forwards' }}>
                            <div
                              className="grid grid-cols-12 gap-0 text-[8px] tracking-[0.15em] font-bold py-2 px-3"
                              style={{
                                fontFamily: 'var(--font-mono)',
                                background: 'rgba(179,163,105,0.08)',
                                borderTop: '1px solid rgba(179,163,105,0.2)',
                                borderBottom: '1px solid rgba(179,163,105,0.15)',
                                color: '#8B7D3C',
                                opacity: 0.7,
                              }}
                            >
                              <span className="col-span-1">#</span>
                              <span className="col-span-5">MODULE</span>
                              <span className="col-span-5">KEY TOPICS</span>
                              <span className="col-span-1 text-center">✓</span>
                            </div>
                            {cryptoCourses.map((course, ci) => (
                              <div
                                key={ci}
                                className="grid grid-cols-12 gap-0 py-2 px-3 items-start"
                                style={{
                                  borderBottom: '1px solid var(--rt-c-divider)',
                                  background: ci % 2 === 1 ? 'var(--rt-card-bg)' : 'transparent',
                                  animation: `skillTagFadeIn 0.3s ease ${ci * 0.06}s both`,
                                }}
                              >
                                <span className="col-span-1 text-[9px] opacity-25" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}>
                                  {String(ci + 1).padStart(2, '0')}
                                </span>
                                <span className="col-span-5 text-xs font-semibold" style={{ fontFamily: 'var(--font-courier)', color: 'var(--rt-c-text-primary)' }}>
                                  {course.name}
                                </span>
                                <span className="col-span-5 text-[11px] opacity-50" style={{ fontFamily: 'var(--font-crimson)', color: 'var(--rt-c-text-secondary)' }}>
                                  {course.topics}
                                </span>
                                <span className="col-span-1 text-center text-sm" style={{ color: '#16A34A' }}>✓</span>
                              </div>
                            ))}
                            <div className="flex items-center justify-between py-3 px-3" style={{ borderTop: '1px solid rgba(179,163,105,0.15)' }}>
                              <span className="text-[8px] tracking-[0.15em] opacity-25" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>
                                {cryptoCourses.length} MODULES // ALL PASSED
                              </span>
                              <span
                                className="text-[10px] tracking-wider font-bold"
                                style={{ fontFamily: 'var(--font-bebas)', color: '#16A34A', opacity: 0.5, transform: 'rotate(-3deg)', display: 'inline-block' }}
                              >
                                COMPLETED
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-2.5 text-center" style={{ borderTop: '1px solid rgba(179,163,105,0.12)' }}>
                      <span className="text-[7px] tracking-[0.3em] opacity-20" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>
                        CONFERRED BY THE BOARD OF REGENTS // GEORGIA INSTITUTE OF TECHNOLOGY // ATLANTA, GA
                      </span>
                    </div>
                  </div>
                </ScrollAnimator>

                {/* SRM,Secondary */}
                <ScrollAnimator animation="fadeUp" delay={0.1}>
                  <div
                    className="relative rounded-sm overflow-hidden"
                    style={{
                      border: '1px solid var(--rt-card-border)',
                      background: 'var(--rt-card-bg)',
                    }}
                  >
                    <div className="p-5 md:p-6">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 hidden md:block">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ border: '1.5px solid var(--rt-card-border)', background: 'var(--rt-card-bg)' }}
                          >
                            <span className="text-[7px] tracking-[0.1em] text-center leading-tight" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>SRM</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <div className="text-[8px] tracking-[0.2em] mb-1 opacity-30" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>
                                UNDERGRADUATE FOUNDATION // 4-YEAR PROGRAM
                              </div>
                              <h3 className="text-base font-bold" style={{ fontFamily: 'var(--font-courier)', color: 'var(--rt-c-text-primary)' }}>{srm.institution}</h3>
                              <p className="text-sm mt-0.5" style={{ fontFamily: 'var(--font-crimson)', color: 'var(--rt-c-text-secondary)' }}>{srm.degree}</p>
                            </div>
                            <span className="text-[10px] opacity-30" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-secondary)' }}>{srm.period}</span>
                          </div>
                          <div className="mt-2" style={{ fontFamily: 'var(--font-caveat)', color: 'var(--rt-c-text-muted)', fontSize: '0.85rem', transform: 'rotate(-1deg)', opacity: 0.4 }}>
                            &quot;Foundation years. Built the engineering base for everything after.&quot;
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimator>
              </div>

              {/* ═══ SECTION B: PROFESSIONAL CERTIFICATIONS ═══ */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[9px] tracking-[0.25em] font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-accent)' }}>
                    B. PROFESSIONAL CERTIFICATIONS
                  </span>
                  <div className="h-px flex-1" style={{ background: 'var(--rt-c-divider)' }} />
                </div>

                {/* OSCP,Crown jewel, full-width */}
                <ScrollAnimator animation="fadeUp">
                  <div
                    className="relative rounded-sm overflow-hidden mb-4 cursor-pointer transition-all duration-200 hover:shadow-lg"
                    style={{
                      border: '1px solid rgba(204,0,0,0.3)',
                      background: 'rgba(204,0,0,0.03)',
                    }}
                    onClick={() => setActiveCert(activeCert === 'OSCP' ? null : 'OSCP')}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: '#CC0000' }} />

                    <div className="p-5 md:p-6">
                      <div className="flex items-center gap-4">
                        {/* OSCP shield icon */}
                        <div
                          className="w-14 h-14 shrink-0 flex items-center justify-center"
                          style={{
                            border: '2px solid #CC0000',
                            background: 'rgba(204,0,0,0.08)',
                          }}
                        >
                          <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-bebas)', color: '#CC0000', letterSpacing: '0.05em' }}>
                            OSCP
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-base font-bold" style={{ fontFamily: 'var(--font-courier)', color: 'var(--rt-c-text-primary)' }}>
                                Offensive Security Certified Professional
                              </h4>
                              <p className="text-[10px] mt-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>
                                Offensive Security &middot; 2023
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className="px-2 py-0.5 text-[8px] tracking-wider font-bold"
                                style={{ fontFamily: 'var(--font-mono)', color: '#CC0000', border: '1px solid rgba(204,0,0,0.3)' }}
                              >
                                ELITE
                              </span>
                              <BackgroundCheckStamp status="passed" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {activeCert === 'OSCP' && (
                        <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--rt-c-divider)' }}>
                          <p className="text-[12px] leading-relaxed" style={{ fontFamily: 'var(--font-crimson)', color: 'var(--rt-c-text-secondary)' }}>
                            {certMeta.OSCP.description}
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-[8px] tracking-wider opacity-30" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>
                              TRY HARDER // OFFENSIVE SECURITY
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollAnimator>

                {/* Other certs,compact grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {certifications.filter(c => c.name !== 'OSCP').map((cert, idx) => {
                    const meta = certMeta[cert.name] || { tier: 'foundation', color: '#666', description: '' };
                    const isActive = activeCert === cert.name;

                    return (
                      <ScrollAnimator key={cert.name} delay={idx * 0.06}>
                        <div
                          className="relative rounded-sm overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1"
                          style={{
                            border: `1px solid ${isActive ? meta.color + '40' : 'var(--rt-card-border)'}`,
                            background: isActive ? `${meta.color}08` : 'var(--rt-card-bg)',
                          }}
                          onClick={() => setActiveCert(isActive ? null : cert.name)}
                        >
                          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: meta.color }} />

                          <div className="p-4">
                            <div className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-bebas)', color: meta.color, letterSpacing: '0.08em' }}>
                              {cert.name}
                            </div>
                            <div className="text-[9px] leading-tight mb-2 opacity-50" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>
                              {cert.fullName}
                            </div>
                            <div className="text-[8px] opacity-35" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}>
                              {cert.org} &middot; {cert.year}
                            </div>
                            <div className="mt-2">
                              <span
                                className="text-[7px] tracking-wider px-1.5 py-0.5"
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  color: meta.tier === 'pro' ? '#EA580C' : '#2563EB',
                                  border: `1px solid ${meta.tier === 'pro' ? 'rgba(234,88,12,0.3)' : 'rgba(37,99,232,0.3)'}`,
                                }}
                              >
                                {meta.tier.toUpperCase()}
                              </span>
                            </div>

                            {isActive && meta.description && (
                              <p className="mt-3 pt-2 text-[10px] leading-relaxed" style={{ fontFamily: 'var(--font-crimson)', color: 'var(--rt-c-text-secondary)', borderTop: '1px solid var(--rt-c-divider)' }}>
                                {meta.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </ScrollAnimator>
                    );
                  })}
                </div>
              </div>

              {/* ═══ SECTION C: COMPETITION RECORDS ═══ */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[9px] tracking-[0.25em] font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-accent)' }}>
                    C. COMPETITION RECORDS,MISSION DEBRIEFS
                  </span>
                  <div className="h-px flex-1" style={{ background: 'var(--rt-c-divider)' }} />
                </div>

                <div className="space-y-4">
                  {ctfMissions.map((mission, idx) => (
                    <ScrollAnimator key={mission.name} delay={idx * 0.08}>
                      <div
                        className="relative rounded-sm overflow-hidden"
                        style={{
                          border: '1px solid var(--rt-card-border)',
                          background: 'var(--rt-card-bg)',
                        }}
                      >
                        <div className="p-5">
                          <div className="flex items-start gap-4">
                            {/* Mission badge */}
                            <div
                              className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full"
                              style={{
                                background: 'linear-gradient(135deg, #D4A76A, #B45309)',
                                boxShadow: '0 2px 8px rgba(180,83,9,0.3)',
                              }}
                            >
                              <span className="text-white text-[9px] font-bold text-center leading-tight" style={{ fontFamily: 'var(--font-mono)' }}>
                                {mission.result.split(' ').map(w => w[0]).join('')}
                              </span>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-1">
                                <div>
                                  <div className="text-[8px] tracking-[0.2em] mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-accent)', opacity: 0.6 }}>
                                    {mission.codename}
                                  </div>
                                  <h4 className="text-sm font-bold" style={{ fontFamily: 'var(--font-courier)', color: 'var(--rt-c-text-primary)' }}>
                                    {mission.name}
                                  </h4>
                                </div>
                                <div className="text-right shrink-0">
                                  <div className="text-sm font-bold" style={{ fontFamily: 'var(--font-bebas)', color: '#D4A76A' }}>
                                    {mission.result}
                                  </div>
                                  {mission.pool && (
                                    <div className="text-[8px] opacity-35" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>
                                      / {mission.pool} teams
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="text-[8px] tracking-wider mb-2 opacity-30" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-faint)' }}>
                                {mission.type.toUpperCase()}
                              </div>

                              <p className="text-[11px] leading-relaxed mb-3" style={{ fontFamily: 'var(--font-crimson)', color: 'var(--rt-c-text-secondary)' }}>
                                {mission.briefing}
                              </p>

                              <div className="flex flex-wrap gap-1.5">
                                {mission.skills.map(skill => (
                                  <span
                                    key={skill}
                                    className="px-2 py-0.5 text-[8px] tracking-wider"
                                    style={{
                                      fontFamily: 'var(--font-mono)',
                                      color: 'var(--rt-c-text-muted)',
                                      border: '1px solid var(--rt-card-border)',
                                    }}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimator>
                  ))}
                </div>
              </div>

              {/* ─── Dossier footer ─── */}
              <div className="mt-10 pt-4 text-center" style={{ borderTop: '1px solid var(--rt-c-divider)' }}>
                <span className="text-[9px] tracking-[0.2em] opacity-25" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-c-text-muted)' }}>
                  5 CERTIFICATIONS &middot; 2 DEGREES &middot; 3 COMPETITIONS &middot; BACKGROUND VERIFIED
                </span>
              </div>
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
