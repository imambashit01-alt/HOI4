import React, { useState } from 'react';
import {
  Globe, Flag, Factory, Award, CheckCircle2, AlertTriangle,
  Lightbulb, Star, Copy, Check, Shield, Flame, BookOpen, Layers, GitBranch, Swords, Truck, TrendingUp, Map, Fuel, Sparkles, Radio
} from 'lucide-react';
import { CountryStrategy } from '../types';
import { COUNTRIES_STRATEGY_DATA } from '../data/countryData';
import { BattlePlannerSimulator } from './BattlePlannerSimulator';
import { DoctrineGraphicsViewer } from './DoctrineGraphicsViewer';
import { ManpowerLogisticsCalculator } from './ManpowerLogisticsCalculator';
import { BattleResultEstimator } from './BattleResultEstimator';
import { EuropeInteractiveMap } from './EuropeInteractiveMap';
import { LogisticsCalculator } from './LogisticsCalculator';
import { GlobalWarTracker } from './GlobalWarTracker';
import { AmbientSoundToggle } from './AmbientSoundToggle';
import { CountryDossierModal } from './CountryDossierModal';
import { MasterPlaybookGuide } from './MasterPlaybookGuide';
import { HistoricalContextModal } from './HistoricalContextModal';
import { StrategicResourceHeatmap } from './StrategicResourceHeatmap';
import { WarRoomSoundConsole } from './WarRoomSoundConsole';

interface WarRoomViewerProps {
  searchQuery: string;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: { id: string; type: 'country'; title: string; subtitle: string; tag: string }) => void;
  onNavigateToFocus?: (countryId: string) => void;
}

