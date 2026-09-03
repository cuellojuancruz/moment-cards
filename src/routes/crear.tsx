import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Copy } from "lucide-react";
import { StepOccasion } from "@/components/momento/editor/StepOccasion";
import { StepDetails } from "@/components/momento/editor/StepDetails";
import { StepPhotos } from "@/components/momento/editor/StepPhotos";
import { StepStyle } from "@/components/momento/editor/StepStyle";
import { StepPreview } from "@/components/momento/editor/StepPreview";
import { cards } from "@/lib/momento/storage";
import type { CardDraft } from "@/lib/momento/types";

export const Route = createFileRoute("/crear")({
  head: () => ({
    meta: [
      { title: "Crear tarjeta digital | Momento" },
      {
        name: "description",
        content:
          "Editor de 5 pasos para crear una tarjeta digital interactiva: ocasión, mensaje, fotos, estilo y previsualización.",
      },
      { property: "og:title", content: "Crear tarjeta digital | Momento" },
      {
        property: "og:description",
        content: "Diseñá una tarjeta con sobre animado, mensaje progresivo y galería de recuerdos.",
      },
    ],
  }),
  component: CrearPage,
});

const STEPS = ["Ocasión", "Mensaje", "Fotos", "Estilo", "Vista previa"];

const INITIAL: CardDraft = {
  occasion: "cumpleanos",
  recipient: "",
  sender: "",
  title: "¡Feliz cumpleaños!",
  message: "",
  closing: "Con cariño",
  photos: [],
  theme: "atardecer",
};

function CrearPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<CardDraft>(INITIAL);
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const update = (patch: Partial<CardDraft>) => setDraft((d) => ({ ...d, ...patch }));

  const canContinue =
    step !== 1 || (draft.recipient.trim().length > 0 && draft.message.trim().length > 0);

  const publish = async () => {
    const card = await cards.create({
      ...draft,
      recipient: draft.recipient.trim() || "Vos",
      sender: draft.sender.trim() || "Alguien que te quiere",
    });
    setLink(`${window.location.origin}/t/${card.id}`);
    navigate({ to: "/t/$id", params: { id: card.id } });
  };

  return (
    <main className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-xl items-center justify-between px-5 py-4">
          <Link to="/" className="font-[family-name:var(--font-display)] text-xl">
            Momento
          </Link>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Paso {step + 1} / 5
          </span>
        </div>
        <div className="mx-auto flex max-w-xl gap-1.5 px-5 pb-4">
          {STEPS.map((label, i) => (
            <div key={label} className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full bg-primary"
                initial={false}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-xl px-5 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && <StepOccasion draft={draft} update={update} />}
            {step === 1 && <StepDetails draft={draft} update={update} />}
            {step === 2 && <StepPhotos draft={draft} update={update} />}
            {step === 3 && <StepStyle draft={draft} update={update} />}
            {step === 4 && <StepPreview draft={draft} />}
          </motion.div>
        </AnimatePresence>

        {link && (
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 p-3 text-sm">
            <span className="min-w-0 flex-1 truncate">{link}</span>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(link);
                setCopied(true);
              }}
              className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-xl items-center gap-3 px-5 py-4">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Atrás
          </button>
          {step < 4 ? (
            <button
              onClick={() => setStep((s) => Math.min(4, s + 1))}
              disabled={!canContinue}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-40"
            >
              Continuar <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={publish}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]"
            >
              Generar enlace
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
