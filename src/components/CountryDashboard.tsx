import React, { useState, useMemo } from 'react';
import {
  Users, Factory, Microscope, Shield, Globe, Award,
  ArrowRight, Flame, Fuel, Anchor, Plane, CheckCircle2,
  ChevronDown, Search, ArrowUpDown, Sparkles, AlertTriangle,
  Info, BarChart3, Layers
} from 'lucide-react';
import {
  MAJOR_NATIONS_STARTING_STATS,
  CountryStartingStats
} from '../data/countryStartingStats';

interface CountryDashboardProps {
  selectedCountryId: string;
  onSelectCountry: (countryId: string) => void;
  onViewFocusTree?: () => void;
}

type SortMetric = 'default' | 'factories' | 'military_factories' | 'manpower' | 'research_slots';
type FilterTab = 'all' | 'manpower' | 'factories' | 'research' | 'military';

export const CountryDashboard: React.FC<CountryDashboardProps> = ({
  selectedCountryId,
  onSelectCountry,
  onViewFocusTree
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [sortBy, setSortBy] = useState<SortMetric>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sortedCountries = useMemo(() => {
    let list = [...MAJOR_NATIONS_STARTING_STATS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q) ||
        c.leader.toLowerCase().includes(q) ||
        c.faction.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'factories':
        return list.sort((a, b) => b.factories.total - a.factories.total);
      case 'military_factories':
        return list.sort((a, b) => b.factories.military - a.factories.military);
      case 'manpower':
        return list.sort((a, b) => b.manpower.availablePool - a.manpower.availablePool);
      case 'research_slots':
        return list.sort((a, b) => b.researchSlots.starting - a.researchSlots.starting);
      default:
        return list;
    }
  }, [sortBy, searchQuery]);

  const selectedNation = useMemo(() => {
    return MAJOR_NATIONS_STARTING_STATS.find(c => c.id === selectedCountryId) || MAJOR_NATIONS_STARTING_STATS[0];
  }, [selectedCountryId]);

  // Max values for relative scaling meters
  const maxFactories = 160;
  const maxManpower = 6000000;

  return (
    <div className="space-y-6">
      {/* Header & Quick Controls */}
      <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 sm:p-5 shadow-xl shadow-black/40">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-[#1e2a38]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-lg shadow-amber-950/50">
              <BarChart3 className="h-6 w-6 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-[#f8fafc]">
                  Dashboard Statistik Awal Negara Utama (1936)
                </h3>
                <span className="rounded-md bg-[#d97706]/20 border border-[#d97706]/40 px-2 py-0.5 font-mono text-[11px] font-bold text-[#fbbf24]">
                  HOI4 Starting Baseline
                </span>
              </div>
              <p className="text-xs text-[#94a3b8]">
                Ringkasan komprehensif Manpower awal, kapasitas Pabrik (Sipil, Militer, Galangan), dan Slot Riset untuk 8 kekuatan utama dunia.
              </p>
            </div>
          </div>

          {/* Quick Selected Nation Action */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 bg-[#0c141d] border border-[#1e2e3f] rounded-lg px-3 py-1.5">
              <span className="text-xs text-[#94a3b8]">Negara Terpilih:</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs font-black text-[#fbbf24]">{selectedNation.tag}</span>
                <span className="text-xs font-bold text-[#f1f5f9] truncate max-w-[140px]">{selectedNation.name.split(' ')[0]}</span>
              </div>
            </div>
            {onViewFocusTree && (
              <button
                onClick={onViewFocusTree}
                className="flex items-center gap-1.5 rounded-lg bg-[#f59e0b] px-3.5 py-1.5 text-xs font-bold text-[#0c141d] hover:bg-[#fbbf24] transition-all shadow-md shadow-amber-950/40"
              >
                <span>Buka Pohon Fokus</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
                activeTab === 'all'
                  ? 'border-[#f59e0b] bg-[#292212] text-[#fef3c7]'
                  : 'border-[#1e2938] bg-[#0c141d] text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              Semua Metrik
            </button>
            <button
              onClick={() => setActiveTab('manpower')}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
                activeTab === 'manpower'
                  ? 'border-[#10b981] bg-[#122c20] text-[#a7f3d0]'
                  : 'border-[#1e2938] bg-[#0c141d] text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              <Users className="h-3.5 w-3.5 text-[#10b981]" />
              <span>Manpower</span>
            </button>
            <button
              onClick={() => setActiveTab('factories')}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
                activeTab === 'factories'
                  ? 'border-[#38bdf8] bg-[#0c2438] text-[#7dd3fc]'
                  : 'border-[#1e2938] bg-[#0c141d] text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              <Factory className="h-3.5 w-3.5 text-[#38bdf8]" />
              <span>Pabrik &amp; Industri</span>
            </button>
            <button
              onClick={() => setActiveTab('research')}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
                activeTab === 'research'
                  ? 'border-[#a855f7] bg-[#241334] text-[#e9d5ff]'
                  : 'border-[#1e2938] bg-[#0c141d] text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              <Microscope className="h-3.5 w-3.5 text-[#a855f7]" />
              <span>Slot Riset</span>
            </button>
            <button
              onClick={() => setActiveTab('military')}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
                activeTab === 'military'
                  ? 'border-[#f43f5e] bg-[#2c0e16] text-[#fecdd3]'
                  : 'border-[#1e2938] bg-[#0c141d] text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              <Shield className="h-3.5 w-3.5 text-[#f43f5e]" />
              <span>Militer &amp; Sumber Daya</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748b] flex items-center gap-1">
              <ArrowUpDown className="h-3 w-3" /> Urutkan:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortMetric)}
              className="rounded-lg border border-[#223344] bg-[#0c141d] px-2.5 py-1 text-xs font-medium text-[#cbd5e1] focus:outline-none focus:border-[#f59e0b]"
            >
              <option value="default">Default Negara Utama</option>
              <option value="factories">Total Pabrik Terbanyak</option>
              <option value="military_factories">Pabrik Militer Terbanyak</option>
              <option value="manpower">Manpower Terbanyak</option>
              <option value="research_slots">Slot Riset Terbanyak</option>
            </select>
          </div>
        </div>
      </div>

      {/* Selected Country Spotlight Banner */}
      <div className="rounded-xl border border-[#2d3f52] bg-gradient-to-r from-[#141e2b] via-[#0f1722] to-[#141e2b] p-5 shadow-xl shadow-black/40">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl font-serif text-2xl font-black text-white shadow-xl ring-2 ring-white/10 shrink-0"
              style={{
                background: `linear-gradient(135deg, ${selectedNation.flagColors[0]}, ${selectedNation.flagColors[1]})`
              }}
            >
              {selectedNation.flagSymbol}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-sm font-black text-[#fbbf24] bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {selectedNation.tag}
                </span>
                <h4 className="text-lg font-black text-[#f8fafc]">
                  {selectedNation.name}
                </h4>
                <span className="rounded bg-[#1e2e40] px-2 py-0.5 font-mono text-xs text-[#94a3b8]">
                  {selectedNation.faction}
                </span>
              </div>
              <p className="text-xs text-[#cbd5e1] max-w-3xl leading-relaxed">
                {selectedNation.keyStrategicBrief}
              </p>
              <div className="flex items-center gap-3 pt-1 text-[11px] text-[#94a3b8] flex-wrap">
                <span>Pemimpin: <strong className="text-[#f1f5f9]">{selectedNation.leader}</strong></span>
                <span>•</span>
                <span>Ideologi: <strong className="text-[#f1f5f9]">{selectedNation.ideology}</strong></span>
                <span>•</span>
                <span>Doktrin: <strong className="text-[#38bdf8]">{selectedNation.military.recommendedDoctrine}</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Starting 3-Pillar Badges */}
          <div className="grid grid-cols-3 gap-3 shrink-0 lg:w-96">
            <div className="p-3 rounded-lg border border-[#1e2e3f] bg-[#090e15] text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] text-[#10b981] mb-0.5">
                <Users className="h-3 w-3" /> Manpower
              </div>
              <div className="font-mono text-lg font-black text-[#a7f3d0]">
                {selectedNation.manpower.availablePoolDisplay}
              </div>
              <span className="text-[10px] text-[#64748b] block">{selectedNation.manpower.conscriptionPercent}% Hukum</span>
            </div>

            <div className="p-3 rounded-lg border border-[#1e2e3f] bg-[#090e15] text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] text-[#38bdf8] mb-0.5">
                <Factory className="h-3 w-3" /> Pabrik
              </div>
              <div className="font-mono text-lg font-black text-[#7dd3fc]">
                {selectedNation.factories.total}
              </div>
              <span className="text-[10px] text-[#64748b] block">{selectedNation.factories.military} Militer / {selectedNation.factories.civilian} Civ</span>
            </div>

            <div className="p-3 rounded-lg border border-[#1e2e3f] bg-[#090e15] text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] text-[#c084fc] mb-0.5">
                <Microscope className="h-3 w-3" /> Slot Riset
              </div>
              <div className="font-mono text-lg font-black text-[#e9d5ff]">
                {selectedNation.researchSlots.starting} <span className="text-xs text-[#64748b]">/ {selectedNation.researchSlots.maxExpandable}</span>
              </div>
              <span className="text-[10px] text-[#64748b] block">Maks via Fokus</span>
            </div>
          </div>
        </div>
      </div>

      {/* Major Nations Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCountries.map(country => {
          const isSelected = country.id === selectedCountryId;

          return (
            <div
              key={country.id}
              className={`flex flex-col justify-between rounded-xl border p-4 transition-all shadow-md ${
                isSelected
                  ? 'border-[#f59e0b] bg-gradient-to-b from-[#192433] to-[#0f1722] ring-1 ring-[#f59e0b]/50 shadow-black/60'
                  : 'border-[#1e2a38] bg-[#0f1722] hover:border-[#33475b] hover:bg-[#121c2a]'
              }`}
            >
              {/* Card Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg font-serif text-lg font-bold text-white shadow-inner"
                      style={{
                        background: `linear-gradient(135deg, ${country.flagColors[0]}, ${country.flagColors[1]})`
                      }}
                    >
                      {country.flagSymbol}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-[#f8fafc]">{country.tag}</span>
                        <span className="text-[11px] text-[#64748b]">• {country.faction.split(' ')[0]}</span>
                      </div>
                      <h4 className="font-bold text-sm text-[#f1f5f9] leading-tight line-clamp-1">
                        {country.name}
                      </h4>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    country.difficulty === 'Sangat Mudah' ? 'bg-[#10b981]/20 text-[#a7f3d0] border border-[#10b981]/30' :
                    country.difficulty === 'Sedang' ? 'bg-[#38bdf8]/20 text-[#7dd3fc] border border-[#38bdf8]/30' :
                    country.difficulty === 'Menantang' ? 'bg-[#f59e0b]/20 text-[#fde047] border border-[#f59e0b]/30' :
                    'bg-[#ef4444]/20 text-[#fca5a5] border border-[#ef4444]/30'
                  }`}>
                    {country.difficulty}
                  </span>
                </div>

                {/* Stat 1: Manpower Pool & Conscription */}
                <div className="rounded-lg border border-[#1e2e3f] bg-[#0a1017] p-2.5 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#94a3b8] flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-[#10b981]" />
                      <span>Manpower Awal:</span>
                    </span>
                    <span className="font-mono font-black text-[#a7f3d0] text-sm">
                      {country.manpower.availablePoolDisplay}
                    </span>
                  </div>
                  {/* Visual Bar */}
                  <div className="h-1.5 w-full bg-[#1e2938] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#059669] to-[#10b981] rounded-full"
                      style={{ width: `${Math.min(100, Math.max(10, (country.manpower.availablePool / maxManpower) * 100))}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#64748b]">
                    <span>{country.manpower.conscriptionLaw}</span>
                    <span>Pop: {country.manpower.totalPopulation}</span>
                  </div>
                </div>

                {/* Stat 2: Factories (Civs, Mils, Docks) */}
                <div className="rounded-lg border border-[#1e2e3f] bg-[#0a1017] p-2.5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#94a3b8] flex items-center gap-1.5">
                      <Factory className="h-3.5 w-3.5 text-[#38bdf8]" />
                      <span>Total Pabrik (1936):</span>
                    </span>
                    <span className="font-mono font-black text-[#7dd3fc] text-sm">
                      {country.factories.total}
                    </span>
                  </div>

                  {/* Tri-Color Stacked Factory Bar */}
                  <div className="h-2 w-full bg-[#1e2938] rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-[#0284c7]"
                      style={{ width: `${(country.factories.civilian / country.factories.total) * 100}%` }}
                      title={`Pabrik Sipil: ${country.factories.civilian}`}
                    />
                    <div
                      className="h-full bg-[#f59e0b]"
                      style={{ width: `${(country.factories.military / country.factories.total) * 100}%` }}
                      title={`Pabrik Militer: ${country.factories.military}`}
                    />
                    <div
                      className="h-full bg-[#14b8a6]"
                      style={{ width: `${(country.factories.dockyards / country.factories.total) * 100}%` }}
                      title={`Galangan Kapal: ${country.factories.dockyards}`}
                    />
                  </div>

                  {/* Breakdown Numbers */}
                  <div className="grid grid-cols-3 gap-1 text-center font-mono text-[11px] pt-0.5">
                    <div className="text-sky-400 bg-sky-950/40 rounded py-0.5 border border-sky-800/40">
                      {country.factories.civilian} <span className="text-[9px] text-sky-500">Civs</span>
                    </div>
                    <div className="text-amber-400 bg-amber-950/40 rounded py-0.5 border border-amber-800/40">
                      {country.factories.military} <span className="text-[9px] text-amber-500">Mils</span>
                    </div>
                    <div className="text-teal-400 bg-teal-950/40 rounded py-0.5 border border-teal-800/40">
                      {country.factories.dockyards} <span className="text-[9px] text-teal-500">Docks</span>
                    </div>
                  </div>
                </div>

                {/* Stat 3: Research Slots & Expansion */}
                <div className="rounded-lg border border-[#1e2e3f] bg-[#0a1017] p-2.5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#94a3b8] flex items-center gap-1.5">
                      <Microscope className="h-3.5 w-3.5 text-[#c084fc]" />
                      <span>Slot Riset:</span>
                    </span>
                    <span className="font-mono font-black text-[#e9d5ff]">
                      {country.researchSlots.starting} <span className="text-xs text-[#64748b]">/ {country.researchSlots.maxExpandable}</span>
                    </span>
                  </div>

                  {/* Visual Slot Boxes */}
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: country.researchSlots.maxExpandable }).map((_, idx) => {
                      const isStarting = idx < country.researchSlots.starting;
                      return (
                        <div
                          key={idx}
                          className={`h-3 flex-1 rounded-sm ${
                            isStarting
                              ? 'bg-gradient-to-r from-purple-500 to-indigo-500 shadow-sm'
                              : 'border border-dashed border-purple-500/40 bg-purple-950/20'
                          }`}
                          title={isStarting ? `Slot Aktif ${idx + 1}` : `Slot Tambahan via Fokus (+${idx + 1})`}
                        />
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-[#94a3b8] block mt-1 truncate">
                    Fokus: {country.researchSlots.keyExpansions[0]}
                  </span>
                </div>

                {/* Strategic Resources Snapshot (Oil & Rubber) */}
                <div className="flex items-center justify-between text-[11px] px-1 text-[#94a3b8]">
                  <div className="flex items-center gap-1">
                    <Fuel className="h-3 w-3 text-amber-400" />
                    <span>Minyak:</span>
                    <strong className={
                      country.resources.oilStatus === 'Melimpah' ? 'text-emerald-400' :
                      country.resources.oilStatus === 'Cukup' ? 'text-sky-400' : 'text-rose-400'
                    }>
                      {country.resources.oilStatus.split(' ')[0]}
                    </strong>
                  </div>

                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-sky-400" />
                    <span>Divisi Awal:</span>
                    <strong className="font-mono text-[#f8fafc]">{country.military.startingDivisions}x</strong>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 mt-3 border-t border-[#1e2a38] flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectCountry(country.id)}
                  className={`flex-1 rounded-lg py-1.5 px-3 text-xs font-bold transition-all text-center ${
                    isSelected
                      ? 'bg-[#f59e0b] text-[#0a1017] shadow-md shadow-amber-950/30'
                      : 'border border-[#233547] bg-[#111c27] text-[#cbd5e1] hover:border-[#38bdf8] hover:text-[#f8fafc]'
                  }`}
                >
                  {isSelected ? '✓ Negara Terpilih' : 'Pilih Negara Ini'}
                </button>

                {onViewFocusTree && (
                  <button
                    onClick={() => {
                      onSelectCountry(country.id);
                      onViewFocusTree();
                    }}
                    className="flex items-center justify-center p-2 rounded-lg border border-[#233547] bg-[#111c27] text-[#94a3b8] hover:text-[#fbbf24] hover:border-[#f59e0b] transition-all"
                    title="Buka Pohon Fokus Negara Ini"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
