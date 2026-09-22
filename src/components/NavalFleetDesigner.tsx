import React, { useState, useMemo } from 'react';
import {
  Anchor, Shield, AlertTriangle, CheckCircle2, Waves, Flame,
  Compass, Fuel, Users, Factory, Swords, Crosshair, ArrowRight,
  RotateCcw, Info, Sparkles, Sliders, BarChart3, ChevronRight
} from 'lucide-react';

export interface ShipClass {
  id: string;
  name: string;
  category: 'screen' | 'capital' | 'carrier' | 'submarine';
  hullType: string;
  defaultCount: number;
  icCost: number;
  manpower: number;
  fuelUse: number; // fuel per hour at sea
  surfaceDetection: number;
  subDetection: number;
  surfaceVisibility: number;
  heavyGunAttack: number;
  lightGunAttack: number;
  torpedoAttack: number;
  antiAir: number;
  armor: number;
  hp: number;
  speedKnots: number;
  description: string;
}

export interface NavalPreset {
  id: string;
  name: string;
  role: string;
  description: string;
  doctrine: string;
  composition: { [shipId: string]: number };
}

export const SHIP_CLASSES: ShipClass[] = [
  // Screens
  {
    id: 'destroyer_asw',
    name: 'Destroyer ASW (Perusak Anti-Kapal Selam)',
    category: 'screen',
    hullType: 'Early / 1936 Destroyer',
    defaultCount: 20,
    icCost: 1100,
    manpower: 800,
    fuelUse: 12,
    surfaceDetection: 20,
    subDetection: 45,
    surfaceVisibility: 9,
    heavyGunAttack: 0,
    lightGunAttack: 6,
    torpedoAttack: 18,
    antiAir: 8,
    armor: 0,
    hp: 45,
    speedKnots: 36,
    description: 'Kapal tabir utama bersenjatakan bom laut (Depth Charges), sonar aktif, dan peluncur torpedo murah.'
  },
  {
    id: 'destroyer_torpedo',
    name: 'Destroyer Armada Cepat (Fleet DD Torpedo)',
    category: 'screen',
    hullType: '1940 Advanced Destroyer',
    defaultCount: 16,
    icCost: 1350,
    manpower: 850,
    fuelUse: 15,
    surfaceDetection: 25,
    subDetection: 25,
    surfaceVisibility: 8.5,
    heavyGunAttack: 0,
    lightGunAttack: 8,
    torpedoAttack: 38,
    antiAir: 12,
    armor: 0,
    hp: 55,
    speedKnots: 39,
    description: 'Perusak kecepatan tinggi untuk taktik serbuan malam torpedo (Long Lance / High Torpedo Swarm).'
  },
  {
    id: 'light_cruiser_cl',
    name: 'Light Cruiser (Penjelajah Ringan CL - Light Gun Meta)',
    category: 'screen',
    hullType: '1936 / 1940 Cruiser Hull',
    defaultCount: 8,
    icCost: 3600,
    manpower: 2400,
    fuelUse: 32,
    surfaceDetection: 40,
    subDetection: 30,
    surfaceVisibility: 12,
    heavyGunAttack: 0,
    lightGunAttack: 36,
    torpedoAttack: 14,
    antiAir: 24,
    armor: 45,
    hp: 110,
    speedKnots: 33,
    description: 'Pembunuh kapal layar musuh dengan meriam ringan multi-laras beruntun. Kunci merontokkan destroyer musuh lebih dulu.'
  },
  {
    id: 'light_cruiser_aa',
    name: 'Light Cruiser AA Flak (Pertahanan Udara Armada)',
    category: 'screen',
    hullType: 'Cruiser AA Conversion',
    defaultCount: 4,
    icCost: 3400,
    manpower: 2200,
    fuelUse: 30,
    surfaceDetection: 35,
    subDetection: 20,
    surfaceVisibility: 12,
    heavyGunAttack: 0,
    lightGunAttack: 18,
    torpedoAttack: 0,
    antiAir: 60,
    armor: 40,
    hp: 105,
    speedKnots: 33,
    description: 'Payung anti-pesawat khusus untuk melindungi kapal induk dan kapal tempur dari pembom torpedo udara.'
  },

  // Capitals
  {
    id: 'heavy_cruiser_ca',
    name: 'Heavy Cruiser (Penjelajah Berat CA)',
    category: 'capital',
    hullType: '1936/1940 Cruiser Hull',
    defaultCount: 4,
    icCost: 4800,
    manpower: 3200,
    fuelUse: 45,
    surfaceDetection: 30,
    subDetection: 10,
    surfaceVisibility: 14,
    heavyGunAttack: 28,
    lightGunAttack: 14,
    torpedoAttack: 10,
    antiAir: 20,
    armor: 70,
    hp: 160,
    speedKnots: 31,
    description: 'Kapal kapital termurah dengan meriam berat medium. Sangat efektif menyerap tembakan pada lini kapital kedua.'
  },
  {
    id: 'battlecruiser_bc',
    name: 'Battlecruiser (Kapal Tempur Cepat BC)',
    category: 'capital',
    hullType: '1936 Fast Capital Hull',
    defaultCount: 2,
    icCost: 8200,
    manpower: 5800,
    fuelUse: 75,
    surfaceDetection: 28,
    subDetection: 5,
    surfaceVisibility: 16,
    heavyGunAttack: 48,
    lightGunAttack: 18,
    torpedoAttack: 0,
    antiAir: 28,
    armor: 95,
    hp: 230,
    speedKnots: 32,
    description: 'Kombinasi meriam tempur berat dengan kecepatan tinggi penjelajah untuk mengejar armada musuh yang berusaha kabur.'
  },
  {
    id: 'battleship_bb',
    name: 'Battleship Standar (Kapal Tempur Utama BB)',
    category: 'capital',
    hullType: '1936 / 1940 Heavy Battleship',
    defaultCount: 4,
    icCost: 10500,
    manpower: 7500,
    fuelUse: 95,
    surfaceDetection: 26,
    subDetection: 0,
    surfaceVisibility: 18,
    heavyGunAttack: 68,
    lightGunAttack: 22,
    torpedoAttack: 0,
    antiAir: 35,
    armor: 140,
    hp: 340,
    speedKnots: 27,
    description: 'Tembok baja laut dengan meriam 15-16 inci dan armor tebal. Memberikan bonus bombardir pesisir besar untuk invasi darat.'
  },
  {
    id: 'super_heavy_bb',
    name: 'Super-Heavy Battleship (Monster Laut SHBB / Yamato Class)',
    category: 'capital',
    hullType: 'Super-Heavy Battleship Hull',
    defaultCount: 0,
    icCost: 18500,
    manpower: 11000,
    fuelUse: 160,
    surfaceDetection: 22,
    subDetection: 0,
    surfaceVisibility: 24,
    heavyGunAttack: 115,
    lightGunAttack: 35,
    torpedoAttack: 0,
    antiAir: 50,
    armor: 210,
    hp: 520,
    speedKnots: 24,
    description: 'Benteng terapung dengan daya tahan raksasa. Mampu menghancurkan kapal tempur musuh dalam beberapa salvo tembakan.'
  },

  // Carriers
  {
    id: 'aircraft_carrier_cv',
    name: 'Fleet Aircraft Carrier (Kapal Induk Armada CV)',
    category: 'carrier',
    hullType: '1936 / 1940 Carrier Hull (Deck: 60-80 Pesawat)',
    defaultCount: 4,
    icCost: 8800,
    manpower: 4500,
    fuelUse: 60,
    surfaceDetection: 35,
    subDetection: 15,
    surfaceVisibility: 16,
    heavyGunAttack: 0,
    lightGunAttack: 10,
    torpedoAttack: 0,
    antiAir: 45,
    armor: 30,
    hp: 170,
    speedKnots: 30,
    description: 'Raja pertempuran laut modern. Pesawat sayap tempurnya (Naval Bomber & Fighter) menyerang dari jarak jauh di luar jangkauan meriam.'
  },

  // Submarines
  {
    id: 'submarine_fleet',
    name: 'Submarine Type VII / IX (Kapal Selam Penggerebek Konvoi)',
    category: 'submarine',
    hullType: 'Submarine Hull (Snorkel & Torpedo Tubes)',
    defaultCount: 0,
    icCost: 850,
    manpower: 250,
    fuelUse: 6,
    surfaceDetection: 8,
    subDetection: 15,
    surfaceVisibility: 2.2,
    heavyGunAttack: 0,
    lightGunAttack: 0,
    torpedoAttack: 32,
    antiAir: 2,
    armor: 0,
    hp: 20,
    speedKnots: 17,
    description: 'Predator bawah laut tak terlihat. Memburu konvoi logistik dan kapal perang yang tersesat tanpa perlindungan layar ASW.'
  }
];

