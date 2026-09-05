import { useState } from "react";
import { SceneShell } from "../shared/SceneShell";
import { ContinueButton } from "../shared/ContinueButton";
import { Polaroid } from "../shared/Polaroid";
import { PlantBackdrop } from "../shared/Plant";
import { Script, type Stanza } from "../shared/Script";
import { US } from "@/lib/momento/photos";

/**
 * The two of them. A single photograph gets the full frame; more than one
 * fall into a row, each sized from its own proportions so they match in
 * height. With `US` empty this renders nothing and the scene stays as words.
 */
function UsPhotos() {
  const [first] = US;
  if (!first) return null;
  if (US.length === 1) return <Polaroid photo={first} tilt={-2} delay={0.3} />;

  return (
    <div className="flex w-full items-end justify-center">
      {US.map((photo, i) => {
        const aspect = photo.width / photo.height;
        return (
          <div
            key={photo.src}
            style={{
              width: `calc(var(--family-h) * ${aspect.toFixed(4)})`,
              marginLeft: i === 0 ? 0 : "-1.1rem",
              marginBottom: i === 0 ? 0 : "1rem",
            }}
          >
            <Polaroid photo={photo} tilt={i % 2 === 0 ? -5 : 4} delay={0.3 + i * 0.6} />
          </div>
        );
      })}
    </div>
  );
}

/** The quietest scene. Almost nothing moves here on purpose. */
const STANZAS: Stanza[] = [
  {
    lead: 1.4,
    lines: [{ text: "Y hay otra cosa que quiero que recuerdes." }],
    hold: 1.8,
  },
  {
    lines: [
      { text: "Nosotros tampoco sabíamos que algún día íbamos a terminar acá." },
      { text: "Nunca pensamos que se nos iba a dar algo así.", pause: 0.8 },
    ],
    hold: 2.6,
  },
  {
    lines: [{ text: "Y sin embargo…", weight: "display", pause: 1.2 }],
    hold: 6,
  },
  {
    lines: [
      { text: "Acá estamos.", weight: "display" },
      { text: "Juntos. ❤️", weight: "display", pause: 1.1 },
    ],
    hold: 2.6,
  },
  {
    // The photograph rides the last line rather than getting a beat of its
    // own. Being the final stanza, it stays on screen until she moves on —
    // so she looks at the two of them for as long as she wants, with the
    // sentence underneath, instead of it flashing past on a timer.
    ...(US.length > 0 ? { media: <UsPhotos /> } : {}),
    lines: [{ text: "Y para mí eso es algo increíble.", pause: US.length > 0 ? 1.8 : 0.6 }],
  },
];

export function StoryScene({ onNext, plantStage }: { onNext: () => void; plantStage: number }) {
  const [settled, setSettled] = useState(false);

  return (
    <SceneShell tone="intimate" backdrop={<PlantBackdrop stage={plantStage} />}>
      <Script stanzas={STANZAS} onSettled={() => setSettled(true)} />
      <ContinueButton show={settled} onClick={onNext} />
    </SceneShell>
  );
}
