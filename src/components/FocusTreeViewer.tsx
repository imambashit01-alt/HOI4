import React, { useState, useMemo, useRef } from 'react';
import {
  GitBranch, CheckCircle2, AlertTriangle, Clock, Shield, Factory,
  Award, Globe, Zap, Sparkles, Copy, Check, RotateCcw, Info,
  Search, Star, Lock, ArrowUpRight, Flame, Anchor, Plane, HelpCircle,
  BarChart3, CheckSquare, Square, ChevronRight, X, Map, Users, Microscope, Fuel
} from 'lucide-react';
import { NationalFocus, FocusPresetPath } from '../types';
import {
  MAJOR_COUNTRIES_FOCUS,
  NATIONAL_FOCUSES_DATA,
  FOCUS_PRESETS_DATA
} from '../data/focusData';
import { EuropeInteractiveMap } from './EuropeInteractiveMap';
import { CountryDashboard } from './CountryDashboard';
import { CountryFlagSelector, CountryFlag } from './CountryFlagSelector';
import { MAJOR_NATIONS_STARTING_STATS } from '../data/countryStartingStats';

interface FocusTreeViewerProps {
  searchQuery: string;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: { id: string; type: 'focus'; title: string; subtitle: string; tag: string }) => void;
  initialCountryId?: string;
}

