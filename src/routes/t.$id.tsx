import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CardExperience } from "@/components/momento/CardExperience";
import { cards } from "@/lib/momento/storage";
import type { Card } from "@/lib/momento/types";

export const Route = createFileRoute("/t/$id")({
  head: () => ({
    meta: [
      { title: "Una tarjeta para vos | Momento" },
      {
        name: "description",
        content: "Alguien te dejó una tarjeta digital interactiva. Abrí el sobre y descubrila.",
      },
      { property: "og:title", content: "Una tarjeta para vos | Momento" },
      {
        property: "og:description",
        content: "Abrí el sobre, leé el mensaje y mirá los recuerdos que te dejaron.",
      },
    ],
  }),
  component: TarjetaPage,
});

function TarjetaPage() {
  const { id } = Route.useParams();
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    cards.get(id).then((found) => {
      if (!active) return;
      setCard(found);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="animate-pulse text-sm text-muted-foreground">Preparando el momento…</p>
      </main>
    );
  }

  if (!card) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-background px-6 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl">
          Esta tarjeta ya no está aquí
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          El enlace puede haber expirado o abrirse en otro dispositivo.
        </p>
        <Link
          to="/crear"
          className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
        >
          Crear mi tarjeta
        </Link>
      </main>
    );
  }

  return <CardExperience card={card} />;
}
