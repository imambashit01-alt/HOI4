import React from 'react';
import { Search, BookOpen, Shield, Globe, Terminal, Star, Radio, Activity } from 'lucide-react';
import { MainTab, GuideLevel } from '../types';

interface HeaderProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  guideLevel: GuideLevel;
  setGuideLevel: (level: GuideLevel) => void;
  favoriteCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  guideLevel,
  setGuideLevel,
  favoriteCount,
}) => {
  return (
    <header className="border-b border-[#22303c] bg-gradient-to-b from-[#131b22] via-[#0f151b] to-[#0a0e13] px-4 py-5 md:px-8 text-[#d8e2ea] relative">
      {/* Top camouflage / tactical accent strip */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d97706] via-[#2563eb] to-[#dc2626] opacity-80" />

      <div className="mx-auto max-w-7xl">
        {/* Top bar with title and war room badge */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#374959] bg-[#1a2530] shadow-md shadow-black/60 text-[#f59e0b]">
              <Radio className="h-6 w-6 animate-pulse text-[#d97706]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-serif text-2xl md:text-3xl font-black tracking-tight text-[#f1f5f9] uppercase drop-shadow">
                  Hearts of Iron IV
                </h1>
                <span className="rounded border border-[#b45309]/50 bg-[#78350f]/30 px-2 py-0.5 text-[11px] font-mono tracking-wide text-[#fbbf24] font-semibold">
                  WAR ROOM PD II
                </span>
                <div className="hidden sm:flex items-center gap-1.5 rounded border border-[#1e293b] bg-[#0f172a] px-2 py-0.5 text-[11px] font-mono text-[#94a3b8]">
                  <Activity className="h-3 w-3 text-[#10b981]" />
                  <span>World Tension: 100%</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-[#94a3b8]">
                Panduan Taktis Komprehensif Pemula • Menengah • Ahli • Meta Divisi &amp; Kode Konsol Cheat
              </p>
            </div>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-84">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari panduan, cheat (pp, annex), template 21w..."
              className="w-full rounded-lg border border-[#2b3a4a] bg-[#121a22] py-2 pl-9 pr-8 text-sm text-[#f1f5f9] placeholder-[#64748b] outline-none transition-colors focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#94a3b8] hover:text-[#f8fafc] px-1"
                title="Hapus pencarian"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#1e2a36] pt-3.5">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('guides')}
              className={`flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-all ${
                activeTab === 'guides'
                  ? 'border border-[#d97706]/50 bg-[#241f18] text-[#fef3c7] shadow-sm'
                  : 'text-[#94a3b8] hover:bg-[#16202a] hover:text-[#e2e8f0]'
              }`}
            >
              <BookOpen className="h-4 w-4 text-[#d97706]" />
              <span>Doktrin &amp; Panduan</span>
            </button>

            <button
              onClick={() => setActiveTab('division')}
              className={`flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-all ${
                activeTab === 'division'
                  ? 'border border-[#3b82f6]/50 bg-[#16253b] text-[#dbeafe] shadow-sm'
                  : 'text-[#94a3b8] hover:bg-[#16202a] hover:text-[#e2e8f0]'
              }`}
            >
              <Shield className="h-4 w-4 text-[#3b82f6]" />
              <span>Meta Divisi &amp; Kalkulator</span>
            </button>

            <button
              onClick={() => setActiveTab('war_room')}
              className={`flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-all ${
                activeTab === 'war_room'
                  ? 'border border-[#10b981]/50 bg-[#122822] text-[#d1fae5] shadow-sm'
                  : 'text-[#94a3b8] hover:bg-[#16202a] hover:text-[#e2e8f0]'
              }`}
            >
              <Globe className="h-4 w-4 text-[#10b981]" />
              <span>War Room: Negara PD II</span>
            </button>

            <button
              onClick={() => setActiveTab('commands')}
              className={`flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-all ${
                activeTab === 'commands'
                  ? 'border border-[#f59e0b]/50 bg-[#282114] text-[#fef3c7] shadow-sm'
                  : 'text-[#94a3b8] hover:bg-[#16202a] hover:text-[#e2e8f0]'
              }`}
            >
              <Terminal className="h-4 w-4 text-[#f59e0b]" />
              <span>Konsol Perintah Cheat</span>
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-all ${
                activeTab === 'favorites'
                  ? 'border border-[#eab308]/50 bg-[#262312] text-[#fef9c3] shadow-sm'
                  : 'text-[#94a3b8] hover:bg-[#16202a] hover:text-[#e2e8f0]'
              }`}
            >
              <Star className="h-4 w-4 text-[#eab308]" />
              <span>Favorit</span>
              {favoriteCount > 0 && (
                <span className="rounded-full bg-[#facc15]/20 px-1.5 py-0.2 text-xs font-semibold text-[#fde047]">
                  {favoriteCount}
                </span>
              )}
            </button>
          </div>

          {/* Sub-level pills when on Guides tab */}
          {activeTab === 'guides' && (
            <div className="flex items-center gap-1 rounded-lg border border-[#22303c] bg-[#0d1319] p-1 text-xs">
              <span className="px-2 font-mono text-[#64748b]">Tingkat:</span>
              <button
                onClick={() => setGuideLevel('all')}
                className={`rounded px-2.5 py-1 font-medium transition-colors ${
                  guideLevel === 'all'
                    ? 'bg-[#1e293b] text-[#f8fafc]'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setGuideLevel('pemula')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 font-medium transition-colors ${
                  guideLevel === 'pemula'
                    ? 'bg-[#143324] text-[#86efac] border border-[#16a34a]/40'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]"></span>
                Pemula (Recruit)
              </button>
              <button
                onClick={() => setGuideLevel('menengah')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 font-medium transition-colors ${
                  guideLevel === 'menengah'
                    ? 'bg-[#3b2b13] text-[#fde047] border border-[#d97706]/40'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#eab308]"></span>
                Menengah (Regular)
              </button>
              <button
                onClick={() => setGuideLevel('ahli')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 font-medium transition-colors ${
                  guideLevel === 'ahli'
                    ? 'bg-[#3d1616] text-[#fca5a5] border border-[#dc2626]/40'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]"></span>
                Ahli (Veteran)
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
