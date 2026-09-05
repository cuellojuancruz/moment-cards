import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/momento/Experience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Para vos 💙" },
      { name: "description", content: "Abrilo cuando tengas un minuto tranquilo." },
      // This is a letter to one person, not a page for the internet.
      { name: "robots", content: "noindex, nofollow" },
      // What she sees in the message before she opens it.
      { property: "og:title", content: "Para vos 💙" },
      { property: "og:description", content: "Abrilo cuando tengas un minuto tranquilo." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Experience,
});
