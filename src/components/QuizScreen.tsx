import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Question } from '../types';
import { sounds } from '../utils/audio';

interface QuizScreenProps {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  onSelectOption: (questionId: number, optionId: string) => void;
  onPrevious: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  currentQuestionIndex,
  answers,
  onSelectOption,
  onPrevious
}) => {
  const currentQ = questions[currentQuestionIndex];
  const total = questions.length;
  const currentAnswer = answers[currentQ.id];
  const [selectedAnim, setSelectedAnim] = useState<string | null>(null);

  // Listen to keyboard numbers 1..5 for lightning fast stall kiosk gameplay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= currentQ.options.length) {
        const option = currentQ.options[num - 1];
        handleChoose(option.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQ]);

  const handleChoose = (optionId: string) => {
    setSelectedAnim(optionId);
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    if (isLastQuestion) {
      sounds.playScreenComplete();
    } else {
      sounds.playAnswerSelect();
    }
    setTimeout(() => {
      onSelectOption(currentQ.id, optionId);
      setSelectedAnim(null);
    }, 160);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
      {/* Top Bar with Progress Line as specified in doc */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-neutral-400 mb-3">
          <span className="font-bold text-white tracking-wider flex items-center gap-1.5 font-display">
            AI KNOWS YOU?
          </span>

          {/* Stepper Dots & Line: ● ━━━ ○ ━━━ ○ ━━━ ○ ━━━ ○ */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {questions.map((_, idx) => {
              const isDone = idx < currentQuestionIndex;
              const isCurrent = idx === currentQuestionIndex;
              return (
                <React.Fragment key={idx}>
                  <div
                    className={`w-3 h-3 rounded-full flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-emerald-400 ring-4 ring-emerald-400/20 scale-110'
                        : isDone
                        ? 'bg-emerald-600'
                        : 'bg-neutral-800 border border-neutral-700'
                    }`}
                  >
                    {isDone && <span className="w-1 h-1 rounded-full bg-white" />}
                  </div>
                  {idx < questions.length - 1 && (
                    <div
                      className={`h-0.5 w-4 sm:w-6 rounded transition-colors ${
                        idx < currentQuestionIndex ? 'bg-emerald-500' : 'bg-neutral-800'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <span className="font-semibold text-emerald-400 uppercase tracking-widest text-[11px] sm:text-xs">
            QUESTION {currentQuestionIndex + 1} OF {total}
          </span>
        </div>
      </div>

      {/* Question Category & Text */}
      <div className="mb-8">
        <div className="inline-block px-3 py-1 rounded bg-neutral-900 border border-neutral-800 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-3">
          Q{currentQuestionIndex + 1} — {currentQ.category}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug">
          {currentQ.question}
        </h2>
      </div>

      {/* Options Stack */}
      <div className="space-y-3 sm:space-y-3.5">
        {currentQ.options.map((option, idx) => {
          const isSelected = currentAnswer === option.id || selectedAnim === option.id;

          return (
            <button
              key={option.id}
              onClick={() => handleChoose(option.id)}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-150 flex items-center justify-between group cursor-pointer focus:outline-none ${
                isSelected
                  ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.25)] translate-x-1'
                  : 'bg-neutral-900/80 border-neutral-800/90 text-neutral-200 hover:bg-neutral-850 hover:border-neutral-700 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl sm:text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  {option.emoji}
                </span>
                <span className="text-base sm:text-lg font-medium tracking-wide">
                  {option.text}
                </span>
              </div>

              {/* Number key shortcut & active indicator */}
              <div className="flex items-center gap-2">
                <span
                  className={`hidden sm:inline-block font-mono text-xs px-2 py-0.5 rounded border transition-colors ${
                    isSelected
                      ? 'bg-emerald-400 text-black border-emerald-400 font-bold'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-500 group-hover:border-neutral-700 group-hover:text-neutral-300'
                  }`}
                >
                  {idx + 1}
                </span>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-400 text-black'
                      : 'border-neutral-700 bg-neutral-950 group-hover:border-neutral-500'
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-black" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="mt-8 flex items-center justify-between pt-4 border-t border-neutral-900 text-xs text-neutral-500">
        {currentQuestionIndex > 0 ? (
          <button
            onClick={() => {
              sounds.playClick();
              onPrevious();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Question</span>
          </button>
        ) : (
          <div />
        )}

        <div className="font-mono text-[11px] text-neutral-500 flex items-center gap-2">
          <span className="text-amber-400/80">OVERTHINKING: NOT RECOMMENDED</span>
          <span className="text-neutral-700 hidden sm:inline">·</span>
          <span className="hidden sm:inline">Tap or press 1–{currentQ.options.length}</span>
        </div>
      </div>
    </div>
  );
};
