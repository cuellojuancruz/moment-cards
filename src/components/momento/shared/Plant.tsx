import { motion } from "motion/react";
import { EASE, useMotionPrefs } from "./motion";

/* ------------------------------------------------------------------ *
 * The plant.
 *
 * It is the only thing in the experience that remembers. Once it has been
 * planted it keeps growing behind the later scenes, so the progress of the
 * story is something she can see rather than something a bar tells her.
 *
 *   0  a seed
 *   1  it has broken the soil
 *   2  first leaves
 *   3  taller
 *   4  taller still
 *   5  one flower
 *   6  in full bloom
 * ------------------------------------------------------------------ */

const STEM_LENGTH: Record<number, number> = {
  0: 0,
  1: 0.22,
  2: 0.46,
  3: 0.66,
  4: 0.85,
  5: 1,
  6: 1,
};

/** Leaves: [appears at stage, x, y, rotation]. Rotations over 180° point left. */
const LEAVES: Array<[number, number, number, number]> = [
  [2, 117, 196, 208],
  [2, 121, 178, -28],
  [3, 121, 152, 212],
  [3, 118, 132, -32],
  [4, 117, 108, 206],
  [4, 121, 90, -26],
  [5, 121, 70, 210],
];

/** Branches that only exist once she is in full bloom. */
const BRANCHES = [
  "M119 100 C 108 96, 98 95, 93 92",
  "M120 118 C 132 116, 144 114, 149 111",
  "M118 140 C 110 140, 104 139, 100 137",
  "M121 78 C 130 74, 138 70, 142 68",
];

/** Flowers: [appears at stage, x, y, size]. */
const FLOWERS: Array<[number, number, number, number]> = [
  [5, 120, 52, 1],
  [6, 93, 92, 0.68],
  [6, 149, 111, 0.6],
  [6, 100, 137, 0.52],
  [6, 142, 68, 0.55],
];

const LEAF = "M0 0 C 13 -13, 34 -12, 45 0 C 34 12, 13 13, 0 0 Z";

export function Plant({
  stage,
  className = "",
  faint = false,
}: {
  stage: number;
  className?: string;
  /** The quiet version that lives behind the words in later scenes. */
  faint?: boolean;
}) {
  const m = useMotionPrefs();
  const grown = STEM_LENGTH[Math.max(0, Math.min(6, Math.round(stage)))] ?? 0;
  const stroke = "color-mix(in oklab, var(--accent) 62%, var(--primary))";
  const leafFill = "color-mix(in oklab, var(--accent) 52%, var(--primary))";

  return (
    <motion.svg
      viewBox="0 0 240 260"
      role={faint ? "presentation" : "img"}
      aria-hidden={faint || undefined}
      aria-label={faint ? undefined : "Una planta que crece hasta florecer"}
      className={`w-full ${className}`}
      animate={m.reduced ? { rotate: 0 } : { rotate: [-0.7, 0.7, -0.7] }}
      transition={{ duration: 14, repeat: m.reduced ? 0 : Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "50% 92%" }}
    >
      {/* light pooling on the ground */}
      <motion.ellipse
        cx="120"
        cy="243"
        rx={54}
        ry="7"
        fill="color-mix(in oklab, var(--primary) 26%, transparent)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 + grown * 0.5 }}
        transition={{ duration: m.dur(1.6), ease: EASE }}
      />

      {/* the seed, which stays visible just long enough to become a stem */}
      <motion.ellipse
        cx="120"
        cy="236"
        rx="6"
        ry="5"
        fill="color-mix(in oklab, var(--accent) 72%, white)"
        initial={{ scale: 0, opacity: 0 }}
        animate={stage === 0 ? { scale: 1, opacity: 1 } : { scale: 0.55, opacity: 0.35 }}
        transition={{ duration: m.dur(1.2), ease: EASE }}
        style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
      />

      <motion.path
        d="M120 238 C 112 206, 130 180, 120 150 C 111 122, 127 96, 120 58"
        stroke={stroke}
        strokeWidth="3.6"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        // Hidden outright while there is no stem: a round cap on a zero-length
        // stroke still paints a dot.
        animate={{ pathLength: grown, opacity: grown > 0 ? 1 : 0 }}
        transition={{ duration: m.dur(2.6), ease: EASE }}
      />

      {/* Only mounted once they exist. A round-capped stroke with a pathLength
          of 0 still paints its cap, which would leave four dots hanging in the
          air above the seedling for most of the scene. */}
      {stage >= 6 &&
        BRANCHES.map((d, i) => (
          <motion.path
            key={`b-${i}`}
            d={d}
            stroke={stroke}
            strokeWidth="2.1"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: m.dur(1.4), delay: 0.2 * i, ease: EASE }}
          />
        ))}

      {LEAVES.map(([at, x, y, rot], i) => (
        <g key={`l-${i}`} transform={`translate(${x} ${y}) rotate(${rot})`}>
          <motion.path
            d={LEAF}
            fill={leafFill}
            initial={{ scale: 0, opacity: 0 }}
            animate={stage >= at ? { scale: 1, opacity: 0.94 } : { scale: 0, opacity: 0 }}
            transition={{ duration: m.dur(1.3), delay: 0.18 * i, ease: EASE }}
            style={{ transformBox: "fill-box", transformOrigin: "0% 50%" }}
          />
        </g>
      ))}

      {FLOWERS.map(([at, x, y, size], i) => (
        <g key={`f-${i}`} transform={`translate(${x} ${y})`}>
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={stage >= at ? { scale: size, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: m.dur(1.6), delay: 0.22 * i, ease: EASE }}
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle r="17" fill="color-mix(in oklab, var(--primary) 26%, transparent)" />
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-11"
                rx="6.2"
                ry="11"
                fill="color-mix(in oklab, var(--primary) 68%, white)"
                transform={`rotate(${angle})`}
                opacity="0.96"
              />
            ))}
            <circle r="4.8" fill="color-mix(in oklab, var(--accent) 82%, white)" />
          </motion.g>
        </g>
      ))}
    </motion.svg>
  );
}

/**
 * The plant kept alive behind a later scene — rooted to the bottom of the
 * screen, dim enough that the words always win.
 */
export function PlantBackdrop({ stage }: { stage: number }) {
  const m = useMotionPrefs();
  if (stage <= 0) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: m.dur(2), ease: EASE }}
    >
      <div className="w-[min(30rem,120vw)] translate-y-[14%] opacity-[0.22] blur-[1px]">
        <Plant stage={stage} faint />
      </div>
    </motion.div>
  );
}
