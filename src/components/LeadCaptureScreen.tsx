import React, { useState } from 'react';
import { Sparkles, ExternalLink, CheckCircle, Copy, Check, User, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { Persona } from '../types';
import { sounds } from '../utils/audio';
import { GOOGLE_FORM_URL, FORMATTED_CONTACT_PHONE, getWhatsAppContactUrl } from '../utils/storage';
import { PersonaIllustration } from './PersonaIllustrations';

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
}

export const LeadCaptureScreen: React.FC<LeadCaptureScreenProps> = ({
  persona,
  onSubmitLead
}) => {
  const [attendeeName, setAttendeeName] = useState('');
  const [hasOpenedForm, setHasOpenedForm] = useState(false);
  const [copiedPersona, setCopiedPersona] = useState(false);
  const [hasConfirmedSubmission, setHasConfirmedSubmission] = useState(false);

  const handleOpenGoogleForm = () => {
    sounds.playSelect();
    setHasOpenedForm(true);
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  const handleCopyPersona = () => {
    sounds.playClick();
    navigator.clipboard.writeText(persona.name);
    setCopiedPersona(true);
    setTimeout(() => setCopiedPersona(false), 2000);
  };

  const handleFinalUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playFanfare();
    setHasConfirmedSubmission(true);

    const displayName = attendeeName.trim() || 'Stall Participant';

    onSubmitLead({
      fullName: displayName,
      whatsappNumber: 'Registered via Google Form',
      college: 'AI Arena Attendee',
      department: 'Technology',
      yearOfStudy: 'Enrolled',
      careerInterest: persona.defaultDirection
    });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-12 text-center">
      {/* Top Tag & Heading */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Final Step · Official Registration</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display mb-2">
          Unlock Your AI Career Roadmap 🚀
        </h1>
        <p className="text-sm text-neutral-300 max-w-md mx-auto">
          Complete the quick official Google Form to register and reveal your custom roadmap.
        </p>
      </div>

      {/* Matched Persona Showcase Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-emerald-500/40 mb-6 shadow-xl text-left flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <PersonaIllustration id={persona.id} size="sm" />
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              YOUR ASSIGNED AI PERSONA
            </span>
            <div className="text-base sm:text-lg font-extrabold text-white font-display flex items-center gap-1.5">
              <span>{persona.name}</span>
              <span>{persona.emoji}</span>
            </div>
            <p className="text-xs text-neutral-400 italic">
              &ldquo;{persona.tagline}&rdquo;
            </p>
          </div>
        </div>

        {/* Copy button to easily paste into the Google Form */}
        <button
          type="button"
          onClick={handleCopyPersona}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 hover:border-emerald-500/50 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
          title="Copy persona to paste into Google Form"
        >
          {copiedPersona ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Copy Persona</span>
            </>
          )}
        </button>
      </div>

      {/* Main Registration Card */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm text-left space-y-6">
        {/* Step 1: Open Google Form */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center border border-emerald-500/30">
              1
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white font-display">
              Open Google Form & Submit Your Details
            </h3>
          </div>

          <p className="text-xs text-neutral-400 mb-3 ml-8 leading-relaxed">
            The Google Form collects your <strong>Full Name</strong>, <strong>WhatsApp</strong>, <strong>College</strong>, <strong>Department</strong>, <strong>Year</strong>, <strong>Career Interest</strong>, and <strong>AI Persona</strong>.
          </p>

          <div className="ml-8">
            <button
              onClick={handleOpenGoogleForm}
              className="w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Register / Submit Lead (Google Form)</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </button>

            {hasOpenedForm && (
              <p className="mt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                Google Form opened in new tab. Fill & submit!
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800" />

        {/* Step 2: Confirmation & Reveal */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center border border-cyan-500/30">
              2
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white font-display">
              Completed? Unlock Your Personalized Roadmap
            </h3>
          </div>

          <form onSubmit={handleFinalUnlock} className="ml-8 space-y-4">
            <div>
              <label className="block text-xs font-mono font-semibold tracking-wider text-neutral-300 uppercase mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                YOUR NAME (FOR ROADMAP CERTIFICATE)
              </label>
              <input
                type="text"
                value={attendeeName}
                onChange={(e) => setAttendeeName(e.target.value)}
                placeholder="Enter your name e.g. Alex"
                className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-emerald-500 text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-colors text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-neutral-800 hover:bg-neutral-750 border border-emerald-500/50 hover:border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>I&apos;ve Submitted the Form → View My Roadmap</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          </form>
        </div>

        {/* Security badge & Stall Contact */}
        <div className="space-y-2">
          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-400 flex items-center gap-2 justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Official Google Form Security · Instant Responses directly to Booth</span>
          </div>

          <div className="text-center">
            <a
              href={getWhatsAppContactUrl('Hi, I am at the AI Arena stall booth and need assistance with the registration form.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-emerald-400 transition-colors font-mono"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>Need help at booth? WhatsApp Coordinator: <strong className="text-white hover:underline">{FORMATTED_CONTACT_PHONE}</strong></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
