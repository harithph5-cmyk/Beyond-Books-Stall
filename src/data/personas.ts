import { Persona, PersonaId } from '../types';
import { QUESTIONS } from './questions';

const BASE_PERSONAS: Record<string, Persona> = {
  'ai-visionary': {
    id: 'ai-visionary',
    code: '01',
    name: 'THE AI VISIONARY',
    emoji: '🚀',
    tagline: 'Big-picture thinker who sees opportunities.',
    careersToExplore: [
      'AI Product Manager',
      'AI Business Strategist',
      'Product Manager',
      'AI Consultant',
      'Startup / Entrepreneurship'
    ],
    indicativeSalary: {
      early: '₹5–12 LPA at early career levels',
      experienced: '₹12–25+ LPA with strong experience',
      notes: 'High upside for leadership, product management, and venture creation in tech ecosystems.'
    },
    skillsToBuild: [
      'AI Fundamentals',
      'Product Management',
      'Business Strategy',
      'Communication',
      'AI Tools'
    ],
    careerMove: 'Learn how businesses can use AI to solve real problems.',
    defaultDirection: 'AI Product Management & Entrepreneurship',
    potentialPaths: [
      'AI Product Leadership',
      'AI Business Strategy',
      'Tech Venture Incubation',
      'Executive AI Advisory'
    ],
    ratings: [
      { label: 'VISION & STRATEGY', score: 5 },
      { label: 'TECH INITIATIVE', score: 5 },
      { label: 'LEADERSHIP', score: 5 }
    ],
    strengths: ['Market Opportunity Mapping', 'Cross-Functional Vision', 'Venture Prototyping'],
    badgeColor: 'from-amber-400 via-rose-500 to-purple-600',
    roadmapSteps: [
      {
        step: 'STEP 01',
        title: 'AI & MARKET FUNDAMENTALS',
        desc: 'Grasp how LLMs, foundational models, and agent architectures reshape unit economics and business models.',
        tools: ['Gemini', 'Claude', 'OpenAI Playground']
      },
      {
        step: 'STEP 02',
        title: 'PRODUCT MANAGEMENT DISCOVERY',
        desc: 'Identify high-value business bottlenecks and write clear Product Requirement Documents (PRDs) for AI features.',
        tools: ['Figma', 'Notion', 'Productboard']
      },
      {
        step: 'STEP 03',
        title: 'RAPID AI PROTOTYPING',
        desc: 'Translate strategic vision into interactive proof-of-concept AI apps and functional mockups with modern dev builders.',
        tools: ['v0.dev', 'Lovable', 'Make.com']
      },
      {
        step: 'STEP 04',
        title: 'BUSINESS STRATEGY & ROI MODELING',
        desc: 'Quantify operational savings, client retention multipliers, and customer acquisition payback for AI transformations.',
        tools: ['Excel / Sheets', 'PowerBI', 'Coda']
      },
      {
        step: 'STEP 05',
        title: 'AI CONSULTING & STAKEHOLDER PITCH',
        desc: 'Lead executive roadmap presentations and communicate technical capability in clear commercial language.',
        tools: ['Gamma', 'Pitch', 'Loom']
      },
      {
        step: 'STEP 06',
        title: 'LAUNCH YOUR FIRST VENTURE / CAPSTONE',
        desc: 'Build and launch a public AI solution or pitch deck backed by real market validation and active user traction.',
        tools: ['Vercel', 'Stripe', 'LinkedIn']
      }
    ],
    interests: ['Entrepreneurship', 'AI Strategy', 'Product Leadership']
  },

  'ai-strategist': {
    id: 'ai-strategist',
    code: '02',
    name: 'THE AI STRATEGIST',
    emoji: '🧠',
    tagline: 'Analytical, logical and data-driven.',
    careersToExplore: [
      'Data Analyst',
      'Business Analyst',
      'AI Business Analyst',
      'Business Intelligence Analyst',
      'Data & Analytics Specialist'
    ],
    indicativeSalary: {
      early: '₹3–8 LPA for many early-career roles',
      experienced: '₹8–15+ LPA as skills and experience grow',
      notes: 'Current listings show Data Analyst roles around ₹3–8 LPA and Business Analyst roles around ₹4–8 LPA, with AI-focused roles extending higher.'
    },
    skillsToBuild: [
      'Excel',
      'SQL',
      'Power BI',
      'Python',
      'Data Visualization',
      'GenAI'
    ],
    careerMove: 'Turn raw data into business decisions.',
    defaultDirection: 'Data & AI Business Intelligence',
    potentialPaths: [
      'AI Business Intelligence',
      'Predictive Analytics',
      'Operations Analysis',
      'Financial AI Modeling'
    ],
    ratings: [
      { label: 'DATA REASONING', score: 5 },
      { label: 'LOGICAL THINKING', score: 5 },
      { label: 'ANALYTICS RIGOR', score: 5 }
    ],
    strengths: ['Structured Querying', 'Predictive Metric Formulation', 'Executive Insight Translation'],
    badgeColor: 'from-blue-500 via-indigo-500 to-cyan-400',
    roadmapSteps: [
      {
        step: 'STEP 01',
        title: 'ADVANCED EXCEL & DATA HYGIENE',
        desc: 'Master power query, pivot pipelines, statistical formulas, and automated financial modeling.',
        tools: ['Microsoft Excel', 'Google Sheets', 'Power Query']
      },
      {
        step: 'STEP 02',
        title: 'SQL & RELATIONAL DATABASES',
        desc: 'Query large datasets, write analytical window functions, join tables, and optimize query latency.',
        tools: ['PostgreSQL', 'BigQuery', 'Snowflake']
      },
      {
        step: 'STEP 03',
        title: 'BUSINESS INTELLIGENCE DASHBOARDS',
        desc: 'Build real-time KPI cockpits and visual reporting systems that reveal critical profit drivers.',
        tools: ['Power BI', 'Tableau', 'Looker Studio']
      },
      {
        step: 'STEP 04',
        title: 'PYTHON FOR DATA SCIENCE',
        desc: 'Harness Pandas, NumPy, and Scikit-learn to clean messy data and run automated correlation studies.',
        tools: ['Python', 'Jupyter', 'Pandas']
      },
      {
        step: 'STEP 05',
        title: 'GENAI FOR ANALYTICS AUTOMATION',
        desc: 'Augment traditional queries with natural-language text-to-SQL workflows and AI executive summaries.',
        tools: ['OpenAI Code Interpreter', 'Claude Sonnet', 'Hex']
      },
      {
        step: 'STEP 06',
        title: 'PUBLISH A LIVE DATA STORY',
        desc: 'Publish an end-to-end analytical case study solving a real company revenue drop or churn problem.',
        tools: ['GitHub', 'Medium / Substack', 'LinkedIn']
      }
    ],
    interests: ['Data Analytics', 'Business Intelligence', 'Logic & Problem Solving']
  },

  'ai-creator': {
    id: 'ai-creator',
    code: '03',
    name: 'THE AI CREATOR',
    emoji: '🎨',
    tagline: 'Creative, imaginative and digitally expressive.',
    careersToExplore: [
      'AI Content Creator',
      'Digital Marketing Specialist',
      'AI Creative Strategist',
      'UI/UX Designer',
      'Graphic / Visual Designer',
      'Video Creator'
    ],
    indicativeSalary: {
      early: '₹3–7 LPA for many entry-level digital/creative roles',
      experienced: '₹7–15+ LPA with a strong portfolio and specialization',
      notes: 'Creative agencies and consumer tech brands pay premium retainers for creators with multimodal generative AI portfolios.'
    },
    skillsToBuild: [
      'Canva',
      'AI Image Generation',
      'AI Video',
      'Content Strategy',
      'Branding',
      'Social Media',
      'UI/UX'
    ],
    careerMove: 'Build a portfolio instead of relying only on certificates.',
    defaultDirection: 'Generative AI Content & Digital Design',
    potentialPaths: [
      'Multimodal AI Production',
      'Brand Visual Storytelling',
      'Short-Form Video Growth',
      'Creative AI Direction'
    ],
    ratings: [
      { label: 'CREATIVE SPARK', score: 5 },
      { label: 'VISUAL TASTE', score: 5 },
      { label: 'TREND INTUITION', score: 5 }
    ],
    strengths: ['Multimodal Prompt Crafting', 'Rapid Asset Pipeline', 'Emotional Story Hooks'],
    badgeColor: 'from-pink-500 via-rose-500 to-amber-400',
    roadmapSteps: [
      {
        step: 'STEP 01',
        title: 'CREATIVE BRAND & DESIGN FUNDAMENTALS',
        desc: 'Master visual balance, typography hierarchy, mood boards, and aesthetic framing.',
        tools: ['Canva', 'Figma', 'Adobe Express']
      },
      {
        step: 'STEP 02',
        title: 'GENAI VISUAL GENERATION',
        desc: 'Master prompt weightings, lighting control, aspect ratios, and style transfer in top image engines.',
        tools: ['Midjourney v6', 'DALL-E 3', 'Flux.1']
      },
      {
        step: 'STEP 03',
        title: 'AI VIDEO & MOTION STORYTELLING',
        desc: 'Generate cinematic motion shots, b-roll loops, and consistent character video reels for brands.',
        tools: ['Runway Gen-3', 'Luma Dream Machine', 'Kling AI']
      },
      {
        step: 'STEP 04',
        title: 'VOICE SYNTHESIS & SOUNDTRACKS',
        desc: 'Produce bespoke voiceovers, ambient background audio, and dynamic sound effects with AI.',
        tools: ['ElevenLabs', 'Suno AI', 'CapCut']
      },
      {
        step: 'STEP 05',
        title: 'CONTENT STRATEGY & VIRAL HOOKS',
        desc: 'Engineer hooks, thumbnails, and cross-channel distribution schedules driven by algorithm trends.',
        tools: ['Notion AI', 'Buffer', 'CapCut AI']
      },
      {
        step: 'STEP 06',
        title: 'SHIP A SHOWCASE PORTFOLIO',
        desc: 'Assemble a live Behance/Bento portfolio showcasing 5 branded commercial campaigns with before-and-after case studies.',
        tools: ['Bento.me', 'Behance', 'Instagram']
      }
    ],
    interests: ['Creative Design', 'Video Production', 'Visual Storytelling']
  },

  'ai-explorer': {
    id: 'ai-explorer',
    code: '04',
    name: 'THE AI EXPLORER',
    emoji: '⚡',
    tagline: 'Curious, experimental and excited by new technology.',
    careersToExplore: [
      'AI Specialist',
      'AI Solutions Specialist',
      'Prompt / AI Workflow Specialist',
      'AI Implementation Specialist',
      'Technology Consultant'
    ],
    indicativeSalary: {
      early: '₹4–10 LPA depending heavily on technical skills and role',
      experienced: '₹10–20+ LPA with strong AI/automation experience',
      notes: 'Consulting firms and AI startups prioritize candidates with hands-on agentic framework implementation.'
    },
    skillsToBuild: [
      'ChatGPT',
      'Gemini',
      'Claude',
      'Prompt Engineering',
      'AI Agents',
      'APIs',
      'AI Automation'
    ],
    careerMove: "Don't just learn AI tools—build working solutions with them.",
    defaultDirection: 'Applied AI & Solutions Engineering',
    potentialPaths: [
      'AI Agent Development',
      'Enterprise Prompt Architecture',
      'LLM Integration Specialist',
      'Applied Solutions Architecture'
    ],
    ratings: [
      { label: 'EXPERIMENTATION', score: 5 },
      { label: 'TECH AGILITY', score: 5 },
      { label: 'INNOVATION DRIVE', score: 5 }
    ],
    strengths: ['Model Benchmarking', 'Agent Tool-Calling', 'Zero-Shot Problem Solving'],
    badgeColor: 'from-emerald-400 via-teal-400 to-cyan-500',
    roadmapSteps: [
      {
        step: 'STEP 01',
        title: 'LLM ARCHITECTURES & BENCHMARKING',
        desc: 'Understand context windows, token limits, model strengths, and parameter temperature tuning.',
        tools: ['Claude 3.7', 'Gemini 2.5 Flash', 'ChatGPT-4o']
      },
      {
        step: 'STEP 02',
        title: 'ADVANCED PROMPT ARCHITECTURE',
        desc: 'Master structured outputs, JSON schema validation, chain-of-thought, and few-shot calibration.',
        tools: ['OpenAI SDK', 'Google GenAI SDK', 'Anthropic Console']
      },
      {
        step: 'STEP 03',
        title: 'APIS & FUNCTION CALLING',
        desc: 'Bridge frontier models to live REST APIs, webhook triggers, and third-party web tools.',
        tools: ['Postman', 'Node.js / Python', 'FastAPI']
      },
      {
        step: 'STEP 04',
        title: 'AUTONOMOUS AI AGENTS',
        desc: 'Construct agents capable of planning, web browsing, self-correction, and multithreaded tasks.',
        tools: ['CrewAI', 'LangChain', 'AutoGPT']
      },
      {
        step: 'STEP 05',
        title: 'RAG & RETRIEVAL SYSTEMS',
        desc: 'Ingest company documentation and vector embeddings for hallucination-free knowledge retrieval.',
        tools: ['ChromaDB', 'Pinecone', 'LlamaIndex']
      },
      {
        step: 'STEP 06',
        title: 'DEPLOY A WORKING AI SYSTEM',
        desc: 'Host a live, public AI tool with authentication and database persistence solving a specific enterprise use case.',
        tools: ['Vercel', 'Supabase', 'GitHub']
      }
    ],
    interests: ['AI Tools', 'Agentic Systems', 'API Integration']
  },

  'ai-connector': {
    id: 'ai-connector',
    code: '05',
    name: 'THE AI CONNECTOR',
    emoji: '🤝',
    tagline: 'People-focused, communicative and collaborative.',
    careersToExplore: [
      'AI Consultant',
      'AI Trainer',
      'Digital Marketing Specialist',
      'Business Development Executive',
      'Customer Success Specialist',
      'Community / Growth Specialist'
    ],
    indicativeSalary: {
      early: '₹3–7 LPA at entry level',
      experienced: '₹7–15+ LPA with domain expertise and client-facing experience',
      notes: 'Organizations urgently need bilingual talent who can translate complex AI tooling into simple, high-adoption team workflows.'
    },
    skillsToBuild: [
      'Communication',
      'AI Productivity',
      'CRM',
      'Digital Marketing',
      'Sales',
      'Presentation',
      'Automation'
    ],
    careerMove: 'Become the person who can explain technology in simple business language.',
    defaultDirection: 'AI Consulting & Client Growth Strategy',
    potentialPaths: [
      'Enterprise AI Enablement',
      'Customer Success Leadership',
      'AI Evangelism & Training',
      'Strategic Partnerships'
    ],
    ratings: [
      { label: 'EMPATHY & COMMS', score: 5 },
      { label: 'COLLABORATION', score: 5 },
      { label: 'PERSUASION', score: 5 }
    ],
    strengths: ['Non-Technical Translation', 'Stakeholder Alignment', 'Adoption Accelerators'],
    badgeColor: 'from-amber-500 via-orange-500 to-rose-400',
    roadmapSteps: [
      {
        step: 'STEP 01',
        title: 'HIGH-IMPACT AI COMMUNICATION',
        desc: 'Master translating technical AI concepts into clear business value propositions and slide decks.',
        tools: ['Gamma', 'Pitch', 'ChatGPT']
      },
      {
        step: 'STEP 02',
        title: 'ENTERPRISE PRODUCTIVITY SUITE',
        desc: 'Learn and implement AI copilots across daily office suites to maximize team throughput.',
        tools: ['Notion AI', 'Microsoft Copilot', 'Google Workspace AI']
      },
      {
        step: 'STEP 03',
        title: 'CRM & LEAD PIPELINE AUTOMATION',
        desc: 'Connect automated AI responses, lead qualification bots, and relationship trackers.',
        tools: ['HubSpot CRM', 'Apollo.io', 'Make.com']
      },
      {
        step: 'STEP 04',
        title: 'AI TRAINING WORKSHOP DESIGN',
        desc: 'Create actionable curriculum and deliver live interactive training sessions for students or corporate teams.',
        tools: ['Zoom', 'Miro', 'Loom']
      },
      {
        step: 'STEP 05',
        title: 'CUSTOMER SUCCESS & RETENTION',
        desc: 'Harness sentiment analysis and automated health checks to ensure sustained retention.',
        tools: ['Gainsight', 'Slack Connect', 'Typeform']
      },
      {
        step: 'STEP 06',
        title: 'FACILITATE A LIVE CLIENT ROLLOUT',
        desc: 'Run an AI enablement sprint for a real business or campus society and document the efficiency gain.',
        tools: ['LinkedIn Case Study', 'Substack']
      }
    ],
    interests: ['Communication', 'Consulting', 'Community & Training']
  },

  'ai-executor': {
    id: 'ai-executor',
    code: '06',
    name: 'THE AI EXECUTOR',
    emoji: '🔥',
    tagline: 'Action-oriented and obsessed with getting things done.',
    careersToExplore: [
      'AI Automation Specialist',
      'Automation Consultant',
      'AI Implementation Specialist',
      'Project Coordinator',
      'Operations Specialist',
      'No-Code Automation Specialist'
    ],
    indicativeSalary: {
      early: '₹4–9 LPA at early career levels',
      experienced: '₹9–18+ LPA with strong automation and implementation skills',
      notes: 'Current Indian listings include AI/automation-oriented analyst roles around ₹6–10 LPA.'
    },
    skillsToBuild: [
      'Zapier',
      'Make',
      'AI Agents',
      'APIs',
      'Workflow Design',
      'CRM',
      'Process Automation'
    ],
    careerMove: 'Automate a real business process and put it in your portfolio.',
    defaultDirection: 'No-Code AI & Process Automation',
    potentialPaths: [
      'Workflow Engineering',
      'Business Operations Lead',
      'Hyperautomation Architecture',
      'Systems Implementation'
    ],
    ratings: [
      { label: 'EXECUTION SPEED', score: 5 },
      { label: 'PROCESS OPTIMIZATION', score: 5 },
      { label: 'RESOURCEFULNESS', score: 5 }
    ],
    strengths: ['End-to-End Workflow Wiring', 'Error Handling & Retries', 'Speed to Production'],
    badgeColor: 'from-orange-500 via-amber-500 to-red-500',
    roadmapSteps: [
      {
        step: 'STEP 01',
        title: 'NO-CODE LOGIC & WEBHOOK FOUNDATIONS',
        desc: 'Master HTTP methods, JSON payloads, triggers, routers, and condition branches.',
        tools: ['Make.com', 'Zapier', 'Postman']
      },
      {
        step: 'STEP 02',
        title: 'LLM WORKFLOW INTEGRATIONS',
        desc: 'Embed GPT/Claude into automated pipelines to summarize emails, classify tickets, and route leads.',
        tools: ['OpenAI API', 'Make AI Module', 'Airtable']
      },
      {
        step: 'STEP 03',
        title: 'DATABASE & CRM AUTOMATION',
        desc: 'Build two-way syncs between landing pages, Google Sheets, relational databases, and WhatsApp.',
        tools: ['Airtable', 'Supabase', 'WhatsApp Cloud API']
      },
      {
        step: 'STEP 04',
        title: 'AUTONOMOUS OPERATIONS AGENTS',
        desc: 'Implement automated scheduling, document parsing, invoice extraction, and client alert agents.',
        tools: ['n8n', 'Make.com', 'Claude PDF Parser']
      },
      {
        step: 'STEP 05',
        title: 'ERROR-HANDLING & PRODUCTION RELIABILITY',
        desc: 'Architect rollback mechanisms, webhook rate-limiting, and automated failover alerts.',
        tools: ['Sentry', 'Telegram Bot Alerts', 'Datadog']
      },
      {
        step: 'STEP 06',
        title: 'BUILD & SELL A LIVE AUTOMATION',
        desc: 'Automate a genuine end-to-end business workflow and record a step-by-step Loom walkthrough.',
        tools: ['Loom', 'Gumroad', 'LinkedIn']
      }
    ],
    interests: ['Automation', 'Operations', 'No-Code Workflows']
  },

  'ai-detective': {
    id: 'ai-detective',
    code: '07',
    name: 'THE AI DETECTIVE',
    emoji: '🔍',
    tagline: 'Curious, investigative and evidence-driven.',
    careersToExplore: [
      'Research Analyst',
      'AI Research Assistant',
      'Data Analyst',
      'SEO Analyst',
      'Market Research Analyst',
      'AI Researcher'
    ],
    indicativeSalary: {
      early: '₹3–8 LPA for many analyst-level opportunities',
      experienced: '₹8–15+ LPA with advanced analytical/research skills',
      notes: 'Current listings include Data Analyst/AI roles across India with examples ranging from roughly ₹3–8 LPA and higher for specialized positions.'
    },
    skillsToBuild: [
      'AI Research',
      'Perplexity',
      'Data Analysis',
      'SQL',
      'Research Methods',
      'Fact Checking',
      'Critical Thinking'
    ],
    careerMove: 'Become excellent at finding, verifying and explaining information.',
    defaultDirection: 'AI Research & Intelligence Verification',
    potentialPaths: [
      'Deep Research Analysis',
      'AI Fact-Checking & Safety',
      'Market Intelligence',
      'Competitive Landscape Strategy'
    ],
    ratings: [
      { label: 'CRITICAL SCRUTINY', score: 5 },
      { label: 'DEEP RESEARCH', score: 5 },
      { label: 'ACCURACY & RIGOR', score: 5 }
    ],
    strengths: ['Source Triangulation', 'Hallucination Detection', 'Synthesizing Complex Data'],
    badgeColor: 'from-violet-500 via-indigo-500 to-cyan-400',
    roadmapSteps: [
      {
        step: 'STEP 01',
        title: 'ADVANCED INFORMATION RETRIEVAL',
        desc: 'Master deep search operators, academic queries, and structured literature synthesis.',
        tools: ['Perplexity Pro', 'Consensus', 'Google Scholar']
      },
      {
        step: 'STEP 02',
        title: 'FACT CHECKING & HALLUCINATION AUDITING',
        desc: 'Cross-verify generative AI citations against primary documents and verified sources.',
        tools: ['Perplexity', 'Claude Artifacts', 'NotebookLM']
      },
      {
        step: 'STEP 03',
        title: 'DATA GATHERING & WEB SCRAPING',
        desc: 'Extract structured datasets from public sources and regulatory filings responsibly.',
        tools: ['Browse AI', 'OctoParse', 'Python BeautifulSoup']
      },
      {
        step: 'STEP 04',
        title: 'SQL & QUANTITATIVE VERIFICATION',
        desc: 'Audit analytical claims with raw SQL queries and statistical hypothesis testing.',
        tools: ['PostgreSQL', 'DuckDB', 'Excel']
      },
      {
        step: 'STEP 05',
        title: 'NOTEBOOKLM & KNOWLEDGE SYNTHESIS',
        desc: 'Transform 50+ source documents into searchable audio podcasts, FAQs, and briefing memos.',
        tools: ['NotebookLM', 'Obsidian', 'Zotero']
      },
      {
        step: 'STEP 06',
        title: 'PUBLISH AN INVESTIGATIVE REPORT',
        desc: 'Author an in-depth, cited industry intelligence report debunking a trending topic with data.',
        tools: ['Substack', 'PDF Report', 'LinkedIn']
      }
    ],
    interests: ['Deep Research', 'Fact-Checking', 'Market Intelligence']
  },

  'ai-adapter': {
    id: 'ai-adapter',
    code: '08',
    name: 'THE AI ADAPTER',
    emoji: '🌱',
    tagline: 'Flexible, fast-learning and comfortable with change.',
    careersToExplore: [
      'AI Generalist',
      'Digital Transformation Specialist',
      'AI Trainer',
      'Technology Consultant',
      'Digital Specialist',
      'AI Project Coordinator'
    ],
    indicativeSalary: {
      early: '₹4–9 LPA at early career levels',
      experienced: '₹9–18+ LPA with specialization and experience',
      notes: 'Companies undergoing digital modernization value versatile talent capable of adopting new AI releases on day zero.'
    },
    skillsToBuild: [
      'AI Fundamentals',
      'Productivity AI',
      'Automation',
      'Digital Marketing',
      'Data',
      'Industry-specific AI'
    ],
    careerMove: 'Become a strong generalist first, then specialize in one high-value domain.',
    defaultDirection: 'Digital Transformation & AI Generalist',
    potentialPaths: [
      'Cross-Functional AI Generalist',
      'Digital Modernization Lead',
      'Agile Tech Coordinator',
      'Enterprise AI Pilot Lead'
    ],
    ratings: [
      { label: 'ADAPTABILITY', score: 5 },
      { label: 'RAPID LEARNING', score: 5 },
      { label: 'VERSATILITY', score: 5 }
    ],
    strengths: ['Day-0 Tool Adoption', 'Agile Domain Switching', 'Bridging Cross-Functional Silos'],
    badgeColor: 'from-emerald-400 via-teal-400 to-lime-400',
    roadmapSteps: [
      {
        step: 'STEP 01',
        title: 'RAPID TECH TRIAGE & FUNDAMENTALS',
        desc: 'Build mental models of the AI ecosystem to evaluate new model releases within 15 minutes.',
        tools: ['AI News Aggregators', 'ProductHunt', 'Hugging Face']
      },
      {
        step: 'STEP 02',
        title: 'SWISS-ARMY KNIFE PRODUCTIVITY SUITE',
        desc: 'Integrate the top 5 multi-use AI assistants into daily task management and note-taking.',
        tools: ['Notion AI', 'ChatGPT Plus', 'Claude Pro']
      },
      {
        step: 'STEP 03',
        title: 'LIGHTWEIGHT AUTOMATION & NO-CODE',
        desc: 'Learn enough automation to glue modern tools together without waiting on dev teams.',
        tools: ['Zapier', 'Make.com', 'Airtable']
      },
      {
        step: 'STEP 04',
        title: 'MULTIMODAL EXPERIMENTATION',
        desc: 'Test and integrate text, voice, visual, and code generation across diverse company departments.',
        tools: ['Midjourney', 'ElevenLabs', 'Cursor AI']
      },
      {
        step: 'STEP 05',
        title: 'DIGITAL TRANSFORMATION METHODOLOGY',
        desc: 'Manage pilot programs that test new AI tools with teams and measure operational productivity gains.',
        tools: ['Asana', 'Linear', 'Loom']
      },
      {
        step: 'STEP 06',
        title: 'DEVELOP YOUR DOMAIN SPECIALIZATION',
        desc: 'Pick one high-margin industry (Finance, Healthcare, Legal, Retail) and apply AI workflows deeply.',
        tools: ['Industry Case Study', 'LinkedIn Authority']
      }
    ],
    interests: ['Continuous Learning', 'Generalist Problem Solving', 'Digital Transformation']
  }
};

