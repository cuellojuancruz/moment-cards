import { useState } from "react";
import { SceneShell } from "../shared/SceneShell";
import { ContinueButton } from "../shared/ContinueButton";
import { Script, type Stanza } from "../shared/Script";

/**
 * Not "you have to be strong" — she has heard that from everyone.
 * This is the evidence that she already was.
 */
const STANZAS: Stanza[] = [
  {
    lead: 1.3,
    lines: [{ text: "Nunca te vi rendirte.", weight: "hero" }],
    // The load-bearing lines carry a much larger hold than the rest, so that
    // cutting BREATH speeds up the letter without flattening its peaks.
    hold: 6,
  },
  {
    lines: [
      { text: "A pesar de todas las cosas que te tocó enfrentar…" },
      { text: "Siempre encontraste la forma de seguir.", pause: 0.9 },
    ],
    hold: 2,
  },
  {
    lines: [
      { text: "Llevás meses preparándote." },
      { text: "No llegaste hasta acá por casualidad.", pause: 0.6 },
    ],
    hold: 2.2,
  },
  {
    lines: [
      { text: "Todo el esfuerzo que hiciste cuenta." },
      { text: "Todo lo que aprendiste cuenta." },
      { text: "Todas las veces que seguiste adelante aunque estabas cansada cuentan." },
    ],
    hold: 2.4,
  },
  {
    lines: [{ text: "Y eso es algo que admiro muchísimo de vos.", weight: "display", pause: 0.7 }],
  },
];

export function StrengthScene({ onNext }: { onNext: () => void }) {
  const [settled, setSettled] = useState(false);

  return (
    <SceneShell tone="strength">
      <Script stanzas={STANZAS} onSettled={() => setSettled(true)} />
      <ContinueButton show={settled} onClick={onNext} />
    </SceneShell>
  );
}
