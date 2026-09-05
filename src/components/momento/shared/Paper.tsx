import { motion } from "motion/react";
import { EASE, useMotionPrefs } from "./motion";

/* ------------------------------------------------------------------ *
 * The sheet she pulled out of the envelope.
 *
 * It closes a gap in the story: the opening ends with a page climbing out of
 * an envelope, and until now that page then vanished and the words appeared
 * on nothing. This is that page, still there, being written on.
 *
 * It is warm, not white. Two reasons, and the second is the real one:
 *
 * A white sheet on a blue night inverts the piece. The whole letter is light
 * text on dark blue and the colour curve lives in that background; a white
 * card behind the words turns the evening into a decorative border and the big
 * lines stop emerging out of the dark. Warmth keeps the values where they are
 * and separates the paper from the night by hue instead.
 *
 * And a warm sheet says something the white one cannot: it is the one warm
 * thing in a cold night. That is the whole letter in a single object.
 *
 * The catch is that a flat warm wash over blue averages out to grey — warm and
 * cold cancel. So the paper is not tinted, it is *lit*: a faint body that fades
 * downward, a pool of light across the top of the sheet, and a little of that
 * light spilling past the edge onto the scene. That is what keeps it warm
 * instead of khaki.
 *
 * The ruling is spaced to the body line-height, so the ordinary lines of the
 * letter sit on the lines of the page.
 * ------------------------------------------------------------------ */

/** Candlelight. The second is the same light where it hits the sheet square. */
const WARM = "oklch(0.9 0.115 79)";
const WARM_LIT = "oklch(0.95 0.09 84)";
/** The shoulder of a ruled line — see the ruling below for why it needs one. */
const SOFT = `color-mix(in oklab, ${WARM_LIT} 35%, transparent)`;

/**
 * How lit the paper is, as one number. 0 puts the sheet out; 1 is the tuned
 * value; past about 1.4 the sheet starts to own the frame and the blue loses.
 * Everything below scales off it, so this is the only knob worth turning.
 */
const WARMTH = 1;

/** The lines of the page, set to the height of a line of the letter. */
const RULE = "calc(var(--fs-body) * 1.75)";

const pct = (n: number) => `${Math.round(n * 100)}%`;

export function Paper({ show }: { show: boolean }) {
  const m = useMotionPrefs();
  if (!show) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        // Portrait, and derived from the column rather than fixed: a sheet
        // that comes out square reads as a card, not as paper. The dvh cap is
        // what keeps it sane in a short laptop window.
        width: "min(calc(var(--measure) + 1.5rem), 88vw)",
        height: "min(86dvh, calc(var(--measure) * 1.45))",
        rotate: -0.5,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: m.dur(1.8), ease: EASE }}
    >
      {/* Light spilling past the sheet onto the scene. Without it the paper is
          a rectangle laid on the picture; with it, the scene is lit by the
          same lamp the paper is. It sits outside the sheet's own clip. */}
      <div
        className="absolute -inset-[14%] blur-[38px] mix-blend-screen"
        style={{
          opacity: 0.2 * WARMTH,
          background: `radial-gradient(58% 46% at 50% 12%, ${WARM} 0%, transparent 72%)`,
        }}
      />

      <div
        className="absolute inset-0 overflow-hidden rounded-[3px]"
        style={{
          boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${WARM_LIT} ${pct(0.28 * WARMTH)}, transparent), 0 34px 60px -30px rgba(0,0,0,0.8)`,
        }}
      >
        {/* the sheet itself, fading downward the way a lit page does */}
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: 0.24 * WARMTH,
            background: `linear-gradient(178deg, ${WARM} 0%, ${WARM} 22%, color-mix(in oklab, ${WARM} 40%, transparent) 62%, color-mix(in oklab, ${WARM} 16%, transparent) 100%)`,
          }}
        />
        {/* Where the light actually falls: centred across the sheet, and high.
            Both halves of that are load-bearing.

            Centred, because a bright patch in one corner reads as a lopsided
            gradient rather than as a lit page. High, because the words are
            centred on the sheet — put the lamp on them and the paper under the
            text has to carry white type at close range. That is measured, not
            guessed: moving this pool down to the middle of the sheet costs
            about half the contrast (6.1:1 → 3.0:1), and no amount of dimming
            buys it back, because dimming takes the warmth with it. So the
            light sits above the words and is spent by the time it reaches
            them. Its vertical reach is the number that matters — widen `42%`
            and the contrast goes with it. */}
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: 0.5 * WARMTH,
            background: `radial-gradient(78% 42% at 50% 8%, ${WARM_LIT} 0%, color-mix(in oklab, ${WARM} 55%, transparent) 40%, transparent 76%)`,
          }}
        />
        {/* The ruling, inset the way a margin is.

            Each rule has soft shoulders instead of a hard 1px edge, and that
            is not a style choice. The sheet is rotated half a degree, so a
            rule climbs one device pixel every ~114px of its length. With a
            hard edge that crossing is a jump: on a 1x display the lines came
            out visibly broken into stepped segments, and the fractional line
            spacing made some rules bright and others nearly invisible. Ramping
            the edge over about a pixel turns the jump into a fade, and the
            lines render continuous at 1x, 1.25x, 1.5x and 2x. */}
        <div
          className="absolute inset-x-[7%] inset-y-[8%] mix-blend-screen"
          style={{
            opacity: 0.34 * WARMTH,
            backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent calc(${RULE} - 2.4px), ${SOFT} calc(${RULE} - 1.8px), ${WARM_LIT} calc(${RULE} - 1.2px), ${SOFT} calc(${RULE} - 0.6px), transparent ${RULE})`,
          }}
        />
      </div>
    </motion.div>
  );
}
