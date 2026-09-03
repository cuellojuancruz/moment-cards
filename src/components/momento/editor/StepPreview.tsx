import { CardExperience } from "@/components/momento/CardExperience";
import type { CardDraft } from "@/lib/momento/types";

export function StepPreview({ draft }: { draft: CardDraft }) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-3xl">Así se va a ver</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Probala como si fueras quien la recibe. Después generá el enlace.
      </p>
      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-border">
        <CardExperience
          key={`${draft.theme}-${draft.recipient}-${draft.photos.length}`}
          card={{ ...draft, id: "preview", createdAt: new Date().toISOString() }}
          embedded
        />
      </div>
    </div>
  );
}
