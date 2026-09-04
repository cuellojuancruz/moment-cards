import { SceneShell } from "../shared/SceneShell";
import { Lines } from "../shared/Lines";
import { ContinueButton } from "../shared/ContinueButton";
import { totalDelay, type Line } from "../shared/motion";

const LINES: Line[] = [
  { text: "Sé que estás nerviosa." },
  { text: "Sé que llevás meses preparándote.", pause: 0.9 },
  { text: "Esperando este momento." },
  { text: "Y sé que probablemente tenés muchas cosas dando vueltas en la cabeza.", pause: 0.9 },
  { text: "Está bien.", pause: 1.4, emphasis: true },
  { text: "Está bien tener miedo." },
  { text: "Está bien estar nerviosa." },
  { text: "Eso no significa que no estés preparada.", pause: 0.6 },
  { text: "Solo quiero que por un momento dejes todo eso a un lado.", pause: 1.4 },
];

export function CalmScene({ onNext }: { onNext: () => void }) {
  return (
    <SceneShell
      background="radial-gradient(120% 100% at 50% 25%, oklch(0.24 0.06 250) 0%, oklch(0.15 0.05 256) 74%)"
      intensity={0.3}
      align="start"
    >
      <div className="pt-6" />
      <Lines lines={LINES} />
      <ContinueButton delay={totalDelay(LINES)} onClick={onNext} />
    </SceneShell>
  );
}
