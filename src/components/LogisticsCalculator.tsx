import React, { useState, useMemo } from 'react';
import {
  Truck, Fuel, Gauge, AlertTriangle, CheckCircle2, ShieldAlert,
  Train, Anchor, Wind, MapPin, Compass, Layers, BookOpen,
  Info, Sparkles, RotateCcw, Copy, Check, ChevronDown,
  ArrowRight, Shield, Zap, Activity, Clock, Sliders, Box, Swords
} from 'lucide-react';
import { LogisticsCombatSimulator } from './LogisticsCombatSimulator';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface BattalionSpec {
  id: string;
  name: string;
  category: 'infantry' | 'mobile' | 'armor' | 'artillery' | 'support';
  baseSpeed: number; // km/h
  fuelPerHour: number; // liters per hour active
  supplyWeight: number; // NSB supply usage
  manpower: number;
  icCost: number;
  trucksNeeded: number;
}

export interface DivisionCustomProfile {
  name: string;
  divisionCount: number;
  battalions: { [battalionId: string]: number };
  supportCompanies: string[];
}

export type TerrainType = 'plains' | 'hills' | 'mountains' | 'forest' | 'jungle' | 'marsh' | 'urban' | 'desert';
export type WeatherType = 'clear' | 'rain' | 'mud' | 'snow' | 'extreme_cold' | 'sandstorm';
export type RailwayLevel = 1 | 2 | 3 | 4 | 5;
export type MotorizationLevel = 'horse' | 'truck_1' | 'truck_2';

// ============================================================================
// BATTALION REFERENCE DATABASE (AUTHENTIC HOI4 NSB / AAT VALUES)
// ============================================================================

export const BATTALION_DATABASE: BattalionSpec[] = [
  // Infantry / Foot
  { id: 'infantry', name: 'Infanteri Reguler', category: 'infantry', baseSpeed: 4.0, fuelPerHour: 0.05, supplyWeight: 0.06, manpower: 1000, icCost: 50, trucksNeeded: 0 },
  { id: 'mountaineer', name: 'Infanteri Gunung (Gebirgsjäger)', category: 'infantry', baseSpeed: 4.0, fuelPerHour: 0.05, supplyWeight: 0.07, manpower: 1000, icCost: 65, trucksNeeded: 0 },
  { id: 'marine', name: 'Marinir Amfibi', category: 'infantry', baseSpeed: 4.0, fuelPerHour: 0.05, supplyWeight: 0.07, manpower: 1000, icCost: 65, trucksNeeded: 0 },
  { id: 'cavalry', name: 'Kavaleri Berkuda', category: 'mobile', baseSpeed: 6.4, fuelPerHour: 0.02, supplyWeight: 0.08, manpower: 1000, icCost: 60, trucksNeeded: 0 },

  // Mobile / Motorized / Mechanized
  { id: 'motorized', name: 'Infanteri Motorized (Truk)', category: 'mobile', baseSpeed: 12.0, fuelPerHour: 1.25, supplyWeight: 0.12, manpower: 1200, icCost: 110, trucksNeeded: 50 },
  { id: 'mechanized_1', name: 'Mechanized I (Bren Carrier/Sdkfz)', category: 'mobile', baseSpeed: 8.0, fuelPerHour: 1.45, supplyWeight: 0.14, manpower: 1200, icCost: 240, trucksNeeded: 0 },
  { id: 'mechanized_2', name: 'Mechanized II (Half-Track Lanjutan)', category: 'mobile', baseSpeed: 10.5, fuelPerHour: 1.60, supplyWeight: 0.15, manpower: 1200, icCost: 280, trucksNeeded: 0 },
  { id: 'mechanized_3', name: 'Mechanized III (APC Lapis Baja)', category: 'mobile', baseSpeed: 12.0, fuelPerHour: 1.80, supplyWeight: 0.16, manpower: 1200, icCost: 320, trucksNeeded: 0 },

  // Armor / Tanks
  { id: 'light_tank', name: 'Tank Ringan (Light Tank)', category: 'armor', baseSpeed: 12.0, fuelPerHour: 1.80, supplyWeight: 0.18, manpower: 500, icCost: 360, trucksNeeded: 5 },
  { id: 'medium_tank', name: 'Tank Medium (Panzer IV / T-34 / Sherman)', category: 'armor', baseSpeed: 9.0, fuelPerHour: 2.85, supplyWeight: 0.22, manpower: 500, icCost: 620, trucksNeeded: 10 },
  { id: 'heavy_tank', name: 'Tank Berat (Tiger I / KV-1 / IS-2)', category: 'armor', baseSpeed: 5.5, fuelPerHour: 4.90, supplyWeight: 0.36, manpower: 500, icCost: 1150, trucksNeeded: 12 },
  { id: 'modern_tank', name: 'Modern Tank Utama (Main Battle Tank)', category: 'armor', baseSpeed: 11.5, fuelPerHour: 3.40, supplyWeight: 0.26, manpower: 500, icCost: 1400, trucksNeeded: 10 },
  { id: 'tank_destroyer', name: 'Penghancur Tank (Tank Destroyer)', category: 'armor', baseSpeed: 8.5, fuelPerHour: 2.60, supplyWeight: 0.20, manpower: 500, icCost: 580, trucksNeeded: 8 },
  { id: 'sp_artillery', name: 'Artileri Bergerak (Self-Propelled Gun)', category: 'armor', baseSpeed: 8.5, fuelPerHour: 2.70, supplyWeight: 0.25, manpower: 500, icCost: 600, trucksNeeded: 8 },

  // Artillery / Heavy Weapons
  { id: 'towed_artillery', name: 'Artileri Tarik (Towed Arty 105mm/122mm)', category: 'artillery', baseSpeed: 4.0, fuelPerHour: 0.05, supplyWeight: 0.20, manpower: 500, icCost: 140, trucksNeeded: 0 },
  { id: 'towed_anti_air', name: 'Anti-Air Tarik (Flak 38 / Bofors 40mm)', category: 'artillery', baseSpeed: 4.0, fuelPerHour: 0.05, supplyWeight: 0.12, manpower: 500, icCost: 100, trucksNeeded: 0 },
  { id: 'towed_anti_tank', name: 'Anti-Tank Tarik (PaK 40 / 6-Pounder)', category: 'artillery', baseSpeed: 4.0, fuelPerHour: 0.05, supplyWeight: 0.15, manpower: 500, icCost: 120, trucksNeeded: 0 },
  { id: 'motorized_artillery', name: 'Artileri Truk (Motorized Artillery)', category: 'artillery', baseSpeed: 12.0, fuelPerHour: 1.50, supplyWeight: 0.24, manpower: 500, icCost: 220, trucksNeeded: 35 },
  { id: 'rocket_artillery', name: 'Katyusha / Panzerwerfer (Rocket Truck)', category: 'artillery', baseSpeed: 12.0, fuelPerHour: 1.75, supplyWeight: 0.26, manpower: 500, icCost: 260, trucksNeeded: 40 }
];

