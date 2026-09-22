import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Swords, Shield, Play, Pause, RotateCcw, AlertTriangle, CheckCircle2,
  TrendingUp, Award, Zap, HelpCircle, Activity, ChevronRight,
  Mountain, CloudRain, Flame, Plane, Target, Layers, Sliders,
  RefreshCw, Copy, Check, Info, ArrowRight, Skull, ShieldAlert,
  Percent, Clock, Compass, FileText, Scale
} from 'lucide-react';
import { DIVISION_PRESETS } from '../data/divisionData';
import { TacticalCombatMap } from './TacticalCombatMap';
import { DivisionCostTrackerSidebar } from './DivisionCostTrackerSidebar';

// Division combat statistics interface
export interface DivisionCombatStats {
  name: string;
  count: number;
  softAttack: number;
  hardAttack: number;
  breakthrough: number;
  organization: number;
  defense: number;
  armor: number;
  piercing: number;
  hardness: number; // 0 - 100%
  hp: number;
  combatWidth: number;
}

// Environmental modifiers
export interface CombatEnvironment {
  terrain: 'plains' | 'forest' | 'hills' | 'mountain' | 'urban' | 'marsh';
  riverCrossing: 'none' | 'small' | 'large';
  fortLevel: number; // 0 to 10
  defenderEntrenchment: number; // 0 to 25%
  airSuperiority: 'none' | 'friendly' | 'enemy';
  casGroundDamage: number; // 0 to 100 damage/hr
  attackerPlanningBonus: number; // 0 to 60%
}

// Preset dummy enemies
export interface DummyEnemyPreset {
  id: string;
  name: string;
  countryTag: string;
  year: number;
  description: string;
  stats: DivisionCombatStats;
}

export const DUMMY_ENEMY_PRESETS: DummyEnemyPreset[] = [
  {
    id: 'sov-rifle-1936',
    name: 'Uni Soviet 1936: Divisi Senapan Infanteri',
    countryTag: 'SOV',
    year: 1936,
    description: 'Divisi infanteri massal Soviet awal perang. Organisasi rendah akibat Purge, tanpa armor, namun manpower dan HP tebal.',
    stats: {
      name: 'Soviet Strelkovaya Diviziya (1936)',
      count: 2,
      softAttack: 95,
      hardAttack: 14,
      breakthrough: 28,
      organization: 38,
      defense: 230,
      armor: 0,
      piercing: 18,
      hardness: 0,
      hp: 190,
      combatWidth: 18
    }
  },
  {
    id: 'sov-shock-1941',
    name: 'Uni Soviet 1941: Divisi Kejut Pengawal (Guards)',
    countryTag: 'SOV',
    year: 1941,
    description: 'Divisi elit infanteri kejut dengan artileri medan berat, doktrin Deep Battle, dan organisasi tinggi.',
    stats: {
      name: 'Soviet Gvardiya Strelkovaya (1941)',
      count: 2,
      softAttack: 220,
      hardAttack: 48,
      breakthrough: 85,
      organization: 58,
      defense: 430,
      armor: 0,
      piercing: 40,
      hardness: 5,
      hp: 210,
      combatWidth: 27
    }
  },
  {
    id: 'ger-inf-1939',
    name: 'Jerman 1939: Divisi Infanteri Garis Depan (9/1 Meta)',
    countryTag: 'GER',
    year: 1939,
    description: 'Standar infanteri Wehrmacht invasi Polandia & Prancis. Seimbang antara pertahanan, artileri pendukung, dan organisasi stabil.',
    stats: {
      name: 'Wehrmacht Infanterie-Division (1939)',
      count: 2,
      softAttack: 160,
      hardAttack: 32,
      breakthrough: 45,
      organization: 56,
      defense: 370,
      armor: 0,
      piercing: 35,
      hardness: 0,
      hp: 175,
      combatWidth: 21
    }
  },
  {
    id: 'ger-panzer-1941',
    name: 'Jerman 1941: Divisi Panzer Korps (Medium Tank)',
    countryTag: 'GER',
    year: 1941,
    description: 'Divisi lapis baja spesialis terobosan Blitzkrieg. Memiliki armor tebal, hardness 60%, dan breakthrough sangat tinggi.',
    stats: {
      name: 'Panzer-Division (Panzer IV & Motorized)',
      count: 1,
      softAttack: 350,
      hardAttack: 165,
      breakthrough: 510,
      organization: 40,
      defense: 330,
      armor: 48,
      piercing: 52,
      hardness: 60,
      hp: 130,
      combatWidth: 30
    }
  },
  {
    id: 'fra-maginot-1939',
    name: 'Prancis 1939: Pasukan Benteng Maginot',
    countryTag: 'FRA',
    year: 1939,
    description: 'Garis pertahanan bunker terkuat di dunia. Pertahanan dan parit masif, namun hampir tidak memiliki kemampuan terobosan gerak.',
    stats: {
      name: 'Régiment d’Infanterie de Forteresse (Maginot)',
      count: 2,
      softAttack: 145,
      hardAttack: 42,
      breakthrough: 30,
      organization: 62,
      defense: 680,
      armor: 0,
      piercing: 45,
      hardness: 0,
      hp: 230,
      combatWidth: 20
    }
  },
  {
    id: 'uk-motorized-1940',
    name: 'Inggris 1940: Divisi Bermotor Ekspedisi (BEF)',
    countryTag: 'ENG',
    year: 1940,
    description: 'Divisi dengan mobilitas tinggi dan perlengkapan truk modern, memiliki ketahanan sedang dan piercing anti-tank standar.',
    stats: {
      name: 'British Motorized Expeditionary Division',
      count: 2,
      softAttack: 180,
      hardAttack: 58,
      breakthrough: 145,
      organization: 52,
      defense: 390,
      armor: 15,
      piercing: 38,
      hardness: 25,
      hp: 165,
      combatWidth: 24
    }
  },
  {
    id: 'usa-armor-1944',
    name: 'Amerika Serikat 1944: Armored Combat Command',
    countryTag: 'USA',
    year: 1944,
    description: 'Kekuatan penuh industri Amerika akhir perang. Didukung tank Medium Sherman 76mm, artileri self-propelled, dan suplai tanpa batas.',
    stats: {
      name: 'US Armored Division (Combat Command A)',
      count: 1,
      softAttack: 450,
      hardAttack: 290,
      breakthrough: 640,
      organization: 44,
      defense: 480,
      armor: 70,
      piercing: 78,
      hardness: 70,
      hp: 145,
      combatWidth: 35
    }
  },
  {
    id: 'jap-snlf-1937',
    name: 'Jepang 1937: Pasukan Pendarat Angkatan Laut (SNLF)',
    countryTag: 'JAP',
    year: 1937,
    description: 'Infanteri marinir kekaisaran dengan disiplin doktrin Grand Battleplan, organisasi sangat tinggi dan fanatik bertahan.',
    stats: {
      name: 'Special Naval Landing Forces (SNLF)',
      count: 2,
      softAttack: 165,
      hardAttack: 22,
      breakthrough: 65,
      organization: 66,
      defense: 350,
      armor: 0,
      piercing: 22,
      hardness: 0,
      hp: 195,
      combatWidth: 18
    }
  }
];

export const TERRAINS = [
  { id: 'plains', name: 'Dataran (Plains)', attackMod: 0, breakthroughMod: 0, icon: '🌿' },
  { id: 'forest', name: 'Hutan (Forest)', attackMod: -0.20, breakthroughMod: -0.20, icon: '🌲' },
  { id: 'hills', name: 'Perbukitan (Hills)', attackMod: -0.30, breakthroughMod: -0.25, icon: '⛰️' },
  { id: 'mountain', name: 'Pegunungan (Mountain)', attackMod: -0.60, breakthroughMod: -0.50, icon: '🏔️' },
  { id: 'urban', name: 'Perkotaan (Urban)', attackMod: -0.40, breakthroughMod: -0.50, icon: '🏙️' },
  { id: 'marsh', name: 'Rawa (Marsh)', attackMod: -0.50, breakthroughMod: -0.40, icon: '🌾' },
];

