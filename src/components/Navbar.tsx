import { useState, useEffect } from 'react'
import { WifiOff, Wifi, Volume2, VolumeX, ShieldCheck, Download, Sparkles, Terminal } from 'lucide-react'
import { sfx } from '../lib/sound'
import { FadeIn } from './FadeIn'

interface NavbarProps {
  onOpenApp?: () => void
  airGapActive?: boolean
  onToggleAirGap?: () => void
}

export function Navbar({ onOpenApp, airGapActive = true, onToggleAirGap }: NavbarProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setIsMuted(sfx.isMuted())

    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSound = () => {
    const nextMuted = sfx.toggleMute()
    setIsMuted(nextMuted)
    if (!nextMuted) {
      sfx.playBlip(880)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-kanit ${
        scrolled
          ? 'bg-[#0C0C0C]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between gap-4">
        {/* Brand Logo & Sovereign Tag */}
        <a
          href="#"
          onClick={() => sfx.playBlip(700)}
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
        >
          <div className="size-9 sm:size-10 rounded-xl bg-gradient-to-br from-[#00f5a0]/30 via-[#10141d] to-black border border-white/20 p-1 shadow-[0_0_20px_rgba(0,245,160,0.35)] group-hover:shadow-[0_0_30px_rgba(0,245,160,0.6)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
            <img
              src="/assets/jinx_brand_logo.png"
              alt="Jinx Brand Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,245,160,0.6)] group-hover:rotate-6 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-[#00f5a0] transition-colors leading-none">
                JINX
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#00f5a0]/15 text-[#00f5a0] border border-[#00f5a0]/30 font-bold uppercase tracking-wider">
                OFFLINE
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase leading-none hidden sm:inline">
              SOVEREIGN INTELLIGENCE
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs sm:text-sm font-medium tracking-wider uppercase text-[#D7E2EA]/75">
          <a
            href="#terminal"
            onClick={() => sfx.playBlip(750)}
            className="flex items-center gap-1.5 hover:text-white transition-colors py-1 group"
          >
            <span className="size-1.5 rounded-full bg-[#00f5a0] group-hover:animate-ping" />
            <span className="text-[#00f5a0]">Simulator</span>
          </a>
          <a
            href="#about"
            onClick={() => sfx.playBlip(750)}
            className="hover:text-white transition-colors py-1"
          >
            Overview
          </a>
          <a
            href="#features"
            onClick={() => sfx.playBlip(750)}
            className="hover:text-white transition-colors py-1"
          >
            Features
          </a>
          <a
            href="#showcase"
            onClick={() => sfx.playBlip(750)}
            className="hover:text-white transition-colors py-1"
          >
            Showcase
          </a>
          <a
            href="#contact"
            onClick={() => sfx.playBlip(750)}
            className="hover:text-white transition-colors py-1"
          >
            Download
          </a>
        </nav>

        {/* Right Controls: Air-Gap Switch, SFX Toggle & APK CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Air-gap toggle pill */}
          <button
            type="button"
            onClick={() => {
              sfx.playCyberChirp()
              onToggleAirGap?.()
            }}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer ${
              airGapActive
                ? 'bg-[#00f5a0]/10 border-[#00f5a0]/40 text-[#00f5a0] shadow-[0_0_15px_rgba(0,245,160,0.2)]'
                : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
            }`}
            title="Toggle Air-Gap Isolation Mode"
          >
            <WifiOff className="size-3.5" />
            <span className="text-[11px] font-bold">
              {airGapActive ? 'AIR-GAP: SECURED' : 'RADIO: ON'}
            </span>
          </button>

          {/* Sound FX Button */}
          <button
            type="button"
            onClick={toggleSound}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              !isMuted
                ? 'bg-white/10 border-white/20 text-[#00f5a0]'
                : 'bg-white/5 border-white/10 text-white/40 hover:text-white'
            }`}
            title={isMuted ? 'Unmute Futuristic Sound FX' : 'Mute Sound FX'}
          >
            {!isMuted ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
          </button>

          {/* Download APK Pill CTA */}
          <a
            href="/Jinx-app.apk"
            download="Jinx-app.apk"
            onClick={() => sfx.playSuccess()}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#00f5a0]/50 bg-gradient-to-r from-[#00f5a0]/20 to-[#7621B0]/20 text-xs text-[#00f5a0] font-mono tracking-wider font-semibold hover:bg-[#00f5a0]/30 transition-all shadow-[0_0_20px_rgba(0,245,160,0.25)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Download className="size-3.5" />
            <span>GET APK</span>
            <span className="size-1.5 rounded-full bg-[#00f5a0] animate-pulse hidden sm:inline" />
          </a>

          {onOpenApp && (
            <button
              type="button"
              onClick={onOpenApp}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 text-xs text-white/80 hover:text-white hover:bg-white/10 transition-all font-mono"
            >
              <span>Launch</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
