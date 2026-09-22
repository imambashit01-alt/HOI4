import React, { useState, useMemo } from 'react';
import {
  Truck, Train, Gauge, AlertTriangle, CheckCircle2, ShieldAlert,
  Fuel, Mountain, CloudRain, Warehouse, ArrowRight, RefreshCw,
  Plus, Minus, Info, Sparkles, Sliders, ChevronRight, Activity, MapPin
} from 'lucide-react';

export type TerrainType = 'plains' | 'forest' | 'hills' | 'mountains' | 'marsh' | 'desert' | 'jungle' | 'urban';
export type WeatherType = 'clear' | 'mud' | 'blizzard' | 'heavy_rain' | 'extreme_heat' | 'extreme_cold' | 'sandstorm' | 'snow' | 'rain';
export type MotorizationLevel = 0 | 1 | 2; // 0: Kuda/Horse (0 trucks), 1: 1 Truk (+50%), 2: 2 Truk (+100%)
export type RailwayLevel = 1 | 2 | 3 | 4 | 5;
export type LogisticsCompanyLevel = 0 | 1 | 2 | 3 | 4;

interface OperationPreset {
  name: string;
  theater: string;
  terrain: TerrainType;
  weather: WeatherType;
  railwayLevel: RailwayLevel;
  distanceKm: number;
  motorization: MotorizationLevel;
  infantryCount: number;
  armorCount: number;
  motorizedCount: number;
  specialCount: number;
  logisticsCompany: LogisticsCompanyLevel;
}

const OPERATION_PRESETS: OperationPreset[] = [
  {
    name: 'Operasi Barbarossa (Front Ukraina & Belarusia 1941)',
    theater: 'Front Timur (Eastern Front)',
    terrain: 'plains',
    weather: 'mud',
    railwayLevel: 2,
    distanceKm: 320,
    motorization: 2,
    infantryCount: 24,
    armorCount: 8,
    motorizedCount: 6,
    specialCount: 0,
    logisticsCompany: 2
  },
  {
    name: 'Perang Padang Pasir Afrika Utara (El Alamein)',
    theater: 'Gurun Libya & Mesir',
    terrain: 'desert',
    weather: 'extreme_heat',
    railwayLevel: 1,
    distanceKm: 450,
    motorization: 2,
    infantryCount: 8,
    armorCount: 4,
    motorizedCount: 4,
    specialCount: 0,
    logisticsCompany: 3
  },
  {
    name: 'Kampanye Pegunungan Kaukasus (Baku Oil Drive)',
    theater: 'Kaukasus & Pegunungan Alpen',
    terrain: 'mountains',
    weather: 'blizzard',
    railwayLevel: 1,
    distanceKm: 280,
    motorization: 1,
    infantryCount: 12,
    armorCount: 2,
    motorizedCount: 2,
    specialCount: 8,
    logisticsCompany: 2
  },
  {
    name: 'Perang Hutan Rimba Burma (Burma Road Logistik)',
    theater: 'Asia Tenggara / Pasifik',
    terrain: 'jungle',
    weather: 'heavy_rain',
    railwayLevel: 1,
    distanceKm: 380,
    motorization: 0,
    infantryCount: 10,
    armorCount: 0,
    motorizedCount: 1,
    specialCount: 6,
    logisticsCompany: 1
  }
];

