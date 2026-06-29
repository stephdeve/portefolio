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
    'home.about_interests',
    'home.about_footer',
    'home.quote_text',
    'home.offer_title',
    'home.offer_subtitle',
    'home.offer_items',
    'home.stats',
    'home.meta_title',
    'home.meta_description',
  ];

  for (const key of fields) {
    const value = formData.get(key);
    await setSetting(key, value ? String(value).trim() : null);
  }

  revalidatePath('/');
  flash('ok', 'Contenu de la page d\'accueil mis à jour.');
}
