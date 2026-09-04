import { SceneShell } from "../shared/SceneShell";
import { Lines } from "../shared/Lines";
import { ContinueButton } from "../shared/ContinueButton";
import { totalDelay, type Line } from "../shared/motion";

const LINES: Line[] = [
  { text: "Antes de que sigas…" },
  { text: "hay algo que quiero decirte.", pause: 1.1 },
];

export function IntroScene({ onNext }: { onNext: () => void }) {
  return (
    <SceneShell
      background="radial-gradient(120% 90% at 50% 20%, oklch(0.22 0.07 258) 0%, oklch(0.13 0.05 258) 70%)"
      intensity={0.25}
    >
      <Lines lines={LINES} start={0.9} gap={2.2} />
      <ContinueButton
        label="Empezar 💙"
        variant="solid"
        delay={totalDelay(LINES, 0.9, 2.2)}
        onClick={onNext}
      />
    </SceneShell>
  );
}