export const SUPPORT_COMPANIES_DATABASE = [
  { id: 'sup_engineer', name: 'Zeni Tempur (Engineer)', fuelPerHour: 0.05, supplyWeight: 0.08, manpower: 300, icCost: 120, speedCapMod: 1.0 },
  { id: 'sup_recon_cav', name: 'Pengintai Kavaleri (Cavalry Recon)', fuelPerHour: 0.05, supplyWeight: 0.08, manpower: 300, icCost: 90, speedCapMod: 1.0 },
  { id: 'sup_recon_mot', name: 'Pengintai Truk (Motorized Recon)', fuelPerHour: 0.65, supplyWeight: 0.12, manpower: 300, icCost: 180, speedCapMod: 1.0 },
  { id: 'sup_recon_arm', name: 'Pengintai Panser (Armored Car Recon)', fuelPerHour: 0.75, supplyWeight: 0.12, manpower: 300, icCost: 210, speedCapMod: 1.0 },
  { id: 'sup_artillery', name: 'Artileri Bantuan (Support Arty)', fuelPerHour: 0.05, supplyWeight: 0.14, manpower: 300, icCost: 150, speedCapMod: 1.0 },
  { id: 'sup_anti_air', name: 'Anti-Air Bantuan (Support AA)', fuelPerHour: 0.05, supplyWeight: 0.10, manpower: 300, icCost: 110, speedCapMod: 1.0 },
  { id: 'sup_anti_tank', name: 'Anti-Tank Bantuan (Support AT)', fuelPerHour: 0.05, supplyWeight: 0.12, manpower: 300, icCost: 130, speedCapMod: 1.0 },
  { id: 'sup_flame_tank', name: 'Tank Penyembur Api (Flame Tank)', fuelPerHour: 0.85, supplyWeight: 0.15, manpower: 300, icCost: 280, speedCapMod: 1.0 },
  { id: 'sup_logistics', name: 'Kompi Logistik (Logistics Company)', fuelPerHour: 0.15, supplyWeight: 0.05, manpower: 400, icCost: 180, speedCapMod: 1.0, isLogisticsCompany: true },
  { id: 'sup_signal', name: 'Kompi Komunikasi Sinyal (Signal)', fuelPerHour: 0.20, supplyWeight: 0.08, manpower: 400, icCost: 160, speedCapMod: 1.0 },
  { id: 'sup_maintenance', name: 'Kompi Pemeliharaan & Derek (Maintenance)', fuelPerHour: 0.25, supplyWeight: 0.08, manpower: 400, icCost: 190, speedCapMod: 1.0 },
  { id: 'sup_field_hospital', name: 'Rumah Sakit Lapangan (Field Hospital)', fuelPerHour: 0.10, supplyWeight: 0.08, manpower: 500, icCost: 160, speedCapMod: 1.0 }
];

export interface LogisticsScenario {
  id: string;
  name: string;
  description: string;
  divisionCount: number;
  battalions: { [id: string]: number };
  supportCompanies: string[];
  terrain: TerrainType;
  weather: WeatherType;
  railwayLevel: RailwayLevel;
  infrastructureLevel: number;
  distanceFromHub: number;
  motorizationLevel: MotorizationLevel;
  dailyMovementHours: number;
  dailyCombatHours: number;
}