export const LogisticsCalculator: React.FC = () => {
  // Hub & Railway configuration
  const [railwayLevel, setRailwayLevel] = useState<RailwayLevel>(2);
  const [distanceKm, setDistanceKm] = useState<number>(240);
  const [motorization, setMotorization] = useState<MotorizationLevel>(1);
  const [trainType, setTrainType] = useState<'civilian' | 'war' | 'armored'>('war');
  const [isPortConnected, setIsPortConnected] = useState<boolean>(false);
  const [portLevel, setPortLevel] = useState<number>(3);

  // Terrain and weather
  const [terrain, setTerrain] = useState<TerrainType>('plains');
  const [weather, setWeather] = useState<WeatherType>('clear');

  // Division deployment
  const [infantryCount, setInfantryCount] = useState<number>(18);
  const [armorCount, setArmorCount] = useState<number>(4);
  const [motorizedCount, setMotorizedCount] = useState<number>(4);
  const [specialCount, setSpecialCount] = useState<number>(2);
  const [logisticsCompany, setLogisticsCompany] = useState<LogisticsCompanyLevel>(2);

  // Preset loading
  const handleApplyPreset = (preset: OperationPreset) => {
    setRailwayLevel(preset.railwayLevel);
    setDistanceKm(preset.distanceKm);
    setMotorization(preset.motorization);
    setTerrain(preset.terrain);
    setWeather(preset.weather);
    setInfantryCount(preset.infantryCount);
    setArmorCount(preset.armorCount);
    setMotorizedCount(preset.motorizedCount);
    setSpecialCount(preset.specialCount);
    setLogisticsCompany(preset.logisticsCompany);
  };

  // Base throughput by railway level (HOI4 formula: Level 1=15, 2=20, 3=25, 4=30, 5=35)
  const baseRailwayThroughput = useMemo(() => {
    const table: Record<RailwayLevel, number> = {
      1: 15,
      2: 20,
      3: 25,
      4: 30,
      5: 35
    };
    return table[railwayLevel];
  }, [railwayLevel]);

  // Port throughput contribution if enabled (3 base + 2 per level up to level 10)
  const portThroughput = useMemo(() => {
    if (!isPortConnected) return 0;
    return Math.min(35, 3 + (portLevel * 2.5));
  }, [isPortConnected, portLevel]);

  // Total Hub Throughput
  const totalThroughput = useMemo(() => {
    return Math.round((baseRailwayThroughput + portThroughput) * 10) / 10;
  }, [baseRailwayThroughput, portThroughput]);

  // Terrain and Weather Modifiers on Range & Supply Consumption
  const environmentalModifiers = useMemo(() => {
    let reachModifier = 1.0;
    let consumptionMultiplier = 1.0;
    let truckLossDailyRate = 0.05; // Base attrition

    // Terrain impact
    switch (terrain) {
      case 'plains':
        reachModifier *= 1.0;
        consumptionMultiplier *= 1.0;
        break;
      case 'forest':
        reachModifier *= 0.85;
        consumptionMultiplier *= 1.1;
        truckLossDailyRate += 0.04;
        break;
      case 'hills':
        reachModifier *= 0.80;
        consumptionMultiplier *= 1.15;
        truckLossDailyRate += 0.06;
        break;
      case 'mountains':
        reachModifier *= 0.60;
        consumptionMultiplier *= 1.40;
        truckLossDailyRate += 0.15;
        break;
      case 'marsh':
        reachModifier *= 0.50;
        consumptionMultiplier *= 1.50;
        truckLossDailyRate += 0.25;
        break;
      case 'desert':
        reachModifier *= 0.75;
        consumptionMultiplier *= 1.25;
        truckLossDailyRate += 0.10;
        break;
      case 'jungle':
        reachModifier *= 0.55;
        consumptionMultiplier *= 1.45;
        truckLossDailyRate += 0.20;
        break;
      case 'urban':
        reachModifier *= 0.90;
        consumptionMultiplier *= 1.05;
        break;
    }

    // Weather impact
    switch (weather) {
      case 'clear':
        break;
      case 'mud':
        reachModifier *= 0.50; // Heavy mud cuts truck speed & range drastically
        consumptionMultiplier *= 1.30;
        truckLossDailyRate += 0.30;
        break;
      case 'blizzard':
        reachModifier *= 0.65;
        consumptionMultiplier *= 1.35;
        truckLossDailyRate += 0.20;
        break;
      case 'heavy_rain':
        reachModifier *= 0.80;
        consumptionMultiplier *= 1.15;
        truckLossDailyRate += 0.12;
        break;
      case 'extreme_heat':
        reachModifier *= 0.85;
        consumptionMultiplier *= 1.20;
        truckLossDailyRate += 0.08;
        break;
    }

    return {
      reachModifier: Math.round(reachModifier * 100) / 100,
      consumptionMultiplier: Math.round(consumptionMultiplier * 100) / 100,
      truckLossDailyRate: Math.round(truckLossDailyRate * 100) / 100
    };
  }, [terrain, weather]);

  // Motorization Range multiplier (Horse: 1.0x, 1-Truck: 1.5x, 2-Trucks: 2.0x)
  const motorizationFactor = motorization === 0 ? 1.0 : motorization === 1 ? 1.5 : 2.0;

  // Max effective reach of Supply Hub in Km
  const baseHubRangeKm = 160;
  const effectiveRangeKm = Math.round(baseHubRangeKm * motorizationFactor * environmentalModifiers.reachModifier);
  const isOutOfRange = distanceKm > effectiveRangeKm;
  const outOfRangePenaltyFactor = isOutOfRange ? Math.min(2.5, 1 + ((distanceKm - effectiveRangeKm) / effectiveRangeKm)) : 1.0;

  // Logistics Company reduction factor (0: 0%, 1: -10%, 2: -20%, 3: -30%, 4: -40%)
  const logisticsCompanyFactor = 1.0 - (logisticsCompany * 0.10);

  // Base unit daily supply usage (HOI4 typical averages)
  // Infantry 20W ~ 0.9, Armor ~ 2.8, Motorized ~ 1.9, Special ~ 1.1
  const rawInfantrySupply = infantryCount * 0.90;
  const rawArmorSupply = armorCount * 2.85;
  const rawMotorizedSupply = motorizedCount * 1.95;
  const rawSpecialSupply = specialCount * 1.15;

  const rawTotalSupply = rawInfantrySupply + rawArmorSupply + rawMotorizedSupply + rawSpecialSupply;

  // Adjusted required supply factoring logistics company, environment, and out-of-range penalty
  const adjustedTotalSupplyNeeded = Math.round(
    rawTotalSupply * logisticsCompanyFactor * environmentalModifiers.consumptionMultiplier * outOfRangePenaltyFactor * 10
  ) / 10;

  // Fuel consumption per day (in Barrels / Units)
  const dailyFuelConsumption = Math.round(
    ((armorCount * 420) + (motorizedCount * 280) + (infantryCount * 20)) *
    (weather === 'mud' ? 1.4 : 1.0)
  );

  // Trucks calculation:
  // Base trucks required:
  // Level 0: 0
  // Level 1: 50 base + 1 per 5km distance + 1 per 2 supply transported
  // Level 2: 100 base + 2 per 5km distance + 1.5 per 2 supply transported
  const trucksNeeded = useMemo(() => {
    if (motorization === 0) return 0;
    const basePerLevel = motorization === 1 ? 55 : 115;
    const distFactor = (distanceKm / 5) * (motorization === 1 ? 0.8 : 1.4);
    const supplyLoadFactor = adjustedTotalSupplyNeeded * (motorization === 1 ? 1.2 : 2.0);
    return Math.round((basePerLevel + distFactor + supplyLoadFactor));
  }, [motorization, distanceKm, adjustedTotalSupplyNeeded]);

  // Daily truck attrition loss
  const dailyTruckLosses = Math.max(0, Math.round(trucksNeeded * (environmentalModifiers.truckLossDailyRate / 100) * 10) / 10);

  // Trains calculation:
  // Standard railway train needed: ~1 train per 8-10 supply transported over 100km distance
  const trainsNeeded = useMemo(() => {
    const distRatio = Math.max(1, distanceKm / 100);
    const baseTrains = Math.ceil((adjustedTotalSupplyNeeded / 8) * (distRatio * 0.6));
    return Math.max(2, baseTrains);
  }, [adjustedTotalSupplyNeeded, distanceKm]);

  // Throughput Status & Deficit
  const throughputSurplusOrDeficit = Math.round((totalThroughput - adjustedTotalSupplyNeeded) * 10) / 10;
  const supplySatisfactionRatio = Math.min(100, Math.round((totalThroughput / Math.max(1, adjustedTotalSupplyNeeded)) * 100));

  // Determine Attrition & Combat Debuff Level
  const { statusColor, statusLabel, combatDebuff, orgRecoveryDebuff, advice } = useMemo(() => {
    if (isOutOfRange) {
      return {
        statusColor: 'text-red-400 border-red-500/60 bg-red-950/40',
        statusLabel: 'DI LUAR JANGKAUAN HUB (OUT OF RANGE)',
        combatDebuff: '-45% Efisiensi Tempur & Pasokan Terputus',
        orgRecoveryDebuff: '-60% Pemulihan Organisasi',
        advice: `Pasukan berada ${distanceKm - effectiveRangeKm} km di luar jangkauan pasokan hub terdekat. Tingkatkan motorisasi ke Level 2 atau bangun Rel Kereta Api dan Supply Hub baru lebih dekat ke garis depan.`
      };
    }

    if (supplySatisfactionRatio >= 100) {
      return {
        statusColor: 'text-emerald-400 border-emerald-500/60 bg-emerald-950/40',
        statusLabel: 'LOGISTIK PRIMA (100% TERPENUHI)',
        combatDebuff: '0% (Tidak ada penalti suplai)',
        orgRecoveryDebuff: '+100% Regenerasi Organisasi Normal',
        advice: 'Kapasitas jalur rel kereta dan armada truk mencukupi kebutuhan seluruh divisi. Operasi ofensif dapat dijalankan tanpa risiko penalti kelaparan amunisi.'
      };
    } else if (supplySatisfactionRatio >= 75) {
      return {
        statusColor: 'text-amber-400 border-amber-500/60 bg-amber-950/40',
        statusLabel: 'DEFISIT RINGAN (PENALTI SUPLAI 15-25%)',
        combatDebuff: '-15% s.d. -25% Efektivitas Tempur',
        orgRecoveryDebuff: '-30% Kecepatan Pemulihan Pasukan',
        advice: 'Tingkatkan level rel kereta (Railway) 1 tingkat lebih tinggi atau gunakan Kompi Logistik untuk memangkas konsumsi divisi lapis baja.'
      };
    } else {
      return {
        statusColor: 'text-red-400 border-red-500/60 bg-red-950/40',
        statusLabel: 'BOTTLENECK PARAH (LOGISTIK JEBOL)',
        combatDebuff: '-35% s.d. -50% Penalti Tempur & Kehilangan Tank (Attrition)',
        orgRecoveryDebuff: '-70% Regenerasi Organisasi Macet',
        advice: 'Terlalu banyak divisi menumpuk di zona operasi sempit. Segera tarik divisi Panzer berat atau tingkatkan jalur rel kereta ke Level 4/5 dan aktifkan motorisasi ganda.'
      };
    }
  }, [supplySatisfactionRatio, isOutOfRange, distanceKm, effectiveRangeKm]);

  return (
    <div className="space-y-6 text-[#f1f5f9]">
      {/* Header Banner */}
      <div className="rounded-xl border border-amber-500/40 bg-gradient-to-r from-[#1e1509] via-[#241a0b] to-[#120d05] p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shadow-inner">
              <Truck className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#fef3c7] uppercase">
                  Kalkulator Logistik &amp; Suplai Operasi Militer
                </h2>
                <span className="rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[11px] font-mono text-amber-300 font-bold">
                  SISTEM SUPLAI NO STEP BACK (NSB)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#cbd5e1] mt-0.5">
                Hitung kebutuhan truk pasokan, armada kereta api logistik, dan kapasitas throughput jalur rel terhadap penumpukan divisi di berbagai jenis medan dan cuaca.
              </p>
            </div>
          </div>

          {/* Quick Preset Selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono text-[#94a3b8] mr-1 hidden sm:inline">Teater PD II:</span>
            {OPERATION_PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(p)}
                className="px-2.5 py-1.5 rounded-lg border border-[#3d2c14] bg-[#1a1309] text-[11px] font-mono text-amber-200 hover:bg-[#2b1f0d] hover:border-amber-500/60 transition-all shadow"
                title={p.name}
              >
                {p.theater.split(' ')[0]} {p.theater.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main KPI Status Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* KPI 1: Supply Throughput vs Needed */}
        <div className={`p-4 rounded-xl border ${statusColor} shadow-lg transition-all`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#cbd5e1] flex items-center gap-1.5">
              <Gauge className="h-4 w-4" /> Throughput Suplai
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 font-bold">
              {supplySatisfactionRatio}% Terpenuhi
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono">
              {adjustedTotalSupplyNeeded}
            </span>
            <span className="text-xs text-[#cbd5e1]">
              / {totalThroughput} Kapasitas Maks Hub
            </span>
          </div>
          <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full transition-all ${
                supplySatisfactionRatio >= 100
                  ? 'bg-emerald-400'
                  : supplySatisfactionRatio >= 75
                  ? 'bg-amber-400'
                  : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(100, supplySatisfactionRatio)}%` }}
            />
          </div>
        </div>

        {/* KPI 2: Trucks Needed */}
        <div className="p-4 rounded-xl border border-[#3d2c14] bg-[#140e06] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#94a3b8] flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-amber-400" /> Kebutuhan Truk
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
              {motorization === 0 ? 'Kuda (0 Truk)' : motorization === 1 ? 'Motorisasi Lv.1' : 'Motorisasi Ganda'}
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-amber-300">
              {trucksNeeded.toLocaleString()}
            </span>
            <span className="text-xs text-[#94a3b8]">Unit Truk Aktif</span>
          </div>
          <p className="text-[11px] text-[#cbd5e1] mt-1">
            Estimasi aus/rusak: <strong className="text-red-400">{dailyTruckLosses} truk/hari</strong>
          </p>
        </div>

        {/* KPI 3: Trains Required */}
        <div className="p-4 rounded-xl border border-[#3d2c14] bg-[#140e06] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#94a3b8] flex items-center gap-1.5">
              <Train className="h-4 w-4 text-sky-400" /> Armada Kereta Rel
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold uppercase">
              Rel Lv.{railwayLevel}
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-sky-300">
              {trainsNeeded}
            </span>
            <span className="text-xs text-[#94a3b8]">Lokomotif Diperlukan</span>
          </div>
          <p className="text-[11px] text-[#cbd5e1] mt-1">
            Jarak suplai rel: <strong className="text-white">{distanceKm} km</strong> dari ibukota
          </p>
        </div>

        {/* KPI 4: Fuel Consumption */}
        <div className="p-4 rounded-xl border border-[#3d2c14] bg-[#140e06] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#94a3b8] flex items-center gap-1.5">
              <Fuel className="h-4 w-4 text-emerald-400" /> Konsumsi Bensin
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
              Unit Lapis Baja
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-emerald-400">
              {dailyFuelConsumption.toLocaleString()}
            </span>
            <span className="text-xs text-[#94a3b8]">Barel/Hari</span>
          </div>
          <p className="text-[11px] text-[#cbd5e1] mt-1">
            Divisi lapis baja: <strong className="text-white">{armorCount + motorizedCount} Divisi</strong>
          </p>
        </div>
      </div>

      {/* Diagnostic & Actionable Advice Panel */}
      <div className={`p-4 rounded-xl border ${statusColor} space-y-1.5`}>
        <div className="flex items-center gap-2">
          {supplySatisfactionRatio >= 100 ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-amber-400" />
          )}
          <h4 className="font-bold text-sm uppercase tracking-wide">
            Status Operasional: {statusLabel}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono pt-1">
          <div>
            Efek Tempur: <strong className="text-white">{combatDebuff}</strong>
          </div>
          <div>
            Pemulihan Pasukan: <strong className="text-white">{orgRecoveryDebuff}</strong>
          </div>
        </div>
        <p className="text-xs text-[#cbd5e1] leading-relaxed pt-1 border-t border-white/10 mt-1">
          <strong>Rekomendasi Staf Umum:</strong> {advice}
        </p>
      </div>

      {/* Main Interactive Controls: 3 Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Column 1: Hub & Transport Network (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-[#3d2c14] bg-[#110c05] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="border-b border-[#2b1f0e] pb-3">
              <h3 className="font-serif text-base font-bold text-[#fef3c7] flex items-center gap-2">
                <Warehouse className="h-5 w-5 text-amber-400" /> Jaringan Rel &amp; Hub Suplai
              </h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Konfigurasi pangkalan logistik utama dan jalur penghubung kereta api.
              </p>
            </div>

            {/* Railway Level Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#94a3b8]">Tingkat Rel Kereta Api (Railway):</span>
                <strong className="text-amber-400">Level {railwayLevel} ({baseRailwayThroughput} Suplai)</strong>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={railwayLevel}
                onChange={(e) => setRailwayLevel(parseInt(e.target.value) as RailwayLevel)}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#64748b] font-mono">
                <span>Lv.1 (15)</span>
                <span>Lv.2 (20)</span>
                <span>Lv.3 (25)</span>
                <span>Lv.4 (30)</span>
                <span>Lv.5 (35)</span>
              </div>
            </div>

            {/* Distance from Capital */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#94a3b8]">Jarak Garis Depan ke Hub Terdekat:</span>
                <strong className="text-white">{distanceKm} km</strong>
              </div>
              <input
                type="range"
                min="40"
                max="600"
                step="20"
                value={distanceKm}
                onChange={(e) => setDistanceKm(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-[#64748b]">Dekat (40 km)</span>
                <span className={isOutOfRange ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                  Batas Hub: {effectiveRangeKm} km
                </span>
                <span className="text-[#64748b]">Jauh (600 km)</span>
              </div>
            </div>

            {/* Hub Motorization Switch */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#94a3b8] block">
                Tingkat Motorisasi Hub (Armada Truk):
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setMotorization(0)}
                  className={`p-2 rounded-lg text-xs font-mono text-center border transition-all ${
                    motorization === 0
                      ? 'border-amber-500 bg-amber-500/20 text-amber-200 font-bold shadow'
                      : 'border-[#2d200e] bg-[#160f06] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  Kuda (0 Truk)
                  <span className="block text-[10px] text-[#64748b]">Jangkauan 1.0x</span>
                </button>
                <button
                  onClick={() => setMotorization(1)}
                  className={`p-2 rounded-lg text-xs font-mono text-center border transition-all ${
                    motorization === 1
                      ? 'border-amber-500 bg-amber-500/20 text-amber-200 font-bold shadow'
                      : 'border-[#2d200e] bg-[#160f06] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  1 Truk
                  <span className="block text-[10px] text-amber-300">+50% Jarak</span>
                </button>
                <button
                  onClick={() => setMotorization(2)}
                  className={`p-2 rounded-lg text-xs font-mono text-center border transition-all ${
                    motorization === 2
                      ? 'border-amber-500 bg-amber-500/20 text-amber-200 font-bold shadow'
                      : 'border-[#2d200e] bg-[#160f06] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  2 Truk
                  <span className="block text-[10px] text-emerald-400">+100% Maks</span>
                </button>
              </div>
            </div>

            {/* Train Type */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#94a3b8] block">
                Jenis Kereta Api Logistik:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTrainType('civilian')}
                  className={`p-2 rounded-lg text-xs font-mono text-center border transition-all ${
                    trainType === 'civilian'
                      ? 'border-sky-500 bg-sky-500/20 text-sky-200 font-bold'
                      : 'border-[#2d200e] bg-[#160f06] text-[#94a3b8]'
                  }`}
                >
                  Sipil
                  <span className="block text-[9px] text-[#64748b]">Biaya Murah</span>
                </button>
                <button
                  onClick={() => setTrainType('war')}
                  className={`p-2 rounded-lg text-xs font-mono text-center border transition-all ${
                    trainType === 'war'
                      ? 'border-sky-500 bg-sky-500/20 text-sky-200 font-bold'
                      : 'border-[#2d200e] bg-[#160f06] text-[#94a3b8]'
                  }`}
                >
                  Perang
                  <span className="block text-[9px] text-sky-300">Tahan Lama</span>
                </button>
                <button
                  onClick={() => setTrainType('armored')}
                  className={`p-2 rounded-lg text-xs font-mono text-center border transition-all ${
                    trainType === 'armored'
                      ? 'border-sky-500 bg-sky-500/20 text-sky-200 font-bold'
                      : 'border-[#2d200e] bg-[#160f06] text-[#94a3b8]'
                  }`}
                >
                  Lapis Baja
                  <span className="block text-[9px] text-emerald-400">Anti-CAS</span>
                </button>
              </div>
            </div>

            {/* Naval Port Supply Option */}
            <div className="p-3 rounded-lg border border-[#2d200e] bg-[#160f06] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-[#cbd5e1] cursor-pointer flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isPortConnected}
                    onChange={(e) => setIsPortConnected(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <span>Suplai Jalur Pelabuhan Laut</span>
                </label>
                {isPortConnected && (
                  <span className="text-[10px] font-mono text-sky-400 font-bold">
                    +{portThroughput} Throughput
                  </span>
                )}
              </div>
              {isPortConnected && (
                <div className="pt-2 border-t border-[#2a1d0d] space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#94a3b8]">Level Pangkalan Laut:</span>
                    <strong className="text-sky-300">Level {portLevel}</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={portLevel}
                    onChange={(e) => setPortLevel(parseInt(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: Division Composition & Logistics Company (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-[#3d2c14] bg-[#110c05] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="border-b border-[#2b1f0e] pb-3">
              <h3 className="font-serif text-base font-bold text-[#fef3c7] flex items-center gap-2">
                <Sliders className="h-5 w-5 text-amber-400" /> Penempatan Divisi Tempur
              </h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Hitung beban pasokan dari total jumlah divisi yang bertempur di front ini.
              </p>
            </div>

            {/* Division Counters */}
            <div className="space-y-3">
              {/* Infantry */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#160f06] border border-[#2d200e]">
                <div>
                  <h5 className="text-xs font-bold text-white">Divisi Infanteri (9/1 - 21W)</h5>
                  <span className="text-[10px] text-[#94a3b8] font-mono">~0.9 Suplai / Divisi</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInfantryCount(prev => Math.max(0, prev - 2))}
                    className="h-7 w-7 rounded bg-[#251808] hover:bg-[#38240c] text-white flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-sm text-white">
                    {infantryCount}
                  </span>
                  <button
                    onClick={() => setInfantryCount(prev => prev + 2)}
                    className="h-7 w-7 rounded bg-[#251808] hover:bg-[#38240c] text-white flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Armor / Panzer */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#160f06] border border-[#2d200e]">
                <div>
                  <h5 className="text-xs font-bold text-amber-300">Divisi Lapis Baja (Panzer 30W)</h5>
                  <span className="text-[10px] text-[#94a3b8] font-mono">~2.85 Suplai + BBM Tinggi</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setArmorCount(prev => Math.max(0, prev - 1))}
                    className="h-7 w-7 rounded bg-[#251808] hover:bg-[#38240c] text-white flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-sm text-amber-300">
                    {armorCount}
                  </span>
                  <button
                    onClick={() => setArmorCount(prev => prev + 1)}
                    className="h-7 w-7 rounded bg-[#251808] hover:bg-[#38240c] text-white flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Motorized / Mechanized */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#160f06] border border-[#2d200e]">
                <div>
                  <h5 className="text-xs font-bold text-sky-300">Divisi Bermotor / Mekanis</h5>
                  <span className="text-[10px] text-[#94a3b8] font-mono">~1.95 Suplai / Divisi</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMotorizedCount(prev => Math.max(0, prev - 1))}
                    className="h-7 w-7 rounded bg-[#251808] hover:bg-[#38240c] text-white flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-sm text-sky-300">
                    {motorizedCount}
                  </span>
                  <button
                    onClick={() => setMotorizedCount(prev => prev + 1)}
                    className="h-7 w-7 rounded bg-[#251808] hover:bg-[#38240c] text-white flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Special Forces (Mountain / Marines) */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#160f06] border border-[#2d200e]">
                <div>
                  <h5 className="text-xs font-bold text-emerald-300">Divisi Gunung / Marinir</h5>
                  <span className="text-[10px] text-[#94a3b8] font-mono">~1.15 Suplai / Divisi</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSpecialCount(prev => Math.max(0, prev - 1))}
                    className="h-7 w-7 rounded bg-[#251808] hover:bg-[#38240c] text-white flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-sm text-emerald-300">
                    {specialCount}
                  </span>
                  <button
                    onClick={() => setSpecialCount(prev => prev + 1)}
                    className="h-7 w-7 rounded bg-[#251808] hover:bg-[#38240c] text-white flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Logistics Support Company Level */}
            <div className="pt-2 border-t border-[#2b1f0e] space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#94a3b8]">Kompi Bantuan Logistik:</span>
                <strong className="text-emerald-400">
                  {logisticsCompany === 0
                    ? 'Tanpa Kompi (0%)'
                    : `Level ${logisticsCompany} (-${logisticsCompany * 10}% Suplai)`}
                </strong>
              </div>
              <div className="grid grid-cols-5 gap-1 text-[11px] font-mono">
                {[0, 1, 2, 3, 4].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setLogisticsCompany(lvl as LogisticsCompanyLevel)}
                    className={`py-1.5 rounded border text-center transition-all ${
                      logisticsCompany === lvl
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-200 font-bold'
                        : 'border-[#2d200e] bg-[#160f06] text-[#94a3b8]'
                    }`}
                  >
                    Lv.{lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Terrain & Weather Hazards (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-[#3d2c14] bg-[#110c05] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="border-b border-[#2b1f0e] pb-3">
              <h3 className="font-serif text-base font-bold text-[#fef3c7] flex items-center gap-2">
                <Mountain className="h-5 w-5 text-amber-400" /> Medan &amp; Cuaca Wilayah
              </h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Kondisi geografi yang memperlambat laju truk dan menguras pasokan amunisi.
              </p>
            </div>

            {/* Terrain Selection Grid */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#94a3b8] block">Jenis Medan Operasi:</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {[
                  { id: 'plains', label: 'Dataran (Plains)' },
                  { id: 'forest', label: 'Hutan (Forest)' },
                  { id: 'hills', label: 'Perbukitan (Hills)' },
                  { id: 'mountains', label: 'Pegunungan' },
                  { id: 'marsh', label: 'Rawa-Rawa (Marsh)' },
                  { id: 'desert', label: 'Gurun (Desert)' },
                  { id: 'jungle', label: 'Hutan Tropis' },
                  { id: 'urban', label: 'Perkotaan (Urban)' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setTerrain(item.id as TerrainType)}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      terrain === item.id
                        ? 'border-amber-500 bg-amber-500/20 text-amber-200 font-bold shadow'
                        : 'border-[#2d200e] bg-[#160f06] text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Weather Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#94a3b8] block">Kondisi Cuaca Front:</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {[
                  { id: 'clear', label: 'Cerah Normal' },
                  { id: 'mud', label: 'Lumpur (Rasputitsa)' },
                  { id: 'blizzard', label: 'Badai Salju Dingin' },
                  { id: 'heavy_rain', label: 'Hujan Deras Badai' },
                  { id: 'extreme_heat', label: 'Panas Terik Ekstrem' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setWeather(item.id as WeatherType)}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      weather === item.id
                        ? 'border-sky-500 bg-sky-500/20 text-sky-200 font-bold shadow'
                        : 'border-[#2d200e] bg-[#160f06] text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Weather & Terrain Penalty Breakdown */}
            <div className="p-3 rounded-lg bg-[#181107] border border-[#2d200e] text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-[#94a3b8]">Modifikator Jangkauan Hub:</span>
                <strong className={environmentalModifiers.reachModifier < 1.0 ? 'text-red-400' : 'text-emerald-400'}>
                  {Math.round(environmentalModifiers.reachModifier * 100)}%
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94a3b8]">Pengali Konsumsi Suplai:</span>
                <strong className={environmentalModifiers.consumptionMultiplier > 1.0 ? 'text-amber-400' : 'text-emerald-400'}>
                  +{Math.round((environmentalModifiers.consumptionMultiplier - 1.0) * 100)}%
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94a3b8]">Risiko Aus Truk per Hari:</span>
                <strong className="text-red-400">
                  {environmentalModifiers.truckLossDailyRate}% per hari
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
