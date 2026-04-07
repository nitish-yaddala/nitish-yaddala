'use client';

import { useEffect, useRef } from 'react';

interface ScrollAnimatorOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
}

export function useScrollAnimator(options: ScrollAnimatorOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { y = 40, duration = 0.8, delay = 0 } = options;

    // Check if element is already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    // Set initial state
    el.style.opacity = '0';
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [options]);

  return ref;
}
