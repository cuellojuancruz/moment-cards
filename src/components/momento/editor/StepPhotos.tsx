import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp, ImagePlus, Trash2 } from "lucide-react";
import demo1 from "@/assets/demo-1.jpg";
import demo2 from "@/assets/demo-2.jpg";
import demo3 from "@/assets/demo-3.jpg";
import type { CardDraft, CardPhoto } from "@/lib/momento/types";

const MOCK_PHOTOS = [demo1, demo2, demo3];

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export function StepPhotos({
  draft,
  update,
}: {
  draft: CardDraft;
  update: (patch: Partial<CardDraft>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const photos = draft.photos;

  const setPhotos = (next: CardPhoto[]) => update({ photos: next });

  const onFiles = async (files: FileList | null) => {
    if (!files) return;
    const added: CardPhoto[] = [];
    for (const file of Array.from(files).slice(0, 6)) {
      added.push({
        id: `${Date.now()}-${file.name}-${added.length}`,
        src: await readAsDataUrl(file),
      });
    }
    setPhotos([...photos, ...added]);
  };

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= photos.length) return;
    const next = [...photos];
    [next[index], next[target]] = [next[target], next[index]];
    setPhotos(next);
  };

  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-3xl">Sumá recuerdos</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Hasta 6 fotos. Las podés reordenar, titular y eliminar.
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => inputRef.current?.click()}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card py-4 text-sm transition-colors hover:border-primary"
        >
          <ImagePlus className="h-4 w-4" /> Subir fotos
        </button>
        <button
          onClick={() =>
            setPhotos([
              ...photos,
              ...MOCK_PHOTOS.map((src, i) => ({ id: `mock-${Date.now()}-${i}`, src })),
            ])
          }
          className="rounded-xl border border-border bg-card px-4 py-4 text-sm transition-colors hover:border-primary"
        >
          Usar ejemplo
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => onFiles(e.target.files)}
      />

      <div className="mt-6 space-y-3">
        <AnimatePresence initial={false}>
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
            >
              <img
                src={photo.src}
                alt=""
                className="h-16 w-16 shrink-0 rounded-lg object-cover"
                loading="lazy"
              />
              <input
                value={photo.caption ?? ""}
                placeholder="Título del recuerdo (opcional)"
                onChange={(e) =>
                  setPhotos(
                    photos.map((p) => (p.id === photo.id ? { ...p, caption: e.target.value } : p)),
                  )
                }
                className="min-w-0 flex-1 rounded-lg bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <div className="flex items-center gap-1">
                <IconBtn onClick={() => move(i, -1)} label="Subir">
                  <ArrowUp className="h-4 w-4" />
                </IconBtn>
                <IconBtn onClick={() => move(i, 1)} label="Bajar">
                  <ArrowDown className="h-4 w-4" />
                </IconBtn>
                <IconBtn
                  onClick={() => setPhotos(photos.filter((p) => p.id !== photo.id))}
                  label="Eliminar"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </IconBtn>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {children}
    </button>
  );
}
