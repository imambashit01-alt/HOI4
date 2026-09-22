import React, { useState, useEffect } from 'react';
import {
  Volume2, VolumeX, Radio, Zap, Sliders, Play, Square,
  Maximize2, Flame, Sparkles, X, Activity, Shield
} from 'lucide-react';
import {
  ambientAudio,
  AmbientSoundMode,
  SOUND_PRESETS,
  AudioStatus
} from '../utils/ambientAudio';
import { WarRoomSoundConsole } from './WarRoomSoundConsole';

interface AmbientSoundToggleProps {
  className?: string;
  compact?: boolean;
}

export const AmbientSoundToggle: React.FC<AmbientSoundToggleProps> = ({
  className = '',
  compact = false
}) => {
  const [status, setStatus] = useState<AudioStatus>(ambientAudio.getStatus());
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showConsoleModal, setShowConsoleModal] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = ambientAudio.subscribe((newStatus) => {
      setStatus(newStatus);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    ambientAudio.toggle();
  };

  const handleModeChange = (newMode: AmbientSoundMode) => {
    ambientAudio.setMode(newMode);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    ambientAudio.setMasterVolume(val);
  };

  const currentPreset = SOUND_PRESETS[status.mode];

  if (compact) {
    return (
      <>
        <div className={`relative inline-flex items-center ${className}`}>
          {/* Main quick Toggle Button */}
          <button
            id="ambient-sound-quick-toggle"
            onClick={handleToggle}
            title={status.isPlaying ? 'Matikan Suara Atmosfer PD2' : 'Nyalakan Audio Ruang Perang PD2'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all shadow-sm ${
              status.isPlaying
                ? 'border-amber-400 bg-amber-950/80 text-amber-200 shadow-amber-950/40 ring-1 ring-amber-400/50'
                : 'border-[#2c3b32] bg-[#111914] text-[#94a3b8] hover:text-[#f1f5f9] hover:border-[#3d5246]'
            }`}
          >
            <Radio className={`h-3.5 w-3.5 ${status.isPlaying ? 'animate-pulse text-amber-400' : 'text-[#64748b]'}`} />
            <span className="hidden sm:inline">
              {status.isPlaying ? `Audio: ${currentPreset.name.split(' ')[0]}` : 'Audio PD2'}
            </span>
            {status.isPlaying && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
            )}
          </button>

          {/* Quick Dropdown & Settings trigger */}
          <button
            id="ambient-sound-settings-trigger"
            onClick={() => setShowDropdown(!showDropdown)}
            className={`p-1.5 ml-1 rounded-lg border transition-colors ${
              showDropdown || status.isPlaying
                ? 'border-amber-400/60 bg-amber-950/40 text-amber-300'
                : 'border-[#2c3b32] bg-[#111914] text-[#94a3b8] hover:text-white'
            }`}
            title="Pengaturan Mode Suara Ruang Perang"
          >
            <Sliders className="h-3.5 w-3.5" />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-72 p-3.5 rounded-xl border border-[#3d5246] bg-[#0d1410] shadow-2xl z-50 text-xs font-mono space-y-3">
              <div className="flex items-center justify-between border-b border-[#223028] pb-2">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Radio className="h-3.5 w-3.5 text-amber-400" />
                  <span>Suara Atmosfer Ruang Perang</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Web Audio API</span>
              </div>

              {/* Mode list */}
              <div className="space-y-1">
                <div className="text-[10px] text-[#94a3b8] flex justify-between">
                  <span>PILIH LINGKUNGAN MARKAS:</span>
                  <span className="text-amber-400 font-bold">{currentPreset.icon}</span>
                </div>
                <div className="grid grid-cols-1 gap-1 max-h-48 overflow-y-auto pr-1">
                  {(Object.keys(SOUND_PRESETS) as AmbientSoundMode[]).map((mKey) => {
                    const preset = SOUND_PRESETS[mKey];
                    const isSelected = status.mode === mKey;
                    return (
                      <button
                        key={mKey}
                        onClick={() => handleModeChange(mKey)}
                        className={`px-2 py-1.5 rounded text-left flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-amber-400/20 text-amber-200 border border-amber-400/50 font-bold'
                            : 'bg-[#141d18] text-[#cbd5e1] hover:bg-[#1a2620]'
                        }`}
                      >
                        <span className="truncate flex items-center gap-1.5">
                          <span>{preset.icon}</span>
                          <span>{preset.name}</span>
                        </span>
                        {isSelected && <span className="text-[10px] text-amber-400 shrink-0">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Master Volume Slider */}
              <div className="space-y-1.5 pt-2 border-t border-[#223028]">
                <div className="flex justify-between text-[11px] text-[#94a3b8]">
                  <span>Volume Master:</span>
                  <span className="text-amber-300 font-bold">
                    {Math.round(status.mixer.master * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={status.mixer.master}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-[#1e2a22] rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* Open Full Console Button */}
              <button
                id="open-full-sound-console-btn"
                onClick={() => {
                  setShowDropdown(false);
                  setShowConsoleModal(true);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#19271e] hover:bg-[#203328] border border-[#2d4233] text-emerald-300 font-bold text-xs transition-colors"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Buka Konsol Lengkap (Oscilloscope &amp; SFX)</span>
              </button>
            </div>
          )}
        </div>

        {/* Full Modal Console */}
        {showConsoleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
            <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto">
              <WarRoomSoundConsole
                isModal={true}
                onClose={() => setShowConsoleModal(false)}
              />
            </div>
          </div>
        )}
      </>
    );
  }

  // Full In-Page Block Mode
  return (
    <>
      <div className={`rounded-xl border border-[#2b3a32] bg-gradient-to-b from-[#141d18] via-[#101713] to-[#0c120e] p-4 shadow-lg ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Title and Radio status */}
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl border ${
                status.isPlaying
                  ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 shadow-lg shadow-amber-950/40 ring-1 ring-amber-400/40'
                  : 'bg-[#1a251e] border-[#2c3b32] text-[#64748b]'
              }`}
            >
              <Radio className={`h-5 w-5 ${status.isPlaying ? 'animate-pulse text-amber-400' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-serif font-bold text-[#fef3c7]">
                  Pemancar Suara Atmosfer Ruang Perang PD II
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                    status.isPlaying
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  }`}
                >
                  {status.isPlaying ? `● ${currentPreset.name}` : '○ Nonaktif'}
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                {currentPreset.description}
              </p>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Volume slider */}
            <div className="flex items-center gap-1.5 bg-[#0a100c] border border-[#223028] px-2.5 py-1.5 rounded-lg">
              {status.mixer.master === 0 ? (
                <VolumeX className="h-3.5 w-3.5 text-[#64748b]" />
              ) : (
                <Volume2 className="h-3.5 w-3.5 text-amber-400" />
              )}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={status.mixer.master}
                onChange={handleVolumeChange}
                className="w-20 h-1.5 bg-[#1e2a22] rounded appearance-none cursor-pointer accent-amber-400"
                title={`Volume: ${Math.round(status.mixer.master * 100)}%`}
              />
              <span className="text-[10px] font-mono text-amber-300 w-8 text-right">
                {Math.round(status.mixer.master * 100)}%
              </span>
            </div>

            {/* Expand Full Console Button */}
            <button
              onClick={() => setShowConsoleModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#2c3f33] bg-[#142018] hover:bg-[#1a2b20] text-emerald-300 text-xs font-mono font-bold transition-all shadow-sm"
              title="Buka Konsol Penuh & Efek Suara"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Konsol Penuh</span>
            </button>

            {/* Main Toggle Button */}
            <button
              id="ambient-sound-toggle-main-btn"
              onClick={handleToggle}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-mono font-bold transition-all shadow-md ${
                status.isPlaying
                  ? 'border-red-500/80 bg-[#341616] text-[#fca5a5] hover:bg-[#451e1e]'
                  : 'border-emerald-500/80 bg-[#122b1e] text-[#6ee7b7] hover:bg-[#183a29]'
              }`}
            >
              {status.isPlaying ? (
                <>
                  <Square className="h-3.5 w-3.5 fill-current" />
                  <span>Matikan</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Nyalakan Audio</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Full Console */}
      {showConsoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto">
            <WarRoomSoundConsole
              isModal={true}
              onClose={() => setShowConsoleModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};
