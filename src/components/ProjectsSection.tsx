import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn } from './FadeIn'
import { LiveProjectButton } from './LiveProjectButton'
import { Cpu, CheckCircle2, FileText, Terminal, Radio, Sparkles, ShieldCheck } from 'lucide-react'
import { sfx } from '../lib/sound'

interface FeatureShowcase {
  number: string
  category: string
  title: string
  description: string
  tag: string
  accent: string
  metrics: Array<{ label: string; value: string }>
  codePreview: string
  imageSrc: string
}

const SHOWCASES: FeatureShowcase[] = [
  {
    number: '01',
    category: 'ON-DEVICE NEURAL COMPUTE',
    title: 'Neural Chat & Token Stream',
    description:
      'Zero-latency, 100% offline conversational AI running quantized Llama-3.2 on local WebGPU shaders. No cloud, no telemetry, no tracking.',
    tag: 'WEBGPU // 32 TOKENS/S',
    accent: '#00f5a0',
    metrics: [
      { label: 'Latency', value: '0ms Server' },
      { label: 'Privacy', value: '100% Air-gapped' },
      { label: 'Memory', value: '840 MB RAM' },
    ],
    codePreview:
      '// WebGPU local pipeline\nawait pipeline.generate({\n  prompt: "Synthesize field triage protocol",\n  max_tokens: 512,\n  temperature: 0.2\n});',
    imageSrc: '/assets/jinx_hero_core_3d.png',
  },
  {
    number: '02',
    category: 'NOTEBOOKLM ARCHITECTURE',
    title: 'Vector Document Intelligence',
    description:
      'Index heavy PDF manuals and technical dossiers locally using 384-dimensional on-device vector embeddings with interactive page citations.',
    tag: 'EMBEDDINGS // COSINE SEARCH',
    accent: '#B600A8',
    metrics: [
      { label: 'Model', value: 'all-MiniLM-L6-v2' },
      { label: 'Citations', value: 'Interactive Popover' },
      { label: 'Storage', value: 'IndexedDB Vault' },
    ],
    codePreview:
      '// Vector RAG cosine match\nconst results = await vectorStore.query({\n  query: "hypothermia protocol",\n  top_k: 3,\n  threshold: 0.78\n});',
    imageSrc: '/assets/jinx_vector_rag_3d.png',
  },
  {
    number: '03',
    category: 'LOCAL WEB-ASSEMBLY SANDBOX',
    title: 'Autonomous Python Engine',
    description:
      'Execute scientific Python routines, mathematical formulas, and telemetry calculations offline in an isolated Pyodide WebAssembly container.',
    tag: 'PYODIDE // PYTHON 3.12',
    accent: '#BE4C00',
    metrics: [
      { label: 'Sandbox', value: 'WASM V8 Worker' },
      { label: 'Timeout', value: '5000ms Watchdog' },
      { label: 'Libraries', value: 'NumPy, Math, JSON' },
    ],
    codePreview:
      '# Pyodide offline execution\nimport math\ndef calc_bearing(lat1, lon1, lat2, lon2):\n    # Trigonometric spherical law\n    return math.degrees(math.atan2(y, x))',
    imageSrc: '/assets/jinx_pyodide_engine.png',
  },
  {
    number: '04',
    category: 'SURVIVAL AIR-GAP PROTOCOL',
    title: 'Zero-Signal Blackout Vault',
    description:
      'Emergency medical dossiers, emergency radio frequencies, and astronomical triangulation protocols pre-cached and ready during civil blackout.',
    tag: 'OFFGRID // 0 BARS NEEDED',
    accent: '#00d9f5',
    metrics: [
      { label: 'Signal', value: '0.00 Bars Required' },
      { label: 'Crypto', value: 'ChaCha20 Encrypted' },
      { label: 'Updates', value: 'Peer-to-Peer APK' },
    ],
    codePreview:
      '// Emergency triage protocol dispatch\nconst beacon = await emergencyVault.load({\n  scenario: "CIVIL_BLACKOUT_GRID_FAIL",\n  offline_mode: true\n});',
    imageSrc: '/assets/jinx_survival_radar.png',
  },
]

interface ShowcaseCardProps {
  showcase: FeatureShowcase
  index: number
  totalCards: number
}

