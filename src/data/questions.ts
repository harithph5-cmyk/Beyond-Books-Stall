import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Creativity',
    question: 'You have one free hour. What would you rather create?',
    options: [
      {
        id: 'q1_a',
        emoji: '🎨',
        text: 'A visual design',
        traits: { designer: 3, creative: 2 }
      },
      {
        id: 'q1_b',
        emoji: '🤖',
        text: 'An AI project',
        traits: { aiExplorer: 3, creative: 1, entrepreneur: 1 }
      },
      {
        id: 'q1_c',
        emoji: '📱',
        text: 'Social media content',
        traits: { strategist: 3, creative: 1 }
      },
      {
        id: 'q1_d',
        emoji: '💡',
        text: 'A solution to a problem',
        traits: { problemSolver: 3, entrepreneur: 1 }
      }
    ]
  },
  {
    id: 2,
    category: 'Problem Solving',
    question: "Something isn't working. What's your first instinct?",
    options: [
      {
        id: 'q2_a',
        emoji: '🔍',
        text: 'Find out why',
        traits: { problemSolver: 3, aiExplorer: 1 }
      },
      {
        id: 'q2_b',
        emoji: '🧪',
        text: 'Try different solutions',
        traits: { aiExplorer: 2, problemSolver: 2, creative: 1 }
      },
      {
        id: 'q2_c',
        emoji: '💡',
        text: 'Think of a completely new approach',
        traits: { entrepreneur: 3, designer: 1, creative: 1 }
      },
      {
        id: 'q2_d',
        emoji: '🤝',
        text: 'Ask someone and collaborate',
        traits: { strategist: 2, entrepreneur: 2, designer: 1 }
      }
    ]
  },
  {
    id: 3,
    category: 'Technology',
    question: 'Which sounds most exciting?',
    options: [
      {
        id: 'q3_a',
        emoji: '🤖',
        text: 'AI & ChatGPT',
        traits: { aiExplorer: 3, entrepreneur: 1 }
      },
      {
        id: 'q3_b',
        emoji: '🎨',
        text: 'UI/UX & Design',
        traits: { designer: 3, creative: 2 }
      },
      {
        id: 'q3_c',
        emoji: '📈',
        text: 'Digital Marketing',
        traits: { strategist: 3, entrepreneur: 1 }
      },
      {
        id: 'q3_d',
        emoji: '💻',
        text: 'Coding & Development',
        traits: { problemSolver: 3, creative: 1 }
      }
    ]
  },
  {
    id: 4,
    category: 'Working Style',
    question: "In a team, you're usually the...",
    options: [
      {
        id: 'q4_a',
        emoji: '💡',
        text: 'Idea Generator',
        traits: { entrepreneur: 3, creative: 2 }
      },
      {
        id: 'q4_b',
        emoji: '🛠️',
        text: 'Builder',
        traits: { creative: 3, problemSolver: 2 }
      },
      {
        id: 'q4_c',
        emoji: '🎯',
        text: 'Strategist',
        traits: { strategist: 3, entrepreneur: 1 }
      },
      {
        id: 'q4_d',
        emoji: '🎨',
        text: 'Creative',
        traits: { designer: 3, creative: 2 }
      },
      {
        id: 'q4_e',
        emoji: '🤝',
        text: 'Team Player',
        traits: { strategist: 2, problemSolver: 1, designer: 1 }
      }
    ]
  },
  {
    id: 5,
    category: 'Future',
    question: 'If AI could give you one superpower, what would you choose?',
    options: [
      {
        id: 'q5_a',
        emoji: '🚀',
        text: 'Build anything',
        traits: { creative: 3, entrepreneur: 2 }
      },
      {
        id: 'q5_b',
        emoji: '🧠',
        text: 'Learn anything',
        traits: { aiExplorer: 3, problemSolver: 1 }
      },
      {
        id: 'q5_c',
        emoji: '🎨',
        text: 'Create anything',
        traits: { designer: 3, creative: 2 }
      },
      {
        id: 'q5_d',
        emoji: '📊',
        text: 'Solve anything',
        traits: { problemSolver: 3, strategist: 2 }
      }
    ]
  }
];
