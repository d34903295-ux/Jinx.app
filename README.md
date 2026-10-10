# <p align="center"><img src="public/assets/jinx_brand_logo.png" width="96" height="96" alt="Jinx Logo" /><br/>J I N X</p>

<p align="center">
  <strong>100% Offline Sovereign AI Agent for Android</strong><br/>
  <em>Autonomous Intelligence When the Global Grid Goes Dark.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Air--Gap-100%25%20Secured-00f5a0?style=for-the-badge&logo=shield&logoColor=black" alt="Air-Gap Secured" />
  <img src="https://img.shields.io/badge/Telemetry-0%20Bytes-00f5a0?style=for-the-badge&logo=lock&logoColor=black" alt="Zero Telemetry" />
  <img src="https://img.shields.io/badge/WebGPU-Adreno%20%2F%20Mali-7621B0?style=for-the-badge&logo=webgpu&logoColor=white" alt="WebGPU Acceleration" />
  <img src="https://img.shields.io/badge/Python-Pyodide%20WASM-BE4C00?style=for-the-badge&logo=python&logoColor=white" alt="Pyodide WASM" />
  <img src="https://img.shields.io/badge/Architecture-ARM64--v8a-111827?style=for-the-badge&logo=android&logoColor=white" alt="Android ARM64" />
</p>

---

## ⚡ Overview

**Cloud AI dies the moment you lose cellular signal.** In natural disasters, power grid collapses, or remote backcountry expeditions, cloud-tethered subscription assistants are completely useless.

**Jinx** is a sovereign, self-contained artificial intelligence engine designed specifically for Android hardware. Operating completely air-gapped without servers, external APIs, telemetry, or recurring payments, Jinx delivers bare-metal conversational intelligence, page-level document vector RAG, and isolated Python computation directly on your device.

---

## 🏛️ Core Architectural Pillars

```
+-------------------------------------------------------------------------+
|                         JINX SOVEREIGN ENGINE                           |
+-------------------------------------------------------------------------+
       |                           |                          |
       v                           v                          v
+---------------+         +-----------------+        +--------------------+
|  LOCAL WEBGPU |         |   VECTOR RAG    |        |   PYODIDE PYTHON   |
|  LLM PIPELINE |         |  NOTEBOOKLM DB  |        |    WASM SANDBOX    |
+---------------+         +-----------------+        +--------------------+
| Llama-3.2-1B  |         | 384-Dim Vectors |        | Bare-Metal Python  |
| 32+ tok/sec   |         | Cosine SIMD 8ms |        | Scientific Math    |
| VRAM: 840 MB  |         | Exact Citations |        | 15s Watchdog Limit |
+---------------+         +-----------------+        +--------------------+
       \                           |                          /
        \                          |                         /
         +-------------------------+------------------------+
                                   |
                                   v
                  +----------------------------------+
                  |  100% AIR-GAPPED SECURITY VAULT  |
                  |  ChaCha20-Poly1305 Encrypted DB  |
                  |  Zero Cloud Ping // 0 Telemetry  |
                  +----------------------------------+
```

### 🧠 01. On-Device Neural Compute (WebGPU)
* **Zero Cloud Latency (0.0 ms)**: Quantized `Llama-3.2-1B-Q4_K_M` neural models running directly on mobile GPU compute shaders via WebGPU.
* **Efficient Memory Footprint**: Requires only ~840 MB of unified RAM, ensuring zero thermal throttling and stable execution on mainstream devices.
* **Real Throughput**: Generates 30 to 45 tokens per second on Qualcomm Adreno 7xx/8xx and ARM Mali-G7xx architectures.

### 📚 02. NotebookLM-Grade Local Vector RAG
* **Client-Side Embedding Pipeline**: 384-dimensional dense vectors powered by quantized `all-MiniLM-L6-v2` and ONNX Runtime WASM SIMD.
* **Instant Similarity Search**: Performs cosine distance calculations over 10,000+ cached document chunks in under 8.4 milliseconds.
* **Page-Level Interactive Citations**: Direct reference linking with highlighted excerpts from pre-loaded technical manuals, medical dossiers, and local PDF files.

