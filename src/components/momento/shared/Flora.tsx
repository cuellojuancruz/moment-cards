import { motion } from "motion/react";
import { useMotionPrefs } from "./motion";

/* ------------------------------------------------------------------ *
 * Pressed flowers behind the glass.
 *
 * These are the answer to a wide screen looking empty. The reading column is
 * narrow by design — a letter needs a short line — which on a monitor leaves
 * two large bare margins on either side. So the silhouettes are anchored to
 * the edges and deliberately run off them: they fill the parts of the frame
 * the words never reach, and they stay out of the middle, where the words are.
 *
 * They are almost not there — white at five to nine per cent — and they barely
 * move. Anything more legible would become a picture competing with the text.
 * ------------------------------------------------------------------ */

/** A loose six-petal flower, seen flat, the way a pressed one lies. */
function Bloom() {
  return (
    <svg viewBox="0 0 120 120" fill="currentColor" aria-hidden>
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="60"
          cy="27"
          rx="11.5"
          ry="26"
          transform={`rotate(${angle} 60 60)`}
        />
      ))}
      <circle cx="60" cy="60" r="9" opacity="0.75" />
    </svg>
  );
}

/** A cut stem with leaves running up it, and two buds that never opened. */
function Branch() {
  return (
    <svg viewBox="0 0 140 240" fill="currentColor" aria-hidden>
      <path
        d="M70 236 C 63 190, 76 150, 66 104 C 58 66, 74 36, 68 6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {(
        [
          [67, 206, 205],
          [70, 182, -26],
          [69, 156, 208],
          [66, 132, -30],
          [64, 108, 203],
          [68, 84, -24],
          [67, 60, 206],
          [68, 38, -28],
        ] as const
      ).map(([x, y, rotation], i) => (
        <path
          key={i}
          d="M0 0 C 16 -15, 40 -14, 54 0 C 40 14, 16 15, 0 0 Z"
          transform={`translate(${x} ${y}) rotate(${rotation})`}
        />
      ))}
      <circle cx="68" cy="14" r="8" opacity="0.8" />
      <circle cx="60" cy="30" r="5" opacity="0.6" />
    </svg>
  );
}

/**
 * Where each silhouette sits. All four hang off an edge — none of them is
 * fully in frame, which is what stops them reading as decoration placed on
 * the page and lets them read as something the page was pressed against.
 */
const PLACES = [
  { shape: "branch", css: "bottom-0 left-0", size: 40, x: "-30%", y: "24%", tilt: -8, sway: 26 },
  { shape: "bloom", css: "right-0 top-0", size: 33, x: "12%", y: "-9%", tilt: 20, sway: 31 },
  { shape: "branch", css: "bottom-0 right-0", size: 34, x: "28%", y: "20%", tilt: 7, sway: 23 },
  { shape: "bloom", css: "left-0 top-1/3", size: 19, x: "-38%", y: "-18%", tilt: -14, sway: 28 },
] as const;

export function Flora({ density }: { density: number }) {
  const m = useMotionPrefs();
  if (density <= 0) return null;

  const count = Math.min(PLACES.length, Math.round(1 + density * 3));
  const opacity = 0.06 + density * 0.06;

  return (
    <>
      {PLACES.slice(0, count).map((place, i) => (
        <motion.div
          key={i}
          aria-hidden
          className={`pointer-events-none absolute ${place.css} text-white`}
          // x and y go through Motion rather than a `transform` string: Motion
          // composes the whole transform itself, so a hand-written one here
          // would simply be overwritten by the rotation below.
          style={{ width: `${place.size}vmin`, x: place.x, y: place.y, opacity }}
          animate={
            m.reduced
              ? { rotate: place.tilt }
              : { rotate: [place.tilt - 1.2, place.tilt + 1.2, place.tilt - 1.2] }
          }
          transition={
            m.reduced
              ? { duration: 0 }
              : { duration: place.sway, delay: i * 1.7, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {place.shape === "bloom" ? <Bloom /> : <Branch />}
        </motion.div>
      ))}
    </>
  );
}