function ShowcaseCard({ showcase, index, totalCards }: ShowcaseCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.93 + index * 0.015, 1])

  return (
    <div
      ref={containerRef}
      className="sticky top-24 md:top-32 w-full flex items-center justify-center font-kanit"
      style={{
        top: `${88 + index * 32}px`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full rounded-[36px] sm:rounded-[48px] md:rounded-[56px] border border-white/20 bg-[#0E1017] p-5 sm:p-7 md:p-10 flex flex-col gap-6 md:gap-8 shadow-2xl relative overflow-hidden backdrop-blur-2xl"
      >
        {/* Subtle Ambient Radial Highlight */}
        <div
          className="absolute top-0 right-0 w-[50vw] h-[340px] blur-3xl pointer-events-none opacity-20"
          style={{ background: `radial-gradient(circle, ${showcase.accent} 0%, transparent 70%)` }}
        />

        {/* Top Row: Number, Category, Title, Live Project CTA */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.8rem)' }}
              className="font-black leading-none text-white select-none tracking-tight font-kanit"
            >
              {showcase.number}
            </span>
            <div className="flex flex-col">
              <span
                className="text-xs sm:text-sm font-mono uppercase tracking-widest flex items-center gap-2 font-bold"
                style={{ color: showcase.accent }}
              >
                <span
                  className="size-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: showcase.accent }}
                />
                {showcase.category}
              </span>
              <h3
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.4rem)' }}
                className="font-black uppercase tracking-tight text-white leading-tight"
              >
                {showcase.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LiveProjectButton
              label="GET APK"
              href="/JINX DEFINITIVE.apk"
              download="JINX DEFINITIVE.apk"
              onClick={() => sfx.playSuccess()}
              className="text-xs sm:text-sm py-2.5 px-6 font-mono"
            />
          </div>
        </div>

        {/* Bottom Row: Two-Column Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-7 items-stretch relative z-10">
          {/* Left Column (46% width): Telemetry + Code Preview */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {/* Top Box: Real Telemetry Metrics */}
            <div className="w-full rounded-[24px] sm:rounded-[30px] p-5 bg-gradient-to-br from-white/10 via-[#141722] to-black/70 border border-white/15 backdrop-blur-xl flex flex-col justify-between shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#D7E2EA]/70 flex items-center gap-1.5">
                  <Cpu className="size-3.5" style={{ color: showcase.accent }} />
                  Telemetry
                </span>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full border font-semibold"
                  style={{
                    backgroundColor: `${showcase.accent}15`,
                    borderColor: `${showcase.accent}40`,
                    color: showcase.accent,
                  }}
                >
                  {showcase.tag}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-3">
                {showcase.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <span className="text-[10px] font-mono text-white/40 uppercase">
                      {m.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-white tracking-tight mt-0.5">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Box: Real Code / Pipeline Preview */}
            <div className="w-full rounded-[24px] sm:rounded-[30px] p-5 bg-[#080A0E] border border-white/10 font-mono text-[11px] sm:text-xs flex flex-col justify-between overflow-hidden shadow-inner">
              <div className="flex items-center justify-between text-white/40 text-[10px] pb-2 border-b border-white/10">
                <span>LOCAL_PIPELINE.TS</span>
                <span style={{ color: showcase.accent }}>AIR-GAPPED</span>
              </div>
              <pre className="text-[#D7E2EA]/90 overflow-x-auto py-2.5 leading-relaxed font-mono">
                <code>{showcase.codePreview}</code>
              </pre>
              <div
                className="text-[10px] flex items-center gap-1.5 pt-2 border-t border-white/10 font-semibold"
                style={{ color: showcase.accent }}
              >
                <CheckCircle2 className="size-3" />
                <span>Verified 100% on on-device GPU shaders</span>
              </div>
            </div>
          </div>

          {/* Right Column (54% width): Distinctive Visual Mockup Panel */}
          <div className="md:col-span-7 rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-b from-[#151926] via-[#0E1119] to-[#090A0E] border border-white/15 p-6 flex flex-col justify-between min-h-[320px] relative group">
            <div className="flex items-center justify-between relative z-10">
              <span
                className="text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-1.5"
                style={{ color: showcase.accent }}
              >
                <Sparkles className="size-3.5" />
                <span>OFFLINE INTERFACE ARCHITECTURE</span>
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase">
                ANDROID ARM64
              </span>
            </div>

            {/* Central Graphic with Glow */}
            <div className="relative my-auto py-4 sm:py-6 flex items-center justify-center">
              <div
                className="absolute -inset-4 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: showcase.accent }}
              />
              <img
                src={showcase.imageSrc}
                alt={showcase.title}
                loading="lazy"
                className="relative z-10 max-h-[200px] sm:max-h-[240px] md:max-h-[250px] w-auto max-w-[85%] object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform duration-700 animate-float-slow pointer-events-none"
              />
            </div>

            {/* Description Footer */}
            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#D7E2EA]/70">
              <p className="max-w-md font-light leading-relaxed">
                {showcase.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function ProjectsSection() {
  return (
    <section
      id="showcase"
      className="w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-24 sm:pt-28 md:pt-32 pb-32 px-4 sm:px-6 md:px-10 font-kanit relative z-10"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center mb-16 sm:mb-20">
        <FadeIn delay={0} y={30} duration={0.8}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs font-mono tracking-widest text-[#00f5a0] uppercase mb-4 shadow-inner">
            <span className="size-2 rounded-full bg-[#00f5a0] animate-pulse" />
            <span>DEEP TECH // OFFGRID CAPABILITIES</span>
          </div>
        </FadeIn>
        <FadeIn delay={0.05} y={30} duration={0.8}>
          <h2
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
          >
            Inside Jinx
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={20} duration={0.8}>
          <p className="font-serif-accent text-white/60 text-lg sm:text-2xl mt-3 text-center">
            Inspect the isolated subsystems running on bare metal.
          </p>
        </FadeIn>
      </div>

      {/* Sticky Stacking Cards */}
      <div className="flex flex-col gap-12 sm:gap-16 max-w-6xl mx-auto">
        {SHOWCASES.map((showcase, index) => (
          <ShowcaseCard
            key={showcase.number}
            showcase={showcase}
            index={index}
            totalCards={SHOWCASES.length}
          />
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
