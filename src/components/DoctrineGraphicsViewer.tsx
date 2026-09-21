import React, { useState } from 'react';
import {
  Zap, Shield, Flame, Target, Award, Users, BookOpen,
  Eye, Anchor, Crosshair, Plane, Radio, Layers, Check,
  Copy, Info, ArrowRight, GitBranch, RefreshCw, ChevronRight,
  TrendingUp, Sparkles, Filter, AlertCircle
} from 'lucide-react';
import {
  ALL_DOCTRINES,
  DoctrineCategory,
  DoctrineData,
  DoctrineNode
} from '../data/doctrineData';

interface DoctrineGraphicsViewerProps {
  initialDoctrineId?: string;
}

export const DoctrineGraphicsViewer: React.FC<DoctrineGraphicsViewerProps> = ({
  initialDoctrineId = 'mobile_warfare'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DoctrineCategory>('land');
  const [selectedDoctrineId, setSelectedDoctrineId] = useState<string>(initialDoctrineId);
  const [selectedNode, setSelectedNode] = useState<DoctrineNode | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Active branch selection state: mapping doctrineId -> 'left' | 'right' | 'both'
  const [selectedBranches, setSelectedBranches] = useState<Record<string, 'left' | 'right'>>({
    mobile_warfare: 'left',
    superior_firepower: 'left',
    grand_battleplan: 'left',
    mass_assault: 'left',
    fleet_in_being: 'left',
    trade_interdiction: 'left',
    base_strike: 'left',
    strategic_destruction: 'left',
    battlefield_support: 'left',
    operational_integrity: 'left'
  });

  // Filter doctrines by category
  const filteredDoctrines = ALL_DOCTRINES.filter(d => d.category === selectedCategory);

  // Active doctrine object
  const activeDoctrine = ALL_DOCTRINES.find(d => d.id === selectedDoctrineId) || filteredDoctrines[0] || ALL_DOCTRINES[0];

  const currentBranchChoice = selectedBranches[activeDoctrine.id] || 'left';

  const handleSelectCategory = (cat: DoctrineCategory) => {
    setSelectedCategory(cat);
    const firstInCat = ALL_DOCTRINES.find(d => d.category === cat);
    if (firstInCat) {
      setSelectedDoctrineId(firstInCat.id);
      setSelectedNode(null);
    }
  };

  const handleToggleBranch = (docId: string, branch: 'left' | 'right') => {
    setSelectedBranches(prev => ({
      ...prev,
      [docId]: branch
    }));
  };

  const handleCopySummary = (doc: DoctrineData) => {
    const text = `[HOI4 DOKTRIN: ${doc.name} (${doc.nameIndo})]
Kategori: ${doc.category.toUpperCase()}
Slogan: ${doc.tagline}
Rekomendasi Negara: ${doc.recommendedNations.map(n => `${n.name} (${n.tag})`).join(', ')}
Modifier Kunci:
${doc.keyModifiers.map(m => `• ${m.label}: ${m.value}`).join('\n')}
Cabang Pilihan:
1. ${doc.branchSummary.leftBranchName}: ${doc.branchSummary.leftDescription}
2. ${doc.branchSummary.rightBranchName}: ${doc.branchSummary.rightDescription}`;

    navigator.clipboard.writeText(text);
    setCopiedId(doc.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Render SVG emblems based on doctrine emblemType
  const renderDoctrineEmblem = (type: DoctrineData['emblemType'], size: number = 48) => {
    switch (type) {
      case 'tanks_blitz':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="shrink-0 drop-shadow-md">
            <circle cx="50" cy="50" r="46" stroke="#f43f5e" strokeWidth="3" fill="#2d121c" />
            <circle cx="50" cy="50" r="40" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            {/* Tank silhouette body */}
            <path d="M22 62h56v10a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V62z" fill="#f43f5e" opacity="0.3" />
            <path d="M25 64h50l-4 9H29l-4-9z" fill="#fda4af" />
            <circle cx="32" cy="69" r="3.5" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
            <circle cx="44" cy="69" r="3.5" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
            <circle cx="56" cy="69" r="3.5" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
            <circle cx="68" cy="69" r="3.5" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
            {/* Turret */}
            <path d="M35 52h26a6 6 0 0 1 6 6v4H30v-4a5 5 0 0 1 5-6z" fill="#f43f5e" />
            {/* Barrel */}
            <path d="M64 54h22v4H64z" fill="#fecdd3" />
            {/* Blitzkrieg Lightning */}
            <path d="M54 18L36 42h16l-8 22 26-28H52l8-18z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
          </svg>
        );

      case 'crossed_cannons':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="shrink-0 drop-shadow-md">
            <circle cx="50" cy="50" r="46" stroke="#fbbf24" strokeWidth="3" fill="#2d2008" />
            <circle cx="50" cy="50" r="40" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            {/* Blast Waves */}
            <circle cx="20" cy="20" r="8" stroke="#fef08a" strokeWidth="2" opacity="0.5" strokeDasharray="3 3" />
            <circle cx="80" cy="20" r="8" stroke="#fef08a" strokeWidth="2" opacity="0.5" strokeDasharray="3 3" />
            {/* Cannon 1 (top-left to bottom-right) */}
            <g transform="rotate(45 50 50)">
              <rect x="46" y="15" width="8" height="60" rx="2" fill="#fbbf24" />
              <rect x="44" y="13" width="12" height="5" rx="1.5" fill="#fef08a" />
              <circle cx="50" cy="74" r="8" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
            </g>
            {/* Cannon 2 (top-right to bottom-left) */}
            <g transform="rotate(-45 50 50)">
              <rect x="46" y="15" width="8" height="60" rx="2" fill="#f59e0b" />
              <rect x="44" y="13" width="12" height="5" rx="1.5" fill="#fef08a" />
              <circle cx="50" cy="74" r="8" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
            </g>
            {/* Fire Blast Center */}
            <circle cx="50" cy="50" r="7" fill="#ef4444" stroke="#fef08a" strokeWidth="2" />
          </svg>
        );

      case 'fortified_bunker':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="shrink-0 drop-shadow-md">
            <circle cx="50" cy="50" r="46" stroke="#38bdf8" strokeWidth="3" fill="#082338" />
            <circle cx="50" cy="50" r="40" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            {/* Bunker Dome & Concrete slits */}
            <path d="M22 68h56l-8-32a10 10 0 0 0-10-8H40a10 10 0 0 0-10 8l-8 32z" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <path d="M20 68h60v8H20z" fill="#0369a1" />
            {/* Gun Slit */}
            <rect x="36" y="44" width="28" height="7" rx="3.5" fill="#031d30" stroke="#bae6fd" strokeWidth="1.5" />
            <circle cx="50" cy="47.5" r="2.5" fill="#f59e0b" />
            {/* Barbed Wire Accent */}
            <path d="M16 80L84 80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M28 77l4 6m12-6l4 6m12-6l4 6m12-6l4 6" stroke="#e2e8f0" strokeWidth="2" />
            {/* Planning Compass / Clock */}
            <circle cx="50" cy="24" r="9" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
            <path d="M50 18v6l4 3" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case 'mass_red_star':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="shrink-0 drop-shadow-md">
            <circle cx="50" cy="50" r="46" stroke="#ef4444" strokeWidth="3" fill="#2e0909" />
            <circle cx="50" cy="50" r="40" stroke="#dc2626" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            {/* Red Star with Gold Trim */}
            <polygon
              points="50,16 59,36 81,37 64,51 70,72 50,60 30,72 36,51 19,37 41,36"
              fill="#dc2626"
              stroke="#fbbf24"
              strokeWidth="2.5"
            />
            {/* Infantry Helmets row beneath */}
            <path d="M25 76a7 7 0 0 1 14 0h-14zM43 76a7 7 0 0 1 14 0h-14zM61 76a7 7 0 0 1 14 0h-14z" fill="#fca5a5" stroke="#7f1d1d" strokeWidth="1" />
            {/* Bayonets */}
            <path d="M32 76V65M50 76V63M68 76V65" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case 'battleship_anchor':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="shrink-0 drop-shadow-md">
            <circle cx="50" cy="50" r="46" stroke="#0ea5e9" strokeWidth="3" fill="#082338" />
            <circle cx="50" cy="50" r="40" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            {/* Anchor */}
            <circle cx="50" cy="26" r="6" stroke="#38bdf8" strokeWidth="2.5" fill="#03324d" />
            <path d="M50 32v44" stroke="#38bdf8" strokeWidth="3" />
            <path d="M38 40h24" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M26 62c4 16 44 16 48 0" stroke="#38bdf8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M24 61l4-2m48 2l-4-2" stroke="#bae6fd" strokeWidth="2.5" />
            {/* Battleship Turret Top */}
            <rect x="36" y="58" width="28" height="12" rx="3" fill="#0369a1" stroke="#bae6fd" strokeWidth="1.5" />
            <path d="M42 58V48m8 10V48m8 10V48" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'submarine_wolfpack':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="shrink-0 drop-shadow-md">
            <circle cx="50" cy="50" r="46" stroke="#14b8a6" strokeWidth="3" fill="#042320" />
            <circle cx="50" cy="50" r="40" stroke="#0d9488" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            {/* Ocean Waves */}
            <path d="M16 45c8-4 16 4 24 0s16-4 24 0 16-4 20 0" stroke="#5eead4" strokeWidth="2" fill="none" />
            {/* Submarine Hull */}
            <path d="M22 62c6-3 48-3 56 0 0 6-20 12-40 12s-16-6-16-12z" fill="#0f766e" stroke="#2dd4bf" strokeWidth="2" />
            {/* Conning Tower */}
            <rect x="44" y="48" width="14" height="15" rx="3" fill="#134e4a" stroke="#2dd4bf" strokeWidth="1.5" />
            <path d="M48 48V34h4" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" />
            <path d="M54 48V38" stroke="#5eead4" strokeWidth="1.5" strokeLinecap="round" />
            {/* Torpedo path bubbles */}
            <circle cx="76" cy="65" r="2" fill="#fef08a" />
            <circle cx="82" cy="65" r="2.5" fill="#fef08a" />
            <circle cx="88" cy="65" r="3" fill="#ef4444" />
          </svg>
        );

      case 'carrier_strike':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="shrink-0 drop-shadow-md">
            <circle cx="50" cy="50" r="46" stroke="#a78bfa" strokeWidth="3" fill="#1e1035" />
            <circle cx="50" cy="50" r="40" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            {/* Flight Deck */}
            <polygon points="35,18 65,18 72,82 28,82" fill="#4c1d95" stroke="#a78bfa" strokeWidth="2" />
            {/* Runway Centerline */}
            <line x1="50" y1="22" x2="50" y2="78" stroke="#f5d0fe" strokeWidth="2" strokeDasharray="6 4" />
            {/* Island superstructure */}
            <rect x="66" y="38" width="6" height="20" rx="1.5" fill="#c4b5fd" />
            {/* Taking-off aircraft wings */}
            <path d="M50 26l-14 10h28l-14-10z" fill="#fef08a" stroke="#fbbf24" strokeWidth="1.5" />
            <line x1="50" y1="22" x2="50" y2="34" stroke="#fbbf24" strokeWidth="2" />
          </svg>
        );

      case 'strategic_bomber':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="shrink-0 drop-shadow-md">
            <circle cx="50" cy="50" r="46" stroke="#f97316" strokeWidth="3" fill="#2d1406" />
            <circle cx="50" cy="50" r="40" stroke="#ea580c" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            {/* Crosshairs */}
            <circle cx="50" cy="50" r="30" stroke="#fed7aa" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <line x1="50" y1="14" x2="50" y2="28" stroke="#fed7aa" strokeWidth="1.5" />
            <line x1="50" y1="72" x2="50" y2="86" stroke="#fed7aa" strokeWidth="1.5" />
            <line x1="14" y1="50" x2="28" y2="50" stroke="#fed7aa" strokeWidth="1.5" />
            <line x1="72" y1="50" x2="86" y2="50" stroke="#fed7aa" strokeWidth="1.5" />
            {/* Heavy 4-Engine Bomber Silhouette */}
            <path d="M50 20c-2 0-4 12-4 35l-32 10 2 6 32-5v14l-8 4v4l10-2 10 2v-4l-8-4V66l32 5 2-6-32-10c0-23-2-35-4-35z" fill="#ea580c" stroke="#fed7aa" strokeWidth="1.5" />
            {/* Dropping Bombs */}
            <circle cx="46" cy="74" r="2.5" fill="#fef08a" />
            <circle cx="54" cy="78" r="2.5" fill="#fef08a" />
          </svg>
        );

      case 'cas_dive_bomber':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="shrink-0 drop-shadow-md">
            <circle cx="50" cy="50" r="46" stroke="#34d399" strokeWidth="3" fill="#04261b" />
            <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            {/* Dive Trajectory Line */}
            <path d="M26 22q28 14 36 50" stroke="#6ee7b7" strokeWidth="2" strokeDasharray="3 3" />
            {/* Dive Bomber Angle (Stuka / Il-2 silhouette) */}
            <g transform="rotate(45 50 50)">
              <path d="M50 20c-2 0-3 10-3 26l-24 6 1 4 25-3v10l-6 3v3l7-1.5 7 1.5v-3l-6-3V49l25 3 1-4-24-6c0-16-1-26-3-26z" fill="#10b981" stroke="#a7f3d0" strokeWidth="1.5" />
            </g>
            {/* Explosion on Ground */}
            <polygon points="76,70 82,78 90,75 85,83 91,89 82,88 78,95 75,87 67,88 72,82" fill="#fbbf24" stroke="#ef4444" strokeWidth="1.5" />
          </svg>
        );

      case 'tactical_dogfight':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="shrink-0 drop-shadow-md">
            <circle cx="50" cy="50" r="46" stroke="#22d3ee" strokeWidth="3" fill="#042028" />
            <circle cx="50" cy="50" r="40" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            {/* Flight Loop Contrails */}
            <path d="M22 68c0-30 40-34 44-10 4 22-30 18-24-2" stroke="#a5f3fc" strokeWidth="2" fill="none" strokeDasharray="4 4" />
            {/* Fighter 1 (Top chasing) */}
            <g transform="translate(44, 24) rotate(70) scale(0.6)">
              <path d="M30 10l-12 16h8v10l-5 4v2l6-1 6 1v-2l-5-4V26h8z" fill="#22d3ee" stroke="#ecfeff" strokeWidth="1.5" />
            </g>
            {/* Fighter 2 (Evading) */}
            <g transform="translate(60, 52) rotate(140) scale(0.6)">
              <path d="M30 10l-12 16h8v10l-5 4v2l6-1 6 1v-2l-5-4V26h8z" fill="#f87171" stroke="#fee2e2" strokeWidth="1.5" />
            </g>
          </svg>
        );

      default:
        return null;
    }
  };

  const renderNodeIcon = (type: string) => {
    switch (type) {
      case 'Zap': return <Zap className="h-4 w-4" />;
      case 'Shield': return <Shield className="h-4 w-4" />;
      case 'Flame': return <Flame className="h-4 w-4" />;
      case 'Target': return <Target className="h-4 w-4" />;
      case 'Award': return <Award className="h-4 w-4" />;
      case 'Users': return <Users className="h-4 w-4" />;
      case 'BookOpen': return <BookOpen className="h-4 w-4" />;
      case 'Eye': return <Eye className="h-4 w-4" />;
      case 'Anchor': return <Anchor className="h-4 w-4" />;
      case 'Crosshair': return <Crosshair className="h-4 w-4" />;
      case 'Plane': return <Plane className="h-4 w-4" />;
      case 'Radio': return <Radio className="h-4 w-4" />;
      default: return <Layers className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner with Category Tabs */}
      <div className="rounded-2xl border border-[#223344] bg-gradient-to-r from-[#0f1721] via-[#111c2a] to-[#0c141e] p-5 shadow-xl shadow-black/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded bg-[#d97706]/20 px-2 py-0.5 text-[10px] font-mono font-bold text-[#fbbf24] border border-[#d97706]/40 uppercase tracking-wider">
                Doktrin Militer PD II
              </span>
              <span className="text-xs font-mono text-[#94a3b8]">
                10 Doktrin Lengkap • Grafis Pohon Riset • Matriks Bonus
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-[#f8fafc] flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-[#f59e0b]" />
              Pohon Riset &amp; Grafis Doktrin (Doctrines Tree)
            </h2>
            <p className="text-xs text-[#94a3b8] mt-1 max-w-3xl leading-relaxed">
              Jelajahi seluruh pohon doktrin militer HOI4. Setiap doktrin memiliki cabang yang saling eksklusif (mutually exclusive). Pilih cabang taktis untuk melihat kalkulasi efek kumulatif dan sinergi template divisi/armada.
            </p>
          </div>

          {/* Category Switcher Tabs */}
          <div className="flex items-center gap-1.5 rounded-xl border border-[#1e2e40] bg-[#090e14] p-1.5 self-start md:self-auto shrink-0">
            <button
              id="doctrine-tab-land"
              onClick={() => handleSelectCategory('land')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === 'land'
                  ? 'border border-[#ef4444]/60 bg-[#2b1216] text-[#fca5a5] shadow-md shadow-black/40'
                  : 'text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              <Shield className="h-4 w-4 text-[#ef4444]" />
              <span>Darat (4 Land)</span>
            </button>

            <button
              id="doctrine-tab-naval"
              onClick={() => handleSelectCategory('naval')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === 'naval'
                  ? 'border border-[#0284c7]/60 bg-[#082338] text-[#7dd3fc] shadow-md shadow-black/40'
                  : 'text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              <Anchor className="h-4 w-4 text-[#0ea5e9]" />
              <span>Laut (3 Naval)</span>
            </button>

            <button
              id="doctrine-tab-air"
              onClick={() => handleSelectCategory('air')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === 'air'
                  ? 'border border-[#10b981]/60 bg-[#092b1f] text-[#6ee7b7] shadow-md shadow-black/40'
                  : 'text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              <Plane className="h-4 w-4 text-[#10b981]" />
              <span>Udara (3 Air)</span>
            </button>
          </div>
        </div>

        {/* Doctrine Selector Ribbon */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
          {filteredDoctrines.map(doc => {
            const isSelected = doc.id === activeDoctrine.id;
            return (
              <button
                key={doc.id}
                id={`btn-select-doctrine-${doc.id}`}
                onClick={() => {
                  setSelectedDoctrineId(doc.id);
                  setSelectedNode(null);
                }}
                className={`relative flex items-center gap-3.5 rounded-xl border p-3 text-left transition-all overflow-hidden ${
                  isSelected
                    ? 'border-white/40 shadow-lg shadow-black/60 bg-gradient-to-r from-[#172535] to-[#121c27]'
                    : 'border-[#1e2a36] bg-[#0c131c] hover:border-[#2f4255] text-[#94a3b8]'
                }`}
                style={{
                  borderLeftColor: isSelected ? doc.badgeBorder : undefined,
                  borderLeftWidth: isSelected ? '4px' : undefined
                }}
              >
                {/* Visual Emblem Mini */}
                <div className="shrink-0 scale-90">
                  {renderDoctrineEmblem(doc.emblemType, 40)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-bold text-sm text-[#f8fafc] truncate flex items-center gap-1.5">
                    {doc.name}
                  </div>
                  <div className="text-[11px] text-[#94a3b8] truncate font-mono">
                    {doc.tagline}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px]">
                    {doc.recommendedNations.slice(0, 2).map((n, idx) => (
                      <span key={idx} className="rounded bg-[#1e293b] px-1 py-0.2 font-mono text-[#cbd5e1]">
                        {n.flag} {n.tag}
                      </span>
                    ))}
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Selected Doctrine Dossier & Visual Tech Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Graphic Dossier & Radar Profile (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Main Doctrine Graphic Hero Card */}
          <div className="rounded-2xl border border-[#223344] bg-[#111923] p-5 shadow-xl shadow-black/50 relative overflow-hidden">
            {/* Atmospheric Background Glow */}
            <div
              className="absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl pointer-events-none opacity-20"
              style={{ backgroundColor: activeDoctrine.primaryColor }}
            />

            {/* Emblem and Title */}
            <div className="flex items-start gap-4">
              <div className="p-1 rounded-2xl border border-white/10 bg-[#0b1016] shadow-inner shrink-0">
                {renderDoctrineEmblem(activeDoctrine.emblemType, 64)}
              </div>
              <div>
                <span
                  className="rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider block w-fit mb-1 border"
                  style={{
                    backgroundColor: `${activeDoctrine.primaryColor}20`,
                    color: activeDoctrine.badgeBorder,
                    borderColor: `${activeDoctrine.primaryColor}40`
                  }}
                >
                  Kategori {activeDoctrine.category.toUpperCase()}
                </span>
                <h3 className="text-xl font-black text-[#f8fafc] tracking-tight">
                  {activeDoctrine.name}
                </h3>
                <p className="text-xs font-mono text-[#38bdf8] mt-0.5">
                  {activeDoctrine.nameIndo}
                </p>
              </div>
            </div>

            {/* Tagline & Description */}
            <p className="mt-4 text-xs text-[#cbd5e1] leading-relaxed border-t border-[#1a2634] pt-3">
              {activeDoctrine.description}
            </p>

            {/* Recommended Nations */}
            <div className="mt-4 border-t border-[#1a2634] pt-3">
              <span className="font-mono text-[11px] font-bold uppercase text-[#64748b] block mb-1.5">
                Negara yang Sangat Cocok:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeDoctrine.recommendedNations.map((nat, nIdx) => (
                  <span
                    key={nIdx}
                    className="flex items-center gap-1.5 rounded-lg border border-[#1e2a36] bg-[#0c141d] px-2.5 py-1 text-xs font-mono text-[#e2e8f0]"
                  >
                    <span>{nat.flag}</span>
                    <span className="font-semibold">{nat.name}</span>
                    <span className="text-[#38bdf8]">({nat.tag})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={() => handleCopySummary(activeDoctrine)}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border border-[#1e2a36] bg-[#0c141d] py-2 text-xs font-semibold text-[#cbd5e1] hover:bg-[#16202c] hover:text-white transition-all"
            >
              {copiedId === activeDoctrine.id ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#10b981]" />
                  <span className="text-[#10b981]">Ringkasan Doktrin Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#94a3b8]" />
                  <span>Salin Ringkasan Doktrin</span>
                </>
              )}
            </button>
          </div>

          {/* Graphical Stat Profile Meters (Radar Equivalent) */}
          <div className="rounded-2xl border border-[#223344] bg-[#111923] p-5 shadow-xl shadow-black/50 space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#1b2835] pb-2.5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#f8fafc] flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#f59e0b]" />
                Grafik Profil Statistik &amp; Spesialisasi
              </h4>
              <span className="text-[10px] font-mono text-[#64748b]">Skor 0-100</span>
            </div>

            <div className="space-y-2.5">
              {activeDoctrine.statProfile.map((stat, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#cbd5e1]">{stat.name}</span>
                    <span className="font-bold text-[#38bdf8]">{stat.label}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#0a0e14] overflow-hidden border border-white/5">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${stat.score}%`,
                        backgroundColor: activeDoctrine.badgeBorder
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Modifiers Highlights */}
          <div className="rounded-2xl border border-[#223344] bg-[#111923] p-5 shadow-xl shadow-black/50 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#f8fafc] flex items-center gap-2 border-b border-[#1b2835] pb-2.5">
              <Award className="h-4 w-4 text-[#38bdf8]" />
              Modifier Kunci di Medan Perang
            </h4>

            <div className="space-y-2">
              {activeDoctrine.keyModifiers.map((mod, mIdx) => (
                <div
                  key={mIdx}
                  className="flex items-center justify-between rounded-lg border border-[#1b2835] bg-[#0c141d] p-2.5 text-xs"
                >
                  <span className="text-[#94a3b8]">{mod.label}</span>
                  <span className="font-mono font-bold text-[#10b981]">{mod.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Tech Tree Flowchart (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Interactive Branch Switcher Controller */}
          <div className="rounded-2xl border border-[#223344] bg-[#111923] p-5 shadow-xl shadow-black/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#1b2835] pb-4 mb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#f59e0b] uppercase tracking-wider block">
                  Interactive Branch Controller
                </span>
                <h3 className="text-base font-bold text-[#f8fafc] flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-[#38bdf8]" />
                  Pilih Percabangan Doktrin (Mutually Exclusive Branch)
                </h3>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-[#1e2a36] bg-[#090e14] p-1">
                <button
                  id={`btn-branch-left-${activeDoctrine.id}`}
                  onClick={() => handleToggleBranch(activeDoctrine.id, 'left')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    currentBranchChoice === 'left'
                      ? 'bg-[#38bdf8] text-[#082338] shadow-md'
                      : 'text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  Cabang Kiri
                </button>
                <button
                  id={`btn-branch-right-${activeDoctrine.id}`}
                  onClick={() => handleToggleBranch(activeDoctrine.id, 'right')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    currentBranchChoice === 'right'
                      ? 'bg-[#38bdf8] text-[#082338] shadow-md'
                      : 'text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  Cabang Kanan
                </button>
              </div>
            </div>

            {/* Branch Details Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div
                className={`rounded-xl border p-3.5 transition-all ${
                  currentBranchChoice === 'left'
                    ? 'border-[#38bdf8]/60 bg-[#0c2336] shadow-md shadow-black/30'
                    : 'border-[#1b2835] bg-[#0c141d] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#7dd3fc]">
                    {activeDoctrine.branchSummary.leftBranchName}
                  </span>
                  {currentBranchChoice === 'left' && (
                    <span className="rounded bg-[#0284c7] px-1.5 py-0.2 text-[9px] font-mono font-bold text-white uppercase">
                      Aktif Terpilih
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                  {activeDoctrine.branchSummary.leftDescription}
                </p>
              </div>

              <div
                className={`rounded-xl border p-3.5 transition-all ${
                  currentBranchChoice === 'right'
                    ? 'border-[#38bdf8]/60 bg-[#0c2336] shadow-md shadow-black/30'
                    : 'border-[#1b2835] bg-[#0c141d] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#7dd3fc]">
                    {activeDoctrine.branchSummary.rightBranchName}
                  </span>
                  {currentBranchChoice === 'right' && (
                    <span className="rounded bg-[#0284c7] px-1.5 py-0.2 text-[9px] font-mono font-bold text-white uppercase">
                      Aktif Terpilih
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                  {activeDoctrine.branchSummary.rightDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Graphical Tech Tree Layout (Flowchart) */}
          <div className="rounded-2xl border border-[#223344] bg-[#111923] p-5 shadow-xl shadow-black/50 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1b2835] pb-3">
              <div>
                <h4 className="text-sm font-bold text-[#f8fafc] flex items-center gap-2">
                  <Layers className="h-4 w-4 text-[#f59e0b]" />
                  Diagram Visual Pohon Riset (Interactive Tech Tree)
                </h4>
                <p className="text-xs text-[#94a3b8]">
                  Klik salah satu kotak doktrin untuk melihat detail taktis dan penjelasan teknisnya.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-[#94a3b8]">
                <div className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />
                  <span>Aktif/Tersedia</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#eab308]" />
                  <span>Cabang Pilihan</span>
                </div>
              </div>
            </div>

            {/* Tech Tree Flow Grid */}
            <div className="space-y-4 py-2 relative">
              {/* Group nodes by Tier */}
              {[1, 2, 3, 4, 5].map(tier => {
                const tierNodes = activeDoctrine.treeNodes.filter(n => n.tier === tier);
                if (tierNodes.length === 0) return null;

                const isSplitTier = tierNodes.length > 1;

                return (
                  <div key={tier} className="space-y-2">
                    {/* Connecting line between tiers */}
                    {tier > 1 && (
                      <div className="flex justify-center my-1">
                        <div className="h-6 w-0.5 bg-gradient-to-b from-[#38bdf8]/60 to-[#1e2e40]" />
                      </div>
                    )}

                    {isSplitTier && (
                      <div className="flex items-center justify-center gap-2 py-1">
                        <div className="h-px w-16 bg-[#38bdf8]/30" />
                        <span className="rounded-full border border-[#f59e0b]/50 bg-[#2d1e08] px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#fbbf24] uppercase tracking-wider">
                          Cabang Saling Eksklusif (Mutually Exclusive)
                        </span>
                        <div className="h-px w-16 bg-[#38bdf8]/30" />
                      </div>
                    )}

                    {/* Nodes row */}
                    <div className={`grid ${isSplitTier ? 'grid-cols-1 sm:grid-cols-2 gap-4' : 'grid-cols-1 max-w-md mx-auto'} items-center`}>
                      {tierNodes.map(node => {
                        const isNodeSelected = selectedNode?.id === node.id;
                        const isBranchActive =
                          node.column === 1 || // Center stem is always active
                          (node.column === 0 && currentBranchChoice === 'left') ||
                          (node.column === 2 && currentBranchChoice === 'right');

                        return (
                          <div
                            key={node.id}
                            id={`node-${node.id}`}
                            onClick={() => setSelectedNode(node)}
                            className={`cursor-pointer rounded-xl border p-4 transition-all relative overflow-hidden ${
                              isNodeSelected
                                ? 'border-[#38bdf8] bg-[#14283c] shadow-lg shadow-black/50 ring-1 ring-[#38bdf8]'
                                : isBranchActive
                                  ? 'border-[#223344] bg-[#0c141d] hover:border-[#38bdf8]/50 hover:bg-[#101b27]'
                                  : 'border-[#1b222c] bg-[#080d13] opacity-40 hover:opacity-70'
                            }`}
                          >
                            {/* Branch Accent Bar */}
                            <div
                              className="absolute top-0 left-0 bottom-0 w-1.5"
                              style={{
                                backgroundColor: isBranchActive ? activeDoctrine.badgeBorder : '#334155'
                              }}
                            />

                            <div className="pl-2">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <div
                                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white"
                                    style={{
                                      backgroundColor: isBranchActive ? `${activeDoctrine.primaryColor}80` : '#1e293b'
                                    }}
                                  >
                                    {renderNodeIcon(node.iconType)}
                                  </div>
                                  <div>
                                    <h5 className="text-xs font-bold text-[#f8fafc]">
                                      {node.name}
                                    </h5>
                                    <span className="text-[10px] font-mono text-[#94a3b8] block">
                                      {node.sub}
                                    </span>
                                  </div>
                                </div>

                                <span className="rounded bg-[#1e293b] px-1.5 py-0.5 font-mono text-[9px] text-[#cbd5e1]">
                                  Tier {node.tier}
                                </span>
                              </div>

                              {/* Effects Badges */}
                              <div className="mt-2.5 space-y-1">
                                {node.effects.map((eff, effIdx) => (
                                  <div
                                    key={effIdx}
                                    className="flex items-center gap-1.5 text-[11px] font-mono text-[#7dd3fc]"
                                  >
                                    <span className="text-[#38bdf8] font-bold">▶</span>
                                    <span>{eff}</span>
                                  </div>
                                ))}
                              </div>

                              {node.branchName && (
                                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#64748b]">
                                  <span>Cabang: {node.branchName}</span>
                                  {isBranchActive ? (
                                    <span className="text-[#10b981] font-bold">✓ Terpilih</span>
                                  ) : (
                                    <span className="text-[#f87171]">✕ Terkunci</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Selected Node Inspector Modal / Drawer */}
          {selectedNode && (
            <div className="rounded-2xl border border-[#38bdf8]/60 bg-gradient-to-r from-[#0c2236] to-[#0f1721] p-5 shadow-xl shadow-black/60 relative animate-fadeIn">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0284c7] text-white shadow-md">
                    {renderNodeIcon(selectedNode.iconType)}
                  </div>
                  <div>
                    <span className="rounded bg-[#38bdf8]/20 px-2 py-0.5 text-[10px] font-mono font-bold text-[#7dd3fc] uppercase">
                      Detail Node Riset • Tier {selectedNode.tier}
                    </span>
                    <h4 className="text-lg font-black text-[#f8fafc]">
                      {selectedNode.name}
                    </h4>
                    <p className="text-xs font-mono text-[#94a3b8]">
                      {selectedNode.sub}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedNode(null)}
                  className="rounded-lg p-1.5 text-[#94a3b8] hover:bg-white/10 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <p className="mt-3 text-xs text-[#cbd5e1] leading-relaxed">
                {selectedNode.description}
              </p>

              <div className="mt-4 rounded-xl border border-white/10 bg-[#07131e] p-3 space-y-1.5">
                <span className="font-mono text-[11px] font-bold uppercase text-[#38bdf8] block mb-1">
                  Efek Stat &amp; Taktik Tempur:
                </span>
                {selectedNode.effects.map((eff, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-[#f1f5f9]">
                    <Check className="h-3.5 w-3.5 text-[#10b981] shrink-0" />
                    <span>{eff}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
