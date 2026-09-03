export type OccasionId =
  | "cumpleanos"
  | "aniversario"
  | "amor"
  | "gracias"
  | "felicitaciones"
  | "solo-porque-si";

export type ThemeId = "atardecer" | "medianoche" | "jardin" | "papel";

export interface CardPhoto {
  id: string;
  /** data URL (local) o URL remota (mock/Supabase Storage en el futuro) */
  src: string;
  caption?: string;
}

export interface Card {
  id: string;
  occasion: OccasionId;
  recipient: string;
  sender: string;
  title: string;
  message: string;
  closing?: string;
  photos: CardPhoto[];
  theme: ThemeId;
  createdAt: string;
}

export type CardDraft = Omit<Card, "id" | "createdAt">;

/**
 * Contrato de la capa de datos. Hoy lo implementa localStorage + mocks.
 * Para migrar a Lovable Cloud basta con crear otra implementación
 * de esta interfaz (misma firma async).
 */
export interface CardRepository {
  get(id: string): Promise<Card | null>;
  list(): Promise<Card[]>;
  create(draft: CardDraft): Promise<Card>;
  remove(id: string): Promise<void>;
}
