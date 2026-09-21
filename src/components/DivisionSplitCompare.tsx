import React, { useState, useMemo } from 'react';
import {
  Shield, ArrowLeftRight, Check, AlertTriangle, TrendingUp,
  Zap, Fuel, DollarSign, Users, Award, Box, SlidersHorizontal,
  ChevronRight, Info, CheckCircle2, XCircle
} from 'lucide-react';
import { DivisionPreset } from '../types';
import { DIVISION_PRESETS } from '../data/divisionData';

interface DivisionSplitCompareProps {
  customStats?: {
    combatWidth: number;
    softAttack: number;
    hardAttack: number;
    defense: number;
    breakthrough: number;
    organization: number;
    armor: number;
    piercing: number;
    hp: number;
    supplyUse: string;
    icCost: number;
    manpower: number;
  };
}

export const DivisionSplitCompare: React.FC<DivisionSplitCompareProps> = ({ customStats }) => {
  const [templateAId, setTemplateAId] = useState<string>('inf-9-1');
  const [templateBId, setTemplateBId] = useState<string>('armor-spearhead-30w');

  // Build unified template objects
  const availableTemplates = useMemo(() => {
    const list: { id: string; name: string; role: string; isCustom?: boolean }[] = [
      ...DIVISION_PRESETS.map(p => ({ id: p.id, name: p.name, role: p.role, isCustom: false }))
    ];
    if (customStats && customStats.combatWidth > 0) {
      list.unshift({
        id: 'custom-designer',
        name: '★ Desain Kustom Anda (Kalkulator Aktif)',
        role: 'Desain Kustom',
        isCustom: true
      });
    }
    return list;
  }, [customStats]);

  const getTemplateData = (id: string) => {
    if (id === 'custom-designer' && customStats) {
      return {
        id: 'custom-designer',
        name: 'Desain Kustom Anda',
        role: 'Kustom Player',
        doctrineSynergy: 'Disesuaikan dengan Doktrin Pilihan',
        combatWidth: customStats.combatWidth,
        stats: {
          combatWidth: customStats.combatWidth,
          organization: customStats.organization,
          softAttack: customStats.softAttack,
          hardAttack: customStats.hardAttack,
          defense: customStats.defense,
          breakthrough: customStats.breakthrough,
          armor: customStats.armor,
          piercing: customStats.piercing,
          supplyUse: customStats.supplyUse,
          costIC: customStats.icCost.toLocaleString(),
          hp: customStats.hp,
          manpower: customStats.manpower
        },
        strengths: ['Dibuat secara spesifik sesuai kebutuhan taktis'],
        weaknesses: ['Periksa kecocokan combat width terhadap medan target'],
        tacticalUsage: 'Didesain langsung melalui tab Kalkulator Interaktif.',
        supportCompanies: ['Disesuaikan'],
        battalions: [{ name: 'Batalion Campuran', count: 1, iconType: 'custom' }]
      };
    }

    const found = DIVISION_PRESETS.find(p => p.id === id) || DIVISION_PRESETS[0];
    const icParsed = parseInt(found.stats.costIC.replace(/,/g, ''), 10) || 750;
    const manpowerParsed = found.battalions.reduce((acc, b) => acc + (b.count * (b.iconType === 'infantry' ? 1000 : 500)), 0) + (found.supportCompanies.length * 300);

    return {
      ...found,
      stats: {
        ...found.stats,
        combatWidth: found.combatWidth,
        costIC: found.stats.costIC,
        hp: 120,
        manpower: manpowerParsed,
        numericIC: icParsed
      }
    };
  };

  const templateA = useMemo(() => getTemplateData(templateAId), [templateAId, customStats]);
  const templateB = useMemo(() => getTemplateData(templateBId), [templateBId, customStats]);

  const handleSwap = () => {
    const temp = templateAId;
    setTemplateAId(templateBId);
    setTemplateBId(temp);
  };

  // Armor vs Piercing matchups
  const aPiercesB = templateA.stats.piercing >= templateB.stats.armor;
  const bPiercesA = templateB.stats.piercing >= templateA.stats.armor;

  // Cost ratio
  const icA = parseInt(templateA.stats.costIC.toString().replace(/,/g, ''), 10) || 1;
  const icB = parseInt(templateB.stats.costIC.toString().replace(/,/g, ''), 10) || 1;
  const icRatio = (icB / icA).toFixed(1);

  // Stat comparison helper
  const renderStatRow = (
    label: string,
    statKey: keyof typeof templateA.stats,
    unit: string = '',
    lowerIsBetter: boolean = false
  ) => {
    const valA = typeof templateA.stats[statKey] === 'string'
      ? parseFloat(templateA.stats[statKey] as string) || 0
      : (templateA.stats[statKey] as number) || 0;

    const valB = typeof templateB.stats[statKey] === 'string'
      ? parseFloat(templateB.stats[statKey] as string) || 0
      : (templateB.stats[statKey] as number) || 0;

    const diff = valB - valA;
    const diffPercent = valA > 0 ? Math.round(((valB - valA) / valA) * 100) : 0;

    const isAWinner = lowerIsBetter ? valA < valB : valA > valB;
    const isBWinner = lowerIsBetter ? valB < valA : valB > valA;
    const isTie = valA === valB;

    return (
      <tr className="border-b border-[#1f2d3d] hover:bg-[#131e2b]/50 transition-colors">
        {/* Template A Value */}
        <td className={`py-3 px-4 text-right font-mono text-xs sm:text-sm ${
          isAWinner ? 'text-[#38bdf8] font-bold bg-[#0c2438]/30' : 'text-[#cbd5e1]'
        }`}>
          <div className="flex items-center justify-end gap-1.5">
            {isAWinner && !isTie && (
              <span className="text-[10px] uppercase font-bold text-[#38bdf8] bg-[#0c2438] px-1.5 py-0.2 rounded border border-[#38bdf8]/40">
                Unggul
              </span>
            )}
            <span>{typeof valA === 'number' && valA % 1 !== 0 ? valA.toFixed(2) : valA} {unit}</span>
          </div>
        </td>

        {/* Metric Label */}
        <td className="py-3 px-3 text-center text-xs font-semibold text-[#94a3b8] bg-[#0c141d]/70">
          {label}
        </td>

        {/* Template B Value */}
        <td className={`py-3 px-4 text-left font-mono text-xs sm:text-sm ${
          isBWinner ? 'text-[#10b981] font-bold bg-[#10291d]/30' : 'text-[#cbd5e1]'
        }`}>
          <div className="flex items-center justify-between gap-1.5">
            <span>{typeof valB === 'number' && valB % 1 !== 0 ? valB.toFixed(2) : valB} {unit}</span>
            {isBWinner && !isTie && (
              <span className="text-[10px] uppercase font-bold text-[#10b981] bg-[#10291d] px-1.5 py-0.2 rounded border border-[#10b981]/40">
                Unggul
              </span>
            )}
          </div>
        </td>

        {/* Delta Difference Badge */}
        <td className="py-3 px-4 text-center font-mono text-xs hidden sm:table-cell">
          {isTie ? (
            <span className="text-[#64748b]">Sama</span>
          ) : (
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
              (lowerIsBetter ? diff < 0 : diff > 0)
                ? 'bg-[#10291d] text-[#4ade80] border border-[#16a34a]/40'
                : 'bg-[#2b1216] text-[#f87171] border border-[#ef4444]/40'
            }`}>
              {diff > 0 ? '+' : ''}{typeof diff === 'number' && diff % 1 !== 0 ? diff.toFixed(1) : diff}
              {diffPercent !== 0 && ` (${diffPercent > 0 ? '+' : ''}${diffPercent}%)`}
            </span>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 shadow-xl shadow-black/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="h-5 w-5 text-[#38bdf8]" />
              <h2 className="text-base sm:text-lg font-black text-[#f8fafc] tracking-tight">
                Mode Bandingkan Template Divisi (Split-View Comparator)
              </h2>
            </div>
            <p className="text-xs text-[#94a3b8] mt-1">
              Bandingkan dua desain divisi secara berdampingan. Pantau perbedaan daya serang, ketahanan, rasio armor vs piercing, dan efisiensi biaya pabrik (IC).
            </p>
          </div>

          <button
            onClick={handleSwap}
            className="self-start sm:self-center flex items-center gap-1.5 rounded-lg border border-[#38bdf8]/40 bg-[#0d2133] px-3 py-1.5 text-xs font-semibold text-[#7dd3fc] hover:bg-[#122e47] transition-all shadow-sm"
          >
            <ArrowLeftRight className="h-4 w-4" />
            <span>Tukar Posisi (A ⇄ B)</span>
          </button>
        </div>

        {/* Template Selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#1e2a38]">
          {/* Template A Selector */}
          <div className="rounded-lg border border-[#38bdf8]/40 bg-[#0c1b29] p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#38bdf8]" />
                Template Divisi A (Sisi Kiri)
              </span>
              <span className="text-[10px] font-mono text-[#7dd3fc] bg-[#0c2438] px-2 py-0.5 rounded border border-[#38bdf8]/30">
                {templateA.role}
              </span>
            </div>

            <select
              value={templateAId}
              onChange={e => setTemplateAId(e.target.value)}
              className="w-full rounded-lg border border-[#223344] bg-[#0a1420] py-2 px-3 text-xs sm:text-sm font-semibold text-[#f8fafc] outline-none focus:border-[#38bdf8]"
            >
              {availableTemplates.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.role})
                </option>
              ))}
            </select>
          </div>

          {/* Template B Selector */}
          <div className="rounded-lg border border-[#10b981]/40 bg-[#0c2118] p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#10b981] flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                Template Divisi B (Sisi Kanan)
              </span>
              <span className="text-[10px] font-mono text-[#86efac] bg-[#10291d] px-2 py-0.5 rounded border border-[#10b981]/30">
                {templateB.role}
              </span>
            </div>

            <select
              value={templateBId}
              onChange={e => setTemplateBId(e.target.value)}
              className="w-full rounded-lg border border-[#223344] bg-[#0a1e16] py-2 px-3 text-xs sm:text-sm font-semibold text-[#f8fafc] outline-none focus:border-[#10b981]"
            >
              {availableTemplates.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.role})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* QUICK COMPARISON HUD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {/* Armor vs Piercing Face-off */}
        <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 space-y-3 shadow-lg shadow-black/30">
          <div className="flex items-center gap-2 text-xs font-bold text-[#f8fafc]">
            <Shield className="h-4 w-4 text-[#fbbf24]" />
            <span>Uji Duel Armor vs Piercing</span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className={`p-2.5 rounded-lg border ${
              aPiercesB ? 'border-[#16a34a]/40 bg-[#10291d] text-[#bbf7d0]' : 'border-[#ef4444]/40 bg-[#2b1216] text-[#fca5a5]'
            }`}>
              <div className="font-bold flex items-center justify-between">
                <span>Template A vs Armor B:</span>
                <span>{aPiercesB ? 'TEMBUS (Pierced)' : 'KEBAL (Unpierced)'}</span>
              </div>
              <div className="text-[10px] opacity-80 mt-0.5">
                Piercing A ({templateA.stats.piercing}) vs Armor B ({templateB.stats.armor})
              </div>
            </div>

            <div className={`p-2.5 rounded-lg border ${
              bPiercesA ? 'border-[#16a34a]/40 bg-[#10291d] text-[#bbf7d0]' : 'border-[#ef4444]/40 bg-[#2b1216] text-[#fca5a5]'
            }`}>
              <div className="font-bold flex items-center justify-between">
                <span>Template B vs Armor A:</span>
                <span>{bPiercesA ? 'TEMBUS (Pierced)' : 'KEBAL (Unpierced)'}</span>
              </div>
              <div className="text-[10px] opacity-80 mt-0.5">
                Piercing B ({templateB.stats.piercing}) vs Armor A ({templateA.stats.armor})
              </div>
            </div>
          </div>
        </div>

        {/* Industrial Cost Ratio */}
        <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 space-y-3 shadow-lg shadow-black/30">
          <div className="flex items-center gap-2 text-xs font-bold text-[#f8fafc]">
            <DollarSign className="h-4 w-4 text-[#38bdf8]" />
            <span>Perbandingan Biaya Industri (IC)</span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="p-2.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] space-y-1">
              <div className="flex justify-between text-[#94a3b8]">
                <span>Biaya Template A:</span>
                <span className="font-bold text-[#38bdf8]">{templateA.stats.costIC} IC</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>Biaya Template B:</span>
                <span className="font-bold text-[#10b981]">{templateB.stats.costIC} IC</span>
              </div>
            </div>

            <p className="text-[11px] text-[#e2e8f0] bg-[#172332] p-2 rounded border border-[#233549]">
              💡 1 Divisi <strong>{templateB.name.split('(')[0]}</strong> bernilai setara dengan{' '}
              <strong className="text-[#38bdf8]">{icRatio}x</strong> Divisi <strong>{templateA.name.split('(')[0]}</strong> di lini produksi pabrik militer.
            </p>
          </div>
        </div>

        {/* Tactical Synergy & Advice */}
        <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 space-y-3 shadow-lg shadow-black/30">
          <div className="flex items-center gap-2 text-xs font-bold text-[#f8fafc]">
            <Award className="h-4 w-4 text-[#ec4899]" />
            <span>Rekomendasi Penugasan Medan</span>
          </div>

          <div className="text-[11px] text-[#cbd5e1] space-y-1.5">
            <div>
              <strong className="text-[#38bdf8]">Template A: </strong>
              <span>
                {templateA.stats.defense > templateA.stats.breakthrough
                  ? 'Sangat ideal untuk menahan lini depan statis & pertahanan benteng/sungai.'
                  : 'Dirancang sebagai ujung tombak ofensif penerobos garis pertahanan.'}
              </span>
            </div>
            <div>
              <strong className="text-[#10b981]">Template B: </strong>
              <span>
                {templateB.stats.breakthrough > templateB.stats.defense
                  ? 'Cocok untuk manuver pincer mengepung (encirclement) dan serangan tank cepat.'
                  : 'Fokus pada daya tahan atrisi dan pertahanan hemat biaya produksi.'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* STATS COMPARISON TABLE */}
      <div className="rounded-xl border border-[#223344] bg-[#111923] shadow-xl shadow-black/50 overflow-hidden">
        <div className="border-b border-[#1f2d3d] bg-gradient-to-r from-[#13202e] via-[#111923] to-[#102419] p-4">
          <h3 className="font-bold text-sm sm:text-base text-[#f8fafc] tracking-tight">
            Matriks Perbandingan Parameter Tempur Lengkap
          </h3>
          <p className="text-xs text-[#94a3b8]">
            Nilai yang lebih unggul ditandai dengan warna highlight dan badge khusus.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#223344] bg-[#0c141d] font-mono text-xs uppercase text-[#64748b]">
                <th className="py-3 px-4 text-right text-[#38bdf8] w-1/3">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#38bdf8]" />
                    <span>{templateA.name}</span>
                  </div>
                </th>
                <th className="py-3 px-3 text-center text-[#94a3b8] w-1/4">Parameter Taktis</th>
                <th className="py-3 px-4 text-left text-[#10b981] w-1/3">
                  <div className="flex items-center justify-start gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                    <span>{templateB.name}</span>
                  </div>
                </th>
                <th className="py-3 px-4 text-center text-[#64748b] hidden sm:table-cell">Selisih (Δ)</th>
              </tr>
            </thead>
            <tbody>
              {/* Combat Width */}
              {renderStatRow('Combat Width (Lebar Tempur)', 'combatWidth', 'w', true)}
              
              {/* Soft Attack */}
              {renderStatRow('Soft Attack (vs Infanteri)', 'softAttack', '')}

              {/* Hard Attack */}
              {renderStatRow('Hard Attack (vs Tank/Bermotor)', 'hardAttack', '')}

              {/* Defense */}
              {renderStatRow('Defense (Ketahanan Bertahan)', 'defense', '')}

              {/* Breakthrough */}
              {renderStatRow('Breakthrough (Ketahanan Menyerang)', 'breakthrough', '')}

              {/* Organization */}
              {renderStatRow('Organization (Daya Tahan Tempur)', 'organization', 'Org')}

              {/* Armor */}
              {renderStatRow('Armor Rating (Ketebalan Zirah)', 'armor', '')}

              {/* Piercing */}
              {renderStatRow('Piercing (Daya Tembus Armor)', 'piercing', '')}

              {/* Max HP */}
              {renderStatRow('Max Hitpoints (HP)', 'hp', 'HP')}

              {/* Supply Use */}
              {renderStatRow('Konsumsi Suplai Harian', 'supplyUse', '/hari', true)}

              {/* IC Cost */}
              {renderStatRow('Biaya Produksi Pabrik (IC)', 'costIC', 'IC', true)}

              {/* Manpower */}
              {renderStatRow('Kebutuhan Prajurit (Manpower)', 'manpower', 'orang', true)}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED BREAKDOWN & EQUIPMENT COMPARISON */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Template A Details */}
        <div className="rounded-xl border border-[#1e2e42] bg-[#0c1825] p-4 space-y-4 shadow-lg shadow-black/30">
          <div className="flex items-center justify-between border-b border-[#1e2e42] pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#38bdf8] uppercase font-bold">Template A</span>
              <h4 className="text-base font-black text-[#f8fafc]">{templateA.name}</h4>
              <div className="text-xs text-[#94a3b8]">{templateA.role} • {templateA.combatWidth}w</div>
            </div>
            <div className="text-right font-mono text-xs">
              <div className="text-[#38bdf8] font-bold">{templateA.stats.costIC} IC</div>
              <div className="text-[#64748b]">{templateA.stats.manpower} Manpower</div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-mono text-[11px] font-bold uppercase text-[#64748b] block">Komposisi Batalion:</span>
            <div className="flex flex-wrap gap-1.5">
              {templateA.battalions.map((b, idx) => (
                <span key={idx} className="rounded border border-[#1e2e42] bg-[#09131e] px-2 py-1 text-xs text-[#cbd5e1]">
                  {b.count}x {b.name}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-mono text-[11px] font-bold uppercase text-[#64748b] block">Support Companies:</span>
            <div className="flex flex-wrap gap-1.5">
              {templateA.supportCompanies.map((s, idx) => (
                <span key={idx} className="rounded border border-[#38bdf8]/30 bg-[#0d2235] px-2 py-1 text-xs text-[#7dd3fc]">
                  + {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-mono text-[11px] font-bold uppercase text-[#4ade80] block">Kelebihan Taktis:</span>
            <ul className="space-y-1 text-[#bbf7d0] text-xs">
              {templateA.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#22c55e] font-bold">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Template B Details */}
        <div className="rounded-xl border border-[#1a382b] bg-[#0c2018] p-4 space-y-4 shadow-lg shadow-black/30">
          <div className="flex items-center justify-between border-b border-[#1a382b] pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#10b981] uppercase font-bold">Template B</span>
              <h4 className="text-base font-black text-[#f8fafc]">{templateB.name}</h4>
              <div className="text-xs text-[#94a3b8]">{templateB.role} • {templateB.combatWidth}w</div>
            </div>
            <div className="text-right font-mono text-xs">
              <div className="text-[#10b981] font-bold">{templateB.stats.costIC} IC</div>
              <div className="text-[#64748b]">{templateB.stats.manpower} Manpower</div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-mono text-[11px] font-bold uppercase text-[#64748b] block">Komposisi Batalion:</span>
            <div className="flex flex-wrap gap-1.5">
              {templateB.battalions.map((b, idx) => (
                <span key={idx} className="rounded border border-[#1a382b] bg-[#091a13] px-2 py-1 text-xs text-[#cbd5e1]">
                  {b.count}x {b.name}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-mono text-[11px] font-bold uppercase text-[#64748b] block">Support Companies:</span>
            <div className="flex flex-wrap gap-1.5">
              {templateB.supportCompanies.map((s, idx) => (
                <span key={idx} className="rounded border border-[#10b981]/30 bg-[#0d2a1d] px-2 py-1 text-xs text-[#86efac]">
                  + {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-mono text-[11px] font-bold uppercase text-[#4ade80] block">Kelebihan Taktis:</span>
            <ul className="space-y-1 text-[#bbf7d0] text-xs">
              {templateB.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#22c55e] font-bold">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
