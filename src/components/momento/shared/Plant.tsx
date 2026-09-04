import { motion } from "motion/react";
import { EASE, useMotionScale } from "./motion";

/**
 * A growing plant drawn with SVG.
 * `stage` 0 = seed, 1 = sprout, 2 = leaves, 3 = more leaves, 4 = tall,
 * 5 = one flower, 6 = full bloom.
 */
export function Plant({ stage, className = "" }: { stage: number; className?: string }) {
  const s = useMotionScale();
  const stemHeight = Math.min(1, stage / 4);

  const leaves = [
    { at: 1, x: 100, y: 150, rot: -35 },
    { at: 2, x: 100, y: 122, rot: 40 },
    { at: 3, x: 100, y: 96, rot: -45 },
    { at: 3, x: 100, y: 74, rot: 48 },
    { at: 4, x: 100, y: 54, rot: -38 },
  ];

  const flowers = [
    { at: 5, x: 100, y: 36, size: 1 },
    { at: 6, x: 74, y: 62, size: 0.7 },
    { at: 6, x: 126, y: 78, size: 0.62 },
    { at: 6, x: 84, y: 104, size: 0.5 },
  ];

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Una planta que crece hasta florecer"
      className={`mx-auto w-full max-w-[15rem] ${className}`}
    >
      <motion.ellipse
        cx="100"
        cy="182"
        rx="46"
        ry="6"
        fill="color-mix(in oklab, var(--primary) 22%, transparent)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 * s }}
      />
      <motion.circle
        cx="100"
        cy="174"
        r="5"
        fill="color-mix(in oklab, var(--accent) 70%, white)"
        initial={{ scale: 0 }}
        animate={{ scale: stage === 0 ? 1 : 0.6, opacity: stage === 0 ? 1 : 0.5 }}
        transition={{ duration: 1 * s, ease: EASE }}
        style={{ transformOrigin: "100px 174px" }}
      />
      <motion.path
        d="M100 174 C 96 140, 104 110, 100 30"
        stroke="color-mix(in oklab, var(--accent) 60%, var(--primary))"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: stemHeight }}
        transition={{ duration: 1.8 * s, ease: EASE }}
      />
      {leaves.map((leaf, i) => (
        <g
          key={`l-${i}`}
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rot}) scale(${
            leaf.rot < 0 ? -1 : 1
          } 1)`}
        >
          <motion.path
            d="M0 0 C 16 -12, 34 -8, 40 2 C 30 12, 12 12, 0 0 Z"
            fill="color-mix(in oklab, var(--accent) 55%, var(--primary))"
            initial={{ scale: 0, opacity: 0 }}
            animate={stage >= leaf.at ? { scale: 1, opacity: 0.92 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 1.1 * s, delay: 0.25 * i * s, ease: EASE }}
            style={{ transformOrigin: "0px 0px" }}
          />
        </g>
      ))}

      {flowers.map((f, i) => (
        <motion.g
          key={`f-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={stage >= f.at ? { scale: f.size, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 1.3 * s, delay: 0.3 * i * s, ease: EASE }}
          style={{ transformOrigin: `${f.x}px ${f.y}px` }}
        >
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx={f.x}
              cy={f.y - 11}
              rx="6"
              ry="11"
              fill="color-mix(in oklab, var(--primary) 70%, white)"
              transform={`rotate(${a} ${f.x} ${f.y})`}
              opacity="0.95"
            />
          ))}
          <circle cx={f.x} cy={f.y} r="4.6" fill="color-mix(in oklab, var(--accent) 80%, white)" />
        </motion.g>
      ))}
    </svg>
  );
}
