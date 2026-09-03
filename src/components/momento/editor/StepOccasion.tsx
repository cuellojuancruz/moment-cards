import { motion } from "motion/react";
import { OCCASIONS, getOccasion } from "@/lib/momento/themes";
import type { CardDraft } from "@/lib/momento/types";

export function StepOccasion({
  draft,
  update,
}: {
  draft: CardDraft;
  update: (patch: Partial<CardDraft>) => void;
}) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-3xl">¿Qué estás celebrando?</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Elegimos el tono y los colores según la ocasión.
      </p>
      <div className="mt-7 grid grid-cols-2 gap-3">
        {OCCASIONS.map((o, i) => {
          const active = draft.occasion === o.id;
          return (
            <motion.button
              key={o.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => {
                const occ = getOccasion(o.id);
                update({
                  occasion: o.id,
                  theme: occ.suggestedTheme,
                  title: occ.suggestedTitle,
                });
              }}
              className={`rounded-2xl border p-4 text-left transition-colors ${
                active
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span className="text-2xl">{o.emoji}</span>
              <span className="mt-2 block text-sm font-medium">{o.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
