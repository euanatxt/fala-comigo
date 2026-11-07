import { createFileRoute } from "@tanstack/react-router";
import { useState, type ComponentType } from "react";
import * as I from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fala Comigo — prancha de palavras para crianças" },
      { name: "description", content: "Toque nas palavras para ouvir e monte frases. Feito para crianças com dificuldades de fala." },
      { property: "og:title", content: "Fala Comigo" },
      { property: "og:description", content: "Toque nas palavras para ouvir e monte frases." },
    ],
  }),
  component: Index,
});

type Ic = ComponentType<{ className?: string; strokeWidth?: number }>;
type W = { t: string; i: Ic };
type Cat = { name: string; i: Ic; bg: string; ink: string; words: W[] };

const CATS: Cat[] = [
  { name: "Pessoas", i: I.Users, bg: "bg-rose", ink: "text-rose-ink", words: [
    { t: "eu", i: I.User }, { t: "você", i: I.Pointer }, { t: "mamãe", i: I.UserRound }, { t: "papai", i: I.PersonStanding },
    { t: "vovó", i: I.Armchair }, { t: "quero", i: I.HandHelping }, { t: "não quero", i: I.Ban }, { t: "sim", i: I.ThumbsUp },
    { t: "não", i: I.ThumbsDown }, { t: "obrigado", i: I.HeartHandshake }, { t: "por favor", i: I.HandHeart }, { t: "oi", i: I.MessageCircle },
    { t: "tchau", i: I.DoorOpen },
  ]},
  { name: "Sentimentos", i: I.Smile, bg: "bg-honey", ink: "text-honey-ink", words: [
    { t: "feliz", i: I.Laugh }, { t: "triste", i: I.Frown }, { t: "bravo", i: I.Angry }, { t: "com medo", i: I.Ghost },
    { t: "cansado", i: I.BatteryLow }, { t: "com dor", i: I.Bandage }, { t: "com fome", i: I.Utensils }, { t: "com sede", i: I.GlassWater },
    { t: "com frio", i: I.Snowflake }, { t: "amo você", i: I.Heart },
  ]},
  { name: "Comida", i: I.Apple, bg: "bg-apricot", ink: "text-apricot-ink", words: [
    { t: "água", i: I.Droplets }, { t: "suco", i: I.Citrus }, { t: "leite", i: I.Milk }, { t: "maçã", i: I.Apple },
    { t: "banana", i: I.Banana }, { t: "pão", i: I.Croissant }, { t: "biscoito", i: I.Cookie }, { t: "arroz", i: I.Soup },
    { t: "sorvete", i: I.IceCreamCone }, { t: "mais", i: I.Plus },
  ]},
  { name: "Ações", i: I.Puzzle, bg: "bg-sage", ink: "text-sage-ink", words: [
    { t: "brincar", i: I.Puzzle }, { t: "comer", i: I.UtensilsCrossed }, { t: "beber", i: I.CupSoda }, { t: "dormir", i: I.Moon },
    { t: "banheiro", i: I.Bath }, { t: "passear", i: I.Footprints }, { t: "assistir", i: I.Tv }, { t: "desenhar", i: I.Palette },
    { t: "abraço", i: I.Users }, { t: "ajuda", i: I.LifeBuoy }, { t: "parar", i: I.Hand }, { t: "ir", i: I.ArrowRight },
  ]},
  { name: "Lugares", i: I.House, bg: "bg-sky", ink: "text-sky-ink", words: [
    { t: "casa", i: I.House }, { t: "escola", i: I.School }, { t: "parque", i: I.Trees }, { t: "carro", i: I.Car },
    { t: "quarto", i: I.BedDouble }, { t: "lá fora", i: I.Sun }, { t: "médico", i: I.Stethoscope },
  ]},
  { name: "Coisas", i: I.Volleyball, bg: "bg-lilac", ink: "text-lilac-ink", words: [
    { t: "bola", i: I.Volleyball }, { t: "boneca", i: I.Baby }, { t: "livro", i: I.BookOpen }, { t: "música", i: I.Music },
    { t: "tablet", i: I.Tablet }, { t: "cachorro", i: I.Dog }, { t: "gato", i: I.Cat }, { t: "cobertor", i: I.BedSingle },
  ]},
];

