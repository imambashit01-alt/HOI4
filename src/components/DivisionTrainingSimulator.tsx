import React, { useState, useMemo } from 'react';
import {
  Users, Clock, Award, Shield, Swords, AlertTriangle,
  CheckCircle2, Sparkles, TrendingUp, Sliders, RefreshCw,
  Zap, ChevronRight, Layers, FileText, Factory, Truck, HelpCircle, Flame
} from 'lucide-react';

export interface DivisionTemplatePreset {
  id: string;
  name: string;
  category: 'Infanteri' | 'Lapis Baja (Panzer)' | 'Bermotor' | 'Pasukan Khusus';
  icon: string;
  combatWidth: number;
  baseTrainingDays: number;
  manpowerPerDiv: number;
  equipmentRequirements: {
    infantryWeapons: number;
    supportEquipment: number;
    artillery: number;
    tanks: number;
    trucks: number;
    antiAir: number;
  };
  fuelPerDay: number; // in barrels if motorized/armor
  icCost: number; // total production cost
  description: string;
}

export const TEMPLATE_PRESETS: DivisionTemplatePreset[] = [
  {
    id: 'inf_9_1',
    name: '9 Infanteri + 1 Artileri (20w Meta Standard)',
    category: 'Infanteri',
    icon: '🛡️',
    combatWidth: 20,
    baseTrainingDays: 100,
    manpowerPerDiv: 9800,
    equipmentRequirements: {
      infantryWeapons: 950,
      supportEquipment: 40,
      artillery: 36,
      tanks: 0,
      trucks: 0,
      antiAir: 12
    },
    fuelPerDay: 0,
    icCost: 820,
    description: 'Divisi infanteri garis depan standar dengan daya tahan tinggi, ideal untuk menjaga front dan pertahanan defensif.'
  },
  {
    id: 'inf_9_3',
    name: '9 Infanteri + 3 Artileri (24w Serangan Garis)',
    category: 'Infanteri',
    icon: '💥',
    combatWidth: 24,
    baseTrainingDays: 110,
    manpowerPerDiv: 11200,
    equipmentRequirements: {
      infantryWeapons: 1050,
      supportEquipment: 45,
      artillery: 84,
      tanks: 0,
      trucks: 0,
      antiAir: 12
    },
    fuelPerDay: 0,
    icCost: 1150,
    description: 'Pukulan serangan lunak (Soft Attack) mematikan untuk mendobrak garis infanteri musuh tanpa menggunakan tank.'
  },
  {
    id: 'armor_medium_30w',
    name: '8 Medium Tank + 7 Motorized (30w Panzer Division)',
    category: 'Lapis Baja (Panzer)',
    icon: '🚜',
    combatWidth: 30,
    baseTrainingDays: 160,
    manpowerPerDiv: 11500,
    equipmentRequirements: {
      infantryWeapons: 650,
      supportEquipment: 50,
      artillery: 24,
      tanks: 350,
      trucks: 210,
      antiAir: 24
    },
    fuelPerDay: 185,
    icCost: 4800,
    description: 'Ujung tombak Blitzkrieg dengan ketebalan armor dan mobilitas tinggi untuk menjepit kantong pengepungan (encirclement).'
  },
  {
    id: 'armor_heavy_36w',
    name: '10 Heavy Tank + 8 Mechanized (36w Bunker Buster)',
    category: 'Lapis Baja (Panzer)',
    icon: '🐘',
    combatWidth: 36,
    baseTrainingDays: 180,
    manpowerPerDiv: 14200,
    equipmentRequirements: {
      infantryWeapons: 750,
      supportEquipment: 55,
      artillery: 36,
      tanks: 420,
      trucks: 120,
      antiAir: 36
    },
    fuelPerDay: 260,
    icCost: 8200,
    description: 'Monster penerobos garis pertahanan berat (Maginot Line / Stalin Line) dengan ketahanan tembakan anti-tank tertinggi.'
  },
  {
    id: 'motorized_20w',
    name: '9 Truk Bermotor + Support (20w Fast Exploitation)',
    category: 'Bermotor',
    icon: '🚚',
    combatWidth: 20,
    baseTrainingDays: 120,
    manpowerPerDiv: 10400,
    equipmentRequirements: {
      infantryWeapons: 950,
      supportEquipment: 40,
      artillery: 24,
      tanks: 0,
      trucks: 280,
      antiAir: 12
    },
    fuelPerDay: 95,
    icCost: 1650,
    description: 'Divisi cepat berkecepatan 12 km/jam untuk mengamankan persimpangan rel kereta dan kota penting di belakang musuh.'
  },
  {
    id: 'mountaineer_18w',
    name: '8 Pasukan Gunung + 2 Artileri Gunung (18w Alpinist)',
    category: 'Pasukan Khusus',
    icon: '⛰️',
    combatWidth: 18,
    baseTrainingDays: 140,
    manpowerPerDiv: 9200,
    equipmentRequirements: {
      infantryWeapons: 880,
      supportEquipment: 45,
      artillery: 48,
      tanks: 0,
      trucks: 0,
      antiAir: 0
    },
    fuelPerDay: 0,
    icCost: 1020,
    description: 'Pasukan elit khusus bertempur di pegunungan terjal (Alpen, Kaukasus) dengan konsumsi suplai hemat.'
  },
  {
    id: 'paratrooper_16w',
    name: '8 Pasukan Payung Penerjun (16w Fallschirmjäger)',
    category: 'Pasukan Khusus',
    icon: '🪂',
    combatWidth: 16,
    baseTrainingDays: 150,
    manpowerPerDiv: 7600,
    equipmentRequirements: {
      infantryWeapons: 820,
      supportEquipment: 40,
      artillery: 12,
      tanks: 0,
      trucks: 0,
      antiAir: 0
    },
    fuelPerDay: 0,
    icCost: 950,
    description: 'Pasukan terjun payung untuk merebut pelabuhan laut atau pangkalan udara musuh lewat invasi udara.'
  }
];