export const WarRoomViewer: React.FC<WarRoomViewerProps> = ({
  searchQuery,
  isFavorite,
  toggleFavorite,
  onNavigateToFocus
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('ger');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [countryCategoryFilter, setCountryCategoryFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'master_playbook' | 'countries' | 'europe_map' | 'resource_heatmap' | 'sound_console' | 'war_tracker' | 'doctrines' | 'battle_planner' | 'battle_estimator' | 'logistics_calculator' | 'manpower_logistics'>('countries');
  const [isHistoricalModalOpen, setIsHistoricalModalOpen] = useState<boolean>(false);
  const [historicalInitialId, setHistoricalInitialId] = useState<string>('ger');

  const selectedCountry = COUNTRIES_STRATEGY_DATA.find(c => c.id === selectedCountryId) || COUNTRIES_STRATEGY_DATA[0];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const MAJORS_TAGS = ['GER', 'SOV', 'USA', 'ENG', 'JAP', 'ITA', 'FRA', 'POL'];
  const NORDIC_TAGS = ['FIN', 'SWE', 'NOR', 'DEN', 'EST', 'LAT', 'LIT'];
  const BALKAN_TAGS = ['YUG', 'GRE', 'BUL', 'HUN', 'ROM', 'TUR'];
  const EUROPE_TAGS = ['SPA', 'POR', 'HOL', 'BEL', 'SWI', 'CZE', 'AUS'];
  const ASIA_TAGS = ['CHI', 'PRC', 'RAJ', 'AST', 'CAN'];

  const filteredCountries = COUNTRIES_STRATEGY_DATA.filter(c => {
    // Category filter
    if (countryCategoryFilter === 'majors' && !MAJORS_TAGS.includes(c.tag)) return false;
    if (countryCategoryFilter === 'nordic' && !NORDIC_TAGS.includes(c.tag)) return false;
    if (countryCategoryFilter === 'balkan' && !BALKAN_TAGS.includes(c.tag)) return false;
    if (countryCategoryFilter === 'europe' && !EUROPE_TAGS.includes(c.tag)) return false;
    if (countryCategoryFilter === 'asia' && !ASIA_TAGS.includes(c.tag)) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.tag.toLowerCase().includes(q) ||
      c.faction.toLowerCase().includes(q) ||
      c.leader.toLowerCase().includes(q) ||
      c.doctrineRecommendation.toLowerCase().includes(q) ||
      c.militaryStrategy.toLowerCase().includes(q) ||
      (c.geopoliticalContext && c.geopoliticalContext.toLowerCase().includes(q))
    );
  });

  const generateCountryCopyText = (c: CountryStrategy) => {
    return `[HOI4 STRATEGI PERANG: ${c.name} (${c.tag})]
Pemimpin: ${c.leader} | Ideologi: ${c.ideology} | Faksi: ${c.faction}
Industri Awal: ${c.startingCivilianFactories} Civs, ${c.startingMilitaryFactories} Mils, ${c.startingDockyards} Dockyards
Doktrin Rekomendasi: ${c.doctrineRecommendation}
Fokus 1936: ${c.focusPath1936.join(' -> ')}
Strategi Industri: ${c.industryStrategy}
Strategi Militer: ${c.militaryStrategy}
Tips Komandan: ${c.proTips}`;
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between gap-3 border-b border-[#22303c] pb-3.5 overflow-x-auto">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="tab-master-playbook"
            onClick={() => setActiveTab('master_playbook')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'master_playbook'
                ? 'border-2 border-[#f59e0b] bg-gradient-to-r from-[#3b240e] to-[#201509] text-[#fef08a] shadow-lg shadow-amber-950/60 font-black'
                : 'border border-[#b8860b]/60 bg-[#1c140a] text-[#fde047] hover:border-amber-400 font-bold'
            }`}
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>Doktrin Utama: Kaya, War &amp; Politik</span>
            <span className="rounded bg-amber-500/20 border border-amber-400/40 px-1.5 py-0.5 text-[10px] font-mono text-amber-300 font-bold">
              4 PILAR
            </span>
          </button>

          <button
            onClick={() => setActiveTab('countries')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'countries'
                ? 'border border-[#10b981]/60 bg-[#122820] text-[#a7f3d0] shadow-md shadow-black/40 font-bold'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Globe className="h-4 w-4 text-[#10b981]" />
            <span>Konteks Lengkap Semua Negara (30)</span>
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-mono text-emerald-300 font-bold">
              DOSSIER LENGKAP
            </span>
          </button>

          <button
            id="tab-europe-map"
            onClick={() => setActiveTab('europe_map')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'europe_map'
                ? 'border border-[#f59e0b]/60 bg-[#261f14] text-[#fef3c7] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Map className="h-4 w-4 text-[#f59e0b]" />
            <span>Peta Interaktif Eropa</span>
            <span className="rounded bg-[#f59e0b]/20 px-1.5 py-0.5 text-[10px] font-mono text-[#fde047]">
              SVG &amp; Sumber Daya
            </span>
          </button>

          <button
            id="tab-resource-heatmap"
            onClick={() => setActiveTab('resource_heatmap')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'resource_heatmap'
                ? 'border border-amber-400 bg-amber-950/80 text-amber-200 shadow-md shadow-black/40 font-bold'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Fuel className="h-4 w-4 text-amber-400" />
            <span>Peta Panas Sumber Daya (Heatmap)</span>
            <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-mono text-amber-300 font-bold">
              HEATMAP
            </span>
          </button>

          <button
            id="tab-global-war-tracker"
            onClick={() => setActiveTab('war_tracker')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'war_tracker'
                ? 'border border-[#ef4444]/60 bg-[#321215] text-[#fca5a5] shadow-md shadow-black/40 font-bold'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Globe className="h-4 w-4 text-[#ef4444]" />
            <span>Global War Tracker</span>
            <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] font-mono text-red-300 font-bold">
              7 Majors
            </span>
          </button>

          <button
            id="tab-doctrine-graphics"
            onClick={() => setActiveTab('doctrines')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'doctrines'
                ? 'border border-[#d97706]/60 bg-[#261f14] text-[#fde047] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Layers className="h-4 w-4 text-[#eab308]" />
            <span>Grafis &amp; Pohon Riset Doktrin</span>
            <span className="rounded bg-[#d97706]/30 px-1.5 py-0.2 text-[10px] font-mono text-[#fde047]">
              10 Doktrin
            </span>
          </button>

          <button
            id="tab-battle-planner"
            onClick={() => setActiveTab('battle_planner')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'battle_planner'
                ? 'border border-[#ef4444]/60 bg-[#2b1216] text-[#fca5a5] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Swords className="h-4 w-4 text-[#ef4444]" />
            <span>Simulasi Tempur (Battle Planner)</span>
          </button>

          <button
            id="tab-battle-estimator"
            onClick={() => setActiveTab('battle_estimator')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'battle_estimator'
                ? 'border border-[#f59e0b]/60 bg-[#2b2011] text-[#fde047] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <TrendingUp className="h-4 w-4 text-[#f59e0b]" />
            <span>Battle Result Estimator</span>
            <span className="rounded bg-[#f59e0b]/20 px-1.5 py-0.2 text-[10px] font-mono text-[#fde047]">
              D3 Chart
            </span>
          </button>

          <button
            id="tab-logistics-calculator"
            onClick={() => setActiveTab('logistics_calculator')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'logistics_calculator'
                ? 'border border-[#38bdf8]/60 bg-[#0c2438] text-[#7dd3fc] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Fuel className="h-4 w-4 text-[#38bdf8]" />
            <span>Kalkulator Logistik &amp; BBM</span>
            <span className="rounded bg-[#38bdf8]/20 px-1.5 py-0.2 text-[10px] font-mono text-[#38bdf8]">
              NSB &amp; Guidelines
            </span>
          </button>

          <button
            id="tab-manpower-logistics"
            onClick={() => setActiveTab('manpower_logistics')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'manpower_logistics'
                ? 'border border-[#10b981]/60 bg-[#122820] text-[#a7f3d0] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Truck className="h-4 w-4 text-[#10b981]" />
            <span>Konsumsi Manpower &amp; Mils</span>
          </button>

          <button
            id="tab-sound-console"
            onClick={() => setActiveTab('sound_console')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'sound_console'
                ? 'border border-amber-400 bg-amber-950/80 text-amber-200 shadow-md shadow-black/40 font-bold'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Radio className="h-4 w-4 text-amber-400" />
            <span>Konsol Audio PD2 (Ambient Sound)</span>
            <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-mono text-amber-300 font-bold">
              AUDIO API
            </span>
          </button>
        </div>

        {/* WW2 Radio Ambient Toggle */}
        <div className="shrink-0 flex items-center">
          <AmbientSoundToggle compact={true} />
        </div>
      </div>

      {/* VIEW 0: EUROPE INTERACTIVE MAP */}
      {activeTab === 'europe_map' && (
        <div className="space-y-4">
          <EuropeInteractiveMap
            selectedCountryId={selectedCountryId}
            onSelectCountry={(cId) => setSelectedCountryId(cId)}
            onScrollToTree={() => {
              if (onNavigateToFocus) {
                onNavigateToFocus(selectedCountryId);
              }
            }}
          />
        </div>
      )}

      {/* VIEW: STRATEGIC RESOURCE HEATMAP */}
      {activeTab === 'resource_heatmap' && (
        <div className="space-y-4">
          <StrategicResourceHeatmap
            onNavigateToCountry={(cId) => {
              setSelectedCountryId(cId);
              setActiveTab('countries');
            }}
            onNavigateToTab={(tab) => {
              if (tab === 'war_room') setActiveTab('countries');
            }}
          />
        </div>
      )}

      {/* VIEW: WAR ROOM SOUND CONSOLE */}
      {activeTab === 'sound_console' && (
        <div className="space-y-4">
          <WarRoomSoundConsole />
        </div>
      )}

      {/* VIEW: GLOBAL WAR TRACKER (7 MAJORS) */}
      {activeTab === 'war_tracker' && (
        <GlobalWarTracker />
      )}

      {/* VIEW: MASTER PLAYBOOK (KAYA, WAR & POLITIK) */}
      {activeTab === 'master_playbook' && (
        <MasterPlaybookGuide
          onSelectCountry={(cId) => {
            setSelectedCountryId(cId);
            setActiveTab('countries');
          }}
          onNavigateToFocus={onNavigateToFocus}
        />
      )}

      {/* VIEW 1: COUNTRY STRATEGIES */}
      {activeTab === 'countries' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Country Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748b]">
                Pilih Markas Komando:
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                {filteredCountries.length} / {COUNTRIES_STRATEGY_DATA.length} Negara
              </span>
            </div>

            {/* Historical Context Modal Quick Trigger */}
            <button
              id="open-7majors-historical-modal-btn"
              onClick={() => {
                const initial = ['ger', 'sov', 'usa', 'eng', 'jap', 'ita', 'fra'].includes(selectedCountryId)
                  ? selectedCountryId
                  : 'ger';
                setHistoricalInitialId(initial);
                setIsHistoricalModalOpen(true);
              }}
              className="w-full flex items-center justify-between gap-2 rounded-xl border border-amber-500/60 bg-gradient-to-r from-amber-950/70 via-[#1e170d] to-[#141b18] px-3.5 py-2 text-xs font-bold text-amber-200 hover:border-amber-400 hover:text-amber-100 transition-all shadow-md"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span>Arsip Sejarah &amp; Misi Utama (7 Majors)</span>
              </div>
              <span className="rounded bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-mono text-amber-300">
                Overlay
              </span>
            </button>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1 bg-[#0b1410] p-1.5 rounded-xl border border-[#1e2a22]">
              {[
                { id: 'all', label: 'Semua (30)' },
                { id: 'majors', label: 'Majors (8)' },
                { id: 'nordic', label: 'Nordik & Baltik' },
                { id: 'balkan', label: 'Balkan & Med' },
                { id: 'europe', label: 'Eropa Lain' },
                { id: 'asia', label: 'Asia & Sekutu' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCountryCategoryFilter(cat.id)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                    countryCategoryFilter === cat.id
                      ? 'bg-amber-500 text-black font-bold shadow'
                      : 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#15231c]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Scrollable Country Selector List */}
            <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredCountries.map(country => {
                const isSelected = country.id === selectedCountryId;
                const isFav = isFavorite(country.id);

                return (
                  <button
                    key={country.id}
                    onClick={() => setSelectedCountryId(country.id)}
                    className={`w-full flex items-center justify-between rounded-xl border p-3 text-left transition-all ${
                      isSelected
                        ? 'border-amber-500/80 bg-gradient-to-r from-[#2a1e0f] via-[#1f170c] to-[#121915] shadow-lg shadow-black/50 text-[#f8fafc] ring-1 ring-amber-400/30'
                        : 'border-[#1e2938] bg-[#111923] text-[#94a3b8] hover:border-[#2f4356] hover:text-[#f1f5f9]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-serif text-base font-bold text-white shadow-inner"
                        style={{
                          background: `linear-gradient(135deg, ${country.flagColors[0]}, ${country.flagColors[1]})`
                        }}
                      >
                        {country.flagSymbol}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs sm:text-sm tracking-tight text-[#f8fafc] flex items-center gap-1.5 truncate">
                          <span className="truncate">{country.name}</span>
                          <span className="font-mono text-[10px] text-amber-300 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-500/30 shrink-0">
                            {country.tag}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#94a3b8] truncate">{country.faction}</div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-2">
                      <span className="rounded bg-[#1e293b] px-1.5 py-0.5 text-[9px] font-mono text-[#cbd5e1] block">
                        {country.difficulty}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Complete Strategic Dossier (8 cols) */}
          <div className="lg:col-span-8">
            <CountryDossierModal
              country={selectedCountry}
              isEmbedded={true}
              onNavigateToFocus={onNavigateToFocus}
            />
          </div>
        </div>
      )}

      {/* VIEW 2: DOCTRINES GRAPHICS & TECH TREE */}
      {activeTab === 'doctrines' && (
        <DoctrineGraphicsViewer />
      )}

      {/* VIEW 3: BATTLE PLANNER & COMBAT SIMULATOR */}
      {activeTab === 'battle_planner' && (
        <BattlePlannerSimulator />
      )}

      {/* VIEW 4: BATTLE RESULT ESTIMATOR (D3 CHART) */}
      {activeTab === 'battle_estimator' && (
        <BattleResultEstimator />
      )}

      {/* VIEW 5: LOGISTICS, SPEED & FUEL THROUGHPUT CALCULATOR */}
      {activeTab === 'logistics_calculator' && (
        <LogisticsCalculator />
      )}

      {/* VIEW 6: MANPOWER & LOGISTICS CONSUMPTION ENGINE */}
      {activeTab === 'manpower_logistics' && (
        <ManpowerLogisticsCalculator />
      )}

      {/* HISTORICAL CONTEXT MODAL OVERLAY (7 MAJORS) */}
      <HistoricalContextModal
        isOpen={isHistoricalModalOpen}
        onClose={() => setIsHistoricalModalOpen(false)}
        initialCountryId={historicalInitialId}
        onSelectCountry={(cId) => {
          setSelectedCountryId(cId);
          setActiveTab('countries');
        }}
      />
    </div>
  );
};
