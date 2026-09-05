import { useState } from "react";
import { SceneShell } from "../shared/SceneShell";
import { ContinueButton } from "../shared/ContinueButton";
import { Polaroid } from "../shared/Polaroid";
import { PlantBackdrop } from "../shared/Plant";
import { Script, type Stanza } from "../shared/Script";
import { FAMILY } from "@/lib/momento/photos";

/**
 * Her family, laid out like the sleepy cats: widths derived from each
 * picture's own proportions so the prints come out the same height whatever
 * shape they were shot in.
 *
 * `--family-h` is larger than the cat pair's on purpose. A cat fills its frame
 * and survives being small; six people around a table do not, and the whole
 * point of this beat is that she recognises the faces.
 */
function FamilyPhotos() {
  const [first] = FAMILY;
  if (!first) return null;
  if (FAMILY.length === 1) return <Polaroid photo={first} tilt={-2} delay={0.25} />;

  return (
    <div className="flex w-full items-end justify-center">
      {FAMILY.slice(0, 2).map((photo, i) => {
        const aspect = photo.width / photo.height;
        return (
          <div
            key={photo.src}
            style={{
              width: `calc(var(--family-h) * ${aspect.toFixed(4)})`,
              marginLeft: i === 0 ? 0 : "-1.4rem",
              marginBottom: i === 0 ? 0 : "1.1rem",
            }}
          >
            <Polaroid photo={photo} tilt={i % 2 === 0 ? -5 : 4} delay={0.25 + i * 0.7} />
          </div>
        );
      })}
    </div>
  );
}

/**
 * The beat only exists if there are photographs for it. It sits *after* his
 * own promise on purpose: first he says he will be there, then the scene
 * widens to everyone who already is. Put the other way round, "no soy el
 * único" would be claiming a place he had not taken yet.
 */
const FAMILY_BEAT: Stanza[] =
  FAMILY.length > 0
    ? [
        {
          media: <FamilyPhotos />,
          lines: [{ text: "Y no soy el único.", weight: "display", pause: 0.8 }],
          // Photographs need far longer on screen than a line of text does.
          hold: 9,
        },
      ]
    : [];

const STANZAS: Stanza[] = [
  {
    lead: 1.4,
    lines: [{ text: "No estás sola.", weight: "hero" }],
    hold: 6.5,
  },
  {
    lines: [
      { text: "No importa cuánto miedo tengas." },
      { text: "No importa cuántos nervios sientas." },
      { text: "No importa si las cosas no salen exactamente como esperabas." },
    ],
    hold: 2.2,
  },
  {
    lines: [{ text: "Yo voy a estar con vos.", weight: "display", pause: 0.8 }],
    hold: 2.8,
  },
  ...FAMILY_BEAT,
  {
    lines: [
      { text: "No tenés que demostrarme nada." },
      { text: "Yo ya sé de lo que sos capaz.", pause: 0.8 },
    ],
    hold: 2.4,
  },
  {
    lines: [
      { text: "Yo creo en vos.", weight: "display" },
      { text: "Y estoy orgulloso de vos.", weight: "display", pause: 1 },
    ],
  },
];

export function SupportScene({ onNext, plantStage }: { onNext: () => void; plantStage: number }) {
  const [settled, setSettled] = useState(false);

  return (
    <SceneShell tone="close" backdrop={<PlantBackdrop stage={plantStage} />}>
      <Script stanzas={STANZAS} onSettled={() => setSettled(true)} />
      <ContinueButton show={settled} onClick={onNext} />
    </SceneShell>
  );
}