// Curated battle scenarios for instant testing
export const LOGISTICS_SCENARIOS: LogisticsScenario[] = [
  {
    id: 'panzer_spearhead_1941',
    name: 'Korps Panzer Spearhead (Barbarossa 1941)',
    description: '12 Divisi Panzer Medium (30w) menembus rawa Belarus menuju Smolensk. Uji ketahanan bahan bakar kecepatan tinggi dan suplai hub.',
    divisionCount: 12,
    battalions: {
      medium_tank: 8,
      motorized: 6,
      sp_artillery: 1
    },
    supportCompanies: ['sup_engineer', 'sup_recon_mot', 'sup_flame_tank', 'sup_logistics', 'sup_maintenance'],
    terrain: 'plains' as TerrainType,
    weather: 'mud' as WeatherType, // Rasputitsa!
    railwayLevel: 2 as RailwayLevel,
    infrastructureLevel: 2,
    distanceFromHub: 4,
    motorizationLevel: 'truck_1' as MotorizationLevel,
    dailyMovementHours: 12,
    dailyCombatHours: 6
  },
  {
    id: 'desert_rats_el_alamein',
    name: 'Divisi Lapis Baja Gurun Sekutu (El Alamein 1942)',
    description: 'Armada tank Sherman dan Crusader Angkatan Darat ke-8 Montgomery menyerbu garis pantai pasir Mesir.',
    divisionCount: 8,
    battalions: {
      medium_tank: 6,
      motorized: 4,
      motorized_artillery: 2
    },
    supportCompanies: ['sup_engineer', 'sup_recon_arm', 'sup_artillery', 'sup_logistics', 'sup_signal'],
    terrain: 'desert' as TerrainType,
    weather: 'sandstorm' as WeatherType,
    railwayLevel: 3 as RailwayLevel,
    infrastructureLevel: 3,
    distanceFromHub: 5,
    motorizationLevel: 'truck_2' as MotorizationLevel,
    dailyMovementHours: 10,
    dailyCombatHours: 8
  },
  {
    id: 'eastern_front_infantry_mass',
    name: 'Tentara Infanteri Garis Depan (Soviet Deep Battle)',
    description: '48 Divisi Infanteri Garis Depan (9 Inf / 1 Art) dengan logistik kereta api berat mendorong garis front.',
    divisionCount: 48,
    battalions: {
      infantry: 9,
      towed_artillery: 1,
      towed_anti_air: 1
    },
    supportCompanies: ['sup_engineer', 'sup_recon_cav', 'sup_artillery'],
    terrain: 'plains' as TerrainType,
    weather: 'snow' as WeatherType,
    railwayLevel: 3 as RailwayLevel,
    infrastructureLevel: 2,
    distanceFromHub: 2,
    motorizationLevel: 'horse' as MotorizationLevel,
    dailyMovementHours: 6,
    dailyCombatHours: 10
  },
  {
    id: 'heavy_tiger_battalion',
    name: 'Korps Tank Berat Tiger I (Schwere Panzerabteilung)',
    description: '6 Divisi serbu berat berisikan tank Tiger I dan mekanis lapis baja yang haus bahan bakar dan bobot suplai masif.',
    divisionCount: 6,
    battalions: {
      heavy_tank: 6,
      mechanized_2: 6,
      tank_destroyer: 2
    },
    supportCompanies: ['sup_engineer', 'sup_maintenance', 'sup_logistics', 'sup_anti_air', 'sup_flame_tank'],
    terrain: 'hills' as TerrainType,
    weather: 'clear' as WeatherType,
    railwayLevel: 2 as RailwayLevel,
    infrastructureLevel: 3,
    distanceFromHub: 3,
    motorizationLevel: 'truck_2' as MotorizationLevel,
    dailyMovementHours: 8,
    dailyCombatHours: 8
  }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const LogisticsCalculator: React.FC = () => {
  // State: Division Profile
  const [divisionCount, setDivisionCount] = useState<number>(12);
  const [battalionCounts, setBattalionCounts] = useState<{ [id: string]: number }>({
    medium_tank: 8,
    motorized: 6,
    sp_artillery: 1
  });
  const [selectedSupports, setSelectedSupports] = useState<string[]>([
    'sup_engineer', 'sup_recon_mot', 'sup_flame_tank', 'sup_logistics', 'sup_maintenance'
  ]);

  // State: Operational Environment
  const [terrain, setTerrain] = useState<TerrainType>('plains');
  const [weather, setWeather] = useState<WeatherType>('clear');
  const [logisticsCompanyLevel, setLogisticsCompanyLevel] = useState<number>(2); // Level 1 to 4 (-10%, -20%, -30%, -40%)
  const [doctrineSpeedBonus, setDoctrineSpeedBonus] = useState<number>(10); // Mobile Warfare +10%

  // State: Tactical Activity (Movement & Combat)
  const [dailyMovementHours, setDailyMovementHours] = useState<number>(10); // 0 - 24
  const [dailyCombatHours, setDailyCombatHours] = useState<number>(6); // 0 - 24

  // State: Supply Hub & Logistics Network
  const [railwayLevel, setRailwayLevel] = useState<RailwayLevel>(3);
  const [infrastructureLevel, setInfrastructureLevel] = useState<number>(3); // 1-5
  const [distanceFromHub, setDistanceFromHub] = useState<number>(3); // provinces
  const [motorizationLevel, setMotorizationLevel] = useState<MotorizationLevel>('truck_1');
  const [airSupplyPlanes, setAirSupplyPlanes] = useState<number>(0); // C-47 / Ju 52 air transports
  const [activeViewMode, setActiveViewMode] = useState<'calculator' | 'combat_sim' | 'all'>('calculator');
  const [activeGuidelineTab, setActiveGuidelineTab] = useState<string>('throughput');
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Quick preset loading
  const handleLoadScenario = (scenario: LogisticsScenario) => {
    setDivisionCount(scenario.divisionCount);
    setBattalionCounts({ ...scenario.battalions });
    setSelectedSupports([...scenario.supportCompanies]);
    setTerrain(scenario.terrain);
    setWeather(scenario.weather);
    setRailwayLevel(scenario.railwayLevel);
    setInfrastructureLevel(scenario.infrastructureLevel);
    setDistanceFromHub(scenario.distanceFromHub);
    setMotorizationLevel(scenario.motorizationLevel);
    setDailyMovementHours(scenario.dailyMovementHours);
    setDailyCombatHours(scenario.dailyCombatHours);
  };

  // Battalion increment / decrement
  const handleUpdateBattalion = (id: string, delta: number) => {
    setBattalionCounts(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  // Toggle support company (max 5)
  const handleToggleSupport = (id: string) => {
    setSelectedSupports(prev => {
      if (prev.includes(id)) {
        return prev.filter(s => s !== id);
      }
      if (prev.length >= 5) return prev;
      return [...prev, id];
    });
  };

  // ============================================================================
  // REALISTIC HOI4 MATHEMATICAL CALCULATIONS
  // ============================================================================

  const calculations = useMemo(() => {
    // 1. Total Battalions in 1 Division
    const activeBattalionsList: { spec: BattalionSpec; count: number }[] = [];
    let totalBattalionsCount = 0;
    let totalDivisionManpower = 0;
    let totalDivisionIC = 0;
    let totalDivisionTrucks = 0;

    Object.entries(battalionCounts).forEach(([bId, count]) => {
      if (count <= 0) return;
      const spec = BATTALION_DATABASE.find(b => b.id === bId);
      if (spec) {
        activeBattalionsList.push({ spec, count });
        totalBattalionsCount += count;
        totalDivisionManpower += spec.manpower * count;
        totalDivisionIC += spec.icCost * count;
        totalDivisionTrucks += spec.trucksNeeded * count;
      }
    });

    // Support companies add manpower & IC
    selectedSupports.forEach(supId => {
      const supSpec = SUPPORT_COMPANIES_DATABASE.find(s => s.id === supId);
      if (supSpec) {
        totalDivisionManpower += supSpec.manpower;
        totalDivisionIC += supSpec.icCost;
      }
    });

    // 2. Division Speed (Governed by Slowest Combat Battalion)
    // If no combat battalions, default to 4.0 km/h
    let rawBaseSpeed = 12.0;
    if (activeBattalionsList.length > 0) {
      rawBaseSpeed = Math.min(...activeBattalionsList.map(item => item.spec.baseSpeed));
    } else {
      rawBaseSpeed = 4.0;
    }

    // Terrain modifier on speed
    const terrainSpeedMultipliers: { [key in TerrainType]: number } = {
      plains: 1.0,
      hills: 0.85,
      mountains: 0.50,
      forest: 0.80,
      jungle: 0.60,
      marsh: 0.45,
      urban: 0.75,
      desert: 0.95
    };

    // Weather modifier on speed
    const weatherSpeedMultipliers: { [key in WeatherType]: number } = {
      clear: 1.0,
      rain: 0.90,
      mud: 0.50, // Rasputitsa: -50% speed penalty!
      snow: 0.70,
      extreme_cold: 0.60,
      sandstorm: 0.55
    };

    // Doctrine & tech speed bonus (percentage)
    const doctrineMult = 1 + (doctrineSpeedBonus / 100);

    const terrainMod = terrainSpeedMultipliers[terrain] || 1.0;
    const weatherMod = weatherSpeedMultipliers[weather] || 1.0;
    const effectiveSpeed = parseFloat((rawBaseSpeed * terrainMod * weatherMod * doctrineMult).toFixed(1));

    // Daily distance covered in km
    const dailyDistanceKm = parseFloat((effectiveSpeed * dailyMovementHours).toFixed(1));

    // 3. Fuel Consumption Calculations
    // Mud doubles fuel burn (+50% to +100%); Extreme cold and sandstorm add +25%
    const weatherFuelMultipliers: { [key in WeatherType]: number } = {
      clear: 1.0,
      rain: 1.10,
      mud: 1.65, // Rasputitsa causes engines to rev hard in mud
      snow: 1.25,
      extreme_cold: 1.30,
      sandstorm: 1.25
    };
    const weatherFuelMod = weatherFuelMultipliers[weather] || 1.0;

    // Logistics company fuel reduction: -10% per level
    const hasLogisticsCompany = selectedSupports.some(s => s === 'sup_logistics');
    const logisticsCompanyReduction = hasLogisticsCompany ? (logisticsCompanyLevel * 0.10) : 0; // e.g. 20%
    const logisticsFuelFactor = 1 - logisticsCompanyReduction;

    // Hourly fuel consumption of 1 division when active
    let hourlyBaseFuelPerDiv = 0;
    activeBattalionsList.forEach(item => {
      hourlyBaseFuelPerDiv += item.spec.fuelPerHour * item.count * 30; // 30 represents equipment density scale per battalion
    });
    selectedSupports.forEach(supId => {
      const supSpec = SUPPORT_COMPANIES_DATABASE.find(s => s.id === supId);
      if (supSpec) {
        hourlyBaseFuelPerDiv += supSpec.fuelPerHour * 20;
      }
    });

    // Speed scaling factor: moving at 12 km/h burns more fuel per hour than creeping at 4 km/h
    const speedRatio = Math.max(0.6, effectiveSpeed / 8.0);

    // Idle hours = 24 - (movement + combat)
    const idleHours = Math.max(0, 24 - dailyMovementHours - dailyCombatHours);

    // Daily fuel for 1 division (liters)
    // Moving burns base * speedRatio * weatherMod
    // Combat burns base * 1.35 * weatherMod
    // Idle burns base * 0.08 (minimal engine maintenance / warmup)
    const movingFuelBurn = dailyMovementHours * hourlyBaseFuelPerDiv * speedRatio * weatherFuelMod * logisticsFuelFactor;
    const combatFuelBurn = dailyCombatHours * hourlyBaseFuelPerDiv * 1.35 * weatherFuelMod * logisticsFuelFactor;
    const idleFuelBurn = idleHours * hourlyBaseFuelPerDiv * 0.08 * weatherFuelMod * logisticsFuelFactor;

    const dailyFuelPerDivision = Math.round(movingFuelBurn + combatFuelBurn + idleFuelBurn);
    const totalArmyDailyFuel = dailyFuelPerDivision * divisionCount;
    const totalArmyDailyBarrels = Math.round(totalArmyDailyFuel / 159); // 1 barrel = 159 liters

    // Division internal fuel capacity (typically 48h to 72h of operations away from supply hub)
    const fuelCapacityLiters = Math.round(hourlyBaseFuelPerDiv * 48);
    const daysOfFuelReserves = dailyFuelPerDivision > 0
      ? parseFloat((fuelCapacityLiters / dailyFuelPerDivision).toFixed(1))
      : 99.0;

    // 4. Supply Throughput Requirements (NSB System)
    // Base Supply Weight for 1 division
    let rawSupplyWeightPerDiv = 0;
    activeBattalionsList.forEach(item => {
      rawSupplyWeightPerDiv += item.spec.supplyWeight * item.count;
    });
    selectedSupports.forEach(supId => {
      const supSpec = SUPPORT_COMPANIES_DATABASE.find(s => s.id === supId);
      if (supSpec) {
        rawSupplyWeightPerDiv += supSpec.supplyWeight;
      }
    });

    // Logistics company supply reduction (-10% to -40%)
    const logisticsSupplyFactor = 1 - logisticsCompanyReduction;
    const effectiveSupplyWeightPerDiv = parseFloat((rawSupplyWeightPerDiv * logisticsSupplyFactor).toFixed(2));

    // Total Demand for all divisions in the province/state
    const totalArmySupplyDemand = parseFloat((effectiveSupplyWeightPerDiv * divisionCount).toFixed(2));

    // 5. Supply Hub & Railway Throughput Capacity
    // Railway Level Capacity: L1=15, L2=20, L3=25, L4=30, L5=35
    const railwayCapacities: { [key in RailwayLevel]: number } = {
      1: 15.0,
      2: 20.0,
      3: 25.0,
      4: 30.0,
      5: 35.0
    };
    const hubRailwayCap = railwayCapacities[railwayLevel] || 15.0;

    // State Local Infrastructure adds +1.0 per level (independent of rail)
    const localInfraSupply = infrastructureLevel * 1.2;

    // Air supply transport planes: each 50 planes drop ~2.5 supply points
    const airSupplyDelivered = parseFloat(((airSupplyPlanes / 50) * 2.5).toFixed(1));

    // Motorization Hub Range & Distance Falloff
    // Horse: Max 3 provinces, falloff 25% per province past 1
    // Truck 1: Max 5 provinces, falloff 10% per province past 1
    // Truck 2: Max 8 provinces, falloff 5% per province past 1
    let maxHubRange = 3;
    let falloffRate = 0.25;
    let hubTruckCost = 0;
    let hubFuelCost = 0;

    if (motorizationLevel === 'truck_1') {
      maxHubRange = 5;
      falloffRate = 0.10;
      hubTruckCost = 50;
      hubFuelCost = 120;
    } else if (motorizationLevel === 'truck_2') {
      maxHubRange = 8;
      falloffRate = 0.05;
      hubTruckCost = 100;
      hubFuelCost = 240;
    }

    const isOutOfHubRange = distanceFromHub > maxHubRange;
    const provincesPastFirst = Math.max(0, distanceFromHub - 1);
    const distanceEfficiency = isOutOfHubRange
      ? 0.10 // severe cutoff if out of range
      : Math.max(0.15, 1 - (provincesPastFirst * falloffRate));

    const effectiveHubSupplyDelivered = parseFloat((hubRailwayCap * distanceEfficiency).toFixed(1));
    const totalAvailableSupply = parseFloat((effectiveHubSupplyDelivered + localInfraSupply + airSupplyDelivered).toFixed(1));

    // Saturation & Deficit
    const supplySaturationRatio = totalAvailableSupply > 0
      ? parseFloat(((totalArmySupplyDemand / totalAvailableSupply) * 100).toFixed(0))
      : 999;
    const supplyDeficit = Math.max(0, parseFloat((totalArmySupplyDemand - totalAvailableSupply).toFixed(1)));

    // Supply Status & Penalties
    let supplyStatus: 'optimal' | 'strained' | 'overburdened' | 'starvation' = 'optimal';
    let attritionPercent = 0;
    let orgPenaltyPercent = 0;
    let combatSpeedPenaltyPercent = 0;

    if (supplySaturationRatio <= 85) {
      supplyStatus = 'optimal';
      attritionPercent = 0.5;
      orgPenaltyPercent = 0;
      combatSpeedPenaltyPercent = 0;
    } else if (supplySaturationRatio <= 100) {
      supplyStatus = 'strained';
      attritionPercent = 2.0;
      orgPenaltyPercent = 5;
      combatSpeedPenaltyPercent = 5;
    } else if (supplySaturationRatio <= 135) {
      supplyStatus = 'overburdened';
      attritionPercent = 12.0;
      orgPenaltyPercent = 25;
      combatSpeedPenaltyPercent = 30;
    } else {
      supplyStatus = 'starvation';
      attritionPercent = 35.0; // Equipment and trucks are lost at catastrophic rate
      orgPenaltyPercent = 50; // Max out-of-supply org drop
      combatSpeedPenaltyPercent = 60; // Units crawl
    }

    // Trains & Rolling Stock Requirement
    // 1 Train carries ~15 supply throughput
    const trainsRequired = Math.max(2, Math.ceil(totalArmySupplyDemand / 14));

    // Trucks required for army distribution
    const armyTrucksNeeded = (totalDivisionTrucks * divisionCount) + hubTruckCost;

    return {
      totalBattalionsCount,
      totalDivisionManpower,
      totalDivisionIC,
      effectiveSpeed,
      rawBaseSpeed,
      dailyDistanceKm,
      dailyFuelPerDivision,
      totalArmyDailyFuel,
      totalArmyDailyBarrels,
      daysOfFuelReserves,
      rawSupplyWeightPerDiv,
      effectiveSupplyWeightPerDiv,
      totalArmySupplyDemand,
      hubRailwayCap,
      localInfraSupply,
      airSupplyDelivered,
      maxHubRange,
      distanceEfficiency,
      isOutOfHubRange,
      effectiveHubSupplyDelivered,
      totalAvailableSupply,
      supplySaturationRatio,
      supplyDeficit,
      supplyStatus,
      attritionPercent,
      orgPenaltyPercent,
      combatSpeedPenaltyPercent,
      trainsRequired,
      armyTrucksNeeded,
      logisticsCompanyReduction
    };
  }, [
    divisionCount,
    battalionCounts,
    selectedSupports,
    terrain,
    weather,
    logisticsCompanyLevel,
    doctrineSpeedBonus,
    dailyMovementHours,
    dailyCombatHours,
    railwayLevel,
    infrastructureLevel,
    distanceFromHub,
    motorizationLevel,
    airSupplyPlanes
  ]);

  const handleCopySummary = () => {
    const summaryText = `[LAPORAN KALKULATOR LOGISTIK & BAHAN BAKAR HOI4]
Divisi: ${divisionCount}x (${calculations.totalBattalionsCount} Batalion / Divisi)
Kecepatan Efektif: ${calculations.effectiveSpeed} km/h (Jarak: ${calculations.dailyDistanceKm} km/hari)
Bahan Bakar Harian: ${calculations.totalArmyDailyFuel.toLocaleString()} Liter (${calculations.totalArmyDailyBarrels} barel/hari)
Cadangan Bahan Bakar: ${calculations.daysOfFuelReserves} Hari Operasional
Kebutuhan Suplai: ${calculations.totalArmySupplyDemand} Throughput
Kapasitas Suplai Tersedia: ${calculations.totalAvailableSupply} Throughput (Saturasi: ${calculations.supplySaturationRatio}%)
Status Suplai: ${calculations.supplyStatus.toUpperCase()} (Atrisi: ${calculations.attritionPercent}%/hari, Penalti Org: -${calculations.orgPenaltyPercent}%)
Kebutuhan Kereta Api: ${calculations.trainsRequired} Kereta | Truk: ${calculations.armyTrucksNeeded} Unit`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Scenario Presets Bar */}
      <div className="rounded-xl border border-[#233547] bg-[#0f1722] p-5 shadow-xl shadow-black/40">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-[#1e2a38]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0284c7] to-[#0369a1] text-white shadow-lg shadow-sky-950/50">
              <Fuel className="h-6 w-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-[#f8fafc]">
                  Kalkulator Logistik, Bahan Bakar &amp; Throughput Suplai HOI4
                </h2>
                <span className="rounded-md bg-[#0284c7]/20 border border-[#0284c7]/40 px-2 py-0.5 font-mono text-[11px] font-bold text-[#38bdf8]">
                  No Step Back (NSB) Engine
                </span>
              </div>
              <p className="text-xs text-[#94a3b8]">
                Estimasi akurat konsumsi bahan bakar, kecepatan manuver spearhead, bobot suplai divisi, dan batas throughput hub jalur kereta api.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 rounded-lg border border-[#334155] bg-[#16222f] px-3 py-1.5 font-mono text-xs font-semibold text-[#cbd5e1] hover:border-[#38bdf8] hover:text-[#f8fafc] transition-all"
            >
              {copiedSummary ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#10b981]" />
                  <span className="text-[#10b981]">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#94a3b8]" />
                  <span>Salin Analisis Logistik</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Scenario Buttons */}
        <div className="pt-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-[#fbbf24]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
              Muat Skenario Tempur Historis Cepat:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {LOGISTICS_SCENARIOS.map(scen => (
              <button
                key={scen.id}
                onClick={() => handleLoadScenario(scen)}
                className="flex flex-col text-left rounded-lg border border-[#1e2e3f] bg-[#0a1017] p-2.5 hover:border-[#38bdf8]/60 hover:bg-[#111e2c] transition-all group"
              >
                <span className="font-semibold text-xs text-[#f1f5f9] group-hover:text-[#38bdf8] flex items-center justify-between">
                  {scen.name}
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#38bdf8]" />
                </span>
                <span className="text-[11px] text-[#64748b] line-clamp-1 mt-0.5">
                  {scen.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main KPI Status Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Daily Fuel Burn */}
        <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 shadow-md">
          <div className="flex items-center justify-between text-xs text-[#94a3b8] mb-1">
            <span className="font-mono uppercase font-semibold flex items-center gap-1.5 text-[#f59e0b]">
              <Fuel className="h-4 w-4" /> Konsumsi Bensin Total
            </span>
            <span className="font-mono text-[10px] text-[#64748b]">{divisionCount} Divisi</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-black text-[#fef3c7]">
              {calculations.totalArmyDailyFuel.toLocaleString()}
            </span>
            <span className="font-mono text-xs text-[#f59e0b]">L/hari</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1e2938] text-[11px] text-[#94a3b8]">
            <span>~{calculations.totalArmyDailyBarrels} barel/hari</span>
            <span className="font-mono font-bold text-sky-400">{calculations.dailyFuelPerDivision.toLocaleString()} L/div</span>
          </div>
        </div>

        {/* Card 2: Effective Speed & Endurance */}
        <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 shadow-md">
          <div className="flex items-center justify-between text-xs text-[#94a3b8] mb-1">
            <span className="font-mono uppercase font-semibold flex items-center gap-1.5 text-[#38bdf8]">
              <Gauge className="h-4 w-4" /> Kecepatan Taktis Spearhead
            </span>
            <span className="font-mono text-[10px] text-[#64748b]">Slowest Bn: {calculations.rawBaseSpeed} km/h</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-black text-[#7dd3fc]">
              {calculations.effectiveSpeed}
            </span>
            <span className="font-mono text-xs text-[#38bdf8]">km/jam</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1e2938] text-[11px] text-[#94a3b8]">
            <span>Manuver: {calculations.dailyDistanceKm} km/hari</span>
            <span className={`font-mono font-bold ${calculations.daysOfFuelReserves < 2 ? 'text-amber-400' : 'text-emerald-400'}`}>
              Cadangan: {calculations.daysOfFuelReserves} Hari
            </span>
          </div>
        </div>

        {/* Card 3: Supply Demand vs Capacity */}
        <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 shadow-md">
          <div className="flex items-center justify-between text-xs text-[#94a3b8] mb-1">
            <span className="font-mono uppercase font-semibold flex items-center gap-1.5 text-[#a7f3d0]">
              <Truck className="h-4 w-4 text-[#10b981]" /> Kebutuhan vs Throughput
            </span>
            <span className="font-mono text-[10px] text-[#64748b]">Bobot: {calculations.effectiveSupplyWeightPerDiv}/div</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-black text-[#f8fafc]">
              {calculations.totalArmySupplyDemand}
            </span>
            <span className="font-mono text-xs text-[#94a3b8]">/ {calculations.totalAvailableSupply} Titik</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1e2938] text-[11px]">
            <span className="text-[#94a3b8]">Saturasi Hub:</span>
            <span className={`font-mono font-bold ${
              calculations.supplySaturationRatio > 100 ? 'text-rose-400' :
              calculations.supplySaturationRatio > 85 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {calculations.supplySaturationRatio}% Kapasitas
            </span>
          </div>
        </div>

        {/* Card 4: Supply Saturation & Combat Penalty */}
        <div className={`rounded-xl border p-4 shadow-md ${
          calculations.supplyStatus === 'optimal'
            ? 'border-[#10b981]/50 bg-[#0d2319]'
            : calculations.supplyStatus === 'strained'
            ? 'border-[#f59e0b]/50 bg-[#241a0d]'
            : calculations.supplyStatus === 'overburdened'
            ? 'border-[#f97316]/60 bg-[#28150a]'
            : 'border-[#ef4444]/60 bg-[#2a0e12]'
        }`}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono uppercase font-semibold flex items-center gap-1.5 text-[#f8fafc]">
              {calculations.supplyStatus === 'optimal' && <CheckCircle2 className="h-4 w-4 text-[#10b981]" />}
              {calculations.supplyStatus === 'strained' && <AlertTriangle className="h-4 w-4 text-[#f59e0b]" />}
              {calculations.supplyStatus === 'overburdened' && <ShieldAlert className="h-4 w-4 text-[#f97316]" />}
              {calculations.supplyStatus === 'starvation' && <ShieldAlert className="h-4 w-4 text-[#ef4444]" />}
              Status Logistik Front
            </span>
            <span className="font-mono text-[10px] uppercase font-bold text-white px-1.5 py-0.5 rounded bg-black/40">
              {calculations.supplyStatus}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`font-mono text-2xl font-black ${
              calculations.supplyStatus === 'optimal' ? 'text-[#a7f3d0]' :
              calculations.supplyStatus === 'strained' ? 'text-[#fef3c7]' :
              calculations.supplyStatus === 'overburdened' ? 'text-[#fed7aa]' : 'text-[#fca5a5]'
            }`}>
              {calculations.attritionPercent}%
            </span>
            <span className="font-mono text-xs text-[#94a3b8]">Atrisi Harian</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-[11px] text-[#cbd5e1]">
            <span>Penalti Org: -{calculations.orgPenaltyPercent}%</span>
            <span>Rem Kecepatan: -{calculations.combatSpeedPenaltyPercent}%</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Division Template & Battalion Tuning (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Division Size & Support Companies */}
          <div className="rounded-xl border border-[#223344] bg-[#111923] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#38bdf8]" />
                <h3 className="text-sm font-bold text-[#f8fafc] uppercase tracking-wide">
                  1. Skala Korps &amp; Komposisi Batalion
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#94a3b8]">Jumlah Divisi:</span>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={divisionCount}
                  onChange={(e) => setDivisionCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 rounded border border-[#334155] bg-[#0c141d] px-2 py-1 text-center font-mono text-sm font-bold text-[#38bdf8] focus:border-[#38bdf8] focus:outline-none"
                />
              </div>
            </div>

            {/* Battalion Selector Grid */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748b] block">
                Atur Jumlah Batalion Tempur per Divisi:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BATTALION_DATABASE.map(b => {
                  const currentCount = battalionCounts[b.id] || 0;
                  return (
                    <div
                      key={b.id}
                      className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                        currentCount > 0
                          ? 'border-[#38bdf8]/40 bg-[#0c1a27] text-[#f8fafc]'
                          : 'border-[#1e2938] bg-[#0c141d] text-[#94a3b8] hover:border-[#2a3c50]'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold text-xs text-[#f1f5f9] truncate">{b.name}</div>
                        <div className="font-mono text-[10px] text-[#64748b] flex items-center gap-2 mt-0.5">
                          <span>{b.baseSpeed} km/h</span>
                          <span>•</span>
                          <span className={b.fuelPerHour > 0 ? 'text-amber-400' : 'text-slate-500'}>
                            {b.fuelPerHour > 0 ? `${b.fuelPerHour}L/h` : '0L'}
                          </span>
                          <span>•</span>
                          <span className="text-emerald-400">{b.supplyWeight} suplai</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleUpdateBattalion(b.id, -1)}
                          disabled={currentCount <= 0}
                          className="flex h-6 w-6 items-center justify-center rounded border border-[#334155] bg-[#16222f] text-xs font-bold text-[#94a3b8] hover:border-[#ef4444] hover:text-[#ef4444] disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-mono text-xs font-bold text-[#38bdf8]">
                          {currentCount}
                        </span>
                        <button
                          onClick={() => handleUpdateBattalion(b.id, 1)}
                          className="flex h-6 w-6 items-center justify-center rounded border border-[#334155] bg-[#16222f] text-xs font-bold text-[#94a3b8] hover:border-[#10b981] hover:text-[#10b981]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Support Companies Selector */}
            <div className="space-y-2 pt-2 border-t border-[#1e2938]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748b]">
                  Kompi Bantuan / Support Companies (Maksimal 5):
                </span>
                <span className="font-mono text-xs text-[#38bdf8] font-bold">
                  {selectedSupports.length} / 5 Terpilih
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SUPPORT_COMPANIES_DATABASE.map(sup => {
                  const isSelected = selectedSupports.includes(sup.id);
                  return (
                    <button
                      key={sup.id}
                      onClick={() => handleToggleSupport(sup.id)}
                      className={`flex flex-col text-left p-2 rounded-lg border text-xs transition-all ${
                        isSelected
                          ? 'border-[#10b981] bg-[#0c2217] text-[#a7f3d0] font-semibold'
                          : 'border-[#1e2938] bg-[#0c141d] text-[#94a3b8] hover:border-[#334155]'
                      }`}
                    >
                      <span className="truncate">{sup.name}</span>
                      <span className="font-mono text-[10px] text-[#64748b] mt-0.5">
                        +{sup.supplyWeight} suplai {sup.fuelPerHour > 0.1 && `• +${sup.fuelPerHour}L/h`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2: Environment & Doctrine Speed Modifiers */}
          <div className="rounded-xl border border-[#223344] bg-[#111923] p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-[#f59e0b]" />
              <h3 className="text-sm font-bold text-[#f8fafc] uppercase tracking-wide">
                2. Medan Tempur, Cuaca, &amp; Jam Operasional
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Terrain Selector */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#94a3b8]">Tipe Medan (Terrain):</label>
                <select
                  value={terrain}
                  onChange={(e) => setTerrain(e.target.value as TerrainType)}
                  className="w-full rounded-lg border border-[#334155] bg-[#0c141d] px-3 py-2 text-xs font-semibold text-[#f8fafc] focus:border-[#f59e0b] focus:outline-none"
                >
                  <option value="plains">Dataran Terbuka / Plains (100% Speed)</option>
                  <option value="hills">Perbukitan / Hills (-15% Speed)</option>
                  <option value="mountains">Pegunungan / Mountains (-50% Speed)</option>
                  <option value="forest">Hutan / Forest (-20% Speed)</option>
                  <option value="jungle">Rimba Tropis / Jungle (-40% Speed)</option>
                  <option value="marsh">Rawa / Marsh (-55% Speed)</option>
                  <option value="urban">Perkotaan / Urban (-25% Speed)</option>
                  <option value="desert">Gurun Pasir / Desert (-5% Speed)</option>
                </select>
              </div>

              {/* Weather Selector */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#94a3b8]">Kondisi Cuaca (Weather):</label>
                <select
                  value={weather}
                  onChange={(e) => setWeather(e.target.value as WeatherType)}
                  className="w-full rounded-lg border border-[#334155] bg-[#0c141d] px-3 py-2 text-xs font-semibold text-[#f8fafc] focus:border-[#f59e0b] focus:outline-none"
                >
                  <option value="clear">Cerah / Clear (Normal 1.0x)</option>
                  <option value="rain">Hujan / Rain (-10% Speed, +10% Fuel)</option>
                  <option value="mud">Lumpur / Mud (Rasputitsa: -50% Speed, +65% Fuel)</option>
                  <option value="snow">Salju / Snow (-30% Speed, +25% Fuel)</option>
                  <option value="extreme_cold">Dingin Ekstrem / Extreme Cold (-40% Speed, +30% Fuel)</option>
                  <option value="sandstorm">Badai Pasir / Sandstorm (-45% Speed, +25% Fuel)</option>
                </select>
              </div>
            </div>

            {/* Operational Sliders */}
            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94a3b8]">Jam Gerak Jalan / Penetrasi Manuver per Hari:</span>
                  <span className="font-mono font-bold text-[#38bdf8]">{dailyMovementHours} Jam/Hari</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={dailyMovementHours}
                  onChange={(e) => setDailyMovementHours(parseInt(e.target.value))}
                  className="w-full accent-[#38bdf8]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94a3b8]">Jam Pertempuran Aktif (Combat Engagements) per Hari:</span>
                  <span className="font-mono font-bold text-[#ef4444]">{dailyCombatHours} Jam/Hari</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={dailyCombatHours}
                  onChange={(e) => setDailyCombatHours(parseInt(e.target.value))}
                  className="w-full accent-[#ef4444]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="font-mono text-xs text-[#94a3b8]">Tingkat Riset Kompi Logistik:</label>
                  <select
                    value={logisticsCompanyLevel}
                    onChange={(e) => setLogisticsCompanyLevel(parseInt(e.target.value))}
                    className="w-full rounded-lg border border-[#334155] bg-[#0c141d] px-3 py-1.5 text-xs text-[#f8fafc] focus:border-[#38bdf8] focus:outline-none"
                  >
                    <option value="1">Logistics I (-10% Suplai &amp; Bensin)</option>
                    <option value="2">Logistics II (-20% Suplai &amp; Bensin)</option>
                    <option value="3">Logistics III (-30% Suplai &amp; Bensin)</option>
                    <option value="4">Logistics IV (-40% Suplai &amp; Bensin)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs text-[#94a3b8]">Bonus Kecepatan Doktrin &amp; Desainer:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={doctrineSpeedBonus}
                      onChange={(e) => setDoctrineSpeedBonus(parseInt(e.target.value))}
                      className="w-full accent-[#10b981]"
                    />
                    <span className="font-mono text-xs font-bold text-[#10b981] w-12 text-right">
                      +{doctrineSpeedBonus}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Supply Hub Infrastructure & Throughput Diagnostics (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Section 3: Supply Hub & Railways Configuration */}
          <div className="rounded-xl border border-[#223344] bg-[#111923] p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Train className="h-5 w-5 text-[#10b981]" />
              <h3 className="text-sm font-bold text-[#f8fafc] uppercase tracking-wide">
                3. Jaringan Kereta Api &amp; Hub Suplai
              </h3>
            </div>

            {/* Railway Level */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94a3b8]">Level Jalur Rel dari Ibukota ke Hub:</span>
                <span className="font-mono font-bold text-[#10b981]">Level {railwayLevel} ({calculations.hubRailwayCap} Throughput)</span>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {[1, 2, 3, 4, 5].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setRailwayLevel(lvl as RailwayLevel)}
                    className={`rounded-lg py-1.5 font-mono text-xs font-bold border transition-all ${
                      railwayLevel === lvl
                        ? 'border-[#10b981] bg-[#132c22] text-[#a7f3d0]'
                        : 'border-[#1e2938] bg-[#0c141d] text-[#64748b] hover:text-[#cbd5e1]'
                    }`}
                  >
                    L{lvl}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-[#64748b] block mt-0.5">
                *Bottleneck hukum HOI4: Jalur rel dibatasi oleh segmen rel terendah antara Ibukota dan Hub suplai ini.
              </span>
            </div>

            {/* Hub Motorization Mode */}
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#94a3b8]">Level Motorisasi Pasokan Hub:</label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setMotorizationLevel('horse')}
                  className={`flex flex-col items-center p-2 rounded-lg border text-center transition-all ${
                    motorizationLevel === 'horse'
                      ? 'border-[#f59e0b] bg-[#292212] text-[#fef3c7] font-bold'
                      : 'border-[#1e2938] bg-[#0c141d] text-[#94a3b8]'
                  }`}
                >
                  <span className="text-xs">Kavaleri / Kuda</span>
                  <span className="font-mono text-[10px] text-[#64748b]">Jangkau: 3 Prov</span>
                </button>

                <button
                  onClick={() => setMotorizationLevel('truck_1')}
                  className={`flex flex-col items-center p-2 rounded-lg border text-center transition-all ${
                    motorizationLevel === 'truck_1'
                      ? 'border-[#38bdf8] bg-[#0c2438] text-[#7dd3fc] font-bold'
                      : 'border-[#1e2938] bg-[#0c141d] text-[#94a3b8]'
                  }`}
                >
                  <span className="text-xs">Motorized 1x</span>
                  <span className="font-mono text-[10px] text-[#64748b]">Jangkau: 5 Prov</span>
                </button>

                <button
                  onClick={() => setMotorizationLevel('truck_2')}
                  className={`flex flex-col items-center p-2 rounded-lg border text-center transition-all ${
                    motorizationLevel === 'truck_2'
                      ? 'border-[#10b981] bg-[#122820] text-[#a7f3d0] font-bold'
                      : 'border-[#1e2938] bg-[#0c141d] text-[#94a3b8]'
                  }`}
                >
                  <span className="text-xs">Motorized 2x</span>
                  <span className="font-mono text-[10px] text-[#64748b]">Jangkau: 8 Prov</span>
                </button>
              </div>
            </div>

            {/* Distance from Hub Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94a3b8]">Jarak Pasukan dari Hub Suplai Terdekat:</span>
                <span className={`font-mono font-bold ${calculations.isOutOfHubRange ? 'text-[#ef4444]' : 'text-[#38bdf8]'}`}>
                  {distanceFromHub} Provinsi ({calculations.isOutOfHubRange ? 'Di Luar Radius!' : `Efisiensi ${(calculations.distanceEfficiency * 100).toFixed(0)}%`})
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={distanceFromHub}
                onChange={(e) => setDistanceFromHub(parseInt(e.target.value))}
                className="w-full accent-[#38bdf8]"
              />
            </div>

            {/* Infrastructure & Air Supply */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#94a3b8]">
                  <span>Infrastruktur State:</span>
                  <span className="font-mono font-bold text-[#f8fafc]">Lvl {infrastructureLevel}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={infrastructureLevel}
                  onChange={(e) => setInfrastructureLevel(parseInt(e.target.value))}
                  className="w-full accent-[#10b981]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#94a3b8]">
                  <span>Pesawat Angkut Suplai:</span>
                  <span className="font-mono font-bold text-[#38bdf8]">{airSupplyPlanes} Pesawat</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="25"
                  value={airSupplyPlanes}
                  onChange={(e) => setAirSupplyPlanes(parseInt(e.target.value))}
                  className="w-full accent-[#38bdf8]"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Rolling Stock Requirements & Warnings */}
          <div className="rounded-xl border border-[#223344] bg-[#111923] p-5 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748b]">
              Kebutuhan Material Rolling Stock &amp; Armada Logistik:
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-[#1e2e3f] bg-[#0c141d]">
                <div className="flex items-center gap-1.5 text-xs text-[#94a3b8] mb-1">
                  <Train className="h-4 w-4 text-[#10b981]" />
                  <span>Kereta Api Logistik</span>
                </div>
                <div className="font-mono text-xl font-black text-[#f8fafc]">
                  {calculations.trainsRequired} <span className="text-xs text-[#64748b]">unit</span>
                </div>
                <span className="text-[10px] text-[#64748b] block mt-1">
                  ~{Math.round(calculations.trainsRequired * 70)} IC Industri
                </span>
              </div>

              <div className="p-3 rounded-lg border border-[#1e2e3f] bg-[#0c141d]">
                <div className="flex items-center gap-1.5 text-xs text-[#94a3b8] mb-1">
                  <Truck className="h-4 w-4 text-[#38bdf8]" />
                  <span>Truk Distribusi</span>
                </div>
                <div className="font-mono text-xl font-black text-[#f8fafc]">
                  {calculations.armyTrucksNeeded} <span className="text-xs text-[#64748b]">unit</span>
                </div>
                <span className="text-[10px] text-[#64748b] block mt-1">
                  ~{Math.round(calculations.armyTrucksNeeded * 2.5)} IC Industri
                </span>
              </div>
            </div>

            {/* Strategic Advice Banner based on calculations */}
            {calculations.supplyStatus === 'starvation' ? (
              <div className="rounded-lg border border-[#ef4444]/60 bg-[#2b0e12] p-3 text-xs text-[#fca5a5] space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-white">
                  <ShieldAlert className="h-4 w-4 text-[#ef4444]" />
                  BAHAYA KRISIS LOGISTIK AKUT:
                </div>
                <p>
                  Kebutuhan suplai ({calculations.totalArmySupplyDemand}) jauh melebihi kapasitas hub ({calculations.totalAvailableSupply}). Unit kehilangan organisasi hingga -50% dan peralatan hancur karena atrisi 35%/hari. Naikkan level rel atau kurangi divisi dari provinsi ini!
                </p>
              </div>
            ) : calculations.supplyStatus === 'overburdened' ? (
              <div className="rounded-lg border border-[#f97316]/60 bg-[#2a1408] p-3 text-xs text-[#fed7aa] space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-white">
                  <AlertTriangle className="h-4 w-4 text-[#f97316]" />
                  PERINGATAN DEFISIT SUPLAI:
                </div>
                <p>
                  Defisit {calculations.supplyDeficit} poin suplai menyebabkan penalti tempur dan perlambatan spearhead tank. Aktifkan motorisasi hub Level 2 atau pasang Kompi Logistik.
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-[#10b981]/40 bg-[#0d2217] p-3 text-xs text-[#a7f3d0] space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                  RANTAI PASOKAN OPTIMAL:
                </div>
                <p>
                  Hub memiliki cadangan kapasitas yang cukup untuk mendukung manuver ofensif intensitas tinggi tanpa penalti atrisi logistik.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* COMPREHENSIVE GUIDELINES & MECHANICS SECTION */}
      <div className="rounded-xl border border-[#223344] bg-[#111923] p-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#1e2a38]">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#f59e0b]" />
            <div>
              <h3 className="text-base font-black text-[#f8fafc]">
                Panduan &amp; Pedoman Mekanika Logistik HOI4 (Guidelines)
              </h3>
              <p className="text-xs text-[#94a3b8]">
                Aturan baku sistem suplai No Step Back, rasio bahan bakar, trik spearhead tank, dan konversi jalur rel.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveGuidelineTab('throughput')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
                activeGuidelineTab === 'throughput'
                  ? 'border-[#10b981] bg-[#132c22] text-[#a7f3d0]'
                  : 'border-[#1e2938] bg-[#0c141d] text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              Melacak Bottleneck Rel
            </button>
            <button
              onClick={() => setActiveGuidelineTab('fuel')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
                activeGuidelineTab === 'fuel'
                  ? 'border-[#f59e0b] bg-[#292212] text-[#fef3c7]'
                  : 'border-[#1e2938] bg-[#0c141d] text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              Konsumsi &amp; Cadangan BBM
            </button>
            <button
              onClick={() => setActiveGuidelineTab('mud')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
                activeGuidelineTab === 'mud'
                  ? 'border-[#38bdf8] bg-[#0c2438] text-[#7dd3fc]'
                  : 'border-[#1e2938] bg-[#0c141d] text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              Lumpur &amp; Musim Dingin
            </button>
            <button
              onClick={() => setActiveGuidelineTab('air')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
                activeGuidelineTab === 'air'
                  ? 'border-[#a855f7] bg-[#241334] text-[#e9d5ff]'
                  : 'border-[#1e2938] bg-[#0c141d] text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              Suplai Udara &amp; Kompi Logistik
            </button>
          </div>
        </div>

        {/* Tab 1: Throughput */}
        {activeGuidelineTab === 'throughput' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#cbd5e1] leading-relaxed">
            <div className="p-3.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] space-y-2">
              <span className="font-bold text-[#a7f3d0] block text-sm">
                1. Hukum Segmen Rel Terlemah (Bottleneck)
              </span>
              <p>
                Di HOI4, pasokan mengalir dari Ibukota ke Supply Hub melalui jalur rel. Jika Anda meng-upgrade Supply Hub ke rel Level 5, tetapi ada SATU petak rel Level 1 di tengah rute dari Ibukota, maka kapasitas seluruh jalur tersebut terkunci di <strong>15 throughput</strong>!
              </p>
              <p className="text-[#94a3b8]">
                <strong>Tips:</strong> Klik tombol "Upgrade Full Railway from Capital" untuk memutakhirkan seluruh rangkaian rel secara otomatis.
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] space-y-2">
              <span className="font-bold text-[#a7f3d0] block text-sm">
                2. Motorisasi Hub (Kuda vs Truk 1x/2x)
              </span>
              <p>
                Secara default, Supply Hub mendistribusikan pasokan menggunakan kereta kuda (radius 3 provinsi). Mengklik ikon truk pada Hub menaikkan jangkauan ke <strong>5 provinsi (1x Truk)</strong> atau <strong>8 provinsi (2x Truk)</strong>.
              </p>
              <p className="text-[#94a3b8]">
                Ini penting untuk menjaga spearhead lapis baja tetap terisi pasokan saat menembus jauh ke wilayah musuh sebelum hub baru direbut.
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] space-y-2">
              <span className="font-bold text-[#a7f3d0] block text-sm">
                3. Waktu Konversi Rel Pasca Direbut
              </span>
              <p>
                Saat Anda merebut rel kereta api dan supply hub milik Uni Soviet (yang memakai gauge rel lebar), rel tersebut membutuhkan waktu sekitar <strong>7 hingga 14 hari</strong> untuk dikonversi menjadi standar Eropa Barat.
              </p>
              <p className="text-[#94a3b8]">
                Selama jeda ini, pasukan di garis depan akan kehabisan suplai jika tidak didukung oleh pasokan udara atau cadangan bawaan.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Fuel */}
        {activeGuidelineTab === 'fuel' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#cbd5e1] leading-relaxed">
            <div className="p-3.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] space-y-2">
              <span className="font-bold text-[#fef3c7] block text-sm">
                1. Dinamika Konsumsi BBM (Bergerak vs Diam)
              </span>
              <p>
                Tank yang sedang diam di parit hanya mengonsumsi ~8-10% bahan bakar (pemanasan mesin &amp; siaga). Begitu diperintahkan menyerang atau bergerak, konsumsi melonjak <strong>10 hingga 15 kali lipat</strong>!
              </p>
              <p className="text-[#94a3b8]">
                Jangan pernah menempatkan 24 divisi tank dalam status latihan (exercise) bersamaan di masa damai jika cadangan minyak terbatas.
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] space-y-2">
              <span className="font-bold text-[#fef3c7] block text-sm">
                2. Kecepatan Divisi Mengatur Burn Rate
              </span>
              <p>
                Divisi tank cepat (12 km/jam) menempuh jarak tiga kali lipat lebih jauh setiap 24 jam dibanding tank berat lambat (4 km/jam). Hal ini meningkatkan konsumsi logistik dinamis di jalan raya.
              </p>
              <p className="text-[#94a3b8]">
                Jika tank bergerak terlalu cepat dan memutus jalur suplai sendiri, cadangan internal (48-72 jam) akan habis dan menjadikannya sasaran empuk.
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] space-y-2">
              <span className="font-bold text-[#fef3c7] block text-sm">
                3. Efek Mengerikan Habis Bensin (Out of Fuel)
              </span>
              <p>
                Ketika tangki bensin divisi mencapai 0%:
              </p>
              <ul className="list-disc list-inside space-y-1 text-rose-300">
                <li>Attack &amp; Defense anjlok sebesar -50%</li>
                <li>Kecepatan dibatasi menjadi 1.6 km/jam (jalan kaki)</li>
                <li>Breakthrough tank anjlok hingga -60%</li>
                <li>Armor tidak lagi memantulkan peluru musuh</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Mud */}
        {activeGuidelineTab === 'mud' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#cbd5e1] leading-relaxed">
            <div className="p-3.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] space-y-2">
              <span className="font-bold text-[#7dd3fc] block text-sm">
                1. Fenomena Rasputitsa (Musim Lumpur Rusia)
              </span>
              <p>
                Pada musim gugur (Oktober-November) dan musim semi (Maret-April) di Front Timur, salju yang mencair mengubah jalan tanah menjadi lumpur pekat.
              </p>
              <p className="text-[#94a3b8]">
                Di HOI4, lumpur memotong kecepatan gerakan sebesar <strong>-50%</strong> dan meningkatkan konsumsi bahan bakar serta atrisi hingga <strong>+65%</strong>! Hentikan ofensif besar saat musim lumpur tiba.
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] space-y-2">
              <span className="font-bold text-[#7dd3fc] block text-sm">
                2. Musim Dingin Ekstrem &amp; Pemeliharaan Mesin
              </span>
              <p>
                Suhu beku di bawah nol derajat menyebabkan oli mesin membeku dan peralatan besi retak. Pasang <strong>Kompi Pemeliharaan (Maintenance Company)</strong> untuk meningkatkan keandalan (reliability) tank di atas 90%.
              </p>
              <p className="text-[#94a3b8]">
                Keandalan &gt;90% meminimalkan kehilangan peralatan gratis akibat cuaca dingin tanpa bertempur.
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] space-y-2">
              <span className="font-bold text-[#7dd3fc] block text-sm">
                3. Medan Rawa &amp; Pegunungan untuk Tank
              </span>
              <p>
                Mengirim tank medium atau berat ke rawa (Pripet Marshes) atau pegunungan Alpen adalah bunuh diri logistik. Bobot tank menenggelamkan suplai dan memberikan penalti tempur hingga -60%. Gunakan infanteri gunung (Gebirgsjäger) untuk wilayah tersebut.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Air */}
        {activeGuidelineTab === 'air' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#cbd5e1] leading-relaxed">
            <div className="p-3.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] space-y-2">
              <span className="font-bold text-[#e9d5ff] block text-sm">
                1. Pesawat Angkut &amp; Air Resupply Drops
              </span>
              <p>
                Pesawat angkut (Transport Planes seperti C-47 Dakota atau Ju 52) dapat ditugaskan untuk misi <strong>Air Resupply</strong>. Setiap 50 pesawat memasok sekitar 2.5 throughput langsung dari udara ke kantong pengepungan (pocket).
              </p>
              <p className="text-[#94a3b8]">
                Kritikal untuk menjaga spearhead yang terputus di Stalingrad atau Bastogne tetap mampu menembak dan bertahan.
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] space-y-2">
              <span className="font-bold text-[#e9d5ff] block text-sm">
                2. Kekuatan Kompi Logistik (Logistics Company)
              </span>
              <p>
                Riset Kompi Logistik memberikan diskon penggunaan suplai dan bahan bakar sebesar <strong>10% per tingkat (hingga -40% di Level IV)</strong>.
              </p>
              <p className="text-[#94a3b8]">
                Pada divisi 30w tank atau artileri berat, ini menghemat puluhan ribu liter bahan bakar dan memungkinkan Anda mengerahkan 30% lebih banyak divisi di front yang sempit!
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-[#1e2a38] bg-[#0c141d] space-y-2">
              <span className="font-bold text-[#e9d5ff] block text-sm">
                3. Pengeboman Logistik Musuh (Logistics Strike)
              </span>
              <p>
                Pesawat CAS (Close Air Support) dan TAC Bomber musuh yang diberi perintah "Logistics Strike" akan menghancurkan kereta api dan jembatan rel Anda.
              </p>
              <p className="text-[#94a3b8]">
                Lindungi langit dengan pesawat tempur superioritas udara atau gunakan kereta api lapis baja (Armored Trains) untuk menolak serangan udara musuh.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
