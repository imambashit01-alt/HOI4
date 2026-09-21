import React, { useState, useEffect } from 'react';
import {
  Clock, Factory, Landmark, ShieldAlert, Cpu, Truck, Maximize2,
  Plane, Shield, BookOpen, Anchor, Eye, Crosshair, Compass, Flame,
  Users, Award, Zap, Globe, FileText, CheckCircle2, Circle,
  Star, ChevronDown, ChevronUp, AlertTriangle, Lightbulb,
  Filter, Check, Copy, Sparkles, ExternalLink, BookmarkCheck,
  RotateCcw, ListOrdered, Tag, ArrowRight
} from 'lucide-react';
import { GuideSection, GuideLevel, MainTab } from '../types';

interface GuideViewerProps {
  guides: GuideSection[];
  guideLevel: GuideLevel;
  searchQuery: string;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: { id: string; type: 'guide'; title: string; subtitle: string; tag: string }) => void;
  onSelectLevel?: (level: GuideLevel) => void;
  onNavigateTab?: (tab: MainTab, query?: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Clock: <Clock className="h-5 w-5 text-[#f59e0b]" />,
  Factory: <Factory className="h-5 w-5 text-[#3b82f6]" />,
  Landmark: <Landmark className="h-5 w-5 text-[#10b981]" />,
  ShieldAlert: <ShieldAlert className="h-5 w-5 text-[#ef4444]" />,
  Cpu: <Cpu className="h-5 w-5 text-[#8b5cf6]" />,
  Truck: <Truck className="h-5 w-5 text-[#f97316]" />,
  Maximize2: <Maximize2 className="h-5 w-5 text-[#06b6d4]" />,
  Plane: <Plane className="h-5 w-5 text-[#38bdf8]" />,
  Shield: <Shield className="h-5 w-5 text-[#10b981]" />,
  BookOpen: <BookOpen className="h-5 w-5 text-[#fbbf24]" />,
  Anchor: <Anchor className="h-5 w-5 text-[#60a5fa]" />,
  Eye: <Eye className="h-5 w-5 text-[#a855f7]" />,
  Crosshair: <Crosshair className="h-5 w-5 text-[#f43f5e]" />,
  Compass: <Compass className="h-5 w-5 text-[#14b8a6]" />,
  Flame: <Flame className="h-5 w-5 text-[#e11d48]" />,
  Users: <Users className="h-5 w-5 text-[#6366f1]" />,
  Award: <Award className="h-5 w-5 text-[#f59e0b]" />,
  Zap: <Zap className="h-5 w-5 text-[#eab308]" />,
  Globe: <Globe className="h-5 w-5 text-[#38bdf8]" />,
  FileText: <FileText className="h-5 w-5 text-[#a855f7]" />
};

