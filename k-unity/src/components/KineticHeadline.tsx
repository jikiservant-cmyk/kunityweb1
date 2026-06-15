'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface KineticHeadlineProps {
  lines: string[];
  className?: string;
  staggerDelay?: number; // in seconds
}

export function KineticHeadline({
  lines,
  className,
  staggerDelay = 0.15,
}: KineticHeadlineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={cn('flex flex-col', className)}>
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden py-1">
          <span
            className={cn(
              'block opacity-0 translate-y-full skew-y-6',
              isVisible && 'kinetic-animate'
            )}
            style={{
              animationDelay: `${index * staggerDelay}s`,
            }}
          >
            {line}
          </span>
        </div>
      ))}
    </div>
  );
}
