import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Play, Pause, SkipForward, SkipBack, Compass, MapPin,
  Crosshair, Flame, Shield, Swords, Flag, Layers, Eye,
  EyeOff, ZoomIn, ZoomOut, RotateCcw, Info, Calendar,
  Award, Activity, ArrowRight, Clock, Sparkles, Globe,
  CheckCircle2, AlertTriangle, ExternalLink
} from 'lucide-react';
import {
  WW2_TIMELINE_EVENTS,
  WW2TimelineEvent,
  BattleHotspot,
  TacticalArrow,
  FactionControl
} from '../data/ww2TimelineData';
import { EUROPE_MAP_COUNTRIES } from '../data/europeMapData';

interface WW2RealMapTimelineProps {
  onSyncWithSimulation?: (scenarioId: string, year: number) => void;
}

export const WW2RealMapTimeline: React.FC<WW2RealMapTimelineProps> = ({
  onSyncWithSimulation
}) => {
  const [selectedEventIndex, setSelectedEventIndex] = useState<number>(2); // Start at 1939 Outbreak of WW2
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(3500); // ms per step
  const [theaterFilter, setTheaterFilter] = useState<string>('all');
  const [selectedHotspot, setSelectedHotspot] = useState<BattleHotspot | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<BattleHotspot | null>(null);
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);

  // Map layer controls
  const [showArrows, setShowArrows] = useState<boolean>(true);
  const [showFrontlines, setShowFrontlines] = useState<boolean>(true);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [showCapitals, setShowCapitals] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const currentEvent = WW2_TIMELINE_EVENTS[selectedEventIndex] || WW2_TIMELINE_EVENTS[0];

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setSelectedEventIndex((prev) => {
          if (prev >= WW2_TIMELINE_EVENTS.length - 1) {
            setIsPlaying(false);
            return 0; // loop back
          }
          return prev + 1;
        });
      }, playSpeed);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, playSpeed]);

  // Reset selected hotspot when event changes
  useEffect(() => {
    setSelectedHotspot(null);
  }, [selectedEventIndex]);

  // Filtered events
  const filteredEvents = useMemo(() => {
    if (theaterFilter === 'all') return WW2_TIMELINE_EVENTS;
    return WW2_TIMELINE_EVENTS.filter((e) => e.theater === theaterFilter || e.theater === 'Total War');
  }, [theaterFilter]);

  // Determine Country Fill Color based on timeline territoryState
  const getCountryColor = (countryId: string) => {
    const status: FactionControl = currentEvent.territoryState[countryId] || 'Neutral';
    const isHovered = hoveredCountryId === countryId;

    switch (status) {
      case 'Axis':
        return isHovered ? '#dc2626' : '#991b1b'; // German / Axis core crimson
      case 'Axis_Occupied':
        return isHovered ? '#b91c1c' : '#7f1d1d'; // Deep occupied red
      case 'Allies':
        return isHovered ? '#3b82f6' : '#1d4ed8'; // Allied blue
      case 'Allied_Liberated':
        return isHovered ? '#60a5fa' : '#2563eb'; // Liberated bright blue
      case 'Comintern':
        return isHovered ? '#ef4444' : '#b91c1c'; // Soviet Red Army
      case 'Vichy':
        return isHovered ? '#f59e0b' : '#b45309'; // Amber puppet tone
      case 'Neutral':
      default:
        return isHovered ? '#475569' : '#1e293b'; // Neutral dark slate
    }
  };

  // Status label generator
  const getFactionBadge = (status: FactionControl) => {
    switch (status) {
      case 'Axis':
        return { label: 'Blok Poros (Axis Core)', color: 'bg-red-500/20 text-red-300 border-red-500/40' };
      case 'Axis_Occupied':
        return { label: 'Zona Pendudukan Poros', color: 'bg-rose-950/60 text-rose-300 border-rose-600/40' };
      case 'Allies':
        return { label: 'Sekutu Barat (Allies)', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
      case 'Allied_Liberated':
        return { label: 'Zona Dibebaskan Sekutu', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' };
      case 'Comintern':
        return { label: 'Komintern / Uni Soviet', color: 'bg-red-600/25 text-red-200 border-red-500/50' };
      case 'Vichy':
        return { label: 'Prancis Vichy (Netral Bersyarat)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'Neutral':
      default:
        return { label: 'Negara Netral', color: 'bg-slate-700/30 text-slate-400 border-slate-600/30' };
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setSelectedEventIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setSelectedEventIndex((prev) => Math.min(WW2_TIMELINE_EVENTS.length - 1, prev + 1));
  };

  return (
    <div className="space-y-5 text-[#f1f5f9]">
      {/* Top Header & Overview Bar */}
      <div className="rounded-xl border border-amber-500/40 bg-gradient-to-r from-[#170e0a] via-[#101321] to-[#0a121f] p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shadow-inner">
              <Compass className="h-7 w-7 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#fef3c7] uppercase">
                  Peta Realistis PD II & Garis Waktu Sejarah
                </h2>
                <span className="rounded bg-amber-500/25 border border-amber-500/50 px-2 py-0.5 text-[11px] font-mono text-amber-300 font-bold">
                  HISTORICAL WW2 THEATER MAP (1936–1945)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#cbd5e1] mt-0.5 max-w-3xl">
                Visualisasi dinamika teritorial nyata Perang Dunia II: pergeseran garis depan (frontlines), panah operasi militer, dan titik pertempuran utama yang membentuk jalannya simulasi perang global.
              </p>
            </div>
          </div>

          {/* Quick Action: Sync with War Simulator */}
          {onSyncWithSimulation && currentEvent.associatedScenarioId && (
            <button
              onClick={() => onSyncWithSimulation(currentEvent.associatedScenarioId!, currentEvent.year)}
              className="px-4 py-2.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg border border-red-400/40 transition-all hover:scale-105 active:scale-95"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Muat Skenario [{currentEvent.year}] ke Simulator</span>
            </button>
          )}
        </div>

        {/* Timeline Playback Controls Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Player controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={selectedEventIndex === 0}
              className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 transition-all"
              title="Peristiwa Sebelumnya"
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 transition-all ${
                isPlaying
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-red-600 text-white hover:bg-red-500'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" /> <span>Jeda Penjelajahan</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> <span>Putar Linimasa Otomatis</span>
                </>
              )}
            </button>

            <button
              onClick={handleNext}
              disabled={selectedEventIndex === WW2_TIMELINE_EVENTS.length - 1}
              className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 transition-all"
              title="Peristiwa Berikutnya"
            >
              <SkipForward className="h-4 w-4" />
            </button>

            {/* Play Speed Toggle */}
            <button
              onClick={() => setPlaySpeed((s) => (s === 3500 ? 1800 : 3500))}
              className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[11px] font-mono text-[#94a3b8] hover:text-white"
            >
              Kecepatan: {playSpeed === 3500 ? '1x' : '2x'}
            </button>
          </div>

          {/* Current Date & Year Display */}
          <div className="flex items-center gap-3 bg-black/40 px-3.5 py-2 rounded-lg border border-white/10">
            <div className="flex items-center gap-1.5 text-amber-300 font-mono font-bold text-sm">
              <Calendar className="h-4 w-4" />
              <span>{currentEvent.dateStr}</span>
            </div>
            <span className="text-white/20">|</span>
            <span className="text-xs font-mono text-[#94a3b8]">{currentEvent.phase}</span>
          </div>

          {/* Theater Filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'Semua Medan' },
              { id: 'Western Europe', label: 'Front Barat' },
              { id: 'Eastern Front', label: 'Front Timur' },
              { id: 'Total War', label: 'Perang Total' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheaterFilter(t.id)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                  theaterFilter === t.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-[#94a3b8] hover:text-white bg-white/5'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Stepper / Scrubber Bar */}
        <div className="mt-4 pt-3 border-t border-white/5">
          <div className="relative flex items-center justify-between gap-1 overflow-x-auto pb-2">
            {WW2_TIMELINE_EVENTS.map((event, idx) => {
              const isSelected = selectedEventIndex === idx;
              const isPast = idx < selectedEventIndex;

              return (
                <button
                  key={event.id}
                  onClick={() => {
                    setIsPlaying(false);
                    setSelectedEventIndex(idx);
                  }}
                  className={`flex flex-col items-center min-w-[70px] sm:min-w-[85px] group transition-all text-center`}
                >
                  <div className="relative flex items-center justify-center mb-1">
                    <div
                      className={`w-3.5 h-3.5 rounded-full transition-all flex items-center justify-center ${
                        isSelected
                          ? 'bg-amber-400 ring-4 ring-amber-400/30 scale-125'
                          : isPast
                          ? 'bg-red-500/70'
                          : 'bg-slate-700 group-hover:bg-slate-500'
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold leading-tight ${
                      isSelected ? 'text-amber-300' : isPast ? 'text-[#cbd5e1]' : 'text-slate-500'
                    }`}
                  >
                    {event.year}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate max-w-[80px] hidden sm:block">
                    {event.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Layout: Realistic WW2 Map (Left 8 cols) & Tactical Intel Drawer (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* WWII Interactive Map View (8 cols) */}
        <div className="lg:col-span-8 rounded-xl border border-[#273256] bg-[#070b16] p-4 shadow-xl relative overflow-hidden flex flex-col">
          {/* Map Layer Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-[#1b2542] text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-amber-300 font-bold flex items-center gap-1.5">
                <Flag className="h-4 w-4 text-red-500" />
                <span>Teater Operasi Eropa & Mediterania</span>
              </span>
              <span className="text-[11px] text-[#94a3b8]">
                {currentEvent.title}
              </span>
            </div>

            {/* Layer Toggles & Zoom */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setShowArrows(!showArrows)}
                className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 border transition-all ${
                  showArrows
                    ? 'bg-red-500/20 text-red-300 border-red-500/40'
                    : 'bg-white/5 text-slate-500 border-white/5'
                }`}
                title="Tampilkan/Sembunyikan Panah Serangan Taktis"
              >
                <ArrowRight className="h-3 w-3" />
                <span>Panah Serang</span>
              </button>

              <button
                onClick={() => setShowFrontlines(!showFrontlines)}
                className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 border transition-all ${
                  showFrontlines
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    : 'bg-white/5 text-slate-500 border-white/5'
                }`}
                title="Tampilkan/Sembunyikan Garis Front Pertempuran"
              >
                <Activity className="h-3 w-3" />
                <span>Garis Depan</span>
              </button>

              <button
                onClick={() => setShowHotspots(!showHotspots)}
                className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 border transition-all ${
                  showHotspots
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-white/5 text-slate-500 border-white/5'
                }`}
                title="Tampilkan/Sembunyikan Titik Pertempuran Kunci"
              >
                <Crosshair className="h-3 w-3" />
                <span>Pertempuran</span>
              </button>

              {/* Zoom Buttons */}
              <div className="flex items-center border border-white/10 rounded overflow-hidden ml-1">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.15))}
                  className="p-1 hover:bg-white/10 text-slate-300"
                  title="Perbesar Peta"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.15))}
                  className="p-1 hover:bg-white/10 text-slate-300"
                  title="Perkecil Peta"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => {
                    setZoomLevel(1);
                    setPanOffset({ x: 0, y: 0 });
                  }}
                  className="p-1 hover:bg-white/10 text-slate-300"
                  title="Reset Skala Peta"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* SVG Real WWII Map Canvas */}
          <div className="relative w-full bg-[#080d1a] rounded-lg border border-[#1b2542] overflow-hidden min-h-[440px] sm:min-h-[500px]">
            {/* Background Map Water & Grid Texture */}
            <svg
              viewBox="0 0 1000 650"
              className="w-full h-auto transition-transform duration-300 select-none"
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`
              }}
            >
              <defs>
                {/* Ocean Background Gradient */}
                <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#08101e" />
                  <stop offset="50%" stopColor="#0b162c" />
                  <stop offset="100%" stopColor="#070e1b" />
                </linearGradient>

                {/* Arrow markers */}
                <marker
                  id="arrowhead-axis"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <polygon points="0 0, 8 4, 0 8" fill="#ef4444" />
                </marker>
                <marker
                  id="arrowhead-allies"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <polygon points="0 0, 8 4, 0 8" fill="#3b82f6" />
                </marker>
                <marker
                  id="arrowhead-soviet"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <polygon points="0 0, 8 4, 0 8" fill="#dc2626" />
                </marker>

                {/* Radar pulse animation for hotspots */}
                <radialGradient id="hotspotGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#ef4444" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Water Background */}
              <rect width="1000" height="650" fill="url(#oceanGrad)" />

              {/* Latitude and Longitude Grid Lines */}
              <g stroke="#1a2744" strokeWidth="0.5" strokeDasharray="3,6">
                <line x1="0" y1="120" x2="1000" y2="120" />
                <line x1="0" y1="240" x2="1000" y2="240" />
                <line x1="0" y1="360" x2="1000" y2="360" />
                <line x1="0" y1="480" x2="1000" y2="480" />
                <line x1="0" y1="600" x2="1000" y2="600" />
                <line x1="200" y1="0" x2="200" y2="650" />
                <line x1="400" y1="0" x2="400" y2="650" />
                <line x1="600" y1="0" x2="600" y2="650" />
                <line x1="800" y1="0" x2="800" y2="650" />
              </g>

              {/* Sea Zone Water Body Labels */}
              <g fill="#1f3254" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="3">
                <text x="180" y="180">SAMUDRA ATLANTIK UTARA</text>
                <text x="360" y="220">LAUT UTARA</text>
                <text x="560" y="190">LAUT BALTIK</text>
                <text x="440" y="520">LAUT MEDITERANIA</text>
                <text x="750" y="470">LAUT HITAM</text>
                <text x="50" y="620">AFRIKA UTARA (SAHARA)</text>
              </g>

              {/* North Africa Coastline Continent Base */}
              <path
                d="M 50 640 L 50 560 L 150 550 L 250 540 L 350 520 L 450 530 L 520 540 L 620 570 L 750 590 L 850 610 L 980 630 L 980 650 L 50 650 Z"
                fill="#181f28"
                stroke="#2a384f"
                strokeWidth="1"
              />
              <text x="280" y="590" fill="#3b4d66" fontSize="10" fontFamily="serif" fontWeight="bold">
                AFRIKA UTARA (KOLONI PRANCIS, ITALIA & INGGRIS)
              </text>

              {/* Countries / Territories Polygonal Layers */}
              <g>
                {EUROPE_MAP_COUNTRIES.map((country) => {
                  const fillColor = getCountryColor(country.id);
                  const isHovered = hoveredCountryId === country.id;
                  const status = currentEvent.territoryState[country.id] || 'Neutral';

                  return (
                    <g
                      key={country.id}
                      onMouseEnter={() => setHoveredCountryId(country.id)}
                      onMouseLeave={() => setHoveredCountryId(null)}
                      className="cursor-pointer transition-all duration-200"
                    >
                      {/* Country Main Polygon */}
                      <path
                        d={country.pathD}
                        fill={fillColor}
                        stroke={isHovered ? '#fbbf24' : '#0f172a'}
                        strokeWidth={isHovered ? '2' : '1'}
                        className="transition-colors duration-300"
                      />

                      {/* Country Secondary Polygons (Islands/Exclaves) */}
                      {country.secondaryPathsD?.map((secD, idx) => (
                        <path
                          key={idx}
                          d={secD}
                          fill={fillColor}
                          stroke={isHovered ? '#fbbf24' : '#0f172a'}
                          strokeWidth={isHovered ? '2' : '1'}
                          className="transition-colors duration-300"
                        />
                      ))}

                      {/* Country Label */}
                      <text
                        x={country.labelPos.x}
                        y={country.labelPos.y}
                        textAnchor="middle"
                        fill={status === 'Axis' || status === 'Comintern' ? '#ffffff' : '#cbd5e1'}
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="serif"
                        className="pointer-events-none drop-shadow"
                      >
                        {country.name.split(' ')[0]}
                      </text>

                      {/* Capital City Marker */}
                      {showCapitals && (
                        <circle
                          cx={country.capitalPos.x}
                          cy={country.capitalPos.y}
                          r="2.5"
                          fill="#fef08a"
                          stroke="#1e293b"
                          strokeWidth="0.8"
                          className="pointer-events-none"
                        />
                      )}
                    </g>
                  );
                })}
              </g>

              {/* Active Military Frontlines */}
              {showFrontlines && (
                <g>
                  {currentEvent.frontlines.map((front, idx) => (
                    <g key={idx}>
                      {/* Glow outline */}
                      <path
                        d={front.pathD}
                        fill="none"
                        stroke={front.color}
                        strokeWidth="5"
                        strokeOpacity="0.3"
                        strokeLinecap="round"
                      />
                      {/* Sharp front contour */}
                      <path
                        d={front.pathD}
                        fill="none"
                        stroke={front.color}
                        strokeWidth="2.5"
                        strokeDasharray={front.dashed ? '6,4' : 'none'}
                        strokeLinecap="round"
                      />
                    </g>
                  ))}
                </g>
              )}

              {/* Tactical Military Offensive Arrows */}
              {showArrows && (
                <g>
                  {currentEvent.tacticalArrows.map((arrow) => {
                    const markerId =
                      arrow.attacker === 'Axis'
                        ? 'url(#arrowhead-axis)'
                        : arrow.attacker === 'Allies'
                        ? 'url(#arrowhead-allies)'
                        : 'url(#arrowhead-soviet)';

                    return (
                      <g key={arrow.id} className="animate-pulse">
                        {/* Shadow / glow */}
                        <path
                          d={arrow.pathD}
                          fill="none"
                          stroke={arrow.color}
                          strokeWidth="5"
                          strokeOpacity="0.3"
                          strokeLinecap="round"
                        />
                        {/* Main Arrow Line */}
                        <path
                          d={arrow.pathD}
                          fill="none"
                          stroke={arrow.color}
                          strokeWidth="2.8"
                          strokeDasharray="8,4"
                          markerEnd={markerId}
                          strokeLinecap="round"
                        />
                      </g>
                    );
                  })}
                </g>
              )}

              {/* Battle Hotspots (Pulsing Radar Pins) */}
              {showHotspots && (
                <g>
                  {currentEvent.hotspots.map((spot) => {
                    const isSelected = selectedHotspot?.id === spot.id;
                    const isHovered = hoveredHotspot?.id === spot.id;

                    return (
                      <g
                        key={spot.id}
                        transform={`translate(${spot.x}, ${spot.y})`}
                        onClick={() => setSelectedHotspot(spot)}
                        onMouseEnter={() => setHoveredHotspot(spot)}
                        onMouseLeave={() => setHoveredHotspot(null)}
                        className="cursor-pointer"
                      >
                        {/* Pulsing ring */}
                        <circle
                          r={isSelected ? '14' : isHovered ? '12' : '9'}
                          fill="url(#hotspotGlow)"
                          className="animate-ping"
                          opacity="0.75"
                        />

                        {/* Solid pin core */}
                        <circle
                          r="5.5"
                          fill={spot.outcome === 'Axis Victory' ? '#ef4444' : spot.outcome === 'Allied Victory' ? '#3b82f6' : '#dc2626'}
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />

                        {/* Mini crosshair / sword icon indicator */}
                        <circle r="2" fill="#ffffff" />

                        {/* Label tag above the spot */}
                        <rect
                          x="-45"
                          y="-24"
                          width="90"
                          height="15"
                          rx="3"
                          fill="#090e1c"
                          stroke="#eab308"
                          strokeWidth="0.8"
                          opacity={isSelected || isHovered ? '1' : '0.85'}
                        />
                        <text
                          x="0"
                          y="-13"
                          textAnchor="middle"
                          fill="#fef08a"
                          fontSize="8"
                          fontFamily="sans-serif"
                          fontWeight="bold"
                        >
                          {spot.name.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}
            </svg>

            {/* Quick Country Hover Legend Tooltip (Bottom Left of Canvas) */}
            {hoveredCountryId && (
              <div className="absolute bottom-3 left-3 bg-[#0c1224]/95 border border-white/20 p-2.5 rounded-lg shadow-xl text-xs font-mono backdrop-blur pointer-events-none z-10 max-w-xs">
                {(() => {
                  const country = EUROPE_MAP_COUNTRIES.find((c) => c.id === hoveredCountryId);
                  const status = currentEvent.territoryState[hoveredCountryId] || 'Neutral';
                  const badge = getFactionBadge(status);

                  return (
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{country?.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#94a3b8] mt-1">
                        Ibukota: <strong className="text-amber-300">{country?.capital}</strong>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Selected Hotspot Float Card (Top Right of Canvas) */}
            {(selectedHotspot || hoveredHotspot) && (
              <div className="absolute top-3 right-3 bg-[#0d1326]/95 border border-amber-500/50 p-3.5 rounded-xl shadow-2xl text-xs font-mono backdrop-blur z-10 max-w-sm">
                {(() => {
                  const s = selectedHotspot || hoveredHotspot!;
                  return (
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <Flame className="h-4 w-4 text-red-500 shrink-0" />
                          <strong className="text-amber-200 font-bold text-sm">{s.name}</strong>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          s.outcome === 'Axis Victory' ? 'bg-red-500/20 text-red-300' :
                          s.outcome === 'Allied Victory' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-rose-500/20 text-rose-300'
                        }`}>
                          {s.outcome}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#cbd5e1] leading-relaxed">
                        {s.significance}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#94a3b8] pt-1">
                        <span>Tanggal: <strong className="text-white">{s.date}</strong></span>
                        <span>Korban: <strong className="text-red-400">{s.casualties}</strong></span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Map Legend Bar */}
          <div className="mt-3 pt-3 border-t border-[#1b2542] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-[#94a3b8] font-bold">Keterangan Faksi:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-700 inline-block border border-red-500" />
                <span className="text-slate-300">Blok Poros (Axis)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-600 inline-block border border-blue-400" />
                <span className="text-slate-300">Sekutu Barat (Allies)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-600 inline-block border border-rose-400" />
                <span className="text-slate-300">Uni Soviet (Comintern)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-600 inline-block border border-amber-400" />
                <span className="text-slate-300">Prancis Vichy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-700 inline-block border border-slate-500" />
                <span className="text-slate-400">Netral</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-4 h-0.5 bg-red-500 inline-block" /> Garis Depan Aktif
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" /> Pertempuran Kunci
              </span>
            </div>
          </div>
        </div>

        {/* Tactical Intel & Briefing Drawer (Right 4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Event Historical Card */}
          <div className="rounded-xl border border-red-500/40 bg-[#0a0f1e] p-5 shadow-xl space-y-4">
            <div className="border-b border-red-500/20 pb-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#94a3b8]">
                <span>Peristiwa #{selectedEventIndex + 1} dari {WW2_TIMELINE_EVENTS.length}</span>
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-bold">
                  {currentEvent.theater}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#fef3c7] mt-1.5 leading-snug">
                {currentEvent.title}
              </h3>
              <span className="text-xs font-mono text-amber-400 block mt-0.5">
                {currentEvent.subtitle}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              {currentEvent.description}
            </p>

            {/* Belligerents Box */}
            <div className="p-3 rounded-lg bg-black/40 border border-white/10 space-y-1.5 text-xs font-mono">
              <div>
                <span className="text-red-400 font-bold block">Pihak Penyerang / Inisiator:</span>
                <span className="text-white text-[11px]">{currentEvent.belligerents.attackers}</span>
              </div>
              <div className="pt-1 border-t border-white/5">
                <span className="text-blue-400 font-bold block">Pihak Bertahan:</span>
                <span className="text-white text-[11px]">{currentEvent.belligerents.defenders}</span>
              </div>
            </div>

            {/* Commanders and Casualties */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[10px] text-[#94a3b8] block">Komandan Utama:</span>
                <span className="text-[11px] font-bold text-white truncate block mt-0.5">
                  {currentEvent.keyLeaders.slice(0, 2).join(', ')}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[10px] text-[#94a3b8] block">Estimasi Korban:</span>
                <span className="text-[11px] font-bold text-red-400 truncate block mt-0.5">
                  {currentEvent.totalCasualtiesEstimate.split(';')[0]}
                </span>
              </div>
            </div>

            {/* Strategic Impact */}
            <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/30 text-xs">
              <strong className="text-amber-300 font-mono flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5" /> Konsekuensi Geopolitik & Militer:
              </strong>
              <p className="text-[11px] text-[#cbd5e1] mt-1 leading-relaxed">
                {currentEvent.impactSummary}
              </p>
            </div>

            {/* HOI4 Mechanic Advice */}
            <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-xs">
              <strong className="text-indigo-300 font-mono flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" /> Mekanisme Game Hearts of Iron IV:
              </strong>
              <p className="text-[11px] text-[#cbd5e1] mt-1 font-mono leading-relaxed">
                {currentEvent.hoi4MechanicTip}
              </p>
            </div>

            {/* Direct Sync button inside drawer */}
            {onSyncWithSimulation && currentEvent.associatedScenarioId && (
              <button
                onClick={() => onSyncWithSimulation(currentEvent.associatedScenarioId!, currentEvent.year)}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Activity className="h-4 w-4" />
                <span>Muat Data Tahun {currentEvent.year} ke Simulator Perang</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
