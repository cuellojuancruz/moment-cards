import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Atmosphere } from "./Atmosphere";
import { EASE, useMotionScale } from "./motion";

export function SceneShell({
  background,
  intensity = 0.4,
  petals = false,
  align = "center",
  children,
}: {
  /** CSS background for the scene (a soft blue gradient). */
  background: string;
  intensity?: number;
  petals?: boolean;
  align?: "center" | "start";
  children: ReactNode;
}) {
  const scale = useMotionScale();
  return (
    <motion.section
      initial={{ opacity: 0, filter: `blur(${10 * scale}px)`, scale: 1 - 0.015 * scale }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, filter: `blur(${10 * scale}px)`, scale: 1 + 0.02 * scale }}
      transition={{ duration: 1.1 * scale, ease: EASE }}
      className="absolute inset-0 overflow-x-hidden overflow-y-auto"
      style={{ background }}
    >
      <Atmosphere intensity={intensity} petals={petals} />
      <div
        className={`relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-md flex-col ${
          align === "center" ? "justify-center" : "justify-start"
        } gap-8 px-6 py-[max(3.5rem,env(safe-area-inset-top))] pb-[max(3.5rem,env(safe-area-inset-bottom))] text-center`}
      >
        {children}
      </div>
    </motion.section>
  );
}
