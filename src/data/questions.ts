import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Future & Ambition',
    question: 'If AI gave you ₹1 lakh to build something, what would you create?',
    options: [
      {
        id: 'q1_a',
        emoji: '🚀',
        text: 'A Startup',
        traits: { visionary: 3, executor: 1 }
      },
      {
        id: 'q1_b',
        emoji: '🤖',
        text: 'An AI Tool',
        traits: { explorer: 3, creator: 1 }
      },
      {
        id: 'q1_c',
        emoji: '🎨',
        text: 'A Creative Brand',
        traits: { creator: 3, connector: 1 }
      },
      {
        id: 'q1_d',
        emoji: '🌍',
        text: 'Something that solves a social problem',
        traits: { detective: 2, adapter: 2 }
      }
    ]
  },
  {
    id: 2,
    category: 'Work Style',
    question: 'ChatGPT gives you a task due tomorrow. You…',
    options: [
      {
        id: 'q2_a',
        emoji: '⚡',
        text: 'Finish it immediately',
        traits: { executor: 3, strategist: 1 }
      },
      {
        id: 'q2_b',
        emoji: '🧠',
        text: 'Ask AI to help me plan',
        traits: { strategist: 3, detective: 1 }
      },
      {
        id: 'q2_c',
        emoji: '😎',
        text: 'Leave it for tomorrow',
        traits: { adapter: 3, creator: 1 }
      },
      {
        id: 'q2_d',
        emoji: '🔥',
        text: 'Build something much bigger than asked',
        traits: { visionary: 3, executor: 1 }
      }
    ]
  },
  {
    id: 3,
    category: 'AI Superpower',
    question: "If you could have one AI superpower, you'd choose…",
    options: [
      {
        id: 'q3_a',
        emoji: '🧠',
        text: 'Perfect Memory',
        traits: { detective: 3, strategist: 1 }
      },
      {
        id: 'q3_b',
        emoji: '⚡',
        text: 'Instant Learning',
        traits: { adapter: 3, explorer: 1 }
      },
      {
        id: 'q3_c',
        emoji: '🔮',
        text: 'Predict the Future',
        traits: { visionary: 3, strategist: 1 }
      },
      {
        id: 'q3_d',
        emoji: '🎨',
        text: 'Unlimited Creativity',
        traits: { creator: 3, explorer: 1 }
      }
    ]
  },
  {
    id: 4,
    category: 'Team Dynamics',
    question: 'Your team gets a crazy new idea. Your first reaction?',
    options: [
      {
        id: 'q4_a',
        emoji: '🚀',
        text: '“LET’S DO IT!”',
        traits: { visionary: 3, executor: 1 }
      },
      {
        id: 'q4_b',
        emoji: '🧠',
        text: '“Let’s analyze it.”',
        traits: { strategist: 3, detective: 1 }
      },
      {
        id: 'q4_c',
        emoji: '🎨',
        text: '“How can we make it creative?”',
        traits: { creator: 3, connector: 1 }
      },
      {
        id: 'q4_d',
        emoji: '💡',
        text: '“What problem will it solve?”',
        traits: { connector: 2, detective: 2 }
      }
    ]
  },
  {
    id: 5,
    category: 'AI Tools & Tech',
    question: 'Which AI tool sounds most exciting to you?',
    options: [
      {
        id: 'q5_a',
        emoji: '🤖',
        text: 'AI Automation',
        traits: { executor: 3, explorer: 1 }
      },
      {
        id: 'q5_b',
        emoji: '🎨',
        text: 'AI Image/Video Generation',
        traits: { creator: 3, adapter: 1 }
      },
      {
        id: 'q5_c',
        emoji: '📊',
        text: 'AI Data Analysis',
        traits: { strategist: 3, detective: 1 }
      },
      {
        id: 'q5_d',
        emoji: '🔍',
        text: 'AI Research',
        traits: { detective: 3, explorer: 1 }
      }
    ]
  },
  {
    id: 6,
    category: 'Problem Solving',
    question: 'Your AI assistant makes a mistake. You…',
    options: [
      {
        id: 'q6_a',
        emoji: '🔍',
        text: 'Find out why',
        traits: { detective: 3, strategist: 1 }
      },
      {
        id: 'q6_b',
        emoji: '✍️',
        text: 'Improve the prompt',
        traits: { explorer: 3, adapter: 1 }
      },
      {
        id: 'q6_c',
        emoji: '😂',
        text: 'Laugh and try again',
        traits: { adapter: 3, connector: 1 }
      },
      {
        id: 'q6_d',
        emoji: '🧠',
        text: 'Solve it myself',
        traits: { executor: 3, visionary: 1 }
      }
    ]
  },
  {
    id: 7,
    category: 'Rapid Learning',
    question: 'You have 24 hours to learn a completely new skill. You…',
    options: [
      {
        id: 'q7_a',
        emoji: '🤖',
        text: 'Ask AI to create a roadmap',
        traits: { strategist: 2, explorer: 2 }
      },
      {
        id: 'q7_b',
        emoji: '🎥',
        text: 'Watch tutorials',
        traits: { detective: 2, creator: 1 }
      },
      {
        id: 'q7_c',
        emoji: '🛠️',
        text: 'Learn by doing',
        traits: { executor: 3, adapter: 1 }
      },
      {
        id: 'q7_d',
        emoji: '👥',
        text: 'Find someone who already knows it',
        traits: { connector: 3, visionary: 1 }
      }
    ]
  },
  {
    id: 8,
    category: 'Future Vision',
    question: 'Which future sounds most exciting?',
    options: [
      {
        id: 'q8_a',
        emoji: '🤖',
        text: 'Humans + AI working together',
        traits: { connector: 3, adapter: 1 }
      },
      {
        id: 'q8_b',
        emoji: '🚀',
        text: 'Building the next big technology',
        traits: { visionary: 3, explorer: 1 }
      },
      {
        id: 'q8_c',
        emoji: '🎨',
        text: 'AI-powered creative careers',
        traits: { creator: 3, connector: 1 }
      },
      {
        id: 'q8_d',
        emoji: '🌍',
        text: 'Using AI to solve real-world problems',
        traits: { detective: 2, strategist: 2 }
      }
    ]
  },
  {
    id: 9,
    category: 'AI Identity',
    question: 'Pick your AI-era personality:',
    options: [
      {
        id: 'q9_a',
        emoji: '👑',
        text: '“I’ll lead it.”',
        traits: { visionary: 3, connector: 1 }
      },
      {
        id: 'q9_b',
        emoji: '🧠',
        text: '“I’ll understand it.”',
        traits: { strategist: 3, detective: 1 }
      },
      {
        id: 'q9_c',
        emoji: '🎨',
        text: '“I’ll create with it.”',
        traits: { creator: 3, adapter: 1 }
      },
      {
        id: 'q9_d',
        emoji: '⚡',
        text: '“I’ll experiment with it.”',
        traits: { explorer: 3, executor: 1 }
      }
    ]
  },
  {
    id: 10,
    category: 'Core Prompt',
    question: 'If your personality were an AI prompt, what would it say?',
    options: [
      {
        id: 'q10_a',
        emoji: '🚀',
        text: '“Build something extraordinary.”',
        traits: { visionary: 3, executor: 1 }
      },
      {
        id: 'q10_b',
        emoji: '🧠',
        text: '“Think deeper. Find the answer.”',
        traits: { strategist: 2, detective: 2 }
      },
      {
        id: 'q10_c',
        emoji: '🎨',
        text: '“Create something nobody has seen.”',
        traits: { creator: 3, visionary: 1 }
      },
      {
        id: 'q10_d',
        emoji: '⚡',
        text: '“Explore. Experiment. Evolve.”',
        traits: { explorer: 3, adapter: 2 }
      }
    ]
  }
];
