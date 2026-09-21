import React, { useState } from 'react';
import {
  Star, Trash2, Copy, Check, BookOpen, Terminal, Shield,
  Globe, GitBranch, Download, Upload, RefreshCw, Award,
  Sliders, CheckCircle2, AlertCircle
} from 'lucide-react';
import { FavoriteItem, MainTab, WarRoomBackupConfig } from '../types';

interface FavoritesViewerProps {
  favorites: FavoriteItem[];
  onRemoveFavorite: (id: string) => void;
  onClearAll: () => void;
  onNavigateTab: (tab: MainTab) => void;
  onImportFavorites?: (importedFavorites: FavoriteItem[]) => void;
}

export const FavoritesViewer: React.FC<FavoritesViewerProps> = ({
  favorites,
  onRemoveFavorite,
  onClearAll,
  onNavigateTab,
  onImportFavorites
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExportJSON = () => {
    try {
      // Gather config from localStorage
      let researchedTechIds: string[] = [];
      let activeResearchSlots: any[] = [];
      try {
        const r = localStorage.getItem('hoi4_researched_techs');
        if (r) researchedTechIds = JSON.parse(r);
        const s = localStorage.getItem('hoi4_active_research_slots');
        if (s) activeResearchSlots = JSON.parse(s);
      } catch (e) {
        console.error(e);
      }

      const backup: WarRoomBackupConfig = {
        appVersion: '2.0-classic',
        exportDate: new Date().toISOString(),
        exportTimestamp: Date.now(),
        favorites,
        researchProgress: {
          researchedTechIds,
          currentYear: 1941,
          slots: activeResearchSlots
        },
        warRoomPreferences: {
          vintageThemePreferred: true
        }
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `hoi4_war_room_backup_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showNotification(`Sukses mengekspor ${favorites.length} favorit dan pengaturan ke file JSON!`);
    } catch (err) {
      alert('Gagal mengekspor file konfigurasi JSON.');
    }
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed: WarRoomBackupConfig = JSON.parse(content);

        if (parsed && Array.isArray(parsed.favorites)) {
          if (onImportFavorites) {
            onImportFavorites(parsed.favorites);
          } else {
            // Fallback direct storage update
            localStorage.setItem('hoi4_war_room_favorites', JSON.stringify(parsed.favorites));
            window.location.reload();
          }

          if (parsed.researchProgress?.researchedTechIds && Array.isArray(parsed.researchProgress.researchedTechIds)) {
            localStorage.setItem('hoi4_researched_techs', JSON.stringify(parsed.researchProgress.researchedTechIds));
          }
          if (parsed.researchProgress?.slots && Array.isArray(parsed.researchProgress.slots)) {
            localStorage.setItem('hoi4_active_research_slots', JSON.stringify(parsed.researchProgress.slots));
          }

          showNotification(`Berhasil memulihkan ${parsed.favorites.length} favorit dan setelan konfigurasi!`);
        } else {
          alert('Format berkas cadangan JSON tidak kompatibel.');
        }
      } catch (err) {
        alert('Gagal membaca berkas JSON. Pastikan file valid.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFavorites = favorites.filter(fav => {
    if (filterType === 'all') return true;
    return fav.type === filterType;
  });

  const getTypeIcon = (type: FavoriteItem['type']) => {
    switch (type) {
      case 'guide':
        return <BookOpen className="h-4 w-4 text-[#d97706]" />;
      case 'command':
        return <Terminal className="h-4 w-4 text-[#f59e0b]" />;
      case 'division':
        return <Shield className="h-4 w-4 text-[#3b82f6]" />;
      case 'country':
        return <Globe className="h-4 w-4 text-[#10b981]" />;
      case 'focus':
        return <GitBranch className="h-4 w-4 text-[#ec4899]" />;
    }
  };

  const getTypeName = (type: FavoriteItem['type']) => {
    switch (type) {
      case 'guide':
        return 'Panduan Doktrin';
      case 'command':
        return 'Cheat Konsol';
      case 'division':
        return 'Template Divisi';
      case 'country':
        return 'Strategi Negara';
      case 'focus':
        return 'Fokus Nasional';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#b8860b]/40 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded border border-[#b8860b]/60 bg-[#78350f]/30 px-2 py-0.5 text-[10px] font-mono text-[#fde047] font-bold uppercase">
              ARSIP RAHASIA PD II
            </span>
          </div>
          <h2 className="text-xl font-bold font-serif text-[#fef3c7] flex items-center gap-2 mt-1">
            <Star className="h-5 w-5 text-[#facc15] fill-current" />
            Arsip Favorit &amp; Berkas Tersimpan ({favorites.length})
          </h2>
          <p className="text-xs text-[#cbd5e1] mt-0.5">
            Daftar panduan, kode cheat konsol, template divisi, dan profil negara yang tersimpan untuk akses cepat selama sesi permainan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Export Button */}
          <button
            onClick={handleExportJSON}
            title="Unduh seluruh favorit dan konfigurasi sebagai file JSON"
            className="flex items-center gap-1.5 rounded-lg border border-[#b8860b]/60 bg-[#251f14] px-3 py-1.5 text-xs font-semibold text-[#fde047] hover:bg-[#382d18] transition-all shadow-sm"
          >
            <Download className="h-3.5 w-3.5 text-[#f59e0b]" />
            <span>Ekspor JSON</span>
          </button>

          {/* Import Button */}
          <label
            title="Pulihkan favorit dan konfigurasi dari file JSON"
            className="flex items-center gap-1.5 rounded-lg border border-[#3b82f6]/50 bg-[#16253b] px-3 py-1.5 text-xs font-semibold text-[#93c5fd] hover:bg-[#1f375b] cursor-pointer transition-all shadow-sm"
          >
            <Upload className="h-3.5 w-3.5 text-[#60a5fa]" />
            <span>Impor JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </label>

          {favorites.length > 0 && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-1.5 rounded-lg border border-[#dc2626]/40 bg-[#2d1416]/50 px-3 py-1.5 text-xs font-medium text-[#fca5a5] hover:bg-[#3d1619] transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Hapus Semua</span>
            </button>
          )}
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="rounded-lg border border-[#10b981]/50 bg-[#0f241a] p-3 text-xs font-mono text-[#6ee7b7] flex items-center gap-2 shadow-lg animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-[#34d399] shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter Tabs */}
      {favorites.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 scrollbar-thin">
          <button
            onClick={() => setFilterType('all')}
            className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-[#1e293b] text-[#f8fafc] font-semibold'
                : 'text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            Semua ({favorites.length})
          </button>
          <button
            onClick={() => setFilterType('guide')}
            className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
              filterType === 'guide'
                ? 'bg-[#1e293b] text-[#f8fafc] font-semibold'
                : 'text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            Panduan ({favorites.filter(f => f.type === 'guide').length})
          </button>
          <button
            onClick={() => setFilterType('command')}
            className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
              filterType === 'command'
                ? 'bg-[#1e293b] text-[#f8fafc] font-semibold'
                : 'text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            Cheat Konsol ({favorites.filter(f => f.type === 'command').length})
          </button>
          <button
            onClick={() => setFilterType('division')}
            className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
              filterType === 'division'
                ? 'bg-[#1e293b] text-[#f8fafc] font-semibold'
                : 'text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            Template Divisi ({favorites.filter(f => f.type === 'division').length})
          </button>
          <button
            onClick={() => setFilterType('country')}
            className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
              filterType === 'country'
                ? 'bg-[#1e293b] text-[#f8fafc] font-semibold'
                : 'text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            Strategi Negara ({favorites.filter(f => f.type === 'country').length})
          </button>
          <button
            onClick={() => setFilterType('focus')}
            className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
              filterType === 'focus'
                ? 'bg-[#1e293b] text-[#f8fafc] font-semibold'
                : 'text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            Fokus Nasional ({favorites.filter(f => f.type === 'focus').length})
          </button>
        </div>
      )}

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#22303c] bg-[#111923]/60 p-12 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1b2633] text-[#facc15]">
            <Star className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#f8fafc]">Belum Ada Arsip Favorit</h3>
            <p className="text-xs text-[#94a3b8] max-w-md mx-auto mt-1 leading-relaxed">
              Kamu belum menyimpan panduan atau kode cheat konsol. Klik ikon bintang (★) pada kartu apa saja untuk menyimpannya di sini.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => onNavigateTab('guides')}
              className="rounded-lg border border-[#d97706]/40 bg-[#241f18] px-3.5 py-2 text-xs font-medium text-[#fef3c7] hover:border-[#d97706] transition-colors"
            >
              Jelajahi Panduan Doktrin
            </button>
            <button
              onClick={() => onNavigateTab('division')}
              className="rounded-lg border border-[#3b82f6]/40 bg-[#16253b] px-3.5 py-2 text-xs font-medium text-[#dbeafe] hover:border-[#3b82f6] transition-colors"
            >
              Lihat Meta Divisi
            </button>
            <button
              onClick={() => onNavigateTab('commands')}
              className="rounded-lg border border-[#f59e0b]/40 bg-[#282114] px-3.5 py-2 text-xs font-medium text-[#fef3c7] hover:border-[#f59e0b] transition-colors"
            >
              Lihat Kode Cheat
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFavorites.map(fav => {
            const isCopied = copiedId === fav.id;

            return (
              <div
                key={fav.id}
                className="rounded-xl border border-[#223344] bg-[#111923] p-4 flex flex-col justify-between space-y-3 shadow-md shadow-black/40 hover:border-[#2f465c] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="flex items-center gap-1.5 rounded border border-[#1e293b] bg-[#0f172a] px-2 py-0.5 text-[10px] font-mono text-[#cbd5e1]">
                      {getTypeIcon(fav.type)}
                      <span>{getTypeName(fav.type)}</span>
                      {fav.tag && <span className="text-[#64748b]">• {fav.tag}</span>}
                    </span>

                    <button
                      onClick={() => onRemoveFavorite(fav.id)}
                      className="text-[#64748b] hover:text-[#f87171] p-1 rounded transition-colors"
                      title="Hapus dari Favorit"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-[#f8fafc]">{fav.title}</h4>
                  <p className="text-xs text-[#94a3b8] font-mono mt-1 break-all line-clamp-2">
                    {fav.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1a2533] flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-[#64748b]">
                    Tersimpan
                  </span>

                  <div className="flex items-center gap-2">
                    {fav.type === 'command' && (
                      <button
                        onClick={() => handleCopy(fav.id, fav.subtitle)}
                        className="flex items-center gap-1 text-[11px] font-mono text-[#38bdf8] hover:text-[#7dd3fc] transition-colors"
                      >
                        {isCopied ? <Check className="h-3 w-3 text-[#22c55e]" /> : <Copy className="h-3 w-3" />}
                        <span>{isCopied ? 'Tersalin!' : 'Salin Perintah'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (fav.type === 'guide') onNavigateTab('guides');
                        else if (fav.type === 'command') onNavigateTab('commands');
                        else if (fav.type === 'division') onNavigateTab('division');
                        else if (fav.type === 'country') onNavigateTab('war_room');
                        else if (fav.type === 'focus') onNavigateTab('focus_tree');
                      }}
                      className="text-[11px] text-[#94a3b8] hover:text-[#f8fafc] underline underline-offset-2"
                    >
                      Buka Modul &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