export interface TrainingModifier {
  id: string;
  name: string;
  type: 'spirit' | 'high_command' | 'conscription';
  speedPercent: number; // positive = faster training, negative = slower training
  description: string;
}

export const TRAINING_MODIFIERS: TrainingModifier[] = [
  {
    id: 'spirit_militarism',
    name: 'Semangat Militerisme (Militarism Spirit)',
    type: 'spirit',
    speedPercent: 10,
    description: '+10% Kecepatan Latihan Divisi dari fokus fasis/militer.'
  },
  {
    id: 'spirit_general_staff',
    name: 'Staf Umum Prussia / Jerman (Prussian General Staff)',
    type: 'spirit',
    speedPercent: 10,
    description: '+10% Kecepatan Pelatihan dan perencanaan doktrin.'
  },
  {
    id: 'spirit_warrior_traditions',
    name: 'Tradisi Prajurit Samurai Jepang (Warrior Traditions)',
    type: 'spirit',
    speedPercent: 15,
    description: '+15% Kecepatan Latihan dan disiplin Bushido.'
  },
  {
    id: 'spirit_officer_purge',
    name: 'Penalti Pembersihan Perwira Soviet (Great Officer Purge)',
    type: 'spirit',
    speedPercent: -30,
    description: '-30% Perlambatan Pelatihan akibat hilangnya jajaran perwira berpengalaman.'
  },
  {
    id: 'spirit_victors_great_war',
    name: 'Kelesuan Pemenang PD1 Prancis (Victors of the Great War)',
    type: 'spirit',
    speedPercent: -20,
    description: '-20% Doktrin konservatif menghambat modernisasi pelatihan tentara baru.'
  },
  {
    id: 'staff_army_reformer',
    name: 'Perombak Angkatan Darat (Army Reformer Genius)',
    type: 'high_command',
    speedPercent: 15,
    description: '+15% Kecepatan Latihan Divisi + Perolehan Army XP Harian.'
  },
  {
    id: 'staff_drill_master',
    name: 'Instruktur Baris-Berbaris (Drill Master Specialist)',
    type: 'high_command',
    speedPercent: 10,
    description: '+10% Mempercepat waktu latihan barak.'
  }
];

