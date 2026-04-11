'use client';

import { useState, useEffect } from 'react';

interface CyclingTextProps {
  words: string[];
  intervalMs?: number;
  className?: string;
}

export const CyclingText = ({
  words = [],
  intervalMs = 1000,
  className = ''
}: CyclingTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Don't run if no words
    if (words.length === 0) return;

    const timer = setInterval(() => {
      // Start exit animation
      setIsExiting(true);

      // After exit animation completes, change word
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsExiting(false);
      }, 500); // Match animation duration

    }, intervalMs);

    return () => clearInterval(timer);
  }, [words.length, intervalMs]);

  // Handle empty words array - moved AFTER hooks
  if (words.length === 0) {
    return null;
  }

  const currentWord = words[currentIndex];

  return (
    <span
      className={`inline-block px-6 py-2 md:px-8 md:py-3 bg-accent/90 text-accent-foreground rounded-lg font-black text-center ${className}`}
      style={{
        minWidth: 'clamp(200px, 20vw, 280px)',
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        className={isExiting ? 'animate-word-wipe-out' : 'animate-word-wipe-in'}
      >
        {currentWord}
      </span>
    </span>
  );
};
