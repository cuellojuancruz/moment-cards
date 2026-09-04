import { SceneShell } from "../shared/SceneShell";
import { Lines } from "../shared/Lines";
import { Reveal } from "../shared/Reveal";
import { ContinueButton } from "../shared/ContinueButton";
import { totalDelay, type Line } from "../shared/motion";

const LINES: Line[] = [
  { text: "A pesar de todas las cosas que te tocó enfrentar…", pause: 1.6 },
  { text: "Siempre encontraste la forma de seguir." },
  { text: "Llevás meses preparándote." },
  { text: "No llegaste hasta acá por casualidad." },
  { text: "Todo el esfuerzo que hiciste cuenta." },
  { text: "Todo lo que aprendiste cuenta." },
  { text: "Todas las veces que seguiste adelante aunque estabas cansada cuentan." },
  { text: "Y eso es algo que admiro muchísimo de vos.", pause: 1.2, emphasis: true },
];

export function StrengthScene({ onNext }: { onNext: () => void }) {
  return (
    <SceneShell
      background="radial-gradient(120% 100% at 50% 18%, oklch(0.33 0.075 248) 0%, oklch(0.18 0.055 254) 76%)"
      intensity={0.5}
      align="start"
    >
      <Reveal delay={0.5} duration={2} y={22} className="pt-10">
        <p className="font-[family-name:var(--font-display)] text-[2.6rem] leading-[1.1] text-foreground sm:text-5xl">
          Nunca te vi rendirte.
        </p>
      </Reveal>
      <Lines lines={LINES} start={2.6} />
      <ContinueButton delay={totalDelay(LINES, 2.6)} onClick={onNext} />
    </SceneShell>
  );
}
