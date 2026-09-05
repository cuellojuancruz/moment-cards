import catWindow from "@/assets/cat-window.jpg";
import catCloseUp from "@/assets/cat-closeup.jpg";
import catBelly from "@/assets/cat-belly.jpg";
import catBed from "@/assets/cat-bed.jpg";
import catAsleep from "@/assets/cat-asleep.jpg";
import catAsleepGinger from "@/assets/cat-asleep-ginger.jpg";
import usSea from "@/assets/us-sea.jpg";
import familyTogether from "@/assets/family-together.jpg";
import familyCandle from "@/assets/family-candle.jpg";

/* ------------------------------------------------------------------ *
 * Every photograph in the experience is declared here, and only here.
 *
 * These are her own photographs of her own two cats, straight off a phone,
 * which is why no two of them are the same shape: one is landscape, two are
 * tall 9:16, three are 3:4. Nothing crops or stretches them — each print is
 * built from the `ratio` declared below and sized so that, whatever its
 * shape, it ends up about the same height on screen as the others.
 *
 * To swap one: drop the new file into `src/assets/`, point the import at it
 * and correct `width`, `height` and `ratio` to the new file's real pixels.
 * Nothing else needs touching.
 * ------------------------------------------------------------------ */

export interface Photo {
  src: string;
  /** Read aloud to anyone using a screen reader. Describe what is in it. */
  alt: string;
  width: number;
  height: number;
  /** The file's real proportions, so the print never distorts or crops. */
  ratio: string;
}

export const CATS = {
  /** Straight down the lens from the window ledge. */
  window: {
    src: catWindow,
    alt: "El gato atigrado sentado en la ventana, mirando fijo a cámara",
    width: 960,
    height: 1280,
    ratio: "3 / 4",
  },
  /** The ginger mid-wash, one eye out from behind his own leg. */
  closeUp: {
    src: catCloseUp,
    alt: "Primer plano del gato naranja acicalándose, con un ojo asomando",
    width: 720,
    height: 1280,
    ratio: "9 / 16",
  },
  /** Belly up, eyes shut, both her hands in the frame. */
  belly: {
    src: catBelly,
    alt: "El gato atigrado panza arriba sobre una alfombra roja, con los ojos cerrados, recibiendo caricias con las dos manos",
    width: 960,
    height: 720,
    ratio: "4 / 3",
  },
  /** The ginger burrowing into the sheets. */
  bed: {
    src: catBed,
    alt: "El gato naranja y blanco sobre la cama, con la cabeza hundida entre las sábanas",
    width: 720,
    height: 960,
    ratio: "3 / 4",
  },
  /** The tabby, out cold on the red sofa. */
  asleep: {
    src: catAsleep,
    alt: "El gato atigrado dormido, hecho un ovillo sobre el sillón rojo",
    width: 720,
    height: 960,
    ratio: "3 / 4",
  },
  /** The ginger, out cold under the Christmas tree. */
  asleepGinger: {
    src: catAsleepGinger,
    alt: "El gato naranja y blanco dormido sobre una manta roja, con una pata estirada",
    width: 720,
    height: 1280,
    ratio: "9 / 16",
  },
} satisfies Record<string, Photo>;

/** The three that come back at the very end, after the last line. */
export const EPILOGUE_CATS: Photo[] = [CATS.window, CATS.belly, CATS.bed];

/**
 * The two of them. Shown in "Nuestra historia", right after "Acá estamos.
 * Juntos." — which is the only place in the letter it could go.
 *
 * Adding more here makes them all appear, side by side, automatically.
 */
export const US: Photo[] = [
  {
    src: usSea,
    alt: "Los dos de espaldas, apoyados en una baranda frente al mar, bajo un cielo con nubes",
    width: 1200,
    height: 1600,
    ratio: "3 / 4",
  },
];

/**
 * Her family, in "No estás sola" — placed after he has promised to be there,
 * so that the scene widens from his promise to the plain fact of everyone
 * else who already is. Two frames from the same night: the posed one and the
 * one where nobody was posing.
 *
 * Emptying this array removes the beat cleanly; the scene reads as words again.
 */
export const FAMILY: Photo[] = [
  {
    src: familyTogether,
    alt: "Su familia junta en un cumpleaños, sonriendo a cámara entre globos y carteles",
    width: 1200,
    height: 1600,
    ratio: "3 / 4",
  },
  {
    src: familyCandle,
    alt: "Su familia alrededor de la torta, en el momento de la velita",
    width: 1200,
    height: 1600,
    ratio: "3 / 4",
  },
];
