import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Cpu } from 'lucide-react';
import { sounds } from '../utils/audio';

interface AnalyzingScreenProps {
  onComplete: () => void;
}

const STEPS = [
  { text: 'Scanning your choices...', time: 0 },
  { text: 'Detecting your interests...', time: 1000 },
  { text: 'Mapping your personality...', time: 2000 },
  { text: 'Matching career possibilities...', time: 3000 },
  { text: 'Your AI persona is ready.', time: 4200 }
];

export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({ onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Step 0: Scanning your choices...
    sounds.playScanPing(420);

    const timer1 = setTimeout(() => {
      setActiveStep(1);
      sounds.playScanPing(540);
    }, 1000);

    const timer2 = setTimeout(() => {
      setActiveStep(2);
      sounds.playScanPing(660);
    }, 2000);

    const timer3 = setTimeout(() => {
      setActiveStep(3);
      sounds.playScanPing(780);
    }, 3000);

    const timer4 = setTimeout(() => {
      setActiveStep(4);
      setIsReady(true);
      sounds.playFanfare();
    }, 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-12 sm:py-16 text-center">
      {/* Neural Core Animation */}
      <div className="relative w-36 h-36 mx-auto mb-8 flex items-center justify-center">
        {/* Outer Orbiting Rings */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-dashed ${
            isReady ? 'border-emerald-400' : 'border-emerald-500/40'
          } animate-spin`}
          style={{ animationDuration: isReady ? '16s' : '4s' }}
        />
        <div
          className="absolute inset-3 rounded-full border border-cyan-500/30 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '6s' }}
        />

        {/* Pulsing Core */}
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
            isReady
              ? 'bg-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.5)] border border-emerald-400'
              : 'bg-neutral-900 border border-neutral-700 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
          }`}
        >
          {isReady ? (
            <span className="text-3xl animate-bounce">⚡</span>
          ) : (
            <Cpu className="w-9 h-9 text-emerald-400 animate-pulse" />
          )}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 text-xs font-mono mb-2">
          <span className="text-emerald-400 font-semibold animate-pulse">VIBE CHECK: INITIALIZING...</span>
          <span className="text-neutral-700">·</span>
          <span className="text-neutral-400 font-mono text-[11px]">AI CONFIDENCE: 98.7%* <span className="text-neutral-600 text-[10px] italic">(*probably.)</span></span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          {isReady ? 'Analysis Complete' : 'Synthesizing Your Profile...'}
        </h2>
      </div>

      {/* 5-Step Animation Sequence from Document */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 sm:p-6 mb-8 text-left space-y-3.5 shadow-lg">
        {STEPS.map((step, idx) => {
          const isDone = activeStep > idx || (isReady && idx === 4);
          const isCurrent = activeStep === idx && !isReady;
          const isPending = activeStep < idx;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3.5 transition-all duration-300 ${
                isDone
                  ? 'text-emerald-400'
                  : isCurrent
                  ? 'text-white font-medium scale-[1.01]'
                  : 'text-neutral-600'
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : isCurrent ? (
                  <div className="w-5 h-5 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-neutral-800 bg-neutral-950 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                  </div>
                )}
              </div>

              <span className={`text-sm sm:text-base font-mono ${idx === 4 && isReady ? 'font-bold text-emerald-300' : ''}`}>
                {step.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Page 3: REVEAL MY RESULT CTA */}
      <div className="min-h-[64px] flex items-center justify-center">
        {isReady ? (
          <button
            onClick={() => {
              sounds.playScreenComplete();
              onComplete();
            }}
            className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-xl text-lg font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transform hover:-translate-y-0.5 transition-all cursor-pointer animate-fade-in"
          >
            <span>REVEAL MY RESULT</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <p className="text-xs font-mono text-neutral-500 animate-pulse">
            Processing neural parameters in 4.5s...
          </p>
        )}
      </div>

      <p className="text-xs text-neutral-500 mt-4 font-mono">
        This creates anticipation for the stall player.
      </p>
    </div>
  );
};
