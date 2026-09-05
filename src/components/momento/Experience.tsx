import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { OpeningScene } from "./scenes/OpeningScene";
import { CalmScene } from "./scenes/CalmScene";
import { StrengthScene } from "./scenes/StrengthScene";
import { CatsScene } from "./scenes/CatsScene";
import { GrowthScene } from "./scenes/GrowthScene";
import { StoryScene } from "./scenes/StoryScene";
import { SupportScene } from "./scenes/SupportScene";
import { MessageScene } from "./scenes/MessageScene";
import { BloomScene } from "./scenes/BloomScene";
import { EpilogueScene } from "./scenes/EpilogueScene";
import { CATS } from "@/lib/momento/photos";

/* ------------------------------------------------------------------ *
 * The order of the letter.
 *
 * Nerves → calm → tenderness → memory → admiration → trust → love, and it
 * ends on her being able to face it. There is no menu, no back, and no way
 * to skip: the only thing she can do is keep going, at her own pace.
 * ------------------------------------------------------------------ */
const ORDER = [
  "opening",
  "calm",
  "strength",
  "cats",
  "growth",
  "story",
  "support",
  "message",
  "bloom",
  "epilogue",
] as const;

type SceneId = (typeof ORDER)[number];

export function Experience() {
  const [index, setIndex] = useState(0);
  // How far the plant has grown. Set in "growth" and carried forward, so it
  // keeps standing behind the scenes that come after it.
  const [plantStage, setPlantStage] = useState(0);

  const scene: SceneId = ORDER[index] ?? "opening";
  const next = useCallback(() => setIndex((i) => Math.min(i + 1, ORDER.length - 1)), []);

  // Get the photographs in memory before the scene that needs them, so they
  // never arrive half-drawn in the middle of a sentence.
  useEffect(() => {
    if (scene !== "strength" || typeof window === "undefined") return;
    for (const photo of Object.values(CATS)) {
      const img = new window.Image();
      img.src = photo.src;
    }
  }, [scene]);

  // Exactly one element, so `AnimatePresence mode="wait"` always has a single
  // keyed child to hold on to while the previous scene fades out.
  const render = () => {
    switch (scene) {
      case "opening":
        return <OpeningScene key="opening" onNext={next} />;
      case "calm":
        return <CalmScene key="calm" onNext={next} />;
      case "strength":
        return <StrengthScene key="strength" onNext={next} />;
      case "cats":
        return <CatsScene key="cats" onNext={next} />;
      case "growth":
        return <GrowthScene key="growth" onNext={next} onStage={setPlantStage} />;
      case "story":
        return <StoryScene key="story" onNext={next} plantStage={plantStage} />;
      case "support":
        return <SupportScene key="support" onNext={next} plantStage={plantStage} />;
      case "message":
        return <MessageScene key="message" onNext={next} plantStage={plantStage} />;
      case "bloom":
        return <BloomScene key="bloom" onNext={next} plantStage={plantStage} />;
      case "epilogue":
        return <EpilogueScene key="epilogue" />;
    }
  };

  return (
    <main className="fixed inset-0 overflow-hidden bg-background text-foreground">
      <AnimatePresence mode="wait">{render()}</AnimatePresence>
    </main>
  );
}
