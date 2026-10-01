export type QuestionOption = {
  id: string;
  emoji: string;
  text: string;
  traits: {
    visionary?: number;
    strategist?: number;
    creator?: number;
    explorer?: number;
    connector?: number;
    executor?: number;
    detective?: number;
    adapter?: number;
    creative?: number;
    aiExplorer?: number;
    problemSolver?: number;
    designer?: number;
    entrepreneur?: number;
  };
};

export type Question = {
  id: number;
  category: string;
  question: string;
  options: QuestionOption[];
};

export type PersonaId =
  | 'ai-visionary'
  | 'ai-strategist'
  | 'ai-creator'
  | 'ai-explorer'
  | 'ai-connector'
  | 'ai-executor'
  | 'ai-detective'
  | 'ai-adapter'
  | 'creative-builder'
  | 'digital-strategist'
  | 'problem-solver'
  | 'experience-designer'
  | 'ai-entrepreneur';

export type Persona = {
  id: PersonaId;
  code: string; // '01', '02', etc.
  name: string;
  emoji: string;
  tagline: string;
  careersToExplore: string[];
  indicativeSalary: {
    early: string;
    experienced: string;
    notes?: string;
  };
  skillsToBuild: string[];
  careerMove: string;
  interests: string[];
  potentialPaths: string[];
  ratings: {
    label: string;
    score: number; // 1 to 5
  }[];
  defaultDirection: string;
  strengths: string[];
  badgeColor: string;
  roadmapSteps: {
    step: string;
    title: string;
    desc: string;
    tools: string[];
  }[];
};

export type LeadData = {
  id: string;
  fullName: string;
  whatsappNumber: string;
  college: string;
  department: string;
  yearOfStudy: string;
  careerInterest: string;
  personaId: PersonaId;
  personaName: string;
  createdAt: string;
  answers: Record<number, string>;
};

export type AppStage =
  | 'start'
  | 'quiz'
  | 'analyzing'
  | 'teaser'
  | 'form'
  | 'roadmap';
