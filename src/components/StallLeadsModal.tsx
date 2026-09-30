import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  ShieldAlert,
  KeyRound,
  ExternalLink,
  Sheet,
  Check,
  Globe,
  Database,
  Users,
  CheckCircle,
  Sparkles,
  Phone
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { GOOGLE_FORM_URL, getOrganizerPhone, setOrganizerPhone } from '../utils/storage';
import { PERSONAS } from '../data/personas';

interface StallLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads?: any[];
  onRefreshLeads?: () => void;
}

const DEFAULT_PASSWORDS = ['arena2026', '8888'];

export const StallLeadsModal: React.FC<StallLeadsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false);

  // Settings State
  const [organizerPhoneInput, setOrganizerPhoneInput] = useState('');
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOrganizerPhoneInput(getOrganizerPhone());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = passwordInput.trim().toLowerCase();

    const customPin = localStorage.getItem('ai_arena_custom_pin')?.toLowerCase();
    const isCorrect =
      DEFAULT_PASSWORDS.includes(trimmed) ||
      (customPin && trimmed === customPin);

    if (isCorrect) {
      sounds.playFanfare();
      setIsAuthenticated(true);
      setErrorMessage('');
    } else {
      sounds.playClick();
      setErrorMessage('Incorrect passcode. Access denied.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleLockAgain = () => {
    sounds.playClick();
    setIsAuthenticated(false);
    setPasswordInput('');
    setErrorMessage('');
  };

  const handleKeypadPress = (val: string) => {
    sounds.playClick();
    if (val === 'clear') {
      setPasswordInput('');
      setErrorMessage('');
    } else {
      setPasswordInput((prev) => prev + val);
    }
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSelect();
    setOrganizerPhone(organizerPhoneInput);
    setSavedSettingsSuccess(true);
    setTimeout(() => setSavedSettingsSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      {/* If Not Authenticated -> Show Passcode Gate */}
      {!isAuthenticated ? (
        <div
          className={`relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-center transition-all ${
            shake ? 'animate-shake' : ''
          }`}
        >
          {/* Close button */}
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Glowing Shield Icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            <Lock className="w-8 h-8" />
          </div>

          <div className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-400 font-mono text-[10px] uppercase tracking-widest mb-2">
            STALL ORGANIZER ONLY
          </div>

          <h2 className="text-2xl font-bold text-white font-display mb-1">
            Organizer Desk Locked
          </h2>
          <p className="text-xs text-neutral-400 mb-6">
            Enter passcode or 4-digit PIN to access the Google Forms lead hub.
          </p>

          {/* Form */}
          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Enter password or PIN..."
                autoFocus
                className="w-full px-4 py-3.5 pr-11 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-white placeholder-neutral-600 font-mono text-center tracking-wider text-base focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-400 flex items-center justify-center gap-1.5 font-mono">
                <ShieldAlert className="w-3.5 h-3.5" />
                {errorMessage}
              </p>
            )}

            {/* Quick Touch Keypad for Tablets & Booth Screens */}
            <div className="pt-2">
              <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto mb-3">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0'].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    onClick={() => handleKeypadPress(digit)}
                    className={`py-2 rounded-lg font-mono text-sm font-semibold transition-colors ${
                      digit === 'clear'
                        ? 'bg-neutral-800/80 text-rose-400 hover:bg-neutral-800 text-xs'
                        : 'bg-neutral-950/80 text-white hover:bg-neutral-800 border border-neutral-800'
                    }`}
                  >
                    {digit === 'clear' ? 'CLR' : digit}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleUnlock()}
                  className="py-2 rounded-lg font-mono text-xs font-bold bg-amber-500 text-black hover:bg-amber-400 transition-colors"
                >
                  OK
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-neutral-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Organizer Desk</span>
            </button>
          </form>

          {/* Organizer hint */}
          <div className="mt-5 p-3 rounded-lg bg-neutral-950/80 border border-neutral-800/80 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-neutral-500">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              Passcode:
            </span>
            <span className="font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              arena2026
            </span>
            <span className="text-neutral-500">or PIN:</span>
            <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              8888
            </span>
          </div>
        </div>
      ) : (
        /* Authenticated -> Organizer Google Forms Lead Desk */
        <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white font-display">
                    Stall Lead Desk · Google Forms
                  </h2>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold border border-emerald-500/30">
                    UNLOCKED
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-mono">
                  Official Google Forms Cloud System · Permanent & Zero Dropouts
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLockAgain}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-amber-400 text-xs font-medium hover:bg-neutral-750 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock Desk</span>
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  handleLockAgain();
                  onClose();
                }}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Primary Action Card: Open Google Form & Responses */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-neutral-900 to-cyan-500/10 border border-emerald-500/30 shadow-lg">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2.5">
                  <Sheet className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    Official Stall Google Form
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-bold border border-emerald-500/40">
                  LIVE AT BOOTH
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 mb-4 leading-relaxed">
                All attendee form submissions from every phone land directly and permanently into your Google Form and its connected Google Sheet.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs sm:text-sm font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Live Google Form ↗</span>
                </a>

                <a
                  href="https://docs.google.com/forms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-neutral-200 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Sheet className="w-4 h-4 text-emerald-400" />
                  <span>Google Forms Dashboard & Responses ↗</span>
                </a>
              </div>
            </div>

            {/* Collected Fields Breakdown */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                Collected Lead Fields (Matches Your Google Form)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-neutral-300">
                <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Full Name</span>
                </div>
                <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </div>
                <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>College</span>
                </div>
                <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Department</span>
                </div>
                <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Year of Study</span>
                </div>
                <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Career Interest</span>
                </div>
                <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex items-center gap-1.5 col-span-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Assigned AI Persona</span>
                </div>
              </div>
            </div>

            {/* Optional Coordinator WhatsApp Phone */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-neutral-300 uppercase">
                  Stall Coordinator WhatsApp Phone
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Optionally enter your stall coordinator number so attendees can send direct WhatsApp confirmations to your desk.
              </p>
              <form onSubmit={handleSavePhone} className="flex gap-2">
                <input
                  type="text"
                  value={organizerPhoneInput}
                  onChange={(e) => setOrganizerPhoneInput(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                  Save
                </button>
              </form>
              {savedSettingsSuccess && (
                <span className="text-xs font-mono text-emerald-400 block">
                  ✓ Coordinator phone saved!
                </span>
              )}
            </div>

            {/* 6 Archetypes Quick Reference */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                6 Archetypes in the Arena
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.values(PERSONAS).map((p) => (
                  <div key={p.id} className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-left">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{p.emoji}</span>
                      <span>{p.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">{p.code}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>Google Forms Active · Zero database dependencies</span>
            <span className="text-emerald-400">Security Gate Active</span>
          </div>
        </div>
      )}
    </div>
  );
};
