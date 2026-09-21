import React, { useState, useMemo, useEffect } from 'react';
import {
  GitBranch, Check, Clock, Lock, Sparkles, Filter,
  Search, Shield, Users, Plane, Anchor, Factory, Cpu,
  Download, Upload, RotateCcw, AlertTriangle, ArrowRight,
  Zap, Star, Award, Layers, ChevronRight, CheckCircle2
} from 'lucide-react';
import { TechBranch, TechItem } from '../types';
import { TECH_BRANCHES, TECH_TREE_DATA, HISTORICAL_TECH_PRESETS } from '../data/techTreeData';

interface TechTreeViewerProps {
  searchQuery: string;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: { id: string; type: 'tech'; title: string; subtitle: string; tag: string }) => void;
}

export const TechTreeViewer: React.FC<TechTreeViewerProps> = ({
  searchQuery,
  isFavorite,
  toggleFavorite
}) => {
  const [selectedBranch, setSelectedBranch] = useState<TechBranch | 'all'>('infantry');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [activePresetId, setActivePresetId] = useState<string>('preset-ger-1939');
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [slotCount, setSlotCount] = useState<number>(4);

  // Researched IDs persisted to localStorage
  const [researchedIds, setResearchedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hoi4_researched_techs');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    const defaultPreset = HISTORICAL_TECH_PRESETS.find(p => p.id === 'preset-ger-1939');
    return defaultPreset ? defaultPreset.researchedIds : [];
  });

  // Active in-progress research slots (max 5)
  const [activeSlots, setActiveSlots] = useState<{ slotIndex: number; techId: string; progressDays: number }[]>(() => {
    try {
      const saved = localStorage.getItem('hoi4_active_research_slots');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { slotIndex: 0, techId: 'tech-armor-medium-2', progressDays: 45 },
      { slotIndex: 1, techId: 'tech-air-small-2', progressDays: 70 },
      { slotIndex: 2, techId: 'tech-ind-tools-3', progressDays: 90 },
      { slotIndex: 3, techId: 'tech-eng-computing-2', progressDays: 120 }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('hoi4_researched_techs', JSON.stringify(researchedIds));
    } catch (e) {
      console.error(e);
    }
  }, [researchedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('hoi4_active_research_slots', JSON.stringify(activeSlots));
    } catch (e) {
      console.error(e);
    }
  }, [activeSlots]);

  // Combined search term
  const effectiveSearch = (searchQuery || localSearch).trim().toLowerCase();

  // Filtered Techs
  const filteredTechs = useMemo(() => {
    return TECH_TREE_DATA.filter(tech => {
      if (selectedBranch !== 'all' && tech.branch !== selectedBranch) {
        return false;
      }
      if (selectedYear !== 'all' && tech.year.toString() !== selectedYear) {
        return false;
      }
      if (effectiveSearch) {
        const matchName = tech.name.toLowerCase().includes(effectiveSearch);
        const matchOriginal = tech.originalName ? tech.originalName.toLowerCase().includes(effectiveSearch) : false;
        const matchDesc = tech.description.toLowerCase().includes(effectiveSearch);
        const matchEq = tech.unlocksEquipment?.some(eq => eq.toLowerCase().includes(effectiveSearch));
        const matchStats = tech.bonuses?.some(b => (b.label + ' ' + b.value).toLowerCase().includes(effectiveSearch));
        return matchName || matchOriginal || matchDesc || matchEq || matchStats;
      }
      return true;
    });
  }, [selectedBranch, selectedYear, effectiveSearch]);

  // Stats calculation
  const statsSummary = useMemo(() => {
    const total = TECH_TREE_DATA.length;
    const researched = researchedIds.length;
    const inProgress = activeSlots.length;
    const percent = Math.round((researched / total) * 100);

    // Compute active research speed buff from computing machines
    let researchSpeedBonus = 0;
    if (researchedIds.includes('tech-eng-computing-1')) researchSpeedBonus += 5;
    if (researchedIds.includes('tech-eng-computing-2')) researchSpeedBonus += 5;
    if (researchedIds.includes('tech-eng-computing-3')) researchSpeedBonus += 8;

    return {
      total,
      researched,
      inProgress,
      percent,
      researchSpeedBonus
    };
  }, [researchedIds, activeSlots]);

  const toggleResearched = (id: string) => {
    setResearchedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(t => t !== id);
      } else {
        // Also remove from active slots if researched
        setActiveSlots(slots => slots.filter(s => s.techId !== id));
        return [...prev, id];
      }
    });
  };

  const assignToSlot = (techId: string, slotIndex: number) => {
    // If tech is already researched, un-research it or keep as researching
    setResearchedIds(prev => prev.filter(t => t !== techId));
    setActiveSlots(prev => {
      const filtered = prev.filter(s => s.slotIndex !== slotIndex && s.techId !== techId);
      return [...filtered, { slotIndex, techId, progressDays: 0 }];
    });
  };

  const removeFromSlot = (slotIndex: number) => {
    setActiveSlots(prev => prev.filter(s => s.slotIndex !== slotIndex));
  };

  const loadPreset = (presetId: string) => {
    const preset = HISTORICAL_TECH_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    setActivePresetId(presetId);
    setResearchedIds(preset.researchedIds);
  };

  const clearAllResearch = () => {
    if (window.confirm('Reset semua progres riset teknologi ke 0?')) {
      setResearchedIds([]);
      setActiveSlots([]);
    }
  };

  const exportTechProgressJSON = () => {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      researchedTechIds: researchedIds,
      activeSlots,
      slotCount
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `hoi4_tech_tree_progress_${Date.now()}.json`);
    dl.click();
  };

  const importTechProgressJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (Array.isArray(parsed.researchedTechIds)) {
          setResearchedIds(parsed.researchedTechIds);
          if (Array.isArray(parsed.activeSlots)) setActiveSlots(parsed.activeSlots);
          if (typeof parsed.slotCount === 'number') setSlotCount(parsed.slotCount);
          alert(`Sukses mengimpor ${parsed.researchedTechIds.length} teknologi!`);
        }
      } catch (err) {
        alert('File JSON tidak valid.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  // Check if prerequisites are satisfied
  const checkPrerequisites = (tech: TechItem) => {
    if (!tech.prerequisites || tech.prerequisites.length === 0) {
      return { satisfied: true, missing: [] };
    }
    const missing = tech.prerequisites.filter(reqId => !researchedIds.includes(reqId));
    return {
      satisfied: missing.length === 0,
      missing
    };
  };

  const getBranchIcon = (branch: TechBranch) => {
    switch (branch) {
      case 'infantry': return <Users className="h-4 w-4" />;
      case 'armor': return <Shield className="h-4 w-4" />;
      case 'air': return <Plane className="h-4 w-4" />;
      case 'naval': return <Anchor className="h-4 w-4" />;
      case 'industry': return <Factory className="h-4 w-4" />;
      case 'engineering': return <Cpu className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* WW2 Old Classic Command Header Banner */}
      <div className="relative overflow-hidden rounded-xl border-2 border-[#b8860b]/60 bg-gradient-to-r from-[#171f1b] via-[#121a16] to-[#0f1412] p-5 md:p-6 shadow-2xl">
        {/* Retro Grid & Stencil Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#b8860b10_1px,transparent_1px),linear-gradient(to_bottom,#b8860b10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <GitBranch className="h-64 w-64 text-[#d97706]" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="rounded border border-[#b8860b]/70 bg-[#78350f]/30 px-2.5 py-0.5 text-xs font-mono font-bold tracking-widest text-[#fde047] uppercase">
                ★ DEPARTEMEN RISET &amp; TEKNOLOGI PD II ★
              </span>
              <span className="text-xs font-mono text-[#94a3b8] flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-[#fbbf24]" />
                Kecepatan Riset: <strong className="text-[#34d399]">+{10 + statsSummary.researchSpeedBonus}%</strong>
              </span>
            </div>
            <h2 className="mt-1.5 font-serif text-2xl md:text-3xl font-black tracking-tight text-[#fef3c7] uppercase drop-shadow">
              Pohon Riset Teknologi (Tech Tree Viewer)
            </h2>
            <p className="mt-1 text-xs md:text-sm text-[#cbd5e1] max-w-2xl leading-relaxed">
              Visualisasi interaktif 6 cabang riset militer, prasyarat teknologi (prerequisites), pelacakan slot riset aktif, bonus senjata, dan preset historis Perang Dunia II.
            </p>
          </div>

          {/* Action Tools & Import/Export */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={exportTechProgressJSON}
              title="Ekspor progres riset ke file JSON"
              className="flex items-center gap-1.5 rounded-lg border border-[#b8860b]/50 bg-[#251f14] px-3 py-2 text-xs font-medium text-[#fde047] hover:bg-[#382d18] transition-all shadow"
            >
              <Download className="h-3.5 w-3.5 text-[#f59e0b]" />
              <span>Ekspor Riset</span>
            </button>

            <label className="flex items-center gap-1.5 rounded-lg border border-[#3b82f6]/50 bg-[#16253b] px-3 py-2 text-xs font-medium text-[#93c5fd] hover:bg-[#1d3557] cursor-pointer transition-all shadow">
              <Upload className="h-3.5 w-3.5 text-[#60a5fa]" />
              <span>Impor Riset</span>
              <input
                type="file"
                accept=".json"
                onChange={importTechProgressJSON}
                className="hidden"
              />
            </label>

            <button
              onClick={clearAllResearch}
              title="Reset seluruh progres riset"
              className="flex items-center gap-1.5 rounded-lg border border-[#ef4444]/40 bg-[#2b1414] px-3 py-2 text-xs font-medium text-[#fca5a5] hover:bg-[#3d1a1a] transition-all shadow"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#ef4444]" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Progress Metrics & Historical Presets */}
        <div className="relative z-10 mt-5 pt-4 border-t border-[#b8860b]/30 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-[#cbd5e1]">
              <span>Progres Riset Nasional:</span>
              <strong className="text-[#fde047]">{statsSummary.researched} / {statsSummary.total} ({statsSummary.percent}%)</strong>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#0a0f0d] border border-[#b8860b]/40">
              <div
                className="h-full bg-gradient-to-r from-[#d97706] via-[#10b981] to-[#34d399] transition-all duration-500 rounded-full"
                style={{ width: `${statsSummary.percent}%` }}
              />
            </div>
          </div>

          {/* Preset Selector */}
          <div className="flex items-center gap-2 md:col-span-2 justify-start md:justify-end flex-wrap">
            <span className="text-xs font-mono text-[#94a3b8]">Preset Sejarah:</span>
            {HISTORICAL_TECH_PRESETS.map(p => (
              <button
                key={p.id}
                onClick={() => loadPreset(p.id)}
                className={`rounded border px-2.5 py-1 text-[11px] font-mono transition-all ${
                  activePresetId === p.id
                    ? 'border-[#f59e0b] bg-[#3b2b13] text-[#fde047] font-bold shadow'
                    : 'border-[#2d3a33] bg-[#141d18] text-[#94a3b8] hover:text-[#f8fafc] hover:border-[#64748b]'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Research Slots (3 to 5 Slots) */}
      <div className="rounded-xl border border-[#2b3a32] bg-[#101713] p-4 shadow-lg">
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#f59e0b]" />
            <h3 className="font-serif text-sm md:text-base font-bold text-[#f1f5f9] uppercase tracking-wide">
              Slot Riset Aktif ({activeSlots.length} / {slotCount})
            </h3>
            <span className="text-[11px] font-mono text-[#64748b]">Buka lebih banyak slot lewat Fokus Nasional</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono">
            <span className="text-[#94a3b8]">Kapasitas Slot:</span>
            {[3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => setSlotCount(n)}
                className={`px-2 py-0.5 rounded border ${
                  slotCount === n
                    ? 'border-[#f59e0b] bg-[#382b14] text-[#fbbf24] font-bold'
                    : 'border-[#223028] bg-[#16211a] text-[#94a3b8]'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {Array.from({ length: slotCount }).map((_, idx) => {
            const slotItem = activeSlots.find(s => s.slotIndex === idx);
            const tech = slotItem ? TECH_TREE_DATA.find(t => t.id === slotItem.techId) : null;
            const progressPercent = tech ? Math.min(100, Math.round((slotItem!.progressDays / tech.baseDays) * 100)) : 0;

            return (
              <div
                key={idx}
                className={`relative rounded-lg border p-3 transition-all ${
                  tech
                    ? 'border-[#f59e0b]/60 bg-[#1a231d] shadow-sm'
                    : 'border-dashed border-[#2b3b30] bg-[#0c120f]/60'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span className="text-[#b8860b] font-bold">SLOT #{idx + 1}</span>
                  {tech && (
                    <button
                      onClick={() => removeFromSlot(idx)}
                      className="text-[#94a3b8] hover:text-[#ef4444] px-1 text-[10px]"
                      title="Batalkan alokasi slot"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {tech ? (
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-1.5">
                      <div>
                        <div className="text-xs font-bold text-[#fef3c7] line-clamp-1">{tech.name}</div>
                        <div className="text-[10px] text-[#94a3b8] font-mono">{tech.year} • {tech.baseDays} Hari</div>
                      </div>
                      <span className="shrink-0 text-xs text-[#f59e0b]">
                        {getBranchIcon(tech.branch)}
                      </span>
                    </div>

                    {/* Slot Progress Bar */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[10px] font-mono text-[#cbd5e1]">
                        <span>{slotItem?.progressDays} hari</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#0a0f0d] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#f59e0b] rounded-full transition-all"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => toggleResearched(tech.id)}
                      className="w-full flex items-center justify-center gap-1 rounded bg-[#10b981]/20 border border-[#10b981]/40 py-1 text-[10px] font-semibold text-[#6ee7b7] hover:bg-[#10b981]/30 transition-all"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Selesaikan Riset</span>
                    </button>
                  </div>
                ) : (
                  <div className="py-4 text-center">
                    <span className="text-xs text-[#64748b] block">Slot Kosong</span>
                    <span className="text-[10px] text-[#475569]">Pilih teknologi di bawah untuk memulai</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Branch & Year Navigation Filter Bar */}
      <div className="space-y-3">
        {/* Category Branches */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedBranch('all')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedBranch === 'all'
                ? 'border border-[#b8860b] bg-[#342713] text-[#fde047] shadow'
                : 'border border-[#223028] bg-[#121a15] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Semua Cabang ({TECH_TREE_DATA.length})</span>
          </button>

          {TECH_BRANCHES.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBranch(b.id)}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedBranch === b.id
                  ? 'border border-[#b8860b] bg-[#342713] text-[#fde047] shadow'
                  : 'border border-[#223028] bg-[#121a15] text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              {getBranchIcon(b.id)}
              <span>{b.name}</span>
            </button>
          ))}
        </div>

        {/* Secondary Filter: Year & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d1410] border border-[#202d24] rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <span className="text-xs font-mono text-[#64748b] px-1">Tahun:</span>
            {['all', '1936', '1938', '1939', '1940', '1941', '1942', '1943', '1944'].map(yr => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`rounded px-2.5 py-1 text-xs font-mono transition-colors ${
                  selectedYear === yr
                    ? 'bg-[#b8860b]/30 border border-[#b8860b] text-[#fef08a] font-bold'
                    : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                {yr === 'all' ? 'Semua' : yr}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Cari tank, nuklir, radar..."
              className="w-full rounded border border-[#243329] bg-[#121a15] py-1.5 pl-8 pr-3 text-xs text-[#f1f5f9] placeholder-[#64748b] outline-none focus:border-[#d97706]"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Tech Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTechs.map(tech => {
          const isDone = researchedIds.includes(tech.id);
          const isSlotActive = activeSlots.some(s => s.techId === tech.id);
          const { satisfied, missing } = checkPrerequisites(tech);
          const isFav = isFavorite(tech.id);

          return (
            <div
              key={tech.id}
              className={`group relative rounded-xl border p-4 transition-all hover:shadow-xl ${
                isDone
                  ? 'border-[#10b981]/60 bg-gradient-to-b from-[#122319] to-[#0c1811] shadow-sm'
                  : isSlotActive
                  ? 'border-[#f59e0b] bg-gradient-to-b from-[#292011] to-[#17130a] ring-1 ring-[#f59e0b]/50'
                  : !satisfied
                  ? 'border-[#26332a] bg-[#0c120e] opacity-75'
                  : 'border-[#243328] bg-[#111914] hover:border-[#b8860b]/70'
              }`}
            >
              {/* Header with status badges */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[#b8860b]/40 bg-[#1e2b22] text-[#fde047]">
                    {getBranchIcon(tech.branch)}
                  </span>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#f8fafc] leading-snug group-hover:text-[#fde047] transition-colors">
                      {tech.name}
                    </h4>
                    <span className="text-[11px] font-mono text-[#94a3b8]">
                      {tech.originalName} • {tech.year}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleFavorite({
                      id: tech.id,
                      type: 'tech',
                      title: tech.name,
                      subtitle: `${tech.year} • ${tech.branch.toUpperCase()}`,
                      tag: 'Riset'
                    })}
                    className="p-1 text-[#64748b] hover:text-[#eab308] transition-colors"
                    title={isFav ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                  >
                    <Star className={`h-4 w-4 ${isFav ? 'fill-[#eab308] text-[#eab308]' : ''}`} />
                  </button>

                  <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border ${
                    isDone
                      ? 'border-[#10b981] bg-[#10b981]/20 text-[#6ee7b7]'
                      : isSlotActive
                      ? 'border-[#f59e0b] bg-[#f59e0b]/20 text-[#fde047] animate-pulse'
                      : !satisfied
                      ? 'border-[#ef4444]/50 bg-[#ef4444]/10 text-[#fca5a5]'
                      : 'border-[#475569] bg-[#1e293b]/40 text-[#94a3b8]'
                  }`}>
                    {isDone ? 'SELESAI' : isSlotActive ? 'RISET AKTIF' : !satisfied ? 'TERKUNCI' : 'TERSEDIA'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-2.5 text-xs text-[#cbd5e1] leading-relaxed line-clamp-2">
                {tech.description}
              </p>

              {/* Stat Bonuses / Unlocked Equipment */}
              <div className="mt-3 space-y-1.5">
                {tech.bonuses && tech.bonuses.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {tech.bonuses.map((sb, i) => (
                      <span key={i} className="rounded bg-[#1a2b20] border border-[#2d4233] px-2 py-0.5 text-[10px] font-mono text-[#86efac]">
                        {sb.label}: {sb.value}
                      </span>
                    ))}
                  </div>
                )}

                {tech.unlocksEquipment && tech.unlocksEquipment.length > 0 && (
                  <div className="flex items-center gap-1 text-[11px] text-[#fbbf24] font-mono">
                    <Sparkles className="h-3 w-3 shrink-0" />
                    <span className="truncate">Membuka: {tech.unlocksEquipment.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Prerequisites Indicator */}
              {!satisfied && missing.length > 0 && (
                <div className="mt-2.5 rounded border border-[#ef4444]/30 bg-[#241010] p-1.5 text-[10px] font-mono text-[#fca5a5] flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-[#ef4444] shrink-0" />
                  <span>Butuh Riset: {missing.join(', ')}</span>
                </div>
              )}

              {/* Card Footer: Toggle Researched or Assign to Slot */}
              <div className="mt-4 pt-3 border-t border-[#1f2d24] flex items-center justify-between gap-2">
                <button
                  onClick={() => toggleResearched(tech.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                    isDone
                      ? 'border border-[#10b981]/60 bg-[#10b981]/20 text-[#6ee7b7] hover:bg-[#10b981]/30'
                      : 'border border-[#3b82f6]/40 bg-[#16253b] text-[#93c5fd] hover:bg-[#1f375b]'
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>{isDone ? 'Tandai Belum' : 'Tandai Selesai'}</span>
                </button>

                {!isDone && (
                  <button
                    onClick={() => {
                      // Find first free slot or replace slot 0
                      const freeSlot = Array.from({ length: slotCount }).findIndex((_, idx) => !activeSlots.some(s => s.slotIndex === idx));
                      assignToSlot(tech.id, freeSlot !== -1 ? freeSlot : 0);
                    }}
                    title="Tugaskan ke slot riset aktif"
                    className="flex items-center gap-1 rounded-lg border border-[#f59e0b]/50 bg-[#291f11] px-2.5 py-1.5 text-xs font-medium text-[#fde047] hover:bg-[#3d2e18] transition-all"
                  >
                    <Clock className="h-3.5 w-3.5" />
                    <span>Slot</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedTech(tech)}
                  className="rounded-lg border border-[#243328] bg-[#141e18] px-2.5 py-1.5 text-xs text-[#cbd5e1] hover:text-[#f8fafc] hover:bg-[#1e2c23] transition-all"
                  title="Lihat detail teknologi"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Detail Teknologi */}
      {selectedTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-xl border-2 border-[#b8860b] bg-[#121a15] p-6 shadow-2xl text-[#d8e2ea]">
            <button
              onClick={() => setSelectedTech(null)}
              className="absolute right-4 top-4 text-sm text-[#94a3b8] hover:text-white p-1"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#b8860b]/60 bg-[#241d13] text-[#fde047]">
                {getBranchIcon(selectedTech.branch)}
              </span>
              <div>
                <span className="text-xs font-mono text-[#b8860b] uppercase tracking-wider">
                  {selectedTech.branch.toUpperCase()} • TAHUN {selectedTech.year}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#fef3c7]">
                  {selectedTech.name}
                </h3>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs leading-relaxed text-[#cbd5e1]">
              <p>{selectedTech.description}</p>

              <div className="rounded-lg border border-[#243328] bg-[#0c120e] p-3 space-y-2">
                <div className="text-xs font-mono font-bold text-[#fde047]">DATA TEKNIS:</div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>Waktu Riset Dasar: <strong>{selectedTech.baseDays} Hari</strong></div>
                  <div>ID Internal: <code>{selectedTech.id}</code></div>
                </div>

                {selectedTech.bonuses && selectedTech.bonuses.length > 0 && (
                  <div className="pt-2 border-t border-[#1e2a22]">
                    <div className="text-xs font-mono text-[#86efac] mb-1">MODIFIKATOR BONUS:</div>
                    <ul className="list-disc pl-4 space-y-1">
                      {selectedTech.bonuses.map((sb, i) => (
                        <li key={i}>{sb.label}: {sb.value}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedTech.unlocksEquipment && (
                  <div className="pt-2 border-t border-[#1e2a22]">
                    <div className="text-xs font-mono text-[#fbbf24] mb-1">PERALATAN DIBUKA:</div>
                    <div>{selectedTech.unlocksEquipment.join(', ')}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  toggleResearched(selectedTech.id);
                  setSelectedTech(null);
                }}
                className="rounded-lg border border-[#10b981] bg-[#10b981]/20 px-4 py-2 text-xs font-bold text-[#6ee7b7] hover:bg-[#10b981]/30 transition-all"
              >
                {researchedIds.includes(selectedTech.id) ? 'Batalkan Status Selesai' : 'Tandai Selesai Riset'}
              </button>
              <button
                onClick={() => setSelectedTech(null)}
                className="rounded-lg border border-[#334155] bg-[#1e293b] px-4 py-2 text-xs font-medium text-[#cbd5e1] hover:text-white"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
