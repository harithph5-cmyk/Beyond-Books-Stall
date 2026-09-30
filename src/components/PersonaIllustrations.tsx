import React from 'react';
import { motion } from 'motion/react';
import { PersonaId } from '../types';

interface PersonaArtProps {
  id: PersonaId;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const PersonaIllustration: React.FC<PersonaArtProps> = ({
  id,
  size = 'md',
  animated = true
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28 sm:w-32 sm:h-32',
    lg: 'w-44 h-44 sm:w-52 sm:h-52'
  };

  const containerClass = `relative ${sizeMap[size]} rounded-2xl flex items-center justify-center overflow-hidden shrink-0 select-none`;

  const motionProps: {
    animate?: { y: number[]; rotate: number[] };
    transition?: { duration: number; repeat: number; ease: 'easeInOut' };
  } = animated
    ? {
        animate: {
          y: [-2, 3, -2],
          rotate: [-0.5, 0.5, -0.5]
        },
        transition: {
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut' as const
        }
      }
    : {};

  if (id === 'creative-builder') {
    return (
      <div className={`${containerClass} bg-gradient-to-br from-amber-500/20 via-rose-500/10 to-purple-900/30 border border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.25)]`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.25),transparent_70%)]" />
        <motion.div {...motionProps} className="w-full h-full flex items-center justify-center p-2">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]">
            <defs>
              <linearGradient id="cbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <filter id="cbGlow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Geometric Palette Matrix */}
            <circle cx="60" cy="60" r="42" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
            <polygon points="60,24 92,78 28,78" fill="url(#cbGrad)" fillOpacity="0.25" stroke="#F59E0B" strokeWidth="2" filter="url(#cbGlow)" />
            {/* Holographic brush / stylus */}
            <line x1="35" y1="85" x2="85" y2="35" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
            <circle cx="85" cy="35" r="5" fill="#EC4899" />
            <circle cx="35" cy="85" r="3" fill="#F59E0B" />
            <circle cx="60" cy="55" r="7" fill="#8B5CF6" />
            <circle cx="75" cy="65" r="4" fill="#10B981" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (id === 'ai-explorer') {
    return (
      <div className={`${containerClass} bg-gradient-to-br from-emerald-500/20 via-cyan-500/15 to-blue-900/30 border border-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.25)]`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.3),transparent_70%)]" />
        <motion.div {...motionProps} className="w-full h-full flex items-center justify-center p-2">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]">
            <defs>
              <linearGradient id="aeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            {/* Orbital Rings */}
            <ellipse cx="60" cy="60" rx="46" ry="18" fill="none" stroke="#10B981" strokeWidth="1.5" transform="rotate(-25 60 60)" opacity="0.6" />
            <ellipse cx="60" cy="60" rx="46" ry="18" fill="none" stroke="#06B6D4" strokeWidth="1.5" transform="rotate(35 60 60)" opacity="0.6" />
            {/* Robot Core Visor */}
            <rect x="40" y="44" width="40" height="32" rx="8" fill="#0A0A0C" stroke="url(#aeGrad)" strokeWidth="2.5" />
            <rect x="46" y="52" width="28" height="8" rx="4" fill="#10B981" />
            {/* Scanning Eye Nodes */}
            <circle cx="53" cy="56" r="2.5" fill="#FFF" />
            <circle cx="67" cy="56" r="2.5" fill="#FFF" />
            {/* Antenna node */}
            <line x1="60" y1="44" x2="60" y2="30" stroke="#06B6D4" strokeWidth="2" />
            <circle cx="60" cy="28" r="4" fill="#10B981" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (id === 'digital-strategist') {
    return (
      <div className={`${containerClass} bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-neutral-900/40 border border-blue-400/40 shadow-[0_0_25px_rgba(59,130,246,0.25)]`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.3),transparent_70%)]" />
        <motion.div {...motionProps} className="w-full h-full flex items-center justify-center p-2">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_12px_rgba(59,130,246,0.7)]">
            <defs>
              <linearGradient id="dsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            {/* Grid Coordinates */}
            <line x1="20" y1="90" x2="100" y2="90" stroke="#334155" strokeWidth="1.5" />
            <line x1="20" y1="20" x2="20" y2="90" stroke="#334155" strokeWidth="1.5" />
            {/* Exponential AI Growth Curve */}
            <path d="M 24 82 Q 55 78 72 48 T 98 26" fill="none" stroke="url(#dsGrad)" strokeWidth="3.5" strokeLinecap="round" />
            {/* Data Trend Nodes */}
            <circle cx="45" cy="79" r="3.5" fill="#3B82F6" />
            <circle cx="72" cy="48" r="4.5" fill="#8B5CF6" />
            <circle cx="98" cy="26" r="6" fill="#60A5FA" />
            {/* Target Reticle */}
            <circle cx="98" cy="26" r="11" fill="none" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 2" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (id === 'problem-solver') {
    return (
      <div className={`${containerClass} bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-neutral-900/40 border border-violet-400/40 shadow-[0_0_25px_rgba(139,92,246,0.25)]`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(139,92,246,0.3),transparent_70%)]" />
        <motion.div {...motionProps} className="w-full h-full flex items-center justify-center p-2">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]">
            <defs>
              <linearGradient id="psGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
            {/* Neural Brain Circuit Lattice */}
            <polygon points="60,22 95,42 95,78 60,98 25,78 25,42" fill="none" stroke="#6D28D9" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Isometric Quantum Core Cube */}
            <polygon points="60,32 86,47 60,62 34,47" fill="#8B5CF6" fillOpacity="0.4" stroke="#C084FC" strokeWidth="2" />
            <polygon points="34,47 60,62 60,90 34,75" fill="#6D28D9" fillOpacity="0.5" stroke="#A855F7" strokeWidth="2" />
            <polygon points="60,62 86,47 86,75 60,90" fill="#4C1D95" fillOpacity="0.6" stroke="#818CF8" strokeWidth="2" />
            {/* Center Logic Spark */}
            <circle cx="60" cy="62" r="5" fill="#FFF" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (id === 'experience-designer') {
    return (
      <div className={`${containerClass} bg-gradient-to-br from-pink-500/20 via-rose-500/15 to-neutral-900/40 border border-pink-400/40 shadow-[0_0_25px_rgba(236,72,153,0.25)]`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.3),transparent_70%)]" />
        <motion.div {...motionProps} className="w-full h-full flex items-center justify-center p-2">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_12px_rgba(236,72,153,0.7)]">
            <defs>
              <linearGradient id="edGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F43F5E" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            {/* Multi-layered Glass UI Canvases */}
            <rect x="26" y="32" width="52" height="60" rx="8" fill="#18181B" stroke="#F43F5E" strokeWidth="2" opacity="0.6" />
            <rect x="42" y="24" width="52" height="60" rx="8" fill="#27272A" stroke="url(#edGrad)" strokeWidth="2.5" />
            {/* UI Component Wireframes */}
            <rect x="49" y="32" width="38" height="6" rx="3" fill="#FB7185" />
            <rect x="49" y="44" width="22" height="12" rx="3" fill="#FDA4AF" fillOpacity="0.4" />
            <circle cx="80" cy="50" r="5" fill="#F43F5E" />
            <rect x="49" y="62" width="38" height="14" rx="4" fill="#F43F5E" fillOpacity="0.8" />
          </svg>
        </motion.div>
      </div>
    );
  }

  // ai-entrepreneur
  return (
    <div className={`${containerClass} bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-neutral-900/40 border border-orange-400/40 shadow-[0_0_25px_rgba(249,115,22,0.25)]`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.3),transparent_70%)]" />
      <motion.div {...motionProps} className="w-full h-full flex items-center justify-center p-2">
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_12px_rgba(249,115,22,0.7)]">
          <defs>
            <linearGradient id="entGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>
          {/* Orbital Thrust Rings */}
          <circle cx="60" cy="60" r="44" fill="none" stroke="#F97316" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
          {/* Cyber Rocket Thrust Vector */}
          <path d="M 60 22 C 60 22 76 42 76 65 L 44 65 C 44 42 60 22 60 22 Z" fill="url(#entGrad)" stroke="#FDBA74" strokeWidth="2" />
          {/* Rocket Wings */}
          <polygon points="44,55 32,74 44,70" fill="#EA580C" />
          <polygon points="76,55 88,74 76,70" fill="#EA580C" />
          {/* Window Cockpit */}
          <circle cx="60" cy="46" r="6" fill="#0A0A0C" stroke="#FFF" strokeWidth="2" />
          {/* Neon Exhaust Fire */}
          <polygon points="50,68 60,94 70,68" fill="#FDE047" opacity="0.9" />
          <polygon points="54,68 60,84 66,68" fill="#FFF" />
        </svg>
      </motion.div>
    </div>
  );
};

export const ArenaHeroVisual: React.FC = () => {
  return (
    <div className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto mb-6 flex items-center justify-center select-none pointer-events-none">
      {/* Outer Rotating Energy Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-emerald-500/30 border-dashed"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-3 rounded-full border border-cyan-500/25"
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-8 rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-400/20 to-cyan-500/20 blur-xl"
      />

      {/* Cyber AI Arena Emblem */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-neutral-900/90 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.35)] backdrop-blur-md"
      >
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]">
          <polygon points="50,8 14,28 50,48 86,28" fill="none" stroke="currentColor" strokeWidth="3" />
          <polygon points="14,48 50,68 86,48" fill="none" stroke="#06B6D4" strokeWidth="2.5" />
          <polygon points="14,68 50,88 86,68" fill="none" stroke="#10B981" strokeWidth="2.5" />
          <circle cx="50" cy="48" r="4" fill="#FFF" />
        </svg>
      </motion.div>
    </div>
  );
};
