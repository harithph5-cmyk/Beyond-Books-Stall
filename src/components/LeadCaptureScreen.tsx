import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ExternalLink,
  CheckCircle,
  Check,
  ArrowRight,
  Lock,
  X,
  Phone,
  ArrowLeft,
  Smartphone
} from 'lucide-react';
import { Persona } from '../types';
import { sounds } from '../utils/audio';
import {
  GOOGLE_FORM_URL,
  GOOGLE_FORM_DIRECT_URL,
  GOOGLE_FORM_EMBED_URL,
  FORMATTED_CONTACT_PHONE,
  getWhatsAppContactUrl,
  WHATSAPP_GROUP_URL
} from '../utils/storage';

interface LeadCaptureScreenProps {
  persona: Persona;
  onSubmitLead: (data: {
    fullName: string;
    whatsappNumber: string;
    college: string;
    department: string;
    yearOfStudy: string;
    careerInterest: string;
  }) => void;
  onBack: () => void;
  isPreGame?: boolean;
}

type TabKey = 'form' | 'whatsapp' | 'ready';

export const LeadCaptureScreen: React.FC<LeadCaptureScreenProps> = ({
  persona,
  onSubmitLead,
  onBack,
  isPreGame = true
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('form');
  const [step1Completed, setStep1Completed] = useState(false);
  const [step2Completed, setStep2Completed] = useState(false);
  const [tabError, setTabError] = useState('');
  const [iframeLoadCount, setIframeLoadCount] = useState(0);

  // Auto-detect return from Google Form tab
  useEffect(() => {
    const handleReturn = () => {
      setStep1Completed(true);
      setTabError('');
    };

    window.addEventListener('focus', handleReturn);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        setStep1Completed(true);
        setTabError('');
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('focus', handleReturn);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const handleOpenGoogleFormTab = () => {
    sounds.playSelect();
    setStep1Completed(true);
    setTabError('');
    window.open(GOOGLE_FORM_DIRECT_URL || GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  const handleCompleteStep1 = () => {
    sounds.playSelect();
    setStep1Completed(true);
    setTabError('');
    setActiveTab('whatsapp');
  };

  const handleJoinWhatsApp = () => {
    sounds.playSelect();
    setStep2Completed(true);
    setTabError('');
    window.open(WHATSAPP_GROUP_URL, '_blank', 'noopener,noreferrer');
  };

  const handleCompleteStep2 = () => {
    sounds.playCelebration();
    setStep2Completed(true);
    setTabError('');
    setActiveTab('ready');
  };

  const handleEnterGame = () => {
    if (!step1Completed) {
      sounds.playClick();
      setTabError('Step 1 (Google Form) is mandatory before entering!');
      setActiveTab('form');
      return;
    }
    if (!step2Completed) {
      sounds.playClick();
      setTabError('Step 2 (WhatsApp Group) is mandatory before entering!');
      setActiveTab('whatsapp');
      return;
    }

    sounds.playFanfare();
    onSubmitLead({
      fullName: 'AI Arena Player',
      whatsappNumber: 'Registered via Google Form & WhatsApp',
      college: 'AI Arena Attendee',
      department: 'Technology',
      yearOfStudy: 'Enrolled',
      careerInterest: persona.defaultDirection
    });
  };

  // Iframe reload detection for auto-advancing after submit
  const handleIframeLoad = () => {
    setIframeLoadCount((prev) => {
      const next = prev + 1;
      if (next >= 2) {
        sounds.playCelebration();
        setStep1Completed(true);
        setTimeout(() => {
          setActiveTab('whatsapp');
        }, 1200);
      }
      return next;
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-8 text-center">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
        <Lock className="w-3 h-3" />
        <span>MANDATORY PRE-GAME ENTRY · ORDERED TABS</span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display mb-2">
        Complete Tabs to Enter the Game 🎮
      </h1>
      <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto mb-6">
        Complete both mandatory tabs in order. Once verified, you will immediately enter the 30-second AI test!
      </p>

      {/* Sequential Tabs Header Navigation */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 p-1.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 mb-6 shadow-xl backdrop-blur-md">
        {/* Tab 1 Button */}
        <button
          type="button"
          onClick={() => {
            sounds.playClick();
            setActiveTab('form');
            setTabError('');
          }}
          className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'form'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.35)]'
              : step1Completed
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
              : 'bg-neutral-850 text-neutral-400 hover:text-white border border-transparent'
          }`}
        >
          {step1Completed ? (
            <Check className="w-4 h-4 text-current" />
          ) : (
            <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">
              1
            </span>
          )}
          <span className="truncate">1. Google Form</span>
          <span className={`hidden sm:inline text-[9px] px-1 py-0.2 rounded font-mono ${
            activeTab === 'form' ? 'bg-black/25 text-black' : 'bg-amber-500/20 text-amber-300'
          }`}>
            REQ
          </span>
        </button>

        {/* Tab 2 Button */}
        <button
          type="button"
          onClick={() => {
            if (!step1Completed) {
              sounds.playClick();
              setTabError('Please complete Step 1 (Google Form) first!');
              return;
            }
            sounds.playClick();
            setActiveTab('whatsapp');
            setTabError('');
          }}
          className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'whatsapp'
              ? 'bg-[#25D366] text-black shadow-[0_0_20px_rgba(37,211,102,0.35)]'
              : step2Completed
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
              : step1Completed
              ? 'bg-neutral-850 text-neutral-300 hover:text-white border border-neutral-700'
              : 'bg-neutral-900 text-neutral-500 border border-transparent opacity-60'
          }`}
        >
          {step2Completed ? (
            <Check className="w-4 h-4 text-current" />
          ) : !step1Completed ? (
            <Lock className="w-3.5 h-3.5 text-current" />
          ) : (
            <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">
              2
            </span>
          )}
          <span className="truncate">2. WhatsApp</span>
          <span className={`hidden sm:inline text-[9px] px-1 py-0.2 rounded font-mono ${
            activeTab === 'whatsapp' ? 'bg-black/25 text-black' : 'bg-[#25D366]/20 text-[#25D366]'
          }`}>
            REQ
          </span>
        </button>

        {/* Tab 3 Button */}
        <button
          type="button"
          onClick={() => {
            if (!step1Completed || !step2Completed) {
              sounds.playClick();
              setTabError('Complete Tab 1 and Tab 2 first before entering!');
              return;
            }
            sounds.playClick();
            setActiveTab('ready');
            setTabError('');
          }}
          className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'ready'
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.35)]'
              : step1Completed && step2Completed
              ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
              : 'bg-neutral-900 text-neutral-500 border border-transparent opacity-60'
          }`}
        >
          {step1Completed && step2Completed ? (
            <Sparkles className="w-4 h-4 text-current" />
          ) : (
            <Lock className="w-3.5 h-3.5 text-current" />
          )}
          <span className="truncate">3. Enter Game 🎮</span>
        </button>
      </div>

      {/* Tab Error Warning */}
      {tabError && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-mono flex items-center justify-center gap-2 animate-shake">
          <span>⚠️ {tabError}</span>
        </div>
      )}

      {/* ================= TAB 1: GOOGLE FORM (MANDATORY) ================= */}
      {activeTab === 'form' && (
        <div className="rounded-3xl bg-neutral-900/95 border-2 border-emerald-500/50 p-4 sm:p-6 shadow-2xl backdrop-blur-md text-left flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold mb-1">
                TAB 1 OF 2 · MANDATORY STEP
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-2">
                <span>📝 Fill Official Google Form</span>
              </h2>
              <p className="text-xs text-neutral-300 mt-0.5">
                Fill the form below and click Submit to proceed to the WhatsApp step.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleOpenGoogleFormTab}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-xs font-mono text-neutral-200 hover:text-white cursor-pointer"
              >
                <span>Open in Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Embedded Google Form Iframe */}
          <div className="w-full h-[460px] sm:h-[520px] rounded-2xl overflow-hidden border border-neutral-750 bg-white relative shadow-inner">
            <iframe
              src={GOOGLE_FORM_EMBED_URL}
              title="AI Arena Google Form"
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
            />
          </div>

          {/* Tab 1 Navigation Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-mono text-neutral-400 text-center sm:text-left">
              {step1Completed
                ? '✅ Google Form verified! Ready for Tab 2.'
                : 'Submitted the form? Click Next to continue.'}
            </span>

            <button
              type="button"
              onClick={handleCompleteStep1}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-black text-sm text-black bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>I SUBMITTED ➔ PROCEED TO STEP 2 (WHATSAPP)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= TAB 2: WHATSAPP GROUP (MANDATORY) ================= */}
      {activeTab === 'whatsapp' && (
        <div className="rounded-3xl bg-neutral-900/95 border-2 border-[#25D366]/50 p-5 sm:p-7 shadow-2xl backdrop-blur-md text-left flex flex-col space-y-5">
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#25D366] font-bold mb-1">
                TAB 2 OF 2 · MANDATORY STEP
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-2">
                <span>📲 JOIN OUR WHATSAPP GROUP 🚀</span>
              </h2>
              <p className="text-sm font-semibold text-emerald-300 mt-1">
                Stay connected with AI ARENA 🤖🔥
              </p>
            </div>
            <span className="text-4xl shrink-0">💬</span>
          </div>

          {/* Group benefits list verbatim */}
          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-xs sm:text-sm text-neutral-200 space-y-2.5 font-medium">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block font-bold">
              Get updates about:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300">
              <div className="flex items-center gap-2">
                <span className="text-[#25D366] font-bold">✦</span>
                <span>AI Workshops</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#25D366] font-bold">✦</span>
                <span>Internships</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#25D366] font-bold">✦</span>
                <span>Career Opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#25D366] font-bold">✦</span>
                <span>Events &amp; Activities</span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <span className="text-[#25D366] font-bold">✦</span>
                <span>Exclusive Updates</span>
              </div>
            </div>
          </div>

          {/* Join WhatsApp Button */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-neutral-300 font-semibold flex items-center gap-1.5">
              <span>👉 Click below to join:</span>
            </div>
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleJoinWhatsApp}
              className="group w-full py-4 px-6 rounded-2xl font-black text-base text-black bg-[#25D366] hover:bg-[#20bd5a] shadow-[0_0_30px_rgba(37,211,102,0.45)] hover:shadow-[0_0_45px_rgba(37,211,102,0.7)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer no-underline"
            >
              <span className="text-xl">💬</span>
              <span>JOIN AI ARENA WHATSAPP GROUP 🚀</span>
              <ExternalLink className="w-5 h-5 text-black group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <p className="text-center text-xs font-mono text-emerald-400 font-bold tracking-wide">
            See you inside! 🚀
          </p>

          {/* Tab 2 Navigation Action Footer */}
          <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('form')}
              className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Tab 1</span>
            </button>

            <button
              type="button"
              onClick={handleCompleteStep2}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-black text-sm text-black bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>I&apos;VE JOINED ➔ PROCEED TO ENTER GAME</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= TAB 3: READY TO ENTER GAME ================= */}
      {activeTab === 'ready' && (
        <div className="rounded-3xl bg-neutral-900/95 border-2 border-cyan-400/60 p-6 sm:p-10 shadow-[0_0_50px_rgba(6,182,212,0.25)] backdrop-blur-md text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-400/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold uppercase">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>ALL MANDATORY REQUIREMENTS VERIFIED</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-display">
              You are Ready to Enter the Arena! 🚀
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
              5 questions · 30 seconds · Discover your unique AI Archetype and reveal your full AI Career Roadmap.
            </p>
          </div>

          {/* Verification Badges Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-left font-mono text-xs">
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Tab 1: Google Form Verified</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Tab 2: WhatsApp Joined</span>
            </div>
          </div>

          {/* Final Enter Game Button */}
          <button
            type="button"
            onClick={handleEnterGame}
            className="group relative w-full py-5 px-8 rounded-2xl font-black text-lg sm:text-xl text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_rgba(16,185,129,0.8)] transform hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer overflow-hidden"
          >
            <Sparkles className="w-6 h-6 text-black" />
            <span>🎮 START 30-SEC AI PERSONALITY TEST NOW ⚡</span>
            <ArrowRight className="w-6 h-6 text-black group-hover:translate-x-2 transition-transform" />
          </button>

          <div className="flex items-center justify-between text-xs text-neutral-500 font-mono pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('whatsapp')}
              className="hover:text-white"
            >
              ← Review WhatsApp
            </button>
            <button
              type="button"
              onClick={onBack}
              className="hover:text-white"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {/* Booth Coordinator Contact in Footer */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500 font-mono">
        <button
          type="button"
          onClick={onBack}
          className="hover:text-white transition-colors"
        >
          ← Restart / Back to Home
        </button>
        <a
          href={getWhatsAppContactUrl('Hi, I am at the AI Arena booth and need help.')}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          <span>Booth Help: {FORMATTED_CONTACT_PHONE}</span>
        </a>
      </div>
    </div>
  );
};