export const NAVAL_PRESETS: NavalPreset[] = [
  {
    id: 'meta_strike_force',
    name: 'Gugus Tempur Penyerang Utama (Carrier Strike Force Meta)',
    role: 'Dominasi Laut & Menghancurkan Armada Utama Musuh',
    doctrine: 'Fleet in Being / Base Strike',
    description: 'Formasi standar kompetitif: 4 Kapal Induk, 4 Kapal Tempur, 8 Penjelajah Ringan penghancur tabir, dan 36 Destroyer untuk menjamin 100% efisiensi layar.',
    composition: {
      aircraft_carrier_cv: 4,
      battleship_bb: 4,
      heavy_cruiser_ca: 2,
      light_cruiser_cl: 8,
      light_cruiser_aa: 2,
      destroyer_asw: 24,
      destroyer_torpedo: 16,
      submarine_fleet: 0
    }
  },
  {
    id: 'convoy_escort_asw',
    name: 'Gugus Pengawal Konvoi & Anti-Kapal Selam (ASW Escort)',
    role: 'Melindungi Rute Konvoi Impor & Pasokan Militer',
    doctrine: 'Trade Interdiction / Convoy Escort',
    description: 'Armada murah khusus memburu kapal selam musuh: 2 Light Cruiser ber-sonar dan 16 Destroyer ber-depth charges.',
    composition: {
      aircraft_carrier_cv: 0,
      battleship_bb: 0,
      heavy_cruiser_ca: 0,
      light_cruiser_cl: 2,
      light_cruiser_aa: 2,
      destroyer_asw: 16,
      destroyer_torpedo: 0,
      submarine_fleet: 0
    }
  },
  {
    id: 'submarine_wolfpack',
    name: 'Kawanan Serigala Bawah Laut (Kriegsmarine Wolfpack)',
    role: 'Blokade Ekonomi Total & Menenggelamkan Konvoi Musuh',
    doctrine: 'Trade Interdiction (Wolfpacks)',
    description: 'Formasi 30-40 kapal selam beroperasi di perairan dalam Samudra Atlantik / Pasifik untuk memutus suplai tanpa kapal permukaan.',
    composition: {
      aircraft_carrier_cv: 0,
      battleship_bb: 0,
      heavy_cruiser_ca: 0,
      light_cruiser_cl: 0,
      light_cruiser_aa: 0,
      destroyer_asw: 0,
      destroyer_torpedo: 0,
      submarine_fleet: 32
    }
  },
  {
    id: 'patrol_recon_fleet',
    name: 'Gugus Patroli Cepat & Deteksi (Fast Patrol Task Force)',
    role: 'Mencari dan Mengunci Posisi Armada Musuh (Do Not Engage)',
    doctrine: 'All Doctrines',
    description: 'Gugus kecil super lincah dengan radar & katapel pengintai untuk mendeteksi musuh sebelum memanggil Strike Force.',
    composition: {
      aircraft_carrier_cv: 0,
      battleship_bb: 0,
      heavy_cruiser_ca: 0,
      light_cruiser_cl: 4,
      light_cruiser_aa: 0,
      destroyer_asw: 8,
      destroyer_torpedo: 4,
      submarine_fleet: 0
    }
  },
  {
    id: 'shore_bombardment',
    name: 'Gugus Bantuan Tembakan Darat (Shore Bombardment)',
    role: 'Mendukung Invasi Amfibi Marinir di Pantai',
    doctrine: 'Fleet in Being',
    description: 'Konsentrasi kapal tempur berat dan penjelajah berat yang memuntahkan peluru kaliber raksasa untuk menekan pertahanan pantai musuh hingga -25%.',
    composition: {
      aircraft_carrier_cv: 1,
      battleship_bb: 6,
      super_heavy_bb: 1,
      heavy_cruiser_ca: 4,
      light_cruiser_cl: 6,
      light_cruiser_aa: 2,
      destroyer_asw: 32,
      destroyer_torpedo: 8,
      submarine_fleet: 0
    }
  }
];

