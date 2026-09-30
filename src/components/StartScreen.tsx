import React, { useState } from 'react';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { sounds } from '../utils/audio';
import { ArenaHeroVisual, PersonaIllustration } from './PersonaIllustrations';
import { PersonaId } from '../types';

interface StartScreenProps {
  onStart: () => void;
  onOpenQr: () => void;
}

const CTA_VARIANTS = [
  { id: 'vibe', label: 'Gen Z', text: 'READ MY VIBE →' },
  { id: 'mystery', label: 'Mystery', text: "LET'S FIND OUT →" },
  { id: 'fun', label: 'Fun', text: 'AI, DO YOUR THING →' }
];

const PERSONA_CARDS: {
  id: PersonaId;
  name: string;
  emoji: string;
  punchline: string;
  sub: string;
  accent: string;
}[] = [
  {
    id: 'creative-builder',
    name: 'CREATIVE BUILDER',
    emoji: '🎨',
    punchline: "You don't just consume. You make.",
    sub: 'Ideas → things.',
    accent: 'border-amber-500/40 hover:border-amber-400 group-hover:bg-amber-500/5'
  },
  {
    id: 'ai-explorer',
    name: 'AI EXPLORER',
    emoji: '🤖',
    punchline: 'You probably ask AI random questions at 2 AM.',
    sub: 'Curiosity = your superpower.',
    accent: 'border-emerald-500/40 hover:border-emerald-400 group-hover:bg-emerald-500/5'
  },
  {
    id: 'digital-strategist',
    name: 'DIGITAL STRATEGIST',
    emoji: '📈',
    punchline: 'You see the algorithm before everyone else does.',
    sub: 'Clicks. Data. Growth.',
    accent: 'border-blue-500/40 hover:border-blue-400 group-hover:bg-blue-500/5'
  },
  {
    id: 'problem-solver',
    name: 'PROBLEM SOLVER',
    emoji: '🧠',
    punchline: "Give you a mess. You'll find the pattern.",
    sub: 'Chaos → solution.',
    accent: 'border-violet-500/40 hover:border-violet-400 group-hover:bg-violet-500/5'
  },
  {
    id: 'experience-designer',
    name: 'EXPERIENCE DESIGNER',
    emoji: '✨',
    punchline: 'You notice the tiny things everyone else misses.',
    sub: 'Make it useful. Make it beautiful.',
    accent: 'border-pink-500/40 hover:border-pink-400 group-hover:bg-pink-500/5'
  },
  {
    id: 'ai-entrepreneur',
    name: 'AI ENTREPRENEUR',
    emoji: '🚀',
    punchline: 'You don\'t ask "Can this work?"',
    sub: 'You ask "How do I build it?"',
    accent: 'border-orange-500/40 hover:border-orange-400 group-hover:bg-orange-500/5'
  }
];

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, onOpenQr }) => {
  const [selectedCtaIdx, setSelectedCtaIdx] = useState(0);

  const activeCta = CTA_VARIANTS[selectedCtaIdx];

  return (
    <div className="relative flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12 max-w-5xl mx-auto">
      {/* Background ambient glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Microcopy System Status Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] font-mono text-neutral-400 mb-4 bg-neutral-900/70 border border-neutral-800 px-3.5 py-1.5 rounded-full backdrop-blur-md">
        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          SYSTEM STATUS: CURIOUS HUMAN DETECTED
        </span>
        <span className="text-neutral-700">/</span>
        <span className="text-neutral-300">AI ENGINE: ONLINE</span>
        <span className="text-neutral-700 hidden sm:inline">/</span>
        <span className="text-cyan-400 hidden sm:inline">PERSONALITY SCAN: READY</span>
      </div>

      {/* Animated Hero Arena Holographic Emblem */}
      <ArenaHeroVisual />

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight font-display mb-3 drop-shadow-sm">
        AI KNOWS YOU? <span className="inline-block animate-pulse">👀</span>
      </h1>

      {/* Subheadline */}
      <div className="text-lg sm:text-2xl text-neutral-200 font-medium space-y-1 mb-8 max-w-xl">
        <p className="font-semibold text-emerald-400 font-mono text-base sm:text-lg">
          5 questions. 30 seconds.
        </p>
        <p className="text-neutral-300">
          Let&apos;s see if AI gets you right.
        </p>
      </div>

      {/* Interactive CTA Vibe Switcher */}
      <div className="mb-4 flex items-center gap-1 p-1 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs font-mono">
        <span className="px-2 text-neutral-500 hidden sm:inline flex items-center gap-1">
          <Terminal className="w-3 h-3 text-emerald-400" />
          Vibe:
        </span>
        {CTA_VARIANTS.map((v, idx) => (
          <button
            key={v.id}
            onClick={() => {
              sounds.playClick();
              setSelectedCtaIdx(idx);
            }}
            className={`px-3 py-1 rounded-lg transition-all ${
              selectedCtaIdx === idx
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Big Main CTA */}
      <button
        onClick={() => {
          sounds.playSelect();
          onStart();
        }}
        className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold text-neutral-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_45px_rgba(16,185,129,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
      >
        <span className="font-display tracking-tight font-extrabold">{activeCta.text}</span>
        <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-200" />
      </button>

      {/* Conversational Small Text Under CTA */}
      <div className="mt-5 space-y-2 max-w-lg">
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-neutral-300">
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            INSTANT AI READ
          </span>
          <span className="text-neutral-700">|</span>
          <button
            onClick={() => {
              sounds.playClick();
              onOpenQr();
            }}
            className="hover:text-cyan-400 text-neutral-300 underline decoration-dotted transition-colors cursor-pointer"
          >
            📱 QUEUE? PLAY ON YOUR PHONE
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-neutral-500">
          <span>⚡ 30 SEC EXPERIENCE</span>
          <span>•</span>
          <span className="text-neutral-400">NO LOGIN</span>
          <span>•</span>
          <span className="text-emerald-400/90 font-medium">JUST VIBES</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">NO BORING FORMS</span>
        </div>
      </div>

      {/* Personality Microcopy Banner */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-neutral-500">
        <span>HUMAN INPUT: REQUIRED</span>
        <span className="text-neutral-700">·</span>
        <span className="text-amber-400/90">OVERTHINKING: NOT RECOMMENDED</span>
        <span className="text-neutral-700">·</span>
        <span className="text-neutral-400">
          AI CONFIDENCE: <span className="text-emerald-400 font-semibold">98.7%*</span>{' '}
          <span className="text-neutral-500 text-[10px] italic">(*probably.)</span>
        </span>
      </div>

      {/* 6 Personas Grid with Visual Artwork + Gen-Z personality statements */}
      <div className="mt-12 w-full border-t border-neutral-900/80 pt-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <p className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-semibold">
            6 Core Archetypes in the Arena · Which One Are You?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
          {PERSONA_CARDS.map((persona, i) => (
            <div
              key={i}
              className={`group p-4 rounded-xl bg-neutral-900/70 border ${persona.accent} transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <PersonaIllustration id={persona.id} size="sm" />
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
                        0{i + 1}
                      </span>
                      <h3 className="text-sm font-bold text-white font-display tracking-wide">
                        {persona.name}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xl">{persona.emoji}</span>
                </div>
                <p className="text-xs text-neutral-300 leading-snug mb-1.5">
                  {persona.punchline}
                </p>
              </div>
              <p className="text-xs font-mono font-medium text-emerald-400/90 pt-1">
                {persona.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
