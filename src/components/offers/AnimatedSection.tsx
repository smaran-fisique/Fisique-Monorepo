import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasTracked = useRef(false);

  useEffect(() => {
    if (isInView && sectionName && offerSlug && !hasTracked.current) {
      hasTracked.current = true;
      trackSectionView(sectionName, offerSlug);
    }
  }, [isInView, sectionName, offerSlug]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
