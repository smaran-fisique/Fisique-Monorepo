import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { trackSectionView } from "./OfferAnalytics";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  sectionName?: string;
  offerSlug?: string;
}

export const AnimatedSection = ({ 
  children, 
  className = "",
  sectionName,
  offerSlug 
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    if (!sectionName || !offerSlug || hasTracked) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTracked) {
          setHasTracked(true);
          trackSectionView(sectionName, offerSlug);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [sectionName, offerSlug, hasTracked]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
