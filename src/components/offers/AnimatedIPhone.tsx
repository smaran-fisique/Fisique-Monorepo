import { useEffect, useState } from "react";

interface AnimatedIPhoneProps {
  scrollProgress: number;
}

export const AnimatedIPhone = ({ scrollProgress }: AnimatedIPhoneProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Transform values based on scroll progress
  const rotateY = mounted ? -15 + scrollProgress * 30 : 0; // -15 to 15 degrees
  const rotateX = mounted ? 10 - scrollProgress * 20 : 0; // 10 to -10 degrees
  const scale = mounted ? 0.9 + scrollProgress * 0.1 : 1; // 0.9 to 1

  return (
    <div className="relative perspective-1000">
      {/* Glow effect behind phone */}
      <div 
        className="absolute inset-0 blur-3xl opacity-30 bg-accent rounded-full animate-glow-pulse"
        style={{
          transform: `scale(${1.2 + scrollProgress * 0.2})`,
        }}
      />
      
      {/* iPhone frame */}
      <div
        className="relative w-[280px] h-[570px] bg-gradient-to-b from-muted to-secondary rounded-[50px] p-3 shadow-2xl transition-transform duration-300"
        style={{
          transform: `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Screen bezel */}
        <div className="w-full h-full bg-background rounded-[40px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-10" />
          
          {/* Screen content - gradient background */}
          <div className="w-full h-full bg-gradient-to-br from-accent/20 via-background to-accent/10 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="text-5xl mb-4">🏆</div>
              <p className="text-lg font-semibold text-foreground">
                iPhone
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Could be yours
              </p>
            </div>
          </div>
          
          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};
