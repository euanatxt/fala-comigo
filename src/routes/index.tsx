import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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

type W = { t: string; e: string };
const CATS: { name: string; e: string; bg: string; words: W[] }[] = [
  { name: "Eu", e: "🙋", bg: "bg-pink", words: [
    { t: "eu", e: "🙋" }, { t: "você", e: "👉" }, { t: "mamãe", e: "👩" }, { t: "papai", e: "👨" },
    { t: "quero", e: "🤲" }, { t: "não quero", e: "🙅" }, { t: "sim", e: "👍" }, { t: "não", e: "👎" },
    { t: "obrigado", e: "🙏" }, { t: "por favor", e: "🥺" }, { t: "oi", e: "👋" }, { t: "tchau", e: "🖐️" },
  ]},
  { name: "Sinto", e: "😊", bg: "bg-lemon", words: [
    { t: "feliz", e: "😄" }, { t: "triste", e: "😢" }, { t: "bravo", e: "😠" }, { t: "com medo", e: "😨" },
    { t: "cansado", e: "😴" }, { t: "com dor", e: "🤕" }, { t: "com fome", e: "😋" }, { t: "com sede", e: "🥵" },
    { t: "com frio", e: "🥶" }, { t: "amo você", e: "❤️" },
  ]},
  { name: "Comer", e: "🍎", bg: "bg-peach", words: [
    { t: "água", e: "💧" }, { t: "suco", e: "🧃" }, { t: "leite", e: "🥛" }, { t: "maçã", e: "🍎" },
    { t: "banana", e: "🍌" }, { t: "pão", e: "🍞" }, { t: "biscoito", e: "🍪" }, { t: "arroz", e: "🍚" },
    { t: "sorvete", e: "🍦" }, { t: "mais", e: "➕" },
  ]},
  { name: "Fazer", e: "⚽", bg: "bg-mint", words: [
    { t: "brincar", e: "🧸" }, { t: "comer", e: "🍽️" }, { t: "beber", e: "🥤" }, { t: "dormir", e: "🛏️" },
    { t: "banheiro", e: "🚽" }, { t: "passear", e: "🚶" }, { t: "assistir", e: "📺" }, { t: "desenhar", e: "🖍️" },
    { t: "abraço", e: "🤗" }, { t: "ajuda", e: "🆘" }, { t: "parar", e: "✋" }, { t: "ir", e: "➡️" },
  ]},
  { name: "Lugares", e: "🏠", bg: "bg-sky", words: [
    { t: "casa", e: "🏠" }, { t: "escola", e: "🏫" }, { t: "parque", e: "🛝" }, { t: "carro", e: "🚗" },
    { t: "quarto", e: "🚪" }, { t: "lá fora", e: "🌳" }, { t: "médico", e: "🩺" }, { t: "vovó", e: "👵" },
  ]},
  { name: "Coisas", e: "🧸", bg: "bg-lilac", words: [
    { t: "bola", e: "⚽" }, { t: "boneca", e: "🪆" }, { t: "livro", e: "📖" }, { t: "música", e: "🎵" },
    { t: "tablet", e: "📱" }, { t: "cachorro", e: "🐶" }, { t: "gato", e: "🐱" }, { t: "cobertor", e: "🧣" },
  ]},
];

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "pt-BR";
  u.rate = 0.9;
  u.pitch = 1.15;
  const v = window.speechSynthesis.getVoices().find((x) => x.lang.toLowerCase().startsWith("pt"));
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

function Index() {
  const [cat, setCat] = useState(0);
  const [sentence, setSentence] = useState<W[]>([]);
  const c = CATS[cat];

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-4 p-3 sm:p-6">
      <h1 className="text-center text-3xl font-extrabold text-primary sm:text-4xl">🗣️ Fala Comigo</h1>

      <section className="sticky top-2 z-10 rounded-3xl border-4 border-pink bg-card p-3 shadow-lg">
        <div className="flex min-h-20 flex-wrap items-center gap-2">
          {sentence.length === 0 && (
            <p className="px-2 text-lg text-muted-foreground">Toque nas palavras para montar uma frase ✨</p>
          )}
          {sentence.map((w, i) => (
            <button key={i} onClick={() => setSentence(sentence.filter((_, j) => j !== i))}
              className="flex flex-col items-center rounded-2xl bg-lemon px-3 py-1 text-base font-bold">
              <span className="text-2xl">{w.e}</span>{w.t}
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <button onClick={() => speak(sentence.map((w) => w.t).join(" "))} disabled={!sentence.length}
            className="rounded-2xl bg-mint py-3 text-lg font-extrabold transition active:scale-95 disabled:opacity-40">🔊 Falar</button>
          <button onClick={() => setSentence(sentence.slice(0, -1))} disabled={!sentence.length}
            className="rounded-2xl bg-peach py-3 text-lg font-extrabold transition active:scale-95 disabled:opacity-40">⬅️ Apagar</button>
          <button onClick={() => setSentence([])} disabled={!sentence.length}
            className="rounded-2xl bg-pink py-3 text-lg font-extrabold transition active:scale-95 disabled:opacity-40">🗑️ Limpar</button>
        </div>
      </section>

      <nav className="flex gap-2 overflow-x-auto pb-1">
        {CATS.map((k, i) => (
          <button key={k.name} onClick={() => setCat(i)}
            className={`shrink-0 rounded-full px-4 py-2 text-lg font-bold transition ${k.bg} ${i === cat ? "ring-4 ring-primary scale-105" : "opacity-80"}`}>
            {k.e} {k.name}
          </button>
        ))}
      </nav>

      <section className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {c.words.map((w) => (
          <button key={w.t} onClick={() => { speak(w.t); setSentence((s) => [...s, w]); }}
            className={`flex aspect-square flex-col items-center justify-center rounded-3xl ${c.bg} p-2 shadow-md transition hover:-translate-y-1 active:scale-90`}>
            <span className="text-5xl sm:text-6xl">{w.e}</span>
            <span className="mt-1 text-center text-lg font-bold leading-tight text-foreground">{w.t}</span>
          </button>
        ))}
      </section>
    </main>
  );
}
