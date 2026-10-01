import React, { useState, useEffect } from 'react';
import { Lock, ArrowDown, Sparkles, ExternalLink, X, Check, Copy, CheckCircle } from 'lucide-react';
import { Persona } from '../types';
import { sounds } from '../utils/audio';
import { GOOGLE_FORM_DIRECT_URL, GOOGLE_FORM_EMBED_URL } from '../utils/storage';
import { PersonaIllustration } from './PersonaIllustrations';

interface TeaserScreenProps {
  persona: Persona;
  onUnlock: () => void;
}

const ROADMAP_STEPS_OVERVIEW = [
  'YOUR PERSONA',
  'YOUR STRENGTHS',
  'AI CAREER PATHS',
  'SKILLS TO LEARN',
  'PROJECT IDEAS',
  'CAREER OPTIONS'
];

export const TeaserScreen: React.FC<TeaserScreenProps> = ({ persona, onUnlock }) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [iframeLoadCount, setIframeLoadCount] = useState(0);
  const [copiedPersona, setCopiedPersona] = useState(false);

  // Watch for tab refocus or window close after opening external Google Form
  const handleOpenExternalTab = () => {
    sounds.playSelect();
    const formWin = window.open(GOOGLE_FORM_DIRECT_URL, '_blank', 'noopener,noreferrer');

    if (formWin) {
      const checkTimer = setInterval(() => {
        try {
          if (formWin.closed) {
            clearInterval(checkTimer);
            sounds.playCelebration();
            setShowFormModal(false);
            onUnlock();
          }
        } catch {
          // Cross-origin restriction
        }
      }, 600);
    }

    const handleFocus = () => {
      // User switched back from Google Form tab
      sounds.playCelebration();
      setShowFormModal(false);
      onUnlock();
    };

    window.addEventListener('focus', handleFocus, { once: true });
  };

  const handleOpenModal = () => {
    sounds.playScreenComplete();
    setIframeLoadCount(0);
    setShowFormModal(true);
  };

  const handleCopyPersona = () => {
    sounds.playClick();
    navigator.clipboard.writeText(persona.name);
    setCopiedPersona(true);
    setTimeout(() => setCopiedPersona(false), 2000);
  };

  // When iframe reloads (after submit), auto-advance to the confirmation screen
  const handleIframeLoad = () => {
    setIframeLoadCount((prev) => {
      const next = prev + 1;
      if (next >= 2) {
        // Form submitted inside the iframe!
        sounds.playCelebration();
        setTimeout(() => {
          setShowFormModal(false);
          onUnlock();
        }, 1200);
      }
      return next;
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 text-center">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-4">
        <Sparkles className="w-3.5 h-3.5" />
        <span>PROFILING COMPLETE</span>
      </div>

      {/* Big Headline (Page 5) */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
        YOUR AI CAREER ROADMAP IS READY. 🚀
      </h1>

      {/* Subtitle (Page 5) */}
      <p className="text-base sm:text-lg text-neutral-300 max-w-lg mx-auto mb-8">
        Based on your answers, AI has identified potential career directions for you.
      </p>

      {/* Blurred / Locked Teaser Card with Steps Flow */}
      <div className="relative rounded-2xl bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-neutral-800 p-6 sm:p-8 mb-8 overflow-hidden shadow-2xl">
        {/* Glow behind */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-500/15 blur-3xl pointer-events-none" />

        {/* Persona Sneak Peek with Illustration */}
        <div className="mb-6 p-4 rounded-xl bg-neutral-900/90 border border-emerald-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            <PersonaIllustration id={persona.id} size="sm" />
            <div>
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest">
                Identified Match ({persona.code})
              </div>
              <div className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                <span>{persona.name}</span>
                <span className="text-xl">{persona.emoji}</span>
              </div>
              <div className="text-xs text-neutral-400 italic">
                &ldquo;{persona.tagline}&rdquo;
              </div>
            </div>
          </div>
          <span className="px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 flex items-center gap-1.5 shrink-0">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">LOCKED</span>
          </span>
        </div>

        {/* Vertical flow steps */}
        <div className="space-y-2 max-w-md mx-auto">
          {ROADMAP_STEPS_OVERVIEW.map((item, index) => (
            <React.Fragment key={index}>
              <div className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800/80 flex items-center justify-between text-left group">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-neutral-500 w-5">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-semibold tracking-wide text-neutral-200">
                    {item}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-neutral-500 blur-[2px] select-none hidden sm:inline">
                    Confidential Report
                  </span>
                  <Lock className="w-3.5 h-3.5 text-neutral-500" />
                </div>
              </div>

              {index < ROADMAP_STEPS_OVERVIEW.length - 1 && (
                <div className="flex justify-center my-0.5 text-emerald-500/60">
                  <ArrowDown className="w-4 h-4 animate-bounce" style={{ animationDuration: '2s' }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Want to see yours? (Page 5) */}
      <div className="mb-6">
        <p className="text-lg sm:text-xl font-bold text-white font-display">
          Want to see yours?
        </p>
      </div>

      {/* CTA: 🔓 UNLOCK MY AI CAREER ROADMAP (Opens Google Form Modal / Tab) */}
      <button
        onClick={handleOpenModal}
        className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-black text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_35px_rgba(16,185,129,0.45)] hover:shadow-[0_0_55px_rgba(16,185,129,0.7)] transform hover:-translate-y-1 active:translate-y-0 transition-all duration-200 cursor-pointer overflow-hidden border border-emerald-300/40"
      >
        <span className="relative z-10 flex items-center gap-2.5">
          <span>🔓 REGISTER ON GOOGLE FORM & UNLOCK ROADMAP</span>
          <ExternalLink className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        </span>
      </button>

      <p className="text-xs font-mono text-emerald-400/90 mt-3 flex items-center justify-center gap-1.5">
        <span>⚡ Submit in Google Form to instantly reveal Roadmap</span>
      </p>

      {/* Embedded Google Form Sheet Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl h-[92vh] max-h-[820px] bg-neutral-900 border border-neutral-800 rounded-3xl flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 text-left">
                <span className="text-2xl">{persona.emoji}</span>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    OFFICIAL BOOTH REGISTRATION
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    Fill Google Form &amp; Unlock Roadmap
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyPersona}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white"
                  title="Copy your Persona to paste in Google Form"
                >
                  {copiedPersona ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Persona Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Copy {persona.name}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowFormModal(false)}
                  className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                  title="Close form"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded Live Google Form iframe */}
            <div className="flex-1 w-full bg-white relative overflow-hidden">
              <iframe
                src={GOOGLE_FORM_EMBED_URL}
                title="AI Arena Google Form"
                className="w-full h-full border-0"
                onLoad={handleIframeLoad}
              />
            </div>

            {/* Sticky Action Footer */}
            <div className="p-3 sm:p-4 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-[11px] font-mono text-neutral-400 text-center sm:text-left">
                <span>Click <strong>Submit</strong> inside the form above, then proceed!</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleOpenExternalTab}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-neutral-850 border border-neutral-700 hover:border-neutral-600 text-xs font-mono text-neutral-300 hover:text-white cursor-pointer"
                >
                  <span>Open in Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sounds.playCelebration();
                    setShowFormModal(false);
                    onUnlock();
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>I Clicked Submit → View Roadmap</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
