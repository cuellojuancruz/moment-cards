import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE, useMotionPrefs } from "./motion";

/**
 * The only control in the whole experience.
 *
 * It reserves its space whether or not it is showing, so that a scene never
 * jumps at the moment she is finishing a sentence. And if a long scene on a
 * short phone has pushed it below the fold, it brings itself into view — she
 * should never have to guess that there is something further down.
 */
export function ContinueButton({
  label = "seguir",
  onClick,
  show,
  variant = "quiet",
}: {
  label?: string;
  onClick: () => void;
  show: boolean;
  variant?: "quiet" | "invitation";
}) {
  const m = useMotionPrefs();
  const button = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!show) return;
    // After the entrance has begun, and only if it is actually out of sight.
    const timer = window.setTimeout(() => {
      button.current?.scrollIntoView({
        block: "nearest",
        behavior: m.reduced ? "auto" : "smooth",
      });
    }, 500);
    return () => window.clearTimeout(timer);
  }, [show, m.reduced]);

  return (
    <div className="flex min-h-[var(--control-h)] w-full items-center justify-center">
      <AnimatePresence>
        {show && (
          <motion.button
            ref={button}
            type="button"
            onClick={onClick}
            initial={{ opacity: 0, y: m.px(10) }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: m.dur(1.3), ease: EASE }}
            whileTap={{ scale: m.reduced ? 1 : 0.97 }}
            className={
              variant === "invitation"
                ? "rounded-full bg-primary px-9 py-4 text-[length:calc(var(--fs-small)+0.15rem)] font-medium tracking-wide text-primary-foreground lg:px-11 shadow-[0_14px_44px_-14px_color-mix(in_oklab,var(--primary)_75%,transparent)] transition-colors outline-none hover:bg-[color-mix(in_oklab,var(--primary)_88%,white)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
                : "rounded-full border border-primary/25 px-8 py-4 text-[length:var(--fs-small)] uppercase tracking-[0.32em] text-foreground/70 lg:px-10 transition-colors outline-none hover:border-primary/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
            }
          >
            {label}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
