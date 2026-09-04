import { useState } from "react";
import { motion } from "motion/react";
import { SceneShell } from "../shared/SceneShell";
import { Lines } from "../shared/Lines";
import { ContinueButton } from "../shared/ContinueButton";
import { EASE, totalDelay, useMotionScale, type Line } from "../shared/motion";

const LINES: Line[] = [
  { text: "Esto es para vos." },
  { text: "Porque sé que estos días no están siendo fáciles.", pause: 0.8 },
];

export function EnvelopeScene({ onNext }: { onNext: () => void }) {
  const s = useMotionScale();
  const [opening, setOpening] = useState(false);

  const open = () => {
    setOpening(true);
    window.setTimeout(onNext, 1900 * s + 120);
  };

  return (
    <SceneShell
      background="radial-gradient(120% 90% at 50% 30%, oklch(0.25 0.075 256) 0%, oklch(0.14 0.05 258) 72%)"
      intensity={0.35}
      petals
    >
      <motion.div
        initial={{ opacity: 0, y: 26 * s }}
        animate={
          opening
            ? { opacity: 1, y: -10 * s, scale: 1 + 0.35 * s, filter: `blur(${3 * s}px)` }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: (opening ? 1.8 : 1.4) * s, ease: EASE }}
        className="relative mx-auto h-[196px] w-[290px] max-w-[82vw]"
      >
        <motion.div
          aria-hidden
          className="absolute -inset-10 rounded-full blur-2xl"
          style={{ background: "color-mix(in oklab, var(--primary) 35%, transparent)" }}
          animate={{ opacity: opening ? 0.9 : 0.25 }}
          transition={{ duration: 1.4 * s }}
        />
        <div className="absolute inset-0 rounded-[12px] bg-[color-mix(in_oklab,var(--primary)_22%,var(--card))] shadow-[0_30px_70px_-24px_rgba(0,0,0,0.8)] ring-1 ring-primary/30" />
        <motion.div
          aria-hidden
          className="absolute inset-x-6 bottom-4 top-8 rounded-[8px] bg-[color-mix(in_oklab,white_86%,var(--primary))]"
          initial={{ y: 0, opacity: 0 }}
          animate={opening ? { y: -46 * s, opacity: 1 } : { y: 0, opacity: 0 }}
          transition={{ duration: 1.5 * s, delay: 0.35 * s, ease: EASE }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[110px] origin-top"
          style={{
            background: "color-mix(in oklab, var(--primary) 30%, var(--card))",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateX: opening ? -168 : 0 }}
          transition={{ duration: 1.2 * s, ease: EASE }}
        />
        <div className="absolute left-1/2 top-[92px] flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden fill="currentColor">
            <path d="M12 4c2.2 0 4 1.8 4 4 0 3-4 8-4 8s-4-5-4-8c0-2.2 1.8-4 4-4z" opacity=".9" />
            <path d="M12 20c-3 0-6-1.4-7.5-3.5C7 15 9.6 15.4 12 17c2.4-1.6 5-2 7.5-.5C18 18.6 15 20 12 20z" />
          </svg>
        </div>
      </motion.div>

      {!opening && (
        <>
          <Lines lines={LINES} start={1.3} gap={2} />
          <ContinueButton
            label="Abrir"
            variant="solid"
            delay={totalDelay(LINES, 1.3, 2)}
            onClick={open}
          />
        </>
      )}
    </SceneShell>
  );
}
