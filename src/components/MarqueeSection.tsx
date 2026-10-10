import { useEffect, useRef, useState } from 'react'
import {
  Cpu,
  FileText,
  Terminal,
  Shield,
  WifiOff,
  Zap,
  Activity,
  Layers,
  Database,
  Radio,
  Flame,
  CheckCircle2,
} from 'lucide-react'
import { sfx } from '../lib/sound'

interface JinxScreenCard {
  id: string
  tag: string
  title: string
  icon: typeof Cpu
  accent: string
  badge: string
  previewType: 'chat' | 'rag' | 'code' | 'survival' | 'metrics' | 'vault'
  snippet: {
    line1: string
    line2?: string
    highlight?: string
    sub?: string
  }
}

const ROW1_CARDS: JinxScreenCard[] = [
  {
    id: 'c1',
    tag: 'WEBGPU NEURAL INFERENCE',
    title: 'On-Device Token Stream',
    icon: Cpu,
    accent: '#00f5a0',
    badge: '0ms SERVER LATENCY',
    previewType: 'chat',
    snippet: {
      line1: 'Prompt: Solar compass calculation without GPS',
      line2: 'Jinx: Plant stick vertically. Mark shadow tip T1, wait 15m for T2. Line T1-T2 forms exact East-West axis.',
      highlight: 'TOKEN STREAM • 32 tok/s • LOCAL GPU',
    },
  },
  {
    id: 'c2',
    tag: 'NOTEBOOKLM VECTOR RAG',
    title: 'Page-Level Interactive Citations',
    icon: FileText,
    accent: '#7621B0',
    badge: '384-DIM EMBEDDINGS',
    previewType: 'rag',
    snippet: {
      line1: 'Document: Wilderness_Emergency_Protocol.pdf',
      line2: 'Answer: Grade 2 Hypothermia requires passive rewarming and warm sweet fluids.',
      highlight: 'CITATION [1] -> Page 42, §3.2 Verified',
    },
  },
  {
    id: 'c3',
    tag: 'PYODIDE WASM SANDBOX',
    title: 'Scientific Python Runtime',
    icon: Terminal,
    accent: '#BE4C00',
    badge: '15s WATCHDOG SAFETY',
    previewType: 'code',
    snippet: {
      line1: '>>> import numpy as np; import scipy',
      line2: '>>> def calc_trajectory(v0, angle): ...',
      highlight: 'STDOUT: Trajectory mapped. 1,000 steps in 12ms',
    },
  },
  {
    id: 'c4',
    tag: 'DISASTER RESILIENCE',
    title: 'Emergency Medical Dossier',
    icon: Flame,
    accent: '#00d9f5',
    badge: 'OFF-GRID TRIAGE',
    previewType: 'survival',
    snippet: {
      line1: 'Scenario: Arterial hemorrhage in deep backcountry',
      line2: 'Action: Apply windlass tourniquet 5cm proximal to wound. Mark exact application timestamp.',
      highlight: 'OFFLINE DOSSIER • MEDICAL LEVEL 4',
    },
  },
  {
    id: 'c5',
    tag: 'ZERO-TELEMETRY AUDIT',
    title: 'Hardware Isolation Ring',
    icon: Shield,
    accent: '#00f5a0',
    badge: 'AIR-GAPPED 100%',
    previewType: 'vault',
    snippet: {
      line1: 'Audit: Android cellular baseband isolated',
      line2: 'Telemetry: 0 bytes outbound. WebGPU compute shaders verified air-gapped.',
      highlight: 'SHA-256 VAULT VERIFIED • AIR-GAP OK',
    },
  },
]

