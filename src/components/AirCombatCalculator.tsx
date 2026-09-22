import React, { useState, useMemo } from 'react';
import {
  Plane, Wind, Crosshair, Shield, Zap, Target, Sliders,
  RotateCcw, Info, BarChart3, AlertTriangle, CheckCircle2,
  TrendingUp, Compass, Flame, ArrowUpRight
} from 'lucide-react';

export interface AirWingPreset {
  id: string;
  name: string;
  category: 'fighter' | 'cas' | 'heavy_fighter' | 'tac_bomber' | 'strat_bomber';
  defaultCount: number;
  icCost: number;
  airAttack: number;
  airDefense: number;
  agility: number;
  maxSpeed: number;
  operationalRangeKm: number;
  casGroundAttacks: number;
  stratBombing: number;
  navalStrike: number;
  airSuperiorityScore: number;
  description: string;
}

export const AIR_PRESETS: AirWingPreset[] = [
  {
    id: 'meta_fighter_1940',
    name: '1940 Meta Fighter (Bf 109 / Spitfire / Zero)',
    category: 'fighter',
    defaultCount: 600,
    icCost: 48,
    airAttack: 42,
    airDefense: 22,
    agility: 68,
    maxSpeed: 640,
    operationalRangeKm: 950,
    casGroundAttacks: 0,
    stratBombing: 0,
    navalStrike: 0,
    airSuperiorityScore: 1.0,
    description: 'Raja supremasi udara. 3x Heavy Machine Guns, Self-Sealing Fuel Tanks, Single Engine III, dan Drop Tanks.'
  },
  {
    id: 'meta_cas_1940',
    name: '1940 Meta CAS (Stuka / Il-2 Sturmovik)',
    category: 'cas',
    defaultCount: 400,
    icCost: 42,
    airAttack: 12,
    airDefense: 18,
    agility: 38,
    maxSpeed: 480,
    operationalRangeKm: 750,
    casGroundAttacks: 36,
    stratBombing: 0,
    navalStrike: 10,
    airSuperiorityScore: 0.1,
    description: 'Penghancur divisi darat. Dilengkapi Bomb Locks ganda, meriam kanon anti-tank, dan lapis baja pilot.'
  },
  {
    id: 'heavy_fighter_1940',
    name: '1940 Heavy Fighter (Bf 110 / P-38 Lightning)',
    category: 'heavy_fighter',
    defaultCount: 200,
    icCost: 72,
    airAttack: 56,
    airDefense: 32,
    agility: 44,
    maxSpeed: 620,
    operationalRangeKm: 1800,
    casGroundAttacks: 0,
    stratBombing: 0,
    navalStrike: 0,
    airSuperiorityScore: 1.25,
    description: 'Pesawat tempur bermesin ganda dengan jangkauan jelajah sangat jauh untuk menembus zona udara luas (Rusia/Pasifik).'
  },
  {
    id: 'tactical_bomber_1940',
    name: '1940 Tactical Bomber (Ju 88 / B-25 Mitchell)',
    category: 'tac_bomber',
    defaultCount: 150,
    icCost: 65,
    airAttack: 16,
    airDefense: 24,
    agility: 32,
    maxSpeed: 490,
    operationalRangeKm: 1600,
    casGroundAttacks: 22,
    stratBombing: 18,
    navalStrike: 12,
    airSuperiorityScore: 0.2,
    description: 'Serbaguna fleksibel: dapat menjalankan misi CAS darat sekaligus pemboman infrastruktur rel musuh.'
  },
  {
    id: 'strategic_bomber_1940',
    name: '1940 Strategic Bomber (B-17 Flying Fortress / Lancaster)',
    category: 'strat_bomber',
    defaultCount: 100,
    icCost: 110,
    airAttack: 22,
    airDefense: 45,
    agility: 18,
    maxSpeed: 420,
    operationalRangeKm: 2600,
    casGroundAttacks: 0,
    stratBombing: 58,
    navalStrike: 0,
    airSuperiorityScore: 0.05,
    description: 'Menghancurkan pabrik, rel kereta, dan benteng musuh dari ketinggian ekstrim di atas jangkauan flak darat.'
  }
];