export const FocusTreeViewer: React.FC<FocusTreeViewerProps> = ({
  searchQuery,
  isFavorite,
  toggleFavorite,
  initialCountryId = 'ger'
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>(initialCountryId);
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [activeFocusIds, setActiveFocusIds] = useState<string[]>(() => {
    // Default to the first preset of Germany (historical meta)
    const gerMeta = FOCUS_PRESETS_DATA.find(p => p.id === 'preset-ger-meta');
    return gerMeta ? gerMeta.focusIds : ['ger-rhineland', 'ger-four-year-plan', 'ger-autarky'];
  });
  const [inspectingFocus, setInspectingFocus] = useState<NationalFocus | null>(null);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [localSearch, setLocalSearch] = useState<string>('');
  const [showEuropeMap, setShowEuropeMap] = useState<boolean>(true);
  const [mainViewMode, setMainViewMode] = useState<'tree' | 'dashboard'>('tree');
  const treeSectionRef = useRef<HTMLDivElement>(null);

  const currentCountry = MAJOR_COUNTRIES_FOCUS.find(c => c.id === selectedCountryId) || MAJOR_COUNTRIES_FOCUS[0];

  const currentCountryStats = useMemo(() => {
    return MAJOR_NATIONS_STARTING_STATS.find(c => c.id === selectedCountryId) || MAJOR_NATIONS_STARTING_STATS[0];
  }, [selectedCountryId]);

  // Country's focuses
  const countryFocuses = useMemo(() => {
    return NATIONAL_FOCUSES_DATA.filter(f => f.countryId === selectedCountryId);
  }, [selectedCountryId]);

  // Available branches for current country
  const availableBranches = useMemo(() => {
    const branches = new Set<string>();
    countryFocuses.forEach(f => branches.add(f.branch));
    return Array.from(branches);
  }, [countryFocuses]);

  // Country presets
  const countryPresets = useMemo(() => {
    return FOCUS_PRESETS_DATA.filter(p => p.countryId === selectedCountryId);
  }, [selectedCountryId]);

  // Filtered focuses
  const filteredFocuses = useMemo(() => {
    const query = (localSearch || searchQuery).trim().toLowerCase();
    return countryFocuses.filter(f => {
      const matchBranch = selectedBranch === 'all' || f.branch === selectedBranch;
      const matchQuery = !query || (
        f.name.toLowerCase().includes(query) ||
        (f.originalName && f.originalName.toLowerCase().includes(query)) ||
        f.branch.toLowerCase().includes(query) ||
        f.keyEffectsSummary.toLowerCase().includes(query) ||
        f.pros.some(p => p.toLowerCase().includes(query)) ||
        f.cons.some(c => c.toLowerCase().includes(query))
      );
      return matchBranch && matchQuery;
    });
  }, [countryFocuses, selectedBranch, localSearch, searchQuery]);

  // Check if a focus is locked by mutual exclusivity
  const getMutualExclusiveLock = (focus: NationalFocus): { isLocked: boolean; lockedBy?: NationalFocus } => {
    if (activeFocusIds.includes(focus.id)) return { isLocked: false };
    for (const activeId of activeFocusIds) {
      const activeFocus = countryFocuses.find(f => f.id === activeId);
      if (activeFocus && activeFocus.mutuallyExclusive.includes(focus.id)) {
        return { isLocked: true, lockedBy: activeFocus };
      }
    }
    return { isLocked: false };
  };

  // Toggle selection of a focus
  const handleToggleFocus = (focus: NationalFocus) => {
    if (activeFocusIds.includes(focus.id)) {
      // Deselect
      setActiveFocusIds(prev => prev.filter(id => id !== focus.id));
    } else {
      // Check mutual exclusivity - remove any conflicting active focuses
      const conflictingIds = focus.mutuallyExclusive;
      setActiveFocusIds(prev => {
        const withoutConflicting = prev.filter(id => !conflictingIds.includes(id));
        return [...withoutConflicting, focus.id];
      });
    }
  };

  // Load a preset path
  const handleLoadPreset = (preset: FocusPresetPath) => {
    setActiveFocusIds(preset.focusIds);
  };

  // Clear all selections
  const handleClearAll = () => {
    setActiveFocusIds([]);
  };

  // Change country
  const handleSelectCountry = (cId: string) => {
    setSelectedCountryId(cId);
    setSelectedBranch('all');
    // Load first preset for the new country
    const firstPreset = FOCUS_PRESETS_DATA.find(p => p.countryId === cId);
    if (firstPreset) {
      setActiveFocusIds(firstPreset.focusIds);
    } else {
      setActiveFocusIds([]);
    }
  };

  // Active Focuses Objects
  const activeFocusObjects = useMemo(() => {
    return activeFocusIds
      .map(id => countryFocuses.find(f => f.id === id))
      .filter((f): f is NationalFocus => f !== undefined);
  }, [activeFocusIds, countryFocuses]);

  // Aggregate Stats Calculator
  const aggregateStats = useMemo(() => {
    let totalDays = 0;
    let totalPP = 0;
    let totalCivs = 0;
    let totalMils = 0;
    let totalDocks = 0;
    let netStability = 0;
    let netWarSupport = 0;
    let totalWorldTension = 0;
    let extraResearchSlots = 0;
    let totalArmyXP = 0;
    let totalNavyXP = 0;
    let totalAirXP = 0;
    const allPros: string[] = [];
    const allCons: string[] = [];
    const territories: string[] = [];

    activeFocusObjects.forEach(f => {
      totalDays += f.days;
      if (f.statsDelta.politicalPower) totalPP += f.statsDelta.politicalPower;
      if (f.statsDelta.civFactories) totalCivs += f.statsDelta.civFactories;
      if (f.statsDelta.milFactories) totalMils += f.statsDelta.milFactories;
      if (f.statsDelta.dockyards) totalDocks += f.statsDelta.dockyards;
      if (f.statsDelta.stability) netStability += f.statsDelta.stability;
      if (f.statsDelta.warSupport) netWarSupport += f.statsDelta.warSupport;
      if (f.statsDelta.worldTension) totalWorldTension += f.statsDelta.worldTension;
      if (f.statsDelta.researchSlots) extraResearchSlots += f.statsDelta.researchSlots;
      if (f.statsDelta.armyXP) totalArmyXP += f.statsDelta.armyXP;
      if (f.statsDelta.navyXP) totalNavyXP += f.statsDelta.navyXP;
      if (f.statsDelta.airXP) totalAirXP += f.statsDelta.airXP;

      f.pros.forEach(p => {
        if (!allPros.includes(p)) allPros.push(p);
      });
      f.cons.forEach(c => {
        if (!allCons.includes(c)) allCons.push(c);
      });
      if (f.annexationOrClaim && !territories.includes(f.annexationOrClaim)) {
        territories.push(f.annexationOrClaim);
      }
    });

    // Approximate in-game completion date starting from Jan 1, 1936
    const startDate = new Date(1936, 0, 1);
    const estimatedCompletionDate = new Date(startDate.getTime() + totalDays * 24 * 60 * 60 * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const completionString = `${months[estimatedCompletionDate.getMonth()]} ${estimatedCompletionDate.getFullYear()} (~${Math.round(totalDays / 30)} Bulan)`;

    // Readiness indices (1-100 scale)
    const economyScore = Math.min(100, Math.max(20, 40 + (totalCivs * 6) + (totalMils * 5) + (extraResearchSlots * 15)));
    const militaryScore = Math.min(100, Math.max(20, 35 + (totalMils * 6) + (totalDocks * 4) + (totalArmyXP / 3) + (netWarSupport * 0.8)));
    const stabilityScore = Math.min(100, Math.max(10, 60 + netStability));

    return {
      totalCount: activeFocusObjects.length,
      totalDays,
      completionString,
      totalPP,
      totalCivs,
      totalMils,
      totalDocks,
      totalFactories: totalCivs + totalMils + totalDocks,
      netStability,
      netWarSupport,
      totalWorldTension,
      extraResearchSlots,
      totalArmyXP,
      totalNavyXP,
      totalAirXP,
      allPros,
      allCons,
      territories,
      economyScore,
      militaryScore,
      stabilityScore
    };
  }, [activeFocusObjects]);

  // Copy breakdown to clipboard
  const handleCopyBreakdown = () => {
    const text = `[KALKULATOR FOKUS NASIONAL HOI4: ${currentCountry.name}]
Total Fokus Dipilih: ${aggregateStats.totalCount} fokus (${aggregateStats.totalDays} hari pengerjaan, estimasi rampung: ${aggregateStats.completionString})

📊 AKUMULASI DAMPAK STATISTIK:
• Political Power: ${aggregateStats.totalPP >= 0 ? '+' : ''}${aggregateStats.totalPP} PP
• Pabrik Sipil (Civs): +${aggregateStats.totalCivs}
• Pabrik Militer (Mils): +${aggregateStats.totalMils}
• Galangan Kapal (Docks): +${aggregateStats.totalDocks}
• Slot Riset Tambahan: +${aggregateStats.extraResearchSlots} Slot
• Net Stabilitas: ${aggregateStats.netStability >= 0 ? '+' : ''}${aggregateStats.netStability}%
• Net War Support: ${aggregateStats.netWarSupport >= 0 ? '+' : ''}${aggregateStats.netWarSupport}%
• World Tension Diciptakan: +${aggregateStats.totalWorldTension}%
• Total Experience: ${aggregateStats.totalArmyXP} Army XP / ${aggregateStats.totalNavyXP} Navy XP / ${aggregateStats.totalAirXP} Air XP

✅ KELEBIHAN & KEUNTUNGAN STRATEGIS:
${aggregateStats.allPros.map(p => `• ${p}`).join('\n')}

⚠️ KEKURANGAN, BIAYA & RISIKO:
${aggregateStats.allCons.map(c => `• ${c}`).join('\n')}

🧭 URUTAN JALUR FOKUS:
${activeFocusObjects.map((f, i) => `${i + 1}. ${f.name} (${f.days} hari)`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const getBranchBadgeColor = (branch: string) => {
    if (branch.includes('Politik Fasis') || branch.includes('Fasis')) return 'bg-[#3b1219] text-[#fca5a5] border-[#991b1b]/50';
    if (branch.includes('Industri') || branch.includes('Ekonomi')) return 'bg-[#2b2011] text-[#fde047] border-[#d97706]/50';
    if (branch.includes('Militer') || branch.includes('Darat')) return 'bg-[#122822] text-[#86efac] border-[#16a34a]/50';
    if (branch.includes('Laut')) return 'bg-[#102238] text-[#93c5fd] border-[#2563eb]/50';
    if (branch.includes('Udara')) return 'bg-[#1c1c38] text-[#c4b5fd] border-[#7c3aed]/50';
    if (branch.includes('Alternatif')) return 'bg-[#2d1b36] text-[#f472b6] border-[#db2777]/50';
    return 'bg-[#152330] text-[#94a3b8] border-[#334155]/50';
  };

  return (
    <div className="space-y-6">
      {/* Interactive Map of Europe 1936-1939 */}
      {showEuropeMap && (
        <div className="animate-fadeIn">
          <EuropeInteractiveMap
            selectedCountryId={selectedCountryId}
            onSelectCountry={handleSelectCountry}
            onScrollToTree={() => treeSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      )}

      {/* Top View Mode & Tools Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3.5 rounded-xl border border-[#2b3a32] bg-[#111914]">
        <div className="flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-[#f59e0b]" />
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#f8fafc] tracking-tight">
              Pohon Fokus Nasional PD II
            </h2>
            <p className="text-xs text-[#cbd5e1]">
              Pilih bendera negara untuk menganalisis jalur fokus, akumulasi pabrik, stabilitas, dan kalkulasi geopolitik.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* View Mode Toggle: Tree vs Country Dashboard */}
          <div className="flex items-center gap-1 bg-[#0c1410] p-1 rounded-lg border border-[#223028]">
            <button
              onClick={() => setMainViewMode('tree')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                mainViewMode === 'tree'
                  ? 'bg-[#f59e0b] text-[#0c1410] shadow-sm'
                  : 'text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              <GitBranch className="h-3.5 w-3.5" />
              <span>Pohon Fokus</span>
            </button>
            <button
              onClick={() => setMainViewMode('dashboard')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                mainViewMode === 'dashboard'
                  ? 'bg-[#d97706] text-white shadow-sm'
                  : 'text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Dashboard Negara</span>
            </button>
          </div>

          <button
            onClick={() => setShowEuropeMap(!showEuropeMap)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-bold border transition-all ${
              showEuropeMap
                ? 'border-[#f59e0b] bg-[#292212] text-[#fef3c7] shadow-sm'
                : 'border-[#223028] bg-[#0c1410] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Globe className="h-4 w-4 text-[#f59e0b]" />
            <span>{showEuropeMap ? 'Sembunyikan Peta' : 'Peta Eropa'}</span>
          </button>
        </div>
      </div>

      {/* Country Flag Selector Component */}
      <CountryFlagSelector
        selectedCountryId={selectedCountryId}
        onSelectCountry={handleSelectCountry}
      />

      {/* Country Starting Stats Quick Strip Container */}
      <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 shadow-xl shadow-black/40">

        {/* Country Starting Stats Quick Strip */}
        <div className="mt-3 pt-3 border-t border-[#1e2a38] flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-[#f1f5f9]">
              <span className="font-mono font-bold text-[#fbbf24] bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                {currentCountryStats.tag}
              </span>
              <span className="font-bold">{currentCountryStats.name}</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[#94a3b8] flex-wrap">
              <span className="flex items-center gap-1 text-[#a7f3d0]">
                <Users className="h-3.5 w-3.5 text-[#10b981]" /> Manpower: <strong>{currentCountryStats.manpower.availablePoolDisplay}</strong> ({currentCountryStats.manpower.conscriptionPercent}%)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#7dd3fc]">
                <Factory className="h-3.5 w-3.5 text-[#38bdf8]" /> Total Pabrik: <strong>{currentCountryStats.factories.total}</strong> ({currentCountryStats.factories.military} Mil / {currentCountryStats.factories.civilian} Civ / {currentCountryStats.factories.dockyards} Dock)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#e9d5ff]">
                <Microscope className="h-3.5 w-3.5 text-[#c084fc]" /> Slot Riset: <strong>{currentCountryStats.researchSlots.starting}/{currentCountryStats.researchSlots.maxExpandable}</strong>
              </span>
            </div>
          </div>

          <button
            onClick={() => setMainViewMode(mainViewMode === 'dashboard' ? 'tree' : 'dashboard')}
            className="flex items-center gap-1 text-[11px] font-bold text-[#f59e0b] hover:text-[#fbbf24] transition-colors self-start md:self-auto shrink-0"
          >
            <span>{mainViewMode === 'dashboard' ? 'Kembali ke Pohon Fokus' : 'Bandingkan Semua Negara Utama'}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Layout: Conditional Country Dashboard vs Focus Tree & Trade-off Calculator */}
      {mainViewMode === 'dashboard' ? (
        <CountryDashboard
          selectedCountryId={selectedCountryId}
          onSelectCountry={(id) => {
            handleSelectCountry(id);
          }}
          onViewFocusTree={() => {
            setMainViewMode('tree');
            treeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      ) : (
        <div ref={treeSectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Focus Catalog & Path Selector (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Preset Buttons Bar */}
          <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748b] flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-[#fbbf24]" />
                Preset Jalur Cepat ({currentCountry.name}):
              </span>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1 rounded border border-[#334155] bg-[#0c141d] px-2 py-1 text-[11px] font-mono text-[#94a3b8] hover:text-[#ef4444] hover:border-[#ef4444]/50 transition-colors"
                title="Hapus semua pilihan fokus"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset ({activeFocusIds.length})</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {countryPresets.map(preset => {
                const isActive = preset.focusIds.length === activeFocusIds.length &&
                  preset.focusIds.every(id => activeFocusIds.includes(id));

                return (
                  <button
                    key={preset.id}
                    onClick={() => handleLoadPreset(preset)}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? 'border-[#10b981] bg-[#132c22] text-[#a7f3d0] font-bold shadow-sm'
                        : 'border-[#1e2a38] bg-[#0c141d] text-[#94a3b8] hover:border-[#2f4356] hover:text-[#f8fafc]'
                    }`}
                  >
                    {preset.type === 'meta_historical' && <Star className="h-3.5 w-3.5 text-[#fbbf24] fill-current" />}
                    {preset.type === 'rush_industry' && <Factory className="h-3.5 w-3.5 text-[#f59e0b]" />}
                    {preset.type === 'alternative_history' && <GitBranch className="h-3.5 w-3.5 text-[#ec4899]" />}
                    <span>{preset.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search & Branch Filter */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
              <input
                type="text"
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                placeholder={`Cari fokus ${currentCountry.tag} (misal: Rhineland, Purge, New Deal)...`}
                className="w-full rounded-lg border border-[#223344] bg-[#0d151f] py-2 pl-9 pr-3 text-xs text-[#f1f5f9] placeholder-[#64748b] outline-none focus:border-[#f59e0b]"
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#64748b] hover:text-[#f8fafc]"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setSelectedBranch('all')}
                className={`shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium border transition-colors ${
                  selectedBranch === 'all'
                    ? 'border-[#38bdf8] bg-[#0f2334] text-[#7dd3fc]'
                    : 'border-[#1e2a38] bg-[#0c141d] text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                Semua Cabang ({countryFocuses.length})
              </button>
              {availableBranches.map(branch => (
                <button
                  key={branch}
                  onClick={() => setSelectedBranch(branch)}
                  className={`shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium border transition-colors ${
                    selectedBranch === branch
                      ? 'border-[#38bdf8] bg-[#0f2334] text-[#7dd3fc]'
                      : 'border-[#1e2a38] bg-[#0c141d] text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  {branch}
                </button>
              ))}
            </div>
          </div>

          {/* Focus List Cards */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-[#64748b] px-1 font-mono">
              <span>Daftar Fokus Nasional ({filteredFocuses.length})</span>
              <span>{activeFocusIds.length} Fokus Aktif Terpilih</span>
            </div>

            {filteredFocuses.map(focus => {
              const isSelected = activeFocusIds.includes(focus.id);
              const lockInfo = getMutualExclusiveLock(focus);
              const isFav = isFavorite(focus.id);

              return (
                <div
                  key={focus.id}
                  className={`rounded-xl border transition-all p-3.5 relative ${
                    isSelected
                      ? 'border-[#10b981] bg-[#11231a] shadow-lg shadow-black/40 ring-1 ring-[#10b981]/50'
                      : lockInfo.isLocked
                      ? 'border-[#dc2626]/40 bg-[#1a0f12] opacity-75'
                      : 'border-[#1f2d3d] bg-[#101822] hover:border-[#33465c]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Checkbox selector */}
                      <button
                        onClick={() => handleToggleFocus(focus)}
                        className={`mt-0.5 shrink-0 flex h-6 w-6 items-center justify-center rounded-md border transition-all ${
                          isSelected
                            ? 'border-[#10b981] bg-[#10b981] text-[#062419]'
                            : lockInfo.isLocked
                            ? 'border-[#ef4444]/40 bg-[#2b1216] text-[#ef4444]'
                            : 'border-[#334155] bg-[#0c141d] text-transparent hover:border-[#64748b]'
                        }`}
                        title={isSelected ? 'Batalkan pilihan' : lockInfo.isLocked ? 'Fokus terkunci' : 'Pilih fokus ini'}
                      >
                        {isSelected ? (
                          <Check className="h-4 w-4 stroke-[3]" />
                        ) : lockInfo.isLocked ? (
                          <Lock className="h-3 w-3" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getBranchBadgeColor(focus.branch)}`}>
                            {focus.branch}
                          </span>
                          <span className="text-[10px] font-mono text-[#94a3b8] flex items-center gap-1 bg-[#0c141d] px-1.5 py-0.5 rounded border border-[#1e2a38]">
                            <Clock className="h-3 w-3 text-[#64748b]" />
                            {focus.days} Hari
                          </span>
                          {focus.historical && (
                            <span className="text-[10px] font-mono text-[#38bdf8] bg-[#0c2438] px-1.5 py-0.5 rounded border border-[#38bdf8]/30">
                              Historis
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-sm text-[#f8fafc] tracking-tight leading-snug flex items-center gap-1.5">
                          {focus.name}
                        </h3>

                        <p className="text-xs text-[#94a3b8] mt-1 line-clamp-2 leading-relaxed">
                          {focus.keyEffectsSummary}
                        </p>

                        {/* Direct Stats Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-2 font-mono text-[11px]">
                          {focus.statsDelta.politicalPower !== undefined && focus.statsDelta.politicalPower !== 0 && (
                            <span className={`px-1.5 py-0.5 rounded ${
                              focus.statsDelta.politicalPower > 0
                                ? 'bg-[#1e293b] text-[#38bdf8] border border-[#38bdf8]/30'
                                : 'bg-[#2b1416] text-[#f87171] border border-[#ef4444]/30'
                            }`}>
                              {focus.statsDelta.politicalPower > 0 ? '+' : ''}{focus.statsDelta.politicalPower} PP
                            </span>
                          )}
                          {focus.statsDelta.civFactories !== undefined && focus.statsDelta.civFactories > 0 && (
                            <span className="bg-[#261f14] text-[#fbbf24] px-1.5 py-0.5 rounded border border-[#d97706]/40">
                              +{focus.statsDelta.civFactories} Civs
                            </span>
                          )}
                          {focus.statsDelta.milFactories !== undefined && focus.statsDelta.milFactories > 0 && (
                            <span className="bg-[#122b1c] text-[#4ade80] px-1.5 py-0.5 rounded border border-[#16a34a]/40">
                              +{focus.statsDelta.milFactories} Mils
                            </span>
                          )}
                          {focus.statsDelta.dockyards !== undefined && focus.statsDelta.dockyards > 0 && (
                            <span className="bg-[#14233c] text-[#60a5fa] px-1.5 py-0.5 rounded border border-[#2563eb]/40">
                              +{focus.statsDelta.dockyards} Docks
                            </span>
                          )}
                          {focus.statsDelta.researchSlots !== undefined && focus.statsDelta.researchSlots > 0 && (
                            <span className="bg-[#2a1b38] text-[#c084fc] px-1.5 py-0.5 rounded border border-[#9333ea]/40 font-bold">
                              +{focus.statsDelta.researchSlots} Slot Riset
                            </span>
                          )}
                          {focus.statsDelta.worldTension !== undefined && focus.statsDelta.worldTension > 0 && (
                            <span className="bg-[#29171b] text-[#fb7185] px-1.5 py-0.5 rounded border border-[#e11d48]/40">
                              +{focus.statsDelta.worldTension}% WT
                            </span>
                          )}
                          {focus.annexationOrClaim && (
                            <span className="bg-[#1e2e40] text-[#a5f3fc] px-1.5 py-0.5 rounded border border-[#06b6d4]/40">
                              {focus.annexationOrClaim}
                            </span>
                          )}
                        </div>

                        {/* Mutually Exclusive Warning Banner */}
                        {lockInfo.isLocked && lockInfo.lockedBy && (
                          <div className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-[#ef4444]/40 bg-[#2b1216]/80 p-2 text-xs text-[#fca5a5]">
                            <AlertTriangle className="h-3.5 w-3.5 text-[#ef4444] shrink-0" />
                            <span>
                              <strong>Terkunci:</strong> Bertentangan dengan fokus aktif{' '}
                              <span className="underline">{lockInfo.lockedBy.name}</span>. Klik untuk mengganti.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions: Details & Favorite */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => toggleFavorite({
                          id: focus.id,
                          type: 'focus',
                          title: focus.name,
                          subtitle: `${currentCountry.tag} • ${focus.branch}`,
                          tag: 'Fokus'
                        })}
                        className={`p-1.5 rounded border transition-colors ${
                          isFav
                            ? 'border-[#eab308]/60 bg-[#2b2512] text-[#facc15]'
                            : 'border-[#22303c] bg-[#0d151f] text-[#64748b] hover:text-[#f8fafc]'
                        }`}
                        title={isFav ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
                      >
                        <Star className={`h-3.5 w-3.5 ${isFav ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={() => setInspectingFocus(focus)}
                        className="flex items-center gap-1 rounded border border-[#22303c] bg-[#121c27] px-2.5 py-1.5 text-xs text-[#cbd5e1] hover:border-[#38bdf8] hover:text-[#38bdf8] transition-colors"
                        title="Lihat rincian lengkap kelebihan & kekurangan"
                      >
                        <Info className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Detail</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Trade-Off & Stats Impact Calculator (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-4">
          <div className="rounded-xl border border-[#223344] bg-[#111923] shadow-xl shadow-black/50 overflow-hidden">
            {/* Calculator Header */}
            <div className="border-b border-[#1f2d3d] bg-gradient-to-r from-[#172230] to-[#121a24] p-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#f8fafc] tracking-tight">
                    Kalkulator Neraca Dampak Fokus
                  </h3>
                </div>

                <button
                  onClick={handleCopyBreakdown}
                  disabled={activeFocusObjects.length === 0}
                  className="flex items-center gap-1.5 rounded-lg border border-[#334155] bg-[#0c141d] px-2.5 py-1 text-xs font-semibold text-[#cbd5e1] hover:border-[#10b981] hover:text-[#f8fafc] transition-colors disabled:opacity-40"
                  title="Salin hasil analisis ke clipboard"
                >
                  {copiedSummary ? <Check className="h-3.5 w-3.5 text-[#22c55e]" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedSummary ? 'Tersalin!' : 'Salin'}</span>
                </button>
              </div>

              <p className="text-xs text-[#94a3b8]">
                Negara: <strong className="text-[#f8fafc]">{currentCountry.name}</strong> •{' '}
                <span className="text-[#38bdf8]">{activeFocusObjects.length} fokus terpilih</span>
              </p>
            </div>

            {/* Empty State */}
            {activeFocusObjects.length === 0 ? (
              <div className="p-8 text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1e2a38] text-[#64748b]">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-bold text-[#f8fafc]">Belum Ada Fokus yang Dipilih</h4>
                <p className="text-xs text-[#94a3b8] max-w-xs mx-auto">
                  Centang salah satu fokus di sebelah kiri atau pilih preset di atas untuk melihat kalkulasi kekurangan dan kelebihannya secara langsung.
                </p>
                <button
                  onClick={() => {
                    const firstPreset = countryPresets[0];
                    if (firstPreset) handleLoadPreset(firstPreset);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#f59e0b]/50 bg-[#2b2112] px-3 py-1.5 text-xs font-semibold text-[#fef3c7] hover:bg-[#382b17]"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#f59e0b]" />
                  <span>Muat Preset Meta Historis</span>
                </button>
              </div>
            ) : (
              <div className="p-4 space-y-5 text-xs">
                {/* Time & Industrial Net Metric Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center">
                  <div className="rounded-lg border border-[#38bdf8]/30 bg-[#0d2133] p-2.5">
                    <div className="text-[10px] uppercase font-bold text-[#7dd3fc]">Total Waktu</div>
                    <div className="text-base font-black text-[#e0f2fe]">{aggregateStats.totalDays} Hari</div>
                    <div className="text-[9px] text-[#94a3b8] mt-0.5 truncate">{aggregateStats.completionString}</div>
                  </div>

                  <div className="rounded-lg border border-[#fbbf24]/30 bg-[#2b2011] p-2.5">
                    <div className="text-[10px] uppercase font-bold text-[#fde047]">Political Power</div>
                    <div className={`text-base font-black ${aggregateStats.totalPP >= 0 ? 'text-[#fef08a]' : 'text-[#fca5a5]'}`}>
                      {aggregateStats.totalPP >= 0 ? '+' : ''}{aggregateStats.totalPP} PP
                    </div>
                    <div className="text-[9px] text-[#94a3b8] mt-0.5">Akumulasi</div>
                  </div>

                  <div className="rounded-lg border border-[#4ade80]/30 bg-[#102919] p-2.5">
                    <div className="text-[10px] uppercase font-bold text-[#86efac]">Pabrik Baru</div>
                    <div className="text-base font-black text-[#bbf7d0]">+{aggregateStats.totalFactories}</div>
                    <div className="text-[9px] text-[#86efac]/80 mt-0.5">
                      {aggregateStats.totalCivs}C • {aggregateStats.totalMils}M • {aggregateStats.totalDocks}D
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#c084fc]/30 bg-[#261533] p-2.5">
                    <div className="text-[10px] uppercase font-bold text-[#e9d5ff]">Slot Riset</div>
                    <div className="text-base font-black text-[#f3e8ff]">+{aggregateStats.extraResearchSlots} Slot</div>
                    <div className="text-[9px] text-[#c084fc] mt-0.5">Teknologi</div>
                  </div>
                </div>

                {/* Political & Tension Status Gauges */}
                <div className="space-y-2 rounded-lg border border-[#1e2a38] bg-[#0c141d] p-3 font-mono">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#94a3b8]">Perubahan Stabilitas:</span>
                    <span className={`font-bold ${aggregateStats.netStability >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                      {aggregateStats.netStability >= 0 ? '+' : ''}{aggregateStats.netStability}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#94a3b8]">Perubahan War Support:</span>
                    <span className={`font-bold ${aggregateStats.netWarSupport >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                      {aggregateStats.netWarSupport >= 0 ? '+' : ''}{aggregateStats.netWarSupport}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#94a3b8]">World Tension Terpicu:</span>
                    <span className="font-bold text-[#f43f5e]">+{aggregateStats.totalWorldTension}% WT</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#94a3b8]">Militer XP Diperoleh:</span>
                    <span className="font-bold text-[#38bdf8]">
                      {aggregateStats.totalArmyXP} Army / {aggregateStats.totalNavyXP} Navy / {aggregateStats.totalAirXP} Air
                    </span>
                  </div>
                </div>

                {/* Readiness Radar Index Bars */}
                <div className="space-y-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#64748b] block">
                    Indeks Kesiapan Strategis (1 - 100):
                  </span>
                  <div className="space-y-1.5">
                    <div>
                      <div className="flex justify-between text-[10px] font-mono text-[#cbd5e1] mb-0.5">
                        <span>Kapasitas Ekonomi &amp; Pabrik</span>
                        <span className="font-bold text-[#fde047]">{aggregateStats.economyScore}/100</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-[#1e293b] overflow-hidden">
                        <div
                          className="h-full bg-[#eab308] rounded-full transition-all"
                          style={{ width: `${aggregateStats.economyScore}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-mono text-[#cbd5e1] mb-0.5">
                        <span>Daya Gempur Militer</span>
                        <span className="font-bold text-[#4ade80]">{aggregateStats.militaryScore}/100</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-[#1e293b] overflow-hidden">
                        <div
                          className="h-full bg-[#22c55e] rounded-full transition-all"
                          style={{ width: `${aggregateStats.militaryScore}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-mono text-[#cbd5e1] mb-0.5">
                        <span>Ketahanan Stabilitas Dalam Negeri</span>
                        <span className="font-bold text-[#38bdf8]">{aggregateStats.stabilityScore}/100</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-[#1e293b] overflow-hidden">
                        <div
                          className="h-full bg-[#0ea5e9] rounded-full transition-all"
                          style={{ width: `${aggregateStats.stabilityScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* PROS & CONS COMPARATIVE BALANCE SHEET */}
                <div className="space-y-3">
                  {/* Kelebihan (Pros) Column */}
                  <div className="rounded-lg border border-[#16a34a]/40 bg-[#102419]/70 p-3 space-y-2">
                    <h5 className="font-mono text-xs font-bold uppercase text-[#4ade80] flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#22c55e]" />
                      Total Kelebihan &amp; Buffs ({aggregateStats.allPros.length})
                    </h5>
                    <ul className="space-y-1 text-xs text-[#bbf7d0]">
                      {aggregateStats.allPros.slice(0, 6).map((pro, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-[#22c55e] font-bold mt-0.5">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                      {aggregateStats.allPros.length > 6 && (
                        <li className="text-[11px] text-[#86efac]/70 italic pt-0.5">
                          + {aggregateStats.allPros.length - 6} kelebihan lainnya
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Kekurangan & Risiko (Cons) Column */}
                  <div className="rounded-lg border border-[#ef4444]/40 bg-[#2b1216]/70 p-3 space-y-2">
                    <h5 className="font-mono text-xs font-bold uppercase text-[#f87171] flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-[#ef4444]" />
                      Total Kekurangan &amp; Risiko ({aggregateStats.allCons.length})
                    </h5>
                    <ul className="space-y-1 text-xs text-[#fca5a5]">
                      {aggregateStats.allCons.slice(0, 6).map((con, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-1.5">
                          <span className="text-[#ef4444] font-bold mt-0.5">✕</span>
                          <span>{con}</span>
                        </li>
                      ))}
                      {aggregateStats.allCons.length > 6 && (
                        <li className="text-[11px] text-[#fca5a5]/70 italic pt-0.5">
                          + {aggregateStats.allCons.length - 6} konsekuensi/risiko lainnya
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* AI War Strategist Advice */}
                <div className="rounded-lg border border-[#f59e0b]/40 bg-[#261f14]/80 p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#fbbf24]">
                    <Sparkles className="h-4 w-4 text-[#f59e0b]" />
                    <span>Evaluasi Taktis Panglima Tertinggi:</span>
                  </div>
                  <p className="text-[11px] text-[#fde68a] leading-relaxed">
                    {aggregateStats.totalWorldTension >= 25 ? (
                      'Peringatan: Jalur ini menaikkan World Tension melampaui 25%. Kerajaan Inggris Raya dan Prancis kini diizinkan menjamin kemerdekaan (guarantee independence) negara manapun yang kamu justifikasi.'
                    ) : aggregateStats.extraResearchSlots >= 1 ? (
                      'Rekomendasi Bagus: Penambahan slot riset berhasil diamankan lebih awal. Segera kunci riset Industri Dasar (Dispersed Industry) dan varian Tank Utama.'
                    ) : (
                      'Saran: Pertimbangkan untuk memasukkan fokus yang membuka Slot Riset Ekstra lebih awal agar laju teknologi militer tidak tertinggal oleh kekuatan adidaya lain.'
                    )}
                  </p>
                </div>

                {/* Step-by-Step Focus Path Sequence */}
                <div className="space-y-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#64748b] block">
                    Urutan Pelaksanaan Jalur ({activeFocusObjects.length} Langkah):
                  </span>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {activeFocusObjects.map((focus, idx) => (
                      <div
                        key={focus.id}
                        className="flex items-center justify-between rounded-lg border border-[#1e2a38] bg-[#0d1620] px-2.5 py-1.5 text-xs text-[#cbd5e1]"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e2e40] font-mono text-[10px] font-bold text-[#38bdf8]">
                            {idx + 1}
                          </span>
                          <span className="font-medium text-[#f1f5f9] truncate">{focus.name}</span>
                        </div>
                        <button
                          onClick={() => handleToggleFocus(focus)}
                          className="text-[#94a3b8] hover:text-[#ef4444] text-[11px] px-1"
                          title="Hapus fokus ini dari urutan"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* Focus Inspection Modal / Drawer */}
      {inspectingFocus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-[#2b3e52] bg-[#111923] shadow-2xl shadow-black/80 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#1e2d3d] bg-gradient-to-r from-[#172433] to-[#111923] flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1e2e40] text-[#38bdf8] border border-[#38bdf8]/30">
                    TAG: {currentCountry.tag}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getBranchBadgeColor(inspectingFocus.branch)}`}>
                    {inspectingFocus.branch}
                  </span>
                  <span className="text-[10px] font-mono text-[#94a3b8] bg-[#0c141d] px-2 py-0.5 rounded border border-[#1e2a38]">
                    {inspectingFocus.days} Hari Pengerjaan
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#f8fafc] tracking-tight">
                  {inspectingFocus.name}
                </h3>
                {inspectingFocus.originalName && (
                  <div className="text-xs text-[#94a3b8] font-mono mt-0.5">
                    Nama Asli HOI4: {inspectingFocus.originalName}
                  </div>
                )}
              </div>

              <button
                onClick={() => setInspectingFocus(null)}
                className="rounded-lg p-2 text-[#94a3b8] hover:bg-[#1e2a38] hover:text-[#f8fafc] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
              {/* Summary */}
              <div className="rounded-lg border border-[#1e2d3d] bg-[#0c141d] p-3.5">
                <span className="font-mono text-[11px] font-bold uppercase text-[#64748b] block mb-1">
                  Ringkasan Mekanik Game:
                </span>
                <p className="text-xs text-[#e2e8f0] leading-relaxed">
                  {inspectingFocus.keyEffectsSummary}
                </p>
              </div>

              {/* Stats Delta Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center">
                <div className="rounded-lg border border-[#1e2a38] bg-[#121c27] p-2">
                  <div className="text-[10px] text-[#64748b] uppercase">Political Power</div>
                  <div className={`text-base font-bold ${
                    (inspectingFocus.statsDelta.politicalPower || 0) >= 0 ? 'text-[#38bdf8]' : 'text-[#f87171]'
                  }`}>
                    {(inspectingFocus.statsDelta.politicalPower || 0) > 0 ? '+' : ''}{inspectingFocus.statsDelta.politicalPower || 0} PP
                  </div>
                </div>

                <div className="rounded-lg border border-[#1e2a38] bg-[#121c27] p-2">
                  <div className="text-[10px] text-[#64748b] uppercase">Pabrik Sipil</div>
                  <div className="text-base font-bold text-[#fbbf24]">
                    +{(inspectingFocus.statsDelta.civFactories || 0)} Civs
                  </div>
                </div>

                <div className="rounded-lg border border-[#1e2a38] bg-[#121c27] p-2">
                  <div className="text-[10px] text-[#64748b] uppercase">Pabrik Militer</div>
                  <div className="text-base font-bold text-[#4ade80]">
                    +{(inspectingFocus.statsDelta.milFactories || 0)} Mils
                  </div>
                </div>

                <div className="rounded-lg border border-[#1e2a38] bg-[#121c27] p-2">
                  <div className="text-[10px] text-[#64748b] uppercase">World Tension</div>
                  <div className="text-base font-bold text-[#f43f5e]">
                    +{(inspectingFocus.statsDelta.worldTension || 0)}% WT
                  </div>
                </div>
              </div>

              {/* Pros and Cons Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-[#16a34a]/40 bg-[#102419]/80 p-4 space-y-2">
                  <h5 className="font-mono text-xs font-bold uppercase text-[#4ade80] flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#22c55e]" />
                    Kelebihan &amp; Keuntungan
                  </h5>
                  <ul className="space-y-1.5 text-xs text-[#bbf7d0]">
                    {inspectingFocus.pros.map((pro, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-[#22c55e] font-bold">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-[#ef4444]/40 bg-[#2b1216]/80 p-4 space-y-2">
                  <h5 className="font-mono text-xs font-bold uppercase text-[#f87171] flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-[#ef4444]" />
                    Kekurangan &amp; Risiko
                  </h5>
                  <ul className="space-y-1.5 text-xs text-[#fca5a5]">
                    {inspectingFocus.cons.map((con, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2">
                        <span className="text-[#ef4444] font-bold">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mutual Exclusivity and Timing */}
              <div className="space-y-2 text-xs">
                {inspectingFocus.mutuallyExclusive.length > 0 && (
                  <div className="rounded-lg border border-[#f59e0b]/40 bg-[#261f14] p-3 text-[#fef3c7]">
                    <strong className="text-[#fbbf24]">Mengunci Fokus Lain (Mutually Exclusive): </strong>
                    Jika kamu mengambil fokus ini, fokus berikut akan terkunci selamanya:{' '}
                    <span className="font-mono underline font-semibold">
                      {inspectingFocus.mutuallyExclusive.join(', ')}
                    </span>
                  </div>
                )}

                <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-3 text-[#cbd5e1]">
                  <strong className="text-[#38bdf8]">Waktu Ideal Pengambilan: </strong>
                  {inspectingFocus.recommendedTiming}
                </div>

                {inspectingFocus.historicalContext && (
                  <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-3 text-[#94a3b8]">
                    <strong className="text-[#f1f5f9]">Konteks Sejarah PD II: </strong>
                    {inspectingFocus.historicalContext}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#1e2d3d] bg-[#0d151f] flex items-center justify-between">
              <button
                onClick={() => setInspectingFocus(null)}
                className="rounded-lg border border-[#334155] bg-[#16202c] px-4 py-2 text-xs font-semibold text-[#cbd5e1] hover:text-[#f8fafc]"
              >
                Tutup
              </button>

              <button
                onClick={() => {
                  handleToggleFocus(inspectingFocus);
                  setInspectingFocus(null);
                }}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  activeFocusIds.includes(inspectingFocus.id)
                    ? 'border border-[#ef4444]/60 bg-[#2b1416] text-[#fca5a5] hover:bg-[#3d1a1e]'
                    : 'border border-[#10b981]/60 bg-[#122c22] text-[#a7f3d0] hover:bg-[#18392c]'
                }`}
              >
                {activeFocusIds.includes(inspectingFocus.id)
                  ? 'Batalkan Pilihan Fokus Ini'
                  : 'Pilih & Tambahkan ke Kalkulator'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