const ROW2_CARDS: JinxScreenCard[] = [
  {
    id: 'c6',
    tag: 'LOCAL HARDWARE METRICS',
    title: 'WebGPU Pipeline Monitor',
    icon: Activity,
    accent: '#00f5a0',
    badge: '60 FPS SHADERS',
    previewType: 'metrics',
    snippet: {
      line1: 'Kernel: Llama-3.2-1B-Q4_K_M (840 MB RAM)',
      line2: 'VRAM Throughput: 14.8 GB/s bandwidth on Adreno / Mali GPU',
      highlight: 'ZERO OVERHEAT • THERMAL THROTTLE 0%',
    },
  },
  {
    id: 'c7',
    tag: 'EMBEDDING STORAGE',
    title: 'On-Device Vector Database',
    icon: Database,
    accent: '#B600A8',
    badge: 'INDEXED-DB VAULT',
    previewType: 'rag',
    snippet: {
      line1: 'Storage: 10,000 document chunks pre-embedded',
      line2: 'Cosine similarity match in 8.4ms using SIMD WASM',
      highlight: '0 SERVER CALLS • TOTAL PRIVACY',
    },
  },
  {
    id: 'c8',
    tag: 'OFFGRID TELEMETRY',
    title: 'Emergency Frequency Net',
    icon: Radio,
    accent: '#F4A261',
    badge: 'VHF / UHF READY',
    previewType: 'survival',
    snippet: {
      line1: 'Frequencies: National Simplex 146.520 MHz cached',
      line2: 'Civil distress protocols & Morse synthesizer ready',
      highlight: 'LISTEN ONLY • PASSIVE RADAR',
    },
  },
  {
    id: 'c9',
    tag: 'LOCAL AGENT PROTOCOL',
    title: 'Multi-Step Offline Workflow',
    icon: Zap,
    accent: '#7621B0',
    badge: 'AUTONOMOUS LOOP',
    previewType: 'code',
    snippet: {
      line1: 'Step 1: Extract PDF -> Step 2: Math Vector -> Step 3: Pyodide execution',
      line2: '100% autonomous local pipeline on your mobile hardware',
      highlight: 'AGENT VERIFIED • ZERO API KEYS',
    },
  },
  {
    id: 'c10',
    tag: 'HARDWARE SECURITY',
    title: 'Encrypted Indexed Vault',
    icon: Layers,
    accent: '#00d9f5',
    badge: 'CHACHA20-POLY1305',
    previewType: 'vault',
    snippet: {
      line1: 'Key derivation: Argon2id with device-bound seed',
      line2: 'Data stays encrypted on physical flash storage at rest',
      highlight: 'MILITARY-GRADE AIR-GAP ENCRYPTION',
    },
  },
]

function ScreenCard({ card }: { card: JinxScreenCard }) {
  const Icon = card.icon

  return (
    <div
      onMouseEnter={() => sfx.playBlip(950, 0.02)}
      className="w-[320px] sm:w-[380px] shrink-0 rounded-[28px] p-5 sm:p-6 bg-gradient-to-br from-white/10 via-[#12151D] to-black/80 border border-white/15 backdrop-blur-xl flex flex-col justify-between gap-4 shadow-xl hover:border-white/30 hover:scale-102 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div
            className="size-7 rounded-lg flex items-center justify-center border shadow-inner"
            style={{
              backgroundColor: `${card.accent}15`,
              borderColor: `${card.accent}40`,
            }}
          >
            <Icon className="size-4" style={{ color: card.accent }} />
          </div>
          <span className="text-[10px] font-mono tracking-wider text-white/50 uppercase">
            {card.tag}
          </span>
        </div>
        <span
          className="text-[9px] font-mono px-2 py-0.5 rounded-full border font-bold uppercase"
          style={{
            backgroundColor: `${card.accent}15`,
            borderColor: `${card.accent}40`,
            color: card.accent,
          }}
        >
          {card.badge}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00f5a0] transition-colors leading-tight">
          {card.title}
        </h4>
        <div className="p-3 rounded-xl bg-black/50 border border-white/10 font-mono text-xs flex flex-col gap-1 shadow-inner">
          <p className="text-white/80 line-clamp-2">{card.snippet.line1}</p>
          {card.snippet.line2 && (
            <p className="text-white/50 line-clamp-2 text-[11px]">{card.snippet.line2}</p>
          )}
        </div>
      </div>

      <div
        className="text-[10px] font-mono flex items-center gap-1.5 pt-2 border-t border-white/10 font-semibold"
        style={{ color: card.accent }}
      >
        <CheckCircle2 className="size-3 shrink-0" />
        <span className="truncate">{card.snippet.highlight}</span>
      </div>
    </div>
  )
}

export function MarqueeSection() {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#0C0C0C] font-kanit overflow-hidden relative z-10 border-y border-white/5">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[300px] bg-gradient-to-r from-[#7621B0]/10 via-[#00f5a0]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Row 1 - Left to Right */}
      <div className="w-full flex overflow-hidden mb-6 sm:mb-8">
        <div className="flex gap-4 sm:gap-6 animate-marquee hover:[animation-play-state:paused]">
          {[...ROW1_CARDS, ...ROW1_CARDS].map((card, idx) => (
            <ScreenCard key={`${card.id}-${idx}`} card={card} />
          ))}
        </div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="w-full flex overflow-hidden">
        <div className="flex gap-4 sm:gap-6 animate-marquee-reverse hover:[animation-play-state:paused]">
          {[...ROW2_CARDS, ...ROW2_CARDS].map((card, idx) => (
            <ScreenCard key={`${card.id}-${idx}`} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MarqueeSection
