'use server';

import { prisma } from '@/lib/prisma';
import { config } from '@/lib/config';
import { sendMail } from '@/lib/mailer';

export interface ContactState {
  success: boolean;
  errors: Record<string, string>;
  old: { name: string; email: string; message: string };
}

const EMPTY_OLD = { name: '', email: '', message: '' };

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();
  const old = { name, email, message };

  const errors: Record<string, string> = {};
  if (name === '' || name.length < 2) errors.name = 'Nom invalide.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Email invalide.';
  if (message === '' || message.length < 10) errors.message = 'Message trop court.';

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, old };
  }

  try {
    await prisma.contact.create({ data: { name, email, message } });
  } catch (err) {
    console.error('Contact save error:', err);
    return {
      success: false,
      errors: {
        global:
          "Une erreur est survenue lors de l'enregistrement du message. Veuillez réessayer.",
      },
      old,
    };
  }

  const to = config.mail.to;
  if (to) {
    const subject = `Nouveau message de contact: ${name}`;
    const html =
      `<p><strong>Nom:</strong> ${escapeHtml(name)}</p>` +
      `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
      `<p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`;
    await sendMail(to, subject, html);
  }

  return { success: true, errors: {}, old: EMPTY_OLD };
}
