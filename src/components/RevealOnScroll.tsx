import React, { useEffect, useRef, useState } from 'react';

type RevealVariant = 'up' | 'scale' | 'left' | 'right';

interface RevealOnScrollProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delayMs?: number;
  className?: string;
}

const hiddenTransformMap: Record<RevealVariant, string> = {
  up: 'translate3d(0, 28px, 0)',
  scale: 'translate3d(0, 18px, 0) scale(0.96)',
  left: 'translate3d(-24px, 0, 0)',
  right: 'translate3d(24px, 0, 0)',
};

/**
 * Hiệu ứng xuất hiện mượt mà khi người dùng cuộn/lướt tới từng phần.
 */
export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  variant = 'up',
  delayMs = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  });

  useEffect(() => {
    if (isVisible) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={`sn2-reveal ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : hiddenTransformMap[variant],
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
};