export const GuideViewer: React.FC<GuideViewerProps> = ({
  guides,
  guideLevel,
  searchQuery,
  isFavorite,
  toggleFavorite,
  onSelectLevel,
  onNavigateTab
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'uncompleted' | 'completed' | 'favorite'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Completed modules tracking with localStorage
  const [completedGuides, setCompletedGuides] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('hoi4_completed_guides');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading completed guides', e);
    }
    // Default initial completed for preview engagement
    return {
      'g-pemula-1': true,
      'g-pemula-2': true
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('hoi4_completed_guides', JSON.stringify(completedGuides));
    } catch (e) {
      console.error('Failed saving completed guides', e);
    }
  }, [completedGuides]);

  const toggleComplete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCompletedGuides(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'g-pemula-1': true,
    'g-pemula-2': true,
    'g-menengah-1': true
  });

  const categories = [
    'Semua',
    'Ekonomi & Industri',
    'Militer Darat',
    'Logistik & Suplai',
    'Udara & CAS',
    'Angkatan Laut',
    'Intelijen & Politik'
  ];

  // Quick popular tags for instant filtering
  const popularTags = [
    'Civs', 'Supply Hub', 'Attrition', 'Conscription Laws', 'Break-Even Mils', 'Encirclement',
    'Tank Destroyer', 'Mechanized', 'Logistical Strike', 'Arms Market', '21 Width', 'CAS',
    'Medium Tank', 'Screening Ratio', 'Naval Mines', 'Garrison', 'Fuel', 'Railway Gun', 'Spanyol 1936', 'Nuklir'
  ];

  const toggleExpand = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    guides.forEach(g => { allExpanded[g.id] = true; });
    setExpandedSections(allExpanded);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  const copyTacticalSummary = (guide: GuideSection, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const textToCopy = `[HOI4 Panduan Taktis] ${guide.title}\nTingkat: ${guide.level.toUpperCase()} | Kategori: ${guide.category}\n\nRingkasan:\n${guide.overview}\n\nKiat Utama:\n${guide.summaryTips.map((tip, i) => `${i + 1}. ${tip}`).join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(guide.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Filter logic
  const filteredGuides = guides.filter(guide => {
    // Level
    if (guideLevel !== 'all' && guide.level !== guideLevel) {
      return false;
    }

    // Category
    if (selectedCategory !== 'Semua' && guide.category !== selectedCategory) {
      return false;
    }

    // Tag
    if (selectedTag) {
      const hasTag = guide.keyPoints.some(kp =>
        kp.tags && kp.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())
      );
      if (!hasTag) return false;
    }

    // Status filter
    const isCompleted = !!completedGuides[guide.id];
    const isFav = isFavorite(guide.id);
    if (statusFilter === 'completed' && !isCompleted) return false;
    if (statusFilter === 'uncompleted' && isCompleted) return false;
    if (statusFilter === 'favorite' && !isFav) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = guide.title.toLowerCase().includes(q);
      const matchSubtitle = guide.subtitle.toLowerCase().includes(q);
      const matchOverview = guide.overview.toLowerCase().includes(q);
      const matchCategory = guide.category.toLowerCase().includes(q);
      const matchPoints = guide.keyPoints.some(p =>
        p.heading.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.proTip && p.proTip.toLowerCase().includes(q)) ||
        (p.warning && p.warning.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
        (p.steps && p.steps.some(s => s.toLowerCase().includes(q)))
      );
      const matchTips = guide.summaryTips.some(t => t.toLowerCase().includes(q));

      return matchTitle || matchSubtitle || matchOverview || matchCategory || matchPoints || matchTips;
    }

    return true;
  });

  // Calculate mastery statistics
  const totalGuides = guides.length;
  const totalCompleted = guides.filter(g => completedGuides[g.id]).length;
  const progressPercent = Math.round((totalCompleted / (totalGuides || 1)) * 100);

  const pemulaCount = guides.filter(g => g.level === 'pemula').length;
  const pemulaDone = guides.filter(g => g.level === 'pemula' && completedGuides[g.id]).length;

  const menengahCount = guides.filter(g => g.level === 'menengah').length;
  const menengahDone = guides.filter(g => g.level === 'menengah' && completedGuides[g.id]).length;

  const ahliCount = guides.filter(g => g.level === 'ahli').length;
  const ahliDone = guides.filter(g => g.level === 'ahli' && completedGuides[g.id]).length;

  const getLevelBadge = (level: 'pemula' | 'menengah' | 'ahli') => {
    switch (level) {
      case 'pemula':
        return (
          <span className="inline-flex items-center gap-1.5 rounded border border-[#15803d]/50 bg-[#14532d]/40 px-2 py-0.5 text-[11px] font-mono font-semibold text-[#86efac]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            REKRUT (PEMULA)
          </span>
        );
      case 'menengah':
        return (
          <span className="inline-flex items-center gap-1.5 rounded border border-[#b45309]/50 bg-[#78350f]/40 px-2 py-0.5 text-[11px] font-mono font-semibold text-[#fde047]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#eab308]" />
            REGULER (MENENGAH)
          </span>
        );
      case 'ahli':
        return (
          <span className="inline-flex items-center gap-1.5 rounded border border-[#b91c1c]/50 bg-[#7f1d1d]/40 px-2 py-0.5 text-[11px] font-mono font-semibold text-[#fca5a5]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
            VETERAN (AHLI)
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Tactical Mastery Progress Header Box */}
      <div className="rounded-xl border border-[#2b3e52] bg-gradient-to-r from-[#121c27] via-[#0f1822] to-[#121d28] p-5 shadow-lg shadow-black/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#d97706]">
                <BookmarkCheck className="h-4 w-4" />
                STATUS PENGUASAAN DOKTRIN PERANG
              </span>
              <span className="rounded bg-[#1e2e40] px-2 py-0.5 text-[11px] font-mono text-[#38bdf8]">
                {totalCompleted} / {totalGuides} Modul Dikuasai ({progressPercent}%)
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-[#f8fafc]">
              Pusat Pelatihan &amp; Doktrin Taktis PD II
            </h2>
            <p className="text-xs md:text-sm text-[#94a3b8]">
              Pelajari modul taktis dari tingkat Rekrut hingga Veteran. Tandai modul yang telah kamu pahami untuk melacak kesiapan memimpin medan perang.
            </p>
          </div>

          {/* Quick Level Progress Breakdown */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap bg-[#0b1219] p-3 rounded-lg border border-[#1b2836]">
            <div className="text-center px-2">
              <div className="text-[10px] font-mono text-[#86efac]">REKRUT</div>
              <div className="text-xs font-bold text-[#f1f5f9]">{pemulaDone}/{pemulaCount}</div>
            </div>
            <div className="h-6 w-px bg-[#1f2d3d]" />
            <div className="text-center px-2">
              <div className="text-[10px] font-mono text-[#fde047]">REGULER</div>
              <div className="text-xs font-bold text-[#f1f5f9]">{menengahDone}/{menengahCount}</div>
            </div>
            <div className="h-6 w-px bg-[#1f2d3d]" />
            <div className="text-center px-2">
              <div className="text-[10px] font-mono text-[#fca5a5]">VETERAN</div>
              <div className="text-xs font-bold text-[#f1f5f9]">{ahliDone}/{ahliCount}</div>
            </div>
          </div>
        </div>

        {/* Tactical Progress Bar */}
        <div className="mt-4 space-y-1.5">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#162330] border border-[#223242]">
            <div
              className="h-full bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#10b981] transition-all duration-500 rounded-full"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter and Control Toolbar */}
      <div className="space-y-3 rounded-xl border border-[#22303c] bg-[#10171f] p-4">
        {/* Row 1: Level Quick Selector & Bulk Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1b2734] pb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-mono text-[#64748b] mr-1 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5 text-[#d97706]" />
              Tingkat:
            </span>
            <button
              onClick={() => onSelectLevel && onSelectLevel('all')}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                guideLevel === 'all'
                  ? 'bg-[#1e293b] text-[#f8fafc] border border-[#3b82f6]/40'
                  : 'text-[#94a3b8] hover:bg-[#16202a] hover:text-[#f1f5f9]'
              }`}
            >
              Semua ({totalGuides})
            </button>
            <button
              onClick={() => onSelectLevel && onSelectLevel('pemula')}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                guideLevel === 'pemula'
                  ? 'bg-[#143324] text-[#86efac] border border-[#16a34a]/60 shadow-sm'
                  : 'text-[#94a3b8] hover:bg-[#16202a] hover:text-[#86efac]'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
              Rekrut ({pemulaCount})
            </button>
            <button
              onClick={() => onSelectLevel && onSelectLevel('menengah')}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                guideLevel === 'menengah'
                  ? 'bg-[#3b2b13] text-[#fde047] border border-[#d97706]/60 shadow-sm'
                  : 'text-[#94a3b8] hover:bg-[#16202a] hover:text-[#fde047]'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#eab308]" />
              Reguler ({menengahCount})
            </button>
            <button
              onClick={() => onSelectLevel && onSelectLevel('ahli')}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                guideLevel === 'ahli'
                  ? 'bg-[#3d1616] text-[#fca5a5] border border-[#dc2626]/60 shadow-sm'
                  : 'text-[#94a3b8] hover:bg-[#16202a] hover:text-[#fca5a5]'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
              Veteran ({ahliCount})
            </button>
          </div>

          {/* Expand/Collapse All buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="rounded border border-[#1e2a36] bg-[#141d27] px-2.5 py-1 text-xs text-[#94a3b8] hover:border-[#334759] hover:text-[#e2e8f0] transition-colors"
            >
              Buka Semua
            </button>
            <button
              onClick={collapseAll}
              className="rounded border border-[#1e2a36] bg-[#141d27] px-2.5 py-1 text-xs text-[#94a3b8] hover:border-[#334759] hover:text-[#e2e8f0] transition-colors"
            >
              Tutup Semua
            </button>
          </div>
        </div>

        {/* Row 2: Category Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-mono text-[#64748b] whitespace-nowrap">Kategori:</span>
          {categories.map(cat => {
            const count = cat === 'Semua'
              ? guides.length
              : guides.filter(g => g.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'border border-[#d97706]/70 bg-[#261f15] text-[#fef3c7] shadow-sm'
                    : 'border border-[#1e2a36] bg-[#141d27] text-[#94a3b8] hover:border-[#334759] hover:text-[#e2e8f0]'
                }`}
              >
                {cat} <span className="ml-1 opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Row 3: Status Filter & Quick Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#18232f]">
          <div className="flex items-center gap-1.5 flex-wrap text-xs">
            <span className="font-mono text-[#64748b] mr-1">Status:</span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`rounded px-2 py-0.5 text-xs font-medium ${
                statusFilter === 'all'
                  ? 'bg-[#1e293b] text-[#f8fafc]'
                  : 'text-[#64748b] hover:text-[#94a3b8]'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setStatusFilter('uncompleted')}
              className={`rounded px-2 py-0.5 text-xs font-medium ${
                statusFilter === 'uncompleted'
                  ? 'bg-[#1e293b] text-[#f8fafc]'
                  : 'text-[#64748b] hover:text-[#94a3b8]'
              }`}
            >
              Belum Selesai ({totalGuides - totalCompleted})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`rounded px-2 py-0.5 text-xs font-medium ${
                statusFilter === 'completed'
                  ? 'bg-[#143324] text-[#86efac]'
                  : 'text-[#64748b] hover:text-[#94a3b8]'
              }`}
            >
              Selesai ({totalCompleted})
            </button>
            <button
              onClick={() => setStatusFilter('favorite')}
              className={`rounded px-2 py-0.5 text-xs font-medium ${
                statusFilter === 'favorite'
                  ? 'bg-[#2d2714] text-[#fde047]'
                  : 'text-[#64748b] hover:text-[#94a3b8]'
              }`}
            >
              Favorit Saja
            </button>
          </div>

          {/* Quick Popular Tags */}
          <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-mono">
            <Tag className="h-3 w-3 text-[#64748b] shrink-0" />
            {popularTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`rounded px-1.5 py-0.5 transition-colors whitespace-nowrap ${
                  selectedTag === tag
                    ? 'bg-[#d97706] text-[#0a0f14] font-bold'
                    : 'bg-[#151f2b] text-[#64748b] hover:bg-[#1d2b3a] hover:text-[#94a3b8]'
                }`}
              >
                #{tag}
              </button>
            ))}
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-[10px] text-[#ef4444] hover:underline px-1"
              >
                Reset Tag
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Guide list counter */}
      <div className="flex items-center justify-between text-xs font-mono text-[#64748b] px-1">
        <div>
          Menampilkan <span className="text-[#f1f5f9] font-bold">{filteredGuides.length}</span> Modul Doktrin
          {selectedTag && <span className="text-[#d97706] ml-1.5">dengan tag #{selectedTag}</span>}
        </div>
        <div>
          Total 24 Modul Strategi Teruji
        </div>
      </div>

      {/* Guide Cards Grid */}
      {filteredGuides.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#22303c] bg-[#10171f]/50 p-12 text-center">
          <BookOpen className="mx-auto h-10 w-10 text-[#475569] mb-3" />
          <p className="text-base font-medium text-[#94a3b8]">Tidak ada modul doktrin yang cocok dengan kriteria pencarian.</p>
          <p className="text-xs text-[#64748b] mt-1">Coba sesuaikan kata kunci, reset tag, atau ubah filter level dan kategori.</p>
          {(selectedTag || selectedCategory !== 'Semua' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSelectedTag(null);
                setSelectedCategory('Semua');
                setStatusFilter('all');
                if (onSelectLevel) onSelectLevel('all');
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-[#3b82f6]/50 bg-[#16253b] px-3.5 py-1.5 text-xs font-medium text-[#93c5fd] hover:bg-[#1e3452]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Semua Filter
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredGuides.map((guide, gIdx) => {
            const isFav = isFavorite(guide.id);
            const isExpanded = expandedSections[guide.id] ?? false;
            const isDone = !!completedGuides[guide.id];

            return (
              <div
                key={guide.id}
                id={guide.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden shadow-lg shadow-black/40 ${
                  isDone
                    ? 'border-[#1b4332] bg-[#0c161d]'
                    : 'border-[#223242] bg-[#111923] hover:border-[#2f455b]'
                }`}
              >
                {/* Header card banner */}
                <div
                  className={`p-5 md:p-6 border-b transition-colors ${
                    isDone
                      ? 'border-[#16382a] bg-gradient-to-r from-[#0d1f19] to-[#0c1816]'
                      : 'border-[#1b2835] bg-gradient-to-r from-[#141f2c] to-[#0f1721]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border shadow-inner ${
                        isDone
                          ? 'border-[#15803d]/60 bg-[#143324] text-[#4ade80]'
                          : 'border-[#2b3e52] bg-[#162331]'
                      }`}>
                        {isDone ? (
                          <CheckCircle2 className="h-6 w-6 text-[#22c55e]" />
                        ) : (
                          ICON_MAP[guide.iconName] || <BookOpen className="h-5 w-5 text-[#d97706]" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          {getLevelBadge(guide.level)}
                          <span className="rounded border border-[#1e293b] bg-[#0f172a] px-2 py-0.5 text-[11px] font-mono text-[#94a3b8]">
                            {guide.category}
                          </span>
                          {guide.readTimeMinutes && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#64748b]">
                              <Clock className="h-3 w-3" />
                              {guide.readTimeMinutes} mnt baca
                            </span>
                          )}
                          {isDone && (
                            <span className="rounded bg-[#14532d]/60 border border-[#22c55e]/40 px-2 py-0.5 text-[10px] font-mono text-[#86efac] font-bold flex items-center gap-1">
                              <Check className="h-3 w-3" /> DIKUASAI
                            </span>
                          )}
                        </div>

                        <h2 className="text-lg md:text-xl font-bold tracking-tight text-[#f8fafc] flex items-center gap-2">
                          <span>{guide.title}</span>
                        </h2>

                        <p className="text-xs md:text-sm text-[#94a3b8] mt-0.5">
                          {guide.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Toggle completion status button */}
                      <button
                        onClick={(e) => toggleComplete(guide.id, e)}
                        className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
                          isDone
                            ? 'border-[#22c55e]/60 bg-[#14532d] text-[#86efac] hover:bg-[#166534]'
                            : 'border-[#22303c] bg-[#131b24] text-[#94a3b8] hover:border-[#38bdf8]/50 hover:text-[#38bdf8]'
                        }`}
                        title={isDone ? 'Tandai belum selesai' : 'Tandai telah dikuasai'}
                      >
                        {isDone ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Selesai</span>
                          </>
                        ) : (
                          <>
                            <Circle className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Tandai Selesai</span>
                          </>
                        )}
                      </button>

                      {/* Copy summary */}
                      <button
                        onClick={(e) => copyTacticalSummary(guide, e)}
                        className={`rounded-lg border p-2 text-xs transition-colors ${
                          copiedId === guide.id
                            ? 'border-[#22c55e]/60 bg-[#14532d] text-[#86efac]'
                            : 'border-[#22303c] bg-[#131b24] text-[#64748b] hover:border-[#334759] hover:text-[#e2e8f0]'
                        }`}
                        title="Salin Kiat Taktis ke Clipboard"
                      >
                        {copiedId === guide.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>

                      {/* Favorite button */}
                      <button
                        onClick={() => toggleFavorite({
                          id: guide.id,
                          type: 'guide',
                          title: guide.title,
                          subtitle: guide.subtitle,
                          tag: guide.category
                        })}
                        className={`rounded-lg border p-2 text-xs transition-colors ${
                          isFav
                            ? 'border-[#eab308]/60 bg-[#2b2512] text-[#facc15]'
                            : 'border-[#22303c] bg-[#131b24] text-[#64748b] hover:border-[#334759] hover:text-[#e2e8f0]'
                        }`}
                        title={isFav ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
                      >
                        <Star className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>

                      {/* Accordion toggle button */}
                      <button
                        onClick={() => toggleExpand(guide.id)}
                        className="rounded-lg border border-[#22303c] bg-[#131b24] p-2 text-[#94a3b8] hover:border-[#334759] hover:text-[#f8fafc] transition-colors"
                        title={isExpanded ? 'Tutup Detail' : 'Buka Detail'}
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Overview box */}
                  <div className="mt-4 rounded-lg border border-[#1e2d3d] bg-[#0d151e] p-3.5 text-xs md:text-sm leading-relaxed text-[#cbd5e1]">
                    {guide.overview}
                  </div>

                  {/* Quick Cross-Nav Bar if related items exist */}
                  {(guide.relatedCommand || guide.relatedDivisionSearch) && (
                    <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-mono text-[11px] text-[#64748b]">Tautan Taktis Terkait:</span>
                      {guide.relatedCommand && (
                        <button
                          onClick={() => onNavigateTab && onNavigateTab('commands', guide.relatedCommand)}
                          className="inline-flex items-center gap-1 rounded bg-[#271d12] border border-[#d97706]/40 px-2 py-0.5 font-mono text-[11px] text-[#fde047] hover:bg-[#3d2c18] transition-colors"
                          title="Buka konsol cheat dengan perintah ini"
                        >
                          <TerminalIcon className="h-3 w-3 text-[#d97706]" />
                          <span>Kode: {guide.relatedCommand}</span>
                          <ArrowRight className="h-2.5 w-2.5 opacity-70" />
                        </button>
                      )}
                      {guide.relatedDivisionSearch && (
                        <button
                          onClick={() => onNavigateTab && onNavigateTab('division', guide.relatedDivisionSearch)}
                          className="inline-flex items-center gap-1 rounded bg-[#132338] border border-[#3b82f6]/40 px-2 py-0.5 font-mono text-[11px] text-[#93c5fd] hover:bg-[#1c3554] transition-colors"
                          title="Buka template divisi yang relevan"
                        >
                          <Shield className="h-3 w-3 text-[#38bdf8]" />
                          <span>Template: {guide.relatedDivisionSearch}</span>
                          <ArrowRight className="h-2.5 w-2.5 opacity-70" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Key Points Expandable Body */}
                {isExpanded && (
                  <div className="p-5 md:p-6 space-y-5 bg-[#0f1722]/60">
                    <div className="space-y-4">
                      {guide.keyPoints.map((point, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-[#1e2b38] bg-[#131d28] p-4 space-y-3 transition-all hover:border-[#27384a]"
                        >
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <h3 className="text-sm md:text-base font-semibold text-[#f1f5f9] flex items-center gap-2">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e2e40] text-[11px] font-mono text-[#38bdf8] font-bold">
                                {idx + 1}
                              </span>
                              {point.heading}
                            </h3>
                            {point.tags && (
                              <div className="flex gap-1.5 flex-wrap">
                                {point.tags.map(tag => (
                                  <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className="rounded bg-[#1a2634] px-1.5 py-0.5 text-[10px] font-mono text-[#94a3b8] hover:bg-[#25374a] hover:text-[#e2e8f0] transition-colors"
                                  >
                                    #{tag}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          <p className="text-xs md:text-sm leading-relaxed text-[#94a3b8]">
                            {point.description}
                          </p>

                          {/* Step-by-step visual execution timeline */}
                          {point.steps && point.steps.length > 0 && (
                            <div className="rounded-md border border-[#1e293b] bg-[#0c131c] p-3 space-y-2">
                              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#38bdf8] uppercase">
                                <ListOrdered className="h-3.5 w-3.5" />
                                Urutan Langkah Operasional:
                              </div>
                              <div className="space-y-1.5">
                                {point.steps.map((st, sIdx) => (
                                  <div key={sIdx} className="flex items-start gap-2.5 text-xs text-[#cbd5e1]">
                                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#1e2e40] text-[10px] font-mono text-[#93c5fd] font-semibold mt-0.5">
                                      {sIdx + 1}
                                    </span>
                                    <span>{st}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Tactical Pro-Tip Callout */}
                          {point.proTip && (
                            <div className="flex items-start gap-2.5 rounded-md border border-[#d97706]/40 bg-[#261e14]/80 p-3 text-xs text-[#fef3c7]">
                              <Lightbulb className="h-4 w-4 shrink-0 text-[#f59e0b] mt-0.5" />
                              <div className="leading-relaxed">
                                <strong className="font-semibold text-[#fbbf24]">Kiat Taktis Pro: </strong>
                                {point.proTip}
                              </div>
                            </div>
                          )}

                          {/* Warning Box */}
                          {point.warning && (
                            <div className="flex items-start gap-2.5 rounded-md border border-[#dc2626]/40 bg-[#2d1416]/80 p-3 text-xs text-[#fecaca]">
                              <AlertTriangle className="h-4 w-4 shrink-0 text-[#ef4444] mt-0.5" />
                              <div className="leading-relaxed">
                                <strong className="font-semibold text-[#f87171]">Peringatan Kritis: </strong>
                                {point.warning}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Summary Tips Checklist */}
                    {guide.summaryTips && guide.summaryTips.length > 0 && (
                      <div className="rounded-lg border border-[#1e3a2b] bg-[#0d2217]/50 p-4">
                        <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#4ade80] flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#22c55e]" />
                            Daftar Periksa Singkat Komandan
                          </h4>
                          <button
                            onClick={(e) => copyTacticalSummary(guide, e)}
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-[#86efac] hover:text-[#bbf7d0] hover:underline"
                          >
                            <Copy className="h-3 w-3" />
                            Salin Daftar Periksa
                          </button>
                        </div>
                        <ul className="space-y-1.5">
                          {guide.summaryTips.map((tip, tIdx) => (
                            <li key={tIdx} className="text-xs text-[#bbf7d0] flex items-start gap-2">
                              <span className="text-[#22c55e] font-bold">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Helper micro icon component for console terminal
function TerminalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}
