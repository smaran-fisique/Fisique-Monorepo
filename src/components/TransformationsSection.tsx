import { useState } from "react";
import { useSection } from "@/hooks/useSection";
interface Transformation {
  before: string;
  after: string;
}
interface TransformationsData {
  title: string;
  subtitle: string;
  transformations: Transformation[];
}
const defaultTransformationsData: TransformationsData = {
  title: "Real People. Real Transformations.",
  subtitle: "Our clients achieve sustainable results through dedicated coaching and science-based training.",
  transformations: [{
    before: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop"
  }, {
    before: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1200&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop"
  }]
};
export const TransformationsSection = () => {
  const {
    data: transformationsData
  } = useSection<TransformationsData>('transformations', defaultTransformationsData);
  return <section id="transformations" className="py-20 border-t border-border">
      <div className="container-custom">
        <div className="mb-7">
          <h2 className="font-bold tracking-tight mb-3 text-5xl text-cyan-500">
            {transformationsData.title}
          </h2>
          <p className="text-muted-foreground w-full max-w-none ">
            {transformationsData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {transformationsData.transformations.map((transformation, index) => <TransformationSlider key={index} before={transformation.before} after={transformation.after} />)}
        </div>
      </div>
    </section>;
};
interface TransformationSliderProps {
  before: string;
  after: string;
}
const TransformationSlider = ({
  before,
  after
}: TransformationSliderProps) => {
  const [position, setPosition] = useState(50);
  return <figure className="relative border border-border rounded-[18px] overflow-hidden bg-[hsl(220_23%_8%)]">
      <img src={before} alt="Before transformation" width={660} height={384} className="w-full h-96 object-cover" loading="lazy" />
      <div className="absolute inset-0 overflow-hidden border-r border-white/25" style={{
      width: `${position}%`
    }}>
        <img src={after} alt="After transformation" width={1320} height={384} className="w-[200%] h-full object-cover" loading="lazy" />
      </div>
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-full max-w-[420px] px-4">
        <input type="range" min="5" max="95" value={position} onChange={e => setPosition(Number(e.target.value))} className="w-full h-1 bg-[hsl(220_23%_12%)] rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent 
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[hsl(220_23%_8%)]
            [&::-webkit-slider-thumb]:shadow-[0_0_0_6px_hsl(var(--accent)/0.2)]
            [&::-webkit-slider-thumb]:cursor-pointer" aria-label="Before/after slider" />
      </div>
    </figure>;
};