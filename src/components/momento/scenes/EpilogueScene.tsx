import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { SceneShell } from "../shared/SceneShell";
import { Flower } from "../shared/Flower";
import { Polaroid } from "../shared/Polaroid";
import { Script, type Stanza } from "../shared/Script";
import { EASE, useMotionPrefs } from "../shared/motion";
import { EPILOGUE_CATS } from "@/lib/momento/photos";

/**
 * The end.
 *
 * One stanza, so all three lines stay on the screen together — nothing is
 * taken away from her here. Then the cats come back, quietly, and that is
 * where it rests. No replay, no share, no way back to a home page: this is a
 * letter, and letters just end.
 */
const STANZAS: Stanza[] = [
  {
    lead: 1.8,
    lines: [
      { text: "Siempre voy a estar con vos.", weight: "display" },
      { text: "Sos la mejor.", weight: "display", pause: 1.3 },
      { text: "Te amo. 💙", weight: "hero", pause: 1.5 },
    ],
  },
];

export function EpilogueScene() {
  const m = useMotionPrefs();
  const [settled, setSettled] = useState(false);
  const cats = useRef<HTMLDivElement | null>(null);

  // There is no button here to carry her down, so the last thing on screen
  // brings itself into view instead.
  useEffect(() => {
    if (!settled) return;
    const timer = window.setTimeout(() => {
      cats.current?.scrollIntoView({
        block: "nearest",
        behavior: m.reduced ? "auto" : "smooth",
      });
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [settled, m.reduced]);

  return (
    <SceneShell tone="dawn">
      {/* Deliberately small: the flower, the three lines and the cats all have
          to rest on one screen. Nothing at the end should need scrolling. */}
      <Flower className="w-[var(--flower-w)]" />
      <Script stanzas={STANZAS} onSettled={() => setSettled(true)} />

      {settled && (
        <motion.div
          ref={cats}
          className="flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: m.dur(1.4), ease: EASE }}
        >
          {EPILOGUE_CATS.map((photo, i) => {
            // Width from each picture's own proportions, so the three prints
            // come out the same height however differently they were shot.
            const aspect = photo.width / photo.height;
            return (
              <div
                key={photo.src}
                style={{
                  width: `calc(var(--strip-h) * ${aspect.toFixed(4)})`,
                  marginLeft: i === 0 ? 0 : "-0.6rem",
                }}
              >
                <Polaroid photo={photo} tilt={i % 2 === 0 ? -6 : 5} delay={0.6 + i * 1.7} />
              </div>
            );
          })}
        </motion.div>
      )}
    </SceneShell>
  );
}
