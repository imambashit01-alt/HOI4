import React, { useState, useMemo } from 'react';
import {
  Swords, Shield, Clock, AlertTriangle, CheckCircle2,
  Flame, Fuel, Gauge, Skull, Award, Sparkles, ChevronRight,
  ShieldAlert, RefreshCw, Zap, Compass, CloudRain, Mountain,
  Layers, Info, ArrowDownRight, Droplets, Target
} from 'lucide-react';
import { TerrainType, WeatherType } from './LogisticsCalculator';

interface LogisticsCombatSimulatorProps {
  divisionCount: number;
  effectiveSpeed: number;
  dailyFuelPerDivision: number;
  totalArmyDailyFuel: number;
  totalArmySupplyDemand: number;
  totalAvailableSupply: number;
  supplyStatus: 'optimal' | 'strained' | 'overburdened' | 'starvation';
  terrain: TerrainType;
  weather: WeatherType;
  logisticsCompanyLevel: number;
  hasFlameTank: boolean;
  hasEngineer: boolean;
}

export type SupplyConnection = 'connected' | 'bottleneck' | 'encircled';
export type DefenderPreset = 'entrenched_infantry' | 'fortified_bunker' | 'armored_counter' | 'militia_screen';
export type RiverType = 'none' | 'small_river' | 'major_river';

interface CombatPhaseResult {
  phaseNumber: number;
  phaseName: string;
  hourRange: string;
  durationHours: number;
  // Supply & Fuel
  gracePeriodActive: boolean;
  graceHoursRemaining: number;
  fuelRemainingLiters: number;
  fuelRemainingPercent: number;
  isOutOfFuel: boolean;
  supplyPenaltyPercent: number;
  fuelPenaltyPercent: number;
  // Modifiers
  terrainModifierPercent: number;
  weatherModifierPercent: number;
  riverModifierPercent: number;
  netEfficiencyPercent: number;
  // Combat stats
  effectiveAttackerAttack: number;
  effectiveAttackerBreakthrough: number;
  attackerOrgRemaining: number;
  defenderOrgRemaining: number;
  attackerLossesEquipment: number;
  statusLabel: string;
  statusColor: 'emerald' | 'sky' | 'amber' | 'rose' | 'red';
  tacticalNote: string;
}

