import React, { useState } from 'react';
import {
  Globe, Factory, Swords, Landmark, Map, Zap, AlertTriangle,
  CheckCircle2, ArrowRight, Shield, Award, Fuel, Anchor, Plane,
  Users, Layers, ExternalLink, Sparkles, BookOpen, ChevronRight,
  TrendingUp, ShieldAlert, HeartHandshake
} from 'lucide-react';
import { CountryStrategy } from '../types';
import { HistoricalContextModal } from './HistoricalContextModal';
import { HOI4LeaderPortrait } from './HOI4LeaderPortrait';
import { HOI4LeaderDossierModal } from './HOI4LeaderDossierModal';
import { hoi4LeaderService } from '../services/hoi4LeaderService';

interface CountryDossierModalProps {
  country: CountryStrategy;
  onClose?: () => void;
  isEmbedded?: boolean;
  onNavigateToFocus?: (countryId: string) => void;
}

export const CountryDossierModal: React.FC<CountryDossierModalProps> = ({
  country,
  onClose,
  isEmbedded = false,
  onNavigateToFocus
}) => {
  const [activeTab, setActiveTab] = useState<'context' | 'rich' | 'war' | 'politics' | 'timeline' | 'resources'>('context');
  const [isHistoricalModalOpen, setIsHistoricalModalOpen] = useState<boolean>(false);
  const [isLeaderDossierOpen, setIsLeaderDossierOpen] = useState<boolean>(false);

  const isMajor = ['ger', 'sov', 'usa', 'eng', 'jap', 'ita', 'fra'].includes(country.id);

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Sangat Mudah':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Mudah':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Sedang':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      case 'Menantang':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Sulit':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'Ahli':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  // Derive core strengths
  const coreStrengths = React.useMemo(() => {
    const customStrengths: Record<string, string[]> = {
      ger: [
        'Basis Industri Baja & Alutsista Kelas Satu (MEFO Bills +25% Speed)',
        'Doktrin Mobile Warfare & Korps Panzer Terkoordinasi Radio',
        'Keunggulan Udara Awal (Luftwaffe dengan CAS Ju-87 Stuka Mematikan)',
        'Bonus Caplok Wilayah Damai (Anschluss Austria & Sudetenland Gratis)'
      ],
      sov: [
        'Kolam Manpower Terbesar di Bumi (Potensi 15+ Juta Tentara Tanpa Penalti)',
        'Kapasitas Pabrik Pedalaman di Pegunungan Ural Bebas Serangan Bom Musuh',
        'Produksi Tank T-34 Murah & Andal Massal dengan Doktrin Deep Battle',
        'Cadangan Minyak Mentah Baku & Bijih Besi Melimpah Ruah'
      ],
      usa: [
        'Raksasa Industri Terbesar di Dunia (Potensi 300+ Pabrik Sipil & Militer)',
        'Kemandirian Energi Mutlak (Produsen Minyak & Baja Terbesar di Bumi)',
        'Perlindungan Dua Samudra Bebas dari Ancaman Invasi Darat Langsung',
        'Kapasitas Riset dan Produksi Pembom Strategis & Senjata Nuklir Manhattan'
      ],
      eng: [
        'Penguasa Samudra Global (Royal Navy dengan Belasan Battleship & Carrier)',
        'Jaringan Koloni Seluruh Dunia (Akses Karet Malaya & Minyak Timur Tengah)',
        'Teknologi Radar Rantai Home Chain & Pesawat Tempur Spitfire Superior',
        'Perlindungan Selat Inggris dari Serangan Darat Langsung'
      ],
      jap: [
        'Armada Kapal Induk Mobile Strike (Kido Butai) Terkuat di Pasifik 1936-41',
        'Pilot Tempur Elit A6M Zero & Torpedo Long Lance Pembunuh Malam',
        'Manpower Berlimpah dengan Kepatuhan Mutlak Doktrin Bushido',
        'Akses Mudah ke Lumbung Minyak & Karet Hindia Belanda'
      ],
      ita: [
        'Posisi Strategis di Jantung Laut Mediterania (Mare Nostrum)',
        'Angkatan Darat Besar dengan Pengalaman Tempur Awal di Afrika',
        'Armada Laut Cepat Regia Marina & Pasukan Elit Katak Komando Decima MAS',
        'Potensi Membentuk Kembali Imperium Romawi dengan Cepat'
      ],
      fra: [
        'Benteng Baja Garis Maginot Level 10 Tak Tertembus Serangan Frontal',
        'Cadangan Tank Berat Char B1 bis Kebal Tembakan Meriam Standar 1936',
        'Armada Laut Terkuat ke-4 di Dunia untuk Menjaga Laut Tengah',
        'Imperium Koloni Luas di Afrika Utara dan Indochina'
      ]
    };

    if (customStrengths[country.id]) return customStrengths[country.id];

    const list: string[] = [];
    if (country.startingDockyards > 3) list.push(`Galangan Kapal Siap Operasi (${country.startingDockyards} Docks)`);
    if (country.startingCivilianFactories >= 10) list.push(`Fondasi Ekonomi Stabil (${country.startingCivilianFactories} Pabrik Sipil)`);
    if (country.vitalResources?.surplus && country.vitalResources.surplus.length > 0) {
      list.push(`Surplus Sumber Daya Vital: ${country.vitalResources.surplus.join(', ')}`);
    }
    if (country.doctrineRecommendation) {
      list.push(`Sinergi Doktrin: ${country.doctrineRecommendation.split('->')[0].trim()}`);
    }
    if (country.startingForces && country.startingForces.divisions >= 15) {
      list.push(`Kesiapan Militer (${country.startingForces.divisions} Divisi Aktif)`);
    }
    if (list.length < 3) {
      list.push('Posisi Geopolitik Strategis yang Fleksibel untuk Diplomasi & Ekspansi');
    }
    return list.slice(0, 4);
  }, [country]);

  const content = (
    <div className="space-y-6">
      {/* Country Header Card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#b8860b]/50 bg-gradient-to-r from-[#1b221d] via-[#141c18] to-[#121924] p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-[#b8860b] text-3xl font-black shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${country.flagColors[0]} 0%, ${country.flagColors[1]} 100%)`
              }}
            >
              <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{country.flagSymbol}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-black text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                  [{country.tag}]
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded font-bold border ${getDifficultyBadge(country.difficulty)}`}>
                  Tingkat Kesulitan: {country.difficulty}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#1e293b] text-[#94a3b8] font-mono">
                  {country.faction}
                </span>
                {isMajor && (
                  <span className="rounded bg-red-950/80 border border-red-500/40 px-2 py-0.5 text-[10px] font-mono font-bold text-red-300">
                    7 MAJORS
                  </span>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-black font-serif text-[#fef3c7]">
                {country.name}
              </h2>
              <div className="text-xs text-[#cbd5e1] flex items-center gap-3 flex-wrap">
                <span><strong>Pemimpin:</strong> {country.leader}</span>
                <span>•</span>
                <span><strong>Ideologi:</strong> {country.ideology}</span>
                <span>•</span>
                <span><strong>Doktrin:</strong> {country.doctrineRecommendation}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid & Historical Trigger */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="grid grid-cols-3 gap-2.5 shrink-0 bg-[#0e1713] p-3 rounded-xl border border-[#223028]">
              <div className="text-center">
                <div className="text-[10px] font-mono text-[#94a3b8]">Civs</div>
                <div className="text-base font-black font-mono text-amber-400">{country.startingCivilianFactories}</div>
              </div>
              <div className="text-center border-x border-[#223028] px-2">
                <div className="text-[10px] font-mono text-[#94a3b8]">Mils</div>
                <div className="text-base font-black font-mono text-red-400">{country.startingMilitaryFactories}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-mono text-[#94a3b8]">Docks</div>
                <div className="text-base font-black font-mono text-sky-400">{country.startingDockyards}</div>
              </div>
            </div>

            {isMajor && (
              <button
                id={`open-history-modal-${country.id}`}
                onClick={() => setIsHistoricalModalOpen(true)}
                className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/70 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 px-3.5 py-2.5 text-xs font-bold text-black shadow-md transition-all shrink-0"
                title="Buka Arsip Konteks Sejarah & Misi Utama 7 Majors"
              >
                <BookOpen className="h-4 w-4 text-black" />
                <span>Konteks Sejarah {country.tag}</span>
              </button>
            )}
          </div>
        </div>

        {/* Starting Forces Bar if available */}
        {country.startingForces && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 border-t border-[#223028] pt-3 text-xs">
            <div className="flex items-center gap-2 text-[#cbd5e1]">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span>Divisi Awal: <strong className="text-emerald-300 font-mono">{country.startingForces.divisions} Div</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[#cbd5e1]">
              <Plane className="h-4 w-4 text-sky-400" />
              <span>Pesawat: <strong className="text-sky-300 font-mono">{country.startingForces.airplanes} Unit</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[#cbd5e1]">
              <Anchor className="h-4 w-4 text-amber-400" />
              <span>Kapal Perang: <strong className="text-amber-300 font-mono">{country.startingForces.ships} Kapal</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[#cbd5e1]">
              <Users className="h-4 w-4 text-purple-400" />
              <span>Manpower: <strong className="text-purple-300 font-mono">{country.startingForces.manpowerPool}</strong></span>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mt-5 flex gap-1.5 overflow-x-auto border-t border-[#223028] pt-4 scrollbar-thin">
          <button
            onClick={() => setActiveTab('context')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition-all shrink-0 ${
              activeTab === 'context'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-[#141e19] text-[#94a3b8] hover:text-white hover:bg-[#1a2922]'
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Konteks &amp; Geopolitik</span>
          </button>

          <button
            onClick={() => setActiveTab('rich')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition-all shrink-0 ${
              activeTab === 'rich'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-[#141e19] text-[#94a3b8] hover:text-white hover:bg-[#1a2922]'
            }`}
          >
            <Factory className="h-3.5 w-3.5" />
            <span>Cara Menjadi Kaya</span>
          </button>

          <button
            onClick={() => setActiveTab('war')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition-all shrink-0 ${
              activeTab === 'war'
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-[#141e19] text-[#94a3b8] hover:text-white hover:bg-[#1a2922]'
            }`}
          >
            <Swords className="h-3.5 w-3.5" />
            <span>Memenangkan War</span>
          </button>

          <button
            onClick={() => setActiveTab('politics')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition-all shrink-0 ${
              activeTab === 'politics'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-[#141e19] text-[#94a3b8] hover:text-white hover:bg-[#1a2922]'
            }`}
          >
            <Landmark className="h-3.5 w-3.5" />
            <span>Kuasai Politik</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition-all shrink-0 ${
              activeTab === 'timeline'
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-[#141e19] text-[#94a3b8] hover:text-white hover:bg-[#1a2922]'
            }`}
          >
            <Map className="h-3.5 w-3.5" />
            <span>Master Plan 1936-45</span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition-all shrink-0 ${
              activeTab === 'resources'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-[#141e19] text-[#94a3b8] hover:text-white hover:bg-[#1a2922]'
            }`}
          >
            <Fuel className="h-3.5 w-3.5" />
            <span>Sumber Daya Vital</span>
          </button>

          {onNavigateToFocus && (
            <button
              onClick={() => onNavigateToFocus(country.id)}
              className="ml-auto flex items-center gap-1.5 rounded-lg border border-amber-500/50 bg-[#281d0f] px-3 py-2 text-xs font-bold text-amber-300 hover:bg-[#3d2c16] hover:text-amber-200 transition-all shrink-0"
              title="Buka Pohon Fokus Nasional interaktif untuk negara ini"
            >
              <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
              <span>Buka Pohon Fokus ({country.tag})</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Konteks & Geopolitik 1936 with Integrated National Summary Card */}
      {activeTab === 'context' && (
        <div className="space-y-5">
          {/* DYNAMIC NATIONAL SUMMARY CARD */}
          <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-[#161f1a] via-[#101713] to-[#0a100d] p-5 md:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#233529] pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-bold font-serif text-[#fef3c7]">
                  National Summary Card: {country.name} [{country.tag}]
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-300/80 bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 rounded">
                Dossier Intelijen Kritis
              </span>
            </div>

            {/* 3 Pillars: Strengths, Resources, Threats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pillar 1: Core Strengths */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-4 space-y-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Keunggulan Inti Militer</span>
                </span>
                <ul className="space-y-2 text-xs text-[#cbd5e1]">
                  {coreStrengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-[#0c1611] p-2 rounded-lg border border-emerald-500/20">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pillar 2: Starting Resources & Production Base */}
              <div className="rounded-xl border border-sky-500/30 bg-sky-950/15 p-4 space-y-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <Factory className="h-4 w-4 text-sky-400" />
                  <span>Sumber Daya &amp; Pabrik</span>
                </span>
                <div className="space-y-2 text-xs">
                  <div className="rounded-lg bg-[#0a151f] p-2 border border-sky-500/20 text-[#cbd5e1]">
                    <div className="font-mono text-[10px] text-[#94a3b8] uppercase">Kapasitas Pabrik Awal:</div>
                    <div className="font-semibold text-sky-200 mt-0.5">
                      {country.startingCivilianFactories} Civs | {country.startingMilitaryFactories} Mils | {country.startingDockyards} Docks
                    </div>
                  </div>

                  {country.vitalResources && (
                    <div className="rounded-lg bg-[#0a151f] p-2 border border-sky-500/20 text-[#cbd5e1] space-y-1">
                      <div>
                        <strong className="text-emerald-400">Surplus: </strong>
                        <span>{country.vitalResources.surplus.join(', ') || 'Nol'}</span>
                      </div>
                      <div>
                        <strong className="text-red-400">Defisit: </strong>
                        <span>{country.vitalResources.deficits.join(', ') || 'Aman'}</span>
                      </div>
                    </div>
                  )}

                  {country.startingForces && (
                    <div className="rounded-lg bg-[#0a151f] p-2 border border-sky-500/20 text-[#cbd5e1] text-[11px] font-mono">
                      Divisi: <strong className="text-emerald-300">{country.startingForces.divisions}</strong> | 
                      Pesawat: <strong className="text-amber-300">{country.startingForces.airplanes}</strong> | 
                      Kapal: <strong className="text-sky-300">{country.startingForces.ships}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Pillar 3: Geopolitical Threats & Achilles' Heel */}
              <div className="rounded-xl border border-red-500/30 bg-red-950/15 p-4 space-y-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span>Ancaman Geopolitik</span>
                </span>
                <ul className="space-y-2 text-xs text-[#cbd5e1]">
                  {country.keyChallenges.map((threat, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-[#180a0c] p-2 rounded-lg border border-red-500/20">
                      <span className="text-red-400 font-bold shrink-0">!</span>
                      <span className="text-red-100/90">{threat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#223028] bg-[#111915] p-5 space-y-3">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Situasi Geopolitik &amp; Latar Historis 1936:</span>
            </h3>
            <p className="text-sm text-[#cbd5e1] leading-relaxed">
              {country.geopoliticalContext || country.proTips}
            </p>
          </div>

          {/* Pro Tips Banner */}
          <div className="rounded-xl border border-amber-500/40 bg-[#241a10] p-4 text-xs sm:text-sm text-amber-200 flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 block mb-1">Kunci Kemenangan Unik [{country.tag}]:</strong>
              {country.proTips}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Cara Menjadi Kaya */}
      {activeTab === 'rich' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-amber-500/30 bg-[#1e1911] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#fef08a] flex items-center gap-2">
                <Factory className="h-5 w-5 text-amber-400" />
                <span>Doktrin Ekonomi &amp; Industri: {country.name}</span>
              </h3>
              <span className="text-xs font-mono text-amber-400/80 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-500/30">
                Kapasitas Awal: {country.startingCivilianFactories} Civs / {country.startingMilitaryFactories} Mils
              </span>
            </div>

            <div className="rounded-lg bg-[#14100b] p-4 text-sm text-[#e2e8f0] leading-relaxed border border-[#302416]">
              {typeof country.howToGetRich === 'object' && country.howToGetRich !== null ? (
                <div className="space-y-2 text-xs sm:text-sm">
                  <div><strong className="text-amber-300">Snowball Sipil:</strong> {country.howToGetRich.civSnowball}</div>
                  <div><strong className="text-amber-300">Sumber Daya:</strong> {country.howToGetRich.resourceStrategy}</div>
                  <div><strong className="text-amber-300">Kebijakan Perdagangan:</strong> {country.howToGetRich.tradePolicy}</div>
                  <div><strong className="text-amber-300">Rampasan Perang:</strong> {country.howToGetRich.warPlunder}</div>
                </div>
              ) : (
                <div>{country.howToGetRich || country.industryStrategy}</div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="rounded-lg border border-[#2e2316] bg-[#120f09] p-3.5 space-y-1">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase">Target Transisi Pabrik:</div>
                <div className="text-xs text-[#cbd5e1] leading-relaxed">
                  Pertahankan rasio minimal 1:1 antara Civs dan Mils sebelum meletusnya perang besar untuk menjaga efisiensi perbaikan infrastruktur.
                </div>
              </div>

              <div className="rounded-lg border border-[#2e2316] bg-[#120f09] p-3.5 space-y-1">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase">Hukum Ekonomi Prioritas:</div>
                <div className="text-xs text-[#cbd5e1] leading-relaxed">
                  Lompat ke <strong>War Economy</strong> secepat mungkin untuk memotong pajak Consumer Goods dan membebaskan kapasitas pabrik.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Memenangkan War */}
      {activeTab === 'war' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-red-500/30 bg-[#1c1214] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#fca5a5] flex items-center gap-2">
                <Swords className="h-5 w-5 text-red-400" />
                <span>Doktrin &amp; Taktik Perang: {country.name}</span>
              </h3>
              <span className="text-xs font-mono text-red-300 bg-red-950/60 px-2.5 py-1 rounded-full border border-red-500/30">
                {country.doctrineRecommendation}
              </span>
            </div>

            <div className="rounded-lg bg-[#140b0d] p-4 text-sm text-[#e2e8f0] leading-relaxed border border-[#32171c]">
              {typeof country.howToWinWar === 'object' && country.howToWinWar !== null ? (
                <div className="space-y-2 text-xs sm:text-sm">
                  <div><strong className="text-red-300">Doktrin Tempur:</strong> {country.howToWinWar.recommendedDoctrine}</div>
                  <div><strong className="text-red-300">Template Divisi:</strong> {country.howToWinWar.recommendedTemplate}</div>
                  <div><strong className="text-red-300">Strategi Palagan:</strong> {country.howToWinWar.theaterStrategy}</div>
                  <div><strong className="text-red-300">Udara &amp; Armada Laut:</strong> {country.howToWinWar.navalAirAdvice}</div>
                </div>
              ) : (
                <div>{country.howToWinWar || country.militaryStrategy}</div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="rounded-lg border border-[#2e151a] bg-[#12080a] p-3.5 space-y-1">
                <div className="text-xs font-mono text-red-400 font-bold uppercase">Template Divisi Utama:</div>
                <div className="text-xs text-[#cbd5e1] leading-relaxed">
                  {country.startingForces ? `Infanteri 16w-18w dengan Artileri & AA Support untuk bertahan, serta Panzer/Kavaleri pemukul.` : 'Infanteri standar dengan Support Company lengkap.'}
                </div>
              </div>

              <div className="rounded-lg border border-[#2e151a] bg-[#12080a] p-3.5 space-y-1">
                <div className="text-xs font-mono text-red-400 font-bold uppercase">Superioritas Udara:</div>
                <div className="text-xs text-[#cbd5e1] leading-relaxed">
                  Fokus pada Small Airframe CAS dan Fighter untuk merebut udara hijau dan melancarkan bombardir harian ke divisi lawan.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Kuasai Politik */}
      {activeTab === 'politics' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-500/30 bg-[#101b15] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#a7f3d0] flex items-center gap-2">
                <Landmark className="h-5 w-5 text-emerald-400" />
                <span>Manajemen Politik, Kabinet &amp; Stabilitas: {country.name}</span>
              </h3>
              <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                {country.ideology}
              </span>
            </div>

            <div className="rounded-lg bg-[#0a120e] p-4 text-sm text-[#e2e8f0] leading-relaxed border border-[#1b2d23]">
              {typeof country.howToMasterPolitics === 'object' && country.howToMasterPolitics !== null ? (
                <div className="space-y-2 text-xs sm:text-sm">
                  <div><strong className="text-emerald-300">Penasihat Prioritas:</strong> {country.howToMasterPolitics.topAdvisors?.join(', ')}</div>
                  <div><strong className="text-emerald-300">Stabilitas &amp; War Support:</strong> {country.howToMasterPolitics.stabilityWarSupport}</div>
                  <div><strong className="text-emerald-300">Penanganan Debuff:</strong> {country.howToMasterPolitics.debuffHandling}</div>
                </div>
              ) : (
                <div>{country.howToMasterPolitics || country.proTips}</div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="rounded-lg border border-[#1b2d23] bg-[#080f0c] p-3.5 space-y-1">
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase">Alokasi 150 PP Pertama:</div>
                <div className="text-xs text-[#cbd5e1] leading-relaxed">
                  Rekrut penasihat <strong>Silent Workhorse</strong> atau ubah hukum ekonomi ke War Economy secepatnya.
                </div>
              </div>

              <div className="rounded-lg border border-[#1b2d23] bg-[#080f0c] p-3.5 space-y-1">
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase">Batas Stabilitas Kritis:</div>
                <div className="text-xs text-[#cbd5e1] leading-relaxed">
                  Pertahankan stabilitas nasional di atas 80% untuk memetik bonus output pabrik +20% dan mencegah pemogokan buruh.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Master Plan 1936-45 */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-sky-500/30 bg-[#0f1722] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#bae6fd] flex items-center gap-2">
                <Map className="h-5 w-5 text-sky-400" />
                <span>Urutan Fokus &amp; Rencana Strategis (1936 - 1945)</span>
              </h3>
              <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-500/30">
                Pohon Fokus Utama
              </span>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono text-sky-400 font-bold uppercase">Urutan Fokus Awal 1936-1937:</div>
              <div className="flex flex-wrap gap-2">
                {country.focusPath1936.map((focus, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 rounded-lg bg-[#142233] px-3 py-2 border border-[#203752] text-xs text-[#f1f5f9]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[10px] font-black text-black">
                      {fIdx + 1}
                    </span>
                    <span>{focus}</span>
                    {fIdx < country.focusPath1936.length - 1 && (
                      <ArrowRight className="h-3 w-3 text-sky-400 ml-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {country.masterPlan1936_1945 && country.masterPlan1936_1945.length > 0 ? (
              <div className="space-y-3 pt-3 border-t border-[#1c2d42]">
                <div className="text-xs font-mono text-sky-400 font-bold uppercase">Kronologi Operasi Utama:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {country.masterPlan1936_1945.map((phase, pIdx) => (
                    <div key={pIdx} className="rounded-lg bg-[#142233] p-3 border border-[#203752] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-amber-400">{phase.phase} ({phase.period})</span>
                      </div>
                      <div className="font-bold text-xs text-[#f8fafc]">{phase.title}</div>
                      <div className="text-xs text-[#cbd5e1] leading-relaxed">{phase.strategicGoal}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : country.stepByStepGameplan ? (
              <div className="space-y-3 pt-3 border-t border-[#1c2d42]">
                <div className="text-xs font-mono text-sky-400 font-bold uppercase">Rencana Eksekusi Bertahap (Gameplan):</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[#142233] p-3 border border-[#203752] space-y-1">
                    <span className="font-mono text-xs font-bold text-amber-400">Fase 1 (1936 - 1937)</span>
                    <div className="text-xs text-[#cbd5e1] leading-relaxed">{country.stepByStepGameplan.phase1}</div>
                  </div>
                  <div className="rounded-lg bg-[#142233] p-3 border border-[#203752] space-y-1">
                    <span className="font-mono text-xs font-bold text-amber-400">Fase 2 (1938 - 1939)</span>
                    <div className="text-xs text-[#cbd5e1] leading-relaxed">{country.stepByStepGameplan.phase2}</div>
                  </div>
                  <div className="rounded-lg bg-[#142233] p-3 border border-[#203752] space-y-1">
                    <span className="font-mono text-xs font-bold text-amber-400">Fase 3 (1940 - 1942)</span>
                    <div className="text-xs text-[#cbd5e1] leading-relaxed">{country.stepByStepGameplan.phase3}</div>
                  </div>
                  <div className="rounded-lg bg-[#142233] p-3 border border-[#203752] space-y-1">
                    <span className="font-mono text-xs font-bold text-amber-400">Fase 4 (1943 - 1945)</span>
                    <div className="text-xs text-[#cbd5e1] leading-relaxed">{country.stepByStepGameplan.phase4}</div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Tab 6: Sumber Daya Vital */}
      {activeTab === 'resources' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-purple-500/30 bg-[#171222] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#e9d5ff] flex items-center gap-2">
                <Fuel className="h-5 w-5 text-purple-400" />
                <span>Neraca Sumber Daya &amp; Ketahanan Energi</span>
              </h3>
              <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded-full border border-purple-500/30">
                Logistik Perang
              </span>
            </div>

            {country.vitalResources ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="rounded-lg bg-[#1d152b] p-4 border border-[#32234a] space-y-2">
                  <div className="font-mono text-xs font-bold text-emerald-400 uppercase">Surplus Sumber Daya:</div>
                  <div className="text-sm text-[#f1f5f9] font-medium">
                    {country.vitalResources.surplus.join(', ') || 'Tidak ada surplus signifikan'}
                  </div>
                  <p className="text-[11px] text-[#94a3b8]">
                    Ekspor surplus ini dengan hukum Free Trade untuk mendapatkan pabrik sipil ekstra dari negara pembeli.
                  </p>
                </div>

                <div className="rounded-lg bg-[#1d152b] p-4 border border-[#32234a] space-y-2">
                  <div className="font-mono text-xs font-bold text-red-400 uppercase">Defisit Kritis:</div>
                  <div className="text-sm text-red-300 font-medium">
                    {country.vitalResources.deficits.join(', ') || 'Tidak ada defisit kritis'}
                  </div>
                  <p className="text-[11px] text-[#94a3b8]">
                    Wajib diamankan melalui invasi koloni, kilang sintetis, atau rute konvoi laut yang aman.
                  </p>
                </div>

                <div className="rounded-lg bg-[#1d152b] p-4 border border-[#32234a] space-y-1 sm:col-span-2">
                  <div className="font-mono text-xs font-bold text-amber-400 uppercase">Status BBM &amp; Karet:</div>
                  <div className="text-xs text-[#cbd5e1] leading-relaxed">
                    <strong>Minyak:</strong> {country.vitalResources.oilStatus} | <strong>Karet:</strong> {country.vitalResources.rubberStatus}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-[#cbd5e1]">
                Data sumber daya spesifik sedang dikompilasi dari intelijen lapangan.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Historical Context Modal for Majors */}
      {isMajor && (
        <HistoricalContextModal
          isOpen={isHistoricalModalOpen}
          onClose={() => setIsHistoricalModalOpen(false)}
          initialCountryId={country.id}
        />
      )}
    </div>
  );

  if (isEmbedded) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#b8860b]/60 bg-[#0f1411] p-5 shadow-2xl scrollbar-thin">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-lg border border-[#2d3a32] bg-[#141f19] p-2 text-[#94a3b8] hover:text-white"
          >
            Tutup (✕)
          </button>
        )}
        {content}
      </div>
    </div>
  );
};
