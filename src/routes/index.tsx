import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, Images, MailOpen } from "lucide-react";
import heroEnvelope from "@/assets/hero-envelope.jpg";
import { DEMO_CARD_ID } from "@/lib/momento/demo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Momento — Tarjetas digitales que se abren como un regalo" },
      {
        name: "description",
        content:
          "Creá tarjetas digitales interactivas con sobre animado, mensaje progresivo y galería de fotos. Compartilas con un enlace.",
      },
      { property: "og:title", content: "Momento — Tarjetas digitales interactivas" },
      {
        property: "og:description",
        content:
          "Un sobre que se abre, un mensaje que aparece de a poco y los recuerdos que importan.",
      },
    ],
  }),
  component: Landing,
});

const STEPS = [
  { icon: MailOpen, title: "Elegí la ocasión", text: "Cumpleaños, amor, gracias o solo porque sí." },
  { icon: Heart, title: "Escribí el mensaje", text: "Se revela párrafo por párrafo, como una carta." },
  { icon: Images, title: "Sumá los recuerdos", text: "Fotos que aparecen una a una al final." },
];

function Landing() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        <img
          src={heroEnvelope}
          alt="Sobre de papel con sello dorado sobre terciopelo, iluminado por una vela"
          width={1536}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-xl flex-col items-center justify-center px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ duration: 1 }}
            className="text-xs uppercase tracking-[0.4em] text-primary"
          >
            Momento
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="mt-6 font-[family-name:var(--font-display)] text-5xl leading-[1.05] sm:text-6xl"
          >
            Algunas palabras merecen abrirse como un regalo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            Creá una tarjeta digital que se abre despacio: un sobre, un nombre, un mensaje que
            aparece de a poco y las fotos que guardan el momento.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <Link
              to="/crear"
              className="rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Crear mi tarjeta
            </Link>
            <Link
              to="/t/$id"
              params={{ id: DEMO_CARD_ID }}
              className="rounded-full border border-primary/50 px-8 py-4 text-sm transition-colors hover:bg-primary/10"
            >
              Ver ejemplo
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-xl px-6 py-20">
        <h2 className="font-[family-name:var(--font-display)] text-3xl">Tres pasos, un momento</h2>
        <div className="mt-8 space-y-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <s.icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium">{s.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-xl px-6 pb-24 text-center">
        <p className="font-[family-name:var(--font-display)] text-2xl italic text-muted-foreground">
          “Gracias por cada charla larga y por las risas que aparecen sin aviso.”
        </p>
        <Link
          to="/t/$id"
          params={{ id: DEMO_CARD_ID }}
          className="mt-8 inline-block rounded-full border border-primary/50 px-7 py-3 text-sm transition-colors hover:bg-primary/10"
        >
          Ver la tarjeta de Martina
        </Link>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        Momento — hecho para compartir lo que importa
      </footer>
    </main>
  );
}
