import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Radio, Volume2, VolumeX, History, Bell, BellOff, RefreshCw,
  X, Check, Settings2, ShieldAlert, Sparkles, ChevronUp, ChevronDown,
  Layers, ExternalLink, Filter, HelpCircle
} from 'lucide-react';
import { CommandPostAlert, COMMAND_POST_ALERTS } from '../data/commandPostAlertsData';
import { CommandPostToast } from './CommandPostToast';
import { ambientAudio } from '../utils/ambientAudio';

interface CommandPostNotificationManagerProps {
  onNavigateTab: (tab: string) => void;
  currentTab?: string;
}

interface CommandPostSettings {
  enabled: boolean;
  intervalSeconds: number; // 30, 45, 60, 90
  soundEnabled: boolean;
  categoryFilter: 'all' | 'resources' | 'naval' | 'logistics';
}

const DEFAULT_SETTINGS: CommandPostSettings = {
  enabled: true,
  intervalSeconds: 60,
  soundEnabled: true,
  categoryFilter: 'all'
};

const STORAGE_KEY = 'hoi4_command_post_settings';
const ARCHIVE_KEY = 'hoi4_command_post_archive';

export const CommandPostNotificationManager: React.FC<CommandPostNotificationManagerProps> = ({
  onNavigateTab,
  currentTab
}) => {
  // Load settings from localStorage
  const [settings, setSettings] = useState<CommandPostSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [activeAlerts, setActiveAlerts] = useState<CommandPostAlert[]>([]);
  const [archive, setArchive] = useState<CommandPostAlert[]>(() => {
    try {
      const saved = localStorage.getItem(ARCHIVE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isArchiveOpen, setIsArchiveOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [nextDispatchCountdown, setNextDispatchCountdown] = useState<number>(settings.intervalSeconds);
  const lastAlertIndexRef = useRef<number>(-1);

  // Save settings on update
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  // Save archive on update
  useEffect(() => {
    try {
      localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archive.slice(0, 30)));
    } catch (e) {
      console.error(e);
    }
  }, [archive]);

  // Function to trigger a new alert
  const dispatchAlert = useCallback((category?: string) => {
    let pool = COMMAND_POST_ALERTS;
    if (category && category !== 'all') {
      pool = pool.filter((a) => a.category === category);
    } else if (settings.categoryFilter !== 'all') {
      pool = pool.filter((a) => a.category === settings.categoryFilter);
    }

    if (pool.length === 0) pool = COMMAND_POST_ALERTS;

    // Pick next alert avoiding immediate repetition
    let nextIdx = Math.floor(Math.random() * pool.length);
    if (nextIdx === lastAlertIndexRef.current && pool.length > 1) {
      nextIdx = (nextIdx + 1) % pool.length;
    }
    lastAlertIndexRef.current = nextIdx;

    const chosenAlert = pool[nextIdx];
    const alertInstance: CommandPostAlert = {
      ...chosenAlert,
      id: `${chosenAlert.id}-${Date.now()}`
    };

    // Max 2 active toasts at a time on screen to prevent clutter
    setActiveAlerts((prev) => [alertInstance, ...prev.slice(0, 1)]);

    // Add to archive
    setArchive((prev) => [alertInstance, ...prev.filter((p) => p.id !== alertInstance.id)].slice(0, 40));

    // Reset countdown
    setNextDispatchCountdown(settings.intervalSeconds);
  }, [settings.categoryFilter, settings.intervalSeconds]);

  // Periodic Timer loop
  useEffect(() => {
    if (!settings.enabled) return;

    let remaining = settings.intervalSeconds;
    setNextDispatchCountdown(remaining);

    const intervalId = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        remaining = settings.intervalSeconds;
        setNextDispatchCountdown(remaining);
        dispatchAlert();
      } else {
        setNextDispatchCountdown(remaining);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [settings.enabled, settings.intervalSeconds, dispatchAlert]);

  // Initial trigger after 3 seconds on first launch if active alerts is empty
  useEffect(() => {
    if (settings.enabled && activeAlerts.length === 0 && archive.length === 0) {
      const timer = setTimeout(() => {
        dispatchAlert();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [settings.enabled, dispatchAlert, activeAlerts.length, archive.length]);

  const handleDismiss = useCallback((alertId: string) => {
    setActiveAlerts((prev) => prev.filter((a) => a.id !== alertId));
  }, []);

  const handleClearArchive = () => {
    setArchive([]);
    try {
      localStorage.removeItem(ARCHIVE_KEY);
    } catch {}
  };

  return (
    <>
      {/* ================= TOASTS CONTAINER (Bottom Right) ================= */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2.5 max-w-full pointer-events-none px-2 sm:px-0">
        {/* Floating Mini Command Post Control Bar */}
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-lg border border-[#37493c] bg-[#0c140f]/95 px-2.5 py-1.5 text-xs text-[#cbd5e1] shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-300">
            <Radio className={`h-3.5 w-3.5 ${settings.enabled ? 'text-emerald-400 animate-pulse' : 'text-zinc-500'}`} />
            <span className="font-bold hidden sm:inline">POS KOMANDO:</span>
          </div>

          {/* Status badge & Countdown */}
          {settings.enabled ? (
            <span
              className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded cursor-pointer"
              onClick={() => setIsSettingsOpen(true)}
              title="Klik untuk ubah frekuensi atau jeda"
            >
              Kawat: {nextDispatchCountdown}s
            </span>
          ) : (
            <span
              className="font-mono text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-700 px-1.5 py-0.5 rounded cursor-pointer"
              onClick={() => setSettings((s) => ({ ...s, enabled: true }))}
            >
              Nonaktif
            </span>
          )}

          {/* Quick Manual Dispatch Button */}
          <button
            onClick={() => dispatchAlert()}
            title="Kirim Kawat Baru Sekarang (Manual Dispatch)"
            className="flex items-center gap-1 rounded bg-[#17251c] hover:bg-[#23382b] border border-[#34483a] text-amber-300 px-2 py-0.5 font-mono text-[10px] transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Kawat Baru</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }));
              if (!settings.soundEnabled) {
                ambientAudio.triggerRadioSquelch();
              }
            }}
            title={settings.soundEnabled ? 'Matikan Suara Kawat' : 'Nyalakan Suara Kawat'}
            className="p-1 rounded text-[#94a3b8] hover:text-white hover:bg-[#1a291f] transition-colors"
          >
            {settings.soundEnabled ? (
              <Volume2 className="h-3.5 w-3.5 text-amber-400" />
            ) : (
              <VolumeX className="h-3.5 w-3.5 text-zinc-500" />
            )}
          </button>

          {/* Archive / History Drawer Toggle */}
          <button
            onClick={() => setIsArchiveOpen(true)}
            title={`Arsip Kawat Telegram (${archive.length})`}
            className="flex items-center gap-1 p-1 rounded text-[#94a3b8] hover:text-white hover:bg-[#1a291f] transition-colors relative"
          >
            <History className="h-3.5 w-3.5 text-amber-300" />
            {archive.length > 0 && (
              <span className="font-mono text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded border border-amber-500/40">
                {archive.length}
              </span>
            )}
          </button>

          {/* Settings Modal Toggle */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            title="Pengaturan Pos Komando"
            className="p-1 rounded text-[#94a3b8] hover:text-white hover:bg-[#1a291f] transition-colors"
          >
            <Settings2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Active Toast Stack */}
        <div className="pointer-events-auto flex flex-col gap-2.5 w-full items-end">
          {activeAlerts.map((alert) => (
            <CommandPostToast
              key={alert.id}
              alert={alert}
              onDismiss={handleDismiss}
              onNavigate={onNavigateTab}
              soundEnabled={settings.soundEnabled}
            />
          ))}
        </div>
      </div>

      {/* ================= ARCHIVE MODAL / DRAWER ================= */}
      {isArchiveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-2xl rounded-xl border-2 border-[#b8860b]/70 bg-gradient-to-b from-[#141d16] via-[#101712] to-[#0c120e] text-[#f1f5f9] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            style={{
              boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 20px rgba(245,158,11,0.2)'
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#2b3a30] bg-[#0c140f]">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300">
                  <History className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#fef3c7] uppercase tracking-wide">
                    Arsip Kawat Telegram Markas Komando
                  </h3>
                  <p className="text-xs text-[#94a3b8]">
                    Semua arahan taktis mengenai manajemen sumber daya dan positioning armada laut
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsArchiveOpen(false)}
                className="p-1.5 rounded text-[#94a3b8] hover:text-white hover:bg-[#1a281f] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Archive List Body */}
            <div className="p-5 overflow-y-auto space-y-3 flex-1">
              {archive.length === 0 ? (
                <div className="text-center py-12 text-[#64748b]">
                  <Radio className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="font-mono text-sm">Belum ada kawat telegram yang diterima.</p>
                  <button
                    onClick={() => {
                      dispatchAlert();
                      setIsArchiveOpen(false);
                    }}
                    className="mt-3 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 px-3 py-1 text-xs font-mono text-amber-300"
                  >
                    Kirim Kawat Pertama Sekarang
                  </button>
                </div>
              ) : (
                archive.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="rounded-lg border border-[#2b3a30] bg-[#0f1712] p-3.5 space-y-2 hover:border-amber-400/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30 bg-amber-950/60 text-amber-300">
                            {item.codeName}
                          </span>
                          <span className="text-[10px] font-mono text-[#64748b]">
                            {item.sender}
                          </span>
                        </div>
                        <h4 className="font-serif text-sm font-bold text-[#fef3c7]">
                          {item.title}
                        </h4>
                      </div>

                      {item.actionLabel && item.targetTab && (
                        <button
                          onClick={() => {
                            onNavigateTab(item.targetTab!);
                            setIsArchiveOpen(false);
                          }}
                          className="flex items-center gap-1 rounded bg-amber-500/10 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 px-2 py-1 text-xs font-mono transition-colors shrink-0"
                        >
                          <span>{item.actionLabel}</span>
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-[#cbd5e1] leading-relaxed">
                      {item.message}
                    </p>

                    {item.details && item.details.length > 0 && (
                      <div className="pt-2 border-t border-[#1e2a21] space-y-1">
                        {item.details.map((d, dIdx) => (
                          <div key={dIdx} className="text-[11px] text-[#94a3b8] flex items-start gap-1.5">
                            <span className="text-amber-400">•</span>
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Archive Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-[#2b3a30] bg-[#0c140f] text-xs">
              <span className="text-[#64748b] font-mono">
                Total Arsip: {archive.length} kawat
              </span>

              <div className="flex items-center gap-2">
                {archive.length > 0 && (
                  <button
                    onClick={handleClearArchive}
                    className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors"
                  >
                    Kosongkan Arsip
                  </button>
                )}
                <button
                  onClick={() => setIsArchiveOpen(false)}
                  className="rounded bg-[#1e2c22] hover:bg-[#2c4032] border border-[#34483a] px-3 py-1 font-mono text-amber-300 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SETTINGS MODAL ================= */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-md rounded-xl border-2 border-[#b8860b]/70 bg-gradient-to-b from-[#141d16] via-[#101712] to-[#0c120e] text-[#f1f5f9] shadow-2xl overflow-hidden"
            style={{
              boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 20px rgba(245,158,11,0.2)'
            }}
          >
            {/* Settings Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2b3a30] bg-[#0c140f]">
              <div className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-amber-300" />
                <h3 className="font-serif text-sm font-bold text-[#fef3c7] uppercase">
                  Konfigurasi Pos Komando (Command Post)
                </h3>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 rounded text-[#94a3b8] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Settings Options */}
            <div className="p-4 space-y-4 text-xs">
              {/* Enable / Disable */}
              <div className="flex items-center justify-between border-b border-[#223026] pb-3">
                <div>
                  <div className="font-bold text-[#fef3c7]">Aktifkan Peringatan Berkala</div>
                  <div className="text-[#94a3b8] text-[11px]">
                    Kirim kawat tips strategi secara berkala saat menjelajahi tab
                  </div>
                </div>
                <button
                  onClick={() => setSettings((s) => ({ ...s, enabled: !s.enabled }))}
                  className={`rounded-full px-3 py-1 font-mono text-[11px] font-bold transition-colors ${
                    settings.enabled
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-600'
                  }`}
                >
                  {settings.enabled ? 'AKTIF' : 'NONAKTIF'}
                </button>
              </div>

              {/* Interval Selection */}
              <div className="space-y-1.5 border-b border-[#223026] pb-3">
                <div className="font-bold text-[#fef3c7]">Frekuensi Interval Pengiriman:</div>
                <div className="grid grid-cols-4 gap-2">
                  {[30, 45, 60, 90].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => setSettings((s) => ({ ...s, intervalSeconds: sec }))}
                      className={`rounded py-1.5 text-center font-mono text-xs font-bold border transition-colors ${
                        settings.intervalSeconds === sec
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                          : 'bg-[#121c15] border-[#2b3a30] text-[#94a3b8] hover:text-white'
                      }`}
                    >
                      {sec} Detik
                    </button>
                  ))}
                </div>
              </div>

              {/* Sound Option */}
              <div className="flex items-center justify-between border-b border-[#223026] pb-3">
                <div>
                  <div className="font-bold text-[#fef3c7]">Efek Suara Teletype / Radio</div>
                  <div className="text-[#94a3b8] text-[11px]">
                    Bunyikan suara radio squelch atau teletype saat kawat masuk
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }));
                    if (!settings.soundEnabled) ambientAudio.triggerRadioSquelch();
                  }}
                  className={`rounded-full px-3 py-1 font-mono text-[11px] font-bold transition-colors ${
                    settings.soundEnabled
                      ? 'bg-amber-950 text-amber-300 border border-amber-500'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-600'
                  }`}
                >
                  {settings.soundEnabled ? 'SUARA ON' : 'MUTE'}
                </button>
              </div>

              {/* Category Filter */}
              <div className="space-y-1.5">
                <div className="font-bold text-[#fef3c7]">Prioritas Kategori Tips:</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'all', label: 'Semua Kategori' },
                    { id: 'resources', label: 'Manajemen Sumber Daya' },
                    { id: 'naval', label: 'Posisi Maritim & Armada' },
                    { id: 'logistics', label: 'Logistik & Suplai' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() =>
                        setSettings((s) => ({
                          ...s,
                          categoryFilter: cat.id as any
                        }))
                      }
                      className={`rounded py-1.5 px-2 text-left font-mono text-[11px] border transition-colors ${
                        settings.categoryFilter === cat.id
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-[#121c15] border-[#2b3a30] text-[#94a3b8] hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Settings Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#2b3a30] bg-[#0c140f]">
              <button
                onClick={() => {
                  dispatchAlert();
                  setIsSettingsOpen(false);
                }}
                className="rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 px-3 py-1 font-mono text-xs"
              >
                Uji Kawat Sekarang
              </button>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="rounded bg-[#1e2c22] hover:bg-[#2c4032] border border-[#34483a] text-white px-3 py-1 font-mono text-xs"
              >
                Simpan &amp; Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
