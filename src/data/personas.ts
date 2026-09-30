import { Persona, PersonaId } from '../types';
import { QUESTIONS } from './questions';

export const PERSONAS: Record<PersonaId, Persona> = {
  'creative-builder': {
    id: 'creative-builder',
    code: '01',
    name: 'THE CREATIVE BUILDER',
    emoji: '🎨',
    tagline: "You don't just consume. You make. Ideas → things.",
    interests: ['Creativity', 'Design', 'Technology'],
    potentialPaths: [
      'AI + UI/UX',
      'AI Content Creation',
      'AI Marketing',
      'Creative AI'
    ],
    ratings: [
      { label: 'CREATIVITY', score: 5 },
      { label: 'TECH CURIOSITY', score: 4 },
      { label: 'PROBLEM SOLVING', score: 5 }
    ],
    defaultDirection: 'AI + Digital Marketing',
    strengths: ['Visual Storytelling', 'Rapid Prototyping', 'Creative AI Tooling'],
    badgeColor: 'from-amber-400 to-rose-500',
    roadmapSteps: [
      {
        step: 'STEP 01',
        title: 'AI FUNDAMENTALS',
        desc: 'Master the core mechanics of modern generative AI, neural models, and prompt structures.',
        tools: ['ChatGPT', 'Claude', 'Midjourney']
      },
      {
        step: 'STEP 02',
        title: 'PROMPT ENGINEERING',
        desc: 'Craft structured, high-yield system instructions and creative multimodal prompts.',
        tools: ['System Prompts', 'Few-Shot Chaining', 'DALL-E 3']
      },
      {
        step: 'STEP 03',
        title: 'AI CONTENT CREATION',
        desc: 'Produce high-converting visual assets, dynamic videos, and branded copy in minutes.',
        tools: ['Canva AI', 'Runway Gen-3', 'ElevenLabs']
      },
      {
        step: 'STEP 04',
        title: 'AI DIGITAL MARKETING',
        desc: 'Harness predictive trend modeling and AI-driven content scheduling for viral reach.',
        tools: ['Meta AI Ads', 'Notion AI', 'Google Performance Max']
      },
      {
        step: 'STEP 05',
        title: 'AI AUTOMATION',
        desc: 'Build automated workflows that link creative tools with client distribution channels.',
        tools: ['Make.com', 'Zapier AI', 'n8n']
      },
      {
        step: 'STEP 06',
        title: 'BUILD YOUR FIRST AI PROJECT',
        desc: 'Ship a live portfolio project or launch an AI-powered creative agency showcase.',
        tools: ['Figma', 'Vercel / Webflow', 'WhatsApp Lead Bot']
      }
    ]
  },

  'ai-explorer': {
    id: 'ai-explorer',
    code: '02',
    name: 'THE AI EXPLORER',
    emoji: '🤖',
    tagline: 'You probably ask AI random questions at 2 AM. Curiosity = your superpower.',
    interests: ['AI', 'Experimentation', 'New technology'],
    potentialPaths: [
      'Generative AI',
      'AI Automation',
      'Prompt Engineering',
      'AI Product Development'
    ],
    ratings: [
      { label: 'TECH CURIOSITY', score: 5 },
      { label: 'EXPERIMENTATION', score: 5 },
      { label: 'LOGICAL THINKING', score: 4 }
    ],
    defaultDirection: 'Generative AI & Automation',
    strengths: ['Experimental Agility', 'Agent Architecture', 'Tool Chaining'],
    badgeColor: 'from-emerald-400 to-cyan-500',
    roadmapSteps: [
      {
        step: 'STEP 01',
        title: 'AI & LLM FOUNDATIONS',
        desc: 'Understand tokenization, context windows, parameters, and fine-tuning fundamentals.',
        tools: ['Hugging Face', 'Google Gemini Studio', 'Ollama']
      },
      {
        step: 'STEP 02',
        title: 'ADVANCED PROMPT ARCHITECTURE',
        desc: 'Master multi-agent orchestration, chain-of-thought, and JSON function calling.',
        tools: ['OpenAI SDK', 'Gemini TypeScript', 'Anthropic Artifacts']
      },
      {
        step: 'STEP 03',
        title: 'AI WORKFLOW AUTOMATION',
        desc: 'Connect models to webhooks, databases, and APIs without writing boilerplate code.',
        tools: ['Make.com', 'n8n Cloud', 'LangConnect']
      },
      {
        step: 'STEP 04',
        title: 'AGENTIC AI & ASSISTANTS',
        desc: 'Deploy autonomous agents that can search the web, execute tasks, and retrieve files.',
        tools: ['LangChain', 'CrewAI', 'AutoGen']
      },
      {
        step: 'STEP 05',
        title: 'VECTOR EMBEDDINGS & RAG',
        desc: 'Ground AI on company databases, custom PDFs, and enterprise documentation.',
        tools: ['ChromaDB', 'Pinecone', 'Supabase Vector']
      },
      {
        step: 'STEP 06',
        title: 'SHIP A PRODUCTION AI AGENT',
        desc: 'Deploy a live AI assistant or tool used by real students and stall attendees.',
        tools: ['Streamlit / React', 'Cloud Run', 'GitHub']
      }
    ]
  },

  'digital-strategist': {
    id: 'digital-strategist',
    code: '03',
    name: 'THE DIGITAL STRATEGIST',
    emoji: '📈',
    tagline: 'You see the algorithm before everyone else does. Clicks. Data. Growth.',
    interests: ['Marketing', 'Trends', 'Communication'],
    potentialPaths: [
      'AI Digital Marketing',
      'Performance Marketing',
      'SEO',
      'Growth Marketing'
    ],
    ratings: [
      { label: 'STRATEGY & TRENDS', score: 5 },
      { label: 'COMMUNICATION', score: 5 },
      { label: 'TECH APPLICATION', score: 4 }
    ],
    defaultDirection: 'AI Digital Marketing & Growth',
    strengths: ['Growth Funnels', 'Viral Messaging', 'Data-Driven Positioning'],
    badgeColor: 'from-blue-400 to-indigo-500',
    roadmapSteps: [
      {
        step: 'STEP 01',
        title: 'DIGITAL MARKETING BASICS',
        desc: 'Understand acquisition channels, audience psychographics, and conversion funnels.',
        tools: ['Google Trends', 'Meta Business Suite', 'LinkedIn Analytics']
      },
      {
        step: 'STEP 02',
        title: 'AI CONTENT & CAMPAIGN ENGINES',
        desc: 'Use AI to generate dozens of personalized ad variations and social hooks in seconds.',
        tools: ['Copy.ai', 'Midjourney', 'CapCut AI']
      },
      {
        step: 'STEP 03',
        title: 'DATA & AUDIENCE ANALYTICS',
        desc: 'Extract actionable buyer insights and sentiment analysis using AI data processors.',
        tools: ['Google Analytics 4', 'Semrush AI', 'Hotjar']
      },
      {
        step: 'STEP 04',
        title: 'AI-POWERED SEO & REACH',
        desc: 'Rank content on search engines and LLM search results like Perplexity and SearchGPT.',
        tools: ['Ahrefs', 'SurferSEO', 'Perplexity Pro']
      },
      {
        step: 'STEP 05',
        title: 'FUNNEL AUTOMATION & CRO',
        desc: 'Build automated lead magnets and WhatsApp nurturing flows for peak conversion.',
        tools: ['HubSpot AI', 'WhatsApp Business API', 'ManyChat']
      },
      {
        step: 'STEP 06',
        title: 'LAUNCH A REAL CLIENT CAMPAIGN',
        desc: 'Run a live acquisition campaign driving measurable attendees and verified leads.',
        tools: ['Meta Ads', 'Google Ads', 'Stall Lead CRM']
      }
    ]
  },

  'problem-solver': {
    id: 'problem-solver',
    code: '04',
    name: 'THE PROBLEM SOLVER',
    emoji: '🧠',
    tagline: "Give you a mess. You'll find the pattern. Chaos → solution.",
    interests: ['Logic', 'Analysis', 'Problem solving'],
    potentialPaths: [
      'AI/ML',
      'Data Analytics',
      'Automation',
      'Software Development'
    ],
    ratings: [
      { label: 'LOGIC & ANALYSIS', score: 5 },
      { label: 'PROBLEM SOLVING', score: 5 },
      { label: 'TECHNICAL FOCUS', score: 4 }
    ],
    defaultDirection: 'AI Engineering & Data Analytics',
    strengths: ['Root Cause Analysis', 'Algorithmic Rigor', 'System Reliability'],
    badgeColor: 'from-violet-400 to-purple-600',
    roadmapSteps: [
      {
        step: 'STEP 01',
        title: 'PROGRAMMING & DATA FOUNDATIONS',
        desc: 'Master Python/TypeScript data structures, algorithms, and modular clean code.',
        tools: ['Python 3.12', 'VS Code', 'GitHub']
      },
      {
        step: 'STEP 02',
        title: 'DATA ANALYSIS & MODELING',
        desc: 'Manipulate large datasets, clean anomalies, and extract predictive patterns.',
        tools: ['Pandas', 'NumPy', 'Jupyter Lab']
      },
      {
        step: 'STEP 03',
        title: 'APPLIED MACHINE LEARNING',
        desc: 'Train regression, classification, and neural models on real-world test sets.',
        tools: ['Scikit-learn', 'PyTorch', 'TensorFlow']
      },
      {
        step: 'STEP 04',
        title: 'API & BACKEND INTEGRATION',
        desc: 'Expose predictive models as robust REST and WebSocket microservices.',
        tools: ['FastAPI', 'Node/Express', 'Docker']
      },
      {
        step: 'STEP 05',
        title: 'INTELLIGENT AUTOMATION SCRIPTS',
        desc: 'Automate repetitive system tasks and data aggregation pipelines.',
        tools: ['Selenium / Playwright', 'cron', 'Airflow']
      },
      {
        step: 'STEP 06',
        title: 'BUILD AN END-TO-END AI SOLUTION',
        desc: 'Deploy a full-stack data product with live inference, analytics, and metrics.',
        tools: ['PostgreSQL', 'Cloud Run / AWS', 'Grafana']
      }
    ]
  },

  'experience-designer': {
    id: 'experience-designer',
    code: '05',
    name: 'THE EXPERIENCE DESIGNER',
    emoji: '✨',
    tagline: 'You notice the tiny things everyone else misses. Make it useful. Make it beautiful.',
    interests: ['Visuals', 'User experience', 'Creativity'],
    potentialPaths: [
      'UI/UX',
      'Product Design',
      'AI Design',
      'Creative Technology'
    ],
    ratings: [
      { label: 'VISUAL INTUITION', score: 5 },
      { label: 'USER EMPATHY', score: 5 },
      { label: 'CREATIVE TECH', score: 4 }
    ],
    defaultDirection: 'AI-Powered UI/UX & Product Design',
    strengths: ['Design Systems', 'Micro-Interactions', 'Human-Centered Flow'],
    badgeColor: 'from-pink-400 to-rose-500',
    roadmapSteps: [
      {
        step: 'STEP 01',
        title: 'DESIGN PRINCIPLES & FIGMA MASTERY',
        desc: 'Master typographic scales, spatial 8pt grids, color harmony, and design tokens.',
        tools: ['Figma', 'Auto-Layout', 'Design Systems']
      },
      {
        step: 'STEP 02',
        title: 'USER RESEARCH & PSYCHOLOGY',
        desc: 'Map customer journeys, conduct user interviews, and synthesize usability testing.',
        tools: ['Miro', 'UserTesting', 'Optimal Sort']
      },
      {
        step: 'STEP 03',
        title: 'GENERATIVE AI FOR DESIGNERS',
        desc: 'Accelerate moodboards, synthetic user personas, and high-fidelity mockups.',
        tools: ['Midjourney v6', 'Galileo AI', 'Relume']
      },
      {
        step: 'STEP 04',
        title: 'INTERACTIVE PROTOTYPING',
        desc: 'Build clickable, fluid prototypes with realistic tactile physics and transitions.',
        tools: ['ProtoPie', 'Framer', 'Rive']
      },
      {
        step: 'STEP 05',
        title: 'DESIGN SYSTEM ENGINEERING',
        desc: 'Translate Figma variables and atomic components into code-ready Tailwind tokens.',
        tools: ['Tailwind CSS', 'shadcn/ui', 'Storybook']
      },
      {
        step: 'STEP 06',
        title: 'BUILD A TESTED PRODUCT PROTOTYPE',
        desc: 'Publish a polished web app case study verified with real user usability scores.',
        tools: ['Framer Site', 'Behance Case Study', 'Loom']
      }
    ]
  },

  'ai-entrepreneur': {
    id: 'ai-entrepreneur',
    code: '06',
    name: 'THE AI ENTREPRENEUR',
    emoji: '🚀',
    tagline: 'You don\'t ask “Can this work?” You ask “How do I build it?”',
    interests: ['Business', 'Ideas', 'Innovation', 'Leadership'],
    potentialPaths: [
      'AI Automation',
      'AI SaaS',
      'Digital Business',
      'AI Entrepreneurship'
    ],
    ratings: [
      { label: 'STRATEGIC VISION', score: 5 },
      { label: 'INNOVATION', score: 5 },
      { label: 'EXECUTION DRIVE', score: 4 }
    ],
    defaultDirection: 'AI Automation & SaaS Ventures',
    strengths: ['Opportunity Spotting', 'Rapid Monetization', 'Team Leadership'],
    badgeColor: 'from-amber-400 to-orange-500',
    roadmapSteps: [
      {
        step: 'STEP 01',
        title: 'MARKET GAP & PROBLEM DISCOVERY',
        desc: 'Identify burning friction points in local businesses, students, or stall operators.',
        tools: ['Reddit / Twitter Scrapers', 'Google Trends', 'Apollo.io']
      },
      {
        step: 'STEP 02',
        title: 'NO-CODE & AI MVP TOOLS',
        desc: 'Assemble functional prototypes in 48 hours without months of custom engineering.',
        tools: ['Bubble', 'FlutterFlow', 'Cursor AI']
      },
      {
        step: 'STEP 03',
        title: 'AUTOMATION & AGENT STACK',
        desc: 'Integrate LLM API workflows that automate 90% of business fulfillment tasks.',
        tools: ['Make.com', 'OpenAI Assistants', 'Stripe Payments']
      },
      {
        step: 'STEP 04',
        title: 'BUSINESS MODEL & PRICING',
        desc: 'Formulate recurring subscription tiers, unit economics, and client contracts.',
        tools: ['Notion Pitch Decks', 'Stripe Billing', 'DocuSign']
      },
      {
        step: 'STEP 05',
        title: 'GO-TO-MARKET & COLD ACQUISITION',
        desc: 'Deploy automated cold outreach and social proof engines to secure paying users.',
        tools: ['Instantly.ai', 'LinkedIn Sales Nav', 'WhatsApp Outreach']
      },
      {
        step: 'STEP 06',
        title: 'LAUNCH YOUR MONETIZED VENTURE',
        desc: 'Acquire your first 10 paying customers and establish an autonomous cash-flow loop.',
        tools: ['Product Hunt', 'Stripe Dashboard', 'Customer CRM']
      }
    ]
  }
};

