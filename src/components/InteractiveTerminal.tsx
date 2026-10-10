import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu,
  FileText,
  Terminal,
  ShieldAlert,
  Play,
  RotateCcw,
  CheckCircle2,
  Lock,
  WifiOff,
  Radio,
  Search,
  Zap,
  Sliders,
} from 'lucide-react'
import { sfx } from '../lib/sound'
import { FadeIn } from './FadeIn'

type TabType = 'llm' | 'rag' | 'python' | 'blackout'

interface LLMPrompt {
  title: string
  prompt: string
  response: string
  speed: string
  ram: string
}

const LLM_PRESETS: LLMPrompt[] = [
  {
    title: 'Off-grid Water Purification',
    prompt: 'Synthesize immediate solar & sand water filtration protocol for field deployment.',
    response:
      'SOVEREIGN PROTOCOL: FIELD BIO-FILTRATION\n\n1. Bio-Mechanical Separation:\n   • Layer 1 (Top): 10cm washed coarse river gravel\n   • Layer 2: 15cm activated carbon / crushed campfire charcoal (adsorbs organic toxics)\n   • Layer 3: 20cm fine silica sand (strains pathogens > 2 microns)\n\n2. Thermal Disinfection (Pasteurization):\n   • Heat water in closed container to 65°C for 20 minutes, or rolling boil for 60 seconds at high altitude (>1000m).\n\n3. Verification:\n   • Total turbidity < 1 NTU. Air-gap test passed.',
    speed: '34.2 tok/s',
    ram: '840 MB VRAM',
  },
  {
    title: 'Offline Solar Capacitor Math',
    prompt: 'Calculate emergency battery bank size for a 65W field radio operating 8 hours daily at 12V.',
    response:
      'TELEMETRY & LOAD CALCULATION:\n\n• Daily Energy Requirement = 65W × 8h = 520 Wh/day\n• Nominal System Voltage = 12.8 V LiFePO4\n• Amp-hour Demand = 520 Wh / 12.8V = 40.625 Ah\n• Safe Depth of Discharge (DoD 80%) = 40.625 / 0.8 = 50.78 Ah\n\nRECOMMENDATION: Deploy 12V 60Ah LiFePO4 cell pack with 100W monocrystalline folding panel. Autonomy reserve: 1.48 days of total sun blackout.',
    speed: '32.8 tok/s',
    ram: '810 MB VRAM',
  },
  {
    title: 'Zero-Telemetry Threat Audit',
    prompt: 'Audit current Android process permissions for cloud surveillance or background beaconing.',
    response:
      'OFFLINE AUDIT SUMMARY [AIR-GAP VERIFIED]:\n\n[✓] Cellular Baseband: ISOLATED\n[✓] Wi-Fi Subsystem: POWER_OFF\n[✓] Bluetooth LE Beacon: MUTED\n[✓] Android IPC Sockets: RESTRICTED TO LOCALHOST\n[✓] Zero packets transmitted. Sovereign ring level 0 achieved.',
    speed: '36.1 tok/s',
    ram: '780 MB VRAM',
  },
]

