'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/server-auth';
import { getSetting, setSetting } from '@/lib/data';
import { processImageUpload, deleteUpload, copyToProfileImage, ImageError } from '@/lib/images';

function flash(type: 'ok' | 'err', message: string): never {
  redirect(`/admin/settings?${type}=${encodeURIComponent(message)}`);
}

const PROFILE_IMAGE_OPTS = { resizeWidth: 1200, resizeHeight: 1200, thumbSize: 480, quality: 85 };

export async function updateProfileImage(formData: FormData): Promise<void> {
  await requireAdmin();
  const alt = String(formData.get('image_alt') ?? '').trim() || null;
  const file = formData.get('image');

  // No new file: update the alt text only.
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

  // Remove the previous uploaded image.
  const previous = await getSetting('home.profile_image');
  if (previous) await deleteUpload(previous);

  await setSetting('home.profile_image', imagePath!);
  await setSetting('home.profile_image_alt', alt);

  // Also refresh the static home profile image for immediate effect.
  await copyToProfileImage(imagePath!);

  revalidatePath('/');
  flash('ok', 'Photo mise à jour.');
}
