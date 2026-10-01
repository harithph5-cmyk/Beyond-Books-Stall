import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ExternalLink,
  CheckCircle,
  Copy,
  Check,
  User,
  ArrowRight,
  ShieldCheck,
  Phone,
  Paperclip,
  Download,
  MessageSquare
} from 'lucide-react';
import { Persona } from '../types';
import { sounds } from '../utils/audio';
import { GOOGLE_FORM_URL, FORMATTED_CONTACT_PHONE, getWhatsAppContactUrl } from '../utils/storage';
import { PersonaIllustration } from './PersonaIllustrations';
import { PERSONA_THEMES } from './RoadmapScreen';

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
  const [hasOpenedForm, setHasOpenedForm] = useState(true);
  const [copiedPersona, setCopiedPersona] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [downloadedCard, setDownloadedCard] = useState(false);
  const [returnedFromForm, setReturnedFromForm] = useState(false);
  const [, setHasConfirmedSubmission] = useState(false);

  useEffect(() => {
    const onFocus = () => {
      setReturnedFromForm(true);
    };
    window.addEventListener('focus', onFocus);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        setReturnedFromForm(true);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const theme = PERSONA_THEMES[persona.id] || PERSONA_THEMES['ai-visionary'];

  const attachedMessageText = `🚀 I just discovered my AI Era Personality on AI Arena!

✨ MY PERSONA: ${persona.name} ${persona.emoji}
"${persona.tagline}"

💼 Top Careers: ${(persona.careersToExplore || []).slice(0, 3).join(', ')}
💰 Salary Benchmark: ${persona.indicativeSalary?.early || '₹4–8 LPA'} (Early) · ${persona.indicativeSalary?.experienced || '₹10–20+ LPA'} (Exp)
🛠️ Key Skills: ${(persona.skillsToBuild || []).slice(0, 4).join(' • ')}
🎯 Career Move: "${persona.careerMove || ''}"

Take the test to discover your AI career roadmap!`;

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

  const handleCopyAttachedMessage = () => {
    sounds.playClick();
    navigator.clipboard.writeText(attachedMessageText);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const handleShareAttachedMessage = () => {
    sounds.playSelect();
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(attachedMessageText)}`, '_blank');
  };

  const handleDownloadCard = () => {
    sounds.playClick();
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Dark cyber background
      const bg = ctx.createLinearGradient(0, 0, 800, 480);
      bg.addColorStop(0, '#09090b');
      bg.addColorStop(1, '#18181b');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 800, 480);

      // Accent border
      ctx.strokeStyle = theme.accentHex;
      ctx.lineWidth = 4;
      ctx.strokeRect(16, 16, 768, 448);

      // Top Tag
      ctx.fillStyle = theme.accentHex;
      ctx.font = 'bold 16px monospace';
      ctx.fillText('AI ARENA · OFFICIAL AI PERSONA CARD', 40, 55);

      // Persona Name & Emoji
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(`${persona.name} ${persona.emoji}`, 40, 105);

      // Tagline
      ctx.fillStyle = '#d4d4d8';
      ctx.font = 'italic 18px sans-serif';
      ctx.fillText(`"${persona.tagline}"`, 40, 140);

      // Compensation Box
      ctx.fillStyle = '#27272a';
      ctx.fillRect(40, 168, 720, 72);
      ctx.fillStyle = theme.accentHex;
      ctx.font = 'bold 13px monospace';
      ctx.fillText('INDICATIVE INDIA COMPENSATION:', 55, 194);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(
        `${persona.indicativeSalary?.early || ''}   |   ${persona.indicativeSalary?.experienced || ''}`,
        55,
        224
      );

      // Top Careers
      ctx.fillStyle = '#a1a1aa';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('CAREERS TO EXPLORE:', 40, 275);
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px sans-serif';
      ctx.fillText((persona.careersToExplore || []).slice(0, 4).join('   •   '), 40, 305);

      // Skills to Build
      ctx.fillStyle = '#a1a1aa';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('SKILLS TO BUILD:', 40, 350);
      ctx.fillStyle = theme.accentHex;
      ctx.font = '16px sans-serif';
      ctx.fillText((persona.skillsToBuild || []).slice(0, 5).join('   •   '), 40, 380);

      // Footer
      ctx.fillStyle = '#71717a';
      ctx.font = '12px monospace';
      ctx.fillText('Tested live at AI Arena Stall Booth · ai-arena.stall', 40, 435);

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${persona.id}-persona-card.png`;
      link.href = dataUrl;
      link.click();
      setDownloadedCard(true);
      setTimeout(() => setDownloadedCard(false), 2500);
    } catch {
      handleCopyPersona();
    }
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
      <div className="mb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-400 text-xs font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Google Form Closed · Registration Complete</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display">
          Welcome Back! Google Form Submitted 🎉
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 max-w-lg mx-auto leading-relaxed">
          You have entered and closed the Google Form. All your responses are recorded. Your personalized AI Career Roadmap is unlocked and ready to view below!
        </p>

        {returnedFromForm && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-mono flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.25)] animate-pulse">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Google Form closed &amp; detected! Ready to view roadmap.</span>
          </div>
        )}
      </div>

      {/* Matched Persona Showcase Card Attached With Message */}
      <div
        className={`relative mb-6 rounded-2xl bg-gradient-to-br ${theme.bgGradient} border-2 ${theme.borderColor} ${theme.glowShadow} p-4 sm:p-6 shadow-2xl backdrop-blur-md text-left overflow-hidden space-y-4`}
      >
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: theme.accentHex }}
        />

        {/* Attachment Header Label */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-neutral-300">
            <Paperclip className="w-3.5 h-3.5 text-emerald-400 rotate-45" />
            <span className="font-bold tracking-wider uppercase">ATTACHED CARD IMAGE &amp; MESSAGE</span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border ${theme.badgePill}`}>
            ARCHETYPE #{persona.code}
          </span>
        </div>

        {/* Visual Card Image Preview */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-neutral-950/80 border border-white/10 rounded-xl p-3.5 sm:p-4">
          <div className="shrink-0 flex items-center justify-center">
            <PersonaIllustration id={persona.id} size="sm" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-base sm:text-lg font-black text-white font-display flex items-center gap-1.5">
                <span>{persona.name}</span>
                <span>{persona.emoji}</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${theme.textColor} bg-white/5`}>
                {theme.tag}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 italic mb-2">
              &ldquo;{persona.tagline}&rdquo;
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                💰 {persona.indicativeSalary?.early || '₹4–8 LPA'} (Early)
              </span>
              <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-cyan-300">
                🚀 {persona.indicativeSalary?.experienced || '₹10–20+ LPA'} (Exp)
              </span>
            </div>
          </div>
        </div>

        {/* Attached Shareable Message Preview */}
        <div className="p-3.5 rounded-xl bg-neutral-950/90 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-300 font-semibold">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              Attached Share Message:
            </span>
            <span className="text-[10px] text-neutral-500">Auto-formatted for WhatsApp / LinkedIn</span>
          </div>

          <div className="p-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800/80 font-mono text-xs text-neutral-300 leading-relaxed whitespace-pre-line select-all">
            {attachedMessageText}
          </div>
        </div>

        {/* Attached Card Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            {/* Download Card Image */}
            <button
              type="button"
              onClick={handleDownloadCard}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-emerald-500/50 text-xs font-mono font-semibold text-neutral-200 hover:text-white transition-all cursor-pointer shadow-sm"
              title="Download high-resolution Persona Card image"
            >
              {downloadedCard ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Card Saved!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Card Image</span>
                </>
              )}
            </button>

            {/* Copy Persona Name (for Google Form) */}
            <button
              type="button"
              onClick={handleCopyPersona}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-emerald-500/50 text-xs font-mono text-neutral-200 hover:text-white transition-all cursor-pointer shadow-sm"
              title="Copy Persona to paste into Google Form"
            >
              {copiedPersona ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Persona Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy Persona</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy Full Attached Message */}
            <button
              type="button"
              onClick={handleCopyAttachedMessage}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-emerald-500/50 text-xs font-mono text-neutral-200 hover:text-white transition-all cursor-pointer shadow-sm"
              title="Copy full message text to clipboard"
            >
              {copiedMessage ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Message Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy Message</span>
                </>
              )}
            </button>

            {/* Quick Share to WhatsApp with Attached Message */}
            <button
              type="button"
              onClick={handleShareAttachedMessage}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-xs font-bold text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(37,211,102,0.3)]"
            >
              <span>💬 WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Registration & Instant Roadmap Unlock Card */}
      <div className="relative rounded-2xl bg-gradient-to-b from-neutral-900/95 via-neutral-900/90 to-neutral-950/95 border-2 border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)] p-6 sm:p-8 text-left space-y-6 backdrop-blur-md overflow-hidden">
        {/* Top vibrant cyber gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400" />

        {/* Status Callout */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white font-display flex items-center gap-2">
              <span>Google Form Closed &amp; Verified</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                UNLOCKED
              </span>
            </h3>
            <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
              Your details are recorded! Click below to directly view your verified AI Career Roadmap with all salary benchmarks, skills, and next steps.
            </p>
          </div>
        </div>

        {/* Direct Action Form */}
        <form onSubmit={handleFinalUnlock} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono font-semibold tracking-wider text-neutral-300 uppercase flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>NAME FOR ROADMAP CERTIFICATE (OPTIONAL)</span>
              </label>
              <span className="text-[11px] font-mono text-neutral-500">Auto-filled if skipped</span>
            </div>
            <input
              type="text"
              value={attendeeName}
              onChange={(e) => setAttendeeName(e.target.value)}
              placeholder="Enter your name (e.g. Alex) or leave blank"
              className="w-full px-4 py-3.5 rounded-xl bg-neutral-950/90 border border-neutral-700/80 focus:border-emerald-400 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all text-sm font-medium"
            />
          </div>

          {/* Primary View Roadmap Button */}
          <button
            type="submit"
            className="group relative w-full py-4 sm:py-5 px-6 rounded-xl font-extrabold text-base sm:text-lg text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_35px_rgba(16,185,129,0.45)] hover:shadow-[0_0_55px_rgba(16,185,129,0.7)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-black" />
            <span>I SUBMITTED THE FORM → VIEW MY ROADMAP NOW 🚀</span>
            <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1.5 transition-transform" />
          </button>
        </form>

        {/* Secondary: Quick Link to Re-open Google Form */}
        <div className="pt-2 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-neutral-400 text-xs">
            Haven&apos;t opened the Google Form yet?
          </span>
          <button
            type="button"
            onClick={handleOpenGoogleForm}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
          >
            <span>Open Google Form</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Security badge & Stall Contact */}
        <div className="space-y-2 pt-2">
          <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 text-[11px] font-mono text-neutral-400 flex items-center gap-2 justify-center">
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
