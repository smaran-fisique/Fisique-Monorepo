import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = ({ targetDate, className = "" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg px-3 py-2 sm:px-4 sm:py-3 min-w-[60px] sm:min-w-[80px]">
        <span className="text-2xl sm:text-4xl font-bold text-foreground tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs sm:text-sm text-muted-foreground mt-1 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-4 ${className}`}>
      <TimeBlock value={timeLeft.days} label="Days" />
      <span className="text-2xl sm:text-4xl font-bold text-muted-foreground">:</span>
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <span className="text-2xl sm:text-4xl font-bold text-muted-foreground">:</span>
      <TimeBlock value={timeLeft.minutes} label="Mins" />
      <span className="text-2xl sm:text-4xl font-bold text-muted-foreground">:</span>
      <TimeBlock value={timeLeft.seconds} label="Secs" />
    </div>
  );
};
