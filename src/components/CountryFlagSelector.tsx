import React, { useState, useMemo } from 'react';
import {
  Globe, Search, Star, Shield, Filter, Check,
  ChevronDown, ChevronUp, Sparkles, Building, Factory
} from 'lucide-react';
import { MAJOR_COUNTRIES_FOCUS } from '../data/focusData';
import { MAJOR_NATIONS_STARTING_STATS } from '../data/countryStartingStats';

export interface CountryFlagSelectorProps {
  selectedCountryId: string;
  onSelectCountry: (countryId: string) => void;
  className?: string;
}

// Visual SVG Country Flag Renderer
export const CountryFlag: React.FC<{
  countryId: string;
  className?: string;
  showBorder?: boolean;
}> = ({ countryId, className = 'w-10 h-7', showBorder = true }) => {
  const borderClass = showBorder ? 'border border-black/30 shadow-sm rounded-sm overflow-hidden' : 'overflow-hidden';

  switch (countryId) {
    // 1. GERMANY (Reich 1936-1945)
    case 'ger':
      return (
        <div className={`relative ${className} ${borderClass} bg-[#b91c1c] shrink-0`}>
          {/* Historical WW2 Red field with white circle & Iron Cross symbol */}
          <div className="absolute inset-0 bg-[#c51c1c]" />
          <div className="absolute left-[38%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[52%] aspect-square rounded-full bg-white shadow-sm flex items-center justify-center">
            {/* Balkenkreuz / Iron Cross Graphic */}
            <svg viewBox="0 0 24 24" className="w-[72%] h-[72%] text-[#111827]" fill="currentColor">
              <path d="M9 2h6v5h5v6h-5v9H9v-9H4V7h5V2z" />
              <path d="M10 4h4v5h5v2h-5v9h-4v-9H5V9h5V4z" fill="#ffffff" />
              <circle cx="12" cy="10" r="1.5" fill="#111827" />
            </svg>
          </div>
        </div>
      );

    // 2. SOVIET UNION (USSR 1936-1945)
    case 'sov':
      return (
        <div className={`relative ${className} ${borderClass} bg-[#b91c1c] shrink-0`}>
          <div className="absolute inset-0 bg-[#b91c1c]" />
          {/* Hammer & Sickle with Red Star in Canton */}
          <div className="absolute top-[12%] left-[12%] flex flex-col items-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#fbbf24]" fill="currentColor">
              {/* Star */}
              <polygon points="12,1 14.5,7 21,7.5 16,11.5 18,18 12,14 6,18 8,11.5 3,7.5 9.5,7" transform="scale(0.35) translate(8, 2)" />
              {/* Hammer and Sickle */}
              <path d="M18.8 6.2c-2.3-2.3-6.1-2.3-8.4 0-1.8 1.8-2.2 4.4-1.3 6.6L4.5 17.4c-.4.4-.4 1 0 1.4l.7.7c.4.4 1 .4 1.4 0l4.6-4.6c2.2.9 4.8.5 6.6-1.3 2.3-2.3 2.3-6.1 0-8.4zm-1.4 7c-1.6 1.6-4.1 1.6-5.7 0l1.4-1.4 1.4 1.4 2.9-2.9-1.4-1.4 1.4-1.4c1.6 1.6 1.6 4.1 0 5.7z" />
            </svg>
          </div>
        </div>
      );

    // 3. UNITED KINGDOM (Great Britain Union Jack)
    case 'eng':
      return (
        <div className={`relative ${className} ${borderClass} bg-[#00247d] shrink-0`}>
          <svg viewBox="0 0 60 30" className="w-full h-full">
            {/* Blue Field */}
            <rect width="60" height="30" fill="#00247d" />
            {/* White Saltire (St. Andrew) */}
            <line x1="0" y1="0" x2="60" y2="30" stroke="#ffffff" strokeWidth="6" />
            <line x1="60" y1="0" x2="0" y2="30" stroke="#ffffff" strokeWidth="6" />
            {/* Red Saltire (St. Patrick) */}
            <line x1="0" y1="0" x2="60" y2="30" stroke="#cf142b" strokeWidth="2" />
            <line x1="60" y1="0" x2="0" y2="30" stroke="#cf142b" strokeWidth="2" />
            {/* White Cross (St. George border) */}
            <rect x="25" y="0" width="10" height="30" fill="#ffffff" />
            <rect x="0" y="10" width="60" height="10" fill="#ffffff" />
            {/* Red Cross (St. George) */}
            <rect x="27" y="0" width="6" height="30" fill="#cf142b" />
            <rect x="0" y="12" width="60" height="6" fill="#cf142b" />
          </svg>
        </div>
      );

    // 4. UNITED STATES (Stars & Stripes)
    case 'usa':
      return (
        <div className={`relative ${className} ${borderClass} bg-white shrink-0`}>
          <svg viewBox="0 0 60 32" className="w-full h-full">
            {/* 13 Stripes */}
            {[...Array(13)].map((_, i) => (
              <rect
                key={i}
                x="0"
                y={(i * 32) / 13}
                width="60"
                height={32 / 13}
                fill={i % 2 === 0 ? '#b22234' : '#ffffff'}
              />
            ))}
            {/* Blue Canton */}
            <rect x="0" y="0" width="26" height={(7 * 32) / 13} fill="#3c3b6e" />
            {/* Miniature Stars Grid representation */}
            <g fill="#ffffff">
              <circle cx="5" cy="4" r="0.9" />
              <circle cx="10" cy="4" r="0.9" />
              <circle cx="15" cy="4" r="0.9" />
              <circle cx="20" cy="4" r="0.9" />
              <circle cx="7.5" cy="8" r="0.9" />
              <circle cx="12.5" cy="8" r="0.9" />
              <circle cx="17.5" cy="8" r="0.9" />
              <circle cx="22.5" cy="8" r="0.9" />
              <circle cx="5" cy="12" r="0.9" />
              <circle cx="10" cy="12" r="0.9" />
              <circle cx="15" cy="12" r="0.9" />
              <circle cx="20" cy="12" r="0.9" />
            </g>
          </svg>
        </div>
      );

    // 5. FRANCE (French Republic Tricolore)
    case 'fra':
      return (
        <div className={`relative ${className} ${borderClass} flex shrink-0`}>
          <div className="w-1/3 h-full bg-[#002654]" />
          <div className="w-1/3 h-full bg-[#ffffff]" />
          <div className="w-1/3 h-full bg-[#ed2939]" />
        </div>
      );

    // 6. ITALY (Kingdom of Italy with Savoy Shield)
    case 'ita':
      return (
        <div className={`relative ${className} ${borderClass} flex shrink-0`}>
          <div className="w-1/3 h-full bg-[#009246]" />
          <div className="w-1/3 h-full bg-[#ffffff] relative flex items-center justify-center">
            {/* Savoy Coat of Arms (Cross of Savoy with Blue Border & Crown) */}
            <div className="w-3.5 h-4.5 bg-[#002b7f] p-[1.5px] rounded-b-sm flex items-center justify-center shadow-xs">
              <div className="w-full h-full bg-[#ce2b37] relative flex items-center justify-center">
                <div className="w-[80%] h-[2px] bg-white absolute" />
                <div className="h-[80%] w-[2px] bg-white absolute" />
              </div>
            </div>
            {/* Crown on top */}
            <div className="absolute top-[8%] w-2.5 h-1 bg-[#d97706] rounded-xs" />
          </div>
          <div className="w-1/3 h-full bg-[#ce2b37]" />
        </div>
      );

    // 7. JAPAN (Empire of Japan - Rising Sun 16 Rays)
    case 'jap':
      return (
        <div className={`relative ${className} ${borderClass} bg-white shrink-0 overflow-hidden`}>
          <svg viewBox="0 0 60 40" className="w-full h-full">
            <rect width="60" height="40" fill="#ffffff" />
            {/* 16 Rays radiating from center */}
            <g fill="#bc002d">
              <polygon points="30,20 0,0 12,0" />
              <polygon points="30,20 24,0 36,0" />
              <polygon points="30,20 48,0 60,0" />
              <polygon points="30,20 60,8 60,18" />
              <polygon points="30,20 60,26 60,36" />
              <polygon points="30,20 60,40 48,40" />
              <polygon points="30,20 36,40 24,40" />
              <polygon points="30,20 12,40 0,40" />
              <polygon points="30,20 0,36 0,26" />
              <polygon points="30,20 0,18 0,8" />
              {/* Sun Disc */}
              <circle cx="30" cy="20" r="8" />
            </g>
          </svg>
        </div>
      );

    // 8. NATIONALIST CHINA (Republic of China - ROC)
    case 'chi':
      return (
        <div className={`relative ${className} ${borderClass} bg-[#de2910] shrink-0`}>
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#000095] flex items-center justify-center">
            {/* 12-Ray White Sun */}
            <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 text-white" fill="currentColor">
              <circle cx="10" cy="10" r="3.2" fill="#000095" stroke="#ffffff" strokeWidth="1.2" />
              <polygon points="10,1 11,6 10,6" />
              <polygon points="10,19 11,14 10,14" />
              <polygon points="1,10 6,11 6,10" />
              <polygon points="19,10 14,11 14,10" />
              <circle cx="10" cy="10" r="2.2" fill="#ffffff" />
            </svg>
          </div>
        </div>
      );

    // 9. POLAND (Republic of Poland)
    case 'pol':
      return (
        <div className={`relative ${className} ${borderClass} flex flex-col shrink-0`}>
          <div className="w-full h-1/2 bg-[#ffffff] relative flex items-center justify-center">
            <span className="text-[7px] leading-none">👑</span>
          </div>
          <div className="w-full h-1/2 bg-[#dc143c]" />
        </div>
      );

    // 10. CANADA (Dominion of Canada 1936)
    case 'can':
      return (
        <div className={`relative ${className} ${borderClass} bg-[#d80027] shrink-0 flex items-center justify-between`}>
          <div className="w-[28%] h-full bg-[#d80027]" />
          <div className="w-[44%] h-full bg-white flex items-center justify-center">
            <span className="text-xs text-[#d80027]">🍁</span>
          </div>
          <div className="w-[28%] h-full bg-[#d80027]" />
        </div>
      );

    // 11. BRITISH RAJ (India)
    case 'raj':
      return (
        <div className={`relative ${className} ${borderClass} flex flex-col shrink-0`}>
          <div className="w-full h-1/3 bg-[#ff9933]" />
          <div className="w-full h-1/3 bg-white flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full border border-[#000080] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#000080]" />
            </div>
          </div>
          <div className="w-full h-1/3 bg-[#138808]" />
        </div>
      );

    // 12. AUSTRALIA
    case 'ast':
      return (
        <div className={`relative ${className} ${borderClass} bg-[#00008b] shrink-0`}>
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#00247d] border-b border-r border-white/20">
            <span className="text-[8px] text-white">🇬🇧</span>
          </div>
          <div className="absolute right-2 top-2 text-[8px] text-white">★</div>
          <div className="absolute right-4 bottom-1 text-[7px] text-white">★</div>
        </div>
      );

    // 13. ROMANIA
    case 'rom':
      return (
        <div className={`relative ${className} ${borderClass} flex shrink-0`}>
          <div className="w-1/3 h-full bg-[#002b7f]" />
          <div className="w-1/3 h-full bg-[#fcd116]" />
          <div className="w-1/3 h-full bg-[#ce1126]" />
        </div>
      );

    // 14. HUNGARY
    case 'hun':
      return (
        <div className={`relative ${className} ${borderClass} flex flex-col shrink-0`}>
          <div className="w-full h-1/3 bg-[#ce2939]" />
          <div className="w-full h-1/3 bg-white flex items-center justify-center">
            <span className="text-[7px]">👑</span>
          </div>
          <div className="w-full h-1/3 bg-[#477050]" />
        </div>
      );

    // 15. TURKEY
    case 'tur':
      return (
        <div className={`relative ${className} ${borderClass} bg-[#e30a17] shrink-0 flex items-center justify-center`}>
          <div className="text-white text-[10px] leading-none font-bold">☪</div>
        </div>
      );

    // 16. FINLAND
    case 'fin':
      return (
        <div className={`relative ${className} ${borderClass} bg-white shrink-0`}>
          <div className="absolute top-[38%] left-0 right-0 h-[24%] bg-[#003580]" />
          <div className="absolute left-[30%] top-0 bottom-0 w-[20%] bg-[#003580]" />
        </div>
      );

    // 17. SPAIN (Spanish Republic / Nationalist)
    case 'spa':
      return (
        <div className={`relative ${className} ${borderClass} flex flex-col shrink-0`}>
          <div className="w-full h-1/4 bg-[#aa151b]" />
          <div className="w-full h-2/4 bg-[#f1bf00] flex items-center justify-center">
            <span className="text-[8px]">🦅</span>
          </div>
          <div className="w-full h-1/4 bg-[#aa151b]" />
        </div>
      );

    // 18. YUGOSLAVIA
    case 'yug':
      return (
        <div className={`relative ${className} ${borderClass} flex flex-col shrink-0`}>
          <div className="w-full h-1/3 bg-[#0c4076]" />
          <div className="w-full h-1/3 bg-white" />
          <div className="w-full h-1/3 bg-[#c6102e]" />
        </div>
      );

    // 19. CZECHOSLOVAKIA
    case 'cze':
      return (
        <div className={`relative ${className} ${borderClass} bg-white shrink-0 overflow-hidden`}>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#d7141a]" />
          <svg viewBox="0 0 30 20" className="absolute top-0 left-0 h-full w-[45%]">
            <polygon points="0,0 20,10 0,20" fill="#11457e" />
          </svg>
        </div>
      );

    // 20. MANCHUKUO
    case 'man':
      return (
        <div className={`relative ${className} ${borderClass} bg-[#fcd116] shrink-0 overflow-hidden`}>
          {/* Canton with 4 stripes */}
          <div className="absolute top-0 left-0 w-1/2 h-1/2 flex flex-col">
            <div className="flex-1 bg-[#d21034]" />
            <div className="flex-1 bg-[#0038a8]" />
            <div className="flex-1 bg-[#ffffff]" />
            <div className="flex-1 bg-[#000000]" />
          </div>
        </div>
      );

    // 21. SWEDEN
    case 'swe':
      return (
        <div className={`relative ${className} ${borderClass} bg-[#005293] shrink-0 overflow-hidden`}>
          {/* Nordic Yellow Cross */}
          <div className="absolute top-0 bottom-0 left-[30%] w-[16%] bg-[#fecb00]" />
          <div className="absolute left-0 right-0 top-[40%] h-[20%] bg-[#fecb00]" />
        </div>
      );

    // 22. NORWAY
    case 'nor':
      return (
        <div className={`relative ${className} ${borderClass} bg-[#ba0c2f] shrink-0 overflow-hidden`}>
          {/* White Cross */}
          <div className="absolute top-0 bottom-0 left-[26%] w-[22%] bg-white" />
          <div className="absolute left-0 right-0 top-[38%] h-[24%] bg-white" />
          {/* Blue Inner Cross */}
          <div className="absolute top-0 bottom-0 left-[31%] w-[12%] bg-[#00205b]" />
          <div className="absolute left-0 right-0 top-[43%] h-[14%] bg-[#00205b]" />
        </div>
      );

    // 23. GREECE
    case 'gre':
      return (
        <div className={`relative ${className} ${borderClass} bg-[#0d5eaf] shrink-0 overflow-hidden`}>
          {/* 9 alternating stripes */}
          <div className="w-full h-full flex flex-col">
            <div className="flex-1 bg-[#0d5eaf]" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-[#0d5eaf]" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-[#0d5eaf]" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-[#0d5eaf]" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-[#0d5eaf]" />
          </div>
          {/* Canton with white cross */}
          <div className="absolute top-0 left-0 w-[42%] h-[55%] bg-[#0d5eaf] flex items-center justify-center">
            <div className="absolute top-0 bottom-0 left-[38%] w-[24%] bg-white" />
            <div className="absolute left-0 right-0 top-[38%] h-[24%] bg-white" />
          </div>
        </div>
      );

    // 24. NETHERLANDS
    case 'hol':
      return (
        <div className={`relative ${className} ${borderClass} shrink-0 overflow-hidden flex flex-col`}>
          <div className="flex-1 bg-[#ae1c28]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#21468b]" />
        </div>
      );

    // 25. BELGIUM
    case 'bel':
      return (
        <div className={`relative ${className} ${borderClass} shrink-0 overflow-hidden flex flex-row`}>
          <div className="flex-1 bg-[#000000]" />
          <div className="flex-1 bg-[#ffd90c]" />
          <div className="flex-1 bg-[#ed2939]" />
        </div>
      );

    // 26. PORTUGAL
    case 'por':
      return (
        <div className={`relative ${className} ${borderClass} shrink-0 overflow-hidden flex flex-row`}>
          <div className="w-[40%] bg-[#006600]" />
          <div className="w-[60%] bg-[#cc0000]" />
          {/* Armillary sphere emblem */}
          <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border border-[#ffd700] bg-[#e60000] flex items-center justify-center shadow-xs">
            <div className="w-1.5 h-1.5 bg-white rounded-xs" />
          </div>
        </div>
      );

    // 27. BULGARIA
    case 'bul':
      return (
        <div className={`relative ${className} ${borderClass} shrink-0 overflow-hidden flex flex-col`}>
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#00966e]" />
          <div className="flex-1 bg-[#d62612]" />
        </div>
      );

    // 28. DENMARK
    case 'den':
      return (
        <div className={`relative ${className} ${borderClass} bg-[#c8102e] shrink-0 overflow-hidden`}>
          {/* Dannebrog Nordic White Cross */}
          <div className="absolute top-0 bottom-0 left-[32%] w-[16%] bg-white" />
          <div className="absolute left-0 right-0 top-[40%] h-[20%] bg-white" />
        </div>
      );

    // 29. SWITZERLAND
    case 'swi':
      return (
        <div className={`relative ${className} ${borderClass} bg-[#da291c] shrink-0 overflow-hidden flex items-center justify-center`}>
          {/* Swiss Cross */}
          <div className="absolute w-[28%] h-[68%] bg-white rounded-xs" />
          <div className="absolute h-[28%] w-[68%] bg-white rounded-xs" />
        </div>
      );

    // 30. AUSTRIA
    case 'aus':
      return (
        <div className={`relative ${className} ${borderClass} shrink-0 overflow-hidden flex flex-col`}>
          <div className="flex-1 bg-[#ed2939]" />
          <div className="flex-1 bg-white relative flex items-center justify-center">
            {/* Austrian Coat of Arms Eagle Icon */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#1e293b]/70 flex items-center justify-center text-[5px] text-white font-serif">
              🦅
            </div>
          </div>
          <div className="flex-1 bg-[#ed2939]" />
        </div>
      );

    // DEFAULT / MINOR NATION FALLBACK
    default:
      return (
        <div className={`relative ${className} ${borderClass} bg-[#1e293b] flex items-center justify-center font-mono text-[9px] font-bold text-white shrink-0`}>
          {countryId.toUpperCase().slice(0, 3)}
        </div>
      );
  }
};

export const CountryFlagSelector: React.FC<CountryFlagSelectorProps> = ({
  selectedCountryId,
  onSelectCountry,
  className = ''
}) => {
  const [filterCategory, setFilterCategory] = useState<'major' | 'all' | 'axis' | 'allies' | 'regional' | 'comintern'>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // 7 Major Powers defined by HOI4 standard
  const MAJOR_7_TAGS = ['ger', 'sov', 'eng', 'usa', 'fra', 'ita', 'jap'];
  const AXIS_TAGS = ['ger', 'ita', 'jap', 'hun', 'rom', 'bul', 'fin', 'man', 'aus'];
  const ALLIES_TAGS = ['eng', 'usa', 'fra', 'can', 'ast', 'raj', 'pol', 'hol', 'bel', 'nor', 'den', 'cze', 'gre'];
  const REGIONAL_TAGS = ['rom', 'hun', 'cze', 'yug', 'tur', 'fin', 'spa', 'swe', 'nor', 'gre', 'hol', 'bel', 'por', 'bul', 'den', 'swi', 'aus'];
  const COMINTERN_TAGS = ['sov', 'chi', 'man'];

  // All countries
  const countries = MAJOR_COUNTRIES_FOCUS;

  // Filtered countries
  const filteredCountries = useMemo(() => {
    return countries.filter(c => {
      // Category filter
      if (filterCategory === 'major' && !MAJOR_7_TAGS.includes(c.id)) return false;
      if (filterCategory === 'axis' && !AXIS_TAGS.includes(c.id)) return false;
      if (filterCategory === 'allies' && !ALLIES_TAGS.includes(c.id)) return false;
      if (filterCategory === 'regional' && !REGIONAL_TAGS.includes(c.id)) return false;
      if (filterCategory === 'comintern' && !COMINTERN_TAGS.includes(c.id)) return false;

      // Text search
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase().trim();
        const matchesName = c.name.toLowerCase().includes(query);
        const matchesTag = c.tag.toLowerCase().includes(query);
        if (!matchesName && !matchesTag) return false;
      }

      return true;
    });
  }, [countries, filterCategory, searchFilter]);

  const selectedCountry = useMemo(() => {
    return countries.find(c => c.id === selectedCountryId) || countries[0];
  }, [countries, selectedCountryId]);

  const selectedStats = useMemo(() => {
    return MAJOR_NATIONS_STARTING_STATS.find(s => s.id === selectedCountryId);
  }, [selectedCountryId]);

  return (
    <div className={`rounded-xl border border-[#2b3a32] bg-gradient-to-b from-[#141d18] via-[#101713] to-[#0c120e] p-4 shadow-xl text-[#f1f5f9] ${className}`}>
      {/* Header and Quick Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-[#223028] pb-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#b8860b]/20 border border-[#b8860b]/40 text-[#fde047]">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-serif text-base sm:text-lg font-bold tracking-tight text-[#fef3c7]">
                Pilih Bendera Negara (Pohon Fokus)
              </h3>
              <span className="rounded bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <Check className="h-2.5 w-2.5 stroke-[3]" /> FULL RELEASE ({countries.length} NEGARA AKTIF)
              </span>
              <span className="rounded bg-[#f59e0b]/20 border border-[#f59e0b]/40 px-2 py-0.5 text-[10px] font-mono text-[#fde047] font-bold">
                7 UTAMA + {countries.length - 7} REGIONAL
              </span>
            </div>
            <p className="text-xs text-[#cbd5e1] mt-0.5">
              Pilih bendera di bawah untuk membuka pohon fokus interaktif, jalur sejarah/alternatif, serta statistik awal 1936 terlengkap (bukan demo).
            </p>
          </div>
        </div>

        {/* Selected Country Badge */}
        <div className="flex items-center gap-2.5 rounded-lg border border-[#b8860b]/60 bg-[#251d10] px-3 py-1.5 shadow-sm">
          <CountryFlag countryId={selectedCountry.id} className="w-8 h-5.5" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs font-black text-[#fef08a]">{selectedCountry.tag}</span>
              <span className="text-xs font-bold text-white truncate max-w-[130px] sm:max-w-none">{selectedCountry.name}</span>
            </div>
            {selectedStats && (
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#cbd5e1]">
                <span className="flex items-center gap-0.5 text-[#38bdf8]">
                  <Building className="h-2.5 w-2.5" /> {selectedStats.factories.civilian} Civs
                </span>
                <span>•</span>
                <span className="flex items-center gap-0.5 text-[#34d399]">
                  <Factory className="h-2.5 w-2.5" /> {selectedStats.factories.military} Mils
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs and Quick Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-3">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-mono scrollbar-none">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-lg border transition-all shrink-0 flex items-center gap-1 ${
              filterCategory === 'all'
                ? 'border-[#10b981] bg-[#122820] text-[#6ee7b7] font-bold shadow'
                : 'border-[#223028] bg-[#0e1612] text-[#94a3b8] hover:text-white'
            }`}
          >
            <span>Semua ({countries.length})</span>
          </button>
          <button
            onClick={() => setFilterCategory('major')}
            className={`px-2.5 py-1.5 rounded-lg border transition-all shrink-0 flex items-center gap-1.5 ${
              filterCategory === 'major'
                ? 'border-[#f59e0b] bg-[#3a2814] text-[#fef08a] font-bold shadow'
                : 'border-[#223028] bg-[#0e1612] text-[#94a3b8] hover:text-white'
            }`}
          >
            <Star className="h-3 w-3 text-[#f59e0b]" />
            <span>7 Utama (Major)</span>
          </button>
          <button
            onClick={() => setFilterCategory('axis')}
            className={`px-2.5 py-1.5 rounded-lg border transition-all shrink-0 flex items-center gap-1 ${
              filterCategory === 'axis'
                ? 'border-[#ef4444] bg-[#341616] text-[#fca5a5] font-bold shadow'
                : 'border-[#223028] bg-[#0e1612] text-[#94a3b8] hover:text-white'
            }`}
          >
            <span>⚔️ Poros ({AXIS_TAGS.length})</span>
          </button>
          <button
            onClick={() => setFilterCategory('allies')}
            className={`px-2.5 py-1.5 rounded-lg border transition-all shrink-0 flex items-center gap-1 ${
              filterCategory === 'allies'
                ? 'border-[#3b82f6] bg-[#142236] text-[#93c5fd] font-bold shadow'
                : 'border-[#223028] bg-[#0e1612] text-[#94a3b8] hover:text-white'
            }`}
          >
            <span>🛡️ Sekutu ({ALLIES_TAGS.length})</span>
          </button>
          <button
            onClick={() => setFilterCategory('regional')}
            className={`px-2.5 py-1.5 rounded-lg border transition-all shrink-0 flex items-center gap-1 ${
              filterCategory === 'regional'
                ? 'border-[#a855f7] bg-[#271538] text-[#d8b4fe] font-bold shadow'
                : 'border-[#223028] bg-[#0e1612] text-[#94a3b8] hover:text-white'
            }`}
          >
            <span>🏰 Regional ({REGIONAL_TAGS.length})</span>
          </button>
          <button
            onClick={() => setFilterCategory('comintern')}
            className={`px-2.5 py-1.5 rounded-lg border transition-all shrink-0 flex items-center gap-1 ${
              filterCategory === 'comintern'
                ? 'border-[#dc2626] bg-[#361616] text-[#fca5a5] font-bold shadow'
                : 'border-[#223028] bg-[#0e1612] text-[#94a3b8] hover:text-white'
            }`}
          >
            <span>☭ Komintern/Asia</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative sm:w-56 shrink-0">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#64748b]" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Cari bendera / nama..."
            className="w-full rounded-md border border-[#223028] bg-[#0c1410] py-1.5 pl-8 pr-2.5 text-xs text-[#f1f5f9] placeholder-[#64748b] outline-none focus:border-[#b8860b]"
          />
        </div>
      </div>

      {/* Flag Cards Grid / Ribbon */}
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 ${isExpanded ? 'max-h-[500px]' : 'max-h-[320px]'} overflow-y-auto pr-1`}>
        {filteredCountries.map(country => {
          const isSelected = country.id === selectedCountryId;
          const isMajor = MAJOR_7_TAGS.includes(country.id);
          const stats = MAJOR_NATIONS_STARTING_STATS.find(s => s.id === country.id);

          return (
            <button
              key={country.id}
              onClick={() => onSelectCountry(country.id)}
              className={`group relative flex flex-col items-center justify-between rounded-xl border p-2.5 transition-all text-left overflow-hidden ${
                isSelected
                  ? 'border-[#f59e0b] bg-gradient-to-b from-[#2e2112] via-[#21190f] to-[#141d18] text-[#fef08a] shadow-lg shadow-black/60 ring-2 ring-[#f59e0b]/50 scale-[1.02]'
                  : 'border-[#223028] bg-[#0f1712] text-[#cbd5e1] hover:border-[#b8860b]/60 hover:bg-[#152019] hover:text-white'
              }`}
            >
              {/* Active Selection Glow & Indicator */}
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#f59e0b] text-[#0a0f14]">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
              )}

              {/* Major Power Star Tag */}
              {isMajor && !isSelected && (
                <div className="absolute top-1.5 right-1.5 text-[#f59e0b]" title="7 Negara Utama HOI4">
                  <Star className="h-3.5 w-3.5 fill-[#f59e0b]" />
                </div>
              )}

              {/* Flag Visual */}
              <div className="w-full flex items-center justify-center pt-1 pb-2">
                <div className="transform transition-transform group-hover:scale-105">
                  <CountryFlag countryId={country.id} className="w-16 h-10 shadow-md" />
                </div>
              </div>

              {/* Country Name & Tag */}
              <div className="w-full text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="font-mono text-xs font-black text-[#fde047]">{country.tag}</span>
                  {isMajor && (
                    <span className="rounded bg-[#b8860b]/20 px-1 text-[9px] font-mono text-[#fde047]">★</span>
                  )}
                </div>
                <div className="text-xs font-bold truncate max-w-full text-[#f1f5f9] mt-0.5">
                  {country.name.split('(')[0].trim()}
                </div>
              </div>

              {/* Starting Industry & Leader Quick Chips */}
              <div className="w-full mt-2 pt-2 border-t border-[#223028] flex items-center justify-between text-[10px] font-mono text-[#94a3b8]">
                <span>{stats ? stats.ideology.slice(0, 5) : 'Reg'}</span>
                <span className="text-[#38bdf8] font-bold">
                  {stats ? `${stats.factories.civilian + stats.factories.military} Fab` : 'Fokus'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expand / Collapse Button if more than 7 countries */}
      {filteredCountries.length > 7 && (
        <div className="mt-3 pt-2 border-t border-[#223028] flex items-center justify-between">
          <span className="text-xs font-mono text-[#94a3b8]">
            Menampilkan <span className="text-[#fde047] font-bold">{filteredCountries.length}</span> negara
          </span>
          <button
            onClick={() => setIsExpanded(prev => !prev)}
            className="flex items-center gap-1 text-xs font-mono text-[#f59e0b] hover:text-[#fef08a] transition-colors"
          >
            <span>{isExpanded ? 'Perkecil Tampilan' : 'Tampilkan Semua Negara'}</span>
            {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>
      )}
    </div>
  );
};
