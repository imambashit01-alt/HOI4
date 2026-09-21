import { useState, useMemo } from 'react';
import {
  Globe, Shield, Factory, Flame, Crosshair,
  ArrowRight, Sparkles, Navigation, Layers, CheckCircle,
  TrendingUp, Award, Anchor, Plane, Search
} from 'lucide-react';
import { EuropeMapCountry } from '../types';
import {
  EUROPE_MAP_COUNTRIES,
  STRATEGIC_RESOURCES_INFO,
  NON_EUROPEAN_MAJORS,
  ResourceInfo
} from '../data/europeMapData';

interface EuropeInteractiveMapProps {
  selectedCountryId: string;
  onSelectCountry: (countryId: string) => void;
  onScrollToTree?: () => void;
}

export const EuropeInteractiveMap: React.FC<EuropeInteractiveMapProps> = ({
  selectedCountryId,
  onSelectCountry,
  onScrollToTree
}) => {
  const [mapMode, setMapMode] = useState<'factions' | 'resources' | 'industry'>('factions');
  const [resourceFilter, setResourceFilter] = useState<'all' | 'oil' | 'steel' | 'aluminium' | 'tungsten' | 'chromium'>('all');
  const [showExpansionVectors, setShowExpansionVectors] = useState<boolean>(true);
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedCountry = useMemo(() => {
    return EUROPE_MAP_COUNTRIES.find(c => c.id === selectedCountryId) || null;
  }, [selectedCountryId]);

  const hoveredCountry = useMemo(() => {
    return hoveredCountryId ? EUROPE_MAP_COUNTRIES.find(c => c.id === hoveredCountryId) || null : null;
  }, [hoveredCountryId]);

  // Country color generator based on current mode
  const getCountryFill = (country: EuropeMapCountry) => {
    const isSelected = country.id === selectedCountryId;
    const isHovered = country.id === hoveredCountryId;

    if (mapMode === 'factions') {
      if (country.faction === 'Axis') {
        return isSelected ? '#b91c1c' : isHovered ? '#991b1b' : '#7f1d1d';
      }
      if (country.faction === 'Allies') {
        return isSelected ? '#2563eb' : isHovered ? '#1d4ed8' : '#1e3a8a';
      }
      if (country.faction === 'Comintern') {
        return isSelected ? '#dc2626' : isHovered ? '#b91c1c' : '#881337';
      }
      // Neutral
      return isSelected ? '#475569' : isHovered ? '#334155' : '#1e293b';
    }

    if (mapMode === 'resources') {
      const activeRes = resourceFilter === 'all' ? 'steel' : resourceFilter;
      const amount = country.resources[activeRes] || 0;

      if (resourceFilter === 'oil') {
        if (amount >= 80) return isSelected ? '#f59e0b' : '#d97706';
        if (amount >= 10) return isSelected ? '#b45309' : '#78350f';
        if (amount > 0) return '#451a03';
        return '#131b24';
      }
      if (resourceFilter === 'steel') {
        if (amount >= 100) return isSelected ? '#e2e8f0' : '#cbd5e1';
        if (amount >= 40) return isSelected ? '#94a3b8' : '#64748b';
        if (amount > 0) return '#334155';
        return '#131b24';
      }
      if (resourceFilter === 'aluminium') {
        if (amount >= 40) return isSelected ? '#38bdf8' : '#0284c7';
        if (amount >= 15) return isSelected ? '#0369a1' : '#075985';
        if (amount > 0) return '#0c4a6e';
        return '#131b24';
      }
      if (resourceFilter === 'tungsten') {
        if (amount >= 20) return isSelected ? '#fb923c' : '#ea580c';
        if (amount >= 6) return isSelected ? '#c2410c' : '#9a3412';
        if (amount > 0) return '#7c2d12';
        return '#131b24';
      }
      if (resourceFilter === 'chromium') {
        if (amount >= 50) return isSelected ? '#c084fc' : '#9333ea';
        if (amount >= 15) return isSelected ? '#7e22ce' : '#6b21a8';
        if (amount > 0) return '#581c87';
        return '#131b24';
      }

      // 'all' composite score
      const totalScore = country.resources.oil * 3 + country.resources.steel + country.resources.tungsten * 2 + country.resources.chromium * 1.5;
      if (totalScore > 300) return isSelected ? '#f59e0b' : '#b45309';
      if (totalScore > 120) return isSelected ? '#38bdf8' : '#0369a1';
      if (totalScore > 40) return isSelected ? '#4ade80' : '#15803d';
      return '#182430';
    }

    if (mapMode === 'industry') {
      const totalFactories = country.startingFactories.civs + country.startingFactories.mils + country.startingFactories.docks;
      if (totalFactories >= 60) return isSelected ? '#fbbf24' : '#d97706';
      if (totalFactories >= 35) return isSelected ? '#f97316' : '#ea580c';
      if (totalFactories >= 20) return isSelected ? '#38bdf8' : '#0284c7';
      if (totalFactories >= 10) return isSelected ? '#94a3b8' : '#475569';
      return '#17222d';
    }

    return '#1e293b';
  };

  const getCountryStroke = (country: EuropeMapCountry) => {
    if (country.id === selectedCountryId) return '#f59e0b';
    if (country.id === hoveredCountryId) return '#ffffff';
    if (mapMode === 'factions') {
      if (country.faction === 'Axis') return '#ef4444';
      if (country.faction === 'Allies') return '#60a5fa';
      if (country.faction === 'Comintern') return '#f87171';
      return '#475569';
    }
    return '#334155';
  };

  // Filtered countries for quick selection list
  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) return EUROPE_MAP_COUNTRIES;
    const q = searchTerm.toLowerCase();
    return EUROPE_MAP_COUNTRIES.filter(
      c => c.name.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  return (
    <div className="rounded-xl border border-[#2d3a33] bg-gradient-to-b from-[#111915] via-[#0d1410] to-[#0a0f0d] p-4 sm:p-5 shadow-2xl shadow-black/60">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4 pb-3 border-b border-[#223026]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#f59e0b]/40 bg-[#241f14] text-[#f59e0b] shadow-inner">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#fef3c7] tracking-wide">
                PETA TAKTIS INTERAKTIF EROPA 1936-1939
              </h3>
              <span className="rounded bg-[#203025] px-2 py-0.5 font-mono text-[10px] font-bold text-[#86efac] border border-[#2d4233]">
                SVG INTERACTIVE
              </span>
            </div>
            <p className="text-xs text-[#94a3b8]">
              Klik negara di peta untuk menavigasi pohon fokus nasional, memantau persebaran ladang minyak Ploiesti, bijih besi Kiruna, dan aliansi PD II.
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#090d0b] p-1 rounded-lg border border-[#1e2a22]">
          <button
            onClick={() => setMapMode('factions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${
              mapMode === 'factions'
                ? 'bg-[#243328] text-[#fde047] border border-[#f59e0b]/40 shadow-sm'
                : 'text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Shield className="h-3.5 w-3.5 text-[#ef4444]" />
            <span>Faksi &amp; Ideologi</span>
          </button>

          <button
            onClick={() => setMapMode('resources')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${
              mapMode === 'resources'
                ? 'bg-[#243328] text-[#fde047] border border-[#f59e0b]/40 shadow-sm'
                : 'text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Flame className="h-3.5 w-3.5 text-[#f59e0b]" />
            <span>Sumber Daya Strategis</span>
          </button>

          <button
            onClick={() => setMapMode('industry')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${
              mapMode === 'industry'
                ? 'bg-[#243328] text-[#fde047] border border-[#f59e0b]/40 shadow-sm'
                : 'text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Factory className="h-3.5 w-3.5 text-[#38bdf8]" />
            <span>Kapasitas Industri</span>
          </button>
        </div>
      </div>

      {/* Sub-toolbar: Resource Filters & Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 bg-[#0e1612] px-3 py-2 rounded-lg border border-[#1a261e]">
        {mapMode === 'resources' ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono font-bold text-[#fde047] mr-1">Filter Bahan:</span>
            {(['all', 'oil', 'steel', 'aluminium', 'tungsten', 'chromium'] as const).map(resKey => {
              const info = resKey === 'all' ? null : STRATEGIC_RESOURCES_INFO[resKey];
              const isResActive = resourceFilter === resKey;
              return (
                <button
                  key={resKey}
                  onClick={() => setResourceFilter(resKey)}
                  className={`flex items-center gap-1 rounded px-2 py-1 text-[11px] font-mono font-bold transition-all ${
                    isResActive
                      ? 'border border-[#f59e0b] bg-[#292212] text-[#fef3c7] shadow-sm'
                      : 'border border-[#1e2a22] bg-[#121c16] text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  {info ? <span>{info.icon} {info.name.split(' ')[0]}</span> : <span>🌐 Semua Sumber Daya</span>}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-[#94a3b8] font-mono">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444] border border-[#fca5a5]/50"></span> Poros (Axis)
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#3b82f6] border border-[#93c5fd]/50"></span> Sekutu (Allies)
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#dc2626] border border-[#fca5a5]/50"></span> Komintern (Soviet)
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#475569] border border-[#94a3b8]/50"></span> Netral / Non-Aligned
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono text-[#cbd5e1] hover:text-[#fef3c7]">
            <input
              type="checkbox"
              checked={showExpansionVectors}
              onChange={(e) => setShowExpansionVectors(e.target.checked)}
              className="rounded border-[#2d3a33] bg-[#0c120e] text-[#f59e0b] focus:ring-0"
            />
            <span>Vektor Ekspansi Historis</span>
          </label>

          <button
            onClick={() => setZoomLevel(prev => (prev === 1 ? 1.25 : prev === 1.25 ? 1.5 : 1))}
            className="rounded border border-[#243328] bg-[#141d18] px-2 py-1 text-[11px] font-mono text-[#cbd5e1] hover:border-[#f59e0b]"
            title="Ubah Skala Tampilan"
          >
            Zoom: {zoomLevel}x
          </button>
        </div>
      </div>

      {/* Main Map + Side Drawer Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* SVG Interactive Canvas */}
        <div className="xl:col-span-8 relative rounded-xl border border-[#243328] bg-[#090e0c] p-2 overflow-hidden shadow-inner flex flex-col items-center justify-center">
          {/* Subtle Grid / Topo Pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#86efac 1px, transparent 1px), linear-gradient(to right, #1f2d24 1px, transparent 1px), linear-gradient(to bottom, #1f2d24 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          />

          <svg
            viewBox="100 40 880 620"
            className="w-full h-auto max-h-[580px] select-none transition-transform duration-300"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
          >
            <defs>
              {/* Filter for glowing country borders */}
              <filter id="map-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              {/* Arrow markers for expansion vectors */}
              <marker
                id="expansion-arrow"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
              </marker>
              <marker
                id="soviet-arrow"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
              </marker>
            </defs>

            {/* Sea Annotations / Water bodies */}
            <g className="font-serif italic text-[11px] fill-[#2e4034] tracking-widest pointer-events-none select-none">
              <text x="140" y="220">SAMUDRA ATLANTIK</text>
              <text x="360" y="180">LAUT UTARA</text>
              <text x="560" y="200">LAUT BALTIK</text>
              <text x="440" y="580">LAUT MEDITERANIA</text>
              <text x="730" y="420">LAUT HITAM</text>
            </g>

            {/* Coordinate Lines */}
            <g stroke="#1a271f" strokeWidth="0.75" strokeDasharray="3,6" className="pointer-events-none">
              <line x1="100" y1="150" x2="980" y2="150" />
              <line x1="100" y1="300" x2="980" y2="300" />
              <line x1="100" y1="450" x2="980" y2="450" />
              <line x1="100" y1="600" x2="980" y2="600" />
              <line x1="300" y1="40" x2="300" y2="660" />
              <line x1="500" y1="40" x2="500" y2="660" />
              <line x1="700" y1="40" x2="700" y2="660" />
            </g>

            {/* Render Country SVG Paths */}
            {EUROPE_MAP_COUNTRIES.map((country) => {
              const isSelected = country.id === selectedCountryId;
              const isHovered = country.id === hoveredCountryId;
              const fill = getCountryFill(country);
              const stroke = getCountryStroke(country);

              return (
                <g
                  key={country.id}
                  className="cursor-pointer transition-all duration-150"
                  onClick={() => onSelectCountry(country.id)}
                  onMouseEnter={() => setHoveredCountryId(country.id)}
                  onMouseLeave={() => setHoveredCountryId(null)}
                >
                  {/* Primary Landmass */}
                  <path
                    d={country.pathD}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.2}
                    filter={isSelected ? 'url(#map-glow)' : undefined}
                    className="transition-colors duration-150"
                  />

                  {/* Secondary Paths (Enclaves / Islands like East Prussia, Sicily, Corsica) */}
                  {country.secondaryPathsD?.map((secD, idx) => (
                    <path
                      key={idx}
                      d={secD}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.2}
                      className="transition-colors duration-150"
                    />
                  ))}

                  {/* Country Code Label */}
                  <text
                    x={country.labelPos.x}
                    y={country.labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-mono text-[11px] font-black pointer-events-none select-none transition-colors"
                    fill={isSelected ? '#fef3c7' : '#f8fafc'}
                    style={{
                      textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.8)'
                    }}
                  >
                    {country.tag}
                  </text>

                  {/* Capital City Marker */}
                  <circle
                    cx={country.capitalPos.x}
                    cy={country.capitalPos.y}
                    r={isSelected ? 4 : 2.5}
                    fill={isSelected ? '#f59e0b' : '#ffffff'}
                    stroke="#000000"
                    strokeWidth={1}
                    className="pointer-events-none"
                  />
                  {isSelected && (
                    <circle
                      cx={country.capitalPos.x}
                      cy={country.capitalPos.y}
                      r={7}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth={1}
                      strokeDasharray="2,2"
                      className="pointer-events-none animate-spin"
                    />
                  )}

                  {/* Resource Badge in Resource Mode */}
                  {mapMode === 'resources' && (
                    <g className="pointer-events-none select-none">
                      {resourceFilter === 'oil' && country.resources.oil > 0 && (
                        <g transform={`translate(${country.labelPos.x - 14}, ${country.labelPos.y + 7})`}>
                          <rect width="28" height="13" rx="3" fill="#000000" opacity="0.85" />
                          <text x="14" y="9" textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="bold" fontFamily="monospace">
                            🛢️ {country.resources.oil}
                          </text>
                        </g>
                      )}
                      {resourceFilter === 'steel' && country.resources.steel > 0 && (
                        <g transform={`translate(${country.labelPos.x - 16}, ${country.labelPos.y + 7})`}>
                          <rect width="32" height="13" rx="3" fill="#000000" opacity="0.85" />
                          <text x="16" y="9" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontWeight="bold" fontFamily="monospace">
                            ⚙️ {country.resources.steel}
                          </text>
                        </g>
                      )}
                      {resourceFilter === 'aluminium' && country.resources.aluminium > 0 && (
                        <g transform={`translate(${country.labelPos.x - 14}, ${country.labelPos.y + 7})`}>
                          <rect width="28" height="13" rx="3" fill="#000000" opacity="0.85" />
                          <text x="14" y="9" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace">
                            ✈️ {country.resources.aluminium}
                          </text>
                        </g>
                      )}
                      {resourceFilter === 'tungsten' && country.resources.tungsten > 0 && (
                        <g transform={`translate(${country.labelPos.x - 14}, ${country.labelPos.y + 7})`}>
                          <rect width="28" height="13" rx="3" fill="#000000" opacity="0.85" />
                          <text x="14" y="9" textAnchor="middle" fill="#fb923c" fontSize="8" fontWeight="bold" fontFamily="monospace">
                            🔩 {country.resources.tungsten}
                          </text>
                        </g>
                      )}
                      {resourceFilter === 'chromium' && country.resources.chromium > 0 && (
                        <g transform={`translate(${country.labelPos.x - 14}, ${country.labelPos.y + 7})`}>
                          <rect width="28" height="13" rx="3" fill="#000000" opacity="0.85" />
                          <text x="14" y="9" textAnchor="middle" fill="#c084fc" fontSize="8" fontWeight="bold" fontFamily="monospace">
                            💎 {country.resources.chromium}
                          </text>
                        </g>
                      )}
                    </g>
                  )}

                  {/* Factory Badge in Industry Mode */}
                  {mapMode === 'industry' && (
                    <g transform={`translate(${country.labelPos.x - 14}, ${country.labelPos.y + 8})`} className="pointer-events-none select-none">
                      <rect width="28" height="12" rx="3" fill="#000000" opacity="0.85" />
                      <text x="14" y="9" textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="bold" fontFamily="monospace">
                        🏭 {country.startingFactories.civs + country.startingFactories.mils}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Expansion Vectors / Focus Claims Lines (Shown for Selected Country) */}
            {showExpansionVectors && selectedCountry?.claimsOrExpansionVectors && (
              <g className="pointer-events-none">
                {selectedCountry.claimsOrExpansionVectors.map((vec, idx) => (
                  <g key={idx}>
                    <line
                      x1={vec.x1}
                      y1={vec.y1}
                      x2={vec.x2}
                      y2={vec.y2}
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeDasharray="4,3"
                      markerEnd="url(#expansion-arrow)"
                    />
                    <rect
                      x={(vec.x1 + vec.x2) / 2 - 40}
                      y={(vec.y1 + vec.y2) / 2 - 9}
                      width="80"
                      height="16"
                      rx="3"
                      fill="#0c140f"
                      stroke="#f59e0b"
                      strokeWidth="0.75"
                      opacity="0.9"
                    />
                    <text
                      x={(vec.x1 + vec.x2) / 2}
                      y={(vec.y1 + vec.y2) / 2 + 3}
                      textAnchor="middle"
                      fill="#fef3c7"
                      fontSize="8"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {vec.label}
                    </text>
                  </g>
                ))}
              </g>
            )}
          </svg>

          {/* Floating Hover Card (Preview on Map) */}
          {hoveredCountry && hoveredCountry.id !== selectedCountryId && (
            <div className="absolute top-3 left-3 pointer-events-none rounded-lg border border-[#334155] bg-[#0c1410]/95 px-3 py-2 text-xs shadow-xl backdrop-blur-sm z-10 max-w-[240px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{hoveredCountry.flagSymbol}</span>
                <span className="font-bold text-[#f8fafc]">{hoveredCountry.name}</span>
              </div>
              <div className="text-[11px] text-[#94a3b8] font-mono mb-1">
                Ibu Kota: <strong className="text-[#cbd5e1]">{hoveredCountry.capital}</strong> • {hoveredCountry.ideology}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#fde047]">
                <span>Civs: {hoveredCountry.startingFactories.civs}</span>
                <span>Mils: {hoveredCountry.startingFactories.mils}</span>
                <span>Minyak: {hoveredCountry.resources.oil}</span>
                <span>Baja: {hoveredCountry.resources.steel}</span>
              </div>
            </div>
          )}

          {/* Legend Bottom Bar */}
          <div className="w-full mt-2 pt-2 border-t border-[#1e2a22] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#94a3b8]">
            <div className="flex items-center gap-3">
              <span>● Bintang Putih: Ibu Kota</span>
              <span>--- Garis Putus-putus: Vektor Fokus Klaim</span>
              <span>✠ Poros</span>
              <span>♚ Sekutu</span>
              <span>☭ Komintern</span>
            </div>
            <div className="text-[#86efac]">
              Klik negara mana pun untuk memuat pohon fokusnya di bawah
            </div>
          </div>
        </div>

        {/* Selected Country Strategic Dossier (Right Panel) */}
        <div className="xl:col-span-4 flex flex-col justify-between rounded-xl border border-[#2d3a33] bg-[#0f1712] p-4 shadow-xl">
          {selectedCountry ? (
            <div className="space-y-4">
              {/* Country Identity Header */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#223026]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedCountry.flagSymbol}</span>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#fef3c7] tracking-wide">
                        {selectedCountry.name}
                      </h4>
                      <p className="text-xs text-[#94a3b8] font-mono">
                        {selectedCountry.nativeName} • Tag: <strong className="text-[#f59e0b]">{selectedCountry.tag}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <span
                  className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold border ${
                    selectedCountry.faction === 'Axis'
                      ? 'bg-[#3b1219] text-[#fca5a5] border-[#991b1b]'
                      : selectedCountry.faction === 'Allies'
                      ? 'bg-[#102238] text-[#93c5fd] border-[#2563eb]'
                      : selectedCountry.faction === 'Comintern'
                      ? 'bg-[#38101a] text-[#fda4af] border-[#e11d48]'
                      : 'bg-[#1e293b] text-[#cbd5e1] border-[#475569]'
                  }`}
                >
                  {selectedCountry.faction}
                </span>
              </div>

              {/* Geo Stats Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="rounded border border-[#1e2a22] bg-[#090e0b] p-2">
                  <span className="text-[10px] text-[#94a3b8] block">Ibu Kota &amp; Ideologi</span>
                  <strong className="text-[#f8fafc] text-xs">{selectedCountry.capital}</strong>
                  <span className="text-[10px] text-[#fde047] block">{selectedCountry.ideology}</span>
                </div>

                <div className="rounded border border-[#1e2a22] bg-[#090e0b] p-2">
                  <span className="text-[10px] text-[#94a3b8] block">Basis Pabrik 1936</span>
                  <div className="text-xs text-[#86efac] font-bold">
                    {selectedCountry.startingFactories.civs} Civs • {selectedCountry.startingFactories.mils} Mils
                  </div>
                  <span className="text-[10px] text-[#38bdf8]">{selectedCountry.startingFactories.docks} Galangan Kapal</span>
                </div>
              </div>

              {/* Strategic Resources Breakdown */}
              <div className="rounded-lg border border-[#243328] bg-[#0c120e] p-3">
                <div className="text-xs font-mono font-bold text-[#fde047] mb-2 flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-[#f59e0b]" />
                  <span>CADANGAN BAHAN STRATEGIS:</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                  <div className={`rounded p-1.5 border ${selectedCountry.resources.oil > 20 ? 'border-[#f59e0b] bg-[#241c0e]' : 'border-[#1a261e] bg-[#080d0a]'}`}>
                    <span className="text-[10px] text-[#94a3b8] block">Minyak</span>
                    <strong className={`text-xs ${selectedCountry.resources.oil > 20 ? 'text-[#fde047]' : 'text-[#cbd5e1]'}`}>
                      🛢️ {selectedCountry.resources.oil}
                    </strong>
                  </div>

                  <div className={`rounded p-1.5 border ${selectedCountry.resources.steel > 50 ? 'border-[#cbd5e1] bg-[#1a232e]' : 'border-[#1a261e] bg-[#080d0a]'}`}>
                    <span className="text-[10px] text-[#94a3b8] block">Baja</span>
                    <strong className="text-xs text-[#cbd5e1]">⚙️ {selectedCountry.resources.steel}</strong>
                  </div>

                  <div className={`rounded p-1.5 border ${selectedCountry.resources.aluminium > 30 ? 'border-[#38bdf8] bg-[#0e2130]' : 'border-[#1a261e] bg-[#080d0a]'}`}>
                    <span className="text-[10px] text-[#94a3b8] block">Aluminium</span>
                    <strong className="text-xs text-[#38bdf8]">✈️ {selectedCountry.resources.aluminium}</strong>
                  </div>

                  <div className={`rounded p-1.5 border ${selectedCountry.resources.tungsten > 15 ? 'border-[#fb923c] bg-[#2a170b]' : 'border-[#1a261e] bg-[#080d0a]'}`}>
                    <span className="text-[10px] text-[#94a3b8] block">Wolfram</span>
                    <strong className="text-xs text-[#fb923c]">🔩 {selectedCountry.resources.tungsten}</strong>
                  </div>

                  <div className={`rounded p-1.5 border ${selectedCountry.resources.chromium > 20 ? 'border-[#c084fc] bg-[#251033]' : 'border-[#1a261e] bg-[#080d0a]'}`}>
                    <span className="text-[10px] text-[#94a3b8] block">Kromium</span>
                    <strong className="text-xs text-[#c084fc]">💎 {selectedCountry.resources.chromium}</strong>
                  </div>

                  <div className="rounded p-1.5 border border-[#1a261e] bg-[#080d0a]">
                    <span className="text-[10px] text-[#94a3b8] block">Karet</span>
                    <strong className="text-xs text-[#86efac]">🌿 {selectedCountry.resources.rubber}</strong>
                  </div>
                </div>
              </div>

              {/* Major Focus Paths */}
              <div className="space-y-1.5">
                <div className="text-xs font-mono font-bold text-[#fde047] flex items-center gap-1.5">
                  <Navigation className="h-3.5 w-3.5 text-[#38bdf8]" />
                  <span>JALUR POHON FOKUS UTAMA:</span>
                </div>
                <ul className="space-y-1 text-xs">
                  {selectedCountry.majorFocusPaths.map((pathStr, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[#cbd5e1] font-sans">
                      <span className="text-[#f59e0b] font-bold text-xs mt-0.5">•</span>
                      <span className="text-[11px] leading-tight">{pathStr}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Historical Context Note */}
              <div className="rounded border border-[#1e2a22] bg-[#080d0a] p-2.5 text-[11px] text-[#94a3b8] leading-relaxed">
                <strong className="text-[#fde047] block mb-1">Catatan Strategis PD II:</strong>
                {selectedCountry.keyFocusSummary}
              </div>

              {/* Direct Navigation Button */}
              {onScrollToTree && (
                <button
                  onClick={onScrollToTree}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#f59e0b] hover:to-[#d97706] px-4 py-2.5 text-xs font-mono font-bold text-[#0c120e] shadow-lg shadow-black/50 transition-all active:scale-[0.98]"
                >
                  <Search className="h-4 w-4" />
                  <span>Telusuri &amp; Hitung Pohon Fokus {selectedCountry.tag}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#94a3b8]">
              <Globe className="h-12 w-12 text-[#334155] mb-2" />
              <div className="font-serif text-sm font-bold text-[#cbd5e1]">Pilih Negara di Peta</div>
              <p className="text-xs mt-1">
                Klik negara mana pun pada peta interaktif Eropa di sebelah kiri untuk melihat rincian sumber daya, jalur fokus, dan sejarahnya.
              </p>
            </div>
          )}

          {/* Quick Major Non-European Country Bar */}
          <div className="pt-3 mt-3 border-t border-[#1e2a22]">
            <div className="text-[11px] font-mono text-[#94a3b8] mb-1.5 flex items-center justify-between">
              <span>Negara Major Non-Eropa:</span>
              <span className="text-[10px] text-[#64748b]">Klik untuk navigasi</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {NON_EUROPEAN_MAJORS.map(major => {
                const isMajorSelected = major.id === selectedCountryId;
                return (
                  <button
                    key={major.id}
                    onClick={() => onSelectCountry(major.id)}
                    className={`flex items-center gap-1 rounded px-2 py-1 text-[11px] font-mono transition-all ${
                      isMajorSelected
                        ? 'border border-[#f59e0b] bg-[#292212] text-[#fef3c7] font-bold shadow-sm'
                        : 'border border-[#1e2a22] bg-[#0c120e] text-[#94a3b8] hover:text-[#f8fafc]'
                    }`}
                  >
                    <span>{major.flagSymbol}</span>
                    <span>{major.tag}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
