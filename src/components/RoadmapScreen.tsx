import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowDown,
  Check,
  Copy,
  RotateCcw,
  Share2,
  Sparkles,
  Star,
  QrCode,
  X,
  MessageSquare,
  Linkedin,
  Briefcase,
  IndianRupee,
  Compass,
  Wrench,
  Download,
  ExternalLink,
  Rocket,
  Brain,
  Palette,
  Zap,
  Users,
  Flame,
  Search,
  Sprout,
  ShieldCheck,
  Award
} from 'lucide-react';
import QRCode from 'qrcode';
import { Persona, LeadData, PersonaId } from '../types';
import { sounds } from '../utils/audio';
import { getOrganizerPhone, FORMATTED_CONTACT_PHONE, getWhatsAppContactUrl } from '../utils/storage';
import { PersonaIllustration } from './PersonaIllustrations';

export const PERSONA_THEMES: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    bgGradient: string;
    borderColor: string;
    glowShadow: string;
    textColor: string;
    accentHex: string;
    iconBg: string;
    badgePill: string;
    tag: string;
    lightRing: string;
  }
> = {
  'ai-visionary': {
    icon: Rocket,
    bgGradient: 'from-amber-500/25 via-orange-500/15 to-purple-950/40',
    borderColor: 'border-amber-400/60',
    glowShadow: 'shadow-[0_0_45px_rgba(245,158,11,0.35)]',
    textColor: 'text-amber-300',
    accentHex: '#F59E0B',
    iconBg: 'bg-amber-400/20 text-amber-300 border-amber-400/50',
    badgePill: 'bg-amber-400/20 border-amber-400/40 text-amber-300',
    tag: 'OPPORTUNITY & PRODUCT ARCHITECT',
    lightRing: 'ring-amber-400/30'
  },
  'ai-strategist': {
    icon: Brain,
    bgGradient: 'from-blue-600/25 via-indigo-600/15 to-cyan-950/40',
    borderColor: 'border-blue-400/60',
    glowShadow: 'shadow-[0_0_45px_rgba(59,130,246,0.35)]',
    textColor: 'text-blue-300',
    accentHex: '#3B82F6',
    iconBg: 'bg-blue-400/20 text-blue-300 border-blue-400/50',
    badgePill: 'bg-blue-400/20 border-blue-400/40 text-blue-300',
    tag: 'DATA & ANALYTICAL REASONER',
    lightRing: 'ring-blue-400/30'
  },
  'ai-creator': {
    icon: Palette,
    bgGradient: 'from-pink-500/25 via-rose-500/15 to-purple-950/40',
    borderColor: 'border-pink-400/60',
    glowShadow: 'shadow-[0_0_45px_rgba(244,63,94,0.35)]',
    textColor: 'text-pink-300',
    accentHex: '#EC4899',
    iconBg: 'bg-pink-400/20 text-pink-300 border-pink-400/50',
    badgePill: 'bg-pink-400/20 border-pink-400/40 text-pink-300',
    tag: 'MULTIMODAL EXPRESSIONIST',
    lightRing: 'ring-pink-400/30'
  },
  'ai-explorer': {
    icon: Zap,
    bgGradient: 'from-emerald-500/25 via-teal-500/15 to-cyan-950/40',
    borderColor: 'border-emerald-400/60',
    glowShadow: 'shadow-[0_0_45px_rgba(16,185,129,0.35)]',
    textColor: 'text-emerald-300',
    accentHex: '#10B981',
    iconBg: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/50',
    badgePill: 'bg-emerald-400/20 border-emerald-400/40 text-emerald-300',
    tag: 'FRONTIER TECH PIONEER',
    lightRing: 'ring-emerald-400/30'
  },
  'ai-connector': {
    icon: Users,
    bgGradient: 'from-orange-500/25 via-amber-500/15 to-rose-950/40',
    borderColor: 'border-orange-400/60',
    glowShadow: 'shadow-[0_0_45px_rgba(249,115,22,0.35)]',
    textColor: 'text-orange-300',
    accentHex: '#F97316',
    iconBg: 'bg-orange-400/20 text-orange-300 border-orange-400/50',
    badgePill: 'bg-orange-400/20 border-orange-400/40 text-orange-300',
    tag: 'HUMAN + AI COLLABORATOR',
    lightRing: 'ring-orange-400/30'
  },
  'ai-executor': {
    icon: Flame,
    bgGradient: 'from-red-500/25 via-orange-500/15 to-red-950/40',
    borderColor: 'border-red-400/60',
    glowShadow: 'shadow-[0_0_45px_rgba(239,68,68,0.35)]',
    textColor: 'text-red-300',
    accentHex: '#EF4444',
    iconBg: 'bg-red-400/20 text-red-300 border-red-400/50',
    badgePill: 'bg-red-400/20 border-red-400/40 text-red-300',
    tag: 'HYPERAUTOMATION ENGINE',
    lightRing: 'ring-red-400/30'
  },
  'ai-detective': {
    icon: Search,
    bgGradient: 'from-violet-500/25 via-indigo-500/15 to-cyan-950/40',
    borderColor: 'border-violet-400/60',
    glowShadow: 'shadow-[0_0_45px_rgba(139,92,246,0.35)]',
    textColor: 'text-violet-300',
    accentHex: '#8B5CF6',
    iconBg: 'bg-violet-400/20 text-violet-300 border-violet-400/50',
    badgePill: 'bg-violet-400/20 border-violet-400/40 text-violet-300',
    tag: 'INVESTIGATIVE RESEARCHER',
    lightRing: 'ring-violet-400/30'
  },
  'ai-adapter': {
    icon: Sprout,
    bgGradient: 'from-lime-500/25 via-emerald-500/15 to-teal-950/40',
    borderColor: 'border-lime-400/60',
    glowShadow: 'shadow-[0_0_45px_rgba(132,204,22,0.35)]',
    textColor: 'text-lime-300',
    accentHex: '#84CC16',
    iconBg: 'bg-lime-400/20 text-lime-300 border-lime-400/50',
    badgePill: 'bg-lime-400/20 border-lime-400/40 text-lime-300',
    tag: 'CONTINUOUS RAPID EVOLVER',
    lightRing: 'ring-lime-400/30'
  }
};

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
  const badgeTheme = PERSONA_THEMES[persona.id] || PERSONA_THEMES['ai-visionary'];
  const BadgeIcon = badgeTheme.icon;

  const [copied, setCopied] = useState(false);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [passQrUrl, setPassQrUrl] = useState('');
  const [shareCardQrUrl, setShareCardQrUrl] = useState('');
  const [organizerPhone, setOrganizerPhone] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOrganizerPhone(getOrganizerPhone());
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ai-arena.stall';
    QRCode.toDataURL(origin, { width: 180, margin: 1 })
      .then((url) => setShareCardQrUrl(url))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (showPassModal && leadData) {
      const payload = JSON.stringify({
        fullName: leadData.fullName,
        whatsappNumber: leadData.whatsappNumber,
        college: leadData.college,
        department: leadData.department,
        yearOfStudy: leadData.yearOfStudy,
        careerInterest: leadData.careerInterest,
        personaName: persona.name,
        createdAt: leadData.createdAt
      });
      QRCode.toDataURL(payload, { width: 260, margin: 2 })
        .then((url) => setPassQrUrl(url))
        .catch(() => {});
    }
  }, [showPassModal, leadData, persona]);

  // Recommended direction can incorporate their chosen interest if available
  const recommendedDirection =
    leadData?.careerInterest && leadData.careerInterest !== 'Not Sure Yet'
      ? `${leadData.careerInterest} + AI`
      : persona.defaultDirection;

  // Build formatted text for WhatsApp share
  const generateWhatsAppMessage = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const lines = [
      `🚀 *AI ARENA — My AI Career Roadmap*`,
      `👤 *Name:* ${leadData?.fullName || 'Participant'}`,
      `🏛️ *College:* ${leadData?.college || 'AI Arena Stall'}`,
      ``,
      `✨ *MY AI PERSONA:* ${persona.name} ${persona.emoji}`,
      `💡 _"${persona.tagline}"_`,
      ``,
      `💼 *Careers to Explore:*`,
      ...(persona.careersToExplore || []).map((c) => `• ${c}`),
      ``,
      `💰 *Indicative India Salary:*`,
      `• Early Career: ${persona.indicativeSalary?.early || '₹4–8 LPA'}`,
      `• Experienced: ${persona.indicativeSalary?.experienced || '₹10–20+ LPA'}`,
      ``,
      `🛠️ *Key Skills:* ${(persona.skillsToBuild || []).join(' • ')}`,
      ``,
      `🎯 *Career Move:* "${persona.careerMove || ''}"`,
      ``,
      `🗺️ *6-Step Career Roadmap:*`,
      ...persona.roadmapSteps.map((s) => `${s.step}: ${s.title}`),
      ``,
      `📍 *Tested live at AI Arena Stall Booth!*`,
      `🔗 Test your own AI persona: ${origin}`
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  // Build formatted text for LinkedIn post
  const generateLinkedInText = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `🚀 I just took the AI Career Profiler at AI Arena and my result is:

✨ ${persona.name} ${persona.emoji}
"${persona.tagline}"

💼 Top Careers to Explore:
${(persona.careersToExplore || []).map((c) => `• ${c}`).join('\n')}

💰 Indicative India Salary:
• Early Career: ${persona.indicativeSalary?.early || '₹4–8 LPA'}
• Experienced: ${persona.indicativeSalary?.experienced || '₹10–20+ LPA'}

🛠️ Key Skills to Master:
${(persona.skillsToBuild || []).join(' • ')}

🎯 My Recommended Career Move:
"${persona.careerMove || ''}"

Discover your own AI Persona & Career Roadmap here:
${origin}

#AIArena #ArtificialIntelligence #AICareers #GenerativeAI #CareerGrowth #TechIndia`;
  };

  const handleOpenWhatsApp = () => {
    sounds.playSelect();
    const text = generateWhatsAppMessage();
    const phoneParam = leadData?.whatsappNumber && !leadData.whatsappNumber.includes('Google Form')
      ? `phone=${leadData.whatsappNumber.replace(/[^0-9]/g, '')}&`
      : '';
    window.open(`https://api.whatsapp.com/send?${phoneParam}text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    sounds.playSelect();
    const postText = generateLinkedInText();
    navigator.clipboard.writeText(postText);
    setCopiedLinkedIn(true);
    setTimeout(() => setCopiedLinkedIn(false), 3000);

    const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';
    // Open LinkedIn post composer
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleCopyLink = () => {
    sounds.playClick();
    const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopy = () => {
    sounds.playClick();
    const rawText = decodeURIComponent(generateWhatsAppMessage());
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = () => {
    sounds.playClick();
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    if (navigator.share) {
      navigator
        .share({
          title: `AI Arena — ${persona.name}`,
          text: `I got ${persona.name} ${persona.emoji} on AI Arena! Here is my AI Career Roadmap:`,
          url: origin
        })
        .catch(() => {});
    } else {
      handleCopy();
    }
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

      {/* Social Sharing Highlight Header */}
      <div className="mb-6 p-4 rounded-2xl bg-neutral-900/90 border border-emerald-500/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
            <Share2 className="w-3.5 h-3.5" />
            <span>SHARE YOUR AI PERSONA</span>
          </div>
          <p className="text-xs text-neutral-300 mt-0.5">
            Showcase your {persona.name} result on WhatsApp &amp; LinkedIn
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
          <button
            onClick={handleOpenWhatsApp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black bg-[#25D366] hover:bg-[#20bd5a] shadow-[0_0_15px_rgba(37,211,102,0.35)] transition-all cursor-pointer"
          >
            <span className="text-sm">💬</span>
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleShareLinkedIn}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0A66C2] hover:bg-[#084e96] shadow-[0_0_15px_rgba(10,102,194,0.35)] transition-all cursor-pointer"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>{copiedLinkedIn ? 'Post Copied! Opening...' : 'LinkedIn'}</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setShowCardModal(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-semibold bg-neutral-800 border border-neutral-700 hover:border-emerald-500/40 text-neutral-200 hover:text-white transition-all cursor-pointer"
          >
            <span>📸 Snapshot Card</span>
          </button>
        </div>
      </div>

      {/* Visual Badge Highlighting User's Specific AI Persona with Unique Icon & Color Theme */}
      <div
        className={`relative mb-8 p-5 sm:p-7 rounded-3xl bg-gradient-to-r ${badgeTheme.bgGradient} border-2 ${badgeTheme.borderColor} ${badgeTheme.glowShadow} backdrop-blur-md overflow-hidden text-left flex flex-col md:flex-row items-center justify-between gap-5 transition-all duration-300 group`}
      >
        {/* Glow ambient background aura with persona theme accent */}
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-30 pointer-events-none group-hover:opacity-45 transition-opacity"
          style={{ backgroundColor: badgeTheme.accentHex }}
        />

        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 z-10 w-full md:w-auto">
          {/* Unique Holographic Icon & Avatar */}
          <div
            className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl ${badgeTheme.iconBg} border flex items-center justify-center shrink-0 shadow-xl ring-4 ${badgeTheme.lightRing}`}
          >
            <BadgeIcon className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse" />
            <span className="absolute -bottom-2 -right-2 text-2xl sm:text-3xl filter drop-shadow-md">
              {persona.emoji}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
              <span
                className={`px-3 py-0.5 rounded-full text-[11px] font-mono font-extrabold uppercase tracking-widest border ${badgeTheme.badgePill}`}
              >
                AI ARCHETYPE #{persona.code}
              </span>
              <span className="text-[11px] font-mono text-neutral-300 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                OFFICIALLY AUTHENTICATED
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight flex items-center justify-center sm:justify-start gap-2">
              <span>{persona.name}</span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-200 mt-1 font-medium">
              <strong className={badgeTheme.textColor}>{badgeTheme.tag}</strong> · &ldquo;{persona.tagline}&rdquo;
            </p>
          </div>
        </div>

        {/* Right side compensation badge */}
        <div className="z-10 shrink-0 w-full md:w-auto flex sm:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6 gap-1 text-center md:text-right">
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
            ESTIMATED INDIA COMPENSATION
          </span>
          <span className={`text-xl sm:text-2xl font-black font-display ${badgeTheme.textColor}`}>
            {persona.indicativeSalary?.early.split(' ')[0] || '₹5–12'} – {persona.indicativeSalary?.experienced.split(' ')[0] || '25+ LPA'}
          </span>
          <span className="text-[11px] font-mono text-neutral-300">
            {persona.defaultDirection}
          </span>
        </div>
      </div>

      {/* Main Persona Card */}
      <div className="relative rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 p-6 sm:p-8 mb-8 shadow-2xl overflow-hidden">
        {/* Ambient Top Glow using Persona Theme Accent */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: badgeTheme.accentHex }}
        />

        {/* Persona Header & Illustration */}
        <div className="text-center mb-6 pb-6 border-b border-neutral-800/80">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span
              className={`px-3 py-1 rounded-full text-xs uppercase font-mono tracking-widest font-bold border ${badgeTheme.badgePill}`}
            >
              YOUR AI PERSONA ({persona.code})
            </span>
          </div>

          <div className="flex justify-center mb-4">
            <PersonaIllustration id={persona.id} size="md" />
          </div>

          <div className="inline-flex items-center gap-3 mt-1">
            <span className="text-3xl sm:text-4xl">{persona.emoji}</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              {persona.name}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-md mx-auto italic font-medium">
            &ldquo;{persona.tagline}&rdquo;
          </p>

          {/* Star Ratings */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-6">
            {persona.ratings.map((rate, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-neutral-950/70 border border-neutral-800 px-4 py-2.5 rounded-xl min-w-[130px]"
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

        {/* 1. 💼 Careers to Explore */}
        <div className="mb-6 p-5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-left">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              💼 Careers to Explore
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {persona.careersToExplore.map((career, idx) => (
              <div
                key={idx}
                className="px-3.5 py-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800/90 flex items-center gap-2.5 hover:border-emerald-500/40 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-sm font-semibold text-neutral-100">{career}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 💰 Indicative India Salary */}
        <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-neutral-900/90 to-cyan-950/40 border border-emerald-500/30 text-left">
          <div className="flex items-center gap-2 mb-3">
            <IndianRupee className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              💰 Indicative India Salary Benchmark
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
            <div className="p-3.5 rounded-lg bg-neutral-950/80 border border-emerald-500/20">
              <span className="text-[11px] font-mono text-neutral-400 block uppercase">Early Career / Entry</span>
              <span className="text-lg sm:text-xl font-black text-emerald-300 font-display">
                {persona.indicativeSalary.early}
              </span>
            </div>
            <div className="p-3.5 rounded-lg bg-neutral-950/80 border border-cyan-500/20">
              <span className="text-[11px] font-mono text-neutral-400 block uppercase">Experienced / Specialized</span>
              <span className="text-lg sm:text-xl font-black text-cyan-300 font-display">
                {persona.indicativeSalary.experienced}
              </span>
            </div>
          </div>

          {persona.indicativeSalary.notes && (
            <p className="text-xs text-neutral-400 italic font-mono pt-1">
              📌 {persona.indicativeSalary.notes}
            </p>
          )}
        </div>

        {/* 3. 🛠️ Build These Skills */}
        <div className="mb-6 p-5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-left">
          <div className="flex items-center gap-2 mb-3">
            <Wrench className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              🛠️ Build These Skills
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {persona.skillsToBuild.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700/80 text-xs font-mono text-cyan-300 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* 4. 🎯 Your Career Move */}
        <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-500/30 text-left flex items-start gap-3">
          <Compass className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
              YOUR CAREER MOVE
            </span>
            <p className="text-sm sm:text-base font-bold text-white mt-0.5">
              {persona.careerMove}
            </p>
          </div>
        </div>

        {/* 5. 🗺️ Your 6-Step Roadmap */}
        <div>
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-bold">
              Your 6-step AI roadmap
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

      {/* Primary Actions & Social Share Hub */}
      <div className="space-y-4 text-center">
        {/* Real-time synchronization check */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-2">
          <Check className="w-3.5 h-3.5" />
          <span>OFFICIAL STALL REGISTRATION VERIFIED</span>
        </div>

        {/* Main CTA buttons: WhatsApp & LinkedIn */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleOpenWhatsApp}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-xl text-base sm:text-lg font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.65)] transform hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span className="text-xl">📲</span>
            <span>GET ROADMAP ON WHATSAPP</span>
          </button>

          <button
            onClick={handleShareLinkedIn}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm sm:text-base font-bold bg-[#0A66C2] hover:bg-[#084e96] text-white shadow-[0_0_25px_rgba(10,102,194,0.4)] transition-all cursor-pointer"
          >
            <Linkedin className="w-4 h-4" />
            <span>{copiedLinkedIn ? 'Post Copied! Opening LinkedIn...' : 'Share to LinkedIn'}</span>
          </button>
        </div>

        {/* Secondary Stall Actions */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {/* Direct WhatsApp Contact to Stall Coordinator */}
          <button
            onClick={() => {
              sounds.playSelect();
              const text = `👋 Hi Stall Coordinator! I just completed the AI Arena test at your booth.\n\n👤 Name: ${leadData?.fullName || 'Participant'}\n✨ Persona: ${persona.name} ${persona.emoji}\n🏛️ College: ${leadData?.college || ''}`;
              window.open(getWhatsAppContactUrl(text), '_blank');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 border border-emerald-500/40 text-xs font-semibold text-emerald-400 hover:bg-neutral-850 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Coordinator ({FORMATTED_CONTACT_PHONE})</span>
          </button>

          {/* Show Booth Pass QR */}
          <button
            onClick={() => {
              sounds.playClick();
              setShowPassModal(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 border border-cyan-500/40 text-xs font-semibold text-cyan-300 hover:bg-neutral-850 hover:border-cyan-400 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-cyan-400" />
            <span>Show Booth Pass (QR)</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {/* Copy Full Roadmap */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          {/* Native Share */}
          <button
            onClick={handleNativeShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-neutral-400" />
            <span>More Share</span>
          </button>

          {/* Next Stall Player Reset */}
          <button
            onClick={() => {
              sounds.playClick();
              if (window.confirm('Ready for next attendee? This will reset the quiz.')) {
                onReset();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Next Player</span>
          </button>
        </div>

        <p className="text-[11px] text-neutral-500 pt-2 font-mono">
          Registration recorded in Official Google Form · Show pass at stall desk
        </p>
      </div>

      {/* Snapshot Card Modal for Social Media Screenshot */}
      {showCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm bg-neutral-950 border border-neutral-800 rounded-3xl p-6 text-center shadow-2xl overflow-hidden">
            <button
              onClick={() => setShowCardModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-850 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Shareable Card Content */}
            <div ref={cardRef} className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                <span>AI ARENA · OFFICIAL REPORT</span>
              </div>

              <div className="flex justify-center">
                <PersonaIllustration id={persona.id} size="sm" />
              </div>

              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                  IDENTIFIED AI PERSONA
                </span>
                <div className="text-xl font-black text-white font-display flex items-center justify-center gap-2 mt-0.5">
                  <span>{persona.name}</span>
                  <span>{persona.emoji}</span>
                </div>
                <p className="text-xs text-neutral-400 italic mt-1 px-4">
                  &ldquo;{persona.tagline}&rdquo;
                </p>
              </div>

              {/* Salary Snapshot */}
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-left space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                  💰 INDICATIVE INDIA SALARY
                </span>
                <div className="text-xs font-semibold text-neutral-200">
                  {persona.indicativeSalary.early}
                </div>
                <div className="text-xs font-semibold text-cyan-300">
                  {persona.indicativeSalary.experienced}
                </div>
              </div>

              {/* Top 3 Careers */}
              <div className="text-left space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                  💼 TOP CAREER PATHS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {persona.careersToExplore.slice(0, 3).map((c, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* QR Code link to stall */}
              {shareCardQrUrl && (
                <div className="pt-2 flex items-center justify-center gap-3 border-t border-neutral-850">
                  <img src={shareCardQrUrl} alt="Scan to Play" className="w-14 h-14 rounded-lg bg-white p-1" />
                  <div className="text-left text-[11px] font-mono text-neutral-400">
                    <span className="text-white font-bold block">Take the AI Test</span>
                    <span>Scan to discover yours</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-center gap-2">
              <button
                onClick={handleShareLinkedIn}
                className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-[#0A66C2] hover:bg-[#084e96] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>Share LinkedIn</span>
              </button>
              <button
                onClick={handleOpenWhatsApp}
                className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-black bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>💬 WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attendee Booth Pass QR Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xs bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center shadow-2xl">
            <button
              onClick={() => setShowPassModal(false)}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">
              OFFLINE BOOTH VERIFICATION
            </span>
            <h3 className="text-base font-bold text-white font-display mb-1">
              Attendee Booth Pass
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Show this QR code to the stall coordinator to scan or confirm your entry!
            </p>

            {passQrUrl ? (
              <div className="p-3 bg-white rounded-xl inline-block shadow-lg mb-4">
                <img
                  src={passQrUrl}
                  alt="Attendee Pass QR"
                  className="w-48 h-48 mx-auto"
                />
              </div>
            ) : (
              <div className="w-48 h-48 mx-auto bg-neutral-800 animate-pulse rounded-xl flex items-center justify-center text-xs text-neutral-500 mb-4">
                Generating Pass...
              </div>
            )}

            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-300">
              <span className="text-neutral-500">Holder:</span> {leadData?.fullName || 'Participant'}
              <br />
              <span className="text-neutral-500">Persona:</span> {persona.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
