import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Trash2,
  Search,
  Database,
  Users,
  PlusCircle,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  ShieldAlert,
  KeyRound,
  RefreshCw,
  Settings,
  Sheet,
  Check,
  Copy,
  Upload,
  Globe
} from 'lucide-react';
import { LeadData } from '../types';
import {
  clearStoredLeads,
  exportLeadsToCSV,
  seedDemoLeads,
  getWebhookUrl,
  setWebhookUrl,
  getOrganizerPhone,
  setOrganizerPhone,
  importLeadFromCode,
  syncLeadsWithServer
} from '../utils/storage';
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

  // View tabs inside unlocked vault: 'leads' | 'settings' | 'import'
  const [activeTab, setActiveTab] = useState<'leads' | 'settings' | 'import'>('leads');
  const [isSyncing, setIsSyncing] = useState(false);

  // Settings State
  const [webhookInput, setWebhookInput] = useState('');
  const [organizerPhoneInput, setOrganizerPhoneInput] = useState('');
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  // Import State
  const [importCodeInput, setImportCodeInput] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Table filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInterest, setFilterInterest] = useState('all');

  useEffect(() => {
    if (isOpen) {
      setWebhookInput(getWebhookUrl());
      setOrganizerPhoneInput(getOrganizerPhone());
    }
  }, [isOpen]);

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
    setActiveTab('leads');
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

  const handleTriggerSync = async () => {
    sounds.playClick();
    setIsSyncing(true);
    try {
      await syncLeadsWithServer();
      onRefreshLeads();
    } catch {
      //
    } finally {
      setTimeout(() => setIsSyncing(false), 600);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSelect();
    setWebhookUrl(webhookInput);
    setOrganizerPhone(organizerPhoneInput);
    setSavedSettingsSuccess(true);
    setTimeout(() => setSavedSettingsSuccess(false), 2500);
  };

  const handleManualImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importCodeInput.trim()) return;
    const ok = importLeadFromCode(importCodeInput.trim());
    if (ok) {
      sounds.playFanfare();
      setImportStatus('success');
      setImportCodeInput('');
      onRefreshLeads();
      setTimeout(() => {
        setImportStatus('idle');
        setActiveTab('leads');
      }, 1500);
    } else {
      sounds.playClick();
      setImportStatus('error');
    }
  };

  const handleCopyGoogleScript = () => {
    sounds.playClick();
    const script = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.fullName,
    data.whatsappNumber,
    data.college,
    data.department,
    data.yearOfStudy,
    data.careerInterest,
    data.personaName
  ]);
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}`;
    navigator.clipboard.writeText(script);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
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
    if (
      window.confirm(
        'Are you sure you want to clear all stored stall leads? Make sure you have exported CSV first!'
      )
    ) {
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
        /* Authenticated -> Show Full Lead Vault with Cloud Sync Tabs */
        <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3">
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
                  {leads.length} leads registered · Multi-phone sync active
                </p>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-2">
              {/* Live Sync Button */}
              <button
                onClick={handleTriggerSync}
                disabled={isSyncing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-750 transition-colors"
                title="Sync leads from server & mobile submissions"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSyncing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
              </button>

              <button
                onClick={handleExport}
                disabled={leads.length === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition-colors disabled:opacity-40"
                title="Export to CSV Spreadsheet"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              {/* Re-lock Button */}
              <button
                onClick={handleLockAgain}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-amber-400 text-xs font-medium hover:bg-neutral-750 transition-colors"
                title="Lock Vault Now"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock</span>
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

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-1 px-4 py-2 border-b border-neutral-800 bg-neutral-950/40 text-xs font-mono">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
                activeTab === 'leads'
                  ? 'bg-neutral-800 text-emerald-400 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Attendees ({leads.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
                activeTab === 'settings'
                  ? 'bg-neutral-800 text-cyan-400 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Sheets & Cloud Sync</span>
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
                activeTab === 'import'
                  ? 'bg-neutral-800 text-amber-400 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Manual Pass Import</span>
            </button>
          </div>

          {/* TAB 1: LEADS TABLE */}
          {activeTab === 'leads' && (
            <>
              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-neutral-950/60 border-b border-neutral-800/80">
                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-500 block">
                    Total Plays
                  </span>
                  <span className="text-xl font-bold font-mono text-white">{leads.length}</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-500 block">
                    Unique Colleges
                  </span>
                  <span className="text-xl font-bold font-mono text-emerald-400">
                    {
                      new Set(leads.map((l) => l.college.toLowerCase().trim()).filter(Boolean))
                        .size
                    }
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-500 block">
                    WhatsApp Verified
                  </span>
                  <span className="text-xl font-bold font-mono text-cyan-400">
                    {leads.filter((l) => l.whatsappNumber).length}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-500 block">
                    Vercel API Status
                  </span>
                  <span className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE · /api/leads
                  </span>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="p-3 sm:p-4 border-b border-neutral-800 flex flex-col sm:flex-row items-center gap-3">
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
                    <p className="text-sm text-neutral-300 font-semibold">
                      No attendee leads recorded yet
                    </p>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
                      When attendees complete the test on their phones, leads sync to /api/leads.
                      Click &ldquo;Sync Now&rdquo; above to pull new records!
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <button
                        onClick={handleTriggerSync}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-xs text-neutral-200 hover:text-white cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Pull from Server</span>
                      </button>
                      <button
                        onClick={handleSeed}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-xs text-neutral-300 hover:text-white cursor-pointer"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Load Sample Demo Leads</span>
                      </button>
                    </div>
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
            </>
          )}

          {/* TAB 2: GOOGLE SHEETS & CLOUD SYNC SETTINGS */}
          {activeTab === 'settings' && (
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-start gap-3">
                <Globe className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-300 space-y-1">
                  <p className="font-bold text-white text-sm">
                    How Multi-Device Crowd Lead Sync Works on Vercel:
                  </p>
                  <p>
                    1. When attendees scan the QR and fill the test on their phones, submissions are
                    posted to <code className="text-emerald-400 font-mono">/api/leads</code> and saved to your booth.
                  </p>
                  <p>
                    2. To make 100% sure you never miss a lead even during heavy expo traffic, connect
                    a **Google Sheet Webhook URL** below. Every phone will instantly inject each row into your spreadsheet in real time!
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-neutral-300 uppercase mb-1.5 flex items-center justify-between">
                    <span>Google Sheets / Webhook URL (Optional but Recommended)</span>
                    <span className="text-[10px] text-neutral-500 lowercase font-normal">
                      zapier, make, google apps script
                    </span>
                  </label>
                  <input
                    type="url"
                    value={webhookInput}
                    onChange={(e) => setWebhookInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-neutral-300 uppercase mb-1.5 flex items-center justify-between">
                    <span>Stall Coordinator WhatsApp Number</span>
                    <span className="text-[10px] text-neutral-500 font-normal">
                      for direct attendee confirmations
                    </span>
                  </label>
                  <input
                    type="text"
                    value={organizerPhoneInput}
                    onChange={(e) => setOrganizerPhoneInput(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Sync Settings</span>
                  </button>
                  {savedSettingsSuccess && (
                    <span className="text-xs font-mono text-emerald-400">
                      ✓ Settings saved successfully!
                    </span>
                  )}
                </div>
              </form>

              {/* 30-Second Google Sheet Script Template */}
              <div className="border-t border-neutral-800 pt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-neutral-300 uppercase">
                    30-Second Google Apps Script Template
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyGoogleScript}
                    className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300"
                  >
                    {copiedScript ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-[11px] text-neutral-400 space-y-1 mb-3">
                  <p>1. Open Google Sheets → Extensions → Apps Script.</p>
                  <p>2. Paste this code, click Deploy → New Deployment → Web App (Access: Anyone).</p>
                  <p>3. Paste the generated URL in the box above!</p>
                </div>
                <pre className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 font-mono text-[11px] text-neutral-300 overflow-x-auto">
{`function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.fullName,
    data.whatsappNumber,
    data.college,
    data.department,
    data.yearOfStudy,
    data.careerInterest,
    data.personaName
  ]);
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: MANUAL ATTENDEE PASS IMPORT */}
          {activeTab === 'import' && (
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl">
                <h3 className="text-sm font-bold text-white mb-1">
                  Offline Booth Pass Transfer
                </h3>
                <p className="text-xs text-neutral-400">
                  If an attendee completed the quiz while their phone had weak expo hall internet,
                  they can tap &ldquo;Show Booth Pass&rdquo; on their phone. Paste their pass code
                  below to instantly add them into your vault!
                </p>
              </div>

              <form onSubmit={handleManualImport} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-neutral-300 uppercase mb-1.5">
                    Paste Attendee Pass String / JSON Code:
                  </label>
                  <textarea
                    rows={4}
                    value={importCodeInput}
                    onChange={(e) => {
                      setImportCodeInput(e.target.value);
                      if (importStatus !== 'idle') setImportStatus('idle');
                    }}
                    placeholder='Paste code here e.g. {"fullName": "...", "whatsappNumber": "..."}'
                    className="w-full p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                {importStatus === 'error' && (
                  <p className="text-xs text-rose-400 font-mono">
                    Invalid pass code format. Please check the text and try again.
                  </p>
                )}
                {importStatus === 'success' && (
                  <p className="text-xs text-emerald-400 font-mono font-bold">
                    ✓ Attendee lead successfully verified and imported into the vault!
                  </p>
                )}

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  Import Lead into Vault
                </button>
              </form>
            </div>
          )}

          {/* Footer Actions */}
          <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex flex-wrap items-center justify-between gap-2 text-xs">
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
