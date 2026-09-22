import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2, VolumeX, Radio, Zap, Sliders, Play, Square,
  Shield, Activity, Bell, Flame, Anchor, PhoneCall,
  Terminal, Sparkles, X, ChevronRight, Disc, Layers, HelpCircle
} from 'lucide-react';
import {
  ambientAudio,
  AmbientSoundMode,
  SOUND_PRESETS,
  AmbientMixerLevels,
  AudioStatus
} from '../utils/ambientAudio';

interface WarRoomSoundConsoleProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const WarRoomSoundConsole: React.FC<WarRoomSoundConsoleProps> = ({
  onClose,
  isModal = false
}) => {
  const [status, setStatus] = useState<AudioStatus>(ambientAudio.getStatus());
  const [activeTab, setActiveTab] = useState<'presets' | 'mixer' | 'soundboard'>('presets');
  const [lastTriggeredFx, setLastTriggeredFx] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Subscribe to audio engine status changes
  useEffect(() => {
    const unsubscribe = ambientAudio.subscribe((newStatus) => {
      setStatus(newStatus);
    });
    return () => unsubscribe();
  }, []);

  // Real-time CRT Green Oscilloscope animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const analyser = ambientAudio.getAnalyser();
      const width = canvas.width;
      const height = canvas.height;

      // Draw dark CRT screen background with subtle scanlines
      ctx.fillStyle = '#061009';
      ctx.fillRect(0, 0, width, height);

      // Draw CRT Graticule / Scope grid
      ctx.strokeStyle = '#10301a';
      ctx.lineWidth = 1;
      const gridSpacingX = width / 8;
      const gridSpacingY = height / 6;

      ctx.beginPath();
      for (let x = gridSpacingX; x < width; x += gridSpacingX) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = gridSpacingY; y < height; y += gridSpacingY) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Center crosshairs
      ctx.strokeStyle = '#1b4a29';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      if (status.isPlaying && analyser) {
        const bufferLength = analyser.frequencyBinCount;
        const timeData = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(timeData);

        // Draw glowing green phosphor waveform
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = '#22c55e';
        ctx.shadowColor = '#4ade80';
        ctx.shadowBlur = 8;
        ctx.beginPath();

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = timeData[i] / 128.0; // 0 to 2
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();
        ctx.shadowBlur = 0; // reset blur
      } else {
        // Flat carrier standby line with subtle hum jitter
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#1b4d27';
        ctx.beginPath();
        const y = height / 2;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [status.isPlaying]);

  const handleToggle = () => {
    ambientAudio.toggle();
  };

  const handleModeSelect = (mode: AmbientSoundMode) => {
    ambientAudio.setMode(mode);
  };

  const handleMixerChange = (channel: keyof AmbientMixerLevels, val: number) => {
    ambientAudio.setMixerLevel(channel, val);
  };

  const triggerFx = (name: string, action: () => void) => {
    action();
    setLastTriggeredFx(name);
    setTimeout(() => {
      setLastTriggeredFx((prev) => (prev === name ? null : prev));
    }, 1500);
  };

  const currentPreset = SOUND_PRESETS[status.mode];

  return (
    <div
      id="war-room-sound-console"
      className={`rounded-2xl border border-[#384b3d] bg-gradient-to-b from-[#131c16] via-[#0e1611] to-[#0a100d] text-[#e2e8f0] shadow-2xl overflow-hidden font-sans ${
        isModal ? 'max-w-4xl w-full mx-auto p-4 sm:p-6' : 'p-4 sm:p-6 space-y-6'
      }`}
    >
      {/* Console Top Header & Rivet Border */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25382b] pb-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all ${
              status.isPlaying
                ? 'border-amber-400 bg-amber-950/80 text-amber-300 shadow-lg shadow-amber-950/60 ring-2 ring-amber-400/40'
                : 'border-[#2d3f33] bg-[#141e17] text-[#64748b]'
            }`}
          >
            <Radio className={`h-6 w-6 ${status.isPlaying ? 'animate-pulse text-amber-400' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                MARKAS BESAR ANGKATAN DARAT • PEMANCAR PD II
              </span>
              <span
                className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                  status.isPlaying
                    ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300 animate-pulse'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                }`}
              >
                {status.isPlaying ? '● SIARAN AKTIF' : '○ STANDBY'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-serif text-[#f8fafc] tracking-tight">
              Konsol Suara Atmosfer Ruang Perang (War Room Audio)
            </h2>
            <p className="text-xs text-[#94a3b8] font-mono mt-0.5">
              Simulasi akustik atmosferik Markas Komando PD2 via Web Audio API murni • Generator radio tabung, artileri &amp; sandi morse.
            </p>
          </div>
        </div>

        {/* Master Power Button & Close */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            id="master-audio-toggle-btn"
            onClick={handleToggle}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-mono font-black uppercase tracking-wider transition-all shadow-lg ${
              status.isPlaying
                ? 'border-red-500/80 bg-gradient-to-r from-red-950 via-[#3a1417] to-red-900 text-red-200 hover:from-red-900 hover:to-red-800 shadow-red-950/50'
                : 'border-emerald-500/80 bg-gradient-to-r from-emerald-950 via-[#102b1c] to-emerald-900 text-emerald-200 hover:from-emerald-900 hover:to-emerald-800 shadow-emerald-950/50'
            }`}
          >
            {status.isPlaying ? (
              <>
                <Square className="h-4 w-4 fill-current text-red-400" />
                <span>Matikan Audio</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current text-emerald-400" />
                <span>Nyalakan Audio</span>
              </>
            )}
          </button>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-[#2d3f33] bg-[#141e17] text-[#94a3b8] hover:text-white hover:border-zinc-500 transition-colors"
              title="Tutup Konsol"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: CRT Oscilloscope & Current Decoded Telegram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: CRT Oscilloscope Display */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[#2b3e31] bg-[#070e0a] p-3.5 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                {status.isPlaying && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    status.isPlaying ? 'bg-emerald-400' : 'bg-zinc-600'
                  }`}
                ></span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                OSCILLOSCOPE TABUNG KATODA CRT-42
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#64748b]">
              FREK: 1350 kHz • 50 Hz CARRIER
            </span>
          </div>

          {/* Canvas Waveform Visualizer */}
          <div className="relative rounded-lg overflow-hidden border border-[#1b3623] bg-[#040b07] shadow-inner flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={560}
              height={140}
              className="w-full h-32 sm:h-36 block"
            />
            {/* Ambient CRT Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/60" />
            {!status.isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                <button
                  onClick={handleToggle}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/90 border border-emerald-400/60 text-emerald-200 text-xs font-mono font-bold hover:bg-emerald-900 transition-all shadow-lg"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>KLIK UNTUK MENGAKTIFKAN SIARAN</span>
                </button>
              </div>
            )}
          </div>

          {/* Live Decoded Morse Telegraph Readout */}
          <div className="mt-3 rounded-lg border border-[#2b3e31] bg-[#0a120c] p-2.5 flex items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 truncate">
              <Zap className="h-4 w-4 text-amber-400 shrink-0" />
              <span className="text-[#94a3b8] shrink-0">TELEGRAM TERDEKRIPSI:</span>
              <span className="text-amber-300 font-bold truncate">
                {status.currentMorseText || (status.isPlaying ? '...MENUNGGU PANCARAN SINYAL DARI MARKAS...' : 'PEMANCAR OFF')}
              </span>
            </div>
            {status.isPlaying && status.currentMorseText && (
              <span className="rounded bg-amber-500/20 border border-amber-400/40 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 animate-pulse">
                RADIO TRAFFIC
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Active Environment Quick Status & Master Volume */}
        <div className="lg:col-span-5 rounded-xl border border-[#2b3e31] bg-gradient-to-b from-[#141f17] to-[#0d1610] p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#94a3b8] mb-1">
              <span>LINGKUNGAN AKTIF:</span>
              <span className="text-amber-400 font-bold">{currentPreset.icon} {currentPreset.id}</span>
            </div>
            <h3 className="text-lg font-black font-serif text-[#fef3c7]">
              {currentPreset.name}
            </h3>
            <p className="text-xs text-[#cbd5e1] mt-1 leading-relaxed">
              {currentPreset.description}
            </p>
          </div>

          {/* Master Volume Slider with VU Meter Vibe */}
          <div className="rounded-lg border border-[#223327] bg-[#09110b] p-3 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#94a3b8] flex items-center gap-1.5">
                {status.mixer.master === 0 ? (
                  <VolumeX className="h-4 w-4 text-zinc-500" />
                ) : (
                  <Volume2 className="h-4 w-4 text-amber-400" />
                )}
                <span>VOLUME UTAMA (MASTER):</span>
              </span>
              <span className="font-bold text-amber-300">
                {Math.round(status.mixer.master * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={status.mixer.master}
              onChange={(e) => handleMixerChange('master', parseFloat(e.target.value))}
              className="w-full h-2 bg-[#1b2b1f] rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#64748b]">
              <span>MUTE (0%)</span>
              <span>MED (50%)</span>
              <span>MAX (100%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs: Presets vs Mixer vs Instant Soundboard */}
      <div className="flex items-center gap-2 border-b border-[#25382b] pb-2">
        <button
          onClick={() => setActiveTab('presets')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
            activeTab === 'presets'
              ? 'bg-[#3b2b14] border border-amber-400 text-amber-200 shadow'
              : 'text-[#94a3b8] hover:text-white hover:bg-[#152018]'
          }`}
        >
          <Disc className="h-4 w-4 text-amber-400" />
          <span>Lingkungan Markas PD2 (Presets)</span>
        </button>

        <button
          onClick={() => setActiveTab('mixer')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
            activeTab === 'mixer'
              ? 'bg-[#153424] border border-emerald-400 text-emerald-200 shadow'
              : 'text-[#94a3b8] hover:text-white hover:bg-[#152018]'
          }`}
        >
          <Sliders className="h-4 w-4 text-emerald-400" />
          <span>Konsol Mixer Lapisan Suara</span>
        </button>

        <button
          onClick={() => setActiveTab('soundboard')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
            activeTab === 'soundboard'
              ? 'bg-[#351515] border border-red-400 text-red-200 shadow'
              : 'text-[#94a3b8] hover:text-white hover:bg-[#152018]'
          }`}
        >
          <Flame className="h-4 w-4 text-red-400" />
          <span>Efek Suara Taktis Instan</span>
          <span className="rounded bg-red-500/20 px-1 text-[9px] text-red-300 font-bold">
            SFX
          </span>
        </button>
      </div>

      {/* TAB 1: PRESETS SELECTOR */}
      {activeTab === 'presets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(Object.keys(SOUND_PRESETS) as AmbientSoundMode[]).map((modeKey) => {
            const preset = SOUND_PRESETS[modeKey];
            const isSelected = status.mode === modeKey;
            return (
              <button
                key={modeKey}
                onClick={() => handleModeSelect(modeKey)}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-400 bg-gradient-to-br from-[#2c2010] to-[#1a140a] text-amber-100 shadow-lg shadow-amber-950/40 ring-1 ring-amber-400/50'
                    : 'border-[#243528] bg-[#0e1611] text-[#cbd5e1] hover:border-[#3d5945] hover:bg-[#142018]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{preset.icon}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        isSelected
                          ? 'bg-amber-400 text-black'
                          : 'bg-[#18261d] text-[#94a3b8]'
                      }`}
                    >
                      {isSelected ? 'AKTIF' : 'PILIH'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold font-serif text-[#f8fafc]">
                    {preset.name}
                  </h4>
                  <p className="text-[11px] text-[#94a3b8] font-mono mt-0.5">
                    {preset.subtitle}
                  </p>
                  <p className="text-xs text-[#cbd5e1]/80 mt-2 leading-relaxed line-clamp-2">
                    {preset.description}
                  </p>
                </div>

                {/* Level tags */}
                <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-[#1c2e22] text-[10px] font-mono text-[#94a3b8]">
                  <span>Radio: {Math.round(preset.levels.radio * 100)}%</span>
                  <span>•</span>
                  <span>Artileri: {Math.round(preset.levels.artillery * 100)}%</span>
                  <span>•</span>
                  <span>Morse: {Math.round(preset.levels.telegraph * 100)}%</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* TAB 2: MULTI-CHANNEL AUDIO MIXER */}
      {activeTab === 'mixer' && (
        <div className="rounded-xl border border-[#2b3e31] bg-[#0c140e] p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-[#203125] pb-3">
            <div>
              <h4 className="text-sm font-bold font-serif text-[#fef08a] flex items-center gap-2">
                <Sliders className="h-4 w-4 text-emerald-400" />
                <span>Konsol Mixing Audio Lapangan (Multi-Track)</span>
              </h4>
              <p className="text-xs text-[#94a3b8] font-mono mt-0.5">
                Sesuaikan volume independen masing-masing generator suara untuk menciptakan suasana yang paling nyaman untuk Anda.
              </p>
            </div>
            <button
              onClick={() => handleModeSelect(status.mode)}
              className="text-xs font-mono text-amber-400 hover:text-amber-300 underline"
            >
              Reset ke Default Preset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Channel 1: Radio Static */}
            <div className="rounded-lg border border-[#223327] bg-[#111b14] p-3 space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f1f5f9] font-bold flex items-center gap-1.5">
                  <Radio className="h-3.5 w-3.5 text-amber-400" />
                  <span>Kresek Radio &amp; Tabung Vakum (Radio Static)</span>
                </span>
                <span className="text-amber-300 font-bold">
                  {Math.round(status.mixer.radio * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={status.mixer.radio}
                onChange={(e) => handleMixerChange('radio', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#1f3024] rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <p className="text-[10px] text-[#94a3b8] font-mono">
                Bandpass filter 1350Hz, tube electric hum 50Hz, dan siulan heterodyne penerima.
              </p>
            </div>

            {/* Channel 2: Morse Code Telegraph */}
            <div className="rounded-lg border border-[#223327] bg-[#111b14] p-3 space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f1f5f9] font-bold flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-yellow-400" />
                  <span>Lalu Lintas Sandi Morse (Field Telegraph)</span>
                </span>
                <span className="text-yellow-300 font-bold">
                  {Math.round(status.mixer.telegraph * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={status.mixer.telegraph}
                onChange={(e) => handleMixerChange('telegraph', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#1f3024] rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <p className="text-[10px] text-[#94a3b8] font-mono">
                Nada 750Hz nada telegraf militer periodik dengan amplop halus tanpa klik berlebih.
              </p>
            </div>

            {/* Channel 3: Distant Artillery */}
            <div className="rounded-lg border border-[#223327] bg-[#111b14] p-3 space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f1f5f9] font-bold flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-red-400" />
                  <span>Gemuruh Artileri Jauh (Artillery Salvo)</span>
                </span>
                <span className="text-red-300 font-bold">
                  {Math.round(status.mixer.artillery * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={status.mixer.artillery}
                onChange={(e) => handleMixerChange('artillery', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#1f3024] rounded-lg appearance-none cursor-pointer accent-red-400"
              />
              <p className="text-[10px] text-[#94a3b8] font-mono">
                Brown noise sub-bass 65Hz teredam dinding beton tebal bunker komando.
              </p>
            </div>

            {/* Channel 4: Generator & Ventilation Drone */}
            <div className="rounded-lg border border-[#223327] bg-[#111b14] p-3 space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f1f5f9] font-bold flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-sky-400" />
                  <span>Generator &amp; Ventilasi Bunker (Ambience)</span>
                </span>
                <span className="text-sky-300 font-bold">
                  {Math.round(status.mixer.ambience * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={status.mixer.ambience}
                onChange={(e) => handleMixerChange('ambience', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#1f3024] rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <p className="text-[10px] text-[#94a3b8] font-mono">
                Dengung 48Hz generator diesel bawah tanah, baling-baling udara, atau dengung lambung kapal.
              </p>
            </div>

            {/* Channel 5: Effects (Telephone, Sonar, Typewriter) */}
            <div className="rounded-lg border border-[#223327] bg-[#111b14] p-3 space-y-1.5 md:col-span-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f1f5f9] font-bold flex items-center gap-1.5">
                  <Bell className="h-3.5 w-3.5 text-purple-400" />
                  <span>Efek Tambahan (Telepon Magneto, Sonar &amp; Mesin Tik)</span>
                </span>
                <span className="text-purple-300 font-bold">
                  {Math.round(status.mixer.effects * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={status.mixer.effects}
                onChange={(e) => handleMixerChange('effects', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#1f3024] rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
              <p className="text-[10px] text-[#94a3b8] font-mono">
                Volume dering telepon kantor kabinet, ping sonar ASDIC bawah air, dan ketukan mesin teleprinter.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INSTANT TACTICAL SOUNDBOARD */}
      {activeTab === 'soundboard' && (
        <div className="rounded-xl border border-[#2b3e31] bg-[#0c140e] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#203125] pb-3">
            <div>
              <h4 className="text-sm font-bold font-serif text-red-300 flex items-center gap-2">
                <Flame className="h-4 w-4 text-red-400" />
                <span>Papan Pemicu Efek Suara Taktis Lapangan (Soundboard)</span>
              </h4>
              <p className="text-xs text-[#94a3b8] font-mono mt-0.5">
                Pemicu manual interaktif untuk audio situasional pertempuran dan komunikasi darurat.
              </p>
            </div>
            {lastTriggeredFx && (
              <span className="rounded bg-emerald-500/20 border border-emerald-400/40 px-2 py-0.5 text-xs font-mono font-bold text-emerald-300 animate-pulse">
                ✓ MEMICU: {lastTriggeredFx}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {/* 1. Heavy Artillery Salvo */}
            <button
              onClick={() => triggerFx('Artileri Berat 150mm', () => ambientAudio.triggerArtillerySalvo())}
              className="p-3.5 rounded-xl border border-red-500/40 bg-gradient-to-br from-[#2a1215] to-[#15090b] hover:from-[#3a181c] hover:border-red-400 text-left transition-all shadow-md group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <Flame className="h-5 w-5 text-red-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-red-300/80 bg-red-950/80 px-1.5 py-0.5 rounded border border-red-500/30">
                  BOMBARDIR
                </span>
              </div>
              <div className="text-xs font-bold text-red-100 font-serif">
                Dentuman Artileri Berat 150mm
              </div>
              <p className="text-[11px] text-[#94a3b8] mt-1 leading-snug">
                Suara ledakan sub-bass meriam Howitzer bergemuruh menembus bunker.
              </p>
            </button>

            {/* 2. Field Phone Magneto Ring */}
            <button
              onClick={() => triggerFx('Telepon Lapangan', () => ambientAudio.triggerFieldPhone())}
              className="p-3.5 rounded-xl border border-amber-500/40 bg-gradient-to-br from-[#2a1f11] to-[#150f08] hover:from-[#3a2b17] hover:border-amber-400 text-left transition-all shadow-md group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <PhoneCall className="h-5 w-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-amber-300/80 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/30">
                  KABINET
                </span>
              </div>
              <div className="text-xs font-bold text-amber-100 font-serif">
                Dering Telepon Magneto Lapangan
              </div>
              <p className="text-[11px] text-[#94a3b8] mt-1 leading-snug">
                Deringan ganda 440+480Hz bel tembaga panggilan mendesak staf umum.
              </p>
            </button>

            {/* 3. Submarine ASDIC Sonar Ping */}
            <button
              onClick={() => triggerFx('Sonar ASDIC', () => ambientAudio.triggerSonarPing())}
              className="p-3.5 rounded-xl border border-sky-500/40 bg-gradient-to-br from-[#0c202d] to-[#07121a] hover:from-[#112d3f] hover:border-sky-400 text-left transition-all shadow-md group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <Anchor className="h-5 w-5 text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-sky-300/80 bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-500/30">
                  MARITIM
                </span>
              </div>
              <div className="text-xs font-bold text-sky-100 font-serif">
                Ping Sonar ASDIC Bawah Air
              </div>
              <p className="text-[11px] text-[#94a3b8] mt-1 leading-snug">
                Gema frekuensi tinggi 1480Hz pelacak kapal selam U-Boat di samudera.
              </p>
            </button>

            {/* 4. Radio Squelch PTT */}
            <button
              onClick={() => triggerFx('Radio Squelch', () => ambientAudio.triggerRadioSquelch())}
              className="p-3.5 rounded-xl border border-emerald-500/40 bg-gradient-to-br from-[#102419] to-[#08140e] hover:from-[#163524] hover:border-emerald-400 text-left transition-all shadow-md group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <Radio className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-emerald-300/80 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  KOMUNIKASI
                </span>
              </div>
              <div className="text-xs font-bold text-emerald-100 font-serif">
                Radio Squelch / PTT Sinyal Masuk
              </div>
              <p className="text-[11px] text-[#94a3b8] mt-1 leading-snug">
                Letupan desis pembuka gerbang radio walkie-talkie taktis lapangan.
              </p>
            </button>

            {/* 5. Intelligence Typewriter */}
            <button
              onClick={() => triggerFx('Mesin Tik Telegram', () => ambientAudio.triggerTypewriterBurst())}
              className="p-3.5 rounded-xl border border-purple-500/40 bg-gradient-to-br from-[#24132b] to-[#120a16] hover:from-[#351c3f] hover:border-purple-400 text-left transition-all shadow-md group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <Terminal className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-purple-300/80 bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-500/30">
                  INTELIJEN
                </span>
              </div>
              <div className="text-xs font-bold text-purple-100 font-serif">
                Ketukan Mesin Tik Telegram
              </div>
              <p className="text-[11px] text-[#94a3b8] mt-1 leading-snug">
                Ketukan mekanis telegram laporan intelijen ruang Bletchley Park.
              </p>
            </button>

            {/* 6. Emergency Morse Broadcast */}
            <button
              onClick={() => triggerFx('Sandi Morse SOS', () => ambientAudio.triggerMorseBroadcast('SOS ALL UNITS RED ALERT'))}
              className="p-3.5 rounded-xl border border-yellow-500/40 bg-gradient-to-br from-[#2b220d] to-[#161106] hover:from-[#3f3213] hover:border-yellow-400 text-left transition-all shadow-md group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <Zap className="h-5 w-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-yellow-300/80 bg-yellow-950/80 px-1.5 py-0.5 rounded border border-yellow-500/30">
                  DARURAT
                </span>
              </div>
              <div className="text-xs font-bold text-yellow-100 font-serif">
                Pancaran Morse Darurat (SOS)
              </div>
              <p className="text-[11px] text-[#94a3b8] mt-1 leading-snug">
                Transmisi sandi morse prioritas tinggi ke seluruh unit tempur.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Footer Info note */}
      <div className="border-t border-[#25382b] pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-[#64748b]">
        <span>
          🛡️ Audio disintesis secara dinamis langsung di peramban via <strong>Web Audio API</strong> (BiquadFilter, Analyser &amp; GainNodes).
        </span>
        <span className="text-emerald-400">
          Zero Buffering • Murni Prosedural • Bebas Latensi
        </span>
      </div>
    </div>
  );
};
