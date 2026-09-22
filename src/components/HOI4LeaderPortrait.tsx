import React, { useState, useEffect } from 'react';
import { Shield, Award, Sparkles, User, AlertCircle, Info } from 'lucide-react';
import { hoi4LeaderService, HOI4LeaderData, HOI4_MAJOR_LEADERS } from '../services/hoi4LeaderService';

export interface HOI4LeaderPortraitProps {
  tag: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  alternateIndex?: number;
  showNameplate?: boolean;
  showTraitsOnHover?: boolean;
  showIdeologyBadge?: boolean;
  showStatusLamp?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const HOI4LeaderPortrait: React.FC<HOI4LeaderPortraitProps> = ({
  tag,
  size = 'md',
  alternateIndex,
  showNameplate = true,
  showTraitsOnHover = true,
  showIdeologyBadge = true,
  showStatusLamp = true,
  interactive = true,
  onClick,
  className = ''
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const cleanTag = tag ? tag.toUpperCase() : 'GER';
  const leaderData: HOI4LeaderData | undefined = HOI4_MAJOR_LEADERS[cleanTag];

  // Active leader info (either default or alternate)
  const currentLeaderName = (alternateIndex !== undefined && leaderData?.alternateLeaders && leaderData.alternateLeaders[alternateIndex])
    ? leaderData.alternateLeaders[alternateIndex].name
    : leaderData?.leaderName || cleanTag;

  const currentTitle = (alternateIndex !== undefined && leaderData?.alternateLeaders && leaderData.alternateLeaders[alternateIndex])
    ? leaderData.alternateLeaders[alternateIndex].title
    : leaderData?.title || 'Pemimpin Nasional';

  const currentTraits = (alternateIndex !== undefined && leaderData?.alternateLeaders && leaderData.alternateLeaders[alternateIndex])
    ? leaderData.alternateLeaders[alternateIndex].traits
    : leaderData?.traits || [];

  const currentIdeology = (alternateIndex !== undefined && leaderData?.alternateLeaders && leaderData.alternateLeaders[alternateIndex])
    ? leaderData.alternateLeaders[alternateIndex].ideology
    : leaderData?.ideology || 'Neutral';

  // Dimension presets (aspect ratio approx 3:4 or standard HOI4 portrait 156x210)
  const sizeStyles = {
    xs: {
      wrapper: 'w-10 h-14',
      nameplate: 'text-[8px] py-0.5 px-1',
      badge: 'w-3 h-3 text-[7px]',
      lamp: 'w-1.5 h-1.5',
      traitsText: 'text-[9px]'
    },
    sm: {
      wrapper: 'w-16 h-22',
      nameplate: 'text-[9px] py-0.5 px-1.5 font-bold',
      badge: 'w-4 h-4 text-[8px]',
      lamp: 'w-2 h-2',
      traitsText: 'text-[10px]'
    },
    md: {
      wrapper: 'w-24 h-32',
      nameplate: 'text-[10px] py-1 px-1.5 font-bold tracking-tight',
      badge: 'w-5 h-5 text-[9px]',
      lamp: 'w-2 h-2',
      traitsText: 'text-xs'
    },
    lg: {
      wrapper: 'w-32 h-44',
      nameplate: 'text-xs py-1.5 px-2 font-bold tracking-wide',
      badge: 'w-6 h-6 text-xs',
      lamp: 'w-2.5 h-2.5',
      traitsText: 'text-xs'
    },
    xl: {
      wrapper: 'w-44 h-60',
      nameplate: 'text-sm py-2 px-3 font-serif font-black tracking-wider',
      badge: 'w-7 h-7 text-xs',
      lamp: 'w-3 h-3',
      traitsText: 'text-sm'
    }
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;

  // Ideology Colors & Badges
  const getIdeologyColor = (ideology: string) => {
    switch (ideology.toLowerCase()) {
      case 'fascism':
        return { bg: 'bg-red-800', border: 'border-red-500', text: 'text-red-200', symbol: '✠' };
      case 'democratic':
        return { bg: 'bg-blue-800', border: 'border-blue-500', text: 'text-blue-200', symbol: '⚖' };
      case 'communism':
        return { bg: 'bg-rose-900', border: 'border-rose-500', text: 'text-rose-200', symbol: '☭' };
      default:
        return { bg: 'bg-slate-700', border: 'border-slate-500', text: 'text-slate-200', symbol: '⚔' };
    }
  };

  const ideoStyle = getIdeologyColor(currentIdeology);

  // Dynamic portrait resolution
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setHasError(false);

    hoi4LeaderService
      .resolvePortrait(cleanTag, alternateIndex)
      .then((resolvedUrl) => {
        if (isMounted) {
          if (resolvedUrl) {
            setImageUrl(resolvedUrl);
          } else {
            setHasError(true);
          }
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [cleanTag, alternateIndex]);

  return (
    <div
      className={`relative inline-block select-none group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer HOI4 Vintage Brass Beveled Frame */}
      <div
        onClick={interactive && onClick ? onClick : undefined}
        className={`relative ${currentSize.wrapper} rounded-sm overflow-hidden border-2 border-[#b45309] bg-gradient-to-b from-[#2a1d12] via-[#1a1209] to-[#0f0904] shadow-md transition-all duration-200 ${
          interactive
            ? 'cursor-pointer hover:border-[#fbbf24] hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5 active:translate-y-0'
            : ''
        }`}
        style={{
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.8), 0 4px 10px rgba(0,0,0,0.6)'
        }}
      >
        {/* Top-Corner Metallic Rivets/Pins */}
        <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-[#fbbf24] border border-[#78350f] z-20 opacity-80" />
        <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-[#fbbf24] border border-[#78350f] z-20 opacity-80" />
        <div className="absolute bottom-0.5 left-0.5 w-1 h-1 rounded-full bg-[#fbbf24] border border-[#78350f] z-20 opacity-80" />
        <div className="absolute bottom-0.5 right-0.5 w-1 h-1 rounded-full bg-[#fbbf24] border border-[#78350f] z-20 opacity-80" />

        {/* Status Lamp (War Room Readiness) */}
        {showStatusLamp && (
          <div
            className={`absolute top-1 right-1 ${currentSize.lamp} rounded-full z-20 shadow-sm border border-black/50 ${
              leaderData?.ideology === 'Fascism'
                ? 'bg-red-500 shadow-red-500/50'
                : leaderData?.ideology === 'Democratic'
                ? 'bg-blue-400 shadow-blue-400/50'
                : 'bg-emerald-400 shadow-emerald-400/50'
            } animate-pulse`}
            title="Status Komando: Aktif Memimpin"
          />
        )}

        {/* Ideology Stamp at Top-Left */}
        {showIdeologyBadge && (
          <div
            className={`absolute top-1 left-1 ${currentSize.badge} rounded-full z-20 flex items-center justify-center font-serif font-black ${ideoStyle.bg} ${ideoStyle.border} ${ideoStyle.text} border shadow-md`}
            title={`Ideologi: ${currentIdeology} (${leaderData?.subIdeology || ''})`}
          >
            {ideoStyle.symbol}
          </div>
        )}

        {/* Portrait Canvas / Image */}
        <div className="relative w-full h-full bg-[#120a06] flex items-center justify-center overflow-hidden">
          {/* Subtle Vintage Canvas Texture Grid */}
          <div
            className="absolute inset-0 z-10 pointer-events-none opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0, rgba(0,0,0,0.8) 100%)'
            }}
          />

          {/* Radar scan / loading placeholder */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#18110a] z-10">
              <div className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-400 rounded-full animate-spin mb-1" />
              <span className="text-[8px] font-mono text-amber-300 tracking-wider uppercase">Loading...</span>
            </div>
          )}

          {/* Actual Portrait Image */}
          {!hasError && imageUrl ? (
            <img
              src={imageUrl}
              alt={currentLeaderName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105 filter contrast-105 brightness-95"
              onError={() => setHasError(true)}
            />
          ) : (
            /* Historical Authentic Graphic Fallback if offline */
            <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-gradient-to-b from-[#291b10] to-[#120a05]">
              <div className="w-10 h-10 rounded-full border border-amber-500/40 bg-amber-950/40 flex items-center justify-center mb-1 text-amber-300 font-serif font-bold text-base">
                {leaderData?.countryFlagEmoji || cleanTag}
              </div>
              <span className="text-[10px] font-serif font-bold text-amber-200 line-clamp-1 leading-tight">
                {currentLeaderName}
              </span>
              <span className="text-[8px] font-mono text-amber-400/80 uppercase">
                [{cleanTag}]
              </span>
            </div>
          )}

          {/* Authentic Vignette / Inner Glow */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-transparent to-black/35 z-10" />

          {/* Nameplate Engraved Plaque at Bottom */}
          {showNameplate && (
            <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-[#140b06] via-[#1e1109] to-transparent pt-3 pb-1 px-1 text-center">
              <div className="bg-[#24170d]/90 border-t border-[#b45309]/60 px-1 py-0.5 rounded-xs shadow-inner">
                <p className={`font-serif ${currentSize.nameplate} font-bold text-[#fef3c7] truncate leading-tight drop-shadow`}>
                  {currentLeaderName}
                </p>
                {size !== 'xs' && (
                  <p className="text-[7px] font-mono text-amber-400/90 truncate tracking-tight uppercase">
                    {leaderData?.countryName?.split('(')[0] || cleanTag}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Tooltip Card on Hover (HOI4 Traits & Modifiers) */}
      {showTraitsOnHover && isHovered && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-lg border border-amber-500/60 bg-[#0f1422] text-[#f1f5f9] shadow-2xl backdrop-blur-md pointer-events-none animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#273256] pb-2 mb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base">{leaderData?.countryFlagEmoji || '🎖️'}</span>
                <span className="font-serif font-bold text-amber-200 text-xs">{currentLeaderName}</span>
              </div>
              <span className="text-[10px] font-mono text-[#94a3b8] block">{currentTitle}</span>
            </div>
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${ideoStyle.bg} ${ideoStyle.border} ${ideoStyle.text}`}>
              {currentIdeology}
            </span>
          </div>

          {/* Traits Section */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Award className="h-3 w-3" /> Sifat Pemimpin (HOI4 Traits):
            </span>
            {currentTraits.map((t) => (
              <div key={t.id} className="p-1.5 rounded bg-black/40 border border-white/10 text-[10px] space-y-0.5">
                <div className="font-semibold text-amber-100 flex items-center justify-between">
                  <span>{t.name}</span>
                  <span className="text-[8px] font-mono text-slate-400 uppercase">({t.type})</span>
                </div>
                <p className="text-[9px] text-[#cbd5e1] leading-tight">{t.description}</p>
                <div className="pt-0.5 space-y-0.5">
                  {t.modifiers.map((m, idx) => (
                    <div key={idx} className="flex justify-between text-[9px] font-mono">
                      <span className="text-[#94a3b8]">{m.label}:</span>
                      <strong className={m.positive ? 'text-emerald-400' : 'text-red-400'}>
                        {m.value}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Bonus Overview */}
          {leaderData && (
            <div className="mt-2 pt-1.5 border-t border-white/10 grid grid-cols-3 gap-1 text-[9px] font-mono text-center">
              <div className="p-1 bg-white/5 rounded">
                <span className="text-[#94a3b8] block text-[8px]">PP Gain:</span>
                <span className="text-amber-300 font-bold">{leaderData.politicalPowerGain}</span>
              </div>
              <div className="p-1 bg-white/5 rounded">
                <span className="text-[#94a3b8] block text-[8px]">Stability:</span>
                <span className="text-emerald-300 font-bold">{leaderData.stabilityBonus}</span>
              </div>
              <div className="p-1 bg-white/5 rounded">
                <span className="text-[#94a3b8] block text-[8px]">War Support:</span>
                <span className="text-red-300 font-bold">{leaderData.warSupportBonus}</span>
              </div>
            </div>
          )}

          {interactive && (
            <p className="text-[8px] font-mono text-amber-300/80 text-center mt-2 italic">
              Klik untuk membuka Dokumen Lengkap Pemimpin
            </p>
          )}
        </div>
      )}
    </div>
  );
};
