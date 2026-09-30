import { LeadData } from '../types';

const LEADS_STORAGE_KEY = 'ai_arena_stall_leads_v1';

export function getStoredLeads(): LeadData[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse leads from storage', err);
    return [];
  }
}

export function saveLead(lead: LeadData): void {
  try {
    const leads = getStoredLeads();
    const updated = [lead, ...leads];
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save lead', err);
  }
}

export function clearStoredLeads(): void {
  try {
    localStorage.removeItem(LEADS_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear leads', err);
  }
}

export function exportLeadsToCSV(leads: LeadData[]): void {
  if (leads.length === 0) return;

  const headers = [
    'Timestamp',
    'Full Name',
    'WhatsApp Number',
    'College',
    'Department',
    'Year of Study',
    'Career Interest',
    'Assigned Persona'
  ];

  const rows = leads.map((l) => [
    `"${l.createdAt}"`,
    `"${(l.fullName || '').replace(/"/g, '""')}"`,
    `"${(l.whatsappNumber || '').replace(/"/g, '""')}"`,
    `"${(l.college || '').replace(/"/g, '""')}"`,
    `"${(l.department || '').replace(/"/g, '""')}"`,
    `"${(l.yearOfStudy || '').replace(/"/g, '""')}"`,
    `"${(l.careerInterest || '').replace(/"/g, '""')}"`,
    `"${(l.personaName || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `ai_arena_stall_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function seedDemoLeads(): void {
  const sampleLeads: LeadData[] = [
    {
      id: 'demo-1',
      fullName: 'Aarav Sharma',
      whatsappNumber: '+91 98765 43210',
      college: 'PSG College of Technology',
      department: 'Computer Science',
      yearOfStudy: '3rd Year (Junior)',
      careerInterest: 'AI & Generative AI',
      personaId: 'ai-explorer',
      personaName: 'THE AI EXPLORER',
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      answers: { 1: 'q1_b', 2: 'q2_a', 3: 'q3_a', 4: 'q4_b', 5: 'q5_b' }
    },
    {
      id: 'demo-2',
      fullName: 'Priya Nambiar',
      whatsappNumber: '+91 98234 56789',
      college: 'National Institute of Design',
      department: 'Interaction Design',
      yearOfStudy: '4th Year (Final Year)',
      careerInterest: 'UI/UX Design',
      personaId: 'experience-designer',
      personaName: 'THE EXPERIENCE DESIGNER',
      createdAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
      answers: { 1: 'q1_a', 2: 'q2_c', 3: 'q3_b', 4: 'q4_d', 5: 'q5_c' }
    },
    {
      id: 'demo-3',
      fullName: 'Rohan Mehta',
      whatsappNumber: '+91 98111 22334',
      college: 'St. Xavier’s College',
      department: 'BBA & Analytics',
      yearOfStudy: '2nd Year (Sophomore)',
      careerInterest: 'Digital Marketing',
      personaId: 'digital-strategist',
      personaName: 'THE DIGITAL STRATEGIST',
      createdAt: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
      answers: { 1: 'q1_c', 2: 'q2_d', 3: 'q3_c', 4: 'q4_c', 5: 'q5_d' }
    }
  ];

  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(sampleLeads));
}
