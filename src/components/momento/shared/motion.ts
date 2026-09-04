import { useReducedMotion } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Global rhythm: how long each revealed line waits before the next one. */
export const LINE_GAP = 1.9;

export type Line = {
  text: string;
  /** Extra pause (in seconds) added *before* this line appears. */
  pause?: number;
  /** Gives the line more visual weight. */
  emphasis?: boolean;
};

/** Returns the absolute delay (in seconds) for each line. */
export function lineDelays(lines: Line[], start = 0.4, gap = LINE_GAP): number[] {
  let t = start;
  return lines.map((line) => {
    t += line.pause ?? 0;
    const at = t;
    t += gap;
    return at;
  });
}

export function totalDelay(lines: Line[], start = 0.4, gap = LINE_GAP): number {
  const delays = lineDelays(lines, start, gap);
  return (delays[delays.length - 1] ?? start) + gap * 0.75;
}

/** Scales every delay/duration down to near-zero when motion is reduced. */
export function useMotionScale(): number {
  const reduced = useReducedMotion();
  return reduced ? 0.12 : 1;
}
