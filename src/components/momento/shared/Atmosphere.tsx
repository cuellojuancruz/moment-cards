import { useMemo } from "react";
import { motion } from "motion/react";
import { useMotionScale } from "./motion";

type Props = {
  /** 0 = quiet night, 1 = luminous bloom */
  intensity?: number;
  petals?: boolean;
};

/** Slow drifting light dots, and optionally falling petals. */
export function Atmosphere({ intensity = 0.5, petals = false }: Props) {
  const scale = useMotionScale();
  const count = Math.round(12 + intensity * 12);

  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 37.4) % 100,
        top: (i * 61.7) % 100,
        size: 1.5 + (i % 4) * 0.9,
        duration: 12 + (i % 6) * 3,
        delay: (i % 7) * 1.1,
      })),
    [count],
  );

  const leaves = useMemo(
    () =>
      Array.from({ length: petals ? 10 : 0 }, (_, i) => ({
        id: i,
        left: 4 + ((i * 23) % 92),
        duration: 16 + (i % 5) * 4,
        delay: (i % 8) * 2.2,
        drift: i % 2 === 0 ? 28 : -34,
        rotate: i % 2 === 0 ? 120 : -140,
        size: 7 + (i % 3) * 3,
      })),
    [petals],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, color-mix(in oklab, var(--primary) ${8 + intensity * 22}%, transparent) 0%, transparent 68%)`,
        }}
      />
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-primary"
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size }}
          initial={{ opacity: 0.1 }}
          animate={{
            y: [0, -26 * scale, 0],
            opacity: [0.1, 0.15 + intensity * 0.4, 0.1],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {leaves.map((p) => (
        <motion.span
          key={`p-${p.id}`}
          className="absolute -top-8 block rounded-[60%_40%_60%_40%]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.5,
            background: "color-mix(in oklab, var(--accent) 65%, white)",
            opacity: 0.5,
          }}
          initial={{ y: -40, rotate: 0, opacity: 0 }}
          animate={{
            y: ["-6vh", "104vh"],
            x: [0, p.drift * scale, 0],
            rotate: [0, p.rotate * scale],
            opacity: [0, 0.55, 0.55, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}
