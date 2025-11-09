import { useState, useEffect } from 'react';

interface CyclingTextProps {
  words: string[];
  intervalMs?: number;
  className?: string;
}

export const CyclingText = ({ 
  words = [], 
  intervalMs = 2500,
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
      }, 500); // Match animation duration
      
    }, intervalMs);

    return () => clearInterval(timer);
  }, [words.length, intervalMs]);

  const currentWord = words[currentIndex];

  return (
    <span 
      className={`inline-block px-6 py-2 md:px-8 md:py-3 bg-accent/90 text-accent-foreground rounded-lg font-black ${className}`}
      style={{
        animation: isExiting 
          ? 'word-fade-out 0.5s forwards' 
          : 'word-fade-in 0.5s forwards',
        minWidth: 'clamp(200px, 20vw, 280px)',
        textAlign: 'center',
        willChange: 'transform, opacity'
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {currentWord}
    </span>
  );
};
