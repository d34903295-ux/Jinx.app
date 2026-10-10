import { FadeIn } from './FadeIn'
import { AnimatedText } from './AnimatedText'
import { ContactButton } from './ContactButton'
import { FileText, Terminal, WifiOff, Cpu, ShieldCheck } from 'lucide-react'
import { sfx } from '../lib/sound'

const ABOUT_TEXT =
  'Cloud AI dies the moment you lose cellular signal. Jinx gives you an autonomous intelligence operating 100% locally on your phone: on-device neural inference, zero telemetry, NotebookLM-grade document analysis, and native Python execution. Zero servers. Total sovereignty.'

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 bg-[#0C0C0C] font-kanit overflow-hidden"
    >
      {/* Background ambient glow spheres */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#7621B0]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#00f5a0]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 4 Decorative 3D Glass / Chrome Feature Floating Badges in corners */}

      {/* Top-Left: 3D Neural Processor Core */}
      <div className="absolute top-[6%] left-[2%] sm:left-[4%] md:left-[6%] w-[130px] sm:w-[170px] md:w-[210px] pointer-events-auto z-10">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <div
            onClick={() => sfx.playBlip(920)}
            className="relative group p-3 rounded-3xl bg-gradient-to-br from-white/10 via-black/80 to-white/5 border border-white/20 backdrop-blur-2xl shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#00f5a0]/30 to-[#7621B0]/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
            <img
              src="/assets/jinx_chip_webgpu.png"
              alt="3D Neural Core"
              className="relative z-10 w-full h-auto object-contain rounded-2xl filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
              loading="lazy"
            />
            <div className="text-[11px] font-mono text-center text-[#00f5a0] mt-2 uppercase tracking-widest font-semibold flex items-center justify-center gap-1">
              <span className="size-1.5 rounded-full bg-[#00f5a0] animate-pulse" />
              <span>WebGPU Core</span>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom-Left: 3D Sovereign Vector Globe */}
      <div className="absolute bottom-[6%] left-[2%] sm:left-[5%] md:left-[8%] w-[120px] sm:w-[150px] md:w-[180px] pointer-events-auto z-10">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <div
            onClick={() => sfx.playBlip(750)}
            className="relative group p-3 rounded-3xl bg-gradient-to-br from-white/10 via-black/80 to-white/5 border border-white/20 backdrop-blur-2xl shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="absolute -inset-2 bg-[#7621B0]/30 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
            <img
              src="/assets/jinx_vector_rag_3d.png"
              alt="3D Vector RAG Globe"
              className="relative z-10 w-full h-auto object-contain rounded-2xl filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
              loading="lazy"
            />
            <div className="text-[11px] font-mono text-center text-[#D7E2EA] mt-2 uppercase tracking-widest font-semibold">
              Vector RAG
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Top-Right: 3D Pyodide Python Supersonic Engine */}
      <div className="absolute top-[6%] right-[2%] sm:right-[4%] md:right-[6%] w-[120px] sm:w-[160px] md:w-[190px] pointer-events-auto z-10">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <div
            onClick={() => sfx.playBlip(820)}
            className="relative group p-3 rounded-3xl bg-gradient-to-br from-white/10 via-black/80 to-white/5 border border-white/20 backdrop-blur-2xl shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#BE4C00]/40 to-[#E07A5F]/40 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
            <img
              src="/assets/jinx_pyodide_engine.png"
              alt="Pyodide WASM Engine"
              className="relative z-10 w-full h-auto object-contain rounded-2xl filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
              loading="lazy"
            />
            <div className="text-[11px] font-mono text-center text-[#F4A261] mt-2 uppercase tracking-widest font-semibold">
              Pyodide WASM
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom-Right: 3D Sovereign Air-Gapped Shield */}
      <div className="absolute bottom-[6%] right-[2%] sm:right-[5%] md:right-[8%] w-[120px] sm:w-[150px] md:w-[190px] pointer-events-auto z-10">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <div
            onClick={() => sfx.playSuccess()}
            className="relative group p-3 rounded-3xl bg-gradient-to-br from-white/10 via-black/80 to-white/5 border border-white/20 backdrop-blur-2xl shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="absolute -inset-2 bg-[#00f5a0]/30 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
            <img
              src="/assets/jinx_survival_radar.png"
              alt="100% Air-Gapped Sovereign Shield"
              className="relative z-10 w-full h-auto object-contain rounded-2xl filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
              loading="lazy"
            />
            <div className="text-[11px] font-mono text-center text-[#00f5a0] mt-2 uppercase tracking-widest font-semibold flex items-center justify-center gap-1">
              <ShieldCheck className="size-3" />
              <span>100% Offline</span>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Center Content */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center text-center px-4">
        {/* Section Badge with Didone italic touch */}
        <FadeIn delay={0} y={20} duration={0.7}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs font-mono tracking-widest text-[#00f5a0] uppercase mb-6 shadow-inner">
            <span className="size-2 rounded-full bg-[#00f5a0] animate-pulse" />
            <span>SOVEREIGN ARCHITECTURE // AIR-GAPPED BY DESIGN</span>
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.05} y={40} duration={0.8}>
          <h2
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight select-none"
          >
            Why Jinx
          </h2>
        </FadeIn>

        {/* Subtitle with didone serif collision */}
        <FadeIn delay={0.1} y={20} duration={0.8}>
          <p className="font-serif-accent text-white/60 text-lg sm:text-2xl mt-3 tracking-wide">
            Autonomous intelligence when the global grid goes dark.
          </p>
        </FadeIn>

        {/* Gap between heading and text */}
        <div className="h-8 sm:h-12 md:h-14" />

        {/* Animated paragraph */}
        <AnimatedText
          text={ABOUT_TEXT}
          className="text-[#D7E2EA] font-medium leading-relaxed max-w-[620px] text-center text-base sm:text-lg md:text-xl"
        />

        {/* Gap between text and button */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* CTA Button */}
        <FadeIn delay={0.2} y={30} duration={0.8}>
          <ContactButton
            label="DOWNLOAD APK (327 MB)"
            href="/Jinx-app.apk"
            download="Jinx-app.apk"
          />
        </FadeIn>
      </div>
    </section>
  )
}

export default AboutSection
