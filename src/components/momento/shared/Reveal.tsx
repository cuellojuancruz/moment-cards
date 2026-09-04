import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE, useMotionScale } from "./motion";

export function Reveal({
  delay = 0,
  duration = 1.4,
  y = 14,
  blur = 8,
  className,
  children,
}: {
  delay?: number;
  duration?: number;
  y?: number;
  blur?: number;
  className?: string;
  children: ReactNode;
}) {
  const scale = useMotionScale();
  return (
    <motion.div
      initial={{ opacity: 0, y: y * scale, filter: `blur(${blur * scale}px)` }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: duration * scale, delay: delay * scale, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
