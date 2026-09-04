import { motion } from "motion/react";
import { EASE, useMotionScale } from "./motion";

export function Polaroid({
  src,
  alt,
  caption,
  delay = 0,
  tilt = -2,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  delay?: number;
  tilt?: number;
  className?: string;
}) {
  const s = useMotionScale();
  return (
    <motion.figure
      initial={{ opacity: 0, y: 34 * s, rotate: tilt * 2 * s, filter: `blur(${8 * s}px)` }}
      animate={{ opacity: 1, y: 0, rotate: tilt * s, filter: "blur(0px)" }}
      transition={{ duration: 1.3 * s, delay: delay * s, ease: EASE }}
      className={`mx-auto w-full max-w-[19rem] rounded-2xl bg-card/80 p-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-border/60 backdrop-blur-sm ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        width={1024}
        height={1280}
        loading="lazy"
        className="aspect-[4/5] w-full rounded-xl object-cover"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3 * s, delay: delay * s, ease: EASE }}
      />
      {caption && (
        <figcaption className="pt-3 font-[family-name:var(--font-display)] text-lg italic text-foreground/80">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
