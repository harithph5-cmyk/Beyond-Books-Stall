import React from 'react';
import { Volume2, VolumeX, QrCode, Lock, Maximize2, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/audio';

interface TopNavProps {
  onOpenLeads: () => void;
  onOpenQr: () => void;
  onReset: () => void;
  leadCount: number;
  isSoundMuted: boolean;
  onToggleSound: () => void;
  stage: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  onOpenLeads,
  onOpenQr,
  onReset,
  leadCount,
  isSoundMuted,
  onToggleSound,
  stage
}) => {
  const toggleFullscreen = () => {
    sounds.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header className="w-full border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              if (stage !== 'start') {
                if (window.confirm('Restart AI Test for next attendee?')) {
                  onReset();
                }
              }
            }}
            className="flex items-center gap-2.5 group focus-visible:outline-none"
            title="AI ARENA Home / Reset"
          >
            {/* Custom Glowing AI ARENA Brand Emblem */}
            <div className="relative w-9 h-9 rounded-lg bg-neutral-900 border border-emerald-500/40 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:border-emerald-400 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-cyan-500/20" />
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-emerald-400 group-hover:scale-105 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>

            <div className="flex flex-col text-left">
              <span className="text-base font-bold tracking-wider text-white font-display flex items-center gap-1.5">
                AI ARENA
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold">
                Stall Edition · Live
              </span>
            </div>
          </button>
        </div>

        {/* Center Indicators / Badges */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>BOOTH KIOSK READY</span>
          <span className="text-neutral-600">·</span>
          <span>5 QUESTIONS</span>
          <span className="text-neutral-600">·</span>
          <span>30 SECONDS</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Reset Button (Visible after start) */}
          {stage !== 'start' && (
            <button
              onClick={() => {
                sounds.playClick();
                if (window.confirm('Reset test for next stall player?')) {
                  onReset();
                }
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
              title="Next Player / Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Next Player</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sounds.playClick();
            }}
            className="p-2 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
            title={isSoundMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label="Toggle Sound"
          >
            {isSoundMuted ? (
              <VolumeX className="w-4 h-4 text-neutral-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>

          {/* QR Code to Play on Phone */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenQr();
            }}
            className="p-2 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
            title="Scan QR to play on phone"
            aria-label="Show QR Code"
          >
            <QrCode className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Fullscreen Kiosk Mode */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:block p-2 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
            title="Toggle Kiosk Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Lead Manager Vault (Password Protected) */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenLeads();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.1)] cursor-pointer"
            title="Stall Lead Vault (Password Protected)"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Leads</span>
            <span className="font-mono bg-emerald-500/20 px-1.5 py-0.5 rounded text-[11px] font-bold text-emerald-300">
              {leadCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
