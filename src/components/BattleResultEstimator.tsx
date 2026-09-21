import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import {
  Swords, Shield, Play, RotateCcw, AlertTriangle, CheckCircle2,
  TrendingUp, Award, Zap, HelpCircle, Activity, ChevronRight,
  Mountain, CloudRain, Flame, Plane, Target, Layers
} from 'lucide-react';
import { DIVISION_PRESETS } from '../data/divisionData';

// Types for combat simulation
export interface BattleDivisionStats {
  name: string;
  count: number;
  softAttack: number;
  hardAttack: number;
  defense: number;
  breakthrough: number;
  organization: number;
  armor: number;
  piercing: number;
  hardness: number; // 0 - 100%
  hp: number;
}

export interface TerrainModifier {
  id: string;
  name: string;
  attackMod: number; // e.g. -0.2 for -20%
  breakthroughMod: number;
  icon: string;
}

export const TERRAIN_TYPES: TerrainModifier[] = [
  { id: 'plains', name: 'Dataran Terbuka (Plains)', attackMod: 0, breakthroughMod: 0, icon: '🌿' },
  { id: 'forest', name: 'Hutan Lebat (Forest)', attackMod: -0.20, breakthroughMod: -0.20, icon: '🌲' },
  { id: 'hills', name: 'Perbukitan (Hills)', attackMod: -0.30, breakthroughMod: -0.25, icon: '⛰️' },
  { id: 'mountain', name: 'Pegunungan Tinggi (Mountain)', attackMod: -0.60, breakthroughMod: -0.50, icon: '🏔️' },
  { id: 'urban', name: 'Pusat Kota (Urban)', attackMod: -0.40, breakthroughMod: -0.50, icon: '🏙️' },
  { id: 'marsh', name: 'Rawa Berlumpur (Marsh)', attackMod: -0.50, breakthroughMod: -0.40, icon: '🌾' },
];

export interface SimulationHour {
  hour: number;
  attackerOrg: number;
  defenderOrg: number;
  winProbability: number;
  attackerCasualties: number;
  defenderCasualties: number;
}

export interface BattleResult {
  winner: 'attacker' | 'defender' | 'stalemate';
  winProbabilityPercent: number;
  drawProbabilityPercent: number;
  lossProbabilityPercent: number;
  battleDurationHours: number;
  timeline: SimulationHour[];
  attackerTotalLosses: { manpower: number; equipment: number };
  defenderTotalLosses: { manpower: number; equipment: number };
  attackerEffectiveAttack: number;
  defenderEffectiveDefense: number;
  attackerArmorSuperiority: boolean;
  defenderArmorSuperiority: boolean;
  verdictTitle: string;
  verdictDescription: string;
}

