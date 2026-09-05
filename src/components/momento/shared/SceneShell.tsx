import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Atmosphere } from "./Atmosphere";
import { Paper } from "./Paper";
import { EASE, useMotionPrefs } from "./motion";
import { TONES, type ToneName } from "./tone";

/**
 * One scene, filling the screen.
 *
 * Every scene is the same shape — a narrow centred column over its own sky —
 * so that moving between them feels like the light changing rather than like
 * navigating somewhere else.
 *
 * The sky, the atmosphere and the plant sit outside the scrolling element on
 * purpose: an `absolute inset-0` layer inside a scroll container only covers
 * the first screenful, so on a short phone the background would run out
 * halfway down a long scene. Only the words scroll.
 */
export function SceneShell({
  tone,
  backdrop,
  align = "center",
  children,
}: {
  tone: ToneName;
  /** Sits behind the words and in front of the sky. The plant lives here. */
  backdrop?: ReactNode;
  align?: "center" | "start";
  children: ReactNode;
}) {
  const m = useMotionPrefs();
  const palette = TONES[tone];

  return (
    <motion.section
      initial={{ opacity: 0, filter: `blur(${m.blur(12)}px)` }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: `blur(${m.blur(12)}px)` }}
      transition={{ duration: m.dur(0.8), ease: EASE }}
      className="absolute inset-0 overflow-hidden"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: palette.background }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: m.dur(1.6), ease: EASE }}
      />
      <Atmosphere tone={palette} />
      {/* The sheet sits under the plant on purpose: where both appear, the
          silhouette reads as something pressed onto the letter. */}
      <Paper show={palette.paper} />
      {backdrop}

      <div className="relative z-10 h-full overflow-x-hidden overflow-y-auto overscroll-contain">
        <div
          className={`mx-auto flex min-h-full w-full max-w-[var(--measure)] flex-col items-center gap-[var(--gap)] px-6 text-center ${
            align === "center" ? "justify-center" : "justify-start"
          }`}
          style={{
            paddingTop: "max(2.75rem, calc(env(safe-area-inset-top) + 1.5rem))",
            paddingBottom: "max(2.75rem, calc(env(safe-area-inset-bottom) + 1.5rem))",
          }}
        >
          {children}
        </div>
      </div>
    </motion.section>
  );
}