export const DivisionTrainingSimulator: React.FC = () => {
  // Selected Template
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('inf_9_1');

  // Queue & Deployment Batch
  const [queueCount, setQueueCount] = useState<number>(6); // number of divisions in parallel
  const [equipmentFulfillmentPercent, setEquipmentFulfillmentPercent] = useState<number>(100); // 10% to 100%

  // Conscription Law Selection
  const [conscriptionLaw, setConscriptionLaw] = useState<number>(0); // 0 = standard, -10 = service by req, -20 = all adults, -30 = scraping barrel

  // Selected Modifiers (Spirits & High Command)
  const [selectedModifierIds, setSelectedModifierIds] = useState<string[]>([
    'spirit_militarism',
    'staff_army_reformer'
  ]);

  // Deployment Target (Green vs Trained vs Regular)
  const [deploymentTarget, setDeploymentTarget] = useState<'green' | 'trained' | 'regular'>('trained');

  // Active template
  const template = useMemo(() => {
    return TEMPLATE_PRESETS.find(t => t.id === selectedTemplateId) || TEMPLATE_PRESETS[0];
  }, [selectedTemplateId]);

  // Toggle modifier
  const toggleModifier = (id: string) => {
    setSelectedModifierIds(prev =>
      prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
    );
  };

  // Calculation Engine
  const calculation = useMemo(() => {
    // 1. Calculate cumulative training speed modifier
    let totalSpeedMod = 0;
    selectedModifierIds.forEach(id => {
      const mod = TRAINING_MODIFIERS.find(m => m.id === id);
      if (mod) totalSpeedMod += mod.speedPercent;
    });

    // Add Conscription law penalty (higher conscription slows training)
    totalSpeedMod += conscriptionLaw;

    // 2. Deployment veterancy multiplier
    // Green = can deploy at 20% training (requires 0.2x time)
    // Trained = standard 100% (1.0x time)
    // Regular = requires post-deploy field exercise (+50% extra exercise days)
    let veterancyMultiplier = 1.0;
    if (deploymentTarget === 'green') veterancyMultiplier = 0.2;
    if (deploymentTarget === 'regular') veterancyMultiplier = 1.4;

    // 3. Equipment fulfillment penalty:
    // If equipment < 100%, training progress slows down linearly
    const equipSpeedMultiplier = Math.max(0.2, equipmentFulfillmentPercent / 100);

    // Effective training days formula in HOI4:
    // BaseDays / (1 + totalSpeedMod/100) * veterancyMultiplier / equipSpeedMultiplier
    const speedFactor = Math.max(0.2, 1 + totalSpeedMod / 100);
    const effectiveDaysPerDiv = Math.round(
      (template.baseTrainingDays / speedFactor) * veterancyMultiplier / equipSpeedMultiplier
    );

    const weeksToDeploy = (effectiveDaysPerDiv / 7).toFixed(1);

    // Batch Resource Totals
    const totalManpower = template.manpowerPerDiv * queueCount;
    const totalRifles = template.equipmentRequirements.infantryWeapons * queueCount;
    const totalSupport = template.equipmentRequirements.supportEquipment * queueCount;
    const totalArtillery = template.equipmentRequirements.artillery * queueCount;
    const totalTanks = template.equipmentRequirements.tanks * queueCount;
    const totalTrucks = template.equipmentRequirements.trucks * queueCount;
    const totalAntiAir = template.equipmentRequirements.antiAir * queueCount;
    const totalIC = template.icCost * queueCount;
    const totalDailyFuel = template.fuelPerDay * queueCount;

    // Factory Recommendation:
    // How many military factories (producing ~4.5 IC/day at 100% efficiency) needed to complete equipment by deploy day
    const icPerDayNeeded = totalIC / Math.max(1, effectiveDaysPerDiv);
    const estimatedFactoriesNeeded = Math.ceil(icPerDayNeeded / 4.5);

    return {
      totalSpeedMod,
      effectiveDaysPerDiv,
      weeksToDeploy,
      totalManpower,
      totalRifles,
      totalSupport,
      totalArtillery,
      totalTanks,
      totalTrucks,
      totalAntiAir,
      totalIC,
      totalDailyFuel,
      estimatedFactoriesNeeded
    };
  }, [template, queueCount, equipmentFulfillmentPercent, conscriptionLaw, selectedModifierIds, deploymentTarget]);

  return (
    <div className="space-y-6 text-[#f1f5f9]">
      {/* Header Banner */}
      <div className="rounded-xl border border-emerald-500/40 bg-gradient-to-r from-[#071911] via-[#0b2118] to-[#07131e] p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-inner">
              <Users className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#fef3c7] uppercase">
                  Simulator Pelatihan Divisi (Division Training Simulator)
                </h2>
                <span className="rounded bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[11px] font-mono text-emerald-300 font-bold">
                  MANPOWER &amp; KALKULASI LOGISTIK PABRIK
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#cbd5e1] mt-0.5 max-w-3xl">
                Hitung total waktu pelatihan barak militer, kebutuhan tenaga manusia (manpower), dan total stok peralatan (senapan, artileri, tank, truk) berdasarkan modifikator semangat nasional dan staf komando tinggi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-lg font-bold">
              Queue: {queueCount} Divisi Aktif
            </span>
          </div>
        </div>
      </div>

      {/* Primary KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Training Time */}
        <div className="p-4 rounded-xl border border-emerald-500/40 bg-[#071a12] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#cbd5e1]">Durasi Pelatihan Divisi</span>
            <Clock className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-emerald-400">
              {calculation.effectiveDaysPerDiv} Hari
            </span>
            <span className="text-xs text-[#94a3b8]">({calculation.weeksToDeploy} Minggu)</span>
          </div>
          <p className="text-[11px] text-[#cbd5e1] mt-1 font-mono">
            Basis Template: <strong className="text-white">{template.baseTrainingDays} Hari</strong> (Mod: {calculation.totalSpeedMod >= 0 ? `+${calculation.totalSpeedMod}%` : `${calculation.totalSpeedMod}%`})
          </p>
        </div>

        {/* KPI 2: Total Manpower Drafted */}
        <div className="p-4 rounded-xl border border-blue-500/40 bg-[#0c162c] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#cbd5e1]">Total Tenaga Manusia (Manpower)</span>
            <Users className="h-4 w-4 text-blue-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-blue-300">
              {calculation.totalManpower.toLocaleString()}
            </span>
            <span className="text-xs text-[#94a3b8]">Prajurit</span>
          </div>
          <p className="text-[11px] text-[#cbd5e1] mt-1 font-mono">
            Per Divisi: <strong className="text-white">{template.manpowerPerDiv.toLocaleString()} Men</strong>
          </p>
        </div>

        {/* KPI 3: Total Industrial Cost (IC) */}
        <div className="p-4 rounded-xl border border-amber-500/40 bg-[#1f1707] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#cbd5e1]">Biaya Produksi Pabrik (IC)</span>
            <Factory className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-amber-300">
              {calculation.totalIC.toLocaleString()}
            </span>
            <span className="text-xs text-[#94a3b8]">Poin IC</span>
          </div>
          <p className="text-[11px] text-[#cbd5e1] mt-1 font-mono">
            Kebutuhan: <strong className="text-white">~{calculation.estimatedFactoriesNeeded} Pabrik Militer</strong>
          </p>
        </div>

        {/* KPI 4: Target Veterancy & Combat Modifier */}
        <div className="p-4 rounded-xl border border-purple-500/40 bg-[#160d26] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#cbd5e1]">Tingkat Kemahiran (Veterancy)</span>
            <Award className="h-4 w-4 text-purple-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-purple-300 uppercase">
              {deploymentTarget === 'green' ? 'Green (Lv. 1)' : deploymentTarget === 'trained' ? 'Trained (Lv. 2)' : 'Regular (Lv. 3)'}
            </span>
          </div>
          <p className="text-[11px] text-[#cbd5e1] mt-1 font-mono">
            {deploymentTarget === 'green'
              ? '⚠️ Penalti Tempur: -25% Combat Stats (Deploy Darurat 20%)'
              : deploymentTarget === 'trained'
              ? '✅ Netral 100%: 0% Combat Modifier (Standar)'
              : '🌟 Bonus Tempur: +25% Combat Stats (Latihan Penuh)'}
          </p>
        </div>
      </div>

      {/* Main 3-Column Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Column 1: Template Selection (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-[#273256] bg-[#090e1c] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="border-b border-[#1b2542] pb-3">
              <h3 className="font-serif text-base font-bold text-[#fef3c7] flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" /> Pilih Template Divisi
              </h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Pilih komposisi divisi infanteri, lapis baja, bermotor, atau komando.
              </p>
            </div>

            <div className="space-y-2">
              {TEMPLATE_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedTemplateId(preset.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selectedTemplateId === preset.id
                      ? 'border-emerald-500 bg-emerald-950/60 text-white shadow ring-1 ring-emerald-400/50'
                      : 'border-[#1b2542] bg-[#0d1326] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs flex items-center gap-2 text-white">
                      <span>{preset.icon}</span>
                      <span>{preset.name}</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-white/10 px-1.5 py-0.5 rounded">
                      {preset.combatWidth}w
                    </span>
                  </div>
                  <p className="text-[10px] text-[#cbd5e1] mt-1 line-clamp-2">
                    {preset.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[10px] font-mono text-emerald-300">
                    <span>Waktu: {preset.baseTrainingDays} Hari</span>
                    <span>•</span>
                    <span>Manpower: {preset.manpowerPerDiv.toLocaleString()}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Training Modifiers & National Spirits (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-[#273256] bg-[#090e1c] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="border-b border-[#1b2542] pb-3">
              <h3 className="font-serif text-base font-bold text-[#fef3c7] flex items-center gap-2">
                <Sliders className="h-5 w-5 text-emerald-400" /> Modifikator Kecepatan Pelatihan
              </h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Pengaruh hukum wajib militer, semangat nasional, dan jajaran komando tinggi.
              </p>
            </div>

            {/* Target Veterancy Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#94a3b8] block">Target Pelatihan &amp; Penggelaran:</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'green', label: 'Green (20%)', desc: 'Cepat / Darurat' },
                  { id: 'trained', label: 'Trained (100%)', desc: 'Standar Pabrik' },
                  { id: 'regular', label: 'Regular (+40%)', desc: 'Latihan Lapangan' }
                ].map(lvl => (
                  <button
                    key={lvl.id}
                    onClick={() => setDeploymentTarget(lvl.id as any)}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      deploymentTarget === lvl.id
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-200 font-bold'
                        : 'border-[#1b2542] bg-[#0d1326] text-[#94a3b8]'
                    }`}
                  >
                    <div className="text-xs font-mono">{lvl.label}</div>
                    <div className="text-[9px] text-[#cbd5e1]">{lvl.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Conscription Laws Selector */}
            <div className="space-y-1.5 pt-2 border-t border-[#1b2542]">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#94a3b8]">Hukum Wajib Militer:</span>
                <strong className={conscriptionLaw < 0 ? 'text-amber-400' : 'text-emerald-300'}>
                  {conscriptionLaw === 0 ? 'Ekstensif (Normal)' : `${conscriptionLaw}% Pelatihan`}
                </strong>
              </div>
              <select
                value={conscriptionLaw}
                onChange={(e) => setConscriptionLaw(parseInt(e.target.value))}
                className="w-full rounded-lg border border-[#1b2542] bg-[#0d1326] p-2 text-xs font-mono font-bold text-white outline-none focus:border-emerald-500"
              >
                <option value={0} className="bg-[#090e1c]">Wajib Militer Terbatas / Ekstensif (0% Penalti)</option>
                <option value={-10} className="bg-[#090e1c]">Pelayanan Sesuai Kebutuhan (-10% Kecepatan Latihan)</option>
                <option value={-20} className="bg-[#090e1c]">Semua Dewasa Bertugas (-20% Kecepatan Latihan)</option>
                <option value={-30} className="bg-[#090e1c]">Mengikis Dasar Tong / Scraping Barrel (-30% Latihan)</option>
              </select>
            </div>

            {/* National Spirits & High Command Toggles */}
            <div className="space-y-2 pt-2 border-t border-[#1b2542]">
              <span className="text-xs font-mono text-[#94a3b8] block">Semangat Nasional &amp; Staf Ahli:</span>
              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                {TRAINING_MODIFIERS.map(mod => {
                  const active = selectedModifierIds.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => toggleModifier(mod.id)}
                      className={`p-2 rounded-lg border cursor-pointer transition-all ${
                        active
                          ? 'border-emerald-500/80 bg-emerald-950/40 text-emerald-100'
                          : 'border-[#1b2542] bg-[#0d1326] opacity-75 hover:opacity-100 text-[#94a3b8]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs text-white block">{mod.name}</strong>
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          mod.speedPercent > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                        }`}>
                          {mod.speedPercent > 0 ? `+${mod.speedPercent}%` : `${mod.speedPercent}%`}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#cbd5e1] mt-0.5">{mod.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Batch Queue & Total Equipment Bill (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-[#273256] bg-[#090e1c] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="border-b border-[#1b2542] pb-3">
              <h3 className="font-serif text-base font-bold text-[#fef3c7] flex items-center gap-2">
                <Factory className="h-5 w-5 text-emerald-400" /> Antrean Batch &amp; Logistik Pabrik
              </h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Tentukan jumlah divisi yang dilatih serentak dan pasokan senjata.
              </p>
            </div>

            {/* Queue Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#94a3b8]">Jumlah Divisi Dilatih Serentak:</span>
                <strong className="text-emerald-300">{queueCount} Divisi Pararel</strong>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                value={queueCount}
                onChange={(e) => setQueueCount(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#64748b] font-mono">
                <span>1 Divisi (Uji Coba)</span>
                <span>12 Divisi (1 Korps)</span>
                <span>24 Divisi (1 Angkatan Darat Penuh)</span>
              </div>
            </div>

            {/* Equipment Fulfillment Slider */}
            <div className="space-y-1.5 pt-2 border-t border-[#1b2542]">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#94a3b8]">Tingkat Pemenuhan Senjata:</span>
                <strong className={equipmentFulfillmentPercent === 100 ? 'text-emerald-300' : 'text-amber-400'}>
                  {equipmentFulfillmentPercent}% Pasokan
                </strong>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="10"
                value={equipmentFulfillmentPercent}
                onChange={(e) => setEquipmentFulfillmentPercent(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-[10px] text-[#cbd5e1] font-mono">
                {equipmentFulfillmentPercent < 100
                  ? `⚠️ Defisit stok senjata memperlambat waktu barak hingga ${(100 / equipmentFulfillmentPercent).toFixed(1)}x lipat!`
                  : '✅ Senjata terpenuhi penuh: pelatihan berjalan dengan kecepatan optimal.'}
              </p>
            </div>

            {/* Total Bill of Equipment for the Batch */}
            <div className="space-y-2 pt-2 border-t border-[#1b2542]">
              <span className="text-xs font-mono text-[#94a3b8] block">Total Kebutuhan Materiel ({queueCount} Divisi):</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-black/40 border border-[#1b2542]">
                  <span className="text-[#94a3b8] text-[10px] block">Senapan Infanteri:</span>
                  <strong className="text-white text-sm">{calculation.totalRifles.toLocaleString()}</strong>
                </div>
                <div className="p-2 rounded bg-black/40 border border-[#1b2542]">
                  <span className="text-[#94a3b8] text-[10px] block">Peralatan Bantuan:</span>
                  <strong className="text-white text-sm">{calculation.totalSupport.toLocaleString()}</strong>
                </div>
                <div className="p-2 rounded bg-black/40 border border-[#1b2542]">
                  <span className="text-[#94a3b8] text-[10px] block">Meriam Artileri:</span>
                  <strong className="text-amber-300 text-sm">{calculation.totalArtillery.toLocaleString()}</strong>
                </div>
                <div className="p-2 rounded bg-black/40 border border-[#1b2542]">
                  <span className="text-[#94a3b8] text-[10px] block">Tank / Kendaraan:</span>
                  <strong className="text-sky-300 text-sm">{calculation.totalTanks.toLocaleString()}</strong>
                </div>
                {calculation.totalTrucks > 0 && (
                  <div className="p-2 rounded bg-black/40 border border-[#1b2542]">
                    <span className="text-[#94a3b8] text-[10px] block">Truk Bermotor:</span>
                    <strong className="text-emerald-300 text-sm">{calculation.totalTrucks.toLocaleString()}</strong>
                  </div>
                )}
                {calculation.totalDailyFuel > 0 && (
                  <div className="p-2 rounded bg-black/40 border border-[#1b2542]">
                    <span className="text-[#94a3b8] text-[10px] block">Bahan Bakar/Hari:</span>
                    <strong className="text-amber-400 text-sm">{calculation.totalDailyFuel.toLocaleString()} L</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Staf General Advice */}
            <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-xs font-mono text-emerald-200">
              💡 <strong>Tips Staf Ahli:</strong> Untuk menggelar seluruh {queueCount} divisi tepat waktu dalam {calculation.effectiveDaysPerDiv} hari, pastikan minimal <strong>{calculation.estimatedFactoriesNeeded} Pabrik Militer</strong> aktif beroperasi memproduksi pesanan di atas!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
