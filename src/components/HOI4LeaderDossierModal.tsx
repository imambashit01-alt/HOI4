import React, { useState } from 'react';
import {
  X, Award, Shield, Flag, BookOpen, Quote, Sparkles, UserCheck,
  ChevronRight, ArrowRight, Zap, RefreshCw, Layers
} from 'lucide-react';
import { HOI4LeaderPortrait } from './HOI4LeaderPortrait';
import { HOI4_MAJOR_LEADERS, HOI4LeaderData } from '../services/hoi4LeaderService';

interface HOI4LeaderDossierModalProps {
  isOpen: boolean;
  initialTag?: string;
  onClose: () => void;
  onSelectNation?: (tag: string) => void;
}

export const HOI4LeaderDossierModal: React.FC<HOI4LeaderDossierModalProps> = ({
  isOpen,
  initialTag = 'GER',
  onClose,
  onSelectNation
}) => {
  const [selectedTag, setSelectedTag] = useState<string>(initialTag || 'GER');
  const [alternateIndex, setAlternateIndex] = useState<number | undefined>(undefined);

  if (!isOpen) return null;

  const currentLeaderData: HOI4LeaderData = HOI4_MAJOR_LEADERS[selectedTag] || HOI4_MAJOR_LEADERS.GER;

  const activeAlternate = alternateIndex !== undefined && currentLeaderData.alternateLeaders
    ? currentLeaderData.alternateLeaders[alternateIndex]
    : null;

  const displayName = activeAlternate ? activeAlternate.name : currentLeaderData.leaderName;
  const displayTitle = activeAlternate ? activeAlternate.title : currentLeaderData.title;
  const displayTenure = activeAlternate ? activeAlternate.yearRange : currentLeaderData.tenureYears;
  const displayIdeology = activeAlternate ? activeAlternate.ideology : currentLeaderData.ideology;
  const displaySubIdeology = activeAlternate ? activeAlternate.subIdeology : currentLeaderData.subIdeology;
  const displayBio = activeAlternate ? activeAlternate.historicBio : currentLeaderData.historicBio;
  const displayTraits = activeAlternate ? activeAlternate.traits : currentLeaderData.traits;

  const MAJORS_LIST = [
    { tag: 'GER', name: 'Jerman', flag: '🇩🇪' },
    { tag: 'SOV', name: 'Soviet', flag: '☭' },
    { tag: 'USA', name: 'Amerika', flag: '🇺🇸' },
    { tag: 'ENG', name: 'Inggris', flag: '🇬🇧' },
    { tag: 'JAP', name: 'Jepang', flag: '🇯🇵' },
    { tag: 'ITA', name: 'Italia', flag: '🇮🇹' },
    { tag: 'FRA', name: 'Prancis', flag: '🇫🇷' }
  ];

  const handleSelectCountry = (tag: string) => {
    setSelectedTag(tag);
    setAlternateIndex(undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border-2 border-[#b45309] bg-[#0c101a] text-[#f1f5f9] shadow-2xl"
        style={{
          boxShadow: '0 0 40px rgba(180, 83, 9, 0.3), inset 0 0 15px rgba(0,0,0,0.8)'
        }}
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#273256] bg-[#090d17]/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-black uppercase text-[#fef3c7] tracking-wide">
                  Dokumen Intelijen Pemimpin (HOI4 Leader Dossier)
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  7 ADIDAYA
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] font-mono">
                Portret resmi dan sifat kepemimpinan masa perang Hearts of Iron IV
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#94a3b8] hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 7 Majors Tag Quick Selector Bar */}
        <div className="flex items-center gap-1.5 p-3 bg-[#070a12] border-b border-[#1b2542] overflow-x-auto">
          <span className="text-[11px] font-mono text-[#94a3b8] uppercase px-2 shrink-0">Pilih Negara:</span>
          {MAJORS_LIST.map((m) => {
            const isSelected = selectedTag === m.tag;
            return (
              <button
                key={m.tag}
                onClick={() => handleSelectCountry(m.tag)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-700/40 border border-amber-400'
                    : 'bg-white/5 text-[#94a3b8] hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                <span>{m.flag}</span>
                <span>{m.name}</span>
                <span className="text-[10px] opacity-75">[{m.tag}]</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column: Portrait Showcase & Alternate Leaders Selector (4 cols) */}
            <div className="md:col-span-5 flex flex-col items-center space-y-4">
              <div className="relative">
                <HOI4LeaderPortrait
                  tag={selectedTag}
                  size="xl"
                  alternateIndex={alternateIndex}
                  showNameplate={true}
                  showTraitsOnHover={false}
                  showStatusLamp={true}
                  interactive={false}
                />
              </div>

              {/* Alternate Leader Selector (if available) */}
              {currentLeaderData.alternateLeaders && currentLeaderData.alternateLeaders.length > 0 && (
                <div className="w-full p-3 rounded-xl border border-amber-500/30 bg-amber-950/15 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-amber-300">
                    <span className="font-bold flex items-center gap-1">
                      <RefreshCw className="h-3.5 w-3.5" /> Garis Waktu Alternatif:
                    </span>
                    <span className="text-[10px] text-[#94a3b8]">Klik untuk mengganti</span>
                  </div>

                  <div className="space-y-1.5">
                    {/* Default Leader Button */}
                    <button
                      onClick={() => setAlternateIndex(undefined)}
                      className={`w-full text-left px-3 py-2 rounded-lg font-mono text-xs transition-all flex items-center justify-between ${
                        alternateIndex === undefined
                          ? 'bg-amber-500/30 border border-amber-400/60 text-amber-200 font-bold'
                          : 'bg-black/30 hover:bg-black/50 text-[#cbd5e1] border border-white/5'
                      }`}
                    >
                      <div>
                        <span>{currentLeaderData.leaderName}</span>
                        <span className="text-[10px] text-slate-400 block font-normal">
                          {currentLeaderData.tenureYears} (Historis Utama)
                        </span>
                      </div>
                      {alternateIndex === undefined && <UserCheck className="h-4 w-4 text-amber-300 shrink-0" />}
                    </button>

                    {/* Alternate Leaders Buttons */}
                    {currentLeaderData.alternateLeaders.map((alt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setAlternateIndex(idx)}
                        className={`w-full text-left px-3 py-2 rounded-lg font-mono text-xs transition-all flex items-center justify-between ${
                          alternateIndex === idx
                            ? 'bg-amber-500/30 border border-amber-400/60 text-amber-200 font-bold'
                            : 'bg-black/30 hover:bg-black/50 text-[#cbd5e1] border border-white/5'
                        }`}
                      >
                        <div>
                          <span>{alt.name}</span>
                          <span className="text-[10px] text-slate-400 block font-normal">
                            {alt.yearRange} ({alt.title})
                          </span>
                        </div>
                        {alternateIndex === idx && <UserCheck className="h-4 w-4 text-amber-300 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button: Inspect Nation in War Tracker */}
              {onSelectNation && (
                <button
                  onClick={() => {
                    onSelectNation(selectedTag);
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 transition-all"
                >
                  <span>Pilih di Pelacak Perang Global</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Right Column: In-Depth Dossier Information (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              {/* Leader Header Box */}
              <div className="p-4 rounded-xl border border-[#273256] bg-[#080d1a] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currentLeaderData.countryFlagEmoji}</span>
                    <div>
                      <h3 className="font-serif text-xl font-black text-[#fef3c7] leading-tight">
                        {displayName}
                      </h3>
                      <p className="text-xs font-mono text-amber-300/90">{displayTitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase border bg-amber-500/10 border-amber-500/30 text-amber-300 block">
                      {displayIdeology}
                    </span>
                    <span className="text-[10px] font-mono text-[#94a3b8] block mt-0.5">
                      Sub: {displaySubIdeology}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1b2542] flex items-center justify-between text-xs font-mono text-[#cbd5e1]">
                  <span>Masa Jabatan Masa Perang:</span>
                  <strong className="text-amber-200">{displayTenure}</strong>
                </div>
              </div>

              {/* Leader Historical Quote */}
              {currentLeaderData.historicQuote && (
                <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-950/20 relative">
                  <Quote className="h-6 w-6 text-amber-500/30 absolute top-2 right-2" />
                  <p className="font-serif italic text-xs text-[#fef3c7] leading-relaxed pr-6">
                    "{currentLeaderData.historicQuote}"
                  </p>
                  {currentLeaderData.quoteSpeaker && (
                    <p className="text-[10px] font-mono text-amber-400/80 text-right mt-1.5">
                      — {currentLeaderData.quoteSpeaker}
                    </p>
                  )}
                </div>
              )}

              {/* Official HOI4 Traits Section */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-sm font-bold text-[#fef3c7] flex items-center gap-1.5 uppercase tracking-wide">
                    <Award className="h-4 w-4 text-amber-400" /> Sifat Kepemimpinan Resmi HOI4 (Leader Traits)
                  </h4>
                  <span className="text-[10px] font-mono text-[#94a3b8]">In-game mechanical buffs</span>
                </div>

                <div className="space-y-2">
                  {displayTraits.map((trait) => (
                    <div
                      key={trait.id}
                      className="p-3 rounded-xl border border-[#273256] bg-black/40 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-amber-200 text-xs">{trait.name}</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-white/10 text-slate-300">
                          {trait.type}
                        </span>
                      </div>
                      <p className="text-xs text-[#cbd5e1] leading-relaxed">{trait.description}</p>
                      <div className="pt-1.5 border-t border-white/10 space-y-1">
                        {trait.modifiers.map((mod, mIdx) => (
                          <div key={mIdx} className="flex justify-between items-center text-xs font-mono">
                            <span className="text-[#94a3b8]">{mod.label}:</span>
                            <span
                              className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                                mod.positive
                                  ? 'text-emerald-300 bg-emerald-950/40 border border-emerald-500/30'
                                  : 'text-red-300 bg-red-950/40 border border-red-500/30'
                              }`}
                            >
                              {mod.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* National Modifier Baseline Overview */}
              <div className="p-3.5 rounded-xl border border-[#273256] bg-[#070b16] space-y-2">
                <h4 className="font-serif text-xs font-bold text-[#fef3c7] uppercase tracking-wider">
                  Dampak Geopolitik &amp; Fokus Strategis:
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[10px] text-[#94a3b8] block">Perolehan PP:</span>
                    <strong className="text-amber-300">{currentLeaderData.politicalPowerGain}</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[10px] text-[#94a3b8] block">Bonus Stabilitas:</span>
                    <strong className="text-emerald-300">{currentLeaderData.stabilityBonus}</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[10px] text-[#94a3b8] block">War Support:</span>
                    <strong className="text-rose-300">{currentLeaderData.warSupportBonus}</strong>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[#94a3b8] pt-1">
                  <span>Jalur Fokus Nasional Utama: </span>
                  <strong className="text-white">{currentLeaderData.signatureFocus}</strong>
                </div>
              </div>

              {/* Historical Biography */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-1.5 text-xs text-[#cbd5e1] leading-relaxed">
                <div className="flex items-center gap-1.5 font-serif font-bold text-[#fef3c7]">
                  <BookOpen className="h-4 w-4 text-indigo-400" />
                  <span>Konteks Sejarah Perang Dunia II:</span>
                </div>
                <p>{displayBio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="border-t border-[#1b2542] bg-[#080d1a] p-4 px-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#94a3b8]">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-400" />
            <span>Koleksi Potret Resmi 7 Negara Utama Hearts of Iron IV</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
          >
            Tutup Dokumen
          </button>
        </div>
      </div>
    </div>
  );
};
