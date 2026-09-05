import { useState } from "react";
import { SceneShell } from "../shared/SceneShell";
import { ContinueButton } from "../shared/ContinueButton";
import { Polaroid } from "../shared/Polaroid";
import { Script, type Stanza } from "../shared/Script";
import { CATS } from "@/lib/momento/photos";

/**
 * The two of them asleep, dropped on top of each other the way photos
 * actually land.
 *
 * One picture is 3:4 and the other 9:16, so each width is `--pair-h` times
 * that picture's own aspect: both land at exactly the same height, different
 * widths, like a real pair of photographs. `--pair-h` is what grows on a
 * desktop.
 */
function SleepyPair() {
  return (
    <div className="flex w-full items-end justify-center">
      <div style={{ width: "calc(var(--pair-h) * 0.75)" }}>
        <Polaroid photo={CATS.asleep} tilt={-6} delay={0.25} />
      </div>
      <div
        style={{
          width: "calc(var(--pair-h) * 0.5625)",
          marginLeft: "-1.1rem",
          marginBottom: "1rem",
        }}
      >
        <Polaroid photo={CATS.asleepGinger} tilt={5} delay={1} />
      </div>
    </div>
  );
}

/**
 * The scene that changes the temperature. Everything before this is tender;
 * this one is supposed to make her laugh.
 *
 * The order of the photographs is doing work: the tabby stares her down, the
 * ginger side-eyes her mid-wash, and then the belly shot — the one with her
 * own hands in the frame — lands on "creemos en vos".
 */
const STANZAS: Stanza[] = [
  {
    lead: 1.1,
    lines: [{ text: "Pero hay alguien más que quiere decirte algo…" }],
    hold: 1.6,
  },
  {
    media: <Polaroid photo={CATS.window} tilt={-2.5} delay={0.2} eager />,
    lines: [{ text: "Te estamos vigilando…", weight: "display", pause: 1 }],
    hold: 1.8,
  },
  {
    media: <Polaroid photo={CATS.closeUp} tilt={2.5} delay={0.2} />,
    lines: [{ text: "Así que más te vale confiar en vos.", pause: 0.9 }],
    hold: 1.8,
  },
  {
    media: <Polaroid photo={CATS.belly} tilt={-1.8} delay={0.2} />,
    lines: [{ text: "Nosotros creemos en vos.", weight: "display", pause: 0.9 }],
    hold: 2,
  },
  {
    lines: [{ text: "Bueno…", weight: "display" }],
    hold: 1.4,
  },
  {
    media: <SleepyPair />,
    lines: [{ text: "Probablemente algunos estén demasiado ocupados durmiendo.", pause: 1.1 }],
    hold: 2.2,
  },
  {
    lines: [
      { text: "Pero yo sí estoy completamente seguro de vos. 💙", weight: "display", pause: 0.5 },
    ],
  },
];

export function CatsScene({ onNext }: { onNext: () => void }) {
  const [settled, setSettled] = useState(false);

  return (
    <SceneShell tone="warm">
      <Script stanzas={STANZAS} onSettled={() => setSettled(true)} />
      <ContinueButton show={settled} onClick={onNext} />
    </SceneShell>
  );
}
