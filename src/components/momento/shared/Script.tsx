import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "./Reveal";
import { BREATH, EASE, readTime, STANZA_HOLD, STANZA_LEAD, TEMPO, useMotionPrefs } from "./motion";

/* ------------------------------------------------------------------ *
 * The stanza engine.
 *
 * Lines arrive one at a time and stay on screen together for as long as they
 * belong to the same thought. Only once that whole thought has been complete
 * for a breath does it make way for the next one.
 *
 * Two rules make this safe to read:
 *   - what leaves the screen is always a finished thought, never a line that
 *     might still be being read;
 *   - the last stanza of a scene never leaves on its own. It waits for her.
 * ------------------------------------------------------------------ */

export type LineWeight = "body" | "display" | "hero";

export interface Line {
  text: string;
  weight?: LineWeight;
  /** Extra silence held before this line arrives. */
  pause?: number;
}

export interface Stanza {
  lines: Line[];
  /** Something shown above the lines — a photograph, mostly. */
  media?: ReactNode;
  /** Breath after the last line before the stanza makes way. */
  hold?: number;
  /** Silence before the first line arrives. */
  lead?: number;
}

interface Plan {
  delays: number[];
  /** When the last line of the stanza has landed. */
  settled: number;
  /** When the stanza makes way for the next one. */
  life: number;
}

function plan(stanza: Stanza): Plan {
  // The silence around a stanza - before its first line and after its last -
  // is scaled by BREATH as well as TEMPO, because that is the dead air.
  // A `pause` is different: it sits *inside* a thought, holding a beat before
  // a line lands, so it moves with reading speed alone.
  let t = (stanza.lead ?? STANZA_LEAD) * TEMPO * BREATH;
  const delays = stanza.lines.map((line) => {
    t += (line.pause ?? 0) * TEMPO;
    const at = t;
    t += readTime(line.text);
    return at;
  });
  return {
    delays,
    settled: delays[delays.length - 1] ?? t,
    life: t + (stanza.hold ?? STANZA_HOLD) * TEMPO * BREATH,
  };
}

/* Sizes come from the same variables as the rest of the composition, so the
   type and the pictures grow together — and so they can answer to the height
   of the window as well as its width, which a width-only breakpoint cannot. */
const WEIGHTS: Record<LineWeight, string> = {
  body: "text-pretty text-[length:var(--fs-body)] leading-[1.75] text-foreground/85",
  display:
    "text-balance-tight font-[family-name:var(--font-display)] text-[length:var(--fs-display)] leading-[1.2] text-foreground",
  hero: "text-balance-tight font-[family-name:var(--font-display)] text-[length:var(--fs-hero)] leading-[1.08] text-foreground",
};

/**
 * One stanza on screen.
 *
 * Its clock starts in its own mount effect rather than in the parent, because
 * `AnimatePresence mode="wait"` only mounts it once the previous stanza has
 * finished leaving. Timed from the parent instead, every stanza would lose the
 * length of that crossfade from the time it is actually readable.
 */
function StanzaView({
  stanza,
  schedule,
  isLast,
  onAdvance,
  onSettled,
  onVisible,
}: {
  stanza: Stanza;
  schedule: Plan;
  isLast: boolean;
  onAdvance: () => void;
  onSettled: () => void;
  onVisible: () => void;
}) {
  const m = useMotionPrefs();

  useEffect(() => {
    onVisible();
    const seconds = isLast ? schedule.settled + 0.8 : schedule.life;
    const timer = window.setTimeout(
      () => (isLast ? onSettled() : onAdvance()),
      Math.max(seconds, 0) * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [schedule, isLast, onAdvance, onSettled, onVisible]);

  return (
    <motion.div
      exit={{
        opacity: 0,
        y: m.px(-10),
        filter: `blur(${m.blur(7)}px)`,
        transition: { duration: m.dur(0.45), ease: EASE },
      }}
      className="flex w-full flex-col items-center gap-[var(--gap)]"
    >
      {stanza.media ? <div className="w-full">{stanza.media}</div> : null}
      {stanza.lines.length > 0 && (
        <div className="flex w-full flex-col gap-6">
          {stanza.lines.map((line, i) => (
            <Reveal
              key={i}
              delay={schedule.delays[i] ?? 0}
              y={line.weight && line.weight !== "body" ? 20 : 14}
              duration={line.weight === "hero" ? 2.1 : 1.5}
            >
              <p className={WEIGHTS[line.weight ?? "body"]}>{line.text}</p>
            </Reveal>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function Script({
  stanzas,
  onSettled,
  onStanza,
}: {
  stanzas: Stanza[];
  /** Fires once the final line of the final stanza has landed. */
  onSettled?: () => void;
  /** Fires with the index of each stanza as it takes the screen. */
  onStanza?: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const schedules = useMemo(() => stanzas.map(plan), [stanzas]);

  // Held in refs so that a caller re-creating these callbacks on every render
  // can never restart a running timer and skip someone forward mid-sentence.
  const settledRef = useRef(onSettled);
  const stanzaRef = useRef(onStanza);
  useEffect(() => {
    settledRef.current = onSettled;
    stanzaRef.current = onStanza;
  }, [onSettled, onStanza]);

  const advance = useCallback(() => setIndex((i) => i + 1), []);
  const settle = useCallback(() => settledRef.current?.(), []);
  const announce = useCallback(() => stanzaRef.current?.(index), [index]);

  const current = stanzas[index];
  const schedule = schedules[index];
  if (!current || !schedule) return null;

  return (
    <>
      {/* The letter, whole and in order, for anyone reading with a screen
          reader. The timed version below is decorative to them. */}
      <div className="sr-only">
        {stanzas.map((stanza, s) => (
          <p key={s}>{stanza.lines.map((line) => line.text).join(" ")}</p>
        ))}
      </div>

      <div aria-hidden className="w-full">
        <AnimatePresence mode="wait" initial={false}>
          <StanzaView
            key={index}
            stanza={current}
            schedule={schedule}
            isLast={index === stanzas.length - 1}
            onAdvance={advance}
            onSettled={settle}
            onVisible={announce}
          />
        </AnimatePresence>
      </div>
    </>
  );
}
