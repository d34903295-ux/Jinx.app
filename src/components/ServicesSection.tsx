import { useState } from 'react'
import { FadeIn } from './FadeIn'
import { Cpu, FileText, Terminal, ShieldAlert, Radio, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react'
import { sfx } from '../lib/sound'

interface FeatureItem {
  number: string
  name: string
  description: string
  tag: string
  icon: typeof Cpu
  accent: string
  spec: {
    engine: string
    latency: string
    privacy: string
  }
}

const FEATURES: FeatureItem[] = [
  {
    number: '01',
    name: 'LOCAL WEBGPU INFERENCE',
    description:
      "Run cutting-edge quantized neural LLMs directly on your phone's GPU. Stream tokens at 60 FPS with 0ms server latency, zero cloud subscriptions, and total offline freedom.",
    tag: 'WEBGPU SHADERS // FP16',
    icon: Cpu,
    accent: '#00f5a0',
    spec: {
      engine: 'Llama-3.2-1B Quantized Q4_K_M',
      latency: '0.0ms Cloud Roundtrip',
      privacy: 'Hardware GPU Shaders',
    },
  },
  {
    number: '02',
    name: 'OFFLINE DOCUMENT RAG',
    description:
      'Upload complex technical manuals, field medicine guides, and PDFs. Search with on-device vector embeddings and inspect exact interactive page-level citations without signal.',
    tag: 'NOTEBOOKLM // 384-DIM',
    icon: FileText,
    accent: '#B600A8',
    spec: {
      engine: 'all-MiniLM-L6-v2 ONNX Runtime',
      latency: '< 14ms Cosine Similarity',
      privacy: 'Local IndexedDB Vault',
    },
  },
  {
    number: '03',
    name: 'AUTONOMOUS PYTHON SANDBOX',
    description:
      'Execute scientific Python scripts, mathematical algorithms, and data calculations locally in an isolated WebAssembly sandbox with watchdog safety.',
    tag: 'PYODIDE WASM // V8 SANDBOX',
    icon: Terminal,
    accent: '#BE4C00',
    spec: {
      engine: 'Python 3.12 WebAssembly',
      latency: 'Native CPU Execution',
      privacy: 'Zero Network Sockets',
    },
  },
  {
    number: '04',
    name: '100% PRIVATE & AIR-GAPPED',
    description:
      'Your queries, files, and intelligence never leave your hardware. Zero telemetry, zero tracking, and zero cloud dependencies forever.',
    tag: 'SHA-256 // ZERO-LEAK',
    icon: ShieldAlert,
    accent: '#00d9f5',
    spec: {
      engine: 'Air-Gap Protocol Ring 0',
      latency: 'No Remote Handshakes',
      privacy: 'ChaCha20 Local Vault',
    },
  },
  {
    number: '05',
    name: 'OFF-GRID SURVIVAL PACK',
    description:
      'Pre-indexed emergency medical dossiers, wilderness protocols, and disaster triage instructions accessible instantly during total blackout.',
    tag: 'BLACKOUT READY // 0 BARS',
    icon: Radio,
    accent: '#F4A261',
    spec: {
      engine: 'Autonomous Triage Index',
      latency: 'Immediate Access',
      privacy: 'Pre-Bundled in APK',
    },
  },
]

export function ServicesSection() {
  const [activeItem, setActiveItem] = useState<number | null>(null)

  return (
    <section
      id="features"
      className="w-full bg-gradient-to-b from-[#0C0C0C] via-[#0F1218] to-[#0A0C10] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-12 py-24 sm:py-32 font-kanit text-[#D7E2EA] relative z-10 border-t border-white/10"
    >
      {/* Background gilded ledger grid texture */}
      <div className="ledger-grid absolute inset-0 opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        {/* Section Badge */}
        <FadeIn delay={0} y={20} duration={0.7}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs font-mono tracking-widest text-[#00f5a0] uppercase mb-4 shadow-inner">
            <span className="size-2 rounded-full bg-[#00f5a0] animate-pulse" />
            <span>CORE ARCHITECTURE // 5 PILLARS</span>
          </div>
        </FadeIn>

        {/* Section Heading with Didone collision */}
        <FadeIn delay={0.05} y={30} duration={0.8}>
          <h2
            style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
          >
            Capabilities
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={20} duration={0.8}>
          <p className="font-serif-accent text-white/60 text-lg sm:text-2xl mt-3 text-center max-w-xl">
            Engineered from silicon to UI for total disconnection from the cloud.
          </p>
        </FadeIn>

        {/* 5 Features List in Editorial Zinc Ledger Grid */}
        <div className="w-full flex flex-col mt-14 sm:mt-20">
          {FEATURES.map((item, index) => {
            const Icon = item.icon
            const isExpanded = activeItem === index

            return (
              <FadeIn
                key={item.number}
                delay={index * 0.08}
                y={20}
                duration={0.7}
                className="w-full"
              >
                <div
                  onClick={() => {
                    sfx.playBlip(700 + index * 50)
                    setActiveItem(isExpanded ? null : index)
                  }}
                  className={`w-full flex flex-col py-8 sm:py-10 border-b border-white/10 transition-all duration-300 group cursor-pointer ${
                    index === 0 ? 'border-t' : ''
                  } ${isExpanded ? 'bg-white/[0.03] px-4 sm:px-6 rounded-2xl' : 'hover:bg-white/[0.015]'}`}
                >
                  <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Number on left with high contrast */}
                    <div className="flex items-center gap-4 sm:gap-6 shrink-0 md:w-[240px]">
                      <span
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
                        className="font-black text-white/30 group-hover:text-white transition-colors leading-none select-none tracking-tight font-kanit"
                      >
                        {item.number}
                      </span>
                      <div
                        className="size-11 sm:size-12 rounded-2xl border border-white/15 bg-white/5 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                        style={{ borderColor: item.accent }}
                      >
                        <Icon className="size-5 sm:size-6" style={{ color: item.accent }} />
                      </div>
                    </div>

                    {/* Name & description in middle */}
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3
                          style={{ fontSize: 'clamp(1.2rem, 2.4vw, 2.2rem)' }}
                          className="font-bold uppercase tracking-tight text-white group-hover:text-[#00f5a0] transition-colors"
                        >
                          {item.name}
                        </h3>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                          {item.tag}
                        </span>
                      </div>
                      <p
                        style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)' }}
                        className="font-light leading-relaxed max-w-2xl text-[#D7E2EA]/70"
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Expand Arrow Right */}
                    <div className="hidden md:flex items-center justify-center size-10 rounded-full border border-white/10 group-hover:border-[#00f5a0] text-white/40 group-hover:text-[#00f5a0] transition-all shrink-0">
                      <ChevronRight className={`size-5 transition-transform duration-300 ${isExpanded ? 'rotate-90 text-[#00f5a0]' : ''}`} />
                    </div>
                  </div>

                  {/* Expandable Technical Telemetry Drawer */}
                  {isExpanded && (
                    <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono animate-fadeIn">
                      <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                        <span className="text-white/40 uppercase block text-[10px]">INTERNAL ENGINE</span>
                        <span className="text-white font-bold mt-1 block">{item.spec.engine}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                        <span className="text-white/40 uppercase block text-[10px]">RESPONSE METRIC</span>
                        <span className="text-[#00f5a0] font-bold mt-1 block">{item.spec.latency}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                        <span className="text-white/40 uppercase block text-[10px]">SECURITY LEVEL</span>
                        <span className="text-white font-bold mt-1 block">{item.spec.privacy}</span>
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
