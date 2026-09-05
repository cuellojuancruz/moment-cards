import { useState } from "react";
import { SceneShell } from "../shared/SceneShell";
import { ContinueButton } from "../shared/ContinueButton";
import { Plant } from "../shared/Plant";
import { Script, type Stanza } from "../shared/Script";

/** How grown the plant is by the time each stanza is on screen. */
const STAGE_AT = [0, 1, 2, 4, 5, 5, 5, 5, 5];

const STANZAS: Stanza[] = [
  {
    lead: 1.4,
    lines: [{ text: "Hay cosas que necesitan tiempo." }],
    hold: 1.8,
  },
  { lines: [{ text: "Tiempo para aprender." }], hold: 1.6 },
  { lines: [{ text: "Tiempo para equivocarse." }], hold: 1.6 },
  { lines: [{ text: "Tiempo para volver a intentarlo." }], hold: 1.8 },
  { lines: [{ text: "Y tiempo para florecer.", weight: "display" }], hold: 2.6 },
  { lines: [{ text: "Vos también estás creciendo.", weight: "display" }], hold: 2 },
  {
    lines: [
      { text: "Todo lo que estudiaste." },
      { text: "Todo lo que practicaste." },
      { text: "Todo lo que superaste." },
      { text: "Todo eso forma parte de vos.", pause: 0.7 },
    ],
    hold: 2.4,
  },
  {
    lines: [{ text: "Quizás todavía no puedas ver todo lo que has crecido." }],
    hold: 2.2,
  },
  {
    lines: [{ text: "Pero yo sí.", weight: "hero", pause: 0.9 }],
  },
];

/**
 * The plant is the argument: nothing that grows does it visibly, and none of
 * it is wasted time.
 */
export function GrowthScene({
  onNext,
  onStage,
}: {
  onNext: () => void;
  /** Lets the plant keep growing behind the scenes that follow. */
  onStage: (stage: number) => void;
}) {
  const [settled, setSettled] = useState(false);
  const [stage, setStage] = useState(0);

  return (
    <SceneShell tone="green">
      <Plant stage={stage} className="w-[var(--plant-w)]" />
      <Script
        stanzas={STANZAS}
        onStanza={(index) => {
          const next = STAGE_AT[index] ?? 5;
          setStage(next);
          onStage(next);
        }}
        onSettled={() => setSettled(true)}
      />
      <ContinueButton show={settled} onClick={onNext} />
    </SceneShell>
  );
}
