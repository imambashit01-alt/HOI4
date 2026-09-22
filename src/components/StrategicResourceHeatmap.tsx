import React, { useState, useMemo } from 'react';
import {
  Globe, Fuel, Shield, Swords, Layers, Compass, AlertTriangle,
  CheckCircle2, Navigation, TrendingUp, Sparkles, Filter, ChevronRight,
  RefreshCw, BarChart3, Factory, Truck, Plane, Anchor, Search,
  Eye, Zap, Award, BookOpen, ExternalLink, ArrowRight, ShieldAlert,
  Info, Skull, Target
} from 'lucide-react';
import {
  CriticalResourceType,
  StrategicResourceHotspot,
  StrategicChokepoint,
  StrategicConvoyRoute
} from '../types';
import {
  CRITICAL_RESOURCES_META,
  STRATEGIC_RESOURCE_HOTSPOTS,
  STRATEGIC_CHOKEPOINTS,
  STRATEGIC_CONVOY_ROUTES,
  MAJOR_RESOURCE_DOMINATION_GUIDES,
  MajorResourceDominationGuide
} from '../data/strategicResourcesData';

interface StrategicResourceHeatmapProps {
  onNavigateToCountry?: (countryId: string) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const StrategicResourceHeatmap: React.FC<StrategicResourceHeatmapProps> = ({
  onNavigateToCountry,
  onNavigateToTab
}) => {
  // Primary State
  const [selectedResourceType, setSelectedResourceType] = useState<CriticalResourceType | 'all'>('all');
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('hotspot-malaya-rubber');
  const [selectedTheatre, setSelectedTheatre] = useState<'global' | 'asia_pacific' | 'europe' | 'americas' | 'middle_east'>('global');
  const [activeSubTab, setActiveSubTab] = useState<'heatmap_map' | 'domination_playbook' | 'synthetic_calculator' | 'monopoly_analytics'>('heatmap_map');

  // Map Filter Options
  const [showHeatmapGlow, setShowHeatmapGlow] = useState<boolean>(true);
  const [showConvoyRoutes, setShowConvoyRoutes] = useState<boolean>(true);
  const [showChokepoints, setShowChokepoints] = useState<boolean>(true);
  const [factionFilter, setFactionFilter] = useState<'all' | 'Allies' | 'Axis' | 'Comintern' | 'Neutral'>('all');
  const [minUnitsFilter, setMinUnitsFilter] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Major Playbook State
  const [selectedMajorTag, setSelectedMajorTag] = useState<string>('GER');

  // Synthetic Calculator State
  const [calcTargetResource, setCalcTargetResource] = useState<'rubber' | 'oil'>('rubber');
  const [calcTargetDeficitUnits, setCalcTargetDeficitUnits] = useState<number>(40);
  const [calcSyntheticTechLevel, setCalcSyntheticTechLevel] = useState<number>(2); // Level 1 - 4
  const [calcExcavationLevel, setCalcExcavationLevel] = useState<number>(2); // Level 0 - 5
  const [calcCountryContext, setCalcCountryContext] = useState<'GER' | 'JAP' | 'ITA' | 'ENG' | 'SOV'>('GER');

  // Geopolitical Simulation State
  const [simulatedScenario, setSimulatedScenario] = useState<'1936_start' | 'axis_triumph' | 'allied_blockade'>('1936_start');

  // Get currently selected hotspot
  const selectedHotspot = useMemo(() => {
    return STRATEGIC_RESOURCE_HOTSPOTS.find(h => h.id === selectedHotspotId) || STRATEGIC_RESOURCE_HOTSPOTS[0];
  }, [selectedHotspotId]);

  // Filtered hotspots for map and list
  const filteredHotspots = useMemo(() => {
    return STRATEGIC_RESOURCE_HOTSPOTS.filter(spot => {
      // Resource filter
      if (selectedResourceType !== 'all' && spot.resourceType !== selectedResourceType) return false;
      // Faction filter
      if (factionFilter !== 'all' && spot.faction !== factionFilter) return false;
      // Min amount filter
      if (spot.amount1936 < minUnitsFilter) return false;
      // Search filter
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const match = spot.name.toLowerCase().includes(q) ||
          spot.countryName.toLowerCase().includes(q) ||
          spot.countryTag.toLowerCase().includes(q) ||
          spot.keyProvinces.some(p => p.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [selectedResourceType, factionFilter, minUnitsFilter, searchFilter]);

  // Selected Major Domination Guide
  const selectedDominationGuide = useMemo(() => {
    return MAJOR_RESOURCE_DOMINATION_GUIDES.find(g => g.tag === selectedMajorTag) || MAJOR_RESOURCE_DOMINATION_GUIDES[0];
  }, [selectedMajorTag]);

  // Dynamic Viewport / Zoom based on selected theatre
  const viewBox = useMemo(() => {
    switch (selectedTheatre) {
      case 'asia_pacific':
        return '620 200 280 240'; // Zoom on SE Asia, East Indies, Japan, India
      case 'europe':
        return '390 100 260 170'; // Zoom on Europe, Romania, Portugal, Caucasus
      case 'middle_east':
        return '530 170 170 140'; // Zoom on Middle East, Suez, Abadan, Baku
      case 'americas':
        return '130 140 240 200'; // Zoom on North & South America, Texas, Venezuela
      case 'global':
      default:
        return '0 0 1000 520';
    }
  }, [selectedTheatre]);

  // Synthetic Calculator Computations
  const calcResults = useMemo(() => {
    // Each synthetic refinery base gives:
    // Oil: 3 base (Tech 1: +1, Tech 2: +2, Tech 3: +3, Tech 4: +5)
    // Rubber: 2 base (Tech 1: +1, Tech 2: +2, Tech 3: +3, Tech 4: +4)
    const oilPerRefinery = 3 + (calcSyntheticTechLevel >= 2 ? 1 : 0) + (calcSyntheticTechLevel >= 3 ? 2 : 0) + (calcSyntheticTechLevel >= 4 ? 2 : 0);
    const rubberPerRefinery = 2 + (calcSyntheticTechLevel >= 2 ? 1 : 0) + (calcSyntheticTechLevel >= 3 ? 1 : 0) + (calcSyntheticTechLevel >= 4 ? 1 : 0);

    const yieldPerRefinery = calcTargetResource === 'oil' ? oilPerRefinery : rubberPerRefinery;
    const refineriesNeeded = Math.ceil(calcTargetDeficitUnits / Math.max(yieldPerRefinery, 1));

    // Construction cost in civ factory days (Base 14,500 IC per refinery in HOI4)
    const baseIcCost = 14500;
    const totalIcCost = refineriesNeeded * baseIcCost;
    // With 15 civs (1 full line = 75 IC/day):
    const daysWith1Line = Math.ceil(totalIcCost / 75);
    // With 3 lines (45 civs = 225 IC/day):
    const daysWith3Lines = Math.ceil(totalIcCost / 225);

    // Fuel yield: 1 Oil = 48 Fuel/day (or up to 96 with refining tech)
    const dailyFuelEquivalent = (calcTargetResource === 'oil' ? calcTargetDeficitUnits : refineriesNeeded * oilPerRefinery) * (48 + calcSyntheticTechLevel * 12);

    return {
      yieldPerRefinery,
      refineriesNeeded,
      totalIcCost,
      daysWith1Line,
      daysWith3Lines,
      dailyFuelEquivalent
    };
  }, [calcTargetResource, calcTargetDeficitUnits, calcSyntheticTechLevel]);

  // Monopoly distribution calculation based on current scenario
  const monopolyStats = useMemo(() => {
    const totals = {
      rubber: { Allies: 0, Axis: 0, Comintern: 0, Neutral: 0, total: 0 },
      tungsten: { Allies: 0, Axis: 0, Comintern: 0, Neutral: 0, total: 0 },
      oil: { Allies: 0, Axis: 0, Comintern: 0, Neutral: 0, total: 0 }
    };

    STRATEGIC_RESOURCE_HOTSPOTS.forEach(spot => {
      let f = spot.faction;
      // In simulated scenarios:
      if (simulatedScenario === 'axis_triumph') {
        if (spot.id === 'hotspot-malaya-rubber' || spot.id === 'hotspot-sumatra-rubber-oil' || spot.id === 'hotspot-borneo-oil-rubber') {
          f = 'Axis'; // Japan took them
        }
        if (spot.id === 'hotspot-romania-oil' || spot.id === 'hotspot-baku-oil' || spot.id === 'hotspot-portugal-tungsten') {
          f = 'Axis'; // Germany took them
        }
      } else if (simulatedScenario === 'allied_blockade') {
        // Portugal & Spain cut off Axis
        if (spot.id === 'hotspot-portugal-tungsten' || spot.id === 'hotspot-spain-tungsten') {
          f = 'Allies';
        }
      }

      totals[spot.resourceType][f] += spot.amount1936;
      totals[spot.resourceType].total += spot.amount1936;
    });

    return totals;
  }, [simulatedScenario]);

  // Helper color by faction
  const getFactionColor = (faction: string) => {
    switch (faction) {
      case 'Axis':
        return '#ef4444';
      case 'Allies':
        return '#3b82f6';
      case 'Comintern':
        return '#f43f5e';
      case 'Neutral':
      default:
        return '#a855f7';
    }
  };

  // Helper color by resource
  const getResourceColor = (type: CriticalResourceType) => {
    return CRITICAL_RESOURCES_META[type].color;
  };

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="relative overflow-hidden rounded-2xl border border-[#b8860b]/60 bg-gradient-to-r from-[#17211a] via-[#121915] to-[#0d141f] p-5 md:p-6 shadow-2xl">
        {/* Tactical camo top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-500" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="rounded border border-amber-500/50 bg-amber-950/70 px-2.5 py-0.5 font-mono text-xs font-bold text-amber-300">
                WAR ROOM PD II • STRATEGIC INTELLIGENCE
              </span>
              <span className="rounded border border-emerald-500/40 bg-emerald-950/60 px-2 py-0.5 font-mono text-xs text-emerald-300 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>Heatmap Interaktif 1936-1945</span>
              </span>
              <span className="rounded border border-red-500/40 bg-red-950/60 px-2 py-0.5 font-mono text-xs text-red-300">
                Pondasi Dominasi Dunia
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black font-serif text-[#fef3c7] tracking-tight">
              PETA PANAS SUMBER DAYA VITAL (RUBBER, TUNGSTEN, OIL)
            </h1>

            <p className="text-xs sm:text-sm text-[#cbd5e1] max-w-4xl leading-relaxed">
              Tiga pilar kelaparan alutsista global: <strong>Karet (Rubber)</strong> untuk sayap pesawat &amp; truk motorized, <strong>Wolfram (Tungsten)</strong> untuk meriam penetrasi tank medium/heavy, dan <strong>Minyak Bumi (Oil)</strong> sebagai urat nadi bahan bakar armada laut &amp; korps lapis baja.
            </p>
          </div>

          {/* 3 Vital Resource Quick Cards */}
          <div className="grid grid-cols-3 gap-2.5 shrink-0 bg-[#09110d] p-3 rounded-xl border border-[#203327]">
            {/* Rubber */}
            <button
              onClick={() => setSelectedResourceType(selectedResourceType === 'rubber' ? 'all' : 'rubber')}
              className={`p-2 rounded-lg border text-left transition-all ${
                selectedResourceType === 'rubber'
                  ? 'border-emerald-400 bg-emerald-950/80 shadow-md shadow-emerald-950/50'
                  : 'border-[#1b3024] bg-[#0c1a13] hover:border-emerald-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">🌿</span>
                <span className="text-[10px] font-mono font-bold text-emerald-400">RUBBER</span>
              </div>
              <div className="text-sm font-black font-mono text-emerald-200 mt-1">1,085 u</div>
              <div className="text-[10px] text-[#94a3b8] truncate">92% Asia Tenggara</div>
            </button>

            {/* Tungsten */}
            <button
              onClick={() => setSelectedResourceType(selectedResourceType === 'tungsten' ? 'all' : 'tungsten')}
              className={`p-2 rounded-lg border text-left transition-all ${
                selectedResourceType === 'tungsten'
                  ? 'border-orange-400 bg-orange-950/80 shadow-md shadow-orange-950/50'
                  : 'border-[#302217] bg-[#1a120c] hover:border-orange-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">🔩</span>
                <span className="text-[10px] font-mono font-bold text-orange-400">TUNGSTEN</span>
              </div>
              <div className="text-sm font-black font-mono text-orange-200 mt-1">780 u</div>
              <div className="text-[10px] text-[#94a3b8] truncate">Portugal &amp; Burma</div>
            </button>

            {/* Oil */}
            <button
              onClick={() => setSelectedResourceType(selectedResourceType === 'oil' ? 'all' : 'oil')}
              className={`p-2 rounded-lg border text-left transition-all ${
                selectedResourceType === 'oil'
                  ? 'border-amber-400 bg-amber-950/80 shadow-md shadow-amber-950/50'
                  : 'border-[#332a18] bg-[#1a160c] hover:border-amber-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">🛢️</span>
                <span className="text-[10px] font-mono font-bold text-amber-400">OIL &amp; FUEL</span>
              </div>
              <div className="text-sm font-black font-mono text-amber-200 mt-1">1,420 u</div>
              <div className="text-[10px] text-[#94a3b8] truncate">USA, USSR &amp; Ploiești</div>
            </button>
          </div>
        </div>

        {/* Primary Sub-Tabs Navigation */}
        <div className="mt-5 flex gap-2 overflow-x-auto border-t border-[#233529] pt-4 scrollbar-thin">
          <button
            id="tab-heatmap-map"
            onClick={() => setActiveSubTab('heatmap_map')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeSubTab === 'heatmap_map'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-950/40'
                : 'bg-[#141f19] text-[#94a3b8] hover:text-white hover:bg-[#1c2c23]'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Peta Panas Taktis (Heatmap Canvas)</span>
          </button>

          <button
            id="tab-domination-playbook"
            onClick={() => setActiveSubTab('domination_playbook')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeSubTab === 'domination_playbook'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/40'
                : 'bg-[#141f19] text-[#94a3b8] hover:text-white hover:bg-[#1c2c23]'
            }`}
          >
            <Swords className="h-4 w-4" />
            <span>Doktrin Dominasi 7 Negara Adidaya</span>
          </button>

          <button
            id="tab-synthetic-calculator"
            onClick={() => setActiveSubTab('synthetic_calculator')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeSubTab === 'synthetic_calculator'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40'
                : 'bg-[#141f19] text-[#94a3b8] hover:text-white hover:bg-[#1c2c23]'
            }`}
          >
            <Factory className="h-4 w-4" />
            <span>Kalkulator Kilang Sintetis &amp; Autarky</span>
          </button>

          <button
            id="tab-monopoly-analytics"
            onClick={() => setActiveSubTab('monopoly_analytics')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeSubTab === 'monopoly_analytics'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-950/40'
                : 'bg-[#141f19] text-[#94a3b8] hover:text-white hover:bg-[#1c2c23]'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Analisis Monopoli &amp; Skenario Blokade</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: HEATMAP MAP CANVAS + CONTROLS + INSPECTOR                      */}
      {/* ========================================================================= */}
      {activeSubTab === 'heatmap_map' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="rounded-xl border border-[#26372c] bg-[#111915] p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Filter Group 1: Resource Select */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-mono text-[#94a3b8] font-semibold flex items-center gap-1">
                <Filter className="h-3.5 w-3.5 text-amber-400" />
                <span>Sumber Daya:</span>
              </span>
              {(['all', 'rubber', 'tungsten', 'oil'] as const).map(res => (
                <button
                  key={res}
                  onClick={() => setSelectedResourceType(res)}
                  className={`px-3 py-1.5 rounded-md font-bold uppercase transition-all flex items-center gap-1 ${
                    selectedResourceType === res
                      ? res === 'rubber'
                        ? 'bg-emerald-500 text-black shadow'
                        : res === 'tungsten'
                        ? 'bg-orange-500 text-black shadow'
                        : res === 'oil'
                        ? 'bg-amber-400 text-black shadow'
                        : 'bg-white text-black shadow'
                      : 'bg-[#18241d] text-[#cbd5e1] hover:text-white hover:bg-[#223329]'
                  }`}
                >
                  <span>{res === 'rubber' ? '🌿 Karet' : res === 'tungsten' ? '🔩 Wolfram' : res === 'oil' ? '🛢️ Minyak' : '★ 3 Sumber Daya'}</span>
                </button>
              ))}
            </div>

            {/* Filter Group 2: Theatre Zoom Focus */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-mono text-[#94a3b8] font-semibold flex items-center gap-1">
                <Compass className="h-3.5 w-3.5 text-sky-400" />
                <span>Fokus Wilayah:</span>
              </span>
              {[
                { id: 'global', label: 'Global' },
                { id: 'asia_pacific', label: 'Asia-Pasifik (Karet)' },
                { id: 'europe', label: 'Eropa (Wolfram/Ploiești)' },
                { id: 'middle_east', label: 'Timur Tengah' },
                { id: 'americas', label: 'Amerika (Minyak AS)' }
              ].map(th => (
                <button
                  key={th.id}
                  onClick={() => setSelectedTheatre(th.id as any)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    selectedTheatre === th.id
                      ? 'bg-sky-500 text-black font-bold shadow'
                      : 'bg-[#18241d] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {th.label}
                </button>
              ))}
            </div>

            {/* Filter Group 3: Layer Toggles */}
            <div className="flex items-center gap-2 flex-wrap">
              <label className="flex items-center gap-1.5 cursor-pointer text-[#cbd5e1] hover:text-white">
                <input
                  type="checkbox"
                  checked={showHeatmapGlow}
                  onChange={e => setShowHeatmapGlow(e.target.checked)}
                  className="rounded bg-[#1b261f] border-[#2e4033] text-amber-500 focus:ring-0"
                />
                <span>Glow Heatmap</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-[#cbd5e1] hover:text-white">
                <input
                  type="checkbox"
                  checked={showConvoyRoutes}
                  onChange={e => setShowConvoyRoutes(e.target.checked)}
                  className="rounded bg-[#1b261f] border-[#2e4033] text-sky-500 focus:ring-0"
                />
                <span>Rute Konvoi Laut</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-[#cbd5e1] hover:text-white">
                <input
                  type="checkbox"
                  checked={showChokepoints}
                  onChange={e => setShowChokepoints(e.target.checked)}
                  className="rounded bg-[#1b261f] border-[#2e4033] text-red-500 focus:ring-0"
                />
                <span>Chokepoints Vital</span>
              </label>
            </div>
          </div>

          {/* Interactive Tactical SVG Map Canvas */}
          <div className="relative rounded-2xl border-2 border-[#b8860b]/50 bg-[#090f0c] p-2 md:p-4 shadow-2xl overflow-hidden">
            {/* Map Frame Coordinates Label */}
            <div className="absolute top-3 left-4 z-10 flex items-center gap-2 pointer-events-none">
              <span className="font-mono text-[10px] text-amber-400/80 bg-black/60 px-2 py-0.5 rounded border border-amber-500/20">
                GRID: TACTICAL MERCATOR • EPSG:3857
              </span>
              <span className="font-mono text-[10px] text-emerald-400/80 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/20">
                {filteredHotspots.length} TITIK KRITIS TERIDENTIFIKASI
              </span>
            </div>

            {/* SVG STAGE */}
            <div className="relative w-full aspect-[16/9] max-h-[580px] bg-[#070b09] rounded-xl overflow-hidden border border-[#1e2a22]">
              <svg
                viewBox={viewBox}
                className="w-full h-full select-none transition-all duration-700 ease-out"
                style={{ filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.8))' }}
              >
                <defs>
                  {/* Heatmap Radial Gradients */}
                  <radialGradient id="rubber-heat-gradient">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.85" />
                    <stop offset="40%" stopColor="#15803d" stopOpacity="0.5" />
                    <stop offset="80%" stopColor="#166534" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#052e16" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="tungsten-heat-gradient">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.85" />
                    <stop offset="40%" stopColor="#c2410c" stopOpacity="0.5" />
                    <stop offset="80%" stopColor="#9a3412" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#431407" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="oil-heat-gradient">
                    <stop offset="0%" stopColor="#eab308" stopOpacity="0.85" />
                    <stop offset="40%" stopColor="#a16207" stopOpacity="0.5" />
                    <stop offset="80%" stopColor="#713f12" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#422006" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="choke-hazard-gradient">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
                    <stop offset="70%" stopColor="#991b1b" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#450a0a" stopOpacity="0" />
                  </radialGradient>

                  {/* Grid Pattern */}
                  <pattern id="tactical-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#16261c" strokeWidth="0.75" />
                    <circle cx="50" cy="50" r="1" fill="#2d4a37" />
                  </pattern>

                  {/* Blur Filter for authentic Heatmap radiance */}
                  <filter id="heat-blur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
                  </filter>
                </defs>

                {/* Ocean Background & Coordinate Grid */}
                <rect width="1000" height="560" fill="#09130e" />
                <rect width="1000" height="560" fill="url(#tactical-grid)" />

                {/* Tactical Continents & Landmass Silhouettes (Accurate Stylized WW2 Map Shapes) */}
                <g className="continent-shapes" fill="#132219" stroke="#22392b" strokeWidth="1">
                  {/* North America */}
                  <path d="M 120 70 L 280 65 L 340 120 L 290 220 L 240 260 L 250 310 L 220 300 L 160 230 L 110 160 Z" />
                  {/* Central America & Caribbean */}
                  <path d="M 240 260 L 280 300 L 310 290 L 280 330 L 260 310 Z" />
                  {/* South America */}
                  <path d="M 280 320 L 380 340 L 390 410 L 320 500 L 290 460 L 260 370 Z" />
                  {/* Europe & Scandinavia */}
                  <path d="M 450 110 L 520 80 L 550 120 L 620 120 L 620 180 L 570 210 L 500 230 L 440 230 L 430 180 L 480 150 Z" />
                  {/* British Isles */}
                  <path d="M 465 130 L 490 125 L 490 165 L 470 170 Z" />
                  {/* Africa */}
                  <path d="M 440 240 L 580 240 L 600 300 L 560 440 L 490 450 L 430 330 Z" />
                  {/* Middle East */}
                  <path d="M 580 220 L 660 210 L 670 270 L 610 280 Z" />
                  {/* USSR / Northern Asia */}
                  <path d="M 620 90 L 890 80 L 880 170 L 780 200 L 660 180 Z" />
                  {/* East Asia & China */}
                  <path d="M 670 200 L 820 190 L 810 300 L 730 310 L 690 260 Z" />
                  {/* Japan Archipelago */}
                  <path d="M 830 180 L 850 200 L 835 250 L 820 230 Z" />
                  {/* India / British Raj */}
                  <path d="M 660 250 L 730 250 L 710 330 L 670 320 Z" />
                  {/* Southeast Asia (Indochina & Malaya) */}
                  <path d="M 725 300 L 760 310 L 745 380 L 725 350 Z" />
                  {/* Indonesia / Nusantara / East Indies Archipelago */}
                  {/* Sumatra */}
                  <path d="M 710 365 L 740 380 L 730 420 L 705 385 Z" />
                  {/* Java */}
                  <path d="M 730 420 L 780 430 L 785 440 L 735 430 Z" />
                  {/* Borneo */}
                  <path d="M 745 365 L 785 360 L 780 405 L 745 400 Z" />
                  {/* Philippines */}
                  <path d="M 785 300 L 810 310 L 805 360 L 780 340 Z" />
                  {/* Australia */}
                  <path d="M 780 440 L 880 430 L 890 510 L 790 500 Z" />
                </g>

                {/* ================================================================= */}
                {/* 1. HEATMAP GLOW LAYER (RADIAL BLUR GRADIENTS)                     */}
                {/* ================================================================= */}
                {showHeatmapGlow && (
                  <g className="heatmap-glow-layer" style={{ mixBlendMode: 'screen' }}>
                    {filteredHotspots.map(spot => {
                      // Radius scales with resource amount
                      const radius = Math.min(Math.max(Math.sqrt(spot.amount1936) * 4.2, 28), 95);
                      let gradientUrl = '#rubber-heat-gradient';
                      if (spot.resourceType === 'tungsten') gradientUrl = '#tungsten-heat-gradient';
                      if (spot.resourceType === 'oil') gradientUrl = '#oil-heat-gradient';

                      return (
                        <circle
                          key={`glow-${spot.id}`}
                          cx={spot.x}
                          cy={spot.y}
                          r={radius}
                          fill={`url(${gradientUrl})`}
                          filter="url(#heat-blur)"
                          opacity="0.8"
                        />
                      );
                    })}
                  </g>
                )}

                {/* ================================================================= */}
                {/* 2. STRATEGIC CONVOY MARITIME SEA LANES                           */}
                {/* ================================================================= */}
                {showConvoyRoutes && (
                  <g className="convoy-routes-layer">
                    {STRATEGIC_CONVOY_ROUTES.map(route => {
                      const pathString = route.points.reduce((acc, pt, idx) => {
                        return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
                      }, '');

                      return (
                        <g key={route.id}>
                          {/* Route background path for visibility */}
                          <path
                            d={pathString}
                            fill="none"
                            stroke="#0284c7"
                            strokeWidth="3"
                            strokeOpacity="0.3"
                          />
                          {/* Animated convoy dots */}
                          <path
                            d={pathString}
                            fill="none"
                            stroke={route.resourceType === 'rubber' ? '#4ade80' : '#facc15'}
                            strokeWidth="1.8"
                            strokeDasharray="4 6"
                            className="animate-[dash_25s_linear_infinite]"
                          />
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* ================================================================= */}
                {/* 3. STRATEGIC CHOKEPOINTS (PULSING RADAR NODES)                   */}
                {/* ================================================================= */}
                {showChokepoints && (
                  <g className="chokepoints-layer">
                    {STRATEGIC_CHOKEPOINTS.map(choke => (
                      <g key={choke.id} className="cursor-pointer group">
                        {/* Outer pulsing circle */}
                        <circle
                          cx={choke.x}
                          cy={choke.y}
                          r="16"
                          fill="url(#choke-hazard-gradient)"
                          className="animate-ping origin-center opacity-70"
                        />
                        {/* Hazard badge */}
                        <circle
                          cx={choke.x}
                          cy={choke.y}
                          r="7"
                          fill="#7f1d1d"
                          stroke="#ef4444"
                          strokeWidth="1.5"
                        />
                        <text
                          x={choke.x}
                          y={choke.y + 3}
                          fontSize="8"
                          fill="#fef2f2"
                          textAnchor="middle"
                          fontWeight="black"
                        >
                          !
                        </text>
                        {/* Chokepoint label on hover */}
                        <text
                          x={choke.x}
                          y={choke.y - 10}
                          fontSize="9"
                          fill="#fca5a5"
                          textAnchor="middle"
                          fontFamily="monospace"
                          fontWeight="bold"
                          className="drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
                        >
                          {choke.name.split('(')[0]}
                        </text>
                      </g>
                    ))}
                  </g>
                )}

                {/* ================================================================= */}
                {/* 4. STRATEGIC RESOURCE DEPOSIT HOTSPOT NODES                      */}
                {/* ================================================================= */}
                <g className="resource-hotspots-layer">
                  {filteredHotspots.map(spot => {
                    const isSelected = spot.id === selectedHotspotId;
                    const resMeta = CRITICAL_RESOURCES_META[spot.resourceType];
                    const nodeRadius = Math.min(Math.max(Math.sqrt(spot.amount1936) * 1.3, 8), 24);

                    return (
                      <g
                        key={spot.id}
                        id={`node-${spot.id}`}
                        onClick={() => setSelectedHotspotId(spot.id)}
                        className="cursor-pointer transition-transform hover:scale-110"
                      >
                        {/* Selection Target Ring */}
                        {isSelected && (
                          <circle
                            cx={spot.x}
                            cy={spot.y}
                            r={nodeRadius + 7}
                            fill="none"
                            stroke="#fef08a"
                            strokeWidth="2"
                            strokeDasharray="3 3"
                            className="animate-spin origin-center"
                          />
                        )}

                        {/* Deposit Base Circle */}
                        <circle
                          cx={spot.x}
                          cy={spot.y}
                          r={nodeRadius}
                          fill={resMeta.color}
                          stroke="#0a0f0d"
                          strokeWidth="2"
                          className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                        />

                        {/* Resource Icon / Symbol */}
                        <text
                          x={spot.x}
                          y={spot.y + 3.5}
                          fontSize={nodeRadius > 14 ? '10' : '8'}
                          fill="#0a0f0d"
                          textAnchor="middle"
                          fontWeight="black"
                          fontFamily="monospace"
                        >
                          {resMeta.symbol}
                        </text>

                        {/* Amount Badge */}
                        <rect
                          x={spot.x + nodeRadius - 4}
                          y={spot.y - nodeRadius - 6}
                          width={String(spot.amount1936).length * 7 + 10}
                          height="13"
                          rx="3"
                          fill="#09130e"
                          stroke={resMeta.color}
                          strokeWidth="1"
                        />
                        <text
                          x={spot.x + nodeRadius + 3}
                          y={spot.y - nodeRadius + 4}
                          fontSize="8.5"
                          fill="#f8fafc"
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          {spot.amount1936}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>

              {/* Map Legend Overlay */}
              <div className="absolute bottom-3 left-3 bg-[#0a140f]/90 backdrop-blur-md p-2.5 rounded-xl border border-[#23382a] text-[11px] space-y-1.5 shadow-lg pointer-events-auto">
                <div className="font-mono font-bold text-amber-400 text-[10px] uppercase border-b border-[#1b2b21] pb-1">
                  LEGENDA PETA PD II
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block shadow-sm" />
                  <span className="text-[#cbd5e1]">Karet (Airframe &amp; Truk)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-orange-500 inline-block shadow-sm" />
                  <span className="text-[#cbd5e1]">Wolfram (Medium/Heavy Tanks)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-amber-400 inline-block shadow-sm" />
                  <span className="text-[#cbd5e1]">Minyak (Fuel &amp; Kapal Perang)</span>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-[#1b2b21]">
                  <span className="text-red-400 font-bold">!</span>
                  <span className="text-[#94a3b8]">Chokepoint Laut Kritis</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DEEP TACTICAL INSPECTOR CARD (SELECTED HOTSPOT INTEL)                     */}
          {/* ========================================================================= */}
          {selectedHotspot && (
            <div className="rounded-2xl border-2 border-amber-500/60 bg-gradient-to-b from-[#16211a] via-[#101713] to-[#0a100d] p-5 md:p-6 shadow-2xl space-y-5">
              {/* Hotspot Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#233529] pb-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 text-2xl shadow-xl font-bold"
                    style={{
                      borderColor: getResourceColor(selectedHotspot.resourceType),
                      backgroundColor: `${getResourceColor(selectedHotspot.resourceType)}22`
                    }}
                  >
                    {CRITICAL_RESOURCES_META[selectedHotspot.resourceType].icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
                        [{selectedHotspot.countryTag}] {selectedHotspot.countryName}
                      </span>
                      <span
                        className="text-xs px-2.5 py-0.5 rounded font-bold"
                        style={{
                          backgroundColor: `${getFactionColor(selectedHotspot.faction)}25`,
                          color: getFactionColor(selectedHotspot.faction),
                          border: `1px solid ${getFactionColor(selectedHotspot.faction)}60`
                        }}
                      >
                        Faksi: {selectedHotspot.faction}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-red-950 text-red-300 font-mono border border-red-500/40">
                        Risiko Chokepoint: {selectedHotspot.chokepointRisk}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black font-serif text-[#fef3c7] mt-1">
                      {selectedHotspot.name}
                    </h2>
                  </div>
                </div>

                {/* Amount and Global Share Badge */}
                <div className="flex items-center gap-3 bg-[#0c1611] p-3 rounded-xl border border-[#233529] shrink-0">
                  <div className="text-center">
                    <div className="text-[10px] font-mono text-[#94a3b8] uppercase">Output 1936</div>
                    <div
                      className="text-2xl font-black font-mono"
                      style={{ color: getResourceColor(selectedHotspot.resourceType) }}
                    >
                      {selectedHotspot.amount1936} <span className="text-xs">unit</span>
                    </div>
                  </div>
                  <div className="h-9 w-px bg-[#233529]" />
                  <div className="text-center">
                    <div className="text-[10px] font-mono text-[#94a3b8] uppercase">Pangsa Dunia</div>
                    <div className="text-2xl font-black font-mono text-amber-300">
                      {selectedHotspot.worldSharePercent}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Criticality & Chokepoint Warning */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-red-400 uppercase flex items-center gap-1.5">
                    <Skull className="h-4 w-4 text-red-400" />
                    <span>Dampak Kelaparan Militer (Jika Terputus):</span>
                  </span>
                  <p className="text-xs text-[#cbd5e1] leading-relaxed">
                    {selectedHotspot.militaryCriticality}
                  </p>
                </div>

                <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    <span>Chokepoint Maritim &amp; Rentan Embargo:</span>
                  </span>
                  <div className="text-xs text-[#cbd5e1] leading-relaxed">
                    <strong>Pintu Choke:</strong> {selectedHotspot.chokepointName}
                    <div className="mt-1 text-[11px] text-[#94a3b8]">
                      Distrik / Provinsi Utama: {selectedHotspot.keyProvinces.join(', ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Faction Domination Tactics */}
              <div className="space-y-3">
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Swords className="h-4 w-4" />
                  <span>Rencana Taktis Penaklukan &amp; Pertahanan Global:</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Axis Tactic */}
                  <div className="rounded-xl border border-red-500/40 bg-[#1a0f11] p-3.5 space-y-2">
                    <span className="font-mono font-bold text-red-400 flex items-center gap-1.5">
                      <Target className="h-4 w-4 text-red-400" />
                      <span>STRATEGI BLOK POROS (AXIS)</span>
                    </span>
                    <p className="text-[#cbd5e1] leading-relaxed">
                      {selectedHotspot.dominationStrategy.axisTactic}
                    </p>
                  </div>

                  {/* Allies Tactic */}
                  <div className="rounded-xl border border-sky-500/40 bg-[#0c1622] p-3.5 space-y-2">
                    <span className="font-mono font-bold text-sky-400 flex items-center gap-1.5">
                      <Shield className="h-4 w-4 text-sky-400" />
                      <span>STRATEGI SEKUTU (ALLIES)</span>
                    </span>
                    <p className="text-[#cbd5e1] leading-relaxed">
                      {selectedHotspot.dominationStrategy.alliesTactic}
                    </p>
                  </div>

                  {/* Soviet Tactic */}
                  <div className="rounded-xl border border-rose-500/40 bg-[#1a0f16] p-3.5 space-y-2">
                    <span className="font-mono font-bold text-rose-400 flex items-center gap-1.5">
                      <Factory className="h-4 w-4 text-rose-400" />
                      <span>STRATEGI SOVIET / COMINTERN</span>
                    </span>
                    <p className="text-[#cbd5e1] leading-relaxed">
                      {selectedHotspot.dominationStrategy.sovietsTactic}
                    </p>
                  </div>
                </div>
              </div>

              {/* Historical WW2 Operation Box */}
              <div className="rounded-xl border border-[#2c3d31] bg-[#0c1410] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-amber-400" />
                    <span className="font-mono font-bold text-amber-300">
                      OPERASI SEJARAH ASLI: {selectedHotspot.ww2HistoricalOperation.name} ({selectedHotspot.ww2HistoricalOperation.year})
                    </span>
                  </div>
                  <div className="text-[#cbd5e1] leading-relaxed">
                    {selectedHotspot.ww2HistoricalOperation.details}
                  </div>
                </div>
                <span className="rounded bg-amber-950/80 border border-amber-500/40 px-3 py-1 text-amber-200 font-mono shrink-0">
                  Hasil: {selectedHotspot.ww2HistoricalOperation.outcome}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: MAJOR DOMINATION PLAYBOOK                                      */}
      {/* ========================================================================= */}
      {activeSubTab === 'domination_playbook' && (
        <div className="space-y-5">
          {/* Major Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {MAJOR_RESOURCE_DOMINATION_GUIDES.map(guide => (
              <button
                key={guide.tag}
                onClick={() => setSelectedMajorTag(guide.tag)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-bold transition-all text-xs sm:text-sm ${
                  selectedMajorTag === guide.tag
                    ? 'border-2 border-amber-400 bg-gradient-to-r from-amber-950 via-[#261d10] to-[#1a150b] text-[#fef08a] shadow-xl'
                    : 'border border-[#26372c] bg-[#101713] text-[#94a3b8] hover:text-white hover:bg-[#16231c]'
                }`}
              >
                <span className="font-mono font-black text-amber-400">[{guide.tag}]</span>
                <span>{guide.countryName}</span>
              </button>
            ))}
          </div>

          {/* Major Intel Card */}
          {selectedDominationGuide && (
            <div className="rounded-2xl border border-amber-500/40 bg-[#121915] p-5 md:p-6 space-y-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#233529] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30">
                      Rencana Induk Dominasi Sumber Daya
                    </span>
                    <span className="text-xs text-[#cbd5e1]">Pemimpin: {selectedDominationGuide.leader}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black font-serif text-[#fef3c7] mt-1">
                    Doktrin Sumber Daya: {selectedDominationGuide.countryName}
                  </h2>
                </div>

                {/* Starting Resource Conditions */}
                <div className="grid grid-cols-3 gap-2 text-xs shrink-0">
                  <div className="rounded-lg bg-[#0c1611] p-2 border border-emerald-500/30">
                    <div className="text-[10px] font-mono text-emerald-400 font-bold">KARET 1936</div>
                    <div className="text-[11px] text-[#cbd5e1] truncate">{selectedDominationGuide.startingCondition.rubber}</div>
                  </div>
                  <div className="rounded-lg bg-[#0c1611] p-2 border border-orange-500/30">
                    <div className="text-[10px] font-mono text-orange-400 font-bold">WOLFRAM 1936</div>
                    <div className="text-[11px] text-[#cbd5e1] truncate">{selectedDominationGuide.startingCondition.tungsten}</div>
                  </div>
                  <div className="rounded-lg bg-[#0c1611] p-2 border border-amber-500/30">
                    <div className="text-[10px] font-mono text-amber-400 font-bold">MINYAK 1936</div>
                    <div className="text-[11px] text-[#cbd5e1] truncate">{selectedDominationGuide.startingCondition.oil}</div>
                  </div>
                </div>
              </div>

              {/* Achilles' Heel Alert */}
              <div className="rounded-xl border border-red-500/40 bg-red-950/20 p-4 text-xs sm:text-sm text-red-200 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-red-300 block mb-1">Titik Lemah Terbesar (Achilles' Heel):</strong>
                  {selectedDominationGuide.achillesHeel}
                </div>
              </div>

              {/* Step-by-Step Conquest Plans */}
              <div className="space-y-4">
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span>Kronologi Operasi Militer Menjamin Pasokan:</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedDominationGuide.masterDominationPlan.map((plan, idx) => (
                    <div key={idx} className="rounded-xl border border-[#2c3d31] bg-[#0c1410] p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                          {plan.phase}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded font-bold uppercase font-mono"
                          style={{
                            color: getResourceColor(plan.targetResource),
                            backgroundColor: `${getResourceColor(plan.targetResource)}22`
                          }}
                        >
                          Target: {plan.targetResource}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-[#fef3c7]">{plan.title}</h4>
                        <div className="text-xs text-[#94a3b8] mt-0.5">
                          Sasaran Wilayah: <strong className="text-white">{plan.conquestTarget}</strong>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-[#cbd5e1] border-t border-[#1d2b22] pt-2">
                        {plan.stepByStepTactics.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold shrink-0">{sIdx + 1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>

                      {plan.syntheticAlternativePlan && (
                        <div className="rounded-lg bg-[#142018] p-2.5 border border-emerald-500/20 text-xs text-emerald-300">
                          <strong>Opsi Alternatif Sintetis: </strong>
                          <span className="text-[#cbd5e1]">{plan.syntheticAlternativePlan}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tips */}
              <div className="rounded-xl border border-amber-500/30 bg-[#1d170e] p-4 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span>Tips Kunci Komandan Alutsista:</span>
                </span>
                <ul className="space-y-1.5 text-xs text-[#e2e8f0]">
                  {selectedDominationGuide.proTips.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: SYNTHETIC REFINERY & AUTARKY CALCULATOR                        */}
      {/* ========================================================================= */}
      {activeSubTab === 'synthetic_calculator' && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-[#111d16] via-[#0d1611] to-[#09100c] p-5 md:p-6 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#233529] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Factory className="h-5 w-5 text-emerald-400" />
                  <span className="font-mono text-xs font-bold text-emerald-400 uppercase">
                    Kalkulator Efisiensi Industri Sintetis (Autarky Tool)
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#fef3c7] mt-1">
                  Hitung Kebutuhan Kilang Sintetis Bebas Blokade
                </h2>
                <p className="text-xs text-[#cbd5e1] mt-1">
                  Jika jalur konvoi laut diblokade kapal selam atau kapal perang musuh, hitung berapa kapasitas Synthetic Refineries yang wajib dibangun untuk menjaga pabrik pesawat &amp; armada tank tetap beroperasi 100%.
                </p>
              </div>

              <span className="rounded bg-emerald-950/80 border border-emerald-500/40 px-3 py-1.5 text-xs font-mono text-emerald-300 shrink-0">
                Formula: HOI4 Vanilla v1.14+
              </span>
            </div>

            {/* Input Controls Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* Target Resource Deficit */}
              <div className="rounded-xl border border-[#26372c] bg-[#142019] p-4 space-y-2">
                <span className="font-mono font-bold text-amber-400 uppercase">1. Defisit Kritis yang Diganti:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCalcTargetResource('rubber')}
                    className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                      calcTargetResource === 'rubber'
                        ? 'bg-emerald-500 text-black shadow'
                        : 'bg-[#1b2b22] text-[#94a3b8]'
                    }`}
                  >
                    🌿 Karet (Rubber)
                  </button>
                  <button
                    onClick={() => setCalcTargetResource('oil')}
                    className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                      calcTargetResource === 'oil'
                        ? 'bg-amber-400 text-black shadow'
                        : 'bg-[#1b2b22] text-[#94a3b8]'
                    }`}
                  >
                    🛢️ Minyak (Oil)
                  </button>
                </div>
              </div>

              {/* Deficit Amount Slider */}
              <div className="rounded-xl border border-[#26372c] bg-[#142019] p-4 space-y-2">
                <div className="flex items-center justify-between font-mono font-bold text-amber-400 uppercase">
                  <span>2. Target Defisit:</span>
                  <span className="text-white text-sm">{calcTargetDeficitUnits} Unit</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="160"
                  step="5"
                  value={calcTargetDeficitUnits}
                  onChange={e => setCalcTargetDeficitUnits(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#94a3b8] font-mono">
                  <span>10 u (Minim)</span>
                  <span>80 u (Sedang)</span>
                  <span>160 u (Besar)</span>
                </div>
              </div>

              {/* Synthetic Tech Level */}
              <div className="rounded-xl border border-[#26372c] bg-[#142019] p-4 space-y-2">
                <span className="font-mono font-bold text-amber-400 uppercase">3. Riset Synthetic Rubber/Oil:</span>
                <select
                  value={calcSyntheticTechLevel}
                  onChange={e => setCalcSyntheticTechLevel(Number(e.target.value))}
                  className="w-full rounded-lg bg-[#0c1611] border border-[#26372c] py-2 px-3 text-xs text-white outline-none focus:border-emerald-500"
                >
                  <option value={1}>Tier 1: Dasar (+2 Karet / +3 Minyak per kilang)</option>
                  <option value={2}>Tier 2: Riset 1938 (+3 Karet / +4 Minyak)</option>
                  <option value={3}>Tier 3: Riset 1940 (+4 Karet / +6 Minyak)</option>
                  <option value={4}>Tier 4: Riset 1942+ (+5 Karet / +8 Minyak)</option>
                </select>
              </div>

              {/* Country Context */}
              <div className="rounded-xl border border-[#26372c] bg-[#142019] p-4 space-y-2">
                <span className="font-mono font-bold text-amber-400 uppercase">4. Negara Pemain:</span>
                <select
                  value={calcCountryContext}
                  onChange={e => setCalcCountryContext(e.target.value as any)}
                  className="w-full rounded-lg bg-[#0c1611] border border-[#26372c] py-2 px-3 text-xs text-white outline-none focus:border-emerald-500"
                >
                  <option value="GER">Jerman (Bonus Pabrik Krupp +10%)</option>
                  <option value="JAP">Jepang (Terdesak Embargo AS)</option>
                  <option value="ITA">Italia (Defisit Minyak Mediterania)</option>
                  <option value="ENG">Inggris (Jalur Malaka Terancam)</option>
                  <option value="SOV">Uni Soviet (Cadangan Jauh Ural)</option>
                </select>
              </div>
            </div>

            {/* Computation Result Dashboard */}
            <div className="rounded-xl border-2 border-emerald-500/50 bg-[#0c1611] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#203326] pb-3">
                <h3 className="font-mono font-bold text-sm uppercase text-emerald-400 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Hasil Kalkulasi Kebutuhan Autarky:</span>
                </h3>
                <span className="text-xs font-mono text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  Target: {calcTargetDeficitUnits} Unit {calcTargetResource}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div className="rounded-xl bg-[#142219] p-4 border border-emerald-500/30">
                  <div className="text-xs font-mono text-[#94a3b8] uppercase">Jumlah Kilang Dibutuhkan</div>
                  <div className="text-3xl font-black font-mono text-emerald-400 mt-1">
                    {calcResults.refineriesNeeded}
                  </div>
                  <div className="text-[11px] text-[#cbd5e1] mt-1">
                    Yield: {calcResults.yieldPerRefinery} unit / kilang
                  </div>
                </div>

                <div className="rounded-xl bg-[#142219] p-4 border border-emerald-500/30">
                  <div className="text-xs font-mono text-[#94a3b8] uppercase">Total Biaya IC Industri</div>
                  <div className="text-3xl font-black font-mono text-amber-400 mt-1">
                    {(calcResults.totalIcCost / 1000).toFixed(1)}k
                  </div>
                  <div className="text-[11px] text-[#cbd5e1] mt-1">
                    Base: 14,500 IC per kilang
                  </div>
                </div>

                <div className="rounded-xl bg-[#142219] p-4 border border-emerald-500/30">
                  <div className="text-xs font-mono text-[#94a3b8] uppercase">Waktu Bangun (1 Jalur Civs)</div>
                  <div className="text-3xl font-black font-mono text-sky-400 mt-1">
                    {calcResults.daysWith1Line} <span className="text-xs">hari</span>
                  </div>
                  <div className="text-[11px] text-[#cbd5e1] mt-1">
                    Dengan 15 Pabrik Sipil aktif
                  </div>
                </div>

                <div className="rounded-xl bg-[#142219] p-4 border border-emerald-500/30">
                  <div className="text-xs font-mono text-[#94a3b8] uppercase">Waktu Bangun (3 Jalur Civs)</div>
                  <div className="text-3xl font-black font-mono text-purple-400 mt-1">
                    {calcResults.daysWith3Lines} <span className="text-xs">hari</span>
                  </div>
                  <div className="text-[11px] text-[#cbd5e1] mt-1">
                    Dengan 45 Pabrik Sipil aktif
                  </div>
                </div>
              </div>

              {/* Strategic Insights */}
              <div className="rounded-lg bg-[#08100c] p-3.5 border border-[#1b2b20] text-xs text-[#cbd5e1] leading-relaxed space-y-1">
                <div className="font-bold text-amber-300">💡 Rekomendasi Alokasi Pabrik Sipil:</div>
                <p>
                  Membangun {calcResults.refineriesNeeded} kilang sintetis membutuhkan investasi waktu yang signifikan. Sebaiknya bagi konstruksi kilang menjadi kelompok 2 per provinsi dengan Infrastruktur level 5 agar kecepatan pembangunan meningkat sebesar +100% (+20% per level infra).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: MONOPOLY ANALYTICS & BLOCKADE SCENARIOS                        */}
      {/* ========================================================================= */}
      {activeSubTab === 'monopoly_analytics' && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-sky-500/40 bg-[#0e1620] p-5 md:p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#203348] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-sky-400" />
                  <span className="font-mono text-xs font-bold text-sky-400 uppercase">
                    Distribusi Kontrol Geopolitik Global
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#fef3c7] mt-1">
                  Keseimbangan Monopoli Faksi &amp; Simulasi Blokade
                </h2>
                <p className="text-xs text-[#cbd5e1] mt-1">
                  Uji bagaimana penguasaan sumber daya dunia berubah jika Blok Poros berhasil merebut ladang minyak Ploiești &amp; Karet Hindia Belanda, atau jika Sekutu melancarkan blokade laut mutlak.
                </p>
              </div>

              {/* Scenario Switcher */}
              <div className="flex items-center gap-2 bg-[#162536] p-1.5 rounded-xl border border-[#253f5c]">
                <button
                  onClick={() => setSimulatedScenario('1936_start')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    simulatedScenario === '1936_start'
                      ? 'bg-amber-500 text-black shadow'
                      : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  Status Quo 1936
                </button>
                <button
                  onClick={() => setSimulatedScenario('axis_triumph')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    simulatedScenario === 'axis_triumph'
                      ? 'bg-red-500 text-white shadow'
                      : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  Poros Merebut Malaya &amp; Baku
                </button>
                <button
                  onClick={() => setSimulatedScenario('allied_blockade')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    simulatedScenario === 'allied_blockade'
                      ? 'bg-sky-500 text-white shadow'
                      : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  Blokade Total Sekutu
                </button>
              </div>
            </div>

            {/* 3 Progress Bars: Rubber, Tungsten, Oil */}
            <div className="space-y-6">
              {/* Rubber Distribution */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <span>🌿</span>
                    <span>KARET (RUBBER) TOTAL: {monopolyStats.rubber.total} UNIT</span>
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sky-400">Allies: {((monopolyStats.rubber.Allies / monopolyStats.rubber.total) * 100).toFixed(1)}%</span>
                    <span className="text-red-400">Axis: {((monopolyStats.rubber.Axis / monopolyStats.rubber.total) * 100).toFixed(1)}%</span>
                    <span className="text-purple-400">Neutral: {((monopolyStats.rubber.Neutral / monopolyStats.rubber.total) * 100).toFixed(1)}%</span>
                  </div>
                </div>
                <div className="h-4 w-full bg-[#162536] rounded-full overflow-hidden flex border border-[#233f5c]">
                  <div
                    style={{ width: `${(monopolyStats.rubber.Allies / monopolyStats.rubber.total) * 100}%` }}
                    className="bg-sky-500 h-full transition-all duration-500"
                    title={`Allies: ${monopolyStats.rubber.Allies} unit`}
                  />
                  <div
                    style={{ width: `${(monopolyStats.rubber.Axis / monopolyStats.rubber.total) * 100}%` }}
                    className="bg-red-500 h-full transition-all duration-500"
                    title={`Axis: ${monopolyStats.rubber.Axis} unit`}
                  />
                  <div
                    style={{ width: `${(monopolyStats.rubber.Neutral / monopolyStats.rubber.total) * 100}%` }}
                    className="bg-purple-500 h-full transition-all duration-500"
                    title={`Neutral: ${monopolyStats.rubber.Neutral} unit`}
                  />
                </div>
              </div>

              {/* Tungsten Distribution */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-orange-400 flex items-center gap-1.5">
                    <span>🔩</span>
                    <span>WOLFRAM (TUNGSTEN) TOTAL: {monopolyStats.tungsten.total} UNIT</span>
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sky-400">Allies: {((monopolyStats.tungsten.Allies / monopolyStats.tungsten.total) * 100).toFixed(1)}%</span>
                    <span className="text-red-400">Axis: {((monopolyStats.tungsten.Axis / monopolyStats.tungsten.total) * 100).toFixed(1)}%</span>
                    <span className="text-purple-400">Neutral: {((monopolyStats.tungsten.Neutral / monopolyStats.tungsten.total) * 100).toFixed(1)}%</span>
                  </div>
                </div>
                <div className="h-4 w-full bg-[#162536] rounded-full overflow-hidden flex border border-[#233f5c]">
                  <div
                    style={{ width: `${(monopolyStats.tungsten.Allies / monopolyStats.tungsten.total) * 100}%` }}
                    className="bg-sky-500 h-full transition-all duration-500"
                    title={`Allies: ${monopolyStats.tungsten.Allies} unit`}
                  />
                  <div
                    style={{ width: `${(monopolyStats.tungsten.Axis / monopolyStats.tungsten.total) * 100}%` }}
                    className="bg-red-500 h-full transition-all duration-500"
                    title={`Axis: ${monopolyStats.tungsten.Axis} unit`}
                  />
                  <div
                    style={{ width: `${(monopolyStats.tungsten.Neutral / monopolyStats.tungsten.total) * 100}%` }}
                    className="bg-purple-500 h-full transition-all duration-500"
                    title={`Neutral: ${monopolyStats.tungsten.Neutral} unit`}
                  />
                </div>
              </div>

              {/* Oil Distribution */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span>🛢️</span>
                    <span>MINYAK (OIL) TOTAL: {monopolyStats.oil.total} UNIT</span>
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sky-400">Allies: {((monopolyStats.oil.Allies / monopolyStats.oil.total) * 100).toFixed(1)}%</span>
                    <span className="text-rose-400">Soviet: {((monopolyStats.oil.Comintern / monopolyStats.oil.total) * 100).toFixed(1)}%</span>
                    <span className="text-red-400">Axis: {((monopolyStats.oil.Axis / monopolyStats.oil.total) * 100).toFixed(1)}%</span>
                    <span className="text-purple-400">Neutral: {((monopolyStats.oil.Neutral / monopolyStats.oil.total) * 100).toFixed(1)}%</span>
                  </div>
                </div>
                <div className="h-4 w-full bg-[#162536] rounded-full overflow-hidden flex border border-[#233f5c]">
                  <div
                    style={{ width: `${(monopolyStats.oil.Allies / monopolyStats.oil.total) * 100}%` }}
                    className="bg-sky-500 h-full transition-all duration-500"
                    title={`Allies: ${monopolyStats.oil.Allies} unit`}
                  />
                  <div
                    style={{ width: `${(monopolyStats.oil.Comintern / monopolyStats.oil.total) * 100}%` }}
                    className="bg-rose-500 h-full transition-all duration-500"
                    title={`Comintern: ${monopolyStats.oil.Comintern} unit`}
                  />
                  <div
                    style={{ width: `${(monopolyStats.oil.Axis / monopolyStats.oil.total) * 100}%` }}
                    className="bg-red-500 h-full transition-all duration-500"
                    title={`Axis: ${monopolyStats.oil.Axis} unit`}
                  />
                  <div
                    style={{ width: `${(monopolyStats.oil.Neutral / monopolyStats.oil.total) * 100}%` }}
                    className="bg-purple-500 h-full transition-all duration-500"
                    title={`Neutral: ${monopolyStats.oil.Neutral} unit`}
                  />
                </div>
              </div>
            </div>

            {/* Geopolitical Takeaways */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="rounded-lg bg-[#142333] p-3 border border-[#203954] space-y-1">
                <span className="font-mono text-emerald-400 font-bold uppercase">Karet: Monopoli Ekstrem</span>
                <p className="text-[#cbd5e1] leading-relaxed">
                  Sekutu memegang lebih dari 90% pasokan di awal game. Blok Poros mutlak harus menyerbu Asia Tenggara atau berinvestasi besar-besaran di industri karet sintetis Buna.
                </p>
              </div>

              <div className="rounded-lg bg-[#142333] p-3 border border-[#203954] space-y-1">
                <span className="font-mono text-orange-400 font-bold uppercase">Wolfram: Perang Dompet Sipil</span>
                <p className="text-[#cbd5e1] leading-relaxed">
                  Hampir 50% dikendalikan negara netral (Portugal, Spanyol, China). Siapa yang memiliki surplus pabrik sipil (Civs) terbesar dapat memborong cadangan ini dan memenangkan perang tank.
                </p>
              </div>

              <div className="rounded-lg bg-[#142333] p-3 border border-[#203954] space-y-1">
                <span className="font-mono text-amber-400 font-bold uppercase">Minyak: Kunci Mobilitas</span>
                <p className="text-[#cbd5e1] leading-relaxed">
                  AS dan Soviet menguasai 64% minyak bumi dunia. Jerman dan Jepang hanya memiliki sedikit waktu sebelum cadangan minyak mereka habis dan tank mereka berhenti bergerak.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