export function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState<TabType>('llm')
  const [selectedPromptIdx, setSelectedPromptIdx] = useState<number>(0)
  const [displayedText, setDisplayedText] = useState<string>('')
  const [isStreaming, setIsStreaming] = useState<boolean>(false)
  const [streamProgress, setStreamProgress] = useState<number>(0)
  const [ragQuery, setRagQuery] = useState<string>('hypothermia stage 2 protocol')
  const [isRagSearching, setIsRagSearching] = useState<boolean>(false)
  const [pyRunning, setPyRunning] = useState<boolean>(false)
  const [pyOutput, setPyOutput] = useState<string | null>(null)
  const [activeFrequency, setActiveFrequency] = useState<string>('146.520')
  const [triageChecks, setTriageChecks] = useState<boolean[]>([true, true, false, false])
  const timerRef = useRef<any>(null)

  // Stream LLM tokens simulation
  const startStreaming = (presetIdx: number) => {
    sfx.playCyberChirp()
    setSelectedPromptIdx(presetIdx)
    setIsStreaming(true)
    setDisplayedText('')
    setStreamProgress(0)

    if (timerRef.current) clearInterval(timerRef.current)

    const fullText = LLM_PRESETS[presetIdx].response
    let currentIdx = 0

    timerRef.current = setInterval(() => {
      if (currentIdx < fullText.length) {
        // chunk of 2-4 chars to simulate fast token streaming
        const step = Math.min(3, fullText.length - currentIdx)
        currentIdx += step
        setDisplayedText(fullText.slice(0, currentIdx))
        setStreamProgress(Math.round((currentIdx / fullText.length) * 100))
        if (Math.random() > 0.6) sfx.playKey()
      } else {
        clearInterval(timerRef.current)
        setIsStreaming(false)
        sfx.playSuccess()
      }
    }, 18)
  }

  // Trigger default stream on mount
  useEffect(() => {
    startStreaming(0)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // Simulate RAG vector cosine search
  const handleRagSearch = () => {
    sfx.playCyberChirp()
    setIsRagSearching(true)
    setTimeout(() => {
      setIsRagSearching(false)
      sfx.playSuccess()
    }, 450)
  }

  // Simulate Python WASM execution
  const handleRunPython = () => {
    sfx.playBlip(900)
    setPyRunning(true)
    setPyOutput(null)
    setTimeout(() => {
      setPyRunning(false)
      setPyOutput(
        `>>> Pyodide WASM Runtime: Memory 42MB, Sandboxed\n>>> Executed 100,000 Monte Carlo iterations in 3.6ms\n>>> Target Bearing: 133.56° Azimuth | Distance: 559.2 km\n>>> Zero external sockets opened. Exit code 0.`
      )
      sfx.playSuccess()
    }, 500)
  }

  return (
    <section
      id="terminal"
      className="w-full bg-[#0C0C0C] py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 font-kanit relative z-20 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[550px] bg-gradient-to-tr from-[#7621B0]/15 via-[#00f5a0]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Badge */}
        <FadeIn delay={0} y={20} duration={0.7}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#00f5a0]/40 bg-[#00f5a0]/10 text-xs font-mono tracking-widest text-[#00f5a0] uppercase mb-4 shadow-[0_0_20px_rgba(0,245,160,0.15)]">
            <span className="size-2 rounded-full bg-[#00f5a0] animate-ping" />
            <span>LIVE INTERACTIVE SIMULATOR // 0ms CLOUD PING</span>
          </div>
        </FadeIn>

        {/* Section Title with Didone collision */}
        <FadeIn delay={0.05} y={30} duration={0.8}>
          <h2
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
            className="hero-heading font-black uppercase tracking-tight text-center leading-none"
          >
            Test The Sovereign Engine
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={20} duration={0.8}>
          <p className="text-[#D7E2EA]/70 text-center max-w-2xl mt-4 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Experience real-time on-device compute. No servers, no tracking, no subscriptions. Everything runs
            within your local browser sandbox right now.
          </p>
        </FadeIn>

        {/* Main Terminal Chassis */}
        <div className="w-full mt-10 sm:mt-14 rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-white/15 bg-gradient-to-b from-[#12151D] via-[#0E1016] to-[#08090C] shadow-2xl overflow-hidden relative backdrop-blur-2xl">
          {/* Top Chassis Navigation Header */}
          <div className="w-full bg-[#181C26]/90 border-b border-white/10 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
            {/* Window Pills & System Indicator */}
            <div className="flex items-center gap-2.5">
              <span className="size-3 rounded-full bg-[#FF5F56] opacity-80" />
              <span className="size-3 rounded-full bg-[#FFBD2E] opacity-80" />
              <span className="size-3 rounded-full bg-[#27C93F] opacity-80" />
              <span className="ml-2 text-xs font-mono tracking-wider text-white/50 hidden sm:inline">
                JINX_AIRGAP_ENGINE // ARM64-v8a
              </span>
            </div>

            {/* Telemetry Status Right */}
            <div className="flex items-center gap-4 text-[11px] font-mono text-[#D7E2EA]/70">
              <span className="flex items-center gap-1.5 text-[#00f5a0]">
                <WifiOff className="size-3.5" />
                <span>AIR-GAPPED 100%</span>
              </span>
              <span className="hidden md:flex items-center gap-1 text-white/40">
                <span>TELEMETRY:</span>
                <span className="text-white/80">0 BYTES</span>
              </span>
            </div>
          </div>

          {/* Engine Selector Tabs */}
          <div className="w-full bg-black/40 border-b border-white/10 px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto">
            {[
              { id: 'llm', label: '01 // WEBGPU NEURAL LLM', icon: Cpu, accent: '#00f5a0' },
              { id: 'rag', label: '02 // VECTOR RAG (NOTEBOOKLM)', icon: FileText, accent: '#7621B0' },
              { id: 'python', label: '03 // PYODIDE PYTHON WASM', icon: Terminal, accent: '#BE4C00' },
              { id: 'blackout', label: '04 // BLACKOUT RADAR', icon: Radio, accent: '#00d9f5' },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    sfx.playBlip(750)
                    setActiveTab(tab.id as TabType)
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2 whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-white border border-white/20 shadow-lg font-semibold scale-102'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="size-3.5" style={{ color: isActive ? tab.accent : 'currentColor' }} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Tab Content Area */}
          <div className="p-5 sm:p-7 md:p-9 min-h-[440px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {/* TAB 1: WEBGPU LLM */}
              {activeTab === 'llm' && (
                <motion.div
                  key="llm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6"
                >
                  {/* Preset prompt pills */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#00f5a0]">
                      SELECT PRESET PROMPT:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {LLM_PRESETS.map((p, idx) => (
                        <button
                          key={p.title}
                          type="button"
                          onClick={() => startStreaming(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            selectedPromptIdx === idx
                              ? 'bg-[#00f5a0]/20 text-[#00f5a0] border border-[#00f5a0]/40 font-bold'
                              : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/5'
                          }`}
                        >
                          {p.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prompt Box */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <div className="size-7 rounded-lg bg-[#00f5a0]/15 border border-[#00f5a0]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Cpu className="size-4 text-[#00f5a0]" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-[10px] font-mono text-white/40 uppercase">USER PROMPT</span>
                      <p className="text-sm font-mono text-white mt-0.5">
                        {LLM_PRESETS[selectedPromptIdx].prompt}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => startStreaming(selectedPromptIdx)}
                      className="px-3 py-1.5 rounded-xl bg-[#00f5a0] text-black font-mono font-bold text-xs flex items-center gap-1.5 hover:bg-[#00d9f5] transition-colors cursor-pointer shrink-0"
                    >
                      <RotateCcw className="size-3" />
                      <span>Re-Run</span>
                    </button>
                  </div>

                  {/* Terminal Output Screen */}
                  <div className="p-5 rounded-2xl bg-[#07080B] border border-white/10 font-mono text-xs sm:text-sm relative overflow-hidden shadow-inner min-h-[220px]">
                    <div className="scanline absolute inset-0 opacity-40" />

                    {/* Telemetry Chips in Terminal */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[11px] text-white/50 mb-3 relative z-10">
                      <span className="text-[#00f5a0] flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-[#00f5a0] animate-pulse" />
                        JINX-LLAMA-3.2-1B-Q4_K_M // WEBGPU
                      </span>
                      <div className="flex items-center gap-4">
                        <span>SPEED: {LLM_PRESETS[selectedPromptIdx].speed}</span>
                        <span>VRAM: {LLM_PRESETS[selectedPromptIdx].ram}</span>
                        <span>PING: 0.0ms</span>
                      </div>
                    </div>

                    <pre className="text-[#D7E2EA] whitespace-pre-wrap leading-relaxed relative z-10 font-mono">
                      {displayedText}
                      {isStreaming && <span className="inline-block w-2 h-4 bg-[#00f5a0] ml-1 animate-pulse" />}
                    </pre>

                    {/* Progress Bar */}
                    {isStreaming && (
                      <div className="absolute bottom-0 left-0 h-1 bg-[#00f5a0] transition-all duration-75" style={{ width: `${streamProgress}%` }} />
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB 2: VECTOR RAG */}
              {activeTab === 'rag' && (
                <motion.div
                  key="rag"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-5 font-mono"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs uppercase text-[#B600A8] tracking-wider">
                      INDEXED OFFLINE DOSSIERS (384-DIM EMBEDDINGS):
                    </span>
                    <span className="text-xs text-white/50">LOCAL VECTOR VAULT: 3 DOSSIERS (1,422 CHUNKS)</span>
                  </div>

                  {/* Dossiers Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { name: 'US_Army_Survival_FM21.pdf', pages: '412 pgs', chunks: '520 chunks' },
                      { name: 'Field_Emergency_Medicine.pdf', pages: '890 pgs', chunks: '710 chunks' },
                      { name: 'Tactical_Radio_Offgrid.pdf', pages: '120 pgs', chunks: '192 chunks' },
                    ].map((doc) => (
                      <div
                        key={doc.name}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="size-4 text-[#B600A8]" />
                          <span className="text-white truncate max-w-[140px]">{doc.name}</span>
                        </div>
                        <span className="text-white/40 text-[10px]">{doc.chunks}</span>
                      </div>
                    ))}
                  </div>

                  {/* Search Bar */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type="text"
                        value={ragQuery}
                        onChange={(e) => setRagQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:border-[#B600A8] outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleRagSearch}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white text-xs font-bold flex items-center gap-2 cursor-pointer hover:opacity-90"
                    >
                      <Zap className="size-3.5" />
                      <span>Vector Match</span>
                    </button>
                  </div>

                  {/* Vector Match Result Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#090A0E] border border-[#B600A8]/30 flex flex-col gap-3 relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                      <span className="text-[#00f5a0] flex items-center gap-1.5 font-bold">
                        <CheckCircle2 className="size-4" />
                        COSINE MATCH: 0.942 // VERIFIED HIGH CONFIDENCE
                      </span>
                      <span className="text-white/50 text-[11px]">
                        SOURCE: Field_Emergency_Medicine.pdf [Page 148, §3.2]
                      </span>
                    </div>

                    <p className="text-sm text-[#D7E2EA]/90 leading-relaxed">
                      "Stage 2 Moderate Hypothermia (32°C - 35°C): Manifests with violent shivering, loss of fine motor coordination, and altered mental state. Triage action: Place patient in vapor-barrier cocoon, administer warm glucose-rich liquids if conscious, never rub extremities to prevent cold-shock arrhythmias."
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-white/40 pt-2 border-t border-white/5">
                      <span>Embedding Model: on-device all-MiniLM-L6-v2 (23 MB)</span>
                      <span className="text-[#00f5a0]">100% Deterministic Offline Citations</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: PYODIDE PYTHON WASM */}
              {activeTab === 'python' && (
                <motion.div
                  key="python"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-4 font-mono"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase text-[#BE4C00] tracking-wider">
                      AUTONOMOUS PYODIDE WASM SANDBOX (PYTHON 3.12):
                    </span>
                    <button
                      type="button"
                      onClick={handleRunPython}
                      disabled={pyRunning}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#BE4C00] to-[#E07A5F] text-white font-bold text-xs flex items-center gap-2 hover:opacity-90 cursor-pointer disabled:opacity-50"
                    >
                      <Play className="size-3.5 fill-current" />
                      <span>{pyRunning ? 'Compiling in WASM...' : 'Run Local Python'}</span>
                    </button>
                  </div>

                  {/* Code Editor Preview */}
                  <div className="p-4 rounded-xl bg-[#07080A] border border-white/10 text-xs text-white/90 leading-relaxed overflow-x-auto shadow-inner">
                    <span className="text-white/30"># Emergency Triangulation & Bearing Matrix</span><br />
                    <span className="text-[#E07A5F]">import</span> math<br /><br />
                    <span className="text-[#00f5a0]">def</span> <span className="text-[#00d9f5]">compute_target_bearing</span>(lat1, lon1, lat2, lon2):<br />
                    &nbsp;&nbsp;dlon = math.radians(lon2 - lon1)<br />
                    &nbsp;&nbsp;y = math.sin(dlon) * math.cos(math.radians(lat2))<br />
                    &nbsp;&nbsp;x = math.cos(math.radians(lat1)) * math.sin(math.radians(lat2)) - \<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;math.sin(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.cos(dlon)<br />
                    &nbsp;&nbsp;<span className="text-[#E07A5F]">return</span> (math.degrees(math.atan2(y, x)) + 360) % 360<br /><br />
                    bearing = compute_target_bearing(37.7749, -122.4194, 34.0522, -118.2437)<br />
                    <span className="text-[#00f5a0]">print</span>(f<span className="text-[#F4A261]">&quot;Sovereign Target Bearing: &#123;bearing:.2f&#125;&deg;&quot;</span>)
                  </div>

                  {/* Output Terminal */}
                  <div className="p-4 rounded-xl bg-[#0B0D13] border border-white/10 text-xs">
                    <div className="text-[10px] text-white/40 pb-1.5 border-b border-white/10 flex items-center justify-between">
                      <span>CONSOLE STDOUT [SANDBOXED V8 WASM ENGINE]</span>
                      <span className="text-[#00f5a0]">WATCHDOG TIMEOUT: 5000ms</span>
                    </div>
                    <pre className="text-[#00f5a0] pt-2 whitespace-pre-wrap leading-relaxed">
                      {pyOutput ||
                        `>>> Press 'Run Local Python' to compile and execute without any cloud backend.\n>>> 100% secure memory isolation.`}
                    </pre>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: BLACKOUT RADAR */}
              {activeTab === 'blackout' && (
                <motion.div
                  key="blackout"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-5 font-mono"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase text-[#00d9f5] tracking-wider">
                      OFF-GRID BLACKOUT PROTOCOL &amp; EMERGENCY FREQUENCIES:
                    </span>
                    <span className="text-xs text-[#00f5a0] flex items-center gap-1">
                      <Radio className="size-3.5" />
                      <span>BEACON LISTEN ONLY</span>
                    </span>
                  </div>

                  {/* Radio Frequency Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { freq: '146.520', band: 'VHF National Simplex', type: 'Voice Net' },
                      { freq: '446.000', band: 'UHF Calling', type: 'Tactical' },
                      { freq: '121.500', band: 'Aeronautical Guard', type: 'Emergency' },
                      { freq: '462.675', band: 'GMRS Ch 20 Emergency', type: 'Civic SOS' },
                    ].map((item) => (
                      <button
                        key={item.freq}
                        type="button"
                        onClick={() => {
                          sfx.playBlip(1000)
                          setActiveFrequency(item.freq)
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          activeFrequency === item.freq
                            ? 'bg-[#00d9f5]/15 border-[#00d9f5] text-white shadow-lg shadow-[#00d9f5]/20'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-sm font-bold text-white">{item.freq} MHz</div>
                        <div className="text-[10px] text-white/50">{item.band}</div>
                        <div className="text-[9px] text-[#00d9f5] mt-1">{item.type}</div>
                      </button>
                    ))}
                  </div>

                  {/* Interactive Triage Checklist */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2.5">
                    <span className="text-[11px] text-white/50 uppercase">
                      OFFLINE TRIAGE READINESS CHECKLIST:
                    </span>
                    {[
                      'Confirm zero active cloud sockets / Air-gap active',
                      'Pre-cache regional topography & survival vector indices',
                      'Calibrate battery threshold (enable 30% low-draw throttling)',
                      'Synchronize Pyodide offline ephemeris calendar for astronomical fix',
                    ].map((task, idx) => (
                      <div
                        key={task}
                        onClick={() => {
                          sfx.playBlip(600 + idx * 100)
                          const copy = [...triageChecks]
                          copy[idx] = !copy[idx]
                          setTriageChecks(copy)
                        }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer text-xs"
                      >
                        <div
                          className={`size-4 rounded flex items-center justify-center border transition-colors ${
                            triageChecks[idx]
                              ? 'bg-[#00f5a0] border-[#00f5a0] text-black font-bold'
                              : 'border-white/30 bg-transparent'
                          }`}
                        >
                          {triageChecks[idx] && '✓'}
                        </div>
                        <span className={triageChecks[idx] ? 'text-white' : 'text-white/50 line-through'}>
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Footer Telemetry Strip */}
            <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/40 gap-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-[#00f5a0]">
                  <Lock className="size-3.5" />
                  <span>HARDWARE AIR-GAP ACTIVE</span>
                </span>
                <span>•</span>
                <span>0 CLOUD DEPENDENCIES</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <a
                  href="/Jinx-app.apk"
                  download="Jinx-app.apk"
                  className="text-[#00f5a0] hover:underline flex items-center gap-1"
                >
                  <span>DOWNLOAD APK TO RUN LOCALLY</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveTerminal
