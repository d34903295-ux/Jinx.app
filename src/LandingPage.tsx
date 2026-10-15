import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { InteractiveTerminal } from './components/InteractiveTerminal'
import { MarqueeSection } from './components/MarqueeSection'
import { AboutSection } from './components/AboutSection'
import { ServicesSection } from './components/ServicesSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactButton } from './components/ContactButton'
import { FadeIn } from './components/FadeIn'
import { Send, ShieldCheck, Code2, Copy, Check, Terminal, WifiOff, Sparkles, Download } from 'lucide-react'
import { sfx } from './lib/sound'

interface LandingPageProps {
  onOpenApp?: () => void
}

const SHA256_HASH = '98269de27a5733db1a37393fddad7c38a08cd22baf132f7ea70d5bccb7a3eb00'

export function LandingPage({ onOpenApp }: LandingPageProps) {
  const [airGapActive, setAirGapActive] = useState<boolean>(true)
  const [copiedHash, setCopiedHash] = useState<boolean>(false)

  const handleCopyHash = () => {
    sfx.playSuccess()
    navigator.clipboard?.writeText(SHA256_HASH)
    setCopiedHash(true)
    setTimeout(() => setCopiedHash(false), 2000)
  }

  const toggleAirGap = () => {
    setAirGapActive((prev) => !prev)
  }

  return (
    <div className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit overflow-x-clip relative selection:bg-[#00f5a0]/30 selection:text-white">
      {/* 0. Floating Sovereign Command Navbar */}
      <Navbar
        onOpenApp={onOpenApp}
        airGapActive={airGapActive}
        onToggleAirGap={toggleAirGap}
      />

      {/* Air-gap alert notification banner if toggled */}
      {!airGapActive && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#BE4C00] text-white font-mono text-xs flex items-center gap-2 shadow-2xl animate-bounce">
          <WifiOff className="size-4" />
          <span>WARNING: Radio subsystem active. Toggle back to secure air-gap.</span>
          <button
            type="button"
            onClick={() => setAirGapActive(true)}
            className="underline font-bold ml-2 cursor-pointer"
          >
            Engage Air-Gap
          </button>
        </div>
      )}

      {/* 1. Hero Section (Digital Wave Field Three.js) */}
      <HeroSection onOpenApp={onOpenApp} />

      {/* 2. Interactive Flagship Simulator Playground (Live Token Stream, RAG, Python WASM, Blackout) */}
      <InteractiveTerminal />

      {/* 3. Marquee Section (Jinx Living Subsystems) */}
      <MarqueeSection />

      {/* 4. Why Jinx Section (3D Holographic Corner Badges) */}
      <AboutSection />

      {/* 5. Core Capabilities (Titanium Zinc Ledger Grid) */}
      <ServicesSection />

      {/* 6. Inside Jinx Section (Sticky Stacking Cards with Custom Visuals) */}
      <ProjectsSection />

      {/* 7. Download APK & Sovereign Footer Banner */}
      <footer
        id="contact"
        className="w-full bg-gradient-to-b from-[#0C0C0C] via-[#0A0C10] to-[#060709] border-t border-white/10 py-24 sm:py-28 px-6 sm:px-10 flex flex-col items-center text-center relative z-20"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          <FadeIn delay={0} y={20} duration={0.8}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00f5a0]/40 bg-[#00f5a0]/10 px-4 py-1.5 font-mono text-xs text-[#00f5a0] uppercase tracking-widest shadow-[0_0_20px_rgba(0,245,160,0.2)]">
              <span className="size-2 rounded-full bg-[#00f5a0] animate-pulse" />
              <span>JINX DEFINITIVE • READY FOR OFFLINE DEPLOYMENT</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} y={30} duration={0.8}>
            <h2
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)' }}
              className="hero-heading font-black uppercase leading-none tracking-tight"
            >
              Get Jinx Today
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={15} duration={0.8}>
            <p className="font-serif-accent text-white/60 text-lg sm:text-2xl -mt-2">
              Install once and operate forever without internet.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} y={20} duration={0.8}>
            <p className="text-[#D7E2EA]/70 max-w-xl text-sm sm:text-base md:text-lg font-light leading-relaxed">
              Fully private on-device intelligence, document vector search, and Python code execution directly on your Android phone. Zero cloud servers, zero subscription fees.
            </p>
          </FadeIn>

          <FadeIn delay={0.45} y={20} duration={0.8}>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-3">
              <ContactButton
                label="DOWNLOAD JINX DEFINITIVE (139 MB)"
                href="/JINX DEFINITIVE.apk"
                download="JINX DEFINITIVE.apk"
                onClick={() => sfx.playSuccess()}
              />

              {onOpenApp && (
                <button
                  type="button"
                  onClick={() => {
                    sfx.playCyberChirp()
                    onOpenApp()
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm hover:bg-white/10 transition-all duration-300 cursor-pointer active:scale-95"
                >
                  Launch In Browser
                </button>
              )}
            </div>
          </FadeIn>

          {/* SHA-256 Checksum Verification Pill */}
          <FadeIn delay={0.5} y={15} duration={0.8}>
            <div className="flex flex-col sm:flex-row items-center gap-2 p-2.5 px-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-white/60 max-w-xl">
              <span className="text-[#00f5a0] uppercase font-bold text-[11px]">SHA-256:</span>
              <span className="truncate max-w-[260px] sm:max-w-xs">{SHA256_HASH}</span>
              <button
                type="button"
                onClick={handleCopyHash}
                className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#00f5a0]/20 hover:text-[#00f5a0] text-white transition-colors cursor-pointer text-[11px]"
              >
                {copiedHash ? <Check className="size-3 text-[#00f5a0]" /> : <Copy className="size-3" />}
                <span>{copiedHash ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </FadeIn>

          {/* Official Community & Links */}
          <FadeIn delay={0.55} y={15} duration={0.8}>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 text-xs sm:text-sm font-mono text-[#D7E2EA]/90">
              <a
                href="https://github.com/d34903295-ux"
                target="_blank"
                rel="noreferrer"
                onClick={() => sfx.playBlip(800)}
                className="flex items-center gap-2 hover:text-[#00f5a0] transition-colors"
              >
                <Code2 className="size-4 text-[#00f5a0]" />
                <span>GitHub Repository</span>
              </a>
              <a
                href="https://t.me/jinx_agent"
                target="_blank"
                rel="noreferrer"
                onClick={() => sfx.playBlip(800)}
                className="flex items-center gap-2 hover:text-[#00f5a0] transition-colors"
              >
                <Send className="size-4" />
                <span>Telegram Community</span>
              </a>
              <span className="flex items-center gap-2 text-white/80">
                <ShieldCheck className="size-4 text-[#00f5a0]" />
                <span>100% Air-Gapped &amp; Private</span>
              </span>
            </div>
          </FadeIn>

          {/* Telemetry Footer Info */}
          <div className="w-full pt-10 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D7E2EA]/40 font-mono gap-4">
            <span>PACKAGE: JINX DEFINITIVE.APK • ARM64-V8A WEBGPU</span>
            <span>OFFGRID SOVEREIGN EDITION • 2026</span>
            <span>SHA-256 VERIFIED • 0 BYTES CLOUD TELEMETRY</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
