import { Reveal } from "./Reveal";
import { lineDelays, type Line } from "./motion";

export function Lines({
  lines,
  start = 0.4,
  gap,
  className = "",
}: {
  lines: Line[];
  start?: number;
  gap?: number;
  className?: string;
}) {
  const delays = lineDelays(lines, start, gap);
  return (
    <div className={`space-y-6 ${className}`}>
      {lines.map((line, i) => (
        <Reveal key={line.text} delay={delays[i] ?? 0}>
          {line.emphasis ? (
            <p className="font-[family-name:var(--font-display)] text-[1.9rem] leading-snug text-foreground sm:text-4xl">
              {line.text}
            </p>
          ) : (
            <p className="text-balance-tight text-[1.06rem] leading-relaxed text-foreground/85 sm:text-lg">
              {line.text}
            </p>
          )}
        </Reveal>
      ))}
    </div>
  );
}
