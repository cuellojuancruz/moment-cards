import { useState } from "react";
import { SceneShell } from "../shared/SceneShell";
import { ContinueButton } from "../shared/ContinueButton";
import { PlantBackdrop } from "../shared/Plant";
import { Script, type Stanza } from "../shared/Script";

/** The centre of the whole thing. Everything before this was leading here. */
const STANZAS: Stanza[] = [
  {
    lead: 1.5,
    lines: [{ text: "Quiero que cuando llegue ese momento recuerdes algo." }],
    hold: 2.4,
  },
  {
    lines: [{ text: "No hay nada que no puedas lograr.", weight: "hero", pause: 1 }],
    // The single most important line in the letter. It gets the longest rest.
    hold: 7,
  },
  {
    lines: [{ text: "Siempre pudiste con todo.", weight: "display" }],
    hold: 2.6,
  },
  {
    lines: [{ text: "Y siempre vas a poder.", weight: "display" }],
    hold: 5,
  },
  {
    lines: [
      { text: "Confío en vos." },
      { text: "Creo en vos." },
      { text: "Y estoy increíblemente orgulloso de la persona que sos.", pause: 0.7 },
    ],
    hold: 2.8,
  },
  {
    lines: [{ text: "Sos la mejor. 💙", weight: "hero", pause: 0.8 }],
    hold: 6,
  },
  {
    lines: [{ text: "Te amo.", weight: "hero", pause: 0.8 }],
  },
];

export function MessageScene({ onNext, plantStage }: { onNext: () => void; plantStage: number }) {
  const [settled, setSettled] = useState(false);

  return (
    <SceneShell tone="message" backdrop={<PlantBackdrop stage={plantStage} />}>
      <Script stanzas={STANZAS} onSettled={() => setSettled(true)} />
      <ContinueButton show={settled} onClick={onNext} />
    </SceneShell>
  );
}
