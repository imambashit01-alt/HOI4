import React, { useState, useMemo } from 'react';
import {
  Factory, Swords, Landmark, Cpu, CheckCircle2, AlertTriangle,
  Lightbulb, Copy, Check, TrendingUp, ShieldAlert, BookOpen,
  ArrowRight, Sparkles, Target, Zap, Clock, Shield, Globe,
  Anchor, Truck, Eye, Search, ExternalLink, ChevronRight,
  Layers, ChevronDown, Filter, BarChart3, Users, Flame, Fuel
} from 'lucide-react';
import { MASTER_PLAYBOOK_DATA, PlaybookSection, PlaybookPillar } from '../data/masterPlaybookData';
import { COUNTRIES_STRATEGY_DATA } from '../data/countryData';
import { CountryStrategy } from '../types';
import { HistoricalContextModal } from './HistoricalContextModal';

interface MasterPlaybookGuideProps {
  onSelectCountry?: (countryId: string) => void;
  onNavigateTab?: (tab: string) => void;
  onNavigateToFocus?: (countryId: string) => void;
}

export const MasterPlaybookGuide: React.FC<MasterPlaybookGuideProps> = ({
  onSelectCountry,
  onNavigateTab,
  onNavigateToFocus
}) => {
  const [activePillar, setActivePillar] = useState<PlaybookPillar>('rich');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamic National Summary State
  const [selectedSummaryCountryId, setSelectedSummaryCountryId] = useState<string>('ger');
  const [countrySearchQuery, setCountrySearchQuery] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  
  // Historical Context Modal State
  const [isHistoricalModalOpen, setIsHistoricalModalOpen] = useState<boolean>(false);
  const [historicalModalInitialId, setHistoricalModalInitialId] = useState<string>('ger');

  const currentSection = MASTER_PLAYBOOK_DATA.find(s => s.pillar === activePillar) || MASTER_PLAYBOOK_DATA[0];

  const currentSummaryCountry: CountryStrategy = useMemo(() => {
    return COUNTRIES_STRATEGY_DATA.find(c => c.id === selectedSummaryCountryId) || COUNTRIES_STRATEGY_DATA[0];
  }, [selectedSummaryCountryId]);

  // Filtered Countries for National Summary Selector
  const filteredCountries = useMemo(() => {
    return COUNTRIES_STRATEGY_DATA.filter(country => {
      const matchesSearch =
        country.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
        country.tag.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
        country.faction.toLowerCase().includes(countrySearchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (regionFilter === 'majors') {
        return ['ger', 'sov', 'usa', 'eng', 'jap', 'ita', 'fra'].includes(country.id);
      }
      if (regionFilter === 'nordic') {
        return ['FIN', 'SWE', 'NOR', 'DEN', 'EST', 'LAT', 'LIT'].includes(country.tag);
      }
      if (regionFilter === 'balkan') {
        return ['YUG', 'GRE', 'BUL', 'HUN', 'ROM', 'TUR'].includes(country.tag);
      }
      if (regionFilter === 'europe') {
        return ['SPA', 'POR', 'HOL', 'BEL', 'SWI', 'CZE', 'AUS', 'POL'].includes(country.tag);
      }
      if (regionFilter === 'asia') {
        return ['CHI', 'PRC', 'RAJ', 'AST', 'CAN'].includes(country.tag);
      }
      return true;
    });
  }, [countrySearchQuery, regionFilter]);

  const handleCopy = (section: PlaybookSection) => {
    const text = `[HOI4 MASTER PLAYBOOK: ${section.title}]
${section.subtitle}

IKHTISAR STRATEGIS:
${section.summary}

FORMULA KUNCI:
${section.coreFormulas.map(f => `• ${f.label} (${f.value}): ${f.description}`).join('\n')}

PANDUAN TAHAP DEMI TAHAP:
${section.stepByStepGuide.map(s => `${s.step}. ${s.title} [${s.timing}]: ${s.details}`).join('\n')}

ATURAN MUTLAK (DO's & DONT's):
DO:
${section.dosAndDonts.dos.map(d => `✓ ${d}`).join('\n')}
DON'T:
${section.dosAndDonts.donts.map(d => `✗ ${d}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopiedId(section.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPillarIcon = (pillar: PlaybookPillar) => {
    switch (pillar) {
      case 'rich': return <Factory className="h-4.5 w-4.5 text-amber-400" />;
      case 'war': return <Swords className="h-4.5 w-4.5 text-red-400" />;
      case 'politics': return <Landmark className="h-4.5 w-4.5 text-emerald-400" />;
      case 'world_domination': return <Globe className="h-4.5 w-4.5 text-purple-400" />;
      case 'navy': return <Anchor className="h-4.5 w-4.5 text-blue-400" />;
      case 'logistics': return <Truck className="h-4.5 w-4.5 text-orange-400" />;
      case 'espionage': return <Eye className="h-4.5 w-4.5 text-cyan-400" />;
      case 'wunderwaffe': return <Zap className="h-4.5 w-4.5 text-yellow-400" />;
      default: return <BookOpen className="h-4.5 w-4.5 text-amber-400" />;
    }
  };

  const getPillarColor = (pillar: PlaybookPillar) => {
    switch (pillar) {
      case 'rich': return 'from-amber-500/20 to-amber-950/40 border-amber-500/50 text-amber-300';
      case 'war': return 'from-red-500/20 to-red-950/40 border-red-500/50 text-red-300';
      case 'politics': return 'from-emerald-500/20 to-emerald-950/40 border-emerald-500/50 text-emerald-300';
      case 'world_domination': return 'from-purple-500/20 to-purple-950/40 border-purple-500/50 text-purple-300';
      case 'navy': return 'from-blue-500/20 to-blue-950/40 border-blue-500/50 text-blue-300';
      case 'logistics': return 'from-orange-500/20 to-orange-950/40 border-orange-500/50 text-orange-300';
      case 'espionage': return 'from-cyan-500/20 to-cyan-950/40 border-cyan-500/50 text-cyan-300';
      case 'wunderwaffe': return 'from-yellow-500/20 to-yellow-950/40 border-yellow-500/50 text-yellow-300';
      default: return 'from-amber-500/20 to-amber-950/40 border-amber-500/50 text-amber-300';
    }
  };

  // Extract core strengths specifically for the country
  const countryCoreStrengths = useMemo(() => {
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

    if (customStrengths[currentSummaryCountry.id]) {
      return customStrengths[currentSummaryCountry.id];
    }

    const strengths: string[] = [];
    if (currentSummaryCountry.startingDockyards > 3) {
      strengths.push(`Kapasitas Galangan Kapal (${currentSummaryCountry.startingDockyards} Docks)`);
    }
    if (currentSummaryCountry.startingCivilianFactories >= 10) {
      strengths.push(`Basis Ekonomi Awal Stabil (${currentSummaryCountry.startingCivilianFactories} Pabrik Sipil)`);
    }
    if (currentSummaryCountry.vitalResources?.surplus && currentSummaryCountry.vitalResources.surplus.length > 0) {
      strengths.push(`Surplus Sumber Daya: ${currentSummaryCountry.vitalResources.surplus.join(', ')}`);
    }
    if (currentSummaryCountry.doctrineRecommendation) {
      strengths.push(`Sinergi Doktrin: ${currentSummaryCountry.doctrineRecommendation.split('->')[0].trim()}`);
    }
    if (currentSummaryCountry.startingForces && currentSummaryCountry.startingForces.divisions >= 15) {
      strengths.push(`Armada Militer Awal (${currentSummaryCountry.startingForces.divisions} Divisi Aktif)`);
    }
    if (strengths.length < 3) {
      strengths.push('Posisi Geopolitik Strategis yang Fleksibel untuk Diplomasi & Ekspansi');
    }
    return strengths.slice(0, 4);
  }, [currentSummaryCountry]);

  // Extract geopolitical threats specifically for the country
  const countryGeopoliticalThreats = useMemo(() => {
    if (currentSummaryCountry.keyChallenges && currentSummaryCountry.keyChallenges.length > 0) {
      return currentSummaryCountry.keyChallenges;
    }
    return [
      'Ancaman ekspansi agresif dari faksi adidaya di perbatasan',
      'Keterbatasan kapasitas bahan bakar dan cadangan alutsista militer',
      'Kerentanan terhadap blokade perdagangan laut oleh armada musuh'
    ];
  }, [currentSummaryCountry]);

  const isMajor = ['ger', 'sov', 'usa', 'eng', 'jap', 'ita', 'fra'].includes(currentSummaryCountry.id);

  return (
    <div id="master-playbook-section" className="space-y-7">
      {/* Master Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-[#b8860b]/60 bg-gradient-to-r from-[#20180f] via-[#171b15] to-[#121c24] p-5 md:p-7 shadow-xl shadow-black/60">
        <div className="absolute -top-12 -right-12 h-56 w-56 rounded-full bg-gradient-to-br from-[#f59e0b]/15 to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f59e0b]/50 bg-[#78350f]/30 px-3 py-1 text-xs font-mono font-bold text-[#fde047]">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                DOKTRIN UTAMA KOMANDO TERTINGGI (HOI4 MASTER PLAYBOOK)
              </span>
              <span className="rounded bg-red-500/20 border border-red-500/40 px-2 py-0.5 text-[11px] font-mono text-red-300 font-bold">
                8 PILAR PENAKLUKAN GLOBAL
              </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-black font-serif text-[#fef3c7] uppercase tracking-tight">
              Panduan Utama: Menjadi Kaya, Memenangkan Perang, Menguasai Politik &amp; Dominasi Dunia
            </h2>
            
            <p className="text-sm md:text-base text-[#cbd5e1] leading-relaxed">
              Kompilasi panduan perang komprehensif 8 pilar: dari rumus penggandaan pabrik sipil, perancangan divisi pemusnah organisasi, dominasi armada kapal induk, logistik rel kereta api, operasi intelijen terselubung, hingga dominasi bumi dan senjata nuklir pamungkas.
            </p>
          </div>

          <div className="flex flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              id="open-historical-archive-btn"
              onClick={() => {
                setHistoricalModalInitialId(isMajor ? currentSummaryCountry.id : 'ger');
                setIsHistoricalModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/70 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 px-4 py-2.5 text-xs font-bold text-black transition-all shadow-lg shadow-amber-950/40"
            >
              <BookOpen className="h-4 w-4 text-black" />
              <span>Konteks Sejarah 7 Negara Utama</span>
            </button>

            <button
              id="copy-playbook-btn"
              onClick={() => handleCopy(currentSection)}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#b8860b]/60 bg-[#2d2212] px-4 py-2.5 text-xs font-bold text-[#fef08a] transition-all hover:bg-[#3d2e18] shadow-md"
            >
              {copiedId === currentSection.id ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Doktrin Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-amber-400" />
                  <span>Salin Doktrin Pilar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          DYNAMIC NATIONAL SUMMARY CARD SECTION
          Highlights Core Strengths, Starting Resources, and Geopolitical Threats
         ========================================================================= */}
      <div id="dynamic-national-summary-section" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#223140] pb-3">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4 text-amber-400" />
              <span>DYNAMIC NATIONAL SUMMARY DOSSIER</span>
            </span>
            <h3 className="text-lg font-bold text-[#f8fafc] font-serif">
              Ringkasan Strategis Negara: Keunggulan Inti, Sumber Daya &amp; Ancaman Geopolitik
            </h3>
          </div>

          {/* Quick Major Power Shortcut Button */}
          {isMajor && (
            <button
              id={`quick-history-btn-${currentSummaryCountry.id}`}
              onClick={() => {
                setHistoricalModalInitialId(currentSummaryCountry.id);
                setIsHistoricalModalOpen(true);
              }}
              className="flex items-center gap-1.5 rounded-lg border border-amber-500/50 bg-amber-950/50 px-3 py-1.5 text-xs font-mono font-bold text-amber-300 hover:bg-amber-900/60 transition-colors w-fit"
            >
              <BookOpen className="h-3.5 w-3.5 text-amber-400" />
              <span>Konteks Sejarah {currentSummaryCountry.tag}</span>
            </button>
          )}
        </div>

        {/* Country Selector Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#0d141b] p-3 rounded-xl border border-[#1e2a37]">
          {/* Region Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'Semua (30)' },
              { id: 'majors', label: '7 Majors' },
              { id: 'nordic', label: 'Nordik & Baltik' },
              { id: 'balkan', label: 'Balkan & Med' },
              { id: 'europe', label: 'Eropa Lain' },
              { id: 'asia', label: 'Asia & Sekutu' },
            ].map(tab => (
              <button
                key={tab.id}
                id={`filter-pill-${tab.id}`}
                onClick={() => setRegionFilter(tab.id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  regionFilter === tab.id
                    ? 'bg-amber-500 text-black font-bold shadow'
                    : 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#162330]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#64748b]" />
            <input
              type="text"
              placeholder="Cari negara (cth: GER, Soviet)..."
              value={countrySearchQuery}
              onChange={(e) => setCountrySearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#26374a] bg-[#121c27] pl-8 pr-3 py-1.5 text-xs text-[#f1f5f9] placeholder-[#64748b] focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Horizontal Quick Scroll Country Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {filteredCountries.map(country => {
            const isSelected = country.id === selectedSummaryCountryId;
            return (
              <button
                key={country.id}
                id={`summary-country-btn-${country.id}`}
                onClick={() => setSelectedSummaryCountryId(country.id)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-gradient-to-r from-amber-950/80 to-[#1e170d] text-amber-200 shadow-md ring-1 ring-amber-400/40'
                    : 'border-[#1e2a38] bg-[#101721] text-[#94a3b8] hover:border-[#33465b] hover:text-[#f1f5f9]'
                }`}
              >
                <div
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold text-white shadow"
                  style={{
                    background: `linear-gradient(135deg, ${country.flagColors[0]}, ${country.flagColors[1]})`
                  }}
                >
                  {country.flagSymbol}
                </div>
                <span>{country.name}</span>
                <span className="font-mono text-[10px] text-amber-400/70">
                  {country.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic National Summary Card Display */}
        <div
          id="national-summary-card"
          className="rounded-2xl border border-[#2b3a4a] bg-gradient-to-b from-[#111923] via-[#0d131a] to-[#0a0f15] p-5 md:p-6 shadow-xl space-y-5"
        >
          {/* Card Top: Country Identity & Quick Stats */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1b2633] pb-5">
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-serif text-3xl font-bold text-white shadow-xl border border-white/20"
                style={{
                  background: `linear-gradient(135deg, ${currentSummaryCountry.flagColors[0]}, ${currentSummaryCountry.flagColors[1]})`
                }}
              >
                {currentSummaryCountry.flagSymbol}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="rounded bg-[#0c2438] border border-[#38bdf8]/40 px-2 py-0.5 text-xs font-mono font-bold text-[#38bdf8]">
                    TAG: {currentSummaryCountry.tag}
                  </span>
                  <span className="rounded bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 text-xs font-mono text-amber-300">
                    {currentSummaryCountry.ideology}
                  </span>
                  <span className="text-xs text-[#94a3b8] font-mono">
                    Faksi: <strong className="text-sky-300">{currentSummaryCountry.faction}</strong>
                  </span>
                  <span className="text-xs text-[#94a3b8] font-mono">
                    Tingkat: <strong className="text-emerald-400">{currentSummaryCountry.difficulty}</strong>
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black font-serif text-[#f8fafc] tracking-tight">
                  {currentSummaryCountry.name}
                </h3>
                <p className="text-xs text-[#94a3b8] font-mono mt-0.5">
                  Pemimpin: <span className="text-[#fef08a] font-bold">{currentSummaryCountry.leader}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons: Jump to Full Dossier or Focus */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {onSelectCountry && (
                <button
                  id={`open-full-dossier-btn-${currentSummaryCountry.id}`}
                  onClick={() => onSelectCountry(currentSummaryCountry.id)}
                  className="flex items-center gap-2 rounded-xl border border-amber-500/60 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 px-4 py-2 text-xs font-bold text-black shadow-md transition-all"
                >
                  <Swords className="h-4 w-4 text-black" />
                  <span>Buka Dossier 6 Tab</span>
                  <ChevronRight className="h-4 w-4 text-black" />
                </button>
              )}

              {onNavigateToFocus && (
                <button
                  id={`open-focus-tree-btn-${currentSummaryCountry.id}`}
                  onClick={() => onNavigateToFocus(currentSummaryCountry.id)}
                  className="flex items-center gap-1.5 rounded-xl border border-[#2b3a4a] bg-[#141f2a] px-3.5 py-2 text-xs font-semibold text-[#cbd5e1] hover:text-[#f8fafc] hover:border-sky-500 transition-colors"
                >
                  <Layers className="h-4 w-4 text-sky-400" />
                  <span>Pohon Fokus ({currentSummaryCountry.tag})</span>
                </button>
              )}
            </div>
          </div>

          {/* 3 Pillars of the National Summary:
              1. Core Strengths (Keunggulan Inti)
              2. Starting Resources & Industrial Breakdown
              3. Strategic Geopolitical Threats
          */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Column 1: Core Strengths (Keunggulan Inti) */}
            <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-[#0e1e17] to-[#0a1510] p-4.5 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Keunggulan Inti Militer &amp; Industri</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-300/70 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                  Core Strengths
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-[#cbd5e1]">
                {countryCoreStrengths.map((str, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 bg-[#08120d] p-2.5 rounded-lg border border-emerald-500/20"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-950 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-300">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Starting Resources & Industrial Capacity */}
            <div className="rounded-xl border border-sky-500/30 bg-gradient-to-b from-[#0d1b26] to-[#09131b] p-4.5 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-500/20 pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <Factory className="h-4 w-4 text-sky-400" />
                  <span>Sumber Daya Awal &amp; Industri</span>
                </span>
                <span className="text-[10px] font-mono text-sky-300/70 bg-sky-950/60 px-1.5 py-0.5 rounded">
                  Starting Balance
                </span>
              </div>

              {/* Factories Tally */}
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="rounded-lg bg-[#071118] border border-amber-500/30 p-2">
                  <div className="text-[9px] uppercase font-bold text-amber-400">Pabrik Sipil</div>
                  <div className="text-base font-black text-amber-200">
                    {currentSummaryCountry.startingCivilianFactories}
                  </div>
                </div>
                <div className="rounded-lg bg-[#071118] border border-emerald-500/30 p-2">
                  <div className="text-[9px] uppercase font-bold text-emerald-400">Pabrik Militer</div>
                  <div className="text-base font-black text-emerald-200">
                    {currentSummaryCountry.startingMilitaryFactories}
                  </div>
                </div>
                <div className="rounded-lg bg-[#071118] border border-sky-500/30 p-2">
                  <div className="text-[9px] uppercase font-bold text-sky-400">Galangan Kapal</div>
                  <div className="text-base font-black text-sky-200">
                    {currentSummaryCountry.startingDockyards}
                  </div>
                </div>
              </div>

              {/* Starting Forces & Manpower */}
              {currentSummaryCountry.startingForces && (
                <div className="rounded-lg bg-[#071118] border border-[#1c2d3d] p-2.5 text-xs space-y-1">
                  <div className="text-[10px] uppercase font-mono font-bold text-[#94a3b8]">
                    Kekuatan Alutsista 1936:
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-[#cbd5e1] font-mono">
                    <div>Divisi Darat: <strong className="text-emerald-300">{currentSummaryCountry.startingForces.divisions}</strong></div>
                    <div>Skuadron Udara: <strong className="text-amber-300">{currentSummaryCountry.startingForces.airplanes}</strong></div>
                    <div>Armada Kapal: <strong className="text-sky-300">{currentSummaryCountry.startingForces.ships}</strong></div>
                    <div>Kolam Manpower: <strong className="text-[#f1f5f9]">{currentSummaryCountry.startingForces.manpowerPool}</strong></div>
                  </div>
                </div>
              )}

              {/* Vital Resources Overview */}
              {currentSummaryCountry.vitalResources && (
                <div className="rounded-lg bg-[#071118] border border-[#1c2d3d] p-2.5 text-xs space-y-1">
                  <div className="text-[10px] uppercase font-mono font-bold text-[#94a3b8]">
                    Status Sumber Daya Vital:
                  </div>
                  <div className="text-[11px] text-[#cbd5e1] space-y-0.5">
                    <div>
                      <strong className="text-emerald-400">Surplus: </strong>
                      <span>{currentSummaryCountry.vitalResources.surplus.join(', ') || 'Nol'}</span>
                    </div>
                    <div>
                      <strong className="text-red-400">Defisit: </strong>
                      <span>{currentSummaryCountry.vitalResources.deficits.join(', ') || 'Aman'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Link to Strategic Resource Heatmap */}
              {onNavigateTab && (
                <button
                  onClick={() => onNavigateTab('strategic_resources')}
                  className="w-full flex items-center justify-between gap-2 rounded-lg bg-gradient-to-r from-emerald-950/80 to-[#0c2418] hover:from-emerald-900/90 hover:to-[#123824] border border-emerald-500/40 px-3 py-2 text-xs font-mono font-bold text-emerald-200 transition-all shadow-sm group"
                >
                  <span className="flex items-center gap-1.5">
                    <Fuel className="h-3.5 w-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
                    <span>Peta Panas Sumber Daya (Heatmap)</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>

            {/* Column 3: Strategic Geopolitical Threats */}
            <div className="rounded-xl border border-red-500/30 bg-gradient-to-b from-[#221013] to-[#14080a] p-4.5 space-y-3">
              <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span>Ancaman Geopolitik Strategis</span>
                </span>
                <span className="text-[10px] font-mono text-red-300/70 bg-red-950/60 px-1.5 py-0.5 rounded">
                  Critical Threats
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-[#cbd5e1]">
                {countryGeopoliticalThreats.map((threat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 bg-[#120709] p-2.5 rounded-lg border border-red-500/20"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-950 border border-red-500/40 text-[10px] font-mono font-bold text-red-300">
                      !
                    </span>
                    <span className="leading-relaxed text-red-100/90">{threat}</span>
                  </li>
                ))}
              </ul>

              {/* Secret Pro-Tip Quote */}
              <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-2.5 text-xs text-amber-200 flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <strong className="text-amber-300 font-bold">Kiat Komando: </strong>
                  {currentSummaryCountry.proTips}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          8 PILLARS OF SUPREME COMMAND (MASTER PLAYBOOK)
         ========================================================================= */}
      <div id="playbook-pillars-section" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#223140] pb-3">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-amber-400" />
              <span>THE 8 PILLARS OF SUPREME COMMAND</span>
            </span>
            <h3 className="text-lg font-bold text-[#f8fafc] font-serif">
              Pilih Pilar Doktrin Komando Tertinggi:
            </h3>
          </div>
          <div className="text-xs font-mono text-[#94a3b8]">
            Aktif: <strong className="text-amber-300">{currentSection.badge}</strong>
          </div>
        </div>

        {/* 8 Pillars Tabs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {MASTER_PLAYBOOK_DATA.map((section) => {
            const isSelected = activePillar === section.pillar;
            return (
              <button
                key={section.id}
                id={`pillar-tab-${section.pillar}`}
                onClick={() => setActivePillar(section.pillar)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? `border-amber-400 bg-gradient-to-b from-[#2b2112] to-[#1a140b] shadow-lg ring-1 ring-amber-400/50 text-[#fef08a]`
                    : 'border-[#1e2938] bg-[#111923] text-[#94a3b8] hover:border-[#33465b] hover:text-[#f1f5f9]'
                }`}
              >
                <div className="mb-1.5 p-2 rounded-lg bg-[#1a2533] border border-white/5">
                  {getPillarIcon(section.pillar)}
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-1">
                  {section.pillar === 'rich' && '1. Menjadi Kaya'}
                  {section.pillar === 'war' && '2. Menang Perang'}
                  {section.pillar === 'politics' && '3. Kuasai Politik'}
                  {section.pillar === 'world_domination' && '4. Dominasi Dunia'}
                  {section.pillar === 'navy' && '5. Dominasi Laut'}
                  {section.pillar === 'logistics' && '6. Rel & Suplai'}
                  {section.pillar === 'espionage' && '7. Spionase'}
                  {section.pillar === 'wunderwaffe' && '8. Senjata Nuklir'}
                </span>
                <span className="text-[10px] font-mono text-[#64748b] mt-0.5">
                  {section.readingTime}
                </span>
              </button>
            );
          })}
        </div>

        {/* Pillar Header Card */}
        <div
          id="active-pillar-detail-card"
          className={`rounded-2xl border p-6 bg-gradient-to-r ${getPillarColor(activePillar)} shadow-xl space-y-3`}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded bg-black/50 border border-white/10 px-2.5 py-0.5 text-xs font-mono font-bold text-amber-300">
              {currentSection.badge}
            </span>
            <span className="text-xs font-mono text-white/70">
              ⏱ {currentSection.readingTime}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            {currentSection.title}
          </h3>

          <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
            {currentSection.subtitle}
          </p>

          <div className="mt-3 rounded-xl border border-white/10 bg-black/40 p-4 text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
            <strong className="text-white font-bold block mb-1">INTISARI STRATEGIS:</strong>
            {currentSection.summary}
          </div>
        </div>

        {/* Core Mathematical / Tactical Formulas */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#94a3b8] flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-[#f59e0b]" />
              <span>Formula Matematis &amp; Nilai Ambang (Thresholds):</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentSection.coreFormulas.map((formula, fIdx) => (
              <div
                key={fIdx}
                className="rounded-xl border border-[#223140] bg-[#111923] p-4 space-y-1.5 shadow-md hover:border-amber-500/50 transition-colors"
              >
                <span className="text-[11px] font-mono text-[#94a3b8] uppercase font-semibold block">
                  {formula.label}
                </span>
                <div className="text-lg font-black font-mono text-amber-400">
                  {formula.value}
                </div>
                <p className="text-xs text-[#cbd5e1] leading-relaxed">
                  {formula.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Step by Step Execution Plan */}
        <div className="rounded-2xl border border-[#223140] bg-[#111923] p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1b2633] pb-3">
            <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-[#f8fafc] flex items-center gap-2">
              <Target className="h-4 w-4 text-[#38bdf8]" />
              <span>Panduan Eksekusi Tahap Demi Tahap (Kronologis)</span>
            </h4>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              {currentSection.stepByStepGuide.length} Langkah Mutlak
            </span>
          </div>

          <div className="space-y-4">
            {currentSection.stepByStepGuide.map((step) => (
              <div
                key={step.step}
                className="rounded-xl border border-[#1e2a38] bg-[#0c131a] p-4 space-y-2.5 hover:border-[#38bdf8]/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f59e0b] font-mono text-xs font-black text-black">
                      {step.step}
                    </span>
                    <span className="font-bold text-sm text-[#f8fafc]">{step.title}</span>
                  </div>
                  <span className="font-mono text-xs text-[#38bdf8] bg-[#0c2438] px-2 py-0.5 rounded border border-[#0284c7]/40 w-fit">
                    {step.timing}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                  {step.details}
                </p>

                {step.proTip && (
                  <div className="rounded-md border border-amber-500/30 bg-amber-950/20 px-3 py-2 text-xs text-amber-200 flex items-start gap-2">
                    <Lightbulb className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong className="text-amber-300">Trik Pro:</strong> {step.proTip}</span>
                  </div>
                )}

                {step.warning && (
                  <div className="rounded-md border border-red-500/30 bg-red-950/20 px-3 py-2 text-xs text-red-200 flex items-start gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                    <span><strong className="text-red-300">Peringatan Kritis:</strong> {step.warning}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Absolute Rules (Do's and Don'ts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* DO's */}
          <div className="rounded-xl border border-emerald-500/40 bg-gradient-to-b from-[#10241b] to-[#0c1813] p-5 space-y-3">
            <h5 className="font-bold text-sm text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>MUTLAK HARUS DILAKUKAN (DO'S):</span>
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-[#cbd5e1]">
              {currentSection.dosAndDonts.dos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DONT's */}
          <div className="rounded-xl border border-red-500/40 bg-gradient-to-b from-[#261013] to-[#170a0c] p-5 space-y-3">
            <h5 className="font-bold text-sm text-red-300 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span>HARAM DILAKUKAN (DON'TS):</span>
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-[#cbd5e1]">
              {currentSection.dosAndDonts.donts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Master Checklist */}
        <div className="rounded-xl border border-[#2b3a32] bg-[#0e1612] p-4.5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#94a3b8] flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-[#10b981]" />
              <span>Checklist Kesiapan Sebelum Menekan Tombol Operasi:</span>
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#cbd5e1]">
            {currentSection.metaChecklist.map((chk, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg bg-[#141f19] px-3 py-2 border border-[#1e2d24]">
                <div className="h-2 w-2 rounded-full bg-[#10b981]" />
                <span>{chk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Context Modal */}
      <HistoricalContextModal
        isOpen={isHistoricalModalOpen}
        onClose={() => setIsHistoricalModalOpen(false)}
        initialCountryId={historicalModalInitialId}
        onSelectCountry={(cId) => {
          setSelectedSummaryCountryId(cId);
          if (onSelectCountry) onSelectCountry(cId);
        }}
      />
    </div>
  );
};
