import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { RotateCcw, Sparkles } from "lucide-react";
import { getOccasion, getTheme } from "@/lib/momento/themes";
import type { Card } from "@/lib/momento/types";

type Stage = "envelope" | "reveal" | "message" | "gallery" | "ending";

const STAGES: Stage[] = ["envelope", "reveal", "message", "gallery", "ending"];

export function CardExperience({ card, embedded = false }: { card: Card; embedded?: boolean }) {
  const theme = getTheme(card.theme);
  const occasion = getOccasion(card.occasion);
  const [stage, setStage] = useState<Stage>("envelope");

  const paragraphs = useMemo(
    () => card.message.split("\n").filter((p) => p.trim().length > 0),
    [card.message],
  );

  useEffect(() => {
    if (stage === "reveal") {
      const t = setTimeout(() => setStage("message"), 3200);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const next = () => {
    const i = STAGES.indexOf(stage);
    setStage(STAGES[Math.min(i + 1, STAGES.length - 1)]);
  };

  return (
    <div
      className={
        embedded
          ? "relative w-full overflow-hidden rounded-[1.75rem]"
          : "relative min-h-screen w-full overflow-hidden"
      }
      style={{ background: theme.background, color: theme.foreground }}
    >
      <Particles accent={theme.accent} />

      <div
        className={
          embedded
            ? "relative z-10 flex min-h-[560px] flex-col items-center justify-center px-5 py-10"
            : "relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-14"
        }
      >
        <AnimatePresence mode="wait">
          {stage === "envelope" && (
            <motion.button
              key="envelope"
              onClick={next}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.35, filter: "blur(8px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col items-center gap-8 outline-none"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-[190px] w-[290px] max-w-[80vw]"
              >
                <div
                  className="absolute inset-0 rounded-[10px] shadow-2xl"
                  style={{ backgroundColor: theme.envelope }}
                />
                <div
                  className="absolute inset-x-0 top-0 h-[105px] origin-top transition-transform duration-700 group-hover:[transform:rotateX(28deg)]"
                  style={{
                    backgroundColor: theme.envelope,
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    filter: "brightness(0.94)",
                  }}
                />
                <div
                  className="absolute left-1/2 top-[86px] flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full text-lg shadow-lg"
                  style={{ backgroundColor: theme.accent, color: theme.envelope }}
                >
                  {occasion.emoji}
                </div>
              </motion.div>
              <div className="text-center">
                <p
                  className="font-[family-name:var(--font-display)] text-3xl italic"
                  style={{ color: theme.foreground }}
                >
                  Tenés un momento
                </p>
                <p className="mt-2 text-sm tracking-[0.28em] uppercase opacity-70">
                  Tocá para abrir
                </p>
              </div>
            </motion.button>
          )}

          {stage === "reveal" && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.9 }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.05em" }}
                animate={{ opacity: 0.7, letterSpacing: "0.3em" }}
                transition={{ duration: 1.2 }}
                className="text-xs uppercase"
              >
                Para
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.25 }}
                className="font-[family-name:var(--font-display)] text-5xl leading-tight sm:text-6xl"
              >
                {card.recipient}
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="h-px w-24"
                style={{ backgroundColor: theme.accent }}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 1, delay: 1.4 }}
                className="text-sm"
              >
                De parte de{" "}
                <span style={{ color: theme.accent }} className="font-medium">
                  {card.sender}
                </span>
              </motion.p>
            </motion.div>
          )}

          {stage === "message" && (
            <motion.div
              key="message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-lg text-center"
            >
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl"
              >
                {card.title}
              </motion.h2>
              <div className="mt-8 space-y-5">
                {paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 0.92, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.9 }}
                    className="text-[15px] leading-relaxed sm:text-base"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              {card.closing && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 + paragraphs.length * 0.9 }}
                  className="mt-8 font-[family-name:var(--font-display)] text-xl italic"
                  style={{ color: theme.accent }}
                >
                  {card.closing}, {card.sender}
                </motion.p>
              )}
              <StageButton
                theme={theme}
                delay={1 + paragraphs.length * 0.9}
                onClick={next}
                label={card.photos.length > 0 ? "Ver los recuerdos" : "Continuar"}
              />
            </motion.div>
          )}

          {stage === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-md"
            >
              <p className="text-center text-xs uppercase tracking-[0.3em] opacity-70">
                Nuestros momentos
              </p>
              <div className="mt-7 space-y-6">
                {card.photos.length === 0 && (
                  <p className="text-center text-sm opacity-70">
                    Esta tarjeta se escribió solo con palabras.
                  </p>
                )}
                {card.photos.map((photo, i) => (
                  <motion.figure
                    key={photo.id}
                    initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
                    animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                    transition={{ duration: 0.9, delay: i * 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden rounded-2xl p-3 shadow-2xl"
                    style={{ backgroundColor: theme.envelope }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption ?? `Recuerdo ${i + 1}`}
                      loading="lazy"
                      className="aspect-[4/5] w-full rounded-xl object-cover"
                    />
                    {photo.caption && (
                      <figcaption
                        className="pt-3 text-center font-[family-name:var(--font-display)] text-lg italic"
                        style={{ color: "#5a4634" }}
                      >
                        {photo.caption}
                      </figcaption>
                    )}
                  </motion.figure>
                ))}
              </div>
              <StageButton
                theme={theme}
                delay={0.3 + card.photos.length * 0.35}
                onClick={next}
                label="Cerrar el momento"
              />
            </motion.div>
          )}

          {stage === "ending" && (
            <motion.div
              key="ending"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="flex flex-col items-center gap-7 text-center"
            >
              <Sparkles className="h-7 w-7" style={{ color: theme.accent }} />
              <h2 className="font-[family-name:var(--font-display)] text-4xl">
                Con cariño, {card.sender}
              </h2>
              <p className="max-w-xs text-sm opacity-80">
                Los momentos se guardan mejor cuando se comparten.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <button
                  onClick={() => setStage("envelope")}
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm transition-opacity hover:opacity-80"
                  style={{ borderColor: theme.accent, color: theme.foreground }}
                >
                  <RotateCcw className="h-4 w-4" /> Volver a verla
                </button>
                <Link
                  to="/crear"
                  className="rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.03]"
                  style={{ backgroundColor: theme.accent, color: theme.envelope }}
                >
                  Crear mi tarjeta
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StageButton({
  theme,
  delay,
  onClick,
  label,
}: {
  theme: { accent: string; envelope: string };
  delay: number;
  onClick: () => void;
  label: string;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      onClick={onClick}
      className="mt-10 rounded-full px-7 py-3 text-sm font-medium transition-transform hover:scale-[1.03]"
      style={{ backgroundColor: theme.accent, color: theme.envelope }}
    >
      {label}
    </motion.button>
  );
}

function Particles({ accent }: { accent: string }) {
  const dots = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        top: (i * 61) % 100,
        size: 2 + (i % 3),
        duration: 7 + (i % 5) * 2,
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            backgroundColor: accent,
            opacity: 0.35,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.12, 0.45, 0.12] }}
          transition={{ duration: d.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
