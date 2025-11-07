import { useState } from "react";

export const TransformationsSection = () => {
  return (
    <section id="transformations" className="py-20 border-t border-border">
      <div className="container-custom">
        <div className="mb-7">
          <h2 className="text-[clamp(28px,3.2vw,40px)] font-bold tracking-tight mb-3">
            Real People. Real Transformations.
          </h2>
          <p className="text-muted-foreground max-w-[60ch]">
            Our clients achieve sustainable results through dedicated coaching and science-based training.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <TransformationSlider
            before="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200&auto=format&fit=crop"
            after="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop"
          />
          <TransformationSlider
            before="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1200&auto=format&fit=crop"
            after="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop"
          />
        </div>
      </div>
    </section>
  );
};

interface TransformationSliderProps {
  before: string;
  after: string;
}

const TransformationSlider = ({ before, after }: TransformationSliderProps) => {
  const [position, setPosition] = useState(50);

  return (
    <figure className="relative border border-border rounded-[18px] overflow-hidden bg-[hsl(220_23%_8%)]">
      <img
        src={before}
        alt="Before transformation"
        className="w-full h-96 object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden border-r border-white/25"
        style={{ width: `${position}%` }}
      >
        <img
          src={after}
          alt="After transformation"
          className="w-[200%] h-full object-cover"
        />
      </div>
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-full max-w-[420px] px-4">
        <input
          type="range"
          min="5"
          max="95"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="w-full h-1 bg-[hsl(220_23%_12%)] rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent 
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[hsl(220_23%_8%)]
            [&::-webkit-slider-thumb]:shadow-[0_0_0_6px_hsl(var(--accent)/0.2)]
            [&::-webkit-slider-thumb]:cursor-pointer"
          aria-label="Before/after slider"
        />
      </div>
    </figure>
  );
};
