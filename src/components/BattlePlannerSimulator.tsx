import React, { useState, useMemo } from 'react';
import {
  Swords, Shield, Plane, Mountain, CloudRain, Flame,
  TrendingUp, AlertTriangle, CheckCircle2, XCircle, RotateCcw,
  Sparkles, Sliders, Play, Award, Zap, Fuel, Target, Users
} from 'lucide-react';
import { DIVISION_PRESETS } from '../data/divisionData';

interface SideStats {
  name: string;
  divisionCount: number;
  softAttack: number;
  hardAttack: number;
  defense: number;
  breakthrough: number;
  organization: number;
  armor: number;
  piercing: number;
  combatWidth: number;
  hardness: number; // percentage 0 - 100
  hp: number;
}

export const BattlePlannerSimulator: React.FC = () => {
  // Attacker Stats
  const [attackerPreset, setAttackerPreset] = useState<string>('armor-spearhead-30w');
  const [attackerStats, setAttackerStats] = useState<SideStats>({
    name: 'Grup Tempur Lapis Baja (Spearhead)',
    divisionCount: 2,
    softAttack: 380,
    hardAttack: 190,
    defense: 410,
    breakthrough: 540,
    organization: 38,
    armor: 48,
    piercing: 52,
    combatWidth: 30,
    hardness: 55,
    hp: 140
  });

  // Defender Stats
  const [defenderPreset, setDefenderPreset] = useState<string>('inf-9-1');
  const [defenderStats, setDefenderStats] = useState<SideStats>({
    name: 'Divisi Garis Depan Bertahan',
    divisionCount: 3,
    softAttack: 120,
    hardAttack: 22,
    defense: 360,
    breakthrough: 45,
    organization: 55,
    armor: 0,
    piercing: 32,
    combatWidth: 18,
    hardness: 0,
    hp: 210
  });

  // Environmental & Operational Modifiers
  const [terrain, setTerrain] = useState<'plains' | 'forest' | 'hills' | 'mountain' | 'urban' | 'marsh'>('plains');
  const [riverCrossing, setRiverCrossing] = useState<'none' | 'small' | 'large'>('none');
  const [fortLevel, setFortLevel] = useState<number>(0); // 0 to 10
  const [entrenchment, setEntrenchment] = useState<number>(5); // 0 to 20
  const [airSuperiority, setAirSuperiority] = useState<'none' | 'attacker' | 'defender'>('attacker');
  const [casDamage, setCasDamage] = useState<number>(25); // Close Air Support damage per hour
  const [planningBonus, setPlanningBonus] = useState<number>(30); // 0 to 60%
  const [attackVectors, setAttackVectors] = useState<number>(1); // 1 = 80w, 2 = 120w, 3 = 160w
  const [weather, setWeather] = useState<'clear' | 'mud' | 'night'>('clear');

  // Load preset to Attacker
  const handleLoadAttackerPreset = (presetId: string) => {
    setAttackerPreset(presetId);
    const p = DIVISION_PRESETS.find(item => item.id === presetId);
    if (!p) return;
    const isTank = p.battalions.some(b => b.name.toLowerCase().includes('tank') || b.iconType === 'armor');
    setAttackerStats({
      name: p.name,
      divisionCount: isTank ? 2 : 3,
      softAttack: p.stats.softAttack,
      hardAttack: p.stats.hardAttack,
      defense: p.stats.defense,
      breakthrough: p.stats.breakthrough,
      organization: p.stats.organization,
      armor: p.stats.armor,
      piercing: p.stats.piercing,
      combatWidth: p.combatWidth,
      hardness: isTank ? 55 : (p.battalions.some(b => b.iconType === 'motorized') ? 25 : 0),
      hp: isTank ? 130 : 210
    });
  };

  // Load preset to Defender
  const handleLoadDefenderPreset = (presetId: string) => {
    setDefenderPreset(presetId);
    const p = DIVISION_PRESETS.find(item => item.id === presetId);
    if (!p) return;
    const isTank = p.battalions.some(b => b.name.toLowerCase().includes('tank') || b.iconType === 'armor');
    setDefenderStats({
      name: p.name,
      divisionCount: 3,
      softAttack: p.stats.softAttack,
      hardAttack: p.stats.hardAttack,
      defense: p.stats.defense,
      breakthrough: p.stats.breakthrough,
      organization: p.stats.organization,
      armor: p.stats.armor,
      piercing: p.stats.piercing,
      combatWidth: p.combatWidth,
      hardness: isTank ? 55 : 0,
      hp: isTank ? 130 : 210
    });
  };

  // Real-time HOI4 Land Combat Math Simulation
  const simulationResults = useMemo(() => {
    // 1. Available Combat Width
    const baseWidth = attackVectors === 1 ? 80 : (attackVectors === 2 ? 120 : 160);
    const attackerTotalWidth = attackerStats.combatWidth * attackerStats.divisionCount;
    const defenderTotalWidth = defenderStats.combatWidth * defenderStats.divisionCount;

    // Check width fit
    const attackerWidthFits = attackerTotalWidth <= baseWidth;
    const defenderWidthFits = defenderTotalWidth <= baseWidth;

    // 2. Modifiers
    let terrainPenalty = 0;
    if (terrain === 'forest') terrainPenalty = -0.20;
    else if (terrain === 'hills') terrainPenalty = -0.30;
    else if (terrain === 'mountain') terrainPenalty = -0.50;
    else if (terrain === 'urban') terrainPenalty = -0.30;
    else if (terrain === 'marsh') terrainPenalty = -0.40;

    let riverPenalty = 0;
    if (riverCrossing === 'small') riverPenalty = -0.30;
    else if (riverCrossing === 'large') riverPenalty = -0.60;

    let weatherPenalty = 0;
    if (weather === 'mud') weatherPenalty = -0.25;
    else if (weather === 'night') weatherPenalty = -0.50;

    // Fort modifier: -15% attacker attack per fort level (max 99%)
    const fortPenalty = Math.min(0.99, fortLevel * 0.15);

    // Entrenchment bonus: +2% defense per level
    const entrenchmentBonus = (entrenchment * 0.02);

    // Air Superiority
    let airAttackMod = 0;
    let airDefenseMod = 0;
    if (airSuperiority === 'attacker') {
      airAttackMod = 0.15;
      airDefenseMod = -0.15;
    } else if (airSuperiority === 'defender') {
      airAttackMod = -0.20;
      airDefenseMod = 0.10;
    }

    // Net Attacker Modifier
    const netAttackerMod = Math.max(
      0.05,
      1 + terrainPenalty + riverPenalty + weatherPenalty - fortPenalty + (planningBonus / 100) + airAttackMod
    );

    // Net Defender Modifier
    const netDefenderMod = Math.max(0.1, 1 + entrenchmentBonus + airDefenseMod);

    // 3. Armor vs Piercing confrontation
    // Does attacker pierce defender?
    const attackerPiercesDefender = attackerStats.piercing >= defenderStats.armor;
    // Does defender pierce attacker?
    const defenderPiercesAttacker = defenderStats.piercing >= attackerStats.armor;

    // If attacker has unpierced armor: deals +40% org damage, takes -50% org damage
    const attackerUnpiercedBonus = (!defenderPiercesAttacker && attackerStats.armor > 0);
    // If defender has unpierced armor: takes -50% org damage
    const defenderUnpiercedBonus = (!attackerPiercesDefender && defenderStats.armor > 0);

    // 4. Effective Attacks and Defense calculations
    // Attacker attacks against defender
    const attSoft = attackerStats.softAttack * attackerStats.divisionCount * netAttackerMod;
    const attHard = attackerStats.hardAttack * attackerStats.divisionCount * netAttackerMod;
    const defHardness = defenderStats.hardness / 100;
    const totalEffectiveAttackerAttacks = (attSoft * (1 - defHardness)) + (attHard * defHardness);

    // Defender total defense
    const totalDefenderDefense = defenderStats.defense * defenderStats.divisionCount * netDefenderMod;

    // Attacks vs Defense hit chances (HOI4 mechanics: attacks <= defense have 10% hit chance, excess have 40%)
    let attackerHitsPerHour = 0;
    if (totalEffectiveAttackerAttacks <= totalDefenderDefense) {
      attackerHitsPerHour = totalEffectiveAttackerAttacks * 0.10;
    } else {
      attackerHitsPerHour = (totalDefenderDefense * 0.10) + ((totalEffectiveAttackerAttacks - totalDefenderDefense) * 0.40);
    }

    // Close Air Support (CAS) adds direct hits
    if (airSuperiority === 'attacker' && casDamage > 0) {
      attackerHitsPerHour += (casDamage * 0.8);
    }

    // Defender counter-attacks against attacker
    const defSoft = defenderStats.softAttack * defenderStats.divisionCount * netDefenderMod;
    const defHard = defenderStats.hardAttack * defenderStats.divisionCount * netDefenderMod;
    const attHardness = attackerStats.hardness / 100;
    const totalEffectiveDefenderAttacks = (defSoft * (1 - attHardness)) + (defHard * attHardness);

    // Attacker total breakthrough
    const totalAttackerBreakthrough = attackerStats.breakthrough * attackerStats.divisionCount * Math.max(0.2, netAttackerMod);

    // Defender hits against attacker breakthrough
    let defenderHitsPerHour = 0;
    if (totalEffectiveDefenderAttacks <= totalAttackerBreakthrough) {
      defenderHitsPerHour = totalEffectiveDefenderAttacks * 0.10;
    } else {
      defenderHitsPerHour = (totalAttackerBreakthrough * 0.10) + ((totalEffectiveDefenderAttacks - totalAttackerBreakthrough) * 0.40);
    }

    // 5. Hourly Organization Loss
    // Base damage per hit ~ 0.053
    let defenderOrgLossPerHour = attackerHitsPerHour * 0.053;
    if (attackerUnpiercedBonus) defenderOrgLossPerHour *= 1.40; // +40% org damage dealt
    if (defenderUnpiercedBonus) defenderOrgLossPerHour *= 0.50; // -50% org damage taken

    let attackerOrgLossPerHour = defenderHitsPerHour * 0.053;
    if (attackerUnpiercedBonus) attackerOrgLossPerHour *= 0.50; // -50% org damage taken
    if (airSuperiority === 'defender' && casDamage > 0) {
      attackerOrgLossPerHour += (casDamage * 0.4);
    }

    // 6. Total Organization & Combat Duration
    const totalAttackerOrgPool = attackerStats.organization * attackerStats.divisionCount;
    const totalDefenderOrgPool = defenderStats.organization * defenderStats.divisionCount;

    const hoursUntilDefenderDepleted = defenderOrgLossPerHour > 0 ? totalDefenderOrgPool / defenderOrgLossPerHour : 999;
    const hoursUntilAttackerDepleted = attackerOrgLossPerHour > 0 ? totalAttackerOrgPool / attackerOrgLossPerHour : 999;

    // Victory condition
    const attackerWins = hoursUntilDefenderDepleted < hoursUntilAttackerDepleted;
    const battleDurationHours = Math.round(Math.min(hoursUntilDefenderDepleted, hoursUntilAttackerDepleted));
    const battleDurationDays = (battleDurationHours / 24).toFixed(1);

    // Win Probability estimate
    let winProb = 50;
    if (attackerWins) {
      const ratio = hoursUntilAttackerDepleted / Math.max(1, hoursUntilDefenderDepleted);
      winProb = Math.min(98, Math.round(50 + (ratio * 15)));
    } else {
      const ratio = hoursUntilDefenderDepleted / Math.max(1, hoursUntilAttackerDepleted);
      winProb = Math.max(2, Math.round(50 - (ratio * 15)));
    }

    // Casualties estimation
    const attackerManpowerCasualties = Math.round(battleDurationHours * attackerHitsPerHour * 3.2);
    const defenderManpowerCasualties = Math.round(battleDurationHours * defenderHitsPerHour * 4.8);

    // Tactical Assessment
    let assessmentVerdict: 'DecisiveVictory' | 'TacticalWin' | 'Stalemate' | 'Repulsed' = 'DecisiveVictory';
    let assessmentTitle = '';
    let assessmentNote = '';

    if (attackerWins && winProb >= 80) {
      assessmentVerdict = 'DecisiveVictory';
      assessmentTitle = 'Kemenangan Gemilang (Decisive Victory)';
      assessmentNote = 'Garis pertahanan musuh akan runtuh dalam waktu relatif singkat. Keunggulan Breakthrough dan serangan terkonsentrasi mampu membungkam pertahanan lawan.';
    } else if (attackerWins && winProb < 80) {
      assessmentVerdict = 'TacticalWin';
      assessmentTitle = 'Kemenangan Taktis Berbiaya Tinggi (Pyrrhic Win)';
      assessmentNote = 'Pasukan Anda dapat merebut posisi musuh, namun korban jiwa dan degradasi peralatan akan cukup signifikan akibat atrisi benteng atau medan pertempuran.';
    } else if (!attackerWins && winProb > 30) {
      assessmentVerdict = 'Stalemate';
      assessmentTitle = 'Kebuntuan Atrisi Berdarah (Stalemate / Bogged Down)';
      assessmentNote = 'Serangan tersendat akibat tebalnya pertahanan musuh, penalti medan/benteng, atau kurangnya daya penetrasi. Organisasi kedua belah pihak terkuras habis.';
    } else {
      assessmentVerdict = 'Repulsed';
      assessmentTitle = 'Serangan Dipatahkan (Repulsed with Heavy Casualties)';
      assessmentNote = 'Serbuan gagal total. Divisi penyerang kehabisan organisasi jauh sebelum pertahanan musuh goyah. Diperlukan dukungan udara (CAS), manuver dari arah lain, atau meriam berat.';
    }

    return {
      baseWidth,
      attackerTotalWidth,
      defenderTotalWidth,
      attackerWidthFits,
      defenderWidthFits,
      netAttackerMod: (netAttackerMod * 100).toFixed(0),
      netDefenderMod: (netDefenderMod * 100).toFixed(0),
      attackerPiercesDefender,
      defenderPiercesAttacker,
      attackerUnpiercedBonus,
      defenderUnpiercedBonus,
      totalEffectiveAttackerAttacks: Math.round(totalEffectiveAttackerAttacks),
      totalDefenderDefense: Math.round(totalDefenderDefense),
      totalEffectiveDefenderAttacks: Math.round(totalEffectiveDefenderAttacks),
      totalAttackerBreakthrough: Math.round(totalAttackerBreakthrough),
      defenderOrgLossPerHour: defenderOrgLossPerHour.toFixed(2),
      attackerOrgLossPerHour: attackerOrgLossPerHour.toFixed(2),
      attackerWins,
      battleDurationHours,
      battleDurationDays,
      winProb,
      attackerManpowerCasualties,
      defenderManpowerCasualties,
      assessmentVerdict,
      assessmentTitle,
      assessmentNote
    };
  }, [
    attackerStats, defenderStats, terrain, riverCrossing, fortLevel,
    entrenchment, airSuperiority, casDamage, planningBonus, attackVectors, weather
  ]);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 shadow-xl shadow-black/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Swords className="h-5 w-5 text-[#ef4444]" />
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#f8fafc] tracking-tight">
                Simulasi Tempur &amp; Rencana Pertempuran (Battle Planner)
              </h2>
              <p className="text-xs text-[#94a3b8]">
                Simulasikan pertempuran darat HOI4 secara realistis: adu daya serang divisi penyerang vs pertahanan musuh dengan memperhitungkan medan, benteng, bonus planning, dan dukungan udara.
              </p>
            </div>
          </div>

          <div className="self-start sm:self-center font-mono text-xs flex items-center gap-2 bg-[#0c141d] px-3 py-1.5 rounded-lg border border-[#1e2a38]">
            <span className="text-[#64748b]">Front Tempur:</span>
            <span className="font-bold text-[#f8fafc]">{simulationResults.baseWidth}w Kapasitas Lebar</span>
          </div>
        </div>
      </div>

      {/* VERDICT SUMMARY BANNER */}
      <div className={`rounded-xl border p-4 shadow-xl shadow-black/50 ${
        simulationResults.attackerWins
          ? (simulationResults.winProb >= 80 ? 'border-[#16a34a]/60 bg-gradient-to-r from-[#12281c] to-[#0f1d16]' : 'border-[#ca8a04]/60 bg-gradient-to-r from-[#241d0e] to-[#1a160d]')
          : 'border-[#dc2626]/60 bg-gradient-to-r from-[#2e1215] to-[#1a0f11]'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {simulationResults.attackerWins ? (
                <CheckCircle2 className="h-5 w-5 text-[#4ade80]" />
              ) : (
                <XCircle className="h-5 w-5 text-[#f87171]" />
              )}
              <h3 className={`text-base sm:text-lg font-black tracking-tight ${
                simulationResults.attackerWins
                  ? (simulationResults.winProb >= 80 ? 'text-[#86efac]' : 'text-[#fde047]')
                  : 'text-[#fca5a5]'
              }`}>
                {simulationResults.assessmentTitle}
              </h3>
            </div>
            <p className="text-xs text-[#cbd5e1] max-w-2xl">
              {simulationResults.assessmentNote}
            </p>
          </div>

          {/* Key Simulation Gauges */}
          <div className="flex items-center gap-3 shrink-0 font-mono">
            {/* Win Probability */}
            <div className="text-center rounded-lg bg-[#0c141d]/80 border border-[#223344] p-2.5 min-w-[90px]">
              <div className="text-[10px] text-[#94a3b8] uppercase font-bold">Peluang Menang</div>
              <div className={`text-lg font-black ${
                simulationResults.winProb >= 60 ? 'text-[#4ade80]' : (simulationResults.winProb >= 40 ? 'text-[#fde047]' : 'text-[#f87171]')
              }`}>
                {simulationResults.winProb}%
              </div>
            </div>

            {/* Estimated Battle Duration */}
            <div className="text-center rounded-lg bg-[#0c141d]/80 border border-[#223344] p-2.5 min-w-[90px]">
              <div className="text-[10px] text-[#94a3b8] uppercase font-bold">Durasi Tempur</div>
              <div className="text-lg font-black text-[#f8fafc]">
                {simulationResults.battleDurationHours} <span className="text-xs font-normal text-[#94a3b8]">jam</span>
              </div>
              <div className="text-[10px] text-[#64748b]">~{simulationResults.battleDurationDays} hari</div>
            </div>
          </div>
        </div>

        {/* Tactical Badges Strip */}
        <div className="mt-3 pt-3 border-t border-[#ffffff]/10 flex flex-wrap gap-2 text-[11px] font-mono">
          <span className={`px-2 py-0.5 rounded border ${
            simulationResults.attackerPiercesDefender
              ? 'border-[#16a34a]/40 bg-[#10291d] text-[#86efac]'
              : 'border-[#ef4444]/40 bg-[#2b1216] text-[#fca5a5]'
          }`}>
            Penyerang vs Armor Musuh: {simulationResults.attackerPiercesDefender ? '✓ Tembus' : '✗ Tidak Tembus (Kebal)'}
          </span>

          <span className={`px-2 py-0.5 rounded border ${
            simulationResults.attackerUnpiercedBonus
              ? 'border-[#eab308]/40 bg-[#261d0f] text-[#fde047]'
              : 'border-[#334155] bg-[#0c141d] text-[#94a3b8]'
          }`}>
            Armor Kebal Penyerang: {simulationResults.attackerUnpiercedBonus ? 'Aktif (+40% Org Dmg, -50% Loss)' : 'Tidak Ada'}
          </span>

          <span className="px-2 py-0.5 rounded border border-[#38bdf8]/40 bg-[#0c2438] text-[#7dd3fc]">
            Efektivitas Serangan: {simulationResults.netAttackerMod}%
          </span>

          <span className="px-2 py-0.5 rounded border border-[#10b981]/40 bg-[#0c261b] text-[#86efac]">
            Efektivitas Bertahan: {simulationResults.netDefenderMod}%
          </span>
        </div>
      </div>

      {/* MAIN TWO-COLUMN CONFIGURATOR: ATTACKER (LEFT) vs DEFENDER (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ATTACKER COLUMN */}
        <div className="rounded-xl border border-[#dc2626]/40 bg-[#121924] p-4 space-y-4 shadow-xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-[#2b1c21] pb-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
              <h3 className="font-bold text-sm sm:text-base text-[#f8fafc]">
                Pihak Penyerang (Attacker Side)
              </h3>
            </div>

            {/* Quick Preset Selector */}
            <select
              value={attackerPreset}
              onChange={e => handleLoadAttackerPreset(e.target.value)}
              className="rounded border border-[#334155] bg-[#0c141d] py-1 px-2 text-xs font-semibold text-[#f8fafc] outline-none"
            >
              {DIVISION_PRESETS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Division Count & Width Controls */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <span className="text-[#94a3b8] block">Jumlah Divisi Penyerang:</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={attackerStats.divisionCount}
                  onChange={e => setAttackerStats({ ...attackerStats, divisionCount: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-16 rounded border border-[#334155] bg-[#111923] p-1 text-center font-bold text-[#f8fafc]"
                />
                <span className="text-[#cbd5e1]">Divisi</span>
              </div>
              <div className="text-[10px] text-[#64748b]">
                Total Lebar: {attackerStats.combatWidth * attackerStats.divisionCount}w
              </div>
            </div>

            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <span className="text-[#94a3b8] block">Arah Serangan (Flanks):</span>
              <select
                value={attackVectors}
                onChange={e => setAttackVectors(parseInt(e.target.value))}
                className="w-full rounded border border-[#334155] bg-[#111923] p-1 font-bold text-[#f8fafc] text-xs"
              >
                <option value={1}>1 Arah (Frontal - 80w)</option>
                <option value={2}>2 Arah (Flanking - 120w)</option>
                <option value={3}>3 Arah (Pengepungan - 160w)</option>
              </select>
              <div className="text-[10px] text-[#64748b]">
                Menambah ruang tempur divisi
              </div>
            </div>
          </div>

          {/* Attacker Stat Sliders */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <div className="flex justify-between text-[#cbd5e1]">
                <span>Soft Attack:</span>
                <span className="font-bold text-[#f87171]">{attackerStats.softAttack}</span>
              </div>
              <input
                type="range"
                min={50}
                max={900}
                step={10}
                value={attackerStats.softAttack}
                onChange={e => setAttackerStats({ ...attackerStats, softAttack: parseInt(e.target.value) })}
                className="w-full accent-[#ef4444] cursor-pointer"
              />
            </div>

            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <div className="flex justify-between text-[#cbd5e1]">
                <span>Hard Attack:</span>
                <span className="font-bold text-[#fbbf24]">{attackerStats.hardAttack}</span>
              </div>
              <input
                type="range"
                min={5}
                max={500}
                step={5}
                value={attackerStats.hardAttack}
                onChange={e => setAttackerStats({ ...attackerStats, hardAttack: parseInt(e.target.value) })}
                className="w-full accent-[#f59e0b] cursor-pointer"
              />
            </div>

            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <div className="flex justify-between text-[#cbd5e1]">
                <span>Breakthrough:</span>
                <span className="font-bold text-[#38bdf8]">{attackerStats.breakthrough}</span>
              </div>
              <input
                type="range"
                min={20}
                max={900}
                step={10}
                value={attackerStats.breakthrough}
                onChange={e => setAttackerStats({ ...attackerStats, breakthrough: parseInt(e.target.value) })}
                className="w-full accent-[#38bdf8] cursor-pointer"
              />
            </div>

            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <div className="flex justify-between text-[#cbd5e1]">
                <span>Organization:</span>
                <span className="font-bold text-[#4ade80]">{attackerStats.organization}</span>
              </div>
              <input
                type="range"
                min={15}
                max={85}
                step={1}
                value={attackerStats.organization}
                onChange={e => setAttackerStats({ ...attackerStats, organization: parseInt(e.target.value) })}
                className="w-full accent-[#22c55e] cursor-pointer"
              />
            </div>

            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <div className="flex justify-between text-[#cbd5e1]">
                <span>Armor Rating:</span>
                <span className="font-bold text-[#c084fc]">{attackerStats.armor}</span>
              </div>
              <input
                type="range"
                min={0}
                max={150}
                step={5}
                value={attackerStats.armor}
                onChange={e => setAttackerStats({ ...attackerStats, armor: parseInt(e.target.value) })}
                className="w-full accent-[#a855f7] cursor-pointer"
              />
            </div>

            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <div className="flex justify-between text-[#cbd5e1]">
                <span>Piercing:</span>
                <span className="font-bold text-[#f43f5e]">{attackerStats.piercing}</span>
              </div>
              <input
                type="range"
                min={5}
                max={180}
                step={5}
                value={attackerStats.piercing}
                onChange={e => setAttackerStats({ ...attackerStats, piercing: parseInt(e.target.value) })}
                className="w-full accent-[#e11d48] cursor-pointer"
              />
            </div>
          </div>

          {/* Attacker Combat Roll Stats Summary */}
          <div className="p-3 rounded-lg border border-[#1e2a38] bg-[#0c141d] text-xs font-mono space-y-1">
            <div className="flex justify-between text-[#94a3b8]">
              <span>Total Serangan Efektif Masuk:</span>
              <span className="font-bold text-[#f8fafc]">{simulationResults.totalEffectiveAttackerAttacks} serangan/jam</span>
            </div>
            <div className="flex justify-between text-[#94a3b8]">
              <span>Kerusakan Org yang Diderita:</span>
              <span className="font-bold text-[#f87171]">~{simulationResults.attackerOrgLossPerHour} org/jam</span>
            </div>
            <div className="flex justify-between text-[#94a3b8]">
              <span>Estimasi Korban Pasukan:</span>
              <span className="font-bold text-[#cbd5e1]">~{simulationResults.attackerManpowerCasualties.toLocaleString()} prajurit</span>
            </div>
          </div>
        </div>

        {/* DEFENDER COLUMN */}
        <div className="rounded-xl border border-[#3b82f6]/40 bg-[#121924] p-4 space-y-4 shadow-xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-[#1a283b] pb-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#3b82f6]" />
              <h3 className="font-bold text-sm sm:text-base text-[#f8fafc]">
                Pihak Bertahan (Defender Side)
              </h3>
            </div>

            {/* Quick Preset Selector */}
            <select
              value={defenderPreset}
              onChange={e => handleLoadDefenderPreset(e.target.value)}
              className="rounded border border-[#334155] bg-[#0c141d] py-1 px-2 text-xs font-semibold text-[#f8fafc] outline-none"
            >
              {DIVISION_PRESETS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Defender Count & Entrenchment */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <span className="text-[#94a3b8] block">Jumlah Divisi Bertahan:</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={defenderStats.divisionCount}
                  onChange={e => setDefenderStats({ ...defenderStats, divisionCount: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-16 rounded border border-[#334155] bg-[#111923] p-1 text-center font-bold text-[#f8fafc]"
                />
                <span className="text-[#cbd5e1]">Divisi</span>
              </div>
              <div className="text-[10px] text-[#64748b]">
                Total Lebar: {defenderStats.combatWidth * defenderStats.divisionCount}w
              </div>
            </div>

            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <div className="flex justify-between text-[#cbd5e1]">
                <span>Poin Entrenchment (Gali Parit):</span>
                <span className="font-bold text-[#38bdf8]">{entrenchment}</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={entrenchment}
                onChange={e => setEntrenchment(parseInt(e.target.value))}
                className="w-full accent-[#38bdf8] cursor-pointer"
              />
              <div className="text-[10px] text-[#64748b]">
                Bonus Pertahanan: +{(entrenchment * 2)}%
              </div>
            </div>
          </div>

          {/* Defender Stat Sliders */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <div className="flex justify-between text-[#cbd5e1]">
                <span>Defense (Ketahanan):</span>
                <span className="font-bold text-[#38bdf8]">{defenderStats.defense}</span>
              </div>
              <input
                type="range"
                min={80}
                max={950}
                step={10}
                value={defenderStats.defense}
                onChange={e => setDefenderStats({ ...defenderStats, defense: parseInt(e.target.value) })}
                className="w-full accent-[#38bdf8] cursor-pointer"
              />
            </div>

            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <div className="flex justify-between text-[#cbd5e1]">
                <span>Soft Attack:</span>
                <span className="font-bold text-[#f87171]">{defenderStats.softAttack}</span>
              </div>
              <input
                type="range"
                min={20}
                max={600}
                step={10}
                value={defenderStats.softAttack}
                onChange={e => setDefenderStats({ ...defenderStats, softAttack: parseInt(e.target.value) })}
                className="w-full accent-[#ef4444] cursor-pointer"
              />
            </div>

            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <div className="flex justify-between text-[#cbd5e1]">
                <span>Organization:</span>
                <span className="font-bold text-[#4ade80]">{defenderStats.organization}</span>
              </div>
              <input
                type="range"
                min={15}
                max={85}
                step={1}
                value={defenderStats.organization}
                onChange={e => setDefenderStats({ ...defenderStats, organization: parseInt(e.target.value) })}
                className="w-full accent-[#22c55e] cursor-pointer"
              />
            </div>

            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <div className="flex justify-between text-[#cbd5e1]">
                <span>Piercing:</span>
                <span className="font-bold text-[#f43f5e]">{defenderStats.piercing}</span>
              </div>
              <input
                type="range"
                min={5}
                max={180}
                step={5}
                value={defenderStats.piercing}
                onChange={e => setDefenderStats({ ...defenderStats, piercing: parseInt(e.target.value) })}
                className="w-full accent-[#e11d48] cursor-pointer"
              />
            </div>

            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <div className="flex justify-between text-[#cbd5e1]">
                <span>Hard Attack:</span>
                <span className="font-bold text-[#fbbf24]">{defenderStats.hardAttack}</span>
              </div>
              <input
                type="range"
                min={5}
                max={400}
                step={5}
                value={defenderStats.hardAttack}
                onChange={e => setDefenderStats({ ...defenderStats, hardAttack: parseInt(e.target.value) })}
                className="w-full accent-[#f59e0b] cursor-pointer"
              />
            </div>

            <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
              <div className="flex justify-between text-[#cbd5e1]">
                <span>Armor:</span>
                <span className="font-bold text-[#c084fc]">{defenderStats.armor}</span>
              </div>
              <input
                type="range"
                min={0}
                max={150}
                step={5}
                value={defenderStats.armor}
                onChange={e => setDefenderStats({ ...defenderStats, armor: parseInt(e.target.value) })}
                className="w-full accent-[#a855f7] cursor-pointer"
              />
            </div>
          </div>

          {/* Defender Combat Roll Stats Summary */}
          <div className="p-3 rounded-lg border border-[#1e2a38] bg-[#0c141d] text-xs font-mono space-y-1">
            <div className="flex justify-between text-[#94a3b8]">
              <span>Total Poin Pertahanan (Defense):</span>
              <span className="font-bold text-[#38bdf8]">{simulationResults.totalDefenderDefense} poin</span>
            </div>
            <div className="flex justify-between text-[#94a3b8]">
              <span>Kerusakan Org yang Diderita:</span>
              <span className="font-bold text-[#f87171]">~{simulationResults.defenderOrgLossPerHour} org/jam</span>
            </div>
            <div className="flex justify-between text-[#94a3b8]">
              <span>Estimasi Korban Pasukan:</span>
              <span className="font-bold text-[#cbd5e1]">~{simulationResults.defenderManpowerCasualties.toLocaleString()} prajurit</span>
            </div>
          </div>
        </div>
      </div>

      {/* OPERATIONAL & ENVIRONMENTAL MODIFIERS PANEL */}
      <div className="rounded-xl border border-[#223344] bg-[#111923] p-4 space-y-4 shadow-xl shadow-black/40">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748b] flex items-center gap-1.5">
          <Sliders className="h-4 w-4 text-[#fbbf24]" />
          Faktor Medan Tempur, Benteng &amp; Dukungan Udara
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
          {/* Terrain */}
          <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
            <span className="text-[#94a3b8] block">Jenis Medan:</span>
            <select
              value={terrain}
              onChange={e => setTerrain(e.target.value as any)}
              className="w-full rounded border border-[#334155] bg-[#111923] p-1 font-bold text-[#f8fafc] text-xs"
            >
              <option value="plains">Plains (Dataran 0%)</option>
              <option value="forest">Forest (Hutan -20%)</option>
              <option value="hills">Hills (Bukit -30%)</option>
              <option value="mountain">Mountain (Gunung -50%)</option>
              <option value="urban">Urban (Kota -30%)</option>
              <option value="marsh">Marsh (Rawa -40%)</option>
            </select>
          </div>

          {/* River Crossing */}
          <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
            <span className="text-[#94a3b8] block">Menyeberang Sungai:</span>
            <select
              value={riverCrossing}
              onChange={e => setRiverCrossing(e.target.value as any)}
              className="w-full rounded border border-[#334155] bg-[#111923] p-1 font-bold text-[#f8fafc] text-xs"
            >
              <option value="none">Tidak Ada (0%)</option>
              <option value="small">Sungai Kecil (-30%)</option>
              <option value="large">Sungai Besar / Selat (-60%)</option>
            </select>
          </div>

          {/* Fort / Bunker Level */}
          <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
            <div className="flex justify-between text-[#cbd5e1]">
              <span>Level Benteng:</span>
              <span className="font-bold text-[#ef4444]">Lvl {fortLevel}</span>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={fortLevel}
              onChange={e => setFortLevel(parseInt(e.target.value))}
              className="w-full accent-[#ef4444] cursor-pointer"
            />
            <div className="text-[10px] text-[#64748b]">
              Penalti Serang: -{Math.min(99, fortLevel * 15)}%
            </div>
          </div>

          {/* Air Superiority */}
          <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
            <span className="text-[#94a3b8] block">Keunggulan Udara:</span>
            <select
              value={airSuperiority}
              onChange={e => setAirSuperiority(e.target.value as any)}
              className="w-full rounded border border-[#334155] bg-[#111923] p-1 font-bold text-[#f8fafc] text-xs"
            >
              <option value="attacker">Dominasi Penyerang (+15%)</option>
              <option value="none">Berimbang / Tidak Ada (0%)</option>
              <option value="defender">Dominasi Bertahan (-20%)</option>
            </select>
          </div>

          {/* CAS Ground Support */}
          <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
            <div className="flex justify-between text-[#cbd5e1]">
              <span>Dukungan CAS:</span>
              <span className="font-bold text-[#fde047]">{casDamage} Dmg</span>
            </div>
            <input
              type="range"
              min={0}
              max={80}
              step={5}
              value={casDamage}
              onChange={e => setCasDamage(parseInt(e.target.value))}
              className="w-full accent-[#eab308] cursor-pointer"
            />
            <div className="text-[10px] text-[#64748b]">
              Bomber Udara Takstis
            </div>
          </div>

          {/* Planning Bonus */}
          <div className="rounded-lg border border-[#1e2a38] bg-[#0c141d] p-2.5 space-y-1">
            <div className="flex justify-between text-[#cbd5e1]">
              <span>Planning Bonus:</span>
              <span className="font-bold text-[#4ade80]">+{planningBonus}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              step={5}
              value={planningBonus}
              onChange={e => setPlanningBonus(parseInt(e.target.value))}
              className="w-full accent-[#22c55e] cursor-pointer"
            />
            <div className="text-[10px] text-[#64748b]">
              Rencana Serangan Staf
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
