import { motion } from "motion/react";
import { EASE, useMotionPrefs } from "./motion";
import type { Photo } from "@/lib/momento/photos";

/**
 * A printed photograph, mounted and left slightly crooked, the way a photo
 * ends up when someone actually put it there.
 *
 * The frame is built from the picture's own proportions, so nothing is ever
 * stretched and nothing is ever cropped away.
 *
 * Its size comes from `--photo-h`, a target *height*, multiplied by the
 * picture's own aspect. Her photographs are all different shapes — one
 * landscape, two tall 9:16 — and sizing them all to the same width would make
 * the tall ones twice as high as the wide one and push the way onward off the
 * bottom of the phone. Working from a height lands every print at the same
 * size on screen, whatever shape it is.
 *
 * `--photo-h` is measured in dvh on a phone, where height is the constraint
 * that binds, and becomes a generous fixed size on a desktop, where it is not.
 */
export function Polaroid({
  photo,
  delay = 0,
  tilt = -2,
  className = "",
  eager = false,
}: {
  photo: Photo;
  delay?: number;
  tilt?: number;
  className?: string;
  eager?: boolean;
}) {
  const m = useMotionPrefs();
  const aspect = photo.width / photo.height;

  return (
    <motion.figure
      initial={{
        opacity: 0,
        y: m.px(30),
        rotate: m.reduced ? tilt : tilt * 2.4,
        filter: `blur(${m.blur(9)}px)`,
      }}
      animate={{ opacity: 1, y: 0, rotate: tilt, filter: "blur(0px)" }}
      transition={{ duration: m.dur(1.5), delay, ease: EASE }}
      style={{ maxWidth: `min(var(--photo-cap), calc(var(--photo-h) * ${aspect.toFixed(4)}))` }}
      className={`mx-auto w-full rounded-[1.15rem] bg-[color-mix(in_oklab,white_86%,var(--primary))] p-2.5 shadow-[0_28px_64px_-22px_rgba(3,8,24,0.85)] ${className}`}
    >
      <div className="overflow-hidden rounded-[0.8rem]" style={{ aspectRatio: photo.ratio }}>
        <motion.img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover"
          initial={{ scale: m.reduced ? 1 : 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: m.dur(4), delay, ease: EASE }}
        />
      </div>
    </motion.figure>
  );
}
