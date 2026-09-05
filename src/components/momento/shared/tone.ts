/* ------------------------------------------------------------------ *
 * The colour of the journey.
 *
 * One curve, not eleven separate decisions. The experience opens in a cold,
 * almost lightless blue and ends in a blue with dawn in it. Light is added
 * with glow rather than by lifting the background towards white, so the text
 * stays light-on-dark the whole way through and nothing ever flashes.
 *
 * `lift` is the single number that drives the curve (0 = night, 1 = dawn).
 * ------------------------------------------------------------------ */

export type ToneName =
  | "letter" // 1. the envelope
  | "calm" // 3. calm
  | "strength" // 4. her strength
  | "warm" // 5. the cats
  | "green" // 6. growth
  | "intimate" // 7. our story
  | "close" // 8. you are not alone
  | "message" // 9. the message
  | "bloom" // 10. blooming
  | "dawn"; // 11. epilogue

export interface Tone {
  /** Background gradient for the scene. */
  background: string;
  /** 0 → barely lit, 1 → full luminous bloom behind the content. */
  glow: number;
  /** Density of slow drifting light. */
  dust: number;
  /** Falling petals. 0 disables them completely. */
  petals: number;
  /** Falling leaves. Slower and heavier than petals; they tumble. */
  leaves: number;
  /** Big pressed-flower silhouettes at the edges of the frame. */
  flora: number;
  /** A cat walks through once, low and out of the way. */
  paws: boolean;
  /**
   * The sheet of paper behind the words.
   *
   * Only in the scenes that are nothing but words. Where a photograph, the
   * plant or the flower is already carrying the screen, a second surface
   * behind them is one thing too many.
   */
  paper: boolean;
}

const sky = (center: string, edge: string) =>
  `radial-gradient(125% 95% at 50% 22%, ${center} 0%, ${edge} 72%)`;

export const TONES: Record<ToneName, Tone> = {
  // The darkest point of the whole story, because it is where the nerves are.
  // What light there is comes off the envelope itself.
  letter: {
    background: sky("oklch(0.212 0.06 260)", "oklch(0.118 0.038 261)"),
    glow: 0.24,
    dust: 0.4,
    petals: 0.3,
    leaves: 0.15,
    flora: 0.25,
    paws: false,
    paper: false,
  },
  calm: {
    background: sky("oklch(0.234 0.056 252)", "oklch(0.134 0.04 256)"),
    glow: 0.22,
    dust: 0.3,
    petals: 0,
    leaves: 0,
    flora: 0.2,
    paws: false,
    paper: true,
  },
  strength: {
    background: sky("oklch(0.298 0.075 248)", "oklch(0.164 0.05 254)"),
    glow: 0.44,
    dust: 0.55,
    petals: 0,
    leaves: 0.3,
    flora: 0.35,
    paws: false,
    paper: true,
  },
  warm: {
    background: sky("oklch(0.322 0.068 243)", "oklch(0.183 0.047 250)"),
    glow: 0.5,
    dust: 0.4,
    petals: 0.15,
    leaves: 0.1,
    flora: 0.4,
    paws: true,
    paper: false,
  },
  green: {
    background: sky("oklch(0.3 0.07 232)", "oklch(0.171 0.045 244)"),
    glow: 0.48,
    dust: 0.5,
    petals: 0.25,
    leaves: 0.45,
    flora: 0.5,
    paws: false,
    paper: false,
  },
  intimate: {
    background: sky("oklch(0.244 0.06 258)", "oklch(0.14 0.042 260)"),
    glow: 0.3,
    dust: 0.22,
    petals: 0,
    leaves: 0,
    flora: 0.25,
    paws: false,
    paper: true,
  },
  close: {
    background: sky("oklch(0.274 0.062 250)", "oklch(0.154 0.045 254)"),
    glow: 0.38,
    dust: 0.26,
    petals: 0,
    leaves: 0,
    flora: 0.3,
    paws: false,
    paper: true,
  },
  message: {
    background: sky("oklch(0.344 0.08 246)", "oklch(0.19 0.055 252)"),
    glow: 0.62,
    dust: 0.5,
    petals: 0.2,
    leaves: 0.1,
    flora: 0.45,
    paws: false,
    paper: true,
  },
  bloom: {
    background: sky("oklch(0.402 0.085 240)", "oklch(0.221 0.06 248)"),
    glow: 0.85,
    dust: 0.75,
    petals: 1,
    leaves: 0.35,
    flora: 0.8,
    paws: false,
    paper: false,
  },
  dawn: {
    background: sky("oklch(0.438 0.074 236)", "oklch(0.244 0.055 246)"),
    glow: 1,
    dust: 0.6,
    petals: 0.5,
    leaves: 0.2,
    flora: 0.7,
    paws: true,
    paper: false,
  },
};