export const CombatCalculator: React.FC = () => {
  // Sidebar visibility for Manpower & Army XP template cost tracker
  const [showCostSidebar, setShowCostSidebar] = useState<boolean>(true);

  // Combat Stance: Player attacks Enemy (Attacker) or Player defends against Enemy (Defender)
  const [playerStance, setPlayerStance] = useState<'attacker' | 'defender'>('attacker');

  // Player Division Statistics Input
  const [playerStats, setPlayerStats] = useState<DivisionCombatStats>({
    name: 'Divisi Tempur Pemain',
    count: 2,
    softAttack: 280,
    hardAttack: 95,
    breakthrough: 340,
    organization: 52,
    defense: 410,
    armor: 35,
    piercing: 42,
    hardness: 30, // 30% hardness
    hp: 140,
    combatWidth: 21
  });

  // Selected Dummy Enemy Preset
  const [selectedEnemyPresetId, setSelectedEnemyPresetId] = useState<string>('sov-rifle-1936');

  // Dummy Enemy Division Statistics (customizable)
  const [enemyStats, setEnemyStats] = useState<DivisionCombatStats>(() => {
    return { ...DUMMY_ENEMY_PRESETS[0].stats };
  });

  // Edit custom enemy toggle
  const [isCustomEnemy, setIsCustomEnemy] = useState<boolean>(false);

  // Environment Settings
  const [env, setEnv] = useState<CombatEnvironment>({
    terrain: 'plains',
    riverCrossing: 'none',
    fortLevel: 0,
    defenderEntrenchment: 5,
    airSuperiority: 'none',
    casGroundDamage: 0,
    attackerPlanningBonus: 20
  });

  // Live simulation tick controls
  const [isSimulatingLive, setIsSimulatingLive] = useState<boolean>(false);
  const [liveHour, setLiveHour] = useState<number>(0);
  const [livePlayerOrg, setLivePlayerOrg] = useState<number>(52);
  const [liveEnemyOrg, setLiveEnemyOrg] = useState<number>(38);
  const [livePlayerHP, setLivePlayerHP] = useState<number>(140);
  const [liveEnemyHP, setLiveEnemyHP] = useState<number>(190);
  const [combatEventsLog, setCombatEventsLog] = useState<{ hour: number; text: string; type: 'hit' | 'armor' | 'morale' | 'critical' }[]>([]);

  // Simulation speed (ms per hour)
  const [simSpeed, setSimSpeed] = useState<number>(350);

  // Copy result state
  const [copiedReport, setCopiedReport] = useState<boolean>(false);

  // Load enemy preset
  const handleSelectEnemyPreset = (presetId: string) => {
    setSelectedEnemyPresetId(presetId);
    if (presetId === 'custom') {
      setIsCustomEnemy(true);
      return;
    }
    const preset = DUMMY_ENEMY_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setIsCustomEnemy(false);
      setEnemyStats({ ...preset.stats });
    }
  };

  // Load Player Template Preset from division presets
  const handleLoadPlayerPreset = (presetId: string) => {
    const div = DIVISION_PRESETS.find(d => d.id === presetId);
    if (!div) return;
    setPlayerStats(prev => ({
      ...prev,
      name: div.name,
      softAttack: div.stats.softAttack,
      hardAttack: div.stats.hardAttack,
      defense: div.stats.defense,
      breakthrough: div.stats.breakthrough,
      organization: div.stats.organization,
      armor: div.stats.armor,
      piercing: div.stats.piercing,
      combatWidth: div.combatWidth
    }));
  };

  // Full Mathematical HOI4 Simulation Engine
  const simulationResults = useMemo(() => {
    // 1. Identify Attacker and Defender
    const isPlayerAttacking = playerStance === 'attacker';
    const attacker = isPlayerAttacking ? playerStats : enemyStats;
    const defender = isPlayerAttacking ? enemyStats : playerStats;

    // 2. Modifiers
    const terrainObj = TERRAINS.find(t => t.id === env.terrain) || TERRAINS[0];
    let attackerTerrainMod = 1 + terrainObj.attackMod;
    let attackerBreakthroughMod = 1 + terrainObj.breakthroughMod;

    // River Crossing modifier
    if (env.riverCrossing === 'small') attackerTerrainMod *= 0.70;
    if (env.riverCrossing === 'large') attackerTerrainMod *= 0.40;

    // Fort modifier (each fort level reduces attack by 15%, max 90%)
    if (env.fortLevel > 0) {
      const fortPenalty = Math.min(0.90, env.fortLevel * 0.15);
      attackerTerrainMod *= (1 - fortPenalty);
      attackerBreakthroughMod *= (1 - fortPenalty);
    }

    // Planning bonus (attacker only)
    const planningMod = 1 + (env.attackerPlanningBonus / 100);
    attackerTerrainMod *= planningMod;

    // Air Superiority
    let attackerAirMod = 1;
    let defenderAirMod = 1;
    if (env.airSuperiority === 'friendly') {
      if (isPlayerAttacking) {
        attackerAirMod = 1.25;
        defenderAirMod = 0.85;
      } else {
        defenderAirMod = 1.25;
        attackerAirMod = 0.85;
      }
    } else if (env.airSuperiority === 'enemy') {
      if (isPlayerAttacking) {
        attackerAirMod = 0.75;
        defenderAirMod = 1.20;
      } else {
        defenderAirMod = 0.75;
        attackerAirMod = 1.20;
      }
    }

    // Entrenchment bonus (defender only: +2% defense per level)
    const entrenchmentMod = 1 + (env.defenderEntrenchment * 0.02);

    // 3. Effective Combat Values per side (scaled by division count)
    const attackerCount = Math.max(1, attacker.count);
    const defenderCount = Math.max(1, defender.count);

    // Target hardness splitting
    const defenderHardnessRatio = defender.hardness / 100;
    const attackerHardnessRatio = attacker.hardness / 100;

    const attackerTotalSoft = attacker.softAttack * attackerCount * attackerTerrainMod * attackerAirMod;
    const attackerTotalHard = attacker.hardAttack * attackerCount * attackerTerrainMod * attackerAirMod;
    const attackerEffectiveAttacks = (attackerTotalSoft * (1 - defenderHardnessRatio)) + (attackerTotalHard * defenderHardnessRatio);

    const defenderTotalSoft = defender.softAttack * defenderCount * defenderAirMod;
    const defenderTotalHard = defender.hardAttack * defenderCount * defenderAirMod;
    const defenderEffectiveAttacks = (defenderTotalSoft * (1 - attackerHardnessRatio)) + (defenderTotalHard * attackerHardnessRatio);

    const attackerEffectiveBreakthrough = attacker.breakthrough * attackerCount * attackerBreakthroughMod;
    const defenderEffectiveDefense = defender.defense * defenderCount * entrenchmentMod * defenderAirMod;

    // 4. Armor and Piercing Check
    // Attacker Armor vs Defender Piercing
    const attackerArmorAdvantage = attacker.armor > defender.piercing;
    // Defender Armor vs Attacker Piercing
    const defenderArmorAdvantage = defender.armor > attacker.piercing;

    // 5. HOI4 Critical Hit Formula
    // When attacking, attacker attacks compare against defender defense.
    // Attacks <= defense have 10% hit chance (0.10).
    // Attacks > defense have 40% hit chance (0.40).
    const attackerHitsUnderDef = Math.min(attackerEffectiveAttacks, defenderEffectiveDefense) * 0.10;
    const attackerHitsOverDef = Math.max(0, attackerEffectiveAttacks - defenderEffectiveDefense) * 0.40;
    let attackerTotalHitsPerHour = attackerHitsUnderDef + attackerHitsOverDef;

    // Defender attacks compare against attacker breakthrough.
    const defenderHitsUnderBkt = Math.min(defenderEffectiveAttacks, attackerEffectiveBreakthrough) * 0.10;
    const defenderHitsOverBkt = Math.max(0, defenderEffectiveAttacks - attackerEffectiveBreakthrough) * 0.40;
    let defenderTotalHitsPerHour = defenderHitsUnderBkt + defenderHitsOverBkt;

    // Apply Armor Advantage Modifiers:
    // If defender armor > attacker piercing: attacker hits deal 50% damage
    if (defenderArmorAdvantage) {
      attackerTotalHitsPerHour *= 0.50;
    }
    // If attacker armor > defender piercing: attacker takes 50% less org damage, and deals +50% org damage
    let attackerOrgDamageTakenMod = 1;
    let attackerOrgDamageDealtMod = 1;
    if (attackerArmorAdvantage) {
      attackerOrgDamageTakenMod = 0.50;
      attackerOrgDamageDealtMod = 1.50;
    }

    // CAS Damage (applied directly to defender org & HP if attacker has CAS)
    const casOrgDamagePerHour = env.casGroundDamage * 0.15;
    const casHPDamagePerHour = env.casGroundDamage * 0.08;

    // 6. Hour-by-Hour Simulation (up to 168 hours = 7 days)
    let currentAttackerOrg = attacker.organization;
    let currentDefenderOrg = defender.organization;
    let currentAttackerHP = attacker.hp * attackerCount;
    let currentDefenderHP = defender.hp * defenderCount;

    const timeline: {
      hour: number;
      attackerOrg: number;
      defenderOrg: number;
      attackerHP: number;
      defenderHP: number;
    }[] = [];

    let battleDuration = 0;
    let winner: 'attacker' | 'defender' | 'stalemate' = 'stalemate';

    const maxHours = 168;
    for (let hour = 1; hour <= maxHours; hour++) {
      // Average dice roll in HOI4 for org damage is ~2.5
      // Org damage = hits * 0.05 * diceRoll
      const hourlyAttackerDealtOrg = (attackerTotalHitsPerHour * 0.05 * 2.5 * attackerOrgDamageDealtMod) + casOrgDamagePerHour;
      const hourlyDefenderDealtOrg = defenderTotalHitsPerHour * 0.05 * 2.5 * attackerOrgDamageTakenMod;

      const hourlyAttackerDealtHP = (attackerTotalHitsPerHour * 0.03 * 1.5) + casHPDamagePerHour;
      const hourlyDefenderDealtHP = defenderTotalHitsPerHour * 0.03 * 1.5;

      currentDefenderOrg = Math.max(0, currentDefenderOrg - (hourlyAttackerDealtOrg / defenderCount));
      currentAttackerOrg = Math.max(0, currentAttackerOrg - (hourlyDefenderDealtOrg / attackerCount));

      currentDefenderHP = Math.max(0, currentDefenderHP - hourlyAttackerDealtHP);
      currentAttackerHP = Math.max(0, currentAttackerHP - hourlyDefenderDealtHP);

      if (hour % 2 === 0 || currentAttackerOrg === 0 || currentDefenderOrg === 0) {
        timeline.push({
          hour,
          attackerOrg: Math.round(currentAttackerOrg * 10) / 10,
          defenderOrg: Math.round(currentDefenderOrg * 10) / 10,
          attackerHP: Math.round(currentAttackerHP),
          defenderHP: Math.round(currentDefenderHP)
        });
      }

      if (currentDefenderOrg <= 0 && currentAttackerOrg > 0) {
        winner = 'attacker';
        battleDuration = hour;
        break;
      }
      if (currentAttackerOrg <= 0 && currentDefenderOrg > 0) {
        winner = 'defender';
        battleDuration = hour;
        break;
      }
      if (currentAttackerOrg <= 0 && currentDefenderOrg <= 0) {
        winner = 'stalemate';
        battleDuration = hour;
        break;
      }

      battleDuration = hour;
    }

    // Determine player outcome
    const playerWon = (isPlayerAttacking && winner === 'attacker') || (!isPlayerAttacking && winner === 'defender');
    const isStalemate = winner === 'stalemate' || (currentAttackerOrg > 0 && currentDefenderOrg > 0 && battleDuration >= maxHours);

    // Calculate win probability percent based on remaining org margin
    const playerFinalOrg = isPlayerAttacking ? currentAttackerOrg : currentDefenderOrg;
    const enemyFinalOrg = isPlayerAttacking ? currentDefenderOrg : currentAttackerOrg;
    const playerStartOrg = playerStats.organization;
    const enemyStartOrg = enemyStats.organization;

    let winRate = 50;
    if (playerWon) {
      const orgMargin = playerFinalOrg / playerStartOrg;
      winRate = Math.min(99, Math.round(65 + (orgMargin * 34)));
    } else if (isStalemate) {
      winRate = 50;
    } else {
      const enemyOrgMargin = enemyFinalOrg / enemyStartOrg;
      winRate = Math.max(1, Math.round(35 - (enemyOrgMargin * 34)));
    }

    // Casualties estimates
    const playerInitialHP = playerStats.hp * playerStats.count;
    const enemyInitialHP = enemyStats.hp * enemyStats.count;
    const playerLostHPPercent = Math.max(0, Math.min(100, ((playerInitialHP - (isPlayerAttacking ? currentAttackerHP : currentDefenderHP)) / playerInitialHP) * 100));
    const enemyLostHPPercent = Math.max(0, Math.min(100, ((enemyInitialHP - (isPlayerAttacking ? currentDefenderHP : currentAttackerHP)) / enemyInitialHP) * 100));

    const playerManpowerLosses = Math.round(playerLostHPPercent * playerStats.count * 120);
    const enemyManpowerLosses = Math.round(enemyLostHPPercent * enemyStats.count * 140);
    const playerICLosses = Math.round(playerLostHPPercent * playerStats.count * 18);
    const enemyICLosses = Math.round(enemyLostHPPercent * enemyStats.count * 16);

    // Tactical Verdict
    let verdictTitle = '';
    let verdictColor = '';
    let verdictSummary = '';

    if (playerWon) {
      if (playerFinalOrg >= playerStartOrg * 0.6) {
        verdictTitle = 'Kemenangan Telak (Decisive Breakthrough)';
        verdictColor = 'text-[#4ade80] border-[#16a34a] bg-[#14532d]/30';
        verdictSummary = `Divisi Anda menghancurkan musuh dalam tempo ${battleDuration} jam dengan kehilangan organisasi minimal. Serangan dan terobosan Anda melampaui kapasitas pertahanan lawan.`;
      } else {
        verdictTitle = 'Kemenangan Taktis Berdarah (Costly Win)';
        verdictColor = 'text-[#facc15] border-[#ca8a04] bg-[#713f12]/30';
        verdictSummary = `Musuh dipaksa mundur setelah ${battleDuration} jam, namun divisi Anda menderita deplesi organisasi signifikan. Disarankan jeda konsolidasi sebelum melanjutkan ofensif berikutnya.`;
      }
    } else if (isStalemate) {
      verdictTitle = 'Perang Parit Buntub (Stalemate / Attrition)';
      verdictColor = 'text-[#38bdf8] border-[#0284c7] bg-[#0c4a6e]/30';
      verdictSummary = `Pertempuran berlangsung lebih dari ${maxHours} jam tanpa ada pihak yang berhasil mematahkan lawan. Kedua belah pihak menguras amunisi dan bahan bakar.`;
    } else {
      verdictTitle = 'Kekalahan Telak (Offensive Repulsed)';
      verdictColor = 'text-[#f87171] border-[#dc2626] bg-[#7f1d1d]/30';
      verdictSummary = `Divisi Anda kehabisan organisasi dan dipaksa mundur. ${
        (!isPlayerAttacking ? attackerArmorAdvantage : defenderArmorAdvantage)
          ? 'Armor musuh tidak mampu ditembus oleh piercing senjata divisi Anda!'
          : 'Pertahanan dan serangan balik musuh jauh melampaui breakthrough divisi Anda.'
      }`;
    }

    return {
      winner,
      playerWon,
      isStalemate,
      winRate,
      battleDurationHours: battleDuration,
      battleDurationDays: (battleDuration / 24).toFixed(1),
      timeline,
      attackerEffectiveAttacks: Math.round(attackerEffectiveAttacks),
      defenderEffectiveDefense: Math.round(defenderEffectiveDefense),
      attackerEffectiveBreakthrough: Math.round(attackerEffectiveBreakthrough),
      defenderEffectiveAttacks: Math.round(defenderEffectiveAttacks),
      attackerArmorAdvantage,
      defenderArmorAdvantage,
      playerManpowerLosses,
      enemyManpowerLosses,
      playerICLosses,
      enemyICLosses,
      verdictTitle,
      verdictColor,
      verdictSummary,
      playerFinalOrg: Math.round(playerFinalOrg * 10) / 10,
      enemyFinalOrg: Math.round(enemyFinalOrg * 10) / 10
    };
  }, [playerStance, playerStats, enemyStats, env]);

  // Live simulation tick timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isSimulatingLive) {
      timer = setInterval(() => {
        setLiveHour(prev => {
          const next = prev + 1;
          const point = simulationResults.timeline.find(t => t.hour >= next) || simulationResults.timeline[simulationResults.timeline.length - 1];

          if (playerStance === 'attacker') {
            setLivePlayerOrg(point ? point.attackerOrg : 0);
            setLiveEnemyOrg(point ? point.defenderOrg : 0);
            setLivePlayerHP(point ? point.attackerHP : 0);
            setLiveEnemyHP(point ? point.defenderHP : 0);
          } else {
            setLivePlayerOrg(point ? point.defenderOrg : 0);
            setLiveEnemyOrg(point ? point.attackerOrg : 0);
            setLivePlayerHP(point ? point.defenderHP : 0);
            setLiveEnemyHP(point ? point.attackerHP : 0);
          }

          // Random combat events in feed
          if (next === 4) {
            setCombatEventsLog(l => [{ hour: next, text: 'Artileri pembuka mulai membombardir garis depan.', type: 'hit' }, ...l]);
          } else if (next === 12 && simulationResults.attackerArmorAdvantage) {
            setCombatEventsLog(l => [{ hour: next, text: 'Armor tank berhasil memantulkan proyektil musuh (Gold Shield Active)!', type: 'armor' }, ...l]);
          } else if (next === 24 && env.casGroundDamage > 0) {
            setCombatEventsLog(l => [{ hour: next, text: `Pesawat CAS menghujamkan bom ke konvoi logistik musuh (+${env.casGroundDamage} DMG).`, type: 'critical' }, ...l]);
          } else if (next === 36) {
            setCombatEventsLog(l => [{ hour: next, text: 'Garis pertahanan mulai retak, moral prajurit goyah.', type: 'morale' }, ...l]);
          }

          if (next >= simulationResults.battleDurationHours) {
            setIsSimulatingLive(false);
            setCombatEventsLog(l => [{
              hour: next,
              text: simulationResults.playerWon ? '★ Kemenangan tercapai! Musuh mundur dari ubin tempur.' : 'Divisi Anda terpaksa mundur ke posisi belakang.',
              type: 'critical'
            }, ...l]);
            return simulationResults.battleDurationHours;
          }
          return next;
        });
      }, simSpeed);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSimulatingLive, simSpeed, simulationResults, playerStance, env.casGroundDamage]);

  // Reset live sim
  const handleResetLiveSim = () => {
    setIsSimulatingLive(false);
    setLiveHour(0);
    setLivePlayerOrg(playerStats.organization);
    setLiveEnemyOrg(enemyStats.organization);
    setLivePlayerHP(playerStats.hp * playerStats.count);
    setLiveEnemyHP(enemyStats.hp * enemyStats.count);
    setCombatEventsLog([]);
  };

  // Copy combat report
  const handleCopyReport = () => {
    const text = `[LAPORAN KALKULATOR TEMPUR HOI4]
Divisi Pemain: ${playerStats.name} (${playerStance === 'attacker' ? 'Menyerang' : 'Bertahan'})
• Soft Attack: ${playerStats.softAttack} | Hard Attack: ${playerStats.hardAttack}
• Breakthrough: ${playerStats.breakthrough} | Pertahanan: ${playerStats.defense}
• Organisasi: ${playerStats.organization} | Armor: ${playerStats.armor} | Piercing: ${playerStats.piercing}
• Hardness: ${playerStats.hardness}% | HP: ${playerStats.hp}

Musuh Simulasi: ${enemyStats.name}
• Soft: ${enemyStats.softAttack} | Hard: ${enemyStats.hardAttack} | Org: ${enemyStats.organization}
• Def: ${enemyStats.defense} | Armor: ${enemyStats.armor} | Piercing: ${enemyStats.piercing}

HASIL ESTIMASI TEMPUR:
★ Peluang Kemenangan: ${simulationResults.winRate}%
★ Estimasi Durasi: ${simulationResults.battleDurationHours} Jam (~${simulationResults.battleDurationDays} Hari)
★ Status: ${simulationResults.verdictTitle}
★ Estimasi Korban Pemain: ~${simulationResults.playerManpowerLosses} Jiwa (${simulationResults.playerICLosses} IC)
★ Estimasi Korban Musuh: ~${simulationResults.enemyManpowerLosses} Jiwa (${simulationResults.enemyICLosses} IC)
${simulationResults.verdictSummary}`;

    navigator.clipboard.writeText(text);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Title & Introduction Banner */}
      <div className="rounded-xl border border-[#b8860b]/40 bg-gradient-to-r from-[#17221b] via-[#121c16] to-[#0c1410] p-4 sm:p-5 shadow-xl text-[#f1f5f9]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#b8860b]/20 border border-[#b8860b]/40 text-[#fde047] shadow-inner">
              <Swords className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#fef3c7] uppercase">
                  Kalkulator Tempur Divisi (Combat Simulator)
                </h2>
                <span className="rounded bg-[#ef4444]/20 border border-[#ef4444]/40 px-2 py-0.5 text-[11px] font-mono text-[#fca5a5] font-bold">
                  AKURASI FORMULA HOI4
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#cbd5e1] mt-0.5">
                Uji statistik divisimu (Soft Attack, Hard Attack, Breakthrough, Organisasi, Armor &amp; Piercing) melawan dummy divisi musuh dengan simulasi jam-demi-jam.
              </p>
            </div>
          </div>

          {/* Quick Action Tools */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyReport}
              className="flex items-center gap-1.5 rounded-lg border border-[#2b3a32] bg-[#141e17] px-3 py-2 text-xs font-mono text-[#cbd5e1] hover:text-[#f8fafc] hover:border-[#b8860b] transition-all"
            >
              {copiedReport ? <Check className="h-4 w-4 text-[#10b981]" /> : <Copy className="h-4 w-4 text-[#f59e0b]" />}
              <span>{copiedReport ? 'Tersalin!' : 'Salin Laporan'}</span>
            </button>

            {/* Combat Stance Switcher */}
            <div className="flex items-center bg-[#0d1510] p-1 rounded-lg border border-[#223028]">
              <button
                onClick={() => setPlayerStance('attacker')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
                  playerStance === 'attacker'
                    ? 'bg-[#ef4444] text-white shadow'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                <Swords className="h-3.5 w-3.5" />
                <span>Pemain Menyerang</span>
              </button>
              <button
                onClick={() => setPlayerStance('defender')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
                  playerStance === 'defender'
                    ? 'bg-[#3b82f6] text-white shadow'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Pemain Bertahan</span>
              </button>
            </div>

            {/* Toggle Cost Sidebar Button */}
            <button
              onClick={() => setShowCostSidebar(!showCostSidebar)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-mono transition-all ${
                showCostSidebar
                  ? 'border-amber-500/60 bg-amber-500/20 text-amber-300 font-bold shadow'
                  : 'border-[#2b3a32] bg-[#141e17] text-[#cbd5e1] hover:text-white'
              }`}
              title="Tampilkan Manpower & Army XP Biaya Template"
            >
              <Scale className="h-4 w-4 text-amber-400" />
              <span className="hidden sm:inline">{showCostSidebar ? 'Tutup Biaya Divisi' : 'Biaya Manpower & XP'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Responsive Layout with Cost Tracker Sidebar */}
      <div className={`grid grid-cols-1 ${showCostSidebar ? 'xl:grid-cols-12' : ''} gap-6 items-start`}>
        {/* ================= SIDEBAR: MANPOWER & ARMY XP COST TRACKER ================= */}
        {showCostSidebar && (
          <div className="xl:col-span-4 order-last xl:order-first">
            <div className="sticky top-4">
              <DivisionCostTrackerSidebar
                onLoadTemplate={(stats) => {
                  setPlayerStats(stats);
                }}
                activeCombatStats={playerStats}
              />
            </div>
          </div>
        )}

        {/* Main Combat Inputs and Simulation Engine */}
        <div className={showCostSidebar ? 'xl:col-span-8 space-y-6' : 'space-y-6'}>
          {/* Main 2-Column Dashboard: Inputs on Left & Dummy Enemy on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ================= COLUMN 1: PLAYER DIVISION INPUTS ================= */}
        <div className="rounded-xl border border-[#2b3a32] bg-[#101712] p-4 sm:p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-[#223028] pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10b981]/20 border border-[#10b981]/40 text-[#34d399] font-mono text-xs font-bold">
                1
              </div>
              <h3 className="font-serif text-base font-bold text-[#fef3c7]">
                Statistik Divisi Anda ({playerStance === 'attacker' ? 'Ofensif' : 'Defensif'})
              </h3>
            </div>

            {/* Quick Player Preset Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-[#94a3b8]">Preset:</span>
              <select
                onChange={(e) => handleLoadPlayerPreset(e.target.value)}
                defaultValue=""
                className="rounded border border-[#223028] bg-[#0c1410] px-2 py-1 text-xs text-[#cbd5e1] outline-none focus:border-[#b8860b]"
              >
                <option value="" disabled>Pilih Preset Divisi...</option>
                {DIVISION_PRESETS.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.combatWidth}W)</option>
                ))}
              </select>
            </div>
          </div>

          {/* Division Name and Count */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-[11px] font-mono text-[#94a3b8] mb-1">Nama Divisi</label>
              <input
                type="text"
                value={playerStats.name}
                onChange={(e) => setPlayerStats({ ...playerStats, name: e.target.value })}
                className="w-full rounded-md border border-[#223028] bg-[#0c1410] px-3 py-1.5 text-xs text-white outline-none focus:border-[#b8860b]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-[#94a3b8] mb-1">Jumlah Divisi</label>
              <input
                type="number"
                min="1"
                max="8"
                value={playerStats.count}
                onChange={(e) => setPlayerStats({ ...playerStats, count: Math.max(1, parseInt(e.target.value) || 1) })}
                className="w-full rounded-md border border-[#223028] bg-[#0c1410] px-3 py-1.5 text-xs text-[#fde047] font-bold font-mono outline-none focus:border-[#b8860b]"
              />
            </div>
          </div>

          {/* Core Attack & Defense Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {/* 1. SOFT ATTACK */}
            <div className="rounded-lg border border-[#2b3a32] bg-[#0d1410] p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#cbd5e1] flex items-center gap-1">
                  💥 <strong>Soft Attack</strong>
                </span>
                <span className="font-mono font-bold text-[#fde047] text-sm">{playerStats.softAttack}</span>
              </div>
              <input
                type="range"
                min="0"
                max="800"
                step="5"
                value={playerStats.softAttack}
                onChange={(e) => setPlayerStats({ ...playerStats, softAttack: parseInt(e.target.value) })}
                className="w-full accent-[#f59e0b] cursor-pointer"
              />
              <div className="flex items-center justify-between text-[10px] text-[#94a3b8]">
                <span>Efektif vs Infanteri</span>
                <div className="flex gap-1">
                  <button onClick={() => setPlayerStats(p => ({ ...p, softAttack: Math.max(0, p.softAttack - 20) }))} className="px-1.5 py-0.2 rounded bg-[#1f2c23] hover:text-white">-20</button>
                  <button onClick={() => setPlayerStats(p => ({ ...p, softAttack: p.softAttack + 20 }))} className="px-1.5 py-0.2 rounded bg-[#1f2c23] hover:text-white">+20</button>
                </div>
              </div>
            </div>

            {/* 2. HARD ATTACK */}
            <div className="rounded-lg border border-[#2b3a32] bg-[#0d1410] p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#cbd5e1] flex items-center gap-1">
                  🎯 <strong>Hard Attack</strong>
                </span>
                <span className="font-mono font-bold text-[#f87171] text-sm">{playerStats.hardAttack}</span>
              </div>
              <input
                type="range"
                min="0"
                max="600"
                step="5"
                value={playerStats.hardAttack}
                onChange={(e) => setPlayerStats({ ...playerStats, hardAttack: parseInt(e.target.value) })}
                className="w-full accent-[#ef4444] cursor-pointer"
              />
              <div className="flex items-center justify-between text-[10px] text-[#94a3b8]">
                <span>Efektif vs Tank / Armor</span>
                <div className="flex gap-1">
                  <button onClick={() => setPlayerStats(p => ({ ...p, hardAttack: Math.max(0, p.hardAttack - 15) }))} className="px-1.5 py-0.2 rounded bg-[#1f2c23] hover:text-white">-15</button>
                  <button onClick={() => setPlayerStats(p => ({ ...p, hardAttack: p.hardAttack + 15 }))} className="px-1.5 py-0.2 rounded bg-[#1f2c23] hover:text-white">+15</button>
                </div>
              </div>
            </div>

            {/* 3. BREAKTHROUGH */}
            <div className="rounded-lg border border-[#2b3a32] bg-[#0d1410] p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#cbd5e1] flex items-center gap-1">
                  ⚡ <strong>Breakthrough</strong>
                </span>
                <span className="font-mono font-bold text-[#38bdf8] text-sm">{playerStats.breakthrough}</span>
              </div>
              <input
                type="range"
                min="0"
                max="900"
                step="10"
                value={playerStats.breakthrough}
                onChange={(e) => setPlayerStats({ ...playerStats, breakthrough: parseInt(e.target.value) })}
                className="w-full accent-[#38bdf8] cursor-pointer"
              />
              <div className="flex items-center justify-between text-[10px] text-[#94a3b8]">
                <span>Mencegah 4x Critical Saat Serbu</span>
                <div className="flex gap-1">
                  <button onClick={() => setPlayerStats(p => ({ ...p, breakthrough: Math.max(0, p.breakthrough - 25) }))} className="px-1.5 py-0.2 rounded bg-[#1f2c23] hover:text-white">-25</button>
                  <button onClick={() => setPlayerStats(p => ({ ...p, breakthrough: p.breakthrough + 25 }))} className="px-1.5 py-0.2 rounded bg-[#1f2c23] hover:text-white">+25</button>
                </div>
              </div>
            </div>

            {/* 4. ORGANIZATION */}
            <div className="rounded-lg border border-[#2b3a32] bg-[#0d1410] p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#cbd5e1] flex items-center gap-1">
                  🛡️ <strong>Organization (Org)</strong>
                </span>
                <span className="font-mono font-bold text-[#4ade80] text-sm">{playerStats.organization}</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="1"
                value={playerStats.organization}
                onChange={(e) => setPlayerStats({ ...playerStats, organization: parseInt(e.target.value) })}
                className="w-full accent-[#22c55e] cursor-pointer"
              />
              <div className="flex items-center justify-between text-[10px] text-[#94a3b8]">
                <span>Stamina Bertempur</span>
                <div className="flex gap-1">
                  <button onClick={() => setPlayerStats(p => ({ ...p, organization: Math.max(10, p.organization - 5) }))} className="px-1.5 py-0.2 rounded bg-[#1f2c23] hover:text-white">-5</button>
                  <button onClick={() => setPlayerStats(p => ({ ...p, organization: Math.min(90, p.organization + 5) }))} className="px-1.5 py-0.2 rounded bg-[#1f2c23] hover:text-white">+5</button>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Stats: Defense, Armor, Piercing, Hardness, HP */}
          <div className="border-t border-[#223028] pt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
            {/* Defense */}
            <div className="p-2 rounded bg-[#0d1410] border border-[#223028]">
              <span className="text-[10px] text-[#94a3b8] block">Pertahanan (Def)</span>
              <input
                type="number"
                value={playerStats.defense}
                onChange={(e) => setPlayerStats({ ...playerStats, defense: parseInt(e.target.value) || 0 })}
                className="w-full bg-transparent font-bold text-[#fef08a] outline-none text-sm"
              />
            </div>
            {/* Armor */}
            <div className="p-2 rounded bg-[#0d1410] border border-[#223028]">
              <span className="text-[10px] text-[#94a3b8] block">Armor Level</span>
              <input
                type="number"
                value={playerStats.armor}
                onChange={(e) => setPlayerStats({ ...playerStats, armor: parseInt(e.target.value) || 0 })}
                className="w-full bg-transparent font-bold text-[#e879f9] outline-none text-sm"
              />
            </div>
            {/* Piercing */}
            <div className="p-2 rounded bg-[#0d1410] border border-[#223028]">
              <span className="text-[10px] text-[#94a3b8] block">Piercing Senjata</span>
              <input
                type="number"
                value={playerStats.piercing}
                onChange={(e) => setPlayerStats({ ...playerStats, piercing: parseInt(e.target.value) || 0 })}
                className="w-full bg-transparent font-bold text-[#67e8f9] outline-none text-sm"
              />
            </div>
            {/* Hardness % */}
            <div className="p-2 rounded bg-[#0d1410] border border-[#223028]">
              <span className="text-[10px] text-[#94a3b8] block">Hardness (%)</span>
              <input
                type="number"
                min="0"
                max="100"
                value={playerStats.hardness}
                onChange={(e) => setPlayerStats({ ...playerStats, hardness: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
                className="w-full bg-transparent font-bold text-[#fbbf24] outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* ================= COLUMN 2: DUMMY ENEMY SELECTION & STATS ================= */}
        <div className="rounded-xl border border-[#2b3a32] bg-[#101712] p-4 sm:p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-[#223028] pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ef4444]/20 border border-[#ef4444]/40 text-[#f87171] font-mono text-xs font-bold">
                2
              </div>
              <h3 className="font-serif text-base font-bold text-[#fef3c7]">
                Statistik Musuh Dummy ({playerStance === 'attacker' ? 'Bertahan' : 'Menyerang'})
              </h3>
            </div>

            <button
              onClick={() => setIsCustomEnemy(!isCustomEnemy)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all border ${
                isCustomEnemy
                  ? 'border-[#f59e0b] bg-[#342713] text-[#fef08a] font-bold'
                  : 'border-[#223028] bg-[#0c1410] text-[#94a3b8] hover:text-white'
              }`}
            >
              {isCustomEnemy ? 'Mode Edit Kustom Aktif' : 'Kustomisasi Musuh'}
            </button>
          </div>

          {/* Dummy Preset Selector Dropdown */}
          <div>
            <label className="block text-[11px] font-mono text-[#94a3b8] mb-1.5">
              Pilih Dummy Lawan Perang Dunia II
            </label>
            <select
              value={selectedEnemyPresetId}
              onChange={(e) => handleSelectEnemyPreset(e.target.value)}
              className="w-full rounded-md border border-[#223028] bg-[#0c1410] px-3 py-2 text-xs text-[#f1f5f9] outline-none focus:border-[#ef4444] font-medium"
            >
              {DUMMY_ENEMY_PRESETS.map(p => (
                <option key={p.id} value={p.id}>
                  [{p.countryTag} {p.year}] {p.name}
                </option>
              ))}
              <option value="custom">★ Kustom Input Sendiri (Bebas Atur)</option>
            </select>
          </div>

          {/* Enemy Description Card */}
          <div className="rounded-lg border border-[#223028] bg-[#0d1410] p-3 text-xs text-[#cbd5e1] leading-relaxed">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono font-bold text-[#fca5a5]">{enemyStats.name}</span>
              <span className="font-mono text-[11px] text-[#94a3b8]">{enemyStats.count} Divisi ({enemyStats.combatWidth}W)</span>
            </div>
            <p className="text-[11px] text-[#94a3b8]">
              {DUMMY_ENEMY_PRESETS.find(p => p.id === selectedEnemyPresetId)?.description || 'Kustomisasi atribut dummy lawan sesuka Anda.'}
            </p>
          </div>

          {/* Editable Enemy Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
            {/* Enemy Soft Attack */}
            <div className="p-2.5 rounded bg-[#0d1410] border border-[#223028]">
              <span className="text-[10px] text-[#94a3b8] block">Soft Attack</span>
              <input
                type="number"
                disabled={!isCustomEnemy}
                value={enemyStats.softAttack}
                onChange={(e) => setEnemyStats({ ...enemyStats, softAttack: parseInt(e.target.value) || 0 })}
                className={`w-full bg-transparent font-bold text-[#fde047] outline-none text-sm ${!isCustomEnemy ? 'cursor-not-allowed opacity-80' : ''}`}
              />
            </div>
            {/* Enemy Hard Attack */}
            <div className="p-2.5 rounded bg-[#0d1410] border border-[#223028]">
              <span className="text-[10px] text-[#94a3b8] block">Hard Attack</span>
              <input
                type="number"
                disabled={!isCustomEnemy}
                value={enemyStats.hardAttack}
                onChange={(e) => setEnemyStats({ ...enemyStats, hardAttack: parseInt(e.target.value) || 0 })}
                className={`w-full bg-transparent font-bold text-[#f87171] outline-none text-sm ${!isCustomEnemy ? 'cursor-not-allowed opacity-80' : ''}`}
              />
            </div>
            {/* Enemy Defense */}
            <div className="p-2.5 rounded bg-[#0d1410] border border-[#223028]">
              <span className="text-[10px] text-[#94a3b8] block">Pertahanan</span>
              <input
                type="number"
                disabled={!isCustomEnemy}
                value={enemyStats.defense}
                onChange={(e) => setEnemyStats({ ...enemyStats, defense: parseInt(e.target.value) || 0 })}
                className={`w-full bg-transparent font-bold text-[#38bdf8] outline-none text-sm ${!isCustomEnemy ? 'cursor-not-allowed opacity-80' : ''}`}
              />
            </div>
            {/* Enemy Organization */}
            <div className="p-2.5 rounded bg-[#0d1410] border border-[#223028]">
              <span className="text-[10px] text-[#94a3b8] block">Organisasi</span>
              <input
                type="number"
                disabled={!isCustomEnemy}
                value={enemyStats.organization}
                onChange={(e) => setEnemyStats({ ...enemyStats, organization: parseInt(e.target.value) || 0 })}
                className={`w-full bg-transparent font-bold text-[#4ade80] outline-none text-sm ${!isCustomEnemy ? 'cursor-not-allowed opacity-80' : ''}`}
              />
            </div>
            {/* Enemy Breakthrough */}
            <div className="p-2.5 rounded bg-[#0d1410] border border-[#223028]">
              <span className="text-[10px] text-[#94a3b8] block">Breakthrough</span>
              <input
                type="number"
                disabled={!isCustomEnemy}
                value={enemyStats.breakthrough}
                onChange={(e) => setEnemyStats({ ...enemyStats, breakthrough: parseInt(e.target.value) || 0 })}
                className={`w-full bg-transparent font-bold text-[#cbd5e1] outline-none text-sm ${!isCustomEnemy ? 'cursor-not-allowed opacity-80' : ''}`}
              />
            </div>
            {/* Enemy Armor */}
            <div className="p-2.5 rounded bg-[#0d1410] border border-[#223028]">
              <span className="text-[10px] text-[#94a3b8] block">Armor Musuh</span>
              <input
                type="number"
                disabled={!isCustomEnemy}
                value={enemyStats.armor}
                onChange={(e) => setEnemyStats({ ...enemyStats, armor: parseInt(e.target.value) || 0 })}
                className={`w-full bg-transparent font-bold text-[#e879f9] outline-none text-sm ${!isCustomEnemy ? 'cursor-not-allowed opacity-80' : ''}`}
              />
            </div>
            {/* Enemy Piercing */}
            <div className="p-2.5 rounded bg-[#0d1410] border border-[#223028]">
              <span className="text-[10px] text-[#94a3b8] block">Piercing Musuh</span>
              <input
                type="number"
                disabled={!isCustomEnemy}
                value={enemyStats.piercing}
                onChange={(e) => setEnemyStats({ ...enemyStats, piercing: parseInt(e.target.value) || 0 })}
                className={`w-full bg-transparent font-bold text-[#67e8f9] outline-none text-sm ${!isCustomEnemy ? 'cursor-not-allowed opacity-80' : ''}`}
              />
            </div>
            {/* Enemy Hardness */}
            <div className="p-2.5 rounded bg-[#0d1410] border border-[#223028]">
              <span className="text-[10px] text-[#94a3b8] block">Hardness (%)</span>
              <input
                type="number"
                disabled={!isCustomEnemy}
                value={enemyStats.hardness}
                onChange={(e) => setEnemyStats({ ...enemyStats, hardness: parseInt(e.target.value) || 0 })}
                className={`w-full bg-transparent font-bold text-[#fbbf24] outline-none text-sm ${!isCustomEnemy ? 'cursor-not-allowed opacity-80' : ''}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= COMBAT ENVIRONMENT & MODIFIERS ================= */}
      <div className="rounded-xl border border-[#2b3a32] bg-[#101712] p-4 sm:p-5 shadow-lg space-y-3.5">
        <div className="flex items-center justify-between border-b border-[#223028] pb-3">
          <div className="flex items-center gap-2">
            <Mountain className="h-5 w-5 text-[#f59e0b]" />
            <h3 className="font-serif text-base font-bold text-[#fef3c7]">
              Kondisi Medan Pertempuran &amp; Lingkungan Taktis
            </h3>
          </div>
          <span className="text-xs font-mono text-[#94a3b8]">Terrain, Fort &amp; Air Multipliers</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {/* Terrain Select */}
          {TERRAINS.map(t => (
            <button
              key={t.id}
              onClick={() => setEnv({ ...env, terrain: t.id as any })}
              className={`flex flex-col items-center p-2.5 rounded-lg border text-xs font-mono transition-all ${
                env.terrain === t.id
                  ? 'border-[#f59e0b] bg-[#312513] text-[#fef08a] font-bold shadow'
                  : 'border-[#223028] bg-[#0c1410] text-[#94a3b8] hover:text-white'
              }`}
            >
              <span className="text-lg mb-1">{t.icon}</span>
              <span className="truncate max-w-full">{t.name.split(' ')[0]}</span>
              <span className="text-[10px] opacity-75">{t.attackMod === 0 ? 'Normal' : `${t.attackMod * 100}%`}</span>
            </button>
          ))}
        </div>

        {/* Environmental Sliders: Fort, River, Air, CAS, Planning */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          {/* Level Benteng (Fort) */}
          <div className="p-3 rounded-lg bg-[#0d1410] border border-[#223028] space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#cbd5e1]">Level Benteng (Fort)</span>
              <span className="font-bold text-[#f87171]">{env.fortLevel} / 10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={env.fortLevel}
              onChange={(e) => setEnv({ ...env, fortLevel: parseInt(e.target.value) })}
              className="w-full accent-[#ef4444] cursor-pointer"
            />
            <span className="text-[10px] text-[#94a3b8] block">-{env.fortLevel * 15}% Serangan Penyerbu</span>
          </div>

          {/* Menyeberang Sungai */}
          <div className="p-3 rounded-lg bg-[#0d1410] border border-[#223028] space-y-1">
            <span className="text-xs font-mono text-[#cbd5e1] block">Penyeberangan Sungai</span>
            <select
              value={env.riverCrossing}
              onChange={(e) => setEnv({ ...env, riverCrossing: e.target.value as any })}
              className="w-full rounded bg-[#131d17] border border-[#223028] px-2 py-1 text-xs text-white outline-none"
            >
              <option value="none">Tidak Ada Sungai (0%)</option>
              <option value="small">Sungai Kecil (-30% Atk)</option>
              <option value="large">Sungai Besar (-60% Atk)</option>
            </select>
            <span className="text-[10px] text-[#94a3b8] block">Penalti jika menyerang lintas air</span>
          </div>

          {/* Keunggulan Udara */}
          <div className="p-3 rounded-lg bg-[#0d1410] border border-[#223028] space-y-1">
            <span className="text-xs font-mono text-[#cbd5e1] block">Keunggulan Udara (Air)</span>
            <select
              value={env.airSuperiority}
              onChange={(e) => setEnv({ ...env, airSuperiority: e.target.value as any })}
              className="w-full rounded bg-[#131d17] border border-[#223028] px-2 py-1 text-xs text-white outline-none"
            >
              <option value="none">Seimbang / Tidak Ada (0%)</option>
              <option value="friendly">Keunggulan Pihak Kawan (+25%)</option>
              <option value="enemy">Keunggulan Udara Musuh (-25%)</option>
            </select>
            <span className="text-[10px] text-[#94a3b8] block">Mempengaruhi hit rate darat</span>
          </div>

          {/* CAS Ground Support Damage */}
          <div className="p-3 rounded-lg bg-[#0d1410] border border-[#223028] space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#cbd5e1]">Serangan Udara (CAS)</span>
              <span className="font-bold text-[#f59e0b]">{env.casGroundDamage} DMG</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={env.casGroundDamage}
              onChange={(e) => setEnv({ ...env, casGroundDamage: parseInt(e.target.value) })}
              className="w-full accent-[#f59e0b] cursor-pointer"
            />
            <span className="text-[10px] text-[#94a3b8] block">Kerusakan org &amp; hp langsung</span>
          </div>
        </div>
      </div>

      {/* ================= RESULTS & ESTIMATION SHOWCASE ================= */}
      <div className="rounded-xl border border-[#b8860b]/50 bg-gradient-to-b from-[#141e17] via-[#101712] to-[#0a0f0c] p-5 shadow-2xl text-[#f1f5f9] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#223028] pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#fde047] font-bold">
              ★ HASIL KALKULASI &amp; ESTIMASI TEMPUR ★
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-white mt-0.5">
              {simulationResults.verdictTitle}
            </h3>
          </div>

          {/* Win Probability Metric Box */}
          <div className="flex items-center gap-3 bg-[#0d1410] px-4 py-2.5 rounded-xl border border-[#2b3a32]">
            <div className="text-right">
              <span className="text-[10px] font-mono text-[#94a3b8] block">Peluang Menang</span>
              <span className={`text-2xl font-black font-mono ${
                simulationResults.winRate >= 65 ? 'text-[#4ade80]' : simulationResults.winRate >= 45 ? 'text-[#facc15]' : 'text-[#f87171]'
              }`}>
                {simulationResults.winRate}%
              </span>
            </div>
            <div className="h-10 w-[1px] bg-[#223028]" />
            <div className="text-left">
              <span className="text-[10px] font-mono text-[#94a3b8] block">Estimasi Waktu</span>
              <span className="text-lg font-bold font-mono text-[#38bdf8]">
                {simulationResults.battleDurationHours} Jam <span className="text-xs font-normal text-[#94a3b8]">({simulationResults.battleDurationDays} Hari)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Verdict Explanation Box */}
        <div className={`p-4 rounded-xl border ${simulationResults.verdictColor}`}>
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed">
              <p className="font-bold mb-1">Analisis Taktis HOI4:</p>
              <p>{simulationResults.verdictSummary}</p>
            </div>
          </div>
        </div>

        {/* Key Metrics Comparison Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          {/* Armor Superiority */}
          <div className="p-3 rounded-lg bg-[#0d1410] border border-[#223028]">
            <span className="text-[10px] text-[#94a3b8] block">Status Armor (Gold Shield)</span>
            <div className="flex items-center gap-1.5 mt-1">
              {simulationResults.attackerArmorAdvantage ? (
                <span className="text-[#4ade80] font-bold flex items-center gap-1">
                  🛡️ Superioritas Armor Aktif
                </span>
              ) : simulationResults.defenderArmorAdvantage ? (
                <span className="text-[#f87171] font-bold flex items-center gap-1">
                  ⚠️ Armor Musuh Kebal
                </span>
              ) : (
                <span className="text-[#cbd5e1]">Tidak Ada Keuntungan Armor</span>
              )}
            </div>
            <span className="text-[10px] text-[#94a3b8] mt-1 block">
              Player Armor {playerStats.armor} vs Musuh Piercing {enemyStats.piercing}
            </span>
          </div>

          {/* Breakthrough vs Incoming Attacks */}
          <div className="p-3 rounded-lg bg-[#0d1410] border border-[#223028]">
            <span className="text-[10px] text-[#94a3b8] block">Efektivitas Serangan</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[#fde047] font-bold">
                {simulationResults.attackerEffectiveAttacks} Efektif
              </span>
            </div>
            <span className="text-[10px] text-[#94a3b8] mt-1 block">
              Vs Pertahanan {simulationResults.defenderEffectiveDefense}
            </span>
          </div>

          {/* Estimated Manpower Losses */}
          <div className="p-3 rounded-lg bg-[#0d1410] border border-[#223028]">
            <span className="text-[10px] text-[#94a3b8] block">Estimasi Korban Jiwa</span>
            <div className="flex items-center justify-between mt-1 text-xs">
              <span className="text-[#38bdf8]">Kawan: ~{simulationResults.playerManpowerLosses}</span>
              <span className="text-[#f87171]">Lawan: ~{simulationResults.enemyManpowerLosses}</span>
            </div>
            <span className="text-[10px] text-[#94a3b8] mt-1 block">
              Rasio Korban: {(simulationResults.enemyManpowerLosses / Math.max(1, simulationResults.playerManpowerLosses)).toFixed(1)} : 1
            </span>
          </div>

          {/* Remaining Org */}
          <div className="p-3 rounded-lg bg-[#0d1410] border border-[#223028]">
            <span className="text-[10px] text-[#94a3b8] block">Sisa Organisasi Akhir</span>
            <div className="flex items-center justify-between mt-1 text-xs">
              <span className="text-[#4ade80] font-bold">Pemain: {simulationResults.playerFinalOrg}</span>
              <span className="text-[#f87171] font-bold">Musuh: {simulationResults.enemyFinalOrg}</span>
            </div>
            <span className="text-[10px] text-[#94a3b8] mt-1 block">Batas mundur di Org 0</span>
          </div>
        </div>

        {/* ================= ANIMATED TACTICAL COMBAT MAP ================= */}
        <TacticalCombatMap
          playerStats={playerStats}
          enemyStats={enemyStats}
          playerStance={playerStance}
          env={env}
          liveHour={liveHour}
          maxHours={simulationResults.battleDurationHours}
          isSimulating={isSimulatingLive}
          winRate={simulationResults.winRate}
          playerWon={simulationResults.playerWon}
          livePlayerOrg={livePlayerOrg}
          liveEnemyOrg={liveEnemyOrg}
          livePlayerHP={livePlayerHP}
          liveEnemyHP={liveEnemyHP}
          onSelectTerrain={(t) => setEnv(prev => ({ ...prev, terrain: t }))}
          onToggleSim={() => setIsSimulatingLive(!isSimulatingLive)}
          onResetSim={handleResetLiveSim}
        />

        {/* ================= LIVE COMBAT SIMULATOR (TICK-BY-TICK ANIMATION) ================= */}
        <div className="rounded-xl border border-[#2b3a32] bg-[#0c130f] p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#1f2c23] pb-3">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#f59e0b] animate-pulse" />
              <div>
                <h4 className="font-serif text-sm sm:text-base font-bold text-[#fef3c7]">
                  Simulator Tempur Interaktif (Tick-by-Tick Animation)
                </h4>
                <p className="text-xs text-[#94a3b8]">
                  Tekan Putar untuk melihat penurunan Organisasi &amp; HP secara langsung jam demi jam.
                </p>
              </div>
            </div>

            {/* Play, Pause, Reset Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#141e17] px-2 py-1 rounded border border-[#223028] text-xs font-mono">
                <span className="text-[#94a3b8]">Kecepatan:</span>
                <select
                  value={simSpeed}
                  onChange={(e) => setSimSpeed(parseInt(e.target.value))}
                  className="bg-transparent text-white outline-none cursor-pointer"
                >
                  <option value={600} className="bg-[#141e17]">0.5x</option>
                  <option value={350} className="bg-[#141e17]">1x</option>
                  <option value={150} className="bg-[#141e17]">2x</option>
                  <option value={60} className="bg-[#141e17]">5x Cepat</option>
                </select>
              </div>

              <button
                onClick={() => setIsSimulatingLive(!isSimulatingLive)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shadow ${
                  isSimulatingLive
                    ? 'bg-[#eab308] text-[#0a0f0c]'
                    : 'bg-[#10b981] text-white hover:bg-[#059669]'
                }`}
              >
                {isSimulatingLive ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                <span>{isSimulatingLive ? 'Jeda' : 'Mulai Simulasi'}</span>
              </button>

              <button
                onClick={handleResetLiveSim}
                title="Reset Simulasi"
                className="p-1.5 rounded-lg border border-[#223028] bg-[#141e17] text-[#94a3b8] hover:text-white hover:border-[#b8860b]"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Current Hour Counter */}
          <div className="flex items-center justify-between text-xs font-mono text-[#cbd5e1] bg-[#121c16] px-3 py-2 rounded-lg border border-[#1f2c23]">
            <span>Status Pertempuran: Jam ke-<strong>{liveHour}</strong> / {simulationResults.battleDurationHours}</span>
            <span className="text-[#fde047]">
              {liveHour >= simulationResults.battleDurationHours ? 'Pertempuran Usai' : isSimulatingLive ? 'Pertempuran Sedang Berkecamuk...' : 'Siap Disimulasikan'}
            </span>
          </div>

          {/* Live Dynamic Org & HP Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Player Side Bar */}
            <div className="p-3.5 rounded-xl border border-[#1f2c23] bg-[#0e1611] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#4ade80] flex items-center gap-1.5">
                  <Shield className="h-4 w-4" /> {playerStats.name} (Kawan)
                </span>
                <span className="text-xs font-mono text-[#cbd5e1]">{playerStats.count} Divisi</span>
              </div>

              {/* Org Bar */}
              <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span className="text-[#94a3b8]">Organisasi:</span>
                  <span className="font-bold text-[#4ade80]">{livePlayerOrg.toFixed(1)} / {playerStats.organization}</span>
                </div>
                <div className="w-full h-3 bg-[#17221b] rounded-full overflow-hidden border border-[#223028]">
                  <div
                    className="h-full bg-gradient-to-r from-[#10b981] to-[#34d399] transition-all duration-200"
                    style={{ width: `${Math.max(0, Math.min(100, (livePlayerOrg / playerStats.organization) * 100))}%` }}
                  />
                </div>
              </div>

              {/* HP Bar */}
              <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span className="text-[#94a3b8]">Kekuatan Fisik (HP):</span>
                  <span className="font-bold text-[#38bdf8]">{Math.round(livePlayerHP)} / {playerStats.hp * playerStats.count}</span>
                </div>
                <div className="w-full h-2 bg-[#17221b] rounded-full overflow-hidden border border-[#223028]">
                  <div
                    className="h-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8] transition-all duration-200"
                    style={{ width: `${Math.max(0, Math.min(100, (livePlayerHP / (playerStats.hp * playerStats.count)) * 100))}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Enemy Side Bar */}
            <div className="p-3.5 rounded-xl border border-[#1f2c23] bg-[#0e1611] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#f87171] flex items-center gap-1.5">
                  <Skull className="h-4 w-4" /> {enemyStats.name} (Lawan)
                </span>
                <span className="text-xs font-mono text-[#cbd5e1]">{enemyStats.count} Divisi</span>
              </div>

              {/* Org Bar */}
              <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span className="text-[#94a3b8]">Organisasi:</span>
                  <span className="font-bold text-[#f87171]">{liveEnemyOrg.toFixed(1)} / {enemyStats.organization}</span>
                </div>
                <div className="w-full h-3 bg-[#17221b] rounded-full overflow-hidden border border-[#223028]">
                  <div
                    className="h-full bg-gradient-to-r from-[#dc2626] to-[#f87171] transition-all duration-200"
                    style={{ width: `${Math.max(0, Math.min(100, (liveEnemyOrg / enemyStats.organization) * 100))}%` }}
                  />
                </div>
              </div>

              {/* HP Bar */}
              <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span className="text-[#94a3b8]">Kekuatan Fisik (HP):</span>
                  <span className="font-bold text-[#f59e0b]">{Math.round(liveEnemyHP)} / {enemyStats.hp * enemyStats.count}</span>
                </div>
                <div className="w-full h-2 bg-[#17221b] rounded-full overflow-hidden border border-[#223028]">
                  <div
                    className="h-full bg-gradient-to-r from-[#d97706] to-[#fbbf24] transition-all duration-200"
                    style={{ width: `${Math.max(0, Math.min(100, (liveEnemyHP / (enemyStats.hp * enemyStats.count)) * 100))}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Combat Events Feed */}
          {combatEventsLog.length > 0 && (
            <div className="rounded-lg border border-[#1f2c23] bg-[#0a100c] p-3 max-h-36 overflow-y-auto space-y-1.5 scrollbar-thin">
              <span className="text-[10px] font-mono uppercase text-[#94a3b8] tracking-wider block mb-1">
                Catatan Pertempuran (Combat Ticker)
              </span>
              {combatEventsLog.map((ev, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[#fde047] font-bold shrink-0">Jam {ev.hour}:</span>
                  <span className={ev.type === 'armor' ? 'text-[#e879f9]' : ev.type === 'critical' ? 'text-[#38bdf8] font-bold' : 'text-[#cbd5e1]'}>
                    {ev.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  );
};
