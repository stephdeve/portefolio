'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/server-auth';
import { getSetting, setSetting } from '@/lib/data';
import { processImageUpload, deleteUpload, ImageError } from '@/lib/images';

function flash(type: 'ok' | 'err', message: string): never {
  redirect(`/admin/settings?${type}=${encodeURIComponent(message)}`);
}

const PROFILE_IMAGE_OPTS = { width: 480, height: 480, mode: 'cover' as const, quality: 85 };

export async function updateProfileImage(formData: FormData): Promise<void> {
  await requireAdmin();
  const alt = String(formData.get('image_alt') ?? '').trim() || null;
  const file = formData.get('image');

  if (!(file instanceof File) || file.size === 0) {
    await setSetting('home.profile_image_alt', alt);
    revalidatePath('/');
    flash('ok', 'Paramètres mis à jour.');
  }

  let imagePath: string;
  try {
    imagePath = (await processImageUpload(file as File, PROFILE_IMAGE_OPTS)).imagePath;
  } catch (e) {
    flash('err', e instanceof ImageError ? e.message : 'Erreur lors du traitement.');
  }

  const previous = await getSetting('home.profile_image');
  if (previous) await deleteUpload(previous);

  await setSetting('home.profile_image', imagePath!);
  await setSetting('home.profile_image_alt', alt);

  revalidatePath('/');
  flash('ok', 'Photo mise à jour.');
}

export async function updateHomeContent(formData: FormData): Promise<void> {
  await requireAdmin();

  const fields = [
    'home.hero_badge',
    'home.hero_title_line1',
    'home.hero_title_line2',
    'home.profile_name',
    'home.profile_title',
    'home.about_title',
    'home.about_text',
    'home.about_interests_heading',
    'home.about_footer',
    'home.quote_text',
    'home.offer_title',
    'home.offer_subtitle',
    'home.meta_title',
    'home.meta_description',
  ];

  for (const key of fields) {
    const value = formData.get(key);
    await setSetting(key, value ? String(value).trim() : null);
  }

  // Reconstruire le JSON des centres d'intérêt
  const interests: { label: string }[] = [];
  for (let i = 0; i < 10; i++) {
    const label = formData.get(`home.about_interest_${i}`);
    if (label && String(label).trim()) {
      interests.push({ label: String(label).trim() });
    }
  }
  await setSetting('home.about_interests', interests.length > 0 ? JSON.stringify(interests) : null);

  // Reconstruire le JSON des éléments offer
  const offerItems: { title: string; description: string }[] = [];
  for (let i = 0; i < 10; i++) {
    const title = formData.get(`home.offer_item_${i}_title`);
    const desc = formData.get(`home.offer_item_${i}_desc`);
    if (title && String(title).trim()) {
      offerItems.push({ title: String(title).trim(), description: desc ? String(desc).trim() : '' });
    }
  }
  await setSetting('home.offer_items', offerItems.length > 0 ? JSON.stringify(offerItems) : null);

  // Reconstruire le JSON des stats
  const stats: { number: string; label: string }[] = [];
  for (let i = 0; i < 10; i++) {
    const number = formData.get(`home.stat_${i}_number`);
    const label = formData.get(`home.stat_${i}_label`);
    if (number && String(number).trim()) {
      stats.push({ number: String(number).trim(), label: label ? String(label).trim() : '' });
    }
  }
  await setSetting('home.stats', stats.length > 0 ? JSON.stringify(stats) : null);

  revalidatePath('/');
  flash('ok', 'Contenu de la page d\'accueil mis à jour.');
}
