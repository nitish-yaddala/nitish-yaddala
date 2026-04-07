'use client';

import { useEffect } from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';
import DarkModeToggle from '@/components/DarkModeToggle';
import DotNav from '@/components/DotNav';
import CoverPage from '@/components/CoverPage';
import ExecutiveSummary from '@/components/ExecutiveSummary';
import TheJourney from '@/components/TheJourney';
import BureauVeritas from '@/components/BureauVeritas';
import Capabilities from '@/components/Capabilities';
import EvidenceBoard from '@/components/EvidenceBoard';
import HallOfFame from '@/components/HallOfFame';
import Methodology from '@/components/Methodology';
import TheCredentials from '@/components/TheCredentials';
import Contact from '@/components/Contact';

export default function Home() {
  const { isDark, toggle } = useDarkMode();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenis: any = null;

    import('lenis').then((mod) => {
      const Lenis = mod.default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });

    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <DarkModeToggle isDark={isDark} toggle={toggle} />
      <DotNav />
      <main className="relative paper-vignette">

      {/* Section 0: Cover Page */}
      <CoverPage />

      <div className="max-w-5xl mx-auto px-4">
        <div className="h-px bg-current opacity-5" />
      </div>

      {/* Section 1: Executive Summary — The Operator */}
      <ExecutiveSummary />

      <div className="max-w-5xl mx-auto px-4">
        <div className="h-px bg-current opacity-5" />
      </div>

      {/* Section 2: The Journey — Career Timeline */}
      <TheJourney />

      <div className="max-w-5xl mx-auto px-4">
        <div className="h-px bg-current opacity-5" />
      </div>

      {/* Section 3: Bureau Veritas — The Mission */}
      <BureauVeritas />

      <div className="max-w-5xl mx-auto px-4">
        <div className="h-px bg-current opacity-5" />
      </div>

      {/* Section 4: Capabilities — Operator Assessment */}
      <Capabilities />

      <div className="max-w-5xl mx-auto px-4">
        <div className="h-px bg-current opacity-5" />
      </div>

      {/* Section 5: Evidence Board — The Evidence */}
      <EvidenceBoard />

      <div className="max-w-5xl mx-auto px-4">
        <div className="h-px bg-current opacity-5" />
      </div>

      {/* Section 6: Hall of Fame — Most Wanted */}
      <HallOfFame />

      <div className="max-w-5xl mx-auto px-4">
        <div className="h-px bg-current opacity-5" />
      </div>

      {/* Section 7: Methodology — The Method */}
      <Methodology />

      <div className="max-w-5xl mx-auto px-4">
        <div className="h-px bg-current opacity-5" />
      </div>

      {/* Section 8: The Credentials — Education + Certs + CTFs */}
      <TheCredentials />

      <div className="max-w-5xl mx-auto px-4">
        <div className="h-px bg-current opacity-5" />
      </div>

      {/* Section 9: Contact — File Closed */}
      <Contact />

    </main>
    </>
  );
}
