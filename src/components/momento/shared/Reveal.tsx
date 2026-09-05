import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE, useMotionPrefs } from "./motion";

/** A single element surfacing out of the dark. The one entrance used everywhere. */
export function Reveal({
  delay = 0,
  duration = 1.5,
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
  const m = useMotionPrefs();
  return (
    <motion.div
      initial={{ opacity: 0, y: m.px(y), filter: `blur(${m.blur(blur)}px)` }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: m.dur(duration), delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
