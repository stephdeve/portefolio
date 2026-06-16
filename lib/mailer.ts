import 'server-only';
import nodemailer from 'nodemailer';
import { config } from './config';

/**
 * Sends an HTML email via SMTP using the configured credentials.
 * Mirrors the original PHP Mailer service: silently no-ops when SMTP is not
 * configured so contact submissions are never lost.
 */
export async function sendMail(to: string, subject: string, html: string): Promise<boolean> {
  const { host, port, user, pass, encryption, from, fromName } = config.mail;
  if (!host || !to) return false;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: encryption === 'ssl' || port === 465,
      auth: user ? { user, pass } : undefined,
    });

    await transporter.sendMail({
      from: `"${fromName}" <${from}>`,
      to,
      subject,
      html,
    });
    return true;
  } catch (err) {
    console.error('Mailer error:', err);
    return false;
  }
}
