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

  // 1. THE AI VISIONARY (or legacy ai-entrepreneur)
  if (id === 'ai-visionary' || id === 'ai-entrepreneur') {
    return (
      <div className={`${containerClass} bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-purple-900/30 border border-orange-400/40 shadow-[0_0_25px_rgba(249,115,22,0.25)]`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.3),transparent_70%)]" />
        <motion.div {...motionProps} className="w-full h-full flex items-center justify-center p-2">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_12px_rgba(249,115,22,0.7)]">
            <defs>
              <linearGradient id="visGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="44" fill="none" stroke="#F97316" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
            <path d="M 60 22 C 60 22 76 42 76 65 L 44 65 C 44 42 60 22 60 22 Z" fill="url(#visGrad)" stroke="#FDBA74" strokeWidth="2" />
            <polygon points="44,55 32,74 44,70" fill="#EA580C" />
            <polygon points="76,55 88,74 76,70" fill="#EA580C" />
            <circle cx="60" cy="46" r="6" fill="#0A0A0C" stroke="#FFF" strokeWidth="2" />
            <polygon points="50,68 60,94 70,68" fill="#FDE047" opacity="0.9" />
            <polygon points="54,68 60,84 66,68" fill="#FFF" />
          </svg>
        </motion.div>
      </div>
    );
  }

  // 2. THE AI STRATEGIST (or legacy digital-strategist)
  if (id === 'ai-strategist' || id === 'digital-strategist') {
    return (
      <div className={`${containerClass} bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-neutral-900/40 border border-blue-400/40 shadow-[0_0_25px_rgba(59,130,246,0.25)]`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.3),transparent_70%)]" />
        <motion.div {...motionProps} className="w-full h-full flex items-center justify-center p-2">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_12px_rgba(59,130,246,0.7)]">
            <defs>
              <linearGradient id="stratGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <line x1="20" y1="90" x2="100" y2="90" stroke="#334155" strokeWidth="1.5" />
            <line x1="20" y1="20" x2="20" y2="90" stroke="#334155" strokeWidth="1.5" />
            <path d="M 24 82 Q 55 78 72 48 T 98 26" fill="none" stroke="url(#stratGrad)" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="45" cy="79" r="3.5" fill="#3B82F6" />
            <circle cx="72" cy="48" r="4.5" fill="#8B5CF6" />
            <circle cx="98" cy="26" r="6" fill="#60A5FA" />
            <circle cx="98" cy="26" r="11" fill="none" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 2" />
          </svg>
        </motion.div>
      </div>
    );
  }

  // 3. THE AI CREATOR (or legacy creative-builder)
  if (id === 'ai-creator' || id === 'creative-builder') {
    return (
      <div className={`${containerClass} bg-gradient-to-br from-pink-500/20 via-rose-500/15 to-purple-900/30 border border-pink-500/40 shadow-[0_0_25px_rgba(244,63,94,0.25)]`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.25),transparent_70%)]" />
        <motion.div {...motionProps} className="w-full h-full flex items-center justify-center p-2">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]">
            <defs>
              <linearGradient id="creatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="42" fill="none" stroke="#EC4899" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
            <polygon points="60,24 92,78 28,78" fill="url(#creatGrad)" fillOpacity="0.25" stroke="#EC4899" strokeWidth="2" />
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

  // 4. THE AI EXPLORER
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
            <ellipse cx="60" cy="60" rx="46" ry="18" fill="none" stroke="#10B981" strokeWidth="1.5" transform="rotate(-25 60 60)" opacity="0.6" />
            <ellipse cx="60" cy="60" rx="46" ry="18" fill="none" stroke="#06B6D4" strokeWidth="1.5" transform="rotate(35 60 60)" opacity="0.6" />
            <rect x="40" y="44" width="40" height="32" rx="8" fill="#0A0A0C" stroke="url(#aeGrad)" strokeWidth="2.5" />
            <rect x="46" y="52" width="28" height="8" rx="4" fill="#10B981" />
            <circle cx="53" cy="56" r="2.5" fill="#FFF" />
            <circle cx="67" cy="56" r="2.5" fill="#FFF" />
            <line x1="60" y1="44" x2="60" y2="30" stroke="#06B6D4" strokeWidth="2" />
            <circle cx="60" cy="28" r="4" fill="#10B981" />
          </svg>
        </motion.div>
      </div>
    );
  }

  // 5. THE AI CONNECTOR (or legacy experience-designer)
  if (id === 'ai-connector' || id === 'experience-designer') {
    return (
      <div className={`${containerClass} bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-rose-900/30 border border-amber-400/40 shadow-[0_0_25px_rgba(245,158,11,0.25)]`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.3),transparent_70%)]" />
        <motion.div {...motionProps} className="w-full h-full flex items-center justify-center p-2">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_12px_rgba(245,158,11,0.7)]">
            <defs>
              <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#F43F5E" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="16" fill="url(#connGrad)" />
            <circle cx="60" cy="60" r="16" fill="none" stroke="#FFF" strokeWidth="2" />
            {/* Outer Satellites */}
            <circle cx="28" cy="38" r="8" fill="#F59E0B" />
            <circle cx="92" cy="38" r="8" fill="#F43F5E" />
            <circle cx="32" cy="84" r="8" fill="#EC4899" />
            <circle cx="88" cy="84" r="8" fill="#FB923C" />
            {/* Links */}
            <line x1="60" y1="60" x2="28" y2="38" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="60" y1="60" x2="92" y2="38" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="60" y1="60" x2="32" y2="84" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="60" y1="60" x2="88" y2="84" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        </motion.div>
      </div>
    );
  }

  // 6. THE AI EXECUTOR
  if (id === 'ai-executor') {
    return (
      <div className={`${containerClass} bg-gradient-to-br from-red-500/20 via-orange-500/15 to-neutral-900/40 border border-orange-500/40 shadow-[0_0_25px_rgba(239,68,68,0.25)]`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.3),transparent_70%)]" />
        <motion.div {...motionProps} className="w-full h-full flex items-center justify-center p-2">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]">
            <defs>
              <linearGradient id="execGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
            <polygon points="60,20 74,48 102,48 78,66 88,96 60,78 32,96 42,66 18,48 46,48" fill="url(#execGrad)" stroke="#FCA5A5" strokeWidth="2" />
            <circle cx="60" cy="58" r="8" fill="#FFF" />
          </svg>
        </motion.div>
      </div>
    );
  }

  // 7. THE AI DETECTIVE (or legacy problem-solver)
  if (id === 'ai-detective' || id === 'problem-solver') {
    return (
      <div className={`${containerClass} bg-gradient-to-br from-violet-500/20 via-indigo-500/15 to-neutral-900/40 border border-violet-400/40 shadow-[0_0_25px_rgba(139,92,246,0.25)]`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(139,92,246,0.3),transparent_70%)]" />
        <motion.div {...motionProps} className="w-full h-full flex items-center justify-center p-2">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]">
            <defs>
              <linearGradient id="detGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            <circle cx="52" cy="52" r="26" fill="#18181B" stroke="url(#detGrad)" strokeWidth="3.5" />
            <circle cx="52" cy="52" r="18" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="72" y1="72" x2="98" y2="98" stroke="#C4B5FD" strokeWidth="6" strokeLinecap="round" />
            <circle cx="52" cy="52" r="4" fill="#06B6D4" />
          </svg>
        </motion.div>
      </div>
    );
  }

  // 8. THE AI ADAPTER (default fallback)
  return (
    <div className={`${containerClass} bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-lime-900/30 border border-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.25)]`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.3),transparent_70%)]" />
      <motion.div {...motionProps} className="w-full h-full flex items-center justify-center p-2">
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]">
          <defs>
            <linearGradient id="adaptGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#84CC16" />
            </linearGradient>
          </defs>
          <path d="M 30 60 Q 60 20 90 60 T 30 60" fill="none" stroke="url(#adaptGrad)" strokeWidth="3" />
          <path d="M 30 60 Q 60 100 90 60 T 30 60" fill="none" stroke="#84CC16" strokeWidth="2" strokeDasharray="4 3" opacity="0.7" />
          <circle cx="60" cy="60" r="10" fill="#10B981" />
          <circle cx="60" cy="60" r="4" fill="#FFF" />
          <circle cx="30" cy="60" r="5" fill="#84CC16" />
          <circle cx="90" cy="60" r="5" fill="#84CC16" />
        </svg>
      </motion.div>
    </div>
  );
};

export const ArenaHeroVisual: React.FC = () => {
  return (
    <div className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto mb-6 flex items-center justify-center select-none pointer-events-none">
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