export const CAREER_INTEREST_OPTIONS = [
  'AI & Generative AI',
  'Digital Marketing',
  'UI/UX Design',
  'Full Stack Development',
  'Data Analytics',
  'Automation',
  'Cybersecurity',
  'Not Sure Yet'
];

export const YEAR_OF_STUDY_OPTIONS = [
  '1st Year (Fresher)',
  '2nd Year (Sophomore)',
  '3rd Year (Junior)',
  '4th Year (Final Year)',
  'Post Graduate / Masters',
  'Recent Graduate / Working'
];

/**
 * Score answers against persona traits to determine the best match
 */
export function determinePersona(answers: Record<number, string>): Persona {
  const scores: Record<PersonaId, number> = {
    'creative-builder': 0,
    'ai-explorer': 0,
    'digital-strategist': 0,
    'problem-solver': 0,
    'experience-designer': 0,
    'ai-entrepreneur': 0
  };

  QUESTIONS.forEach((q) => {
    const selectedOptionId = answers[q.id];
    const option = q.options.find((o) => o.id === selectedOptionId);
    if (!option) return;

    if (option.traits.creative) scores['creative-builder'] += option.traits.creative;
    if (option.traits.aiExplorer) scores['ai-explorer'] += option.traits.aiExplorer;
    if (option.traits.strategist) scores['digital-strategist'] += option.traits.strategist;
    if (option.traits.problemSolver) scores['problem-solver'] += option.traits.problemSolver;
    if (option.traits.designer) scores['experience-designer'] += option.traits.designer;
    if (option.traits.entrepreneur) scores['ai-entrepreneur'] += option.traits.entrepreneur;
  });

  // Find highest scoring persona
  let highestPersona: PersonaId = 'creative-builder';
  let highestScore = -1;

  (Object.keys(scores) as PersonaId[]).forEach((pid) => {
    if (scores[pid] > highestScore) {
      highestScore = scores[pid];
      highestPersona = pid;
    }
  });

  return PERSONAS[highestPersona];
}
