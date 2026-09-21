import React from 'react';
import {
  Search, BookOpen, Shield, Globe, Terminal, Star, Radio,
  Activity, GitBranch, Cpu, Swords, Compass, Sparkles
} from 'lucide-react';
import { MainTab, GuideLevel } from '../types';

interface HeaderProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  guideLevel: GuideLevel;
  setGuideLevel: (level: GuideLevel) => void;
  favoriteCount: number;
  vintageTheme?: boolean;
  setVintageTheme?: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  guideLevel,
  setGuideLevel,
  favoriteCount,
  vintageTheme = true,
  setVintageTheme
}) => {
  return (
    <header className={`border-b px-4 py-5 md:px-8 relative transition-colors ${
      vintageTheme
        ? 'border-[#b8860b]/40 bg-gradient-to-b from-[#141b16] via-[#101612] to-[#0c120e] text-[#f1f5f9]'
        : 'border-[#22303c] bg-gradient-to-b from-[#131b22] via-[#0f151b] to-[#0a0e13] text-[#d8e2ea]'
    }`}>
      {/* Top camouflage / tactical accent strip */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d97706] via-[#b8860b] to-[#dc2626] opacity-90" />

      <div className="mx-auto max-w-7xl">
        {/* Top bar with title and war room badge */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative group shrink-0">
              <img
                src="https://thumb.wikimedia.org/wikipedia/en/thumb/b/b3/Hearts_of_Iron_IV_packshot.jpg/250px-Hearts_of_Iron_IV_packshot.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"
                alt="Hearts of Iron IV"
                referrerPolicy="no-referrer"
                className="h-14 w-11 md:h-16 md:w-12 rounded-md object-cover border-2 border-[#b8860b]/70 shadow-lg shadow-black/80 ring-1 ring-[#b45309]/30 transition-transform group-hover:scale-105"
              />
              <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#10b981] ring-2 ring-[#0f151b]" title="Server Online">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-serif text-2xl md:text-3xl font-black tracking-tight text-[#fef3c7] uppercase drop-shadow flex items-center gap-2">
                  Hearts of Iron IV
                </h1>
                <span className="rounded border border-[#b8860b]/60 bg-[#78350f]/30 px-2.5 py-0.5 text-[11px] font-mono tracking-wide text-[#fde047] font-bold">
                  ★ WAR ROOM PD II KLASIK ★
                </span>
                <div className="hidden sm:flex items-center gap-1.5 rounded border border-[#2b3a32] bg-[#0e1611] px-2 py-0.5 text-[11px] font-mono text-[#cbd5e1]">
                  <Activity className="h-3 w-3 text-[#10b981]" />
                  <span>World Tension: 100%</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-[#cbd5e1]">
                Panduan Taktis Komprehensif • Pohon Riset Teknologi • Battle Planner &amp; Kalkulator Perang • Doktrin 100+ • Tema Vintage Klasik
              </p>
            </div>
          </div>

          {/* Quick Search & Theme Switch */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari panduan, riset tank, battle plan, cheat..."
                className="w-full rounded-lg border border-[#2b3a32] bg-[#121a15] py-2 pl-9 pr-8 text-sm text-[#f1f5f9] placeholder-[#64748b] outline-none transition-colors focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b]"
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

            {/* Vintage Old Classic Theme Toggle */}
            {setVintageTheme && (
              <button
                onClick={() => setVintageTheme(v => !v)}
                title="Ganti antara tema Klasik PD II dan tema Gelap Modern"
                className={`shrink-0 flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-mono transition-all ${
                  vintageTheme
                    ? 'border-[#b8860b] bg-[#362713] text-[#fef08a] font-bold shadow'
                    : 'border-[#2d3a33] bg-[#141d18] text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                <Compass className="h-4 w-4 text-[#f59e0b]" />
                <span className="hidden sm:inline">{vintageTheme ? 'Tema: Old Classic' : 'Tema: Modern'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2.5 border-t border-[#223028] pt-3.5">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {/* 1. Guides */}
            <button
              onClick={() => setActiveTab('guides')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'guides'
                  ? 'border border-[#b8860b] bg-[#342713] text-[#fef08a] shadow-sm font-bold'
                  : 'text-[#94a3b8] hover:bg-[#16211a] hover:text-[#e2e8f0]'
              }`}
            >
              <BookOpen className="h-4 w-4 text-[#f59e0b]" />
              <span>Doktrin &amp; Panduan</span>
            </button>

            {/* 2. Battle Planner & War Calculator */}
            <button
              onClick={() => setActiveTab('battle_planner')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'battle_planner'
                  ? 'border border-[#dc2626] bg-[#381414] text-[#fca5a5] shadow-sm font-bold'
                  : 'text-[#94a3b8] hover:bg-[#16211a] hover:text-[#e2e8f0]'
              }`}
            >
              <Swords className="h-4 w-4 text-[#ef4444]" />
              <span>Battle Planner &amp; Perang</span>
              <span className="rounded bg-[#ef4444]/20 border border-[#ef4444]/40 px-1 py-0.2 text-[9px] font-mono font-bold text-[#fca5a5]">
                BARU
              </span>
            </button>

            {/* 3. Tech Tree Viewer */}
            <button
              onClick={() => setActiveTab('tech_tree')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'tech_tree'
                  ? 'border border-[#3b82f6] bg-[#142337] text-[#93c5fd] shadow-sm font-bold'
                  : 'text-[#94a3b8] hover:bg-[#16211a] hover:text-[#e2e8f0]'
              }`}
            >
              <Cpu className="h-4 w-4 text-[#60a5fa]" />
              <span>Pohon Riset Teknologi</span>
              <span className="rounded bg-[#3b82f6]/20 border border-[#3b82f6]/40 px-1 py-0.2 text-[9px] font-mono font-bold text-[#93c5fd]">
                BARU
              </span>
            </button>

            {/* 4. Division & Production Calculator */}
            <button
              onClick={() => setActiveTab('division')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'division'
                  ? 'border border-[#10b981] bg-[#122820] text-[#6ee7b7] shadow-sm font-bold'
                  : 'text-[#94a3b8] hover:bg-[#16211a] hover:text-[#e2e8f0]'
              }`}
            >
              <Shield className="h-4 w-4 text-[#34d399]" />
              <span>Kalkulator Divisi</span>
            </button>

            {/* 5. Focus Tree */}
            <button
              onClick={() => setActiveTab('focus_tree')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'focus_tree'
                  ? 'border border-[#b8860b] bg-[#2b2112] text-[#fef3c7] shadow-sm font-bold'
                  : 'text-[#94a3b8] hover:bg-[#16211a] hover:text-[#e2e8f0]'
              }`}
            >
              <GitBranch className="h-4 w-4 text-[#f59e0b]" />
              <span>Fokus Nasional</span>
            </button>

            {/* 6. War Room Nations */}
            <button
              onClick={() => setActiveTab('war_room')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'war_room'
                  ? 'border border-[#10b981]/50 bg-[#122822] text-[#d1fae5] shadow-sm font-bold'
                  : 'text-[#94a3b8] hover:bg-[#16211a] hover:text-[#e2e8f0]'
              }`}
            >
              <Globe className="h-4 w-4 text-[#10b981]" />
              <span>Negara PD II</span>
            </button>

            {/* 7. Console Commands */}
            <button
              onClick={() => setActiveTab('commands')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'commands'
                  ? 'border border-[#f59e0b]/50 bg-[#282114] text-[#fef3c7] shadow-sm font-bold'
                  : 'text-[#94a3b8] hover:bg-[#16211a] hover:text-[#e2e8f0]'
              }`}
            >
              <Terminal className="h-4 w-4 text-[#f59e0b]" />
              <span>Cheat Konsol</span>
            </button>

            {/* 8. Favorites & Backup */}
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'favorites'
                  ? 'border border-[#eab308]/50 bg-[#262312] text-[#fef9c3] shadow-sm font-bold'
                  : 'text-[#94a3b8] hover:bg-[#16211a] hover:text-[#e2e8f0]'
              }`}
            >
              <Star className="h-4 w-4 text-[#eab308]" />
              <span>Favorit &amp; Backup</span>
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
