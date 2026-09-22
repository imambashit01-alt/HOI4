import React, { useState, useEffect } from 'react';
import {
  X, BookOpen, Target, AlertTriangle, Sparkles, Swords,
  Shield, Landmark, Users, ArrowRight, CheckCircle2,
  Clock, Flag, ChevronRight
} from 'lucide-react';
import { HISTORICAL_CONTEXT_DATA, MajorHistoricalContext, getMajorHistoricalContext } from '../data/historicalContextData';

interface HistoricalContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCountryId?: string;
  onSelectCountry?: (countryId: string) => void;
}

export const HistoricalContextModal: React.FC<HistoricalContextModalProps> = ({
  isOpen,
  onClose,
  initialCountryId = 'ger',
  onSelectCountry
}) => {
  const [selectedMajorId, setSelectedMajorId] = useState<string>(initialCountryId);

  useEffect(() => {
    if (initialCountryId) {
      setSelectedMajorId(initialCountryId);
    }
  }, [initialCountryId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentCountry: MajorHistoricalContext = getMajorHistoricalContext(selectedMajorId);

  return (
    <div
      id="historical-context-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        id="historical-context-modal-container"
        className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl border border-[#b8860b]/60 bg-[#0f141a] shadow-2xl shadow-black/80 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-[#233140] bg-gradient-to-r from-[#17202b] via-[#121922] to-[#0f141a] px-5 py-3.5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-amber-400 uppercase">
                  ARSIP SEJARAH PD II (1936-1945)
                </span>
                <span className="rounded bg-red-950/80 border border-red-500/40 px-1.5 py-0.2 text-[10px] font-mono font-bold text-red-300">
                  7 NEGARA UTAMA
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#f8fafc] font-serif">
                Konteks Sejarah &amp; Misi Utama 7 Kekuatan Dunia
              </h3>
            </div>
          </div>

          <button
            id="close-historical-modal-btn"
            onClick={onClose}
            className="rounded-lg border border-[#2d3e50] bg-[#141e2a] p-2 text-[#94a3b8] transition-colors hover:border-red-500 hover:text-red-400"
            title="Tutup Modal (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 7 Major Powers Quick Tabs Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-[#1b2633] bg-[#0c1117] p-2 shrink-0 scrollbar-none">
          {HISTORICAL_CONTEXT_DATA.map((country) => {
            const isSelected = country.id === selectedMajorId;
            return (
              <button
                key={country.id}
                id={`major-tab-${country.id}`}
                onClick={() => setSelectedMajorId(country.id)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'border-amber-400/80 bg-gradient-to-r from-amber-950/80 to-stone-900 text-amber-200 shadow-md ring-1 ring-amber-400/40'
                    : 'border-[#1e2938] bg-[#111822] text-[#94a3b8] hover:border-[#33465b] hover:text-[#f1f5f9]'
                }`}
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[11px] font-bold text-white shadow"
                  style={{
                    background: `linear-gradient(135deg, ${country.flagColors[0]}, ${country.flagColors[1]})`
                  }}
                >
                  {country.flagSymbol}
                </span>
                <span>{country.commonName}</span>
                <span className="font-mono text-[10px] text-amber-400/80 opacity-70">
                  {country.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin">
          {/* Hero Banner for Selected Country */}
          <div
            className="relative overflow-hidden rounded-xl border border-[#2b3a4a] p-5 shadow-lg"
            style={{
              background: `linear-gradient(135deg, rgba(23,32,45,0.95), rgba(15,20,28,0.98))`
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-serif text-3xl font-bold text-white shadow-xl border border-white/20"
                  style={{
                    background: `linear-gradient(135deg, ${currentCountry.flagColors[0]}, ${currentCountry.flagColors[1]})`
                  }}
                >
                  {currentCountry.flagSymbol}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="rounded bg-[#0c2438] border border-[#38bdf8]/40 px-2 py-0.5 text-xs font-mono font-bold text-[#38bdf8]">
                      TAG: {currentCountry.tag}
                    </span>
                    <span className="rounded bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 text-xs font-mono text-amber-300">
                      {currentCountry.ideology}
                    </span>
                    <span className="text-xs text-[#94a3b8] font-mono">
                      Partai: <strong className="text-[#f1f5f9]">{currentCountry.rulingParty}</strong>
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black font-serif text-[#f8fafc] tracking-tight">
                    {currentCountry.name}
                  </h2>
                  <p className="text-xs text-[#94a3b8] font-mono mt-0.5">
                    Kepala Negara / Pemimpin: <span className="text-[#fef08a] font-bold">{currentCountry.leader}</span>
                  </p>
                </div>
              </div>

              {/* Action Button */}
              {onSelectCountry && (
                <button
                  id={`select-major-for-warroom-${currentCountry.id}`}
                  onClick={() => {
                    onSelectCountry(currentCountry.id);
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/70 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-amber-950/50 transition-all shrink-0"
                >
                  <Swords className="h-4 w-4 text-black" />
                  <span>Pilih &amp; Mainkan di War Room</span>
                  <ChevronRight className="h-4 w-4 text-black" />
                </button>
              )}
            </div>

            {/* Primary Strategic Objective Card */}
            <div className="mt-4 rounded-xl border border-amber-500/40 bg-gradient-to-r from-[#281e0f] via-[#20180d] to-[#141b18] p-4 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-mono font-bold uppercase tracking-wider mb-1.5">
                <Target className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Misi Strategis &amp; Ambisi Utama Sejarah:</span>
              </div>
              <p className="text-sm font-semibold text-[#fef3c7] leading-relaxed">
                "{currentCountry.primaryObjective}"
              </p>
            </div>
          </div>

          {/* Two-Column Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Background & Strategic Balance (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Brief Historical Background */}
              <div className="rounded-xl border border-[#202e3d] bg-[#121a24] p-4 sm:p-5 space-y-2.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  Latar Belakang Sejarah &amp; Posisi Awal 1936
                </h4>
                <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed text-justify">
                  {currentCountry.briefHistoricalBackground}
                </p>
              </div>

              {/* Secondary Objectives */}
              <div className="rounded-xl border border-[#202e3d] bg-[#121a24] p-4 sm:p-5 space-y-2.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Target Strategis &amp; Prioritas Doktrin
                </h4>
                <ul className="space-y-2">
                  {currentCountry.secondaryObjectives.map((obj, oIdx) => (
                    <li
                      key={oIdx}
                      className="flex items-start gap-2.5 text-xs text-[#d1d5db] bg-[#0c1219] p-2.5 rounded-lg border border-[#1b2633]"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-300">
                        {oIdx + 1}
                      </span>
                      <span className="leading-relaxed">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Starting Forces & Capacity */}
              <div className="rounded-xl border border-[#202e3d] bg-[#121a24] p-4 sm:p-5 space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                  <Users className="h-4 w-4 text-sky-400" />
                  Kondisi Awal Militer &amp; Industri (1936)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="rounded-lg border border-[#1b2734] bg-[#0c131a] p-2.5">
                    <span className="text-[10px] uppercase font-mono text-[#94a3b8] block">Manpower &amp; Rakyat:</span>
                    <span className="font-semibold text-[#f1f5f9]">{currentCountry.startingSituationSummary.manpower}</span>
                  </div>
                  <div className="rounded-lg border border-[#1b2734] bg-[#0c131a] p-2.5">
                    <span className="text-[10px] uppercase font-mono text-[#94a3b8] block">Kapasitas Pabrik:</span>
                    <span className="font-semibold text-emerald-300">{currentCountry.startingSituationSummary.industry}</span>
                  </div>
                  <div className="rounded-lg border border-[#1b2734] bg-[#0c131a] p-2.5">
                    <span className="text-[10px] uppercase font-mono text-[#94a3b8] block">Armada Laut:</span>
                    <span className="font-semibold text-sky-300">{currentCountry.startingSituationSummary.navy}</span>
                  </div>
                  <div className="rounded-lg border border-[#1b2734] bg-[#0c131a] p-2.5">
                    <span className="text-[10px] uppercase font-mono text-[#94a3b8] block">Kekuatan Udara:</span>
                    <span className="font-semibold text-amber-300">{currentCountry.startingSituationSummary.airForce}</span>
                  </div>
                </div>
              </div>

              {/* Fatal Flaw & Historic Superweapon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-red-500/40 bg-red-950/20 p-3.5 space-y-1.5 text-xs">
                  <span className="font-mono text-[11px] font-bold text-red-400 flex items-center gap-1.5 uppercase">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    Kelemahan Fatal (Achilles' Heel):
                  </span>
                  <p className="text-xs text-red-200/90 leading-relaxed">
                    {currentCountry.fatalFlaw}
                  </p>
                </div>

                <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-3.5 space-y-1.5 text-xs">
                  <span className="font-mono text-[11px] font-bold text-amber-300 flex items-center gap-1.5 uppercase">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    Senjata Pamungkas Sejarah:
                  </span>
                  <p className="text-xs text-amber-100/90 leading-relaxed">
                    {currentCountry.historicSuperweapon}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Historical Milestones Timeline (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xl border border-[#202e3d] bg-[#121a24] p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-400" />
                    Tonggak Peristiwa Sejarah Kritis
                  </h4>
                  <span className="text-[10px] font-mono text-[#94a3b8]">1936-1945</span>
                </div>

                <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-sky-500 before:to-emerald-500">
                  {currentCountry.keyHistoricalMilestones.map((milestone, mIdx) => (
                    <div key={mIdx} className="relative space-y-1 text-xs">
                      {/* Timeline dot */}
                      <div className="absolute -left-5 top-1 h-3 w-3 rounded-full border-2 border-[#121a24] bg-amber-400 shadow" />
                      
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold text-amber-300">
                          {milestone.year}
                        </span>
                      </div>
                      <h5 className="font-bold text-[#f1f5f9] text-xs">
                        {milestone.title}
                      </h5>
                      <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                        {milestone.description}
                      </p>
                      <div className="mt-1 rounded bg-[#0b1016] border border-[#1b2633] p-1.5 text-[10px] text-emerald-300 font-mono">
                        <strong className="text-emerald-400">Dampak: </strong>
                        {milestone.strategicImpact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arch Rivals */}
              <div className="rounded-xl border border-[#202e3d] bg-[#121a24] p-4 space-y-2 text-xs">
                <span className="font-mono text-[11px] font-bold text-red-400 uppercase tracking-wider block">
                  Musuh Bebuyutan Utama:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentCountry.archRivals.map((rival, rIdx) => (
                    <span
                      key={rIdx}
                      className="rounded-lg border border-red-500/30 bg-red-950/40 px-2.5 py-1 text-xs font-mono font-medium text-red-300"
                    >
                      {rival}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-[#233140] bg-[#0c1117] px-5 py-3 shrink-0 text-xs">
          <div className="text-[#94a3b8] font-mono text-[11px]">
            Tip: Pelajari konteks sejarah agar kamu bisa mengulang sejarah kemenangan atau mengubah takdir!
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-[#2a3a4c] bg-[#141f2a] px-4 py-1.5 font-semibold text-[#cbd5e1] hover:text-[#f8fafc] hover:border-[#38bdf8] transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
