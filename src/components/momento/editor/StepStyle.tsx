import { THEMES } from "@/lib/momento/themes";
import type { CardDraft } from "@/lib/momento/types";

export function StepStyle({
  draft,
  update,
}: {
  draft: CardDraft;
  update: (patch: Partial<CardDraft>) => void;
}) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-3xl">Elegí la atmósfera</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Define colores, sobre y luz de la experiencia.
      </p>
      <div className="mt-7 space-y-3">
        {THEMES.map((theme) => {
          const active = draft.theme === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => update({ theme: theme.id })}
              className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${
                active ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div
                className="h-14 w-14 shrink-0 rounded-xl border border-border"
                style={{ background: theme.background }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{theme.name}</p>
                <p className="text-xs text-muted-foreground">{theme.description}</p>
              </div>
              <div className="flex gap-1">
                {theme.swatch.map((c) => (
                  <span key={c} className="h-4 w-4 rounded-full" style={{ backgroundColor: c }} />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
