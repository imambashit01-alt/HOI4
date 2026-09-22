import React, { useState, useEffect, useRef } from 'react';
import {
  Radio, Compass, Box, AlertTriangle, CheckCircle2, ChevronRight,
  X, Volume2, VolumeX, ExternalLink, Shield, Fuel, Anchor, Sparkles
} from 'lucide-react';
import { CommandPostAlert } from '../data/commandPostAlertsData';
import { ambientAudio } from '../utils/ambientAudio';

interface CommandPostToastProps {
  alert: CommandPostAlert;
  onDismiss: (id: string) => void;
  onNavigate?: (tab: string) => void;
  soundEnabled?: boolean;
}

export const CommandPostToast: React.FC<CommandPostToastProps> = ({
  alert,
  onDismiss,
  onNavigate,
  soundEnabled = true
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(100);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const onDismissRef = useRef(onDismiss);
  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  // Trigger sound effect on appearance
  useEffect(() => {
    if (soundEnabled) {
      try {
        // Use radio squelch or typewriter burst
        if (alert.priority === 'urgent') {
          ambientAudio.triggerRadioSquelch();
        } else {
          ambientAudio.triggerTypewriterBurst();
        }
      } catch (e) {
        // Audio context may require user interaction
      }
    }
  }, [alert.id, soundEnabled, alert.priority]);

  // Auto-dismiss countdown (14 seconds default if not hovered/paused)
  useEffect(() => {
    if (isPaused) return;

    const duration = 14000;
    const interval = 100;
    let remainingTime = duration;

    const timer = setInterval(() => {
      remainingTime -= interval;
      const pct = Math.max(0, (remainingTime / duration) * 100);
      setProgress(pct);

      if (remainingTime <= 0) {
        clearInterval(timer);
        onDismissRef.current(alert.id);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, alert.id]);

  const getCategoryIcon = () => {
    switch (alert.category) {
      case 'naval':
        return <Anchor className="h-4 w-4 text-cyan-400" />;
      case 'resources':
        return <Fuel className="h-4 w-4 text-amber-400" />;
      case 'logistics':
        return <Box className="h-4 w-4 text-emerald-400" />;
      default:
        return <Radio className="h-4 w-4 text-amber-300" />;
    }
  };

  const getCategoryBadge = () => {
    switch (alert.category) {
      case 'naval':
        return {
          label: 'POSISI MARITIM',
          border: 'border-cyan-500/40',
          bg: 'bg-cyan-950/80',
          text: 'text-cyan-300'
        };
      case 'resources':
        return {
          label: 'SUMBER DAYA',
          border: 'border-amber-500/40',
          bg: 'bg-amber-950/80',
          text: 'text-amber-300'
        };
      case 'logistics':
        return {
          label: 'LOGISTIK TEMPUR',
          border: 'border-emerald-500/40',
          bg: 'bg-emerald-950/80',
          text: 'text-emerald-300'
        };
      default:
        return {
          label: 'TAKTIS UMUM',
          border: 'border-zinc-500/40',
          bg: 'bg-zinc-900/80',
          text: 'text-zinc-300'
        };
    }
  };

  const badge = getCategoryBadge();

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="group relative w-full sm:w-[420px] rounded-xl border-2 border-[#b8860b]/70 bg-gradient-to-b from-[#131b15] via-[#0f1611] to-[#0a100c] text-[#f1f5f9] shadow-2xl overflow-hidden transition-all duration-300 hover:border-amber-400 animate-in slide-in-from-right-8"
      style={{
        boxShadow: '0 10px 30px rgba(0,0,0,0.85), 0 0 15px rgba(245,158,11,0.15)'
      }}
    >
      {/* Top Countdown Progress Bar */}
      <div className="h-1 w-full bg-[#1e2a22]">
        <div
          className={`h-full transition-all duration-100 ease-linear ${
            alert.priority === 'urgent'
              ? 'bg-gradient-to-r from-red-600 via-amber-500 to-red-600'
              : 'bg-gradient-to-r from-amber-600 to-amber-400'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header bar of Toast */}
      <div className="flex items-center justify-between gap-2 px-3.5 py-2 border-b border-[#243329] bg-[#0c140f]/95">
        <div className="flex items-center gap-2">
          {/* Pulsing Alert Light */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
          </span>

          <span
            className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${badge.border} ${badge.bg} ${badge.text}`}
          >
            {badge.label}
          </span>

          <span className="font-mono text-[10px] text-[#94a3b8] tracking-wider truncate max-w-[130px]">
            {alert.codeName}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Pause status indicator */}
          {isPaused && (
            <span className="text-[9px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-600/40">
              Jeda
            </span>
          )}

          {/* Dismiss Button */}
          <button
            onClick={() => onDismiss(alert.id)}
            className="p-1 rounded text-[#94a3b8] hover:text-white hover:bg-[#1e2c22] transition-colors"
            title="Tutup Kawat Ini"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Toast Body */}
      <div className="p-3.5 space-y-2">
        {/* Title & Sender */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-serif text-sm font-bold text-[#fef3c7] leading-snug">
              {alert.title}
            </h4>
            <div className="p-1 rounded bg-[#16221a] border border-[#2d4033] text-amber-300">
              {getCategoryIcon()}
            </div>
          </div>
          <p className="text-[10px] font-mono text-[#64748b] mt-0.5">
            Dari: {alert.sender}
          </p>
        </div>

        {/* Message Core */}
        <p className="text-xs text-[#cbd5e1] leading-relaxed">
          {alert.message}
        </p>

        {/* Expandable Tactical Details */}
        {isExpanded && alert.details && alert.details.length > 0 && (
          <div className="mt-2.5 pt-2.5 border-t border-[#1e2a22] space-y-1.5 bg-[#0a110d]/70 rounded p-2 text-xs">
            <div className="text-[10px] font-mono font-semibold uppercase text-amber-400 flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Direktif Komando Mendalam:
            </div>
            <ul className="space-y-1">
              {alert.details.map((d, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-[11px] text-[#94a3b8]">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#1c2720]">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] font-mono text-amber-300/90 hover:text-amber-200 flex items-center gap-1 underline-offset-2 hover:underline transition-colors"
          >
            {isExpanded ? 'Sembunyikan Arahan' : 'Lihat Arahan Detail'}
          </button>

          {alert.actionLabel && alert.targetTab && onNavigate && (
            <button
              onClick={() => {
                onNavigate(alert.targetTab!);
                onDismiss(alert.id);
              }}
              className="flex items-center gap-1 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 px-2.5 py-1 text-xs font-mono font-medium transition-all hover:border-amber-400"
            >
              <span>{alert.actionLabel}</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
