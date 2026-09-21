import React, { useState, useMemo } from 'react';
import {
  Users, Truck, Shield, AlertTriangle, CheckCircle2, Factory, Clock,
  TrendingDown, RotateCcw, Copy, Check, Flame, Layers, Activity, FileText,
  HelpCircle, Info, Gauge, ShieldAlert, Crosshair, Sparkles
} from 'lucide-react';

interface DivisionGroup {
  id: string;
  name: string;
  count: number;
  manpowerPerDiv: number;
  riflesPerDiv: number;
  artilleryPerDiv: number;
  supportEqPerDiv: number;
  trucksPerDiv: number;
  tanksPerDiv: number;
  antiAirPerDiv: number;
  dailyFuelPerDiv: number; // liters/day
  dailySupplyPerDiv: number; // supply weight
}

interface PresetScenario {
  id: string;
  title: string;
  country: string;
  description: string;
  groups: DivisionGroup[];
  trainingDivs: number;
  trainingDays: number;
  isDrilling: boolean;
  intensity: 'peacetime' | 'skirmish' | 'active_offensive' | 'total_war';
  fieldHospitalLevel: number; // 0 to 4
  occupiedStates: number;
  resistanceLevel: 'low' | 'medium' | 'high';
  garrisonLaw: 'civilian' | 'local_police' | 'military_governor' | 'martial_law';
  nationalManpowerPool: number;
  availableMils: number;
}

const DEFAULT_PRESETS: PresetScenario[] = [
  {
    id: 'wehrmacht_1941',
    title: 'Wehrmacht: Operasi Barbarossa (1941)',
    country: 'Jerman (GER)',
    description: 'Armada darat masif 160+ divisi dengan korps lapis baja menembus lumpur Rusia dalam ofensif intensitas tinggi.',
    groups: [
      {
        id: 'inf_line',
        name: 'Infanteri Garis Depan (21w 9/1)',
        count: 120,
        manpowerPerDiv: 9600,
        riflesPerDiv: 920,
        artilleryPerDiv: 36,
        supportEqPerDiv: 40,
        trucksPerDiv: 20,
        tanksPerDiv: 0,
        antiAirPerDiv: 20,
        dailyFuelPerDiv: 1.2,
        dailySupplyPerDiv: 1.15
      },
      {
        id: 'panzer_med',
        name: 'Korps Panzer Medium (30w Lapis Baja)',
        count: 24,
        manpowerPerDiv: 11200,
        riflesPerDiv: 650,
        artilleryPerDiv: 0,
        supportEqPerDiv: 60,
        trucksPerDiv: 140,
        tanksPerDiv: 160,
        antiAirPerDiv: 30,
        dailyFuelPerDiv: 28.5,
        dailySupplyPerDiv: 2.45
      },
      {
        id: 'mot_mech',
        name: 'Divisi Motorized Bergerak Cepat',
        count: 16,
        manpowerPerDiv: 10400,
        riflesPerDiv: 850,
        artilleryPerDiv: 24,
        supportEqPerDiv: 50,
        trucksPerDiv: 220,
        tanksPerDiv: 0,
        antiAirPerDiv: 20,
        dailyFuelPerDiv: 18.2,
        dailySupplyPerDiv: 1.85
      }
    ],
    trainingDivs: 18,
    trainingDays: 120,
    isDrilling: false,
    intensity: 'total_war',
    fieldHospitalLevel: 2,
    occupiedStates: 16,
    resistanceLevel: 'medium',
    garrisonLaw: 'military_governor',
    nationalManpowerPool: 850000,
    availableMils: 75
  },
  {
    id: 'red_army_1941',
    title: 'Tentara Merah: Pertahanan Tanah Air (1941)',
    country: 'Uni Soviet (SOV)',
    description: 'Ratusan divisi senapan infanteri menahan gempuran dengan rekrutmen massal tanpa henti di bawah Doktrin Deep Battle.',
    groups: [
      {
        id: 'sov_inf',
        name: 'Divisi Senapan Infanteri Rakyat (18w)',
        count: 180,
        manpowerPerDiv: 8800,
        riflesPerDiv: 820,
        artilleryPerDiv: 24,
        supportEqPerDiv: 30,
        trucksPerDiv: 10,
        tanksPerDiv: 0,
        antiAirPerDiv: 15,
        dailyFuelPerDiv: 0.8,
        dailySupplyPerDiv: 0.95
      },
      {
        id: 'sov_tank',
        name: 'Brigade Tank T-34 Lapis Baja',
        count: 20,
        manpowerPerDiv: 9800,
        riflesPerDiv: 500,
        artilleryPerDiv: 0,
        supportEqPerDiv: 50,
        trucksPerDiv: 100,
        tanksPerDiv: 140,
        antiAirPerDiv: 20,
        dailyFuelPerDiv: 24.0,
        dailySupplyPerDiv: 2.2
      }
    ],
    trainingDivs: 30,
    trainingDays: 90,
    isDrilling: false,
    intensity: 'total_war',
    fieldHospitalLevel: 1,
    occupiedStates: 4,
    resistanceLevel: 'low',
    garrisonLaw: 'civilian',
    nationalManpowerPool: 2400000,
    availableMils: 60
  },
  {
    id: 'allies_normandy_1944',
    title: 'Sekutu Barat: Ofensif Normandy (1944)',
    country: 'Amerika Serikat & Inggris',
    description: 'Divisi modern berperalatan lengkap, motorisasi tinggi, rumah sakit lapangan canggih, dan dukungan udara total.',
    groups: [
      {
        id: 'us_inf',
        name: 'US Motorized Infantry (21w)',
        count: 50,
        manpowerPerDiv: 10200,
        riflesPerDiv: 940,
        artilleryPerDiv: 36,
        supportEqPerDiv: 55,
        trucksPerDiv: 85,
        tanksPerDiv: 0,
        antiAirPerDiv: 25,
        dailyFuelPerDiv: 8.5,
        dailySupplyPerDiv: 1.4
      },
      {
        id: 'us_armor',
        name: 'US Armored Division (Sherman/Firefly)',
        count: 18,
        manpowerPerDiv: 11500,
        riflesPerDiv: 600,
        artilleryPerDiv: 0,
        supportEqPerDiv: 65,
        trucksPerDiv: 160,
        tanksPerDiv: 180,
        antiAirPerDiv: 30,
        dailyFuelPerDiv: 32.0,
        dailySupplyPerDiv: 2.6
      }
    ],
    trainingDivs: 10,
    trainingDays: 140,
    isDrilling: true,
    intensity: 'active_offensive',
    fieldHospitalLevel: 4,
    occupiedStates: 10,
    resistanceLevel: 'low',
    garrisonLaw: 'local_police',
    nationalManpowerPool: 1200000,
    availableMils: 110
  },
  {
    id: 'minor_defense',
    title: 'Negara Minor: Pertahanan Hemat Logistik',
    country: 'Negara Minor (Polandia/Finlandia/Turki)',
    description: 'Konservasi sumber daya ketat, keterbatasan prajurit, dan ketergantungan pada parit dengan bantuan rumah sakit.',
    groups: [
      {
        id: 'minor_inf',
        name: 'Infanteri Parit Penghematan (15w-18w)',
        count: 24,
        manpowerPerDiv: 8200,
        riflesPerDiv: 740,
        artilleryPerDiv: 12,
        supportEqPerDiv: 25,
        trucksPerDiv: 5,
        tanksPerDiv: 0,
        antiAirPerDiv: 15,
        dailyFuelPerDiv: 0.4,
        dailySupplyPerDiv: 0.85
      }
    ],
    trainingDivs: 3,
    trainingDays: 120,
    isDrilling: false,
    intensity: 'skirmish',
    fieldHospitalLevel: 3,
    occupiedStates: 0,
    resistanceLevel: 'low',
    garrisonLaw: 'local_police',
    nationalManpowerPool: 180000,
    availableMils: 14
  }
];

