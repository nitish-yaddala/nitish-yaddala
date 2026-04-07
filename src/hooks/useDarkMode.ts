'use client';

import { useState, useEffect, useCallback } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('breach-theme');
    const dark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
    document.body.classList.toggle('dark', dark);
  }, []);

  const toggle = useCallback(() => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('breach-theme', next ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', next);
      document.body.classList.toggle('dark', next);
      return next;
    });
  }, []);

  return { isDark, toggle };
}
