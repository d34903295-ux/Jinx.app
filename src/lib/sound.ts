class SoundEffects {
  private ctx: AudioContext | null = null
  private muted: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jinx_sfx_muted')
      this.muted = saved === 'true'
    }
  }

  private getContext(): AudioContext | null {
    if (this.muted) return null
    if (typeof window === 'undefined') return null
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
        if (AudioCtx) {
          this.ctx = new AudioCtx()
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {})
      }
      return this.ctx
    } catch {
      return null
    }
  }

  public isMuted(): boolean {
    return this.muted
  }

  public setMuted(muted: boolean) {
    this.muted = muted
    if (typeof window !== 'undefined') {
      localStorage.setItem('jinx_sfx_muted', String(muted))
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted)
    return this.muted
  }

  // Quick tactile UI click
  public playBlip(freq = 720, duration = 0.04) {
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + duration)

      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + duration)
    } catch {}
  }

  // Deep resonant sub-bass pulse for 3D wave shockwave
  public playPulse() {
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(140, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.35)

      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.36)
    } catch {}
  }

  // Futuristic cyber chirp for mode / air-gap switch
  public playCyberChirp() {
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08)

      gain.gain.setValueAtTime(0.03, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(now + 0.1)
    } catch {}
  }

  // Fast typing key for token generation
  public playKey() {
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      const freq = 1200 + Math.random() * 400
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0.015, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(now + 0.025)
    } catch {}
  }

  // Harmonic chord on success / verified air-gap
  public playSuccess() {
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const freqs = [523.25, 659.25, 783.99, 1046.5] // C5 chord
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        const start = ctx.currentTime + idx * 0.04
        osc.frequency.setValueAtTime(freq, start)

        gain.gain.setValueAtTime(0.03, start)
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.25)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(start)
        osc.stop(start + 0.26)
      })
    } catch {}
  }
}

export const sfx = new SoundEffects()
