import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { AppStage, LeadData, Persona } from './types';
import { QUESTIONS } from './data/questions';
import { determinePersona, PERSONAS } from './data/personas';
import { getStoredLeads, saveLead, syncLeadsWithServer } from './utils/storage';
import { sounds } from './utils/audio';

import { TopNav } from './components/TopNav';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { AnalyzingScreen } from './components/AnalyzingScreen';
import { TeaserScreen } from './components/TeaserScreen';
import { LeadCaptureScreen } from './components/LeadCaptureScreen';
import { RoadmapScreen } from './components/RoadmapScreen';
import { StallLeadsModal } from './components/StallLeadsModal';
import { StallQrModal } from './components/StallQrModal';

export default function App() {
  const [stage, setStage] = useState<AppStage>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [detectedPersona, setDetectedPersona] = useState<Persona>(PERSONAS['creative-builder']);
  const [currentLead, setCurrentLead] = useState<LeadData | null>(null);

  // Stall Organizer Modals & Sound
  const [isLeadsModalOpen, setIsLeadsModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [leadsList, setLeadsList] = useState<LeadData[]>([]);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Sync leads from server & storage
  const refreshLeads = useCallback(async () => {
    // 1. Immediately load local leads to prevent blank counter
    const local = getStoredLeads();
    setLeadsList(local);

    // 2. Fetch fresh leads from server and update
    try {
      const serverLeads = await syncLeadsWithServer();
      setLeadsList(serverLeads);
    } catch {
      // Keep local
    }
  }, []);

  useEffect(() => {
    refreshLeads();
    setIsSoundMuted(sounds.isMuted());

    // Live background polling so attendees submitting on their phones appear on this screen in real-time
    const interval = setInterval(() => {
      refreshLeads();
    }, 5000);

    return () => clearInterval(interval);
  }, [refreshLeads]);

  // Restart / Reset for Next Stall Player
  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setCurrentLead(null);
    setDetectedPersona(PERSONAS['creative-builder']);
    setStage('start');
  };

  // Start the Quiz
  const handleStart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setStage('quiz');
  };

  // User selects an option
  const handleSelectOption = (questionId: number, optionId: string) => {
    const updatedAnswers = { ...answers, [questionId]: optionId };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Finished all 5 questions! Calculate persona and launch analyzing sequence
      const matched = determinePersona(updatedAnswers);
      setDetectedPersona(matched);
      setStage('analyzing');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Lead form submission
  const handleSubmitLead = (formData: {
    fullName: string;
    whatsappNumber: string;
    college: string;
    department: string;
    yearOfStudy: string;
    careerInterest: string;
  }) => {
    const newLead: LeadData = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...formData,
      personaId: detectedPersona.id,
      personaName: detectedPersona.name,
      createdAt: new Date().toISOString(),
      answers
    };

    saveLead(newLead);
    setCurrentLead(newLead);
    refreshLeads();

    // Trigger victory fanfare & confetti explosion!
    sounds.playFanfare();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#06B6D4', '#F59E0B', '#EC4899', '#8B5CF6']
    });

    setStage('roadmap');
  };

  // Stage progress percentage calculation for subtle top progress line
  const stageProgressMap: Record<AppStage, number> = {
    start: 10,
    quiz: 20 + ((currentQuestionIndex + 1) / QUESTIONS.length) * 35, // 20% to 55%
    analyzing: 65,
    teaser: 75,
    form: 88,
    roadmap: 100
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Header */}
      <TopNav
        stage={stage}
        leadCount={leadsList.length}
        onOpenLeads={() => setIsLeadsModalOpen(true)}
        onOpenQr={() => setIsQrModalOpen(true)}
        onReset={handleReset}
        isSoundMuted={isSoundMuted}
        onToggleSound={() => setIsSoundMuted(sounds.toggleMute())}
      />

      {/* Main Interactive Stage Flow with Animated UI */}
      <main className="flex-1 flex flex-col justify-center relative overflow-hidden">
        {/* Animated Cyber Grid Background */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Animated Ambient Glowing Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.22, 0.12],
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-24 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.18, 0.08],
            x: [0, -30, 0],
            y: [0, 25, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
          className="absolute -bottom-24 right-1/4 w-[30rem] h-[30rem] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none"
        />

        {/* Animated Scanning Cyber Beam */}
        <motion.div
          animate={{
            top: ['-10%', '110%']
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent pointer-events-none shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        />

        {/* Subtle Top Dynamic Progress Bar for Current Stage */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-900/60 z-20">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            initial={{ width: '10%' }}
            animate={{ width: `${stageProgressMap[stage]}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        {/* Interactive Content Stage with AnimatePresence */}
        <AnimatePresence mode="wait">
          {stage === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative z-10"
            >
              <StartScreen
                onStart={handleStart}
                onOpenQr={() => setIsQrModalOpen(true)}
              />
            </motion.div>
          )}

          {stage === 'quiz' && (
            <motion.div
              key={`quiz-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative z-10"
            >
              <QuizScreen
                questions={QUESTIONS}
                currentQuestionIndex={currentQuestionIndex}
                answers={answers}
                onSelectOption={handleSelectOption}
                onPrevious={handlePreviousQuestion}
              />
            </motion.div>
          )}

          {stage === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative z-10"
            >
              <AnalyzingScreen
                onComplete={() => setStage('teaser')}
              />
            </motion.div>
          )}

          {stage === 'teaser' && (
            <motion.div
              key="teaser"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative z-10"
            >
              <TeaserScreen
                persona={detectedPersona}
                onUnlock={() => setStage('form')}
              />
            </motion.div>
          )}

          {stage === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative z-10"
            >
              <LeadCaptureScreen
                persona={detectedPersona}
                onSubmitLead={handleSubmitLead}
                onBack={() => setStage('teaser')}
              />
            </motion.div>
          )}

          {stage === 'roadmap' && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative z-10"
            >
              <RoadmapScreen
                persona={detectedPersona}
                leadData={currentLead}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="w-full py-4 border-t border-neutral-900 text-center text-xs text-neutral-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white font-display">AI ARENA</span>
            <span>·</span>
            <span>Interactive Lead Generation Stall Engine</span>
          </div>
          <div className="text-[11px] font-mono text-neutral-400">
            Fast 30-Sec AI Test · Zero Latency
          </div>
        </div>
      </footer>

      {/* Stall Organizer Lead Vault Modal */}
      <StallLeadsModal
        isOpen={isLeadsModalOpen}
        onClose={() => setIsLeadsModalOpen(false)}
        leads={leadsList}
        onRefreshLeads={refreshLeads}
      />

      {/* Attendee Queue QR Code Modal */}
      <StallQrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />
    </div>
  );
}

