'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type AnimationType = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'revealUp' | 'typewriter' | 'stampSlam';

interface Props {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  y?: number;
  delay?: number;
  duration?: number;
  stagger?: boolean;
}

const getInitialStyles = (animation: AnimationType, y: number): Record<string, string> => {
  switch (animation) {
    case 'fadeUp':
      return { opacity: '0', transform: `translateY(${y}px)`, filter: 'blur(2px)' };
    case 'fadeIn':
      return { opacity: '0', filter: 'blur(3px)' };
    case 'slideLeft':
      return { opacity: '0', transform: 'translateX(-60px)', filter: 'blur(2px)' };
    case 'slideRight':
      return { opacity: '0', transform: 'translateX(60px)', filter: 'blur(2px)' };
    case 'scaleIn':
      return { opacity: '0', transform: 'scale(0.85)', filter: 'blur(4px)' };
    case 'revealUp':
      return { opacity: '0', transform: `translateY(${y}px) scale(0.97)`, filter: 'blur(1px)' };
    case 'stampSlam':
      return { opacity: '0', transform: 'scale(2.5) rotate(-25deg)' };
    case 'typewriter':
      return { opacity: '0', transform: `translateY(${y * 0.5}px)` };
    default:
      return { opacity: '0', transform: `translateY(${y}px)` };
  }
};

const getFinalStyles = (): Record<string, string> => ({
  opacity: '1',
  transform: 'none',
  filter: 'none',
});

export default function ScrollAnimator({
  children,
  className = '',
  animation = 'fadeUp',
  y = 40,
  delay = 0,
  duration = 0.7,
  stagger = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if already visible
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      Object.assign(el.style, getFinalStyles());
      return;
    }

    // Set initial hidden state
    const initial = getInitialStyles(animation, y);
    Object.assign(el.style, initial);

    // Build transition string
    const easing = animation === 'stampSlam' ? 'cubic-bezier(0.22, 1.5, 0.36, 1)' : 'cubic-bezier(0.16, 1, 0.3, 1)';
    const dur = animation === 'stampSlam' ? 0.4 : duration;
    const props = Object.keys(initial).map(p => `${p} ${dur}s ${easing} ${delay}s`).join(', ');
    el.style.transition = props;

    // Stagger children if requested
    if (stagger) {
      const children = el.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        child.style.opacity = '0';
        child.style.transform = `translateY(20px)`;
        child.style.transition = `opacity ${duration}s ${easing} ${delay + i * 0.08}s, transform ${duration}s ${easing} ${delay + i * 0.08}s`;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Object.assign(el.style, getFinalStyles());

            // Animate staggered children
            if (stagger) {
              const children = el.children;
              for (let i = 0; i < children.length; i++) {
                const child = children[i] as HTMLElement;
                child.style.opacity = '1';
                child.style.transform = 'none';
              }
            }

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, y, delay, duration, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
