import { LeadData } from '../types';

export const GOOGLE_FORM_URL = 'https://forms.gle/yS7NSGmn1yDsuvRz7';
export const GOOGLE_FORM_DIRECT_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSehn1PZqg55Gg3zys3WDR_y9D9Eg7X_tQLgyLCVZOWTc3njIw/viewform?usp=send_form';
export const GOOGLE_FORM_EMBED_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSehn1PZqg55Gg3zys3WDR_y9D9Eg7X_tQLgyLCVZOWTc3njIw/viewform?embedded=true';
export const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/BaqZ791UJqCLO40zeL9NRo?mode=gi_t';
export const DEFAULT_CONTACT_PHONE = '9940411837';
export const FORMATTED_CONTACT_PHONE = '+91 99404 11837';

const ORGANIZER_PHONE_KEY = 'ai_arena_organizer_phone';
const SESSION_PARTICIPANT_KEY = 'ai_arena_current_participant';

export function getOrganizerPhone(): string {
  if (typeof window === 'undefined') return DEFAULT_CONTACT_PHONE;
  return localStorage.getItem(ORGANIZER_PHONE_KEY) || DEFAULT_CONTACT_PHONE;
}

export function setOrganizerPhone(phone: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ORGANIZER_PHONE_KEY, phone.trim());
}

/**
 * Builds direct WhatsApp chat link to the contact number 9940411837
 */
export function getWhatsAppContactUrl(text?: string): string {
  const phone = (getOrganizerPhone() || DEFAULT_CONTACT_PHONE).replace(/[^0-9]/g, '');
  const cleanPhone = phone.startsWith('91') ? phone : `91${phone}`;
  const encodedText = text ? `&text=${encodeURIComponent(text)}` : '';
  return `https://api.whatsapp.com/send?phone=${cleanPhone}${encodedText}`;
}

/**
 * Opens the official stall Google Form in a new tab
 */
export function openGoogleForm(): void {
  window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
}

/**
 * Saves current attendee session info so their personalised roadmap renders their name & details
 */
export function saveCurrentParticipant(data: Partial<LeadData>): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SESSION_PARTICIPANT_KEY, JSON.stringify(data));
  } catch {}
}

export function getCurrentParticipant(): Partial<LeadData> | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SESSION_PARTICIPANT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
