import React, { useState } from 'react';
import {
  Clock, Factory, Landmark, ShieldAlert, Cpu, Truck, Maximize2,
  Plane, Shield, BookOpen, Anchor, Eye, Crosshair, Compass, Flame,
  Star, ChevronDown, ChevronUp, AlertTriangle, Lightbulb, CheckCircle2,
  Filter
} from 'lucide-react';
import { GuideSection, GuideLevel } from '../types';

interface GuideViewerProps {
  guides: GuideSection[];
  guideLevel: GuideLevel;
  searchQuery: string;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: { id: string; type: 'guide'; title: string; subtitle: string; tag: string }) => void;
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
  Flame: <Flame className="h-5 w-5 text-[#e11d48]" />
};

export const GuideViewer: React.FC<GuideViewerProps> = ({
  guides,
  guideLevel,
  searchQuery,
  isFavorite,
  toggleFavorite
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'g-pemula-1': true,
    'g-pemula-2': true,
    'g-menengah-1': true,
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

  const toggleExpand = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredGuides = guides.filter(guide => {
    // Filter level
    if (guideLevel !== 'all' && guide.level !== guideLevel) {
      return false;
    }

    // Filter category
    if (selectedCategory !== 'Semua' && guide.category !== selectedCategory) {
      return false;
    }

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
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );

      return matchTitle || matchSubtitle || matchOverview || matchCategory || matchPoints;
    }

    return true;
  });

  const getLevelBadge = (level: 'pemula' | 'menengah' | 'ahli') => {
    switch (level) {
      case 'pemula':
        return (
          <span className="inline-flex items-center gap-1 rounded border border-[#15803d]/50 bg-[#14532d]/40 px-2 py-0.5 text-[11px] font-mono font-semibold text-[#86efac]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            REKRUT / PEMULA
          </span>
        );
      case 'menengah':
        return (
          <span className="inline-flex items-center gap-1 rounded border border-[#b45309]/50 bg-[#78350f]/40 px-2 py-0.5 text-[11px] font-mono font-semibold text-[#fde047]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#eab308]" />
            REGULER / MENENGAH
          </span>
        );
      case 'ahli':
        return (
          <span className="inline-flex items-center gap-1 rounded border border-[#b91c1c]/50 bg-[#7f1d1d]/40 px-2 py-0.5 text-[11px] font-mono font-semibold text-[#fca5a5]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
            VETERAN / AHLI
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Category selector row */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-thin">
        <div className="flex items-center gap-1.5 text-xs">
          <Filter className="h-3.5 w-3.5 text-[#64748b] ml-1 mr-1" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap rounded-md px-3 py-1.5 font-medium transition-all ${
                selectedCategory === cat
                  ? 'border border-[#d97706]/60 bg-[#251e15] text-[#fef3c7] shadow-sm'
                  : 'border border-[#1e2a36] bg-[#10171f] text-[#94a3b8] hover:border-[#334759] hover:text-[#e2e8f0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-xs font-mono text-[#64748b] whitespace-nowrap">
          Menampilkan <span className="text-[#f1f5f9] font-bold">{filteredGuides.length}</span> Modul Doktrin
        </div>
      </div>

      {/* Guide list */}
      {filteredGuides.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#22303c] bg-[#10171f]/50 p-12 text-center">
          <BookOpen className="mx-auto h-10 w-10 text-[#475569] mb-3" />
          <p className="text-base font-medium text-[#94a3b8]">Tidak ada panduan yang cocok dengan kriteria pencarian.</p>
          <p className="text-xs text-[#64748b] mt-1">Coba sesuaikan kata kunci atau ubah filter level dan kategori.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredGuides.map(guide => {
            const isFav = isFavorite(guide.id);
            const isExpanded = expandedSections[guide.id] ?? false;

            return (
              <div
                key={guide.id}
                id={guide.id}
                className="rounded-xl border border-[#223242] bg-[#111923] shadow-lg shadow-black/40 overflow-hidden transition-all hover:border-[#2f455b]"
              >
                {/* Header card */}
                <div className="p-5 md:p-6 border-b border-[#1b2835] bg-gradient-to-r from-[#141f2c] to-[#0f1721]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#2b3e52] bg-[#162331] shadow-inner">
                        {ICON_MAP[guide.iconName] || <BookOpen className="h-5 w-5 text-[#d97706]" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          {getLevelBadge(guide.level)}
                          <span className="rounded border border-[#1e293b] bg-[#0f172a] px-2 py-0.5 text-[11px] font-mono text-[#94a3b8]">
                            {guide.category}
                          </span>
                        </div>
                        <h2 className="text-lg md:text-xl font-bold tracking-tight text-[#f8fafc]">
                          {guide.title}
                        </h2>
                        <p className="text-xs md:text-sm text-[#94a3b8] mt-0.5">
                          {guide.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
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
                </div>

                {/* Key Points Body */}
                {isExpanded && (
                  <div className="p-5 md:p-6 space-y-5 bg-[#0f1722]/60">
                    <div className="space-y-4">
                      {guide.keyPoints.map((point, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-[#1e2b38] bg-[#131d28] p-4 space-y-2.5 transition-all hover:border-[#27384a]"
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
                                  <span
                                    key={tag}
                                    className="rounded bg-[#1a2634] px-1.5 py-0.5 text-[10px] font-mono text-[#94a3b8]"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <p className="text-xs md:text-sm leading-relaxed text-[#94a3b8]">
                            {point.description}
                          </p>

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
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#4ade80] mb-2.5 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#22c55e]" />
                          Daftar Periksa Singkat Komandan
                        </h4>
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
