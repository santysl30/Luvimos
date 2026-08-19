import Link from "next/link";
import { Chat, Lesa, Shell, Stat } from "@/components/LuvimosUI";

export default function Home() {
  return <Shell><main className="mx-auto max-w-7xl px-5 lg:px-8">
    <section className="grid min-h-[calc(100vh-73px)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b8ff39]/20 bg-[#b8ff39]/5 px-4 py-2 text-xs text-[#b8ff39]"><span className="h-1.5 w-1.5 rounded-full bg-[#b8ff39] shadow-[0_0_10px_#b8ff39] animate-pulse-neon"/>LUVIMOS INTELLIGENCE CORE · ONLINE</div>
        <h1 className="max-w-4xl text-5xl font-black leading-[.96] tracking-[-.05em] sm:text-6xl lg:text-8xl">Understand what you feel.<span className="block bg-gradient-to-r from-[#b8ff39] via-[#65f35a] to-[#48f0d0] bg-clip-text text-transparent">Understand yourself.</span></h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-[#91a39a]">Luvimos combines conversational AI, emotional signals and longitudinal patterns into one private space for self-reflection — with Lesa as the interface.</p>
        <div className="mt-9 flex flex-wrap gap-3"><Link href="/assistant" className="rounded-full bg-[#b8ff39] px-6 py-3 text-sm font-bold text-black shadow-[0_0_35px_rgba(184,255,57,.22)] transition hover:-translate-y-0.5">Meet Lesa →</Link><Link href="/insights" className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold transition hover:border-[#b8ff39]/40 hover:text-[#b8ff39]">Open emotional map</Link></div>
        <div className="mt-12 grid max-w-xl grid-cols-3 gap-3"><Stat label="VAD" value="3D"/><Stat label="Memory" value="Longitudinal"/><Stat label="AI" value="Live-ready"/></div>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#b8ff39]/10 animate-spin-slow"/>
        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#48f0d0]/10 animate-spin-slow" style={{animationDirection:'reverse'}}/>
        <div className="glass relative overflow-hidden rounded-[2rem] p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#b8ff39]/10 to-transparent"/>
          <div className="absolute right-5 top-5 rounded-full border border-[#b8ff39]/20 bg-black/20 px-3 py-1 text-[10px] tracking-[.2em] text-[#b8ff39]">LESA NODE 01</div>
          <Lesa/>
          <div className="mt-2 grid grid-cols-3 gap-2"><Metric label="VALENCE" value="+0.72" color="#b8ff39"/><Metric label="AROUSAL" value="0.38" color="#48f0d0"/><Metric label="DOMINANCE" value="0.61" color="#9a7cff"/></div>
        </div>
        <div className="mt-4"><Chat/></div>
      </div>
    </section>
    <section className="border-t border-white/5 py-20"><div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs uppercase tracking-[.25em] text-[#b8ff39]">System modules</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">More than a chatbot.</h2></div><p className="max-w-md text-sm leading-6 text-[#607168]">Navigate into each subsystem instead of scrolling through one long landing page.</p></div><div className="grid gap-5 md:grid-cols-3"><Feature title="AI companion" text="Live-ready Lesa with browser voice input, speech output and a secure server-side AI bridge." href="/assistant" icon="◉"/><Feature title="Living insights" text="Visualize emotional signals across repeated reflections and discover longitudinal patterns." href="/insights" icon="⌁"/><Feature title="Play & reset" text="Short interactive games for attention resets, with more experiences ready to be added." href="/games" icon="✦"/></div></section>
  </main></Shell>;
}
function Metric({label,value,color}:{label:string;value:string;color:string}){return <div className="rounded-xl border border-white/5 bg-black/20 p-3"><p className="text-[9px] tracking-[.18em] text-[#607168]">{label}</p><p className="mt-1 font-bold" style={{color}}>{value}</p></div>}
function Feature({title,text,href,icon}:{title:string;text:string;href:string;icon:string}){return <Link href={href} className="glass group rounded-3xl p-7 transition duration-300 hover:-translate-y-1 hover:border-[#b8ff39]/35"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#b8ff39]/8 text-xl text-[#b8ff39]">{icon}</span><h2 className="mt-5 text-2xl font-bold">{title}</h2><p className="mt-3 text-sm leading-6 text-[#91a39a]">{text}</p><span className="mt-6 inline-block text-sm font-semibold text-white group-hover:text-[#b8ff39]">Open module →</span></Link>}
