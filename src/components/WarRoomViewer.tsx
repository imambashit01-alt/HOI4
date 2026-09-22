import React, { useState } from 'react';
import {
  Globe, Flag, Factory, Award, CheckCircle2, AlertTriangle,
  Lightbulb, Star, Copy, Check, Shield, Flame, BookOpen, Layers, GitBranch, Swords, Truck, TrendingUp, Map, Fuel
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
  const [activeTab, setActiveTab] = useState<'europe_map' | 'war_tracker' | 'countries' | 'doctrines' | 'battle_planner' | 'battle_estimator' | 'logistics_calculator' | 'manpower_logistics'>('europe_map');

  const selectedCountry = COUNTRIES_STRATEGY_DATA.find(c => c.id === selectedCountryId) || COUNTRIES_STRATEGY_DATA[0];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredCountries = COUNTRIES_STRATEGY_DATA.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.tag.toLowerCase().includes(q) ||
      c.faction.toLowerCase().includes(q) ||
      c.leader.toLowerCase().includes(q) ||
      c.doctrineRecommendation.toLowerCase().includes(q) ||
      c.militaryStrategy.toLowerCase().includes(q)
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
            onClick={() => setActiveTab('countries')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'countries'
                ? 'border border-[#10b981]/60 bg-[#122820] text-[#a7f3d0] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Globe className="h-4 w-4 text-[#10b981]" />
            <span>Peta Kekuatan Negara PD II</span>
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

      {/* VIEW: GLOBAL WAR TRACKER (7 MAJORS) */}
      {activeTab === 'war_tracker' && (
        <GlobalWarTracker />
      )}

      {/* VIEW 1: COUNTRY STRATEGIES */}
      {activeTab === 'countries' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Country Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748b] block mb-2">
              Pilih Markas Komando Negara:
            </span>
            <div className="space-y-2">
              {filteredCountries.map(country => {
                const isSelected = country.id === selectedCountryId;
                const isFav = isFavorite(country.id);

                return (
                  <button
                    key={country.id}
                    onClick={() => setSelectedCountryId(country.id)}
                    className={`w-full flex items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border-[#10b981]/60 bg-gradient-to-r from-[#132c23] to-[#0f1a18] shadow-md shadow-black/40 text-[#f8fafc]'
                        : 'border-[#1e2938] bg-[#111923] text-[#94a3b8] hover:border-[#2f4356] hover:text-[#f1f5f9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-serif text-lg font-bold text-white shadow-inner"
                        style={{
                          background: `linear-gradient(135deg, ${country.flagColors[0]}, ${country.flagColors[1]})`
                        }}
                      >
                        {country.flagSymbol}
                      </div>
                      <div>
                        <div className="font-bold text-sm tracking-tight text-[#f8fafc] flex items-center gap-2">
                          {country.name}
                          <span className="font-mono text-[11px] text-[#38bdf8] bg-[#0c2438] px-1.5 py-0.2 rounded">
                            {country.tag}
                          </span>
                        </div>
                        <div className="text-xs text-[#94a3b8]">{country.faction}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="rounded bg-[#1e293b] px-2 py-0.5 text-[10px] font-mono text-[#cbd5e1] block">
                        {country.difficulty}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Strategic Dossier (8 cols) */}
          <div className="lg:col-span-8">
            <div className="rounded-xl border border-[#223344] bg-[#111923] shadow-xl shadow-black/50 overflow-hidden">
              {/* Dossier Header */}
              <div
                className="p-6 border-b border-[#1b2a38] relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(17,25,35,0.95), rgba(15,23,32,0.98))`
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-serif text-2xl font-bold text-white shadow-lg shadow-black/60 border border-white/10"
                      style={{
                        background: `linear-gradient(135deg, ${selectedCountry.flagColors[0]}, ${selectedCountry.flagColors[1]})`
                      }}
                    >
                      {selectedCountry.flagSymbol}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono text-xs font-bold text-[#38bdf8] bg-[#0c2438] px-2 py-0.5 rounded border border-[#38bdf8]/30">
                          TAG: {selectedCountry.tag}
                        </span>
                        <span className="text-xs font-mono text-[#fbbf24] bg-[#3b2b13] px-2 py-0.5 rounded border border-[#b45309]/30">
                          {selectedCountry.ideology}
                        </span>
                        <span className="text-xs font-mono text-[#94a3b8]">
                          Tingkat Kesulitan: <strong className="text-[#f1f5f9]">{selectedCountry.difficulty}</strong>
                        </span>
                      </div>
                      <h2 className="text-2xl font-black text-[#f8fafc] tracking-tight">
                        {selectedCountry.name}
                      </h2>
                      <p className="text-xs text-[#94a3b8] font-mono mt-0.5">
                        Pemimpin: <span className="text-[#f1f5f9] font-bold">{selectedCountry.leader}</span> • Faksi: <span className="text-[#38bdf8]">{selectedCountry.faction}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite({
                        id: selectedCountry.id,
                        type: 'country',
                        title: selectedCountry.name,
                        subtitle: `${selectedCountry.tag} • ${selectedCountry.faction}`,
                        tag: 'Negara'
                      })}
                      className={`rounded-lg border p-2.5 text-xs transition-colors ${
                        isFavorite(selectedCountry.id)
                          ? 'border-[#eab308]/60 bg-[#2b2512] text-[#facc15]'
                          : 'border-[#22303c] bg-[#131b24] text-[#64748b] hover:text-[#f8fafc]'
                      }`}
                      title={isFavorite(selectedCountry.id) ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
                    >
                      <Star className={`h-4 w-4 ${isFavorite(selectedCountry.id) ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => handleCopy(selectedCountry.id, generateCountryCopyText(selectedCountry))}
                      className="flex items-center gap-1.5 rounded-lg border border-[#22303c] bg-[#131b24] px-3 py-2 text-xs font-semibold text-[#cbd5e1] hover:border-[#10b981] hover:text-[#f8fafc] transition-colors"
                    >
                      {copiedId === selectedCountry.id ? <Check className="h-4 w-4 text-[#22c55e]" /> : <Copy className="h-4 w-4" />}
                      <span>{copiedId === selectedCountry.id ? 'Tersalin!' : 'Salin Doktrin'}</span>
                    </button>
                  </div>
                </div>

                {/* Industrial Base Bar */}
                <div className="mt-5 grid grid-cols-3 gap-2.5 font-mono text-center">
                  <div className="rounded-lg border border-[#d97706]/40 bg-[#261f14] p-2.5">
                    <div className="text-[10px] uppercase font-bold text-[#fbbf24]">Pabrik Sipil (Civs)</div>
                    <div className="text-lg font-black text-[#fde047]">{selectedCountry.startingCivilianFactories}</div>
                  </div>
                  <div className="rounded-lg border border-[#16a34a]/40 bg-[#122b1c] p-2.5">
                    <div className="text-[10px] uppercase font-bold text-[#4ade80]">Pabrik Militer (Mils)</div>
                    <div className="text-lg font-black text-[#86efac]">{selectedCountry.startingMilitaryFactories}</div>
                  </div>
                  <div className="rounded-lg border border-[#2563eb]/40 bg-[#14233c] p-2.5">
                    <div className="text-[10px] uppercase font-bold text-[#60a5fa]">Galangan Kapal (Docks)</div>
                    <div className="text-lg font-black text-[#93c5fd]">{selectedCountry.startingDockyards}</div>
                  </div>
                </div>
              </div>

              {/* Dossier Body */}
              <div className="p-6 space-y-6 text-xs md:text-sm">
                {/* Recommended Doctrine */}
                <div className="rounded-lg border border-[#1e2e3e] bg-[#0d1620] p-4 space-y-1">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#38bdf8] flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-[#38bdf8]" />
                    Rekomendasi Doktrin Utama:
                  </span>
                  <div className="text-sm font-semibold text-[#f8fafc]">
                    {selectedCountry.doctrineRecommendation}
                  </div>
                </div>

                {/* Priority Focus Path 1936-1937 */}
                <div className="space-y-2.5">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#94a3b8] flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                    Urutan Fokus Nasional 1936-1937 (Prioritas Utama)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedCountry.focusPath1936.map((focus, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2.5 rounded-lg border border-[#1e2a38] bg-[#141e2a] p-2.5 text-xs text-[#cbd5e1]"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e2e40] font-mono text-[11px] text-[#38bdf8] font-bold">
                          {fIdx + 1}
                        </span>
                        <span className="font-medium text-[#f1f5f9]">{focus}</span>
                      </div>
                    ))}
                  </div>

                  {onNavigateToFocus && (
                    <button
                      onClick={() => onNavigateToFocus(selectedCountry.id)}
                      className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg border border-[#f59e0b]/50 bg-gradient-to-r from-[#261e12] to-[#1c1811] py-2.5 px-4 text-xs font-bold text-[#fef3c7] hover:border-[#f59e0b] hover:from-[#352918] hover:to-[#282117] transition-all shadow-md shadow-black/40"
                    >
                      <GitBranch className="h-4 w-4 text-[#f59e0b]" />
                      <span>Buka Kalkulator Neraca &amp; Pohon Fokus ({selectedCountry.tag})</span>
                      <span className="rounded bg-[#f59e0b]/20 px-1.5 py-0.2 text-[10px] font-mono text-[#fbbf24]">
                        Live Trade-off &amp; Mutually Exclusive
                      </span>
                    </button>
                  )}
                </div>

                {/* Industrial Strategy & Military Strategy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-[#1e2b38] bg-[#131d27] p-4 space-y-2">
                    <h5 className="font-mono text-xs font-bold uppercase text-[#fbbf24] flex items-center gap-1.5">
                      <Factory className="h-4 w-4 text-[#d97706]" />
                      Masterplan Ekonomi &amp; Pabrik
                    </h5>
                    <p className="text-xs leading-relaxed text-[#94a3b8]">
                      {selectedCountry.industryStrategy}
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#1e2b38] bg-[#131d27] p-4 space-y-2">
                    <h5 className="font-mono text-xs font-bold uppercase text-[#38bdf8] flex items-center gap-1.5">
                      <Shield className="h-4 w-4 text-[#2563eb]" />
                      Doktrin &amp; Rencana Operasi Militer
                    </h5>
                    <p className="text-xs leading-relaxed text-[#94a3b8]">
                      {selectedCountry.militaryStrategy}
                    </p>
                  </div>
                </div>

                {/* Challenges & Pro Tips */}
                <div className="space-y-3">
                  <div className="rounded-lg border border-[#dc2626]/40 bg-[#2b1416]/70 p-4 space-y-2">
                    <h5 className="font-mono text-xs font-bold uppercase text-[#f87171] flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-[#ef4444]" />
                      Tantangan Kritis &amp; Kerentanan
                    </h5>
                    <ul className="space-y-1.5 text-xs text-[#fca5a5]">
                      {selectedCountry.keyChallenges.map((ch, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2">
                          <span className="font-bold">•</span>
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-[#d97706]/40 bg-[#261f14]/80 p-4 text-xs text-[#fef3c7] flex items-start gap-2.5">
                    <Lightbulb className="h-5 w-5 shrink-0 text-[#f59e0b] mt-0.5" />
                    <div>
                      <strong className="font-bold text-[#fbbf24]">Kiat Rahasia Panglima Perang: </strong>
                      {selectedCountry.proTips}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    </div>
  );
};