type Picked = W & { bg: string; ink: string };

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "pt-BR";
  u.rate = 0.9;
  u.pitch = 1.1;
  const v = window.speechSynthesis.getVoices().find((x) => x.lang.toLowerCase().startsWith("pt"));
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

function Index() {
  const [cat, setCat] = useState(0);
  const [sentence, setSentence] = useState<Picked[]>([]);
  const c = CATS[cat] ?? CATS[0]!;

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-5 p-4 sm:p-8">
      <header className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-md">
          <I.MessagesSquare className="size-6" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold leading-none text-primary sm:text-3xl">Fala Comigo</h1>
          <p className="text-sm text-muted-foreground">Toque, ouça e monte sua frase</p>
        </div>
      </header>

      <section className="sticky top-3 z-10 rounded-3xl border border-border/60 bg-card/80 p-4 shadow-xl backdrop-blur-md">
        <div className="flex min-h-24 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed border-border p-2">
          {sentence.length === 0 && (
            <p className="flex items-center gap-2 px-2 text-muted-foreground">
              <I.Sparkles className="size-4" /> Sua frase aparece aqui
            </p>
          )}
          {sentence.map((w, i) => (
            <button key={i} onClick={() => setSentence(sentence.filter((_, j) => j !== i))}
              className={`flex items-center gap-2 rounded-xl ${w.bg} px-3 py-2 font-semibold ${w.ink} animate-in zoom-in-75 fade-in`}>
              <w.i className="size-5" /> {w.t}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={() => speak(sentence.map((w) => w.t).join(" "))} disabled={!sentence.length}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-lg font-semibold text-primary-foreground shadow-md transition active:scale-95 disabled:opacity-40">
            <I.Volume2 className="size-6" /> Falar frase
          </button>
          <button aria-label="Apagar última" onClick={() => setSentence(sentence.slice(0, -1))} disabled={!sentence.length}
            className="grid w-14 place-items-center rounded-2xl bg-secondary transition active:scale-95 disabled:opacity-40">
            <I.Delete className="size-6" />
          </button>
          <button aria-label="Limpar" onClick={() => setSentence([])} disabled={!sentence.length}
            className="grid w-14 place-items-center rounded-2xl bg-secondary transition active:scale-95 disabled:opacity-40">
            <I.X className="size-6" />
          </button>
        </div>
      </section>

      <div className="flex flex-col gap-5 lg:flex-row">
        <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:w-56 lg:shrink-0 lg:flex-col lg:px-0">
          {CATS.map((k, i) => {
            const active = i === cat;
            return (
              <button key={k.name} onClick={() => setCat(i)}
                className={`flex shrink-0 items-center gap-3 rounded-2xl p-2 pr-4 font-semibold transition ${active ? `${k.bg} ${k.ink} shadow-md` : "bg-card/70 text-muted-foreground hover:bg-card"}`}>
                <span className={`grid size-9 place-items-center rounded-xl ${active ? "bg-card/70" : k.bg} ${k.ink}`}>
                  <k.i className="size-5" />
                </span>
                {k.name}
              </button>
            );
          })}
        </nav>

        <section className="grid flex-1 grid-cols-3 gap-3 sm:grid-cols-4 xl:grid-cols-5">
          {c.words.map((w) => (
            <button key={w.t} onClick={() => { speak(w.t); setSentence((s) => [...s, { ...w, bg: c.bg, ink: c.ink }]); }}
              className="group flex flex-col items-center justify-center gap-2 rounded-3xl border border-border/60 bg-card p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95 sm:p-4">
              <span className={`grid aspect-square w-full max-w-24 place-items-center rounded-2xl ${c.bg} ${c.ink} transition group-hover:scale-105`}>
                <w.i className="size-1/2" strokeWidth={1.75} />
              </span>
              <span className="text-center text-sm font-semibold leading-tight text-foreground sm:text-base">{w.t}</span>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}
