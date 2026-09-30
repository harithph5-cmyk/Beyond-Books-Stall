import { LeadData } from '../types';

const LEADS_STORAGE_KEY = 'ai_arena_stall_leads_v1';
const WEBHOOK_STORAGE_KEY = 'ai_arena_webhook_url';
const ORGANIZER_PHONE_KEY = 'ai_arena_organizer_phone';

export function getWebhookUrl(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(WEBHOOK_STORAGE_KEY) || '';
}

export function setWebhookUrl(url: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WEBHOOK_STORAGE_KEY, url.trim());
}

export function getOrganizerPhone(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(ORGANIZER_PHONE_KEY) || '';
}

export function setOrganizerPhone(phone: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ORGANIZER_PHONE_KEY, phone.trim());
}

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

/**
 * Sync with server /api/leads (works in Vercel Serverless and Vite Dev)
 */
export async function syncLeadsWithServer(): Promise<LeadData[]> {
  const localLeads = getStoredLeads();
  try {
    const response = await fetch('/api/leads', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && Array.isArray(data.leads)) {
        // Merge server leads with local leads (de-duplicate by ID or name+phone)
        const combined = [...data.leads];
        localLeads.forEach((local) => {
          const alreadyInServer = combined.some(
            (s) =>
              s.id === local.id ||
              (s.whatsappNumber === local.whatsappNumber && s.fullName === local.fullName)
          );
          if (!alreadyInServer) {
            combined.push(local);
            // Push missing local lead to server in background
            fetch('/api/leads', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(local)
            }).catch(() => {});
          }
        });

        // Sort descending by creation timestamp
        combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(combined));
        return combined;
      }
    }
  } catch (err) {
    // If backend /api/leads is unreachable or offline, fallback to local storage
    console.warn('API leads sync notice:', err);
  }

  return localLeads;
}

export async function saveLead(lead: LeadData): Promise<void> {
  // 1. Save locally for instant UI update & offline guarantee
  try {
    const leads = getStoredLeads();
    const exists = leads.some(
      (l) =>
        l.id === lead.id ||
        (l.whatsappNumber === lead.whatsappNumber && l.fullName === lead.fullName)
    );
    if (!exists) {
      const updated = [lead, ...leads];
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (err) {
    console.error('Failed to save lead locally', err);
  }

  // 2. Dispatch to /api/leads (Serverless on Vercel or Express dev)
  try {
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    }).catch((err) => console.warn('Could not post to /api/leads', err));
  } catch {
    // Ignore fetch failure
  }

  // 3. Dispatch to Custom Webhook / Google Sheets if configured
  const webhook = getWebhookUrl();
  if (webhook) {
    try {
      fetch(webhook, {
        method: 'POST',
        mode: 'no-cors', // Supports Google Apps Script without CORS blocks
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      }).catch((err) => console.warn('Could not dispatch to webhook', err));
    } catch {
      // Ignore webhook failure
    }
  }
}

export async function clearStoredLeads(): Promise<void> {
  try {
    localStorage.removeItem(LEADS_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear local leads', err);
  }

  try {
    await fetch('/api/leads', { method: 'DELETE' });
  } catch {
    // Ignore server error
  }
}

export function importLeadFromCode(code: string): boolean {
  try {
    const parsed = JSON.parse(code);
    if (parsed && parsed.fullName && parsed.whatsappNumber) {
      saveLead(parsed);
      return true;
    }
  } catch {
    // Try base64 decoded
    try {
      const decoded = atob(code);
      const parsed = JSON.parse(decoded);
      if (parsed && parsed.fullName && parsed.whatsappNumber) {
        saveLead(parsed);
        return true;
      }
    } catch {
      return false;
    }
  }
  return false;
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
  // Post sample leads to API as well
  sampleLeads.forEach((l) => {
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(l)
    }).catch(() => {});
  });
}
