import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { GuideViewer } from './components/GuideViewer';
import { DivisionViewer } from './components/DivisionViewer';
import { FocusTreeViewer } from './components/FocusTreeViewer';
import { WarRoomViewer } from './components/WarRoomViewer';
import { ConsoleViewer } from './components/ConsoleViewer';
import { FavoritesViewer } from './components/FavoritesViewer';
import { GUIDES_DATA } from './data/guidesData';
import { MainTab, GuideLevel, FavoriteItem } from './types';
import { ArrowUp, Radio, Shield, Globe, Terminal, BookOpen, GitBranch } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('guides');
  const [guideLevel, setGuideLevel] = useState<GuideLevel>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [focusCountryId, setFocusCountryId] = useState<string>('ger');

  // Favorites state persisted to localStorage
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const saved = localStorage.getItem('hoi4_war_room_favorites');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading favorites', e);
    }
    // Default initial favorites
    return [
      {
        id: 'cmd-pp',
        type: 'command',
        title: 'Tambah Political Power (PP)',
        subtitle: 'pp 1000',
        tag: 'Politik',
        addedAt: Date.now()
      },
      {
        id: 'div-meta-21w',
        type: 'division',
        title: '9/1 Infanteri Garis Depan (21 Width)',
        subtitle: '21W • Frontline Defense',
        tag: 'Template',
        addedAt: Date.now()
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('hoi4_war_room_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
  }, [favorites]);

  const toggleFavorite = (item: { id: string; type: FavoriteItem['type']; title: string; subtitle: string; tag?: string }) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === item.id);
      if (exists) {
        return prev.filter(f => f.id !== item.id);
      } else {
        return [
          ...prev,
          {
            id: item.id,
            type: item.type,
            title: item.title,
            subtitle: item.subtitle,
            tag: item.tag,
            addedAt: Date.now()
          }
        ];
      }
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (id: string): boolean => {
    return favorites.some(f => f.id === id);
  };

  // Track scroll position for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0f14] text-[#d8e2ea] flex flex-col font-sans selection:bg-[#d97706] selection:text-[#0a0f14]">
      {/* War Room Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        guideLevel={guideLevel}
        setGuideLevel={setGuideLevel}
        favoriteCount={favorites.length}
      />

      {/* Main Command & Tactical Screen */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:px-8 md:py-8">
        {activeTab === 'guides' && (
          <GuideViewer
            guides={GUIDES_DATA}
            guideLevel={guideLevel}
            searchQuery={searchQuery}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            onSelectLevel={setGuideLevel}
            onNavigateTab={(tab, query) => {
              setActiveTab(tab);
              if (query !== undefined) setSearchQuery(query);
            }}
          />
        )}

        {activeTab === 'division' && (
          <DivisionViewer
            searchQuery={searchQuery}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === 'focus_tree' && (
          <FocusTreeViewer
            searchQuery={searchQuery}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            initialCountryId={focusCountryId}
          />
        )}

        {activeTab === 'war_room' && (
          <WarRoomViewer
            searchQuery={searchQuery}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            onNavigateToFocus={(cId) => {
              setFocusCountryId(cId);
              setActiveTab('focus_tree');
            }}
          />
        )}

        {activeTab === 'commands' && (
          <ConsoleViewer
            searchQuery={searchQuery}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesViewer
            favorites={favorites}
            onRemoveFavorite={removeFavorite}
            onClearAll={clearAllFavorites}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}
      </main>

      {/* Back to top floating button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[#d97706]/60 bg-[#16212d] text-[#f59e0b] shadow-2xl hover:bg-[#202f40] hover:scale-105 transition-all"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* WWII Command Post Footer */}
      <footer className="border-t border-[#1a2533] bg-[#070b0f] py-8 text-center text-xs text-[#64748b]">
        <div className="max-w-7xl mx-auto px-4 space-y-2.5">
          <div className="flex items-center justify-center gap-2 text-sm text-[#94a3b8]">
            <Radio className="h-4 w-4 text-[#d97706]" />
            <span className="font-serif font-black tracking-wide text-[#f1f5f9] uppercase">
              Hearts of Iron IV Tactical War Room &amp; Command Registry
            </span>
          </div>
          <p className="text-[#94a3b8] max-w-2xl mx-auto">
            Panduan lengkap strategi militer PD II untuk pemain tingkat pemula, menengah, dan ahli. Dilengkapi meta template divisi darat, kalkulator batalion, analisis doktrin 7 negara besar, dan daftar kode konsol cheat bahasa Indonesia.
          </p>
          <div className="pt-2 text-[11px] text-[#475569] font-mono">
            Hearts of Iron IV &copy; Paradox Interactive AB. Panduan taktis komunitas untuk referensi strategi dan edukasi gameplay.
          </div>
        </div>
      </footer>
    </div>
  );
}
