import React, { useState } from 'react';
import { X, Download, Trash2, Search, Database, Users, PlusCircle, Lock, Unlock, Eye, EyeOff, ShieldAlert, KeyRound } from 'lucide-react';
import { LeadData } from '../types';
import { clearStoredLeads, exportLeadsToCSV, seedDemoLeads } from '../utils/storage';
import { sounds } from '../utils/audio';

interface StallLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadData[];
  onRefreshLeads: () => void;
}

const DEFAULT_PASSWORDS = ['arena2026', '8888'];

export const StallLeadsModal: React.FC<StallLeadsModalProps> = ({
  isOpen,
  onClose,
  leads,
  onRefreshLeads
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false);

  // Table filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInterest, setFilterInterest] = useState('all');

  if (!isOpen) return null;

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = passwordInput.trim().toLowerCase();

    // Check against default passwords or any custom configured PIN
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

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      (lead.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.whatsappNumber || '').includes(searchTerm) ||
      (lead.college || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.department || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.personaName || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesInterest =
      filterInterest === 'all' || lead.careerInterest === filterInterest;

    return matchesSearch && matchesInterest;
  });

  const handleExport = () => {
    sounds.playSelect();
    exportLeadsToCSV(leads);
  };

  const handleClear = () => {
    sounds.playClick();
    if (window.confirm('Are you sure you want to clear all stored stall leads? Make sure you have exported CSV first!')) {
      clearStoredLeads();
      onRefreshLeads();
    }
  };

  const handleSeed = () => {
    sounds.playClick();
    seedDemoLeads();
    onRefreshLeads();
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
            Lead Vault Locked
          </h2>
          <p className="text-xs text-neutral-400 mb-6">
            Enter the stall organizer passcode or 4-digit PIN to access attendee leads.
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
              <span>Unlock Lead Vault</span>
            </button>
          </form>

          {/* Organizer hint */}
          <div className="mt-5 p-3 rounded-lg bg-neutral-950/80 border border-neutral-800/80 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-neutral-500">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              Master Passcode:
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
        /* Authenticated -> Show Full Lead Vault */
        <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white font-display">
                    Stall Lead Vault · AI ARENA
                  </h2>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold border border-emerald-500/30">
                    UNLOCKED
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-mono">
                  {leads.length} total attendees registered at this booth
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                disabled={leads.length === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition-colors disabled:opacity-40"
                title="Export to CSV Spreadsheet"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              {/* Re-lock Button */}
              <button
                onClick={handleLockAgain}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-amber-400 text-xs font-medium hover:bg-neutral-750 transition-colors"
                title="Lock Vault Now"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock Vault</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  handleLockAgain();
                  onClose();
                }}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Close and Lock"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-neutral-950/60 border-b border-neutral-800/80">
            <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Total Plays</span>
              <span className="text-xl font-bold font-mono text-white">{leads.length}</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Unique Colleges</span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {new Set(leads.map((l) => l.college.toLowerCase().trim()).filter(Boolean)).size}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">WhatsApp Verified</span>
              <span className="text-xl font-bold font-mono text-cyan-400">
                {leads.filter((l) => l.whatsappNumber).length}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Stall Conversion</span>
              <span className="text-xl font-bold font-mono text-amber-400">100%</span>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="p-4 border-b border-neutral-800 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, college, WhatsApp or persona..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="w-full sm:w-auto">
              <select
                value={filterInterest}
                onChange={(e) => setFilterInterest(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Interests</option>
                <option value="AI & Generative AI">AI & Gen AI</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Full Stack Development">Full Stack</option>
                <option value="Data Analytics">Data Analytics</option>
              </select>
            </div>
          </div>

          {/* Table Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                <p className="text-sm text-neutral-400 font-medium">No attendee leads found</p>
                <p className="text-xs text-neutral-600 mt-1">
                  Attendees will appear here once they complete the 5-question test.
                </p>
                {leads.length === 0 && (
                  <button
                    onClick={handleSeed}
                    className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-xs text-neutral-300 hover:text-white cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Load Sample Test Leads</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 font-mono uppercase">
                      <th className="pb-2.5 font-semibold">Name & Contact</th>
                      <th className="pb-2.5 font-semibold">College / Dept</th>
                      <th className="pb-2.5 font-semibold">Year</th>
                      <th className="pb-2.5 font-semibold">Persona Match</th>
                      <th className="pb-2.5 font-semibold">Career Interest</th>
                      <th className="pb-2.5 font-semibold">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-neutral-800/30 transition-colors">
                        <td className="py-3">
                          <div className="font-semibold text-white">{lead.fullName}</div>
                          <div className="font-mono text-emerald-400 text-[11px]">
                            {lead.whatsappNumber}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="text-neutral-200">{lead.college}</div>
                          <div className="text-neutral-500 text-[11px]">{lead.department}</div>
                        </td>
                        <td className="py-3 text-neutral-300 font-mono">
                          {lead.yearOfStudy.split(' ')[0]}
                        </td>
                        <td className="py-3">
                          <span className="font-mono px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 text-[11px]">
                            {lead.personaName}
                          </span>
                        </td>
                        <td className="py-3 text-neutral-300 font-medium">
                          {lead.careerInterest}
                        </td>
                        <td className="py-3 font-mono text-neutral-500 text-[11px]">
                          {new Date(lead.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs">
            <span className="text-neutral-500 font-mono">
              Lead Vault is auto-locked when closed · Passcode: arena2026 / 8888
            </span>

            {leads.length > 0 && (
              <button
                onClick={handleClear}
                className="text-neutral-500 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Database</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
