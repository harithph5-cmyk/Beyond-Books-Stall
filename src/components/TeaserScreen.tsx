import React from 'react';
import { Lock, ArrowDown, Sparkles } from 'lucide-react';
import { Persona } from '../types';
import { sounds } from '../utils/audio';
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

        {/* Vertical flow as verbatim requested in doc:
            YOUR PERSONA ↓ YOUR STRENGTHS ↓ AI CAREER PATHS ↓ SKILLS TO LEARN ↓ PROJECT IDEAS ↓ CAREER OPTIONS */}
        <div className="space-y-2 max-w-md mx-auto">
          {ROADMAP_STEPS_OVERVIEW.map((item, index) => (
            <React.Fragment key={item}>
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

      {/* CTA: 🔓 UNLOCK MY AI CAREER ROADMAP (Page 5) */}
      <button
        onClick={() => {
          sounds.playSelect();
          onUnlock();
        }}
        className="group inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_45px_rgba(16,185,129,0.6)] transform hover:-translate-y-0.5 transition-all cursor-pointer"
      >
        <span>🔓 UNLOCK MY AI CAREER ROADMAP</span>
      </button>

      <p className="text-xs font-mono text-neutral-500 mt-4">
        100% Free for Stall Participants · Instant Verification
      </p>
    </div>
  );
};
