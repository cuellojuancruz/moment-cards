import type { CardDraft } from "@/lib/momento/types";

const field =
  "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

export function StepDetails({
  draft,
  update,
}: {
  draft: CardDraft;
  update: (patch: Partial<CardDraft>) => void;
}) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-3xl">Personalizá el mensaje</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        El mensaje se revela párrafo por párrafo, como una carta.
      </p>
      <div className="mt-7 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
              Para
            </span>
            <input
              className={field}
              value={draft.recipient}
              placeholder="Martina"
              onChange={(e) => update({ recipient: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
              De parte de
            </span>
            <input
              className={field}
              value={draft.sender}
              placeholder="Juan"
              onChange={(e) => update({ sender: e.target.value })}
            />
          </label>
        </div>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
            Título
          </span>
          <input
            className={field}
            value={draft.title}
            onChange={(e) => update({ title: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
            Mensaje
          </span>
          <textarea
            className={`${field} min-h-44 resize-y leading-relaxed`}
            value={draft.message}
            placeholder="Escribí lo que sentís. Separá los párrafos con un enter."
            onChange={(e) => update({ message: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
            Despedida
          </span>
          <input
            className={field}
            value={draft.closing ?? ""}
            placeholder="Con todo mi cariño"
            onChange={(e) => update({ closing: e.target.value })}
          />
        </label>
      </div>
    </div>
  );
}