// Aliases for backwards compatibility with any persisted storage
export const PERSONAS: Record<PersonaId, Persona> = {
  ...BASE_PERSONAS,
  'creative-builder': BASE_PERSONAS['ai-creator'],
  'digital-strategist': BASE_PERSONAS['ai-strategist'],
  'problem-solver': BASE_PERSONAS['ai-detective'],
  'experience-designer': BASE_PERSONAS['ai-connector'],
  'ai-entrepreneur': BASE_PERSONAS['ai-visionary']
} as Record<PersonaId, Persona>;

export const CAREER_INTEREST_OPTIONS = [
  'AI + UI/UX Design',
  'AI Content Creation & Video',
  'AI Digital Marketing',
  'AI Automation & Workflows',
  'Data Analytics & BI',
  'AI Product & Strategy',
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
    'ai-visionary': 0,
    'ai-strategist': 0,
    'ai-creator': 0,
    'ai-explorer': 0,
    'ai-connector': 0,
    'ai-executor': 0,
    'ai-detective': 0,
    'ai-adapter': 0,
    'creative-builder': 0,
    'digital-strategist': 0,
    'problem-solver': 0,
    'experience-designer': 0,
    'ai-entrepreneur': 0
  };

  QUESTIONS.forEach((q) => {
    const selectedOptionId = answers[q.id];
    const option = q.options.find((o) => o.id === selectedOptionId);
    if (!option) return;

    if (option.traits.visionary) scores['ai-visionary'] += option.traits.visionary;
    if (option.traits.strategist) scores['ai-strategist'] += option.traits.strategist;
    if (option.traits.creator) scores['ai-creator'] += option.traits.creator;
    if (option.traits.explorer) scores['ai-explorer'] += option.traits.explorer;
    if (option.traits.connector) scores['ai-connector'] += option.traits.connector;
    if (option.traits.executor) scores['ai-executor'] += option.traits.executor;
    if (option.traits.detective) scores['ai-detective'] += option.traits.detective;
    if (option.traits.adapter) scores['ai-adapter'] += option.traits.adapter;

    // Legacy fallbacks
    if (option.traits.creative) scores['ai-creator'] += option.traits.creative;
    if (option.traits.aiExplorer) scores['ai-explorer'] += option.traits.aiExplorer;
    if (option.traits.problemSolver) scores['ai-detective'] += option.traits.problemSolver;
    if (option.traits.designer) scores['ai-connector'] += option.traits.designer;
    if (option.traits.entrepreneur) scores['ai-visionary'] += option.traits.entrepreneur;
  });

  const validPersonas: PersonaId[] = [
    'ai-visionary',
    'ai-strategist',
    'ai-creator',
    'ai-explorer',
    'ai-connector',
    'ai-executor',
    'ai-detective',
    'ai-adapter'
  ];

  let highestPersona: PersonaId = 'ai-visionary';
  let highestScore = -1;

  validPersonas.forEach((pid) => {
    if (scores[pid] > highestScore) {
      highestScore = scores[pid];
      highestPersona = pid;
    }
  });

  return PERSONAS[highestPersona];
}
