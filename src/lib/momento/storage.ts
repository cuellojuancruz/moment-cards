import { DEMO_CARDS } from "./demo";
import type { Card, CardDraft, CardRepository } from "./types";

const STORAGE_KEY = "momento.cards.v1";

const isBrowser = () => typeof window !== "undefined";

function readAll(): Card[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Card[]) : [];
  } catch {
    return [];
  }
}

function writeAll(cards: Card[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch {
    /* cuota llena: ignoramos silenciosamente */
  }
}

function makeId() {
  return Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
}

/**
 * Implementación local del repositorio. Sustituible por una versión
 * respaldada por Lovable Cloud sin tocar la UI.
 */
export const localCardRepository: CardRepository = {
  async get(id) {
    const demo = DEMO_CARDS.find((c) => c.id === id);
    if (demo) return demo;
    return readAll().find((c) => c.id === id) ?? null;
  },
  async list() {
    return [...readAll(), ...DEMO_CARDS];
  },
  async create(draft: CardDraft) {
    const card: Card = { ...draft, id: makeId(), createdAt: new Date().toISOString() };
    writeAll([card, ...readAll()]);
    return card;
  },
  async remove(id) {
    writeAll(readAll().filter((c) => c.id !== id));
  },
};

export const cards = localCardRepository;
