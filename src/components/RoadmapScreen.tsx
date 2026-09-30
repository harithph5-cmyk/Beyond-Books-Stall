import React, { useState } from 'react';
import { ArrowDown, Check, Copy, RotateCcw, Share2, Sparkles, Star } from 'lucide-react';
import { Persona, LeadData } from '../types';
import { sounds } from '../utils/audio';
import { PersonaIllustration } from './PersonaIllustrations';

interface RoadmapScreenProps {
  persona: Persona;
  leadData: LeadData | null;
  onReset: () => void;
}

export const RoadmapScreen: React.FC<RoadmapScreenProps> = ({
  persona,
  leadData,
  onReset
}) => {
  const [copied, setCopied] = useState(false);

  // Recommended direction can incorporate their chosen interest if available
  const recommendedDirection =
    leadData?.careerInterest && leadData.careerInterest !== 'Not Sure Yet'
      ? `${leadData.careerInterest} + AI`
      : persona.defaultDirection;

  // Build formatted text for WhatsApp share
  const generateWhatsAppMessage = () => {
    const lines = [
      `🚀 *AI ARENA — My AI Career Roadmap*`,
      `👤 *Name:* ${leadData?.fullName || 'Participant'}`,
      `🏛️ *College:* ${leadData?.college || 'N/A'} (${leadData?.yearOfStudy || ''})`,
      ``,
      `✨ *YOUR PERSONA:* ${persona.name} ${persona.emoji}`,
      `🎯 *Recommended Direction:* ${recommendedDirection}`,
      ``,
      `📊 *Strengths & Ratings:*`,
      ...persona.ratings.map((r) => `• ${'★'.repeat(r.score)}${'☆'.repeat(5 - r.score)} ${r.label}`),
      ``,
      `🗺️ *Your 6-Step Roadmap:*`,
      ...persona.roadmapSteps.map((s) => `${s.step}: ${s.title}`),
      ``,
      `📍 *Tested live at AI Arena Stall Booth!*`
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  const handleOpenWhatsApp = () => {
    sounds.playSelect();
    const text = generateWhatsAppMessage();
    const phoneParam = leadData?.whatsappNumber
      ? `phone=${leadData.whatsappNumber.replace(/[^0-9]/g, '')}&`
      : '';
    window.open(`https://api.whatsapp.com/send?${phoneParam}text=${text}`, '_blank');
  };

  const handleCopy = () => {
    sounds.playClick();
    const rawText = decodeURIComponent(generateWhatsAppMessage());
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Banner & Participant Profile */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ROADMAP UNLOCKED & VERIFIED</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display mb-2">
          YOUR AI CAREER ROADMAP
        </h1>

        {leadData && (
          <p className="text-sm font-mono text-neutral-400">
            Prepared exclusively for <span className="text-white font-semibold">{leadData.fullName}</span> ·{' '}
            <span className="text-emerald-400">{leadData.college}</span>
          </p>
        )}
      </div>

      {/* Main Persona Card (Page 7 verbatim hierarchy) */}
      <div className="relative rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 p-6 sm:p-8 mb-8 shadow-2xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-6 pb-6 border-b border-neutral-800/80">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold block mb-3">
            YOUR PERSONA
          </span>

          {/* Animated Illustration Badge */}
          <div className="flex justify-center mb-4">
            <PersonaIllustration id={persona.id} size="md" />
          </div>

          <div className="inline-flex items-center gap-3 mt-1">
            <span className="text-3xl sm:text-4xl">{persona.emoji}</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              {persona.name}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-md mx-auto italic">
            &ldquo;{persona.tagline}&rdquo;
          </p>

          {/* Star Ratings as exactly shown on Page 7 */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-8">
            {persona.ratings.map((rate, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-neutral-950/60 border border-neutral-800 px-4 py-2.5 rounded-xl min-w-[140px]"
              >
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      className={`w-3.5 h-3.5 ${
                        sIdx < rate.score
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-mono font-bold tracking-wider text-neutral-300 uppercase">
                  {rate.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Your Recommended Direction */}
        <div className="p-4 sm:p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center mb-8">
          <span className="text-[11px] uppercase font-mono tracking-widest text-emerald-400 font-bold block mb-1">
            Your recommended direction
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display">
            {recommendedDirection}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {persona.potentialPaths.map((path, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400"
              >
                {path}
              </span>
            ))}
          </div>
        </div>

        {/* Your Roadmap (Page 7 vertical step chain) */}
        <div>
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-bold">
              Your roadmap
            </span>
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            {persona.roadmapSteps.map((st, idx) => (
              <React.Fragment key={st.step}>
                <div className="group p-4 sm:p-5 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-emerald-500/40 transition-all text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
                      {st.step}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide mb-1 font-display">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 mb-3 leading-relaxed">
                    {st.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase mr-1">
                      Key Tools:
                    </span>
                    {st.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {idx < persona.roadmapSteps.length - 1 && (
                  <div className="flex justify-center text-emerald-500/60 py-0.5">
                    <ArrowDown className="w-4 h-4 animate-pulse" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Primary CTA (Page 7): 📲 GET MY ROADMAP ON WHATSAPP */}
      <div className="space-y-4 text-center">
        <button
          onClick={handleOpenWhatsApp}
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.65)] transform hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <span className="text-2xl">📲</span>
          <span>GET MY ROADMAP ON WHATSAPP</span>
        </button>

        {/* Secondary Actions for Stall Environment */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Copy Text Roadmap</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: `AI Arena — ${persona.name}`,
                    text: `I got ${persona.name} on the AI Arena test! Check out my roadmap:`,
                    url: window.location.href
                  })
                  .catch(() => {});
              } else {
                handleCopy();
              }
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-neutral-400" />
            <span>Share Result</span>
          </button>

          {/* Next Stall Player Reset */}
          <button
            onClick={() => {
              sounds.playClick();
              if (window.confirm('Ready for next attendee? This will reset the quiz.')) {
                onReset();
              }
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Next Player (Reset)</span>
          </button>
        </div>

        <p className="text-xs text-neutral-500 pt-2 font-mono">
          Lead securely saved to AI Arena stall database · Ready for next attendee
        </p>
      </div>
    </div>
  );
};