export const NavalFleetDesigner: React.FC = () => {
  const [fleetCounts, setFleetCounts] = useState<{ [shipId: string]: number }>(() => {
    return { ...NAVAL_PRESETS[0].composition };
  });

  const [activePresetId, setActivePresetId] = useState<string>(NAVAL_PRESETS[0].id);
  const [weatherCondition, setWeatherCondition] = useState<'clear' | 'storm' | 'night' | 'shallow_sea'>('clear');

  // Load a preset
  const handleLoadPreset = (presetId: string) => {
    const preset = NAVAL_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setActivePresetId(presetId);
      setFleetCounts({ ...preset.composition });
    }
  };

  const handleUpdateCount = (shipId: string, delta: number) => {
    setFleetCounts(prev => ({
      ...prev,
      [shipId]: Math.max(0, (prev[shipId] || 0) + delta)
    }));
  };

  const handleSetDirectCount = (shipId: string, count: number) => {
    setFleetCounts(prev => ({
      ...prev,
      [shipId]: Math.max(0, count)
    }));
  };

  // Compute fleet totals and ratios
  const fleetAnalysis = useMemo(() => {
    let totalScreens = 0;
    let totalCapitals = 0;
    let totalCarriers = 0;
    let totalSubmarines = 0;
    let totalShips = 0;
    let totalIC = 0;
    let totalManpower = 0;
    let totalFuelPerHour = 0;
    let totalHeavyAttack = 0;
    let totalLightAttack = 0;
    let totalTorpedoAttack = 0;
    let totalAntiAir = 0;
    let totalHP = 0;
    let weightedSpeedSum = 0;
    let maxSurfaceDet = 0;
    let maxSubDet = 0;

    SHIP_CLASSES.forEach(ship => {
      const count = fleetCounts[ship.id] || 0;
      if (count > 0) {
        totalShips += count;
        totalIC += count * ship.icCost;
        totalManpower += count * ship.manpower;
        totalFuelPerHour += count * ship.fuelUse;
        totalHeavyAttack += count * ship.heavyGunAttack;
        totalLightAttack += count * ship.lightGunAttack;
        totalTorpedoAttack += count * ship.torpedoAttack;
        totalAntiAir += count * ship.antiAir;
        totalHP += count * ship.hp;
        weightedSpeedSum += count * ship.speedKnots;

        if (ship.surfaceDetection > maxSurfaceDet) maxSurfaceDet = ship.surfaceDetection;
        if (ship.subDetection > maxSubDet) maxSubDet = ship.subDetection;

        if (ship.category === 'screen') totalScreens += count;
        else if (ship.category === 'capital') totalCapitals += count;
        else if (ship.category === 'carrier') totalCarriers += count;
        else if (ship.category === 'submarine') totalSubmarines += count;
      }
    });

    const averageSpeed = totalShips > 0 ? Number((weightedSpeedSum / totalShips).toFixed(1)) : 0;

    // HOI4 Naval Formula:
    // Required Screens: 4 screens per 1 Capital Ship (BB, BC, CA, CV)
    // Required Capitals for Carrier Screening: 1 Capital per 1 Carrier (CV)
    const allCapitalsAndCarriers = totalCapitals + totalCarriers;
    const requiredScreens = allCapitalsAndCarriers * 4;

    const screenRatio = allCapitalsAndCarriers > 0
      ? Number((totalScreens / allCapitalsAndCarriers).toFixed(2))
      : totalScreens > 0 ? 99 : 0;

    const screenEfficiencyPercent = allCapitalsAndCarriers > 0
      ? Math.min(100, Math.round((totalScreens / requiredScreens) * 100))
      : 100;

    // Carrier screening: Capitals needed to protect carriers
    const requiredCapitalsForCarriers = totalCarriers * 1;
    const carrierScreenEfficiencyPercent = totalCarriers > 0
      ? Math.min(100, Math.round((totalCapitals / requiredCapitalsForCarriers) * 100))
      : 100;

    // Torpedo penetration risk when screening efficiency is below 100%
    const torpedoPenetrationChance = Math.max(0, 100 - screenEfficiencyPercent);

    // Weather impact
    let weatherPenaltyMsg = 'Kondisi laut normal. Semua sistem senjata dan pesawat beroperasi optimal.';
    if (weatherCondition === 'storm') {
      weatherPenaltyMsg = 'Badai Laut Ekstrem: Pesawat kapal induk tidak dapat terbang (-100%), kecepatan armada -30%, deteksi -50%.';
    } else if (weatherCondition === 'night') {
      weatherPenaltyMsg = 'Pertempuran Malam: Serangan meriam -50%, namun akurasi torpedo meningkat drastis +25%.';
    } else if (weatherCondition === 'shallow_sea') {
      weatherPenaltyMsg = 'Laut Dangkal (Fjord / Selat): Kapal tempur berat & kapal induk terkena penalti posisi -20%, kapal selam mudah terdeteksi.';
    }

    return {
      totalShips,
      totalScreens,
      totalCapitals,
      totalCarriers,
      totalSubmarines,
      requiredScreens,
      screenRatio,
      screenEfficiencyPercent,
      carrierScreenEfficiencyPercent,
      torpedoPenetrationChance,
      totalIC,
      totalManpower,
      totalFuelPerHour,
      dailyFuelTons: Math.round(totalFuelPerHour * 24),
      totalHeavyAttack,
      totalLightAttack,
      totalTorpedoAttack,
      totalAntiAir,
      totalHP,
      averageSpeed,
      maxSurfaceDet,
      maxSubDet,
      weatherPenaltyMsg
    };
  }, [fleetCounts, weatherCondition]);

  return (
    <div className="space-y-6 text-[#f1f5f9]">
      {/* Header Banner */}
      <div className="rounded-xl border border-sky-500/40 bg-gradient-to-r from-[#0b1926] via-[#0d2133] to-[#07131f] p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 shadow-inner">
              <Anchor className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#fef3c7] uppercase">
                  Kalkulator Desainer Armada Laut (Naval Fleet Designer)
                </h2>
                <span className="rounded bg-sky-500/20 border border-sky-500/40 px-2 py-0.5 text-[11px] font-mono text-sky-300 font-bold">
                  METODE 4:1 SCREENING EFFICIENCY HOI4
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#cbd5e1] mt-0.5">
                Rancang gugus tempur armada laut (Strike Force, Escort ASW, Submarine Wolfpack), pantau rasio kapal tabir terhadap kapal kapital, dan cegah torpedo musuh menembus kapal induk.
              </p>
            </div>
          </div>

          {/* Quick Presets Picker */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-[#94a3b8]">Preset Formasi:</span>
            <div className="flex flex-wrap gap-1.5">
              {NAVAL_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => handleLoadPreset(preset.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activePresetId === preset.id
                      ? 'bg-sky-500/30 border border-sky-400 text-sky-200 font-bold shadow'
                      : 'bg-[#102030] border border-[#1e344a] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {preset.name.split(' (')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Crucial HOI4 Naval Rule Alert: 4:1 Screening Ratio */}
      <div className={`p-4 rounded-xl border transition-all ${
        fleetAnalysis.screenEfficiencyPercent >= 100
          ? 'bg-[#0f241a] border-[#10b981]/50 text-emerald-100'
          : fleetAnalysis.screenEfficiencyPercent >= 75
          ? 'bg-[#261f0d] border-amber-500/50 text-amber-100'
          : 'bg-[#291214] border-red-500/60 text-red-100'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            {fleetAnalysis.screenEfficiencyPercent >= 100 ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
            )}
            <div>
              <h4 className="font-serif text-sm sm:text-base font-bold flex items-center gap-2">
                Efisiensi Tabir Layar (Screening Efficiency): {fleetAnalysis.screenEfficiencyPercent}%
                <span className="text-xs font-mono font-normal opacity-90">
                  (Rasio Layar: {fleetAnalysis.screenRatio}:1 | Wajib minimal 4:1)
                </span>
              </h4>
              <p className="text-xs mt-1 leading-relaxed opacity-90">
                {fleetAnalysis.screenEfficiencyPercent >= 100 ? (
                  <>★ <strong>Tabir Layar Sempurna (100%)</strong>: Kapal perusak &amp; penjelajah ringan melindungi 100% kapal tempur dan kapal induk. Torpedo musuh terhalang dan tidak bisa langsung menenggelamkan kapal induk Anda.</>
                ) : (
                  <>⚠️ <strong>Bahaya Penetrasi Torpedo ({fleetAnalysis.torpedoPenetrationChance}% Tembus)</strong>: Anda memiliki {fleetAnalysis.totalScreens} screen untuk {fleetAnalysis.totalCapitals + fleetAnalysis.totalCarriers} kapal kapital. Anda membutuhkan minimal <strong>{fleetAnalysis.requiredScreens} kapal perusak/cruiser ringan</strong> agar tidak ada celah torpedo!</>
                )}
              </p>
            </div>
          </div>

          {/* Screening Meter Visual Bar */}
          <div className="min-w-[180px] bg-[#0c1622] p-2.5 rounded-lg border border-[#1e344a] text-xs font-mono">
            <div className="flex justify-between mb-1">
              <span className="text-[#94a3b8]">Screen Ratio:</span>
              <strong className={fleetAnalysis.screenEfficiencyPercent >= 100 ? 'text-emerald-400' : 'text-red-400'}>
                {fleetAnalysis.totalScreens} / {fleetAnalysis.requiredScreens}
              </strong>
            </div>
            <div className="w-full h-2.5 bg-[#142333] rounded-full overflow-hidden border border-[#233f5b]">
              <div
                className={`h-full transition-all duration-300 ${
                  fleetAnalysis.screenEfficiencyPercent >= 100
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : fleetAnalysis.screenEfficiencyPercent >= 75
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    : 'bg-gradient-to-r from-red-600 to-red-400'
                }`}
                style={{ width: `${fleetAnalysis.screenEfficiencyPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Dashboard: Ship Builder on Left & Fleet Stats on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= COLUMN 1: SHIP COMPOSITION CONTROLS ================= */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-xl border border-[#1e344a] bg-[#0a1520] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#1b2f42] pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-5 w-5 text-sky-400" />
                <h3 className="font-serif text-base font-bold text-[#fef3c7]">
                  Komposisi Kapal Perang Gugus Tempur
                </h3>
              </div>
              <button
                onClick={() => setFleetCounts({})}
                className="flex items-center gap-1 text-[11px] font-mono text-[#94a3b8] hover:text-white px-2 py-1 rounded bg-[#102233] border border-[#1e344a]"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>

            {/* List of Ship Classes with Counters */}
            <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1 scrollbar-thin">
              {SHIP_CLASSES.map(ship => {
                const count = fleetCounts[ship.id] || 0;
                return (
                  <div
                    key={ship.id}
                    className={`p-3 rounded-lg border transition-all ${
                      count > 0
                        ? 'border-sky-500/40 bg-[#0f2336]'
                        : 'border-[#172a3b] bg-[#0c1a27] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            ship.category === 'screen'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : ship.category === 'carrier'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                              : ship.category === 'capital'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-red-500/20 text-red-300 border border-red-500/40'
                          }`}>
                            {ship.category}
                          </span>
                          <h4 className="text-sm font-bold text-white font-serif">{ship.name}</h4>
                        </div>
                        <p className="text-xs text-[#94a3b8] mt-1">{ship.description}</p>
                      </div>

                      {/* Counter Controls */}
                      <div className="flex items-center gap-1.5 shrink-0 bg-[#07111b] p-1 rounded-lg border border-[#1b3248]">
                        <button
                          onClick={() => handleUpdateCount(ship.id, -5)}
                          className="px-1.5 py-0.5 rounded text-xs font-mono text-[#94a3b8] hover:text-white hover:bg-[#142636]"
                          title="Kurang 5"
                        >
                          -5
                        </button>
                        <button
                          onClick={() => handleUpdateCount(ship.id, -1)}
                          className="h-6 w-6 rounded bg-[#102336] text-white hover:bg-[#17324c] font-bold text-xs flex items-center justify-center"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={count}
                          onChange={(e) => handleSetDirectCount(ship.id, parseInt(e.target.value) || 0)}
                          className="w-12 text-center bg-transparent text-sm font-mono font-bold text-sky-300 outline-none"
                        />
                        <button
                          onClick={() => handleUpdateCount(ship.id, 1)}
                          className="h-6 w-6 rounded bg-[#102336] text-white hover:bg-[#17324c] font-bold text-xs flex items-center justify-center"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleUpdateCount(ship.id, 5)}
                          className="px-1.5 py-0.5 rounded text-xs font-mono text-[#94a3b8] hover:text-white hover:bg-[#142636]"
                          title="Tambah 5"
                        >
                          +5
                        </button>
                      </div>
                    </div>

                    {/* Ship Key Specs Mini-bar */}
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-2.5 pt-2 border-t border-[#182c3f] text-[10px] font-mono text-[#94a3b8]">
                      <span>Biaya: <strong className="text-white">{ship.icCost} IC</strong></span>
                      <span>Kru: <strong className="text-sky-300">{ship.manpower}</strong></span>
                      <span>Speed: <strong className="text-amber-300">{ship.speedKnots} kn</strong></span>
                      <span>BBM: <strong className="text-[#38bdf8]">{ship.fuelUse}/j</strong></span>
                      <span>Torp: <strong className="text-emerald-400">{ship.torpedoAttack}</strong></span>
                      <span>Heavy Gun: <strong className="text-red-400">{ship.heavyGunAttack}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= COLUMN 2: TOTAL FLEET METRICS & TACTICAL ANALYSIS ================= */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-[#1e344a] bg-[#0a1520] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#1b2f42] pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-sky-400" />
                <h3 className="font-serif text-base font-bold text-[#fef3c7]">
                  Statistik Total Gugus Tempur ({fleetAnalysis.totalShips} Kapal)
                </h3>
              </div>
            </div>

            {/* Key Totals Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#0d1c2b] border border-[#1c3349]">
                <span className="text-[#94a3b8] block text-[10px] flex items-center gap-1">
                  <Factory className="h-3 w-3 text-amber-400" /> Total Biaya Galangan (IC)
                </span>
                <span className="text-base font-bold text-amber-300 mt-0.5 block">
                  {fleetAnalysis.totalIC.toLocaleString()} IC
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#0d1c2b] border border-[#1c3349]">
                <span className="text-[#94a3b8] block text-[10px] flex items-center gap-1">
                  <Users className="h-3 w-3 text-sky-400" /> Total Personel Laut
                </span>
                <span className="text-base font-bold text-sky-300 mt-0.5 block">
                  {fleetAnalysis.totalManpower.toLocaleString()} Pelaut
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#0d1c2b] border border-[#1c3349]">
                <span className="text-[#94a3b8] block text-[10px] flex items-center gap-1">
                  <Fuel className="h-3 w-3 text-cyan-400" /> Konsumsi Bahan Bakar (BBM)
                </span>
                <span className="text-base font-bold text-cyan-300 mt-0.5 block">
                  {fleetAnalysis.dailyFuelTons.toLocaleString()} / Hari
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#0d1c2b] border border-[#1c3349]">
                <span className="text-[#94a3b8] block text-[10px] flex items-center gap-1">
                  <Compass className="h-3 w-3 text-emerald-400" /> Kecepatan Rerata Armada
                </span>
                <span className="text-base font-bold text-emerald-300 mt-0.5 block">
                  {fleetAnalysis.averageSpeed} Knots
                </span>
              </div>
            </div>

            {/* Combat Firepower Breakdown */}
            <div className="p-3.5 rounded-xl bg-[#0c1a27] border border-[#1b3147] space-y-2 text-xs font-mono">
              <h4 className="font-bold text-sky-200 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Crosshair className="h-4 w-4 text-red-400" /> Total Daya Tembak Armada
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex justify-between p-2 rounded bg-[#08121a] border border-[#16293b]">
                  <span className="text-[#94a3b8]">Heavy Gun Attack:</span>
                  <strong className="text-red-400">{fleetAnalysis.totalHeavyAttack}</strong>
                </div>
                <div className="flex justify-between p-2 rounded bg-[#08121a] border border-[#16293b]">
                  <span className="text-[#94a3b8]">Light Gun Attack:</span>
                  <strong className="text-amber-400">{fleetAnalysis.totalLightAttack}</strong>
                </div>
                <div className="flex justify-between p-2 rounded bg-[#08121a] border border-[#16293b]">
                  <span className="text-[#94a3b8]">Torpedo Attack:</span>
                  <strong className="text-emerald-400">{fleetAnalysis.totalTorpedoAttack}</strong>
                </div>
                <div className="flex justify-between p-2 rounded bg-[#08121a] border border-[#16293b]">
                  <span className="text-[#94a3b8]">Pertahanan Flak AA:</span>
                  <strong className="text-purple-400">{fleetAnalysis.totalAntiAir}</strong>
                </div>
              </div>
            </div>

            {/* Environmental / Weather Simulator */}
            <div className="p-3.5 rounded-xl bg-[#0c1a27] border border-[#1b3147] space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-200 flex items-center gap-1.5">
                  <Waves className="h-4 w-4 text-cyan-400" /> Simulasi Zona Laut &amp; Cuaca:
                </span>
                <select
                  value={weatherCondition}
                  onChange={(e) => setWeatherCondition(e.target.value as any)}
                  className="rounded border border-[#1e344a] bg-[#07111b] px-2 py-1 text-xs text-white outline-none"
                >
                  <option value="clear">Laut Tenang (Clear)</option>
                  <option value="storm">Badai Laut (Heavy Storm)</option>
                  <option value="night">Malam Hari (Night Battle)</option>
                  <option value="shallow_sea">Laut Dangkal / Fjord</option>
                </select>
              </div>
              <p className="text-[11px] text-[#94a3b8] leading-relaxed bg-[#08121a] p-2 rounded border border-[#16293b]">
                {fleetAnalysis.weatherPenaltyMsg}
              </p>
            </div>

            {/* Meta Tips */}
            <div className="p-3 rounded-lg bg-[#0d1c2b] border border-[#1e344a] text-xs space-y-1.5">
              <span className="font-bold text-sky-300 flex items-center gap-1 text-[11px] font-mono uppercase">
                <Info className="h-3.5 w-3.5 text-sky-400" /> HOI4 Naval Meta Pro-Tips:
              </span>
              <ul className="text-[11px] text-[#cbd5e1] space-y-1 list-disc list-inside">
                <li><strong>Maksimal 4 Kapal Induk per Gugus</strong>: Lebih dari 4 kapal induk terkena penalti overstacking pesawat drastis (-20% efisiensi per kapal induk tambahan).</li>
                <li><strong>Screening 100%</strong> mencegah torpedo musuh langsung meledakkan kapal tempur/kapal induk bernilai ribuan IC.</li>
                <li><strong>Light Cruiser CL dengan meriam ringan terbanyak</strong> adalah meta pembantai destroyer musuh tercepat.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