export const LogisticsCombatSimulator: React.FC<LogisticsCombatSimulatorProps> = ({
  divisionCount,
  effectiveSpeed,
  dailyFuelPerDivision,
  totalArmyDailyFuel,
  totalArmySupplyDemand,
  totalAvailableSupply,
  supplyStatus,
  terrain,
  weather,
  logisticsCompanyLevel,
  hasFlameTank,
  hasEngineer
}) => {
  // Simulator Controls
  const [supplyConnection, setSupplyConnection] = useState<SupplyConnection>('bottleneck');
  const [supplyGraceBaseHours, setSupplyGraceBaseHours] = useState<number>(72);
  const [fuelTankEnduranceHours, setFuelTankEnduranceHours] = useState<number>(72);
  const [defenderType, setDefenderType] = useState<DefenderPreset>('entrenched_infantry');
  const [riverCrossing, setRiverCrossing] = useState<RiverType>('none');
  const [fortLevel, setFortLevel] = useState<number>(0);
  const [activeCombatDuration, setActiveCombatDuration] = useState<number>(120); // 120 hours = 5 days

  // Compute effective supply grace period (expanded by Logistics Company)
  // Base 72h + (logisticsCompanyLevel * 12h)
  const totalSupplyGraceHours = useMemo(() => {
    return supplyGraceBaseHours + (logisticsCompanyLevel * 12);
  }, [supplyGraceBaseHours, logisticsCompanyLevel]);

  // Defender Specs
  const defenderSpec = useMemo(() => {
    switch (defenderType) {
      case 'fortified_bunker':
        return {
          name: 'Garis Bunker Terbentengi (Maginot / Stalin Line)',
          initialOrg: 75,
          defense: 450,
          softAttack: 120,
          hardness: 20,
          armor: 25,
          entrenchmentBonus: 40
        };
      case 'armored_counter':
        return {
          name: 'Kontra-Serangan Divisi Lapis Baja Musuh',
          initialOrg: 45,
          defense: 280,
          softAttack: 260,
          hardness: 65,
          armor: 60,
          entrenchmentBonus: 10
        };
      case 'militia_screen':
        return {
          name: 'Garis Tipis / Pasukan Milisi Lemah',
          initialOrg: 30,
          defense: 120,
          softAttack: 65,
          hardness: 0,
          armor: 0,
          entrenchmentBonus: 5
        };
      case 'entrenched_infantry':
      default:
        return {
          name: 'Divisi Infanteri Bertahan (18w + Artileri & Zeni)',
          initialOrg: 65,
          defense: 320,
          softAttack: 160,
          hardness: 10,
          armor: 5,
          entrenchmentBonus: 25
        };
    }
  }, [defenderType]);

  // Attacker Base Force stats (scaled by divisionCount)
  const attackerBase = useMemo(() => {
    // Estimasi rata-rata per divisi lapis baja / spearhead
    const perDivSoftAttack = 280;
    const perDivHardAttack = 140;
    const perDivBreakthrough = 340;
    const perDivOrg = 40;

    return {
      softAttack: perDivSoftAttack * divisionCount,
      hardAttack: perDivHardAttack * divisionCount,
      breakthrough: perDivBreakthrough * divisionCount,
      org: perDivOrg
    };
  }, [divisionCount]);

  // Multi-Phase Simulation Calculation
  const simulationResults = useMemo(() => {
    // Define 4 Phases
    const phasesConfig = [
      { num: 1, name: 'Fase 1: Kontak Pembukaan & Bombardemen Awal', hours: 24, startHour: 0, endHour: 24 },
      { num: 2, name: 'Fase 2: Penetrasi & Perang Gesekan Intensif', hours: 48, startHour: 24, endHour: 72 },
      { num: 3, name: 'Fase 3: Kedaluwarsa Masa Tenggang & Krisis Logistik', hours: 48, startHour: 72, endHour: 120 },
      { num: 4, name: 'Fase 4: Pengepungan Akhir & Kehancuran Operasi', hours: 48, startHour: 120, endHour: 168 }
    ];

    // Terrain modifier
    let terrainMod = 0;
    switch (terrain) {
      case 'mountains': terrainMod = -0.50; break;
      case 'marsh': terrainMod = -0.40; break;
      case 'urban': terrainMod = -0.35; break;
      case 'jungle': terrainMod = -0.35; break;
      case 'hills': terrainMod = -0.20; break;
      case 'forest': terrainMod = -0.20; break;
      case 'desert': terrainMod = -0.10; break;
      case 'plains': default: terrainMod = 0; break;
    }

    // Flame tank bonus on urban/marsh/fort
    if (hasFlameTank) {
      if (terrain === 'urban' || terrain === 'marsh') terrainMod += 0.15;
    }

    // Weather modifier
    let weatherMod = 0;
    let weatherAttritionMod = 1.0;
    switch (weather) {
      case 'mud':
        weatherMod = -0.35;
        weatherAttritionMod = 2.2;
        break;
      case 'extreme_cold':
        weatherMod = -0.25;
        weatherAttritionMod = 1.8;
        break;
      case 'sandstorm':
        weatherMod = -0.25;
        weatherAttritionMod = 1.4;
        break;
      case 'snow':
        weatherMod = -0.15;
        weatherAttritionMod = 1.4;
        break;
      case 'rain':
        weatherMod = -0.10;
        weatherAttritionMod = 1.1;
        break;
      case 'clear': default:
        weatherMod = 0;
        weatherAttritionMod = 1.0;
        break;
    }

    // River Crossing modifier
    let riverMod = 0;
    if (riverCrossing === 'small_river') {
      riverMod = hasEngineer ? -0.15 : -0.30;
    } else if (riverCrossing === 'major_river') {
      riverMod = hasEngineer ? -0.30 : -0.60;
    }

    // Fort penalty
    const fortMitigation = (hasEngineer ? 0.35 : 0) + (hasFlameTank ? 0.25 : 0);
    const effectiveFort = Math.max(0, fortLevel * (1 - fortMitigation));
    const fortMod = -(effectiveFort * 0.12);

    // Total Initial Fuel Tank Capacity in Liters (based on fuelTankEnduranceHours)
    const hourlyFuelBurn = dailyFuelPerDivision > 0 ? (totalArmyDailyFuel / 24) : 100;
    const initialFuelTankCapacity = hourlyFuelBurn * fuelTankEnduranceHours;

    let currentFuelLiters = initialFuelTankCapacity;
    let currentAttackerOrg = attackerBase.org;
    let currentDefenderOrg = defenderSpec.initialOrg;
    let accumulatedEquipmentLoss = 0;

    const phaseOutputs: CombatPhaseResult[] = [];

    phasesConfig.forEach((p) => {
      // Hours in this phase
      const duration = p.hours;
      const midpointHour = p.startHour + (duration / 2);

      // Check Supply Grace Period
      // If fully connected and supply is optimal, grace period is not depleting
      let graceActive = true;
      let graceHoursLeft = 0;
      let supplyPenalty = 0;

      if (supplyConnection === 'connected') {
        if (supplyStatus === 'optimal') {
          graceActive = true;
          graceHoursLeft = totalSupplyGraceHours;
          supplyPenalty = 0;
        } else if (supplyStatus === 'strained') {
          graceActive = true;
          graceHoursLeft = Math.max(0, totalSupplyGraceHours - (midpointHour * 0.25));
          supplyPenalty = 0.05;
        } else if (supplyStatus === 'overburdened') {
          graceHoursLeft = Math.max(0, totalSupplyGraceHours - midpointHour);
          graceActive = graceHoursLeft > 0;
          supplyPenalty = graceActive ? 0.08 : 0.25;
        } else { // starvation
          graceHoursLeft = Math.max(0, totalSupplyGraceHours - midpointHour);
          graceActive = graceHoursLeft > 0;
          supplyPenalty = graceActive ? 0.15 : 0.50;
        }
      } else if (supplyConnection === 'bottleneck') {
        // Hub bottlenecked: 50% deficit, grace period burns at 0.5x speed
        graceHoursLeft = Math.max(0, totalSupplyGraceHours - (midpointHour * 0.7));
        graceActive = graceHoursLeft > 0;
        supplyPenalty = graceActive ? 0.05 : 0.35;
      } else {
        // ENCIRCLED / CUT OFF: 0 supply, grace burns 1:1 hour by hour!
        graceHoursLeft = Math.max(0, totalSupplyGraceHours - midpointHour);
        graceActive = graceHoursLeft > 0;
        if (graceActive) {
          supplyPenalty = 0; // Protected by grace period!
        } else {
          // Escalating penalty: Day 4 (-33%), Day 5 (-50%), Day 6+ (-67%)
          const hoursPastGrace = midpointHour - totalSupplyGraceHours;
          supplyPenalty = Math.min(0.67, 0.25 + (hoursPastGrace / 120) * 0.42);
        }
      }

      // Fuel burn during this phase
      // Moving & fighting burns hourlyFuelBurn * 1.35
      const phaseFuelBurned = duration * hourlyFuelBurn * 1.25;
      if (supplyConnection === 'connected' && supplyStatus !== 'starvation') {
        // Fuel is continuously replenished from hub
        currentFuelLiters = Math.max(initialFuelTankCapacity * 0.7, currentFuelLiters);
      } else {
        // Encircled or bottlenecked: fuel drops
        currentFuelLiters = Math.max(0, currentFuelLiters - phaseFuelBurned);
      }

      const fuelRemainingPercent = Math.round((currentFuelLiters / initialFuelTankCapacity) * 100);
      const isOutOfFuel = currentFuelLiters <= 0;
      const fuelPenalty = isOutOfFuel ? 0.50 : 0; // -50% combat stats if 0 fuel!

      // Total Net Efficiency Modifier
      const baseModifiersSum = terrainMod + weatherMod + riverMod + fortMod;
      const netEfficiency = Math.max(0.10, (1 + baseModifiersSum) * (1 - supplyPenalty) * (1 - fuelPenalty));

      // Effective Attacks
      const effectiveAttackerAttack = Math.round(attackerBase.softAttack * netEfficiency);
      const effectiveAttackerBreakthrough = Math.round(
        attackerBase.breakthrough * netEfficiency * (isOutOfFuel ? 0.40 : 1.0)
      );

      // Org Loss calculations per hour
      // Defender org loss depends on attacker soft attack
      const hourlyDefenderOrgLoss = Math.max(0.2, (effectiveAttackerAttack / Math.max(100, defenderSpec.defense)) * 1.8);
      // Attacker org loss depends on defender attack vs breakthrough, worsened by out of supply & mud
      const hourlyAttackerOrgLoss = Math.max(
        0.15,
        ((defenderSpec.softAttack / Math.max(100, effectiveAttackerBreakthrough)) * 1.2) + (supplyPenalty * 0.8)
      );

      currentDefenderOrg = Math.max(0, currentDefenderOrg - (hourlyDefenderOrgLoss * duration));
      currentAttackerOrg = Math.max(0, currentAttackerOrg - (hourlyAttackerOrgLoss * duration));

      // Equipment breakdown attrition
      const phaseLossTanks = Math.round(
        (divisionCount * 3.5) * weatherAttritionMod * (graceActive ? 1.0 : 2.5) * (isOutOfFuel ? 1.8 : 1.0)
      );
      accumulatedEquipmentLoss += phaseLossTanks;

      // Status Label & Tactical assessment
      let statusLabel = 'Unggul & Menekan';
      let statusColor: 'emerald' | 'sky' | 'amber' | 'rose' | 'red' = 'emerald';
      let tacticalNote = 'Serangan berjalan lancar dengan logistik prima.';

      if (isOutOfFuel) {
        statusLabel = 'Lumpuh: Bahan Bakar 0 L';
        statusColor = 'red';
        tacticalNote = 'Bahan bakar habis! Tank kehilangan 60% breakthrough dan armor tidak berfungsi. Unit dipaksa jalan kaki 1.6 km/jam.';
      } else if (!graceActive && supplyPenalty >= 0.4) {
        statusLabel = 'Krisis Akut: Kelaparan Suplai';
        statusColor = 'rose';
        tacticalNote = 'Masa tenggang suplai habis! Pasukan mengalami penalti serangan hingga -50% dan pemulihan organisasi berhenti.';
      } else if (!graceActive) {
        statusLabel = 'Masa Tenggang Suplai Berakhir';
        statusColor = 'amber';
        tacticalNote = 'Pasukan mulai kehabisan amunisi internal. Penalti suplai mulai menggerogoti daya dobrak.';
      } else if (currentDefenderOrg <= 5) {
        statusLabel = 'Garis Musuh Jebol (Breakthrough)';
        statusColor = 'emerald';
        tacticalNote = 'Organisasi musuh hancur! Divisi musuh mundur dan garis pertahanan tertembus.';
      } else {
        statusLabel = 'Stabil dalam Masa Tenggang';
        statusColor = 'sky';
        tacticalNote = 'Pasukan terlindungi oleh pasokan ransum dan amunisi internal (Grace Period). Efektivitas tempur 100%.';
      }

      phaseOutputs.push({
        phaseNumber: p.num,
        phaseName: p.name,
        hourRange: `${p.startHour} - ${p.endHour} Jam (Hari ke-${Math.floor(p.startHour / 24) + 1} s/d ${Math.floor(p.endHour / 24)})`,
        durationHours: duration,
        gracePeriodActive: graceActive,
        graceHoursRemaining: Math.round(graceHoursLeft),
        fuelRemainingLiters: Math.round(currentFuelLiters),
        fuelRemainingPercent,
        isOutOfFuel,
        supplyPenaltyPercent: Math.round(supplyPenalty * 100),
        fuelPenaltyPercent: Math.round(fuelPenalty * 100),
        terrainModifierPercent: Math.round(terrainMod * 100),
        weatherModifierPercent: Math.round(weatherMod * 100),
        riverModifierPercent: Math.round(riverMod * 100),
        netEfficiencyPercent: Math.round(netEfficiency * 100),
        effectiveAttackerAttack,
        effectiveAttackerBreakthrough,
        attackerOrgRemaining: Math.round(currentAttackerOrg),
        defenderOrgRemaining: Math.round(currentDefenderOrg),
        attackerLossesEquipment: accumulatedEquipmentLoss,
        statusLabel,
        statusColor,
        tacticalNote
      });
    });

    return {
      phaseOutputs,
      finalOutcome: currentDefenderOrg <= 5 ? 'breakthrough_victory' : currentAttackerOrg <= 0 ? 'attacker_exhaustion' : 'ongoing_attrition',
      totalEquipmentLoss: accumulatedEquipmentLoss,
      terrainMod,
      weatherMod,
      riverMod,
      fortMod
    };
  }, [
    divisionCount,
    attackerBase,
    defenderSpec,
    terrain,
    weather,
    riverCrossing,
    fortLevel,
    hasFlameTank,
    hasEngineer,
    supplyConnection,
    totalSupplyGraceHours,
    fuelTankEnduranceHours,
    dailyFuelPerDivision,
    totalArmyDailyFuel,
    supplyStatus
  ]);

  return (
    <div className="rounded-xl border border-[#223344] bg-[#111923] p-5 shadow-xl shadow-black/40 space-y-6">
      {/* Simulator Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-[#1e2a38]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#f43f5e] to-[#be123c] text-white shadow-lg shadow-rose-950/50">
            <Swords className="h-6 w-6 text-rose-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black tracking-tight text-[#f8fafc]">
                Simulasi Tempur Multi-Fase &amp; Rantai Pasokan (Combat Simulation Engine)
              </h3>
              <span className="rounded-md bg-[#f43f5e]/20 border border-[#f43f5e]/40 px-2 py-0.5 font-mono text-[11px] font-bold text-[#fda4af]">
                Multi-Phase Dynamics
              </span>
            </div>
            <p className="text-xs text-[#94a3b8]">
              Simulasi bertahap (Jam 0 hingga 168+) yang memperhitungkan masa tenggang suplai (Supply Grace Period), penalti cuaca ekstrem, sungai, benteng, dan deplesi bahan bakar.
            </p>
          </div>
        </div>

        {/* Global Result Badge */}
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 ${
            simulationResults.finalOutcome === 'breakthrough_victory'
              ? 'border-[#10b981]/50 bg-[#0d2319] text-[#a7f3d0]'
              : simulationResults.finalOutcome === 'attacker_exhaustion'
              ? 'border-[#ef4444]/50 bg-[#290e12] text-[#fca5a5]'
              : 'border-[#f59e0b]/50 bg-[#261c0d] text-[#fde047]'
          }`}>
            {simulationResults.finalOutcome === 'breakthrough_victory' && <CheckCircle2 className="h-4 w-4 text-[#10b981]" />}
            {simulationResults.finalOutcome === 'attacker_exhaustion' && <Skull className="h-4 w-4 text-[#ef4444]" />}
            {simulationResults.finalOutcome === 'ongoing_attrition' && <Clock className="h-4 w-4 text-[#f59e0b]" />}
            <span>
              {simulationResults.finalOutcome === 'breakthrough_victory' && 'Proyeksi: Garis Musuh Jebol (Kemenangan Cepat)'}
              {simulationResults.finalOutcome === 'attacker_exhaustion' && 'Proyeksi: Serangan Gagal (Pasukan Kehabisan Org)'}
              {simulationResults.finalOutcome === 'ongoing_attrition' && 'Proyeksi: Perang Gesekan Berkepanjangan'}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Parameters Tuning */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl border border-[#1e2e3f] bg-[#0c141d]">
        {/* Param 1: Supply Connection Status */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#f1f5f9] flex items-center justify-between">
            <span>Status Koridor Suplai:</span>
            <span className="font-mono text-[10px] text-[#38bdf8]">
              {supplyConnection === 'connected' ? 'Terhubung Hub' :
               supplyConnection === 'bottleneck' ? 'Bottleneck (50%)' : 'Terkepung (0%)'}
            </span>
          </label>
          <select
            value={supplyConnection}
            onChange={(e) => setSupplyConnection(e.target.value as SupplyConnection)}
            className="w-full rounded-lg border border-[#223344] bg-[#111923] px-2.5 py-1.5 text-xs text-[#cbd5e1] focus:border-[#f43f5e] focus:outline-none"
          >
            <option value="connected">Normal: Terhubung Langsung ke Hub</option>
            <option value="bottleneck">Terganggu: Bottleneck Rel / Bom Udara</option>
            <option value="encircled">Terkepung Total (Pocket 0 Suplai)</option>
          </select>
          <p className="text-[10px] text-[#64748b]">
            {supplyConnection === 'encircled'
              ? 'Pasukan mengandalkan ransum bawaan (Grace Period 72-120 jam) sebelum runtuh.'
              : 'Pasokan mengalir berdasarkan kapasitas hub rel.'}
          </p>
        </div>

        {/* Param 2: Supply Grace Period Configuration */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-[#f1f5f9]">
            <span>Masa Tenggang Suplai:</span>
            <span className="font-mono text-[#10b981]">{totalSupplyGraceHours} Jam</span>
          </div>
          <select
            value={supplyGraceBaseHours}
            onChange={(e) => setSupplyGraceBaseHours(parseInt(e.target.value))}
            className="w-full rounded-lg border border-[#223344] bg-[#111923] px-2.5 py-1.5 text-xs text-[#cbd5e1] focus:border-[#10b981] focus:outline-none"
          >
            <option value={72}>72 Jam (Standar Dasar HOI4)</option>
            <option value={84}>84 Jam (Doktrin Komando Fleksibel)</option>
            <option value={96}>96 Jam (Pocket Defense / Jenderal Spesialis)</option>
          </select>
          <span className="text-[10px] text-[#64748b] block">
            Bonus Kompi Logistik Lvl {logisticsCompanyLevel}: +{logisticsCompanyLevel * 12} Jam Ekstra!
          </span>
        </div>

        {/* Param 3: Target Musuh (Defender Archetype) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#f1f5f9] flex items-center justify-between">
            <span>Musuh yang Dihadapi:</span>
            <span className="font-mono text-[10px] text-amber-400">Org {defenderSpec.initialOrg}</span>
          </label>
          <select
            value={defenderType}
            onChange={(e) => setDefenderType(e.target.value as DefenderPreset)}
            className="w-full rounded-lg border border-[#223344] bg-[#111923] px-2.5 py-1.5 text-xs text-[#cbd5e1] focus:border-[#f59e0b] focus:outline-none"
          >
            <option value="entrenched_infantry">Infanteri Bertahan (18w + Entrenchment)</option>
            <option value="fortified_bunker">Garis Bunker Terbentengi (Maginot / Stalin Line)</option>
            <option value="armored_counter">Divisi Lapis Baja Kontra-Serangan</option>
            <option value="militia_screen">Garis Tipis / Pasukan Milisi Lemah</option>
          </select>
          <p className="text-[10px] text-[#64748b]">
            Defense: {defenderSpec.defense} | Hardness: {defenderSpec.hardness}%
          </p>
        </div>

        {/* Param 4: Rintangan Sungai & Benteng */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#f1f5f9] flex items-center justify-between">
            <span>Rintangan Sungai (River):</span>
            <span className="font-mono text-[10px] text-sky-400">
              {riverCrossing === 'none' ? 'Tidak Ada' : riverCrossing === 'small_river' ? 'Sungai Biasa' : 'Sungai Lebar (Dnieper)'}
            </span>
          </label>
          <select
            value={riverCrossing}
            onChange={(e) => setRiverCrossing(e.target.value as RiverType)}
            className="w-full rounded-lg border border-[#223344] bg-[#111923] px-2.5 py-1.5 text-xs text-[#cbd5e1] focus:border-[#38bdf8] focus:outline-none"
          >
            <option value="none">Tanpa Penyeberangan Sungai</option>
            <option value="small_river">Sungai Biasa (-30% Attack / -15% dgn Zeni)</option>
            <option value="major_river">Sungai Lebar (-60% Attack / -30% dgn Zeni)</option>
          </select>
          <div className="flex items-center justify-between text-[10px] text-[#64748b]">
            <span>Level Benteng:</span>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 5, 8, 10].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setFortLevel(lvl)}
                  className={`px-1 rounded text-[9px] font-mono ${
                    fortLevel === lvl ? 'bg-amber-500 text-black font-bold' : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Phase Progression Timeline Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#f43f5e]" />
            <h4 className="text-sm font-bold text-[#f8fafc] uppercase tracking-wide">
              Progresi Tempur 4 Fase Berdasarkan Waktu:
            </h4>
          </div>
          <span className="text-xs text-[#94a3b8] font-mono">
            {divisionCount} Divisi Penyerang vs {defenderSpec.name.split(' ')[0]}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {simulationResults.phaseOutputs.map((phase) => {
            const isCritical = phase.statusColor === 'rose' || phase.statusColor === 'red';
            const isOptimal = phase.statusColor === 'emerald';

            return (
              <div
                key={phase.phaseNumber}
                className={`rounded-xl border p-4 flex flex-col justify-between transition-all ${
                  isCritical
                    ? 'border-[#ef4444]/60 bg-gradient-to-b from-[#240e13] to-[#12080a]'
                    : isOptimal
                    ? 'border-[#10b981]/50 bg-gradient-to-b from-[#0d2218] to-[#0a1610]'
                    : 'border-[#1e2e3f] bg-[#0c141d]'
                }`}
              >
                {/* Phase Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-black/40 px-2 py-0.5 font-mono text-[10px] font-bold text-[#cbd5e1] border border-white/10">
                      FASE {phase.phaseNumber}
                    </span>
                    <span className="font-mono text-[11px] text-[#94a3b8]">
                      {phase.hourRange.split(' ')[0]} Jam
                    </span>
                  </div>

                  <h5 className="font-bold text-xs text-[#f1f5f9] leading-snug line-clamp-2">
                    {phase.phaseName}
                  </h5>

                  {/* Status Tag */}
                  <div className={`rounded-md p-1.5 text-center text-[11px] font-bold font-mono ${
                    phase.statusColor === 'emerald' ? 'bg-[#10b981]/20 text-[#a7f3d0] border border-[#10b981]/40' :
                    phase.statusColor === 'sky' ? 'bg-[#38bdf8]/20 text-[#7dd3fc] border border-[#38bdf8]/40' :
                    phase.statusColor === 'amber' ? 'bg-[#f59e0b]/20 text-[#fef3c7] border border-[#f59e0b]/40' :
                    'bg-[#ef4444]/20 text-[#fca5a5] border border-[#ef4444]/40'
                  }`}>
                    {phase.statusLabel}
                  </div>

                  {/* Meter 1: Supply Grace Indicator */}
                  <div className="rounded-lg border border-white/5 bg-black/30 p-2 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#94a3b8] flex items-center gap-1">
                        <Clock className="h-3 w-3 text-sky-400" /> Grace Period:
                      </span>
                      <span className={`font-mono font-bold ${phase.gracePeriodActive ? 'text-[#a7f3d0]' : 'text-[#fca5a5]'}`}>
                        {phase.gracePeriodActive ? `${phase.graceHoursRemaining}h Tersisa` : 'KEDALUWARSA'}
                      </span>
                    </div>
                    {phase.supplyPenaltyPercent > 0 && (
                      <div className="flex items-center justify-between text-[10px] text-rose-300 font-mono">
                        <span>Penalti Suplai:</span>
                        <span>-{phase.supplyPenaltyPercent}%</span>
                      </div>
                    )}
                  </div>

                  {/* Meter 2: Fuel Reserves */}
                  <div className="rounded-lg border border-white/5 bg-black/30 p-2 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#94a3b8] flex items-center gap-1">
                        <Fuel className="h-3 w-3 text-amber-400" /> Cadangan BBM:
                      </span>
                      <span className={`font-mono font-bold ${phase.isOutOfFuel ? 'text-rose-400' : 'text-amber-300'}`}>
                        {phase.fuelRemainingPercent}% ({phase.fuelRemainingLiters.toLocaleString()} L)
                      </span>
                    </div>
                    {/* Fuel mini bar */}
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          phase.fuelRemainingPercent < 15 ? 'bg-rose-500' :
                          phase.fuelRemainingPercent < 40 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.max(2, phase.fuelRemainingPercent)}%` }}
                      />
                    </div>
                  </div>

                  {/* Combat Stats Grid */}
                  <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px] pt-1">
                    <div className="rounded bg-black/20 p-1.5 border border-white/5">
                      <span className="text-[10px] text-[#64748b] block">Serangan Bersih:</span>
                      <span className="font-bold text-amber-300">{phase.effectiveAttackerAttack}</span>
                      <span className="text-[9px] text-[#94a3b8] block">({phase.netEfficiencyPercent}%)</span>
                    </div>
                    <div className="rounded bg-black/20 p-1.5 border border-white/5">
                      <span className="text-[10px] text-[#64748b] block">Breakthrough:</span>
                      <span className="font-bold text-sky-300">{phase.effectiveAttackerBreakthrough}</span>
                    </div>
                    <div className="rounded bg-black/20 p-1.5 border border-white/5">
                      <span className="text-[10px] text-[#64748b] block">Org Penyerang:</span>
                      <span className={`font-bold ${phase.attackerOrgRemaining < 10 ? 'text-rose-400' : 'text-[#f1f5f9]'}`}>
                        {phase.attackerOrgRemaining}
                      </span>
                    </div>
                    <div className="rounded bg-black/20 p-1.5 border border-white/5">
                      <span className="text-[10px] text-[#64748b] block">Org Bertahan:</span>
                      <span className={`font-bold ${phase.defenderOrgRemaining < 10 ? 'text-emerald-400' : 'text-[#f1f5f9]'}`}>
                        {phase.defenderOrgRemaining}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tactical Note */}
                <div className="pt-2 mt-2 border-t border-white/10 text-[10px] text-[#cbd5e1] leading-relaxed">
                  <p>{phase.tacticalNote}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Environmental Modifiers Breakdown Footer */}
      <div className="rounded-xl border border-[#1e2e3f] bg-[#0c141d] p-4">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748b] mb-3 flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          Rincian Pengali Lingkungan (Terrain &amp; Weather Multipliers Active):
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-lg border border-[#1e2a38] bg-[#080d13]">
            <span className="text-[#94a3b8] block text-[11px]">Medan ({terrain}):</span>
            <span className={`font-mono font-bold text-sm ${simulationResults.terrainMod < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {simulationResults.terrainMod >= 0 ? '+' : ''}{Math.round(simulationResults.terrainMod * 100)}%
            </span>
            <span className="text-[10px] text-[#64748b] block mt-0.5">
              {hasFlameTank ? 'Flame Tank +15% aktif' : 'Penalti serangan baku'}
            </span>
          </div>

          <div className="p-2.5 rounded-lg border border-[#1e2a38] bg-[#080d13]">
            <span className="text-[#94a3b8] block text-[11px]">Cuaca ({weather}):</span>
            <span className={`font-mono font-bold text-sm ${simulationResults.weatherMod < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {simulationResults.weatherMod >= 0 ? '+' : ''}{Math.round(simulationResults.weatherMod * 100)}%
            </span>
            <span className="text-[10px] text-[#64748b] block mt-0.5">
              {weather === 'mud' ? 'Rasputitsa atrisi x2.2' : 'Efek debuff cuaca'}
            </span>
          </div>

          <div className="p-2.5 rounded-lg border border-[#1e2a38] bg-[#080d13]">
            <span className="text-[#94a3b8] block text-[11px]">Sungai ({riverCrossing}):</span>
            <span className={`font-mono font-bold text-sm ${simulationResults.riverMod < 0 ? 'text-rose-400' : 'text-[#cbd5e1]'}`}>
              {simulationResults.riverMod >= 0 ? '0%' : `${Math.round(simulationResults.riverMod * 100)}%`}
            </span>
            <span className="text-[10px] text-[#64748b] block mt-0.5">
              {hasEngineer ? 'Zeni mitigasi -50% penalti' : 'Tanpa zeni'}
            </span>
          </div>

          <div className="p-2.5 rounded-lg border border-[#1e2a38] bg-[#080d13]">
            <span className="text-[#94a3b8] block text-[11px]">Benteng (Lvl {fortLevel}):</span>
            <span className={`font-mono font-bold text-sm ${simulationResults.fortMod < 0 ? 'text-rose-400' : 'text-[#cbd5e1]'}`}>
              {simulationResults.fortMod >= 0 ? '0%' : `${Math.round(simulationResults.fortMod * 100)}%`}
            </span>
            <span className="text-[10px] text-[#64748b] block mt-0.5">
              Pengurangan daya tembus
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
