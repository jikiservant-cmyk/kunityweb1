'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface InkFlowTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function InkFlowText({ children, className, delay = 0.8 }: InkFlowTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={textRef}
      className={cn(
        'ink-flow-mask opacity-0',
        isVisible && 'ink-flow-active opacity-100',
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
