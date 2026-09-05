import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SceneShell } from "../shared/SceneShell";
import { Envelope, PullHint } from "../shared/Envelope";
import { Script, type Stanza } from "../shared/Script";
import { EASE, useMotionPrefs } from "../shared/motion";

/**
 * The opening.
 *
 * The envelope is the first thing on the screen and the only way past it is
 * her own hand: she drags the flap up. There is no button here, because the
 * gesture is the point — the experience should begin with her opening
 * something, not with her pressing "start".
 *
 * The four opening lines run underneath it while it is still sealed, and the
 * flap only becomes draggable once they have all been said.
 */
const STANZAS: Stanza[] = [
  {
    lead: 1.3,
    lines: [
      { text: "Antes de que sigas…", weight: "display" },
      { text: "hay algo que quiero decirte.", weight: "display", pause: 1.3 },
    ],
    hold: 2.2,
  },
  {
    lines: [
      { text: "Esto es para vos." },
      { text: "Porque sé que estos días no están siendo fáciles.", pause: 0.9 },
    ],
  },
];

export function OpeningScene({ onNext }: { onNext: () => void }) {
  const m = useMotionPrefs();
  const [settled, setSettled] = useState(false);
  const [opening, setOpening] = useState(false);

  // Once she has it open, let her look at the page for a moment before the
  // letter itself begins.
  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(onNext, m.reduced ? 900 : 2400);
    return () => window.clearTimeout(timer);
  }, [opening, onNext, m.reduced]);

  return (
    <SceneShell tone="letter">
      <Envelope armed={settled && !opening} onOpen={() => setOpening(true)} />

      <motion.div
        className="flex w-full flex-col items-center gap-[var(--gap)]"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: m.dur(0.8), ease: EASE }}
      >
        <Script stanzas={STANZAS} onSettled={() => setSettled(true)} />
        <div className="flex min-h-[var(--control-h)] items-center justify-center">
          <PullHint show={settled && !opening} />
        </div>
      </motion.div>
    </SceneShell>
  );
}
