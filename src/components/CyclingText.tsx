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

  // Handle empty words array
  if (words.length === 0) {
    return null;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      // Start exit animation
      setIsExiting(true);
      
      // After exit animation completes, change word
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsExiting(false);
      }, 400); // Match animation duration
      
    }, intervalMs);

    return () => clearInterval(timer);
  }, [words.length, intervalMs]);

  const currentWord = words[currentIndex];

  return (
    <span 
      className="inline-block"
      style={{
        perspective: '1000px',
        minWidth: 'clamp(200px, 20vw, 280px)',
      }}
    >
      <span 
        className={`block px-6 py-2 md:px-8 md:py-3 bg-accent/90 text-accent-foreground rounded-lg font-black text-center ${
          isExiting ? 'animate-word-roll-out' : 'animate-word-roll-in'
        } ${className}`}
        style={{
          transformStyle: 'preserve-3d',
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {currentWord}
      </span>
    </span>
  );
};
