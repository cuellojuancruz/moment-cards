import { motion } from "motion/react";
import { EASE, useMotionScale } from "./motion";

export function ContinueButton({
  label = "Seguir",
  delay = 0,
  onClick,
  variant = "ghost",
}: {
  label?: string;
  delay?: number;
  onClick: () => void;
  variant?: "ghost" | "solid";
}) {
  const scale = useMotionScale();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 * scale }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1 * scale, delay: delay * scale, ease: EASE }}
      className="flex justify-center pt-2"
    >
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1 + 0.035 * scale }}
        whileTap={{ scale: 1 - 0.02 * scale }}
        transition={{ duration: 0.4 }}
        className={
          variant === "solid"
            ? "rounded-full bg-primary px-9 py-4 text-sm font-medium tracking-wide text-primary-foreground shadow-[0_10px_40px_-12px_color-mix(in_oklab,var(--primary)_70%,transparent)] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            : "rounded-full border border-primary/45 bg-primary/5 px-8 py-3.5 text-sm tracking-wide text-foreground/90 outline-none backdrop-blur-sm transition-colors hover:bg-primary/15 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        }
      >
        {label}
      </motion.button>
    </motion.div>
  );
}
