"use client";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl border border-[#b8ff39]/30 bg-[#b8ff39]/5 text-[#b8ff39] neon">
        <span className="flex items-center justify-center gap-[1px] text-[13px] font-black leading-none tracking-normal">
          <span>L</span>
          <span>S</span>
        </span>
        <i className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#b8ff39] shadow-[0_0_10px_#b8ff39]" />
      </span>
      {!compact && <span className="text-lg font-bold tracking-tight">Luvimos</span>}
    </Link>
  );
}

export function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animate-drift absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-[#65f35a]/10 blur-[120px]" />
      <div className="animate-drift absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#48f0d0]/8 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,#070b09_75%)]" />
    </div>
  );
}

const links = [
  ["Home", "/"],
  ["AI Companion", "/assistant"],
  ["Insights", "/insights"],
  ["Games", "/games"],
  ["About", "/about"],
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#070b09]/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Logo />
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-[#91a39a] transition hover:text-[#b8ff39]"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="rounded-full px-4 py-2 text-sm text-[#91a39a] hover:text-white">
            Sign in
          </Link>
          <Link href="/signup" className="rounded-full bg-[#b8ff39] px-5 py-2.5 text-sm font-bold text-[#071006]">
            Get started
          </Link>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-white/10 px-3 py-2 md:hidden"
        >
          {open ? "×" : "☰"}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/5 bg-[#0b110d] px-5 pb-5 md:hidden">
          {links.map(([label, href]) => (
            <Link
              onClick={() => setOpen(false)}
              key={href}
              href={href}
              className="block py-3 text-sm text-[#91a39a]"
            >
              {label}
            </Link>
          ))}
          <div className="mt-3 flex gap-2 border-t border-white/5 pt-4">
            <Link href="/login" onClick={() => setOpen(false)} className="flex-1 rounded-full border border-white/10 px-4 py-2 text-center text-sm">
              Sign in
            </Link>
            <Link href="/signup" onClick={() => setOpen(false)} className="flex-1 rounded-full bg-[#b8ff39] px-4 py-2 text-center text-sm font-bold text-black">
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <Aurora />
      <Nav />
      {children}
      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs text-[#607168] sm:flex-row">
          <span>© 2026 Luvimos</span>
          <span>Private by design · AI with guardrails · Self-reflection, not diagnosis</span>
        </div>
      </footer>
    </>
  );
}

export function Lesa() {
  return (
    <div className="relative mx-auto h-64 w-56 animate-float">
      <div className="absolute inset-5 rounded-[45%] bg-[#b8ff39]/10 blur-3xl" />
      <div className="absolute left-1/2 top-5 h-40 w-32 -translate-x-1/2 rounded-[48%] border border-[#b8ff39]/30 bg-gradient-to-b from-[#17261b] to-[#0a100c] shadow-[0_0_45px_rgba(184,255,57,.12)]">
        <div className="absolute left-7 top-16 h-2 w-2 rounded-full bg-[#b8ff39] shadow-[0_0_10px_#b8ff39]" />
        <div className="absolute right-7 top-16 h-2 w-2 rounded-full bg-[#b8ff39] shadow-[0_0_10px_#b8ff39]" />
        <div className="absolute bottom-10 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-[#48f0d0]/60" />
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
        <p className="font-bold text-[#b8ff39]">LESA</p>
        <p className="text-[10px] tracking-[.3em] text-[#607168]">LUVIMOS EMOTIONAL SUPPORT AI</p>
      </div>
    </div>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-xs uppercase tracking-[.2em] text-[#607168]">{label}</p>
      <p className="mt-2 text-2xl font-bold text-[#b8ff39]">{value}</p>
    </div>
  );
}

export function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "lesa", text: "Hi. I’m Lesa. I can help you reflect, explore patterns, or simply stay with you for a while." },
  ]);
  const [speaking, setSpeaking] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMessages((m) => [...m, { role: "you", text: q }, { role: "lesa", text: reply(q) }]);
    setInput("");
  };

  const voice = () => {
    if (typeof window === "undefined") return;
    const w = window as Window & typeof globalThis & { SpeechRecognition?: any; webkitSpeechRecognition?: any };
    const Recognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (Recognition) {
      const recognition = new Recognition();
      recognition.onresult = (e: any) => setInput(e.results[0][0].transcript);
      recognition.start();
    } else {
      alert("Speech recognition is not available in this browser.");
    }
  };

  const speak = (text: string) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between border-b border-white/5 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center gap-px rounded-xl bg-[#b8ff39]/10 text-xs font-black text-[#b8ff39]">
            <span>L</span><span>S</span>
          </span>
          <div>
            <p className="text-sm font-semibold">Lesa</p>
            <p className="text-[10px] text-[#607168]">ONLINE · REFLECTION MODE</p>
          </div>
        </div>
        <span className="h-2 w-2 rounded-full bg-[#b8ff39] shadow-[0_0_10px_#b8ff39]" />
      </div>
      <div className="h-80 space-y-3 overflow-y-auto p-5">
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "you" ? "ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-[#b8ff39] p-3 text-sm text-black" : "max-w-[85%] rounded-2xl rounded-bl-sm bg-[#111c16] p-3 text-sm text-[#d7e5db]"}
          >
            <p>{m.text}</p>
            {m.role === "lesa" && (
              <button onClick={() => speak(m.text)} className="mt-2 text-[10px] text-[#b8ff39]">
                {speaking ? "Speaking…" : "🔊 Speak"}
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t border-white/5 p-4">
        <button onClick={voice} className="rounded-xl border border-white/10 px-3" aria-label="Use microphone">🎙</button>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Talk to Lesa…" className="min-w-0 flex-1 rounded-xl bg-black/20 px-4 text-sm outline-none placeholder:text-[#607168]" />
        <button onClick={send} className="rounded-xl bg-[#b8ff39] px-4 text-sm font-bold text-black">Send</button>
      </div>
    </div>
  );
}

function reply(q: string) {
  const x = q.toLowerCase();
  if (x.includes("sad") || x.includes("bad")) return "I hear you. You don’t have to solve everything right now. What happened just before you started feeling this way?";
  if (x.includes("stress") || x.includes("anx")) return "Let’s slow it down. Try naming the one thing that feels most urgent, then we can separate it from everything else.";
  if (x.includes("hello") || x.includes("hi")) return "Hey. I’m here. Want to reflect, explore your week, or play a quick game?";
  return "That’s interesting. Tell me a little more, and I’ll help you look for the emotion, context, and pattern without judging it.";
}
