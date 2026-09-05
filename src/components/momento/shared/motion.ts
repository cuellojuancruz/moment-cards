import { useReducedMotion } from "motion/react";

/**
 * Slow, cinematic ease-out. Nothing here should ever feel snappy.
 *
 * Typed as a mutable tuple rather than `as const`: Motion's `ease` expects
 * `[number, number, number, number]`, and a readonly tuple is not assignable
 * to it.
 */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ *
 * Movement vs. rhythm
 *
 * These are two different things and must not be conflated.
 *
 * - Movement is travel and blur. `prefers-reduced-motion` exists to remove
 *   it, so under that preference it goes to zero.
 * - Rhythm is how long a sentence stays on screen before the next one
 *   arrives. That is reading time, not motion. Shortening it under
 *   `prefers-reduced-motion` would rush someone through a letter instead of
 *   protecting them, so rhythm is left alone.
 * ------------------------------------------------------------------ */

export interface MotionPrefs {
  reduced: boolean;
  /** Animation duration in seconds. Shortened, never removed. */
  dur: (seconds: number) => number;
  /** Travel distance in px. Removed entirely when motion is reduced. */
  px: (pixels: number) => number;
  /** Blur radius in px. Removed entirely when motion is reduced. */
  blur: (pixels: number) => number;
}

export function useMotionPrefs(): MotionPrefs {
  const reduced = useReducedMotion() ?? false;
  return {
    reduced,
    dur: (seconds) => (reduced ? Math.min(seconds, 0.45) : seconds),
    px: (pixels) => (reduced ? 0 : pixels),
    blur: (pixels) => (reduced ? 0 : pixels),
  };
}

/* ------------------------------------------------------------------ *
 * Reading rhythm
 *
 * Two knobs, because a letter that drags and a letter that rushes are
 * different problems and pulling one lever fixes only one of them.
 *
 * Measured on the first pass, the read ran 5:47 - of which only 157 seconds
 * were lines actually arriving. The other 55% was the letter sitting silent
 * with everything already said. That is what makes a slow piece feel tedious
 * rather than calm, so the two are now tuned apart.
 * ------------------------------------------------------------------ */

/** How quickly lines arrive. This is reading speed - raise it and she has to hurry. */
export const TEMPO = 0.72;

/**
 * How long the letter rests between one finished thought and the next.
 *
 * This is where the tedium lives, so it is cut much harder than TEMPO. The
 * crossfade between stanzas already supplies a beat of its own; the rest was
 * dead air.
 */
export const BREATH = 0.45;

/** Seconds a line is left alone before the next one arrives. */
export function readTime(text: string): number {
  const seconds = 1.2 + text.length * 0.038;
  return Math.min(Math.max(seconds, 2), 5.4) * TEMPO;
}

/** Breath left after the last line of a stanza, before it makes way. */
export const STANZA_HOLD = 1.4;

/** Delay before the first line of a stanza appears. */
export const STANZA_LEAD = 0.4;
