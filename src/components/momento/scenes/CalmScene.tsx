import { useState } from "react";
import { SceneShell } from "../shared/SceneShell";
import { ContinueButton } from "../shared/ContinueButton";
import { Script, type Stanza } from "../shared/Script";

/** Naming what she is feeling, before saying anything else. */
const STANZAS: Stanza[] = [
  {
    lead: 1.2,
    lines: [
      { text: "Sé que estás nerviosa." },
      { text: "Sé que llevás meses preparándote." },
      { text: "Esperando este momento." },
    ],
    hold: 1.8,
  },
  {
    lines: [{ text: "Y sé que probablemente tenés muchas cosas dando vueltas en la cabeza." }],
    hold: 2.2,
  },
  {
    lines: [
      { text: "Está bien.", weight: "display", pause: 0.8 },
      { text: "Está bien tener miedo." },
      { text: "Está bien estar nerviosa." },
      { text: "Eso no significa que no estés preparada.", pause: 0.7 },
    ],
    hold: 2.4,
  },
  {
    lines: [
      {
        text: "Solo quiero que por un momento dejes todo eso a un lado.",
        weight: "display",
        pause: 0.6,
      },
    ],
  },
];

export function CalmScene({ onNext }: { onNext: () => void }) {
  const [settled, setSettled] = useState(false);

  return (
    <SceneShell tone="calm">
      <Script stanzas={STANZAS} onSettled={() => setSettled(true)} />
      <ContinueButton show={settled} onClick={onNext} />
    </SceneShell>
  );
}