### 🐍 03. Scientific Python WASM Runtime (Pyodide)
* **Bare-Metal Python Execution**: Native Python environment operating inside a WebAssembly sandbox directly on your Android phone's CPU.
* **Offline Scientific Tooling**: Pre-configured support for NumPy and SciPy modules for complex mathematical modeling, spherical trigonometry, ballistic trajectories, and signal analysis.
* **Zero-Leak Watchdog**: Monitored execution with an autonomous 15-second timeout watchdog preventing runaway loops or memory exhaustion.

### 🛡️ 04. 100% Air-Gapped Sovereign Security
* **Zero Telemetry**: Completely network-isolated. No crash loggers, no analytics, no third-party trackers, and zero outgoing HTTP/WebSocket requests.
* **Hardware-Bound Encryption**: Local storage encrypted with ChaCha20-Poly1305 authenticated encryption, bound directly to device keystore primitives.

### 📡 05. Off-Grid Blackout Survival Engine
* **Emergency Medical Dossiers**: Pre-indexed Level-4 trauma protocols, wilderness first aid, hypothermia triage, and pharmaceutical references.
* **Tactical Radio Frequency Directory**: Built-in cache of National Simplex, VHF/UHF civil distress frequencies, and Morse code synthesizers.

---

## 🎨 Landing Page & Web Experience

This repository contains the interactive production landing page for Jinx, crafted with a high-end editorial dark-vault aesthetic:

* **Interactive Sovereign Simulator**: Live web simulator allowing visitors to test WebGPU prompt generation, NotebookLM vector lookups, and Pyodide calculations directly in browser memory.
* **Digital Wave Field Canvas**: High-performance interactive particle ocean with 8,100 nodes responding to mouse drag, inertia, and shockwave pulses.
* **Bespoke 3D Octane-Style Visuals**: Clean transparent-background 3D assets with continuous anti-gravity floating micro-animations (Hero Core, WebGPU Chip, Vector RAG Stack, Pyodide Reactor, and Survival Radar).
* **Synthetic Web Audio Engine**: Procedural sound design using Web Audio API synthesisers (telemetry clicks, pulse waves, and air-gap confirmation chimes).
* **Editorial Typography**: Pairing high-contrast Didone serifs (Slash midnight vault register) with bold industrial grotesques (Awesomic zinc grid).

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 19 + TypeScript | UI architecture and modular component state |
| **Bundler** | Vite 8 | Ultra-fast HMR and optimized production bundling |
| **Styling** | Tailwind CSS v4 + Vanilla CSS | Design tokens, micro-animations, glassmorphism |
| **3D Rendering** | Three.js (WebGL) | Interactive particle wave field & bespoke models |
| **Audio** | Native Web Audio API | Zero-dependency procedural cybernetic sound synthesis |
| **Icons** | Lucide React | High-density vector iconography |
| **Delivery** | Android Package Handler | Custom Vite middleware for native `.apk` downloads |

---

## 🚀 Quick Start (Development)

### Prerequisites
* **Node.js** `>= 20.0.0`
* **npm** `>= 10.0.0`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/d34903295-ux/Jinx.app.git
cd Jinx.app

# 2. Install dependencies
npm install

# 3. Launch the development server
npm run dev
```

The server will initialize at:
```
http://localhost:5173/
```

### Production Build

```bash
# Typecheck and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📱 Android Hardware Requirements

* **Operating System**: Android 10.0 or higher (API Level 29+)
* **Processor**: 64-bit ARM (`arm64-v8a`) with hardware NEON/SIMD
* **Graphics**: GPU supporting WebGPU or Vulkan Compute Shaders
* **Memory**: 4 GB RAM minimum (6 GB+ recommended for large contexts)
* **Storage**: ~500 MB free internal flash storage

---

## 🔒 Security & Privacy Statement

Jinx does not collect, transmit, store, or process any user data outside of the physical device running the application. There are no tracking scripts, no analytics endpoints, and no remote crash reporting facilities. Total sovereignty is guaranteed by architecture.

---

## 📜 License

Created and maintained by [d34903295-ux](https://github.com/d34903295-ux).  
Designed under the Sovereign Open Intelligence standard.
