import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Swords, Shield, Navigation, Crosshair, Sparkles,
  Layers, Download, Upload, RotateCcw, Play, Pause,
  CheckCircle2, AlertTriangle, Info, Sliders, Target,
  Flame, Mountain, CloudRain, Users, Eye, Pencil,
  Eraser, MapPin, Award, Zap, Compass, RefreshCw
} from 'lucide-react';
import { BattlePlanPreset, TacticalElement, TacticalDivisionMarker } from '../types';
import { BATTLE_PLAN_PRESETS } from '../data/battlePlannerData';
import { AmbientSoundToggle } from './AmbientSoundToggle';

type DrawingTool = 'select' | 'frontline' | 'spearhead' | 'encirclement' | 'fallback' | 'marker_friendly' | 'marker_hostile' | 'eraser';

export const BattlePlanner: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Selected Preset or Custom
  const [activePresetId, setActivePresetId] = useState<string>('plan-barbarossa-1941');
  const [currentPlan, setCurrentPlan] = useState<BattlePlanPreset>(() => BATTLE_PLAN_PRESETS[0]);

  // Drawing and Interaction State
  const [activeTool, setActiveTool] = useState<DrawingTool>('select');
  const [elements, setElements] = useState<TacticalElement[]>(() => BATTLE_PLAN_PRESETS[0].elements);
  const [markers, setMarkers] = useState<TacticalDivisionMarker[]>(() => BATTLE_PLAN_PRESETS[0].markers);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [currentPoints, setCurrentPoints] = useState<{ x: number; y: number }[]>([]);

  // War Calculator & Simulation Controls
  const [simulationRunning, setSimulationRunning] = useState<boolean>(false);
  const [simulationHour, setSimulationHour] = useState<number>(0);
  const [planningBonusDays, setPlanningBonusDays] = useState<number>(20); // 0 to 40 days
  const [airSuperiorityPercent, setAirSuperiorityPercent] = useState<number>(75); // 0 to 100%
  const [casBombersCount, setCasBombersCount] = useState<number>(400); // 0 to 1000
  const [terrainType, setTerrainType] = useState<'plains' | 'forest' | 'hills' | 'mountain' | 'urban' | 'marsh'>('plains');
  const [hasRiverCrossing, setHasRiverCrossing] = useState<boolean>(false);
  const [weatherMud, setWeatherMud] = useState<boolean>(false);

  // Load preset plan
  const handleSelectPreset = (presetId: string) => {
    const p = BATTLE_PLAN_PRESETS.find(item => item.id === presetId);
    if (!p) return;
    setActivePresetId(presetId);
    setCurrentPlan(p);
    setElements(p.elements);
    setMarkers(p.markers);
    setSimulationHour(0);
    setSimulationRunning(false);
  };

  // SVG Mouse Coordinates helper
  const getSVGCoordinates = (e: React.MouseEvent<SVGSVGElement>): { x: number; y: number } => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 960 / rect.width;
    const scaleY = 640 / rect.height;
    return {
      x: Math.round((e.clientX - rect.left) * scaleX),
      y: Math.round((e.clientY - rect.top) * scaleY)
    };
  };

  // Canvas Mouse Down
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    const coords = getSVGCoordinates(e);

    if (activeTool === 'marker_friendly' || activeTool === 'marker_hostile') {
      const isFriendly = activeTool === 'marker_friendly';
      const newMarker: TacticalDivisionMarker = {
        id: `marker-${Date.now()}`,
        x: coords.x,
        y: coords.y,
        name: isFriendly ? 'Divisi Lapis Baja Sekutu' : 'Divisi Bertahan Musuh',
        symbol: 'armor',
        side: isFriendly ? 'friendly' : 'hostile',
        count: isFriendly ? 4 : 6,
        org: isFriendly ? 85 : 50
      };
      setMarkers(prev => [...prev, newMarker]);
      return;
    }

    if (activeTool === 'select' || activeTool === 'eraser') {
      return;
    }

    // Start drawing a tactical line/spearhead
    setIsDrawing(true);
    setCurrentPoints([coords]);
  };

  // Canvas Mouse Move
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing) return;
    const coords = getSVGCoordinates(e);
    // Throttle point distance
    const lastPoint = currentPoints[currentPoints.length - 1];
    if (lastPoint) {
      const dist = Math.hypot(coords.x - lastPoint.x, coords.y - lastPoint.y);
      if (dist > 15) {
        setCurrentPoints(prev => [...prev, coords]);
      }
    }
  };

  // Canvas Mouse Up
  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentPoints.length >= 2) {
      let color = '#3b82f6';
      let strokeWidth = 4;
      let label = 'Manuver Baru';

      if (activeTool === 'frontline') {
        color = '#ef4444';
        strokeWidth = 4;
        label = 'Garis Depan (Frontline)';
      } else if (activeTool === 'spearhead') {
        color = '#f59e0b';
        strokeWidth = 5;
        label = 'Tombak Terobosan (Spearhead)';
      } else if (activeTool === 'encirclement') {
        color = '#dc2626';
        strokeWidth = 4;
        label = 'Capit Kepiting (Kessel)';
      } else if (activeTool === 'fallback') {
        color = '#64748b';
        strokeWidth = 5;
        label = 'Garis Mundur (Fallback Line)';
      }

      const newElem: TacticalElement = {
        id: `elem-${Date.now()}`,
        type: activeTool as TacticalElement['type'],
        color,
        points: currentPoints,
        label,
        strokeWidth,
        style: activeTool === 'spearhead' || activeTool === 'fallback' ? 'solid' : 'dashed'
      };

      setElements(prev => [...prev, newElem]);
    }

    setCurrentPoints([]);
  };

  // Delete element on eraser click
  const handleElementClick = (elemId: string) => {
    if (activeTool === 'eraser') {
      setElements(prev => prev.filter(el => el.id !== elemId));
    } else if (activeTool === 'select') {
      setSelectedElementId(elemId);
    }
  };

  const handleMarkerClick = (markerId: string) => {
    if (activeTool === 'eraser') {
      setMarkers(prev => prev.filter(m => m.id !== markerId));
    }
  };

  // Clear all drawings
  const handleClearDrawings = () => {
    if (window.confirm('Hapus seluruh garis manuver dan penanda taktis di peta?')) {
      setElements([]);
      setMarkers([]);
    }
  };

  // Export Plan to JSON
  const handleExportPlanJSON = () => {
    const exportData: BattlePlanPreset = {
      ...currentPlan,
      id: `custom-plan-${Date.now()}`,
      name: currentPlan.name + ' (Kustom)',
      elements,
      markers
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `hoi4_battle_plan_${Date.now()}.json`);
    dl.click();
  };

  // Import Plan from JSON
  const handleImportPlanJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed: BattlePlanPreset = JSON.parse(evt.target?.result as string);
        if (parsed && Array.isArray(parsed.elements)) {
          setCurrentPlan(parsed);
          setElements(parsed.elements);
          if (Array.isArray(parsed.markers)) setMarkers(parsed.markers);
          alert('Berhasil memuat rencana taktis pertempuran!');
        }
      } catch (err) {
        alert('File format rencana pertempuran tidak valid.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Dynamic War Calculator & Battle Evaluation
  const tacticalEvaluation = useMemo(() => {
    // 1. Planning Bonus: base 2% per day up to max 50-80%
    const planningBonus = Math.min(80, Math.round(planningBonusDays * 2.2));

    // 2. Air Superiority factor
    const airFactor = (airSuperiorityPercent - 50) * 0.7; // -35% to +35%
    const casDamagePerHour = Math.round((casBombersCount / 100) * 8.5 * (airSuperiorityPercent / 100));

    // 3. Terrain modifiers
    let terrainAttackMod = 0;
    if (terrainType === 'forest') terrainAttackMod = -20;
    if (terrainType === 'hills') terrainAttackMod = -30;
    if (terrainType === 'mountain') terrainAttackMod = -60;
    if (terrainType === 'urban') terrainAttackMod = -40;
    if (terrainType === 'marsh') terrainAttackMod = -50;

    let riverPen = hasRiverCrossing ? -35 : 0;
    let mudPen = weatherMud ? -30 : 0;

    // 4. Spearhead & Pincer strength from drawn elements
    const spearheads = elements.filter(el => el.type === 'spearhead').length;
    const encirclements = elements.filter(el => el.type === 'encirclement').length;
    const friendlyDivs = markers.filter(m => m.side === 'friendly').reduce((acc, m) => acc + m.count, 0) || 12;
    const hostileDivs = markers.filter(m => m.side === 'hostile').reduce((acc, m) => acc + m.count, 0) || 10;

    // Encirclement bonus: each pincer adds +25% combat efficiency
    const encirclementBonus = Math.min(60, (spearheads * 15) + (encirclements * 30));

    // Net Breakthrough Score (0 - 100%)
    const rawScore = 50 + planningBonus * 0.5 + airFactor + terrainAttackMod + riverPen + mudPen + encirclementBonus + ((friendlyDivs - hostileDivs) * 3);
    const breakthroughProbability = Math.max(5, Math.min(98, Math.round(rawScore)));

    // Casualty Estimate
    const attackerLossesEst = Math.round(Math.max(800, (hostileDivs * 1200) * (1 - (breakthroughProbability / 120))));
    const defenderLossesEst = Math.round(Math.max(1200, (friendlyDivs * 1500) * (breakthroughProbability / 85)));

    // Estimated battle duration in hours
    const estimatedHours = Math.max(12, Math.round(168 * (1 - (breakthroughProbability / 130))));

    return {
      planningBonus,
      airFactor: Math.round(airFactor),
      casDamagePerHour,
      terrainAttackMod,
      riverPen,
      mudPen,
      encirclementBonus,
      breakthroughProbability,
      attackerLossesEst,
      defenderLossesEst,
      estimatedHours
    };
  }, [
    planningBonusDays,
    airSuperiorityPercent,
    casBombersCount,
    terrainType,
    hasRiverCrossing,
    weatherMud,
    elements,
    markers
  ]);

  // Simulation timer loop
  useEffect(() => {
    let interval: any = null;
    if (simulationRunning) {
      interval = setInterval(() => {
        setSimulationHour(h => {
          if (h >= tacticalEvaluation.estimatedHours) {
            setSimulationRunning(false);
            return h;
          }
          return h + 4;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [simulationRunning, tacticalEvaluation.estimatedHours]);

  // Helper to generate SVG path for a line
  const renderPathD = (points: { x: number; y: number }[]): string => {
    if (points.length < 2) return '';
    return points.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, '');
  };

  // Normalized simulation progress (0 to 1)
  const simProgress = useMemo(() => {
    if (tacticalEvaluation.estimatedHours <= 0) return 0;
    return Math.min(1, Math.max(0, simulationHour / tacticalEvaluation.estimatedHours));
  }, [simulationHour, tacticalEvaluation.estimatedHours]);

  // Dynamic coordinates for moving markers
  const getMarkerCoords = (marker: TacticalDivisionMarker) => {
    if (simProgress === 0) return { x: marker.x, y: marker.y };
    if (marker.side === 'friendly') {
      const advanceX = (tacticalEvaluation.breakthroughProbability >= 45 ? 120 : 40) * simProgress;
      return {
        x: marker.x + advanceX,
        y: marker.y + (Math.sin(simProgress * Math.PI) * 12)
      };
    } else {
      if (tacticalEvaluation.breakthroughProbability > 50) {
        const retreatX = simProgress > 0.25 ? ((simProgress - 0.25) / 0.75) * 85 : 0;
        return {
          x: marker.x + retreatX,
          y: marker.y
        };
      } else {
        return {
          x: marker.x - (Math.sin(simProgress * 20) * 3),
          y: marker.y
        };
      }
    }
  };

  // Dynamic live organization
  const getMarkerLiveOrg = (marker: TacticalDivisionMarker) => {
    const baseOrg = marker.org || 60;
    if (simProgress === 0) return baseOrg;
    if (marker.side === 'friendly') {
      const drop = (100 - tacticalEvaluation.breakthroughProbability) * 0.45 * simProgress;
      return Math.max(8, Math.round(baseOrg - drop));
    } else {
      const drop = tacticalEvaluation.breakthroughProbability * 0.8 * simProgress;
      return Math.max(0, Math.round(baseOrg - drop));
    }
  };

  // Clash centroid for the HOI4 combat bubble
  const battleBubbleInfo = useMemo(() => {
    const friendly = markers.filter(m => m.side === 'friendly');
    const hostile = markers.filter(m => m.side === 'hostile');
    if (friendly.length === 0 || hostile.length === 0) return null;

    const avgFriendlyX = friendly.reduce((acc, m) => acc + getMarkerCoords(m).x, 0) / friendly.length;
    const avgFriendlyY = friendly.reduce((acc, m) => acc + getMarkerCoords(m).y, 0) / friendly.length;
    const avgHostileX = hostile.reduce((acc, m) => acc + getMarkerCoords(m).x, 0) / hostile.length;
    const avgHostileY = hostile.reduce((acc, m) => acc + getMarkerCoords(m).y, 0) / hostile.length;

    const score = Math.round(
      50 + (tacticalEvaluation.breakthroughProbability - 50) * Math.min(1, simProgress * 1.5)
    );

    return {
      x: (avgFriendlyX + avgHostileX) / 2,
      y: (avgFriendlyY + avgHostileY) / 2,
      score: Math.max(1, Math.min(99, score)),
      isWinning: score >= 50
    };
  }, [markers, simProgress, tacticalEvaluation.breakthroughProbability]);

  return (
    <div className="space-y-6">
      {/* WWII War Room Banner */}
      <div className="relative overflow-hidden rounded-xl border-2 border-[#b8860b]/60 bg-gradient-to-r from-[#171f1a] via-[#121814] to-[#0c120e] p-5 md:p-6 shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#b8860b10_1px,transparent_1px),linear-gradient(to_bottom,#b8860b10_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded border border-[#b8860b]/70 bg-[#78350f]/30 px-2.5 py-0.5 text-xs font-mono font-bold tracking-widest text-[#fde047] uppercase">
                ★ MEJA OPERASI TAKTIS &amp; STAF UMUM PD II ★
              </span>
              <span className="text-xs font-mono text-[#cbd5e1]">
                {currentPlan.theater} ({currentPlan.year})
              </span>
            </div>
            <h2 className="mt-1 font-serif text-2xl md:text-3xl font-black tracking-tight text-[#fef3c7] uppercase drop-shadow">
              Perencana Pertempuran &amp; Garis Depan (Battle Planner)
            </h2>
            <p className="mt-1 text-xs md:text-sm text-[#cbd5e1] max-w-2xl leading-relaxed">
              Sketsa manuver garis depan, tusukan tombak lapis baja (Spearhead), capit kepiting (Encirclement), penempatan simbol NATO divisi, serta evaluasi kalkulator simulasi pertempuran otomatis.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <AmbientSoundToggle compact={true} />

            <button
              onClick={handleExportPlanJSON}
              className="flex items-center gap-1.5 rounded-lg border border-[#b8860b]/50 bg-[#2b2112] px-3 py-2 text-xs font-medium text-[#fde047] hover:bg-[#3d2f1a] transition-all shadow"
              title="Unduh rencana taktis sebagai file JSON"
            >
              <Download className="h-3.5 w-3.5 text-[#f59e0b]" />
              <span>Ekspor Rencana</span>
            </button>

            <label className="flex items-center gap-1.5 rounded-lg border border-[#3b82f6]/50 bg-[#142337] px-3 py-2 text-xs font-medium text-[#93c5fd] hover:bg-[#1d3557] cursor-pointer transition-all shadow">
              <Upload className="h-3.5 w-3.5 text-[#60a5fa]" />
              <span>Impor Rencana</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportPlanJSON}
                className="hidden"
              />
            </label>

            <button
              onClick={handleClearDrawings}
              className="flex items-center gap-1.5 rounded-lg border border-[#ef4444]/40 bg-[#281313] px-3 py-2 text-xs font-medium text-[#fca5a5] hover:bg-[#381a1a] transition-all shadow"
              title="Bersihkan seluruh garis di peta"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#ef4444]" />
              <span>Hapus Peta</span>
            </button>
          </div>
        </div>

        {/* Preset Selector Tabs */}
        <div className="relative z-10 mt-4 pt-3 border-t border-[#b8860b]/30 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-mono text-[#94a3b8] whitespace-nowrap">Skenario Sejarah:</span>
          {BATTLE_PLAN_PRESETS.map(preset => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.id)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-serif font-bold whitespace-nowrap transition-all ${
                activePresetId === preset.id
                  ? 'border-[#f59e0b] bg-[#3a2c13] text-[#fef08a] shadow'
                  : 'border-[#223028] bg-[#121a15] text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Workspace: Map Canvas on Left, Battle Calculator on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Map Canvas (8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          {/* Tactical Drawing Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#2b3a32] bg-[#101713] p-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono text-[#64748b] px-1">Peralatan:</span>

              <button
                onClick={() => setActiveTool('select')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono transition-all ${
                  activeTool === 'select'
                    ? 'bg-[#1e293b] text-[#f8fafc] border border-[#64748b]'
                    : 'text-[#94a3b8] hover:bg-[#16211a]'
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                <span>Pilih / Geser</span>
              </button>

              <button
                onClick={() => setActiveTool('frontline')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono transition-all ${
                  activeTool === 'frontline'
                    ? 'bg-[#3b1212] text-[#fca5a5] border border-[#ef4444]'
                    : 'text-[#94a3b8] hover:bg-[#16211a]'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
                <span>Garis Depan</span>
              </button>

              <button
                onClick={() => setActiveTool('spearhead')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono transition-all ${
                  activeTool === 'spearhead'
                    ? 'bg-[#382a10] text-[#fde047] border border-[#f59e0b]'
                    : 'text-[#94a3b8] hover:bg-[#16211a]'
                }`}
              >
                <Navigation className="h-3.5 w-3.5 text-[#f59e0b] rotate-45" />
                <span>Spearhead</span>
              </button>

              <button
                onClick={() => setActiveTool('encirclement')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono transition-all ${
                  activeTool === 'encirclement'
                    ? 'bg-[#3b1414] text-[#f87171] border border-[#dc2626]'
                    : 'text-[#94a3b8] hover:bg-[#16211a]'
                }`}
              >
                <Crosshair className="h-3.5 w-3.5 text-[#dc2626]" />
                <span>Pincer / Kantong</span>
              </button>

              <button
                onClick={() => setActiveTool('fallback')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono transition-all ${
                  activeTool === 'fallback'
                    ? 'bg-[#1e293b] text-[#cbd5e1] border border-[#64748b]'
                    : 'text-[#94a3b8] hover:bg-[#16211a]'
                }`}
              >
                <Shield className="h-3.5 w-3.5 text-[#64748b]" />
                <span>Fallback Line</span>
              </button>

              <button
                onClick={() => setActiveTool('marker_friendly')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono transition-all ${
                  activeTool === 'marker_friendly'
                    ? 'bg-[#102a3a] text-[#7dd3fc] border border-[#0284c7]'
                    : 'text-[#94a3b8] hover:bg-[#16211a]'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-[#0284c7]" />
                <span>+ Divisi Kawan</span>
              </button>

              <button
                onClick={() => setActiveTool('marker_hostile')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono transition-all ${
                  activeTool === 'marker_hostile'
                    ? 'bg-[#3a1010] text-[#fca5a5] border border-[#dc2626]'
                    : 'text-[#94a3b8] hover:bg-[#16211a]'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-[#dc2626]" />
                <span>+ Divisi Lawan</span>
              </button>

              <button
                onClick={() => setActiveTool('eraser')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono transition-all ${
                  activeTool === 'eraser'
                    ? 'bg-[#2b1625] text-[#f472b6] border border-[#ec4899]'
                    : 'text-[#94a3b8] hover:bg-[#16211a]'
                }`}
              >
                <Eraser className="h-3.5 w-3.5" />
                <span>Hapus Objek</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-[#64748b]">
              Klik &amp; seret di peta untuk menggambar garis
            </div>
          </div>

          {/* SVG Tactical Map Canvas */}
          <div className="relative rounded-xl border-2 border-[#b8860b]/50 bg-[#16201a] overflow-hidden shadow-2xl select-none">
            {/* Topographic Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#b8860b15_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            {/* Vintage Military Compass Rose in corner */}
            <div className="absolute top-3 right-3 text-[#b8860b]/30 pointer-events-none">
              <div className="font-mono text-[10px] text-right">NORTH ↑</div>
              <div className="text-[9px] font-mono text-right tracking-tighter">GRID 1:500,000</div>
            </div>

            {/* Watermark Top Secret Stamp */}
            <div className="absolute bottom-3 left-3 pointer-events-none border border-[#dc2626]/40 text-[#dc2626]/60 rounded px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase">
              ★ DEKRET TERTINGGI - KLASIFIKASI RAHASIA ★
            </div>

            <svg
              ref={svgRef}
              viewBox="0 0 960 640"
              className="w-full h-auto cursor-crosshair relative z-10"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <defs>
                {/* Arrow markers */}
                <marker
                  id="arrow-amber"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
                </marker>
                <marker
                  id="arrow-blue"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#3b82f6" />
                </marker>
                <marker
                  id="arrow-red"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
                </marker>
              </defs>

              {/* Grid Lines */}
              <g stroke="#ffffff08" strokeWidth="1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <line key={`v-${i}`} x1={(i + 1) * 100} y1="0" x2={(i + 1) * 100} y2="640" />
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                  <line key={`h-${i}`} x1="0" y1={(i + 1) * 100} x2="960" y2={(i + 1) * 100} />
                ))}
              </g>

              {/* Render Simulated Historical River Lines */}
              <path
                d="M 500 0 Q 520 200 480 340 T 560 640"
                stroke="#0284c7"
                strokeWidth="4"
                fill="none"
                opacity="0.45"
                strokeDasharray="10 4"
              />
              <text x="510" y="240" fill="#38bdf8" opacity="0.6" fontSize="11" fontFamily="monospace">
                Sungai Dnieper / Volga
              </text>

              {/* Render Saved Elements */}
              {elements.map(elem => {
                const pathString = renderPathD(elem.points);
                const markerEnd = elem.type === 'spearhead' ? 'url(#arrow-amber)' : elem.type === 'offensive_arrow' ? 'url(#arrow-blue)' : undefined;

                return (
                  <g key={elem.id} onClick={() => handleElementClick(elem.id)} className="cursor-pointer">
                    <path
                      d={pathString}
                      fill="none"
                      stroke={elem.color}
                      strokeWidth={elem.strokeWidth}
                      strokeDasharray={elem.style === 'dashed' ? '8 6' : undefined}
                      markerEnd={markerEnd}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all hover:opacity-80"
                    />

                    {/* Element Label */}
                    {elem.points.length > 0 && (
                      <text
                        x={elem.points[Math.floor(elem.points.length / 2)].x}
                        y={elem.points[Math.floor(elem.points.length / 2)].y - 10}
                        fill={elem.color}
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="bg-black/60 px-1"
                      >
                        {elem.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Render In-Progress Drawing Line */}
              {isDrawing && currentPoints.length >= 2 && (
                <path
                  d={renderPathD(currentPoints)}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />
              )}

              {/* Animated Tracer Fire during simulation */}
              {simulationRunning && markers.length >= 2 && (
                <g opacity="0.75">
                  {markers.filter(m => m.side === 'friendly').slice(0, 3).map((fm, idx) => {
                    const fCoords = getMarkerCoords(fm);
                    const hostileTargets = markers.filter(m => m.side === 'hostile');
                    if (hostileTargets.length === 0) return null;
                    const target = hostileTargets[idx % hostileTargets.length];
                    const hCoords = getMarkerCoords(target);

                    return (
                      <line
                        key={`tracer-${fm.id}`}
                        x1={fCoords.x + 20}
                        y1={fCoords.y}
                        x2={hCoords.x - 20}
                        y2={hCoords.y}
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeDasharray="6 6"
                        className="animate-pulse"
                      />
                    );
                  })}
                </g>
              )}

              {/* Render NATO Markers with Dynamic Live Motion */}
              {markers.map(marker => {
                const isFriendly = marker.side === 'friendly';
                const bgFill = isFriendly ? '#0284c7' : '#dc2626';
                const strokeCol = isFriendly ? '#7dd3fc' : '#fca5a5';
                const coords = getMarkerCoords(marker);
                const liveOrg = getMarkerLiveOrg(marker);

                return (
                  <g
                    key={marker.id}
                    transform={`translate(${coords.x - 25}, ${coords.y - 15})`}
                    onClick={() => handleMarkerClick(marker.id)}
                    className="cursor-pointer transition-transform duration-300"
                  >
                    {/* Live Organization Bar */}
                    {simProgress > 0 && (
                      <g transform="translate(0, -10)">
                        <rect width="50" height="3.5" rx="1.5" fill="#1e293b" />
                        <rect
                          width={Math.max(0, Math.min(50, (liveOrg / 100) * 50))}
                          height="3.5"
                          rx="1.5"
                          fill={isFriendly ? '#22c55e' : '#ef4444'}
                        />
                      </g>
                    )}

                    {/* NATO Division Box */}
                    <rect
                      width="50"
                      height="30"
                      rx="3"
                      fill={bgFill}
                      stroke={strokeCol}
                      strokeWidth="1.5"
                      opacity="0.9"
                    />
                    {/* NATO Cross or Armor oval */}
                    {marker.symbol === 'armor' ? (
                      <ellipse cx="25" cy="15" rx="14" ry="7" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                    ) : (
                      <g stroke="#ffffff" strokeWidth="1.5">
                        <line x1="8" y1="5" x2="42" y2="25" />
                        <line x1="42" y1="5" x2="8" y2="25" />
                      </g>
                    )}
                    {/* Count badge */}
                    <rect x="34" y="-6" width="18" height="12" rx="2" fill="#0f172a" stroke={strokeCol} strokeWidth="1" />
                    <text x="43" y="3" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle">
                      {marker.count}
                    </text>
                    {/* Label below */}
                    <text x="25" y="42" fill="#f1f5f9" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      {marker.name}
                    </text>
                  </g>
                );
              })}

              {/* Central HOI4 Combat Bubble during Simulation */}
              {battleBubbleInfo && simProgress > 0 && (
                <g transform={`translate(${battleBubbleInfo.x}, ${battleBubbleInfo.y})`}>
                  <circle
                    cx="0"
                    cy="0"
                    r="20"
                    fill="#0f172a"
                    stroke={battleBubbleInfo.isWinning ? '#22c55e' : '#ef4444'}
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="16"
                    fill={battleBubbleInfo.isWinning ? '#15803d' : '#b91c1c'}
                  />
                  <polygon
                    points={battleBubbleInfo.isWinning ? "3,-3 8,0 3,3" : "-3,-3 -8,0 -3,3"}
                    fill="#ffffff"
                  />
                  <text
                    x={battleBubbleInfo.isWinning ? "-2" : "2"}
                    y="4"
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="900"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {battleBubbleInfo.score}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Tactical Notes of Current Plan */}
          <div className="rounded-xl border border-[#2b3a32] bg-[#101713] p-4">
            <h4 className="font-serif text-xs md:text-sm font-bold text-[#fde047] uppercase tracking-wide flex items-center gap-1.5 mb-2">
              <Info className="h-4 w-4 text-[#f59e0b]" />
              Catatan Doktrin Operasional: {currentPlan.name}
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#cbd5e1] leading-relaxed">
              {currentPlan.tacticalNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-[#141e17] rounded p-2 border border-[#1f2d24]">
                  <span className="text-[#f59e0b] font-bold">0{idx + 1}.</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Dynamic Battle Calculator & Simulation (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Battle Evaluation Summary Card */}
          <div className="rounded-xl border-2 border-[#b8860b]/60 bg-gradient-to-b from-[#17221b] to-[#101713] p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2b3a32] pb-3">
              <div className="flex items-center gap-2">
                <Swords className="h-5 w-5 text-[#f59e0b]" />
                <h3 className="font-serif text-base font-bold text-[#fef3c7] uppercase">
                  Kalkulator Hasil Pertempuran
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#34d399] bg-[#10b981]/20 px-2 py-0.5 rounded border border-[#10b981]/40">
                LIVE EVALUATION
              </span>
            </div>

            {/* Victory Probability Meter */}
            <div className="text-center py-2 bg-[#0c120f] rounded-lg border border-[#243329] p-3">
              <span className="text-xs font-mono text-[#94a3b8] uppercase">Peluang Penembusan Garis (Breakthrough):</span>
              <div className="mt-1 flex items-baseline justify-center gap-1">
                <span className={`font-serif text-4xl font-black ${
                  tacticalEvaluation.breakthroughProbability >= 70
                    ? 'text-[#34d399]'
                    : tacticalEvaluation.breakthroughProbability >= 45
                    ? 'text-[#fbbf24]'
                    : 'text-[#ef4444]'
                }`}>
                  {tacticalEvaluation.breakthroughProbability}%
                </span>
                <span className="text-xs font-mono text-[#64748b]">
                  {tacticalEvaluation.breakthroughProbability >= 70 ? '(Kemenangan Pasti)' : tacticalEvaluation.breakthroughProbability >= 45 ? '(Pertempuran Sengit)' : '(Gagal Mundur)'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-2 h-2.5 w-full bg-[#18241d] rounded-full overflow-hidden border border-[#2e4033]">
                <div
                  className={`h-full transition-all duration-300 ${
                    tacticalEvaluation.breakthroughProbability >= 70
                      ? 'bg-gradient-to-r from-[#10b981] to-[#34d399]'
                      : tacticalEvaluation.breakthroughProbability >= 45
                      ? 'bg-gradient-to-r from-[#d97706] to-[#f59e0b]'
                      : 'bg-gradient-to-r from-[#dc2626] to-[#ef4444]'
                  }`}
                  style={{ width: `${tacticalEvaluation.breakthroughProbability}%` }}
                />
              </div>
            </div>

            {/* Metric Breakdown Table */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#1f2d24]">
                <span className="text-[#cbd5e1]">Planning Bonus:</span>
                <strong className="text-[#34d399]">+{tacticalEvaluation.planningBonus}%</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1f2d24]">
                <span className="text-[#cbd5e1]">Dukungan Udara (Air/CAS):</span>
                <strong className={tacticalEvaluation.airFactor >= 0 ? 'text-[#38bdf8]' : 'text-[#ef4444]'}>
                  {tacticalEvaluation.airFactor >= 0 ? `+${tacticalEvaluation.airFactor}%` : `${tacticalEvaluation.airFactor}%`}
                </strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1f2d24]">
                <span className="text-[#cbd5e1]">Bonus Manuver Pincer:</span>
                <strong className="text-[#fde047]">+{tacticalEvaluation.encirclementBonus}%</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1f2d24]">
                <span className="text-[#cbd5e1]">Penalti Medan &amp; Sungai:</span>
                <strong className="text-[#ef4444]">
                  {tacticalEvaluation.terrainAttackMod + tacticalEvaluation.riverPen + tacticalEvaluation.mudPen}%
                </strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1f2d24]">
                <span className="text-[#cbd5e1]">Estimasi Waktu Tempur:</span>
                <strong className="text-[#f1f5f9]">{tacticalEvaluation.estimatedHours} Jam ({Math.round(tacticalEvaluation.estimatedHours / 24)} Hari)</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#cbd5e1]">Estimasi Korban Manpower:</span>
                <span className="text-right">
                  <span className="text-[#fca5a5]">-{tacticalEvaluation.attackerLossesEst.toLocaleString()} Kawan</span> / <span className="text-[#ef4444]">-{tacticalEvaluation.defenderLossesEst.toLocaleString()} Musuh</span>
                </span>
              </div>
            </div>

            {/* Simulation Run Control */}
            <div className="pt-2 border-t border-[#2b3a32] space-y-2">
              <button
                onClick={() => setSimulationRunning(!simulationRunning)}
                className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold uppercase transition-all shadow ${
                  simulationRunning
                    ? 'bg-[#ef4444] text-white hover:bg-[#dc2626]'
                    : 'bg-[#b8860b] text-[#121814] hover:bg-[#d97706]'
                }`}
              >
                {simulationRunning ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>Jeda Simulasi Tempur</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Jalankan Simulasi Pertempuran</span>
                  </>
                )}
              </button>

              {simulationHour > 0 && (
                <div className="text-center text-[11px] font-mono text-[#94a3b8]">
                  Waktu Berjalan: <strong>Jam {simulationHour} / {tacticalEvaluation.estimatedHours}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Operational Environment Sliders */}
          <div className="rounded-xl border border-[#2b3a32] bg-[#101713] p-4 space-y-3.5">
            <h4 className="font-serif text-xs font-bold text-[#fef3c7] uppercase tracking-wide flex items-center gap-1.5">
              <Sliders className="h-4 w-4 text-[#b8860b]" />
              Kondisi Medan &amp; Variabel Operasi
            </h4>

            {/* Preparation Planning Days */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#cbd5e1]">Hari Persiapan Rencana (Staff):</span>
                <strong className="text-[#fde047]">{planningBonusDays} Hari</strong>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={planningBonusDays}
                onChange={e => setPlanningBonusDays(parseInt(e.target.value, 10))}
                className="w-full accent-[#b8860b]"
              />
            </div>

            {/* Air Superiority */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#cbd5e1]">Superioritas Udara:</span>
                <strong className="text-[#38bdf8]">{airSuperiorityPercent}%</strong>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={airSuperiorityPercent}
                onChange={e => setAirSuperiorityPercent(parseInt(e.target.value, 10))}
                className="w-full accent-[#38bdf8]"
              />
            </div>

            {/* CAS Bombers */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#cbd5e1]">Pesawat Pengebom CAS:</span>
                <strong className="text-[#fbbf24]">{casBombersCount} Unit</strong>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={casBombersCount}
                onChange={e => setCasBombersCount(parseInt(e.target.value, 10))}
                className="w-full accent-[#fbbf24]"
              />
            </div>

            {/* Terrain Selector */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-[#cbd5e1] block">Tipe Medan Pertempuran:</label>
              <select
                value={terrainType}
                onChange={e => setTerrainType(e.target.value as any)}
                className="w-full rounded border border-[#243328] bg-[#141e17] py-1.5 px-2 text-xs text-[#f1f5f9] outline-none"
              >
                <option value="plains">Dataran Terbuka (Plains) - Netral</option>
                <option value="forest">Hutan Lebat (Forest) - Penalti -20%</option>
                <option value="hills">Perbukitan (Hills) - Penalti -30%</option>
                <option value="mountain">Pegunungan (Mountain) - Penalti -60%</option>
                <option value="urban">Pusat Kota (Urban) - Penalti -40%</option>
                <option value="marsh">Rawa Lumpur (Marsh) - Penalti -50%</option>
              </select>
            </div>

            {/* Environmental Checkboxes */}
            <div className="pt-2 border-t border-[#1f2d24] flex items-center justify-between gap-2">
              <label className="flex items-center gap-2 text-xs font-mono text-[#cbd5e1] cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasRiverCrossing}
                  onChange={e => setHasRiverCrossing(e.target.checked)}
                  className="rounded border-[#243328] text-[#b8860b] focus:ring-0"
                />
                <span>Menyeberang Sungai (-35%)</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-mono text-[#cbd5e1] cursor-pointer">
                <input
                  type="checkbox"
                  checked={weatherMud}
                  onChange={e => setWeatherMud(e.target.checked)}
                  className="rounded border-[#243328] text-[#b8860b] focus:ring-0"
                />
                <span>Lumpur Rasputitsa (-30%)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
