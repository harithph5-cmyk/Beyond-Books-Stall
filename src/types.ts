export type QuestionOption = {
  id: string;
  emoji: string;
  text: string;
  traits: {
    creative?: number;
    aiExplorer?: number;
    strategist?: number;
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
  | 'creative-builder'
  | 'ai-explorer'
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