export const AirCombatCalculator: React.FC = () => {
  // Player air deployment
  const [playerFighterCount, setPlayerFighterCount] = useState<number>(600);
  const [playerCasCount, setPlayerCasCount] = useState<number>(400);
  const [playerFighterAttack, setPlayerFighterAttack] = useState<number>(42);
  const [playerFighterDefense, setPlayerFighterDefense] = useState<number>(22);
  const [playerFighterAgility, setPlayerFighterAgility] = useState<number>(68);
  const [playerFighterSpeed, setPlayerFighterSpeed] = useState<number>(640);
  const [playerFighterRange, setPlayerFighterRange] = useState<number>(950);

  const [playerCasGroundAttack, setPlayerCasGroundAttack] = useState<number>(36);
  const [playerCasDefense, setPlayerCasDefense] = useState<number>(18);
  const [playerCasRange, setPlayerCasRange] = useState<number>(750);

  // Air Zone conditions
  const [airZoneDistanceKm, setAirZoneDistanceKm] = useState<number>(600);
  const [airZoneWeather, setAirZoneWeather] = useState<'clear' | 'bad_weather' | 'night'>('clear');
  const [enemyStateAirFlak, setEnemyStateAirFlak] = useState<number>(2); // 0 to 5 level anti-air

  // Enemy air deployment
  const [enemyFighterCount, setEnemyFighterCount] = useState<number>(500);
  const [enemyFighterAttack, setEnemyFighterAttack] = useState<number>(34);
  const [enemyFighterDefense, setEnemyFighterDefense] = useState<number>(18);
  const [enemyFighterAgility, setEnemyFighterAgility] = useState<number>(55);
  const [enemyFighterSpeed, setEnemyFighterSpeed] = useState<number>(580);
  const [enemyFighterRange, setEnemyFighterRange] = useState<number>(850);
  const [enemyCasCount, setEnemyCasCount] = useState<number>(200);

  // Computed Air Combat calculations based on HOI4 Air Warfare Formulas
  const airResults = useMemo(() => {
    // 1. Mission Coverage % based on Operational Range vs Distance to Air Zone Center
    // If range < distance, severe penalty; 100% when range >= distance * 1.2
    const playerCoveragePercent = Math.min(100, Math.max(10, Math.round((playerFighterRange / Math.max(1, airZoneDistanceKm)) * 85)));
    const enemyCoveragePercent = Math.min(100, Math.max(10, Math.round((enemyFighterRange / Math.max(1, airZoneDistanceKm)) * 85)));

    // 2. Weather Penalty
    let weatherModifier = 1.0;
    if (airZoneWeather === 'bad_weather') weatherModifier = 0.65; // -35% sorties & detection
    if (airZoneWeather === 'night') weatherModifier = 0.50; // -50% sorties without night vision

    // 3. Air Superiority Points
    // HOI4 formula: 1 point per active fighter * mission coverage * weather
    const playerSuperiorityRaw = (playerFighterCount * 1.0 + playerCasCount * 0.1) * (playerCoveragePercent / 100) * weatherModifier;
    const enemySuperiorityRaw = (enemyFighterCount * 1.0 + enemyCasCount * 0.1) * (enemyCoveragePercent / 100) * weatherModifier;
    const totalSup = playerSuperiorityRaw + enemySuperiorityRaw;

    const playerAirSuperiorityPct = totalSup > 0 ? Math.round((playerSuperiorityRaw / totalSup) * 100) : 50;
    const enemyAirSuperiorityPct = 100 - playerAirSuperiorityPct;

    // Ground division bonus from Air Superiority: up to +35% combat stats and -35% enemy defense/breakthrough
    const groundDivisionBonusPct = Math.round((playerAirSuperiorityPct - 50) * 0.7);

    // 4. Air-to-Air Combat Exchange Ratio (Fighter Dogfights)
    // Relative Agility determines hit chance bonus:
    // If player agility > enemy agility: bonus damage = (playerAgil / enemyAgil - 1) * 45% (capped at 45%)
    const agilityRatio = playerFighterAgility / Math.max(1, enemyFighterAgility);
    const playerAgilityBonus = Math.min(0.45, Math.max(-0.45, (agilityRatio - 1) * 0.5));

    // Speed gives positioning / disengagement bonus
    const speedRatio = playerFighterSpeed / Math.max(1, enemyFighterSpeed);
    const speedBonus = Math.min(0.25, Math.max(-0.25, (speedRatio - 1) * 0.3));

    // Effective attack calculation
    const playerEffectiveAttack = playerFighterAttack * (1 + playerAgilityBonus + speedBonus);
    const enemyEffectiveAttack = enemyFighterAttack * (1 - playerAgilityBonus - speedBonus);

    // Estimated daily losses (in standard HOI4 24h air cycle)
    const baseDailyLossRate = 0.025; // 2.5% daily clash rate
    const playerDailyFighterLosses = Math.max(1, Math.round(
      playerFighterCount * baseDailyLossRate * (enemyEffectiveAttack / Math.max(1, playerFighterDefense)) * (enemyCoveragePercent / 100)
    ));
    const enemyDailyFighterLosses = Math.max(1, Math.round(
      enemyFighterCount * baseDailyLossRate * (playerEffectiveAttack / Math.max(1, enemyFighterDefense)) * (playerCoveragePercent / 100)
    ));

    const airExchangeRatio = Number((enemyDailyFighterLosses / Math.max(1, playerDailyFighterLosses)).toFixed(2));

    // 5. CAS Ground Support Efficiency
    // CAS sorties are protected or intercepted based on Air Superiority
    const interceptionFactor = Math.max(0.1, 1 - (playerAirSuperiorityPct / 100));
    const enemyInterceptionLossesDaily = Math.round(playerCasCount * 0.04 * interceptionFactor);

    // State Flak reduces CAS mission efficiency and shoots down bombers
    const flakDamageReduction = Math.min(0.50, enemyStateAirFlak * 0.10); // 10% per flak level
    const flakCasLossesDaily = Math.round(playerCasCount * (enemyStateAirFlak * 0.015));

    // Total CAS damage delivered to enemy ground divisions (Organization and Strength HP)
    const effectiveCasCount = Math.max(0, playerCasCount - enemyInterceptionLossesDaily - flakCasLossesDaily);
    const totalDailyCasOrgDamage = Math.round(effectiveCasCount * (playerCasGroundAttack * 0.05) * (1 - flakDamageReduction) * weatherModifier);
    const totalDailyCasStrengthDamage = Math.round(totalDailyCasOrgDamage * 0.4);

    return {
      playerCoveragePercent,
      enemyCoveragePercent,
      playerAirSuperiorityPct,
      enemyAirSuperiorityPct,
      groundDivisionBonusPct,
      playerDailyFighterLosses,
      enemyDailyFighterLosses,
      airExchangeRatio,
      enemyInterceptionLossesDaily,
      flakCasLossesDaily,
      totalDailyCasLosses: enemyInterceptionLossesDaily + flakCasLossesDaily,
      totalDailyCasOrgDamage,
      totalDailyCasStrengthDamage
    };
  }, [
    playerFighterCount, playerCasCount, playerFighterAttack, playerFighterDefense,
    playerFighterAgility, playerFighterSpeed, playerFighterRange,
    playerCasGroundAttack, playerCasDefense, playerCasRange,
    airZoneDistanceKm, airZoneWeather, enemyStateAirFlak,
    enemyFighterCount, enemyFighterAttack, enemyFighterDefense,
    enemyFighterAgility, enemyFighterSpeed, enemyFighterRange, enemyCasCount
  ]);

  return (
    <div className="space-y-6 text-[#f1f5f9]">
      {/* Header Banner */}
      <div className="rounded-xl border border-amber-500/40 bg-gradient-to-r from-[#21160a] via-[#1a1208] to-[#120c06] p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shadow-inner">
              <Plane className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#fef3c7] uppercase">
                  Kalkulator Sayap Tempur Udara &amp; CAS (Air Combat Calculator)
                </h2>
                <span className="rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[11px] font-mono text-amber-300 font-bold">
                  SIMULASI FORMULA AIR SUPERIORITY HOI4
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#cbd5e1] mt-0.5">
                Hitung keunggulan udara (Air Superiority), pertukaran kerugian dogfight (Air Exchange Ratio), jangkauan jelajah (Range Coverage), serta efisiensi serangan CAS ke divisi darat.
              </p>
            </div>
          </div>

          {/* Quick Presets Bar */}
          <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
            <span className="text-[#94a3b8]">Preset Desain:</span>
            <button
              onClick={() => {
                setPlayerFighterAttack(42);
                setPlayerFighterDefense(22);
                setPlayerFighterAgility(68);
                setPlayerFighterSpeed(640);
                setPlayerFighterRange(950);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-[#2b1e10] border border-[#3d2b17] text-amber-300 hover:text-white"
            >
              Fighter Meta 1940
            </button>
            <button
              onClick={() => {
                setPlayerFighterAttack(56);
                setPlayerFighterDefense(32);
                setPlayerFighterAgility(44);
                setPlayerFighterSpeed(620);
                setPlayerFighterRange(1800);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-[#2b1e10] border border-[#3d2b17] text-amber-300 hover:text-white"
            >
              Heavy Fighter Jarak Jauh
            </button>
          </div>
        </div>
      </div>

      {/* Air Superiority Score Big Bar */}
      <div className="p-4 rounded-xl border border-[#2e2112] bg-[#140e08] shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-sky-400" />
              <h4 className="font-serif text-base font-bold text-[#fef3c7]">
                Keunggulan Udara Zona (Air Superiority): {airResults.playerAirSuperiorityPct}% vs {airResults.enemyAirSuperiorityPct}%
              </h4>
            </div>
            <p className="text-xs text-[#cbd5e1] mt-1">
              Dampak ke Divisi Darat: <strong className={airResults.groundDivisionBonusPct >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                {airResults.groundDivisionBonusPct >= 0 ? `+${airResults.groundDivisionBonusPct}% Bonus Serangan Kawan & Debuff Musuh` : `${airResults.groundDivisionBonusPct}% Penalti Pertahanan`}
              </strong> (Maksimal +/- 35% di HOI4).
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-[#94a3b8] block text-[10px]">Rasio Tukar Pesawat</span>
              <span className="text-base font-bold text-amber-400">
                {airResults.airExchangeRatio} : 1 ({airResults.airExchangeRatio >= 1.5 ? 'Sangat Unggul' : 'Seimbang'})
              </span>
            </div>
          </div>
        </div>

        {/* Dual Progress Meter Bar */}
        <div className="w-full h-3 bg-[#26190e] rounded-full overflow-hidden border border-[#3d2917] mt-3 flex">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300"
            style={{ width: `${airResults.playerAirSuperiorityPct}%` }}
          />
          <div
            className="h-full bg-gradient-to-r from-red-500 to-red-700 transition-all duration-300"
            style={{ width: `${airResults.enemyAirSuperiorityPct}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-[#94a3b8] mt-1">
          <span>Kawan ({playerFighterCount} Fighter, {playerCasCount} CAS)</span>
          <span>Musuh ({enemyFighterCount} Fighter, {enemyCasCount} CAS)</span>
        </div>
      </div>

      {/* Main 2-Column Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= COLUMN 1: PLAYER AIR FORCE CONFIG ================= */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-xl border border-[#2e2112] bg-[#140e08] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#24180d] pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-5 w-5 text-amber-400" />
                <h3 className="font-serif text-base font-bold text-[#fef3c7]">
                  Statistik &amp; Jumlah Pesawat Pemain
                </h3>
              </div>
            </div>

            {/* Wing Size Inputs */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#1c130b] border border-[#2e2012]">
                <span className="text-[#94a3b8] block text-[10px]">Jumlah Sayap Tempur Fighter</span>
                <input
                  type="number"
                  step="50"
                  value={playerFighterCount}
                  onChange={(e) => setPlayerFighterCount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-transparent font-bold text-base text-amber-300 outline-none mt-1"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#1c130b] border border-[#2e2012]">
                <span className="text-[#94a3b8] block text-[10px]">Jumlah Sayap Tempur CAS</span>
                <input
                  type="number"
                  step="50"
                  value={playerCasCount}
                  onChange={(e) => setPlayerCasCount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-transparent font-bold text-base text-emerald-300 outline-none mt-1"
                />
              </div>
            </div>

            {/* Detailed Fighter Specs */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold text-amber-200 uppercase tracking-wider">
                Desain Sayap Tempur (Fighter Airframe Specs)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#1c130b] border border-[#2e2012]">
                  <span className="text-[10px] text-[#94a3b8] block">Air Attack (Kanon)</span>
                  <input
                    type="number"
                    value={playerFighterAttack}
                    onChange={(e) => setPlayerFighterAttack(parseInt(e.target.value) || 0)}
                    className="w-full bg-transparent font-bold text-red-400 outline-none"
                  />
                </div>
                <div className="p-2.5 rounded bg-[#1c130b] border border-[#2e2012]">
                  <span className="text-[10px] text-[#94a3b8] block">Air Defense (Armor)</span>
                  <input
                    type="number"
                    value={playerFighterDefense}
                    onChange={(e) => setPlayerFighterDefense(parseInt(e.target.value) || 0)}
                    className="w-full bg-transparent font-bold text-sky-400 outline-none"
                  />
                </div>
                <div className="p-2.5 rounded bg-[#1c130b] border border-[#2e2012]">
                  <span className="text-[10px] text-[#94a3b8] block">Agilitas (Kelincahan)</span>
                  <input
                    type="number"
                    value={playerFighterAgility}
                    onChange={(e) => setPlayerFighterAgility(parseInt(e.target.value) || 0)}
                    className="w-full bg-transparent font-bold text-emerald-400 outline-none"
                  />
                </div>
                <div className="p-2.5 rounded bg-[#1c130b] border border-[#2e2012]">
                  <span className="text-[10px] text-[#94a3b8] block">Kecepatan Maks (km/h)</span>
                  <input
                    type="number"
                    value={playerFighterSpeed}
                    onChange={(e) => setPlayerFighterSpeed(parseInt(e.target.value) || 0)}
                    className="w-full bg-transparent font-bold text-cyan-400 outline-none"
                  />
                </div>
                <div className="p-2.5 rounded bg-[#1c130b] border border-[#2e2012]">
                  <span className="text-[10px] text-[#94a3b8] block">Jangkauan Jelajah (km)</span>
                  <input
                    type="number"
                    value={playerFighterRange}
                    onChange={(e) => setPlayerFighterRange(parseInt(e.target.value) || 0)}
                    className="w-full bg-transparent font-bold text-purple-400 outline-none"
                  />
                </div>
                <div className="p-2.5 rounded bg-[#1c130b] border border-[#2e2012]">
                  <span className="text-[10px] text-[#94a3b8] block">CAS Ground Attack</span>
                  <input
                    type="number"
                    value={playerCasGroundAttack}
                    onChange={(e) => setPlayerCasGroundAttack(parseInt(e.target.value) || 0)}
                    className="w-full bg-transparent font-bold text-amber-400 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Air Zone & Operational Environment */}
            <div className="space-y-3 pt-3 border-t border-[#24180d]">
              <h4 className="text-xs font-mono font-bold text-amber-200 uppercase tracking-wider">
                Kondisi Wilayah Udara (Air Zone Environment)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#1c130b] border border-[#2e2012]">
                  <span className="text-[10px] text-[#94a3b8] block">Jarak Pangkalan ke Zona</span>
                  <div className="flex items-center gap-1 mt-1">
                    <input
                      type="number"
                      value={airZoneDistanceKm}
                      onChange={(e) => setAirZoneDistanceKm(parseInt(e.target.value) || 0)}
                      className="w-20 bg-transparent font-bold text-white outline-none"
                    />
                    <span className="text-[10px] text-[#94a3b8]">km</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#1c130b] border border-[#2e2012]">
                  <span className="text-[10px] text-[#94a3b8] block">Cuaca Wilayah Udara</span>
                  <select
                    value={airZoneWeather}
                    onChange={(e) => setAirZoneWeather(e.target.value as any)}
                    className="w-full bg-transparent text-white font-bold outline-none mt-1"
                  >
                    <option value="clear" className="bg-[#1c130b]">Cerah (Clear)</option>
                    <option value="bad_weather" className="bg-[#1c130b]">Hujan Badai (-35%)</option>
                    <option value="night" className="bg-[#1c130b]">Malam Hari (-50%)</option>
                  </select>
                </div>

                <div className="p-2.5 rounded bg-[#1c130b] border border-[#2e2012]">
                  <span className="text-[10px] text-[#94a3b8] block">State Anti-Air Flak Musuh</span>
                  <select
                    value={enemyStateAirFlak}
                    onChange={(e) => setEnemyStateAirFlak(parseInt(e.target.value) || 0)}
                    className="w-full bg-transparent text-white font-bold outline-none mt-1"
                  >
                    <option value={0} className="bg-[#1c130b]">Level 0 (Tanpa Flak)</option>
                    <option value={2} className="bg-[#1c130b]">Level 2 (Flak Sedang)</option>
                    <option value={5} className="bg-[#1c130b]">Level 5 (Flak Maksimal)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= COLUMN 2: SIMULATED AIR COMBAT RESULTS ================= */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-[#2e2112] bg-[#140e08] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#24180d] pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-amber-400" />
                <h3 className="font-serif text-base font-bold text-[#fef3c7]">
                  Hasil Pertempuran Harian (Daily Sorties)
                </h3>
              </div>
            </div>

            {/* Daily Losses & Exchange */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#1c130b] border border-[#2e2012]">
                <span className="text-[#94a3b8] block text-[10px]">Kerugian Fighter Kawan</span>
                <span className="text-base font-bold text-emerald-400 mt-0.5 block">
                  ~{airResults.playerDailyFighterLosses} Pesawat / Hari
                </span>
                <span className="text-[10px] text-[#94a3b8]">Jangkauan: {airResults.playerCoveragePercent}%</span>
              </div>

              <div className="p-3 rounded-lg bg-[#1c130b] border border-[#2e2012]">
                <span className="text-[#94a3b8] block text-[10px]">Fighter Musuh Tertembak</span>
                <span className="text-base font-bold text-red-400 mt-0.5 block">
                  ~{airResults.enemyDailyFighterLosses} Pesawat / Hari
                </span>
                <span className="text-[10px] text-[#94a3b8]">Jangkauan: {airResults.enemyCoveragePercent}%</span>
              </div>
            </div>

            {/* CAS Impact on Ground Battles */}
            <div className="p-3.5 rounded-xl bg-[#1c130b] border border-[#2e2012] space-y-2 text-xs font-mono">
              <h4 className="font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 text-xs">
                <Target className="h-4 w-4 text-emerald-400" /> Dampak Serangan Darat CAS
              </h4>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between p-2 rounded bg-[#100b05] border border-[#261a0d]">
                  <span className="text-[#94a3b8]">Kerusakan Organisasi Musuh / Hari:</span>
                  <strong className="text-amber-300">-{airResults.totalDailyCasOrgDamage} Org</strong>
                </div>
                <div className="flex justify-between p-2 rounded bg-[#100b05] border border-[#261a0d]">
                  <span className="text-[#94a3b8]">Kerusakan Kekuatan (HP) Musuh:</span>
                  <strong className="text-red-400">-{airResults.totalDailyCasStrengthDamage} HP</strong>
                </div>
                <div className="flex justify-between p-2 rounded bg-[#100b05] border border-[#261a0d]">
                  <span className="text-[#94a3b8]">CAS Kawan Gugur (Intersepsi + Flak):</span>
                  <strong className="text-[#cbd5e1]">{airResults.totalDailyCasLosses} CAS/hari</strong>
                </div>
              </div>
            </div>

            {/* HOI4 Air Meta Guidelines */}
            <div className="p-3 rounded-lg bg-[#1c130b] border border-[#2e2012] text-xs space-y-1.5">
              <span className="font-bold text-amber-300 flex items-center gap-1 text-[11px] font-mono uppercase">
                <Info className="h-3.5 w-3.5 text-amber-400" /> HOI4 Air Meta Golden Rules:
              </span>
              <ul className="text-[11px] text-[#cbd5e1] space-y-1 list-disc list-inside">
                <li><strong>Heavy Machine Guns &gt; Cannons</strong>: HMG memberikan damage serangan udara tertinggi per IC tanpa penalti kelincahan/agility.</li>
                <li><strong>Range Coverage Wajib 100%</strong>: Jika jangkauan pesawat lebih pendek dari jarak pangkalan, seluruh efisiensi misi dan air superiority berkurang drastis proporsional.</li>
                <li><strong>CAS Menghiraukan Terrain</strong>: Kerusakan CAS masuk langsung ke divisi musuh tanpa terpengaruh penalti gunung atau sungai.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
