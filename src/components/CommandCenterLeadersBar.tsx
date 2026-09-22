import React, { useState, useEffect } from 'react';
import {
  Award, Shield, Globe, Star, Sparkles, RefreshCw, ChevronDown, ChevronUp,
  Info, ExternalLink, Filter, Users, UserCheck, Flame, BookOpen, Layers
} from 'lucide-react';
import {
  hoi4LeaderService,
  MajorLeaderResolvedItem,
  HOI4_MAJOR_LEADERS
} from '../services/hoi4LeaderService';
import { HOI4LeaderPortrait } from './HOI4LeaderPortrait';
import { HOI4LeaderDossierModal } from './HOI4LeaderDossierModal';

interface CommandCenterLeadersBarProps {
  onSelectCountry?: (countryId: string) => void;
  onNavigateToFocus?: (countryId: string) => void;
  className?: string;
}

export const CommandCenterLeadersBar: React.FC<CommandCenterLeadersBarProps> = ({
  onSelectCountry,
  onNavigateToFocus,
  className = ''
}) => {
  const [leaders, setLeaders] = useState<MajorLeaderResolvedItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeIdeologyFilter, setActiveIdeologyFilter] = useState<'all' | 'fascism' | 'democratic' | 'communism'>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [selectedModalTag, setSelectedModalTag] = useState<string | null>(null);
  const [alternateIndices, setAlternateIndices] = useState<Record<string, number | undefined>>({});

  // Fetch official leaders dynamically
  const loadOfficialLeaders = async () => {
    setIsLoading(true);
    try {
      const data = await hoi4LeaderService.fetchOfficialMajorLeaders();
      setLeaders(data);
    } catch (e) {
      console.error('Failed to load official HOI4 major leaders:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOfficialLeaders();
  }, []);

  const handleCycleAlternate = (tag: string, maxAlternates: number) => {
    setAlternateIndices((prev) => {
      const current = prev[tag];
      if (current === undefined) {
        return { ...prev, [tag]: 0 };
      } else if (current + 1 < maxAlternates) {
        return { ...prev, [tag]: current + 1 };
      } else {
        // Wrap back to default
        const next = { ...prev };
        delete next[tag];
        return next;
      }
    });
  };

  const filteredLeaders = leaders.filter((l) => {
    if (activeIdeologyFilter === 'all') return true;
    if (activeIdeologyFilter === 'fascism') return l.ideology === 'Fascism';
    if (activeIdeologyFilter === 'democratic') return l.ideology === 'Democratic';
    if (activeIdeologyFilter === 'communism') return l.ideology === 'Communism';
    return true;
  });

  return (
    <div
      className={`relative rounded-xl border-2 border-[#b8860b]/60 bg-gradient-to-b from-[#141b16] via-[#101712] to-[#0c120e] text-[#f1f5f9] shadow-2xl overflow-hidden ${className}`}
      style={{
        boxShadow: '0 8px 30px rgba(0,0,0,0.7), inset 0 1px 0 rgba(245,158,11,0.2)'
      }}
    >
      {/* Top Camouflage Tactical Trim */}
      <div className="h-1 w-full bg-gradient-to-r from-[#d97706] via-[#b8860b] to-[#dc2626]" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-[#2b3a30] bg-[#0c140f]/90">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-sm sm:text-base font-bold uppercase tracking-wide text-[#fef3c7] flex items-center gap-2">
                Markas Komando Tertinggi: 7 Pemimpin Negara Utama PD II
              </h2>
              <span className="rounded bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-300">
                OFFICIAL PORTRAITS
              </span>
            </div>
            <p className="text-xs text-[#94a3b8]">
              Potret resmi Paradox &amp; arsip sejarah beresolusi tinggi untuk Jerman, Soviet, Amerika, Inggris, Jepang, Italia, dan Prancis.
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Refresh Button */}
          <button
            onClick={loadOfficialLeaders}
            disabled={isLoading}
            title="Sinkronkan ulang potret resmi HOI4"
            className="flex items-center gap-1.5 rounded border border-[#2b3a30] bg-[#142017] px-2.5 py-1 text-xs font-mono text-amber-300 hover:border-amber-400 hover:text-amber-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sinkronkan</span>
          </button>

          {/* Collapse/Expand Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 rounded border border-[#2b3a30] bg-[#142017] px-2.5 py-1 text-xs font-mono text-[#cbd5e1] hover:text-white transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-3.5 w-3.5" />
                <span>Tutup</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5" />
                <span>Buka Panel ({leaders.length})</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Expanded Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Filter Sub-bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-[#223026] pb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[#64748b] font-mono flex items-center gap-1 mr-1">
                <Filter className="h-3.5 w-3.5" />
                Filter Blok Ideologi:
              </span>
              <button
                onClick={() => setActiveIdeologyFilter('all')}
                className={`rounded px-2.5 py-1 font-medium transition-colors ${
                  activeIdeologyFilter === 'all'
                    ? 'bg-[#3b2b13] text-[#fef08a] border border-[#d97706]'
                    : 'bg-[#121c15] text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                Semua (7)
              </button>
              <button
                onClick={() => setActiveIdeologyFilter('democratic')}
                className={`rounded px-2.5 py-1 font-medium transition-colors flex items-center gap-1 ${
                  activeIdeologyFilter === 'democratic'
                    ? 'bg-blue-950 text-blue-200 border border-blue-500'
                    : 'bg-[#121c15] text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                <span>Sekutu / Demokrasi</span>
                <span className="font-mono text-[10px] text-blue-400 font-bold">(3)</span>
              </button>
              <button
                onClick={() => setActiveIdeologyFilter('fascism')}
                className={`rounded px-2.5 py-1 font-medium transition-colors flex items-center gap-1 ${
                  activeIdeologyFilter === 'fascism'
                    ? 'bg-red-950 text-red-200 border border-red-500'
                    : 'bg-[#121c15] text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                <span>Poros / Fasisme</span>
                <span className="font-mono text-[10px] text-red-400 font-bold">(3)</span>
              </button>
              <button
                onClick={() => setActiveIdeologyFilter('communism')}
                className={`rounded px-2.5 py-1 font-medium transition-colors flex items-center gap-1 ${
                  activeIdeologyFilter === 'communism'
                    ? 'bg-rose-950 text-rose-200 border border-rose-500'
                    : 'bg-[#121c15] text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                <span>Komintern</span>
                <span className="font-mono text-[10px] text-rose-400 font-bold">(1)</span>
              </button>
            </div>

            <div className="text-[11px] text-[#64748b] font-mono">
              Klik potret perwira untuk membuka Dossier Strategis &amp; Pohon Fokus
            </div>
          </div>

          {/* Leaders Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3.5">
            {filteredLeaders.map((leader) => {
              const currentAltIndex = alternateIndices[leader.tag];
              const fullData = HOI4_MAJOR_LEADERS[leader.tag];
              const maxAlternates = fullData?.alternateLeaders?.length || 0;
              const hasAlternate = maxAlternates > 0;

              // Resolved name and traits based on alternate state
              const altLeader = currentAltIndex !== undefined && fullData?.alternateLeaders?.[currentAltIndex];
              const activeLeaderName = altLeader ? altLeader.name : leader.leaderName;
              const activeTitle = altLeader ? altLeader.title : leader.title;
              const activeTraits = altLeader ? altLeader.traits : leader.traits;
              const activeTenure = altLeader ? altLeader.yearRange : leader.tenureYears;

              return (
                <div
                  key={leader.tag}
                  className="group relative rounded-lg border border-[#2b3a30] bg-gradient-to-b from-[#131d17] via-[#0f1712] to-[#0a100c] p-2.5 flex flex-col justify-between hover:border-amber-400/80 hover:shadow-xl hover:shadow-amber-950/40 transition-all duration-200"
                >
                  {/* Top Flag & Tag Bar */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{leader.countryFlagEmoji}</span>
                      <span className="font-mono text-xs font-bold tracking-wider text-amber-300">
                        {leader.tag}
                      </span>
                    </div>

                    {/* Faction / Ideology Tag */}
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                        leader.ideology === 'Fascism'
                          ? 'bg-red-950/80 border-red-600/50 text-red-200'
                          : leader.ideology === 'Democratic'
                          ? 'bg-blue-950/80 border-blue-600/50 text-blue-200'
                          : 'bg-rose-950/80 border-rose-600/50 text-rose-200'
                      }`}
                    >
                      {leader.ideology === 'Fascism'
                        ? 'Fasis'
                        : leader.ideology === 'Democratic'
                        ? 'Demokrasi'
                        : 'Komunis'}
                    </span>
                  </div>

                  {/* Centered Leader Portrait */}
                  <div className="flex justify-center my-1">
                    <HOI4LeaderPortrait
                      tag={leader.tag}
                      size="sm"
                      alternateIndex={currentAltIndex}
                      showNameplate={false}
                      showTraitsOnHover={false}
                      interactive={true}
                      onClick={() => setSelectedModalTag(leader.tag)}
                      className="transition-transform group-hover:scale-105"
                    />
                  </div>

                  {/* Leader Info */}
                  <div className="text-center mt-2 space-y-0.5">
                    <h3 className="font-serif text-xs font-bold text-[#fef3c7] truncate leading-tight">
                      {activeLeaderName}
                    </h3>
                    <p className="text-[10px] text-[#94a3b8] truncate font-sans">
                      {activeTitle}
                    </p>
                    <p className="text-[9px] font-mono text-[#64748b]">
                      {activeTenure}
                    </p>
                  </div>

                  {/* Traits Pill Preview */}
                  <div className="mt-2 space-y-1">
                    {activeTraits.slice(0, 1).map((t) => (
                      <div
                        key={t.id}
                        className="rounded bg-[#17241c] border border-[#2b3a30] px-1.5 py-0.5 text-[9px] font-mono text-amber-300/90 truncate text-center"
                        title={`${t.name}: ${t.description}`}
                      >
                        ★ {t.name}
                      </div>
                    ))}
                  </div>

                  {/* Quick Action Footer */}
                  <div className="mt-3 pt-2 border-t border-[#1f2b23] flex flex-col gap-1">
                    <button
                      onClick={() => setSelectedModalTag(leader.tag)}
                      className="w-full flex items-center justify-center gap-1 rounded bg-[#1e2d22] hover:bg-[#2c4032] border border-[#34483a] text-amber-300 py-1 text-[10px] font-mono font-semibold transition-colors"
                    >
                      <ExternalLink className="h-2.5 w-2.5" />
                      <span>Dossier Lengkap</span>
                    </button>

                    {/* Cycle Alternate Leader Button */}
                    {hasAlternate && (
                      <button
                        onClick={() => handleCycleAlternate(leader.tag, maxAlternates)}
                        className="w-full flex items-center justify-center gap-1 rounded bg-[#152019] hover:bg-[#1f3025] border border-[#26382c] text-[#cbd5e1] py-0.5 text-[9px] font-mono transition-colors"
                        title="Ganti figur pemimpin alternatif (sejarah/jalur fokus)"
                      >
                        <RefreshCw className="h-2.5 w-2.5 text-amber-400" />
                        <span>
                          {currentAltIndex === undefined
                            ? `Alt (${maxAlternates})`
                            : `Alt #${currentAltIndex + 1}`}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Leader Dossier Modal */}
      {selectedModalTag && (
        <HOI4LeaderDossierModal
          isOpen={true}
          initialTag={selectedModalTag}
          onClose={() => setSelectedModalTag(null)}
          onSelectNation={(tag) => {
            if (onSelectCountry) {
              onSelectCountry(tag.toLowerCase());
            }
          }}
        />
      )}
    </div>
  );
};
