# Para vos

Una carta de amor interactiva. Una sola página, sin navegación, para leerse de
corrido en unos cuatro minutos. Está pensada para una computadora y funciona
igual de bien desde un teléfono.

No es una plataforma de tarjetas: no hay usuarios, ni login, ni base de datos,
ni backend, ni pagos, ni panel, ni audio. Es un sitio estático que se publica y
se manda por un enlace.

## Cómo está armado

- **Una sola ruta** (`/`), que renderiza `Experience`.
- **`src/components/momento/Experience.tsx`** — el director: mantiene el orden
  de las escenas y cuánto creció la planta. Nada más.
- **`src/components/momento/scenes/`** — diez escenas, una por archivo, en el
  orden en que se leen: apertura (el sobre), calma, fuerza, gatitos,
  crecimiento, nuestra historia, no estás sola, mensaje, florecer y epílogo.
- **`src/components/momento/shared/`** — las piezas que comparten todas: el
  motor de estrofas (`Script`), la atmósfera, la planta, la flor, el sobre, las
  fotos y el ritmo (`motion.ts`).
- **`src/components/momento/shared/tone.ts`** — la curva de color de toda la
  experiencia, de la noche fría del principio al amanecer del final.

Animaciones con [Motion](https://motion.dev) (ya venía en el proyecto),
Tailwind v4 y TanStack Start.

## El ritmo

La cadencia sale de dos números en `src/components/momento/shared/motion.ts`,
y están separados a propósito: una carta que arrastra y una carta que apura
son problemas distintos.

- **`TEMPO`** (`0.72`) — con qué rapidez llegan las frases. Es velocidad de
  lectura: subirlo la obliga a apurarse.
- **`BREATH`** (`0.45`) — cuánto descansa la carta entre una idea terminada y
  la siguiente. Acá vive el tedio, así que está recortado mucho más fuerte.

La primera versión duraba 5:47, de los cuales solo 157 segundos eran frases
apareciendo: el 55% restante era la carta callada con todo ya dicho. Con estos
valores dura 3:55, y el recorte cayó casi entero sobre el silencio (de 143s a
72s) y apenas sobre la lectura (de 157s a 133s).

Si todavía se siente larga: `TEMPO 0.65` y `BREATH 0.35` la dejan en ~3:15.
Si se siente apurada, subí `TEMPO` antes que `BREATH`.

Los golpes que tienen que respirar —"Nunca te vi rendirte.", "No estás sola.",
"No hay nada que no puedas lograr."— llevan un `hold` mucho más grande que el
resto, para que bajar `BREATH` acelere la carta sin aplanarle los picos.

`prefers-reduced-motion` saca el movimiento (desplazamientos, blur, partículas,
pétalos) pero **no** acelera la lectura: quien lo tenga activado igual recibe
la carta al mismo ritmo.

## La escala

Toda la composición —el ancho de la columna, los tamaños de letra, las fotos,
la planta, la flor, el sobre— sale de un puñado de variables CSS declaradas en
`src/styles.css`. Los componentes no traen medidas propias: leen esas
variables.

Hay tres tramos, y el segundo corte es por **alto**, no por ancho:

| tramo                 | cuándo                                    |
| --------------------- | ----------------------------------------- |
| teléfono              | por defecto                               |
| computadora           | `min-width: 1024px`                       |
| computadora con lugar | `min-width: 1024px` y `min-height: 860px` |

El tramo del medio existe porque **una ventana ancha no es necesariamente
alta**: una laptop de 1366×768 deja unos 650px reales de viewport una vez que
el navegador se queda con lo suyo. Con una escala que solo mirara el ancho, ahí
la tipografía sería de monitor y el alto de teléfono, y la planta y el epílogo
se van abajo del borde. Por eso cada valor de escritorio lleva además un tope
en `dvh`: el valor en `rem` es lo que se ve en una pantalla holgada, el `dvh`
es lo que rescata una apretada.

Las medidas que dependen de la proporción de una foto se guardan como **altura**
objetivo; el componente la multiplica por el aspecto de esa foto para sacar el
ancho. Eso es lo que hace que una apaisada, una 3:4 y una 9:16 terminen del
mismo tamaño en pantalla.

Verificado sin desborde en 320×568, 375×667, 768×1024, 1280×650, 1366×768,
1440×900 y 1920×1080.

## La apertura

La primera escena es un sobre cerrado y no tiene botón: hay que **arrastrar la
solapa hacia arriba**. La rotación de la solapa, el sello que se rompe, la luz
y la carta que asoma salen todos del mismo gesto, así que se mueven juntos y no
solamente al mismo tiempo. Si se suelta antes de la mitad, se vuelve a cerrar.
Un toque no la abre —el gesto es el punto— pero mueve la solapa un poco para
mostrar qué hay que hacer. Con teclado, Enter o Espacio la abren.

## Las fotos

Están en `src/assets/` y se declaran en un único lugar,
`src/lib/momento/photos.ts`:

| archivo                                     | qué es                            | dónde aparece                         |
| ------------------------------------------- | --------------------------------- | ------------------------------------- |
| `cat-window.jpg`                            | el atigrado mirando a cámara      | "Te estamos vigilando…"               |
| `cat-closeup.jpg`                           | el naranja de reojo, acicalándose | "Así que más te vale confiar en vos." |
| `cat-belly.jpg`                             | panza arriba, con tus manos       | "Nosotros creemos en vos."            |
| `cat-asleep.jpg` + `cat-asleep-ginger.jpg`  | los dos dormidos, juntos          | "…demasiado ocupados durmiendo."      |
| `cat-bed.jpg`                               | el naranja en la cama             | epílogo                               |
| `us-sea.jpg`                                | los dos frente al mar             | cierre de "Nuestra historia"          |
| `family-together.jpg` + `family-candle.jpg` | su familia, en el cumpleaños      | "Y no soy el único."                  |

En el epílogo vuelven `cat-window`, `cat-belly` y `cat-bed`.

Para cambiar una: poné el archivo nuevo en `src/assets/`, apuntá el import y
corregí `width`, `height` y `ratio` a los píxeles reales. Nada más. Ninguna
foto se deforma ni se recorta: cada marco se construye con la proporción real
del archivo, y el ancho se deduce de una altura objetivo, así que una apaisada,
una 3:4 y una 9:16 terminan todas de la misma altura en pantalla.

Si más adelante querés sumar fotos de los dos, agregalas al arreglo `US` del
mismo archivo y aparecen solas en la escena "Nuestra historia".

## Correrlo

```sh
npm install
npm run dev
```

Y antes de publicar:

```sh
npm run lint
npm run build
```

## Lovable

Este proyecto está conectado a [Lovable](https://lovable.dev). Cada commit que
se pushea a `main` se sincroniza con el editor.
