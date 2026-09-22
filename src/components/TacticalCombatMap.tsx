import React, { useState, useEffect, useMemo } from 'react';
import {
  Swords, Shield, Navigation, Crosshair, Sparkles, Plane,
  Flame, Mountain, CloudRain, RotateCcw, Play, Pause,
  Layers, Eye, Target, AlertTriangle, CheckCircle2, Skull,
  Compass, ArrowRight, ShieldAlert, Zap
} from 'lucide-react';
import { DivisionCombatStats, CombatEnvironment } from './CombatCalculator';

interface TacticalCombatMapProps {
  playerStats: DivisionCombatStats;
  enemyStats: DivisionCombatStats;
  playerStance: 'attacker' | 'defender';
  env: CombatEnvironment;
  liveHour: number;
  maxHours: number;
  isSimulating: boolean;
  winRate: number;
  playerWon: boolean;
  livePlayerOrg: number;
  liveEnemyOrg: number;
  livePlayerHP: number;
  liveEnemyHP: number;
  onSelectTerrain?: (terrain: 'plains' | 'forest' | 'hills' | 'mountain' | 'urban' | 'marsh') => void;
  onToggleSim?: () => void;
  onResetSim?: () => void;
}

export const TacticalCombatMap: React.FC<TacticalCombatMapProps> = ({
  playerStats,
  enemyStats,
  playerStance,
  env,
  liveHour,
  maxHours,
  isSimulating,
  winRate,
  playerWon,
  livePlayerOrg,
  liveEnemyOrg,
  livePlayerHP,
  liveEnemyHP,
  onSelectTerrain,
  onToggleSim,
  onResetSim
}) => {
  // Map visualization layer toggles
  const [showFrontline, setShowFrontline] = useState<boolean>(true);
  const [showMovementVectors, setShowMovementVectors] = useState<boolean>(true);
  const [showArtilleryArcs, setShowArtilleryArcs] = useState<boolean>(true);
  const [showAirSupport, setShowAirSupport] = useState<boolean>(true);
  const [showTopography, setShowTopography] = useState<boolean>(true);

  // Animation pulse tick for tracer fire and muzzle flashes
  const [animTick, setAnimTick] = useState<number>(0);

  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();
    const animate = (time: number) => {
      if (time - lastTime > 60) {
        setAnimTick(prev => (prev + 1) % 60);
        lastTime = time;
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Compute normalized combat progress (0.0 to 1.0)
  const progress = useMemo(() => {
    if (maxHours <= 0) return 0;
    return Math.min(1, Math.max(0, liveHour / maxHours));
  }, [liveHour, maxHours]);

  // Is the player the attacker on this map?
  const isPlayerAttacking = playerStance === 'attacker';
  const attackerWins = playerWon; // true if the designated attacking side breaks through

  // ================= DYNAMIC POSITIONS CALCULATION =================
  // Attacker starts at X=140. If winning, advances to X=460 (breakthrough). If losing, advances to X=300 then pushed back to X=170.
  const attackerCurrentX = useMemo(() => {
    const startX = 140;
    if (attackerWins) {
      // Smooth advance from 140 to 460
      return startX + (progress * 320);
    } else {
      // Advance to frontline then stalled/repulsed
      if (progress < 0.4) {
        return startX + (progress / 0.4) * 160; // moves to 300
      } else {
        return 300 - ((progress - 0.4) / 0.6) * 120; // pushed back to 180
      }
    }
  }, [progress, attackerWins]);

  // Defender starts at X=480. If attacker wins, defender retreats eastward to X=680. If holding, holds between X=480 and 460.
  const defenderCurrentX = useMemo(() => {
    const startX = 490;
    if (attackerWins) {
      if (progress < 0.25) {
        return startX;
      } else {
        // Retreats toward rear fallback sector (X=680)
        return startX + ((progress - 0.25) / 0.75) * 190;
      }
    } else {
      // Holds firm with small vibration
      return startX - (Math.sin(animTick * 0.4) * 3);
    }
  }, [progress, attackerWins, animTick]);

  // Frontline dynamic shift: starts at X=390, shifts right if attacker wins
  const frontlineShiftX = useMemo(() => {
    if (attackerWins) {
      return 390 + (progress * 180);
    } else {
      return 390 - (progress * 30);
    }
  }, [progress, attackerWins]);

  // HOI4 Combat Bubble score (0 to 100)
  // In HOI4: 50 is stalemate, 51-100 is green attacker winning, 1-49 is red defender winning
  const combatBubbleScore = useMemo(() => {
    if (liveHour === 0) return Math.round(winRate);
    if (attackerWins) {
      return Math.min(99, Math.max(50, Math.round(50 + (progress * 49))));
    } else {
      return Math.max(1, Math.min(50, Math.round(50 - (progress * 48))));
    }
  }, [liveHour, winRate, attackerWins, progress]);

  // Color of combat bubble
  const bubbleColor = combatBubbleScore >= 50 ? '#16a34a' : '#dc2626';
  const bubbleTextColor = '#ffffff';

  // Combat clash contact point
  const clashPointX = (attackerCurrentX + defenderCurrentX) / 2;
  const clashPointY = 210;

  // CAS Aircraft position (flies across from top-left to target and loops)
  const planeProgress = ((animTick * 3) % 180) / 180;
  const planeX = -60 + (planeProgress * 920);
  const planeY = 60 + Math.sin(planeProgress * Math.PI) * 110;

  // Background Terrain Styling
  const terrainConfig = useMemo(() => {
    switch (env.terrain) {
      case 'forest':
        return { bg: '#101a13', gridCol: '#1e3324', label: 'Sektor Hutan (Forest -20% Atk)', fillPat: 'forest' };
      case 'hills':
        return { bg: '#1c1711', gridCol: '#332719', label: 'Sektor Perbukitan (Hills -30% Atk)', fillPat: 'hills' };
      case 'mountain':
        return { bg: '#18181c', gridCol: '#2a2a35', label: 'Sektor Pegunungan (Mountain -60% Atk)', fillPat: 'mountain' };
      case 'urban':
        return { bg: '#141416', gridCol: '#27272d', label: 'Sektor Perkotaan (Urban -40% Atk)', fillPat: 'urban' };
      case 'marsh':
        return { bg: '#131915', gridCol: '#213025', label: 'Sektor Rawa (Marsh -50% Atk)', fillPat: 'marsh' };
      case 'plains':
      default:
        return { bg: '#0e1611', gridCol: '#1a291f', label: 'Sektor Dataran Terbuka (Plains 0% Mod)', fillPat: 'plains' };
    }
  }, [env.terrain]);

  // Determine NATO icon type
  const getUnitSymbol = (name: string, hardness: number) => {
    if (hardness >= 40 || name.toLowerCase().includes('tank') || name.toLowerCase().includes('panzer')) return 'armor';
    if (hardness >= 20 || name.toLowerCase().includes('motorized') || name.toLowerCase().includes('bermotor')) return 'motorized';
    if (name.toLowerCase().includes('marinir') || name.toLowerCase().includes('marine')) return 'marine';
    if (name.toLowerCase().includes('parasut') || name.toLowerCase().includes('airborne')) return 'airborne';
    return 'infantry';
  };

  const attackerSymbol = getUnitSymbol(playerStats.name, playerStats.hardness);
  const enemySymbol = getUnitSymbol(enemyStats.name, enemyStats.hardness);

  return (
    <div className="rounded-xl border border-[#2b3a32] bg-[#0c130f] p-4 sm:p-5 shadow-2xl space-y-3.5">
      {/* Top Header of Map */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#1f2c23] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#b8860b]/20 border border-[#b8860b]/40 text-[#fde047]">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-serif text-sm sm:text-base font-bold text-[#fef3c7] uppercase tracking-wide">
                Peta Tempur Taktis Dinamis (HOI4 Battle Map)
              </h4>
              <span className="rounded bg-[#ef4444]/20 border border-[#ef4444]/40 px-2 py-0.5 text-[10px] font-mono text-[#fca5a5] font-bold animate-pulse">
                LIVE INTERACTIVE
              </span>
            </div>
            <p className="text-xs text-[#cbd5e1]">
              Unit divisi bergerak secara otomatis di atas peta berdasarkan perhitungan formula serangan, breakthrough, dan pertahanan.
            </p>
          </div>
        </div>

        {/* Map Layer Toggles */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setShowFrontline(v => !v)}
            className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${
              showFrontline ? 'border-[#ef4444] bg-[#341414] text-[#fca5a5] font-bold' : 'border-[#1f2c23] bg-[#121c16] text-[#94a3b8]'
            }`}
          >
            Garis Depan
          </button>
          <button
            onClick={() => setShowMovementVectors(v => !v)}
            className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${
              showMovementVectors ? 'border-[#f59e0b] bg-[#312513] text-[#fef08a] font-bold' : 'border-[#1f2c23] bg-[#121c16] text-[#94a3b8]'
            }`}
          >
            Vektor Serbu
          </button>
          <button
            onClick={() => setShowArtilleryArcs(v => !v)}
            className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${
              showArtilleryArcs ? 'border-[#38bdf8] bg-[#102330] text-[#bae6fd] font-bold' : 'border-[#1f2c23] bg-[#121c16] text-[#94a3b8]'
            }`}
          >
            Artileri
          </button>
          <button
            onClick={() => setShowAirSupport(v => !v)}
            className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${
              showAirSupport ? 'border-[#a855f7] bg-[#271438] text-[#e9d5ff] font-bold' : 'border-[#1f2c23] bg-[#121c16] text-[#94a3b8]'
            }`}
          >
            Pesawat CAS
          </button>
        </div>
      </div>

      {/* Main SVG Interactive Map Viewport */}
      <div className="relative rounded-xl border-2 border-[#2b3a32] overflow-hidden shadow-inner bg-[#070d09]">
        {/* Top Floating Map Info Bar */}
        <div className="absolute top-2.5 left-3 right-3 z-10 flex items-center justify-between pointer-events-none text-[11px] font-mono">
          <div className="flex items-center gap-2 bg-[#09110d]/90 px-3 py-1.5 rounded-lg border border-[#2b3a32] backdrop-blur text-[#cbd5e1] shadow">
            <span className="text-[#fde047] font-bold">SEKTOR TEMPUR:</span>
            <span>{terrainConfig.label}</span>
            {env.fortLevel > 0 && (
              <span className="text-[#f87171] font-bold flex items-center gap-1">
                • Fort Lv.{env.fortLevel}
              </span>
            )}
            {env.riverCrossing !== 'none' && (
              <span className="text-[#38bdf8] font-bold">
                • {env.riverCrossing === 'small' ? 'Sungai Kecil' : 'Sungai Besar'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 bg-[#09110d]/90 px-3 py-1.5 rounded-lg border border-[#2b3a32] backdrop-blur shadow">
            <span className="text-[#94a3b8]">Status Jam:</span>
            <span className="text-[#fde047] font-bold">{liveHour} / {maxHours} Jam</span>
            <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
              isSimulating ? 'bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/40 animate-pulse' : 'bg-[#334155]/20 text-[#cbd5e1]'
            }`}>
              {isSimulating ? 'TEMPUR AKTIF' : 'SIAP'}
            </span>
          </div>
        </div>

        {/* SVG Canvas Map */}
        <svg
          viewBox="0 0 840 420"
          className="w-full h-auto select-none block"
          style={{ background: terrainConfig.bg }}
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="tactical-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={terrainConfig.gridCol} strokeWidth="0.8" opacity="0.6" />
              <circle cx="0" cy="0" r="1.2" fill="#b8860b" opacity="0.35" />
            </pattern>

            {/* Spearhead Arrow Markers */}
            <marker id="map-spearhead-gold" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
            </marker>
            <marker id="map-spearhead-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
            </marker>
            <marker id="map-spearhead-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
            </marker>

            {/* Linear Gradients */}
            <linearGradient id="friendly-trench" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="hostile-trench" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.25" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="glow-fx" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Topographic Texture & Grid */}
          <rect width="840" height="420" fill="url(#tactical-grid)" />

          {/* Map Topographical Features */}
          {showTopography && (
            <g opacity="0.3">
              {/* Elevation Contours */}
              <ellipse cx="200" cy="180" rx="140" ry="100" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="6 6" />
              <ellipse cx="620" cy="220" rx="160" ry="120" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="6 6" />
              <ellipse cx="650" cy="240" rx="90" ry="60" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />

              {/* Road / Supply Route running east-west */}
              <path d="M 0 210 Q 200 240 400 210 T 840 220" fill="none" stroke="#ffffff15" strokeWidth="4" strokeDasharray="8 6" />
              <text x="70" y="235" fill="#94a3b8" fontSize="9" fontFamily="monospace">Jalur Suplai Logistik (Supply Hub Route)</text>
            </g>
          )}

          {/* Simulated River Obstacle */}
          {env.riverCrossing !== 'none' && (
            <g>
              <path
                d="M 390 0 Q 420 120 380 230 T 430 420"
                fill="none"
                stroke="#0284c7"
                strokeWidth={env.riverCrossing === 'large' ? '12' : '6'}
                opacity="0.65"
              />
              <path
                d="M 390 0 Q 420 120 380 230 T 430 420"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="10 5"
                opacity="0.8"
              />
              {/* Bridge crossing point */}
              <rect x="382" y="200" width="22" height="20" rx="2" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
              <line x1="384" y1="205" x2="402" y2="205" stroke="#fde047" strokeWidth="1.5" />
              <line x1="384" y1="215" x2="402" y2="215" stroke="#fde047" strokeWidth="1.5" />
              <text x="365" y="192" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">Jembatan Penyeberangan</text>
            </g>
          )}

          {/* Fortifications (Bunkers & Pillboxes) */}
          {env.fortLevel > 0 && (
            <g transform="translate(460, 0)">
              {Array.from({ length: Math.min(6, env.fortLevel) }).map((_, i) => (
                <g key={i} transform={`translate(0, ${70 + i * 55})`}>
                  {/* Concrete Pillbox Bunker Icon */}
                  <rect x="-8" y="-8" width="16" height="16" rx="3" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="-5" y1="0" x2="5" y2="0" stroke="#0f172a" strokeWidth="2.5" />
                  <circle cx="0" cy="0" r="1.5" fill="#f87171" />
                </g>
              ))}
              <text x="14" y="90" fill="#f87171" fontSize="9" fontFamily="monospace" fontWeight="bold">
                Benteng Parit Baja (Fort Lv.{env.fortLevel})
              </text>
            </g>
          )}

          {/* Dynamic Frontline Trench Line */}
          {showFrontline && (
            <g>
              {/* Soft territory zone tints */}
              <path
                d={`M 0 0 L ${frontlineShiftX} 0 Q ${frontlineShiftX + 25} 210 ${frontlineShiftX} 420 L 0 420 Z`}
                fill="url(#friendly-trench)"
              />
              <path
                d={`M ${frontlineShiftX} 0 L 840 0 L 840 420 L ${frontlineShiftX} 420 Q ${frontlineShiftX + 25} 210 ${frontlineShiftX} 0 Z`}
                fill="url(#hostile-trench)"
              />

              {/* Frontline line */}
              <path
                d={`M ${frontlineShiftX} 0 Q ${frontlineShiftX + 30} 120 ${frontlineShiftX - 10} 210 T ${frontlineShiftX + 20} 420`}
                fill="none"
                stroke="#ef4444"
                strokeWidth="3.5"
                strokeDasharray="10 4"
                filter="url(#glow-fx)"
              />
              <text
                x={frontlineShiftX - 12}
                y="30"
                fill="#fca5a5"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="end"
              >
                Garis Kontak Tempur (Frontline)
              </text>
            </g>
          )}

          {/* Tactical Spearhead Attack Vectors */}
          {showMovementVectors && (
            <g>
              {/* Main offensive spearhead arrow from Attacker to Clash point */}
              <path
                d={`M ${attackerCurrentX + 45} 210 L ${clashPointX - 25} 210`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeDasharray="6 4"
                markerEnd="url(#map-spearhead-gold)"
              />
              {/* Secondary pincer arrows */}
              <path
                d={`M ${attackerCurrentX + 30} 160 Q ${attackerCurrentX + 110} 120 ${clashPointX - 15} 170`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="5 3"
                markerEnd="url(#map-spearhead-gold)"
                opacity="0.75"
              />
              <path
                d={`M ${attackerCurrentX + 30} 260 Q ${attackerCurrentX + 110} 300 ${clashPointX - 15} 250`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="5 3"
                markerEnd="url(#map-spearhead-gold)"
                opacity="0.75"
              />
            </g>
          )}

          {/* Animated Artillery Tracer Shell Arcs */}
          {showArtilleryArcs && isSimulating && (
            <g>
              {/* Friendly Battery Fire */}
              <path
                d={`M 70 120 Q 240 10 ${clashPointX + 30} 200`}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="4 6"
                strokeDashoffset={-animTick * 4}
                opacity="0.8"
              />
              <path
                d={`M 80 300 Q 240 400 ${clashPointX + 20} 220`}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="4 6"
                strokeDashoffset={-animTick * 4}
                opacity="0.8"
              />
              {/* Impact flashes */}
              {animTick % 6 < 3 && (
                <g transform={`translate(${clashPointX + 25}, 205)`}>
                  <circle cx="0" cy="0" r="10" fill="#fef08a" opacity="0.6" filter="url(#glow-fx)" />
                  <polygon points="-4,-4 0,-12 4,-4 12,0 4,4 0,12 -4,4 -12,0" fill="#ef4444" opacity="0.9" />
                </g>
              )}

              {/* Hostile Artillery Return Fire */}
              <path
                d={`M 740 140 Q 560 30 ${clashPointX - 25} 210`}
                fill="none"
                stroke="#f87171"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                strokeDashoffset={animTick * 4}
                opacity="0.7"
              />
            </g>
          )}

          {/* Close Air Support (CAS) Animated Strafing Aircraft */}
          {showAirSupport && (env.casGroundDamage > 0 || env.airSuperiority !== 'none') && isSimulating && (
            <g transform={`translate(${planeX}, ${planeY}) rotate(18)`}>
              {/* Aircraft Shadow */}
              <ellipse cx="-4" cy="24" rx="14" ry="4" fill="#000000" opacity="0.3" />
              {/* Stuka / IL-2 / P-47 Aircraft Shape */}
              <path d="M 0 -8 L 18 0 L 0 8 L 4 0 Z" fill="#38bdf8" />
              <line x1="8" y1="-18" x2="8" y2="18" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              <line x1="-3" y1="-8" x2="-3" y2="8" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              {/* Bomb drop trails */}
              {planeProgress > 0.4 && planeProgress < 0.65 && (
                <g transform="translate(-10, 8)">
                  <circle cx="0" cy="0" r="2.5" fill="#f59e0b" />
                  <circle cx="-6" cy="4" r="2" fill="#ef4444" />
                </g>
              )}
            </g>
          )}

          {/* ================= MOVING UNIT COUNTERS (NATO ICONS) ================= */}

          {/* 1. ATTACKING DIVISION (PLAYER) COUNTER */}
          <g
            transform={`translate(${attackerCurrentX}, 185)`}
            className="transition-all duration-300 ease-out"
          >
            {/* Ground Dust Trails while moving */}
            {isSimulating && (
              <g opacity="0.7">
                <circle cx="-12" cy="42" r={(animTick % 8) + 2} fill="#78716c" opacity="0.3" />
                <circle cx="-24" cy="40" r={(animTick % 10) + 4} fill="#78716c" opacity="0.2" />
              </g>
            )}

            {/* NATO Counter Body Box */}
            <rect
              x="0"
              y="0"
              width="70"
              height="44"
              rx="4"
              fill={isPlayerAttacking ? '#0369a1' : '#b91c1c'}
              stroke={isPlayerAttacking ? '#7dd3fc' : '#fca5a5'}
              strokeWidth="2"
              filter="url(#glow-fx)"
            />

            {/* NATO Counter Symbol inside */}
            {attackerSymbol === 'armor' ? (
              <ellipse cx="35" cy="22" rx="18" ry="9" fill="none" stroke="#ffffff" strokeWidth="2" />
            ) : attackerSymbol === 'motorized' ? (
              <g stroke="#ffffff" strokeWidth="2">
                <line x1="12" y1="8" x2="58" y2="36" />
                <line x1="58" y1="8" x2="12" y2="36" />
                <circle cx="22" cy="38" r="3" fill="#ffffff" />
                <circle cx="48" cy="38" r="3" fill="#ffffff" />
              </g>
            ) : (
              <g stroke="#ffffff" strokeWidth="2">
                <line x1="12" y1="8" x2="58" y2="36" />
                <line x1="58" y1="8" x2="12" y2="36" />
              </g>
            )}

            {/* Division Count badge */}
            <rect x="48" y="-8" width="24" height="15" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
            <text x="60" y="3" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              {playerStats.count}x
            </text>

            {/* Name Label Below */}
            <rect x="-10" y="48" width="90" height="16" rx="3" fill="#0c1410" stroke="#2b3a32" strokeWidth="1" />
            <text x="35" y="59" fill="#fef3c7" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              {playerStats.name.slice(0, 14)}
            </text>

            {/* Live Org Bar above unit */}
            <rect x="0" y="-12" width="44" height="4" rx="2" fill="#1e293b" />
            <rect
              x="0"
              y="-12"
              width={Math.max(0, Math.min(44, (livePlayerOrg / playerStats.organization) * 44))}
              height="4"
              rx="2"
              fill="#22c55e"
            />
          </g>

          {/* 2. DEFENDING DIVISION (DUMMY ENEMY) COUNTER */}
          <g
            transform={`translate(${defenderCurrentX}, 185)`}
            className="transition-all duration-300 ease-out"
          >
            {/* Retreat warning smoke if breaking */}
            {liveEnemyOrg <= 10 && (
              <g opacity="0.8">
                <circle cx="75" cy="10" r="6" fill="#ef4444" opacity="0.5" />
                <circle cx="85" cy="-2" r="9" fill="#64748b" opacity="0.6" />
                <text x="75" y="-12" fill="#f87171" fontSize="9" fontWeight="bold" fontFamily="monospace">MUNDUR!</text>
              </g>
            )}

            {/* NATO Counter Body Box */}
            <rect
              x="0"
              y="0"
              width="70"
              height="44"
              rx="4"
              fill={!isPlayerAttacking ? '#0369a1' : '#991b1b'}
              stroke={!isPlayerAttacking ? '#7dd3fc' : '#f87171'}
              strokeWidth="2"
              filter="url(#glow-fx)"
            />

            {/* NATO Counter Symbol */}
            {enemySymbol === 'armor' ? (
              <ellipse cx="35" cy="22" rx="18" ry="9" fill="none" stroke="#ffffff" strokeWidth="2" />
            ) : enemySymbol === 'motorized' ? (
              <g stroke="#ffffff" strokeWidth="2">
                <line x1="12" y1="8" x2="58" y2="36" />
                <line x1="58" y1="8" x2="12" y2="36" />
                <circle cx="22" cy="38" r="3" fill="#ffffff" />
                <circle cx="48" cy="38" r="3" fill="#ffffff" />
              </g>
            ) : (
              <g stroke="#ffffff" strokeWidth="2">
                <line x1="12" y1="8" x2="58" y2="36" />
                <line x1="58" y1="8" x2="12" y2="36" />
              </g>
            )}

            {/* Division Count badge */}
            <rect x="48" y="-8" width="24" height="15" rx="3" fill="#0f172a" stroke="#ef4444" strokeWidth="1" />
            <text x="60" y="3" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              {enemyStats.count}x
            </text>

            {/* Name Label Below */}
            <rect x="-10" y="48" width="90" height="16" rx="3" fill="#0c1410" stroke="#2b3a32" strokeWidth="1" />
            <text x="35" y="59" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              {enemyStats.name.slice(0, 14)}
            </text>

            {/* Live Org Bar above unit */}
            <rect x="0" y="-12" width="44" height="4" rx="2" fill="#1e293b" />
            <rect
              x="0"
              y="-12"
              width={Math.max(0, Math.min(44, (liveEnemyOrg / enemyStats.organization) * 44))}
              height="4"
              rx="2"
              fill="#ef4444"
            />
          </g>

          {/* ================= THE HOI4 COMBAT BUBBLE ================= */}
          {/* Sits at the clash contact point between attacker and defender */}
          <g transform={`translate(${clashPointX}, ${clashPointY})`}>
            {/* Shockwave animation rings when combat is active */}
            {isSimulating && (
              <>
                <circle cx="0" cy="0" r={22 + (animTick % 12)} fill="none" stroke={bubbleColor} strokeWidth="1" opacity={0.6 - (animTick % 12) / 20} />
                <circle cx="0" cy="0" r={26 + (animTick % 16)} fill="none" stroke="#f59e0b" strokeWidth="0.8" opacity={0.4 - (animTick % 16) / 30} />
              </>
            )}

            {/* Outer metallic ring */}
            <circle cx="0" cy="0" r="22" fill="#0f172a" stroke="#e2e8f0" strokeWidth="2.5" filter="url(#glow-fx)" />
            {/* Inner colored bubble background */}
            <circle cx="0" cy="0" r="18" fill={bubbleColor} />

            {/* Directional progress arrow */}
            <polygon
              points={attackerWins ? "4,-4 10,0 4,4" : "-4,-4 -10,0 -4,4"}
              fill="#ffffff"
            />

            {/* HOI4 Battle Score Number */}
            <text
              x={attackerWins ? "-2" : "2"}
              y="5"
              fill={bubbleTextColor}
              fontSize="12"
              fontWeight="900"
              fontFamily="monospace"
              textAnchor="middle"
            >
              {combatBubbleScore}
            </text>
          </g>
        </svg>

        {/* Bottom Map Interactive Toolbar */}
        <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between pointer-events-auto bg-[#09110d]/90 p-2 rounded-lg border border-[#2b3a32] backdrop-blur text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-[#94a3b8] hidden md:inline">Klik Cepat Medan Tempur:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['plains', 'forest', 'hills', 'mountain', 'urban', 'marsh'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => onSelectTerrain && onSelectTerrain(t)}
                  className={`px-2 py-0.5 rounded text-[10px] capitalize transition-all ${
                    env.terrain === t
                      ? 'bg-[#f59e0b] text-[#09110d] font-bold shadow'
                      : 'bg-[#141e17] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onToggleSim && (
              <button
                onClick={onToggleSim}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition-all ${
                  isSimulating ? 'bg-[#eab308] text-[#09110d]' : 'bg-[#10b981] text-white'
                }`}
              >
                {isSimulating ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                <span>{isSimulating ? 'Jeda' : 'Jalankan'}</span>
              </button>
            )}
            {onResetSim && (
              <button
                onClick={onResetSim}
                className="p-1 rounded bg-[#141e17] text-[#94a3b8] hover:text-white border border-[#223028]"
                title="Reset Posisi Peta"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
