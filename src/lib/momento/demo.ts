import demo1 from "@/assets/demo-1.jpg";
import demo2 from "@/assets/demo-2.jpg";
import demo3 from "@/assets/demo-3.jpg";
import type { Card } from "./types";

export const DEMO_CARD_ID = "demo-martina";

/** Tarjeta de ejemplo siempre disponible (no depende de almacenamiento). */
export const DEMO_CARDS: Card[] = [
  {
    id: DEMO_CARD_ID,
    occasion: "cumpleanos",
    recipient: "Martina",
    sender: "Juan",
    title: "¡Feliz cumpleaños, Martina!",
    message:
      "Hoy es tu día y quería regalarte algo que dure más que un mensaje.\n\nGracias por cada charla larga, por las risas que aparecen sin aviso y por ser esa persona que hace que todo se sienta más liviano.\n\nQue este año te traiga momentos tan lindos como los que ya compartimos. Te quiero mucho.",
    closing: "Con todo mi cariño",
    photos: [
      { id: "p1", src: demo1, caption: "Tu cumple del año pasado" },
      { id: "p2", src: demo2, caption: "Aquella tarde dorada" },
      { id: "p3", src: demo3, caption: "Pedí tres deseos" },
    ],
    theme: "atardecer",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];
