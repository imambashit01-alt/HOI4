import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Radio, Zap, Sliders, Play, Square } from 'lucide-react';
import { ambientAudio, AmbientSoundMode } from '../utils/ambientAudio';

interface AmbientSoundToggleProps {
  className?: string;
  compact?: boolean;
}

export const AmbientSoundToggle: React.FC<AmbientSoundToggleProps> = ({
  className = '',
  compact = false
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mode, setMode] = useState<AmbientSoundMode>('bunker');
  const [volume, setVolume] = useState<number>(0.25);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = ambientAudio.subscribe((playing, currentMode, currentVol) => {
      setIsPlaying(playing);
      setMode(currentMode);
      setVolume(currentVol);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    ambientAudio.toggle();
  };

  const handleModeChange = (newMode: AmbientSoundMode) => {
    setMode(newMode);
    ambientAudio.setMode(newMode);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    ambientAudio.setVolume(val);
  };

  if (compact) {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <button
          onClick={handleToggle}
          title={isPlaying ? 'Matikan Suara Atmosfer PD2' : 'Nyalakan Kresek Radio / Telegraf Lapangan PD2'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all shadow-sm ${
            isPlaying
              ? 'border-[#f59e0b] bg-[#342410] text-[#fde047] shadow-[#f59e0b]/20 ring-1 ring-[#f59e0b]/50'
              : 'border-[#2c3b32] bg-[#111914] text-[#94a3b8] hover:text-[#f1f5f9] hover:border-[#3d5246]'
          }`}
        >
          <Radio className={`h-3.5 w-3.5 ${isPlaying ? 'animate-pulse text-[#f59e0b]' : 'text-[#64748b]'}`} />
          <span className="hidden sm:inline">
            {isPlaying ? 'Radio PD2: ON' : 'Radio PD2: OFF'}
          </span>
          {isPlaying && (
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f59e0b] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f59e0b]"></span>
            </span>
          )}
        </button>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`p-1.5 ml-1 rounded-lg border transition-colors ${
            showSettings
              ? 'border-[#f59e0b] bg-[#291c0d] text-[#fde047]'
              : 'border-[#2c3b32] bg-[#111914] text-[#94a3b8] hover:text-white'
          }`}
          title="Pengaturan Mode Suara Atmosfer"
        >
          <Sliders className="h-3.5 w-3.5" />
        </button>

        {showSettings && (
          <div className="absolute right-0 top-full mt-2 w-64 p-3 rounded-xl border border-[#3d5246] bg-[#0d1410] shadow-2xl z-50 text-xs font-mono space-y-2.5">
            <div className="flex items-center justify-between border-b border-[#223028] pb-1.5">
              <span className="font-bold text-[#fde047] flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5" /> Atmosfer Suara PD2
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">Web Audio</span>
            </div>

            {/* Mode selection */}
            <div className="space-y-1">
              <label className="text-[10px] text-[#94a3b8]">Mode Pemancar:</label>
              <div className="grid grid-cols-1 gap-1">
                <button
                  onClick={() => handleModeChange('bunker')}
                  className={`px-2 py-1 rounded text-left flex items-center justify-between transition-colors ${
                    mode === 'bunker'
                      ? 'bg-[#b8860b]/30 text-[#fef08a] border border-[#b8860b]/60'
                      : 'bg-[#141d18] text-[#cbd5e1] hover:bg-[#1a2620]'
                  }`}
                >
                  <span>🎖️ Bunker Komando (Gabungan)</span>
                  {mode === 'bunker' && <span className="text-[10px]">✓</span>}
                </button>
                <button
                  onClick={() => handleModeChange('radio_static')}
                  className={`px-2 py-1 rounded text-left flex items-center justify-between transition-colors ${
                    mode === 'radio_static'
                      ? 'bg-[#b8860b]/30 text-[#fef08a] border border-[#b8860b]/60'
                      : 'bg-[#141d18] text-[#cbd5e1] hover:bg-[#1a2620]'
                  }`}
                >
                  <span>📻 Kresek Radio Tabung</span>
                  {mode === 'radio_static' && <span className="text-[10px]">✓</span>}
                </button>
                <button
                  onClick={() => handleModeChange('telegraph')}
                  className={`px-2 py-1 rounded text-left flex items-center justify-between transition-colors ${
                    mode === 'telegraph'
                      ? 'bg-[#b8860b]/30 text-[#fef08a] border border-[#b8860b]/60'
                      : 'bg-[#141d18] text-[#cbd5e1] hover:bg-[#1a2620]'
                  }`}
                >
                  <span>⚡ Telegraf Sandi Morse</span>
                  {mode === 'telegraph' && <span className="text-[10px]">✓</span>}
                </button>
              </div>
            </div>

            {/* Volume */}
            <div className="space-y-1 pt-1 border-t border-[#223028]">
              <div className="flex justify-between text-[10px] text-[#94a3b8]">
                <span>Volume:</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-[#1e2a22] rounded-lg appearance-none cursor-pointer accent-[#f59e0b]"
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-[#2b3a32] bg-gradient-to-b from-[#141d18] via-[#101713] to-[#0c120e] p-3 shadow-lg ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Title and Radio status */}
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg border ${isPlaying ? 'bg-[#f59e0b]/20 border-[#f59e0b]/50 text-[#fde047]' : 'bg-[#1a251e] border-[#2c3b32] text-[#64748b]'}`}>
            <Radio className={`h-4 w-4 ${isPlaying ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-serif font-bold text-[#fef3c7]">Pemancar Suara Atmosfer PD2</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase ${
                isPlaying ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400'
              }`}>
                {isPlaying ? 'Siaran Aktif' : 'Nonaktif'}
              </span>
            </div>
            <p className="text-[11px] text-[#94a3b8]">
              Suara autentik kresek radio gelombang pendek &amp; ketukan telegraf Morse markas komando lapangan 1936-1945.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Preset Buttons */}
          <div className="flex items-center rounded-lg bg-[#0a100c] border border-[#223028] p-0.5 text-[11px] font-mono">
            <button
              onClick={() => handleModeChange('bunker')}
              className={`px-2 py-1 rounded-md transition-colors ${
                mode === 'bunker' ? 'bg-[#b8860b]/30 text-[#fde047] font-bold' : 'text-[#94a3b8] hover:text-white'
              }`}
              title="Kombinasi radio statik & telegraf morse"
            >
              Bunker
            </button>
            <button
              onClick={() => handleModeChange('radio_static')}
              className={`px-2 py-1 rounded-md transition-colors ${
                mode === 'radio_static' ? 'bg-[#b8860b]/30 text-[#fde047] font-bold' : 'text-[#94a3b8] hover:text-white'
              }`}
              title="Kresek statis radio tabung"
            >
              Radio
            </button>
            <button
              onClick={() => handleModeChange('telegraph')}
              className={`px-2 py-1 rounded-md transition-colors ${
                mode === 'telegraph' ? 'bg-[#b8860b]/30 text-[#fde047] font-bold' : 'text-[#94a3b8] hover:text-white'
              }`}
              title="Ketukan kode morse telegraf lapangan"
            >
              Telegraf
            </button>
          </div>

          {/* Volume slider */}
          <div className="flex items-center gap-1.5 bg-[#0a100c] border border-[#223028] px-2 py-1 rounded-lg">
            {volume === 0 ? (
              <VolumeX className="h-3.5 w-3.5 text-[#64748b]" />
            ) : (
              <Volume2 className="h-3.5 w-3.5 text-[#f59e0b]" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-[#1e2a22] rounded appearance-none cursor-pointer accent-[#f59e0b]"
              title={`Volume: ${Math.round(volume * 100)}%`}
            />
          </div>

          {/* Main Toggle Button */}
          <button
            onClick={handleToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all ${
              isPlaying
                ? 'border-[#ef4444] bg-[#341616] text-[#fca5a5] hover:bg-[#451e1e]'
                : 'border-[#10b981] bg-[#122b1e] text-[#6ee7b7] hover:bg-[#183a29]'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="h-3 w-3 fill-current" />
                <span>Hentikan</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 fill-current" />
                <span>Nyalakan Audio</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
