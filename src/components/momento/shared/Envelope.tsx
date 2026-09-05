import { useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { EASE, useMotionPrefs } from "./motion";

/* The pocket's V and the flap's point meet exactly at 62% of the height, so
   the paper reads as one folded sheet rather than two shapes overlapping. */
const POCKET = "polygon(0% 18%, 50% 62%, 100% 18%, 100% 100%, 0% 100%)";
const FLAP = "polygon(0% 0%, 100% 0%, 50% 100%)";

/** How far she has to pull the flap for the envelope to be open. */
const PULL = 130;
/** Past this much of the pull, letting go finishes the job rather than snapping back. */
const COMMIT = 0.42;

/** A sprig pressed into the paper. Small, off to one side, easy to miss. */
function Sprig({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 60 70" aria-hidden className={className} fill="none">
      <path
        d="M30 68 C 28 50, 30 30, 34 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* leaves: rotations past 180° point back down the left-hand side */}
      {(
        [
          [30, 54, 206],
          [31, 44, 32],
          [32, 34, 210],
          [33, 24, 28],
        ] as const
      ).map(([x, y, rotation], i) => (
        <path
          key={i}
          d="M0 0 C 5 -6, 14 -5, 18 0 C 14 5, 5 6, 0 0 Z"
          fill="currentColor"
          transform={`translate(${x} ${y}) rotate(${rotation})`}
          opacity="0.85"
        />
      ))}
    </svg>
  );
}

/**
 * A sealed letter that she has to open herself.
 *
 * The flap does not open on a tap — she drags it upwards, and everything
 * follows her finger: the seal gives first, then the flap falls back, then
 * the page climbs out of the pocket. Letting go before halfway springs it
 * shut again.
 *
 * A single motion value drives all of it, which is what keeps the pieces
 * moving together instead of merely at the same time.
 *
 * Tapping does not open it — that would make the gesture optional — but it
 * does nudge the flap so the envelope shows her what it wants. Keyboard users
 * get Enter or Space, since a drag cannot be the only way in.
 */
export function Envelope({ armed, onOpen }: { armed: boolean; onOpen: () => void }) {
  const m = useMotionPrefs();
  const [opened, setOpened] = useState(false);
  // The envelope breathes while she reads, and steadies the moment she takes
  // hold of it — a target that is drifting under the finger makes the drag
  // feel imprecise.
  const [held, setHeld] = useState(false);
  const dragging = useRef(false);

  // `pull` runs from 0 (sealed) to -PULL (open) as she drags upwards, and
  // everything else is read off it. Input ranges are written ascending — most
  // negative first — which is the order interpolation expects.
  const pull = useMotionValue(0);
  const flap = useTransform(pull, [-PULL, 0], [-172, 0]);
  const sealOpacity = useTransform(pull, [-PULL * 0.22, 0], [0, 1]);
  const sealScale = useTransform(pull, [-PULL * 0.22, 0], [0.72, 1]);
  const halo = useTransform(pull, [-PULL, 0], [0.8, 0.18]);
  const pageY = useTransform(pull, [-PULL, -PULL * 0.45], [-46, 0]);
  const pageOpacity = useTransform(pull, [-PULL * 0.7, -PULL * 0.35], [1, 0]);

  const paper = "color-mix(in oklab, var(--primary) 27%, var(--card))";
  const paperLit = "color-mix(in oklab, var(--primary) 36%, var(--card))";

  const open = () => {
    if (opened) return;
    setOpened(true);
    animate(pull, -PULL, { duration: m.reduced ? 0.3 : 0.8, ease: EASE });
    onOpen();
  };

  /** Shows her that the flap moves, without doing the opening for her. */
  const nudge = () => {
    if (opened || !armed) return;
    animate(pull, [0, -24, 0], { duration: m.reduced ? 0.4 : 0.9, ease: EASE });
  };

  return (
    <div className="relative mx-auto w-[var(--envelope-w)]">
      <motion.div
        aria-hidden
        className="absolute -inset-12 rounded-full blur-3xl"
        style={{
          background: "color-mix(in oklab, var(--primary) 40%, transparent)",
          opacity: halo,
        }}
      />

      <motion.div
        className="relative aspect-[320/216] w-full"
        style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        animate={m.reduced || opened || held ? { y: 0 } : { y: [0, -7, 0] }}
        transition={
          m.reduced || opened || held
            ? { duration: 0.4, ease: EASE }
            : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* back of the envelope */}
        <div
          className="absolute inset-0 rounded-[0.85rem] shadow-[0_34px_74px_-26px_rgba(2,6,20,0.9)]"
          style={{ background: paper }}
        />

        {/* the page inside — the faint rules are what make a blank rectangle
            read as something written rather than a white card */}
        <motion.div
          aria-hidden
          className="absolute inset-x-8 bottom-6 top-7 flex flex-col justify-start gap-[0.45rem] rounded-[0.4rem] px-4 pt-5"
          style={{
            background: "color-mix(in oklab, white 90%, var(--primary))",
            y: pageY,
            opacity: pageOpacity,
          }}
        >
          {[86, 96, 74, 90, 52].map((width, i) => (
            <span
              key={i}
              className="block h-[2px] rounded-full"
              style={{
                width: `${width}%`,
                background: "color-mix(in oklab, var(--primary) 42%, transparent)",
              }}
            />
          ))}
        </motion.div>

        {/* the front pocket, which the page rises out from behind */}
        <div
          className="absolute inset-0 rounded-[0.85rem] text-[color-mix(in_oklab,var(--accent)_70%,white)]"
          style={{ background: paperLit, clipPath: POCKET }}
        >
          <Sprig className="absolute bottom-3 left-4 h-14 w-12 opacity-25" />
          <Sprig className="absolute bottom-4 right-5 h-10 w-9 -scale-x-100 opacity-[0.18]" />
        </div>

        {/* the flap, following her finger */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[62%] origin-top rounded-t-[0.85rem]"
          style={{
            background: paperLit,
            clipPath: FLAP,
            backfaceVisibility: "visible",
            rotateX: flap,
          }}
        />

        {/* The seal: one of her cats, stamped into the wax. It gives as soon
            as she starts pulling.

            Sized as a share of the envelope rather than a fixed 56px, so it
            keeps its proportion when the envelope grows on a desktop. The
            drawing is engraved line-work rather than a filled emoji — at this
            size that is the difference between a monogram and a sticker. */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-[56%] flex aspect-square w-[17.5%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_rgba(2,6,20,0.9)]"
          style={{ opacity: sealOpacity, scale: sealScale }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[57%] w-[57%]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            {/* ears */}
            <path d="M6.0 9.6 L5.6 3.9 L10.4 6.4" fill="currentColor" strokeWidth="1" />
            <path d="M18.0 9.6 L18.4 3.9 L13.6 6.4" fill="currentColor" strokeWidth="1" />
            <ellipse cx="12" cy="13.4" rx="7.7" ry="6.8" />
            {/* eyes, closed and curved — that is what makes it a smile */}
            <path d="M8.1 12.7 q1.5 -1.8 3.0 0" />
            <path d="M12.9 12.7 q1.5 -1.8 3.0 0" />
            {/* the little w of a cat's mouth */}
            <path d="M12 15.3 C 12 17.0, 10.5 17.2, 9.9 16.2" />
            <path d="M12 15.3 C 12 17.0, 13.5 17.2, 14.1 16.2" />
            <path d="M11.05 14.25 h1.9 L12 15.35 Z" fill="currentColor" strokeWidth="0.7" />
            <g strokeWidth="0.95" opacity="0.8">
              <path d="M1.2 12.4 L4.7 13.3" />
              <path d="M1.4 15.6 L4.9 14.9" />
              <path d="M22.8 12.4 L19.3 13.3" />
              <path d="M22.6 15.6 L19.1 14.9" />
            </g>
          </svg>
        </motion.div>

        {/* what she actually grabs: the whole flap, invisible */}
        <motion.div
          drag={armed && !opened ? "y" : false}
          dragConstraints={{ top: -PULL, bottom: 0 }}
          dragElastic={0.06}
          dragMomentum={false}
          style={{ y: pull }}
          onDragStart={() => {
            dragging.current = true;
            setHeld(true);
          }}
          onDragEnd={(_, info) => {
            const committed = pull.get() <= -PULL * COMMIT || info.velocity.y < -340;
            if (committed) open();
            else {
              animate(pull, 0, { type: "spring", stiffness: 260, damping: 26 });
              setHeld(false);
            }
            window.setTimeout(() => {
              dragging.current = false;
            }, 80);
          }}
          onTap={() => {
            if (!dragging.current) nudge();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              open();
            }
          }}
          role="button"
          tabIndex={armed && !opened ? 0 : -1}
          aria-label="Deslizá la solapa hacia arriba para abrir el sobre"
          className={`absolute inset-x-0 top-0 z-30 h-[64%] rounded-t-[0.85rem] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-transparent ${
            armed && !opened ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
          }`}
        />
      </motion.div>
    </div>
  );
}

/** The cue. It is the only thing telling her the envelope wants a gesture. */
export function PullHint({ show }: { show: boolean }) {
  const m = useMotionPrefs();
  return (
    <motion.div
      aria-hidden
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: m.dur(1.2), ease: EASE }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-primary lg:h-6 lg:w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={m.reduced || !show ? { y: 0 } : { y: [0, -7, 0] }}
        transition={{ duration: 2.1, repeat: m.reduced || !show ? 0 : Infinity, ease: "easeInOut" }}
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </motion.svg>
      <p className="text-[length:var(--fs-small)] uppercase tracking-[0.32em] text-foreground/60">
        deslizá la solapa
      </p>
    </motion.div>
  );
}
