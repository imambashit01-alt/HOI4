import React, { useState } from 'react';
import {
  Terminal, Copy, Check, Star, AlertTriangle, Sparkles,
  Layers, Landmark, Shield, Factory, MapPin, Search, Tag
} from 'lucide-react';
import { CommandItem, CommandCategory } from '../types';
import { COMMANDS_DATA, COMMAND_CATEGORIES, POPULAR_COUNTRY_TAGS } from '../data/commandsData';

interface ConsoleViewerProps {
  searchQuery: string;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: { id: string; type: 'command'; title: string; subtitle: string; tag: string }) => void;
}

export const ConsoleViewer: React.FC<ConsoleViewerProps> = ({
  searchQuery,
  isFavorite,
  toggleFavorite
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Custom parameter values state for interactive commands
  const [paramValues, setParamValues] = useState<Record<string, Record<string, string>>>({
    'cmd-pp': { 'Jumlah PP': '1000' },
    'cmd-st': { 'Jumlah (%)': '100' },
    'cmd-ws': { 'Jumlah (%)': '100' },
    'cmd-manpower': { 'Jumlah Manpower': '1000000' },
    'cmd-xp': { 'Jumlah XP': '500' },
    'cmd-fuel': { 'Jumlah Fuel': '1000000' },
    'cmd-add-equipment': { 'Jumlah Stok': '50000' },
    'cmd-delall': { 'Tag Negara Target': 'SOV' },
    'cmd-annex': { 'Tag Negara Target': 'POL' },
    'cmd-tag': { 'Tag Negara': 'GER' },
    'cmd-nuke': { 'Jumlah Nuklir': '25' },
    'cmd-whitepeace': { 'Negara Pertama': 'GER', 'Negara Kedua': 'SOV' },
    'cmd-civilwar': { 'Ideologi': 'fascism', 'Tag Negara': 'USA' }
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleParamChange = (cmdId: string, paramKey: string, value: string) => {
    setParamValues(prev => ({
      ...prev,
      [cmdId]: {
        ...(prev[cmdId] || {}),
        [paramKey]: value
      }
    }));
  };

  // Build the effective executable command string
  const getExecutableCode = (cmd: CommandItem): string => {
    if (!cmd.parameterTemplate || !cmd.quickArgs) {
      return cmd.code;
    }

    const currentValues = paramValues[cmd.id] || {};
    let result = cmd.parameterTemplate;

    if (cmd.id === 'cmd-pp') {
      result = `pp ${currentValues['Jumlah PP'] || '1000'}`;
    } else if (cmd.id === 'cmd-st') {
      result = `st ${currentValues['Jumlah (%)'] || '100'}`;
    } else if (cmd.id === 'cmd-ws') {
      result = `ws ${currentValues['Jumlah (%)'] || '100'}`;
    } else if (cmd.id === 'cmd-manpower') {
      result = `manpower ${currentValues['Jumlah Manpower'] || '1000000'}`;
    } else if (cmd.id === 'cmd-xp') {
      result = `gain_xp ${currentValues['Jumlah XP'] || '500'}`;
    } else if (cmd.id === 'cmd-fuel') {
      result = `fuel ${currentValues['Jumlah Fuel'] || '1000000'}`;
    } else if (cmd.id === 'cmd-add-equipment') {
      result = `add_latest_equipment ${currentValues['Jumlah Stok'] || '50000'}`;
    } else if (cmd.id === 'cmd-delall') {
      result = `delall ${currentValues['Tag Negara Target'] || 'SOV'}`;
    } else if (cmd.id === 'cmd-annex') {
      result = `annex ${currentValues['Tag Negara Target'] || 'POL'}`;
    } else if (cmd.id === 'cmd-tag') {
      result = `tag ${currentValues['Tag Negara'] || 'GER'}`;
    } else if (cmd.id === 'cmd-nuke') {
      result = `nuke ${currentValues['Jumlah Nuklir'] || '25'}`;
    } else if (cmd.id === 'cmd-whitepeace') {
      result = `whitepeace ${currentValues['Negara Pertama'] || 'GER'} ${currentValues['Negara Kedua'] || 'SOV'}`;
    } else if (cmd.id === 'cmd-civilwar') {
      result = `civilwar ${currentValues['Ideologi'] || 'fascism'} ${currentValues['Tag Negara'] || 'USA'}`;
    }

    return result;
  };

  const filteredCommands = COMMANDS_DATA.filter(cmd => {
    // Filter Category
    if (selectedCategory !== 'all') {
      const activeCat = COMMAND_CATEGORIES.find(c => c.id === selectedCategory);
      if (activeCat && cmd.category !== activeCat.title) {
        return false;
      }
    }

    // Filter Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        cmd.title.toLowerCase().includes(q) ||
        cmd.code.toLowerCase().includes(q) ||
        cmd.description.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const setCountryTagForActiveCommands = (tag: string) => {
    setParamValues(prev => ({
      ...prev,
      'cmd-annex': { 'Tag Negara Target': tag },
      'cmd-tag': { 'Tag Negara': tag },
      'cmd-delall': { 'Tag Negara Target': tag }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Terminal instruction banner */}
      <div className="rounded-xl border border-[#d97706]/40 bg-gradient-to-r from-[#211a12] via-[#1a1711] to-[#121820] p-5 shadow-lg shadow-black/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#d97706]/50 bg-[#2b2114] text-[#fbbf24]">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-[#f8fafc] flex items-center gap-2">
                Konsol Perintah Cheat (HOI4 Console Command Center)
              </h3>
              <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                Tekan tombol <kbd className="rounded border border-[#475569] bg-[#1e293b] px-1.5 py-0.5 font-mono text-[11px] text-[#f1f5f9] font-bold">~</kbd> (Tilde) atau <kbd className="rounded border border-[#475569] bg-[#1e293b] px-1.5 py-0.5 font-mono text-[11px] text-[#f1f5f9] font-bold">Shift + 2</kbd> atau <kbd className="rounded border border-[#475569] bg-[#1e293b] px-1.5 py-0.5 font-mono text-[11px] text-[#f1f5f9] font-bold">§</kbd> di keyboard saat berada di dalam game untuk membuka layar konsol.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-[#475569]/40 bg-[#0f172a] p-2.5 text-right font-mono text-xs">
            <span className="text-[#94a3b8] block text-[10px] uppercase">Status Mode:</span>
            <span className="text-[#4ade80] font-bold">Cheat Aktif (Non-Ironman)</span>
          </div>
        </div>

        {/* Quick Country Tags Toolbar */}
        <div className="mt-4 pt-3.5 border-t border-[#2d251a] flex items-center gap-2 overflow-x-auto text-xs scrollbar-thin">
          <span className="font-mono text-[11px] font-bold uppercase text-[#fbbf24] shrink-0 flex items-center gap-1">
            <Tag className="h-3.5 w-3.5" />
            Pintasan Tag Negara:
          </span>
          {POPULAR_COUNTRY_TAGS.map(c => (
            <button
              key={c.tag}
              onClick={() => setCountryTagForActiveCommands(c.tag)}
              className="shrink-0 rounded border border-[#2e3e4e] bg-[#101b26] px-2 py-0.5 font-mono text-[11px] text-[#cbd5e1] hover:border-[#38bdf8] hover:text-[#f8fafc] transition-colors"
              title={`${c.name} (${c.ideology})`}
            >
              <strong className="text-[#38bdf8]">{c.tag}</strong> {c.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Category selector row */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
        {COMMAND_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-2 font-medium transition-all ${
              selectedCategory === cat.id
                ? 'border border-[#f59e0b]/60 bg-[#282114] text-[#fde047] shadow-sm'
                : 'border border-[#1e2a36] bg-[#111923] text-[#94a3b8] hover:border-[#334759] hover:text-[#f1f5f9]'
            }`}
          >
            <span>{cat.title}</span>
            <span className="rounded-full bg-[#1e293b] px-1.5 py-0.2 text-[10px] font-mono text-[#64748b]">
              {cat.commands.length}
            </span>
          </button>
        ))}
      </div>

      {/* Commands Grid */}
      {filteredCommands.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#22303c] bg-[#10171f]/50 p-12 text-center">
          <Terminal className="mx-auto h-10 w-10 text-[#475569] mb-3" />
          <p className="text-base font-medium text-[#94a3b8]">Tidak ada cheat yang cocok dengan pencarian.</p>
          <p className="text-xs text-[#64748b] mt-1">Coba gunakan nama perintah pendek seperti `pp`, `ic`, `tag`, atau `annex`.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCommands.map(cmd => {
            const isFav = isFavorite(cmd.id);
            const executableCode = getExecutableCode(cmd);
            const isCopied = copiedId === cmd.id;

            return (
              <div
                key={cmd.id}
                className="rounded-xl border border-[#223242] bg-[#111923] shadow-md shadow-black/40 p-4 space-y-3 flex flex-col justify-between hover:border-[#2f455b] transition-all"
              >
                <div>
                  {/* Header info */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="rounded border border-[#1e293b] bg-[#0f172a] px-2 py-0.5 text-[10px] font-mono text-[#94a3b8]">
                          {cmd.category}
                        </span>
                        {cmd.popular && (
                          <span className="rounded border border-[#b45309]/50 bg-[#78350f]/40 px-1.5 py-0.2 text-[10px] font-mono text-[#fbbf24]">
                            ★ Populer
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-[#f8fafc] tracking-tight">
                        {cmd.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => toggleFavorite({
                        id: cmd.id,
                        type: 'command',
                        title: cmd.title,
                        subtitle: executableCode,
                        tag: cmd.category
                      })}
                      className={`rounded-lg border p-2 text-xs transition-colors shrink-0 ${
                        isFav
                          ? 'border-[#eab308]/60 bg-[#2b2512] text-[#facc15]'
                          : 'border-[#22303c] bg-[#131b24] text-[#64748b] hover:text-[#f8fafc]'
                      }`}
                      title={isFav ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
                    >
                      <Star className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <p className="text-xs text-[#94a3b8] leading-relaxed mt-1">
                    {cmd.description}
                  </p>

                  {/* Warning Callout */}
                  {cmd.warning && (
                    <div className="mt-2 flex items-start gap-2 rounded-md border border-[#dc2626]/40 bg-[#2d1416]/70 p-2.5 text-[11px] text-[#fecaca] leading-relaxed">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#ef4444] mt-0.5" />
                      <div>{cmd.warning}</div>
                    </div>
                  )}

                  {/* Interactive parameters input */}
                  {cmd.quickArgs && cmd.quickArgs.length > 0 && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-[#1b2835] pt-2.5">
                      {cmd.quickArgs.map(arg => {
                        const val = paramValues[cmd.id]?.[arg.label] ?? arg.defaultVal;

                        return (
                          <div key={arg.label} className="space-y-1">
                            <label className="text-[10px] font-mono uppercase text-[#64748b] block">
                              {arg.label}:
                            </label>
                            <input
                              type="text"
                              value={val}
                              onChange={(e) => handleParamChange(cmd.id, arg.label, e.target.value)}
                              placeholder={arg.placeholder}
                              className="w-full rounded border border-[#2b3a4a] bg-[#0c141d] px-2 py-1 text-xs font-mono text-[#f8fafc] outline-none focus:border-[#f59e0b]"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Copy Bar */}
                <div className="pt-2 border-t border-[#1a2634] flex items-center justify-between gap-2">
                  <div className="rounded-lg border border-[#1e2d3d] bg-[#091017] px-3 py-2 font-mono text-xs text-[#38bdf8] flex-1 overflow-x-auto whitespace-nowrap scrollbar-none">
                    <span className="text-[#64748b] mr-1">$</span>
                    <strong>{executableCode}</strong>
                  </div>

                  <button
                    onClick={() => handleCopy(cmd.id, executableCode)}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                      isCopied
                        ? 'border-[#22c55e]/60 bg-[#143324] text-[#4ade80]'
                        : 'border-[#2b3a4a] bg-[#162331] text-[#f1f5f9] hover:border-[#f59e0b] hover:bg-[#202f42]'
                    }`}
                  >
                    {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{isCopied ? 'Tersalin!' : 'Salin Perintah'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
