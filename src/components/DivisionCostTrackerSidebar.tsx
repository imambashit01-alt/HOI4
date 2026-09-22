import React, { useState, useMemo } from 'react';
import {
  Users, Award, Zap, ArrowRight, Check, Shield, Swords,
  Coins, Filter, ChevronRight, BarChart2, Info, Sparkles, Scale
} from 'lucide-react';
import { DIVISION_PRESETS } from '../data/divisionData';
import { DivisionCombatStats } from './CombatCalculator';

interface DivisionCostTrackerSidebarProps {
  onLoadTemplate: (stats: DivisionCombatStats, name: string) => void;
  activeCombatStats?: DivisionCombatStats;
  className?: string;
}

export interface DivisionCostEntry {
  id: string;
  name: string;
  role: string;
  combatWidth: number;
  manpower: number;
  armyXpCost: number; // XP to design/modify in division designer
  icCost: number;
  stats: {
    softAttack: number;
    hardAttack: number;
    breakthrough: number;
    defense: number;
    organization: number;
    armor: number;
    piercing: number;
    hardness: number;
    hp: number;
  };
  efficiency: {
    softAttackPer1kManpower: number;
    breakthroughPerXp: number;
    defensePerIc: number;
    overallMetaScore: number;
  };
}

export const DivisionCostTrackerSidebar: React.FC<DivisionCostTrackerSidebarProps> = ({
  onLoadTemplate,
  activeCombatStats,
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'meta' | 'manpower' | 'xp' | 'attack'>('meta');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(DIVISION_PRESETS[0]?.id || '');

  // Calculate detailed costs and combat efficiency ratios
  const divisionEntries: DivisionCostEntry[] = useMemo(() => {
    return DIVISION_PRESETS.map((preset, idx) => {
      // Estimate manpower
      const manpower = preset.battalions.reduce((acc, b) => {
        let perUnit = 1000; // infantry standard
        if (b.iconType.includes('tank') || b.iconType.includes('armor')) perUnit = 500;
        else if (b.iconType.includes('artillery')) perUnit = 500;
        else if (b.iconType.includes('anti')) perUnit = 500;
        else if (b.iconType.includes('motorized')) perUnit = 1200;
        else if (b.iconType.includes('cavalry')) perUnit = 1000;
        return acc + (b.count * perUnit);
      }, preset.supportCompanies.length * 300);

      // Estimate Army XP Cost in Division Designer:
      // Base creation: 20 XP. Each battalion slot modified: +5 XP. Each support company: +10 XP.
      const totalBattalionsCount = preset.battalions.reduce((sum, b) => sum + b.count, 0);
      const armyXpCost = Math.min(85, Math.max(15, (totalBattalionsCount * 4) + (preset.supportCompanies.length * 8) - 10));

      const icCost = parseInt(preset.stats.costIC.replace(/,/g, ''), 10) || 750;
      const softAttack = preset.stats.softAttack;
      const hardAttack = preset.stats.hardAttack;
      const breakthrough = preset.stats.breakthrough;
      const defense = preset.stats.defense;
      const organization = preset.stats.organization;
      const armor = preset.stats.armor || 0;
      const piercing = preset.stats.piercing || 10;
      const hardness = preset.role.toLowerCase().includes('tank') || preset.role.toLowerCase().includes('armor') ? 50 : 0;
      const hp = preset.battalions.reduce((sum, b) => sum + (b.count * 20), 100);

      const softAttackPer1kManpower = Number(((softAttack / (manpower / 1000))).toFixed(1));
      const breakthroughPerXp = Number(((breakthrough / Math.max(1, armyXpCost))).toFixed(2));
      const defensePerIc = Number(((defense / Math.max(1, icCost)) * 100).toFixed(1));
      const overallMetaScore = Math.round(
        (softAttack * 0.4) + (defense * 0.25) + (breakthrough * 0.25) + (organization * 0.8) - (armyXpCost * 0.5)
      );

      return {
        id: preset.id,
        name: preset.name,
        role: preset.role,
        combatWidth: preset.combatWidth,
        manpower,
        armyXpCost,
        icCost,
        stats: {
          softAttack,
          hardAttack,
          breakthrough,
          defense,
          organization,
          armor,
          piercing,
          hardness,
          hp
        },
        efficiency: {
          softAttackPer1kManpower,
          breakthroughPerXp,
          defensePerIc,
          overallMetaScore
        }
      };
    });
  }, []);

  const filteredEntries = useMemo(() => {
    return divisionEntries.filter(entry => {
      if (selectedCategory === 'infantry') return entry.role.toLowerCase().includes('infanteri') || entry.role.toLowerCase().includes('garrison');
      if (selectedCategory === 'armor') return entry.role.toLowerCase().includes('tank') || entry.role.toLowerCase().includes('armor') || entry.role.toLowerCase().includes('spearhead');
      if (selectedCategory === 'special') return entry.role.toLowerCase().includes('khusus') || entry.role.toLowerCase().includes('marine') || entry.role.toLowerCase().includes('mountain');
      return true;
    }).sort((a, b) => {
      if (sortBy === 'manpower') return a.manpower - b.manpower;
      if (sortBy === 'xp') return a.armyXpCost - b.armyXpCost;
      if (sortBy === 'attack') return b.stats.softAttack - a.stats.softAttack;
      return b.efficiency.overallMetaScore - a.efficiency.overallMetaScore;
    });
  }, [divisionEntries, selectedCategory, sortBy]);

  const activeEntry = useMemo(() => {
    return divisionEntries.find(e => e.id === selectedTemplateId) || divisionEntries[0];
  }, [divisionEntries, selectedTemplateId]);

  const handleApplyTemplate = (entry: DivisionCostEntry) => {
    setSelectedTemplateId(entry.id);
    onLoadTemplate({
      name: entry.name,
      count: 2,
      softAttack: entry.stats.softAttack,
      hardAttack: entry.stats.hardAttack,
      breakthrough: entry.stats.breakthrough,
      organization: entry.stats.organization,
      defense: entry.stats.defense,
      armor: entry.stats.armor,
      piercing: entry.stats.piercing,
      hardness: entry.stats.hardness,
      hp: entry.stats.hp,
      combatWidth: entry.combatWidth
    }, entry.name);
  };

  return (
    <div className={`flex flex-col rounded-xl border border-[#2b3a32] bg-[#0d1410] text-[#f1f5f9] shadow-xl ${className}`}>
      {/* Sidebar Header */}
      <div className="p-3.5 border-b border-[#223028] bg-gradient-to-r from-[#17221b] to-[#0f1712]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <Scale className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-serif font-bold text-[#fef3c7] uppercase tracking-wider">
                Penyeimbang Biaya Divisi
              </h4>
              <p className="text-[10px] text-[#94a3b8] font-mono">
                Manpower &amp; Army XP vs. Hasil Tempur
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-[#141d18] border border-[#223028] px-2 py-0.5 rounded text-amber-300 font-bold">
            {divisionEntries.length} Template
          </span>
        </div>

        {/* Quick Filter & Sort Controls */}
        <div className="flex items-center gap-1.5 mt-3 text-[10px] font-mono">
          <div className="flex bg-[#0c120e] p-0.5 rounded-md border border-[#223028] flex-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex-1 py-1 rounded text-center transition-colors ${selectedCategory === 'all' ? 'bg-[#b8860b]/30 text-amber-200 font-bold' : 'text-[#94a3b8] hover:text-white'}`}
            >
              Semua
            </button>
            <button
              onClick={() => setSelectedCategory('infantry')}
              className={`flex-1 py-1 rounded text-center transition-colors ${selectedCategory === 'infantry' ? 'bg-[#b8860b]/30 text-amber-200 font-bold' : 'text-[#94a3b8] hover:text-white'}`}
            >
              Infanteri
            </button>
            <button
              onClick={() => setSelectedCategory('armor')}
              className={`flex-1 py-1 rounded text-center transition-colors ${selectedCategory === 'armor' ? 'bg-[#b8860b]/30 text-amber-200 font-bold' : 'text-[#94a3b8] hover:text-white'}`}
            >
              Lapis Baja
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded border border-[#223028] bg-[#0c120e] px-1.5 py-1 text-[10px] text-[#cbd5e1] outline-none"
          >
            <option value="meta">Sort: Skor Meta</option>
            <option value="manpower">Sort: Manpower Termurah</option>
            <option value="xp">Sort: Army XP Termurah</option>
            <option value="attack">Sort: Soft Attack</option>
          </select>
        </div>
      </div>

      {/* Selected Template Quick Metrics Hero */}
      {activeEntry && (
        <div className="p-3 bg-[#111a14] border-b border-[#223028] text-xs font-mono space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-300 truncate max-w-[200px]" title={activeEntry.name}>
              {activeEntry.name}
            </span>
            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
              {activeEntry.combatWidth}W
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded-lg bg-[#0c120e] border border-[#223028] flex items-center justify-between">
              <span className="text-[#94a3b8] flex items-center gap-1">
                <Users className="h-3 w-3 text-sky-400" /> Manpower:
              </span>
              <span className="font-bold text-sky-300">{activeEntry.manpower.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#0c120e] border border-[#223028] flex items-center justify-between">
              <span className="text-[#94a3b8] flex items-center gap-1">
                <Award className="h-3 w-3 text-emerald-400" /> Army XP:
              </span>
              <span className="font-bold text-emerald-300">{activeEntry.armyXpCost} XP</span>
            </div>
          </div>

          {/* Efficiency Ratios */}
          <div className="p-2 rounded-lg bg-[#142018] border border-[#1e2e23] space-y-1 text-[10px]">
            <div className="flex justify-between text-[#cbd5e1]">
              <span>Soft Attack / 1k Manpower:</span>
              <strong className="text-amber-400 font-mono">{activeEntry.efficiency.softAttackPer1kManpower}</strong>
            </div>
            <div className="flex justify-between text-[#cbd5e1]">
              <span>Breakthrough / Army XP:</span>
              <strong className="text-emerald-400 font-mono">{activeEntry.efficiency.breakthroughPerXp}</strong>
            </div>
            <div className="flex justify-between text-[#cbd5e1]">
              <span>Biaya Industri (IC):</span>
              <strong className="text-[#94a3b8] font-mono">{activeEntry.icCost.toLocaleString()} IC</strong>
            </div>
          </div>

          <button
            onClick={() => handleApplyTemplate(activeEntry)}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-amber-500/50 bg-gradient-to-r from-amber-600/30 to-amber-700/30 text-amber-200 hover:from-amber-600/50 hover:to-amber-700/50 transition-all font-bold text-xs shadow"
          >
            <span>Terapkan ke Kalkulator Tempur</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Scrollable Templates List */}
      <div className="flex-1 overflow-y-auto max-h-[380px] p-2 space-y-1.5 divide-y divide-[#1e2a22]">
        {filteredEntries.map(entry => {
          const isSelected = entry.id === selectedTemplateId;
          return (
            <div
              key={entry.id}
              onClick={() => setSelectedTemplateId(entry.id)}
              className={`p-2.5 rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? 'bg-amber-500/20 border border-amber-500/50 text-amber-100 shadow'
                  : 'hover:bg-[#141d18] text-[#cbd5e1]'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold truncate max-w-[180px] text-[#f1f5f9]">
                  {entry.name}
                </span>
                <span className="text-[10px] font-mono text-amber-400 font-semibold">
                  {entry.combatWidth}w
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-[#94a3b8] mt-1.5">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-sky-400" /> {entry.manpower.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="h-3 w-3 text-emerald-400" /> {entry.armyXpCost} XP
                </span>
                <span className="text-[#38bdf8]">
                  SA: {entry.stats.softAttack}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Pro Tip */}
      <div className="p-2.5 border-t border-[#223028] bg-[#0c120e] text-[10px] font-mono text-[#94a3b8] flex items-center gap-1.5">
        <Info className="h-3.5 w-3.5 text-amber-400 shrink-0" />
        <span>Gunakan rasio Manpower/XP untuk menyeimbangkan efisiensi perang berkelanjutan.</span>
      </div>
    </div>
  );
};
