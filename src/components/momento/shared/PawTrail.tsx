import { motion } from "motion/react";
import { useMotionPrefs } from "./motion";

/* ------------------------------------------------------------------ *
 * Someone walked through.
 *
 * A line of prints that arrives one paw at a time, crosses the bottom of the
 * frame, stays a moment and fades. It happens once per scene, and only in the
 * two scenes where a cat has any business being — the one that is about them,
 * and the epilogue where they come back. Everywhere else it would undercut
 * what is being said.
 *
 * The detail that makes it read as a walk rather than a row of stamps is that
 * the prints alternate to either side of the line, the way real tracks do.
 * ------------------------------------------------------------------ */

const PRINTS = 8;
/** Seconds before the first paw lands — well into the scene, never on arrival. */
const START = 5;

function Paw() {
  return (
    <svg viewBox="0 0 40 44" fill="currentColor" aria-hidden className="h-full w-full">
      <ellipse cx="20" cy="31" rx="11.5" ry="9.5" />
      <ellipse cx="8.5" cy="16" rx="4.3" ry="5.8" transform="rotate(-22 8.5 16)" />
      <ellipse cx="16.5" cy="9.5" rx="4.4" ry="6" transform="rotate(-7 16.5 9.5)" />
      <ellipse cx="25" cy="10" rx="4.4" ry="6" transform="rotate(8 25 10)" />
      <ellipse cx="32.5" cy="17" rx="4.3" ry="5.8" transform="rotate(24 32.5 17)" />
    </svg>
  );
}

export function PawTrail({ show }: { show: boolean }) {
  const m = useMotionPrefs();
  if (!show || m.reduced) return null;

  return (
    <>
      {Array.from({ length: PRINTS }, (_, i) => {
        const t = i / (PRINTS - 1);
        // a shallow arc across the lower part of the frame
        const x = 7 + t * 80;
        const side = i % 2 === 0 ? -1 : 1;
        const y = 82 - Math.sin(t * Math.PI) * 5 + side * 1.5;
        const angle = 9 + Math.sin(t * Math.PI * 1.6) * 7;

        return (
          <motion.div
            key={i}
            aria-hidden
            className="pointer-events-none absolute text-white"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: "2.6vmin",
              height: "2.85vmin",
              rotate: angle,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.22, 0.22, 0] }}
            transition={{
              duration: 9,
              delay: START + i * 0.34,
              times: [0, 0.07, 0.7, 1],
              ease: "easeInOut",
            }}
          >
            <Paw />
          </motion.div>
        );
      })}
    </>
  );
}
