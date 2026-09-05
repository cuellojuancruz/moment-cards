import { motion } from "motion/react";
import { EASE, useMotionPrefs } from "./motion";

const OUTER = [0, 45, 90, 135, 180, 225, 270, 315];
const INNER = [22, 67, 112, 157, 202, 247, 292, 337];

/** One flower, fully open. The last thing on the screen. */
export function Flower({ className = "" }: { className?: string }) {
  const m = useMotionPrefs();

  return (
    <motion.svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Una flor completamente abierta"
      className={`mx-auto w-full ${className}`}
      animate={m.reduced ? { scale: 1 } : { scale: [1, 1.025, 1] }}
      transition={{ duration: 9, repeat: m.reduced ? 0 : Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "50% 50%" }}
    >
      <motion.circle
        cx="100"
        cy="100"
        r="76"
        fill="color-mix(in oklab, var(--primary) 20%, transparent)"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: m.dur(2.4), ease: EASE }}
        style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
      />

      {/* The rotation stays on a plain <g>: an animated CSS transform on the
          petal itself would override the SVG transform attribute and every
          petal would collapse onto the same one. */}
      {OUTER.map((angle, i) => (
        <g key={`o-${angle}`} transform={`rotate(${angle} 100 100)`}>
          <motion.ellipse
            cx="100"
            cy="61"
            rx="15"
            ry="37"
            fill="color-mix(in oklab, var(--primary) 62%, white)"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.95 }}
            transition={{ duration: m.dur(1.8), delay: 0.5 + i * 0.13, ease: EASE }}
            style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          />
        </g>
      ))}

      {INNER.map((angle, i) => (
        <g key={`i-${angle}`} transform={`rotate(${angle} 100 100)`}>
          <motion.ellipse
            cx="100"
            cy="76"
            rx="10"
            ry="24"
            fill="color-mix(in oklab, var(--primary) 40%, white)"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: m.dur(1.6), delay: 1.5 + i * 0.1, ease: EASE }}
            style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          />
        </g>
      ))}

      <motion.circle
        cx="100"
        cy="100"
        r="13"
        fill="color-mix(in oklab, var(--accent) 84%, white)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: m.dur(1.4), delay: 2.4, ease: EASE }}
        style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
      />
    </motion.svg>
  );
}
