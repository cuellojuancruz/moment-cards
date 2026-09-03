import type { OccasionId, ThemeId } from "./types";

export interface CardTheme {
  id: ThemeId;
  name: string;
  description: string;
  /** fondo de la experiencia pública */
  background: string;
  /** color de texto principal */
  foreground: string;
  /** acento cálido para sellos, detalles y títulos */
  accent: string;
  /** color del sobre */
  envelope: string;
  swatch: string[];
}

export const THEMES: CardTheme[] = [
  {
    id: "atardecer",
    name: "Atardecer",
    description: "Ámbar cálido y luz dorada",
    background: "radial-gradient(120% 90% at 50% 0%, #3a1d12 0%, #1b0f0b 60%, #120908 100%)",
    foreground: "#f7ecdd",
    accent: "#e2a95f",
    envelope: "#f4e6d2",
    swatch: ["#1b0f0b", "#8a4b25", "#e2a95f", "#f7ecdd"],
  },
  {
    id: "medianoche",
    name: "Medianoche",
    description: "Azul profundo con destellos",
    background: "radial-gradient(120% 90% at 50% 0%, #16224a 0%, #0b1024 60%, #070a17 100%)",
    foreground: "#e8ecff",
    accent: "#9db4ff",
    envelope: "#e6e9f7",
    swatch: ["#070a17", "#16224a", "#9db4ff", "#e8ecff"],
  },
  {
    id: "jardin",
    name: "Jardín",
    description: "Verde sereno y salvia",
    background: "radial-gradient(120% 90% at 50% 0%, #1e3527 0%, #101d16 60%, #0a1310 100%)",
    foreground: "#eef4ea",
    accent: "#a8c9a0",
    envelope: "#eef3e6",
    swatch: ["#0a1310", "#1e3527", "#a8c9a0", "#eef4ea"],
  },
  {
    id: "papel",
    name: "Papel",
    description: "Crema editorial y tinta",
    background: "radial-gradient(120% 90% at 50% 0%, #f7f2e8 0%, #efe7d8 60%, #e8ddc9 100%)",
    foreground: "#2b241c",
    accent: "#a8763e",
    envelope: "#fffaf1",
    swatch: ["#e8ddc9", "#f7f2e8", "#a8763e", "#2b241c"],
  },
];

export const getTheme = (id: ThemeId): CardTheme =>
  THEMES.find((t) => t.id === id) ?? THEMES[0];

export interface Occasion {
  id: OccasionId;
  label: string;
  emoji: string;
  suggestedTitle: string;
  suggestedTheme: ThemeId;
}

export const OCCASIONS: Occasion[] = [
  {
    id: "cumpleanos",
    label: "Cumpleaños",
    emoji: "🎂",
    suggestedTitle: "¡Feliz cumpleaños!",
    suggestedTheme: "atardecer",
  },
  {
    id: "aniversario",
    label: "Aniversario",
    emoji: "🥂",
    suggestedTitle: "Feliz aniversario",
    suggestedTheme: "medianoche",
  },
  {
    id: "amor",
    label: "Amor",
    emoji: "❤️",
    suggestedTitle: "Para vos",
    suggestedTheme: "atardecer",
  },
  {
    id: "gracias",
    label: "Gracias",
    emoji: "🌿",
    suggestedTitle: "Gracias por todo",
    suggestedTheme: "jardin",
  },
  {
    id: "felicitaciones",
    label: "Felicitaciones",
    emoji: "✨",
    suggestedTitle: "¡Felicitaciones!",
    suggestedTheme: "medianoche",
  },
  {
    id: "solo-porque-si",
    label: "Solo porque sí",
    emoji: "💌",
    suggestedTitle: "Solo porque sí",
    suggestedTheme: "papel",
  },
];

export const getOccasion = (id: OccasionId): Occasion =>
  OCCASIONS.find((o) => o.id === id) ?? OCCASIONS[0];
