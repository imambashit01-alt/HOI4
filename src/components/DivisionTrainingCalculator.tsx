import React, { useState, useMemo } from 'react';
import {
  Clock, Users, Shield, Award, AlertTriangle, CheckCircle2,
  Calendar, Layers, Zap, Sliders, ChevronRight, Boxes,
  Flame, TrendingUp, Info, ArrowUpRight, Dumbbell, Factory
} from 'lucide-react';
import { DIVISION_PRESETS } from '../data/divisionData';

interface DivisionTrainingCalculatorProps {
  customDivisionStats?: {
    manpower: number;
    icCost: number;
    combatWidth: number;
    battalionCount: number;
    equipmentList: { name: string; count: number; icTotal: number }[];
  };
}

// Conscription laws and their training time penalty in HOI4
const CONSCRIPTION_LAWS = [
  { id: 'volunteer', name: 'Volunteer Only (1.5%)', penalty: 0, desc: 'Tidak ada penalti waktu latih' },
  { id: 'limited', name: 'Limited Conscription (2.5%)', penalty: 0, desc: 'Standar netral tanpa penalti' },
  { id: 'extensive', name: 'Extensive Conscription (5%)', penalty: 0.10, desc: '+10% Waktu Pelatihan' },
  { id: 'service', name: 'Service by Requirement (10%)', penalty: 0.20, desc: '+20% Waktu Pelatihan' },
  { id: 'all_adults', name: 'All Adults Serve (20%)', penalty: 0.30, desc: '+30% Waktu Pelatihan parah' },
  { id: 'scraping', name: 'Scraping the Barrel (25%)', penalty: 0.50, desc: '+50% Waktu Pelatihan ekstrem' }
];

// Officer Corps / Army Spirit modifiers
const ARMY_SPIRITS = [
  { id: 'none', name: 'Tanpa Modif Khusus', modifier: 0 },
  { id: 'professional', name: 'Professional Officer Corps (-10% Waktu)', modifier: -0.10 },
  { id: 'bold', name: 'Bold Attack / Drillmaster (-5% Waktu)', modifier: -0.05 },
  { id: 'relief', name: 'Relief of Command (+10% Waktu)', modifier: 0.10 }
];