export const ManpowerLogisticsCalculator: React.FC = () => {
  // State
  const [selectedPresetId, setSelectedPresetId] = useState<string>('wehrmacht_1941');
  const [groups, setGroups] = useState<DivisionGroup[]>(DEFAULT_PRESETS[0].groups);

  // Training & Queue
  const [trainingDivs, setTrainingDivs] = useState<number>(DEFAULT_PRESETS[0].trainingDivs);
  const [trainingDays, setTrainingDays] = useState<number>(DEFAULT_PRESETS[0].trainingDays);
  const [isDrilling, setIsDrilling] = useState<boolean>(DEFAULT_PRESETS[0].isDrilling);

  // Combat & Reinforcement Intensity
  const [intensity, setIntensity] = useState<'peacetime' | 'skirmish' | 'active_offensive' | 'total_war'>(
    DEFAULT_PRESETS[0].intensity
  );
  const [fieldHospitalLevel, setFieldHospitalLevel] = useState<number>(DEFAULT_PRESETS[0].fieldHospitalLevel);

  // Garrison & Resistance
  const [occupiedStates, setOccupiedStates] = useState<number>(DEFAULT_PRESETS[0].occupiedStates);
  const [resistanceLevel, setResistanceLevel] = useState<'low' | 'medium' | 'high'>(
    DEFAULT_PRESETS[0].resistanceLevel
  );
  const [garrisonLaw, setGarrisonLaw] = useState<'civilian' | 'local_police' | 'military_governor' | 'martial_law'>(
    DEFAULT_PRESETS[0].garrisonLaw
  );

  // National Context
  const [nationalManpowerPool, setNationalManpowerPool] = useState<number>(DEFAULT_PRESETS[0].nationalManpowerPool);
  const [availableMils, setAvailableMils] = useState<number>(DEFAULT_PRESETS[0].availableMils);
  const [copied, setCopied] = useState<boolean>(false);

  // Apply preset
  const handleApplyPreset = (presetId: string) => {
    const preset = DEFAULT_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    setSelectedPresetId(presetId);
    setGroups(JSON.parse(JSON.stringify(preset.groups)));
    setTrainingDivs(preset.trainingDivs);
    setTrainingDays(preset.trainingDays);
    setIsDrilling(preset.isDrilling);
    setIntensity(preset.intensity);
    setFieldHospitalLevel(preset.fieldHospitalLevel);
    setOccupiedStates(preset.occupiedStates);
    setResistanceLevel(preset.resistanceLevel);
    setGarrisonLaw(preset.garrisonLaw);
    setNationalManpowerPool(preset.nationalManpowerPool);
    setAvailableMils(preset.availableMils);
  };

  // Group modifiers
  const handleUpdateGroupCount = (id: string, count: number) => {
    setGroups(prev => prev.map(g => (g.id === id ? { ...g, count: Math.max(0, count) } : g)));
  };

  // Field hospital recovery rates:
  // None: 0%, I: 20%, II: 30%, III: 40%, IV: 50%
  const tricklebackRate = useMemo(() => {
    switch (fieldHospitalLevel) {
      case 1: return 0.20;
      case 2: return 0.30;
      case 3: return 0.40;
      case 4: return 0.50;
      default: return 0.0;
    }
  }, [fieldHospitalLevel]);

  // Operational Intensity Monthly Casualty and Equipment loss percentage
  const intensityData = useMemo(() => {
    switch (intensity) {
      case 'peacetime':
        return {
          label: 'Masa Damai (0% Pertempuran)',
          casualtyRate: 0.0,
          equipmentLossRate: 0.005, // 0.5% standard maintenance breakdown
          desc: 'Pasukan bersiaga di pangkalan. Kerugian hanya dari keausan rutin atau latihan.'
        };
      case 'skirmish':
        return {
          label: 'Perang Dingin / Skirmish Ringan (3% Korban/Bulan)',
          casualtyRate: 0.03,
          equipmentLossRate: 0.035,
          desc: 'Pertempuran patroli perbatasan, duel artileri terbatas, dan skirmish terisolasi.'
        };
      case 'active_offensive':
        return {
          label: 'Ofensif Standar Aktif (10% Korban/Bulan)',
          casualtyRate: 0.10,
          equipmentLossRate: 0.11,
          desc: 'Operasi manuver tempur penuh, penyerangan parit lawan, dan serangan balik berkala.'
        };
      case 'total_war':
        return {
          label: 'Perang Total / Meatgrinder (20% Korban/Bulan)',
          casualtyRate: 0.20,
          equipmentLossRate: 0.22,
          desc: 'Pertempuran brutal tanpa henti seperti Pertempuran Stalingrad, Kursk, atau Berlin.'
        };
    }
  }, [intensity]);

  // Garrison casualty drain calculation
  const garrisonDrain = useMemo(() => {
    if (occupiedStates <= 0) return { monthlyManpowerLoss: 0, monthlyRiflesLoss: 0 };
    let resistMult = 1.0;
    if (resistanceLevel === 'low') resistMult = 0.6;
    if (resistanceLevel === 'medium') resistMult = 1.2;
    if (resistanceLevel === 'high') resistMult = 2.4;

    let lawMult = 1.0;
    if (garrisonLaw === 'civilian') lawMult = 1.3; // high casualties for garrison
    if (garrisonLaw === 'local_police') lawMult = 0.85;
    if (garrisonLaw === 'military_governor') lawMult = 1.0;
    if (garrisonLaw === 'martial_law') lawMult = 0.7;

    const baseLossPerState = 85; // base monthly garrison casualties
    const monthlyManpowerLoss = Math.round(occupiedStates * baseLossPerState * resistMult * lawMult);
    const monthlyRiflesLoss = Math.round(monthlyManpowerLoss * 0.75);

    return { monthlyManpowerLoss, monthlyRiflesLoss };
  }, [occupiedStates, resistanceLevel, garrisonLaw]);

  // Calculate totals
  const calculations = useMemo(() => {
    let totalDivisions = 0;
    let totalStandingManpower = 0;
    let totalRiflesStock = 0;
    let totalArtilleryStock = 0;
    let totalSupportEqStock = 0;
    let totalTrucksStock = 0;
    let totalTanksStock = 0;
    let totalAntiAirStock = 0;
    let totalDailyFuel = 0;
    let totalDailySupply = 0;

    groups.forEach(g => {
      totalDivisions += g.count;
      totalStandingManpower += g.count * g.manpowerPerDiv;
      totalRiflesStock += g.count * g.riflesPerDiv;
      totalArtilleryStock += g.count * g.artilleryPerDiv;
      totalSupportEqStock += g.count * g.supportEqPerDiv;
      totalTrucksStock += g.count * g.trucksPerDiv;
      totalTanksStock += g.count * g.tanksPerDiv;
      totalAntiAirStock += g.count * g.antiAirPerDiv;
      totalDailyFuel += g.count * g.dailyFuelPerDiv;
      totalDailySupply += g.count * g.dailySupplyPerDiv;
    });

    // 1. Training Manpower Pull (Recruit draft per month)
    // Formula: (Training Divs * Average Manpower) / (Training Days / 30)
    const avgManpowerPerDiv = totalDivisions > 0 ? totalStandingManpower / totalDivisions : 9500;
    const trainingMonths = Math.max(1, trainingDays / 30);
    const monthlyTrainingManpowerDraft = Math.round((trainingDivs * avgManpowerPerDiv) / trainingMonths);

    // 2. Training Equipment Intake (Equipping the new divisions in queue)
    const avgRiflesPerDiv = totalDivisions > 0 ? totalRiflesStock / totalDivisions : 850;
    const avgArtilleryPerDiv = totalDivisions > 0 ? totalArtilleryStock / totalDivisions : 28;
    const avgSupportEqPerDiv = totalDivisions > 0 ? totalSupportEqStock / totalDivisions : 38;
    const avgTrucksPerDiv = totalDivisions > 0 ? totalTrucksStock / totalDivisions : 40;
    const avgTanksPerDiv = totalDivisions > 0 ? totalTanksStock / totalDivisions : 30;
    const avgAntiAirPerDiv = totalDivisions > 0 ? totalAntiAirStock / totalDivisions : 18;

    const monthlyTrainingRifles = Math.round((trainingDivs * avgRiflesPerDiv) / trainingMonths);
    const monthlyTrainingArtillery = Math.round((trainingDivs * avgArtilleryPerDiv) / trainingMonths);
    const monthlyTrainingSupportEq = Math.round((trainingDivs * avgSupportEqPerDiv) / trainingMonths);
    const monthlyTrainingTrucks = Math.round((trainingDivs * avgTrucksPerDiv) / trainingMonths);
    const monthlyTrainingTanks = Math.round((trainingDivs * avgTanksPerDiv) / trainingMonths);
    const monthlyTrainingAntiAir = Math.round((trainingDivs * avgAntiAirPerDiv) / trainingMonths);

    // 3. Drill / Exercise Attrition (if training existing standing armies)
    const drillMult = isDrilling ? 0.055 : 0; // 5.5% drill wear & tear per month
    const monthlyDrillRifles = Math.round(totalRiflesStock * drillMult);
    const monthlyDrillArtillery = Math.round(totalArtilleryStock * drillMult);
    const monthlyDrillSupportEq = Math.round(totalSupportEqStock * drillMult);
    const monthlyDrillTrucks = Math.round(totalTrucksStock * drillMult);
    const monthlyDrillTanks = Math.round(totalTanksStock * drillMult);

    // 4. Combat Losses (Reinforcement needs based on operational intensity)
    const grossCombatCasualties = Math.round(totalStandingManpower * intensityData.casualtyRate);
    const savedByHospitals = Math.round(grossCombatCasualties * tricklebackRate);
    const netCombatCasualties = grossCombatCasualties - savedByHospitals;

    // Combat equipment attrition & destruction
    const eqLossRate = intensityData.equipmentLossRate;
    const combatRiflesLoss = Math.round(totalRiflesStock * eqLossRate);
    const combatArtilleryLoss = Math.round(totalArtilleryStock * eqLossRate);
    const combatSupportEqLoss = Math.round(totalSupportEqStock * eqLossRate);
    const combatTrucksLoss = Math.round(totalTrucksStock * eqLossRate);
    const combatTanksLoss = Math.round(totalTanksStock * eqLossRate);
    const combatAntiAirLoss = Math.round(totalAntiAirStock * eqLossRate);

    // 5. Total Monthly Manpower Drain
    const totalMonthlyManpowerDrain = netCombatCasualties + monthlyTrainingManpowerDraft + garrisonDrain.monthlyManpowerLoss;

    // Manpower Runway in Months
    const manpowerRunwayMonths = totalMonthlyManpowerDrain > 0
      ? (nationalManpowerPool / totalMonthlyManpowerDrain).toFixed(1)
      : 'Tak Terhingga (Aman)';

    // 6. Total Monthly Equipment Drain
    const totalMonthlyRiflesDrain = combatRiflesLoss + monthlyTrainingRifles + monthlyDrillRifles + garrisonDrain.monthlyRiflesLoss;
    const totalMonthlyArtilleryDrain = combatArtilleryLoss + monthlyTrainingArtillery + monthlyDrillArtillery;
    const totalMonthlySupportEqDrain = combatSupportEqLoss + monthlyTrainingSupportEq + monthlyDrillSupportEq;
    const totalMonthlyTrucksDrain = combatTrucksLoss + monthlyTrainingTrucks + monthlyDrillTrucks;
    const totalMonthlyTanksDrain = combatTanksLoss + monthlyTrainingTanks + monthlyDrillTanks;
    const totalMonthlyAntiAirDrain = combatAntiAirLoss + monthlyTrainingAntiAir;

    // 7. Military Factories (Mils) Required to Break-Even
    // In HOI4: 1 Military Factory generates ~4.5 Industrial Capacity (IC) per day, ~135 IC per month.
    // Base IC costs:
    // - Infantry Rifle: 0.5 IC -> 1 Mil produces ~270 rifles/month
    // - Towed Artillery: 3.5 IC -> 1 Mil produces ~38 art/month
    // - Support Equipment: 4.0 IC -> 1 Mil produces ~33.7 support eq/month
    // - Motorized Truck: 2.5 IC -> 1 Mil produces ~54 trucks/month
    // - Medium Tank: 12.0 IC -> 1 Mil produces ~11.25 tanks/month
    // - Towed Anti-Air: 4.0 IC -> 1 Mil produces ~33.7 AA/month
    const milsForRifles = Math.ceil(totalMonthlyRiflesDrain / 270);
    const milsForArtillery = Math.ceil(totalMonthlyArtilleryDrain / 38);
    const milsForSupportEq = Math.ceil(totalMonthlySupportEqDrain / 34);
    const milsForTrucks = Math.ceil(totalMonthlyTrucksDrain / 54);
    const milsForTanks = Math.ceil(totalMonthlyTanksDrain / 11.2);
    const milsForAntiAir = Math.ceil(totalMonthlyAntiAirDrain / 34);

    const totalRequiredMils = milsForRifles + milsForArtillery + milsForSupportEq + milsForTrucks + milsForTanks + milsForAntiAir;
    const milsDeficitOrSurplus = availableMils - totalRequiredMils;

    return {
      totalDivisions,
      totalStandingManpower,
      monthlyTrainingManpowerDraft,
      grossCombatCasualties,
      savedByHospitals,
      netCombatCasualties,
      totalMonthlyManpowerDrain,
      manpowerRunwayMonths,
      totalDailyFuel,
      totalDailySupply,
      // Equipment
      totalMonthlyRiflesDrain,
      totalMonthlyArtilleryDrain,
      totalMonthlySupportEqDrain,
      totalMonthlyTrucksDrain,
      totalMonthlyTanksDrain,
      totalMonthlyAntiAirDrain,
      // Required Mils
      milsForRifles,
      milsForArtillery,
      milsForSupportEq,
      milsForTrucks,
      milsForTanks,
      milsForAntiAir,
      totalRequiredMils,
      milsDeficitOrSurplus
    };
  }, [
    groups,
    trainingDivs,
    trainingDays,
    isDrilling,
    intensityData,
    tricklebackRate,
    garrisonDrain,
    nationalManpowerPool,
    availableMils
  ]);

  const copySummaryText = () => {
    const text = `[LAPORAN KALKULATOR KONSUMSI MANPOWER & LOGISTIK HOI4]
Negara/Skenario: ${DEFAULT_PRESETS.find(p => p.id === selectedPresetId)?.title || 'Kustom'}
Total Divisi Aktif: ${calculations.totalDivisions} Divisi (${calculations.totalStandingManpower.toLocaleString()} Pasukan)
Tingkat Pertempuran: ${intensityData.label}

KONSUMSI MANPOWER BULANAN:
- Korban Tempur Bersih: ${calculations.netCombatCasualties.toLocaleString()} prajurit/bulan (Diselamatkan Rumah Sakit: ${calculations.savedByHospitals.toLocaleString()})
- Tarikan Antrean Rekrutmen: ${calculations.monthlyTrainingManpowerDraft.toLocaleString()} prajurit/bulan (${trainingDivs} Divisi dalam ${trainingDays} hari)
- Kebocoran Garnisun Pendudukan: ${garrisonDrain.monthlyManpowerLoss.toLocaleString()} prajurit/bulan (${occupiedStates} provinsi)
TOTAL DRAIN MANPOWER BULANAN: ${calculations.totalMonthlyManpowerDrain.toLocaleString()} prajurit/bulan
Ketahanan Cadangan Manpower (${nationalManpowerPool.toLocaleString()}): ${calculations.manpowerRunwayMonths} Bulan

KEHILANGAN PERALATAN (LOGISTIK) BULANAN:
- Senapan Infanteri: -${calculations.totalMonthlyRiflesDrain.toLocaleString()} unit/bulan (Butuh ${calculations.milsForRifles} Mils)
- Artileri Medan: -${calculations.totalMonthlyArtilleryDrain.toLocaleString()} unit/bulan (Butuh ${calculations.milsForArtillery} Mils)
- Perlengkapan Bantuan: -${calculations.totalMonthlySupportEqDrain.toLocaleString()} unit/bulan (Butuh ${calculations.milsForSupportEq} Mils)
- Truk Motorized: -${calculations.totalMonthlyTrucksDrain.toLocaleString()} unit/bulan (Butuh ${calculations.milsForTrucks} Mils)
- Tank Lapis Baja: -${calculations.totalMonthlyTanksDrain.toLocaleString()} unit/bulan (Butuh ${calculations.milsForTanks} Mils)
- Meriam Anti-Air: -${calculations.totalMonthlyAntiAirDrain.toLocaleString()} unit/bulan (Butuh ${calculations.milsForAntiAir} Mils)

TOTAL PABRIK MILITER (MILS) PENYEIMBANG:
Diperlukan: ${calculations.totalRequiredMils} Mils | Tersedia: ${availableMils} Mils | Status: ${calculations.milsDeficitOrSurplus >= 0 ? `Surplus (+${calculations.milsDeficitOrSurplus})` : `DEFISIT (${calculations.milsDeficitOrSurplus} Mils)`}
Konsumsi Bahan Bakar Harian: ${Math.round(calculations.totalDailyFuel).toLocaleString()} L/hari`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Preset Selector */}
      <div className="rounded-xl border border-[#223344] bg-[#111923] p-5 shadow-xl shadow-black/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#1c2938] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center gap-1.5 rounded bg-[#10b981]/20 px-2 py-0.5 font-mono text-xs font-bold text-[#34d399] border border-[#10b981]/40">
                <Gauge className="h-3.5 w-3.5" />
                LOGISTICS &amp; MANPOWER ENGINE
              </span>
              <span className="font-mono text-xs text-[#94a3b8]">Live HOI4 Combat Sim</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#f8fafc] tracking-tight flex items-center gap-2">
              Kalkulator Konsumsi Manpower &amp; Logistik Perang
            </h2>
            <p className="text-xs text-[#94a3b8] mt-1 max-w-2xl">
              Hitung beban bulanan korban prajurit, tarikan antrean rekrutmen divisi baru, kerugian atrisi pertempuran, serta jumlah pabrik militer (Mils) yang dibutuhkan agar gudang logistik tidak defisit.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={copySummaryText}
              className="flex items-center gap-1.5 rounded-lg border border-[#22303c] bg-[#141f2b] px-3.5 py-2 text-xs font-semibold text-[#cbd5e1] hover:border-[#10b981] hover:text-[#f8fafc] transition-all shadow-sm"
            >
              {copied ? <Check className="h-4 w-4 text-[#22c55e]" /> : <Copy className="h-4 w-4 text-[#94a3b8]" />}
              <span>{copied ? 'Laporan Tersalin!' : 'Salin Laporan Logistik'}</span>
            </button>
          </div>
        </div>

        {/* Preset Selector Badges */}
        <div className="mt-4 pt-1">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-2">
            Muat Skenario Komando Bersejarah:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {DEFAULT_PRESETS.map(preset => {
              const isSelected = preset.id === selectedPresetId;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset.id)}
                  className={`flex flex-col text-left rounded-lg border p-2.5 transition-all ${
                    isSelected
                      ? 'border-[#38bdf8]/60 bg-gradient-to-r from-[#0c2438] to-[#101b26] text-[#f8fafc] shadow-md shadow-black/40'
                      : 'border-[#1e2a38] bg-[#131d27] text-[#94a3b8] hover:border-[#2f4356] hover:text-[#f1f5f9]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-xs text-[#f1f5f9] tracking-tight">{preset.title}</span>
                    <span className="font-mono text-[10px] text-[#38bdf8] bg-[#0c2438] px-1.5 py-0.2 rounded border border-[#38bdf8]/30">
                      {preset.country.split(' ')[0]}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#94a3b8] line-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Left Controls (5 cols) & Right Live Analytics (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* SECTION 1: ACTIVE DIVISIONS POOL */}
          <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#38bdf8] flex items-center gap-1.5">
                <Users className="h-4 w-4 text-[#38bdf8]" />
                1. Armada Divisi Aktif di Garis Depan
              </h3>
              <span className="font-mono text-xs font-bold text-[#f8fafc] bg-[#1c2a38] px-2 py-0.5 rounded">
                {calculations.totalDivisions} Divisi
              </span>
            </div>

            <div className="space-y-3">
              {groups.map(group => (
                <div key={group.id} className="rounded-lg border border-[#1e2b38] bg-[#141e2a] p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#f1f5f9]">{group.name}</span>
                    <span className="font-mono text-xs text-[#94a3b8]">
                      {(group.count * group.manpowerPerDiv).toLocaleString()} Pasukan
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={group.count}
                      onChange={e => handleUpdateGroupCount(group.id, parseInt(e.target.value) || 0)}
                      className="flex-1 accent-[#38bdf8] h-1.5 bg-[#0f1722] rounded-lg cursor-pointer"
                    />
                    <div className="flex items-center gap-1 w-20">
                      <input
                        type="number"
                        min="0"
                        max="500"
                        value={group.count}
                        onChange={e => handleUpdateGroupCount(group.id, parseInt(e.target.value) || 0)}
                        className="w-full rounded border border-[#2b3d4f] bg-[#0c141c] px-2 py-1 text-center font-mono text-xs font-bold text-[#38bdf8]"
                      />
                      <span className="text-[10px] text-[#64748b]">div</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 text-[10px] font-mono text-[#94a3b8] pt-1 border-t border-[#1b2633]">
                    <div>Rifles: <strong className="text-[#cbd5e1]">{group.riflesPerDiv}</strong></div>
                    <div>Art: <strong className="text-[#cbd5e1]">{group.artilleryPerDiv}</strong></div>
                    <div>Supp: <strong className="text-[#cbd5e1]">{group.supportEqPerDiv}</strong></div>
                    <div>Tanks: <strong className="text-[#cbd5e1]">{group.tanksPerDiv}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: TRAINING QUEUE & EXERCISE */}
          <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 space-y-3.5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#fbbf24] flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#eab308]" />
              2. Rekrutmen &amp; Latihan (Training Queue)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-[#1e2b38] bg-[#141e2a] p-3 space-y-1.5">
                <label className="text-[11px] font-mono text-[#94a3b8] block">
                  Divisi Antrean Latihan:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={trainingDivs}
                    onChange={e => setTrainingDivs(parseInt(e.target.value) || 0)}
                    className="flex-1 accent-[#eab308] h-1.5 bg-[#0f1722] rounded-lg"
                  />
                  <span className="font-mono text-xs font-bold text-[#fde047] w-10 text-right">
                    {trainingDivs}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-[#1e2b38] bg-[#141e2a] p-3 space-y-1.5">
                <label className="text-[11px] font-mono text-[#94a3b8] block">
                  Durasi Pelatihan (Hari):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="60"
                    max="240"
                    step="10"
                    value={trainingDays}
                    onChange={e => setTrainingDays(parseInt(e.target.value) || 120)}
                    className="flex-1 accent-[#eab308] h-1.5 bg-[#0f1722] rounded-lg"
                  />
                  <span className="font-mono text-xs font-bold text-[#fde047] w-12 text-right">
                    {trainingDays}h
                  </span>
                </div>
              </div>
            </div>

            {/* Army Drilling Toggle */}
            <div className="rounded-lg border border-[#1e2b38] bg-[#141e2a] p-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-xs text-[#f1f5f9] flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-[#f59e0b]" />
                  Latihan Divisi Berdiri (Army Drilling / Shift-Exercise)
                </div>
                <p className="text-[11px] text-[#94a3b8] mt-0.5">
                  Menambah atrisi keausan peralatan +5.5%/bulan demi mengumpulkan Army XP harian.
                </p>
              </div>
              <button
                onClick={() => setIsDrilling(!isDrilling)}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                  isDrilling
                    ? 'bg-[#eab308] text-black shadow-md shadow-yellow-500/20'
                    : 'bg-[#1b2532] text-[#64748b] hover:text-[#f8fafc]'
                }`}
              >
                {isDrilling ? 'AKTIF' : 'NONAKTIF'}
              </button>
            </div>
          </div>

          {/* SECTION 3: COMBAT INTENSITY & FIELD HOSPITALS */}
          <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 space-y-3.5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#f87171] flex items-center gap-1.5">
              <Crosshair className="h-4 w-4 text-[#ef4444]" />
              3. Intensitas Pertempuran &amp; Rumah Sakit (Field Hospital)
            </h3>

            <div className="space-y-2">
              <label className="text-[11px] font-mono text-[#94a3b8] block">
                Tingkat Agresivitas &amp; Intensitas Operasi:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'peacetime', label: 'Damai (0%)' },
                  { id: 'skirmish', label: 'Skirmish (3%)' },
                  { id: 'active_offensive', label: 'Ofensif (10%)' },
                  { id: 'total_war', label: 'Meatgrinder (20%)' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setIntensity(item.id as any)}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold text-center transition-all ${
                      intensity === item.id
                        ? 'border-[#ef4444] bg-[#2b1216] text-[#fca5a5] shadow-md shadow-red-950/40'
                        : 'border-[#1e2a38] bg-[#141e2a] text-[#94a3b8] hover:text-[#f8fafc]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#fca5a5]/80 font-mono italic">
                {intensityData.desc}
              </p>
            </div>

            {/* Field Hospital Level */}
            <div className="rounded-lg border border-[#1e2b38] bg-[#141e2a] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[#f1f5f9] flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5 text-[#10b981]" />
                  Tingkat Dukungan Field Hospital:
                </span>
                <span className="font-mono text-xs font-bold text-[#34d399]">
                  {fieldHospitalLevel === 0 ? 'Tidak Ada (0%)' : `Level ${fieldHospitalLevel} (${Math.round(tricklebackRate * 100)}% Kembali)`}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[0, 1, 2, 3, 4].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setFieldHospitalLevel(lvl)}
                    className={`rounded py-1 font-mono text-xs font-bold text-center border transition-all ${
                      fieldHospitalLevel === lvl
                        ? 'border-[#10b981] bg-[#132c23] text-[#a7f3d0]'
                        : 'border-[#1e2836] bg-[#0e1620] text-[#64748b] hover:text-[#cbd5e1]'
                    }`}
                  >
                    {lvl === 0 ? 'None' : `IV`.slice(0, lvl)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 4: GARRISON & RESISTANCE DRAIN */}
          <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 space-y-3.5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#a78bfa] flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-[#8b5cf6]" />
              4. Beban Wilayah Pendudukan &amp; Garnisun
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-[#1e2b38] bg-[#141e2a] p-3 space-y-1.5">
                <label className="text-[11px] font-mono text-[#94a3b8] block">
                  Jumlah Provinsi Diduduki:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={occupiedStates}
                    onChange={e => setOccupiedStates(parseInt(e.target.value) || 0)}
                    className="flex-1 accent-[#8b5cf6] h-1.5 bg-[#0f1722] rounded-lg"
                  />
                  <span className="font-mono text-xs font-bold text-[#c4b5fd] w-8 text-right">
                    {occupiedStates}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-[#1e2b38] bg-[#141e2a] p-3 space-y-1.5">
                <label className="text-[11px] font-mono text-[#94a3b8] block">
                  Tingkat Resistensi Gerilya:
                </label>
                <select
                  value={resistanceLevel}
                  onChange={e => setResistanceLevel(e.target.value as any)}
                  className="w-full rounded border border-[#253648] bg-[#0c141c] px-2 py-1 font-mono text-xs text-[#f1f5f9]"
                >
                  <option value="low">Rendah (10% - 20%)</option>
                  <option value="medium">Sedang (30% - 45%)</option>
                  <option value="high">Brutal / Ekstrem (50%+)</option>
                </select>
              </div>
            </div>

            <div className="rounded-lg border border-[#1e2b38] bg-[#141e2a] p-3 space-y-1.5">
              <label className="text-[11px] font-mono text-[#94a3b8] block">
                Hukum Pendudukan (Occupation Law):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { id: 'civilian', label: 'Civilian' },
                  { id: 'local_police', label: 'Local Police' },
                  { id: 'military_governor', label: 'Mil. Gov' },
                  { id: 'martial_law', label: 'Martial Law' }
                ].map(law => (
                  <button
                    key={law.id}
                    onClick={() => setGarrisonLaw(law.id as any)}
                    className={`rounded py-1 px-1.5 font-mono text-[11px] font-semibold text-center border transition-all ${
                      garrisonLaw === law.id
                        ? 'border-[#8b5cf6] bg-[#241738] text-[#ddd6fe]'
                        : 'border-[#1e2836] bg-[#0e1620] text-[#64748b] hover:text-[#cbd5e1]'
                    }`}
                  >
                    {law.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 5: NATIONAL MANPOWER & FACTORIES CONTEXT */}
          <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 space-y-3.5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#34d399] flex items-center gap-1.5">
              <Factory className="h-4 w-4 text-[#10b981]" />
              5. Cadangan Nasional &amp; Kapasitas Industri
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[#94a3b8]">Cadangan Manpower Bebas:</label>
                <input
                  type="number"
                  step="50000"
                  value={nationalManpowerPool}
                  onChange={e => setNationalManpowerPool(parseInt(e.target.value) || 0)}
                  className="w-full rounded border border-[#233547] bg-[#0c141c] px-3 py-1.5 font-mono text-xs font-bold text-[#34d399]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[#94a3b8]">Pabrik Militer (Mils) Aktif:</label>
                <input
                  type="number"
                  value={availableMils}
                  onChange={e => setAvailableMils(parseInt(e.target.value) || 0)}
                  className="w-full rounded border border-[#233547] bg-[#0c141c] px-3 py-1.5 font-mono text-xs font-bold text-[#fbbf24]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Calculated Dashboard & Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* TOP KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* KPI 1: Monthly Manpower Drain */}
            <div className="rounded-xl border border-[#ef4444]/50 bg-gradient-to-br from-[#2a1215] to-[#170e10] p-4 shadow-lg shadow-black/40">
              <div className="flex items-center justify-between text-xs text-[#fca5a5] font-mono">
                <span className="flex items-center gap-1">
                  <TrendingDown className="h-3.5 w-3.5 text-[#ef4444]" />
                  DRAIN MANPOWER
                </span>
                <span>/ Bulan</span>
              </div>
              <div className="text-2xl font-black text-[#fee2e2] tracking-tight mt-1 font-mono">
                -{calculations.totalMonthlyManpowerDrain.toLocaleString()}
              </div>
              <div className="text-[11px] text-[#fca5a5]/80 mt-1 font-mono">
                Ketahanan Cadangan: <strong className="text-white">{calculations.manpowerRunwayMonths} bln</strong>
              </div>
            </div>

            {/* KPI 2: Break-Even Mils Needed */}
            <div className={`rounded-xl border p-4 shadow-lg shadow-black/40 ${
              calculations.milsDeficitOrSurplus >= 0
                ? 'border-[#10b981]/50 bg-gradient-to-br from-[#122b1f] to-[#0e1c15]'
                : 'border-[#f59e0b]/60 bg-gradient-to-br from-[#2f1f0e] to-[#1c140c]'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className={`flex items-center gap-1 ${
                  calculations.milsDeficitOrSurplus >= 0 ? 'text-[#86efac]' : 'text-[#fde047]'
                }`}>
                  <Factory className="h-3.5 w-3.5" />
                  MILS PENYEIMBANG
                </span>
                <span className="text-[#cbd5e1]">{availableMils} Ada</span>
              </div>
              <div className={`text-2xl font-black tracking-tight mt-1 font-mono ${
                calculations.milsDeficitOrSurplus >= 0 ? 'text-[#86efac]' : 'text-[#fde047]'
              }`}>
                {calculations.totalRequiredMils} Mils
              </div>
              <div className="text-[11px] mt-1 font-mono">
                {calculations.milsDeficitOrSurplus >= 0 ? (
                  <span className="text-[#4ade80] font-bold">Surplus (+{calculations.milsDeficitOrSurplus} Mils)</span>
                ) : (
                  <span className="text-[#f87171] font-bold">Defisit ({calculations.milsDeficitOrSurplus} Mils)!</span>
                )}
              </div>
            </div>

            {/* KPI 3: Fuel & Supply Footprint */}
            <div className="rounded-xl border border-[#38bdf8]/40 bg-gradient-to-br from-[#0c2438] to-[#0a1724] p-4 shadow-lg shadow-black/40">
              <div className="flex items-center justify-between text-xs text-[#7dd3fc] font-mono">
                <span className="flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5 text-[#38bdf8]" />
                  KONSUMSI FUEL
                </span>
                <span>/ Hari</span>
              </div>
              <div className="text-2xl font-black text-[#e0f2fe] tracking-tight mt-1 font-mono">
                {Math.round(calculations.totalDailyFuel).toLocaleString()} L
              </div>
              <div className="text-[11px] text-[#7dd3fc]/80 mt-1 font-mono">
                Supply Weight: <strong className="text-white">{Math.round(calculations.totalDailySupply)} Wt</strong>
              </div>
            </div>
          </div>

          {/* DETAILED MANPOWER SINK BREAKDOWN */}
          <div className="rounded-xl border border-[#223344] bg-[#111923] p-5 space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#cbd5e1] flex items-center justify-between border-b border-[#1c2938] pb-3">
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#ef4444]" />
                Rincian Arus Masuk / Keluar Manpower (Monthly Manpower Ledger)
              </span>
              <span className="text-[#94a3b8] font-normal text-[11px]">
                Total Tentara Berdiri: {calculations.totalStandingManpower.toLocaleString()}
              </span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {/* Row 1: Combat Casualties */}
              <div className="rounded-lg border border-[#1e2a38] bg-[#141e2a] p-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#f8fafc] flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
                    Korban Jiwa Medan Tempur (Combat Losses)
                  </div>
                  <div className="text-[11px] text-[#94a3b8] mt-0.5">
                    Kotor: {calculations.grossCombatCasualties.toLocaleString()} • Diselamatkan RS Lapangan: +{calculations.savedByHospitals.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#f87171] text-sm">
                    -{calculations.netCombatCasualties.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-[#94a3b8]">prajurit/bln</span>
                </div>
              </div>

              {/* Row 2: Training Queue Draft */}
              <div className="rounded-lg border border-[#1e2a38] bg-[#141e2a] p-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#f8fafc] flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#eab308]" />
                    Tarikan Rekrutmen Antrean (Training Batch Draft)
                  </div>
                  <div className="text-[11px] text-[#94a3b8] mt-0.5">
                    {trainingDivs} Divisi baru diproses selama {trainingDays} hari
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#fde047] text-sm">
                    -{calculations.monthlyTrainingManpowerDraft.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-[#94a3b8]">rekrut/bln</span>
                </div>
              </div>

              {/* Row 3: Garrison Suppression Casualties */}
              <div className="rounded-lg border border-[#1e2a38] bg-[#141e2a] p-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#f8fafc] flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#a78bfa]" />
                    Korban Penumpasan Gerilya Pendudukan (Garrison Bleed)
                  </div>
                  <div className="text-[11px] text-[#94a3b8] mt-0.5">
                    {occupiedStates} Provinsi • Hukum: {garrisonLaw} • Resistensi: {resistanceLevel}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#c4b5fd] text-sm">
                    -{garrisonDrain.monthlyManpowerLoss.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-[#94a3b8]">polisi militer/bln</span>
                </div>
              </div>

              {/* Summary Total */}
              <div className="pt-2 border-t border-[#1e2938] flex items-center justify-between font-bold text-sm">
                <span className="text-[#f1f5f9]">Total Pengurangan Manpower Bulanan:</span>
                <span className="text-[#ef4444] text-base">
                  -{calculations.totalMonthlyManpowerDrain.toLocaleString()} Prajurit
                </span>
              </div>
            </div>
          </div>

          {/* DETAILED EQUIPMENT DRAIN & MILS BREAK-EVEN TABLE */}
          <div className="rounded-xl border border-[#223344] bg-[#111923] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1c2938] pb-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#cbd5e1] flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#fbbf24]" />
                Kebutuhan Penggantian Peralatan &amp; Pabrik Militer (Mils)
              </h3>
              <span className="text-[#fbbf24] font-mono text-xs font-bold">
                Total: {calculations.totalRequiredMils} Mils Butuh
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#1b2633] text-[11px] text-[#64748b]">
                    <th className="pb-2 font-semibold">Kategori Senjata</th>
                    <th className="pb-2 font-semibold text-right">Drain Bulanan</th>
                    <th className="pb-2 font-semibold text-right">Output/Mil Bln</th>
                    <th className="pb-2 font-semibold text-right">Mils Diperlukan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#17212d] text-[#cbd5e1]">
                  <tr>
                    <td className="py-2.5 font-sans font-medium text-[#f1f5f9]">
                      Senapan Infanteri (Infantry Weapons)
                    </td>
                    <td className="py-2.5 text-right font-bold text-[#f87171]">
                      -{calculations.totalMonthlyRiflesDrain.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right text-[#94a3b8]">~270</td>
                    <td className="py-2.5 text-right font-bold text-[#fbbf24]">
                      {calculations.milsForRifles} Mils
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-sans font-medium text-[#f1f5f9]">
                      Artileri Medan (Towed Artillery)
                    </td>
                    <td className="py-2.5 text-right font-bold text-[#f87171]">
                      -{calculations.totalMonthlyArtilleryDrain.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right text-[#94a3b8]">~38</td>
                    <td className="py-2.5 text-right font-bold text-[#fbbf24]">
                      {calculations.milsForArtillery} Mils
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-sans font-medium text-[#f1f5f9]">
                      Perlengkapan Bantuan (Support Eq)
                    </td>
                    <td className="py-2.5 text-right font-bold text-[#f87171]">
                      -{calculations.totalMonthlySupportEqDrain.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right text-[#94a3b8]">~34</td>
                    <td className="py-2.5 text-right font-bold text-[#fbbf24]">
                      {calculations.milsForSupportEq} Mils
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-sans font-medium text-[#f1f5f9]">
                      Truk Motorized &amp; Logistik
                    </td>
                    <td className="py-2.5 text-right font-bold text-[#f87171]">
                      -{calculations.totalMonthlyTrucksDrain.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right text-[#94a3b8]">~54</td>
                    <td className="py-2.5 text-right font-bold text-[#fbbf24]">
                      {calculations.milsForTrucks} Mils
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-sans font-medium text-[#f1f5f9]">
                      Tank Lapis Baja (Medium / Heavy)
                    </td>
                    <td className="py-2.5 text-right font-bold text-[#f87171]">
                      -{calculations.totalMonthlyTanksDrain.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right text-[#94a3b8]">~11</td>
                    <td className="py-2.5 text-right font-bold text-[#fbbf24]">
                      {calculations.milsForTanks} Mils
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-sans font-medium text-[#f1f5f9]">
                      Meriam Anti-Air Towed
                    </td>
                    <td className="py-2.5 text-right font-bold text-[#f87171]">
                      -{calculations.totalMonthlyAntiAirDrain.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right text-[#94a3b8]">~34</td>
                    <td className="py-2.5 text-right font-bold text-[#fbbf24]">
                      {calculations.milsForAntiAir} Mils
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Industrial Balance Alert */}
            <div className={`rounded-lg border p-3 flex items-start gap-2.5 ${
              calculations.milsDeficitOrSurplus >= 0
                ? 'border-[#10b981]/50 bg-[#122820]/80 text-[#d1fae5]'
                : 'border-[#dc2626]/50 bg-[#2b1216]/80 text-[#fca5a5]'
            }`}>
              {calculations.milsDeficitOrSurplus >= 0 ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#10b981] mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 shrink-0 text-[#ef4444] mt-0.5" />
              )}
              <div className="text-xs leading-relaxed">
                {calculations.milsDeficitOrSurplus >= 0 ? (
                  <>
                    <strong className="font-bold text-[#34d399]">Industri Surplus: </strong>
                    Kamu memiliki cadangan {calculations.milsDeficitOrSurplus} pabrik militer ekstra di atas batas penyeimbang kerugian tempur. Pabrik surplus ini dapat dialokasikan untuk memproduksi pesawat tempur atau menimbun stockpile strategis.
                  </>
                ) : (
                  <>
                    <strong className="font-bold text-[#f87171]">Peringatan Defisit Industri: </strong>
                    Kamu kekurangan {Math.abs(calculations.milsDeficitOrSurplus)} pabrik militer! Jika ofensif intensitas ini diteruskan tanpa menambah lini produksi militer, stockpile senapan dan perlengkapan divisimu akan habis dalam hitungan bulan, menyebabkan defisit organisasi dan keruntuhan garis depan.
                  </>
                )}
              </div>
            </div>
          </div>

          {/* COMMANDER STRATEGIC RECOMMENDATIONS */}
          <div className="rounded-xl border border-[#d97706]/40 bg-[#1b1510] p-4 space-y-2.5 text-xs text-[#fef3c7]">
            <div className="flex items-center gap-2 text-[#fbbf24] font-bold font-mono uppercase">
              <Sparkles className="h-4 w-4 text-[#f59e0b]" />
              Kiat Penghematan Manpower &amp; Logistik Panglima Perang
            </div>
            <ul className="space-y-1.5 text-[#fde68a]/90 list-disc list-inside">
              <li>
                <strong>Tingkatkan Field Hospital:</strong> Naik dari Level 0 ke Level 3 menyelamatkan hingga 40% korban jiwa tempur ({Math.round(calculations.grossCombatCasualties * 0.4).toLocaleString()} prajurit setiap bulan)!
              </li>
              <li>
                <strong>Gunakan Kavaleri untuk Garnisun:</strong> Template 1 batalion Kavaleri dengan Support Military Police memotong konsumsi senapan dan prajurit garnisun hingga 50% dibanding menggunakan infanteri biasa.
              </li>
              <li>
                <strong>Cegah Attrisi Suplai di Peta (F4):</strong> Jangan pernah menumpuk divisi melebihi kapasitas Supply Hub lokal, karena atrisi medan membuang senapan dan tank secara eksponensial tanpa pertempuran.
              </li>
              {fieldHospitalLevel === 0 && (
                <li className="text-[#f87171]">
                  <strong>Peringatan Kritis:</strong> Divisimu saat ini tidak menggunakan Field Hospital sama sekali. Pasang Support Field Hospital untuk menghentikan pendarahan manpower prajurit veteranimu.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
