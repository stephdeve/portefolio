'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/server-auth';
import { processImageUpload, deleteUpload, ImageError } from '@/lib/images';

function flash(path: string, type: 'ok' | 'err', message: string): never {
  redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

function parseStack(formData: FormData): string[] {
  return formData
    .getAll('stack')
    .map((v) => String(v).trim())
    .filter((v) => v !== '');
}

const PROJECT_IMAGE_OPTS = { width: 1200, height: 800, mode: 'fit' as const, quality: 85 };

function getUploadedFile(formData: FormData): File | null {
  const file = formData.get('image');
  if (file instanceof File && file.size > 0) return file;
  return null;
}

export async function createProject(formData: FormData): Promise<void> {
  await requireAdmin();
  const title = String(formData.get('title') ?? '').trim();
  if (title === '' || title.length < 3) {
    flash('/admin/projects/create', 'err', 'Le titre doit contenir au moins 3 caractères.');
  }
  const stack = parseStack(formData);
  const description = String(formData.get('description') ?? '').trim();
  const github = String(formData.get('github') ?? '').trim();
  const link = String(formData.get('link') ?? '').trim();
  const imageAlt = String(formData.get('image_alt') ?? '').trim();

  let imagePath: string | null = null;
  const file = getUploadedFile(formData);
  if (file) {
    try {
      imagePath = (await processImageUpload(file, PROJECT_IMAGE_OPTS)).imagePath;
    } catch (e) {
      flash('/admin/projects/create', 'err', e instanceof ImageError ? e.message : "Erreur lors du traitement de l'image.");
    }
  }

  await prisma.project.create({
    data: {
      title,
      stack,
      description: description || null,
      github: github || null,
      link: link || null,
      image: imagePath,
      imageAlt: imageAlt || null,
    },
  });
  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  flash('/admin/projects', 'ok', 'Projet créé avec succès.');
}

export async function updateProject(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number.parseInt(String(formData.get('id') ?? ''), 10) || 0;
  if (id <= 0) flash('/admin/projects', 'err', 'ID invalide.');

  const title = String(formData.get('title') ?? '').trim();
  if (title === '' || title.length < 3) {
    flash(`/admin/projects/edit?id=${id}`, 'err', 'Le titre doit contenir au moins 3 caractères.');
  }
  const stack = parseStack(formData);
  const description = String(formData.get('description') ?? '').trim();
  const github = String(formData.get('github') ?? '').trim();
  const link = String(formData.get('link') ?? '').trim();
  const imageAlt = String(formData.get('image_alt') ?? '').trim();

  const existing = await prisma.project.findUnique({ where: { id } });
  let imagePath = existing?.image ?? null;

  const file = getUploadedFile(formData);
  if (file) {
    let newImagePath: string;
    try {
      newImagePath = (await processImageUpload(file, PROJECT_IMAGE_OPTS)).imagePath;
    } catch (e) {
      flash(`/admin/projects/edit?id=${id}`, 'err', e instanceof ImageError ? e.message : "Erreur lors du traitement de l'image.");
    }
    // Delete the previous image once the new one is ready.
    if (existing?.image) await deleteUpload(existing.image);
    imagePath = newImagePath!;
  }

  await prisma.project.update({
    where: { id },
    data: {
      title,
      stack,
      description: description || null,
      github: github || null,
      link: link || null,
      image: imagePath,
      imageAlt: imageAlt || null,
    },
  });
  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  flash('/admin/projects', 'ok', 'Projet mis à jour.');
}

export async function deleteProject(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number.parseInt(String(formData.get('id') ?? ''), 10) || 0;
  if (id > 0) {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (existing?.image) await deleteUpload(existing.image);
    await prisma.project.delete({ where: { id } }).catch(() => {});
    revalidatePath('/admin/projects');
    revalidatePath('/projects');
    flash('/admin/projects', 'ok', 'Projet supprimé.');
  }
  redirect('/admin/projects');
}
