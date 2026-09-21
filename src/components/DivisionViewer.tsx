import React, { useState } from 'react';
import {
  Shield, Plus, Trash2, Copy, Check, Star, RefreshCw,
  Zap, Info, Target, AlertCircle
} from 'lucide-react';
import { DivisionPreset } from '../types';
import {
  DIVISION_PRESETS,
  BATTALION_CATALOGUE,
  SUPPORT_COMPANIES_DATA,
  BattalionOption
} from '../data/divisionData';

interface DivisionViewerProps {
  searchQuery: string;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: { id: string; type: 'division'; title: string; subtitle: string; tag: string }) => void;
}

export const DivisionViewer: React.FC<DivisionViewerProps> = ({
  searchQuery,
  isFavorite,
  toggleFavorite
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'presets' | 'calculator'>('presets');
  const [selectedRole, setSelectedRole] = useState<string>('Semua');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Calculator State
  const [selectedBattalions, setSelectedBattalions] = useState<{ battalionId: string; count: number }[]>([
    { battalionId: 'infantry', count: 9 },
    { battalionId: 'line_artillery', count: 1 }
  ]);
  const [selectedSupport, setSelectedSupport] = useState<string[]>([
    'engineer',
    'support_arty',
    'support_aa'
  ]);

  const roles = [
    'Semua',
    'Frontline Defense',
    'Offensive Infantry',
    'Armor Spearhead',
    'Special Forces',
    'Garrison / Suppress'
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPresets = DIVISION_PRESETS.filter(p => {
    if (selectedRole !== 'Semua' && p.role !== selectedRole) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.doctrineSynergy.toLowerCase().includes(q) ||
        p.tacticalUsage.toLowerCase().includes(q) ||
        p.strengths.some(s => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Calculate live stats for interactive calculator
  const calculateLiveStats = () => {
    let totalWidth = 0;
    let totalSoftAttack = 0;
    let totalHardAttack = 0;
    let totalDefense = 0;
    let totalBreakthrough = 0;
    let totalSupply = 0;
    let totalIC = 0;
    let totalManpower = 0;
    let weightedOrg = 0;
    let totalBattalionCount = 0;
    let maxArmor = 0;
    let maxPiercing = 0;

    selectedBattalions.forEach(item => {
      const bat = BATTALION_CATALOGUE.find(b => b.id === item.battalionId);
      if (!bat) return;

      const count = item.count;
      totalBattalionCount += count;
      totalWidth += bat.combatWidth * count;
      totalSoftAttack += bat.softAttack * count;
      totalHardAttack += bat.hardAttack * count;
      totalDefense += bat.defense * count;
      totalBreakthrough += bat.breakthrough * count;
      totalSupply += bat.supplyUse * count;
      totalIC += bat.icCost * count;
      totalManpower += bat.manpower * count;
      weightedOrg += bat.organization * count;

      if (bat.armor > maxArmor) maxArmor = bat.armor;
      if (bat.piercing > maxPiercing) maxPiercing = bat.piercing;
    });

    // Support companies adjustments
    selectedSupport.forEach(supId => {
      totalIC += 80;
      totalManpower += 300;
      totalSupply += 0.05;

      if (supId === 'support_arty') {
        totalSoftAttack += 32;
      } else if (supId === 'support_aa') {
        totalHardAttack += 8;
        totalSoftAttack += 5;
        if (maxPiercing < 25) maxPiercing = 25;
      } else if (supId === 'support_at') {
        totalHardAttack += 45;
        if (maxPiercing < 65) maxPiercing = 65;
      } else if (supId === 'engineer') {
        totalDefense += 25;
      }
    });

    const averageOrg = totalBattalionCount > 0 ? Math.round(weightedOrg / totalBattalionCount) : 0;
    // HOI4 Armor formula simplification: 40% highest + 60% average
    const finalArmor = Math.round(maxArmor * 0.7);
    const finalPiercing = Math.round(maxPiercing * 0.8);

    return {
      combatWidth: totalWidth,
      softAttack: Math.round(totalSoftAttack),
      hardAttack: Math.round(totalHardAttack),
      defense: Math.round(totalDefense),
      breakthrough: Math.round(totalBreakthrough),
      organization: averageOrg,
      armor: finalArmor,
      piercing: finalPiercing,
      supplyUse: totalSupply.toFixed(2),
      icCost: Math.round(totalIC),
      manpower: totalManpower,
      battalionCount: totalBattalionCount
    };
  };

  const liveStats = calculateLiveStats();

  const addBattalion = (bat: BattalionOption) => {
    setSelectedBattalions(prev => {
      const existing = prev.find(p => p.battalionId === bat.id);
      if (existing) {
        return prev.map(p => p.battalionId === bat.id ? { ...p, count: p.count + 1 } : p);
      }
      return [...prev, { battalionId: bat.id, count: 1 }];
    });
  };

  const removeBattalion = (batId: string) => {
    setSelectedBattalions(prev => {
      const existing = prev.find(p => p.battalionId === batId);
      if (!existing) return prev;
      if (existing.count > 1) {
        return prev.map(p => p.battalionId === batId ? { ...p, count: p.count - 1 } : p);
      }
      return prev.filter(p => p.battalionId !== batId);
    });
  };

  const toggleSupportCompany = (supId: string) => {
    setSelectedSupport(prev => {
      if (prev.includes(supId)) {
        return prev.filter(s => s !== supId);
      }
      if (prev.length >= 5) {
        return prev; // HOI4 max 5 support companies
      }
      return [...prev, supId];
    });
  };

  const resetCalculator = () => {
    setSelectedBattalions([
      { battalionId: 'infantry', count: 9 },
      { battalionId: 'line_artillery', count: 1 }
    ]);
    setSelectedSupport(['engineer', 'support_arty', 'support_aa']);
  };

  const loadPresetToCalculator = (preset: DivisionPreset) => {
    const newBats: { battalionId: string; count: number }[] = [];
    preset.battalions.forEach(b => {
      const match = BATTALION_CATALOGUE.find(c => c.id === b.iconType) || BATTALION_CATALOGUE[0];
      newBats.push({ battalionId: match.id, count: b.count });
    });
    setSelectedBattalions(newBats);

    const newSup: string[] = [];
    if (preset.supportCompanies.some(s => s.includes('Engineer'))) newSup.push('engineer');
    if (preset.supportCompanies.some(s => s.includes('Artillery'))) newSup.push('support_arty');
    if (preset.supportCompanies.some(s => s.includes('Anti-Air'))) newSup.push('support_aa');
    if (preset.supportCompanies.some(s => s.includes('Recon'))) newSup.push('armored_recon');
    if (preset.supportCompanies.some(s => s.includes('Logistics'))) newSup.push('logistics');
    if (preset.supportCompanies.some(s => s.includes('Maintenance'))) newSup.push('maintenance');

    setSelectedSupport(newSup.slice(0, 5));
    setActiveSubTab('calculator');
  };

  const generateCopySummary = (preset: DivisionPreset) => {
    return `[HOI4 META TEMPLATE: ${preset.name}]
Lebar Tempur: ${preset.combatWidth} Width | Peran: ${preset.role}
Batalion: ${preset.battalions.map(b => `${b.count}x ${b.name}`).join(', ')}
Support: ${preset.supportCompanies.join(', ')}
Statistik: Org ${preset.stats.organization} | Soft Atk ${preset.stats.softAttack} | Defense ${preset.stats.defense} | Breakthrough ${preset.stats.breakthrough} | IC ${preset.stats.costIC}
Penggunaan Taktis: ${preset.tacticalUsage}`;
  };

  return (
    <div className="space-y-6">
      {/* Sub-tab navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#22303c] pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('presets')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeSubTab === 'presets'
                ? 'border border-[#3b82f6]/60 bg-[#152438] text-[#93c5fd] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Shield className="h-4 w-4 text-[#3b82f6]" />
            <span>Katalog Meta Template Presets</span>
          </button>

          <button
            onClick={() => setActiveSubTab('calculator')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeSubTab === 'calculator'
                ? 'border border-[#d97706]/60 bg-[#261f14] text-[#fde047] shadow-md shadow-black/40'
                : 'border border-[#1e2a36] bg-[#0f1721] text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Zap className="h-4 w-4 text-[#eab308]" />
            <span>Kalkulator Batalion Interaktif</span>
          </button>
        </div>

        {activeSubTab === 'presets' && (
          <div className="flex items-center gap-1 overflow-x-auto text-xs scrollbar-thin">
            {roles.map(r => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`whitespace-nowrap rounded-md px-2.5 py-1 font-medium transition-colors ${
                  selectedRole === r
                    ? 'bg-[#1e2e42] text-[#38bdf8] font-semibold'
                    : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* VIEW 1: PRESETS */}
      {activeSubTab === 'presets' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPresets.map(preset => {
            const isFav = isFavorite(preset.id);
            const isCopied = copiedId === preset.id;

            return (
              <div
                key={preset.id}
                className="rounded-xl border border-[#223344] bg-[#111a24] shadow-lg shadow-black/50 overflow-hidden flex flex-col justify-between"
              >
                {/* Card Header */}
                <div className="p-5 border-b border-[#1b2a38] bg-gradient-to-r from-[#14202e] to-[#0f1822]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className="rounded border border-[#38bdf8]/40 bg-[#0c2438] px-2 py-0.5 text-xs font-mono font-bold text-[#38bdf8]">
                          {preset.combatWidth} Width
                        </span>
                        <span className="rounded border border-[#1e293b] bg-[#0f172a] px-2 py-0.5 text-[11px] font-mono text-[#94a3b8]">
                          {preset.role}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#f8fafc] tracking-tight">
                        {preset.name}
                      </h3>
                      <p className="text-xs text-[#94a3b8] mt-0.5 font-mono">
                        Sinergi Doktrin: <span className="text-[#cbd5e1]">{preset.doctrineSynergy}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleFavorite({
                          id: preset.id,
                          type: 'division',
                          title: preset.name,
                          subtitle: `${preset.combatWidth}W • ${preset.role}`,
                          tag: 'Template'
                        })}
                        className={`rounded-lg border p-2 text-xs transition-colors ${
                          isFav
                            ? 'border-[#eab308]/60 bg-[#2b2512] text-[#facc15]'
                            : 'border-[#22303c] bg-[#131b24] text-[#64748b] hover:text-[#f8fafc]'
                        }`}
                        title={isFav ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
                      >
                        <Star className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={() => handleCopy(preset.id, generateCopySummary(preset))}
                        className={`rounded-lg border p-2 text-xs transition-colors ${
                          isCopied
                            ? 'border-[#22c55e]/60 bg-[#143324] text-[#4ade80]'
                            : 'border-[#22303c] bg-[#131b24] text-[#94a3b8] hover:text-[#f8fafc]'
                        }`}
                        title="Salin Komposisi"
                      >
                        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Core stats grid */}
                  <div className="mt-4 grid grid-cols-4 gap-2 text-center font-mono">
                    <div className="rounded border border-[#1e2c3a] bg-[#0c141c] p-2">
                      <div className="text-[10px] text-[#64748b] uppercase">Org</div>
                      <div className="text-sm font-bold text-[#38bdf8]">{preset.stats.organization}</div>
                    </div>
                    <div className="rounded border border-[#1e2c3a] bg-[#0c141c] p-2">
                      <div className="text-[10px] text-[#64748b] uppercase">Soft Atk</div>
                      <div className="text-sm font-bold text-[#f59e0b]">{preset.stats.softAttack}</div>
                    </div>
                    <div className="rounded border border-[#1e2c3a] bg-[#0c141c] p-2">
                      <div className="text-[10px] text-[#64748b] uppercase">Defense</div>
                      <div className="text-sm font-bold text-[#10b981]">{preset.stats.defense}</div>
                    </div>
                    <div className="rounded border border-[#1e2c3a] bg-[#0c141c] p-2">
                      <div className="text-[10px] text-[#64748b] uppercase">Breakthr.</div>
                      <div className="text-sm font-bold text-[#ec4899]">{preset.stats.breakthrough}</div>
                    </div>
                  </div>

                  <div className="mt-2 grid grid-cols-4 gap-2 text-center font-mono text-[11px]">
                    <div className="rounded border border-[#1e2c3a] bg-[#0c141c] py-1 px-1 text-[#94a3b8]">
                      Hard: <span className="text-[#f1f5f9] font-semibold">{preset.stats.hardAttack}</span>
                    </div>
                    <div className="rounded border border-[#1e2c3a] bg-[#0c141c] py-1 px-1 text-[#94a3b8]">
                      Armor: <span className="text-[#f1f5f9] font-semibold">{preset.stats.armor}</span>
                    </div>
                    <div className="rounded border border-[#1e2c3a] bg-[#0c141c] py-1 px-1 text-[#94a3b8]">
                      Pierce: <span className="text-[#f1f5f9] font-semibold">{preset.stats.piercing}</span>
                    </div>
                    <div className="rounded border border-[#1e2c3a] bg-[#0c141c] py-1 px-1 text-[#94a3b8]">
                      IC: <span className="text-[#f1f5f9] font-semibold">{preset.stats.costIC}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4 text-xs">
                  {/* Battalion list */}
                  <div>
                    <span className="font-mono text-[11px] font-semibold text-[#64748b] uppercase tracking-wider block mb-1.5">
                      Struktur Batalion Tempur:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {preset.battalions.map((bat, bIdx) => (
                        <span
                          key={bIdx}
                          className="rounded border border-[#27384a] bg-[#162330] px-2.5 py-1 font-mono font-medium text-[#e2e8f0]"
                        >
                          <strong className="text-[#38bdf8] mr-1">{bat.count}x</strong>
                          {bat.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Support list */}
                  <div>
                    <span className="font-mono text-[11px] font-semibold text-[#64748b] uppercase tracking-wider block mb-1.5">
                      Perusahaan Bantuan (Support Companies):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {preset.supportCompanies.map((sup, sIdx) => (
                        <span
                          key={sIdx}
                          className="rounded border border-[#2e3e2c] bg-[#132216] px-2 py-0.5 font-mono text-[#86efac]"
                        >
                          + {sup}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Strengths & Usage */}
                  <div className="rounded-lg border border-[#1c2937] bg-[#0c141e] p-3 space-y-2">
                    <p className="text-[#cbd5e1] leading-relaxed">
                      <strong className="text-[#f8fafc]">Penggunaan Taktis: </strong>
                      {preset.tacticalUsage}
                    </p>
                    <div className="pt-2 border-t border-[#1a2533] flex items-center justify-between flex-wrap gap-2">
                      <span className="text-[11px] text-[#64748b] font-mono">
                        Negara Disarankan: <span className="text-[#94a3b8]">{preset.recommendedFor.join(', ')}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="p-4 border-t border-[#1b2a38] bg-[#0d151f] flex items-center justify-between">
                  <button
                    onClick={() => loadPresetToCalculator(preset)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#38bdf8] hover:text-[#7dd3fc] transition-colors"
                  >
                    <Zap className="h-3.5 w-3.5" />
                    Muat ke Kalkulator Custom
                  </button>
                  <button
                    onClick={() => handleCopy(preset.id, generateCopySummary(preset))}
                    className="rounded border border-[#22303c] bg-[#121a22] px-3 py-1.5 text-xs font-medium text-[#cbd5e1] hover:border-[#38bdf8] hover:text-[#f8fafc] transition-colors flex items-center gap-1.5"
                  >
                    {isCopied ? <Check className="h-3 w-3 text-[#22c55e]" /> : <Copy className="h-3 w-3" />}
                    <span>{isCopied ? 'Tersalin!' : 'Salin Konsep'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: INTERACTIVE CALCULATOR */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-6">
          {/* Header banner */}
          <div className="rounded-xl border border-[#3b82f6]/40 bg-gradient-to-r from-[#132236] to-[#0f1824] p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#f8fafc] flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#38bdf8]" />
                  Simulator Perancang Divisi (Live Division Builder)
                </h3>
                <p className="text-xs text-[#94a3b8] mt-1">
                  Tambahkan batalion tempur dan support company untuk menghitung Combat Width, Serangan Darat, Pertahanan, Organisasi, dan Biaya Pabrik secara instan.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetCalculator}
                  className="flex items-center gap-1.5 rounded-lg border border-[#334155] bg-[#1e293b] px-3 py-1.5 text-xs font-medium text-[#cbd5e1] hover:text-[#f8fafc] transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Reset ke 9/1
                </button>
                <button
                  onClick={() => handleCopy('calc-summary', `[CUSTOM HOI4 DIVISION]
Lebar Tempur: ${liveStats.combatWidth} Width | Batalion: ${liveStats.battalionCount} unit
Stats: Org ${liveStats.organization} | Soft Attack ${liveStats.softAttack} | Defense ${liveStats.defense} | Breakthrough ${liveStats.breakthrough} | Armor ${liveStats.armor} | IC Cost ${liveStats.icCost}`)}
                  className="flex items-center gap-1.5 rounded-lg border border-[#3b82f6]/50 bg-[#2563eb] px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-[#1d4ed8] transition-colors"
                >
                  {copiedId === 'calc-summary' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedId === 'calc-summary' ? 'Tersalin!' : 'Salin Hasil Kalkulasi'}
                </button>
              </div>
            </div>

            {/* Real-time stats scoreboard */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center font-mono">
              <div className={`rounded-lg border p-2.5 ${
                [15, 18, 20, 21, 30, 35, 36, 40].includes(liveStats.combatWidth)
                  ? 'border-[#22c55e]/50 bg-[#143324]'
                  : 'border-[#f59e0b]/50 bg-[#3b2b13]'
              }`}>
                <div className="text-[10px] text-[#94a3b8] uppercase font-bold">Combat Width</div>
                <div className={`text-lg font-black ${
                  [15, 18, 20, 21, 30, 35, 36, 40].includes(liveStats.combatWidth)
                    ? 'text-[#4ade80]'
                    : 'text-[#fde047]'
                }`}>
                  {liveStats.combatWidth}w
                </div>
                <div className="text-[9px] text-[#cbd5e1] truncate">
                  {[15, 18, 20, 21, 30, 35, 36, 40].includes(liveStats.combatWidth) ? 'Optimal' : 'Non-Meta'}
                </div>
              </div>

              <div className="rounded-lg border border-[#1e2d3d] bg-[#0c151e] p-2.5">
                <div className="text-[10px] text-[#64748b] uppercase font-bold">Organization</div>
                <div className={`text-lg font-black ${liveStats.organization >= 30 ? 'text-[#38bdf8]' : 'text-[#f87171]'}`}>
                  {liveStats.organization}
                </div>
                <div className="text-[9px] text-[#94a3b8]">{liveStats.organization >= 30 ? 'Sehat' : 'Terlalu Rendah!'}</div>
              </div>

              <div className="rounded-lg border border-[#1e2d3d] bg-[#0c151e] p-2.5">
                <div className="text-[10px] text-[#64748b] uppercase font-bold">Soft Attack</div>
                <div className="text-lg font-black text-[#f59e0b]">{liveStats.softAttack}</div>
                <div className="text-[9px] text-[#94a3b8]">vs Infanteri</div>
              </div>

              <div className="rounded-lg border border-[#1e2d3d] bg-[#0c151e] p-2.5">
                <div className="text-[10px] text-[#64748b] uppercase font-bold">Defense</div>
                <div className="text-lg font-black text-[#10b981]">{liveStats.defense}</div>
                <div className="text-[9px] text-[#94a3b8]">Saat Bertahan</div>
              </div>

              <div className="rounded-lg border border-[#1e2d3d] bg-[#0c151e] p-2.5">
                <div className="text-[10px] text-[#64748b] uppercase font-bold">Breakthrough</div>
                <div className="text-lg font-black text-[#ec4899]">{liveStats.breakthrough}</div>
                <div className="text-[9px] text-[#94a3b8]">Saat Menyerang</div>
              </div>

              <div className="rounded-lg border border-[#1e2d3d] bg-[#0c151e] p-2.5">
                <div className="text-[10px] text-[#64748b] uppercase font-bold">Armor / Pierce</div>
                <div className="text-sm font-black text-[#e2e8f0] mt-1">{liveStats.armor} / {liveStats.piercing}</div>
                <div className="text-[9px] text-[#94a3b8]">Lapis Baja</div>
              </div>

              <div className="rounded-lg border border-[#1e2d3d] bg-[#0c151e] p-2.5">
                <div className="text-[10px] text-[#64748b] uppercase font-bold">Supply / Hari</div>
                <div className="text-lg font-black text-[#fb923c]">{liveStats.supplyUse}</div>
                <div className="text-[9px] text-[#94a3b8]">Beban Logistik</div>
              </div>

              <div className="rounded-lg border border-[#1e2d3d] bg-[#0c151e] p-2.5">
                <div className="text-[10px] text-[#64748b] uppercase font-bold">Biaya IC</div>
                <div className="text-lg font-black text-[#a78bfa]">{liveStats.icCost}</div>
                <div className="text-[9px] text-[#94a3b8]">{liveStats.manpower.toLocaleString()} Manpower</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Selected Composition (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-xl border border-[#22303c] bg-[#111923] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#1b2835] pb-3">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#f1f5f9] flex items-center gap-2">
                    <Target className="h-4 w-4 text-[#38bdf8]" />
                    Batalion Aktif ({liveStats.battalionCount} Unit)
                  </h4>
                  <span className="text-xs font-mono text-[#64748b]">{liveStats.combatWidth} / 40 Width</span>
                </div>

                {selectedBattalions.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-[#22303c] p-6 text-center text-xs text-[#64748b]">
                    Belum ada batalion tempur. Pilih batalion dari panel sebelah kanan.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedBattalions.map(item => {
                      const bat = BATTALION_CATALOGUE.find(b => b.id === item.battalionId);
                      if (!bat) return null;

                      return (
                        <div
                          key={item.battalionId}
                          className="flex items-center justify-between rounded-lg border border-[#1e2b38] bg-[#141f2a] p-3 text-xs"
                        >
                          <div>
                            <div className="font-semibold text-[#f8fafc]">{bat.name}</div>
                            <div className="font-mono text-[11px] text-[#94a3b8]">
                              {bat.combatWidth}w • Soft Atk {bat.softAttack} • Def {bat.defense}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeBattalion(item.battalionId)}
                              className="flex h-7 w-7 items-center justify-center rounded border border-[#334155] bg-[#1e293b] text-[#cbd5e1] hover:bg-[#334155] hover:text-[#f8fafc]"
                            >
                              -
                            </button>
                            <span className="w-6 text-center font-mono font-bold text-sm text-[#38bdf8]">
                              {item.count}
                            </span>
                            <button
                              onClick={() => addBattalion(bat)}
                              className="flex h-7 w-7 items-center justify-center rounded border border-[#334155] bg-[#1e293b] text-[#cbd5e1] hover:bg-[#334155] hover:text-[#f8fafc]"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Support Companies Selection */}
                <div className="border-t border-[#1b2835] pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f1f5f9]">
                      Support Companies ({selectedSupport.length}/5)
                    </span>
                    <span className="text-[11px] font-mono text-[#64748b]">Maksimal 5</span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5">
                    {SUPPORT_COMPANIES_DATA.map(sup => {
                      const isSelected = selectedSupport.includes(sup.id);

                      return (
                        <button
                          key={sup.id}
                          onClick={() => toggleSupportCompany(sup.id)}
                          className={`flex items-start justify-between rounded-lg border p-2.5 text-left text-xs transition-all ${
                            isSelected
                              ? 'border-[#22c55e]/50 bg-[#13281c] text-[#dcfce7]'
                              : 'border-[#1e2938] bg-[#0f1720] text-[#94a3b8] hover:border-[#2f3f50]'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-sm flex items-center gap-1.5">
                              <span className={`h-2 w-2 rounded-full ${isSelected ? 'bg-[#22c55e]' : 'bg-[#475569]'}`} />
                              {sup.name}
                            </div>
                            <div className="text-[11px] text-[#64748b] mt-0.5">{sup.bonus}</div>
                          </div>
                          <span className="font-mono text-[10px] text-[#475569]">{isSelected ? 'Aktif' : '+ Pasang'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Battalion Catalogue to Add (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-xl border border-[#22303c] bg-[#111923] p-5 space-y-4">
                <div className="border-b border-[#1b2835] pb-3">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#f1f5f9]">
                    Katalog Batalion Tersedia (Klik untuk Menambahkan)
                  </h4>
                  <p className="text-xs text-[#94a3b8] mt-1">
                    Setiap jenis batalion memiliki spesialisasi peran: Infanteri memberikan Organisasi tinggi, Artileri mendongkrak Soft Attack, dan Tank memberikan Breakthrough penembus garis depan.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BATTALION_CATALOGUE.map(bat => {
                    const currentCount = selectedBattalions.find(b => b.battalionId === bat.id)?.count || 0;

                    return (
                      <div
                        key={bat.id}
                        className="rounded-lg border border-[#1e2c3a] bg-[#141f2b] p-3 flex flex-col justify-between hover:border-[#38bdf8]/60 transition-all"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-sm text-[#f8fafc]">{bat.name}</span>
                            <span className="rounded bg-[#0f172a] px-1.5 py-0.2 font-mono text-[11px] text-[#38bdf8] font-bold">
                              {bat.combatWidth}w
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-1 font-mono text-[10px] text-[#94a3b8] mb-3">
                            <div>Soft: <span className="text-[#f1f5f9] font-bold">{bat.softAttack}</span></div>
                            <div>Def: <span className="text-[#f1f5f9] font-bold">{bat.defense}</span></div>
                            <div>Org: <span className="text-[#f1f5f9] font-bold">{bat.organization}</span></div>
                            <div>Break: <span className="text-[#f1f5f9] font-bold">{bat.breakthrough}</span></div>
                            <div>Armor: <span className="text-[#f1f5f9] font-bold">{bat.armor}</span></div>
                            <div>IC: <span className="text-[#f1f5f9] font-bold">{bat.icCost}</span></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-[#1a2533] pt-2">
                          <span className="text-[11px] font-mono text-[#64748b]">
                            Di Template: <strong className="text-[#38bdf8]">{currentCount}x</strong>
                          </span>
                          <button
                            onClick={() => addBattalion(bat)}
                            className="flex items-center gap-1 rounded bg-[#2563eb] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#1d4ed8] transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                            Tambah
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
