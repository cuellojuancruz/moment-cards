import { useMemo } from "react";
import { motion } from "motion/react";
import { Flora } from "./Flora";
import { PawTrail } from "./PawTrail";
import { useMotionPrefs } from "./motion";
import type { Tone } from "./tone";

/* Deterministic scatter — the same on the server and in the browser, so
   nothing shifts on hydration. */
const spread = (i: number, step: number) => (i * step) % 100;

/** A leaf, for the things that fall more heavily than petals do. */
function Leaf() {
  return (
    <svg viewBox="0 0 24 40" fill="currentColor" aria-hidden className="h-full w-full">
      <path d="M12 0 C 22 12, 23 28, 12 40 C 1 28, 2 12, 12 0 Z" />
      <path d="M12 3 L12 37" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
    </svg>
  );
}

/**
 * The air of a scene: pressed flowers at the edges, a soft bloom of light
 * behind the words, slow dust, what falls, and — twice in the whole letter —
 * a cat crossing the bottom of the frame.
 *
 * Everything here is decorative and every layer is switched per scene from
 * `tone.ts`, so the bare scenes stay bare. Under `prefers-reduced-motion` the
 * light and the silhouettes stay and all the movement goes.
 */
export function Atmosphere({ tone }: { tone: Tone }) {
  const m = useMotionPrefs();

  const dustCount = Math.round(14 + tone.dust * 18);
  const petalCount = tone.petals > 0 ? Math.round(5 + tone.petals * 9) : 0;
  const leafCount = tone.leaves > 0 ? Math.round(3 + tone.leaves * 7) : 0;

  const dust = useMemo(
    () =>
      Array.from({ length: dustCount }, (_, i) => ({
        id: i,
        left: spread(i, 37.4),
        top: spread(i, 61.7),
        size: 1.4 + (i % 4) * 0.85,
        duration: 13 + (i % 6) * 3.5,
        delay: (i % 7) * 1.4,
        rise: 18 + (i % 5) * 8,
      })),
    [dustCount],
  );

  const falling = useMemo(
    () =>
      Array.from({ length: petalCount + leafCount }, (_, i) => {
        const isLeaf = i >= petalCount;
        const k = isLeaf ? i - petalCount : i;
        return {
          id: i,
          isLeaf,
          left: 4 + spread(k * (isLeaf ? 3 : 2) + (isLeaf ? 1 : 0), 23.7) * 0.92,
          // leaves are heavier: they take longer and tumble further
          duration: (isLeaf ? 24 : 17) + (k % 5) * 4,
          delay: (k % 8) * (isLeaf ? 3.1 : 2.4),
          drift: (k % 2 === 0 ? 1 : -1) * (isLeaf ? 42 : 30),
          spin: (k % 2 === 0 ? 1 : -1) * (isLeaf ? 320 : 150),
          size: isLeaf ? 1.4 + (k % 3) * 0.45 : 0.55 + (k % 3) * 0.22,
        };
      }),
    [petalCount, leafCount],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* The bloom of light. This, not the background colour, is what makes
          the late scenes feel luminous. */}
      <div
        className="absolute left-1/2 top-[38%] h-[135vmax] w-[135vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, color-mix(in oklab, var(--primary) ${(6 + tone.glow * 26).toFixed(1)}%, transparent) 0%, transparent 65%)`,
        }}
      />

      <Flora density={tone.flora} />

      {dust.map((d) =>
        m.reduced ? (
          <span
            key={d.id}
            className="absolute rounded-full bg-primary"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size,
              opacity: 0.18 + tone.glow * 0.16,
            }}
          />
        ) : (
          <motion.span
            key={d.id}
            className="absolute rounded-full bg-primary"
            style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size }}
            initial={{ opacity: 0.08, y: 0 }}
            animate={{
              y: [0, -d.rise, 0],
              opacity: [0.08, 0.16 + tone.glow * 0.34, 0.08],
            }}
            transition={{
              duration: d.duration,
              delay: d.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ),
      )}

      {!m.reduced &&
        falling.map((f) => (
          <motion.span
            key={`f-${f.id}`}
            className={`absolute top-0 block ${f.isLeaf ? "text-[color-mix(in_oklab,var(--accent)_70%,white)]" : ""}`}
            style={{
              left: `${f.left}%`,
              width: `${f.size}vmin`,
              height: `${f.size * (f.isLeaf ? 1.65 : 1.6)}vmin`,
              ...(f.isLeaf
                ? {}
                : {
                    borderRadius: "60% 40% 60% 40%",
                    background: "color-mix(in oklab, var(--accent) 60%, white)",
                  }),
            }}
            initial={{ y: "-12vh", opacity: 0, rotate: 0 }}
            animate={{
              y: ["-12vh", "110vh"],
              x: [0, f.drift, 0],
              rotate: [0, f.spin],
              opacity: [0, f.isLeaf ? 0.42 : 0.5, f.isLeaf ? 0.42 : 0.5, 0],
            }}
            transition={{
              duration: f.duration,
              delay: f.delay,
              repeat: Infinity,
              ease: "linear",
              opacity: {
                duration: f.duration,
                delay: f.delay,
                repeat: Infinity,
                times: [0, 0.12, 0.82, 1],
              },
            }}
          >
            {f.isLeaf ? <Leaf /> : null}
          </motion.span>
        ))}

      <PawTrail show={tone.paws} />

      {/* Keeps the words off the brightest part of the bloom. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_45%,transparent_35%,rgba(0,0,0,0.28)_100%)]" />
    </div>
  );
}