export const DivisionTrainingCalculator: React.FC<DivisionTrainingCalculatorProps> = ({
  customDivisionStats
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(DIVISION_PRESETS[0].id);
  const [divisionCount, setDivisionCount] = useState<number>(12); // total divisions to train
  const [parallelLines, setParallelLines] = useState<number>(6); // concurrent deployment lines
  const [selectedLawId, setSelectedLawId] = useState<string>('limited');
  const [selectedSpiritId, setSelectedSpiritId] = useState<string>('none');
  const [equipmentFulfillment, setEquipmentFulfillment] = useState<number>(100); // 10% to 100% equipment availability
  const [trainingTarget, setTrainingTarget] = useState<'early_conscript' | 'trained' | 'regular_exercised'>('trained');

  // Find active template
  const activeTemplate = useMemo(() => {
    if (selectedTemplateId === 'custom' && customDivisionStats) {
      return {
        id: 'custom',
        name: 'Desain Kustom (Desainer 5x5 Aktif)',
        role: 'Kustom Player',
        combatWidth: customDivisionStats.combatWidth,
        manpower: customDivisionStats.manpower || 9600,
        costIC: customDivisionStats.icCost || 850,
        equipment: customDivisionStats.equipmentList.length > 0 ? customDivisionStats.equipmentList : [
          { name: 'Infantry Equipment', count: 900, icTotal: 450 },
          { name: 'Support Equipment', count: 30, icTotal: 120 },
          { name: 'Artillery', count: 36, icTotal: 144 }
        ],
        // Derive base training days by composition
        baseDays: customDivisionStats.combatWidth >= 30 ? 150 : 90
      };
    }

    const preset = DIVISION_PRESETS.find(p => p.id === selectedTemplateId) || DIVISION_PRESETS[0];

    // Determine base days based on battalion types in preset
    let baseDays = 90; // default infantry
    if (preset.battalions.some(b => b.iconType.includes('tank') || b.iconType.includes('armor'))) {
      baseDays = 150; // armored divisions
    } else if (preset.battalions.some(b => b.iconType.includes('motorized') || b.iconType.includes('mechanized'))) {
      baseDays = 120; // motorized / mechanized
    } else if (preset.battalions.some(b => ['marine', 'mountain', 'paratrooper'].includes(b.iconType))) {
      baseDays = 120; // special forces
    }

    // Extract equipment
    const equipment = preset.equipmentSummary && preset.equipmentSummary.length > 0
      ? preset.equipmentSummary
      : [
          { name: 'Infantry Equipment', count: 900, icTotal: 405 },
          { name: 'Support Equipment', count: 30, icTotal: 120 },
          { name: 'Artillery', count: 48, icTotal: 180 }
        ];

    // Estimate manpower: infantry ~1000, art ~500, tank ~500, support ~300
    const manpower = preset.battalions.reduce((acc, b) => {
      const perUnit = b.iconType === 'infantry' ? 1000 : (b.iconType.includes('tank') ? 500 : 600);
      return acc + (b.count * perUnit);
    }, preset.supportCompanies.length * 300);

    const costIC = parseInt(preset.stats.costIC.replace(/,/g, ''), 10) || 750;

    return {
      id: preset.id,
      name: preset.name,
      role: preset.role,
      combatWidth: preset.combatWidth,
      manpower,
      costIC,
      equipment,
      baseDays
    };
  }, [selectedTemplateId, customDivisionStats]);

  // Calculations
  const calculations = useMemo(() => {
    const conscriptionPenalty = CONSCRIPTION_LAWS.find(l => l.id === selectedLawId)?.penalty || 0;
    const spiritMod = ARMY_SPIRITS.find(s => s.id === selectedSpiritId)?.modifier || 0;

    // Base days for this division template
    const baseDays = activeTemplate.baseDays;

    // Modified 100% trained days
    const totalMultiplier = Math.max(0.6, 1 + conscriptionPenalty + spiritMod);
    const standardDays = Math.round(baseDays * totalMultiplier);

    // Effect of equipment shortage on training speed:
    // If equipment fulfillment is under 100%, training time stretches proportionally
    const equipmentSpeedFactor = Math.max(0.2, equipmentFulfillment / 100);
    const equipmentDelayedStandardDays = Math.round(standardDays / equipmentSpeedFactor);

    // Days based on target experience level:
    // Early Deployment (Conscript / Green) is 20% of required training in HOI4
    let targetDaysPerDiv = equipmentDelayedStandardDays;
    let xpPenaltyDesc = 'Tingkat Terlatih Normal (Level 2 Trained): 0% Penalti, Siap Tempur Penuh';
    let xpLevelName = 'Trained (Level 2)';

    if (trainingTarget === 'early_conscript') {
      targetDaysPerDiv = Math.max(18, Math.round(equipmentDelayedStandardDays * 0.20));
      xpPenaltyDesc = 'Penempatan Dini (Level 1 Green): -25% Penalti Tempur, Menghemat 80% Waktu!';
      xpLevelName = 'Conscript / Dini (Level 1)';
    } else if (trainingTarget === 'regular_exercised') {
      // Takes standard training + ~60 days of field exercise
      targetDaysPerDiv = equipmentDelayedStandardDays + 60;
      xpPenaltyDesc = 'Latihan Lapangan Penuh (Level 3 Regular): +25% Bonus Tempur Maksimal!';
      xpLevelName = 'Regular / Veteran (Level 3)';
    }

    // Parallel lines & Batch duration
    const concurrentLines = Math.min(parallelLines, divisionCount);
    const numberOfBatches = Math.ceil(divisionCount / Math.max(1, concurrentLines));
    const totalCalendarDays = targetDaysPerDiv * numberOfBatches;

    // Total manpower & equipment requirements
    const totalManpowerNeeded = activeTemplate.manpower * divisionCount;
    const totalICInvestment = activeTemplate.costIC * divisionCount;

    // Equipment breakdown for total queue
    const totalEquipmentBill = activeTemplate.equipment.map(eq => ({
      name: eq.name,
      perDiv: eq.count,
      totalQueue: eq.count * divisionCount,
      totalIC: eq.icTotal * divisionCount,
      suppliedNow: Math.round(eq.count * divisionCount * (equipmentFulfillment / 100)),
      deficit: Math.round(eq.count * divisionCount * (1 - (equipmentFulfillment / 100)))
    }));

    // Exercise attrition estimate: in HOI4 army exercise burns ~6% equipment annually
    const exerciseAttritionYearlyIC = Math.round(totalICInvestment * 0.06);
    const dailyAttritionIC = (exerciseAttritionYearlyIC / 365).toFixed(1);

    return {
      baseDays,
      standardDays,
      targetDaysPerDiv,
      totalCalendarDays,
      numberOfBatches,
      concurrentLines,
      xpPenaltyDesc,
      xpLevelName,
      totalManpowerNeeded,
      totalICInvestment,
      totalEquipmentBill,
      dailyAttritionIC,
      equipmentSpeedFactor
    };
  }, [activeTemplate, selectedLawId, selectedSpiritId, equipmentFulfillment, trainingTarget, divisionCount, parallelLines]);

  return (
    <div className="space-y-6 text-[#f1f5f9]">
      {/* Header Banner */}
      <div className="rounded-xl border border-[#2b3a32] bg-gradient-to-b from-[#141d18] via-[#101713] to-[#0c120e] p-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-[#223028] pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-sm">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold tracking-tight text-[#fef3c7]">
                  Kalkulator Waktu Latih Divisi (Training Queue &amp; Deployment)
                </h3>
                <span className="rounded bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-mono text-emerald-300 font-bold">
                  FORMULA HOI4 ASLI
                </span>
              </div>
              <p className="text-xs text-[#cbd5e1]">
                Hitung estimasi hari pelatihan dari barak antrean rekrutmen hingga penempatan front tempur berdasarkan hukum wajib militer, peralatan, dan penempatan dini (Early Deploy).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-[#0c1410] border border-[#223028] px-3 py-1.5 rounded-lg text-[#94a3b8]">
            <span>Antrean:</span>
            <span className="font-bold text-amber-400">{divisionCount} Divisi</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">{calculations.totalCalendarDays} Hari</span>
          </div>
        </div>

        {/* Template Selector Ribbon */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#fde047] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-amber-400" />
              Pilih Template Divisi:
            </span>
            <span className="text-[11px] font-mono text-[#94a3b8]">
              Lebar Tempur: <strong className="text-white">{activeTemplate.combatWidth}w</strong> | Biaya Base: <strong className="text-amber-300">{activeTemplate.baseDays} Hari</strong>
            </span>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {customDivisionStats && (
              <button
                onClick={() => setSelectedTemplateId('custom')}
                className={`px-3 py-2 rounded-lg border text-left text-xs transition-all ${
                  selectedTemplateId === 'custom'
                    ? 'border-amber-500 bg-amber-500/20 text-amber-200 font-bold shadow-md ring-1 ring-amber-500/50'
                    : 'border-[#223028] bg-[#0c1410] text-[#cbd5e1] hover:border-amber-500/50 hover:bg-[#16221a]'
                }`}
              >
                <div className="font-bold truncate text-amber-300">★ Desain Kustom</div>
                <div className="text-[10px] text-[#94a3b8] font-mono mt-0.5">
                  {customDivisionStats.combatWidth}w • {customDivisionStats.manpower.toLocaleString()} Pria
                </div>
              </button>
            )}

            {DIVISION_PRESETS.slice(0, 11).map(preset => {
              const isSelected = preset.id === selectedTemplateId;
              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedTemplateId(preset.id)}
                  className={`px-3 py-2 rounded-lg border text-left text-xs transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/20 text-amber-200 font-bold shadow-md ring-1 ring-amber-500/50'
                      : 'border-[#223028] bg-[#0c1410] text-[#cbd5e1] hover:border-amber-500/50 hover:bg-[#16221a]'
                  }`}
                >
                  <div className="font-bold truncate text-[#f1f5f9]">{preset.name}</div>
                  <div className="text-[10px] text-[#94a3b8] font-mono mt-0.5 flex items-center justify-between">
                    <span>{preset.combatWidth}w</span>
                    <span className="text-amber-400/80">{preset.role.split(' ')[0]}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Parameters Configuration Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Column 1: Queue & Concurrency */}
        <div className="rounded-xl border border-[#223028] bg-[#0d1410] p-4 space-y-4">
          <h4 className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-[#223028] pb-2">
            <Layers className="h-4 w-4 text-amber-400" />
            1. Jumlah &amp; Jalur Antrean Divisi
          </h4>

          {/* Division Count */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#94a3b8]">Total Divisi Dilatih:</span>
              <span className="font-bold text-amber-300">{divisionCount} Divisi</span>
            </div>
            <input
              type="range"
              min="1"
              max="48"
              step="1"
              value={divisionCount}
              onChange={(e) => setDivisionCount(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-[#1a251e] rounded appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex gap-1.5 pt-1">
              {[1, 6, 12, 24, 48].map(cnt => (
                <button
                  key={cnt}
                  onClick={() => setDivisionCount(cnt)}
                  className={`flex-1 py-1 rounded text-[10px] font-mono border transition-colors ${
                    divisionCount === cnt
                      ? 'border-amber-500 bg-amber-500/20 text-amber-200 font-bold'
                      : 'border-[#223028] bg-[#141d18] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {cnt} div
                </button>
              ))}
            </div>
          </div>

          {/* Parallel Concurrency Lines */}
          <div className="space-y-1.5 pt-2 border-t border-[#223028]">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#94a3b8]">Jalur Paralel (Lines):</span>
              <span className="font-bold text-emerald-400">{parallelLines} Jalur Sekaligus</span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              step="1"
              value={parallelLines}
              onChange={(e) => setParallelLines(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-[#1a251e] rounded appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="text-[11px] text-[#94a3b8] font-mono">
              Divisi dilatih dalam <strong className="text-white">{calculations.numberOfBatches} gelombang (batch)</strong> bertahap.
            </div>
          </div>

          {/* Deployment Target Experience */}
          <div className="space-y-1.5 pt-2 border-t border-[#223028]">
            <label className="text-xs font-mono text-[#94a3b8] block">Target Kelulusan / Pelatihan:</label>
            <div className="space-y-1.5">
              <button
                onClick={() => setTrainingTarget('early_conscript')}
                className={`w-full p-2 rounded-lg border text-left text-xs transition-all ${
                  trainingTarget === 'early_conscript'
                    ? 'border-red-500 bg-red-950/40 text-red-200 font-bold ring-1 ring-red-500/50'
                    : 'border-[#223028] bg-[#141d18] text-[#cbd5e1] hover:bg-[#1a2620]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-300">⚡ Penempatan Dini (Early Deploy)</span>
                  <span className="text-[10px] font-mono bg-red-500/20 px-1.5 py-0.5 rounded text-red-300">20% Waktu</span>
                </div>
                <div className="text-[10px] text-[#94a3b8] mt-1 font-mono">
                  Dapat langsung diterjunkan di barak. Sangat berguna untuk rush syarat Manpower Anschluss / pertahanan darurat.
                </div>
              </button>

              <button
                onClick={() => setTrainingTarget('trained')}
                className={`w-full p-2 rounded-lg border text-left text-xs transition-all ${
                  trainingTarget === 'trained'
                    ? 'border-amber-500 bg-amber-500/20 text-amber-200 font-bold ring-1 ring-amber-500/50'
                    : 'border-[#223028] bg-[#141d18] text-[#cbd5e1] hover:bg-[#1a2620]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300">✓ Standar Terlatih (Trained)</span>
                  <span className="text-[10px] font-mono bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-300">100% Standar</span>
                </div>
                <div className="text-[10px] text-[#94a3b8] mt-1 font-mono">
                  Level 2 Trained. Tanpa penalti tempur dan langsung efektif saat terjun ke garis depan.
                </div>
              </button>

              <button
                onClick={() => setTrainingTarget('regular_exercised')}
                className={`w-full p-2 rounded-lg border text-left text-xs transition-all ${
                  trainingTarget === 'regular_exercised'
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold ring-1 ring-emerald-500/50'
                    : 'border-[#223028] bg-[#141d18] text-[#cbd5e1] hover:bg-[#1a2620]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-300">🎖️ Latihan Lapangan Penuh (Regular)</span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300">+25% Stat</span>
                </div>
                <div className="text-[10px] text-[#94a3b8] mt-1 font-mono">
                  Mencapai Level 3 dengan latihan militer lapangan pasca-deploy.
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: Laws & Modifiers */}
        <div className="rounded-xl border border-[#223028] bg-[#0d1410] p-4 space-y-4">
          <h4 className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-[#223028] pb-2">
            <Sliders className="h-4 w-4 text-amber-400" />
            2. Hukum Militer &amp; Ketersediaan Logistik
          </h4>

          {/* Conscription Law */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8]">Hukum Wajib Militer (Conscription Law):</label>
            <select
              value={selectedLawId}
              onChange={(e) => setSelectedLawId(e.target.value)}
              className="w-full rounded-lg border border-[#223028] bg-[#141d18] px-2.5 py-2 text-xs text-[#f1f5f9] outline-none focus:border-amber-500"
            >
              {CONSCRIPTION_LAWS.map(law => (
                <option key={law.id} value={law.id}>
                  {law.name} {law.penalty > 0 ? `(+${law.penalty * 100}% Waktu)` : '(0%)'}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-[#94a3b8] font-mono">
              {CONSCRIPTION_LAWS.find(l => l.id === selectedLawId)?.desc}
            </p>
          </div>

          {/* Spirit of Army */}
          <div className="space-y-1.5 pt-2 border-t border-[#223028]">
            <label className="text-xs font-mono text-[#94a3b8]">Doktrin / Spirit of Army (High Command):</label>
            <select
              value={selectedSpiritId}
              onChange={(e) => setSelectedSpiritId(e.target.value)}
              className="w-full rounded-lg border border-[#223028] bg-[#141d18] px-2.5 py-2 text-xs text-[#f1f5f9] outline-none focus:border-amber-500"
            >
              {ARMY_SPIRITS.map(spirit => (
                <option key={spirit.id} value={spirit.id}>
                  {spirit.name}
                </option>
              ))}
            </select>
          </div>

          {/* Equipment Stockpile Rate */}
          <div className="space-y-1.5 pt-2 border-t border-[#223028]">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#94a3b8]">Ketersediaan Senjata di Gudang:</span>
              <span className={`font-bold ${equipmentFulfillment < 100 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {equipmentFulfillment}% Terpenuhi
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={equipmentFulfillment}
              onChange={(e) => setEquipmentFulfillment(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-[#1a251e] rounded appearance-none cursor-pointer accent-emerald-500"
            />
            {equipmentFulfillment < 100 && (
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono flex items-start gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>
                  Kekurangan senjata memperlambat laju pelatihan hingga <strong>{Math.round((1 / calculations.equipmentSpeedFactor) * 100 - 100)}% lebih lama</strong>!
                </span>
              </div>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#223028] text-xs font-mono">
            <div className="p-2 rounded-lg bg-[#141d18] border border-[#223028]">
              <div className="text-[#94a3b8] text-[10px]">Waktu per Divisi:</div>
              <div className="text-base font-bold text-amber-300 mt-0.5">
                {calculations.targetDaysPerDiv} Hari
              </div>
            </div>
            <div className="p-2 rounded-lg bg-[#141d18] border border-[#223028]">
              <div className="text-[#94a3b8] text-[10px]">Total Kalender:</div>
              <div className="text-base font-bold text-emerald-400 mt-0.5">
                {calculations.totalCalendarDays} Hari
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Grand Summary Dashboard */}
        <div className="rounded-xl border border-amber-500/40 bg-gradient-to-b from-[#1c180f] to-[#111612] p-4 space-y-4 shadow-xl">
          <h4 className="text-xs font-serif font-bold text-[#fef08a] uppercase tracking-wider flex items-center justify-between border-b border-amber-500/30 pb-2">
            <span className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-400" />
              Hasil Estimasi Pelatihan
            </span>
            <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
              {calculations.xpLevelName}
            </span>
          </h4>

          {/* Big Highlight Box */}
          <div className="p-3.5 rounded-xl border border-[#b8860b]/40 bg-[#0f1712] space-y-2 text-center">
            <div className="text-xs text-[#94a3b8] font-mono">Total Waktu Selesai Seluruh Antrean:</div>
            <div className="text-3xl font-black font-mono text-[#fde047] tracking-tight">
              {calculations.totalCalendarDays} Hari
            </div>
            <div className="text-[11px] text-[#cbd5e1] font-mono">
              ~{(calculations.totalCalendarDays / 30).toFixed(1)} Bulan Kalender Perang
            </div>
            <div className="pt-2 border-t border-[#223028] text-[10px] text-[#94a3b8] font-mono text-left">
              {calculations.xpPenaltyDesc}
            </div>
          </div>

          {/* Key Resource Demands */}
          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#0c1410] border border-[#223028]">
              <span className="flex items-center gap-1.5 text-[#cbd5e1]">
                <Users className="h-3.5 w-3.5 text-sky-400" /> Manpower Diambil:
              </span>
              <span className="font-bold text-sky-300 text-sm">
                {calculations.totalManpowerNeeded.toLocaleString()} Pria
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#0c1410] border border-[#223028]">
              <span className="flex items-center gap-1.5 text-[#cbd5e1]">
                <Factory className="h-3.5 w-3.5 text-amber-400" /> Total Nilai Peralatan (IC):
              </span>
              <span className="font-bold text-amber-300 text-sm">
                {calculations.totalICInvestment.toLocaleString()} IC
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#0c1410] border border-[#223028]">
              <span className="flex items-center gap-1.5 text-[#cbd5e1]">
                <Dumbbell className="h-3.5 w-3.5 text-emerald-400" /> Attrisi Latihan Harian:
              </span>
              <span className="font-bold text-emerald-300 text-sm">
                ~{calculations.dailyAttritionIC} IC / hari
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Bill Breakdown for Queue */}
      <div className="rounded-xl border border-[#223028] bg-[#0d1410] p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#223028] pb-2">
          <h4 className="text-xs font-serif font-bold text-[#fef3c7] flex items-center gap-2">
            <Boxes className="h-4 w-4 text-amber-400" />
            Kebutuhan Logistik &amp; Perlengkapan untuk {divisionCount} Divisi ({activeTemplate.name})
          </h4>
          <span className="text-xs font-mono text-[#94a3b8]">
            Status Pemenuhan Gudang: <strong className="text-emerald-400">{equipmentFulfillment}%</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#223028] text-[#94a3b8] text-[11px]">
                <th className="py-2 px-3">Jenis Peralatan (Equipment)</th>
                <th className="py-2 px-3 text-right">Per Divisi</th>
                <th className="py-2 px-3 text-right">Total Kebutuhan Queue</th>
                <th className="py-2 px-3 text-right">Tersedia Saat Ini</th>
                <th className="py-2 px-3 text-right">Kekurangan / Defisit</th>
                <th className="py-2 px-3 text-right">Nilai IC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2a22]">
              {calculations.totalEquipmentBill.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#141d18] transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-[#f1f5f9] flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    {item.name}
                  </td>
                  <td className="py-2.5 px-3 text-right text-[#cbd5e1]">{item.perDiv.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-amber-300">{item.totalQueue.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">{item.suppliedNow.toLocaleString()}</td>
                  <td className={`py-2.5 px-3 text-right font-bold ${item.deficit > 0 ? 'text-red-400' : 'text-[#64748b]'}`}>
                    {item.deficit > 0 ? `-${item.deficit.toLocaleString()}` : 'Terpenuhi'}
                  </td>
                  <td className="py-2.5 px-3 text-right text-[#94a3b8]">{item.totalIC.toLocaleString()} IC</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Veteran Pro Tips / Guide Box */}
      <div className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-[#1f190e] via-[#141d18] to-[#0c1410] p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-300">
          <Info className="h-4 w-4" /> Trik Veteran HOI4: Mengunci Manpower &amp; Rushing Syarat Fokus Nasional
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono text-[#cbd5e1] mt-2">
          <div className="p-2.5 rounded-lg bg-[#0c120e] border border-[#223028] space-y-1">
            <div className="font-bold text-[#fef08a]">1. Early Deploy untuk Anschluss (Jerman)</div>
            <p className="text-[11px] text-[#94a3b8]">
              Fokus Jerman "Anschluss" butuh 500k prajurit di lapangan. Queue divisi infanteri 12w/18w, deploy begitu mencapai 20% progress latih, ambil fokus, lalu latih (exercise) mereka sesudahnya.
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0c120e] border border-[#223028] space-y-1">
            <div className="font-bold text-[#fef08a]">2. Manpower Locking Sebelum Demobilisasi</div>
            <p className="text-[11px] text-[#94a3b8]">
              Manpower yang masuk ke Training Queue tidak akan terhapus jika hukum wajib militer turun. Tempatkan antrean rekrutmen tanpa tanggal batas untuk menyimpan cadangan prajurit dari event pengurangan populasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
