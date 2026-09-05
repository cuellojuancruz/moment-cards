import { useEffect, useState } from "react";
import { SceneShell } from "../shared/SceneShell";
import { ContinueButton } from "../shared/ContinueButton";
import { Plant } from "../shared/Plant";
import { Script, type Stanza } from "../shared/Script";

/**
 * The plant she has been half-seeing behind the last three scenes comes back
 * to the front and opens. No promise about the result — only about him.
 */
const STANZAS: Stanza[] = [
  {
    lead: 2.4,
    lines: [{ text: "Ahora sí.", weight: "display" }],
    hold: 2.4,
  },
  { lines: [{ text: "Cuando llegue ese momento, respirás." }], hold: 2.4 },
  { lines: [{ text: "Confiás en todo lo que hiciste." }], hold: 2.4 },
  { lines: [{ text: "Y das lo mejor de vos." }], hold: 2.8 },
  {
    lines: [{ text: "Pase lo que pase…", weight: "display", pause: 1.1 }],
    hold: 5.5,
  },
  {
    lines: [
      { text: "Quiero que recuerdes que ya estoy orgulloso de vos." },
      { text: "Porque sé todo lo que te esforzaste para llegar hasta acá.", pause: 0.8 },
    ],
  },
];

export function BloomScene({ onNext, plantStage }: { onNext: () => void; plantStage: number }) {
  const [settled, setSettled] = useState(false);
  const [stage, setStage] = useState(plantStage);

  // She arrives with the plant as she left it, and it opens in front of her.
  useEffect(() => {
    const timer = window.setTimeout(() => setStage(6), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <SceneShell tone="bloom">
      <Plant stage={stage} className="w-[var(--plant-bloom-w)]" />
      <Script stanzas={STANZAS} onSettled={() => setSettled(true)} />
      <ContinueButton show={settled} onClick={onNext} />
    </SceneShell>
  );
}