export const BattleResultEstimator: React.FC = () => {
  // Attacker Stats
  const [attackerStats, setAttackerStats] = useState<BattleDivisionStats>({
    name: 'Grup Tempur Lapis Baja (Panzer Korps)',
    count: 2,
    softAttack: 360,
    hardAttack: 180,
    defense: 390,
    breakthrough: 520,
    organization: 40,
    armor: 45,
    piercing: 48,
    hardness: 55,
    hp: 130
  });

  // Defender Stats
  const [defenderStats, setDefenderStats] = useState<BattleDivisionStats>({
    name: 'Divisi Infanteri Bertahan Parit',
    count: 3,
    softAttack: 130,
    hardAttack: 25,
    defense: 380,
    breakthrough: 40,
    organization: 55,
    armor: 0,
    piercing: 34,
    hardness: 0,
    hp: 220
  });

  // Environmental & Combat Settings
  const [selectedTerrainId, setSelectedTerrainId] = useState<string>('plains');
  const [riverCrossing, setRiverCrossing] = useState<'none' | 'small' | 'large'>('none');
  const [fortLevel, setFortLevel] = useState<number>(0); // 0 to 10
  const [entrenchment, setEntrenchment] = useState<number>(8); // 0 to 25
  const [airSuperiorityPercent, setAirSuperiorityPercent] = useState<number>(25); // -35% to +35%
  const [casDamagePerHour, setCasDamagePerHour] = useState<number>(18);
  const [planningBonusPercent, setPlanningBonusPercent] = useState<number>(30); // 0 to 60%
  const [attackerFlankVectors, setAttackerFlankVectors] = useState<number>(1); // 1, 2, 3
  const [weatherCondition, setWeatherCondition] = useState<'clear' | 'mud' | 'night'>('clear');

  // Simulation State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<BattleResult | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<SimulationHour | null>(null);

  // SVG Chart Ref for D3
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Selected Terrain Details
  const selectedTerrain = TERRAIN_TYPES.find(t => t.id === selectedTerrainId) || TERRAIN_TYPES[0];

  // Helper to load presets
  const loadPreset = (target: 'attacker' | 'defender', presetId: string) => {
    const preset = DIVISION_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    const isTank = preset.battalions.some(b => b.name.toLowerCase().includes('tank') || b.iconType === 'armor');

    const stats: BattleDivisionStats = {
      name: preset.name,
      count: isTank ? 2 : 3,
      softAttack: preset.stats.softAttack,
      hardAttack: preset.stats.hardAttack,
      defense: preset.stats.defense,
      breakthrough: preset.stats.breakthrough,
      organization: preset.stats.organization,
      armor: preset.stats.armor,
      piercing: preset.stats.piercing,
      hardness: isTank ? 60 : (preset.battalions.some(b => b.iconType === 'motorized') ? 20 : 0),
      hp: isTank ? 120 : 220
    };

    if (target === 'attacker') {
      setAttackerStats(stats);
    } else {
      setDefenderStats(stats);
    }
  };

  // Run the Combat Calculation
  const runCombatSimulation = () => {
    setIsSimulating(true);

    // Give a short UI feedback feel
    setTimeout(() => {
      // 1. Calculate Terrain, Fort, and Weather Penalties
      let attackerPenalty = selectedTerrain.attackMod;
      let attackerBreakthroughPenalty = selectedTerrain.breakthroughMod;

      if (riverCrossing === 'small') {
        attackerPenalty -= 0.30;
        attackerBreakthroughPenalty -= 0.25;
      } else if (riverCrossing === 'large') {
        attackerPenalty -= 0.60;
        attackerBreakthroughPenalty -= 0.50;
      }

      if (weatherCondition === 'mud') {
        attackerPenalty -= 0.30;
        attackerBreakthroughPenalty -= 0.50;
      } else if (weatherCondition === 'night') {
        attackerPenalty -= 0.40;
      }

      // Fort penalty: -15% per fort level on attacker's attack & breakthrough (min -99%)
      const fortPenalty = Math.min(0.99, fortLevel * 0.15);
      attackerPenalty -= fortPenalty;
      attackerBreakthroughPenalty -= fortPenalty;

      // Attacker bonuses: Planning bonus + Air Superiority + Flank vectors
      const airBonus = (airSuperiorityPercent / 100);
      const planningBonus = (planningBonusPercent / 100);
      const flankBonus = (attackerFlankVectors - 1) * 0.15; // +15% per extra direction

      const totalAttackerMult = Math.max(0.05, 1 + attackerPenalty + planningBonus + airBonus + flankBonus);
      const totalAttackerBreakthroughMult = Math.max(0.05, 1 + attackerBreakthroughPenalty + planningBonus + flankBonus);

      // Defender entrenchment & fort bonuses
      const entrenchmentBonus = entrenchment * 0.02; // +2% defense per entrenchment point
      const defenderAirPenalty = airSuperiorityPercent > 0 ? -(airSuperiorityPercent * 0.007) : 0;
      const totalDefenderDefMult = 1 + entrenchmentBonus + defenderAirPenalty;

      // 2. Compute Effective Combat Values
      const attSoft = attackerStats.softAttack * attackerStats.count * totalAttackerMult;
      const attHard = attackerStats.hardAttack * attackerStats.count * totalAttackerMult;
      const defHardnessFrac = defenderStats.hardness / 100;
      const attackerIncomingTargetAttack = (attSoft * (1 - defHardnessFrac)) + (attHard * defHardnessFrac);

      const defSoft = defenderStats.softAttack * defenderStats.count;
      const defHard = defenderStats.hardAttack * defenderStats.count;
      const attHardnessFrac = attackerStats.hardness / 100;
      const defenderIncomingTargetAttack = (defSoft * (1 - attHardnessFrac)) + (defHard * attHardnessFrac);

      const effectiveBreakthrough = attackerStats.breakthrough * attackerStats.count * totalAttackerBreakthroughMult;
      const effectiveDefense = defenderStats.defense * defenderStats.count * totalDefenderDefMult;

      // Armor vs Piercing
      const attackerArmorSuperiority = attackerStats.armor > defenderStats.piercing;
      const defenderArmorSuperiority = defenderStats.armor > attackerStats.piercing;

      const attackerArmorDmgTakenMult = attackerArmorSuperiority ? 0.50 : 1.0;
      const attackerOrgDmgGivenMult = attackerArmorSuperiority ? 1.50 : 1.0;

      const defenderArmorDmgTakenMult = defenderArmorSuperiority ? 0.50 : 1.0;
      const defenderOrgDmgGivenMult = defenderArmorSuperiority ? 1.40 : 1.0;

      // 3. Hourly Simulation Timeline (up to 96 hours)
      let currentAttackerOrg = attackerStats.organization;
      let currentDefenderOrg = defenderStats.organization;
      let totalAttackerCasualties = 0;
      let totalDefenderCasualties = 0;

      const timeline: SimulationHour[] = [];
      const maxHours = 96;

      for (let h = 0; h <= maxHours; h++) {
        // Compute Win Probability at this hour
        // Based on remaining Org ratio and damage rates
        const orgRatio = currentAttackerOrg / (currentAttackerOrg + currentDefenderOrg + 0.0001);
        const winProb = Math.min(99, Math.max(1, Math.round(orgRatio * 100)));

        timeline.push({
          hour: h,
          attackerOrg: Math.max(0, Math.round(currentAttackerOrg * 10) / 10),
          defenderOrg: Math.max(0, Math.round(currentDefenderOrg * 10) / 10),
          winProbability: winProb,
          attackerCasualties: Math.round(totalAttackerCasualties),
          defenderCasualties: Math.round(totalDefenderCasualties)
        });

        if (currentAttackerOrg <= 0 || currentDefenderOrg <= 0) {
          break;
        }

        // Damage calculation per combat round (1 hour):
        // Attacker hits on Defender:
        const blockedAttackerHits = Math.min(attackerIncomingTargetAttack, effectiveDefense);
        const unblockedAttackerHits = Math.max(0, attackerIncomingTargetAttack - effectiveDefense);
        // HOI4 mechanics: unblocked hits have 4x hit chance (0.4 vs 0.1)
        const defenderOrgLost = ((blockedAttackerHits * 0.08) + (unblockedAttackerHits * 0.32) + (casDamagePerHour * 0.75))
          * attackerOrgDmgGivenMult * defenderArmorDmgTakenMult * 0.012;

        // Defender hits on Attacker:
        const blockedDefenderHits = Math.min(defenderIncomingTargetAttack, effectiveBreakthrough);
        const unblockedDefenderHits = Math.max(0, defenderIncomingTargetAttack - effectiveBreakthrough);
        const attackerOrgLost = ((blockedDefenderHits * 0.08) + (unblockedDefenderHits * 0.32))
          * defenderOrgDmgGivenMult * attackerArmorDmgTakenMult * 0.012;

        currentDefenderOrg -= Math.max(0.1, defenderOrgLost);
        currentAttackerOrg -= Math.max(0.1, attackerOrgLost);

        // Casualties accumulation
        totalDefenderCasualties += Math.max(2, Math.round(defenderOrgLost * 35));
        totalAttackerCasualties += Math.max(2, Math.round(attackerOrgLost * 28));
      }

      // 4. Overall Outcome Assessment
      const finalHour = timeline[timeline.length - 1];
      let winner: 'attacker' | 'defender' | 'stalemate' = 'stalemate';
      let winProbFinal = 50;
      let lossProbFinal = 50;
      let drawProbFinal = 10;

      if (finalHour.defenderOrg <= 0 && finalHour.attackerOrg > 0) {
        winner = 'attacker';
        winProbFinal = Math.min(98, 70 + Math.round((finalHour.attackerOrg / attackerStats.organization) * 28));
        lossProbFinal = Math.max(1, 100 - winProbFinal - 5);
        drawProbFinal = 100 - winProbFinal - lossProbFinal;
      } else if (finalHour.attackerOrg <= 0 && finalHour.defenderOrg > 0) {
        winner = 'defender';
        lossProbFinal = Math.min(98, 70 + Math.round((finalHour.defenderOrg / defenderStats.organization) * 28));
        winProbFinal = Math.max(1, 100 - lossProbFinal - 5);
        drawProbFinal = 100 - winProbFinal - lossProbFinal;
      } else {
        winner = 'stalemate';
        drawProbFinal = 60;
        winProbFinal = 20;
        lossProbFinal = 20;
      }

      let verdictTitle = '';
      let verdictDescription = '';

      if (winner === 'attacker' && winProbFinal >= 80) {
        verdictTitle = 'Kemenangan Telak (Decisive Breakthrough)';
        verdictDescription = 'Ujung tombak penyerang berhasil menembus pertahanan musuh dengan cepat. Nilai breakthrough tinggi melindungi organisasi dari kehancuran.';
      } else if (winner === 'attacker') {
        verdictTitle = 'Kemenangan Taktis (Costly Victory)';
        verdictDescription = 'Musuh berhasil dipukul mundur, namun divisi penyerang menderita korban cukup besar akibat perlawanan parit yang sengit.';
      } else if (winner === 'defender' && lossProbFinal >= 80) {
        verdictTitle = 'Serangan Gagal Total (Repulsed with Heavy Losses)';
        verdictDescription = 'Pertahanan musuh terlalu kokoh. Penalti medan/benteng dan entrenchment menghancurkan organisasi penyerang sebelum garis pertahanan jebol.';
      } else if (winner === 'defender') {
        verdictTitle = 'Pertahanan Musuh Bertahan (Attacker Stalled)';
        verdictDescription = 'Penyerang kehabisan organisasi dan terpaksa membatalkan ofensif untuk menghindari kehancuran divisi total.';
      } else {
        verdictTitle = 'Kebuntuan Parit (Grinding War of Attrition)';
        verdictDescription = 'Kedua belah pihak saling menguras organisasi tanpa ada yang berhasil membuat terobosan nyata dalam 96 jam pertama.';
      }

      setSimulationResult({
        winner,
        winProbabilityPercent: winProbFinal,
        drawProbabilityPercent: drawProbFinal,
        lossProbabilityPercent: lossProbFinal,
        battleDurationHours: timeline.length - 1,
        timeline,
        attackerTotalLosses: {
          manpower: Math.round(totalAttackerCasualties * 2.2),
          equipment: Math.round(totalAttackerCasualties * 0.4)
        },
        defenderTotalLosses: {
          manpower: Math.round(totalDefenderCasualties * 2.5),
          equipment: Math.round(totalDefenderCasualties * 0.45)
        },
        attackerEffectiveAttack: Math.round(attackerIncomingTargetAttack),
        defenderEffectiveDefense: Math.round(effectiveDefense),
        attackerArmorSuperiority,
        defenderArmorSuperiority,
        verdictTitle,
        verdictDescription
      });

      setIsSimulating(false);
    }, 400);
  };

  // Initial simulation on mount
  useEffect(() => {
    runCombatSimulation();
  }, []);

  // Render D3 Chart whenever simulationResult changes
  useEffect(() => {
    if (!simulationResult || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const containerWidth = svgRef.current.clientWidth || 720;
    const height = 320;
    const margin = { top: 30, right: 35, bottom: 40, left: 50 };
    const width = containerWidth - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('viewBox', `0 0 ${containerWidth} ${height}`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = simulationResult.timeline;

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.hour) || 96])
      .range([0, width]);

    const maxOrg = Math.max(
      attackerStats.organization,
      defenderStats.organization,
      d3.max(data, d => Math.max(d.attackerOrg, d.defenderOrg)) || 60
    );

    const yScale = d3
      .scaleLinear()
      .domain([0, maxOrg * 1.1])
      .range([innerHeight, 0]);

    // Gradients
    const defs = svg.append('defs');

    // Attacker Gradient (Amber / Red)
    const attackerGrad = defs
      .append('linearGradient')
      .attr('id', 'attacker-grad')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    attackerGrad.append('stop').attr('offset', '0%').attr('stop-color', '#f59e0b').attr('stop-opacity', 0.35);
    attackerGrad.append('stop').attr('offset', '100%').attr('stop-color', '#f59e0b').attr('stop-opacity', 0.0);

    // Defender Gradient (Emerald / Cyan)
    const defenderGrad = defs
      .append('linearGradient')
      .attr('id', 'defender-grad')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    defenderGrad.append('stop').attr('offset', '0%').attr('stop-color', '#10b981').attr('stop-opacity', 0.35);
    defenderGrad.append('stop').attr('offset', '100%').attr('stop-color', '#10b981').attr('stop-opacity', 0.0);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('stroke', '#1e2d3d')
      .attr('stroke-dasharray', '3,3')
      .call(
        d3.axisLeft(yScale)
          .tickSize(-width)
          .tickFormat(() => '')
      );

    g.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${innerHeight})`)
      .attr('stroke', '#1e2d3d')
      .attr('stroke-dasharray', '3,3')
      .call(
        d3.axisBottom(xScale)
          .tickSize(-innerHeight)
          .tickFormat(() => '')
      );

    // Area generators
    const attackerArea = d3
      .area<SimulationHour>()
      .x(d => xScale(d.hour))
      .y0(innerHeight)
      .y1(d => yScale(d.attackerOrg))
      .curve(d3.curveMonotoneX);

    const defenderArea = d3
      .area<SimulationHour>()
      .x(d => xScale(d.hour))
      .y0(innerHeight)
      .y1(d => yScale(d.defenderOrg))
      .curve(d3.curveMonotoneX);

    // Render Areas
    g.append('path')
      .datum(data)
      .attr('fill', 'url(#attacker-grad)')
      .attr('d', attackerArea);

    g.append('path')
      .datum(data)
      .attr('fill', 'url(#defender-grad)')
      .attr('d', defenderArea);

    // Line generators
    const attackerLine = d3
      .line<SimulationHour>()
      .x(d => xScale(d.hour))
      .y(d => yScale(d.attackerOrg))
      .curve(d3.curveMonotoneX);

    const defenderLine = d3
      .line<SimulationHour>()
      .x(d => xScale(d.hour))
      .y(d => yScale(d.defenderOrg))
      .curve(d3.curveMonotoneX);

    // Render Lines
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#f59e0b')
      .attr('stroke-width', 2.5)
      .attr('d', attackerLine);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 2.5)
      .attr('d', defenderLine);

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(8).tickFormat(d => `${d}h`))
      .attr('color', '#64748b')
      .selectAll('text')
      .attr('fill', '#94a3b8')
      .attr('font-size', '11px')
      .attr('font-family', 'ui-monospace, monospace');

    // Y Axis
    g.append('g')
      .call(d3.axisLeft(yScale).ticks(6))
      .attr('color', '#64748b')
      .selectAll('text')
      .attr('fill', '#94a3b8')
      .attr('font-size', '11px')
      .attr('font-family', 'ui-monospace, monospace');

    // Axis Labels
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -38)
      .attr('x', -innerHeight / 2)
      .attr('fill', '#94a3b8')
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .text('Organisasi Divisi (Org)');

    g.append('text')
      .attr('x', width / 2)
      .attr('y', innerHeight + 35)
      .attr('fill', '#94a3b8')
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .text('Durasi Pertempuran (Jam / Hours)');

    // Overlay for Interactive Hover Crosshair
    const bisect = d3.bisector<SimulationHour, number>(d => d.hour).left;
    const focusLine = g.append('line')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '2,2')
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .style('opacity', 0);

    const attDot = g.append('circle')
      .attr('r', 5)
      .attr('fill', '#f59e0b')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .style('opacity', 0);

    const defDot = g.append('circle')
      .attr('r', 5)
      .attr('fill', '#10b981')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .style('opacity', 0);

    svg
      .append('rect')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('width', width)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .on('mousemove', (event) => {
        const [mx] = d3.pointer(event);
        const x0 = xScale.invert(mx);
        const i = bisect(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        if (!d0) return;
        const d = d1 && (x0 - d0.hour > d1.hour - x0) ? d1 : d0;

        focusLine
          .attr('x1', xScale(d.hour))
          .attr('x2', xScale(d.hour))
          .style('opacity', 1);

        attDot
          .attr('cx', xScale(d.hour))
          .attr('cy', yScale(d.attackerOrg))
          .style('opacity', 1);

        defDot
          .attr('cx', xScale(d.hour))
          .attr('cy', yScale(d.defenderOrg))
          .style('opacity', 1);

        setHoveredPoint(d);
      })
      .on('mouseleave', () => {
        focusLine.style('opacity', 0);
        attDot.style('opacity', 0);
        defDot.style('opacity', 0);
        setHoveredPoint(null);
      });

  }, [simulationResult]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-[#223344] bg-[#101722] p-5 shadow-xl shadow-black/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#dc2626]/20 border border-[#f59e0b]/40 text-[#f59e0b] shadow-inner">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-[#f8fafc] tracking-tight">
                  Battle Result Estimator (D3 Combat Engine)
                </h2>
                <span className="rounded bg-[#f59e0b]/20 px-2 py-0.5 text-[10px] font-mono font-bold text-[#fcd34d] border border-[#f59e0b]/30">
                  D3 Engine
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Kalkulasi probabilitas kemenangan pertempuran HOI4 secara matematis berdasarkan stat divisi, penalti medan, benteng, dan entrenchment musuh.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-simulate-combat"
              onClick={runCombatSimulation}
              disabled={isSimulating}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#f59e0b] hover:to-[#d97706] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#d97706]/30 transition-all active:scale-95 disabled:opacity-50"
            >
              <Play className={`h-4 w-4 fill-white ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Menghitung Simulasi...' : 'Simulate Combat'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preset Quick Matches */}
      <div className="rounded-xl border border-[#1e2a36] bg-[#0d141d] p-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748b] flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-[#f59e0b]" />
            Preset Skenario Pertempuran Historis:
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => {
              loadPreset('attacker', 'armor-spearhead-30w');
              loadPreset('defender', 'inf-9-1');
              setSelectedTerrainId('plains');
              setFortLevel(0);
              setEntrenchment(6);
              setAirSuperiorityPercent(30);
              runCombatSimulation();
            }}
            className="rounded-lg border border-[#1e2d3d] bg-[#111923] p-2 text-left hover:border-[#f59e0b]/60 transition-all"
          >
            <div className="text-xs font-bold text-[#f8fafc]">Blitzkrieg di Dataran</div>
            <div className="text-[11px] text-[#94a3b8]">2x Medium Tank vs 3x 9-1 Inf</div>
          </button>

          <button
            onClick={() => {
              loadPreset('attacker', 'armor-spearhead-30w');
              loadPreset('defender', 'inf-9-1');
              setSelectedTerrainId('plains');
              setFortLevel(6);
              setEntrenchment(15);
              setRiverCrossing('large');
              setAirSuperiorityPercent(0);
              runCombatSimulation();
            }}
            className="rounded-lg border border-[#1e2d3d] bg-[#111923] p-2 text-left hover:border-[#ef4444]/60 transition-all"
          >
            <div className="text-xs font-bold text-[#fca5a5]">Benteng Maginot / Garis Stalin</div>
            <div className="text-[11px] text-[#94a3b8]">Serbu Sungai + Benteng Lvl 6</div>
          </button>

          <button
            onClick={() => {
              loadPreset('attacker', 'marines-naval-invasion-30w');
              loadPreset('defender', 'inf-port-garrison-10w');
              setSelectedTerrainId('plains');
              setFortLevel(2);
              setEntrenchment(10);
              setRiverCrossing('small');
              setAirSuperiorityPercent(35);
              runCombatSimulation();
            }}
            className="rounded-lg border border-[#1e2d3d] bg-[#111923] p-2 text-left hover:border-[#38bdf8]/60 transition-all"
          >
            <div className="text-xs font-bold text-[#7dd3fc]">Pendaratan Amfibi D-Day</div>
            <div className="text-[11px] text-[#94a3b8]">Marinir 30w vs Garnisun Pantai</div>
          </button>

          <button
            onClick={() => {
              loadPreset('attacker', 'mountaineer-shock-25w');
              loadPreset('defender', 'inf-space-marine-30w');
              setSelectedTerrainId('mountain');
              setFortLevel(1);
              setEntrenchment(12);
              setAirSuperiorityPercent(10);
              runCombatSimulation();
            }}
            className="rounded-lg border border-[#1e2d3d] bg-[#111923] p-2 text-left hover:border-[#a7f3d0]/60 transition-all"
          >
            <div className="text-xs font-bold text-[#86efac]">Perang Pegunungan Alpen</div>
            <div className="text-[11px] text-[#94a3b8]">Mountaineer vs Space Marines</div>
          </button>
        </div>
      </div>

      {/* Main Grid: Input Columns (Attacker, Modifiers, Defender) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ATTACKER PANEL (4 cols) */}
        <div className="lg:col-span-4 rounded-xl border border-[#d97706]/40 bg-[#141c26] p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-[#22303c] pb-2.5">
            <div className="flex items-center gap-2 text-[#f59e0b]">
              <Swords className="h-4 w-4" />
              <span className="font-bold text-sm">Pihak Penyerang (Attacker)</span>
            </div>
            <span className="text-[11px] font-mono text-[#fcd34d] bg-[#f59e0b]/10 px-2 py-0.5 rounded border border-[#f59e0b]/30">
              {attackerStats.count} Divisi
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[#94a3b8] block mb-1">Preset Divisi Penyerang:</label>
              <select
                value={attackerStats.name}
                onChange={(e) => {
                  const p = DIVISION_PRESETS.find(item => item.name === e.target.value);
                  if (p) loadPreset('attacker', p.id);
                }}
                className="w-full rounded border border-[#263749] bg-[#0c141d] px-2.5 py-1.5 text-xs text-[#f8fafc]"
              >
                {DIVISION_PRESETS.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[#94a3b8] block">Jumlah Divisi:</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={attackerStats.count}
                  onChange={e => setAttackerStats(prev => ({ ...prev, count: Math.max(1, parseInt(e.target.value) || 1) }))}
                  className="w-full rounded border border-[#263749] bg-[#0c141d] px-2 py-1 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[#94a3b8] block">Soft Attack / Div:</label>
                <input
                  type="number"
                  value={attackerStats.softAttack}
                  onChange={e => setAttackerStats(prev => ({ ...prev, softAttack: parseInt(e.target.value) || 0 }))}
                  className="w-full rounded border border-[#263749] bg-[#0c141d] px-2 py-1 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[#94a3b8] block">Hard Attack / Div:</label>
                <input
                  type="number"
                  value={attackerStats.hardAttack}
                  onChange={e => setAttackerStats(prev => ({ ...prev, hardAttack: parseInt(e.target.value) || 0 }))}
                  className="w-full rounded border border-[#263749] bg-[#0c141d] px-2 py-1 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[#94a3b8] block">Breakthrough / Div:</label>
                <input
                  type="number"
                  value={attackerStats.breakthrough}
                  onChange={e => setAttackerStats(prev => ({ ...prev, breakthrough: parseInt(e.target.value) || 0 }))}
                  className="w-full rounded border border-[#263749] bg-[#0c141d] px-2 py-1 text-xs text-white font-bold text-[#fcd34d]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[#94a3b8] block">Organisasi (Org):</label>
                <input
                  type="number"
                  value={attackerStats.organization}
                  onChange={e => setAttackerStats(prev => ({ ...prev, organization: parseInt(e.target.value) || 0 }))}
                  className="w-full rounded border border-[#263749] bg-[#0c141d] px-2 py-1 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[#94a3b8] block">Armor / Piercing:</label>
                <div className="flex gap-1">
                  <input
                    type="number"
                    value={attackerStats.armor}
                    placeholder="Arm"
                    onChange={e => setAttackerStats(prev => ({ ...prev, armor: parseInt(e.target.value) || 0 }))}
                    className="w-1/2 rounded border border-[#263749] bg-[#0c141d] px-1.5 py-1 text-xs text-white"
                  />
                  <input
                    type="number"
                    value={attackerStats.piercing}
                    placeholder="Prc"
                    onChange={e => setAttackerStats(prev => ({ ...prev, piercing: parseInt(e.target.value) || 0 }))}
                    className="w-1/2 rounded border border-[#263749] bg-[#0c141d] px-1.5 py-1 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#22303c] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#94a3b8]">Planning Bonus:</span>
                <span className="font-mono text-[#fcd34d]">+{planningBonusPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={planningBonusPercent}
                onChange={e => setPlanningBonusPercent(parseInt(e.target.value))}
                className="w-full accent-[#f59e0b]"
              />

              <div className="flex justify-between items-center text-xs">
                <span className="text-[#94a3b8]">Arah Serangan (Flank Vectors):</span>
                <span className="font-mono text-[#fcd34d]">{attackerFlankVectors} Arah (+{(attackerFlankVectors - 1) * 15}%)</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[1, 2, 3].map(vec => (
                  <button
                    key={vec}
                    onClick={() => setAttackerFlankVectors(vec)}
                    className={`rounded py-1 text-xs font-semibold ${
                      attackerFlankVectors === vec ? 'bg-[#f59e0b] text-black' : 'bg-[#0f1722] text-[#94a3b8]'
                    }`}
                  >
                    {vec} Titik
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TERRAIN & ENVIRONMENTAL MODIFIERS (4 cols) */}
        <div className="lg:col-span-4 rounded-xl border border-[#223344] bg-[#111923] p-4 space-y-3.5">
          <div className="flex items-center gap-2 text-[#38bdf8] border-b border-[#22303c] pb-2.5">
            <Mountain className="h-4 w-4" />
            <span className="font-bold text-sm">Medan, Cuaca &amp; Udara</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[#94a3b8] block mb-1">Pilih Medan Geografis:</label>
              <div className="grid grid-cols-2 gap-1.5">
                {TERRAIN_TYPES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTerrainId(t.id)}
                    className={`flex items-center gap-1.5 rounded-lg border p-2 text-left transition-all ${
                      selectedTerrainId === t.id
                        ? 'border-[#38bdf8] bg-[#0c2438] text-white'
                        : 'border-[#1e2a36] bg-[#0a1118] text-[#94a3b8] hover:border-[#33475b]'
                    }`}
                  >
                    <span className="text-sm">{t.icon}</span>
                    <span className="truncate font-semibold text-[11px]">{t.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
              {selectedTerrain.attackMod !== 0 && (
                <div className="text-[11px] text-[#f87171] mt-1 font-mono">
                  Penalti Serang: {Math.round(selectedTerrain.attackMod * 100)}% | Breakthrough: {Math.round(selectedTerrain.breakthroughMod * 100)}%
                </div>
              )}
            </div>

            <div>
              <label className="text-[#94a3b8] block mb-1">Rintangan Sungai (River Crossing):</label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'none', label: 'Tidak Ada' },
                  { id: 'small', label: 'Sungai Kecil (-30%)' },
                  { id: 'large', label: 'Sungai Besar (-60%)' }
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => setRiverCrossing(r.id as any)}
                    className={`rounded py-1 px-1.5 text-[11px] font-semibold truncate ${
                      riverCrossing === r.id ? 'bg-[#38bdf8] text-black' : 'bg-[#0a1118] text-[#94a3b8]'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[#94a3b8] block mb-1">Kondisi Cuaca:</label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'clear', label: 'Cerah' },
                  { id: 'mud', label: 'Lumpur (-50%)' },
                  { id: 'night', label: 'Malam (-40%)' }
                ].map(w => (
                  <button
                    key={w.id}
                    onClick={() => setWeatherCondition(w.id as any)}
                    className={`rounded py-1 px-1.5 text-[11px] font-semibold truncate ${
                      weatherCondition === w.id ? 'bg-[#eab308] text-black' : 'bg-[#0a1118] text-[#94a3b8]'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#22303c] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#94a3b8] flex items-center gap-1">
                  <Plane className="h-3.5 w-3.5 text-[#38bdf8]" />
                  Supremasi Udara (Air Superiority):
                </span>
                <span className="font-mono text-[#38bdf8]">
                  {airSuperiorityPercent > 0 ? `+${airSuperiorityPercent}%` : `${airSuperiorityPercent}%`}
                </span>
              </div>
              <input
                type="range"
                min="-35"
                max="35"
                step="5"
                value={airSuperiorityPercent}
                onChange={e => setAirSuperiorityPercent(parseInt(e.target.value))}
                className="w-full accent-[#38bdf8]"
              />

              <div className="flex justify-between items-center text-xs">
                <span className="text-[#94a3b8]">Kerusakan CAS per Jam:</span>
                <span className="font-mono text-[#a7f3d0]">+{casDamagePerHour} Dmg/h</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="2"
                value={casDamagePerHour}
                onChange={e => setCasDamagePerHour(parseInt(e.target.value))}
                className="w-full accent-[#10b981]"
              />
            </div>
          </div>
        </div>

        {/* DEFENDER PANEL (4 cols) */}
        <div className="lg:col-span-4 rounded-xl border border-[#10b981]/40 bg-[#121c20] p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-[#22303c] pb-2.5">
            <div className="flex items-center gap-2 text-[#10b981]">
              <Shield className="h-4 w-4" />
              <span className="font-bold text-sm">Pihak Bertahan (Defender)</span>
            </div>
            <span className="text-[11px] font-mono text-[#a7f3d0] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/30">
              {defenderStats.count} Divisi
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[#94a3b8] block mb-1">Preset Divisi Bertahan:</label>
              <select
                value={defenderStats.name}
                onChange={(e) => {
                  const p = DIVISION_PRESETS.find(item => item.name === e.target.value);
                  if (p) loadPreset('defender', p.id);
                }}
                className="w-full rounded border border-[#1f3730] bg-[#0c141d] px-2.5 py-1.5 text-xs text-[#f8fafc]"
              >
                {DIVISION_PRESETS.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[#94a3b8] block">Jumlah Divisi:</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={defenderStats.count}
                  onChange={e => setDefenderStats(prev => ({ ...prev, count: Math.max(1, parseInt(e.target.value) || 1) }))}
                  className="w-full rounded border border-[#1f3730] bg-[#0c141d] px-2 py-1 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[#94a3b8] block">Defense / Div:</label>
                <input
                  type="number"
                  value={defenderStats.defense}
                  onChange={e => setDefenderStats(prev => ({ ...prev, defense: parseInt(e.target.value) || 0 }))}
                  className="w-full rounded border border-[#1f3730] bg-[#0c141d] px-2 py-1 text-xs text-white font-bold text-[#a7f3d0]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[#94a3b8] block">Soft Attack / Div:</label>
                <input
                  type="number"
                  value={defenderStats.softAttack}
                  onChange={e => setDefenderStats(prev => ({ ...prev, softAttack: parseInt(e.target.value) || 0 }))}
                  className="w-full rounded border border-[#1f3730] bg-[#0c141d] px-2 py-1 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[#94a3b8] block">Hard Attack / Div:</label>
                <input
                  type="number"
                  value={defenderStats.hardAttack}
                  onChange={e => setDefenderStats(prev => ({ ...prev, hardAttack: parseInt(e.target.value) || 0 }))}
                  className="w-full rounded border border-[#1f3730] bg-[#0c141d] px-2 py-1 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[#94a3b8] block">Organisasi (Org):</label>
                <input
                  type="number"
                  value={defenderStats.organization}
                  onChange={e => setDefenderStats(prev => ({ ...prev, organization: parseInt(e.target.value) || 0 }))}
                  className="w-full rounded border border-[#1f3730] bg-[#0c141d] px-2 py-1 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[#94a3b8] block">Armor / Piercing:</label>
                <div className="flex gap-1">
                  <input
                    type="number"
                    value={defenderStats.armor}
                    placeholder="Arm"
                    onChange={e => setDefenderStats(prev => ({ ...prev, armor: parseInt(e.target.value) || 0 }))}
                    className="w-1/2 rounded border border-[#1f3730] bg-[#0c141d] px-1.5 py-1 text-xs text-white"
                  />
                  <input
                    type="number"
                    value={defenderStats.piercing}
                    placeholder="Prc"
                    onChange={e => setDefenderStats(prev => ({ ...prev, piercing: parseInt(e.target.value) || 0 }))}
                    className="w-1/2 rounded border border-[#1f3730] bg-[#0c141d] px-1.5 py-1 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#22303c] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#94a3b8]">Entrenchment Parit:</span>
                <span className="font-mono text-[#a7f3d0]">Level {entrenchment} (+{entrenchment * 2}%)</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={entrenchment}
                onChange={e => setEntrenchment(parseInt(e.target.value))}
                className="w-full accent-[#10b981]"
              />

              <div className="flex justify-between items-center text-xs">
                <span className="text-[#94a3b8]">Tingkat Benteng (Land Fort):</span>
                <span className="font-mono text-[#fca5a5]">Level {fortLevel} (-{Math.min(99, fortLevel * 15)}% Atk)</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={fortLevel}
                onChange={e => setFortLevel(parseInt(e.target.value))}
                className="w-full accent-[#ef4444]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* D3 VISUALIZATION & SIMULATION DASHBOARD */}
      {simulationResult && (
        <div className="rounded-xl border border-[#223344] bg-[#0c131c] p-5 shadow-2xl space-y-6">
          {/* Top Result Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-[#1e2d3d] pb-5">
            {/* Win Probability Score (4 cols) */}
            <div className="md:col-span-4 flex items-center gap-4">
              <div
                className={`flex h-20 w-20 flex-col items-center justify-center rounded-2xl border font-mono font-black shadow-lg ${
                  simulationResult.winner === 'attacker'
                    ? 'border-[#f59e0b] bg-gradient-to-br from-[#3b2711] to-[#1a1309] text-[#fcd34d]'
                    : simulationResult.winner === 'defender'
                    ? 'border-[#10b981] bg-gradient-to-br from-[#0c2e22] to-[#081813] text-[#6ee7b7]'
                    : 'border-[#64748b] bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-[#cbd5e1]'
                }`}
              >
                <span className="text-2xl">{simulationResult.winProbabilityPercent}%</span>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#94a3b8]">Win Rate</span>
              </div>

              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#94a3b8]">
                  Hasil Estimasi Pertempuran:
                </span>
                <h3 className="text-base font-black text-[#f8fafc]">
                  {simulationResult.verdictTitle}
                </h3>
                <p className="text-xs text-[#94a3b8] mt-0.5">
                  {simulationResult.verdictDescription}
                </p>
              </div>
            </div>

            {/* Battle Stats Pills (4 cols) */}
            <div className="md:col-span-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-[#1e2d3d] bg-[#111923] p-2.5">
                <span className="text-[10px] text-[#64748b] uppercase font-mono block">Estimasi Durasi</span>
                <span className="font-mono text-base font-bold text-[#38bdf8]">
                  {simulationResult.battleDurationHours} Jam
                </span>
              </div>
              <div className="rounded-lg border border-[#1e2d3d] bg-[#111923] p-2.5">
                <span className="text-[10px] text-[#64748b] uppercase font-mono block">Probabilitas Draw</span>
                <span className="font-mono text-base font-bold text-[#e2e8f0]">
                  {simulationResult.drawProbabilityPercent}%
                </span>
              </div>
              <div className="rounded-lg border border-[#1e2d3d] bg-[#111923] p-2.5">
                <span className="text-[10px] text-[#64748b] uppercase font-mono block">Effective Attack (Attacker)</span>
                <span className="font-mono text-base font-bold text-[#f59e0b]">
                  {simulationResult.attackerEffectiveAttack}
                </span>
              </div>
              <div className="rounded-lg border border-[#1e2d3d] bg-[#111923] p-2.5">
                <span className="text-[10px] text-[#64748b] uppercase font-mono block">Effective Defense (Defender)</span>
                <span className="font-mono text-base font-bold text-[#10b981]">
                  {simulationResult.defenderEffectiveDefense}
                </span>
              </div>
            </div>

            {/* Tactical Modifiers Badges (4 cols) */}
            <div className="md:col-span-4 space-y-2">
              {simulationResult.attackerArmorSuperiority ? (
                <div className="flex items-center gap-2 rounded-lg border border-[#f59e0b]/40 bg-[#291e10] px-3 py-1.5 text-xs text-[#fcd34d]">
                  <CheckCircle2 className="h-4 w-4 text-[#f59e0b] shrink-0" />
                  <span><strong>Armor Penyerang Dominan</strong>: Musuh gagal menembus armor (+50% Org damage, -50% casualty).</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-lg border border-[#64748b]/40 bg-[#16202c] px-3 py-1.5 text-xs text-[#94a3b8]">
                  <AlertTriangle className="h-4 w-4 text-[#eab308] shrink-0" />
                  <span>Armor tertembus: Piercing musuh cukup untuk meniadakan bonus kebal lapis baja.</span>
                </div>
              )}

              {fortLevel > 0 && (
                <div className="flex items-center gap-2 rounded-lg border border-[#ef4444]/40 bg-[#2b1418] px-3 py-1.5 text-xs text-[#fca5a5]">
                  <Shield className="h-4 w-4 text-[#ef4444] shrink-0" />
                  <span><strong>Benteng Aktif Level {fortLevel}</strong>: Memotong -{Math.min(99, fortLevel * 15)}% daya serang &amp; terobosan penyerang.</span>
                </div>
              )}
            </div>
          </div>

          {/* D3 SVG CHART CONTAINER */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#94a3b8] flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-[#38bdf8]" />
                  Grafik D3 Decay Organisasi &amp; Trajektori Tempur:
                </span>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-[#f59e0b]">
                    <span className="inline-block h-2 w-5 rounded-full bg-[#f59e0b]" />
                    Penyerang (Attacker Org)
                  </span>
                  <span className="flex items-center gap-1.5 text-[#10b981]">
                    <span className="inline-block h-2 w-5 rounded-full bg-[#10b981]" />
                    Bertahan (Defender Org)
                  </span>
                </div>
              </div>

              {hoveredPoint && (
                <div className="flex items-center gap-3 font-mono text-xs bg-[#172331] px-3 py-1 rounded-lg border border-[#2b3c4f]">
                  <span className="text-[#38bdf8]">Jam {hoveredPoint.hour}h</span>
                  <span className="text-[#f59e0b]">Attacker Org: {hoveredPoint.attackerOrg}</span>
                  <span className="text-[#10b981]">Defender Org: {hoveredPoint.defenderOrg}</span>
                  <span className="text-[#fcd34d]">Win%: {hoveredPoint.winProbability}%</span>
                </div>
              )}
            </div>

            {/* Real D3 SVG Element */}
            <div className="w-full overflow-hidden rounded-xl border border-[#1e2d3d] bg-[#090e15] p-2">
              <svg ref={svgRef} className="w-full h-[320px] select-none" />
            </div>
          </div>

          {/* Casualties & Drain Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl border border-[#d97706]/30 bg-[#161f2c] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold uppercase text-[#f59e0b]">
                  Estimasi Kerugian Penyerang
                </span>
                <span className="text-[11px] text-[#94a3b8]">Total 96 Jam</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="rounded-lg bg-[#0d141d] p-2 border border-[#22303c]">
                  <span className="text-[10px] text-[#64748b] block uppercase font-mono">Korban Jiwa (Manpower)</span>
                  <span className="font-mono text-sm font-bold text-[#fca5a5]">
                    {simulationResult.attackerTotalLosses.manpower.toLocaleString()} prajurit
                  </span>
                </div>
                <div className="rounded-lg bg-[#0d141d] p-2 border border-[#22303c]">
                  <span className="text-[10px] text-[#64748b] block uppercase font-mono">Peralatan Hancur</span>
                  <span className="font-mono text-sm font-bold text-[#fcd34d]">
                    {simulationResult.attackerTotalLosses.equipment.toLocaleString()} senjata/tank
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#10b981]/30 bg-[#121f1e] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold uppercase text-[#10b981]">
                  Estimasi Kerugian Bertahan
                </span>
                <span className="text-[11px] text-[#94a3b8]">Total 96 Jam</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="rounded-lg bg-[#0d141d] p-2 border border-[#22303c]">
                  <span className="text-[10px] text-[#64748b] block uppercase font-mono">Korban Jiwa (Manpower)</span>
                  <span className="font-mono text-sm font-bold text-[#fca5a5]">
                    {simulationResult.defenderTotalLosses.manpower.toLocaleString()} prajurit
                  </span>
                </div>
                <div className="rounded-lg bg-[#0d141d] p-2 border border-[#22303c]">
                  <span className="text-[10px] text-[#64748b] block uppercase font-mono">Peralatan Hancur</span>
                  <span className="font-mono text-sm font-bold text-[#a7f3d0]">
                    {simulationResult.defenderTotalLosses.equipment.toLocaleString()} senjata/artileri
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
